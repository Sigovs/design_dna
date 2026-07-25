#!/usr/bin/env node
/**
 * Taste vault capture tool.
 *
 *   npm run add -- <url>          add a new entry + shoot it
 *   npm run recapture -- <id>     reshoot one existing entry
 *   npm run capture-missing       shoot every entry with missing shots
 *                                 (for URLs added by hand from the phone)
 *
 * Add --insecure to any command to accept TLS errors (misconfigured certs on
 * agency/CDN hosts are common). Off by default and logged loudly when used — we
 * are only taking screenshots, but an unverified host is still unverified.
 *
 * Three shots per entry, into vault/shots/<id>/ :
 *   full.jpg    1440w full-page desktop
 *   hero.jpg    1440x900 viewport crop — what you see before scrolling
 *   mobile.jpg  390w full-page
 *
 * Shots are committed to the repo. They are the point of the repo — which is
 * also why they are JPEG and why full-page shots are 1x: PNG at 2x ran ~33MB
 * per entry, and a reference library has to stay clonable. The hero is the one
 * shot kept at 2x, because it's the card preview and the detail focal point.
 */

import { chromium, devices } from 'playwright';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const VAULT = dirname(fileURLToPath(import.meta.url));
const SITES = join(VAULT, 'sites.json');
const SHOTS = join(VAULT, 'shots');

const DESKTOP = { width: 1440, height: 900 };
const MOBILE = { width: 390, height: 844 };

/* Full-page shots of infinite-scroll sites can run tens of thousands of px.
   Clip rather than produce an unusable 40MB strip. */
const MAX_FULL_HEIGHT = 14_000;
const QUALITY = { hero: 88, full: 80, mobile: 82 };

/* Consent walls ruin hero shots. Best-effort dismissal, never fatal. */
const CONSENT_PATTERNS = [
  /^(accept|accept all|allow all|agree|i agree|got it|ok|okay)$/i,
  /^(accept all cookies|allow cookies|accept cookies)$/i,
  /^(continue|understood|dismiss|close)$/i,
];

/* ---------------------------------------------------------------- helpers */

const log = (...a) => console.log(...a);
const warn = (...a) => console.warn('  !', ...a);

function slugify(url) {
  const u = new URL(url);
  const host = u.hostname.replace(/^www\./, '');
  const path = u.pathname.replace(/\/+$/, '').replace(/^\//, '');
  return [host, path]
    .filter(Boolean)
    .join('-')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
}

function uniqueId(base, entries) {
  if (!entries.some((e) => e.id === base)) return base;
  let n = 2;
  while (entries.some((e) => e.id === `${base}-${n}`)) n++;
  return `${base}-${n}`;
}

async function readSites() {
  if (!existsSync(SITES)) return [];
  const raw = await readFile(SITES, 'utf8');
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) throw new Error('sites.json must be an array');
    return parsed;
  } catch (err) {
    // Never silently overwrite a hand-edited file we failed to parse.
    throw new Error(`sites.json is not valid JSON (${err.message}). Fix it before capturing.`);
  }
}

async function writeSites(entries) {
  entries.sort((a, b) => (a.added === b.added ? a.id.localeCompare(b.id) : b.added.localeCompare(a.added)));
  await writeFile(SITES, JSON.stringify(entries, null, 2) + '\n', 'utf8');
}

async function emptyVocabTags() {
  const vocab = JSON.parse(await readFile(join(VAULT, 'vocab.json'), 'utf8'));
  return Object.fromEntries(Object.keys(vocab.categories).map((c) => [c, []]));
}

/* Raw <title> tags are SEO strings ("Classic Car Auctions | RM Sotheby's | RM
   Sotheby's Auction House"). Keep the first segment — short titles are what make
   the gallery grid line up. Always editable in the gallery afterwards. */
function cleanTitle(raw) {
  const flat = (raw || '').trim().replace(/\s+/g, ' ');
  if (!flat) return '';
  const segments = flat.split(/\s*[|·—–»>]\s*|\s+-\s+/).map((s) => s.trim()).filter(Boolean);
  const first = segments[0] || flat;
  return (first.length >= 3 ? first : flat).slice(0, 70);
}

function isoDate() {
  // Local calendar date, not UTC — `added` should match the day you were working.
  // Date is only ever used for this stamp, never for logic.
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/* ------------------------------------------------------------- page setup */

async function settle(page, url) {
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60_000 });

  try {
    await page.waitForLoadState('networkidle', { timeout: 20_000 });
  } catch {
    warn('network never went idle — capturing anyway');
  }

  await dismissConsent(page);

  // Walk the page to trigger lazy images, then return to the top for the hero.
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.9;
    const max = document.body.scrollHeight;
    for (let y = 0; y < max; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
  });

  try {
    await page.waitForLoadState('networkidle', { timeout: 10_000 });
  } catch { /* lazy loaders that never idle are common; proceed */ }

  await page.waitForTimeout(700); // let entrance animations land

  // Freeze motion so shots are deterministic and hero isn't mid-transition.
  await page.addStyleTag({
    content: `*,*::before,*::after{animation-duration:0s!important;animation-delay:0s!important;transition-duration:0s!important;transition-delay:0s!important;scroll-behavior:auto!important}`,
  });
}

async function dismissConsent(page) {
  for (const pattern of CONSENT_PATTERNS) {
    try {
      const btn = page.getByRole('button', { name: pattern }).first();
      if (await btn.isVisible({ timeout: 800 })) {
        await btn.click({ timeout: 2000 });
        await page.waitForTimeout(400);
        log('  · dismissed a consent dialog');
        return;
      }
    } catch { /* not present — the normal case */ }
  }
}

/* -------------------------------------------------------------- capturing */

/* fullPage, but clipped if the page is absurdly long. */
async function fullPageShot(page, path, quality, width) {
  const height = await page.evaluate(() =>
    Math.max(document.body.scrollHeight, document.documentElement.scrollHeight));
  const opts = { path, type: 'jpeg', quality };
  if (height > MAX_FULL_HEIGHT) {
    warn(`page is ${height}px tall — clipping to ${MAX_FULL_HEIGHT}px`);
    await page.screenshot({ ...opts, clip: { x: 0, y: 0, width, height: MAX_FULL_HEIGHT } });
  } else {
    await page.screenshot({ ...opts, fullPage: true });
  }
}

async function shoot(browser, entry) {
  const dir = join(SHOTS, entry.id);
  await mkdir(dir, { recursive: true });

  log(`  shooting ${entry.url}`);

  // Desktop hero: 2x, because this is the shot you actually look at.
  const heroCtx = await browser.newContext({ viewport: DESKTOP, deviceScaleFactor: 2, ignoreHTTPSErrors: INSECURE });
  const heroPage = await heroCtx.newPage();
  let title = entry.title || '';
  try {
    await settle(heroPage, entry.url);
    title = (await heroPage.title()) || title;
    await heroPage.screenshot({ path: join(dir, 'hero.jpg'), type: 'jpeg', quality: QUALITY.hero });
    log('  · hero.jpg');
  } finally {
    await heroCtx.close();
  }

  // Desktop full page: 1x — a 1440x12000 strip at 2x is unclonable.
  const fullCtx = await browser.newContext({ viewport: DESKTOP, deviceScaleFactor: 1, ignoreHTTPSErrors: INSECURE });
  const fullPage_ = await fullCtx.newPage();
  try {
    await settle(fullPage_, entry.url);
    await fullPageShot(fullPage_, join(dir, 'full.jpg'), QUALITY.full, DESKTOP.width);
    log('  · full.jpg');
  } finally {
    await fullCtx.close();
  }

  // Mobile: real device emulation, full page. 390px wide, so 1x is enough.
  const mobileCtx = await browser.newContext({
    ...devices['iPhone 13'],
    viewport: MOBILE,
    deviceScaleFactor: 1,
    ignoreHTTPSErrors: INSECURE,
  });
  const mpage = await mobileCtx.newPage();
  try {
    await settle(mpage, entry.url);
    await fullPageShot(mpage, join(dir, 'mobile.jpg'), QUALITY.mobile, MOBILE.width);
    log('  · mobile.jpg');
  } finally {
    await mobileCtx.close();
  }

  return {
    title: cleanTitle(title),
    shots: {
      full: `shots/${entry.id}/full.jpg`,
      hero: `shots/${entry.id}/hero.jpg`,
      mobile: `shots/${entry.id}/mobile.jpg`,
    },
  };
}

/* What "complete" means depends on how the entry was born.
   site      — needs all three page shots.
   image-url — needs its hero fetched from the image URL; no page to visit.
   upload    — complete as soon as it has an image. Never captured, never pending. */
function kindOf(entry) {
  return entry.kind || 'site';
}

function shotsMissing(entry) {
  const kind = kindOf(entry);
  const s = entry.shots || {};
  const have = (k) => Boolean(s[k]) && existsSync(join(VAULT, s[k]));

  if (kind === 'upload') return false;
  if (kind === 'image-url') return !have('hero');
  return ['full', 'hero', 'mobile'].some((k) => !have(k));
}

/* Captured extras that have not been shot yet. Uploaded extras are never pending. */
function pendingExtras(entry) {
  return (entry.extras ?? []).filter(
    (x) => (x.kind ?? 'captured') === 'captured' && x.url
      && (!x.file || !existsSync(join(VAULT, x.file)))
  );
}

function needsWork(entry) {
  return shotsMissing(entry) || pendingExtras(entry).length > 0;
}

/* ------------------------------------------------- image URLs and extras */

const IMAGE_EXT = /\.(jpe?g|png|webp|avif|gif|bmp|tiff?)(\?|#|$)/i;

/* Extension first, content-type second: plenty of image URLs carry no extension. */
async function looksLikeImage(url) {
  if (IMAGE_EXT.test(url)) return true;
  try {
    const res = await fetch(url, { method: 'HEAD', redirect: 'follow' });
    return (res.headers.get('content-type') ?? '').startsWith('image/');
  } catch { return false; }
}

/* Fetch bytes in Node (no CORS), then re-encode through a canvas in the browser
   we already have. Keeps the repo lean without adding an image dependency. */
async function fetchAndDownscaleImage(browser, url, outPath, max = 2000, quality = 0.85) {
  const res = await fetch(url, {
    redirect: 'follow',
    headers: {
      // Some hosts refuse a bare fetch; a normal UA and referer is not evasion,
      // it is asking the way a browser would.
      'user-agent': 'Mozilla/5.0 (compatible; design-dna-vault/1.0; +https://github.com/Sigovs/design_dna)',
      accept: 'image/avif,image/webp,image/png,image/jpeg,*/*',
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} fetching the image`);
  const type = res.headers.get('content-type') ?? '';
  if (!type.startsWith('image/')) throw new Error(`not an image (content-type: ${type || 'unknown'})`);

  const bytes = Buffer.from(await res.arrayBuffer());
  if (!bytes.length) throw new Error('the image was empty');
  const dataUrl = `data:${type.split(';')[0]};base64,${bytes.toString('base64')}`;

  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  try {
    const out = await page.evaluate(async ({ src, max: m, q }) => {
      const img = new Image();
      img.decoding = 'sync';
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = () => reject(new Error('the browser could not decode the image'));
        img.src = src;
      });
      const scale = Math.min(1, m / Math.max(img.naturalWidth, img.naturalHeight));
      const w = Math.max(1, Math.round(img.naturalWidth * scale));
      const h = Math.max(1, Math.round(img.naturalHeight * scale));
      const canvas = document.createElement('canvas');
      canvas.width = w; canvas.height = h;
      canvas.getContext('2d').drawImage(img, 0, 0, w, h);
      return { data: canvas.toDataURL('image/jpeg', q), w, h };
    }, { src: dataUrl, max, q: quality });

    await mkdir(dirname(outPath), { recursive: true });
    await writeFile(outPath, Buffer.from(out.data.split(',')[1], 'base64'));
    return { width: out.w, height: out.h };
  } finally {
    await ctx.close();
  }
}

/* --------------------------------------------------------------- commands */

async function cmdAdd(url) {
  if (!url) fail('usage: npm run add -- <url>');
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    fail(`not a valid URL: ${url}`);
  }
  if (!/^https?:$/.test(parsed.protocol)) fail('url must be http or https');

  const entries = await readSites();
  const existing = entries.find((e) => e.url === parsed.href);
  if (existing) {
    log(`already in the vault as "${existing.id}" — reshooting instead`);
    return cmdRecapture(existing.id);
  }

  const isImage = await looksLikeImage(parsed.href);
  const entry = {
    id: uniqueId(slugify(parsed.href), entries),
    kind: isImage ? 'image-url' : 'site',
    url: parsed.href,
    source: isImage ? parsed.hostname.replace(/^www\./, '') : '',
    title: parsed.hostname.replace(/^www\./, ''),
    added: isoDate(),
    rating: 2,
    // Dialect classification is a human judgement — a stub is never pre-classified.
    dialectStatus: 'unreviewed',
    dialects: [],
    tags: await emptyVocabTags(),
    note: 'TODO',
    shots: { full: null, hero: null, mobile: null },
    extras: [],
    captureError: null,
  };

  log(`\nadding ${entry.id} — understood as ${isImage ? 'a direct image URL' : 'a page to capture'}`);
  const browser = await chromium.launch();
  try {
    if (isImage) {
      const rel = `shots/${entry.id}/hero.jpg`;
      const { width, height } = await fetchAndDownscaleImage(browser, entry.url, join(VAULT, rel));
      entry.shots = { full: rel, hero: rel, mobile: null };
      log(`  · hero.jpg (${width}x${height})`);
    } else {
      const { title, shots } = await shoot(browser, entry);
      entry.title = title || entry.title;
      entry.shots = shots;
    }
  } finally {
    await browser.close();
  }

  entries.push(entry);
  await writeSites(entries);
  log(`\n✓ ${entry.id} — "${entry.title}"`);
  log('  tags are empty and the note says TODO. Open the gallery: npm run vault');
}

async function cmdRecapture(id) {
  if (!id) fail('usage: npm run recapture -- <id>');
  const entries = await readSites();
  const entry = entries.find((e) => e.id === id);
  if (!entry) {
    fail(`no entry with id "${id}". Known ids:\n  ${entries.map((e) => e.id).join('\n  ') || '(none)'}`);
  }

  log(`\nreshooting ${entry.id}`);
  const browser = await chromium.launch();
  try {
    const { title, shots } = await shoot(browser, entry);
    entry.shots = shots;
    // A hand-written title is a deliberate edit; only fill it if it's still the default.
    if (!entry.title || entry.title === new URL(entry.url).hostname.replace(/^www\./, '')) {
      entry.title = title || entry.title;
    }
  } finally {
    await browser.close();
  }

  await writeSites(entries);
  log(`\n✓ reshot ${entry.id}`);
}

async function cmdCaptureMissing() {
  const entries = await readSites();
  const todo = entries.filter(needsWork);
  const skipped = entries.filter((e) => kindOf(e) === 'upload');

  if (skipped.length) {
    log(`${skipped.length} upload-only entr${skipped.length === 1 ? 'y' : 'ies'} skipped — nothing to capture:`);
    skipped.forEach((e) => log(`  · ${e.id}`));
    log('');
  }

  if (!todo.length) {
    log('nothing pending. Every entry has what its kind requires.');
    return;
  }

  log(`${todo.length} entr${todo.length === 1 ? 'y' : 'ies'} pending:`);
  todo.forEach((e) => {
    const bits = [];
    if (shotsMissing(e)) bits.push(kindOf(e) === 'image-url' ? 'hero from image URL' : 'page shots');
    const px = pendingExtras(e).length;
    if (px) bits.push(`${px} extra${px === 1 ? '' : 's'}`);
    log(`  · ${e.id} (${bits.join(' + ')})`);
  });

  const browser = await chromium.launch();
  const failed = [];
  try {
    for (const entry of todo) {
      log(`\n${entry.id}`);

      /* Main shots */
      if (shotsMissing(entry)) {
        try {
          if (kindOf(entry) === 'image-url') {
            const rel = `shots/${entry.id}/hero.jpg`;
            log(`  fetching image ${entry.url}`);
            const { width, height } = await fetchAndDownscaleImage(browser, entry.url, join(VAULT, rel));
            // A single image is the whole reference: it is the hero and the full view.
            entry.shots = { full: rel, hero: rel, mobile: null };
            entry.captureError = null;
            log(`  · hero.jpg (${width}x${height})`);
          } else {
            const { title, shots } = await shoot(browser, entry);
            entry.shots = shots;
            entry.captureError = null;
            const host = (() => { try { return new URL(entry.url).hostname.replace(/^www\./, ''); } catch { return ''; } })();
            if (!entry.title || entry.title === host) entry.title = title || entry.title;
          }
          await writeSites(entries);   // write after each, so a later crash keeps progress
        } catch (err) {
          const msg = err.message.split('\n')[0];
          warn(`${entry.id} failed: ${msg}`);
          if (/ERR_CERT|SSL|TLS/i.test(err.message) && !INSECURE) {
            warn('  certificate problem — retry with: npm run capture-missing -- --insecure');
          }
          /* Recorded on the entry, not just in the log: a dead or hotlink-protected
             URL must be visible in the gallery, never a silently empty card. */
          entry.captureError = kindOf(entry) === 'image-url'
            ? `fetch failed — upload manually or fix the URL (${msg})`
            : `capture failed — ${msg}`;
          await writeSites(entries);
          failed.push(entry.id);
        }
      }

      /* Extras: one full-page desktop shot each, nothing else. */
      for (const extra of pendingExtras(entry)) {
        const n = (entry.extras.indexOf(extra)) + 1;
        const rel = `shots/${entry.id}/extra-${n}.jpg`;
        try {
          log(`  extra ${n}: ${extra.url}`);
          if (await looksLikeImage(extra.url)) {
            await fetchAndDownscaleImage(browser, extra.url, join(VAULT, rel));
          } else {
            const ctx = await browser.newContext({ viewport: DESKTOP, deviceScaleFactor: 1, ignoreHTTPSErrors: INSECURE });
            const page = await ctx.newPage();
            try {
              await settle(page, extra.url);
              await fullPageShot(page, join(VAULT, rel), QUALITY.full, DESKTOP.width);
            } finally { await ctx.close(); }
          }
          extra.file = rel;
          extra.error = null;
          log(`  · extra-${n}.jpg`);
          await writeSites(entries);
        } catch (err) {
          const msg = err.message.split('\n')[0];
          warn(`extra ${n} failed: ${msg}`);
          extra.error = `fetch failed — upload manually or fix the URL (${msg})`;
          await writeSites(entries);
          failed.push(`${entry.id}#extra-${n}`);
        }
      }
    }
  } finally {
    await browser.close();
  }

  await writeSites(entries);
  const done = todo.length - new Set(failed.map((f) => f.split('#')[0])).size;
  log(`\n✓ completed ${done}/${todo.length}`);
  if (failed.length) {
    log(`  failed: ${failed.join(', ')}`);
    log('  each failure is recorded on the entry and shown in the gallery.');
  }
}

/* ------------------------------------------------------------------- main */

function fail(msg) {
  console.error(`\n✗ ${msg}\n`);
  process.exit(1);
}

const argv = process.argv.slice(2);
const INSECURE = argv.includes('--insecure');
const [cmd, ...rest] = argv.filter((a) => a !== '--insecure');

if (INSECURE) warn('--insecure: TLS certificate errors will be ignored for this run');

const commands = {
  add: () => cmdAdd(rest[0]),
  recapture: () => cmdRecapture(rest[0]),
  'capture-missing': () => cmdCaptureMissing(),
};

if (!commands[cmd]) {
  fail(
    `unknown command "${cmd ?? ''}"\n\n  npm run add -- <url>\n  npm run recapture -- <id>\n  npm run capture-missing`
  );
}

try {
  await commands[cmd]();
} catch (err) {
  fail(err.stack || err.message);
}

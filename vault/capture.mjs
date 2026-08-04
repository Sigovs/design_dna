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
 * Shots per entry, into vault/shots/<id>/ :
 *   full.jpg          1440w full-page desktop
 *   hero.jpg          1440x900 viewport crop — what you see before scrolling
 *   mobile.jpg        390w full-page
 *   strip-1..8.jpg    the scroll filmstrip: 8 viewport-height desktop frames,
 *                     evenly spaced down the page
 *   strip-m-1..6.jpg  the same at 390w, 6 frames
 *   nav-scrolled.jpg  the pinned header after the first screen — ONLY when it
 *                     actually differs from its top state
 *
 * Why the filmstrip: a full-page strip flattens a page into one image, which is
 * exactly what a page never is. Sequence — what arrives, in what order, against
 * what — is a compositional decision, and the full shot cannot record it. Eight
 * frames are what one viewport-height step gives you across a normal page.
 *
 * Shots are committed to the repo. They are the point of the repo — which is
 * also why they are JPEG and why full-page shots are 1x: PNG at 2x ran ~33MB
 * per entry, and a reference library has to stay clonable. The hero is the one
 * shot kept at 2x, because it's the card preview and the detail focal point;
 * filmstrip frames are the lowest quality here, because they are read as a
 * sequence and never as a surface.
 *
 * A NOTE ON WHAT THIS IS FOR. Richer evidence increases the pull toward
 * imitation, which is the opposite of this vault's purpose. The note is the
 * payload; the shots are the evidence for it. See TASTE.md §6 (d).
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
const QUALITY = { hero: 88, full: 80, mobile: 82, strip: 72 };

/* Frame counts. Eight desktop frames is one viewport-height step across a page of
   ordinary length; six is the same reading on a phone, where each screen carries
   less. Short pages get fewer — see framePositions(). */
const STRIP_FRAMES = { desktop: 8, mobile: 6 };

/* Bot walls are not references. Found by looking at what the first backfill
   actually stored: one entry's desktop filmstrip was a single frame of a
   "Verify you are human" interstitial, filed in the vault as evidence about design.
   A challenge page is short and says so; both conditions are required, so a page
   that merely writes about security is not mistaken for one. The MOBILE pass on
   the same site sailed through, which is why this is checked per pass rather than
   per entry. */
const CHALLENGE_MARKERS = [
  /verify you are human/i,
  /performing security verification/i,
  /checking your browser/i,
  /just a moment/i,
  /attention required/i,
  /enable javascript and cookies to continue/i,
  /access denied/i,
];

async function isChallengePage(page) {
  const text = await page.evaluate(() => (document.body?.innerText ?? '').slice(0, 4000));
  return text.length < 1500 && CHALLENGE_MARKERS.some((re) => re.test(text));
}

/* Consent walls ruin hero shots. Best-effort dismissal, never fatal.
   Accept first — it is the one button every wall has, so it is the one that most
   reliably clears the frame. Refusal follows as the fallback for walls that only
   offer "necessary only".
   The list is English + the languages this vault actually collects in. It was
   English-only until a .dk site filed its cookie dialog as the hero. */
const CONSENT_PATTERNS = [
  /^(accept|accept all|allow all|agree|i agree|got it|ok|okay)$/i,
  /^(accept all cookies|allow cookies|accept cookies)$/i,
  /^(accepter alle|tillad alle|godta alle|godkänn alla|tillåt alla)$/i,
  /^(alle akzeptieren|alles akzeptieren|zustimmen|alles accepteren|tout accepter)$/i,
  /^(reject all|decline all|refuse all|necessary only|only necessary)$/i,
  /^(afvis alle|kun nødvendige|avvis alle|avvisa alla|endast nödvändiga)$/i,
  /^(alle ablehnen|nur notwendige|alles weigeren|alleen noodzakelijke|tout refuser)$/i,
  /^(continue|understood|dismiss|close)$/i,
];

/* Words that identify a consent wall in the languages above — used to recognise
   one that survived dismissal, never to click anything. */
const CONSENT_MARKERS =
  /cookie|consent|samtykke|personoplysninger|privatliv|personvern|integritet|datenschutz|einwilligung|toestemming/i;

/* Intro gates that stand between the visitor and the page. Organimo shipped one —
   a "COMPLETE" button over an audio prompt — and the first capture filed the gate
   itself as the site, silently, because nothing here matched it.
   WHITELIST ONLY, and only a control whose text or accessible name matches. There
   is deliberately no click-on-empty-space fallback: an unidentified click on
   somebody else's page is an action with unknown consequences, not a read. */
const SAFE_GATE_PATTERNS = [
  /^complete$/i, /^enter$/i, /^begin$/i,
  /^skip intro$/i, /^continue to site$/i,
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
  await passSafeGate(page);

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

/* One automatic gate action per visit, then the page is reassessed. Two clicks is
   navigation, and navigating somebody else's site on their behalf is not capture. */
async function passSafeGate(page) {
  for (const pattern of SAFE_GATE_PATTERNS) {
    try {
      const btn = page.getByRole('button', { name: pattern }).first();
      if (await btn.isVisible({ timeout: 700 })) {
        await btn.click({ timeout: 2000 });
        await page.waitForTimeout(1200);
        log('  · passed an intro gate (matched the safe whitelist)');
        return true;
      }
    } catch { /* not present — the normal case */ }
    try {
      const link = page.getByRole('link', { name: pattern }).first();
      if (await link.isVisible({ timeout: 400 })) {
        await link.click({ timeout: 2000 });
        await page.waitForTimeout(1200);
        log('  · passed an intro gate (matched the safe whitelist)');
        return true;
      }
    } catch { /* same */ }
  }
  return false;
}

/* A SIGNAL, never a verdict. A document no taller than the viewport, on a page
   that plainly has content, is consistent with scroll-jacking — and also with a
   genuinely one-screen page. It is recorded as "consistent with", and the
   filmstrip frame count is the corroborating observation. */
async function limitationSignals(page) {
  return page.evaluate(() => {
    const h = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    const text = (document.body?.innerText ?? '').trim().length;
    return {
      noScrollRoom: h <= window.innerHeight + 2,
      contentPresent: text > 400,
      canvases: document.querySelectorAll('canvas').length,
      height: h,
      viewport: window.innerHeight,
    };
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

/* The failure that matters is not the wall — it is the wall going unrecorded. When
   nothing above matches, every shot is still written and every one of them is a
   photograph of the dialog rather than the site. The intro-gate note above records
   this happening once already, silently; this is the same class of error, so it is
   detected and filed instead of guessed at.
   Deliberately narrow: a large fixed or dialog-role block, carrying consent
   language, that holds a control. A cookie link in a footer is none of those. */
async function survivingConsentWall(page) {
  return page.evaluate((markers) => {
    const re = new RegExp(markers, 'i');
    const floor = window.innerWidth * window.innerHeight * 0.08;

    for (const el of document.querySelectorAll('body *')) {
      const style = getComputedStyle(el);
      const pinned = style.position === 'fixed' || style.position === 'sticky';
      if (!pinned && el.getAttribute('role') !== 'dialog') continue;
      if (style.display === 'none' || style.visibility === 'hidden' || Number(style.opacity) === 0) continue;

      const box = el.getBoundingClientRect();
      if (box.width * box.height < floor) continue;

      const text = (el.innerText ?? '').slice(0, 800);
      if (!re.test(text)) continue;
      if (!el.querySelector('button, [role="button"], input[type="submit"]')) continue;

      return text.replace(/\s+/g, ' ').trim().slice(0, 70);
    }
    return null;
  }, CONSENT_MARKERS.source);
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

/* Lazy content is triggered BY the scroll, so a frame taken the instant we arrive
   records skeletons and blank image boxes. settle() already walked the page once,
   but a second pass re-triggers viewport-observer loaders that unload off-screen
   content — common on the exact image-led sites worth capturing. */
async function settleViewport(page) {
  try {
    await page.waitForLoadState('networkidle', { timeout: 5_000 });
  } catch { /* a page that never idles still gets its frame */ }

  await page.evaluate(async () => {
    const visible = [...document.images].filter((img) => {
      const r = img.getBoundingClientRect();
      return r.width > 0 && r.bottom > 0 && r.top < window.innerHeight;
    });
    await Promise.all(visible.map((img) => (img.complete ? null : new Promise((done) => {
      img.addEventListener('load', done, { once: true });
      img.addEventListener('error', done, { once: true });
      setTimeout(done, 3_000);            // never let one dead image hold the run
    }))));
  });

  await page.waitForTimeout(250);
}

/* Evenly spaced across the scrollable range — but never more frames than there
   are distinct screens. A page two viewports tall would otherwise return eight
   near-identical images, which reads as evidence and is not. */
async function framePositions(page, wanted) {
  return page.evaluate((n) => {
    const height = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    const view = window.innerHeight;
    const max = Math.max(0, height - view);
    const distinct = Math.max(1, Math.ceil(max / view) + 1);
    const count = Math.min(n, distinct);
    if (count < 2) return [0];
    return Array.from({ length: count }, (_, i) => Math.round((max * i) / (count - 1)));
  }, wanted);
}

async function filmstrip(page, entryId, { frames, prefix }) {
  const positions = await framePositions(page, frames);
  const out = [];
  for (const [i, y] of positions.entries()) {
    await page.evaluate((top) => window.scrollTo(0, top), y);
    await settleViewport(page);
    const rel = `shots/${entryId}/${prefix}-${i + 1}.jpg`;
    await page.screenshot({ path: join(VAULT, rel), type: 'jpeg', quality: QUALITY.strip });
    out.push(rel);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(200);
  log(`  · ${prefix} — ${out.length} frame${out.length === 1 ? '' : 's'}`
    + (out.length < frames ? ` (page is only ${out.length} screen${out.length === 1 ? '' : 's'} deep)` : ''));
  return out;
}

/* The header that changes when you leave the first screen — shrinks, gains a
   background, swaps to a compact mark. It is a real decision, it is invisible in
   the hero, and the strip only catches it by accident.

   FOUND BY MEASUREMENT, not assumed: the first version looked for
   `header, nav, [role=banner], .header, .navbar` and matched NOTHING on a page
   whose chrome is web components — none of those tags exist in its light DOM.
   A tag-name search finds the sites built the way the searcher expects and misses
   exactly the modern ones worth capturing. So the
   header is found by hit-testing the top edge of the viewport and walking up to
   the nearest pinned ancestor, whatever it happens to be called. */
async function pinnedHeaderHandle(page) {
  const handle = await page.evaluateHandle(() => {
    const xs = [Math.round(window.innerWidth / 2), 24, window.innerWidth - 24];
    for (const y of [6, 18, 32]) {
      for (const x of xs) {
        let node = document.elementFromPoint(x, y);
        while (node && node !== document.body && node !== document.documentElement) {
          const st = getComputedStyle(node);
          if (st.position === 'fixed' || st.position === 'sticky') {
            const r = node.getBoundingClientRect();
            if (r.top <= 8 && r.height >= 24 && r.width >= window.innerWidth * 0.5) return node;
          }
          node = node.parentElement;
        }
      }
    }
    return null;
  });
  const node = handle.asElement();
  if (!node) await handle.dispose();
  return node;
}

/* Compare the header's OWN state, not the pixels of the strip it occupies.
   A transparent header sits over different content once you scroll, so a pixel
   diff of that band says "changed" on almost every page — which would store a
   frame on all of them and make the field meaningless. Height, ground, shadow,
   class list and child count say whether the HEADER changed. */
const HEADER_SIGNATURE = (node) => {
  const st = getComputedStyle(node);
  const r = node.getBoundingClientRect();
  return JSON.stringify({
    height: Math.round(r.height),
    visible: st.visibility !== 'hidden' && st.display !== 'none' && r.bottom > 0,
    background: st.backgroundColor,
    backdrop: st.backdropFilter,
    shadow: st.boxShadow,
    border: st.borderBottom,
    transform: st.transform,
    classes: String(node.className?.baseVal ?? node.className ?? ''),
    children: node.childElementCount,
  });
};

async function navScrolledShot(page, entryId) {
  await page.evaluate(() => window.scrollTo(0, Math.round(window.innerHeight * 1.5)));
  await settleViewport(page);

  const header = await pinnedHeaderHandle(page);
  if (!header) {
    await page.evaluate(() => window.scrollTo(0, 0));
    log('  · nothing pinned to the top after scrolling — no nav state to store');
    return null;
  }

  const scrolled = await page.evaluate(HEADER_SIGNATURE, header);
  const box = await page.evaluate((n) => {
    const r = n.getBoundingClientRect();
    return { x: 0, y: 0, width: Math.round(window.innerWidth), height: Math.min(Math.ceil(r.bottom), window.innerHeight) };
  }, header);

  await page.evaluate(() => window.scrollTo(0, 0));
  await settleViewport(page);
  const top = await page.evaluate(HEADER_SIGNATURE, header);

  let rel = null;
  if (top === scrolled) {
    log('  · the header is unchanged after scrolling — not stored');
  } else {
    await page.evaluate(() => window.scrollTo(0, Math.round(window.innerHeight * 1.5)));
    await settleViewport(page);
    rel = `shots/${entryId}/nav-scrolled.jpg`;
    await page.screenshot({ path: join(VAULT, rel), clip: box, type: 'jpeg', quality: QUALITY.hero });
    log('  · nav-scrolled.jpg — the header changes on scroll');
  }

  await header.dispose();
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(200);
  return rel;
}

/* What a run should produce. Every part is independent, so a backfill reshoots
   only what is absent instead of rewriting a whole entry's images. */
const ALL_PARTS = { hero: true, full: true, strip: true, navScrolled: true, mobile: true, stripMobile: true };

async function shoot(browser, entry, want = ALL_PARTS) {
  const dir = join(SHOTS, entry.id);
  await mkdir(dir, { recursive: true });

  log(`  shooting ${entry.url}`);

  const shots = {};
  const blocked = [];
  const limits = [];
  let title = entry.title || '';

  // Desktop hero: 2x, because this is the shot you actually look at.
  if (want.hero) {
    const heroCtx = await browser.newContext({ viewport: DESKTOP, deviceScaleFactor: 2, ignoreHTTPSErrors: INSECURE });
    const heroPage = await heroCtx.newPage();
    try {
      await settle(heroPage, entry.url);
      if (await isChallengePage(heroPage)) {
        blocked.push('desktop hero');
        warn('a bot challenge answered instead of the site — hero not stored');
      } else {
        const wall = await survivingConsentWall(heroPage);
        if (wall) {
          limits.push(`a consent dialog was still covering the page when the shots were taken, so every frame shows the dialog and not the site — no CONSENT_PATTERNS entry matched its buttons ("${wall}")`);
          warn('a consent dialog survived dismissal — shots stored, limitation recorded');
        }
        title = (await heroPage.title()) || title;
        await heroPage.screenshot({ path: join(dir, 'hero.jpg'), type: 'jpeg', quality: QUALITY.hero });
        shots.hero = `shots/${entry.id}/hero.jpg`;
        log('  · hero.jpg');
      }
    } finally {
      await heroCtx.close();
    }
  }

  /* One desktop load serves the full page, the filmstrip and the scrolled nav:
     they are three readings of the same visit, and reloading between them would
     re-roll every A/B test and lazy loader on the page. */
  if (want.full || want.strip || want.navScrolled) {
    const fullCtx = await browser.newContext({ viewport: DESKTOP, deviceScaleFactor: 1, ignoreHTTPSErrors: INSECURE });
    const fullPage_ = await fullCtx.newPage();
    try {
      await settle(fullPage_, entry.url);
      if (await isChallengePage(fullPage_)) {
        blocked.push('desktop page');
        warn('a bot challenge answered instead of the site — no desktop shots stored');
      } else {
        if (want.full) {
          await fullPageShot(fullPage_, join(dir, 'full.jpg'), QUALITY.full, DESKTOP.width);
          shots.full = `shots/${entry.id}/full.jpg`;
          log('  · full.jpg');
        }
        const sig = await limitationSignals(fullPage_);
        if (sig.noScrollRoom && sig.contentPresent) {
          limits.push(`document is ${sig.height}px against a ${sig.viewport}px viewport with content present — `
            + 'consistent with scroll-jacking or a one-screen page; the filmstrip below is the corroborating observation');
        }
        if (sig.canvases) limits.push(`${sig.canvases} canvas element(s) — motion and WebGL state are not preserved by a static shot`);
        /* Nav first: it reads the top state, and the strip leaves the page scrolled. */
        if (want.navScrolled) shots.navScrolled = await navScrolledShot(fullPage_, entry.id);
        if (want.strip) {
          shots.strip = await filmstrip(fullPage_, entry.id, { frames: STRIP_FRAMES.desktop, prefix: 'strip' });
        }
      }
    } finally {
      await fullCtx.close();
    }
  }

  // Mobile: real device emulation, full page. 390px wide, so 1x is enough.
  if (want.mobile || want.stripMobile) {
    const mobileCtx = await browser.newContext({
      ...devices['iPhone 13'],
      viewport: MOBILE,
      deviceScaleFactor: 1,
      ignoreHTTPSErrors: INSECURE,
    });
    const mpage = await mobileCtx.newPage();
    try {
      await settle(mpage, entry.url);
      if (await isChallengePage(mpage)) {
        blocked.push('mobile');
        warn('a bot challenge answered instead of the site — no mobile shots stored');
      } else {
        if (want.mobile) {
          await fullPageShot(mpage, join(dir, 'mobile.jpg'), QUALITY.mobile, MOBILE.width);
          shots.mobile = `shots/${entry.id}/mobile.jpg`;
          log('  · mobile.jpg');
        }
        if (want.stripMobile) {
          shots.stripMobile = await filmstrip(mpage, entry.id, { frames: STRIP_FRAMES.mobile, prefix: 'strip-m' });
        }
      }
    } finally {
      await mobileCtx.close();
    }
  }

  /* MERGE, never replace: a run that was asked for the filmstrip alone must not
     drop the hero path it never touched. */
  return { title: cleanTitle(title), shots: { ...(entry.shots ?? {}), ...shots }, blocked, limits };
}

/* What "complete" means depends on how the entry was born.
   site      — needs all three page shots.
   image-url — needs its hero fetched from the image URL; no page to visit.
   upload    — complete as soon as it has an image. Never captured, never pending. */
function kindOf(entry) {
  return entry.kind || 'site';
}

/* Which parts this entry still owes, part by part — so a backfill shoots the
   filmstrip for an entry that already has its three page shots, instead of
   rewriting images that are already correct.
   navScrolled asks a different question: a null is a legitimate ANSWER (the page
   has no pinned header, or the header does not change), so it is attempted once —
   when the key has never been written — and the recorded null closes it forever.
   Re-asking a settled question is how a backfill becomes a treadmill. */
function missingParts(entry) {
  const kind = kindOf(entry);
  const s = entry.shots || {};
  const have = (k) => Boolean(s[k]) && existsSync(join(VAULT, s[k]));
  const haveStrip = (k) => Array.isArray(s[k]) && s[k].length > 0
    && s[k].every((rel) => Boolean(rel) && existsSync(join(VAULT, rel)));

  if (kind === 'upload') return {};
  if (kind === 'image-url') return have('hero') ? {} : { image: true };

  const want = {
    hero: !have('hero'),
    full: !have('full'),
    mobile: !have('mobile'),
    strip: !haveStrip('strip'),
    stripMobile: !haveStrip('stripMobile'),
  };
  want.navScrolled = !('navScrolled' in s);
  return Object.fromEntries(Object.entries(want).filter(([, v]) => v));
}

function shotsMissing(entry) {
  return Object.keys(missingParts(entry)).length > 0;
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
    shots: { full: null, hero: null, mobile: null, strip: [], stripMobile: [] },
    extras: [],
    captureError: null,
  };

  log(`\nadding ${entry.id} — understood as ${isImage ? 'a direct image URL' : 'a page to capture'}`);
  const browser = await chromium.launch();
  try {
    if (isImage) {
      const rel = `shots/${entry.id}/hero.jpg`;
      const { width, height } = await fetchAndDownscaleImage(browser, entry.url, join(VAULT, rel));
      // A single image has no scroll, so it has no filmstrip — recorded, not left undefined.
      entry.shots = { full: rel, hero: rel, mobile: null, strip: [], stripMobile: [], navScrolled: null };
      log(`  · hero.jpg (${width}x${height})`);
    } else {
      const { title, shots, blocked, limits } = await shoot(browser, entry);
      entry.title = title || entry.title;
      entry.shots = shots;
      if (blocked.length) entry.captureError = `capture blocked by a bot challenge on: ${blocked.join(', ')}`;
      else if (limits.length) entry.captureError = `partial evidence — ${limits.join('; ')}`;
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
    const { title, shots, blocked, limits } = await shoot(browser, entry);
    entry.shots = shots;
    entry.captureError = blocked.length
      ? `capture blocked by a bot challenge on: ${blocked.join(', ')}`
      : (limits.length ? `partial evidence — ${limits.join('; ')}` : null);
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
    /* Name the parts, not just "page shots": a filmstrip backfill on an entry that
       already has its three shots would otherwise read as an unexplained reshoot. */
    if (shotsMissing(e)) {
      const parts = Object.keys(missingParts(e)).filter((k) => k !== 'navScrolled');
      bits.push(kindOf(e) === 'image-url' ? 'hero from image URL' : parts.join(' + '));
    }
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
            entry.shots = { full: rel, hero: rel, mobile: null, strip: [], stripMobile: [], navScrolled: null };
            entry.captureError = null;
            log(`  · hero.jpg (${width}x${height})`);
          } else {
            const { title, shots, blocked, limits } = await shoot(browser, entry, missingParts(entry));
            entry.shots = shots;
            entry.__limits = limits;
            /* A bot wall is not a success and not a crash. Recorded on the entry so
               the gallery says why an entry is short of shots, instead of showing a
               Cloudflare page as evidence about design. */
            /* Two different things share this field while the schema is frozen:
               a FAILURE (nothing usable was captured) and a LIMITATION (static
               evidence is real, but does not prove flow, motion or timing). */
            entry.captureError = blocked.length
              ? `capture blocked by a bot challenge on: ${blocked.join(', ')} — the site answers a wall, not the page`
              : (limits.length ? `partial evidence — ${limits.join('; ')}` : null);
            delete entry.__limits;
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

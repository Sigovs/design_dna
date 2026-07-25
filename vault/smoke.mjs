#!/usr/bin/env node
/**
 * Gallery smoke test.  npm run smoke   (needs `npm run vault` running)
 *
 * The gallery has no backend and no build step, so nothing else catches a
 * boot-time exception — and one silent throw takes out every event listener on
 * the page. This checks that the thing actually works: cards render, filters and
 * search narrow the set, the detail view opens with its form, Esc closes it, and
 * there is no horizontal overflow at 390px.
 *
 * Pass a directory as the first argument to also write screenshots there.
 */

import { chromium, webkit, devices } from 'playwright';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const VAULT = dirname(fileURLToPath(import.meta.url));
const URL_BASE = process.env.VAULT_URL || 'http://localhost:5177/';
const OUT = process.argv[2] || null;
const shot = async (page, name, opts = {}) =>
  OUT && page.screenshot({ path: `${OUT}/${name}.jpg`, type: 'jpeg', quality: 85, ...opts });

const problems = [];
const check = (label, ok, detail = '') => {
  console.log(`${ok ? '  ✓' : '  ✗'} ${label}${detail ? ` — ${detail}` : ''}`);
  if (!ok) problems.push(label);
};

/* ── shots invariant ──────────────────────────────────────────────────────
   Runs before the browser, because it is the cheapest check in the file and it
   catches the failure that is hardest to notice: an entry quietly losing its
   screenshots. Shot-loss looks like a normal "no shots yet" card, so nothing
   else would flag it. */
console.log('\nshots invariant');
{
  const sites = JSON.parse(readFileSync(join(VAULT, 'sites.json'), 'utf8'));
  const today = (() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  })();

  // 1. Every recorded path must resolve to a file on disk.
  const dangling = [];
  for (const e of sites) {
    for (const [kind, rel] of Object.entries(e.shots ?? {})) {
      if (rel && !existsSync(join(VAULT, rel))) dangling.push(`${e.id}/${kind} -> ${rel}`);
    }
  }
  check('every recorded shots path resolves to a file', dangling.length === 0,
    dangling.length ? dangling.join(', ') : `${sites.length} entries checked`);

  // 2. Orphaned files: shots on disk that no entry points at any more.
  const referenced = new Set(sites.flatMap((e) => Object.values(e.shots ?? {}).filter(Boolean)));
  const shotDirs = existsSync(join(VAULT, 'shots'))
    ? readdirSync(join(VAULT, 'shots'), { withFileTypes: true })
        .filter((d) => d.isDirectory()).map((d) => d.name)
    : [];
  const orphanDirs = shotDirs.filter((dir) =>
    !sites.some((e) => Object.values(e.shots ?? {}).some((v) => v?.startsWith(`shots/${dir}/`)))
    && !sites.some((e) => e.id === dir));
  /* A leftover directory is the expected residue of removing an entry through the
     download-json fallback, so it is a warning pointing at prune — not a failure. */
  if (orphanDirs.length) {
    console.log(`  ! ${orphanDirs.length} orphaned shot director${orphanDirs.length === 1 ? 'y' : 'ies'}`
      + ` (left by a removed entry) — clear with: npm run prune -- --yes`);
    orphanDirs.forEach((d) => console.log(`      vault/shots/${d}`));
  } else {
    check('no orphaned shot directories', true,
      `${shotDirs.length} dirs, ${referenced.size} files referenced`);
  }

  // 3. Anything added before today has had time to be captured. Missing shots
  //    there means the Action failed or the paths were lost — flag, don't pass.
  const stale = sites.filter((e) => e.added < today && !(e.shots?.full && e.shots?.hero && e.shots?.mobile));
  check('every entry older than today has all three shots', stale.length === 0,
    stale.length ? stale.map((e) => `${e.id} (added ${e.added})`).join(', ') : 'none pending');

  const awaiting = sites.filter((e) => e.added >= today && !e.shots?.full);
  if (awaiting.length) {
    console.log(`  · ${awaiting.length} added today still awaiting capture (not a failure): ${awaiting.map((e) => e.id).join(', ')}`);
  }
}

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 1100 } });
const page = await ctx.newPage();

const errors = [];
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
page.on('requestfailed', (r) => errors.push(`requestfailed: ${r.url()} — ${r.failure()?.errorText}`));

try {
  await page.goto(URL_BASE, { waitUntil: 'networkidle', timeout: 20_000 });
} catch {
  console.error(`\n✗ could not reach ${URL_BASE} — is \`npm run vault\` running?\n`);
  await browser.close();
  process.exit(1);
}
await page.waitForTimeout(1000);

console.log('\ngrid');
const cards = await page.locator('.card').count();
check('cards render', cards > 0, `${cards} cards`);
check('filter chips render', (await page.locator('.chip').count()) > 0);
check('count is populated', (await page.locator('#count').textContent()).trim().length > 0);

// Every card that should have a preview actually renders a loaded image.
const withShots = JSON.parse(readFileSync(join(VAULT, 'sites.json'), 'utf8'))
  .filter((e) => e.shots?.hero).length;
check('every entry with a hero shot renders a preview',
  (await page.locator('.card-shot img').count()) === withShots,
  `${await page.locator('.card-shot img').count()} previews / ${withShots} expected`);
check('every preview image actually loaded',
  await page.locator('.card-shot img').evaluateAll((imgs) =>
    imgs.length > 0 && imgs.every((i) => i.complete && i.naturalWidth > 0)));
check('no card shows "no shots yet" for an entry that has them',
  (await page.locator('.card-shot--empty').count()) ===
    (JSON.parse(readFileSync(join(VAULT, 'sites.json'), 'utf8')).length - withShots));
await shot(page, 'gallery-grid', { fullPage: true });

console.log('\ncomposition category');
check('composition filter row renders with all 9 tags',
  (await page.locator('#filters .filter-cat').filter({ hasText: 'composition' })
    .locator('.chip').count()) >= 9);
check('composition is the first filter row',
  (await page.locator('#filters .filter-cat').first().locator('.label').first().textContent())
    .trim() === 'composition');

console.log('\ndialect fields');
check('dialect status filter row renders',
  (await page.locator('#dialect-filters .chip').count()) >= 4);
const marks = await page.locator('.card .status-mark').count();
console.log(`  · ${marks} reviewed entries carry a status mark (0 is correct when all are unreviewed)`);

console.log('\nfiltering');
const firstChip = page.locator('.chip').first();
const chipName = (await firstChip.textContent()).trim();
await firstChip.click();
await page.waitForTimeout(300);
const filtered = await page.locator('.card').count();
check(`chip "${chipName}" narrows the set`, filtered <= cards, `${filtered} of ${cards}`);
await firstChip.click();
await page.waitForTimeout(250);
check('chip toggles back off', (await page.locator('.card').count()) === cards);

await page.fill('#search', 'zzzznomatch');
await page.waitForTimeout(300);
check('search with no match shows the empty state', await page.locator('#empty').isVisible());
await page.fill('#search', '');
await page.waitForTimeout(250);

console.log('\ndetail');
await page.locator('.card').first().click();
await page.waitForTimeout(700);
check('detail opens', await page.locator('#detail').isVisible());
check('spec plate has rows', (await page.locator('#detail .plate dt').count()) >= 6);
check('plate shows dialect + review rows',
  (await page.locator('#detail .plate dt').allTextContents())
    .map((t) => t.trim().toLowerCase()).includes('review'));
check('edit form has a dialectStatus selector',
  (await page.locator('#detail [data-field="dialectStatus"] input[type=radio]').count()) >= 4);
check('edit form has a dialects multi-pick',
  (await page.locator('#detail [data-field="dialects"] input[type=checkbox]').count()) >= 1);
check('edit form has tag checkboxes', (await page.locator('#detail .check input[type=checkbox]').count()) > 0);
check('edit form has a composition tag group',
  (await page.locator('#detail [data-cat="composition"] input[type=checkbox]').count()) >= 9);
check('edit form has a note field', (await page.locator('#detail textarea').count()) === 1);
check('edit form has a title field', (await page.locator('#detail input[type=text]').count()) >= 1);
await shot(page, 'gallery-detail');
await page.keyboard.press('Escape');
await page.waitForTimeout(300);
check('esc closes detail', !(await page.locator('#detail').isVisible()));

console.log('\nadd');
await page.click('#open-add');
await page.waitForTimeout(500);
check('add sheet opens', await page.locator('#add').isVisible());
await shot(page, 'gallery-add');
await page.keyboard.press('Escape');

/* ── real mobile matrix ───────────────────────────────────────────────────
   Not a narrow desktop viewport: actual device descriptors on both engines.
   WebKit is the one that matters — a desktop-Chromium-only pass hid a
   SecurityError on localStorage that blanked the page in Safari private mode. */
const MOBILE_MATRIX = [
  { name: 'WebKit · iPhone 13', engine: webkit, device: 'iPhone 13' },
  { name: 'WebKit · iPhone SE', engine: webkit, device: 'iPhone SE' },
  { name: 'Chrome · Pixel 5', engine: chromium, device: 'Pixel 5' },
];

for (const profile of MOBILE_MATRIX) {
  console.log(`\nmobile · ${profile.name}`);
  const mb = await profile.engine.launch();
  const mctx = await mb.newContext({ ...devices[profile.device] });
  const mp = await mctx.newPage();
  const mErrs = [];
  mp.on('pageerror', (e) => mErrs.push(String(e.message || e)));
  mp.on('console', (m) => { if (m.type() === 'error') mErrs.push(m.text()); });

  try {
    await mp.goto(URL_BASE, { waitUntil: 'domcontentloaded', timeout: 25_000 });
    await mp.waitForSelector('.card', { timeout: 12_000 });
  } catch { /* asserted below */ }
  await mp.waitForTimeout(900);

  const cards = await mp.locator('.card').count();
  check(`${profile.name}: page loads and renders cards`, cards > 0, `${cards} cards`);
  check(`${profile.name}: no horizontal overflow`,
    !(await mp.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1)));

  // Single column: every card shares the same left edge.
  const lefts = await mp.locator('.card').evaluateAll((els) =>
    [...new Set(els.map((e) => Math.round(e.getBoundingClientRect().left)))]);
  check(`${profile.name}: cards are a single column`, lefts.length <= 1, `${lefts.length} distinct left edges`);

  // Chips wrap onto multiple rows rather than overflowing their row.
  const chipRows = await mp.locator('#filters .chip').evaluateAll((els) =>
    [...new Set(els.map((e) => Math.round(e.getBoundingClientRect().top)))].length);
  check(`${profile.name}: filter chips wrap`, chipRows > 1, `${chipRows} rows`);

  const tooSmall = await mp.evaluate(() => {
    const out = [];
    for (const el of document.querySelectorAll('.btn, .chip, .search')) {
      const r = el.getBoundingClientRect();
      if (r.height > 0 && r.height < 44) out.push(`${el.className}:${Math.round(r.height)}`);
    }
    return out;
  });
  check(`${profile.name}: tap targets ≥44px`, tooSmall.length === 0, tooSmall.slice(0, 3).join(' ') || 'all pass');

  // Detail view has to be usable, not just present.
  await mp.locator('.card').first().click();
  await mp.waitForTimeout(800);
  check(`${profile.name}: detail view opens`, await mp.locator('#detail').isVisible());
  check(`${profile.name}: detail has no horizontal overflow`,
    !(await mp.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1)));
  check(`${profile.name}: remove-from-vault reachable`,
    (await mp.locator('#detail .btn--danger').count()) >= 1);
  await mp.keyboard.press('Escape');
  await mp.waitForTimeout(300);

  /* The exact user reproduction: type a URL, tap Save, with no stored token.
     This used to do nothing at all. */
  await mp.click('#open-add');
  await mp.waitForTimeout(500);
  await mp.fill('#add-url', 'example.com/mobile-smoke');
  await mp.locator('#add-form button[type="submit"]').click();
  await mp.waitForTimeout(1000);
  check(`${profile.name}: Save with no token shows the choice dialog`,
    await mp.locator('#token').isVisible());
  check(`${profile.name}: the choice offers download as well as token`,
    (await mp.locator('#token-download').isVisible())
    && (await mp.locator('#token-input').isVisible()));
  check(`${profile.name}: Save produced a visible message`, await mp.locator('#toast').isVisible());

  check(`${profile.name}: no page errors`, mErrs.length === 0, mErrs.slice(0, 2).join(' | ') || 'clean');
  if (profile.device === 'iPhone 13') await shot(mp, 'gallery-mobile', { fullPage: true });
  await mb.close();
}

/* Storage blocked, as in Safari private browsing: the page must still work. */
console.log('\nmobile · WebKit · iPhone 13 · storage blocked');
{
  const pb = await webkit.launch();
  const pctx = await pb.newContext({ ...devices['iPhone 13'] });
  await pctx.addInitScript(() => {
    const boom = () => { throw new DOMException('The operation is insecure.', 'SecurityError'); };
    Object.defineProperty(window, 'localStorage', {
      configurable: true,
      get() { return { getItem: boom, setItem: boom, removeItem: boom, clear: boom }; },
    });
  });
  const pp = await pctx.newPage();
  const pErrs = [];
  pp.on('pageerror', (e) => pErrs.push(String(e.message || e)));
  try {
    await pp.goto(URL_BASE, { waitUntil: 'domcontentloaded', timeout: 25_000 });
    await pp.waitForSelector('.card', { timeout: 12_000 });
  } catch { /* asserted below */ }
  await pp.waitForTimeout(700);
  check('private browsing: page still renders cards', (await pp.locator('.card').count()) > 0);
  check('private browsing: no uncaught SecurityError', pErrs.length === 0, pErrs.slice(0, 2).join(' | ') || 'clean');
  await pb.close();
}

/* api.github.com unreachable must never block first paint. */
console.log('\nmobile · WebKit · iPhone 13 · api.github.com hanging');
{
  const hb = await webkit.launch();
  const hctx = await hb.newContext({ ...devices['iPhone 13'] });
  await hctx.route('https://api.github.com/**', async () => {
    await new Promise((r) => setTimeout(r, 60_000));      // never resolves in time
  });
  const hp = await hctx.newPage();
  try {
    await hp.goto(URL_BASE, { waitUntil: 'domcontentloaded', timeout: 25_000 });
    await hp.waitForSelector('.card', { timeout: 12_000 });
  } catch { /* asserted below */ }
  check('hanging GitHub API does not block first paint', (await hp.locator('.card').count()) > 0);
  await hb.close();
}

console.log('\nconsole / network');
check('no console or network errors', errors.length === 0, errors.length ? errors.join(' | ') : 'clean');

await browser.close();

if (problems.length) {
  console.error(`\n✗ ${problems.length} problem${problems.length === 1 ? '' : 's'}: ${problems.join(', ')}\n`);
  process.exit(1);
}
console.log('\n✓ gallery is healthy\n');

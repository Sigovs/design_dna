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

import { chromium } from 'playwright';

const URL_BASE = process.env.VAULT_URL || 'http://localhost:5177/';
const OUT = process.argv[2] || null;
const shot = async (page, name, opts = {}) =>
  OUT && page.screenshot({ path: `${OUT}/${name}.jpg`, type: 'jpeg', quality: 85, ...opts });

const problems = [];
const check = (label, ok, detail = '') => {
  console.log(`${ok ? '  ✓' : '  ✗'} ${label}${detail ? ` — ${detail}` : ''}`);
  if (!ok) problems.push(label);
};

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
await shot(page, 'gallery-grid', { fullPage: true });

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

console.log('\nmobile · 390w');
const m = await browser.newContext({ viewport: { width: 390, height: 900 } });
const mp = await m.newPage();
await mp.goto(URL_BASE, { waitUntil: 'networkidle' });
await mp.waitForTimeout(900);
const overflow = await mp.evaluate(() =>
  document.documentElement.scrollWidth > window.innerWidth + 1);
check('no horizontal page scroll', !overflow);
check('cards render on mobile', (await mp.locator('.card').count()) > 0);
await shot(mp, 'gallery-mobile', { fullPage: true });

console.log('\nconsole / network');
check('no console or network errors', errors.length === 0, errors.length ? errors.join(' | ') : 'clean');

await browser.close();

if (problems.length) {
  console.error(`\n✗ ${problems.length} problem${problems.length === 1 ? '' : 's'}: ${problems.join(', ')}\n`);
  process.exit(1);
}
console.log('\n✓ gallery is healthy\n');

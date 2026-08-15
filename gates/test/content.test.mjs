#!/usr/bin/env node
/* Regression tests for the content-provenance gate.
 *
 *   npm run test:content
 *
 * The failure being defended against: four asking prices — $2,900,212,
 * $1,600,212, $1,100,212, $900,212 — and eleven commercial promises shipped on
 * a homepage for a business that has to honour them. None was ever marked
 * false, because none was ever recorded. So the mechanism is COVERAGE, and the
 * first test here is that an absent ledger fails as hard as a lying one.
 */
import { chromium } from 'playwright';
import { CLASSES, HARVEST, validate, BANNED_SOURCE, BANNED_TYPE, STATUS } from '../content.mjs';

let failures = 0;
const ok = (s) => console.log(`\x1b[32m✓\x1b[0m ${s}`);
const bad = (s) => { console.log(`\x1b[31m✗\x1b[0m ${s}`); failures++; };
const check = (cond, msg) => (cond ? ok(msg) : bad(msg));

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const classes = CLASSES.map(([n, r]) => [n, { source: r.source, flags: r.flags }]);
const harvestHTML = async (html) => {
  await page.setContent(`<!doctype html><meta charset="utf-8"><body style="font:16px system-ui">${html}</body>`, { waitUntil: 'load' });
  return page.evaluate(HARVEST, classes);
};

/* ── the classes catch what actually shipped ──────────────────────────────── */
const REAL = `
  <p>2021 Koenigsegg Regera — <strong>$2,900,212</strong>, 2,055 mi</p>
  <p>Same-day appraisal, no listing fees, no commissions. Zero-risk.</p>
  <p>Paid within two business days. Remaining factory warranty and the service that goes with them.</p>
  <p>Delivered anywhere in the country. Nationwide. Exotic and collector cars since 2003.</p>
  <p>More than 30,000 vehicles placed — the best in the Midwest.</p>`;
const hits = await harvestHTML(REAL);
const got = new Set(hits.map((h) => h.class));
for (const want of ['currency', 'grouped-number', 'year', 'duration', 'same-day', 'no-fee',
  'no-commission', 'zero-risk', 'warranty-benefit', 'service-coverage', 'delivery', 'superlative']) {
  check(got.has(want), `catches claim class ${want}`);
}
check(hits.some((h) => h.text === '$2,900,212'), `catches the exact fabricated price $2,900,212`);

/* ── an absent ledger is the failure, not an exemption ────────────────────── */
const none = validate({ hits, ledger: null });
check(none.verdict === 'fail' && none.reason === 'no content ledger exists',
  `NO LEDGER fails outright — ${none.problems[0]}`);
check(validate({ hits: [], ledger: null }).verdict === 'fail',
  `a page with no claims still fails without a ledger — the artefact must exist`);

/* ── coverage: a claim you forgot to enter fails like one you entered falsely ─ */
const partial = validate({
  hits,
  ledger: { claims: [{ id: 'c1', claim: '$2,900,212', status: 'verified', source: 'dealer inventory export 2026-08-10', sourceType: 'client-data' }] },
});
check(partial.verdict === 'fail' && partial.counts.uncovered > 0,
  `one covered claim does not cover the rest — ${partial.counts.uncovered} uncovered`);
check(partial.problems.some((p) => p.includes('no listing fees')),
  `an unentered promise is reported by name`);

/* ── blocking statuses ────────────────────────────────────────────────────── */
for (const status of ['unsupported', 'fabricated']) {
  const v = validate({ hits: [], ledger: { claims: [{ id: 'x', claim: 'Same-day', status, source: 'n/a' }] } });
  check(v.verdict === 'fail' && v.problems.some((p) => p.includes(status.toUpperCase())),
    `status "${status}" blocks the gate`);
}
check(validate({ hits: [], ledger: { claims: [{ id: 'x', claim: 'a', status: 'probably fine', source: 'b' }] } })
  .problems.some((p) => p.includes('not one of')),
  `an invented status is rejected (valid: ${STATUS.join(' | ')})`);

/* ── a prior concept is not a source ──────────────────────────────────────── */
const BANNED = ['index3.html', './index2.html', 'projects/fixtures/cmc-index3-conventional/index3.html',
  'CONCEPT-4-READ.md', 'docs/DESIGN-READ.md', 'the design read'];
for (const src of BANNED) {
  check(BANNED_SOURCE.test(src), `banned source pattern catches "${src}"`);
}
check(!BANNED_SOURCE.test('client/inventory-export-2026-08-10.csv'),
  `a real source is not caught by the banned pattern`);
for (const t of BANNED_TYPE) {
  const v = validate({ hits: [], ledger: { claims: [{ id: 'x', claim: 'a', status: 'verified', source: 'somewhere', sourceType: t }] } });
  check(v.verdict === 'fail', `banned sourceType "${t}" blocks the gate`);
}

/* ── a dated figure must be visibly dated in the render ───────────────────── */
const undated = await harvestHTML(`<p>301 vehicles in stock</p>`);
const vUndated = validate({
  hits: undated,
  ledger: { claims: [{ id: 'n', claim: '301 vehicles in stock', status: 'dated-requires-reconciliation', captureDate: '2026-08-10', source: 'live site capture' }] },
});
check(vUndated.problems.some((p) => p.includes('not visibly dated')),
  `a dated figure with no date on screen is rejected`);
const dated = await harvestHTML(`<p>301 vehicles in stock as of 10 Aug 2026</p>`);
const vDated = validate({
  hits: dated,
  ledger: { claims: [{ id: 'n', claim: '301 vehicles in stock as of 10 Aug 2026', status: 'dated-requires-reconciliation', captureDate: '2026-08-10', source: 'live site capture' }] },
});
check(vDated.verdict === 'pass', `the same figure passes once the render carries its date`);
check(validate({ hits: [], ledger: { claims: [{ id: 'n', claim: 'a', status: 'dated-requires-reconciliation', source: 's' }] } })
  .problems.some((p) => p.includes('no captureDate')),
  `a dated status with no captureDate is rejected`);

/* ── provenance-pending is a private-build allowance, not a licence ───────── */
const pending = { claims: [{ id: 'p', claim: 'x', status: 'provenance-pending', source: 'client folder', safeForPrivate: true }] };
check(validate({ hits: [], ledger: pending, build: { private: true } }).verdict === 'pass',
  `provenance-pending clears a private build when explicitly marked safe`);
check(validate({ hits: [], ledger: pending, build: { private: false } }).verdict === 'fail',
  `the same entry fails a public build`);
check(validate({ hits: [], ledger: { claims: [{ id: 'p', claim: 'x', status: 'provenance-pending', source: 's' }] }, build: { private: true } }).verdict === 'fail',
  `provenance-pending without safeForPrivate fails even privately`);

/* ── a fully covered, fully sourced page passes ───────────────────────────── */
const clean = await harvestHTML(`<p>Exotic and collector cars since 2003.</p>`);
check(validate({
  hits: clean,
  ledger: { claims: [{ id: 'y', claim: 'Exotic and collector cars since 2003.', status: 'verified', source: 'client brand brief', sourceType: 'client-data' }] },
}).verdict === 'pass', `a fully covered page with real sources passes`);

/* ── invisible text is not a claim ────────────────────────────────────────── */
const hidden = await harvestHTML(`<p style="display:none">$9,999,999</p><p>visible</p>`);
check(!hidden.some((h) => h.text.includes('9,999,999')),
  `a claim in a display:none element is not harvested`);

await browser.close();
console.log(failures === 0
  ? `\n\x1b[32m✓ content gate — coverage holds, and an absent ledger still fails\x1b[0m\n`
  : `\n\x1b[31m✗ ${failures} content regression(s)\x1b[0m\n`);
process.exit(failures === 0 ? 0 : 1);

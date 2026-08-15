#!/usr/bin/env node
/* Regression tests for the structural detector.
 *
 *   npm run test:structure
 *
 * The failure being defended against: a page with four equal vehicle modules
 * shipped past a review that reported `cards: 0`, because nothing on it carried
 * a card class, a border radius or an explicit border. So every case here is
 * built to be invisible to a class-name detector, and the detector is required
 * to find it anyway — by rendered geometry.
 *
 * The wrapper cases are the point. Four modules wrapped in one extra div, in
 * two nested divs, in a <ul>/<li>, or split across two parent elements are the
 * same four modules. If a future change lets any of them through, a page can
 * evade Gate 2 by editing its DOM nesting and changing nothing a reader sees.
 */
import { chromium } from 'playwright';
import { EXTRACTOR, findings } from '../structure.mjs';

let failures = 0;
const ok = (s) => console.log(`\x1b[32m✓\x1b[0m ${s}`);
const bad = (s) => { console.log(`\x1b[31m✗\x1b[0m ${s}`); failures++; };
const check = (cond, msg) => (cond ? ok(msg) : bad(msg));

/* a module carrying no card signal whatsoever: no class hook, no radius, no
   border, no shadow, no background — just an image, a heading and a caption */
const MODULE = (n) => `
  <figure style="margin:0">
    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='260'%3E%3C/svg%3E"
         width="400" height="260" style="width:100%;height:180px;object-fit:cover;display:block">
    <h3 style="font:600 20px/1.2 system-ui;margin:12px 0 0">Vehicle ${n}</h3>
    <p style="font:400 13px/1.4 system-ui;text-transform:uppercase;margin:6px 0 0">2021 · 2,0${n}5 mi</p>
    <a href="#" style="font:400 13px/1.4 system-ui;display:inline-block;margin-top:10px">View</a>
  </figure>`;

const GRID = (inner) => `<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:24px">${inner}</div>`;
const four = [1, 2, 3, 4];

const PAGE = (body) => `<!doctype html><html><head><meta charset="utf-8">
<style>*{box-sizing:border-box}body{margin:0;font:16px system-ui}main>*{padding:64px 40px}</style>
</head><body><main>${body}</main></body></html>`;

const CASES = [
  {
    name: 'bare four-up grid, no card signals at all',
    body: `<section>${GRID(four.map(MODULE).join(''))}</section>`,
    expectUnits: 4,
  },
  {
    name: 'EVASION — each module wrapped in one extra div',
    body: `<section>${GRID(four.map((n) => `<div>${MODULE(n)}</div>`).join(''))}</section>`,
    expectUnits: 4,
  },
  {
    name: 'EVASION — each module wrapped in two nested divs',
    body: `<section>${GRID(four.map((n) => `<div><div>${MODULE(n)}</div></div>`).join(''))}</section>`,
    expectUnits: 4,
  },
  {
    name: 'EVASION — modules as <li> inside a reset <ul>',
    body: `<section><ul style="display:grid;grid-template-columns:repeat(4,1fr);gap:24px;list-style:none;margin:0;padding:0">${
      four.map((n) => `<li>${MODULE(n)}</li>`).join('')}</ul></section>`,
    expectUnits: 4,
  },
  {
    name: 'EVASION — modules split across two sibling wrappers in one grid',
    body: `<section><div style="display:grid;grid-template-columns:repeat(4,1fr);gap:24px">
      <div style="display:contents"><div>${MODULE(1)}</div><div>${MODULE(2)}</div></div>
      <div style="display:contents"><div>${MODULE(3)}</div><div>${MODULE(4)}</div></div>
    </div></section>`,
    expectUnits: 4,
  },
  {
    name: 'EVASION — flex with equal basis instead of grid',
    body: `<section><div style="display:flex;gap:24px">${
      four.map((n) => `<div style="flex:1 1 0;min-width:0">${MODULE(n)}</div>`).join('')}</div></section>`,
    expectUnits: 4,
  },
  {
    name: 'CONTROL — genuinely unequal widths are not parallel units',
    body: `<section><div style="display:grid;grid-template-columns:3fr 1fr;gap:24px">
      <div>${MODULE(1)}</div><div>${MODULE(2)}</div></div></section>`,
    expectUnits: 0,
  },
  {
    name: 'CONTROL — a single full-width mass is not a repeat',
    body: `<section><div>${MODULE(1)}</div></section>`,
    expectUnits: 0,
  },
  {
    name: 'CONTROL — repeated width with no formula is not a finding',
    body: `<section><div style="display:grid;grid-template-columns:repeat(4,1fr);gap:24px">${
      four.map(() => `<div style="height:200px"><span style="font:16px system-ui">plain</span></div>`).join('')}</div></section>`,
    expectUnits: 0,
    why: 'a grid system repeats widths on every page ever laid out on one',
  },
];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

for (const c of CASES) {
  await page.setContent(PAGE(c.body), { waitUntil: 'load' });
  const report = await page.evaluate(EXTRACTOR);
  const f = findings(report);
  const units = Math.max(0, ...f.filter((x) => x.kind === 'parallel-units').map((x) => x.units));
  check(units === c.expectUnits,
    `${c.name} → ${units} parallel units, expected ${c.expectUnits}${c.why ? ` (${c.why})` : ''}`);
}

/* the two shapes that matter must survive a wrapper change identically */
const shapeOf = async (body) => {
  await page.setContent(PAGE(body), { waitUntil: 'load' });
  const f = findings(await page.evaluate(EXTRACTOR));
  return f.filter((x) => x.kind === 'parallel-units').map((x) => x.shape).sort().join(' ');
};
const bare = await shapeOf(`<section>${GRID(four.map(MODULE).join(''))}</section>`);
const wrapped = await shapeOf(`<section>${GRID(four.map((n) => `<div><div>${MODULE(n)}</div></div>`).join(''))}</section>`);
check(bare === wrapped && bare.length > 0,
  `wrapping does not change the reported formula (${bare || 'EMPTY'})`);

/* two sections sharing one formula must be reported as a repeated shape */
await page.setContent(PAGE(
  `<section>${GRID(four.map(MODULE).join(''))}</section>` +
  `<section>${GRID(four.map(MODULE).join(''))}</section>`), { waitUntil: 'load' });
const rep = findings(await page.evaluate(EXTRACTOR)).filter((x) => x.kind === 'repeated-shape');
check(rep.length > 0 && rep[0].sections.length >= 2,
  `one formula used in two sections is reported as a repeated shape`);

/* nothing the detector emits may arrive already disposed of */
const all = findings(await page.evaluate(EXTRACTOR));
check(all.every((x) => x.disposition === null),
  `every finding arrives undisposed — the detector never clears itself`);

/* the detector's own limits, asserted so they cannot be quietly forgotten */
await page.setContent(PAGE(`<section style="position:relative;height:700px">${
  four.map((n) => `<div style="position:absolute;top:0;left:${n * 24}%;width:22%">${MODULE(n)}</div>`).join('')}</section>`),
  { waitUntil: 'load' });
const abs = findings(await page.evaluate(EXTRACTOR)).filter((x) => x.kind === 'parallel-units');
console.log(abs.length
  ? `\x1b[2m  note: absolutely-positioned repeats were caught this time (${abs[0].units} units) — not guaranteed\x1b[0m`
  : `\x1b[2m  note: absolutely-positioned repeats evaded the detector, as documented. This is why Gate 2\n        also requires a full-page screenshot and a human section-by-section inventory.\x1b[0m`);

await browser.close();
console.log(failures === 0
  ? `\n\x1b[32m✓ structure detector — ${CASES.length} cases, every wrapper evasion still caught\x1b[0m\n`
  : `\n\x1b[31m✗ ${failures} structural regression(s)\x1b[0m\n`);
process.exit(failures === 0 ? 0 : 1);

#!/usr/bin/env node
/* Regression tests for the A1 instrument.
 *
 *   npm run test:a1
 *
 * The defect being defended against: A1 was measured as the tallest media
 * element on the first screen, so a composed system of car, record, claim and
 * graduated field scored 35% while a stock video stretched edge to edge scored
 * 100%. The rule was right and the instrument was measuring something else.
 *
 * These tests hold the three numbers apart — mediaCoverage, eventCoverage,
 * competition — and hold the declaration honest, because the whole model
 * depends on the declaration being a real decomposition rather than one
 * full-viewport wrapper with a name.
 */
import { chromium } from 'playwright';
import { EXTRACT, evaluate, unionArea, boundedEdges, DEFAULT_FLOOR, COMPETITION_LIMIT } from '../event.mjs';

let failures = 0;
const ok = (s) => console.log(`\x1b[32m✓\x1b[0m ${s}`);
const bad = (s) => { console.log(`\x1b[31m✗\x1b[0m ${s}`); failures++; };
const check = (cond, msg) => (cond ? ok(msg) : bad(msg));

/* ── the geometry primitives ──────────────────────────────────────────────── */
check(unionArea([{ x: 0, y: 0, w: 10, h: 10 }, { x: 5, y: 0, w: 10, h: 10 }]) === 150,
  `unionArea does not double-count overlap (150, not 200)`);
check(unionArea([{ x: 0, y: 0, w: 10, h: 10 }, { x: 2, y: 2, w: 4, h: 4 }]) === 100,
  `a rect fully inside another adds nothing`);
check(unionArea([]) === 0, `no rects is no area`);

const masses = [
  { x: 0, y: 0, w: 100, h: 100 },     /* left of the gap  */
  { x: 200, y: 0, w: 100, h: 100 },   /* right of the gap */
  { x: 0, y: 200, w: 300, h: 50 },    /* under the gap    */
];
check(boundedEdges({ x: 100, y: 0, w: 100, h: 200 }, masses).sort().join() === 'bottom,left,right',
  `a gap between three masses is bounded on three sides`);
check(boundedEdges({ x: 600, y: 600, w: 100, h: 100 }, masses).length === 0,
  `blank space far from every mass is bounded on none`);

/* ── the page-level cases ─────────────────────────────────────────────────── */
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 800 } });
const VA = 1200 * 800;

const PAGE = (body, css = '') => `<!doctype html><html><head><meta charset="utf-8"><style>
  *,*::before,*::after{box-sizing:border-box} html,body{margin:0;height:100%}
  body{font:16px system-ui;background:#eee}
  .bar{position:absolute;inset:0 0 auto 0;height:80px;z-index:9;background:#111;color:#fff}
  ${css}</style></head><body><header class="bar">nav</header>${body}</body></html>`;

const IMG = (w, h) => `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'%3E%3C/svg%3E`;

const run = async (html, decl) => {
  await page.setContent(html, { waitUntil: 'load' });
  return evaluate(await page.evaluate(EXTRACT, decl), decl);
};

const CHROME = [{ selector: '.bar', why: 'persistent nav' }];

/* 1 · low media, composed event → PASS. The case the old instrument failed. */
const composed = await run(PAGE(`
  <section class="stage">
    <div class="field"></div>
    <div class="claim"><h1>Headline</h1><p>Lead</p></div>
    <p class="cta"><a href="#">Act</a></p>
    <figure class="subject"><img src="${IMG(400, 160)}" width="400" height="160" alt=""></figure>
    <dl class="record"><dt>Record</dt><dd>Value</dd></dl>
  </section>`, `
  .stage{position:relative;height:calc(100% - 80px);top:80px}
  .field{position:absolute;inset:0;background:linear-gradient(#333,#ddd)}
  .claim{position:absolute;left:60px;top:40px;width:360px;height:220px;color:#fff}
  .cta{position:absolute;left:60px;top:290px;margin:0}
  .subject{position:absolute;right:80px;bottom:180px;width:400px;margin:0}
  .subject img{display:block;width:100%;height:auto}
  .record{position:absolute;left:60px;right:60px;bottom:40px;margin:0;height:60px}`), {
  components: [
    { role: 'field', selector: '.field' }, { role: 'subject', selector: '.subject' },
    { role: 'identity', selector: '.claim' }, { role: 'cta', selector: '.cta' },
    { role: 'support', selector: '.record' },
  ], excluded: CHROME,
});
check(composed.verdict === 'pass', `low media + composed event passes${composed.verdict === 'pass' ? '' : ' — ' + composed.problems[0]}`);
check(composed.metrics.mediaCoverage < 0.12,
  `…and its media coverage is only ${(composed.metrics.mediaCoverage * 100).toFixed(0)}%, which no longer decides anything`);
check(composed.metrics.eventCoverage >= DEFAULT_FLOOR, `…while its eventCoverage is ${(composed.metrics.eventCoverage * 100).toFixed(0)}%`);

/* 2 · full-bleed photograph, two independent events → FAIL on competition */
const twoEvents = await run(PAGE(`
  <section class="screen">
    <div class="plate"><img src="${IMG(1600, 900)}" alt=""></div>
    <div class="ev" id="a"><h2>Event A</h2><figure id="sa"><img src="${IMG(400, 150)}" alt=""></figure><a href="#">Act A</a></div>
    <div class="ev" id="b"><h2>Event B</h2><figure><img src="${IMG(400, 150)}" alt=""></figure><a href="#">Act B</a></div>
  </section>`, `
  .screen{position:relative;height:100%}
  .plate{position:absolute;inset:0}.plate img{width:100%;height:100%;object-fit:cover;display:block}
  .ev{position:absolute;top:80px;bottom:0;width:50%;padding:60px}
  #a{left:0}#b{right:0}
  .ev figure{margin:0;width:80%}.ev figure img{width:100%;height:auto;display:block}`), {
  components: [
    { role: 'field', selector: '.plate' }, { role: 'subject', selector: '#sa' },
    { role: 'identity', selector: '#a h2' }, { role: 'cta', selector: '#a a' },
  ], excluded: CHROME,
});
check(twoEvents.metrics.mediaCoverage > 0.98, `two-event page still has ${(twoEvents.metrics.mediaCoverage * 100).toFixed(0)}% media coverage`);
check(twoEvents.metrics.eventCoverage >= DEFAULT_FLOOR, `…and clears the coverage floor`);
check(twoEvents.verdict === 'fail' && twoEvents.problems.some((p) => p.includes('comparable rank')),
  `…and fails anyway, on competition — full coverage is not ownership`);
check(twoEvents.metrics.competitionRatio >= COMPETITION_LIMIT,
  `competition ratio ${twoEvents.metrics.competitionRatio} is at or above the limit`);

/* 3 · a wrapper is not a declaration */
const wrapperOnly = await run(PAGE(`<section class="hero"><img src="${IMG(1600, 900)}" alt=""></section>`, `
  .hero{position:relative;height:100%}.hero img{width:100%;height:100%;object-fit:cover;display:block}`), {
  components: [{ role: 'field', selector: '.hero' }, { role: 'subject', selector: '.hero img' }],
  excluded: CHROME,
});
check(wrapperOnly.verdict === 'fail' && wrapperOnly.problems.some((p) => p.includes('not declared as a composed system')),
  `a single full-viewport wrapper cannot count as proof by itself`);
check(wrapperOnly.metrics.eventCoverage >= 0.99 && wrapperOnly.verdict === 'fail',
  `…even at ${(wrapperOnly.metrics.eventCoverage * 100).toFixed(0)}% coverage`);

/* 4 · no subject declared */
const noSubject = await run(PAGE(`<section class="s"><div class="a">A</div><div class="b">B</div></section>`, `
  .s{position:relative;height:100%}.a{position:absolute;left:0;top:80px;width:50%;height:400px}
  .b{position:absolute;right:0;top:80px;width:40%;height:300px}`), {
  components: [{ role: 'identity', selector: '.a' }, { role: 'support', selector: '.b' }],
  excluded: CHROME,
});
check(noSubject.problems.some((p) => p.includes('no primary subject')),
  `an event with no declared subject is not an event`);

/* 5 · blank viewport cannot be annexed to reach the floor */
const annexed = await run(PAGE(`
  <section class="s"><div class="sub"><img src="${IMG(300,200)}" alt=""></div><h1 class="h">Title</h1></section>`, `
  .s{position:relative;height:100%}
  .sub{position:absolute;left:60px;top:120px;width:300px}.sub img{width:100%;height:auto;display:block}
  .h{position:absolute;left:60px;top:360px;margin:0}`), {
  components: [
    { role: 'subject', selector: '.sub' }, { role: 'identity', selector: '.h' },
    /* a huge empty rectangle over the right half, touching nothing */
    { role: 'negative-space', rect: { x: 0.45, y: 0.1, w: 0.5, h: 0.8 }, function: 'directional air' },
  ], excluded: CHROME,
});
check(annexed.negativeSpace[0].counted === false && annexed.problems.some((p) => p.includes('cannot be added to reach the floor')),
  `unbounded blank area is refused — it is not reserved space, it is empty screen`);

/* 6 · a reserved region with an invented function is refused */
const badFunction = await run(PAGE(`<section class="s"><div class="sub"><img src="${IMG(300,200)}" alt=""></div><h1 class="h">T</h1></section>`, `
  .s{position:relative;height:100%}.sub{position:absolute;left:60px;top:120px;width:300px}
  .sub img{width:100%;height:auto;display:block}.h{position:absolute;left:60px;top:360px;margin:0}`), {
  components: [
    { role: 'subject', selector: '.sub' }, { role: 'identity', selector: '.h' },
    { role: 'negative-space', rect: { x: 0.4, y: 0.2, w: 0.2, h: 0.3 }, function: 'looks nice' },
  ], excluded: CHROME,
});
check(badFunction.problems.some((p) => p.includes('is not one of')),
  `reserved space must be reserved for a named function`);

/* 7 · a component that matches nothing is reported, not ignored */
const missing = await run(PAGE(`<section class="s"><div class="sub"><img src="${IMG(300,200)}" alt=""></div><h1 class="h">T</h1></section>`, `
  .s{position:relative;height:100%}.sub{position:absolute;left:60px;top:120px;width:300px}
  .sub img{width:100%;height:auto;display:block}.h{position:absolute;left:60px;top:360px;margin:0}`), {
  components: [
    { role: 'subject', selector: '.sub' }, { role: 'identity', selector: '.h' },
    { role: 'support', selector: '.does-not-exist' },
  ], excluded: CHROME,
});
check(missing.problems.some((p) => p.includes('matched nothing in the render')),
  `a declared component that is not in the render is a failure, not a silent zero`);

/* 8 · the three numbers really are independent */
check(composed.metrics.mediaCoverage < twoEvents.metrics.mediaCoverage
  && composed.verdict === 'pass' && twoEvents.verdict === 'fail',
  `the page with less media passes and the page with more media fails — the defect is gone`);

/* 9 · chrome is neither part of the event nor counted against it */
check(composed.metrics.chromeShare > 0 && composed.metrics.eventCoverage <= 1.001,
  `excluded chrome leaves coverage at or under 100% — a masthead is the frame, not a rival`);

await browser.close();
console.log(failures === 0
  ? `\n\x1b[32m✓ A1 instrument — ownership is measured, not media coverage\x1b[0m\n`
  : `\n\x1b[31m✗ ${failures} A1 regression(s)\x1b[0m\n`);
process.exit(failures === 0 ? 0 : 1);

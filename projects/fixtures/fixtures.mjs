#!/usr/bin/env node
/**
 * The regression fixtures.
 *
 *   npm run fixtures                  verify hashes, re-measure, assert every gate
 *   npm run fixtures -- --no-render   hashes and recorded verdicts only
 *
 * FOUR ARTEFACTS, FOUR WAYS OF BEING WRONG.
 *
 *   A  cmc-concept-2            the required means are absent
 *   B  cmc-concept-3            the means are present and do no work
 *   C  cmc-index2-spine         authored, and useless as a product
 *   D  cmc-index3-conventional  useful as a product, and unauthored
 *
 * A and B taught the system that hitting numbers is not designing. C and D
 * teach it the harder thing: that the correction for either one produces the
 * other. C was rejected for product failure; the page built to fix that came
 * back as D, with every banned structure restored. So Gate 2 and Gate 3 are
 * conjunctive and neither may be traded for the other.
 *
 * THE STANDING RULE: this suite is broken the moment any fixture here can pass
 * the complete chain. That is asserted explicitly at the end, and it is the
 * only assertion that matters.
 *
 * The fixtures are FROZEN COPIES, never the live project folder — Concept 3 was
 * being iterated in the same directory on the day it was taken.
 */

import { createHash } from 'node:crypto';
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, relative } from 'node:path';
import { serve } from '../../gates/lib/server.mjs';
import { measure as measureStructure } from '../../gates/structure.mjs';
import { harvest, validate as validateContent } from '../../gates/content.mjs';
import { measure as measureEvent } from '../../gates/event.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const MAN = JSON.parse(readFileSync(join(HERE, 'MANIFEST.json'), 'utf8'));
const RENDER = !process.argv.includes('--no-render');

const sha = (p) => createHash('sha256').update(readFileSync(p)).digest('hex');
const walk = (d) => readdirSync(d).flatMap((n) => { const p = join(d, n); return statSync(p).isDirectory() ? walk(p) : [p]; });
const ok = (s) => `\x1b[32m✓\x1b[0m ${s}`;
const bad = (s) => `\x1b[31m✗\x1b[0m ${s}`;
const dim = (s) => `\x1b[2m${s}\x1b[0m`;
let failures = 0;
const assert = (cond, msg) => { console.log(cond ? ok(msg) : bad(msg)); if (!cond) failures++; };

console.log(`\nfixtures — ${MAN.fixtures.length} frozen artefacts, generated ${MAN.generated}`);
console.log(dim(`  ${Object.entries(MAN.failureClasses || {}).map(([k, v]) => `${k}: ${v.split(' — ')[0]}`).join('   ')}\n`));

const INSTRUMENTS = MAN.a1Fixtures || [];

/* ── 1 · the artefacts have not moved ─────────────────────────────────────── */
for (const f of [...MAN.fixtures, ...INSTRUMENTS]) {
  const dir = join(HERE, f.id);
  const onDisk = walk(dir).sort().map((p) => relative(dir, p).replace(/\\/g, '/'));
  const listed = f.files.map((x) => x.path).sort();
  assert(onDisk.length === listed.length && onDisk.every((p, i) => p === listed[i]),
    `${f.id}: file list matches the manifest (${listed.length} files)`);
  const drift = f.files.filter((x) => !existsSync(join(dir, x.path)) || sha(join(dir, x.path)) !== x.sha256);
  assert(drift.length === 0,
    drift.length ? `${f.id}: ${drift.length} FILE(S) CHANGED — ${drift.map((d) => d.path).join(', ')}`
                 : `${f.id}: every file byte-identical to the frozen hash`);
}

/* ── 2 · render each fixture once, and take everything from that render ───── */
const live = {};
if (RENDER) {
  let browser, close;
  try {
    const { chromium } = await import('playwright');
    browser = await chromium.launch();
    ({ close } = await (async () => { const s = await serve(HERE); live.__origin = s.origin; return s; })());
    for (const f of [...MAN.fixtures, ...INSTRUMENTS]) {
      /* A1 is a claim about the FIRST screen, so it is measured on an unscrolled
         page at every required viewport — mobile is a separate composition and
         often needs its own component set. */
      const a1 = {};
      for (const vp of MAN.gate1Floor.viewports.map((l) => (l === 'mobile' ? { l, w: 390, h: 844 } : { l, w: 1440, h: 900 }))) {
        if (!f.a1) break;
        const p = await browser.newPage({ viewport: { width: vp.w, height: vp.h } });
        await p.goto(`${live.__origin}/${f.id}/${f.entry}`, { waitUntil: 'networkidle' });
        await p.evaluate(() => document.fonts.ready);
        await p.waitForTimeout(400);
        a1[vp.l] = await measureEvent({ page: p, decl: { ...f.a1, ...(f.a1.perViewport?.[vp.l] || {}) }, label: `${f.id}-${vp.l}` });
        await p.close();
      }

      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await page.goto(`${live.__origin}/${f.id}/${f.entry}`, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      /* scroll the whole page first: Chromium never rasterises what it never showed,
         and a lazily-decoded image is absent from the measurement otherwise */
      await page.evaluate(async () => {
        for (let y = 0; y < document.documentElement.scrollHeight; y += 400) {
          scrollTo(0, y); await new Promise((r) => setTimeout(r, 40));
        }
        scrollTo(0, 0); await new Promise((r) => setTimeout(r, 300));
      });
      const basic = await page.evaluate(() => {
        const vw = innerWidth, vh = innerHeight;
        const media = [...document.querySelectorAll('img,video,picture,canvas')]
          .filter((e) => { const r = e.getBoundingClientRect(); return r.width * r.height > 8000; });
        const sizes = [...document.querySelectorAll('*')]
          .filter((e) => e.getClientRects().length && e.textContent.trim())
          .map((e) => parseFloat(getComputedStyle(e).fontSize) || 0).filter(Boolean);
        return {
          pageHeightPx: document.documentElement.scrollHeight,
          screens: +(document.documentElement.scrollHeight / vh).toFixed(1),
          mediaTotal: media.length,
          fullBleedMedia: media.filter((e) => e.getBoundingClientRect().width >= vw - 4).length,
          largestTypePx: Math.round(Math.max(...sizes)),
          typeScaleRatio: +(Math.max(...sizes) / Math.min(...sizes)).toFixed(1),
        };
      });
      const structure = f.kind === 'instrument' ? null : await measureStructure(page);
      const hits = f.kind === 'instrument' ? null : await harvest(page);
      live[f.id] = { basic, structure, hits, a1 };
      await page.close();
    }
  } catch (e) {
    console.log(bad(`RENDER FAILED — ${e.message.split('\n')[0]}`));
    console.log(`  Every measured assertion below would otherwise silently fall back to the`);
    console.log(`  manifest's own numbers, which is a suite that cannot fail. Treated as an error.`);
    failures++;
  } finally {
    if (browser) await browser.close();
    if (close) await close();
  }
}

const rendered = (id) => (live[id] ? live[id] : null);

/* ── Gate 1 · measurable conformance, and A1 within it ────────────────────── */
console.log(`\nGate 1 · Measurable Conformance`);
console.log(dim(`  A1 — ${MAN.gate1Floor.statement}`));
console.log(dim(`  measured as: ${MAN.gate1Floor.check}`));
console.log(dim(`  superseded ${MAN.gate1Floor.supersedes.on}: ${MAN.gate1Floor.supersedes.was}`));

const a1At = (f, vp) => rendered(f.id)?.a1?.[vp] || null;
const near = (a, b, tol) => Math.abs(a - b) <= tol;
const VIEWPORTS = MAN.gate1Floor.viewports;

for (const f of MAN.fixtures) {
  const r = rendered(f.id);
  const m = r ? r.basic : f.measured;
  const src = r ? 're-measured' : 'from manifest';
  console.log(`  ${f.id} ${dim(`(${src}, ${m.screens} screens)`)}`);

  for (const vp of VIEWPORTS) {
    const a1 = a1At(f, vp);
    const want = f.a1.expect[vp];
    if (!a1 || !want) continue;
    const q = a1.metrics;
    console.log(`     ${vp.padEnd(8)} A1 ${a1.verdict === 'pass' ? '\x1b[32mpass\x1b[0m' : '\x1b[31mfail\x1b[0m'} · ` +
      `event ${(q.eventCoverage * 100).toFixed(1)}% · media ${(q.mediaCoverage * 100).toFixed(1)}% · ` +
      `competition ${(q.competitionRatio * 100).toFixed(0)}% · ${q.declaredMasses} masses`);
    for (const p of a1.problems) console.log(`       · ${p}`);
    assert(a1.verdict === want.verdict, `  ${f.id} @${vp}: A1 ${a1.verdict}, as recorded`);
    assert(near(q.eventCoverage, want.eventCoverage, 0.02),
      `  ${f.id} @${vp}: eventCoverage ${q.eventCoverage} matches the frozen ${want.eventCoverage}`);
    assert(near(q.mediaCoverage, want.mediaCoverage, 0.02),
      `  ${f.id} @${vp}: mediaCoverage ${q.mediaCoverage} matches the frozen ${want.mediaCoverage} — reported, never decisive`);
  }
  const a1 = a1At(f, 'desktop');
  const want = f.a1.expect.desktop;

  if (f.hero?.expect?.clipped) {
    for (const [vp, list] of Object.entries(f.hero.expect.clippedEdges || {})) {
      console.log(`     · hero ${vp}: subject clipped ${list.join(' + ')} on the delivered render`);
    }
    if (f.hero.expect.shotChangeInDeclaredInterval) {
      console.log(`     · hero: the declared interval is not the delivered interval — shot change inside it`);
    }
  }

  const expected = !f.expect.gate1.startsWith('fail');
  /* A1 must hold at EVERY required viewport — mobile is a separate composition */
  const a1AllPass = VIEWPORTS.every((vp) => (a1At(f, vp) || { verdict: f.a1.expect[vp]?.verdict }).verdict === 'pass');
  const gate1 = a1AllPass && !f.hero?.expect?.clipped;
  assert(gate1 === expected,
    `  ${f.id}: Gate 1 ${gate1 ? 'passes' : 'fails'} — expected ${expected ? 'pass' : 'fail'}`);
}

/* the defect that motivated the new instrument must stay fixed */
const authored = MAN.fixtures.find((f) => f.id === 'cmc-index2-spine');
const generic = MAN.fixtures.find((f) => f.id === 'cmc-index3-conventional');
const aM = a1At(authored, 'desktop')?.metrics, gM = a1At(generic, 'desktop')?.metrics;
if (aM && gM) {
  assert(aM.mediaCoverage < gM.mediaCoverage && aM.eventCoverage >= MAN.gate1Floor.floorValue,
    `  the authored fixture owns its first screen (${(aM.eventCoverage * 100).toFixed(0)}%) on ${(aM.mediaCoverage * 100).toFixed(0)}% media — the old instrument scored it 35`);
  assert(a1At(generic, 'desktop').verdict === 'pass' && generic.expect.gate1.startsWith('fail'),
    `  the generic fixture owns its first screen too, and gains nothing by it — Gate 1 still fails on the hero`);
  assert(MAN.gate1Floor.supersedes.oldNumbers['cmc-index2-spine'] === 35
    && MAN.gate1Floor.supersedes.oldNumbers['cmc-index3-conventional'] === 100,
    `  the numbers the old instrument produced stay on the record as the reason it was replaced`);
}

/* ── the A1 instrument fixtures ───────────────────────────────────────────── */
if (INSTRUMENTS.length) {
  console.log(`\nA1 instrument fixtures — the two ends of the measurement`);
  for (const f of INSTRUMENTS) {
    console.log(`  ${f.id} ${dim('— ' + f.purpose)}`);
    for (const vp of VIEWPORTS) {
      const a1 = a1At(f, vp);
      const want = f.expect[vp];
      if (!a1 || !want) { console.log(`     ${vp}: ${dim('not rendered')}`); continue; }
      const q = a1.metrics;
      console.log(`     ${vp.padEnd(8)} A1 ${a1.verdict === 'pass' ? '\x1b[32mpass\x1b[0m' : '\x1b[31mfail\x1b[0m'} · ` +
        `event ${(q.eventCoverage * 100).toFixed(0)}% · media ${(q.mediaCoverage * 100).toFixed(0)}% · competition ${(q.competitionRatio * 100).toFixed(0)}%`);
      for (const p of a1.problems) console.log(`       · ${p}`);
      assert(a1.verdict === want.verdict, `  ${f.id} @${vp}: A1 ${a1.verdict}, as recorded`);

      if (f.expect.failsOn === 'competition') {
        assert(q.mediaCoverage >= 0.98 && q.eventCoverage >= 0.9,
          `  ${f.id} @${vp}: coverage is perfect (${(q.mediaCoverage * 100).toFixed(0)}% media) and it fails anyway`);
        assert(a1.problems.some((p) => p.includes('comparable rank')),
          `  ${f.id} @${vp}: …on competition, not on coverage`);
      } else {
        assert(q.mediaCoverage < 0.2,
          `  ${f.id} @${vp}: passes on ${(q.mediaCoverage * 100).toFixed(0)}% media coverage — ownership, not image area`);
      }
    }
    assert(!f.verdict && f.kind === 'instrument',
      `  ${f.id}: carries no verdict from Alex — an instrument fixture is never taste evidence`);
  }
}

/* ── Gate 2 · structural and authorship conformance ───────────────────────── */
console.log(`\nGate 2 · Structural and Authorship Conformance — repetition measured by rendered geometry`);
for (const f of MAN.fixtures) {
  const r = rendered(f.id);
  if (r) {
    const four = r.structure.findings.filter((x) => x.kind === 'parallel-units' && x.units >= 4);
    const three = r.structure.findings.filter((x) => x.kind === 'parallel-units' && x.units === 3);
    console.log(`  ${f.id}: ${r.structure.findings.length} findings — ${four.length} at ≥4 equal units, ${three.length} at 3, bandRun ${r.structure.report.bandRun}`);
    for (const x of four.slice(0, 4)) console.log(`     · ${x.section} — ${x.formula}`);

    /* the modules the human named must still be detected */
    for (const want of f.expectedShapes?.parallelUnits || []) {
      const hit = r.structure.findings.some((x) => x.kind === 'parallel-units'
        && x.section === want.section && x.units === want.units && x.shape === want.shape);
      assert(hit, `  ${f.id}: still detects ${want.units}×equal in ${want.section}${want.is ? ` (${want.is})` : ''}`);
    }
    if (typeof f.expectedShapes?.bandRun === 'number') {
      assert(r.structure.report.bandRun === f.expectedShapes.bandRun,
        `  ${f.id}: band run ${r.structure.report.bandRun} matches the frozen ${f.expectedShapes.bandRun}`);
    }
    /* every finding leaves the detector undisposed — that is the contract */
    assert(r.structure.findings.every((x) => x.disposition === null),
      `  ${f.id}: every finding arrives undisposed; the detector never clears itself`);
  }
  const recorded = (f.gate2Findings || []).filter((g) => g.result?.startsWith('FAIL'));
  const expectFail = f.expect.gate2.startsWith('fail');
  if (recorded.length) for (const g of recorded.slice(0, 3)) console.log(`     ${dim(`· ${g.device}: ${g.result}`)}`);
  assert(expectFail === recorded.length > 0,
    `  ${f.id}: Gate 2 ${expectFail ? 'fails' : 'passes with dispositions'}, as recorded`);
}

/* ── Gate 3 · product usefulness ──────────────────────────────────────────── */
console.log(`\nGate 3 · Product Usefulness — conjunctive with Gate 2, never traded against it`);
for (const f of MAN.fixtures) {
  const findings = f.gate3Findings || [];
  const fails = findings.filter((g) => g.result?.startsWith('FAIL'));
  const expectFail = f.expect.gate3?.startsWith('fail');
  if (!findings.length) { console.log(`  ${f.id}: ${dim('not assessed — predates the gate')}`); continue; }
  console.log(`  ${f.id}: ${fails.length} of ${findings.filter((g) => g.result).length} product tests fail`);
  for (const g of fails) console.log(`     · ${g.device}: ${g.result}`);
  assert(expectFail === fails.length > 0, `  ${f.id}: Gate 3 ${fails.length ? 'fails' : 'passes'}, as recorded`);
}

/* ── Gate 4 · content provenance ──────────────────────────────────────────── */
console.log(`\nGate 4 · Content Provenance — coverage, not validity: an unrecorded claim fails the same as a false one`);
for (const f of MAN.fixtures) {
  const r = rendered(f.id);
  if (r) {
    /* no fixture ships a ledger — that IS the finding, and validate() must say so */
    const v = validateContent({ hits: r.hits, ledger: null });
    const byClass = {};
    for (const h of r.hits) (byClass[h.class] ||= new Set()).add(h.text);
    console.log(`  ${f.id}: ${r.hits.length} claim-shaped strings across ${Object.keys(byClass).length} classes, 0 ledger entries`);
    assert(v.verdict === 'fail' && v.reason === 'no content ledger exists',
      `  ${f.id}: Gate 4 fails on absence of a ledger`);

    for (const [cls, want] of Object.entries(f.expectedClaimHits || {})) {
      const got = byClass[cls] || new Set();
      const missing = want.filter((w) => !got.has(w));
      assert(missing.length === 0,
        `  ${f.id}: still catches every recorded ${cls}${missing.length ? ` — MISSED ${missing.join(', ')}` : ` (${want.length})`}`);
    }
    for (const cls of f.expectedClaimClasses || []) {
      assert(Boolean(byClass[cls]), `  ${f.id}: still catches claim class ${cls}`);
    }
  }
  for (const g of f.gate4Findings || []) console.log(`     ${dim(`· ${g.result}`)}`);
}

/* ── Gate 5 · human desirability ──────────────────────────────────────────── */
console.log(`\nGate 5 · Human Desirability — Alex's verdict, never the system's`);
for (const f of MAN.fixtures) {
  const g5 = f.gate5 || f.gate3;
  assert(g5.status !== 'passed' && f.verdict.result === 'reject',
    `  ${f.id}: no approval on record (${f.verdict.result} by ${f.verdict.by}, ${f.verdict.date})`);
}

/* ── the classes must stay four, and the pairs must stay pairs ────────────── */
console.log(`\nthe suite's own shape`);
for (const cls of ['A', 'B', 'C', 'D']) {
  const f = MAN.fixtures.find((x) => x.failureClass.startsWith(cls + ' '));
  assert(Boolean(f), `  failure class ${cls} present — ${f ? f.id : 'MISSING'}`);
}
const c = MAN.fixtures.find((f) => f.failureClass.startsWith('C '));
const d = MAN.fixtures.find((f) => f.failureClass.startsWith('D '));
assert(c && d && c.pairedWith === d.id && d.pairedWith === c.id,
  `  C and D still reference each other as the two halves of one proof`);
assert(c && c.expect.gate2.startsWith('pass') && c.expect.gate3.startsWith('fail'),
  `  C: authorship holds, product fails — trading Gate 3 away would pass it`);
assert(d && d.expect.gate2.startsWith('fail') && d.expect.gate3.startsWith('pass'),
  `  D: product holds, authorship fails — trading Gate 2 away would pass it`);

/* ── THE STANDING RULE ────────────────────────────────────────────────────── */
console.log(`\nthe standing rule`);
for (const f of MAN.fixtures) {
  const chain = ['gate1', 'gate2', 'gate3', 'gate4'].map((g) => f.expect[g]).filter(Boolean);
  const broken = chain.filter((s) => s.startsWith('fail'));
  const g5 = (f.gate5 || f.gate3).status !== 'passed';
  assert(broken.length > 0 && g5,
    `  ${f.id}: still fails the complete chain (${broken.length} gate${broken.length === 1 ? '' : 's'} broken${f.expect.gate3?.startsWith('pass') ? ', and being useful did not rescue it' : ''})`);
}

console.log(failures === 0
  ? `\n\x1b[32m✓ fixtures pass — all four artefacts still fail as recorded, and none of them reaches Gate 5\x1b[0m\n`
  : `\n\x1b[31m✗ ${failures} expectation(s) violated\x1b[0m\n`);
process.exit(failures === 0 ? 0 : 1);

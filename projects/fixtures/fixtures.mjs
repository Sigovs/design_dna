#!/usr/bin/env node
/**
 * The paired regression fixture.
 *
 *   npm run fixtures            verify hashes, re-measure, assert every gate
 *   npm run fixtures -- --no-render   hashes and recorded verdicts only
 *
 * WHY TWO FIXTURES AND NOT ONE. Chicago Motor Cars Concept 2 fails because the
 * means are absent — a measurement catches it. Concept 3 fails with the means
 * present: full-viewport hero, full-bleed media, 15.9x type contrast, all there
 * and none of them doing any work. One fixture would let the system believe that
 * hitting the numbers is the same as designing. The pair makes that impossible:
 * a change that lets Concept 3 pass every gate has broken the system, not fixed it.
 *
 * The fixtures are FROZEN COPIES. They are never the live project folder, which
 * keeps changing — Concept 3 was being iterated in the same directory on the day
 * these were taken.
 */

import { createHash } from 'node:crypto';
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, relative } from 'node:path';
import { spawn } from 'node:child_process';

const HERE = dirname(fileURLToPath(import.meta.url));
const MAN = JSON.parse(readFileSync(join(HERE, 'MANIFEST.json'), 'utf8'));
const RENDER = !process.argv.includes('--no-render');
const PORT = 8962;

const sha = (p) => createHash('sha256').update(readFileSync(p)).digest('hex');
const walk = (d) => readdirSync(d).flatMap((n) => { const p = join(d, n); return statSync(p).isDirectory() ? walk(p) : [p]; });
const ok = (s) => `\x1b[32m✓\x1b[0m ${s}`;
const bad = (s) => `\x1b[31m✗\x1b[0m ${s}`;
let failures = 0;
const assert = (cond, msg) => { console.log(cond ? ok(msg) : bad(msg)); if (!cond) failures++; };

console.log(`\nfixtures — ${MAN.fixtures.length} frozen artefacts, generated ${MAN.generated}\n`);

/* ── 1 · the artefacts have not moved ─────────────────────────────────────── */
for (const f of MAN.fixtures) {
  const dir = join(HERE, f.id);
  const onDisk = walk(dir).sort().map((p) => relative(dir, p));
  const listed = f.files.map((x) => x.path).sort();
  assert(onDisk.length === listed.length && onDisk.every((p, i) => p === listed[i]),
    `${f.id}: file list matches the manifest (${listed.length} files)`);
  const drift = f.files.filter((x) => !existsSync(join(dir, x.path)) || sha(join(dir, x.path)) !== x.sha256);
  assert(drift.length === 0,
    drift.length ? `${f.id}: ${drift.length} FILE(S) CHANGED — ${drift.map((d) => d.path).join(', ')}` : `${f.id}: every file byte-identical to the frozen hash`);
}

/* ── 2 · Gate 1 — measurable conformance ──────────────────────────────────── */
const floor = MAN.gate1Floor;
console.log(`\nGate 1 · measurable conformance — floor: ${floor.check}`);

let measured = null;
if (RENDER) {
  const srv = spawn('python3', ['-m', 'http.server', String(PORT)], { cwd: HERE, stdio: 'ignore', detached: true });
  await new Promise((r) => setTimeout(r, 1500));
  try {
    const { chromium } = await import('playwright');
    const b = await chromium.launch({ channel: 'chrome' });
    measured = {};
    for (const f of MAN.fixtures) {
      const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
      await p.goto(`http://127.0.0.1:${PORT}/${f.id}/${f.entry}`, { waitUntil: 'networkidle' }).catch(() => {});
      await p.evaluate(async () => { await new Promise((r) => { let y = 0; const t = setInterval(() => { y += 600; scrollTo(0, y);
        if (y >= document.body.scrollHeight) { clearInterval(t); scrollTo(0, 0); r(); } }, 70); }); });
      await p.waitForTimeout(1800);
      measured[f.id] = await p.evaluate(() => {
        const vw = innerWidth, vh = innerHeight;
        const vis = [...document.querySelectorAll('img,video')].map((e) => e.getBoundingClientRect());
        const first = vis.filter((r) => r.top < vh && r.bottom > 0);
        const governing = first.length ? Math.max(...first.map((r) => Math.min(r.bottom, vh) - Math.max(r.top, 0))) : 0;
        const fonts = [...document.querySelectorAll('h1,h2,h3,p,span,div,a')].map((e) => parseFloat(getComputedStyle(e).fontSize)).filter((n) => n > 0);
        return { pageHeightPx: document.body.scrollHeight, screens: +(document.body.scrollHeight / vh).toFixed(1),
          firstScreenGoverningMassPct: +(governing / vh * 100).toFixed(0), mediaTotal: vis.length,
          fullBleedMedia: vis.filter((r) => r.width >= vw - 2).length,
          typeScaleRatio: +(Math.max(...fonts) / Math.min(...fonts)).toFixed(1), largestTypePx: Math.round(Math.max(...fonts)) };
      });
      await p.close();
    }
    await b.close();
  } catch (e) {
    console.log(`  (render skipped: ${e.message.split('\n')[0]})`);
  } finally { try { process.kill(-srv.pid); } catch {} }
}

for (const f of MAN.fixtures) {
  const m = (measured && measured[f.id]) || f.measured;
  const live = measured && measured[f.id] ? 're-measured' : 'from manifest';
  const pct = m.firstScreenGoverningMassPct;
  const passes = pct >= 90;
  const shouldPass = f.expect.gate1.startsWith('partial pass');
  console.log(`  ${f.id} (${live}): first-screen governing mass ${pct}% · ${m.screens} screens · ${m.fullBleedMedia}/${m.mediaTotal} full-bleed · type ${m.typeScaleRatio}x`);
  assert(passes === shouldPass,
    `  ${f.id}: Gate 1 ${passes ? 'meets' : 'fails'} the floor — expected ${shouldPass ? 'meets' : 'fails'}`);
}

/* ── 3 · Gate 2 — structural visual review ────────────────────────────────── */
console.log(`\nGate 2 · structural visual review — every device present must do work`);
for (const f of MAN.fixtures) {
  const fails = f.gate2Findings.filter((g) => g.result.startsWith('FAIL'));
  console.log(`  ${f.id} — ${fails.length} of ${f.gate2Findings.length} devices fail their function test`);
  for (const g of fails) console.log(`     · ${g.device}: ${g.result}`);
  assert(f.expect.gate2 === 'fail' && fails.length > 0, `  ${f.id}: Gate 2 fails, as recorded`);
}

/* ── 4 · Gate 3 — human desirability ──────────────────────────────────────── */
console.log(`\nGate 3 · human desirability — Alex's verdict, never the system's`);
for (const f of MAN.fixtures) {
  assert(f.gate3.status !== 'passed' && f.verdict.result === 'reject',
    `  ${f.id}: no approval on record (verdict: ${f.verdict.result} by ${f.verdict.by}, ${f.verdict.date})`);
}

/* ── 5 · the pair must stay a pair ────────────────────────────────────────── */
const a = MAN.fixtures.find((f) => f.failureClass.startsWith('A'));
const b2 = MAN.fixtures.find((f) => f.failureClass.startsWith('B'));
assert(a && b2, `\nboth failure classes present — A (means absent) and B (means present, no direction)`);
const bMeasured = (measured && measured[b2.id]) || b2.measured;
assert(bMeasured.firstScreenGoverningMassPct >= 90 && b2.expect.gate2 === 'fail',
  `class B still proves the point: measurable floor met, review still fails`);

console.log(failures === 0
  ? `\n\x1b[32m✓ fixtures pass — both artefacts fail as recorded, and Gate 1 alone would have cleared Concept 3\x1b[0m\n`
  : `\n\x1b[31m✗ ${failures} expectation(s) violated\x1b[0m\n`);
process.exit(failures === 0 ? 0 : 1);

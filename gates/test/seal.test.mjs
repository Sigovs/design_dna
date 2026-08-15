#!/usr/bin/env node
/* Regression tests for the chain seal.
 *
 *   npm run test:seal
 *
 * The failure being defended against: gates reported as passed that were never
 * run, and a page edited after its gate passed. Both were possible because a
 * gate result was a sentence in a report rather than an artefact on disk. These
 * tests assert the three mechanisms that replaced the sentence — presence,
 * staleness, order — against a real temporary build.
 */
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { CHAIN, sourceSeal, validateChain } from '../lib/seal.mjs';

let failures = 0;
const ok = (s) => console.log(`\x1b[32m✓\x1b[0m ${s}`);
const bad = (s) => { console.log(`\x1b[31m✗\x1b[0m ${s}`); failures++; };
const check = (cond, msg) => (cond ? ok(msg) : bad(msg));

const root = mkdtempSync(join(tmpdir(), 'seal-'));
const gatesDir = join(root, '.gates');
mkdirSync(gatesDir, { recursive: true });
writeFileSync(join(root, 'index.html'), '<!doctype html><p>a</p>');
writeFileSync(join(root, 'style.css'), 'p{color:red}');

const T0 = Date.parse('2026-08-15T10:00:00Z');
const writeChain = (seal, { skip = [], times = null, verdicts = {}, human = {} } = {}) => {
  rmSync(gatesDir, { recursive: true, force: true });
  mkdirSync(gatesDir, { recursive: true });
  CHAIN.forEach((c, i) => {
    if (skip.includes(c.file)) return;
    writeFileSync(join(gatesDir, c.file), JSON.stringify({
      gate: c.gate,
      verdict: verdicts[c.file] ?? 'pass',
      humanConfirmed: human[c.file] ?? true,
      sourceSeal: seal,
      finishedAt: new Date(times ? times[i] : T0 + i * 60000).toISOString(),
    }));
  });
};

const seal0 = sourceSeal(root).seal;

/* ── a complete, current, in-order chain validates ────────────────────────── */
writeChain(seal0);
let v = validateChain(root, gatesDir);
check(v.ok, `a complete, current, in-order chain validates${v.ok ? '' : ` — ${v.problems[0]}`}`);
check(v.artifacts.length === 6 && v.fileCount === 2,
  `all six artefacts read, over a ${v.fileCount}-file build`);

/* ── PRESENCE — a missing artefact is NOT RUN, never a silent pass ────────── */
for (const c of CHAIN) {
  writeChain(seal0, { skip: [c.file] });
  const r = validateChain(root, gatesDir);
  check(!r.ok && r.problems.some((p) => p.includes('NOT RUN') && p.includes(c.file)),
    `PRESENCE — missing ${c.file} reports NOT RUN`);
}
writeChain(seal0, { skip: CHAIN.map((c) => c.file) });
check(validateChain(root, gatesDir).problems.length === 6,
  `PRESENCE — an empty .gates directory reports all six as not run, not "no problems found"`);

/* ── STALENESS — editing the page after the gates ran reverts them ────────── */
writeChain(seal0);
check(validateChain(root, gatesDir).ok, `chain valid before the edit`);
writeFileSync(join(root, 'style.css'), 'p{color:blue}');
v = validateChain(root, gatesDir);
check(!v.ok && v.problems.every((p) => p.includes('STALE')) && v.problems.length === 6,
  `STALENESS — one edited byte reverts all six gates to not-run`);
check(sourceSeal(root).seal !== seal0, `the source seal itself changed`);

/* a NEW file counts as an edit, not just a changed one */
const seal1 = sourceSeal(root).seal;
writeChain(seal1);
check(validateChain(root, gatesDir).ok, `chain re-validates once re-run against the new build`);
writeFileSync(join(root, 'extra.js'), 'void 0');
check(validateChain(root, gatesDir).problems.some((p) => p.includes('STALE')),
  `STALENESS — adding a file also invalidates the chain`);
rmSync(join(root, 'extra.js'));

/* files that are not the build do not invalidate it */
writeChain(seal1);
mkdirSync(join(root, '.gates', 'shots'), { recursive: true });
writeFileSync(join(root, '.gates', 'shots', '01-desktop-hero-1440x900.png'), 'not-a-png');
check(validateChain(root, gatesDir).ok,
  `writing the gate's own screenshots does not invalidate the gate that wrote them`);

/* ── ORDER — the gates must have finished in the required sequence ────────── */
const shuffled = CHAIN.map((_, i) => T0 + i * 60000);
[shuffled[2], shuffled[4]] = [shuffled[4], shuffled[2]];
writeChain(seal1, { times: shuffled });
v = validateChain(root, gatesDir);
check(!v.ok && v.problems.some((p) => p.startsWith('ORDER:')),
  `ORDER — an artefact finishing before the one it depends on fails`);
check(v.problems.some((p) => p.includes('product.json') || p.includes('authorship.json')),
  `ORDER — the out-of-sequence artefact is named`);

/* ── a failing gate is not a passing chain ────────────────────────────────── */
writeChain(seal1, { verdicts: { 'product.json': 'fail' } });
v = validateChain(root, gatesDir);
check(!v.ok && v.problems.some((p) => p.includes('Gate 3') && p.includes('fail')),
  `a single failed gate breaks the chain — Gate 3 cannot be traded away`);
writeChain(seal1, { verdicts: { 'gate2.json': 'fail' } });
check(!validateChain(root, gatesDir).ok,
  `and neither can Gate 2 — authorship and usefulness are conjunctive`);

/* ── a machine-only pass is not a pass ────────────────────────────────────── */
writeChain(seal1, { human: { 'hero.json': false } });
v = validateChain(root, gatesDir);
check(!v.ok && v.problems.some((p) => p.includes('humanConfirmed is false')),
  `hero.json passing on machine checks alone is refused — the subject box needs eyes on it`);

/* ── the seal changes when anything in the chain changes ──────────────────── */
writeChain(seal1);
const a = validateChain(root, gatesDir).seal;
writeChain(seal1, { times: CHAIN.map((_, i) => T0 + 1000 + i * 60000) });
const b = validateChain(root, gatesDir).seal;
check(a !== b, `the chain seal covers the artefacts themselves, not just their presence`);

/* ── Gate 5 is never in the chain ─────────────────────────────────────────── */
check(!CHAIN.some((c) => /gate5|verdict|desirab/i.test(c.file)),
  `Gate 5 has no artefact — the system may not record Alex's verdict for him`);

rmSync(root, { recursive: true, force: true });
console.log(failures === 0
  ? `\n\x1b[32m✓ chain seal — presence, staleness and order all hold\x1b[0m\n`
  : `\n\x1b[31m✗ ${failures} seal regression(s)\x1b[0m\n`);
process.exit(failures === 0 ? 0 : 1);

#!/usr/bin/env node
/* Gate 5 — Alex's verdict, and the only thing standing in front of it.
 *
 *   npm run gate5 -- <project-dir>
 *
 * This command does not judge anything. It refuses the screenshot handoff
 * unless the six artefacts exist, were computed against THIS build, were
 * produced in order, and each carries a pass a human confirmed. If it prints
 * the shots, the chain held; if it refuses, it says exactly which gate was
 * never run.
 *
 * A claimed pass without a validating seal is a WORKFLOW failure and is
 * reported as one — it is not a design failure and must not be recorded as
 * taste evidence.
 */
import { existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { validateChain, CHAIN } from './lib/seal.mjs';

const root = resolve(process.argv.slice(2).find((a) => !a.startsWith('--')) || '.');
const gatesDir = join(root, '.gates');
const chain = validateChain(root, gatesDir);

console.log(`\nGate 5 · Human Desirability — ${root}\n`);
for (const c of CHAIN) {
  const a = chain.artifacts.find((x) => x.file === c.file);
  const state = !a.present ? '\x1b[31mNOT RUN\x1b[0m'
    : a.data?.sourceSeal !== chain.sourceSeal ? '\x1b[31mSTALE\x1b[0m'
    : a.data?.verdict === 'pass' ? '\x1b[32mpass\x1b[0m' : '\x1b[31mfail\x1b[0m';
  console.log(`  ${state.padEnd(20)} ${c.file.padEnd(22)} ${c.gate}`);
}
console.log(`\n  source seal ${chain.sourceSeal.slice(0, 16)}…  (${chain.fileCount} files)`);
console.log(`  chain seal  ${chain.seal.slice(0, 16)}…`);

if (!chain.ok) {
  console.log(`\n\x1b[31mHANDOFF REFUSED\x1b[0m`);
  for (const p of chain.problems) console.log(`  · ${p}`);
  console.log(`\nThis is a workflow failure, not a design failure. Run: npm run gates -- ${root}\n`);
  process.exit(1);
}

const shots = ['01-desktop-hero-1440x900.png', '02-desktop-full-1440.png', '03-mobile-hero-390x844.png', '04-mobile-full-390.png']
  .map((f) => join(gatesDir, 'shots', f));
const missing = shots.filter((s) => !existsSync(s));
if (missing.length) {
  console.log(`\n\x1b[31mHANDOFF REFUSED\x1b[0m — the four required captures are not in .gates/shots:`);
  for (const m of missing) console.log(`  · ${m}`);
  process.exit(1);
}

console.log(`\n\x1b[32mChain valid. Present these four, and nothing else, and wait for the verdict:\x1b[0m`);
for (const s of shots) console.log(`  ${s}`);
console.log(`\n  approve · revise · reject — Alex's, never the system's.\n`);

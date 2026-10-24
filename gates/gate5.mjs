#!/usr/bin/env node
/* Gate 5 — Alex's verdict, and the only thing standing in front of it.
 *
 *   npm run gate5 -- <project-dir>
 *
 * This command does not judge anything. Since 2026-10-25 (Alex, step 3) it
 * refuses the handoff only when Gate 1's binding checks fail, are stale or were
 * never run — keyboard and focus, 44px targets, reduced motion, no horizontal
 * scroll, no console errors. Every other artefact is printed as a report.
 *
 * What stands before the handoff instead of the sealed chain: the whole-page
 * read (TASTE §0, rule 7), then the page opened in the browser and Alex asked
 * for a score out of 10.
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
  const bad = c.binding ? '\x1b[31m' : '\x1b[33m';
  const state = !a.present ? `${bad}NOT RUN\x1b[0m`
    : a.data?.sourceSeal !== chain.sourceSeal ? `${bad}STALE\x1b[0m`
    : a.data?.verdict === 'pass' ? '\x1b[32mpass\x1b[0m' : `${bad}${a.data?.verdict ?? 'fail'}\x1b[0m`;
  console.log(`  ${state.padEnd(20)} ${c.file.padEnd(22)} ${c.gate}${c.binding ? '' : '  (report)'}`);
}
console.log(`\n  source seal ${chain.sourceSeal.slice(0, 16)}…  (${chain.fileCount} files)`);

if (!chain.ok) {
  console.log(`\n\x1b[31mHANDOFF REFUSED\x1b[0m — Gate 1's binding checks:`);
  for (const p of chain.problems) console.log(`  · ${p}`);
  console.log(`\nRun: npm run gates -- ${root}\n`);
  process.exit(1);
}

const shots = ['01-desktop-hero-1440x900.png', '02-desktop-full-1440.png', '03-mobile-hero-390x844.png', '04-mobile-full-390.png']
  .map((f) => join(gatesDir, 'shots', f)).filter((s) => existsSync(s));

console.log(`\n\x1b[32mBinding checks pass.\x1b[0m Before showing, the whole-page read (TASTE §0, rule 7), at 1440 and 390:`);
console.log(`  · one idea — every section carries the same governing idea, down to the footer`);
console.log(`  · finished — the sections connect as one piece, top to bottom`);
console.log(`  · the buyer's UX — find what is for sale, understand it, compare it, act; keyboard as well as touch`);
if (shots.length) {
  console.log(`\n  captures:`);
  for (const s of shots) console.log(`    ${s}`);
}
console.log(`\n  Then open the page in the browser and ask Alex for a score out of 10 — his, never the system's.\n`);

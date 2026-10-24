#!/usr/bin/env node
/* The compositing plan (DNA101) — checked before any paid generation.
 *
 *   npm run layers -- <plan.json>                          validate, print the approval summary
 *   npm run layers -- <plan.json> --approval approval.json   …and check it against what was approved
 *
 * approval.json is { "assets": ["<paid asset id>", …], "budget": <number> } — or the
 * project's build-plan.json, whose Ассеты stage records that approval.
 * Exit 1 when the plan fails, or when a paid generation falls outside the
 * approval — which then has to be asked for again. The rules live in
 * lib/compositing-plan.mjs.
 */
import { readFileSync } from 'node:fs';
import { validate, summary, checkApproval } from './lib/compositing-plan.mjs';

const argv = process.argv.slice(2);
const file = argv.find((a, i) => !a.startsWith('--') && argv[i - 1] !== '--approval');
if (!file) {
  console.error('usage: npm run layers -- <plan.json> [--approval approval.json]');
  process.exit(1);
}
const plan = JSON.parse(readFileSync(file, 'utf8'));
const v = validate(plan);
console.log(summary(plan));

let failed = false;
if (v.errors.length) {
  console.error(`\ncompositing plan NOT ready:\n  - ${v.errors.join('\n  - ')}`);
  failed = true;
}
const i = argv.indexOf('--approval');
if (i > -1) {
  /* an approval file, or the build plan whose Ассеты stage approved it */
  const raw = JSON.parse(readFileSync(argv[i + 1], 'utf8'));
  const a = checkApproval(plan, raw.assets?.approval ?? raw);
  if (a.approved) console.log(`\napproved: every paid source is listed, ${a.cost} within ${a.budget}`);
  else {
    console.error(`\nNEEDS APPROVAL AGAIN:${a.unlisted.length ? ` unlisted paid generations ${a.unlisted.join(', ')}` : ''}${a.overBudget ? ` · cost ${a.cost} over the approved ${a.budget}` : ''}`);
    failed = true;
  }
}
process.exit(failed ? 1 : 0);

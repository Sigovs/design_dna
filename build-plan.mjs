#!/usr/bin/env node
/* The build-plan pop-up (DNA99) — what to ask, and what was answered.
 *
 *   npm run plan -- <project> --ask                       screen 1 as AskUserQuestion JSON
 *   npm run plan -- <project> --ask --scroll pinned       screen 2, once screen 1 is answered
 *   npm run plan -- <project> --answers answers.json [--reason lenis="…"] [--preserve-both]
 *   npm run plan -- <project>                             the saved plan
 *
 * --answers takes the AskUserQuestion answers object from both screens merged,
 * as a file path or inline JSON. The plan is normalised, validated, written to
 * <project>/build-plan.json and printed in the form the agent builds from. A
 * plan that fails validation is not saved.
 *
 * The definition — groups, options, rules — lives in lib/build-plan.mjs.
 */
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { detectProject, screens, fromAnswers, normalize, validate, save, load, describe, PLAN_FILE } from './lib/build-plan.mjs';

const argv = process.argv.slice(2);
const flag = (n) => { const i = argv.indexOf(n); return i > -1 ? argv[i + 1] : null; };
const valued = new Set(['--scroll', '--answers', '--reason']);
const dir = resolve(argv.find((a, i) => !a.startsWith('--') && !valued.has(argv[i - 1])) || '.');
const project = detectProject(dir);

if (argv.includes('--ask')) {
  const scroll = flag('--scroll');
  const [one, two] = screens({ project, scrollBehavior: scroll || undefined });
  console.log(JSON.stringify(scroll ? two : one, null, 2));
  process.exit(0);
}

const answersArg = flag('--answers');
if (answersArg) {
  const answers = JSON.parse(existsSync(answersArg) ? readFileSync(answersArg, 'utf8') : answersArg);
  const reasons = {};
  argv.forEach((a, i) => {
    if (a !== '--reason') return;
    const [k, ...v] = String(argv[i + 1]).split('=');
    reasons[k] = v.join('=');
  });
  const parsed = fromAnswers(answers, { reasons, preserveBootstrapAndTailwind: argv.includes('--preserve-both') });
  const { plan, notes } = normalize(parsed.plan);
  const errors = [...parsed.problems, ...(parsed.problems.length ? [] : validate(plan, { project }))];
  if (errors.length) {
    console.error(`build plan NOT saved:\n  - ${errors.join('\n  - ')}`);
    process.exit(1);
  }
  save(dir, plan);
  for (const n of notes) console.log(`note: ${n}`);
  console.log(describe(plan));
  console.log(`\nsaved → ${resolve(dir, PLAN_FILE)}`);
  process.exit(0);
}

const saved = load(dir);
if (!saved) {
  console.error(`no ${PLAN_FILE} in ${dir} — ask the pop-up first: npm run plan -- ${dir} --ask`);
  process.exit(1);
}
console.log(describe(saved));

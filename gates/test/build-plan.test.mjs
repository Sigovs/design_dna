#!/usr/bin/env node
/* Regression tests for the build-plan pop-up's «Сборка» stage (DNA99).
 *
 *   npm run test:plan
 *
 * What the stage must never do: let two options of a radio group through, put
 * Bootstrap and Tailwind on one page by accident, leave scroll-site off a
 * pinned sequence, add Lenis on its own, or lose a field between the pop-up and
 * the build.
 */
import { mkdtempSync, writeFileSync, rmSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import {
  GROUPS, FIELDS, GLOBAL_RULE, RECOMMENDED, screens, recommend, fromAnswers, normalize, validate, save, load, detectProject,
} from '../../lib/build-plan.mjs';

let failures = 0, count = 0;
const ok = (s) => { count++; console.log(`\x1b[32m✓\x1b[0m ${s}`); };
const bad = (s) => { count++; console.log(`\x1b[31m✗\x1b[0m ${s}`); failures++; };
const check = (name, cond, detail = '') => (cond ? ok(name) : bad(`${name}${detail ? `\n    ${detail}` : ''}`));

const NONE = { exists: false, deps: [], bootstrap: false, tailwind: false };
const BASE = {
  baseStack: 'astro-tailwind', motionEngine: 'css-waapi', scrollBehavior: 'standard', scrollEngine: 'native',
  supportingSkills: ['blocks-21st', 'kill-ai-slop'], reasons: {},
};
const plan = (over) => ({ ...BASE, ...over, reasons: { ...BASE.reasons, ...over?.reasons } });
const has = (errors, word) => errors.some((e) => e.includes(word));
const tmp = () => mkdtempSync(join(tmpdir(), 'build-plan-'));
const dirs = [];

/* ── the shape of the pop-up ─────────────────────────────────────────────── */
{
  const [one, two] = screens({ project: NONE });
  check('screen 1 is the four Сборка radio groups', one.questions.length === 4 && one.questions.every((q) => q.multiSelect === false && q.question.startsWith('Сборка')));
  check('screen 2 is supporting skills (checkboxes) + Концепт · После · Генерация',
    two.questions.length === 4 && two.questions[0].multiSelect === true && two.questions[0].question.startsWith('Сборка 5/5')
    && two.questions.slice(1).map((q) => q.header).join('·') === 'Концепт·После·Генерация');
  check('the global rule closes the Сборка stage', two.questions[0].question.endsWith(GLOBAL_RULE));
  const all = [...one.questions, ...two.questions];
  check('AskUserQuestion limits hold: ≤4 questions, 2–4 options, header ≤12 chars',
    [one, two].every((s) => s.questions.length <= 4) && all.every((q) => q.options.length >= 2 && q.options.length <= 4 && q.header.length <= 12),
    all.map((q) => `${q.header}:${q.options.length}`).join(' '));
  check('no option label contains ", " (multi answers are joined with it)', GROUPS.every((g) => g.options.every((o) => !o.label.includes(', '))));
  const recs = one.questions.map((q) => q.options.filter((o) => o.label.endsWith(RECOMMENDED)));
  check('each radio group recommends exactly one option, listed first', recs.every((r, i) => r.length === 1 && one.questions[i].options[0] === r[0]));
}

/* ── radio exclusivity ───────────────────────────────────────────────────── */
{
  const e = validate(plan({ baseStack: ['astro-tailwind', 'vanilla'] }), { project: NONE });
  check('two base stacks are refused', has(e, 'Base stack: exactly one'), e.join('; '));
  for (const field of ['motionEngine', 'scrollBehavior', 'scrollEngine']) {
    const g = GROUPS.find((x) => x.field === field);
    const err = validate(plan({ [field]: g.options.slice(0, 2).map((o) => o.id) }), { project: NONE });
    check(`two ${g.label.toLowerCase()} options are refused`, has(err, `${g.label}: exactly one`), err.join('; '));
  }
  const { plan: p } = fromAnswers({ Стек: 'Bootstrap 5, Astro + Tailwind', Анимация: 'CSS / WAAPI', Скролл: 'Обычная страница', Движок: 'Нативный скролл', Навыки: '' });
  const err = validate(p, { project: NONE });
  check('an answer naming two stacks is refused, not reduced to the first', Array.isArray(p.baseStack) && has(err, 'exactly one'), err.join('; '));
  const { plan: m } = fromAnswers({ Стек: 'Astro + Tailwind (Рекомендуется)', Анимация: 'CSS / WAAPI', Скролл: 'Обычная страница', Движок: 'Нативный скролл', Навыки: 'Блоки 21st.dev, kill-ai-slop' });
  check('several supporting skills are accepted together', validate(m, { project: NONE }).length === 0 && m.supportingSkills.length === 2);
}

/* ── Bootstrap / Tailwind ────────────────────────────────────────────────── */
{
  const tw = { exists: true, deps: ['tailwindcss'], bootstrap: false, tailwind: true };
  const bs = { exists: true, deps: ['bootstrap'], bootstrap: true, tailwind: false };
  const both = { exists: true, deps: ['bootstrap', 'tailwindcss'], bootstrap: true, tailwind: true };
  check('Bootstrap 5 on a Tailwind project is refused', has(validate(plan({ baseStack: 'bootstrap5' }), { project: tw }), 'combines Bootstrap and Tailwind'));
  check('Astro + Tailwind on a Bootstrap project is refused', has(validate(plan({ baseStack: 'astro-tailwind' }), { project: bs }), 'combines Bootstrap and Tailwind'));
  check('the existing stack with both, not explicitly preserved, is refused', has(validate(plan({ baseStack: 'existing' }), { project: both }), 'already runs Bootstrap and Tailwind'));
  check('the existing stack with both, preserved by the brief, passes', validate(plan({ baseStack: 'existing', preserveBootstrapAndTailwind: true }), { project: both }).length === 0);
  check('preserving both does not excuse choosing Bootstrap 5 on top', has(validate(plan({ baseStack: 'bootstrap5', preserveBootstrapAndTailwind: true }), { project: tw }), 'combines'));
  check('Bootstrap 5 on a clean project passes', validate(plan({ baseStack: 'bootstrap5' }), { project: NONE }).length === 0);

  const d = tmp(); dirs.push(d);
  writeFileSync(join(d, 'package.json'), JSON.stringify({ dependencies: { bootstrap: '^5.3.0' }, devDependencies: { tailwindcss: '^4.0.0' } }));
  const p = detectProject(d);
  check('detection reads both from package.json', p.exists && p.bootstrap && p.tailwind);
  check('an established project is recommended its own stack', recommend({ project: p }).baseStack === 'existing');
}

/* ── scroll-site and the pinned sequence ─────────────────────────────────── */
{
  const two = screens({ project: NONE, scrollBehavior: 'pinned' })[1].questions[0];
  check('screen 2 recommends scroll-site after a pinned answer', two.options.some((o) => o.label === 'scroll-site' + RECOMMENDED));
  const std = screens({ project: NONE, scrollBehavior: 'standard' })[1].questions[0];
  check('screen 2 does not recommend scroll-site for a standard page', std.options.some((o) => o.label === 'scroll-site'));
  const { plan: p, notes } = normalize(plan({ scrollBehavior: 'pinned', supportingSkills: ['kill-ai-slop'], reasons: { pinned: 'twelve-state engine strip' } }));
  check('a pinned sequence selects scroll-site', p.supportingSkills.includes('scroll-site') && notes.length === 1);
  const { plan: s } = normalize(plan({}));
  check('a standard page does not require scroll-site', !s.supportingSkills.includes('scroll-site') && validate(s, { project: NONE }).length === 0);
  check('normalisation never touches the stack or the engines', ['baseStack', 'motionEngine', 'scrollEngine'].every((f) => p[f] === BASE[f]));
  check('a pinned sequence needs the reason the content requires it', has(validate(plan({ scrollBehavior: 'pinned' }), { project: NONE }), 'reasons.pinned'));
  check('reveals with no motion engine are refused', has(validate(plan({ scrollBehavior: 'reveals', motionEngine: 'none' }), { project: NONE }), 'choose a motion engine'));
}

/* ── Lenis and GSAP are never automatic ──────────────────────────────────── */
{
  for (const sb of ['standard', 'reveals', 'pinned']) {
    const r = recommend({ project: NONE, scrollBehavior: sb });
    check(`native scroll is the recommendation for ${sb}`, r.scrollEngine === 'native');
  }
  const pinnedNative = normalize(plan({ scrollBehavior: 'pinned', reasons: { pinned: 'twelve-state engine strip' } })).plan;
  check('a pinned sequence passes on native scroll — Lenis is not required', pinnedNative.scrollEngine === 'native' && validate(pinnedNative, { project: NONE }).length === 0);
  check('Lenis on a standard page without a reason is refused', has(validate(plan({ scrollEngine: 'lenis' }), { project: NONE }), 'reasons.lenis'));
  check('Lenis with a documented reason passes', validate(plan({ scrollEngine: 'lenis', reasons: { lenis: 'inertial gallery drag needs managed scroll' } }), { project: NONE }).length === 0);
  check('GSAP is never the recommendation by default', recommend({ project: NONE }).motionEngine === 'css-waapi');
  check('GSAP without the beat that needs it is refused', has(validate(plan({ motionEngine: 'gsap' }), { project: NONE }), 'reasons.gsap'));
}

/* ── persistence of all five fields ──────────────────────────────────────── */
{
  const d = tmp(); dirs.push(d);
  const p = plan({ baseStack: 'vanilla', motionEngine: 'gsap', scrollBehavior: 'pinned', scrollEngine: 'lenis',
    supportingSkills: ['kill-ai-slop', 'scroll-site'], reasons: { gsap: 'scrubbed chapters', pinned: 'six states', lenis: 'drag gallery' } });
  save(d, p);
  const back = load(d);
  check('build-plan.json round-trips all five fields', FIELDS.every((f) => JSON.stringify(back[f]) === JSON.stringify(p[f])), JSON.stringify(back));
  check('the reasons and the rule are saved with them', back.reasons.lenis === 'drag gallery' && back.rule === GLOBAL_RULE);

  /* end to end through the CLI: answers in, file out, describe back */
  const cli = resolve(dirname(fileURLToPath(import.meta.url)), '../../build-plan.mjs');
  const e = tmp(); dirs.push(e);
  const answers = { Стек: 'HTML / CSS / JS', Анимация: 'CSS / WAAPI (Рекомендуется)', Скролл: 'Появление при скролле', Движок: 'Нативный скролл (Рекомендуется)', Навыки: 'kill-ai-slop' };
  writeFileSync(join(e, 'answers.json'), JSON.stringify(answers));
  const out = execFileSync(process.execPath, [cli, e, '--answers', join(e, 'answers.json')], { encoding: 'utf8' });
  const saved = JSON.parse(readFileSync(join(e, 'build-plan.json'), 'utf8'));
  check('the CLI saves the five fields it was given',
    saved.baseStack === 'vanilla' && saved.motionEngine === 'css-waapi' && saved.scrollBehavior === 'reveals'
    && saved.scrollEngine === 'native' && JSON.stringify(saved.supportingSkills) === '["kill-ai-slop"]');
  check('the output names each field separately', ['Base stack:', 'Motion engine:', 'Scroll behavior:', 'Scroll engine:', 'Supporting skills:'].every((l) => out.includes(l)), out);
  const shown = execFileSync(process.execPath, [cli, e], { encoding: 'utf8' });
  check('a saved plan is read back by the CLI', shown.includes('HTML / CSS / JS') && shown.includes('Появление при скролле'));

  let refused = false;
  writeFileSync(join(e, 'answers.json'), JSON.stringify({ ...answers, Движок: 'Lenis' }));
  try { execFileSync(process.execPath, [cli, e, '--answers', join(e, 'answers.json')], { encoding: 'utf8', stdio: 'pipe' }); }
  catch { refused = true; }
  check('an invalid plan is not saved over the valid one', refused && load(e).scrollEngine === 'native');
}

for (const d of dirs) rmSync(d, { recursive: true, force: true });
console.log(failures ? `\n${failures} of ${count} failed` : `\nall ${count} passed`);
process.exit(failures ? 1 : 0);

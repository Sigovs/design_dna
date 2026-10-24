#!/usr/bin/env node
/* The build-plan pop-up (DNA99) — what to ask, what was answered, what is open.
 *
 *   Бриф → Концепт → Ассеты → Сборка → Проверка
 *
 * Each step is asked when its evidence exists, and answers are merged into
 * <project>/build-plan.json step by step:
 *
 *   brief → concept → concept-approval → assets → asset-approval → build → review
 *
 *   npm run plan -- <project> --ask --list                     every step: label, state, headers
 *   npm run plan -- <project> --ask [--stage <step|stage>] [--part <n>]
 *                                                              one dialog as AskUserQuestion JSON (default: Бриф)
 *       --scan scan.json             the DNA100 scan: signals, thesis, its recommendations for Сборка
 *       --no-thesis                  Концепт chose «Только стиль»: the scan's recommendations are not used
 *       --board <file> --idea "…"    the direction board and governing idea shown for approval
 *                                    (the idea defaults to BRIEF.md's concept section)
 *       --contract <file>            the visual contract, when there is one
 *       --compositing plan.json      the DNA101 compositing plan and paid list
 *       --recommend <field>=<option> --evidence <option>="…"   a recommendation given directly; repeatable
 *       --scroll <architecture>      Сборка's architecture answer, for its second dialog
 *   npm run plan -- <project> --answers answers.json [evidence flags as above]
 *                                [--reason <key>="…"] [--note "…"] [--fallback mobile|reducedMotion="…"] [--preserve-both]
 *   npm run plan -- <project> --gate implementation|generation [evidence flags]
 *                                                              exit 1 while the gate is closed
 *   npm run plan -- <project>                                  the saved plan (a version-1 file is read as version 2)
 *
 * Steps are named brief · concept · concept-approval · assets · asset-approval ·
 * build · review, or by stage (Бриф · Концепт · Ассеты · Сборка · Проверка).
 * Evidence not passed is taken from what the plan recorded — the board and plan
 * files are re-read, so a changed file reopens its gate. A plan that fails is not
 * saved. A recommendation only marks an option.
 *
 * The definition — stages, steps, groups, gates, migration — lives in lib/build-plan.mjs.
 */
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import {
  GROUPS, LEGACY_SCROLL, detectProject, readBrief, dialogs, dialog, fromAnswers, normalize, validate, settle, gate,
  save, load, describe, PLAN_FILE,
} from './lib/build-plan.mjs';

const argv = process.argv.slice(2);
const flag = (n) => { const i = argv.indexOf(n); return i > -1 ? argv[i + 1] : null; };
const all = (n) => argv.flatMap((a, i) => (a === n ? [String(argv[i + 1])] : []));
const pairs = (n) => Object.fromEntries(all(n).map((p) => { const [k, ...v] = p.split('='); return [k, v.join('=')]; }));
const json = (v) => (v == null ? undefined : JSON.parse(existsSync(v) ? readFileSync(v, 'utf8') : v));
const valued = new Set(['--scroll', '--stage', '--part', '--answers', '--reason', '--recommend', '--evidence', '--note', '--scan', '--compositing',
  '--board', '--idea', '--contract', '--fallback', '--gate']);
const dir = resolve(argv.find((a, i) => !a.startsWith('--') && !valued.has(argv[i - 1])) || '.');
const fail = (msg) => { console.error(msg); process.exit(1); };

/* ── the evidence in front of us ─────────────────────────────────────────── */
const project = detectProject(dir);
const brief = readBrief(dir);
const prev = load(dir) || {};
const fileAt = (p) => (p && existsSync(resolve(p)) ? { path: resolve(p), bytes: readFileSync(resolve(p)) } : null);
const scan = json(flag('--scan'));
const compositingPath = flag('--compositing') ? resolve(flag('--compositing')) : prev.approvals?.assetPlan?.plan ?? null;
const ctx = {
  project, brief, scan,
  board: fileAt(flag('--board') ?? prev.approvals?.concept?.board),
  contract: fileAt(flag('--contract') ?? prev.approvals?.concept?.contract),
  idea: flag('--idea') ?? brief.idea ?? prev.approvals?.concept?.idea ?? null,
  thesis: scan ? undefined : prev.concept?.scan?.thesis ?? undefined,
  compositing: compositingPath && existsSync(compositingPath) ? json(compositingPath) : undefined,
  compositingPath,
};

if (argv.includes('--gate')) {
  const g = gate(flag('--gate'), prev, ctx);
  console.log(g.open ? `${flag('--gate')}: OPEN` : `${flag('--gate')}: CLOSED\n  - ${g.reasons.join('\n  - ')}`);
  process.exit(g.open ? 0 : 1);
}

if (argv.includes('--ask')) {
  /* evidence is keyed by option id; the ids that need it never collide */
  const evidence = pairs('--evidence');
  const concept = {};
  for (const r of all('--recommend')) {
    let [field, id] = r.split('=');
    const ops = [];
    if (field === 'scrollBehavior' && LEGACY_SCROLL[id]) {      /* the version-1 field */
      const m = LEGACY_SCROLL[id];
      id = m.scrollArchitecture;
      field = 'scrollArchitecture';
      if (m.scrollOperations[0] !== 'none') ops.push(...m.scrollOperations);
      evidence[id] ??= evidence.pinned ?? evidence.reveals;
      for (const o of ops) evidence[o] ??= evidence.reveals;
    }
    const g = GROUPS.find((x) => x.field === field);
    if (g?.type === 'multi') ops.push(id);
    else concept[field] = { id, evidence: evidence[id] };
    if (ops.length) {
      const p = concept.scrollOperations || { ids: [], evidence: {} };
      for (const o of ops) { p.ids.push(o); p.evidence[o] = evidence[o]; }
      concept.scrollOperations = p;
    }
  }
  const scrollArg = flag('--scroll');
  const arch = GROUPS.find((g) => g.field === 'scrollArchitecture');
  const scroll = LEGACY_SCROLL[scrollArg] && !arch.options.some((o) => o.id === scrollArg) ? LEGACY_SCROLL[scrollArg].scrollArchitecture : scrollArg;
  const askCtx = { ...ctx, concept, useThesis: !argv.includes('--no-thesis'), scrollArchitecture: scroll || undefined };
  let list;
  try { list = dialogs(askCtx); } catch (e) { fail(`recommendation refused:\n  - ${e.message.split('\n').join('\n  - ')}`); }
  if (argv.includes('--list')) {
    for (const d of list) console.log(`${d.label.padEnd(22)} --stage ${d.step}${d.of > 1 ? ` --part ${d.part}` : ''} · ${d.ready ? d.questions.map((q) => q.header).join(', ') : `waiting: ${d.waiting}`}`);
    process.exit(0);
  }
  const d = dialog(askCtx, flag('--stage') || 'brief', flag('--part') || 1);
  if (!d) fail(`--stage ${flag('--stage')} --part ${flag('--part') || 1}: no such dialog — npm run plan -- ${dir} --ask --list`);
  if (!d.ready) fail(`${d.label} cannot be asked yet: ${d.waiting}`);
  console.log(JSON.stringify({ questions: d.questions }, null, 2));
  process.exit(0);
}

const answersArg = flag('--answers');
if (answersArg) {
  const parsed = fromAnswers(json(answersArg), {
    reasons: pairs('--reason'), notes: all('--note'), preserveBootstrapAndTailwind: argv.includes('--preserve-both'),
    brief, fallback3d: Object.keys(pairs('--fallback')).length ? pairs('--fallback') : undefined,
  });
  const n = normalize(parsed.plan);
  const settled = settle(prev, { ...parsed, plan: n.plan }, ctx);
  const errors = [...parsed.problems, ...settled.errors, ...(parsed.problems.length ? [] : validate(settled.plan, ctx))];
  if (errors.length) fail(`build plan NOT saved:\n  - ${errors.join('\n  - ')}`);
  save(dir, settled.plan, ctx);
  for (const note of n.notes) console.log(`note: ${note}`);
  console.log(describe(load(dir)));
  console.log(`\nsaved → ${resolve(dir, PLAN_FILE)} (steps: ${parsed.steps.join(', ') || 'none'})`);
  process.exit(0);
}

if (!Object.keys(prev).length) fail(`no ${PLAN_FILE} in ${dir} — ask the pop-up first: npm run plan -- ${dir} --ask --list`);
console.log(describe(prev));

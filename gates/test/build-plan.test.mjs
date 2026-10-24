#!/usr/bin/env node
/* Regression tests for the build-plan pop-up (DNA99).
 *
 *   npm run test:plan
 *
 * Бриф → Концепт → Ассеты → Сборка → Проверка, asked as lifecycle steps:
 * brief → concept → concept-approval → assets → asset-approval → build → review.
 * What the pop-up must never do: ask a step before its evidence exists, let an
 * old approval pass a changed direction or plan, start implementation or paid
 * generation through a closed gate, turn a complete BRIEF.md into generic
 * questions, let two options of a radio group through, treat a supporting scroll
 * operation as a rival architecture, let an exclusive box sit beside another,
 * turn a recommendation into a selection, take a thesis — or 3D — from a scan,
 * flatten what DNA101 says must stay a layer, put R3F on a stack without React,
 * add GSAP, Lenis or Three.js on its own, or lose a field — or a version-1
 * plan's meaning — between the pop-up and the build.
 *
 * Assertions read steps, stages, labels and headers, never a dialog's position.
 */
import { mkdtempSync, writeFileSync, rmSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import {
  STAGES, STEPS, GROUPS, FIELDS, GLOBAL_RULE, LENIS_NOTE, RECOMMENDED, PLAN_VERSION, REQUIRED_REVIEW, MAX_QUESTIONS,
  dialogs, dialog, recommend, checkRecommendation, checkScan, qualifies, needs3d, fromAnswers, toggle, normalize, validate, settle, gate,
  conceptIdentity, assetIdentity, migrate, save, load, detectProject, describe, readBrief,
} from '../../lib/build-plan.mjs';

let failures = 0, count = 0;
const ok = (s) => { count++; console.log(`\x1b[32m✓\x1b[0m ${s}`); };
const bad = (s) => { count++; console.log(`\x1b[31m✗\x1b[0m ${s}`); failures++; };
const check = (name, cond, detail = '') => (cond ? ok(name) : bad(`${name}${detail ? `\n    ${detail}` : ''}`));

const NONE = { exists: false, deps: [], bootstrap: false, tailwind: false, react: false };
const REACT = { exists: true, deps: ['react', 'react-dom'], bootstrap: false, tailwind: false, react: true };
const ORDER = ['Бриф', 'Концепт', 'Ассеты', 'Сборка', 'Проверка'];
const has = (errors, word) => errors.some((e) => e.includes(word));
const tmp = () => mkdtempSync(join(tmpdir(), 'build-plan-'));
const dirs = [];
const D = (ctx = {}) => dialogs({ project: NONE, ...ctx });
const Q = (h, ctx) => D(ctx).flatMap((d) => d.questions.map((q) => ({ ...q, step: d.step, stage: d.stage, label: d.label }))).find((q) => q.header === h);
const first = (h, ctx) => Q(h, ctx).options[0].label;
const marked = (h, ctx) => Q(h, ctx).options.filter((o) => o.label.endsWith(RECOMMENDED)).map((o) => o.label.replace(RECOMMENDED, ''));

/* a complete answer set for every routing step — no gate decisions in it */
const ANSWERS = {
  Задача: 'Новый сайт', Источники: 'Запрос или бриф', Требования: '', Пробелы: 'Всё есть',
  Режим: 'Одно направление', 'Поиск идеи': 'Ваулт + галереи', Мудборд: 'Мудборда нет',
  Изображения: 'Ассеты клиента', Композитинг: 'Плоские изображения',
  Стек: 'Astro + Tailwind', Анимация: 'CSS / WAAPI', Скролл: 'Нативный документ', Движок: 'Нативный скролл',
  'Операции 1/2': '', 'Операции 2/2': 'Нет операций', '3D': 'Без realtime 3D', Навыки: 'kill-ai-slop',
  Фиксация: 'Все брейкпоинты', Проходы: '',
};
const parse = (over = {}, opts = {}) => normalize(fromAnswers({ ...ANSWERS, ...over }, opts).plan).plan;
const BASE = parse();
const plan = (over) => ({ ...BASE, ...over, reasons: { ...BASE.reasons, ...over?.reasons } });
const PINNED = { pinned: 'the chair ritual has six meaningful states' };
const THREE = { reasons: { '3d': 'the chair is turned and inspected in 3D' }, '3dFallback': { mobile: 'a still turntable sequence', reducedMotion: 'three composed stills' } };

/* the evidence an approval is given to */
const IDEA = 'A barbershop told as one chair ritual.';
const BOARD = { path: 'board.html', bytes: '<board v1>' };

/* DNA100 */
const SCAN = {
  signals: [
    { id: 'scale-repetition', evidence: 'the chair at three scales down the board' },
    { id: 'persistent-anchor', evidence: 'the chair stays put while the room changes' },
    { id: 'overlapping-masses', evidence: 'barber, chair and mirror overlap in separate planes' },
  ],
  thesis: { persistent: 'the chair', change: 'the ritual, step by step', learned: 'what a full service involves', whyScroll: 'each step is a state the visitor advances', reducedMotion: 'the six steps as a composed sequence of stills' },
  recommend: {
    scrollArchitecture: { id: 'pinned', evidence: 'the chair at three scales down the board' },
    scrollOperations: { ids: ['layer-parallax'], evidence: { 'layer-parallax': 'barber, chair and mirror in separate planes' } },
  },
};

/* DNA101 */
const asset = (o) => ({ subject: o.id, format: 'png', alpha: false, identity: false, master: null, paid: false, desktop: 'holds', mobile: 'holds', reducedMotion: 'still', ...o });
const LAYERS = () => ({
  requirements: ['persistent-subject', 'parallax-layers'],
  assets: [
    asset({ id: 'env', role: 'background-plate', source: 'generated', derivation: 'master-source', paid: true, cost: 0.08 }),
    asset({ id: 'chair-master', subject: 'chair', role: 'persistent-foreground', source: 'generated', derivation: 'master-source', paid: true, cost: 0.08, identity: true }),
    asset({ id: 'chair', subject: 'chair', role: 'persistent-foreground', source: 'extracted', derivation: 'local-extraction', master: 'chair-master', alpha: true, identity: true }),
    asset({ id: 'chair-768', subject: 'chair', role: 'persistent-foreground', source: 'extracted', derivation: 'local-resize', master: 'chair', alpha: true, identity: true, format: 'webp' }),
    asset({ id: 'copy', role: 'typography', source: 'html', derivation: 'native', format: 'html' }),
  ],
  independent: ['chair'], flattenable: [['env']],
  identityFeatures: { 'chair-master': ['hydraulic base', 'oxblood leather', 'chrome headrest'] },
  extractionRisk: ['chrome edges against a bright wall'],
});
/* the same scene with the chair as an independent WebGL render */
const LAYERS_3D = () => {
  const p = LAYERS();
  p.assets[2] = asset({ id: 'chair', subject: 'chair', role: 'persistent-foreground', source: 'webgl', derivation: 'native', format: 'glb', identity: true });
  return p;
};
const GENERATING = { Изображения: 'Генерация fal.ai', Композитинг: 'Слои по DNA101' };
const APPROVE_ASSETS = { 'План ассетов': 'Одобрить', Бюджет: 'Одобрить список' };

/* walk a plan through its gates the way the CLI does */
const step = (prev, answers, ctx, opts = {}) => {
  const parsed = fromAnswers(answers, opts);
  const s = settle(prev, { ...parsed, plan: normalize(parsed.plan).plan }, ctx);
  return { plan: s.plan, errors: [...parsed.problems, ...s.errors, ...validate(s.plan, ctx)] };
};
const pick = (keys) => Object.fromEntries(keys.map((k) => [k, ANSWERS[k]]));
const BRIEF_A = pick(['Задача', 'Источники', 'Требования', 'Пробелы']);
const CONCEPT_A = pick(['Режим', 'Поиск идеи', 'Мудборд']);
const ASSETS_A = pick(['Изображения', 'Композитинг']);
const BUILD_A = pick(['Стек', 'Анимация', 'Скролл', 'Движок', 'Операции 1/2', 'Операции 2/2', '3D', 'Навыки']);
const REVIEW_A = pick(['Фиксация', 'Проходы']);

/* ── the lifecycle: order, ownership, labels ─────────────────────────────── */
{
  const d = D({ board: BOARD, idea: IDEA, compositing: LAYERS() });
  check('the stages run Бриф → Концепт → Ассеты → Сборка → Проверка', JSON.stringify([...new Set(d.map((x) => x.stage))]) === JSON.stringify(ORDER) && JSON.stringify(STAGES.map((s) => s.name)) === JSON.stringify(ORDER));
  check('the steps run brief → concept → concept-approval → assets → asset-approval → build → review',
    STEPS.map((s) => s.id).join(' → ') === 'brief → concept → concept-approval → assets → asset-approval → build → review');
  const own = (s) => d.filter((x) => x.step === s).flatMap((x) => x.questions.map((q) => q.header)).join('·');
  check('Бриф owns task, sources, requirements and what is missing', own('brief') === 'Задача·Источники·Требования·Пробелы');
  check('Концепт routing owns the mode, the idea search and the DNA100 moodboard', own('concept') === 'Режим·Поиск идеи·Мудборд');
  check('the concept gate asks one decision on the shown direction', own('concept-approval') === 'Направление');
  check('Ассеты routing owns images and the DNA101 compositing', own('assets') === 'Изображения·Композитинг');
  check('the asset gate asks the plan and the budget', own('asset-approval') === 'План ассетов·Бюджет');
  check('Сборка owns stack, engines, scroll, 3D and skills', own('build') === 'Стек·Анимация·Скролл·Движок·Операции 1/2·Операции 2/2·3D·Навыки');
  check('Проверка owns capture and the quality passes', own('review') === 'Фиксация·Проходы');
  check('Сборка spans «Сборка 1/2», «Сборка 2/2»; 3D sits in the second', d.filter((x) => x.step === 'build').map((x) => x.label).join('·') === 'Сборка 1/2·Сборка 2/2' && dialog({ project: NONE }, 'build', 2).questions.some((q) => q.header === '3D'));
  check('gates are labelled «Концепт · одобрение», «Ассеты · одобрение»', d.filter((x) => x.gate).map((x) => x.label).join('·') === 'Концепт · одобрение·Ассеты · одобрение');
  check('a routing step that fits one dialog carries its bare stage name', d.filter((x) => x.of === 1 && !x.gate).every((x) => x.label === x.stage));
  check('every question opens with its dialog label', d.every((x) => x.questions.every((q) => q.question.startsWith(`${x.label} · `))));
  check('no stage or header is «После» or «Генерация» any more', d.every((x) => !['После', 'Генерация'].includes(x.stage) && x.questions.every((q) => !['После', 'Генерация'].includes(q.header) && !/^(После|Генерация) ·/.test(q.question))));
  const at = (h) => d.findIndex((x) => x.questions.some((q) => q.header === h));
  check('the concept is approved before assets, assets before the stack', at('Направление') < at('Изображения') && at('Бюджет') < at('Стек'));
  check('the skills come after the architecture and the 3D they depend on', at('Скролл') < at('Навыки') && at('3D') <= at('Навыки'));
  const lastBuild = d.filter((x) => x.step === 'build').at(-1).questions.at(-1);
  check('the global rule closes the Сборка stage', lastBuild.header === 'Навыки' && lastBuild.question.endsWith(GLOBAL_RULE));
  check('Проверка states every check that is always run', REQUIRED_REVIEW.every((r) => Q('Фиксация').question.includes(r)));
  check('dialog() finds a step by id or by stage name', dialog({ project: NONE }, 'build', 2).label === 'Сборка 2/2' && dialog({ project: NONE }, 'Проверка').label === 'Проверка');
}

/* ── a gate cannot be asked before its evidence is shown ─────────────────── */
{
  const bare = D();
  const ca = bare.find((x) => x.step === 'concept-approval'), aa = bare.find((x) => x.step === 'asset-approval');
  check('without a board and an idea the concept gate waits and asks nothing', !ca.ready && !ca.questions.length && ca.waiting.includes('--board'));
  check('without a compositing plan the asset gate waits and asks nothing', !aa.ready && !aa.questions.length && aa.waiting.includes('--compositing'));
  const shown = Q('Направление', { board: BOARD, idea: IDEA });
  check('once shown, the concept gate names the board, the idea and its id', shown.question.includes('board.html') && shown.question.includes(IDEA) && shown.question.includes(conceptIdentity({ board: BOARD, idea: IDEA }).slice(0, 8)));
  check('approval is never pre-marked — it is the art director\'s', !marked('Направление', { board: BOARD, idea: IDEA }).length && !marked('План ассетов', { compositing: LAYERS() }).length);
  check('approve · revise · reject are the decisions', Q('Направление', { board: BOARD, idea: IDEA }).options.map((o) => o.label).join('·') === 'Одобрить·Доработать·Отклонить');
  const s = step({}, { ...BRIEF_A, ...CONCEPT_A, Направление: 'Одобрить' }, { project: NONE });
  check('answering the concept gate with nothing shown is refused', has(s.errors, 'must be shown before approval'), s.errors.join('; '));
}

/* ── 10 · AskUserQuestion limits ─────────────────────────────────────────── */
{
  const scenarios = [{}, { scan: SCAN }, { compositing: LAYERS() }, { board: BOARD, idea: IDEA, scan: SCAN, compositing: LAYERS_3D(), scrollArchitecture: 'pinned' }];
  const all = scenarios.flatMap((c) => D(c));
  const qs = all.flatMap((x) => x.questions);
  check('10 · ≤4 questions a dialog, 2–4 options, header ≤12 chars, label ≤5 words — in every scenario',
    all.every((x) => x.questions.length <= MAX_QUESTIONS)
    && qs.every((q) => q.options.length >= 2 && q.options.length <= 4 && q.header.length <= 12)
    && qs.every((q) => q.options.every((o) => o.label.replace(RECOMMENDED, '').split(/\s+/).length <= 5)));
  const headers = D({ board: BOARD, idea: IDEA, compositing: LAYERS() }).flatMap((x) => x.questions.map((q) => q.header));
  check('10 · every header is unique, so it is a stable answer key', new Set(headers).size === headers.length);
  check('10 · no option label contains ", " (multi answers are joined with it)', GROUPS.every((g) => g.options.every((o) => !o.label.includes(', '))));
  const build1 = dialog({ project: NONE }, 'build', 1).questions;
  const radios = build1.map((q) => q.options.filter((o) => o.label.endsWith(RECOMMENDED)));
  check('each Сборка radio group recommends exactly one option, listed first', radios.every((r, i) => r.length === 1 && build1[i].options[0] === r[0]));
  const ops = GROUPS.find((g) => g.field === 'scrollOperations');
  check('the operations are one field with all eight options, horizontal passage not among them', ops.parts.flatMap((p) => p.ids).length === 8 && !ops.options.some((o) => /горизонт/i.test(o.label)));
  check('by default only «Нет операций» is recommended among the operations', [...marked('Операции 1/2'), ...marked('Операции 2/2')].join() === 'Нет операций');
}

/* ── answer sets ─────────────────────────────────────────────────────────── */
{
  const { plan: p, problems, steps } = fromAnswers(ANSWERS);
  check('a complete routing answer set parses with no problems and validates', !problems.length && validate(normalize(p).plan, { project: NONE }).length === 0, problems.concat(validate(p, { project: NONE })).join('; '));
  check('it names the steps it answered, and no gate', steps.join(',') === 'brief,concept,assets,build,review');
  const { problems: half } = fromAnswers({ ...ANSWERS, Задача: undefined, Мудборд: undefined });
  check('a half-answered step is reported by stage', has(half, 'Бриф · Task: not answered') && has(half, 'Концепт · Moodboard: not answered'), half.join('; '));
  const { steps: some, problems: none } = fromAnswers(BUILD_A);
  check('a step left out is simply not answered yet', !none.length && some.join() === 'build');
  const keyed = Object.fromEntries(D().flatMap((x) => x.questions).map((q) => [q.question, ANSWERS[q.header]]));
  check('answers keyed by full question text parse the same', !fromAnswers(keyed).problems.length, fromAnswers(keyed).problems.join('; '));
  const ctx = { compositing: LAYERS(), board: BOARD, idea: IDEA };
  const withFigures = Object.fromEntries(D(ctx).flatMap((x) => x.questions).map((q) => [q.question, { ...ANSWERS, ...GENERATING, ...APPROVE_ASSETS, Направление: 'Одобрить' }[q.header]]));
  const wf = fromAnswers(withFigures).plan;
  check('…including the questions whose text carries live figures', wf.assetApproval === 'approve' && wf.assetPlanApproval === 'approved' && wf.conceptApproval === 'approved');
}

/* ── Бриф reads BRIEF.md and asks only what it leaves open ───────────────── */
{
  const full = tmp(), part = tmp(), none = tmp(); dirs.push(full, part, none);
  writeFileSync(join(full, 'BRIEF.md'), `# BRIEF\n\n## 1. Design Read\n\nREDESIGN of a barbershop site for walk-in clients.\n\n## 2. The concept\n\n${IDEA}\n\n## 3. Assets\n\nClient photographs of the shop; no portraits.\n`);
  writeFileSync(join(part, 'BRIEF.md'), `# BRIEF\n\n## 1. Design Read\n\nREDESIGN of a barbershop site.\n\n## 2. The concept\n\n_One sentence: what this page **is**, not what it contains._\n\n## 4. The peak (\`DNA28\`)\n\n_The sentence a visitor would say to a friend. One per page. It gets the asset\nbudget, the silence in front of it, and the most scroll room._\n`);
  const b = readBrief(full), p = readBrief(part), n = readBrief(none);
  check('BRIEF.md is read: a complete brief has no empty section, and its concept is the idea', b.exists && !b.empty.length && b.idea === IDEA);
  check('an incomplete brief names its empty sections — prompts and untouched scaffold count as empty', p.empty.length === 2 && p.empty.some((t) => t.startsWith('2.')) && p.empty.some((t) => t.startsWith('4.')));
  const bd = D({ brief: b }).find((x) => x.step === 'brief');
  check('a complete BRIEF.md asks no gap question', !bd.questions.some((q) => q.header === 'Пробелы') && bd.questions.length === 3);
  check('…and the first question summarises BRIEF.md as the source of facts', bd.questions[0].question.includes('BRIEF.md — источник фактов: заполнено 3 из 3'));
  const r = fromAnswers({ Задача: 'Редизайн', Источники: 'Запрос или бриф', Требования: '' }, { brief: b });
  check('…and records the gaps from BRIEF.md, not from a checkbox', !r.problems.length && JSON.stringify(r.plan.briefGaps) === '["nothing"]' && r.plan.briefGapsFrom === 'BRIEF.md');
  const pd = D({ brief: p }).find((x) => x.step === 'brief');
  check('an incomplete BRIEF.md asks the gap question and lists what is empty', pd.questions.some((q) => q.header === 'Пробелы' && q.question.includes('не заполнено: 2. The concept')));
  check('«Всё есть» against an incomplete BRIEF.md is refused — facts are not invented', has(validate(plan({ briefGaps: ['nothing'] }), { project: NONE, brief: p }), 'would invent them'));
  check('no BRIEF.md: the stage says so and asks the gaps', D({ brief: n }).find((x) => x.step === 'brief').questions[0].question.includes('BRIEF.md не найден'));
}

/* ── 1 · single-answer groups ────────────────────────────────────────────── */
{
  const e = validate(plan({ scrollArchitecture: ['pinned', 'native'] }), { project: NONE });
  check('1 · two scroll architectures are refused', has(e, 'Scroll architecture: exactly one'), e.join('; '));
  const p = fromAnswers({ ...ANSWERS, Скролл: 'Пин-сценарий / scrub, Горизонтальный проход' }).plan;
  check('1 · an answer naming two architectures is refused, not reduced to the first', Array.isArray(p.scrollArchitecture) && has(validate(p, { project: NONE }), 'exactly one'));
  for (const field of ['baseStack', 'motionEngine', 'scrollEngine', '3d', 'briefTask', 'conceptMode', 'assetCompositing', 'conceptApproval']) {
    const g = GROUPS.find((x) => x.field === field);
    const err = validate(plan({ [field]: g.options.slice(0, 2).map((o) => o.id) }), { project: NONE });
    check(`1 · two ${g.stage} · ${g.label.toLowerCase()} options are refused`, has(err, `${g.label}: exactly one`), err.join('; '));
  }
  for (const id of ['native', 'snap']) check(`1 · ${id} architecture stands on its own`, validate(plan({ scrollArchitecture: id }), { project: NONE }).length === 0);
}

/* ── 2–4 · supporting operations ─────────────────────────────────────────── */
{
  const p = parse({ 'Операции 1/2': 'Появление при скролле, Sticky-элементы', 'Операции 2/2': 'Переходы глав' });
  check('2 · several operations across both questions are one field',
    JSON.stringify(p.scrollOperations) === '["scroll-reveals","sticky","chapter-transitions"]' && validate(p, { project: NONE }).length === 0, JSON.stringify(p.scrollOperations));
  check('3 · a pinned sequence and scroll-triggered reveals coexist', validate(normalize(plan({ scrollArchitecture: 'pinned', scrollOperations: ['scroll-reveals'], reasons: PINNED })).plan, { project: NONE }).length === 0);
  check('4 · a pinned sequence and layer parallax coexist', validate(normalize(plan({ scrollArchitecture: 'pinned', scrollOperations: ['layer-parallax'], reasons: PINNED })).plan, { project: NONE }).length === 0);
  check('operations that move need a motion engine', has(validate(plan({ motionEngine: 'none', scrollOperations: ['scroll-reveals', 'masks'] }), { project: NONE }), 'Появление при скролле, Маски / шторки move'));
  check('sticky elements and snap chapters need no motion engine', validate(plan({ motionEngine: 'none', scrollArchitecture: 'snap', scrollOperations: ['sticky'] }), { project: NONE }).length === 0);
  check('a pinned architecture with no motion engine is refused', has(validate(plan({ motionEngine: 'none', scrollArchitecture: 'pinned', reasons: PINNED }), { project: NONE }), 'Пин-сценарий / scrub move'));
}

/* ── 5 · exclusive boxes ─────────────────────────────────────────────────── */
{
  check('5 · ticking «Нет операций» clears the operations', JSON.stringify(toggle('scrollOperations', ['scroll-reveals', 'sticky'], 'none')) === '["none"]');
  check('5 · ticking an operation clears «Нет операций»', JSON.stringify(toggle('scrollOperations', ['none'], 'masks')) === '["masks"]');
  check('5 · unticking keeps the rest', JSON.stringify(toggle('scrollOperations', ['masks', 'sticky'], 'masks')) === '["sticky"]');
  check('5 · «Нет операций» beside an operation is refused', has(validate(plan({ scrollOperations: ['none', 'sticky'] }), { project: NONE }), 'excludes the others'));
  check('5 · an answer ticking both is refused, not resolved by guessing', has(validate(parse({ 'Операции 1/2': 'Параллакс слоёв' }), { project: NONE }), 'excludes the others'));
  check('5 · no operations and no «Нет операций» is refused', has(validate(plan({ scrollOperations: [] }), { project: NONE }), 'choose at least one'));
  check('5 · «Всё есть» in Бриф is exclusive the same way', has(validate(plan({ briefGaps: ['nothing', 'photos'] }), { project: NONE }), 'excludes the others') && JSON.stringify(toggle('briefGaps', ['photos'], 'nothing')) === '["nothing"]');
  check('5 · «Только мудборд» excludes the other idea sources', has(validate(plan({ conceptSources: ['moodboard-only', 'vault'] }), { project: NONE }), 'excludes the others'));
}

/* ── 6–7 · recommendations carry evidence and never select ───────────────── */
{
  const concept = {
    scrollArchitecture: { id: 'pinned', evidence: 'the same chair in four states down the board' },
    scrollOperations: { ids: ['layer-parallax', 'masks'], evidence: { 'layer-parallax': 'separated foreground, chair and wall planes', masks: 'cropped masses at the frame edge' } },
  };
  const ctx = { concept, scrollArchitecture: 'pinned' };
  check('6 · the recommended architecture is marked and carries its evidence', first('Скролл', ctx) === 'Пин-сценарий / scrub' + RECOMMENDED && Q('Скролл', ctx).options[0].description.startsWith('Мудборд: the same chair'));
  check('6 · each recommended operation is marked with its own evidence',
    marked('Операции 1/2', ctx).length === 2 && Q('Операции 1/2', ctx).options.slice(0, 2).every((o) => o.description.startsWith('Мудборд: ')) && !marked('Операции 2/2', ctx).length);
  check('6 · answering native and «Нет операций» yields exactly that — the recommendation selected nothing',
    BASE.scrollArchitecture === 'native' && JSON.stringify(BASE.scrollOperations) === '["none"]' && BASE.motionEngine === 'css-waapi' && BASE.scrollEngine === 'native' && BASE['3d'] === 'none');
  check('6 · normalisation never adds an operation', JSON.stringify(normalize(plan({ scrollArchitecture: 'pinned', reasons: PINNED })).plan.scrollOperations) === '["none"]');
  const refused = (c) => checkRecommendation(c).length > 0;
  check('7 · an operation without evidence is refused', refused({ scrollOperations: { ids: ['layer-parallax'], evidence: {} } }));
  check('7 · parallax "because it is cinematic" still needs evidence per operation', refused({ scrollOperations: { ids: ['layer-parallax', 'masks'], evidence: { masks: 'cropped masses' } } }));
  check('7 · a pinned architecture without evidence is refused', refused({ scrollArchitecture: { id: 'pinned' } }));
  check('7 · GSAP or Lenis recommended without evidence is refused', refused({ motionEngine: { id: 'gsap' } }) && refused({ scrollEngine: { id: 'lenis' } }));
  check('7 · an option outside the schema is refused', refused({ scrollArchitecture: { id: 'parallax', evidence: 'x' } }) && refused({ scrollOperations: { ids: ['horizontal'], evidence: { horizontal: 'x' } } }));
  check('7 · «Нет операций» recommended beside an operation is refused', refused({ scrollOperations: { ids: ['none', 'sticky'], evidence: { sticky: 'x' } } }));
  check('7 · only Сборка fields are the concept\'s to recommend', refused({ supportingSkills: { ids: ['scroll-site'] } }) && refused({ assetApproval: { id: 'approve' } }) && refused({ conceptApproval: { id: 'approved' } }));
  check('7 · the lightest options need no evidence', !refused({ scrollArchitecture: { id: 'native' }, motionEngine: { id: 'css-waapi' }, scrollEngine: { id: 'native' }, '3d': { id: 'none' } }));
  let threw = false;
  try { D({ concept: { scrollOperations: { ids: ['masks'], evidence: {} } } }); } catch { threw = true; }
  check('7 · the pop-up is not built from a refused recommendation', threw);
}

/* ── realtime 3D ─────────────────────────────────────────────────────────── */
{
  const with3d = (id, over = {}) => plan({ '3d': id, ...(id === 'none' ? {} : THREE), ...over });
  check('3D · «Без realtime 3D» is the default, the lightest, and needs nothing', first('3D') === 'Без realtime 3D' + RECOMMENDED && validate(with3d('none'), { project: NONE }).length === 0);
  check('3D · Three.js is accepted with Astro + Tailwind', validate(with3d('three'), { project: NONE }).length === 0, validate(with3d('three'), { project: NONE }).join('; '));
  check('3D · Three.js is accepted with plain HTML / CSS / JS', validate(with3d('three', { baseStack: 'vanilla' }), { project: NONE }).length === 0);
  check('3D · React Three Fiber is accepted on a React stack', validate(with3d('r3f', { baseStack: 'existing' }), { project: REACT }).length === 0);
  check('3D · React Three Fiber is refused on a stack without React', has(validate(with3d('r3f'), { project: NONE }), 'needs a React stack') && has(validate(with3d('r3f', { baseStack: 'vanilla' }), { project: NONE }), 'needs a React stack'));
  check('3D · an external / embedded scene is accepted with its evidence', validate(with3d('external', { reasons: { '3d': 'the configurator is the brand\'s hosted scene' } }), { project: NONE }).length === 0);
  check('3D · any option but none needs written evidence', has(validate(with3d('three', { reasons: {} }), { project: NONE }), 'needs written evidence'));
  check('3D · a mobile and a reduced-motion fallback must be recorded',
    has(validate(with3d('three', { '3dFallback': { reducedMotion: 'stills' } }), { project: NONE }), 'mobile fallback')
    && has(validate(with3d('external', { '3dFallback': { mobile: 'a poster frame' } }), { project: NONE }), 'reduced-motion fallback'));
  check('3D · a 3D recommendation needs evidence', checkRecommendation({ '3d': { id: 'three' } }).length > 0);
  let direct = false;
  try { D({ concept: { '3d': { id: 'three', evidence: 'it would look great' } } }); } catch (e) { direct = e.message.includes('only from a DNA101 plan'); }
  check('3D · even with evidence, 3D is recommended only from a DNA101 plan that needs it', direct);
  check('3D · a moodboard signal alone cannot recommend 3D', has(checkScan({ ...SCAN, recommend: { ...SCAN.recommend, '3d': { id: 'three', evidence: 'the chair at three scales' } } }), 'cannot recommend 3D'));
  check('3D · a DNA101 plan without an independent render needs no 3D', !needs3d(LAYERS()) && first('3D', { compositing: LAYERS() }) === 'Без realtime 3D' + RECOMMENDED);
  const ctx = { compositing: LAYERS_3D() };
  check('3D · a DNA101 independent WebGL render recommends Three.js, with its evidence',
    first('3D', ctx) === 'Three.js' + RECOMMENDED && Q('3D', ctx).options[0].description.startsWith('DNA101: chair (chair) — независимый WebGL/3D-рендер'));
  check('3D · …and recommends the threejs-webgl skill beside it', marked('Навыки', ctx).includes('threejs-webgl') && !marked('Навыки').includes('threejs-webgl'));
  check('3D · the recommendation selects nothing: answering none yields none', parse({ '3D': 'Без realtime 3D' })['3d'] === 'none');
  const n = normalize(with3d('three'));
  check('3D · choosing Three.js recommends threejs-webgl and never adds it', !n.plan.supportingSkills.includes('threejs-webgl') && n.notes.some((x) => x.includes('threejs-webgl recommended, not added')));
  check('3D · it never pulls in GSAP or Lenis either', recommend({ project: NONE, compositing: LAYERS_3D() }).motionEngine === 'css-waapi' && recommend({ project: NONE, compositing: LAYERS_3D() }).scrollEngine === 'native');
}

/* ── DNA100 feeds Концепт, and through it Сборка ─────────────────────────── */
{
  check('DNA100 · three signals and five states make a thesis', qualifies(SCAN) && !checkScan(SCAN).length);
  check('DNA100 · Концепт recommends «Тезис → Сборка» and shows the evidence and the five states',
    first('Мудборд', { scan: SCAN }) === 'Тезис → Сборка' + RECOMMENDED && ['the chair at three scales', 'остаётся: the chair', 'reduced motion: the six steps'].every((t) => Q('Мудборд', { scan: SCAN }).question.includes(t)));
  check('DNA100 · the thesis recommends Сборка\'s architecture and operations, with evidence',
    first('Скролл', { scan: SCAN }) === 'Пин-сценарий / scrub' + RECOMMENDED && marked('Операции 1/2', { scan: SCAN }).join() === 'Параллакс слоёв');
  check('DNA100 · it pulls in neither GSAP, Lenis nor 3D', first('Анимация', { scan: SCAN }) === 'CSS / WAAPI' + RECOMMENDED && first('Движок', { scan: SCAN }) === 'Нативный скролл' + RECOMMENDED && first('3D', { scan: SCAN }) === 'Без realtime 3D' + RECOMMENDED);
  check('DNA100 · «Только стиль» in Концепт keeps the thesis out of Сборка', first('Скролл', { scan: SCAN, useThesis: false }) === 'Нативный документ' + RECOMMENDED);
  const two = { ...SCAN, signals: SCAN.signals.slice(0, 2), recommend: undefined };
  check('DNA100 · two signals: «Только стиль» is recommended, no thesis forced', first('Мудборд', { scan: two }) === 'Только стиль' + RECOMMENDED && !qualifies(two));
  check('DNA100 · a scan with fewer than three signals may not recommend', has(checkScan({ ...two, recommend: SCAN.recommend }), 'fewer than three'));
  check('DNA100 · three signals with a missing state are refused', has(checkScan({ ...SCAN, thesis: { ...SCAN.thesis, whyScroll: '' } }), 'whyScroll'));
  check('DNA100 · a signal outside the list, or without evidence, is refused', has(checkScan({ ...SCAN, signals: [...SCAN.signals, { id: 'cinematic', evidence: 'x' }] }), 'not a DNA100 signal') && has(checkScan({ signals: [{ id: 'cause-effect', evidence: '' }] }), 'no visible evidence'));
  check('DNA100 · answering «Тезис → Сборка» without a qualifying scan is refused', has(validate(plan({ conceptMoodboard: 'thesis' }), { project: NONE, scan: two }), 'needs a DNA100 scan'));
  check('DNA100 · with a qualifying scan it passes', validate(plan({ conceptMoodboard: 'thesis' }), { project: NONE, scan: SCAN }).length === 0);
}

/* ── DNA101 feeds Ассеты ─────────────────────────────────────────────────── */
{
  const ctx = { compositing: LAYERS() };
  check('DNA101 · an active plan recommends layers', first('Композитинг', ctx) === 'Слои по DNA101' + RECOMMENDED && Q('Композитинг', ctx).question.includes('persistent-subject'));
  const budget = Q('Бюджет', ctx).question;
  check('DNA101 · Бюджет shows paid sources (not files), cost, local derivatives, alpha and extraction risk',
    ['2 исходн. генерац. (5 файлов)', '0.16', 'chair, chair-768', 'альфа: chair', 'chrome edges'].every((t) => budget.includes(t)), budget);
  check('DNA101 · a paid list is never pre-approved', !marked('Бюджет', ctx).length);
  check('DNA101 · with no plan, flat images are the recommendation', first('Композитинг') === 'Плоские изображения' + RECOMMENDED);
  const p = plan({ assetImages: ['supplied', 'generated'], assetCompositing: 'layered', assetPlanApproval: 'approved', assetApproval: 'approve' });
  check('DNA101 · a layered plan with its paid list approved passes', validate(p, { project: NONE, compositing: LAYERS() }).length === 0, validate(p, { project: NONE, compositing: LAYERS() }).join('; '));
  check('DNA101 · flattening what must stay a layer is refused', has(validate({ ...p, assetCompositing: 'flat' }, { project: NONE, compositing: LAYERS() }), 'needs independent layers'));
  check('DNA101 · approving with no listed plan is refused', has(validate(p, { project: NONE }), 'no listed plan to approve'));
  check('DNA101 · generating with no paid generation approved is refused', has(validate({ ...p, assetApproval: 'none' }, { project: NONE, compositing: LAYERS() }), 'no paid list is approved'));
  check('DNA101 · approving a budget with no generation is refused', has(validate({ ...p, assetImages: ['supplied'] }, { project: NONE, compositing: LAYERS() }), 'approved for no generation'));
  const broken = LAYERS(); broken.assets[4] = asset({ id: 'copy', role: 'typography', source: 'generated', derivation: 'master-source', paid: true, cost: 0.08 });
  check('DNA101 · the compositing plan\'s own errors stop the build plan', has(validate(p, { project: NONE, compositing: broken }), 'Ассеты · DNA101: asset copy: typography is SVG or HTML'));
  check('GI3 · placeholders alone, with no facts named, are refused', has(validate(plan({ assetImages: ['placeholders'] }), { project: NONE }), 'missing photography is not one'));
  check('GI3 · placeholders for named facts pass', validate(plan({ assetImages: ['placeholders'], reasons: { placeholders: 'the listed car and its price' } }), { project: NONE }).length === 0);
  check('GI3 · generation is offered as disclosed art direction, placeholders only for facts',
    Q('Изображения').options.some((o) => o.description.includes('синтетическая арт-дирекция допустима')) && Q('Изображения').options.some((o) => o.description.includes('не замена концепту')));
}

/* ── the gates: approval, identity, invalidation ─────────────────────────── */
{
  const CTX = { project: NONE, board: BOARD, idea: IDEA, compositing: LAYERS(), compositingPath: 'layers.json' };
  let s = step({}, BRIEF_A, CTX);
  s = step(s.plan, CONCEPT_A, CTX);
  check('gate · routing steps settle in order with no errors', !s.errors.length, s.errors.join('; '));
  check('gate · implementation is blocked without concept approval', !gate('implementation', s.plan, CTX).open && has(gate('implementation', s.plan, CTX).reasons, 'concept: not approved yet'));
  const early = step(s.plan, BUILD_A, CTX);
  check('gate · Сборка cannot be answered before the concept is approved', has(early.errors, 'the concept must be approved first'));
  check('gate · Ассеты cannot be answered before the concept is approved', has(step(s.plan, ASSETS_A, CTX).errors, 'the concept must be approved first'));

  const sent = step(s.plan, { Направление: 'Доработать' }, CTX);
  check('gate · «Доработать» closes the concept gate', !sent.errors.length && sent.plan.approvals.concept.status === 'revise' && has(gate('implementation', sent.plan, CTX).reasons, 'sent back for revision'));
  check('gate · the unchanged direction cannot then be approved as it was', has(step(sent.plan, { Направление: 'Одобрить' }, CTX).errors, 'was sent back and has not changed'));
  const rejected = step(s.plan, { Направление: 'Отклонить' }, CTX);
  check('gate · «Отклонить» closes it too', rejected.plan.approvals.concept.status === 'reject' && has(gate('implementation', rejected.plan, CTX).reasons, 'rejected') && has(step(rejected.plan, { Направление: 'Одобрить' }, CTX).errors, 'has not changed'));
  const V2 = { ...CTX, board: { path: 'board.html', bytes: '<board v2>' } };
  const revised = step(sent.plan, { Направление: 'Одобрить' }, V2);
  check('gate · a revised board can be approved, and the gate opens for it', !revised.errors.length && revised.plan.approvals.concept.status === 'approved' && !gate('implementation', revised.plan, V2).reasons.some((r) => r.startsWith('concept')));

  let a = step(s.plan, { Направление: 'Одобрить' }, CTX);
  check('gate · approval records the identity of what was shown', a.plan.approvals.concept.identity === conceptIdentity(CTX) && a.plan.approvals.concept.board === 'board.html');
  check('gate · a changed board invalidates the concept approval', has(gate('implementation', a.plan, V2).reasons, 'it changed'));
  check('gate · a changed governing idea invalidates it', has(gate('implementation', a.plan, { ...CTX, idea: 'A barbershop told as a map of the street.' }).reasons, 'it changed'));
  check('gate · a changed visual contract invalidates it', has(gate('implementation', a.plan, { ...CTX, contract: { path: 'contract.md', bytes: 'type: serif' } }).reasons, 'it changed'));
  check('gate · a changed thesis invalidates it', conceptIdentity({ ...CTX, scan: SCAN }) !== conceptIdentity(CTX));

  a = step(a.plan, { ...ASSETS_A, ...GENERATING }, CTX);
  check('gate · Ассеты opens once the concept is approved', !a.errors.length, a.errors.join('; '));
  check('gate · paid generation is blocked before the asset plan is approved', !gate('generation', a.plan, CTX).open && has(gate('generation', a.plan, CTX).reasons, 'asset plan: not approved yet'));
  check('gate · DNA101 applies, so Сборка waits for the asset plan', has(step(a.plan, BUILD_A, CTX).errors, 'the asset plan must be approved first'));
  check('gate · the asset gate cannot be answered with no plan shown', has(step(a.plan, APPROVE_ASSETS, { ...CTX, compositing: undefined }).errors, 'must be shown before approval'));
  const held = step(a.plan, { 'План ассетов': 'Доработать', Бюджет: 'Одобрить список' }, CTX);
  check('gate · «Доработать» on the asset plan closes generation, even with the list ticked', held.plan.approvals.assetPlan.status === 'revise' && held.plan.approvals.budget.status === 'held' && !gate('generation', held.plan, CTX).open);
  check('gate · the unchanged asset plan cannot then be approved as it was', has(step(held.plan, APPROVE_ASSETS, CTX).errors, 'was sent back and has not changed'));

  a = step(a.plan, APPROVE_ASSETS, CTX);
  check('gate · approving the shown plan and list opens paid generation', !a.errors.length && gate('generation', a.plan, CTX).open, gate('generation', a.plan, CTX).reasons.join('; '));
  check('gate · the budget record names the approved sources, budget and plan id', JSON.stringify(a.plan.approvals.budget.assets) === '["env","chair-master"]' && a.plan.approvals.budget.budget === 0.16 && a.plan.approvals.budget.identity === assetIdentity(LAYERS()));
  const morePaid = LAYERS(); morePaid.assets.push(asset({ id: 'chair-rear', subject: 'chair', role: 'persistent-foreground', source: 'generated', derivation: 'paid-derived', master: 'chair-master', paid: true, cost: 0.05, identity: true }));
  const g1 = gate('generation', a.plan, { ...CTX, compositing: morePaid });
  check('gate · a changed paid list invalidates the asset approval and the budget', !g1.open && has(g1.reasons, 'asset plan: approved for id') && has(g1.reasons, 'the paid list or budget changed'));
  const pricier = LAYERS(); pricier.assets[0].cost = 0.5;
  check('gate · a changed budget invalidates them too', !gate('generation', a.plan, { ...CTX, compositing: pricier }).open);
  const relayered = LAYERS(); relayered.flattenable = [];
  check('gate · a changed compositing plan invalidates the asset approval', has(gate('implementation', a.plan, { ...CTX, compositing: relayered }).reasons, 'asset plan: approved for id'));

  check('gate · implementation still waits for Сборка', has(gate('implementation', a.plan, CTX).reasons, 'Сборка: the build plan is not answered yet'));
  check('gate · Проверка cannot come before Сборка', has(step(a.plan, REVIEW_A, CTX).errors, 'Сборка comes first'));
  a = step(a.plan, BUILD_A, CTX);
  check('gate · with both approvals current, Сборка is answered and implementation opens', !a.errors.length && gate('implementation', a.plan, CTX).open, a.errors.concat(gate('implementation', a.plan, CTX).reasons).join('; '));
  a = step(a.plan, REVIEW_A, CTX);
  check('gate · Проверка settles after Сборка', !a.errors.length);
  const noDna = { ...CTX, compositing: undefined };
  let flat = step({}, BRIEF_A, noDna); flat = step(flat.plan, CONCEPT_A, noDna); flat = step(flat.plan, { Направление: 'Одобрить' }, noDna); flat = step(flat.plan, ASSETS_A, noDna); flat = step(flat.plan, BUILD_A, noDna);
  check('gate · without DNA101 the asset gate is not needed for implementation', !flat.errors.length && gate('implementation', flat.plan, noDna).open, flat.errors.concat(gate('implementation', flat.plan, noDna).reasons).join('; '));
  check('gate · …but paid generation still needs a plan and an approval', !gate('generation', flat.plan, noDna).open);
}

/* ── 8 · version-1 plans migrate without losing their meaning ────────────── */
{
  const v1 = (scrollBehavior) => ({ version: 1, baseStack: 'vanilla', motionEngine: 'css-waapi', scrollBehavior, scrollEngine: 'native', supportingSkills: ['kill-ai-slop'], reasons: { pinned: 'six states' } });
  const std = migrate(v1('standard')), pin = migrate(v1('pinned')), rev = migrate(v1('reveals'));
  check('8 · «Обычная страница» → native document, no operations', std.scrollArchitecture === 'native' && JSON.stringify(std.scrollOperations) === '["none"]');
  check('8 · «Пин-сценарий / scrub» → pinned, its reason kept', pin.scrollArchitecture === 'pinned' && pin.reasons.pinned === 'six states');
  check('8 · «Появление при скролле» → native document + scroll-triggered reveals', rev.scrollArchitecture === 'native' && JSON.stringify(rev.scrollOperations) === '["scroll-reveals"]');
  check('8 · old plans migrate to 3d: none', std['3d'] === 'none' && pin['3d'] === 'none' && rev['3d'] === 'none');
  const v2no3d = { version: 2, baseStack: 'vanilla', motionEngine: 'css-waapi', scrollArchitecture: 'pinned', scrollOperations: ['none'], scrollEngine: 'native', supportingSkills: [] };
  check('8 · a version-2 plan from before the 3D question migrates to 3d: none', migrate(v2no3d)['3d'] === 'none');
  check('8 · the migrated plan drops the old field and records where it came from', !('scrollBehavior' in rev) && rev.version === PLAN_VERSION && rev.migratedFrom.scrollBehavior === 'reveals');
  check('8 · a current plan passes through untouched', migrate(BASE) === BASE);
  const d = tmp(); dirs.push(d);
  writeFileSync(join(d, 'build-plan.json'), JSON.stringify(v1('reveals')));
  const back = load(d);
  check('8 · load() reads a version-1 file as version 2, Сборка only', back.scrollArchitecture === 'native' && back.scrollOperations[0] === 'scroll-reveals' && back['3d'] === 'none' && back.briefTask === undefined);
  check('8 · and describes it without inventing the stages it never had', describe(back).includes('СБОРКА') && !describe(back).includes('БРИФ'));
  const old = { Стек: 'HTML / CSS / JS', Анимация: 'CSS / WAAPI', Скролл: 'Появление при скролле', Движок: 'Нативный скролл', Навыки: 'kill-ai-slop' };
  const { plan: a, problems } = fromAnswers(old);
  check('8 · a version-1 answer set still parses with its meaning, 3D none', !problems.length && a.scrollArchitecture === 'native' && a.scrollOperations[0] === 'scroll-reveals' && a['3d'] === 'none' && validate(a, { project: NONE }).length === 0, problems.concat(validate(a, { project: NONE })).join('; '));
  const b = fromAnswers({ ...old, Скролл: 'Пин-сценарий / scrub' }, { reasons: PINNED }).plan;
  check('8 · a version-1 pinned answer keeps no invented operations', b.scrollArchitecture === 'pinned' && JSON.stringify(b.scrollOperations) === '["none"]');
  const current = fromAnswers({ ...ANSWERS, 'Операции 1/2': undefined, 'Операции 2/2': undefined });
  check('8 · a current answer set without the operations is not quietly read as version 1',
    has(current.problems, 'Scroll operations: not answered') && !current.plan.legacyAnswers && current.plan.briefTask === 'new', current.problems.join('; '));
  check('8 · a current answer set must answer 3D', has(fromAnswers({ ...ANSWERS, '3D': undefined }).problems, 'Realtime 3D: not answered'));
}

/* ── 9 · GSAP and Lenis stay the visitor's own decisions ─────────────────── */
{
  const concept = { scrollArchitecture: { id: 'pinned', evidence: 'repeated object states' } };
  const r = recommend({ project: NONE, concept });
  check('9 · recommending pinned leaves the motion and scroll engines on their lightest', r.motionEngine === 'css-waapi' && r.scrollEngine === 'native');
  const gsap = { concept: { ...concept, motionEngine: { id: 'gsap', evidence: 'the ritual needs one coordinated timeline' } } };
  check('9 · GSAP may be recommended with evidence, and Lenis stays unrecommended', first('Анимация', gsap) === 'GSAP' + RECOMMENDED && first('Движок', gsap) === 'Нативный скролл' + RECOMMENDED);
  const n = normalize(plan({ scrollArchitecture: 'pinned', reasons: PINNED })).plan;
  check('9 · a pinned plan passes on CSS / WAAPI and native scroll', n.motionEngine === 'css-waapi' && n.scrollEngine === 'native' && validate(n, { project: NONE }).length === 0);
  check('9 · GSAP without the beat that needs it is refused', has(validate(plan({ motionEngine: 'gsap' }), { project: NONE }), 'reasons.gsap'));
  check('9 · Lenis without a documented reason is refused', has(validate(plan({ scrollEngine: 'lenis' }), { project: NONE }), 'reasons.lenis'));
  check('9 · Lenis carries the synchronisation and native-behaviour note', GROUPS.find((g) => g.field === 'scrollEngine').options.find((o) => o.id === 'lenis').description === LENIS_NOTE);
}

/* ── Бриф, Концепт and Проверка recommendations ──────────────────────────── */
{
  const existing = { exists: true, deps: ['astro'], bootstrap: false, tailwind: false, react: false };
  check('Бриф recommends a redesign for an existing project, a new site otherwise', recommend({ project: existing }).briefTask === 'redesign' && recommend({ project: NONE }).briefTask === 'new');
  check('Концепт recommends one direction; three only when asked', first('Режим') === 'Одно направление' + RECOMMENDED);
  check('Проверка recommends every breakpoint; scroll stops and a recording only for a scroll-led page',
    marked('Фиксация').join() === 'Все брейкпоинты' && marked('Фиксация', { scan: SCAN }).length === 3);
  check('the quality passes are optional', validate(plan({ reviewPasses: [] }), { project: NONE }).length === 0);
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
  writeFileSync(join(d, 'package.json'), JSON.stringify({ dependencies: { bootstrap: '^5.3.0', react: '^18.3.1' }, devDependencies: { tailwindcss: '^4.0.0' } }));
  const p = detectProject(d);
  check('detection reads Bootstrap, Tailwind and React from package.json', p.exists && p.bootstrap && p.tailwind && p.react);
  check('an established project is recommended its own stack', recommend({ project: p }).baseStack === 'existing');
}

/* ── scroll-site and the pinned architecture ─────────────────────────────── */
{
  check('Сборка recommends scroll-site after a pinned answer', marked('Навыки', { scrollArchitecture: 'pinned' }).includes('scroll-site'));
  check('Сборка does not recommend scroll-site for a native document', !marked('Навыки', { scrollArchitecture: 'native' }).includes('scroll-site'));
  const { plan: p, notes } = normalize(plan({ scrollArchitecture: 'pinned', supportingSkills: ['kill-ai-slop'], reasons: PINNED }));
  check('a pinned architecture selects scroll-site', p.supportingSkills.includes('scroll-site') && notes.length === 1);
  check('a native document does not require scroll-site', !normalize(plan({})).plan.supportingSkills.includes('scroll-site'));
  check('normalisation never touches the stack, the engines, 3D or the assets', ['baseStack', 'motionEngine', 'scrollEngine', '3d', 'assetImages'].every((f) => JSON.stringify(p[f]) === JSON.stringify(BASE[f])));
  check('a pinned sequence needs the reason the content requires it', has(validate(plan({ scrollArchitecture: 'pinned' }), { project: NONE }), 'reasons.pinned'));
}

/* ── NS Barbers stays representable ──────────────────────────────────────── */
{
  const SCOPE = 'Use the pinned sequence only for the governing chair ritual. Keep supporting content normally scrollable and scannable.';
  const p = parse({
    ...GENERATING, ...APPROVE_ASSETS, Мудборд: 'Тезис → Сборка',
    Анимация: 'GSAP', Скролл: 'Пин-сценарий / scrub', Движок: 'Lenis',
    'Операции 1/2': 'Появление при скролле, Параллакс слоёв', 'Операции 2/2': 'Переходы глав', Навыки: 'scroll-site, kill-ai-slop',
  }, {
    reasons: { gsap: 'the chair ritual is one coordinated timeline', pinned: 'the chair ritual has distinct states', lenis: 'controlled smoothing carries the ritual', 'layer-parallax': 'restrained' },
    notes: [SCOPE],
  });
  const errs = validate(p, { project: NONE, scan: SCAN, compositing: LAYERS() });
  check('NS Barbers: Astro + Tailwind · GSAP · pinned · reveals + parallax + chapter transitions · Lenis · no 3D',
    !errs.length && p.baseStack === 'astro-tailwind' && p.motionEngine === 'gsap' && p.scrollArchitecture === 'pinned' && p.scrollEngine === 'lenis' && p['3d'] === 'none'
    && JSON.stringify(p.scrollOperations) === '["scroll-reveals","layer-parallax","chapter-transitions"]', errs.join('; '));
  const d = tmp(); dirs.push(d);
  save(d, p, { scan: SCAN, compositing: LAYERS() });
  const back = load(d);
  check('NS Barbers: the scope note and the "restrained" parallax survive a save', back.notes[0] === SCOPE && back.reasons['layer-parallax'] === 'restrained' && describe(back).includes(SCOPE));
}

/* ── persistence of every stage ──────────────────────────────────────────── */
{
  const d = tmp(); dirs.push(d);
  const CTX = { project: NONE, board: BOARD, idea: IDEA, compositing: LAYERS(), compositingPath: 'layers.json', scan: SCAN };
  let s = step({}, BRIEF_A, CTX);
  for (const a of [{ ...CONCEPT_A, Мудборд: 'Тезис → Сборка' }, { Направление: 'Одобрить' }, { ...ASSETS_A, ...GENERATING }, APPROVE_ASSETS]) s = step(s.plan, a, CTX);
  s = step(s.plan, { ...BUILD_A, Стек: 'HTML / CSS / JS', Анимация: 'GSAP', Скролл: 'Горизонтальный проход', Движок: 'Lenis', 'Операции 1/2': 'Sticky-элементы', 'Операции 2/2': 'Индикатор прогресса', '3D': 'Three.js' },
    CTX, { reasons: { gsap: 'scrubbed passage', lenis: 'drag gallery', '3d': 'the chair is inspected in 3D' }, fallback3d: { mobile: 'a still sequence', reducedMotion: 'three stills' } });
  s = step(s.plan, { ...REVIEW_A, Проходы: 'bolder' }, CTX);
  check('a whole lifecycle settles with no errors', !s.errors.length, s.errors.join('; '));
  const rec = save(d, s.plan, CTX);
  const back = load(d);
  check('build-plan.json keeps the seven Сборка fields at the top level, 3D among them', FIELDS.length === 7 && FIELDS.includes('3d') && FIELDS.every((f) => JSON.stringify(rec[f]) === JSON.stringify(s.plan[f]) && JSON.stringify(back[f]) === JSON.stringify(s.plan[f])));
  check('the 3D choice and its fallbacks are saved', rec['3d'] === 'three' && rec['3dFallback'].mobile === 'a still sequence' && back['3dFallback'].reducedMotion === 'three stills');
  check('the other stages are saved under brief · concept · assets · review', ['brief', 'concept', 'assets', 'review'].every((k) => rec[k]) && rec.brief.task === 'new' && rec.review.passes[0] === 'bolder');
  check('…and read back into the same answers', ['briefTask', 'briefGaps', 'conceptMode', 'assetImages', 'assetCompositing', 'assetApproval', 'reviewCapture', 'conceptApproval', 'assetPlanApproval'].every((f) => JSON.stringify(back[f]) === JSON.stringify(s.plan[f])), JSON.stringify(back));
  check('concept.approval is saved with its status and identity', rec.concept.approval.status === 'approved' && rec.concept.approval.identity === conceptIdentity(CTX));
  check('assets.planApproval and the budget are saved with the plan identity', rec.assets.planApproval.status === 'approved' && rec.assets.planApproval.identity === assetIdentity(LAYERS()) && rec.assets.approval.identity === assetIdentity(LAYERS()));
  check('the gates read the same from the saved file', gate('implementation', back, CTX).open && gate('generation', back, CTX).open);
  check('BRIEF.md is recorded as the source of facts, not the checkboxes', rec.brief.facts.file === null && describe(back).includes('BRIEF.md is the source of truth'));
  check('Концепт records the scan, Проверка what is always checked', rec.concept.scan.signals.length === 3 && JSON.stringify(rec.review.required) === JSON.stringify(REQUIRED_REVIEW));
  check('the version, the reasons and the rule are saved', rec.version === PLAN_VERSION && rec.reasons.lenis === 'drag gallery' && rec.rule === GLOBAL_RULE);
  const text = describe(back);
  check('the plan the agent is handed names every stage in order, approvals included', ORDER.map((st) => text.indexOf(st.toUpperCase())).every((i, k, a) => i > -1 && (k === 0 || i > a[k - 1])) && text.includes('Approval:') && text.includes('Plan approval:'), text);
}

/* ── the CLI, end to end ─────────────────────────────────────────────────── */
{
  const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
  const cli = join(root, 'build-plan.mjs');
  const e = tmp(); dirs.push(e);
  const run = (...a) => execFileSync(process.execPath, [cli, e, ...a], { encoding: 'utf8' });
  const refuses = (...a) => { try { execFileSync(process.execPath, [cli, e, ...a], { stdio: 'pipe' }); return false; } catch { return true; } };
  const stderr = (...a) => { try { execFileSync(process.execPath, [cli, e, ...a], { stdio: 'pipe' }); return ''; } catch (x) { return String(x.stderr) + String(x.stdout); } };
  const ask = (...a) => JSON.parse(run('--ask', ...a));
  const fq = (s, h) => s.questions.find((q) => q.header === h);
  const file = (name, v) => { writeFileSync(join(e, name), typeof v === 'string' ? v : JSON.stringify(v)); return join(e, name); };
  const scanF = file('scan.json', SCAN), layersF = file('layers.json', LAYERS()), boardF = file('board.html', '<board v1>');
  const answer = (a, ...extra) => run('--answers', file('a.json', a), ...extra);

  const list = run('--ask', '--list').trim().split('\n').map((l) => l.split(/\s+--stage/)[0].trim());
  check('CLI · --list gives the lifecycle in order', list.join('·') === 'Бриф·Концепт·Концепт · одобрение·Ассеты·Ассеты · одобрение·Сборка 1/2·Сборка 2/2·Проверка', list.join('·'));
  check('CLI · a gate with nothing shown cannot be asked', refuses('--ask', '--stage', 'concept-approval') && stderr('--ask', '--stage', 'concept-approval').includes('cannot be asked yet'));
  check('CLI · --ask with no stage starts at Бриф', fq(ask(), 'Задача'));
  check('CLI · --stage concept --scan shows the thesis', fq(ask('--stage', 'concept', '--scan', scanF), 'Мудборд').options[0].label === 'Тезис → Сборка' + RECOMMENDED);
  check('CLI · --stage asset-approval --compositing shows the paid list', fq(ask('--stage', 'asset-approval', '--compositing', layersF), 'Бюджет').question.includes('2 исходн. генерац.'));
  const b2 = ask('--stage', 'build', '--part', '2', '--scroll', 'pinned', '--recommend', 'scrollOperations=layer-parallax', '--evidence', 'layer-parallax=three separated planes');
  check('CLI · Сборка 2/2 marks the evidenced operation and scroll-site, and holds 3D', fq(b2, 'Операции 1/2').options[0].label === 'Параллакс слоёв' + RECOMMENDED && fq(b2, 'Навыки').options.some((o) => o.label === 'scroll-site' + RECOMMENDED) && fq(b2, '3D'));
  check('CLI · the version-1 --recommend scrollBehavior=pinned still works', fq(ask('--stage', 'build', '--recommend', 'scrollBehavior=pinned', '--evidence', 'pinned=repeated chair states'), 'Скролл').options[0].label === 'Пин-сценарий / scrub' + RECOMMENDED);
  check('CLI · a recommendation without evidence, outside the schema, or 3D without DNA101 is refused',
    refuses('--ask', '--recommend', 'scrollOperations=layer-parallax') && refuses('--ask', '--recommend', 'scrollEngine=locomotive') && refuses('--ask', '--recommend', '3d=three', '--evidence', 'three=nice'));
  check('CLI · a stage that does not exist is refused', refuses('--ask', '--stage', 'После') && refuses('--ask', '--stage', 'Генерация'));

  answer(BRIEF_A); answer(CONCEPT_A);
  check('CLI · Сборка before concept approval is not saved', stderr('--answers', file('a.json', BUILD_A)).includes('the concept must be approved first'));
  check('CLI · the implementation gate is closed and exits 1', refuses('--gate', 'implementation') && stderr('--gate', 'implementation').includes('concept: not approved yet'));
  answer({ Направление: 'Одобрить' }, '--board', boardF, '--idea', IDEA);
  answer({ ...ASSETS_A, ...GENERATING });
  check('CLI · generation is closed before the asset plan is approved', stderr('--gate', 'generation', '--compositing', layersF).includes('asset plan: not approved yet'));
  answer(APPROVE_ASSETS, '--compositing', layersF);
  check('CLI · after approval the generation gate opens, reading the plan path it recorded', run('--gate', 'generation').includes('OPEN'));
  check('CLI · npm run layers accepts the build plan\'s Ассеты approval', execFileSync(process.execPath, [join(root, 'layers.mjs'), layersF, '--approval', join(e, 'build-plan.json')], { encoding: 'utf8' }).includes('approved:'));
  const out = answer({ ...BUILD_A, Стек: 'HTML / CSS / JS', 'Операции 1/2': 'Появление при скролле', 'Операции 2/2': '', '3D': 'Three.js' },
    '--reason', '3d=the chair is inspected in 3D', '--fallback', 'mobile=a still sequence', '--fallback', 'reducedMotion=three stills', '--note', 'keep it scannable');
  const saved = JSON.parse(readFileSync(join(e, 'build-plan.json'), 'utf8'));
  check('CLI · step-by-step answers merge into one plan, Сборка at the top level',
    saved.brief.task === 'new' && saved.concept.approval.status === 'approved' && saved.assets.approval.status === 'approved' && saved.baseStack === 'vanilla'
    && saved['3d'] === 'three' && saved['3dFallback'].mobile === 'a still sequence' && JSON.stringify(saved.scrollOperations) === '["scroll-reveals"]' && saved.notes[0] === 'keep it scannable');
  check('CLI · Three.js chosen: threejs-webgl is recommended, not added', out.includes('threejs-webgl recommended, not added') && !saved.supportingSkills.includes('threejs-webgl'));
  check('CLI · the output names each Сборка field separately',
    ['Base stack:', 'Motion engine:', 'Scroll architecture:', 'Scroll operations:', 'Scroll engine:', 'Realtime 3D:', 'Supporting skills:'].every((l) => out.includes(l)), out);
  check('CLI · implementation opens with both approvals current', run('--gate', 'implementation').includes('OPEN'));
  file('board.html', '<board v2>');
  check('CLI · editing the board on disk closes the implementation gate', stderr('--gate', 'implementation').includes('it changed'));
  file('board.html', '<board v1>');
  file('layers.json', { ...LAYERS(), extractionRisk: ['a new risk'] });
  check('CLI · editing the compositing plan on disk closes generation', stderr('--gate', 'generation').includes('asset plan: approved for id'));
  file('layers.json', LAYERS());
  check('CLI · R3F on this stack is not saved', stderr('--answers', file('a.json', { ...BUILD_A, '3D': 'React Three Fiber' }), '--reason', '3d=x', '--fallback', 'mobile=x', '--fallback', 'reducedMotion=x').includes('needs a React stack'));
  check('CLI · an invalid plan is not saved over the valid one', refuses('--answers', file('a.json', { ...BUILD_A, Движок: 'Lenis' })) && load(e).scrollEngine === 'native');
}

for (const d of dirs) rmSync(d, { recursive: true, force: true });
console.log(failures ? `\n${failures} of ${count} failed` : `\nall ${count} passed`);
process.exit(failures ? 1 : 0);

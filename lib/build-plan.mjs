/* The build-plan pop-up (DNA99) — the canonical definition of its «Сборка» stage.
 *
 * The pop-up is asked through AskUserQuestion, which takes at most four
 * questions per call and has no groups inside a question. «Сборка» is one stage
 * made of five decisions, so the pop-up is one launcher in two screens:
 *
 *   screen 1 — Сборка 1–4: base stack · motion engine · scroll behavior · scroll engine (radios)
 *   screen 2 — Сборка 5: supporting skills (checkboxes) · Концепт · После · Генерация
 *
 * Screen 2 is asked after screen 1 on purpose: `scroll-site` is recommended only
 * once a pinned sequence has been chosen.
 *
 * TOOLS FOLLOW THE CONCEPT. Nothing here is recommended because it is installed.
 * The defaults are the lightest option in every group, GSAP and Lenis are never
 * recommended without a reason the caller supplies, and choosing a tool never
 * authorises a change to the approved direction, stack or content.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

export const GLOBAL_RULE =
  'Choose the lightest stack that can faithfully execute the approved concept. Tools may execute the idea. Tools may not become the idea.';

export const RECOMMENDED = ' (Рекомендуется)';
export const PLAN_FILE = 'build-plan.json';

/* The four radio groups and the checkbox group, in the order they are asked.
   `field` is the name the plan carries to the agent and to build-plan.json. */
export const GROUPS = [
  {
    field: 'baseStack', type: 'single', header: 'Стек', label: 'Base stack',
    question: 'Сборка 1/5 · базовый стек — на чём собираем?',
    options: [
      { id: 'astro-tailwind', label: 'Astro + Tailwind', provides: ['tailwind'],
        description: 'Новый самостоятельный сайт.' },
      { id: 'bootstrap5', label: 'Bootstrap 5', provides: ['bootstrap'],
        description: 'Сайт дилера, готовый шаблон, передача разработчикам. Только каркас: без дефолтного вида Bootstrap.' },
      { id: 'existing', label: 'Стек проекта', provides: [],
        description: 'Сохранить стек целевого репозитория. Первый выбор при доработке готового сайта.' },
      { id: 'vanilla', label: 'HTML / CSS / JS', provides: [],
        description: 'Прототип или реализация с минимумом зависимостей.' },
    ],
  },
  {
    field: 'motionEngine', type: 'single', header: 'Анимация', label: 'Motion engine',
    question: 'Сборка 2/5 · движок анимации — самый лёгкий, который выполнит концепт?',
    options: [
      { id: 'gsap', label: 'GSAP',
        description: 'Авторские таймлайны, сложная хореография, scrub, связанные переходы сцен.' },
      { id: 'css-waapi', label: 'CSS / WAAPI',
        description: 'Простые переходы, появления и анимация интерфейса.' },
      { id: 'none', label: 'Без анимации',
        description: 'Движение не усиливает утверждённый концепт.' },
    ],
  },
  {
    field: 'scrollBehavior', type: 'single', header: 'Скролл', label: 'Scroll behavior',
    question: 'Сборка 3/5 · поведение скролла — что делает прокрутка?',
    options: [
      { id: 'standard', label: 'Обычная страница',
        description: 'Обычный поток документа, без сюжета на скролле.' },
      { id: 'reveals', label: 'Появление при скролле',
        description: 'Страница читается и без анимации; скролл постепенно открывает вспомогательное.' },
      { id: 'pinned', label: 'Пин-сценарий / scrub',
        description: 'Позиция скролла ведёт авторскую последовательность смысловых состояний.' },
    ],
  },
  {
    field: 'scrollEngine', type: 'single', header: 'Движок', label: 'Scroll engine',
    question: 'Сборка 4/5 · движок скролла — нативный или Lenis?',
    options: [
      { id: 'native', label: 'Нативный скролл',
        description: 'По умолчанию.' },
      { id: 'lenis', label: 'Lenis',
        description: 'Только если концепт движения доказывает нужду в управляемом плавном скролле.' },
    ],
  },
  {
    field: 'supportingSkills', type: 'multi', header: 'Навыки', label: 'Supporting skills',
    question: `Сборка 5/5 · вспомогательные навыки — что подключить? ${GLOBAL_RULE}`,
    options: [
      { id: 'blocks-21st', label: 'Блоки 21st.dev',
        description: 'Готовые решения блоков (DNA96), перекрашенные под токены проекта.' },
      { id: 'kill-ai-slop', label: 'kill-ai-slop',
        description: 'Скан после каждого прохода разметки и CSS (DNA98).' },
      { id: 'scroll-site', label: 'scroll-site',
        description: 'Сетап и концепт-гейт скролл-сайта. Нужен для пин-сценария.' },
    ],
  },
];

/* The other three stages, unchanged from DNA99. They share screen 2. */
export const OTHER_TABS = [
  {
    header: 'Концепт', multiSelect: true,
    question: 'Концепт · как ищем идею?',
    options: [
      { label: 'Ваулт + галереи', description: 'Сначала ваулт, затем 3–6 реальных сайтов из галерей (DNA97).' },
      { label: 'genjutsu:cast', description: 'Тезис взаимодействия рядом с идеей в одно предложение (DNA98).' },
      { label: 'Только мудборд', description: 'Идея от одного референс-изображения.' },
    ],
  },
  {
    header: 'После', multiSelect: true,
    question: 'После · какие проходы после сборки? Gate 1 и чтение страницы целиком — всегда.',
    options: [
      { label: 'no-ai-slop', description: 'Проход по тексту.' },
      { label: 'impeccable audit + polish', description: 'Аудит, затем полировка.' },
      { label: 'bolder', description: 'Если страница вышла робкой.' },
    ],
  },
  {
    header: 'Генерация', multiSelect: false,
    question: 'Генерация · откуда изображения? Для fal.ai — список задач, модели, цены и итог.',
    options: [
      { label: 'fal.ai', description: 'Задачи и итоговая стоимость перечислены в вопросе.' },
      { label: 'Только плейсхолдеры', description: 'Видимые заглушки, без генерации.' },
      { label: 'Ассеты Алекса', description: 'Свои фото и видео клиента.' },
    ],
  },
];

export const FIELDS = GROUPS.map((g) => g.field);
const byField = Object.fromEntries(GROUPS.map((g) => [g.field, g]));
const optionOf = (field, id) => byField[field].options.find((o) => o.id === id);

/* ── the target project ──────────────────────────────────────────────────── */
/* Only what it declares: package.json dependencies and framework config files.
   A stack is never inferred from a CDN link someone may have left in a comment. */
export function detectProject(dir) {
  const out = { exists: false, deps: [], bootstrap: false, tailwind: false };
  if (!dir || !existsSync(dir)) return out;
  const pkgPath = join(dir, 'package.json');
  if (existsSync(pkgPath)) {
    try {
      const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
      out.deps = Object.keys({ ...pkg.dependencies, ...pkg.devDependencies }).sort();
      out.exists = true;
    } catch { /* an unreadable package.json declares nothing */ }
  }
  const tailwindConfig = ['tailwind.config.js', 'tailwind.config.mjs', 'tailwind.config.cjs', 'tailwind.config.ts']
    .some((f) => existsSync(join(dir, f)));
  out.tailwind = tailwindConfig || out.deps.some((d) => d === 'tailwindcss' || d.startsWith('@tailwindcss/'));
  out.bootstrap = out.deps.includes('bootstrap');
  if (tailwindConfig || existsSync(join(dir, 'index.html'))) out.exists = true;
  return out;
}

/* ── recommendations ─────────────────────────────────────────────────────── */
/* The lightest option in each group. An established project keeps its stack.
   GSAP, a pinned sequence and Lenis are recommended only when the caller passes
   them in `concept` — that is, when the approved concept has already asked. */
export function recommend({ project = detectProject(), concept = {}, scrollBehavior } = {}) {
  const pinned = (scrollBehavior ?? concept.scrollBehavior) === 'pinned';
  return {
    baseStack: concept.baseStack ?? (project.exists ? 'existing' : 'astro-tailwind'),
    motionEngine: concept.motionEngine ?? 'css-waapi',
    scrollBehavior: concept.scrollBehavior ?? 'standard',
    scrollEngine: concept.scrollEngine ?? 'native',
    supportingSkills: ['blocks-21st', 'kill-ai-slop', ...(pinned ? ['scroll-site'] : [])],
  };
}

/* ── the AskUserQuestion payload ─────────────────────────────────────────── */
function toQuestion(group, rec) {
  const wanted = new Set([rec].flat());
  const options = [...group.options]
    .sort((a, b) => wanted.has(b.id) - wanted.has(a.id))
    .map((o) => ({ label: o.label + (wanted.has(o.id) ? RECOMMENDED : ''), description: o.description }));
  return { question: group.question, header: group.header, multiSelect: group.type === 'multi', options };
}

/* Screen 1 needs nothing but the project. Screen 2 needs screen 1's answer,
   because the scroll behavior decides whether scroll-site is recommended. */
export function screens({ project, concept, scrollBehavior } = {}) {
  const rec = recommend({ project, concept, scrollBehavior });
  return [
    { questions: GROUPS.filter((g) => g.type === 'single').map((g) => toQuestion(g, rec[g.field])) },
    { questions: [toQuestion(byField.supportingSkills, rec.supportingSkills), ...OTHER_TABS] },
  ];
}

/* ── answers → plan ──────────────────────────────────────────────────────── */
/* AskUserQuestion answers are keyed by question text and joined with ", " when
   several labels are ticked. Keys may also be the header or the field name. */
const bare = (s) => String(s).replace(RECOMMENDED, '').trim();

function answerFor(answers, group) {
  for (const k of [group.question, group.header, group.field]) if (answers[k] != null) return answers[k];
  return undefined;
}

function idsIn(group, raw) {
  const parts = (Array.isArray(raw) ? raw : String(raw).split(', ')).map(bare).filter(Boolean);
  const ids = [], unknown = [];
  for (const p of parts) {
    const o = group.options.find((x) => x.label === p || x.id === p);
    o ? ids.push(o.id) : unknown.push(p);
  }
  return { ids, unknown };
}

export function fromAnswers(answers, { reasons = {}, preserveBootstrapAndTailwind = false } = {}) {
  const plan = { reasons: { ...reasons }, preserveBootstrapAndTailwind };
  const problems = [];
  for (const g of GROUPS) {
    const raw = answerFor(answers, g);
    if (raw == null) { problems.push(`${g.label}: not answered`); continue; }
    const { ids, unknown } = idsIn(g, raw);
    if (unknown.length) problems.push(`${g.label}: "${unknown.join('", "')}" is not an option — map it to one, or record it under reasons`);
    plan[g.field] = g.type === 'single' ? (ids.length === 1 ? ids[0] : ids) : ids;
  }
  return { plan, problems };
}

/* ── normalisation ───────────────────────────────────────────────────────── */
/* The one automatic change: a pinned sequence selects scroll-site. Nothing is
   ever added to the stack, the motion engine or the scroll engine. */
export function normalize(plan) {
  const out = { ...plan, supportingSkills: [...new Set(plan.supportingSkills || [])] };
  const notes = [];
  if (out.scrollBehavior === 'pinned' && !out.supportingSkills.includes('scroll-site')) {
    out.supportingSkills.push('scroll-site');
    notes.push('scroll-site selected: a pinned scrollytelling / scrub sequence was chosen');
  }
  return { plan: out, notes };
}

/* ── validation ──────────────────────────────────────────────────────────── */
const reasoned = (plan, key) => typeof plan.reasons?.[key] === 'string' && plan.reasons[key].trim().length > 0;

export function validate(plan, { project = detectProject() } = {}) {
  const errors = [];

  for (const g of GROUPS) {
    const v = plan[g.field];
    if (g.type === 'single') {
      if (Array.isArray(v)) errors.push(`${g.label}: exactly one option — got ${v.length ? v.join(' + ') : 'none'}`);
      else if (!optionOf(g.field, v)) errors.push(`${g.label}: "${v}" is not an option`);
    } else {
      if (!Array.isArray(v)) errors.push(`${g.label}: a list of skills`);
      else for (const id of v) if (!optionOf(g.field, id)) errors.push(`${g.label}: "${id}" is not an option`);
    }
  }
  if (errors.length) return errors;

  /* Bootstrap and Tailwind together only when the project already runs both and
     the brief requires keeping them — which is the "existing stack" choice. */
  const own = optionOf('baseStack', plan.baseStack).provides;
  const both = plan.baseStack === 'existing'
    ? project.bootstrap && project.tailwind
    : (own.includes('bootstrap') && project.tailwind) || (own.includes('tailwind') && project.bootstrap);
  const keepingBoth = plan.baseStack === 'existing' && plan.preserveBootstrapAndTailwind;
  if (both && !keepingBoth) {
    errors.push(plan.baseStack === 'existing'
      ? 'Base stack: the project already runs Bootstrap and Tailwind — keep both only when the brief explicitly requires it (preserveBootstrapAndTailwind)'
      : `Base stack: ${optionOf('baseStack', plan.baseStack).label} on a project that already runs ${own.includes('bootstrap') ? 'Tailwind' : 'Bootstrap'} combines Bootstrap and Tailwind — choose "Стек проекта" or remove one`);
  }

  if (plan.motionEngine === 'gsap' && !reasoned(plan, 'gsap'))
    errors.push('Motion engine: GSAP needs the beat that requires it (reasons.gsap) — being installed is not a reason');
  if (plan.scrollBehavior === 'pinned' && !reasoned(plan, 'pinned'))
    errors.push('Scroll behavior: a pinned sequence needs the concept and content that require it (reasons.pinned)');
  if (plan.scrollBehavior !== 'standard' && plan.motionEngine === 'none')
    errors.push('Scroll behavior: reveals and pinned sequences move — choose a motion engine or a standard page');
  if (plan.scrollEngine === 'lenis' && !reasoned(plan, 'lenis'))
    errors.push(`Scroll engine: Lenis needs a documented reason (reasons.lenis)${plan.scrollBehavior === 'standard' ? ' — and a standard page rarely has one' : ''}`);

  return errors;
}

/* ── persistence ─────────────────────────────────────────────────────────── */
/* <project>/build-plan.json, beside BRIEF.md: the decision travels with the
   project, and the gate chain reads the scroll engine from it. */
export function save(dir, plan) {
  const record = { version: 1, savedAt: new Date().toISOString() };
  for (const f of FIELDS) record[f] = plan[f];
  record.reasons = plan.reasons || {};
  if (plan.preserveBootstrapAndTailwind) record.preserveBootstrapAndTailwind = true;
  record.rule = GLOBAL_RULE;
  writeFileSync(join(dir, PLAN_FILE), JSON.stringify(record, null, 2) + '\n');
  return record;
}

export function load(dir) {
  const p = join(dir, PLAN_FILE);
  return existsSync(p) ? JSON.parse(readFileSync(p, 'utf8')) : null;
}

/* ── what the agent is handed ────────────────────────────────────────────── */
export function describe(plan) {
  const name = (f) => {
    const g = byField[f];
    return g.type === 'single'
      ? optionOf(f, plan[f])?.label ?? String(plan[f])
      : (plan[f] || []).map((id) => optionOf(f, id)?.label ?? id).join(', ') || '—';
  };
  const lines = ['СБОРКА — build plan (DNA99)'];
  for (const g of GROUPS) lines.push(`  ${(g.label + ':').padEnd(19)}${name(g.field)}`);
  for (const [k, v] of Object.entries(plan.reasons || {})) lines.push(`  reason · ${k}: ${v}`);
  lines.push(`  ${GLOBAL_RULE}`);
  lines.push('  A tool choice never changes the approved visual contract, direction or content.');
  return lines.join('\n');
}

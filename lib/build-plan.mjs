/* The build-plan pop-up (DNA99) — its stages and gates, defined once.
 *
 *   Бриф → Концепт → Ассеты → Сборка → Проверка
 *
 * The stages are lifecycle steps, each asked when the evidence it needs exists:
 *
 *   brief             Бриф — after BRIEF.md has been read; it stays the factual
 *                     source of truth, and only material gaps are asked
 *   concept           Концепт — routing, before concept exploration
 *   concept-approval  Концепт · одобрение — after the direction board is shown
 *   assets            Ассеты — once the concept is approved
 *   asset-approval    Ассеты · одобрение — after the compositing plan and the paid
 *                     list are shown; before paid generation or implementation
 *   build             Сборка — after the concept, and under DNA101 the assets, are approved
 *   review            Проверка — after implementation
 *
 * AskUserQuestion takes at most four questions per dialog and four options per
 * question, with no groups inside a question, so a step spans as many dialogs as
 * it needs: «Сборка 1/2», «Сборка 2/2».
 *
 * An approval is tied to what was shown. Its identity is a hash of the governing
 * idea, the board, the contract and the thesis — or of the compositing plan — and
 * a changed direction or plan reopens the gate. Asking for approval of finished
 * evidence is art direction, not a taste question handed back (TASTE.md §5).
 *
 * TOOLS FOLLOW THE CONCEPT. The defaults are the lightest option in every group;
 * GSAP, Lenis, realtime 3D, a governing scroll sequence and every supporting
 * operation are recommended only with the evidence that asks for them, and a
 * recommendation is never a selection.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { validate as validateLayers, count as countLayers, checkApproval as checkLayersApproval } from './compositing-plan.mjs';

const DNA_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

export const GLOBAL_RULE =
  'Choose the lightest stack that can faithfully execute the approved concept. Tools may execute the idea. Tools may not become the idea.';

export const LENIS_NOTE =
  'Use only when controlled smoothing materially supports the interaction thesis. When combined with GSAP ScrollTrigger, implement explicit synchronization and preserve native keyboard, anchor, focus and reduced-motion behavior.';

export const RECOMMENDED = ' (Рекомендуется)';
export const PLAN_FILE = 'build-plan.json';
export const PLAN_VERSION = 2;
export const MAX_QUESTIONS = 4;

/* Every build is checked this way; the Проверка stage only adds to it. */
export const REQUIRED_REVIEW = ['Gate 1', 'чтение страницы целиком', 'браузер 1440 и 390', 'reduced motion и без скриптов'];

/* `key` is the section a stage is saved under; Сборка stays top-level, as in
   every plan written so far. */
export const STAGES = [
  { name: 'Бриф', key: 'brief', alias: 'brief' },
  { name: 'Концепт', key: 'concept', alias: 'concept' },
  { name: 'Ассеты', key: 'assets', alias: 'assets' },
  { name: 'Сборка', key: null, alias: 'build' },
  { name: 'Проверка', key: 'review', alias: 'review' },
];

export const STEPS = [
  { id: 'brief', stage: 'Бриф', label: 'Бриф' },
  { id: 'concept', stage: 'Концепт', label: 'Концепт' },
  { id: 'concept-approval', stage: 'Концепт', label: 'Концепт · одобрение', gate: true },
  { id: 'assets', stage: 'Ассеты', label: 'Ассеты' },
  { id: 'asset-approval', stage: 'Ассеты', label: 'Ассеты · одобрение', gate: true },
  { id: 'build', stage: 'Сборка', label: 'Сборка' },
  { id: 'review', stage: 'Проверка', label: 'Проверка' },
];

/* DNA100 — the signals a moodboard scan names, each with its visible evidence. */
export const SIGNALS = {
  'scale-repetition': 'the same subject repeated at different scales',
  'context-to-detail': 'progressive movement from context to detail',
  'persistent-anchor': 'one persistent visual anchor across several scenes',
  'targeting-overlays': 'overlays, guides, reticles or measurements aimed at changing targets',
  'expected-revelation': 'interrupted or incomplete information that expects revelation',
  'overlapping-masses': 'overlapping masses implying foreground/background movement',
  'storyboard-vertical': 'a long vertical composition that reads as a storyboard',
  'cause-effect': 'visual cause and effect between adjacent frames',
  'changing-meaning': 'meaning that changes through inspection, assembly, comparison, transformation or verification',
};
export const THESIS_STATES = ['persistent', 'change', 'learned', 'whyScroll', 'reducedMotion'];

const DECISION = [
  { id: 'approved', label: 'Одобрить', description: 'Утвердить показанное. Изменение позже — новое одобрение.' },
  { id: 'revise', label: 'Доработать', description: 'Гейт закрыт до новой версии.' },
  { id: 'reject', label: 'Отклонить', description: 'Гейт закрыт; направление не идёт дальше.' },
];

const filled = (v) => typeof v === 'string' && v.trim().length > 0;
const short = (id) => (id ? String(id).slice(0, 8) : '—');

/* The groups in the order they are asked. `field` is the name the plan carries.
   A group with `parts` is one field asked as several questions, because
   AskUserQuestion stops at four options. `topic` may read the context; `match`
   is the fixed start of a topic that carries live figures. */
export const GROUPS = [
  /* ── Бриф: records what BRIEF.md says and asks only what it leaves open ── */
  {
    step: 'brief', stage: 'Бриф', key: 'task', field: 'briefTask', type: 'single', header: 'Задача', label: 'Task', match: 'задача',
    topic: (ctx) => `задача — что делаем? ${briefLine(ctx.brief)}`,
    options: [
      { id: 'new', label: 'Новый сайт', description: 'Сайта ещё нет.' },
      { id: 'redesign', label: 'Редизайн', description: 'Тот же бренд, новая подача. По умолчанию, если не сказано иное.' },
      { id: 'refresh', label: 'Обновление', description: 'Точечные правки существующего сайта.' },
      { id: 'section', label: 'Секция или блок', description: 'Одна секция или компонент существующей страницы.' },
    ],
  },
  {
    step: 'brief', stage: 'Бриф', key: 'sources', field: 'briefSources', type: 'multi', min: 1, header: 'Источники', label: 'Sources',
    topic: 'источники — на что опираемся?',
    options: [
      { id: 'request', label: 'Запрос или бриф', description: 'BRIEF.md и то, что сказано в задаче.' },
      { id: 'site', label: 'Текущий сайт', description: 'Что на сайте сейчас и что должно остаться узнаваемым.' },
      { id: 'brandbook', label: 'Брендбук', description: 'Шрифты, цвета, логотип клиента.' },
      { id: 'references', label: 'Референсы или мудборд', description: 'Изображения и сайты-образцы.' },
    ],
  },
  {
    step: 'brief', stage: 'Бриф', key: 'requirements', field: 'briefRequirements', type: 'multi', min: 0, header: 'Требования', label: 'Requirements',
    topic: 'требования — что обязательно?',
    options: [
      { id: 'facts', label: 'Реальные факты и цены', description: 'Каждая цифра и обещание — с источником (CP).' },
      { id: 'leads', label: 'Лиды и конверсия', description: 'Форма, звонок, запись — путь покупателя.' },
      { id: 'integration', label: 'CMS или интеграция', description: 'Встройка в чужую систему или шаблон.' },
      { id: 'handoff', label: 'Передача разработчикам', description: 'Код, который поддержит другая команда.' },
    ],
  },
  {
    step: 'brief', stage: 'Бриф', key: 'gaps', field: 'briefGaps', type: 'multi', min: 1, exclusive: 'nothing', header: 'Пробелы', label: 'Missing',
    match: 'чего не хватает',
    /* a complete BRIEF.md has no open gap to ask about */
    skip: (ctx) => briefComplete(ctx.brief),
    topic: (ctx) => `чего не хватает?${ctx.brief?.empty?.length ? ` В BRIEF.md не заполнено: ${ctx.brief.empty.join(', ')}.` : ''} Факты спрашиваются, до трёх вопросов, и не выдумываются. Нет фото — не повод менять концепт (GI3).`,
    options: [
      { id: 'photos', label: 'Реальные фото', description: 'Нет съёмки продукта, помещения или людей.' },
      { id: 'copy', label: 'Тексты', description: 'Нет утверждённого текста.' },
      { id: 'facts', label: 'Факты и цены', description: 'Нет источника для цифр и обещаний.' },
      { id: 'nothing', label: 'Всё есть', description: 'Ничего не отсутствует.' },
    ],
  },

  /* ── Концепт: routing, then approval of the shown direction ──────────── */
  {
    step: 'concept', stage: 'Концепт', key: 'mode', field: 'conceptMode', type: 'single', header: 'Режим', label: 'Mode',
    topic: 'режим — одно направление или три?',
    options: [
      { id: 'build', label: 'Одно направление', description: 'BUILD: одно сильное направление. По умолчанию.' },
      { id: 'explore', label: 'Три направления', description: 'EXPLORE: три законченных направления — когда Алекс просит варианты.' },
    ],
  },
  {
    step: 'concept', stage: 'Концепт', key: 'sources', field: 'conceptSources', type: 'multi', min: 1, exclusive: 'moodboard-only', header: 'Поиск идеи', label: 'Idea sources',
    topic: 'как ищем идею?',
    options: [
      { id: 'vault', label: 'Ваулт + галереи', description: 'Сначала ваулт, затем 3–6 реальных сайтов из галерей (DNA97).' },
      { id: 'genjutsu', label: 'genjutsu:cast', description: 'Тезис взаимодействия рядом с идеей в одно предложение (DNA98).' },
      { id: 'moodboard-only', label: 'Только мудборд', description: 'Идея от одного референс-изображения.' },
    ],
  },
  {
    step: 'concept', stage: 'Концепт', key: 'moodboard', field: 'conceptMoodboard', type: 'single', header: 'Мудборд', label: 'Moodboard', match: 'мудборд (DNA100)',
    topic: (ctx) => {
      const s = ctx.scan;
      if (!s) return 'мудборд (DNA100) — скан не передан. Как используем мудборд?';
      const t = s.thesis || {};
      const head = `мудборд (DNA100) — ${s.signals.length} сильн. сигнал(ов): ${s.signals.map((x) => x.evidence).join('; ')}.`;
      return qualifies(s)
        ? `${head} Тезис — остаётся: ${t.persistent}; меняется: ${t.change}; посетитель узнаёт: ${t.learned}; почему скролл: ${t.whyScroll}; reduced motion: ${t.reducedMotion}. Как используем?`
        : `${head} Меньше трёх — тезис не обязателен. Как используем?`;
    },
    options: [
      { id: 'thesis', label: 'Тезис → Сборка', description: 'Скан нашёл 3+ сигнала: тезис даёт Сборке рекомендации с доказательствами. Выбор остаётся за тобой.' },
      { id: 'style', label: 'Только стиль', description: 'Мудборд читается как стиль, без скролл-тезиса.' },
      { id: 'none', label: 'Мудборда нет', description: 'Идея без мудборда.' },
    ],
  },
  {
    step: 'concept-approval', stage: 'Концепт', key: 'approval', field: 'conceptApproval', type: 'single', header: 'Направление', label: 'Concept approval', match: 'направление',
    ready: (ctx) => !!ctx.board && filled(ctx.idea),
    waiting: 'покажи доску направления (--board) и идею в одно предложение',
    topic: (ctx) => `направление — показано: ${ctx.board.path} (id ${short(conceptIdentity(ctx))}). Идея: «${ctx.idea}».${ctx.contract ? ` Визуальный контракт: ${ctx.contract.path}.` : ''} Решение арт-директора по показанному.`,
    options: DECISION,
  },

  /* ── Ассеты: routing, then approval of the shown plan and paid list ───── */
  {
    step: 'assets', stage: 'Ассеты', key: 'images', field: 'assetImages', type: 'multi', min: 1, header: 'Изображения', label: 'Images',
    topic: 'откуда изображения?',
    options: [
      { id: 'supplied', label: 'Ассеты клиента', description: 'Свои фото, видео и файлы клиента или Алекса.' },
      { id: 'generated', label: 'Генерация fal.ai', description: 'По плану DNA101. Раскрытая синтетическая арт-дирекция допустима (GI3).' },
      { id: 'placeholders', label: 'Плейсхолдеры фактов', description: 'Только для фактов, которых ещё нет (CP4) — не замена концепту при отсутствии фото (GI3).' },
    ],
  },
  {
    step: 'assets', stage: 'Ассеты', key: 'compositing', field: 'assetCompositing', type: 'single', header: 'Композитинг', label: 'Compositing', match: 'композитинг (DNA101)',
    topic: (ctx) => {
      const v = ctx.compositing ? validateLayers(ctx.compositing) : null;
      if (!v) return 'композитинг (DNA101) — план не передан. Нужны независимые слои?';
      return v.active
        ? `композитинг (DNA101) — активен: ${v.triggers.join(', ')}. Независимые: ${(ctx.compositing.independent || []).join(', ') || '—'}.`
        : 'композитинг (DNA101) — не активен: ничто не движется само по себе.';
    },
    options: [
      { id: 'layered', label: 'Слои по DNA101', description: 'Независимые слои: альфа-мастер PNG или независимый рендер.' },
      { id: 'flat', label: 'Плоские изображения', description: 'Ничто не движется само по себе — слои не нужны.' },
    ],
  },
  {
    step: 'asset-approval', stage: 'Ассеты', key: 'planApproval', field: 'assetPlanApproval', type: 'single', header: 'План ассетов', label: 'Asset plan approval', match: 'план ассетов',
    ready: (ctx) => !!ctx.compositing,
    waiting: 'покажи план композитинга DNA101 и платный список (--compositing)',
    topic: (ctx) => `план ассетов (DNA101) — показан: ${ctx.compositingPath || 'план композитинга'} (id ${short(assetIdentity(ctx.compositing))}). Решение арт-директора по плану.`,
    options: DECISION,
  },
  {
    step: 'asset-approval', stage: 'Ассеты', key: 'approval', field: 'assetApproval', type: 'single', header: 'Бюджет', label: 'Generation approval', match: 'платная генерация',
    topic: (ctx) => {
      const c = countLayers(ctx.compositing);
      return `платная генерация — ${c.paidSources} исходн. генерац. (${c.files} файлов), ${c.cost}; локально без генерации: ${c.localDerivatives.join(', ') || '—'}; альфа: ${c.alpha.join(', ') || '—'}; риск извлечения: ${(ctx.compositing.extractionRisk || []).join('; ') || 'не указан'}. Одобрение — только на этот список.`;
    },
    options: [
      { id: 'approve', label: 'Одобрить список', description: 'Только перечисленные платные генерации и бюджет. Новое — новое одобрение.' },
      { id: 'none', label: 'Без платной генерации', description: 'Ничего не генерируется за деньги.' },
      { id: 'revise', label: 'Пересмотреть план', description: 'Вернуться к плану композитинга.' },
    ],
  },

  /* ── Сборка: stack, engines, scroll, 3D, skills ──────────────────────── */
  {
    step: 'build', stage: 'Сборка', field: 'baseStack', type: 'single', header: 'Стек', label: 'Base stack',
    topic: 'базовый стек — на чём собираем?',
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
    step: 'build', stage: 'Сборка', field: 'motionEngine', type: 'single', header: 'Анимация', label: 'Motion engine',
    topic: 'движок анимации — самый лёгкий, который выполнит концепт?',
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
    step: 'build', stage: 'Сборка', field: 'scrollArchitecture', type: 'single', header: 'Скролл', label: 'Scroll architecture',
    topic: 'архитектура скролла — какая у страницы главная? Вспомогательные операции не запрещает.',
    options: [
      { id: 'native', label: 'Нативный документ', moves: false,
        description: 'Страница прокручивается обычно, без управляющей скролл-последовательности.' },
      { id: 'pinned', label: 'Пин-сценарий / scrub', moves: true,
        description: 'Одна или несколько авторских глав управляются прогрессом скролла.' },
      { id: 'snap', label: 'Scroll-snap главы', moves: false,
        description: 'Страница переходит между продуманными состояниями экрана.' },
      { id: 'horizontal', label: 'Горизонтальный проход', moves: true,
        description: 'Смысловая глава идёт по горизонтали под вертикальным скроллом.' },
    ],
  },
  {
    step: 'build', stage: 'Сборка', field: 'scrollEngine', type: 'single', header: 'Движок', label: 'Scroll engine',
    topic: 'движок скролла — нативный или Lenis?',
    options: [
      { id: 'native', label: 'Нативный скролл',
        description: 'По умолчанию.' },
      { id: 'lenis', label: 'Lenis',
        description: LENIS_NOTE },
    ],
  },
  {
    step: 'build', stage: 'Сборка', field: 'scrollOperations', type: 'multi', min: 1, label: 'Scroll operations', exclusive: 'none',
    parts: [
      { header: 'Операции 1/2', topic: 'вспомогательные операции скролла, которые оправдывает концепт (1/2)?',
        ids: ['scroll-reveals', 'layer-parallax', 'sticky', 'masks'] },
      { header: 'Операции 2/2', topic: 'вспомогательные операции скролла, которые оправдывает концепт (2/2)? «Нет операций» исключает остальные.',
        ids: ['progress-type', 'chapter-transitions', 'progress-indicator', 'none'] },
    ],
    options: [
      { id: 'scroll-reveals', label: 'Появление при скролле', moves: true,
        description: 'Вспомогательное открывается по ходу; без анимации всё читается.' },
      { id: 'layer-parallax', label: 'Параллакс слоёв', moves: true,
        description: 'Передний план, предмет и фон идут с разной скоростью.' },
      { id: 'sticky', label: 'Sticky-элементы', moves: false,
        description: 'Элемент держится, пока рядом идёт контент.' },
      { id: 'masks', label: 'Маски / шторки', moves: true,
        description: 'Скрытое или обрезанное открывается маской или шторкой.' },
      { id: 'progress-type', label: 'Типографика по прогрессу', moves: true,
        description: 'Ранг или состояние текста меняется с прогрессом скролла.' },
      { id: 'chapter-transitions', label: 'Переходы глав', moves: true,
        description: 'Шов между главами говорит, что изменилось (DNA64).' },
      { id: 'progress-indicator', label: 'Индикатор прогресса', moves: true,
        description: 'Показывает, где посетитель в длинном сценарии.' },
      { id: 'none', label: 'Нет операций', moves: false,
        description: 'Ни одной вспомогательной операции.' },
    ],
  },
  {
    step: 'build', stage: 'Сборка', field: '3d', type: 'single', header: '3D', label: 'Realtime 3D',
    topic: 'realtime 3D — нужна ли сцена? Не по умолчанию; мобильный и reduced-motion фолбэк обязательны.',
    options: [
      { id: 'none', label: 'Без realtime 3D', description: 'По умолчанию и самое лёгкое.' },
      { id: 'three', label: 'Three.js', description: 'Своя сцена на Three.js; от фреймворка не зависит.' },
      { id: 'r3f', label: 'React Three Fiber', description: 'Только на React-совместимом стеке.' },
      { id: 'external', label: 'Внешняя сцена', description: 'Встроенная или внешне размещённая сцена, не своя реализация на Three.js.' },
    ],
  },
  {
    step: 'build', stage: 'Сборка', field: 'supportingSkills', type: 'multi', min: 0, header: 'Навыки', label: 'Supporting skills',
    topic: `вспомогательные навыки — что подключить? Заметки к реализации — через --note. ${GLOBAL_RULE}`,
    options: [
      { id: 'blocks-21st', label: 'Блоки 21st.dev',
        description: 'Готовые решения блоков (DNA96), перекрашенные под токены проекта.' },
      { id: 'kill-ai-slop', label: 'kill-ai-slop',
        description: 'Скан после каждого прохода разметки и CSS (DNA98).' },
      { id: 'scroll-site', label: 'scroll-site',
        description: 'Сетап и концепт-гейт скролл-сайта. Нужен для пин-сценария.' },
      { id: 'threejs-webgl', label: 'threejs-webgl',
        description: 'Справка по Three.js / WebGL — при выбранном Three.js или R3F.' },
    ],
  },

  /* ── Проверка: what is always checked, and what is added ─────────────── */
  {
    step: 'review', stage: 'Проверка', key: 'capture', field: 'reviewCapture', type: 'multi', min: 0, header: 'Фиксация', label: 'Capture',
    topic: `что фиксируем сверх обязательного? Всегда: ${REQUIRED_REVIEW.join(' · ')}.`,
    options: [
      { id: 'breakpoints', label: 'Все брейкпоинты', description: 'Скриншоты 1920 · 1440 · 1024 · 768 · 390.' },
      { id: 'stops', label: 'Стоп-кадры скролла', description: 'Около восьми остановок, каждая — собранный кадр (DNA87).' },
      { id: 'recording', label: 'Запись скролла', description: 'GIF или видео прохода по странице.' },
    ],
  },
  {
    step: 'review', stage: 'Проверка', key: 'passes', field: 'reviewPasses', type: 'multi', min: 0, header: 'Проходы', label: 'Quality passes',
    topic: 'какие проходы качества после сборки?',
    options: [
      { id: 'no-ai-slop', label: 'no-ai-slop', description: 'Проход по тексту.' },
      { id: 'impeccable', label: 'impeccable audit + polish', description: 'Аудит, затем полировка.' },
      { id: 'bolder', label: 'bolder', description: 'Если страница вышла робкой.' },
    ],
  },
];

const byField = Object.fromEntries(GROUPS.map((g) => [g.field, g]));
const optionOf = (field, id) => byField[field].options.find((o) => o.id === id);
const stageOf = (name) => STAGES.find((s) => s.name === name || s.alias === String(name).toLowerCase());
const stepOf = (id) => STEPS.find((s) => s.id === id);
const groupsOf = (step) => GROUPS.filter((g) => g.step === step);
const APPROVAL_FIELDS = new Set(['conceptApproval', 'assetPlanApproval', 'assetApproval']);
export const FIELDS = groupsOf('build').map((g) => g.field);
export const ALL_FIELDS = GROUPS.map((g) => g.field);

/* ── BRIEF.md — the factual source of truth ──────────────────────────────── */
/* Read the same way the hook reads it: a section is unanswered when it is
   untouched since setup wrote it, or holds nothing but the scaffold's prompts. */
const normaliseSpace = (s) => s.replace(/\s+/g, ' ').trim();
function sectionMap(text) {
  const map = new Map();
  for (const block of text.split(/^## /m).slice(1)) {
    const nl = block.indexOf('\n');
    map.set((nl === -1 ? block : block.slice(0, nl)).trim(), nl === -1 ? '' : block.slice(nl + 1));
  }
  return map;
}
function templateSections() {
  try {
    const src = readFileSync(join(DNA_ROOT, 'setup.mjs'), 'utf8');
    const start = src.indexOf('const BRIEF_MD = `');
    if (start === -1) return null;
    let i = start + 'const BRIEF_MD = `'.length;
    const from = i;
    for (; i < src.length; i++) { if (src[i] === '\\') { i++; continue; } if (src[i] === '`') break; }
    return sectionMap(src.slice(from, i).replace(/\\`/g, '`').replace(/\\\$/g, '$').replace(/\$\{[^}]*\}/g, ''));
  } catch { return null; }
}
const promptsOnly = (body) => body.split(/(?<=[.!?])\s|\n/).map((l) => l.trim())
  .filter((l) => l && l !== 'TODO' && !/^_.*_$/.test(l) && !/^>/.test(l) && !/^\|[\s|:-]*\|$/.test(l) && !/^\|\s*\d*\s*\|[\s|]*$/.test(l) && !/^- \*\*[^*]+\*\* —\s*$/.test(l)).length === 0;

export function readBrief(dir) {
  const path = dir && join(dir, 'BRIEF.md');
  if (!path || !existsSync(path)) return { exists: false, total: 0, filled: 0, empty: [] };
  const mine = sectionMap(readFileSync(path, 'utf8'));
  const template = templateSections();
  const empty = [];
  let idea = null;
  for (const [title, body] of mine) {
    const untouched = template?.has(title) && normaliseSpace(body) === normaliseSpace(template.get(title));
    if (untouched || promptsOnly(body)) empty.push(title);
    if (/^2\.\s/.test(title) && !promptsOnly(body))
      idea = body.split('\n').map((l) => l.trim()).filter((l) => l && !/^_.*_$/.test(l)).join(' ') || null;
  }
  return { exists: true, total: mine.size, filled: mine.size - empty.length, empty, idea };
}
export const briefComplete = (brief) => !!brief?.exists && brief.total > 0 && brief.empty.length === 0;
function briefLine(brief) {
  if (!brief?.exists) return 'BRIEF.md не найден: факты не выдумываются, пробелы — вопросами.';
  return `BRIEF.md — источник фактов: заполнено ${brief.filled} из ${brief.total}${brief.empty.length ? `; не заполнено: ${brief.empty.join(', ')}` : ''}.`;
}

/* ── identities ──────────────────────────────────────────────────────────── */
const stable = (v) => (Array.isArray(v) ? `[${v.map(stable).join(',')}]`
  : v && typeof v === 'object' ? `{${Object.keys(v).sort().map((k) => `${JSON.stringify(k)}:${stable(v[k])}`).join(',')}}`
    : JSON.stringify(v ?? null));
const hash = (s) => createHash('sha256').update(s).digest('hex').slice(0, 16);
const fileHash = (f) => (f ? hash(f.bytes ?? '') : null);

/* The concept is what was shown: the governing idea, the board, the visual
   contract, and the thesis when one governs. Change any of them and it is a
   different concept. */
export function conceptIdentity(ctx = {}) {
  if (!ctx.board || !filled(ctx.idea)) return null;
  const thesis = ctx.thesis ?? (qualifies(ctx.scan) ? ctx.scan.thesis : null);
  return hash(stable({ idea: normaliseSpace(ctx.idea), board: fileHash(ctx.board), contract: fileHash(ctx.contract), thesis }));
}

/* The asset plan is the whole compositing plan — sources, layers, paid list, costs. */
export const assetIdentity = (compositing) => (compositing ? hash(stable(compositing)) : null);

/* ── version 1 → 2 ───────────────────────────────────────────────────────── */
/* Version 1 asked one exclusive "scroll behavior". Its three answers keep their
   meaning: a standard page is a native document with no operations, a pinned
   sequence is the pinned architecture, reveals are a native document with
   scroll-triggered reveals as its one supporting operation. A plan from before
   the 3D question has no realtime 3D. */
export const LEGACY_SCROLL = {
  standard: { scrollArchitecture: 'native', scrollOperations: ['none'] },
  pinned: { scrollArchitecture: 'pinned', scrollOperations: ['none'] },
  reveals: { scrollArchitecture: 'native', scrollOperations: ['scroll-reveals'] },
};
const LEGACY_LABELS = { 'Обычная страница': 'standard', 'Пин-сценарий / scrub': 'pinned', 'Появление при скролле': 'reveals' };

export function migrate(record) {
  if (!record) return record;
  if (record.scrollArchitecture === undefined && record.scrollBehavior !== undefined) {
    const { scrollBehavior, ...rest } = record;
    const mapped = LEGACY_SCROLL[scrollBehavior];
    if (!mapped) return record;
    return { ...rest, ...mapped, '3d': rest['3d'] ?? 'none', version: PLAN_VERSION, migratedFrom: { version: record.version ?? 1, scrollBehavior } };
  }
  if (record.scrollArchitecture !== undefined && record['3d'] === undefined) return { ...record, '3d': 'none' };
  return record;
}

/* ── the target project ──────────────────────────────────────────────────── */
/* Only what it declares: package.json dependencies and framework config files.
   A stack is never inferred from a CDN link someone may have left in a comment. */
export function detectProject(dir) {
  const out = { exists: false, deps: [], bootstrap: false, tailwind: false, react: false };
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
  out.react = out.deps.includes('react');
  if (tailwindConfig || existsSync(join(dir, 'index.html'))) out.exists = true;
  return out;
}

/* ── DNA100: the scan ────────────────────────────────────────────────────── */
/* { signals: [{ id, evidence }], thesis: { persistent, change, learned,
   whyScroll, reducedMotion }, recommend: { field: { id | ids, evidence } } } */
export const qualifies = (scan) => !!scan && (scan.signals || []).length >= 3 && THESIS_STATES.every((k) => filled(scan.thesis?.[k]));

export function checkScan(scan) {
  if (!scan) return [];
  const errors = [];
  for (const s of scan.signals || []) {
    if (!(s.id in SIGNALS)) errors.push(`scan: "${s.id}" is not a DNA100 signal (${Object.keys(SIGNALS).join(' · ')})`);
    if (!filled(s.evidence)) errors.push(`scan: signal ${s.id} names no visible evidence`);
  }
  const n = (scan.signals || []).length;
  if (n >= 3) for (const k of THESIS_STATES) if (!filled(scan.thesis?.[k])) errors.push(`scan: ${n} signals mean a thesis — state "${k}" is missing`);
  if (scan.recommend && n < 3) errors.push('scan: recommendations come from a thesis, and fewer than three signals make none');
  if (scan.recommend?.['3d']) errors.push('scan: a moodboard signal alone cannot recommend 3D — only a DNA101 plan can');
  return [...errors, ...checkRecommendation(scan.recommend || {})];
}

/* ── DNA101 and realtime 3D ──────────────────────────────────────────────── */
/* 3D is recommended only when the compositing plan holds an independently
   controlled volumetric subject, camera or scene — an independent WebGL/3D render. */
export function needs3d(compositing) {
  if (!compositing) return null;
  const v = validateLayers(compositing);
  if (!v.active) return null;
  const renders = (compositing.assets || []).filter((a) => (compositing.independent || []).includes(a.id) && a.source === 'webgl');
  return renders.length ? `${renders.map((a) => `${a.id} (${a.subject})`).join(', ')} — независимый WebGL/3D-рендер` : null;
}

/* ── recommendations ─────────────────────────────────────────────────────── */
/* A recommendation for Сборка is { field: { id | ids, evidence } }. Anything
   heavier than the lightest option names the visible evidence that asks for
   it — per operation — or it is refused. */
const LIGHTEST = { motionEngine: 'css-waapi', scrollArchitecture: 'native', scrollEngine: 'native', '3d': 'none' };

export function checkRecommendation(concept = {}) {
  const errors = [];
  for (const [field, rec] of Object.entries(concept)) {
    const g = byField[field];
    if (!g || g.step !== 'build' || field === 'supportingSkills') { errors.push(`--recommend ${field}: not a field the concept recommends`); continue; }
    if (g.type === 'single') {
      if (!optionOf(field, rec?.id)) { errors.push(`--recommend ${field}=${rec?.id}: not an option`); continue; }
      if (field !== 'baseStack' && rec.id !== LIGHTEST[field] && !filled(rec.evidence))
        errors.push(`--recommend ${field}=${rec.id}: name the evidence that asks for it`);
    } else {
      const ids = rec?.ids || [];
      for (const id of ids) if (!optionOf(field, id)) errors.push(`--recommend ${field}=${id}: not an option`);
      if (ids.includes(g.exclusive) && ids.length > 1) errors.push(`--recommend ${field}: «${optionOf(field, g.exclusive).label}» excludes the others`);
      for (const id of ids) if (id !== g.exclusive && optionOf(field, id) && !filled(rec.evidence?.[id]))
        errors.push(`--recommend ${field}=${id}: name the moodboard evidence for this operation`);
    }
  }
  return errors;
}

/* The concept's recommendations: a qualifying scan's, unless Концепт chose not
   to use the thesis, then any given directly — the direct ones win. */
function conceptOf(ctx) {
  const fromScan = ctx.scan && ctx.useThesis !== false && qualifies(ctx.scan) ? ctx.scan.recommend || {} : {};
  return { ...fromScan, ...(ctx.concept || {}) };
}

/* The lightest option in each group. An established project keeps its stack. */
export function recommend(ctx = {}) {
  const { project = detectProject(), compositing } = ctx;
  const concept = conceptOf(ctx);
  const pick = (f, fallback) => concept[f]?.id ?? fallback;
  const arch = ctx.scrollArchitecture ?? pick('scrollArchitecture', 'native');
  const layers = compositing ? validateLayers(compositing) : null;
  const scrollLed = arch !== 'native' || (concept.scrollOperations?.ids || []).length > 0;
  const r3d = needs3d(compositing) ? 'three' : pick('3d', 'none');
  return {
    briefTask: project.exists ? 'redesign' : 'new',
    briefSources: ['request'],
    conceptMode: 'build',
    conceptMoodboard: ctx.scan ? (qualifies(ctx.scan) ? 'thesis' : 'style') : 'none',
    assetCompositing: layers?.active ? 'layered' : 'flat',
    assetApproval: compositing && countLayers(compositing).paidSources === 0 ? 'none' : undefined,
    baseStack: pick('baseStack', project.exists ? 'existing' : 'astro-tailwind'),
    motionEngine: pick('motionEngine', 'css-waapi'),
    scrollArchitecture: pick('scrollArchitecture', 'native'),
    scrollEngine: pick('scrollEngine', 'native'),
    scrollOperations: concept.scrollOperations?.ids?.length ? concept.scrollOperations.ids : ['none'],
    '3d': r3d,
    supportingSkills: ['blocks-21st', 'kill-ai-slop', ...(arch === 'pinned' ? ['scroll-site'] : []), ...(['three', 'r3f'].includes(r3d) ? ['threejs-webgl'] : [])],
    reviewCapture: ['breakpoints', ...(scrollLed ? ['stops', 'recording'] : [])],
  };
}

/* ── the AskUserQuestion dialogs ─────────────────────────────────────────── */
function evidenceFor(ctx, concept, field, id) {
  if (field === '3d') { const e = needs3d(ctx.compositing); return e && id === 'three' ? `DNA101: ${e}` : ''; }
  const rec = concept[field];
  if (!rec) return '';
  const text = (byField[field].type === 'single' ? (rec.id === id ? rec.evidence : '') : rec.evidence?.[id]) || '';
  return text ? `Мудборд: ${text}` : '';
}

/* each question before it knows which dialog it lands in */
function questionsOf(group, rec, concept, ctx) {
  const wanted = new Set([rec].flat().filter(Boolean));
  const render = (ids, header, topic) => ({
    topic: typeof topic === 'function' ? topic(ctx) : topic,
    header,
    multiSelect: group.type === 'multi',
    options: ids.map((id) => optionOf(group.field, id))
      .sort((a, b) => wanted.has(b.id) - wanted.has(a.id))
      .map((o) => {
        const ev = evidenceFor(ctx, concept, group.field, o.id);
        return { label: o.label + (wanted.has(o.id) ? RECOMMENDED : ''), description: ev ? `${ev}. ${o.description}` : o.description };
      }),
  });
  return group.parts
    ? group.parts.map((p) => render(p.ids, p.header, p.topic))
    : [render(group.options.map((o) => o.id), group.header, group.topic)];
}

/* Every dialog, in lifecycle order. A gate whose evidence has not been shown
   carries no questions and says what it is waiting for. */
export function dialogs(ctx = {}) {
  const concept = conceptOf(ctx);
  const errors = [...checkScan(ctx.scan), ...checkRecommendation(ctx.concept || {})];
  const direct3d = ctx.concept?.['3d']?.id;
  if (direct3d && direct3d !== 'none' && !needs3d(ctx.compositing))
    errors.push('--recommend 3d: realtime 3D is recommended only from a DNA101 plan that needs an independently controlled volumetric subject, camera or scene');
  if (errors.length) throw new Error(errors.join('\n'));
  const rec = recommend(ctx);
  const out = [];
  for (const step of STEPS) {
    const groups = groupsOf(step.id).filter((g) => !g.skip?.(ctx));
    const ready = groups.every((g) => !g.ready || g.ready(ctx));
    if (!ready) {
      out.push({ step: step.id, stage: step.stage, part: 1, of: 1, label: step.label, gate: !!step.gate, ready: false,
        waiting: groups.find((g) => g.ready && !g.ready(ctx)).waiting, questions: [] });
      continue;
    }
    const qs = groups.flatMap((g) => questionsOf(g, APPROVAL_FIELDS.has(g.field) && g.field !== 'assetApproval' ? undefined : rec[g.field], concept, ctx));
    const n = Math.ceil(qs.length / MAX_QUESTIONS);
    for (let i = 0; i < n; i++) {
      const label = n > 1 ? `${step.label} ${i + 1}/${n}` : step.label;
      out.push({
        step: step.id, stage: step.stage, part: i + 1, of: n, label, gate: !!step.gate, ready: true,
        questions: qs.slice(i * MAX_QUESTIONS, (i + 1) * MAX_QUESTIONS).map(({ topic, ...q }) => ({ question: `${label} · ${topic}`, ...q })),
      });
    }
  }
  return out;
}

/* A dialog by step id, or by stage name for the stage's first step. */
export function dialog(ctx, which, part = 1) {
  const step = stepOf(which)?.id ?? STEPS.find((s) => s.stage === stageOf(which)?.name)?.id;
  return step ? dialogs(ctx).find((d) => d.step === step && d.part === Number(part)) : undefined;
}

/* ── answers → plan ──────────────────────────────────────────────────────── */
/* AskUserQuestion answers are keyed by question text and joined with ", " when
   several labels are ticked. Keys may also be the header or the field name —
   the header is the stable key, since some question texts carry live figures. */
const bare = (s) => String(s).replace(RECOMMENDED, '').trim();
const split = (raw) => (Array.isArray(raw) ? raw : String(raw).split(', ')).map(bare).filter(Boolean);

function rawFor(answers, group) {
  const headers = group.parts ? group.parts.map((p) => p.header) : [group.header];
  const prefixes = group.parts ? group.parts.map((p) => p.topic) : [typeof group.topic === 'string' ? group.topic : group.match];
  const topicOf = (k) => k.split(' · ').slice(-1)[0];
  const byQuestion = Object.keys(answers).filter((k) => prefixes.some((p) => topicOf(k).startsWith(p) || k.includes(` · ${p}`)));
  const found = [...headers, group.field, ...byQuestion].filter((k) => answers[k] != null).map((k) => answers[k]);
  return found.length ? found.flatMap(split) : undefined;
}

/* Answers arrive step by step. A step is either answered whole or not at all;
   steps nobody answered are left as they are. */
export function fromAnswers(answers, { reasons = {}, notes = [], preserveBootstrapAndTailwind = false, brief, fallback3d } = {}) {
  const plan = { reasons: { ...reasons }, notes: [...notes] };
  if (preserveBootstrapAndTailwind) plan.preserveBootstrapAndTailwind = true;
  if (fallback3d && (fallback3d.mobile || fallback3d.reducedMotion)) plan['3dFallback'] = { ...fallback3d };
  const problems = [];
  const steps = [];
  /* A version-1 answer set had only the Сборка questions, no operations question,
     and one scroll answer carrying both scroll fields. */
  const legacy = rawFor(answers, byField.scrollOperations) == null
    && GROUPS.every((g) => g.step === 'build' || rawFor(answers, g) == null);
  if (legacy) plan.legacyAnswers = true;

  for (const step of STEPS) {
    const groups = groupsOf(step.id);
    const asked = groups.filter((g) => !g.skip?.({ brief }));
    if (!asked.some((g) => rawFor(answers, g) != null)) continue;
    steps.push(step.id);
    let legacyOps = null;
    for (const g of groups) {
      if (g.skip?.({ brief })) { plan[g.field] = [g.exclusive]; plan.briefGapsFrom = 'BRIEF.md'; continue; }
      let parts = rawFor(answers, g);
      if (parts == null) {
        if (g.field === 'scrollOperations' && legacyOps) { plan.scrollOperations = legacyOps; continue; }
        if (g.field === '3d' && legacy) { plan['3d'] = 'none'; continue; }
        if (g.type === 'multi' && g.min === 0) { plan[g.field] = []; continue; }
        problems.push(`${g.stage} · ${g.label}: not answered`); continue;
      }
      if (g.field === 'scrollArchitecture' && legacy && parts.length === 1 && LEGACY_LABELS[parts[0]]) {
        const m = LEGACY_SCROLL[LEGACY_LABELS[parts[0]]];
        parts = [optionOf(g.field, m.scrollArchitecture).label];
        legacyOps = m.scrollOperations;
      }
      const ids = [], unknown = [];
      for (const p of parts) {
        const o = g.options.find((x) => x.label === p || x.id === p);
        o ? ids.push(o.id) : unknown.push(p);
      }
      if (unknown.length) problems.push(`${g.stage} · ${g.label}: "${unknown.join('", "')}" is not an option — map it to one, or record it under reasons`);
      plan[g.field] = g.type === 'single' ? (ids.length === 1 ? ids[0] : ids) : [...new Set(ids)];
    }
  }
  return { plan, problems, steps };
}

/* ── exclusive checkboxes ────────────────────────────────────────────────── */
/* AskUserQuestion cannot clear one box when another is ticked. This is how
   «Нет операций», «Всё есть» and «Только мудборд» behave wherever live
   checkbox state exists; a submitted answer with both ticked is refused by
   validate(), never resolved by guessing. */
export function toggle(field, selected, id) {
  const g = byField[field];
  const on = new Set(selected);
  if (on.has(id)) { on.delete(id); return [...on]; }
  if (id === g.exclusive) return [id];
  on.delete(g.exclusive);
  on.add(id);
  return [...on];
}

/* ── normalisation ───────────────────────────────────────────────────────── */
/* The one automatic change: a pinned architecture selects scroll-site. Nothing
   is ever added to the stack, the engines, the operations, 3D or the assets —
   threejs-webgl is recommended for Three.js or R3F, never added. */
export function normalize(plan) {
  const out = { ...plan };
  const notes = [];
  if (out.supportingSkills) out.supportingSkills = [...new Set(out.supportingSkills)];
  if (out.scrollArchitecture === 'pinned' && out.supportingSkills && !out.supportingSkills.includes('scroll-site')) {
    out.supportingSkills.push('scroll-site');
    notes.push('scroll-site selected: a pinned / scrub architecture was chosen');
  }
  if (['three', 'r3f'].includes(out['3d']) && out.supportingSkills && !out.supportingSkills.includes('threejs-webgl'))
    notes.push(`threejs-webgl recommended, not added: ${optionOf('3d', out['3d']).label} was chosen`);
  return { plan: out, notes };
}

/* ── validation ──────────────────────────────────────────────────────────── */
/* What was answered must hold together. Only answered fields are judged: a
   plan in progress is not a broken plan. ctx: { project, scan, compositing, brief } */
const reasoned = (plan, key) => filled(plan.reasons?.[key]);

export function validate(plan, ctx = {}) {
  const { project = detectProject(), scan, compositing, brief } = ctx;
  const errors = [];

  for (const g of GROUPS) {
    const v = plan[g.field];
    if (v === undefined) continue;
    const at = `${g.stage} · ${g.label}`;
    if (g.type === 'single') {
      if (Array.isArray(v)) errors.push(`${at}: exactly one option — got ${v.length ? v.join(' + ') : 'none'}`);
      else if (!optionOf(g.field, v)) errors.push(`${at}: "${v}" is not an option`);
    } else if (!Array.isArray(v)) errors.push(`${at}: a list`);
    else {
      for (const id of v) if (!optionOf(g.field, id)) errors.push(`${at}: "${id}" is not an option`);
      if (g.exclusive && v.includes(g.exclusive) && v.length > 1)
        errors.push(`${at}: «${optionOf(g.field, g.exclusive).label}» excludes the others — got ${v.join(' + ')}`);
      if (g.min && v.length < g.min)
        errors.push(`${at}: choose at least one${g.exclusive ? `, or «${optionOf(g.field, g.exclusive).label}»` : ''}`);
    }
  }
  if (errors.length) return errors;

  /* Бриф: facts are not invented */
  if (plan.briefGaps?.includes('nothing') && brief?.exists && brief.empty.length)
    errors.push(`Бриф · Missing: BRIEF.md leaves ${brief.empty.join(', ')} unanswered — «Всё есть» would invent them`);

  /* Концепт: a thesis only from a scan that makes one */
  if (plan.conceptMoodboard === 'thesis' && !qualifies(scan))
    errors.push('Концепт · Moodboard: «Тезис → Сборка» needs a DNA100 scan with three or more signals and all five states (--scan)');
  if (plan.conceptMoodboard !== undefined) errors.push(...checkScan(scan));

  /* Ассеты: DNA101 decides layers; approval covers a listed plan only */
  const layers = compositing ? validateLayers(compositing) : null;
  if (layers && (plan.assetImages || plan.assetApproval)) errors.push(...layers.errors.map((e) => `Ассеты · DNA101: ${e}`));
  if (layers?.active && plan.assetCompositing === 'flat')
    errors.push(`Ассеты · Compositing: ${layers.triggers.join(', ')} needs independent layers — go back to the composition or motion plan rather than flatten it`);
  if (plan.assetImages?.length === 1 && plan.assetImages[0] === 'placeholders' && !reasoned(plan, 'placeholders'))
    errors.push('Ассеты · Images: placeholders alone need the facts they stand in for (reasons.placeholders) — missing photography is not one (GI3)');
  if (plan.assetApproval !== undefined) {
    const generating = (plan.assetImages || []).includes('generated');
    if (plan.assetApproval === 'approve' && !compositing)
      errors.push('Ассеты · Generation approval: there is no listed plan to approve (--compositing)');
    if (plan.assetApproval === 'approve' && compositing && countLayers(compositing).paidSources === 0)
      errors.push('Ассеты · Generation approval: the plan lists no paid generation');
    if (generating && plan.assetApproval === 'none')
      errors.push('Ассеты · Generation approval: generation is chosen and no paid list is approved');
    if (!generating && plan.assetApproval === 'approve')
      errors.push('Ассеты · Generation approval: a budget is approved for no generation');
  }

  /* Сборка */
  if (plan.baseStack !== undefined) {
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
  }
  if (plan.motionEngine === 'gsap' && !reasoned(plan, 'gsap'))
    errors.push('Motion engine: GSAP needs the beat that requires it (reasons.gsap) — being installed is not a reason');
  if (plan.scrollArchitecture === 'pinned' && !reasoned(plan, 'pinned'))
    errors.push('Scroll architecture: a pinned sequence needs the concept and content that require it (reasons.pinned)');
  if (plan.motionEngine === 'none' && plan.scrollArchitecture !== undefined) {
    const moving = [optionOf('scrollArchitecture', plan.scrollArchitecture), ...(plan.scrollOperations || []).map((id) => optionOf('scrollOperations', id))]
      .filter((o) => o.moves).map((o) => o.label);
    if (moving.length) errors.push(`Motion engine: ${moving.join(', ')} move — choose a motion engine or drop them`);
  }
  if (plan.scrollEngine === 'lenis' && !reasoned(plan, 'lenis'))
    errors.push(`Scroll engine: Lenis needs a documented reason (reasons.lenis)${plan.scrollArchitecture === 'native' ? ' — and a native document rarely has one' : ''}`);
  if (plan['3d'] !== undefined && plan['3d'] !== 'none') {
    const label = optionOf('3d', plan['3d']).label;
    if (!reasoned(plan, '3d')) errors.push(`Realtime 3D: ${label} needs written evidence (reasons.3d)`);
    if (plan['3d'] === 'r3f' && !project.react)
      errors.push('Realtime 3D: React Three Fiber needs a React stack, and this project declares no react — Three.js is framework-independent');
    if (!filled(plan['3dFallback']?.mobile)) errors.push(`Realtime 3D: ${label} needs a recorded mobile fallback (--fallback mobile="…")`);
    if (!filled(plan['3dFallback']?.reducedMotion)) errors.push(`Realtime 3D: ${label} needs a recorded reduced-motion fallback (--fallback reducedMotion="…")`);
  }

  return errors;
}

/* ── the gates ───────────────────────────────────────────────────────────── */
/* An approval holds only for the identity it was given to. */
function approvalState(a, identity, what) {
  if (!a || !a.status) return `${what}: not approved yet`;
  if (a.status === 'revise') return `${what}: sent back for revision (id ${short(a.identity)}) — a revised version needs a new approval`;
  if (a.status === 'reject') return `${what}: rejected (id ${short(a.identity)}) — a new direction needs a new approval`;
  if (identity && a.identity !== identity) return `${what}: approved for id ${short(a.identity)}, but what is in front of us now is id ${short(identity)} — it changed, so the approval no longer holds`;
  if (!identity) return `${what}: approved, but the evidence it was given to is not available to check`;
  return null;
}

const conceptGate = (plan, ctx) => approvalState(plan.approvals?.concept, conceptIdentity(ctx), 'concept');
const assetGate = (plan, ctx) => approvalState(plan.approvals?.assetPlan, assetIdentity(ctx.compositing), 'asset plan');
const dna101Applies = (ctx) => !!ctx.compositing && validateLayers(ctx.compositing).active;

/* gate('implementation' | 'generation', plan, ctx) → { open, reasons } */
export function gate(kind, plan, ctx = {}) {
  const reasons = [];
  if (kind === 'implementation') {
    const c = conceptGate(plan, ctx); if (c) reasons.push(c);
    if (dna101Applies(ctx)) { const a = assetGate(plan, ctx); if (a) reasons.push(a); }
    if (plan.baseStack === undefined) reasons.push('Сборка: the build plan is not answered yet');
  } else if (kind === 'generation') {
    if (!ctx.compositing) reasons.push('asset plan: there is no compositing plan with a paid list (--compositing)');
    else {
      const a = assetGate(plan, ctx); if (a) reasons.push(a);
      const b = plan.approvals?.budget;
      if (!b || b.status !== 'approved') reasons.push(`budget: ${b?.status === 'revise' ? 'sent back for revision' : b?.status === 'none' ? 'no paid generation was approved' : 'not approved yet'}`);
      else if (b.identity !== assetIdentity(ctx.compositing)) reasons.push(`budget: approved for plan id ${short(b.identity)}, the plan is now id ${short(assetIdentity(ctx.compositing))} — the paid list or budget changed`);
      else {
        const c = checkLayersApproval(ctx.compositing, b);
        if (!c.approved) reasons.push(`budget: ${c.unlisted.length ? `unlisted paid generations ${c.unlisted.join(', ')}` : ''}${c.overBudget ? ` cost ${c.cost} over ${c.budget}` : ''}`.trim());
      }
    }
  } else reasons.push(`no gate named "${kind}" — implementation or generation`);
  return { open: reasons.length === 0, reasons };
}

/* ── settling answers into a plan ────────────────────────────────────────── */
/* Merge the steps just answered into the plan so far, in lifecycle order, and
   check each against what must already stand. Approvals are recorded against
   the identity of what was shown; an unchanged direction sent back cannot be
   re-approved as it was. */
const closedFor = (a, identity) => (a?.closed || []).includes(identity);

export function settle(prev = {}, parsed, ctx = {}) {
  const errors = [];
  const plan = { ...prev, reasons: { ...(prev.reasons || {}), ...(parsed.plan.reasons || {}) }, notes: [...(prev.notes || []), ...(parsed.plan.notes || [])], approvals: { ...(prev.approvals || {}) } };
  for (const k of ['preserveBootstrapAndTailwind', '3dFallback', 'briefGapsFrom']) if (parsed.plan[k] !== undefined) plan[k] = parsed.plan[k];
  const done = (step) => groupsOf(step).every((g) => plan[g.field] !== undefined);

  for (const step of STEPS.filter((s) => parsed.steps.includes(s.id))) {
    const need = (cond, msg) => { if (!cond) errors.push(`${step.label}: ${msg}`); };
    if (step.id === 'concept') need(done('brief'), 'Бриф comes first');
    if (step.id === 'concept-approval') {
      need(done('concept'), 'Концепт routing comes first');
      need(ctx.board && filled(ctx.idea), 'the direction board and the governing idea must be shown before approval (--board, --idea or BRIEF.md)');
    }
    if (step.id === 'assets') need(!conceptGate(plan, ctx), `the concept must be approved first — ${conceptGate(plan, ctx)}`);
    if (step.id === 'asset-approval') {
      need(done('assets') || parsed.steps.includes('assets'), 'Ассеты routing comes first');
      need(!!ctx.compositing, 'the compositing plan and the paid list must be shown before approval (--compositing)');
    }
    if (step.id === 'build') {
      need(!conceptGate(plan, ctx), `the concept must be approved first — ${conceptGate(plan, ctx)}`);
      if (dna101Applies(ctx)) need(!assetGate(plan, ctx), `DNA101 applies, so the asset plan must be approved first — ${assetGate(plan, ctx)}`);
    }
    if (step.id === 'review') need(done('build') || parsed.steps.includes('build'), 'Сборка comes first');

    for (const g of groupsOf(step.id)) if (parsed.plan[g.field] !== undefined) plan[g.field] = parsed.plan[g.field];

    if (step.id === 'concept-approval' && ctx.board && filled(ctx.idea)) {
      const id = conceptIdentity(ctx);
      const prior = plan.approvals.concept;
      if (plan.conceptApproval === 'approved' && closedFor(prior, id))
        errors.push(`${step.label}: this direction (id ${short(id)}) was sent back and has not changed — revise it before approving`);
      plan.approvals.concept = {
        status: plan.conceptApproval, identity: id, idea: normaliseSpace(ctx.idea), board: ctx.board.path, contract: ctx.contract?.path ?? null,
        closed: [...new Set([...(prior?.closed || []), ...(plan.conceptApproval === 'approved' ? [] : [id])])],
      };
    }
    if (step.id === 'asset-approval' && ctx.compositing) {
      const id = assetIdentity(ctx.compositing);
      const prior = plan.approvals.assetPlan;
      if (plan.assetPlanApproval === 'approved' && closedFor(prior, id))
        errors.push(`${step.label}: this asset plan (id ${short(id)}) was sent back and has not changed — revise it before approving`);
      plan.approvals.assetPlan = {
        status: plan.assetPlanApproval, identity: id, plan: ctx.compositingPath ?? null,
        closed: [...new Set([...(prior?.closed || []), ...(plan.assetPlanApproval === 'approved' ? [] : [id])])],
      };
      const c = countLayers(ctx.compositing);
      plan.approvals.budget = plan.assetApproval === 'approve'
        ? { status: plan.assetPlanApproval === 'approved' ? 'approved' : 'held', identity: id, assets: c.paidIds, budget: c.cost }
        : { status: plan.assetApproval };
    }
  }
  delete plan.legacyAnswers;
  return { plan, errors };
}

/* ── persistence ─────────────────────────────────────────────────────────── */
/* <project>/build-plan.json, beside BRIEF.md: the decision travels with the
   project, and the gate chain reads the scroll engine from it. Сборка stays
   top-level; the other stages are saved under their own section, approvals as
   records with the identity they were given to. */
export function save(dir, plan, ctx = {}) {
  const { scan, compositing, brief } = ctx;
  const approvals = { ...(plan.approvals || {}) };
  /* a plan saved without settle(): derive the budget record as before */
  if (!approvals.budget && plan.assetApproval !== undefined)
    approvals.budget = plan.assetApproval === 'approve' && compositing
      ? { status: 'approved', identity: assetIdentity(compositing), assets: countLayers(compositing).paidIds, budget: countLayers(compositing).cost }
      : { status: plan.assetApproval };

  const record = { version: PLAN_VERSION, savedAt: new Date().toISOString() };
  for (const stage of STAGES) {
    const groups = GROUPS.filter((g) => g.stage === stage.name && plan[g.field] !== undefined && !APPROVAL_FIELDS.has(g.field));
    if (!stage.key) { for (const g of groups) record[g.field] = plan[g.field]; continue; }
    if (groups.length) record[stage.key] = Object.fromEntries(groups.map((g) => [g.key, plan[g.field]]));
  }
  if (plan['3dFallback']) record['3dFallback'] = plan['3dFallback'];
  if (record.brief) {
    record.brief.facts = brief?.exists ? { file: 'BRIEF.md', filled: brief.filled, total: brief.total, empty: brief.empty } : { file: null };
    if (plan.briefGapsFrom) record.brief.gapsFrom = plan.briefGapsFrom;
  }
  if (approvals.concept) (record.concept ||= {}).approval = approvals.concept;
  /* what an earlier step recorded survives a later save that did not pass it again */
  if (record.concept) {
    if (scan) record.concept.scan = { signals: scan.signals.map((s) => s.id), thesis: qualifies(scan) ? scan.thesis : null };
    else if (plan.concept?.scan) record.concept.scan = plan.concept.scan;
  }
  if (approvals.assetPlan) (record.assets ||= {}).planApproval = approvals.assetPlan;
  if (approvals.budget) (record.assets ||= {}).approval = approvals.budget;
  if (record.assets) {
    if (compositing) record.assets.dna101 = { active: validateLayers(compositing).active, triggers: validateLayers(compositing).triggers };
    else if (plan.assets?.dna101) record.assets.dna101 = plan.assets.dna101;
  }
  if (record.review) record.review.required = REQUIRED_REVIEW;
  record.reasons = plan.reasons || {};
  if (plan.notes?.length) record.notes = plan.notes;
  if (plan.preserveBootstrapAndTailwind) record.preserveBootstrapAndTailwind = true;
  if (plan.migratedFrom) record.migratedFrom = plan.migratedFrom;
  record.rule = GLOBAL_RULE;
  writeFileSync(join(dir, PLAN_FILE), JSON.stringify(record, null, 2) + '\n');
  return record;
}

/* The stage sections read back into plan fields; approval records into the
   answers they came from and into plan.approvals. */
function flatten(record) {
  if (!record) return record;
  const plan = { ...record };
  for (const g of GROUPS) {
    const key = stageOf(g.stage).key;
    if (!key || !record[key] || record[key][g.key] === undefined || APPROVAL_FIELDS.has(g.field)) continue;
    plan[g.field] = record[key][g.key];
  }
  const approvals = {};
  if (record.concept?.approval) { approvals.concept = record.concept.approval; plan.conceptApproval = record.concept.approval.status; }
  if (record.assets?.planApproval) { approvals.assetPlan = record.assets.planApproval; plan.assetPlanApproval = record.assets.planApproval.status; }
  if (record.assets?.approval) {
    approvals.budget = record.assets.approval;
    const s = record.assets.approval.status;
    plan.assetApproval = s === 'approved' || s === 'held' ? 'approve' : s;
  }
  if (Object.keys(approvals).length) plan.approvals = approvals;
  return plan;
}

/* A version-1 file is read as version 2 and left on disk as it is: the next
   save writes the new shape. */
export function load(dir) {
  const p = join(dir, PLAN_FILE);
  return existsSync(p) ? flatten(migrate(JSON.parse(readFileSync(p, 'utf8')))) : null;
}

/* ── what the agent is handed ────────────────────────────────────────────── */
export function describe(plan) {
  const name = (f) => {
    const g = byField[f];
    return g.type === 'single'
      ? optionOf(f, plan[f])?.label ?? String(plan[f])
      : (plan[f] || []).map((id) => optionOf(f, id)?.label ?? id).join(', ') || '—';
  };
  const a = plan.approvals || {};
  const lines = ['BUILD PLAN (DNA99) — Бриф → Концепт → Ассеты → Сборка → Проверка'];
  for (const stage of STAGES) {
    const groups = GROUPS.filter((g) => g.stage === stage.name && plan[g.field] !== undefined && !APPROVAL_FIELDS.has(g.field));
    if (!groups.length && !(stage.name === 'Концепт' && a.concept) && !(stage.name === 'Ассеты' && a.assetPlan)) continue;
    lines.push(`  ${stage.name.toUpperCase()}`);
    if (stage.name === 'Бриф') lines.push(`    ${'Facts:'.padEnd(21)}BRIEF.md is the source of truth; these answers only record task, sources and gaps`);
    for (const g of groups) lines.push(`    ${(g.label + ':').padEnd(21)}${name(g.field)}`);
    if (stage.name === 'Концепт' && a.concept) lines.push(`    ${'Approval:'.padEnd(21)}${a.concept.status} · id ${short(a.concept.identity)} · ${a.concept.board}`);
    if (stage.name === 'Ассеты' && a.assetPlan) lines.push(`    ${'Plan approval:'.padEnd(21)}${a.assetPlan.status} · id ${short(a.assetPlan.identity)}`);
    if (stage.name === 'Ассеты' && a.budget) lines.push(`    ${'Budget:'.padEnd(21)}${a.budget.status}${a.budget.assets ? ` · ${a.budget.assets.join(', ')} · ${a.budget.budget}` : ''}`);
    if (stage.name === 'Сборка' && plan['3dFallback']) lines.push(`    ${'3D fallbacks:'.padEnd(21)}mobile: ${plan['3dFallback'].mobile || '—'} · reduced motion: ${plan['3dFallback'].reducedMotion || '—'}`);
    if (stage.name === 'Проверка') lines.push(`    ${'Always:'.padEnd(21)}${REQUIRED_REVIEW.join(' · ')}`);
  }
  for (const [k, v] of Object.entries(plan.reasons || {})) lines.push(`  reason · ${k}: ${v}`);
  for (const n of plan.notes || []) lines.push(`  note: ${n}`);
  lines.push(`  ${GLOBAL_RULE}`);
  lines.push('  A tool choice never changes the approved visual contract, direction or content.');
  return lines.join('\n');
}

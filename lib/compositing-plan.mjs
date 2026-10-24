/* The compositing plan (DNA101) — written before any paid generation.
 *
 * A concept that needs a subject to move, scale, persist or be tracked on its
 * own needs that subject as its own production layer. This module decides when
 * that is the case, checks a plan against it, counts what is actually paid for,
 * and checks a generation against what was approved.
 *
 * It selects no technology. Whether the layers are moved by CSS, GSAP or a
 * WebGL scene is the build plan's decision (DNA99), made for its own reasons.
 */

/* What activates the rule — each one needs an element to behave independently. */
export const TRIGGERS = {
  'persistent-subject': 'one subject persists across several chapters',
  'parallax-layers': 'foreground and background move at different rates',
  'independent-scale': 'a subject changes scale independently of its environment',
  'tracking-overlay': 'text, HUD or measurements track a moving subject',
  'scene-transition': 'one object transitions between several scenes',
  'controlled-overlap': 'controlled overlap between independent masses',
  'responsive-reposition': 'an object is repositioned independently for desktop and mobile',
  'subject-reveal': 'scroll reveals or magnifies different parts of one subject',
  'independent-atmosphere': 'smoke, dust, light or particles move independently',
  'explicit-depth': 'foreground, middle-ground and background behave differently',
};

/* Motion that does not need a layer of its own. Named so that it is recognised
   and set aside, rather than mistaken for a trigger. */
export const NON_TRIGGERS = {
  'static-full-bleed': 'a static full-bleed scene',
  'crop-change': 'an ordinary crop change between breakpoints',
  'opacity-reveal': 'a simple opacity reveal',
  animation: 'the page animates',
};

export const ROLES = ['background-plate', 'middle-ground', 'persistent-foreground', 'atmosphere', 'interface', 'typography', 'matte'];
export const SOURCES = ['supplied', 'generated', 'extracted', 'html', 'svg', 'webgl'];
export const DERIVATIONS = ['master-source', 'paid-derived', 'local-crop', 'local-resize', 'local-extraction', 'responsive', 'native'];

const PAID = new Set(['master-source', 'paid-derived']);
const NATIVE_SOURCES = new Set(['html', 'svg', 'webgl']);     /* independent by construction */
const NATIVE_ROLES = new Set(['interface', 'typography']);    /* never a raster generation */
const SEPARABLE = new Set(['persistent-foreground', 'middle-ground', 'atmosphere']); /* sit over something */
const FIELDS = ['id', 'subject', 'role', 'source', 'format', 'alpha', 'identity', 'desktop', 'mobile', 'reducedMotion', 'derivation', 'paid'];

/* ── activation ──────────────────────────────────────────────────────────── */
export function assess(requirements = []) {
  const triggers = requirements.filter((r) => r in TRIGGERS);
  const ignored = requirements.filter((r) => !(r in TRIGGERS));
  return { active: triggers.length > 0, triggers, ignored };
}

/* ── the plan ────────────────────────────────────────────────────────────── */
export function validate(plan) {
  const errors = [], warnings = [];
  const { active, triggers } = assess(plan.requirements);
  const assets = plan.assets || [];
  const byId = new Map(assets.map((a) => [a.id, a]));
  const independent = new Set(plan.independent || []);
  const flattened = new Map();
  for (const group of plan.flattenable || []) for (const id of group) flattened.set(id, group);

  for (const a of assets) {
    const at = `asset ${a.id ?? '?'}`;
    const missing = FIELDS.filter((f) => a[f] === undefined);
    if (missing.length) errors.push(`${at}: missing ${missing.join(', ')}`);
    if (!ROLES.includes(a.role)) errors.push(`${at}: role "${a.role}" is not one of ${ROLES.join(' · ')}`);
    if (!SOURCES.includes(a.source)) errors.push(`${at}: source "${a.source}" is not one of ${SOURCES.join(' · ')}`);
    if (!DERIVATIONS.includes(a.derivation)) errors.push(`${at}: derivation "${a.derivation}" is not one of ${DERIVATIONS.join(' · ')}`);

    if (NATIVE_ROLES.has(a.role) && !['html', 'svg'].includes(a.source))
      errors.push(`${at}: ${a.role} is SVG or HTML, never a raster generation`);
    const shouldPay = PAID.has(a.derivation) && a.source === 'generated';
    if (shouldPay !== !!a.paid)
      errors.push(`${at}: a ${a.source} ${a.derivation} is ${shouldPay ? 'a paid generation' : 'not a paid generation'} — paid must be ${shouldPay}`);
    if (!PAID.has(a.derivation) && a.derivation !== 'native') {
      if (!byId.has(a.master)) errors.push(`${at}: a local derivative names the asset it derives from (master)`);
    }
    if (a.derivation === 'paid-derived' && !byId.has(a.master)) errors.push(`${at}: a paid derivative names its master`);
  }

  if (!active) return { active, triggers, errors, warnings };

  /* active: the plan has to say what stays apart and what may be merged */
  if (!Array.isArray(plan.independent) || !Array.isArray(plan.flattenable))
    errors.push('the plan states which elements stay independent and which may be flattened together (independent, flattenable)');

  const needsSubject = triggers.some((t) => t !== 'independent-atmosphere');
  const subjects = [...independent].map((id) => byId.get(id)).filter((a) => a && a.role === 'persistent-foreground');
  if (needsSubject && !subjects.length)
    errors.push(`${triggers.join(', ')} needs an independent persistent-foreground subject — none is planned`);

  for (const id of independent) {
    const a = byId.get(id);
    if (!a) { errors.push(`independent "${id}" is not an asset in the plan`); continue; }
    const at = `asset ${id}`;
    const group = flattened.get(id);
    if (group && group.length > 1) errors.push(`${at}: listed as independent and flattened with ${group.filter((x) => x !== id).join(', ')}`);
    const bakedBehind = (a.bakes || []).filter((r) => r === 'background-plate' || r === 'middle-ground');
    if (bakedBehind.length) errors.push(`${at}: a flattened image with ${bakedBehind.join(' and ')} baked in does not make an independent layer`);
    if (SEPARABLE.has(a.role) && !NATIVE_SOURCES.has(a.source)) {
      const msg = `${at}: ${a.role} moves on its own — genuine alpha, or an independent render`;
      if (!a.alpha) (a.role === 'atmosphere' ? warnings : errors).push(msg + (a.role === 'atmosphere' ? ' (preferred)' : ''));
      const alphaMaster = a.alpha && (PAID.has(a.derivation) || a.derivation === 'local-extraction');
      if (alphaMaster && a.format !== 'png') errors.push(`${at}: the alpha master is lossless PNG — WebP/AVIF are derived from it locally`);
    }
  }

  /* one master per identity: a nominally identical product regenerated per scene is not a family */
  const masters = new Map();
  for (const a of assets.filter((x) => x.identity && x.derivation === 'master-source')) {
    const k = String(a.identityOf || a.subject).toLowerCase();
    if (masters.has(k)) errors.push(`asset ${a.id}: a second master for "${k}" — derive from ${masters.get(k)} instead of regenerating it`);
    else masters.set(k, a.id);
  }
  for (const a of assets.filter((x) => x.identity && x.derivation !== 'master-source' && x.derivation !== 'native')) {
    const m = byId.get(a.master);
    if (m && !m.identity) errors.push(`asset ${a.id}: derives an identity-locked view from ${m.id}, which is not an identity master`);
  }
  for (const id of masters.values()) {
    if (!(plan.identityFeatures?.[id] || []).length) errors.push(`asset ${id}: a master records its invariant identity features (identityFeatures.${id})`);
  }

  return { active, triggers, errors, warnings };
}

/* ── what is actually paid for ───────────────────────────────────────────── */
export function count(plan) {
  const assets = plan.assets || [];
  const paid = assets.filter((a) => a.paid);
  return {
    files: assets.length,
    paidSources: paid.length,
    cost: +paid.reduce((s, a) => s + (Number(a.cost) || 0), 0).toFixed(4),
    paidIds: paid.map((a) => a.id),
    localDerivatives: assets.filter((a) => !a.paid && a.derivation !== 'native' && a.derivation !== 'master-source').map((a) => a.id),
    alpha: assets.filter((a) => a.alpha).map((a) => a.id),
  };
}

/* ── approval ────────────────────────────────────────────────────────────── */
/* An approval names the paid sources and the budget. Anything paid outside it
   asks again; local resizing, conversion and optimisation never do. */
export function checkApproval(plan, approval = { assets: [], budget: 0 }) {
  const c = count(plan);
  const listed = new Set(approval.assets || []);
  const unlisted = c.paidIds.filter((id) => !listed.has(id));
  const overBudget = c.cost > (Number(approval.budget) || 0);
  return { approved: !unlisted.length && !overBudget, unlisted, overBudget, cost: c.cost, budget: approval.budget };
}

/* ── the summary shown before paid generation ────────────────────────────── */
export function summary(plan) {
  const v = validate(plan), c = count(plan);
  const lines = [`COMPOSITING PLAN (DNA101) — ${v.active ? `active: ${v.triggers.join(', ')}` : 'not active: no element has to move on its own'}`];
  lines.push('  id · role · source · derivation · alpha · paid');
  for (const a of plan.assets || []) lines.push(`  ${a.id} · ${a.role} · ${a.source} · ${a.derivation}${a.master ? ` ← ${a.master}` : ''} · ${a.alpha ? 'alpha' : '—'} · ${a.paid ? `paid ${a.cost ?? '?'}` : 'local'}`);
  lines.push(`  independent: ${(plan.independent || []).join(', ') || '—'} · flattenable: ${(plan.flattenable || []).map((g) => g.join('+')).join('; ') || '—'}`);
  lines.push(`  paid source generations: ${c.paidSources} (${c.files} files) · expected cost: ${c.cost}`);
  lines.push(`  local derivatives, no generation: ${c.localDerivatives.join(', ') || '—'}`);
  lines.push(`  alpha assets: ${c.alpha.join(', ') || '—'}`);
  lines.push(`  extraction risk: ${(plan.extractionRisk || []).join('; ') || 'none stated'}`);
  for (const w of v.warnings) lines.push(`  warning: ${w}`);
  return lines.join('\n');
}

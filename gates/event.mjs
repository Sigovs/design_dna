/* A1 — one governing event owns the first screen.
 *
 * THE DEFECT THIS REPLACES. A1 used to be measured as the tallest media element
 * on the first screen, as a fraction of viewport height. That instrument scored
 * the authored fixture at 35% and the unauthored one at 100%: a composed system
 * of car, record, claim and graduated field read as "not much image", while a
 * stock video stretched edge to edge read as perfect ownership. The floor was
 * rewarding a large photograph and calling it a governing event.
 *
 * A1 is not "a large image occupies the viewport". A1 is "ONE GOVERNING EVENT
 * OWNS THE FIRST SCREEN, AND EVERYTHING ELSE DEFERS TO IT". So the rule is
 * unchanged and the instrument is rebuilt: three separate numbers that used to
 * be one.
 *
 *   mediaCoverage    how much of the first screen is image or video. Reported,
 *                    never a pass condition. A page can own its first screen
 *                    with almost no media, and cover it entirely with media and
 *                    own nothing.
 *   eventCoverage    how much of the first screen the DECLARED governing event
 *                    occupies as a composed system — subject, identity mass,
 *                    supporting record, active field, CTA cluster, and reserved
 *                    negative space that participates in the composition.
 *   competition      whether an independent mass on the first screen holds
 *                    comparable visual rank. Ownership is singular: two events
 *                    of similar rank means neither governs.
 *
 * WHAT THIS GATE STILL DOES NOT DO. It measures presence and ownership, not
 * quality. A declared event can own the whole first screen and be dull, generic
 * or transferable to a competitor — Gate 2 is what asks whether the event does
 * any compositional work, and nothing here gives a page authorship credit.
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

/* the roles a governing event is built from */
export const ROLES = {
  subject: 'the primary subject — what the first screen is of',
  identity: 'the identity or headline mass',
  support: 'a supporting record, index or interface mass',
  cta: 'the call-to-action cluster',
  field: 'an active atmospheric field — an authored ground, not a page background',
  'negative-space': 'reserved space that participates in the composition',
};

/* roles that carry visual rank. `field` and `negative-space` are the composition
   the masses sit in; letting them count toward rank would mean a full-bleed
   photograph could out-rank any competitor by definition. */
export const RANK_ROLES = ['subject', 'identity', 'support', 'cta'];

/* a reserved region has to be reserved FOR something */
export const NEGATIVE_SPACE_FUNCTIONS = [
  'text-safe field', 'directional air', 'isolation around the subject', 'visual pause inside the event',
];

export const DEFAULT_FLOOR = 0.90;
/* an independent mass at 60% of the event's rank or above is a second event */
export const COMPETITION_LIMIT = 0.60;
/* space may shape an event; it may not BE the event */
export const NEGATIVE_SPACE_MAX_SHARE = 0.40;
/* a component covering essentially the whole viewport is a wrapper, not a mass */
export const WRAPPER_THRESHOLD = 0.95;
/* how close a mass must sit to a reserved region's edge to be said to bound it */
export const BOUND_TOLERANCE_PX = 28;

export function unionArea(rects) {
  if (!rects.length) return 0;
  const xs = [...new Set(rects.flatMap((r) => [r.x, r.x + r.w]))].sort((a, b) => a - b);
  const ys = [...new Set(rects.flatMap((r) => [r.y, r.y + r.h]))].sort((a, b) => a - b);
  let area = 0;
  for (let i = 0; i < xs.length - 1; i++) {
    const cx = (xs[i] + xs[i + 1]) / 2, dx = xs[i + 1] - xs[i];
    for (let j = 0; j < ys.length - 1; j++) {
      const cy = (ys[j] + ys[j + 1]) / 2;
      if (rects.some((r) => cx >= r.x && cx <= r.x + r.w && cy >= r.y && cy <= r.y + r.h)) {
        area += dx * (ys[j + 1] - ys[j]);
      }
    }
  }
  return area;
}

const envelopeOf = (rects) => {
  if (!rects.length) return null;
  const x = Math.min(...rects.map((r) => r.x)), y = Math.min(...rects.map((r) => r.y));
  const x2 = Math.max(...rects.map((r) => r.x + r.w)), y2 = Math.max(...rects.map((r) => r.y + r.h));
  return { x, y, w: x2 - x, h: y2 - y };
};

/* which edges of a reserved region are held by an actual mass */
export function boundedEdges(space, masses, tol = BOUND_TOLERANCE_PX) {
  const spans = (a1, a2, b1, b2) => Math.min(a2, b2) - Math.max(a1, b1) > 0;
  const edges = [];
  for (const m of masses) {
    if (spans(space.x, space.x + space.w, m.x, m.x + m.w)) {
      if (Math.abs(m.y + m.h - space.y) <= tol) edges.push('top');
      if (Math.abs(m.y - (space.y + space.h)) <= tol) edges.push('bottom');
    }
    if (spans(space.y, space.y + space.h, m.y, m.y + m.h)) {
      if (Math.abs(m.x + m.w - space.x) <= tol) edges.push('left');
      if (Math.abs(m.x - (space.x + space.w)) <= tol) edges.push('right');
    }
  }
  return [...new Set(edges)];
}

/* ── what the page actually shows ─────────────────────────────────────────── */
export const EXTRACT = function (decl) {
  const vw = innerWidth, vh = innerHeight;
  const clip = (e) => {
    const r = e.getBoundingClientRect();
    const x = Math.max(0, r.left), y = Math.max(0, r.top);
    const x2 = Math.min(vw, r.right), y2 = Math.min(vh, r.bottom);
    if (!(x2 - x > 0.5 && y2 - y > 0.5)) return null;
    const cs = getComputedStyle(e);
    if (cs.display === 'none' || cs.visibility === 'hidden' || parseFloat(cs.opacity) === 0) return null;
    return { x, y, w: x2 - x, h: y2 - y };
  };
  const name = (e) => e.tagName.toLowerCase() + (e.id ? '#' + e.id : '') +
    (typeof e.className === 'string' && e.className.trim() ? '.' + e.className.trim().split(/\s+/)[0] : '');
  const isMedia = (e) => /^(img|video|canvas|picture|svg)$/i.test(e.tagName);

  const declaredEls = [];
  const components = (decl.components || []).map((c) => {
    if (c.rect) {
      return { ...c, rects: [{ x: c.rect.x * vw, y: c.rect.y * vh, w: c.rect.w * vw, h: c.rect.h * vh }], matched: 1, elements: [] };
    }
    const els = [...document.querySelectorAll(c.selector)];
    const rects = [];
    for (const e of els) { const r = clip(e); if (r) { rects.push(r); declaredEls.push(e); } }
    return {
      ...c, rects, matched: rects.length, inDocument: els.length,
      hasMedia: els.some((e) => isMedia(e) || e.querySelector('img,video,canvas,picture')),
      elements: els.map(name),
    };
  });

  const excludedEls = [];
  const excluded = (decl.excluded || []).map((x) => {
    const els = [...document.querySelectorAll(x.selector)];
    els.forEach((e) => excludedEls.push(e));
    return { ...x, rects: els.map(clip).filter(Boolean), matched: els.length };
  });

  /* media, measured on its own and kept out of the pass condition */
  const mediaRects = [];
  for (const e of document.querySelectorAll('img,video,canvas,picture')) {
    const r = clip(e); if (r) mediaRects.push(r);
  }

  /* an independent mass: big enough to read as an event, and neither a part
     nor a container of anything declared or excluded */
  const related = (e) => [...declaredEls, ...excludedEls].some((d) => d === e || d.contains(e) || e.contains(d));
  const MIN = 0.04 * vw * vh;
  let cands = [];
  for (const e of document.querySelectorAll('body *')) {
    if (related(e)) continue;
    const r = clip(e);
    if (!r || r.w * r.h < MIN) continue;
    cands.push({ el: e, rect: r });
  }
  cands = cands.filter((c) => !cands.some((o) => o.el !== c.el && o.el.contains(c.el)));
  const competitors = cands.map((c) => {
    const fonts = [...c.el.querySelectorAll('*')].concat(c.el)
      .filter((x) => x.textContent && x.textContent.trim())
      .map((x) => parseFloat(getComputedStyle(x).fontSize) || 0);
    return {
      name: name(c.el), rect: c.rect,
      hasMedia: isMedia(c.el) || !!c.el.querySelector('img,video,canvas'),
      maxFontPx: fonts.length ? Math.round(Math.max(...fonts)) : 0,
      hasAction: !!c.el.querySelector('a[href],button'),
    };
  });

  return { viewport: { w: vw, h: vh }, components, excluded, mediaRects, competitors };
};

/* ── the verdict ──────────────────────────────────────────────────────────── */
export function evaluate(geom, decl = {}) {
  const { viewport: vp } = geom;
  const VA = vp.w * vp.h;
  const problems = [];
  const floor = decl.floor ?? DEFAULT_FLOOR;

  /* persistent chrome is declared out of the event, so it is not counted
     against the event's ownership either — a masthead is the frame, not a rival */
  const chromeRects = geom.excluded.flatMap((x) => x.rects);
  const chromeArea = unionArea(chromeRects);
  const available = Math.max(1, VA - chromeArea);

  const byRole = (r) => geom.components.filter((c) => c.role === r);
  const isWrapper = (c) => unionArea(c.rects) / VA >= WRAPPER_THRESHOLD;
  /* Rank is carried by identified masses. A component covering the whole
     viewport is excluded from rank even when it is the subject: otherwise
     declaring the full-bleed photograph as the subject makes the denominator
     the entire screen, and no competing event could ever reach the limit. */
  const rankComponents = geom.components.filter((c) => RANK_ROLES.includes(c.role) && !isWrapper(c));
  const rankRects = rankComponents.flatMap((c) => c.rects);

  /* ── the declaration has to be a declaration ───────────────────────────── */
  for (const c of geom.components) {
    if (!ROLES[c.role]) problems.push(`component "${c.selector || c.role}": role "${c.role}" is not one of ${Object.keys(ROLES).join(' | ')}`);
    if (!c.rects.length) {
      /* not in the document at all, and present but below the fold, are different
         failures: the first is a wrong declaration, the second is a component the
         Read claimed for a first screen it never reaches */
      problems.push(c.inDocument
        ? `component ${c.role} "${c.selector}": matched ${c.inDocument} element(s), none of them on the first screen`
        : `component ${c.role} "${c.selector || 'rect'}": matched nothing in the render`);
    }
  }
  const masses = rankComponents.filter((c) => c.rects.length);
  if (!byRole('subject').length) {
    problems.push('no primary subject declared — A1 requires the event to be of something');
  }
  if (masses.length < 2) {
    problems.push(
      'the event is not declared as a composed system: fewer than two independently identified masses. ' +
      'A single full-viewport wrapper is not a governing-event declaration.');
  }

  /* ── negative space counts only where it is genuinely composed ─────────── */
  const massRects = masses.flatMap((c) => c.rects);
  const negatives = byRole('negative-space').map((c) => {
    const rect = c.rects[0];
    const out = { ...c, rect, counted: false, boundedBy: [], why: null };
    if (!rect) { out.why = 'no rect'; return out; }
    if (!NEGATIVE_SPACE_FUNCTIONS.includes(c.function)) {
      out.why = `function "${c.function ?? 'none'}" is not one of: ${NEGATIVE_SPACE_FUNCTIONS.join(' | ')}`;
      problems.push(`reserved region: ${out.why}`);
      return out;
    }
    out.boundedBy = boundedEdges(rect, massRects);
    if (out.boundedBy.length < 2) {
      out.why = `bounded on ${out.boundedBy.length} side(s) by event masses; blank viewport area cannot be added to reach the floor`;
      problems.push(`reserved region "${c.function}": ${out.why}`);
      return out;
    }
    out.counted = true;
    return out;
  });

  const countedNegatives = negatives.filter((n) => n.counted).map((n) => n.rect);
  const structuralRects = geom.components
    .filter((c) => c.role !== 'negative-space').flatMap((c) => c.rects);
  const eventRects = [...structuralRects, ...countedNegatives];

  /* area outside the excluded chrome: a mass running under the masthead does not
     get to count the masthead's pixels twice */
  const outsideChrome = (rects) => Math.max(0, unionArea([...rects, ...chromeRects]) - chromeArea);
  const eventArea = outsideChrome(eventRects);
  const structuralArea = outsideChrome(structuralRects);
  const negativeArea = Math.max(0, eventArea - structuralArea);
  const negativeShare = eventArea > 0 ? negativeArea / eventArea : 0;
  if (negativeShare > NEGATIVE_SPACE_MAX_SHARE) {
    problems.push(`reserved space is ${(negativeShare * 100).toFixed(0)}% of the event — space may shape an event, not be it (limit ${NEGATIVE_SPACE_MAX_SHARE * 100}%)`);
  }

  const eventCoverage = eventArea / available;
  const mediaCoverage = unionArea(geom.mediaRects) / VA;
  const rankArea = unionArea(rankRects);

  /* the event must survive its own photography being removed */
  const nonMediaRank = unionArea(rankComponents.filter((c) => !c.hasMedia).flatMap((c) => c.rects));
  const readsWithoutMedia = nonMediaRank / VA >= 0.02;
  if (!readsWithoutMedia) {
    problems.push('the event has no non-media mass — it reads only as a photograph, and would not survive the image being low-coverage');
  }

  /* ── competition ───────────────────────────────────────────────────────── */
  const ranked = geom.competitors
    .map((c) => ({ ...c, area: c.rect.w * c.rect.h, share: +(c.rect.w * c.rect.h / VA).toFixed(3) }))
    .map((c) => ({ ...c, ratio: rankArea > 0 ? +(c.area / rankArea).toFixed(3) : (c.area > 0 ? Infinity : 0) }))
    .sort((a, b) => b.ratio - a.ratio);
  const top = ranked[0] || null;
  const competitionRatio = top ? top.ratio : 0;
  if (top && competitionRatio >= COMPETITION_LIMIT) {
    problems.push(
      `an independent mass holds comparable rank: ${top.name} at ${(competitionRatio * 100).toFixed(0)}% of the event's ` +
      `rank mass (limit ${COMPETITION_LIMIT * 100}%). Two events of similar rank means neither governs.`);
  }

  /* ── the subject has to still be findable ──────────────────────────────── */
  const subjectRects = byRole('subject').flatMap((c) => c.rects);
  const subjectArea = outsideChrome(subjectRects);
  const subjectShareOfEvent = eventArea > 0 ? subjectArea / eventArea : 0;
  if (subjectRects.length && subjectShareOfEvent < 0.02) {
    problems.push(`the primary subject is ${(subjectShareOfEvent * 100).toFixed(1)}% of the event — not identifiable at this scale`);
  }

  if (eventCoverage < floor) {
    problems.push(`eventCoverage ${(eventCoverage * 100).toFixed(1)}% is below the A1 floor of ${(floor * 100).toFixed(0)}%`);
  }

  return {
    rule: 'A1 — one governing event owns the first screen, and everything else defers to it',
    eventStatement: decl.eventStatement ?? null,
    floor,
    metrics: {
      eventCoverage: +eventCoverage.toFixed(3),
      mediaCoverage: +mediaCoverage.toFixed(3),
      competitionRatio: +Number(competitionRatio).toFixed(3),
      structuralShare: +(structuralArea / available).toFixed(3),
      negativeSpaceShare: +negativeShare.toFixed(3),
      rankMassShare: +(rankArea / VA).toFixed(3),
      subjectShareOfEvent: +subjectShareOfEvent.toFixed(3),
      chromeShare: +(chromeArea / VA).toFixed(3),
      declaredMasses: masses.length,
      readsWithoutMedia,
    },
    envelope: envelopeOf(structuralRects),
    components: geom.components.map((c) => ({
      role: c.role, selector: c.selector ?? null, function: c.function ?? null,
      matched: c.matched, inDocument: c.inDocument ?? 1, hasMedia: !!c.hasMedia,
      share: +(unionArea(c.rects) / VA).toFixed(3),
      isWrapper: isWrapper(c),
      rects: c.rects.map((r) => ({ x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.w), h: Math.round(r.h) })),
    })),
    negativeSpace: negatives.map((n) => ({ function: n.function ?? null, counted: n.counted, boundedBy: n.boundedBy, why: n.why })),
    competitors: ranked,
    excluded: geom.excluded.map((x) => ({ selector: x.selector, why: x.why ?? null, matched: x.matched })),
    problems,
    verdict: problems.length ? 'fail' : 'pass',
  };
}

/* ── annotated evidence ───────────────────────────────────────────────────── */
const COLOURS = {
  subject: '#ff2d2d', identity: '#ffb000', support: '#00c2ff',
  cta: '#39ff88', field: '#b478ff', 'negative-space': '#ffffff',
};

const DRAW = function (payload) {
  const old = document.getElementById('__a1_overlay');
  if (old) old.remove();
  const o = document.createElement('div');
  o.id = '__a1_overlay';
  o.style.cssText = 'position:fixed;inset:0;z-index:2147483647;pointer-events:none;font:11px/1.3 ui-monospace,Menlo,monospace';
  const box = (r, colour, label, dashed, fill) => {
    const d = document.createElement('div');
    d.style.cssText = `position:absolute;left:${r.x}px;top:${r.y}px;width:${r.w}px;height:${r.h}px;` +
      `border:2px ${dashed ? 'dashed' : 'solid'} ${colour};` + (fill ? `background:${fill};` : '');
    o.appendChild(d);
    if (!label) return;
    const t = document.createElement('div');
    t.textContent = label;
    t.style.cssText = `position:absolute;left:${r.x}px;top:${Math.max(0, r.y - 15)}px;background:${colour};` +
      `color:#000;padding:0 4px;white-space:nowrap;font-weight:700`;
    o.appendChild(t);
  };
  for (const c of payload.components) {
    for (const r of c.rects) {
      box(r, payload.colours[c.role] || '#fff', `${c.role}${c.isWrapper ? ' (wrapper)' : ''} ${(c.share * 100).toFixed(0)}%`,
        c.role === 'field', c.role === 'field' ? 'rgba(180,120,255,.10)' : null);
    }
  }
  for (const n of payload.negativeSpace) {
    if (!n.rect) continue;
    box(n.rect, '#ffffff', `reserved: ${n.function || '—'} · ${n.counted ? 'counts (' + n.boundedBy.join('+') + ')' : 'NOT COUNTED'}`,
      true, n.counted ? 'rgba(255,255,255,.08)' : 'rgba(255,0,0,.10)');
  }
  if (payload.envelope) box(payload.envelope, '#00ff00', 'event envelope', true, null);
  for (const c of payload.competitors) {
    box(c.rect, '#ff00d4', `COMPETITOR ${c.name} · ${(c.ratio * 100).toFixed(0)}% of event rank`, false, 'rgba(255,0,212,.12)');
  }
  const bar = document.createElement('div');
  bar.textContent = payload.footer;
  bar.style.cssText = 'position:absolute;left:0;right:0;bottom:0;background:#000;color:#fff;padding:6px 10px;font-weight:700';
  o.appendChild(bar);
  document.documentElement.appendChild(o);
};

export async function annotate({ page, result, outDir, label }) {
  mkdirSync(outDir, { recursive: true });
  const m = result.metrics;
  const footer =
    `${label} · A1 ${result.verdict.toUpperCase()} · eventCoverage ${(m.eventCoverage * 100).toFixed(1)}% ` +
    `(floor ${(result.floor * 100).toFixed(0)}%) · mediaCoverage ${(m.mediaCoverage * 100).toFixed(1)}% · ` +
    `competition ${(m.competitionRatio * 100).toFixed(0)}% · reserved ${(m.negativeSpaceShare * 100).toFixed(0)}% · ` +
    `masses ${m.declaredMasses}`;
  await page.evaluate(DRAW, {
    colours: COLOURS, footer,
    components: result.components.filter((c) => c.role !== 'negative-space'),
    negativeSpace: result.negativeSpace.filter((n) => n.rect),
    envelope: result.envelope,
    competitors: result.competitors,
  });
  const file = join(outDir, `a1-${label}.png`);
  await page.screenshot({ path: file, clip: { x: 0, y: 0, width: page.viewportSize().width, height: page.viewportSize().height } });
  await page.evaluate(() => document.getElementById('__a1_overlay')?.remove());
  return file;
}

export async function measure({ page, decl, outDir, label }) {
  const geom = await page.evaluate(EXTRACT, decl);
  const result = evaluate(geom, decl);
  result.label = label;
  /* the reserved regions carry their pixel rects for the drawing pass */
  const negRects = geom.components.filter((c) => c.role === 'negative-space').map((c) => c.rects[0] || null);
  result.negativeSpace = result.negativeSpace.map((n, i) => ({ ...n, rect: negRects[i] || null }));
  if (outDir) result.evidence = await annotate({ page, result, outDir, label });
  return result;
}

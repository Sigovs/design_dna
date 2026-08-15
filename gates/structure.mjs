/* Structural formulas — repetition measured semantically.
 *
 * A count of `.card` selectors, border radii or explicit borders proves
 * nothing: a page with none of them and four equal vehicle modules is a card
 * grid. So nothing here reads a class name. Units are found by RENDERED
 * GEOMETRY — elements that occupy the same width, at the same top, inside one
 * section — which is why an extra wrapper cannot hide them.
 *
 * IT IS A DETECTOR, NOT AN ORACLE. Absolute positioning, non-sibling repeats
 * and masses that repeat across scroll can all evade it. Gate 2 therefore
 * requires the human inventory alongside this output, and an empty report is
 * never evidence of structural originality.
 */
export const EXTRACTOR = function () {
  const R = (e) => e.getBoundingClientRect();
  const vw = innerWidth;
  const area = (r) => r.width * r.height;
  const near = (a, b, tol) => Math.abs(a - b) <= tol;

  const sectionEls = [...document.querySelectorAll('main > *, body > footer, body > footer > *, section, [data-gate-section]')]
    .filter((e) => { const r = R(e); return r.height > 160 && r.width > 300; });
  const seen = new Set();
  const sections = sectionEls.filter((e) => { if (seen.has(e)) return false; seen.add(e); return true; });

  const nameOf = (e) => {
    const id = e.id ? '#' + e.id : '';
    const cls = (typeof e.className === 'string' && e.className.trim())
      ? '.' + e.className.trim().split(/\s+/)[0] : '';
    return (e.tagName.toLowerCase() + id + cls);
  };

  function roleOf(el) {
    const cs = getComputedStyle(el);
    const r = R(el);
    if (/^(img|video|canvas|picture)$/i.test(el.tagName) && area(r) >= 1200) return 'image';
    if (el.querySelector && el.querySelector('img,video,canvas') && area(r) >= 1200 && el.textContent.trim().length < 3) return 'image';
    if (/^(a|button)$/i.test(el.tagName) && el.textContent.trim().length <= 42) return 'cta';
    if (/^h[1-6]$/i.test(el.tagName)) return 'heading';
    const fs = parseFloat(cs.fontSize) || 0;
    const ls = parseFloat(cs.letterSpacing) || 0;
    if (cs.textTransform === 'uppercase' || fs <= 15 || ls / fs >= 0.06) return 'meta';
    return 'text';
  }

  function slot(centre, top, height) {
    const f = height > 0 ? (centre - top) / height : 0;
    return f < 0.2 ? 'top' : f < 0.4 ? 'upper' : f < 0.6 ? 'mid' : f < 0.8 ? 'lower' : 'bottom';
  }

  function containerOf(el) {
    const cs = getComputedStyle(el);
    const bt = parseFloat(cs.borderTopWidth) || 0, bl = parseFloat(cs.borderLeftWidth) || 0;
    const bg = cs.backgroundColor;
    const parentBg = el.parentElement ? getComputedStyle(el.parentElement).backgroundColor : bg;
    if (cs.boxShadow !== 'none' || (bt > 0 && bl > 0)) return 'box';
    if (bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent' && bg !== parentBg) return 'fill';
    if (bt > 0) return 'rule-top';
    return 'none';
  }

  function formulaFor(unit) {
    const ur = R(unit);
    const parts = [...unit.querySelectorAll('*')].filter((e) => {
      const r = R(e);
      return r.width > 8 && r.height > 6 && (e.textContent.trim() || /^(img|video|canvas|svg)$/i.test(e.tagName));
    });
    const slots = {};
    for (const p of parts) {
      const role = roleOf(p);
      if (role === 'text') continue;
      const r = R(p);
      const s = slot(r.top + r.height / 2, ur.top, ur.height);
      if (!(role in slots)) slots[role] = s;
    }
    const order = ['image', 'heading', 'meta', 'cta'];
    const sig = order.filter((k) => k in slots).map((k) => `${k[0]}:${slots[k]}`).join('|');
    const cs = getComputedStyle(unit);
    return {
      slots, align: cs.textAlign === 'start' ? 'start' : cs.textAlign,
      container: containerOf(unit),
      interaction: unit.querySelector('a[href],button') ? 'link' : 'static',
      sig,
    };
  }

  /* units found by geometry, outermost repeating box wins */
  function groupsIn(section) {
    const sr = R(section);
    const cands = [...section.querySelectorAll('*')].filter((e) => {
      const r = R(e);
      return r.width >= 60 && r.height >= 40 && r.width <= sr.width + 2 && e !== section;
    });
    const byWidth = new Map();
    for (const e of cands) {
      const r = R(e);
      const key = Math.round(r.width / 6) + '@' + Math.round(r.height / 24);
      if (!byWidth.has(key)) byWidth.set(key, []);
      byWidth.get(key).push(e);
    }
    const groups = [];
    for (const [, members] of byWidth) {
      if (members.length < 2) continue;
      /* drop any member that contains another member: keep the outermost repeat */
      const outer = members.filter((m) => !members.some((o) => o !== m && o.contains(m)));
      if (outer.length < 2) continue;
      const w0 = R(outer[0]).width;
      if (!outer.every((m) => near(R(m).width, w0, Math.max(6, w0 * 0.04)))) continue;
      if (w0 >= sr.width - 4) continue;                       /* full-width stack, not parallel units */
      const f = formulaFor(outer[0]);
      const widths = outer.map((m) => +(R(m).width / sr.width).toFixed(3));
      const equal = widths.every((x) => near(x, widths[0], 0.02));
      groups.push({
        units: outer.length,
        widthClass: equal ? 'equal' : 'ratio',
        widthRatios: widths,
        slots: f.slots, align: f.align, container: f.container, interaction: f.interaction,
        sample: nameOf(outer[0]),
        formula: `${outer.length}×${equal ? 'equal' : 'ratio'}|${f.sig}|align:${f.align}|cont:${f.container}|int:${f.interaction}`,
        shape: `${outer.length}×${equal ? 'equal' : 'ratio'}|${f.sig}`,
      });
    }
    /* one section reports its widest repeat per distinct shape */
    const best = new Map();
    for (const g of groups) {
      const prev = best.get(g.shape);
      if (!prev || g.units > prev.units) best.set(g.shape, g);
    }
    return [...best.values()].sort((a, b) => b.units - a.units);
  }

  const out = sections.map((s) => ({ section: nameOf(s), groups: groupsIn(s) }));

  /* a run of full-width sections whose own structure is one undivided mass */
  const top = [...document.querySelectorAll('main > *, body > footer')];
  let run = 0, bandRun = 0;
  for (const s of top) {
    const r = R(s);
    const rec = out.find((o) => o.section === nameOf(s));
    const parallel = rec ? Math.max(0, ...rec.groups.map((g) => g.units)) : 0;
    if (r.width >= vw - 2 && parallel <= 2) { run++; bandRun = Math.max(bandRun, run); } else run = 0;
  }

  return { sections: out, bandRun, viewport: { w: innerWidth, h: innerHeight } };
};

/* the findings a human must dispose of.
 *
 * A group whose formula is empty repeats a WIDTH and nothing else — which is
 * what a grid system does to every page ever laid out on one. Reporting those
 * buries the four real modules under thirty coincidences and teaches the
 * reviewer to skim. Only groups carrying an actual formula are findings. */
const hasFormula = (g) => Boolean(g.slots && Object.keys(g.slots).length);

export function findings(report, { parallelFloor = 3 } = {}) {
  const out = [];
  for (const s of report.sections) {
    for (const g of s.groups) {
      if (g.units >= parallelFloor && g.widthClass === 'equal' && hasFormula(g)) {
        out.push({ kind: 'parallel-units', section: s.section, units: g.units, shape: g.shape, formula: g.formula, disposition: null });
      }
    }
  }
  const byShape = new Map();
  for (const s of report.sections) for (const g of s.groups) {
    if (!hasFormula(g)) continue;
    if (!byShape.has(g.shape)) byShape.set(g.shape, []);
    byShape.get(g.shape).push(s.section);
  }
  for (const [shape, where] of byShape) {
    if (where.length >= 2) out.push({ kind: 'repeated-shape', shape, sections: where, disposition: null });
  }
  if (report.bandRun >= 5) {
    out.push({ kind: 'band-run', length: report.bandRun, disposition: null });
  }
  return out;
}

export async function measure(page) {
  const report = await page.evaluate(EXTRACTOR);
  return { report, findings: findings(report) };
}

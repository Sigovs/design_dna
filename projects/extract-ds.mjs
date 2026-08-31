#!/usr/bin/env node
/**
 * Extract the design system from a built hero.
 *
 *   node projects/extract-ds.mjs <file.html|url> [--out <dir>] [--viewport 1440x900]
 *
 * WHY THIS EXISTS
 *
 * Alex works hero-first, and that is the right way round: the hero is the only
 * screen with evidence in it, so the system is *extracted* from it rather than
 * invented before it. The principle was first written down on an in-house build —
 * "extracted from the hero, not invented for it" — and it is the principle that
 * travels, not that build. No project is the template here.
 *
 * The step after the hero is the one that gets skipped, every time, because it was
 * hand-work with no command behind it. Skipping it is expensive in a specific way:
 * every later section re-decides colour, type and spacing from scratch, and the page
 * arrives at competing art directions one defensible section at a time — U15.
 *
 * WHAT IT READS
 *
 * The RENDERED page, not the stylesheet. Computed values are what the visitor got:
 * after the cascade, after custom properties resolved, after the framework's own
 * defaults won an argument nobody watched. A stylesheet says what was asked for;
 * getComputedStyle says what happened.
 *
 * WHAT IT DECIDES — nothing
 *
 * It counts, clusters and measures. Naming a token, choosing the scale, and marking
 * a value AUTHORED with the job it does are judgement, and judgement needs the brief
 * and the skills. The draft it writes is a proposal with every value traceable to a
 * count of real uses.
 *
 * THE FINDINGS ARE THE POINT
 *
 * The proposed tokens are the smaller half of the output. The useful half is what
 * the page is doing without meaning to: eleven greys that should be three, a type
 * ramp with two sizes 1px apart, functional text under the 14px floor, a text and
 * background pair that fails AA on the composited render. Those are found by
 * measuring, and they are invisible in the source.
 */
import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, resolve, dirname, basename } from 'node:path';
import { pathToFileURL } from 'node:url';
import { launchChromium } from '../lib/browser.mjs';

/* ── colour ────────────────────────────────────────────────────────────────── */
const parseRGB = (s) => {
  const m = String(s).match(/rgba?\(([^)]+)\)/);
  if (!m) return null;
  const p = m[1].split(/[,\s/]+/).filter(Boolean).map(Number);
  if (p.length < 3 || p.slice(0, 3).some(Number.isNaN)) return null;
  return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 };
};
const hex = ({ r, g, b }) => '#' + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('');
const over = (fg, bg) => ({
  r: fg.r * fg.a + bg.r * (1 - fg.a),
  g: fg.g * fg.a + bg.g * (1 - fg.a),
  b: fg.b * fg.a + bg.b * (1 - fg.a),
  a: 1,
});
const lin = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
const lum = ({ r, g, b }) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
const ratio = (a, b) => {
  const [x, y] = [lum(a), lum(b)];
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
};
/* Perceptual distance, good enough to catch "these two greys are the same grey".
   Identical RGB at different alpha is EXCLUDED: that is an ink ladder, which is a
   deliberate and correct thing to have. Drift is two different colours that the eye
   cannot tell apart — #161509 beside #131316 — not one colour used at 62%. */
const sameRGB = (a, b) => a.r === b.r && a.g === b.g && a.b === b.b;
const near = (a, b) => !sameRGB(a, b) && Math.hypot(a.r - b.r, a.g - b.g, a.b - b.b) < 12;

/* ── arguments ─────────────────────────────────────────────────────────────── */
const argv = process.argv.slice(2);
const flag = (n, d) => { const i = argv.indexOf(`--${n}`); return i === -1 ? d : argv[i + 1]; };
const targetArg = argv.find((a, i) => !a.startsWith('--') && !['--out', '--viewport'].includes(argv[i - 1]));
if (!targetArg) {
  console.error('usage: node projects/extract-ds.mjs <file.html|url> [--out <dir>] [--viewport 1440x900]');
  process.exit(1);
}
const [vw, vh] = String(flag('viewport', '1440x900')).split('x').map(Number);
const isURL = /^https?:\/\//.test(targetArg);
const filePath = isURL ? null : resolve(process.cwd(), targetArg);
if (!isURL && !existsSync(filePath)) { console.error(`no such file: ${filePath}`); process.exit(1); }
const url = isURL ? targetArg : pathToFileURL(filePath).href;
const outDir = resolve(process.cwd(), flag('out', isURL ? '.' : dirname(filePath)));

/* ── read the rendered page ────────────────────────────────────────────────── */
const browser = await launchChromium();
const page = await browser.newPage({ viewport: { width: vw, height: vh } });
await page.goto(url, { waitUntil: 'networkidle' }).catch(() => page.goto(url));
await page.waitForTimeout(600);

const raw = await page.evaluate(() => {
  const out = [];
  const nodes = document.querySelectorAll('body, body *');
  for (const el of nodes) {
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    if (cs.display === 'none' || cs.visibility === 'hidden') continue;
    /* Parked off-screen — a skip link at -9999px, an off-canvas drawer. It is real
       functional text when focused and it must clear the floor, but it is not part
       of the composition as rendered and must not invent a rank that nothing on
       screen carries. */
    if (r.right < 0 || r.bottom < 0 || r.left > innerWidth || r.top > document.documentElement.scrollHeight) continue;
    const text = Array.from(el.childNodes)
      .filter((n) => n.nodeType === 3).map((n) => n.textContent.trim()).join(' ').trim();
    out.push({
      tag: el.tagName.toLowerCase(),
      w: Math.round(r.width), h: Math.round(r.height),
      hasText: text.length > 0,
      textSample: text.slice(0, 40),
      color: cs.color,
      background: cs.backgroundColor,
      /* the painted ground behind this element, walked up the tree */
      groundChain: (() => {
        const chain = [];
        for (let n = el; n && n !== document.documentElement; n = n.parentElement) {
          chain.push(getComputedStyle(n).backgroundColor);
        }
        chain.push(getComputedStyle(document.documentElement).backgroundColor);
        return chain;
      })(),
      fontFamily: cs.fontFamily,
      fontSize: cs.fontSize,
      fontWeight: cs.fontWeight,
      lineHeight: cs.lineHeight,
      letterSpacing: cs.letterSpacing,
      textTransform: cs.textTransform,
      borderRadius: cs.borderTopLeftRadius,
      boxShadow: cs.boxShadow,
      transitionDuration: cs.transitionDuration,
      pads: [cs.paddingTop, cs.paddingRight, cs.paddingBottom, cs.paddingLeft],
      gaps: [cs.rowGap, cs.columnGap],
      margins: [cs.marginTop, cs.marginBottom],
      borderColor: cs.borderTopColor,
      borderWidth: cs.borderTopWidth,
    });
  }
  return { nodes: out, title: document.title, docBg: getComputedStyle(document.body).backgroundColor };
});
await browser.close();

/* ── count what is actually used ───────────────────────────────────────────── */
const tally = (list) => {
  const m = new Map();
  for (const v of list) { if (v == null || v === '') continue; m.set(v, (m.get(v) ?? 0) + 1); }
  return [...m.entries()].sort((a, b) => b[1] - a[1]);
};
const px = (v) => { const n = parseFloat(v); return Number.isFinite(n) ? n : null; };

const N = raw.nodes;
const textNodes = N.filter((n) => n.hasText);

/* effective ground: first non-transparent background walking up */
const groundOf = (n) => {
  for (const c of n.groundChain) {
    const p = parseRGB(c);
    if (p && p.a > 0.01) return p;
  }
  return { r: 255, g: 255, b: 255, a: 1 };
};

const inks = tally(textNodes.map((n) => n.color));
const grounds = tally(N.filter((n) => { const p = parseRGB(n.background); return p && p.a > 0.01; }).map((n) => n.background));
const families = tally(N.map((n) => n.fontFamily.split(',')[0].replace(/['"]/g, '').trim()));
const sizes = tally(textNodes.map((n) => n.fontSize));
const weights = tally(textNodes.map((n) => n.fontWeight));
const radii = tally(N.map((n) => n.borderRadius).filter((v) => px(v)));
const shadows = tally(N.map((n) => n.boxShadow).filter((v) => v && v !== 'none'));
const durations = tally(N.flatMap((n) => n.transitionDuration.split(',').map((s) => s.trim())).filter((v) => v && v !== '0s'));
const spacing = tally(
  N.flatMap((n) => [...n.pads, ...n.gaps, ...n.margins])
    .map(px).filter((v) => v && v > 0).map((v) => `${v}px`),
);

/* ── findings ──────────────────────────────────────────────────────────────── */
const findings = [];

/* near-duplicate colours: the drift that is invisible in source */
const dupes = [];
const seenCols = [];
for (const [c, n] of [...inks, ...grounds]) {
  const p = parseRGB(c); if (!p) continue;
  const hit = seenCols.find((s) => near(s.p, p) && s.c !== c);
  if (hit) dupes.push({ a: hit.c, b: c, an: hit.n, bn: n });
  else seenCols.push({ c, p, n });
}
if (dupes.length) {
  findings.push({
    kind: 'near-duplicate colours',
    detail: `${dupes.length} pair(s) within perceptual distance 12 — the same colour typed twice`,
    rows: dupes.slice(0, 8).map((d) => `${d.a} (${d.an}×)  ≈  ${d.b} (${d.bn}×)`),
  });
}

/* the 14px floor — typography I7 */
const belowFloor = textNodes.filter((n) => (px(n.fontSize) ?? 99) < 14 && n.textSample);
if (belowFloor.length) {
  const bySize = tally(belowFloor.map((n) => n.fontSize));
  findings.push({
    kind: 'functional text below the 14px floor',
    detail: `typography I7 — ${belowFloor.length} element(s). Below the floor type is decoration and carries nothing.`,
    rows: bySize.map(([s, n]) => `${s} × ${n}   e.g. "${belowFloor.find((b) => b.fontSize === s).textSample}"`),
  });
}

/* contrast on the composited render — color-taste I1 / I6 */
const failures = [];
for (const n of textNodes) {
  const fg = parseRGB(n.color); if (!fg) continue;
  const bg = groundOf(n);
  const flat = fg.a < 1 ? over(fg, bg) : fg;
  const r = ratio(flat, bg);
  const size = px(n.fontSize) ?? 16;
  const bold = Number(n.fontWeight) >= 700;
  const need = size >= 24 || (size >= 18.66 && bold) ? 3 : 4.5;
  /* 1.00:1 is ink painted on its own ground — a deliberately invisible element, a
     decorative digit, a spacer. It is not a contrast defect and reporting it buries
     the real ones. */
  if (r < need && r > 1.02) failures.push({ fg: hex(flat), bg: hex(bg), r, need, size, sample: n.textSample });
}
const uniqFail = [];
for (const f of failures) if (!uniqFail.some((u) => u.fg === f.fg && u.bg === f.bg)) uniqFail.push(f);
if (uniqFail.length) {
  findings.push({
    kind: 'contrast below AA on the composited render',
    detail: `color-taste I1 · I6 — ${failures.length} element(s), ${uniqFail.length} distinct pair(s). Measured after alpha compositing over the painted ground, not on the tokens.`,
    rows: uniqFail.slice(0, 10).map((f) => `${f.fg} on ${f.bg} — ${f.r.toFixed(2)}:1, needs ${f.need}:1 at ${f.size}px   "${f.sample}"`),
  });
}

/* a type ramp with steps too small to be ranks — typography I1 */
/* Fluid type is the trap here: one clamp() rank, measured at a single viewport,
   appears as 15.12 / 15.84 / 16.56 — neighbours 1-5% apart that are the SAME rank
   at different container widths. Flag a pair only when both sides are integers (a
   fixed step someone typed) and both are used enough to be a rank at all. */
const sizeUse = new Map(sizes.map(([s, n]) => [px(s), n]));
const REAL_RANK = 3;
const sizeVals = [...sizeUse.keys()].filter(Boolean)
  .filter((v) => Number.isInteger(v) && sizeUse.get(v) >= REAL_RANK)
  .sort((a, b) => a - b);

/* I1 takes rank from "size, weight, register, or position — the source doesn't
   matter, the unambiguity does". So two sizes 1px apart are only ONE rank wearing
   two sizes when nothing else separates them. A 14px tracked uppercase mono label
   beside 15px sentence-case sans is two ranks distinguished by register, and
   flagging it sends you to weaken work that is already right.
   Register here = font family + casing + weight. */
/* A rank is carried by words. A single glyph — an ampersand inside a wordmark, a
   bullet, an arrow — sits at whatever size the logotype needed and is not a
   typographic rank competing with anything. Counting it invents collisions that
   send you to change a mark that is already correct. */
const registerOf = (v) => new Set(
  textNodes.filter((n) => px(n.fontSize) === v && (n.textSample || '').trim().length > 2)
    .map((n) => `${n.fontFamily.split(',')[0].trim()}|${n.textTransform}|${n.fontWeight}`),
);
const shareRegister = (a, b) => {
  const [ra, rb] = [registerOf(a), registerOf(b)];
  for (const r of ra) if (rb.has(r)) return true;
  return false;
};
const tooClose = sizeVals.map((v, i) => [v, sizeVals[i + 1]])
  .filter(([a, b]) => b && b - a > 0 && b / a < 1.1)
  .filter(([a, b]) => shareRegister(a, b));
if (tooClose.length) {
  findings.push({
    kind: 'type ranks that are not ranks',
    detail: 'typography I1 — two sizes under 10% apart that ALSO share a register (family, casing, weight), so nothing separates them but the size. Sizes distinguished by register are not reported.',
    rows: tooClose.map(([a, b]) => `${a}px → ${b}px   (×${(b / a).toFixed(2)})`),
  });
}

/* spacing off a 4px base — spacing I2 */
/* A fractional value is almost always fluid arithmetic — clamp(), a vw term, a rem
   against a scaled root — and reporting it as a magic number is noise. A whole
   number off the base is something a person typed. */
const offScale = spacing.filter(([v]) => { const n = px(v); return Number.isInteger(n) && n % 4 !== 0; });
const fluidOff = spacing.filter(([v]) => !Number.isInteger(px(v))).length;
if (offScale.length) {
  findings.push({
    kind: 'spacing values off a 4px base',
    detail: `spacing I2 — ${offScale.length} whole-number value(s) that are not on the base.`
      + (fluidOff ? ` (${fluidOff} fractional values were ignored — those are fluid arithmetic, not typed numbers.)` : ''),
    rows: offScale.slice(0, 12).map(([v, n]) => `${v} × ${n}`),
  });
}

/* voices — typography I8 */
if (families.length > 3) {
  findings.push({
    kind: `${families.length} typographic voices on one page`,
    detail: 'typography I8 — a role is not a voice. Every voice beyond the first states the systemic job the existing ones cannot do.',
    rows: families.map(([f, n]) => `${f} × ${n}`),
  });
}

/* ── the draft token layer ─────────────────────────────────────────────────── */
const top = (list, k) => list.slice(0, k);
const tokenLines = [];
const push = (s = '') => tokenLines.push(s);

push('/* ─────────────────────────────────────────────────────────────────────');
push(`   tokens.draft.css — extracted from ${basename(isURL ? url : filePath)} at ${vw}×${vh}`);
push('');
push('   DRAFT. Every value below was measured on the rendered page and carries');
push('   its use count. Nothing here is named or decided yet:');
push('');
push('     · rename to the role the value serves, not to what it looks like');
push('     · a value the hero did not prove gets marked AUTHORED with its job');
push('     · collapse the near-duplicates listed in the report before adopting');
push('     · the scale is a decision — 4px base is a default, not a finding');
push('   ───────────────────────────────────────────────────────────────────── */');
push(':root{');
push('');
push('  /* ── ground and ink ── */');
for (const [c, n] of top(grounds, 6)) { const p = parseRGB(c); push(`  --ground-${grounds.indexOf(grounds.find(([x]) => x === c))}: ${p.a < 1 ? c : hex(p)};   /* ${n}× */`); }
for (const [c, n] of top(inks, 6)) { const p = parseRGB(c); push(`  --ink-${inks.indexOf(inks.find(([x]) => x === c))}: ${p.a < 1 ? c : hex(p)};   /* ${n}× */`); }
push('');
push('  /* ── type ── */');
top(families, 4).forEach(([f, n], i) => push(`  --font-${i}: "${f}";   /* ${n}× */`));
top(sizes, 10).forEach(([s, n], i) => push(`  --text-${i}: ${s};   /* ${n}× */`));
top(weights, 5).forEach(([w, n], i) => push(`  --weight-${i}: ${w};   /* ${n}× */`));
push('');
push('  /* ── space ── */');
top(spacing, 12).forEach(([s, n], i) => push(`  --space-${i}: ${s};   /* ${n}× */`));
if (radii.length) { push(''); push('  /* ── geometry ── */'); top(radii, 5).forEach(([r, n], i) => push(`  --radius-${i}: ${r};   /* ${n}× */`)); }
if (durations.length) { push(''); push('  /* ── time ── */'); top(durations, 5).forEach(([d, n], i) => push(`  --dur-${i}: ${d};   /* ${n}× */`)); }
push('}');

/* ── the system page ───────────────────────────────────────────────────────── */
const dsHTML = `<!doctype html>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Design system — ${raw.title || basename(isURL ? url : filePath)}</title>
<!--
  GENERATED by projects/extract-ds.mjs. Regenerate rather than hand-edit until the
  token layer is adopted; after that this page belongs to the project.

  Every ratio below is computed IN THE BROWSER from the live token values at load,
  composited where a token is translucent. They cannot drift from the CSS: change a
  token so a pair drops below its threshold and the figure turns red here before it
  reaches a visitor.
-->
<link rel="stylesheet" href="./tokens.draft.css">
<style>
  body{margin:0;padding:32px;font:16px/1.6 ui-sans-serif,system-ui,sans-serif;
       background:${(() => { const p = parseRGB(raw.docBg); return p && p.a > 0.01 ? hex(p) : '#fff'; })()};
       color:${(() => { const p = parseRGB(inks[0]?.[0] ?? 'rgb(0,0,0)'); return p ? hex(p) : '#000'; })()}}
  h1{font-size:28px;margin:0 0 4px} h2{font-size:18px;margin:40px 0 12px;letter-spacing:.04em;text-transform:uppercase;opacity:.6}
  .lead{opacity:.7;margin:0 0 8px;max-width:70ch}
  table{border-collapse:collapse;width:100%;font-variant-numeric:tabular-nums}
  th,td{text-align:left;padding:8px 12px 8px 0;border-bottom:1px solid rgb(128 128 128 / .25);font-size:14px;vertical-align:middle}
  th{font-size:12px;text-transform:uppercase;letter-spacing:.08em;opacity:.55;font-weight:500}
  .sw{width:28px;height:28px;border:1px solid rgb(128 128 128 / .4);display:inline-block;vertical-align:middle}
  code{font-family:ui-monospace,Menlo,monospace;font-size:13px}
  .pass{color:#2F6B3D;font-weight:600} .fail{color:#CB141D;font-weight:600}
  .note{font-size:13px;opacity:.6;max-width:70ch}
</style>

<h1>Design system — draft</h1>
<p class="lead">Extracted from the built page, not invented for it. Every value carries the number of
times the page actually used it. Ratios are computed here, at load, from the live tokens.</p>

<h2>Ground and ink — measured pairs</h2>
<table id="pairs"><thead><tr><th>Ink</th><th>On</th><th>Ratio</th><th>AA body 4.5:1</th><th>AA large 3:1</th></tr></thead><tbody></tbody></table>
<p class="note">A ratio is measured on the composited render: a translucent ink is flattened over the
ground beneath it before it is measured, because that is what the eye receives.</p>

<h2>Type</h2>
<table id="type"><thead><tr><th>Token</th><th>Value</th><th>Uses</th><th>Specimen</th></tr></thead><tbody></tbody></table>

<h2>Space</h2>
<table id="space"><thead><tr><th>Token</th><th>Value</th><th>Uses</th><th></th></tr></thead><tbody></tbody></table>

<script>
(function () {
  var root = getComputedStyle(document.documentElement);
  var tok = function (n) { return root.getPropertyValue(n).trim(); };
  function parse(s) {
    s = (s || '').trim();
    var m = s.match(/^#([0-9a-f]{3,8})$/i);
    if (m) { var h = m[1];
      if (h.length === 3) h = h.split('').map(function (c) { return c + c; }).join('');
      return { r: parseInt(h.slice(0,2),16), g: parseInt(h.slice(2,4),16), b: parseInt(h.slice(4,6),16),
               a: h.length >= 8 ? parseInt(h.slice(6,8),16)/255 : 1 };
    }
    var p = s.match(/rgba?\\(([^)]+)\\)/);
    if (!p) return null;
    var v = p[1].split(/[,\\s\\/]+/).filter(Boolean).map(Number);
    return { r: v[0], g: v[1], b: v[2], a: v.length > 3 ? v[3] : 1 };
  }
  function over(f, b) { return { r: f.r*f.a + b.r*(1-f.a), g: f.g*f.a + b.g*(1-f.a), b: f.b*f.a + b.b*(1-f.a), a: 1 }; }
  function lin(c) { c /= 255; return c <= 0.04045 ? c/12.92 : Math.pow((c+0.055)/1.055, 2.4); }
  function lum(c) { return 0.2126*lin(c.r) + 0.7152*lin(c.g) + 0.0722*lin(c.b); }
  function ratio(a, b) { var x = lum(a), y = lum(b); return (Math.max(x,y)+0.05)/(Math.min(x,y)+0.05); }
  function cell(ok, r) { return '<span class="' + (ok ? 'pass' : 'fail') + '">' + (ok ? 'pass' : 'FAIL') + '</span>'; }

  var GROUNDS = ${JSON.stringify(top(grounds, 4).map(([c], i) => `--ground-${i}`))};
  var INKS = ${JSON.stringify(top(inks, 6).map(([c], i) => `--ink-${i}`))};
  var rows = '';
  INKS.forEach(function (ink) {
    GROUNDS.forEach(function (g) {
      var fi = parse(tok(ink)), bg = parse(tok(g));
      if (!fi || !bg) return;
      var flat = fi.a < 1 ? over(fi, bg) : fi;
      var r = ratio(flat, bg);
      rows += '<tr><td><span class="sw" style="background:' + tok(ink) + '"></span> <code>' + ink + '</code></td>'
           + '<td><span class="sw" style="background:' + tok(g) + '"></span> <code>' + g + '</code></td>'
           + '<td>' + r.toFixed(2) + ':1</td><td>' + cell(r >= 4.5) + '</td><td>' + cell(r >= 3) + '</td></tr>';
    });
  });
  document.querySelector('#pairs tbody').innerHTML = rows || '<tr><td colspan="5">no tokens resolved</td></tr>';

  var TYPE = ${JSON.stringify(top(sizes, 10).map(([s, n], i) => ({ t: `--text-${i}`, v: s, n })))};
  document.querySelector('#type tbody').innerHTML = TYPE.map(function (t) {
    return '<tr><td><code>' + t.t + '</code></td><td>' + t.v + '</td><td>' + t.n + '</td>'
      + '<td style="font-size:' + t.v + ';line-height:1.2">Grid</td></tr>';
  }).join('');

  var SPACE = ${JSON.stringify(top(spacing, 12).map(([s, n], i) => ({ t: `--space-${i}`, v: s, n })))};
  document.querySelector('#space tbody').innerHTML = SPACE.map(function (s) {
    return '<tr><td><code>' + s.t + '</code></td><td>' + s.v + '</td><td>' + s.n + '</td>'
      + '<td><span style="display:inline-block;height:10px;width:' + s.v + ';background:currentColor;opacity:.45"></span></td></tr>';
  }).join('');
})();
</script>
`;

/* ── write and report ──────────────────────────────────────────────────────── */
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'tokens.draft.css'), tokenLines.join('\n') + '\n');
writeFileSync(join(outDir, 'ds.html'), dsHTML);

console.log('');
console.log(`design system extracted — ${basename(isURL ? url : filePath)} at ${vw}×${vh}`);
console.log(`  ${N.length} elements read · ${textNodes.length} carrying text`);
console.log(`  ${grounds.length} grounds · ${inks.length} inks · ${families.length} families`
  + ` · ${sizes.length} sizes · ${spacing.length} spacing values`);
console.log('');
console.log(`  written: ${join(outDir, 'tokens.draft.css')}`);
console.log(`  written: ${join(outDir, 'ds.html')}`);

if (findings.length) {
  console.log('');
  console.log('── what the page is doing without meaning to ──');
  for (const f of findings) {
    console.log('');
    console.log(`▲ ${f.kind}`);
    console.log(`  ${f.detail}`);
    for (const r of f.rows) console.log(`    ${r}`);
  }
} else {
  console.log('');
  console.log('  no findings — the page is already consistent on everything measured here.');
}

console.log('');
console.log('  The draft is a proposal. Naming a token, choosing the scale and marking a');
console.log('  value AUTHORED with the job it does are judgement, and judgement needs the');
console.log('  brief and the skills. Adopt it deliberately, then delete tokens.draft.css.');
console.log('');

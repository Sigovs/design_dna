#!/usr/bin/env node
/**
 * Where the masses actually are.
 *
 *   node projects/composition.mjs <url|file.html> [--viewport 1440x900,1906x937,390x844]
 *
 * WHY THIS EXISTS
 *
 * `extract-ds.mjs` measures the things a value can be wrong about: contrast, the
 * type floor, the spacing base. It passed a hero that had the subject dead centre
 * at 49% of the frame with a third of the screen empty on the right and every
 * word crammed into the left fifth — because none of that is a wrong value. It is
 * a wrong composition, and a comment in the CSS calling it a counterweight did not
 * make it one.
 *
 * Composition is judgement and this script does not make it. What it does is take
 * away the excuse: the numbers are on the table before anyone argues about taste.
 *
 * WHAT IT MEASURES
 *
 *   · the horizontal extent and optical centre of each mass
 *   · dead air — a margin at an edge that no mass reaches into
 *   · the gutter between the two principal masses, or their overlap
 *   · whether a two-mass layout has its dominant sitting in the middle, which is
 *     the shape of "everything pushed to one side and a void on the other"
 *
 * HOW IT SEES A 3D SUBJECT
 *
 * It does not read the canvas — `getImageData` returns nothing without
 * `preserveDrawingBuffer`, and turning that on costs real frames for a diagnostic.
 * Instead the scene PUBLISHES its subject's projected box as `window.__subject`,
 * and this checks the declaration against the rule. The page states its
 * composition and is held to the statement.
 *
 * THE EXCEPTION
 *
 * A break that was asked for is not a defect. Put `data-audit="composition-ok"` on
 * the element, with a comment saying who asked and why, and it is excluded and
 * listed as a declared exception rather than silently skipped. A silent exemption
 * is how a rule stops meaning anything.
 */
import { existsSync } from 'node:fs';
import { resolve, basename } from 'node:path';
import { pathToFileURL } from 'node:url';
import { launchChromium } from '../lib/browser.mjs';

const argv = process.argv.slice(2);
const flag = (n, d) => { const i = argv.indexOf(`--${n}`); return i === -1 ? d : argv[i + 1]; };
const target = argv.find((a, i) => !a.startsWith('--') && argv[i - 1] !== '--viewport');
if (!target) {
  console.error('usage: node projects/composition.mjs <url|file.html> [--viewport 1440x900,390x844]');
  process.exit(1);
}
const isURL = /^https?:\/\//.test(target);
const file = isURL ? null : resolve(process.cwd(), target);
if (!isURL && !existsSync(file)) { console.error(`no such file: ${file}`); process.exit(1); }
const url = isURL ? target : pathToFileURL(file).href;
const viewports = String(flag('viewport', '1440x900,1906x937,390x844'))
  .split(',').map((v) => v.split('x').map(Number));

/* A mass is a block of real area that carries something. Deep wrappers are not
   masses — they are the boxes masses sit in — so only elements that carry text or
   are the declared stage count, and each is attributed to its top-level section. */
const COLLECT = `(() => {
  const vw = innerWidth, vh = innerHeight;
  const out = [];
  const seen = new Set();
  for (const el of document.querySelectorAll('main > section, main > section *, header, footer')) {
    if (el.closest('[data-audit="composition-ok"]')) continue;
    const r = el.getBoundingClientRect();
    if (r.width < 24 || r.height < 12) continue;
    if (r.bottom < 0 || r.top > vh) continue;
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden' || +cs.opacity === 0) continue;
    const text = Array.from(el.childNodes).filter(n => n.nodeType === 3)
      .map(n => n.textContent.trim()).join(' ').trim();
    const isStage = el.id === 'stage' || el.dataset.mass === 'stage';
    if (!text && !isStage) continue;
    const key = Math.round(r.left) + ':' + Math.round(r.top) + ':' + Math.round(r.width);
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({
      tag: (el.className && String(el.className).split(' ')[0]) || el.tagName.toLowerCase(),
      section: (el.closest('section, header, footer')?.className || '').split(' ')[0] || 'page',
      left: r.left, right: r.right, top: r.top, bottom: r.bottom,
      area: r.width * r.height, isStage,
      sample: (text || '').slice(0, 28),
    });
  }
  const declared = [...document.querySelectorAll('[data-audit="composition-ok"]')]
    .map(e => (e.className && String(e.className).split(' ')[0]) || e.tagName.toLowerCase());
  return { vw, vh, out, subject: window.__subject || null, declared };
})()`;

const pct = (v, w) => `${Math.round((v / w) * 100)}%`;

const browser = await launchChromium();
let problems = 0;

console.log('');
console.log(`composition — ${basename(isURL ? url : file)}`);

for (const [w, h] of viewports) {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  await page.goto(url, { waitUntil: 'networkidle' }).catch(() => page.goto(url));
  await page.waitForTimeout(2200);                      // let a scene settle and publish
  const { vw, vh, out, subject, declared } = await page.evaluate(COLLECT);
  await page.close();

  console.log('');
  console.log(`── ${w}×${h} ──`);

  /* The first screen is what this checks. Below the fold each section is its own
     composition and gets its own read; the fold is where the void shows. */
  /* A stage is a FRAME, not a mass. It is full-bleed by construction, so counting
     it makes every layout look like one mass spanning the whole screen and hides
     exactly the failure this script exists to catch. When the scene publishes its
     subject, the subject stands in for the stage; when it does not, the stage is
     reported as unmeasured rather than counted. */
  const hasSubject = !!(subject && subject.right > subject.left);
  const above = out.filter((m) => m.top < vh * 0.92 && !(hasSubject && m.isStage));
  const masses = [...above];
  if (hasSubject) {
    masses.push({ tag: subject.label || 'scene subject', section: 'hero', isSubject: true,
      left: subject.left, right: subject.right, top: subject.top, bottom: subject.bottom,
      area: (subject.right - subject.left) * (subject.bottom - subject.top), sample: '' });
  }
  if (!masses.length) { console.log('  nothing measurable on the first screen'); continue; }

  const principal = [...masses].sort((a, b) => b.area - a.area).slice(0, 2)
    .sort((a, b) => a.left - b.left);

  for (const m of principal) {
    const c = (m.left + m.right) / 2;
    console.log(`  ${(m.isSubject ? '● ' : '  ') + m.tag}`.padEnd(22)
      + `${pct(m.left, vw)}–${pct(m.right, vw)}`.padEnd(12)
      + `centre ${pct(c, vw)}`
      + (m.sample ? `   "${m.sample}"` : ''));
  }

  const leftEdge = Math.min(...masses.map((m) => m.left));
  const rightEdge = Math.max(...masses.map((m) => m.right));
  const voidL = leftEdge, voidR = vw - rightEdge;

  /* A margin is not dead air; a third of the screen is. The threshold is the point
     where the emptiness stops reading as a frame and starts reading as a mistake. */
  const VOID = 0.20;
  if (voidR / vw > VOID) {
    console.log(`  ⚠ dead air on the right: ${pct(voidR, vw)} — nothing reaches into it`);
    problems++;
  }
  if (voidL / vw > VOID) {
    console.log(`  ⚠ dead air on the left: ${pct(voidL, vw)}`);
    problems++;
  }

  if (principal.length === 2 && !(principal[0].isSubject && principal[1].isSubject)) {
    const gap = principal[1].left - principal[0].right;
    if (gap < 0) {
      console.log(`  · the two masses overlap by ${Math.round(-gap)}px`
        + ` — intentional only if the Read said so`);
    } else {
      console.log(`  gutter between them: ${pct(gap, vw)}`);
    }
    /* The failure this was written for: a dominant sitting on the centre line while
       the other mass sits at one edge — the shape of "pushed to one side with a
       void on the other". Two masses that share the frame put their centres apart. */
    const dom = principal.find((m) => m.isSubject) || principal[1];
    const dc = ((dom.left + dom.right) / 2) / vw;
    if (dc > 0.42 && dc < 0.58 && (voidL / vw > 0.12 || voidR / vw > 0.12)) {
      console.log(`  ⚠ the dominant sits at ${pct(dc * vw, vw)} — near the centre line —`
        + ` while ${pct(Math.max(voidL, voidR), vw)} of the frame is empty at an edge.`);
      console.log(`    Two masses sharing a frame separate; one centred mass beside a void is`);
      console.log(`    a subject that was never placed (C5).`);
      problems++;
    }
  }

  if (declared.length) console.log(`  declared exceptions: ${declared.join(', ')}`);
  if (!subject && out.some((m) => m.isStage)) {
    console.log('  · a stage is present but published no subject — window.__subject is unset,');
    console.log('    so the object in it was not measured. See scene.js publishSubject().');
  }
}

await browser.close();

console.log('');
if (problems) {
  console.log(`▲ ${problems} composition finding${problems === 1 ? '' : 's'}.`);
  console.log('  Reported, not judged — the same contract as projects:check. A break that');
  console.log('  was asked for is not a defect: mark it data-audit="composition-ok" with a');
  console.log('  comment saying who asked, and it is listed as declared rather than hidden.');
} else {
  console.log('✓ no composition findings — masses placed, no stranded void at an edge');
}
console.log('');
process.exit(0);

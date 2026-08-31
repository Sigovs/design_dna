#!/usr/bin/env node
/* The gate chain.
 *
 *   npm run gates -- <project-dir> [--page index.html]
 *
 * Runs Gate 1 → 4 in order and writes one artefact per gate into
 * <project>/.gates/. Gate 5 is Alex's verdict and is never produced here; see
 * gates/gate5.mjs, which refuses to hand over screenshots unless this chain
 * validates.
 *
 * THE HUMAN HALVES PERSIST. Every artefact that needs judgement is written with
 * its questions and `null` answers; a person fills them in; a re-run carries the
 * answers forward by key and re-validates them against the new render. That is
 * why the machine cannot pass a gate on its own, and why a person cannot pass
 * one for a build they have not looked at.
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { serve } from './lib/server.mjs';
import { sourceSeal, validateChain } from './lib/seal.mjs';
import { measure as measureStructure } from './structure.mjs';
import { harvest, validate as validateContent } from './content.mjs';
import { audit as auditHero, sourceEvidence } from './hero.mjs';
import { measure as measureEvent } from './event.mjs';
import { measure as measureComposition } from './composition.mjs';
import { launchChromium } from '../lib/browser.mjs';

const args = process.argv.slice(2);
const root = resolve(args.find((a) => !a.startsWith('--')) || '.');
const pageName = (args.find((a) => a.startsWith('--page=')) || '--page=index.html').split('=')[1];
const gatesDir = join(root, '.gates');
mkdirSync(gatesDir, { recursive: true });

const declPath = join(root, '.gates', 'declare.json');
if (!existsSync(declPath)) {
  console.error(`no declaration at ${declPath}\n` +
    `A build declares what it commits to BEFORE it is measured — Gate 1's whole point.\n` +
    `See gates/README.md for the shape.`);
  process.exit(2);
}
const decl = JSON.parse(readFileSync(declPath, 'utf8'));
const { seal: srcSeal, fileCount } = sourceSeal(root);
const stamp = () => new Date().toISOString();
const read = (f) => (existsSync(join(gatesDir, f)) ? JSON.parse(readFileSync(join(gatesDir, f), 'utf8')) : null);
const write = (f, o) => writeFileSync(join(gatesDir, f), JSON.stringify(o, null, 2) + '\n');
const keyOf = (f) => [f.kind, f.section || '', f.shape || '', f.length || ''].join('¦');

const { chromium } = await import('playwright');
const srv = await serve(root);
const browser = await launchChromium();
const url = `${srv.origin}/${pageName}`;
const viewports = decl.viewports || [{ label: 'desktop', w: 1440, h: 900 }, { label: 'mobile', w: 390, h: 844 }];

/* A1 is a claim about the FIRST screen, so it is measured on one: a freshly
   loaded page that has never been scrolled. `open()` below scrolls the whole
   document to force lazy rasterisation, and a scroll-linked hero transform does
   not always return to where it started — measuring A1 after that pass reads a
   state no visitor arrives at. Same principle as verifying the hero on the
   delivered render rather than the source frame. */
async function openFirstScreen(vp) {
  const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(async () => {
    await Promise.all([...document.images]
      .filter((i) => { const r = i.getBoundingClientRect(); return r.top < innerHeight && r.bottom > 0; })
      .map((i) => (i.complete ? 1 : i.decode().catch(() => 1))));
  });
  await page.waitForTimeout(250);
  return { ctx, page };
}

async function open(vp) {
  const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  page.on('requestfailed', (r) => errors.push('request failed: ' + r.url()));
  page.on('response', (r) => { if (r.status() >= 400) errors.push(`HTTP ${r.status()} ${r.url()}`); });
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(async () => {
    document.querySelectorAll('img[loading="lazy"]').forEach((i) => (i.loading = 'eager'));
    await Promise.all([...document.images].map((i) => (i.complete ? 1 : i.decode().catch(() => 1))));
    const step = innerHeight * 0.8;
    for (let y = 0; y < document.body.scrollHeight; y += step) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 70)); }
    scrollTo(0, 0); await new Promise((r) => setTimeout(r, 250));
  });
  return { ctx, page, errors };
}

/* ── Gate 1 · measurable conformance ─────────────────────────────────────── */
const g1 = { gate: 'Gate 1 · Measurable Conformance', sourceSeal: srcSeal, fileCount, page: pageName, measured: {}, a1: {}, commitments: [], verdict: 'fail', finishedAt: null };
for (const vp of viewports) {
  /* A1 — one governing event owns the first screen. Measured from the declared
     component system on an unscrolled page, never from how much of the viewport
     happens to be image. */
  if (decl.a1) {
    const a1decl = { ...decl.a1, ...(decl.a1.perViewport?.[vp.label] || {}) };
    const first = await openFirstScreen(vp);
    g1.a1[vp.label] = await measureEvent({ page: first.page, decl: a1decl, outDir: join(gatesDir, 'evidence'), label: vp.label });
    await first.ctx.close();
  }
  const { ctx, page, errors } = await open(vp);
  g1.measured[vp.label] = await page.evaluate(() => {
    const vw = innerWidth, vh = innerHeight;
    const media = [...document.querySelectorAll('img,video')];
    const sizes = [...document.querySelectorAll('h1,h2,h3,h4,p,span,a,b,li,dd,dt')]
      .filter((e) => e.textContent.trim()).map((e) => parseFloat(getComputedStyle(e).fontSize));
    return {
      pageHeightPx: document.documentElement.scrollHeight,
      screens: +(document.documentElement.scrollHeight / vh).toFixed(2),
      mediaTotal: media.length,
      fullBleedMedia: media.filter((e) => e.getBoundingClientRect().width >= vw - 2).length,
      largestTypePx: Math.round(Math.max(...sizes)),
      smallestTypePx: Math.round(Math.min(...sizes)),
      typeScaleRatio: +(Math.max(...sizes) / 14).toFixed(2),
      horizontalOverflow: document.documentElement.scrollWidth > vw,
    };
  });
  g1.measured[vp.label].errors = errors;
  await ctx.close();
}
g1.commitments = (decl.commitments || []).map((c) => {
  const actual = c.viewport ? g1.measured[c.viewport]?.[c.metric] : g1.measured[viewports[0].label]?.[c.metric];
  const ok = c.max != null ? actual <= c.max : c.min != null ? actual >= c.min : actual === c.equals;
  return { ...c, actual, pass: !!ok };
});
const a1Runs = Object.values(g1.a1);
g1.blockers = [
  ...(decl.a1 ? [] : ['A1 not declared — the governing event must be declared through named components before the first screen can be measured']),
  ...a1Runs.flatMap((r) => r.problems.map((p) => `A1 ${r.label}: ${p}`)),
  ...g1.commitments.filter((c) => !c.pass).map((c) => `commitment ${c.metric}: ${c.actual}`),
  ...Object.entries(g1.measured).filter(([, m]) => m.horizontalOverflow).map(([k]) => `${k}: horizontal page scroll`),
  ...Object.entries(g1.measured).flatMap(([k, m]) => m.errors.map((e) => `${k}: ${e}`)),
];
g1.verdict = g1.blockers.length === 0 ? 'pass' : 'fail';
g1.finishedAt = stamp();
write('gate1.json', g1);

/* ── Gate 2 · structure ──────────────────────────────────────────────────── */
const prev2 = read('gate2.json');
const g2 = { gate: 'Gate 2 · Structural and Authorship Conformance', sourceSeal: srcSeal, detector: {}, findings: [], humanInventory: prev2?.humanInventory ?? null, humanConfirmed: false, verdict: 'fail', finishedAt: null };
for (const vp of viewports) {
  const { ctx, page } = await open(vp);
  const { report, findings } = await measureStructure(page);
  g2.detector[vp.label] = report;
  if (vp.label === (decl.primaryViewport || 'desktop')) {
    const carried = new Map((prev2?.findings || []).map((f) => [keyOf(f), f]));
    g2.findings = findings.map((f) => ({ ...f, ...(carried.get(keyOf(f)) ? { disposition: carried.get(keyOf(f)).disposition, reason: carried.get(keyOf(f)).reason } : {}) }));
  }
  await page.screenshot({ path: join(gatesDir, `evidence/full-${vp.label}.png`), fullPage: true }).catch(() => {});
  await ctx.close();
}
const undisposed = g2.findings.filter((f) => !f.disposition);
const unearned = g2.findings.filter((f) => f.disposition === 'unearned-default');
g2.humanConfirmed = !!g2.humanInventory && undisposed.length === 0;
g2.verdict = (g2.humanConfirmed && unearned.length === 0) ? 'pass' : 'fail';
g2.blockers = [
  ...(g2.humanInventory ? [] : ['humanInventory is null — the detector is not an oracle; a section-by-section formula inventory is required beside it']),
  ...undisposed.map((f) => `undisposed ${f.kind}: ${f.shape || f.length}`),
  ...unearned.map((f) => `unearned-default: ${f.kind} ${f.shape || ''} ${f.section || ''}`),
];
g2.finishedAt = stamp();
write('gate2.json', g2);

/* ── Gate 2 · delegated — authorship preservation ────────────────────────── */
const prevA = read('authorship.json');
const carriedOps = new Map((prevA?.operations || []).map((o) => [o.id, o]));
const ops = (decl.operations || []).map((o) => ({
  id: o.id, reference: o.reference, governs: o.governs,
  implementedBy: carriedOps.get(o.id)?.implementedBy ?? null,
  visibleAt: carriedOps.get(o.id)?.visibleAt ?? null,
  workItDoes: carriedOps.get(o.id)?.workItDoes ?? null,
  survivesRemoval: carriedOps.get(o.id)?.survivesRemoval ?? null,
  locatedInRender: carriedOps.get(o.id)?.locatedInRender ?? null,
}));
const lost = ops.filter((o) => o.locatedInRender !== true);
const a = {
  gate: 'Gate 2 · delegated — authorship preservation', sourceSeal: srcSeal,
  governingIdea: decl.governingIdea ?? null, operations: ops,
  humanConfirmed: ops.length > 0 && ops.every((o) => o.locatedInRender !== null),
  blockers: lost.map((o) => `${o.id}: not located in the render — the operation disappeared`),
  verdict: ops.length > 0 && lost.length === 0 ? 'pass' : 'fail', finishedAt: stamp(),
};
write('authorship.json', a);


/* ── Gate 1 · delegated — composed masses ────────────────────────────────
   Runs inside the Gate 2 sweep because both need the same rendered viewports and
   opening the browser twice to measure the same frame is waste. It is filed under
   Gate 1 because it measures the artefact rather than its structure. */
const prevC = read('composition.json');
const gc = {
  gate: 'Gate 1 · delegated — composed masses',
  sourceSeal: srcSeal, viewports: {},
  humanConfirmed: prevC?.humanConfirmed ?? false,
  verdict: 'fail', finishedAt: null,
};
for (const vp of viewports) {
  const { ctx, page } = await open(vp);
  /* a scene needs a moment to load, settle and publish its subject */
  await page.waitForTimeout(2200);
  gc.viewports[vp.label] = await measureComposition(page);
  await ctx.close();
}
const compFindings = Object.entries(gc.viewports)
  .flatMap(([label, v]) => (v.findings || []).map((f) => ({ ...f, viewport: label })));
gc.findings = compFindings;
gc.verdict = compFindings.length === 0 ? 'pass' : 'fail';
gc.blockers = compFindings.map((f) => `${f.viewport}: ${f.id} — ${f.detail}`);
gc.finishedAt = stamp();
write('composition.json', gc);

/* ── Gate 1/2 · delegated — rendered hero ────────────────────────────────── */
const h = { gate: 'Gate 1/2 · delegated — rendered hero conformance', sourceSeal: srcSeal, viewports: [], humanConfirmed: read('hero.json')?.humanConfirmed ?? false, verdict: 'fail', finishedAt: null };
if (decl.hero) {
  for (const vp of viewports) {
    const { ctx, page } = await open(vp);
    const spec = { ...decl.hero, ...(decl.hero.perViewport?.[vp.label] || {}) };
    h.viewports.push(await auditHero({ page, spec, outDir: join(gatesDir, 'evidence'), label: vp.label }));
    if (vp.label === (decl.primaryViewport || 'desktop')) {
      h.sourceEvidence = await sourceEvidence({ page, spec, outDir: join(gatesDir, 'evidence') });
    }
    await ctx.close();
  }
  const machineOk = h.viewports.every((v) => v.verdict === 'pass');
  h.blockers = h.viewports.flatMap((v) => v.problems.map((p) => `${v.label}: ${p}`));
  if (!h.humanConfirmed) h.blockers.push('humanConfirmed is false — the annotated source frame must be checked by a person: a wrongly declared subjectBox cannot produce a pass');
  h.verdict = machineOk && h.humanConfirmed ? 'pass' : 'fail';
} else {
  h.blockers = ['no hero declared'];
}
h.finishedAt = stamp();
write('hero.json', h);

/* ── Gate 3 · product usefulness ─────────────────────────────────────────── */
const prevP = read('product.json');
const QUESTIONS = [
  'businessIdentifiableInFiveSeconds', 'primaryActionIdentifiableInFiveSeconds',
  'primaryPathProminentAndUnderstandable', 'itemsScannableAndComparable',
  'detailAffordancesVisibleWithoutInstruction', 'secondaryConversionsDiscoverable',
  'mobilePreservesThePrimaryTask', 'noInteractionRequiresExplanatoryCopy',
  'atLeastAsUsableAsTheIncumbent',
];
const answers = Object.fromEntries(QUESTIONS.map((q) => [q, prevP?.answers?.[q] ?? null]));
const meansPresent = [];
for (const m of decl.means || []) {
  const { ctx, page } = await open(viewports[0]);
  const found = await page.$$(m.selector);
  meansPresent.push({ ...m, present: found.length > 0, count: found.length });
  await ctx.close();
}
const p = {
  gate: 'Gate 3 · Product Usefulness', sourceSeal: srcSeal, answers, means: meansPresent,
  humanConfirmed: Object.values(answers).every((v) => v !== null),
  note: 'Generic usability is necessary and insufficient. This gate cannot pass a build on its own — Gate 2 and authorship are conjunctive with it.',
  blockers: [
    ...meansPresent.filter((m) => !m.present).map((m) => `means absent: ${m.name} (${m.selector})`),
    ...Object.entries(answers).filter(([, v]) => v === null).map(([k]) => `unanswered: ${k}`),
    ...Object.entries(answers).filter(([, v]) => v === false).map(([k]) => `fails: ${k}`),
  ],
  verdict: 'fail', finishedAt: null,
};
p.verdict = p.blockers.length === 0 ? 'pass' : 'fail';
p.finishedAt = stamp();
write('product.json', p);

/* ── Gate 4 · content provenance ─────────────────────────────────────────── */
const { ctx: cctx, page: cpage } = await open(viewports[0]);
const hits = await harvest(cpage);
await cctx.close();
const ledger = read('content-ledger.json');
const validation = validateContent({ hits, ledger, build: decl.build || {} });
const c = {
  gate: 'Gate 4 · Content Provenance', sourceSeal: srcSeal,
  build: decl.build || {}, claims: (ledger && (ledger.claims || ledger)) || [],
  harvested: hits, validation,
  humanConfirmed: !!(ledger && (ledger.claims || ledger).length),
  blockers: validation.problems, verdict: validation.verdict, finishedAt: stamp(),
};
write('content-ledger.json', c);

await browser.close();
await srv.close();

/* ── the chain ───────────────────────────────────────────────────────────── */
const chain = validateChain(root, gatesDir);
write('chain.json', { checkedAt: stamp(), seal: chain.seal, sourceSeal: chain.sourceSeal, ok: chain.ok, problems: chain.problems });

const line = (s) => console.log(s);
line(`\ngates — ${root}`);
for (const g of [g1, g2, a, h, p, c]) {
  line(`  ${g.verdict === 'pass' ? '\x1b[32m✓\x1b[0m' : '\x1b[31m✗\x1b[0m'} ${g.gate}`);
  for (const b of g.blockers || []) line(`      · ${b}`);
}
line(`\n  chain seal ${chain.seal.slice(0, 16)}…  ${chain.ok ? '\x1b[32mvalid\x1b[0m' : '\x1b[31mINVALID\x1b[0m'}`);
for (const pr of chain.problems) line(`      · ${pr}`);
line(chain.ok
  ? `\n\x1b[32mGate 5 may be requested: npm run gate5 -- ${root}\x1b[0m\n`
  : `\n\x1b[31mGate 5 refused — the chain does not validate.\x1b[0m\n`);
process.exit(chain.ok ? 0 : 1);

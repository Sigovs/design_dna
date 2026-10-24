#!/usr/bin/env node
/* Regression tests for the compositing plan (DNA101).
 *
 *   npm run test:layers
 *
 * The failure this guards: a concept with a persistent subject, generated as
 * finished rectangles. The look survives and the subject can no longer move.
 * The other half matters as much — a static page must not be told it needs
 * alpha, and the rule must never pick a library.
 */
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { assess, validate, count, checkApproval, summary } from '../../lib/compositing-plan.mjs';

let failures = 0, total = 0;
const ok = (s) => { total++; console.log(`\x1b[32m✓\x1b[0m ${s}`); };
const bad = (s) => { total++; console.log(`\x1b[31m✗\x1b[0m ${s}`); failures++; };
const check = (name, cond, detail = '') => (cond ? ok(name) : bad(`${name}${detail ? `\n    ${detail}` : ''}`));
const has = (list, word) => list.some((e) => e.includes(word));

const asset = (o) => ({
  subject: o.id, format: 'png', alpha: false, identity: false, master: null, paid: false,
  desktop: 'holds', mobile: 'holds', reducedMotion: 'composed still', ...o,
});

/* the persistent product scene from DNA101, as a valid plan */
const SCENE = () => ({
  requirements: ['persistent-subject', 'parallax-layers', 'tracking-overlay'],
  assets: [
    asset({ id: 'env', subject: 'environment and operator', role: 'background-plate', source: 'generated', derivation: 'master-source', paid: true, cost: 0.08 }),
    asset({ id: 'product-master', subject: 'product', role: 'persistent-foreground', source: 'generated', derivation: 'master-source', paid: true, cost: 0.08, identity: true }),
    asset({ id: 'product', subject: 'product', role: 'persistent-foreground', source: 'extracted', derivation: 'local-extraction', master: 'product-master', alpha: true, identity: true }),
    asset({ id: 'product-1440', subject: 'product', role: 'persistent-foreground', source: 'extracted', derivation: 'responsive', master: 'product', alpha: true, identity: true, format: 'webp' }),
    asset({ id: 'product-768', subject: 'product', role: 'persistent-foreground', source: 'extracted', derivation: 'local-resize', master: 'product', alpha: true, identity: true, format: 'avif' }),
    asset({ id: 'smoke', role: 'atmosphere', source: 'generated', derivation: 'master-source', paid: true, cost: 0.08, alpha: true }),
    asset({ id: 'hud', subject: 'reticle', role: 'interface', source: 'svg', derivation: 'native', format: 'svg' }),
    asset({ id: 'copy', subject: 'copy and data', role: 'typography', source: 'html', derivation: 'native', format: 'html' }),
  ],
  independent: ['product', 'smoke', 'hud'],
  flattenable: [['env']],
  identityFeatures: { 'product-master': ['silhouette', 'antenna mast', 'two-tone housing'] },
  extractionRisk: ['the mast is thin against a bright ground'],
});
const swap = (plan, id, over) => ({ ...plan, assets: plan.assets.map((a) => (a.id === id ? { ...a, ...over } : a)) });

/* 1 ── a persistent subject over an independent environment needs the plan and alpha */
{
  const v = validate(SCENE());
  check('1 · the persistent product scene activates DNA101 and its plan passes', v.active && v.errors.length === 0, v.errors.join('; '));
  const noAlpha = validate(swap(SCENE(), 'product', { alpha: false }));
  check('1 · the independent product without alpha is refused', has(noAlpha.errors, 'genuine alpha'), noAlpha.errors.join('; '));
  const noSubject = validate({ ...SCENE(), independent: ['smoke', 'hud'] });
  check('1 · no independent persistent subject is refused', has(noSubject.errors, 'needs an independent persistent-foreground'), noSubject.errors.join('; '));
  const unstated = validate({ ...SCENE(), flattenable: undefined });
  check('1 · the plan must state what may be flattened together', has(unstated.errors, 'flattenable'), unstated.errors.join('; '));
  const webp = validate(swap(SCENE(), 'product', { format: 'webp' }));
  check('1 · the alpha master is PNG, not WebP', has(webp.errors, 'lossless PNG'), webp.errors.join('; '));
}

/* 2 ── a flattened product-plus-background image does not satisfy it */
{
  const plan = SCENE();
  plan.assets.push(asset({ id: 'hero', subject: 'product in its environment', role: 'persistent-foreground', source: 'generated', derivation: 'master-source', paid: true, cost: 0.08, bakes: ['background-plate', 'atmosphere'] }));
  plan.independent = ['hero', 'smoke', 'hud'];
  const v = validate(plan);
  check('2 · a flattened hero with the background baked in is refused', has(v.errors, 'does not make an independent layer'), v.errors.join('; '));
  check('2 · and it is refused as a rectangle with no alpha', has(v.errors, 'asset hero: persistent-foreground moves on its own'), v.errors.join('; '));
  const merged = validate({ ...SCENE(), flattenable: [['env', 'product']] });
  check('2 · the subject listed as independent and flattened with the plate is refused', has(merged.errors, 'flattened with env'), merged.errors.join('; '));
}

/* 3 ── HUD and text are SVG/HTML, never a raster generation */
{
  const v = validate(swap(SCENE(), 'hud', { source: 'generated', derivation: 'master-source', paid: true, cost: 0.08, format: 'png' }));
  check('3 · a generated HUD is refused', has(v.errors, 'interface is SVG or HTML'), v.errors.join('; '));
  const t = validate(swap(SCENE(), 'copy', { source: 'generated', derivation: 'master-source', paid: true, format: 'png' }));
  check('3 · generated typography is refused', has(t.errors, 'typography is SVG or HTML'), t.errors.join('; '));
  const c = count(SCENE());
  check('3 · HUD and copy are not paid for', !c.paidIds.includes('hud') && !c.paidIds.includes('copy'));
}

/* 4 ── local sizes from one master are not paid generations */
{
  const c = count(SCENE());
  check('4 · three paid source generations across eight files', c.paidSources === 3 && c.files === 8, JSON.stringify(c));
  check('4 · extraction and responsive sizes are local derivatives', ['product', 'product-1440', 'product-768'].every((id) => c.localDerivatives.includes(id)));
  check('4 · the cost counts sources only', c.cost === 0.24, String(c.cost));
  const lying = validate(swap(SCENE(), 'product-1440', { paid: true, cost: 0.08 }));
  check('4 · a responsive size marked paid is refused', has(lying.errors, 'not a paid generation'), lying.errors.join('; '));
  const s = summary(SCENE());
  check('4 · the summary reports generations, not files', s.includes('paid source generations: 3 (8 files)'), s);
  const twin = SCENE();
  twin.assets.push(asset({ id: 'product-scene-2', subject: 'product', role: 'persistent-foreground', source: 'generated', derivation: 'master-source', paid: true, cost: 0.08, identity: true }));
  const tv = validate(twin);
  check('4 · regenerating the same product as a second master is refused', has(tv.errors, 'a second master for "product"'), tv.errors.join('; '));
  const nofeat = validate({ ...SCENE(), identityFeatures: {} });
  check('4 · a master records its invariant identity features', has(nofeat.errors, 'identityFeatures.product-master'), nofeat.errors.join('; '));
}

/* 5 ── a static full-bleed image does not trigger a false alpha requirement */
{
  const plan = {
    requirements: ['static-full-bleed', 'crop-change', 'opacity-reveal', 'animation'],
    assets: [asset({ id: 'plate', subject: 'showroom at dusk', role: 'background-plate', source: 'generated', derivation: 'master-source', paid: true, cost: 0.08 })],
  };
  const v = validate(plan);
  check('5 · a static full-bleed page with ordinary motion does not activate DNA101', !v.active && v.errors.length === 0, v.errors.join('; '));
  check('5 · nothing on it is asked for alpha', count(plan).alpha.length === 0 && !summary(plan).includes('warning'));
  check('5 · animation alone is not a trigger', !assess(['animation']).active);
}

/* 6 ── paid generation beyond the approval asks again */
{
  const approval = { assets: ['env', 'product-master', 'smoke'], budget: 0.3 };
  check('6 · the listed sources within budget are approved', checkApproval(SCENE(), approval).approved);
  const more = SCENE();
  more.assets.push(asset({ id: 'product-rear', subject: 'product', role: 'persistent-foreground', source: 'generated', derivation: 'paid-derived', master: 'product-master', paid: true, cost: 0.05, identity: true }));
  const a = checkApproval(more, approval);
  check('6 · an extra paid derivative needs approval again', !a.approved && a.unlisted.includes('product-rear'), JSON.stringify(a));
  const pricier = swap(SCENE(), 'smoke', { cost: 0.5 });
  check('6 · going over the approved budget needs approval again', checkApproval(pricier, approval).overBudget);
  const local = SCENE();
  local.assets.push(asset({ id: 'product-390', subject: 'product', role: 'persistent-foreground', source: 'extracted', derivation: 'local-resize', master: 'product', alpha: true, identity: true, format: 'webp' }));
  check('6 · a further local resize needs no approval', checkApproval(local, approval).approved);
}

/* 7 ── DNA101 selects no technology */
{
  const all = assess(['persistent-subject', 'parallax-layers', 'independent-scale', 'tracking-overlay', 'scene-transition', 'controlled-overlap', 'responsive-reposition', 'subject-reveal', 'independent-atmosphere', 'explicit-depth']);
  check('7 · activation returns only whether and why', JSON.stringify(Object.keys(all)) === '["active","triggers","ignored"]' && all.triggers.length === 10);
  const v = validate(SCENE());
  check('7 · validation returns no stack field', JSON.stringify(Object.keys(v).sort()) === '["active","errors","triggers","warnings"]');
  const text = summary(SCENE()) + JSON.stringify(v) + JSON.stringify(count(SCENE()));
  check('7 · no GSAP, Lenis or Three.js in anything it outputs', !/gsap|lenis|three/i.test(text));
  const render = validate(swap(SCENE(), 'product', { source: 'webgl', derivation: 'native', master: null, alpha: false, format: 'glb' }));
  const raster = validate(SCENE());
  check('7 · an independent render and an alpha raster both satisfy it — neither is required', render.errors.length === 0 && raster.errors.length === 0, render.errors.join('; '));
}

/* the CLI, end to end */
{
  const cli = resolve(dirname(fileURLToPath(import.meta.url)), '../../layers.mjs');
  const d = mkdtempSync(join(tmpdir(), 'layers-'));
  writeFileSync(join(d, 'plan.json'), JSON.stringify(SCENE()));
  writeFileSync(join(d, 'ok.json'), JSON.stringify({ assets: ['env', 'product-master', 'smoke'], budget: 0.3 }));
  writeFileSync(join(d, 'short.json'), JSON.stringify({ assets: ['env', 'smoke'], budget: 0.3 }));
  const out = execFileSync(process.execPath, [cli, join(d, 'plan.json'), '--approval', join(d, 'ok.json')], { encoding: 'utf8' });
  check('CLI · a valid plan inside its approval passes', out.includes('approved:'), out);
  let refused = false;
  try { execFileSync(process.execPath, [cli, join(d, 'plan.json'), '--approval', join(d, 'short.json')], { stdio: 'pipe' }); }
  catch (e) { refused = String(e.stderr).includes('NEEDS APPROVAL AGAIN'); }
  check('CLI · an unlisted paid source exits 1 and asks again', refused);
  rmSync(d, { recursive: true, force: true });
}

console.log(failures ? `\n${failures} of ${total} failed` : `\nall ${total} passed`);
process.exit(failures ? 1 : 0);

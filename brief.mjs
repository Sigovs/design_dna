#!/usr/bin/env node
/**
 * Design brief compiler.
 *
 *   npm run brief -- --out projects/briefs/<slug>-<date>.md      request on stdin
 *   npm run brief -- --input projects/requests/x.txt --out <file>
 *   npm run brief:check -- projects/briefs/<file>.md
 *
 * TWO PHASES, AND THIS FILE IS ONLY THE FIRST.
 *
 * Phase 1 — mechanical compilation. Parse the request, find eligible records,
 * expose their ratings, statuses, Alex-approved layer verdicts and evidence
 * citations, list the dialects with their real status, carry the relevant
 * invariants, and emit the fourteen-section scaffold with decision slots.
 *
 * Phase 2 — the agent authors the direction into those slots: which dialect,
 * which references, what the project actually does, and every claim marked with
 * where it came from.
 *
 * THIS SCRIPT NEVER PRODUCES A DESIGN CONCLUSION. It ranks candidates so the
 * scaffold is ordered, and the ranking is explicitly not a selection: choosing a
 * reference is a judgement about a brief, and a keyword score cannot make it.
 */

import { readFileSync, writeFileSync, existsSync, readdirSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, basename } from 'node:path';

const ROOT = dirname(fileURLToPath(import.meta.url));
const VAULT = join(ROOT, 'vault');
const argv = process.argv.slice(2);
const flag = (n) => { const i = argv.indexOf(n); return i > -1 ? argv[i + 1] : null; };
const CHECK = argv.includes('--check') || /brief:check/.test(process.env.npm_lifecycle_event ?? '');

const sites = JSON.parse(readFileSync(join(VAULT, 'sites.json'), 'utf8'));
const byId = new Map(sites.map((e) => [e.id, e]));

/* ── evidence claim ids live in EVIDENCE.md; site ids live in sites.json.
      They are different identifier types and are never validated against each
      other — conflating them is how a brief cites a claim that does not exist. */
const evidenceDoc = readFileSync(join(VAULT, 'EVIDENCE.md'), 'utf8');
const claimIds = new Set([
  ...[...evidenceDoc.matchAll(/^### ([A-D]\d+e?) — /gm)].map((m) => m[1]),
  ...[...evidenceDoc.matchAll(/^- \*\*(D\d+) · /gm)].map((m) => m[1]),
]);

/* ── project-scoped exclusions ─────────────────────────────────────────────
   A record Alex has barred from ONE project. Precedence is absolute and the
   filter runs before ranking, so no axis can return it — not rating, not sector
   relevance, and not the compositional-operation axis added on 2026-08-13.

   The failure this prevents happened: `rekorderstudios-com` was excluded from
   Patton Motors, and re-ranking by compositional behaviour walked it straight
   back to the top of that brief's candidates. An exclusion that only outranks
   the axes that existed when it was written is not an exclusion.

   Scope is one project. The record keeps its rating, its status and its full
   value everywhere else — a global judgement belongs in sites.json, not here. */
const EXCLUSIONS = (() => {
  const f = join(ROOT, 'projects/exclusions.json');
  if (!existsSync(f)) return new Map();
  const raw = JSON.parse(readFileSync(f, 'utf8'));
  return new Map(Object.entries(raw).filter(([k]) => !k.startsWith('_')));
})();
const exclusionsFor = (slug) => EXCLUSIONS.get(slug) ?? [];

/* Layer verdicts Alex set, read from the review sidecars. */
function layers() {
  const dir = join(VAULT, 'reviews');
  const out = new Map();
  if (!existsSync(dir)) return out;
  for (const f of readdirSync(dir).filter((n) => n.endsWith('.md'))) {
    const id = f.replace(/\.md$/, '');
    for (const line of readFileSync(join(dir, f), 'utf8').split('\n')) {
      const m = line.match(/^\|\s*([a-z][a-z \/]+?)\s*\|\s*(.+?)\s*\|\s*(Alex|agent)\s*\|\s*(IN|OUT|unreviewed|contextual)\s*\|/i);
      if (!m) continue;
      const [, layer, obs, source, verdict] = m;
      if (/^<|not verified/i.test(obs)) continue;
      if (!out.has(id)) out.set(id, []);
      out.get(id).push({ layer: layer.trim().toLowerCase(), obs: obs.trim(), source: source.toLowerCase(), verdict: verdict.toUpperCase() });
    }
  }
  return out;
}
const LAYERS = layers();

const dialects = readdirSync(join(ROOT, 'dialects')).filter((f) => f.endsWith('.md') && !/^(README|_TEMPLATE|HYBRID)/.test(f))
  .map((f) => {
    const body = readFileSync(join(ROOT, 'dialects', f), 'utf8');
    const status = /Status: library/.test(body) ? 'library'
      : /PROVISIONAL/.test(body) ? 'provisional' : 'confirmed';
    return { name: f.replace(/\.md$/, ''), status };
  });

/* ── check mode ───────────────────────────────────────────────────────────── */
const SECTIONS = ['Dialect', 'References', 'Art direction', 'Composition and hierarchy',
  'Layout and spacing', 'Typography', 'Colour', 'Imagery and video', 'Navigation and control geometry',
  'Motion and interaction', 'Component guidance', 'Anti-patterns', 'Evidence', 'Implementation prompt'];

function check(file) {
  /* Project exclusions are checked first, because a brief that cites an excluded
     record is wrong no matter how well-formed the rest of it is. */
  {
    const slug = basename(file).replace(/\.md$/, '').replace(/-\d{4}-\d{2}-\d{2}$/, '');
    /* Strip ONLY the exclusions block itself — where the id is supposed to appear —
       and check everything else. Splitting at the heading and keeping the part
       above it silently exempted the reference sections, which come after. */
    const body = readFileSync(file, 'utf8').replace(/^## Exclusions[\s\S]*?(?=^## )/m, '');
    const bad = exclusionsFor(slug).filter((x) => new RegExp(`\\b${x.id}\\b`).test(body));
    if (bad.length) {
      console.error(`\n✗ ${basename(file)} cites a record excluded from this project by explicit verdict:`);
      for (const x of bad) console.error(`    ${x.id} — ${x.by}, ${x.date}: ${x.reason}`);
      console.error('');
      process.exit(1);
    }
  }

  const doc = readFileSync(file, 'utf8');
  const bad = [];
  const say = (s) => bad.push(s);

  SECTIONS.forEach((t, i) => {
    if (!new RegExp(`^## ${i + 1}\\.`, 'm').test(doc)) say(`section ${i + 1} ("${t}") is missing`);
  });

  /* provenance: one canonical syntax, machine-checked */
  for (const m of doc.matchAll(/\[(P|J|R|A|\?)([^\]]*)\]/g)) {
    const [full, kind, rest] = m;
    const attrs = Object.fromEntries([...rest.matchAll(/(\w+):([^\s\]]+)/g)].map((a) => [a[1], a[2]]));
    if (kind === 'P') {
      if (!attrs.evidence) { say(`${full}: [P] requires evidence:<claim id>`); continue; }
      for (const id of attrs.evidence.split(',')) if (!claimIds.has(id)) say(`${full}: evidence id "${id}" is not a claim in vault/EVIDENCE.md`);
      for (const id of (attrs.sites ?? '').split(',').filter(Boolean)) if (!byId.has(id)) say(`${full}: site id "${id}" is not in sites.json`);
      if (attrs.sites === undefined) say(`${full}: [P] citing evidence that rests on records must name sites:`);
    } else if (kind === 'R') {
      if (!attrs.site) { say(`${full}: [R] requires site:<record id>`); continue; }
      if (!byId.has(attrs.site)) { say(`${full}: site id "${attrs.site}" is not in sites.json`); continue; }
      if (attrs.layer) {
        const known = (LAYERS.get(attrs.site) ?? []).map((l) => l.layer);
        if (!known.includes(attrs.layer.toLowerCase())) say(`${full}: layer "${attrs.layer}" is not in that site's sidecar (${known.join(', ') || 'no sidecar'})`);
      }
    } else if (rest.trim()) say(`${full}: [${kind}] takes no attributes`);
  }
  if (!/\[P\s/.test(doc)) say('no [P] claim anywhere — a brief with no permanent evidence is not grounded');

  /* reference caps, counted from section 2's own labels */
  const sec2 = (doc.match(/^## 2\.[\s\S]*?(?=^## 3\.)/m) ?? [''])[0];
  const count = (label) => (sec2.match(new RegExp(`^\\s*-\\s*\\*\\*${label}`, 'gmi')) ?? []).length;
  const caps = { Primary: 2, Secondary: 3, Contextual: 3 };
  for (const [label, max] of Object.entries(caps)) {
    const n = count(label);
    if (n > max) say(`section 2: ${n} ${label.toLowerCase()} references, maximum is ${max}`);
  }
  for (const label of ['Primary', 'Anti-reference', 'Not carried forward']) {
    if (!new RegExp(label, 'i').test(sec2)) say(`section 2 does not name "${label}"`);
  }

  /* a library dialect may be a method, never a stated preference */
  for (const d of dialects.filter((x) => x.status !== 'confirmed')) {
    if (new RegExp(`\\b${d.name}\\b`).test(doc) && !new RegExp(`${d.name}[^\\n]*${d.status}`, 'i').test(doc)) {
      say(`dialect "${d.name}" is used without stating its ${d.status} status`);
    }
  }

  /* sections 12 and 13 must carry content */
  for (const n of [12, 13]) {
    const body = (doc.match(new RegExp(`^## ${n}\\.[\\s\\S]*?(?=^## ${n + 1}\\.|\\Z)`, 'm')) ?? [''])[0];
    if (body.replace(/^## .*$/m, '').trim().length < 80) say(`section ${n} is empty or too thin to be a real answer`);
  }

  console.log(`\nbrief:check — ${basename(file)}\n`);
  if (bad.length) { bad.forEach((b) => console.error(`  ✗ ${b}`)); console.error(''); process.exit(1); }
  console.log('  ✓ sections present · provenance resolves · caps respected · dialect status stated\n');
}

if (CHECK) {
  const file = argv.find((a) => a.endsWith('.md'));
  if (!file) { console.error('\n✗ usage: npm run brief:check -- projects/briefs/<file>.md\n'); process.exit(1); }
  check(file);
  process.exit(0);
}

/* ── phase 1: compile the scaffold ────────────────────────────────────────── */
const inputFile = flag('--input');
const out = flag('--out');
if (!out) { console.error('\n✗ usage: npm run brief -- [--input <file>] --out projects/briefs/<slug>-<date>.md\n'); process.exit(1); }

const request = inputFile ? readFileSync(inputFile, 'utf8') : readFileSync(0, 'utf8');
if (!request.trim()) { console.error('\n✗ empty request — pass --input or pipe the DESIGN block on stdin\n'); process.exit(1); }

const words = request.toLowerCase().match(/[a-zа-я][a-zа-я-]{3,}/gi) ?? [];
const stop = new Set(['design','brand','goal','homepage','website','site','page','redesign','luxury','the','for','and','with']);
const terms = [...new Set(words.filter((w) => !stop.has(w)))];

/* Compositional devices — the moves a reference can teach, as distinct from the
   industry it happens to be in. Kept deliberately small and readable. */
const DEVICE = [
  'bleed', 'full-bleed', 'full-screen', 'oversized', 'overlap', 'layer', 'layered',
  'scale', 'crop', 'cropped', 'asymmetr', 'grid-break', 'interrupt', 'scrollytelling',
  'scroll-linked', 'sticky', 'cinematic', 'montage', 'dominant-mass', 'active-negative-space',
  'intentional-crop', 'rhythm-variation', 'tonal-structure', 'directed-eye', 'visual-silence',
];

/* Deterministic ordering for the scaffold ONLY. It never selects.
   TWO INDEPENDENT AXES, and device relevance is read first.

   Before 2026-08-13 the first key was term overlap with the request, so a brief
   about a dealership surfaced dealerships — and dealership pages are the most
   conventional artefacts in this library. A rating-3 record documenting overlap,
   scale collision or grid interruption scored zero on vocabulary and sorted below
   rating. The CMC Concept 2 brief cited eight references, three of them the same
   Semler dealer pages, and none of the five records that carry the moves it needed.

   Industry relevance is NOT removed — it is the second axis, still reported and
   still ordering. What changed is that a reference is now ranked first by the
   composition it can teach. */
const score = (e) => {
  const hay = [e.id, e.title, e.note, e.works, ...Object.values(e.tags ?? {}).flat()].join(' ').toLowerCase();
  const device = DEVICE.filter((d) => hay.includes(d)).length;   // axis 1 — the move
  const rel = terms.filter((t) => hay.includes(t)).length;       // axis 2 — the sector
  const ls = LAYERS.get(e.id) ?? [];
  const approved = ls.filter((l) => l.source === 'alex' && l.verdict === 'IN').length;
  const complete = (e.works ? 1 : 0) + (e.weaknesses ? 1 : 0) + (ls.length ? 1 : 0);
  return [device, e.rating ?? 0, rel, approved, (e.dialects ?? []).length, complete];
};
const rank = (a, b) => { const x = score(a), y = score(b); for (let i = 0; i < x.length; i++) if (y[i] !== x[i]) return y[i] - x[i]; return a.id.localeCompare(b.id); };

/* The slug identifies the PROJECT, so it comes from the request when there is
   one. Deriving it from the output filename made the exclusion miss the moment a
   brief was compiled to a different name — which is exactly the accident this
   whole mechanism exists to prevent. */
const slug = (inputFile ? basename(inputFile).replace(/\.[a-z]+$/i, '') : basename(out).replace(/\.md$/, ''))
  .replace(/-\d{4}-\d{2}-\d{2}$/, '');
const excluded = exclusionsFor(slug);
const excludedIds = new Set(excluded.map((x) => x.id));

/* The filter is here, before sort(), and not inside score(). A score of -1 is a
   ranking opinion; removal from the pool is a fact, and this must be a fact. */
const pool = (status) =>
  sites.filter((e) => e.dialectStatus === status && !excludedIds.has(e.id)).sort(rank);
const row = (e) => {
  const ls = (LAYERS.get(e.id) ?? []).filter((l) => l.source === 'alex' && /IN|OUT/.test(l.verdict));
  /* Both axes are printed, because the point of separating them is that the agent
     can see which one put a record where it is. Destructure by name, not by
     position — the key order changed once and silently mislabelled two columns. */
  const [device, , rel, approved] = score(e);
  return `| \`${e.id}\` | ${e.rating} | ${e.dialectStatus} | ${device} | ${rel} | ${approved || '—'} | ${ls.map((l) => l.layer + ':' + l.verdict).join(', ') || '—'} |`;
};

const template = readFileSync(join(ROOT, 'projects/briefs/_TEMPLATE.md'), 'utf8');
const scaffold = template
  .replace('<!--REQUEST-->', request.trim())
  .replace('<!--DATE-->', new Date().toISOString().slice(0, 10))
  .replace('<!--CANDIDATES-IN-->', pool('in').map(row).join('\n'))
  .replace('<!--CANDIDATES-HYBRID-->', pool('hybrid').map(row).join('\n'))
  .replace('<!--CANDIDATES-OUT-->', pool('out').map(row).join('\n'))
  .replace('<!--EXCLUSIONS-->', excluded.length
    ? excluded.map((x) => `| \`${x.id}\` | ${x.by}, ${x.date} | ${x.reason} |`).join('\n')
    : '| — | — | none recorded for this project |')
  .replace('<!--DIALECTS-->', dialects.map((d) => `| \`${d.name}\` | **${d.status}** |`).join('\n'))
  .replace('<!--TERMS-->', terms.slice(0, 12).join(' · ') || '—');

mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, scaffold);
console.log(`\nphase 1 complete — scaffold written: ${out}`);
console.log(`  request terms: ${terms.slice(0, 12).join(' · ') || '—'}`);
console.log(`  candidates ranked: ${pool('in').length} in · ${pool('hybrid').length} hybrid · ${pool('out').length} out`);
if (excluded.length) {
  console.log(`  EXCLUDED BY EXPLICIT PROJECT VERDICT — removed before ranking, cannot return by any axis:`);
  for (const x of excluded) console.log(`     ${x.id} — ${x.by}, ${x.date}: ${x.reason}`);
}
console.log('\nPHASE 2 IS THE AGENT\'S. This script chose nothing: it ordered candidates and');
console.log('left the decision slots empty. Fill them, then: npm run brief:check -- ' + out + '\n');

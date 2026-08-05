#!/usr/bin/env node
/**
 * npm run dialects:check — the smallest validation the dialect system needs.
 *
 * Three failures it exists to catch, all of which have precedent in this repo:
 *   1. a dialect that is a mood description while its neighbours are systems —
 *      the shared shape in _TEMPLATE.md is checked section by section;
 *   2. a stale index — a dialect file that no index lists, or an index row
 *      pointing at a file that does not exist;
 *   3. a dialect the vault cannot classify — `vault/vocab.json` is the single
 *      source of truth for dialect names, so a dialect missing from it can never
 *      be carried by an entry, which makes its promotion to `confirmed`
 *      impossible by construction.
 *
 * It checks structure and wiring only. Whether a dialect's reasoning is any good
 * is a human judgement and is not automatable.
 */

import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, basename } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = dirname(HERE);

/* Every dialect file must answer all of these. Names are matched loosely so a
   file may phrase a heading its own way, but it may not omit the subject. */
const REQUIRED = [
  ['status', /^>\s*\*\*Status:\s*(library|confirmed|provisional)/mi],
  ['core thesis', /\*\*Core thesis\.?\*\*/i],
  ['emotional character', /\*\*Emotional character\.?\*\*/i],
  ['decision logic', /^##+\s.*DECISION LOGIC/mi],
  ['systems table', /^##+\s.*SYSTEMS/mi],
  ['signature devices', /^##+\s.*SIGNATURE DEVICES/mi],
  ['what it avoids', /^##+\s.*AVOID/mi],
  ['false versions', /^##+\s.*FALSE VERSIONS/mi],
  ['fit', /^##+\s.*FIT/mi],
  ['pure mode', /^##+\s.*PURE MODE/mi],
  ['hybrid relationships', /^##+\s.*HYBRID RELATIONSHIPS/mi],
  ['accessibility', /^##+\s.*ACCESSIBILITY/mi],
  ['diagnostics', /^##+\s.*DIAGNOSTICS/mi],
  ['compact example', /^##+\s.*THE LOGIC, COMPACTLY/mi],
];

/* The ten domains a CONTROL MAP has to be able to assign. A dialect that cannot
   answer a row does not govern that domain — it must say so, not omit the row. */
const DOMAINS = [
  'Composition / grid', 'Hierarchy / density', 'Typography behaviour',
  'Spacing / rhythm', 'Colour / contrast logic', 'Image behaviour',
  'Containers / borders / geometry', 'Depth / materiality',
  'Motion / interaction', 'Information presentation',
];

const problems = [];
const note = (s) => problems.push(s);

const files = readdirSync(HERE)
  .filter((f) => f.endsWith('.md') && !['README.md', 'HYBRID.md', '_TEMPLATE.md'].includes(f))
  .sort();

if (!files.length) { console.error('\n✗ no dialect files found\n'); process.exit(1); }

const index = readFileSync(join(HERE, 'README.md'), 'utf8');
const hybrid = readFileSync(join(HERE, 'HYBRID.md'), 'utf8');
const vocab = JSON.parse(readFileSync(join(ROOT, 'vault', 'vocab.json'), 'utf8'));
const known = new Set(vocab.dialects ?? []);

console.log(`\ndialects — ${files.length} files\n`);

const rows = [];
for (const f of files) {
  const slug = basename(f, '.md');
  const text = readFileSync(join(HERE, f), 'utf8');
  /* The two dialects that predate the shared shape keep their own PRINCIPLES /
     EXPRESSIONS structure by decision — they are required to declare a status and to
     appear in every index, and nothing more. Reshaping them would rewrite two
     working files to satisfy a checker, which is the wrong direction of authority. */
  const legacyShape = ['auction-editorial', 'immersive-authored-world'].includes(basename(f, '.md'));
  const required = legacyShape ? REQUIRED.filter(([n]) => n === 'status') : REQUIRED;
  const missing = required.filter(([, re]) => !re.test(text)).map(([name]) => name);
  const status = (text.match(/^>\s*\*\*Status:\s*(\w+)/mi) ?? [])[1]?.toLowerCase() ?? '—';
  const missingDomains = DOMAINS.filter((d) => !text.includes(`**${d}**`));
  const inIndex = index.includes(`(${f})`);
  const inVocab = known.has(slug);
  const inAliases = hybrid.includes(`(${f})`);

  rows.push({ slug, status, missing, missingDomains, inIndex, inVocab, inAliases, lines: text.split('\n').length });

  if (missing.length) note(`${f}: missing section(s) — ${missing.join(', ')}`);
  /* The two dialects that predate the shared shape are exempt from the domain
     table only; they still have to declare a status and appear in every index. */
  const legacy = ['auction-editorial', 'immersive-authored-world'].includes(slug);
  if (missingDomains.length && !legacy) note(`${f}: SYSTEMS table missing domain(s) — ${missingDomains.join(', ')}`);
  if (status === '—') note(`${f}: no status line`);
  if (!inIndex) note(`${f}: not listed in dialects/README.md`);
  if (!inVocab) note(`${f}: not in vault/vocab.json dialects — the vault cannot classify it`);
  if (!inAliases && !legacy) note(`${f}: no alias row in HYBRID.md`);
}

const pad = Math.max(...rows.map((r) => r.slug.length));
for (const r of rows) {
  const flags = [
    r.missing.length ? `${r.missing.length} missing` : null,
    r.missingDomains.length ? `${r.missingDomains.length} domains` : null,
    r.inIndex ? null : 'no index row',
    r.inVocab ? null : 'not in vocab',
  ].filter(Boolean);
  console.log(`  ${r.slug.padEnd(pad)}  ${r.status.padEnd(11)} ${String(r.lines).padStart(4)} lines  ${flags.length ? '✗ ' + flags.join(' · ') : 'ok'}`);
}

/* An index row pointing at a file that is not there. */
for (const m of index.matchAll(/\]\(([a-z0-9-]+\.md)\)/g)) {
  if (!existsSync(join(HERE, m[1]))) note(`dialects/README.md links ${m[1]}, which does not exist`);
}

/* A vocab name with no file — an entry could be tagged with a dialect that has no rules. */
for (const name of known) {
  if (!existsSync(join(HERE, `${name}.md`))) note(`vault/vocab.json lists "${name}" with no dialects/${name}.md`);
}

/* Accidental promotion is the risk the `library` status creates: vault/vocab.json
   now offers ten dialect names, so an entry can carry a library dialect with
   `dialectStatus: "in"` — and three of those look like the authored route's
   confirmation test. They are not. The authored route only becomes reachable once
   Alex re-declares the dialect `provisional`, which is the claim being tested.
   This reports the count as a decision waiting to be made, and never as a promotion. */
const sites = JSON.parse(readFileSync(join(ROOT, 'vault', 'sites.json'), 'utf8'));

/* Records are not observations. Three pages of one site share art direction,
   type and palette by construction, and confirming a dialect on them would
   confirm it on a single design system — the failure the distillation
   thresholds forbid everywhere else. `technical-luxury` is the live case:
   four `in` records, three of them Semler Premium, two observations.
   Collapsed by host, which is what makes them one site. */
const host = (e) => { try { return new URL(e.url).hostname.replace(/^www\./, ''); } catch { return e.id; } };

const carriers = (slug) => sites.filter((e) =>
  e.dialectStatus === 'in' && (e.dialects ?? []).includes(slug));

for (const r of rows) {
  const held = carriers(r.slug);
  const n = held.length;
  const sites_ = new Set(held.map(host));
  const observations = sites_.size;

  if (r.status === 'library' && n) {
    console.log(`  · ${r.slug}: ${n} entr${n === 1 ? 'y' : 'ies'} carry it with "in".`
      + ' That is evidence about the entries, not a promotion — a library dialect has no'
      + ' promotion path until Alex re-declares it provisional.');
  }
  if (r.status === 'provisional') {
    const collapsed = n > observations;
    console.log(`  · ${r.slug}: ${observations} independent observation${observations === 1 ? '' : 's'}`
      + ` of 3 toward confirmation${collapsed ? ` — from ${n} records, collapsed by site` : ''}.`);
    if (collapsed) {
      const bySite = [...sites_].map((h) => `${h} ×${held.filter((e) => host(e) === h).length}`);
      console.log(`      ${bySite.join(' · ')}`);
    }
    /* Deliberately never says "confirmable". The count is a floor; whether the
       third observation carries the dialect's governing logic or merely looks
       like it is a judgement, and this file cannot make it. */
    if (observations >= 3) {
      console.log('      threshold reached on count — confirmation is still Alex\'s call, on logic, not on arithmetic.');
    }
  }
}

/* The mode system has to be reachable from the manifest. */
const taste = readFileSync(join(ROOT, 'TASTE.md'), 'utf8');
if (!/dialects\/HYBRID\.md/.test(taste)) note('TASTE.md does not link dialects/HYBRID.md — the mode system is unreachable from the manifest');
if (!/style mode/i.test(taste)) note('TASTE.md does not mention STYLE MODE — the Design Read cannot declare a mode');

console.log('');
if (problems.length) {
  console.error(`✗ ${problems.length} problem${problems.length === 1 ? '' : 's'}:\n`);
  problems.forEach((p) => console.error(`  ${p}`));
  console.error('');
  process.exit(1);
}
console.log(`✓ ${rows.length} dialects: shape complete, indexes current, vocab in sync\n`);

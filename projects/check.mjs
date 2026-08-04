#!/usr/bin/env node
/**
 * Self-similarity check.  npm run projects:check
 *
 * Reads every project record's `register` block and reports collisions: any two
 * projects sharing ground + display + image treatment are flagged as a possible
 * dialect collapse, with both slugs named.
 *
 * IT REPORTS, IT DOES NOT JUDGE. Two projects may legitimately share a register —
 * a client's own brand carried across two briefs is not drift. The check cannot
 * tell the difference and does not try; it puts the pair in front of a human,
 * which is the entire job. Nothing in this system could see this before.
 *
 * Exits 0 even when collisions are found: a collision is information, not a
 * failure. It exits 1 only when a record is malformed, because a corrupt corpus
 * is what makes the check lie.
 */

import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, basename } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));

/* Front-matter only, one nesting level. No dependency for six fields. */
function parseFrontMatter(text, file) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) throw new Error(`${file}: no front-matter block`);
  const out = {};
  let parent = null;
  for (const raw of m[1].split(/\r?\n/)) {
    const line = raw.replace(/\s+#.*$/, '');          // strip trailing comments
    if (!line.trim()) continue;
    const indented = /^\s{2,}\S/.test(line);
    const kv = line.match(/^\s*([\w-]+):\s*(.*)$/);
    if (!kv) continue;
    const [, key, rawValue] = kv;
    const value = rawValue.trim();
    if (indented && parent) {
      out[parent][key] = value;
    } else if (value === '') {
      parent = key;
      out[key] = {};
    } else {
      parent = null;
      out[key] = value.startsWith('[')
        ? value.slice(1, -1).split(',').map((s) => s.trim()).filter(Boolean)
        : value;
    }
  }
  return out;
}

const files = readdirSync(HERE)
  .filter((f) => f.endsWith('.md') && f !== 'README.md' && !f.startsWith('_'))
  .sort();

if (!files.length) {
  console.log('\nNo project records yet. Copy _TEMPLATE.md when the first one closes.\n');
  process.exit(0);
}

const records = [];
const malformed = [];
for (const f of files) {
  try {
    const fm = parseFrontMatter(readFileSync(join(HERE, f), 'utf8'), f);
    const slug = fm.project || basename(f, '.md');
    const r = fm.register ?? {};
    for (const k of ['ground', 'display', 'image']) {
      if (!r[k]) malformed.push(`${f}: register.${k} missing (use "not recorded" if unknown)`);
    }
    records.push({ file: f, slug, fm, register: r });
  } catch (err) {
    malformed.push(err.message);
  }
}

console.log(`\nproject records — ${records.length} read\n`);

const key = (r) => ['ground', 'display', 'image']
  .map((k) => String(r.register[k] ?? '').toLowerCase().trim()).join(' | ');

/* "not recorded" is not a value: it must never collide with itself. */
const usable = records.filter((r) => !key(r).split('|').some((p) => p.trim() === 'not recorded'));
const skipped = records.length - usable.length;

const groups = new Map();
for (const r of usable) {
  const k = key(r);
  if (!groups.has(k)) groups.set(k, []);
  groups.get(k).push(r);
}

const collisions = [...groups.entries()].filter(([, rs]) => rs.length > 1);

for (const r of records) {
  const parts = ['ground', 'display', 'accent', 'image'].map((k) => `${k} ${r.register[k] ?? '—'}`);
  console.log(`  ${r.slug.padEnd(24)} ${r.fm.mandate ?? '—'}  ${parts.join(' · ')}`);
}

if (collisions.length) {
  console.log(`\n⚠ ${collisions.length} register collision${collisions.length === 1 ? '' : 's'}`
    + ' — possible dialect collapse:\n');
  for (const [k, rs] of collisions) {
    console.log(`  ${rs.map((r) => r.slug).join('  +  ')}`);
    console.log(`    share: ${k}`);
    const clients = [...new Set(rs.map((r) => r.fm.client ?? 'not recorded'))];
    console.log(`    clients: ${clients.join(', ')}`
      + (clients.length > 1 ? '  ← different clients, same register' : '  (same client — may be legitimate)'));
    console.log('');
  }
  console.log('  Reported, not judged. A shared register can be a brand carried across');
  console.log('  two briefs. It can also be the house dialect that stopped yielding.');
  console.log('  Only a human can tell which — that is why this prints instead of failing.\n');
} else {
  console.log(`\n✓ no register collisions across ${usable.length} comparable record`
    + `${usable.length === 1 ? '' : 's'}\n`);
}

/* ── one axis at a time ────────────────────────────────────────────────────
   A full collision needs ground AND display AND image to match, which is a high
   bar and stayed silent across six records while `image: mixed` sat on every one
   of them. An axis carrying the same value everywhere carries no information,
   and a register that repeats on two of three axes is drift the collision test
   cannot see. Same contract as above: reported, never judged. */
const CONCENTRATION = 0.6;

const concentrations = [];
for (const axis of ['ground', 'display', 'image']) {
  const counts = new Map();
  for (const r of usable) {
    const v = String(r.register[axis] ?? '').toLowerCase().trim();
    if (!v || v === 'not recorded') continue;
    if (!counts.has(v)) counts.set(v, []);
    counts.get(v).push(r.slug);
  }
  const total = [...counts.values()].reduce((n, s) => n + s.length, 0);
  for (const [value, slugs] of counts) {
    if (slugs.length > 1 && slugs.length / total >= CONCENTRATION) {
      concentrations.push({ axis, value, slugs, total });
    }
  }
}

if (concentrations.length) {
  console.log(`⚠ ${concentrations.length} axis concentration${concentrations.length === 1 ? '' : 's'}`
    + ` — one value on ${Math.round(CONCENTRATION * 100)}%+ of comparable records:\n`);
  for (const c of concentrations) {
    console.log(`  ${c.axis}: "${c.value}" on ${c.slugs.length} of ${c.total}`);
    console.log(`    ${c.slugs.join(', ')}\n`);
  }
  console.log('  An axis with one value everywhere is not varying, and the collision');
  console.log('  test above cannot report it: that test needs all three to match at');
  console.log('  once. Whether this is a house signature or a habit is a human call.\n');
}

if (skipped) {
  console.log(`  ${skipped} record${skipped === 1 ? '' : 's'} not comparable — register partly "not recorded".`);
  console.log('  Incomparable records cannot reveal repetition; fill the register at close.\n');
}

if (malformed.length) {
  console.error('✗ malformed records — the corpus is what makes this check honest:\n');
  malformed.forEach((m) => console.error(`  ${m}`));
  console.error('');
  process.exit(1);
}

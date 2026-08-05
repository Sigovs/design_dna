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

/* Written as prose and never compared for equality — a colour or a typeface name
   carries detail no enum could hold, and that detail is worth more in the record
   than it would be in a comparison. */
const OPEN_AXES = ['ground', 'display', 'accent'];

/* Compared, and therefore constrained. Each is an axis TASTE.md §2d already
   requires three EXPLORE directions to differ on; until now the only one this
   file could see was `image`. */
const ENUM_AXES = {
  image:    ['contained', 'bleed', 'mixed'],
  hero:     ['image-led', 'type-led', 'object-led', 'split', 'index', 'none'],
  symmetry: ['symmetric', 'asymmetric', 'centred'],
  density:  ['sparse', 'measured', 'dense'],
  voices:   ['1', '2', '3+'],
  motion:   ['absent', 'restrained', 'choreographed'],
};

const records = [];
const malformed = [];
for (const f of files) {
  try {
    const fm = parseFrontMatter(readFileSync(join(HERE, f), 'utf8'), f);
    const slug = fm.project || basename(f, '.md');
    const r = fm.register ?? {};
    for (const k of [...OPEN_AXES, ...Object.keys(ENUM_AXES)]) {
      if (!r[k]) malformed.push(`${f}: register.${k} missing (use "not recorded" if unknown)`);
    }
    /* Enumerated axes are validated; open ones are not. An unlisted value is
       malformed rather than tolerated, because free text is what made `ground`
       uncomparable in the first place — "#090c0d near-black with three darker
       -green steps" and "near-black #0B0B0D" are the same decision and will
       never match as strings. */
    for (const [k, allowed] of Object.entries(ENUM_AXES)) {
      const v = String(r[k] ?? '').toLowerCase().trim();
      if (v && v !== 'not recorded' && !allowed.includes(v)) {
        malformed.push(`${f}: register.${k} = "${r[k]}" — expected one of ${allowed.join(' | ')}`);
      }
    }
    records.push({ file: f, slug, fm, register: r });
  } catch (err) {
    malformed.push(err.message);
  }
}

console.log(`\nproject records — ${records.length} read\n`);

const AXES = Object.keys(ENUM_AXES);
const val = (r, k) => String(r.register[k] ?? '').toLowerCase().trim();

/* The collision key is the ENUMERATED axes, not ground and display.
   It used to be `ground | display | image`, and with two of those written as
   prose it could almost never fire: "#090c0d near-black with three darker-green
   steps to" and "near-black #0B0B0D" are the same decision and never match as
   strings. A test that cannot fire is not a safeguard. */
const key = (r) => AXES.map((k) => val(r, k)).join(' | ');

/* "not recorded" is not a value: it must never match itself, on any axis. */
const known = (r, k) => { const v = val(r, k); return v && v !== 'not recorded' ? v : null; };

/* Fully comparable — every axis answered. Only these can produce an exact
   collision, because a total match cannot be claimed over partial data. */
const usable = records.filter((r) => AXES.every((k) => known(r, k)));
const skipped = records.length - usable.length;

/* Partially comparable is still comparable. A record with one unanswered axis
   used to drop out of every test at once, which made the corpus punish honesty:
   "not recorded" is the correct entry for something nobody can recover, and it
   should cost that one axis rather than the whole record. */
const MIN_SHARED = 4;

const groups = new Map();
for (const r of usable) {
  const k = key(r);
  if (!groups.has(k)) groups.set(k, []);
  groups.get(k).push(r);
}

const collisions = [...groups.entries()].filter(([, rs]) => rs.length > 1);

for (const r of records) {
  const parts = [...OPEN_AXES, ...AXES].map((k) => `${k} ${r.register[k] ?? '—'}`);
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
for (const axis of AXES) {
  const counts = new Map();
  for (const r of records) {
    const v = known(r, axis);
    if (!v) continue;
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
  console.log('  test above cannot report it: that test needs every axis to match at');
  console.log('  once. Whether this is a house signature or a habit is a human call.\n');
}

/* ── two projects at a time ────────────────────────────────────────────────
   The collision test needs a total match and the concentration test looks at
   one axis across everything. Neither sees the case in between, which is the
   common one: two projects that are the same decision wearing a different
   colour. TASTE.md §2d puts the bar exactly here — three EXPLORE directions
   must differ STRUCTURALLY, and "three palettes on one layout are one
   direction, not three". This reports the pairs that would fail that test. */
const NEAR = 0.7;

const pairs = [];
for (let i = 0; i < records.length; i++) {
  for (let j = i + 1; j < records.length; j++) {
    const a = records[i];
    const b = records[j];
    /* Compared only where BOTH answered. An unanswered axis is not agreement. */
    const shared = AXES.filter((k) => known(a, k) && known(b, k));
    if (shared.length < MIN_SHARED) continue;
    const same = shared.filter((k) => known(a, k) === known(b, k));
    if (same.length / shared.length >= NEAR) {
      pairs.push({ a, b, shared, same, differ: shared.filter((k) => !same.includes(k)) });
    }
  }
}

if (pairs.length) {
  console.log(`⚠ ${pairs.length} near-identical pair${pairs.length === 1 ? '' : 's'}`
    + ` — ${Math.round(NEAR * 100)}%+ of the axes both answered:\n`);
  for (const p of pairs) {
    console.log(`  ${p.a.slug}  ≈  ${p.b.slug}   (${p.same.length}/${p.shared.length} shared axes)`);
    console.log(`    same:   ${p.same.map((k) => `${k} ${known(p.a, k)}`).join(' · ')}`);
    console.log(`    differ: ${p.differ.length ? p.differ.map((k) => `${k} ${known(p.a, k)}/${known(p.b, k)}`).join(' · ') : '— nothing'}`);
    const clients = [...new Set([p.a.fm.client, p.b.fm.client].map((c) => c ?? 'not recorded'))];
    console.log(`    clients: ${clients.join(', ')}`
      + (clients.length > 1 ? '  ← different clients, near-identical structure' : '  (same client)') + '\n');
  }
  console.log('  Reported, not judged — same contract as everything above. Two briefs');
  console.log('  can legitimately arrive at one structure. They can also be one habit');
  console.log('  applied twice, and only a human can tell which.\n');
}

if (skipped) {
  console.log(`  ${skipped} record${skipped === 1 ? '' : 's'} not fully comparable — register partly "not recorded".`);

  /* Which axes, not just how many. "Fill the register" is not an instruction
     anybody can act on; a named axis with a count is. */
  const gaps = AXES
    .map((k) => ({ axis: k, missing: records.filter((r) => !known(r, k)).length }))
    .filter((g) => g.missing)
    .sort((a, b) => b.missing - a.missing);

  if (gaps.length) {
    console.log(`  unanswered: ${gaps.map((g) => `${g.axis} (${g.missing}/${records.length})`).join(' · ')}`);
  }
  console.log(`  A pair needs ${MIN_SHARED} axes answered on BOTH sides before it can be compared`);
  console.log('  at all. These are questions about a finished build, so they are cheapest\n'
    + '  to answer at close and mostly unrecoverable later.\n');
}

if (malformed.length) {
  console.error('✗ malformed records — the corpus is what makes this check honest:\n');
  malformed.forEach((m) => console.error(`  ${m}`));
  console.error('');
  process.exit(1);
}

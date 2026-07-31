#!/usr/bin/env node
/**
 * Continuous reference ingestion.
 *
 *   npm run review -- <url>          QUICK — capture, find or create, scaffold
 *   npm run review:deep -- <url>     DEEP  — the same, with all nine layers stubbed
 *   npm run review -- <url> --dry-run   inspect and report, write nothing
 *
 * THIS SCRIPT DOES MECHANICS ONLY. URL normalisation, duplicate lookup, capture,
 * shot paths, record scaffolding, the revision sidecar, integrity checks. It never
 * reads meaning out of Alex's comment — a regex cannot tell "шрифтовая пара пока ни
 * туда ни сюда" from a rejection, and guessing wrong writes a false judgement into
 * evidence. The agent fills the semantic fields; this file guarantees they have a
 * correct, deduplicated, honestly-labelled place to go.
 */

import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync, mkdirSync, appendFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const VAULT = dirname(fileURLToPath(import.meta.url));
const SITES = join(VAULT, 'sites.json');
const REVIEWS = join(VAULT, 'reviews');

const argv = process.argv.slice(2);
const DEEP = argv.includes('--deep');
const DRY = argv.includes('--dry-run');
const url = argv.find((a) => /^https?:\/\//i.test(a));

const log = (...a) => console.log(...a);
const die = (m) => { console.error(`\n✗ ${m}\n`); process.exit(1); };

if (!url) die('usage: npm run review -- <url> [--deep] [--dry-run]');

/* ── URL normalisation ─────────────────────────────────────────────────────
   Identity, not prettiness. Two addresses that reach the same page must reduce
   to the same string, and two that do not must never collide. */
const TRACKING = /^(utm_|fbclid$|gclid$|mc_eid$|mc_cid$|igshid$|_hs)/i;

export function normalizeUrl(raw) {
  const u = new URL(raw.trim());
  u.protocol = u.protocol.toLowerCase();
  u.hostname = u.hostname.toLowerCase().replace(/^www\./, '');
  u.hash = '';                                        // fragments are not identity
  for (const key of [...u.searchParams.keys()]) {
    if (TRACKING.test(key)) u.searchParams.delete(key);
  }
  u.search = u.searchParams.toString() ? `?${u.searchParams}` : '';
  /* A trailing slash on a directory-style path is equivalent; on a path with an
     extension it is not, so only the former is stripped. */
  if (u.pathname.length > 1 && u.pathname.endsWith('/') && !/\.[a-z0-9]{2,5}\/$/i.test(u.pathname)) {
    u.pathname = u.pathname.replace(/\/+$/, '');
  }
  return u.toString();
}

const slugify = (u0) => {
  const u = new URL(normalizeUrl(u0));
  return [u.hostname, u.pathname.replace(/^\/|\/$/g, '')]
    .filter(Boolean).join('-').toLowerCase()
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60);
};

/* ── duplicate resolution, in the stated order ─────────────────────────────── */
const sites = JSON.parse(readFileSync(SITES, 'utf8'));
const target = normalizeUrl(url);
const slug = slugify(url);

const exact = sites.find((e) => e.url && safeNorm(e.url) === target);
const slugHit = sites.find((e) => e.id === slug);
function safeNorm(u) { try { return normalizeUrl(u); } catch { return u; } }

log('');
log(`review — ${DEEP ? 'DEEP' : 'QUICK'}${DRY ? ' · dry run, nothing will be written' : ''}`);
log(`  submitted: ${url}`);
log(`  normalised: ${target}`);
log(`  slug: ${slug}`);

let entry = null;
let action = 'create';

if (exact) {
  entry = exact; action = 'update';
  log(`  → exact normalised URL match: updating "${entry.id}"`);
} else if (slugHit) {
  /* Rule 3: a slug collision is not identity. Two different pages can slugify the
     same way, and merging them would destroy one record's evidence. */
  entry = null; action = 'inspect';
  log(`  ! slug collision with "${slugHit.id}" (${slugHit.url})`);
  log('    NOT merging. Same page? run recapture on that id. Different page?');
  log('    give this one a distinct id by hand before capturing.');
} else {
  const t = sites.filter((e) => e.title && e.url && safeNorm(e.url) !== target);
  log(`  → no existing record; will create "${slug}"`);
  log(`    (${t.length} other records checked for a title match after capture)`);
}

/* ── capture, by delegating to the tool that already owns it ───────────────── */
if (action === 'inspect') { log('\nstopped for inspection — nothing captured.\n'); process.exit(2); }

if (!DRY) {
  const args = entry ? ['recapture', entry.id] : ['add', url];
  log(`\ncapturing — vault/capture.mjs ${args.join(' ')}`);
  try {
    execFileSync('node', [join(VAULT, 'capture.mjs'), ...args], { stdio: 'inherit' });
  } catch {
    log('  ! capture reported a problem — the record keeps whatever it had.');
  }
} else {
  log('\n(dry run: capture skipped)');
}

/* ── re-read, then verify the record and its shots ─────────────────────────── */
const after = JSON.parse(readFileSync(SITES, 'utf8'));
const rec = after.find((e) => e.id === (entry ? entry.id : slug));
if (!rec) {
  if (DRY) { log('\n(dry run: no record to inspect yet)\n'); process.exit(0); }
  die(`expected a record "${entry ? entry.id : slug}" after capture, found none`);
}

/* Title collision against a different URL — reported, never merged (rule 4). */
const titleTwins = after.filter((e) => e.id !== rec.id && e.title && rec.title
  && e.title.trim().toLowerCase() === rec.title.trim().toLowerCase());
if (titleTwins.length) {
  log(`\n  ! possible duplicate by title: ${titleTwins.map((e) => e.id).join(', ')}`);
  log('    A title is not identity. Left as separate records for you to judge.');
}

const shotPaths = Object.values(rec.shots ?? {})
  .flatMap((v) => (Array.isArray(v) ? v : [v])).filter((v) => typeof v === 'string' && v);
const missing = shotPaths.filter((p) => !existsSync(join(VAULT, p)));
log('');
log(`record: ${rec.id} · rating ${rec.rating} · ${rec.dialectStatus}`);
log(`  shots: ${shotPaths.length - missing.length}/${shotPaths.length} on disk`
  + (missing.length ? ` — MISSING: ${missing.join(', ')}` : ''));
if (rec.captureError) log(`  capture note: ${rec.captureError}`);
if (action === 'create') {
  log('  rating and dialectStatus are REPOSITORY DEFAULTS awaiting Alex —');
  log('  they are not evidence of taste and must not be read as a judgement.');
} else {
  log('  rating and dialectStatus preserved from the existing record.');
}

/* ── the revision sidecar ──────────────────────────────────────────────────── */
const stamp = new Date().toISOString().replace('T', ' ').slice(0, 16);
const file = join(REVIEWS, `${rec.id}.md`);
const LAYERS = ['composition', 'hierarchy', 'typography', 'colour', 'imagery',
  'spacing / density', 'motion', 'interaction', 'design dialect'];

const header = `# Review history — ${rec.id}

Append-only. \`sites.json\` holds the current state; this file holds how it got
there. Alex's wording is never edited, and agent observations are never merged
into his judgement.

**Layer verdicts are per layer.** A verdict here is never propagated to the whole
record: \`dialectStatus\` stays a whole-record field that only Alex sets.
`;

const block = [
  ``,
  `---`,
  ``,
  `## ${stamp} · ${DEEP ? 'DEEP' : 'QUICK'}`,
  ``,
  `- **submitted:** ${url}`,
  `- **normalised:** ${target}`,
  `- **action:** ${action === 'create' ? 'record created' : 'existing record updated'}`,
  `- **previous rating / dialectStatus:** ${entry ? `${entry.rating} / ${entry.dialectStatus}` : 'n/a — new record, defaults applied'}`,
  `- **capture limitation:** ${rec.captureError ? rec.captureError : '<none observed — or state what the capture does not prove>'}`,
  ``,
  `### Alex's comment — verbatim, never edited`,
  ``,
  `> <paste exactly what Alex wrote, in his language>`,
  ``,
  `### Confirmed changes to the record`,
  ``,
  `- <field: what changed, or "none">`,
  `- **previous works:** <only when it changed>`,
  `- **previous weaknesses:** <only when it changed>`,
  ``,
  `### Layer judgements`,
  ``,
  `| Layer | Observation | Source | Judgement | Evidence limit |`,
  `|---|---|---|---|---|`,
  ...LAYERS.map((l) => `| ${l} | ${DEEP ? '<observation, or not verified>' : '<only if Alex or a direct observation covers it>'} | Alex \\| agent | IN \\| OUT \\| unreviewed \\| contextual | <if any> |`),
  ``,
  `**Judgement rules for this table.** A layer Alex did not mention and the agent did`,
  `not directly verify stays out of the table entirely — an empty row is a claim.`,
  `"not sure", "neutral", "not bad", "ни туда ни сюда" are \`unreviewed\`, never`,
  `forced into IN or OUT. Only \`Source: Alex\` rows with IN or OUT count as evidence`,
  `in distillation.`,
  ``,
].join('\n');

if (DRY) {
  log(`\n(dry run) would ${existsSync(file) ? 'append to' : 'create'} vault/reviews/${rec.id}.md`);
} else {
  mkdirSync(REVIEWS, { recursive: true });
  if (!existsSync(file)) writeFileSync(file, header);
  appendFileSync(file, block);
  log(`\nrevision scaffolded: vault/reviews/${rec.id}.md`);
}

log('');
log('AGENT NOW DOES THE SEMANTIC WORK — this script will not do it:');
log('  · paste Alex\'s comment verbatim into the revision block');
log('  · fill the layer table; mark anything unverified as "not verified"');
log('  · write note / works / weaknesses in sites.json where justified');
log('  · propose rating and dialectStatus; never set them without Alex');
log('  · then: npm run evidence:check');
log('');

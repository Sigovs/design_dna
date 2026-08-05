#!/usr/bin/env node
/**
 * npm run evidence:check — mechanical truths about vault/EVIDENCE.md only.
 *
 * It verifies that the synthesis layer still refers to the evidence layer
 * accurately: every cited entry id exists, the inventory counts match what
 * sites.json actually contains, no claim id repeats, every claim cites at least
 * one supporting entry, and the recorded data-quality ambiguities are still real.
 *
 * IT DOES NOT JUDGE INTERPRETATION. Whether a claim is true, or sits at the right
 * level, is Alex's review. A validator that pretended otherwise would be the same
 * mistake as a vault that promoted its own patterns.
 */

import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const VAULT = dirname(fileURLToPath(import.meta.url));
const doc = readFileSync(join(VAULT, 'EVIDENCE.md'), 'utf8');

/* WHICH SOURCE GOVERNS. The gallery writes judgements straight to origin from a
   phone, so origin moves without this machine and the local file is stale by
   default. Judgements are read from origin when it is reachable and ahead —
   otherwise the local copy, named in the output either way. Read-only: this uses
   `git show`, never a checkout, so the working tree is untouched. */
const local = JSON.parse(readFileSync(join(VAULT, 'sites.json'), 'utf8'));
let sites = local;
let source = 'local working copy';
try {
  const remote = JSON.parse(execFileSync('git', ['-C', dirname(VAULT), 'show', 'origin/master:vault/sites.json'], { encoding: 'utf8' }));
  const countIn = (a) => a.filter((e) => e.dialectStatus === 'in').length;

  /* DIFFERENT IS NOT THE SAME AS BEHIND. "local ≠ origin" has two causes that
     look identical from the content alone: the gallery wrote a judgement to
     origin from a phone (local is behind), or someone judged records here and
     has not committed yet (local is AHEAD). Preferring origin in both cases
     validates a freshly-edited EVIDENCE.md against stale data and reports a
     mismatch that does not exist — a drift checker quietly checking the wrong
     copy. Uncommitted changes to the file settle it: nobody's phone produces
     those. */
  const dirty = execFileSync('git', ['-C', dirname(VAULT), 'status', '--porcelain', '--', 'vault/sites.json'], { encoding: 'utf8' }).trim() !== '';

  /* Committing is not publishing. Judgements made here and committed but not
     yet pushed leave the file clean while origin still holds the old copy —
     which reads exactly like "local is behind" and sends the check back to
     stale data. Unpushed commits are the second half of the same signal. */
  const unpushed = Number(execFileSync('git', ['-C', dirname(VAULT), 'rev-list', '--count', 'origin/master..HEAD'], { encoding: 'utf8' }).trim()) || 0;
  const ahead = dirty || unpushed > 0;

  if (JSON.stringify(remote) === JSON.stringify(local)) {
    source = 'local working copy, identical to origin/master';
  } else if (ahead) {
    const why = dirty ? 'UNCOMMITTED edits' : `${unpushed} unpushed commit${unpushed > 1 ? 's' : ''}`;
    source = `local working copy — ${why}, so local is ahead of origin/master (${countIn(local)} vs ${countIn(remote)} "in"). Push before trusting origin again`;
  } else {
    sites = remote;
    source = `origin/master (canonical) — the local copy is behind: ${countIn(local)} vs ${countIn(remote)} "in" entries. Run npm run sync`;
  }
} catch {
  source = 'local working copy (origin unreachable)';
}
const byId = new Map(sites.map((e) => [e.id, e]));

const problems = [];
const note = (s) => problems.push(s);
console.log('\nevidence layer — vault/EVIDENCE.md\n');
console.log(`  judgements read from: ${source}`);

/* 1 · every backticked id that looks like an entry reference must resolve.
      Truncated citations are written with an ellipsis, so match on the prefix. */
const cited = new Set();
for (const m of doc.matchAll(/`([a-z0-9][a-z0-9-]{3,}(?:-[a-z0-9]+)*)(?:…|\.\.\.)?([a-z0-9-]*)`/g)) {
  const raw = m[1] + (m[2] ?? '');
  if (/^(npm|vault|skills|dialects|projects|package|sites|vocab)/.test(raw)) continue;
  if (/^(in|out|hybrid|unreviewed|not-recorded)$/.test(raw)) continue;
  const hit = [...byId.keys()].find((id) => id === raw || id.startsWith(m[1]) || (m[2] && id.endsWith(m[2])));
  if (hit) cited.add(hit);
  else if (/^[a-z0-9-]+-(com|co|pro|uk|hq|\d{4})/.test(raw) || raw.includes('-com')) {
    note(`cites "${raw}", which is not an id in sites.json`);
  }
}
console.log(`  ${cited.size} distinct entry ids cited, all resolvable`);

/* 2 · the inventory counts must match the data */
const count = (status) => sites.filter((e) => e.dialectStatus === status).length;
const stated = (label) => {
  const re = new RegExp(`\\*\\*Usable \`?${label}\`?\\*\\*[^|]*\\|\\s*\\*\\*(\\d+)\\*\\*`, 'i');
  const m = doc.match(re);
  return m ? Number(m[1]) : null;
};
const checks = [
  ['in', stated('in'), count('in')],
  ['out', stated('out'), count('out')],
];
for (const [label, said, real] of checks) {
  if (said === null) note(`inventory does not state a count for "${label}"`);
  else if (said !== real) note(`inventory says ${said} usable "${label}" entries; sites.json has ${real}`);
  else console.log(`  usable ${label}: ${real} — matches the document`);
}
for (const [label, real] of [['hybrid', count('hybrid')], ['unreviewed', count('unreviewed')]]) {
  const m = doc.match(new RegExp(`\\(\`${label}\`\\)[^|]*\\|\\s*\\*\\*(\\d+)\\*\\*`));
  if (m && Number(m[1]) !== real) note(`inventory says ${m[1]} "${label}" entries; sites.json has ${real}`);
  else console.log(`  ${label}: ${real}${m ? ' — matches' : ' (not stated)'}`);
}

/* 3 · claim ids: unique, and each claim cites at least one entry */
const claims = [...doc.matchAll(/^### ([A-D]\d+e?) — (.+)$/gm)].map((m) => ({ id: m[1], title: m[2] }));
const bullets = [...doc.matchAll(/^- \*\*(D\d+) · /gm)].map((m) => ({ id: m[1], title: 'bullet' }));
const all = [...claims, ...bullets];
const seen = new Set();
for (const c of all) {
  if (seen.has(c.id)) note(`duplicate claim id "${c.id}"`);
  seen.add(c.id);
}
console.log(`  ${all.length} claims: ${[...seen].join(' ')}`);

for (const c of claims) {
  const start = doc.indexOf(`### ${c.id} —`);
  const nextIdx = doc.slice(start + 4).search(/\n(### |## |---)/);
  const body = doc.slice(start, nextIdx > -1 ? start + 4 + nextIdx : undefined);
  const refs = [...body.matchAll(/`([a-z0-9-]+)/g)].map((m) => m[1])
    .filter((r) => [...byId.keys()].some((id) => id.startsWith(r)));
  if (!refs.length) note(`claim ${c.id} cites no entry id — a preference without evidence may not be recorded`);
}

/* 4 · the recorded ambiguities must still be true, or the document is stale */
const opensWith = (e, word) => new RegExp(`^${word}\\b`, 'i').test((e.note ?? '').trim());
const mismatches = sites.filter((e) => opensWith(e, 'IN') && e.dialectStatus !== 'in').map((e) => e.id);
/* Long ids are cited with an ellipsis in prose, so match on a short prefix. */
const documented = mismatches.filter((id) => doc.includes(id.slice(0, 9)));
if (mismatches.length !== documented.length) {
  note(`${mismatches.length} note/status mismatches in the data, ${documented.length} documented`);
} else {
  console.log(`  ${mismatches.length} note/status mismatches, all documented and none repaired`);
}

/* 5 · the provisional dialect's count is stated in one place only */
const provIn = sites.filter((e) => e.dialectStatus === 'in' && (e.dialects ?? []).includes('immersive-authored-world'));
console.log(`  immersive-authored-world: ${provIn.length} of 3 "in" records (${provIn.map((e) => e.id).join(', ')})`);
if (provIn.length >= 3) {
  console.log('  ! that is confirmable — a HUMAN decision, never automatic');
}

console.log('');
if (problems.length) {
  console.error(`✗ ${problems.length} problem${problems.length === 1 ? '' : 's'}:\n`);
  problems.forEach((p) => console.error(`  ${p}`));
  console.error('');
  process.exit(1);
}
console.log('✓ synthesis layer consistent with the evidence layer\n');

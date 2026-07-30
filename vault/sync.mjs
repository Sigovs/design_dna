#!/usr/bin/env node
/**
 * npm run sync — the one command to run before any design work.
 *
 * Answers three questions that otherwise get answered wrongly from memory:
 *   1. Is this copy current? (the gallery writes to origin from a phone, and the
 *      capture Action commits shots back — so origin moves without this machine)
 *   2. What does the vault owe me? (entries without judgement, without tags)
 *   3. Is the distillation overdue? (rules only change when the ritual runs)
 *
 * It fast-forwards when that is safe and REFUSES otherwise: a copy with local
 * commits or local edits is a copy someone worked in, and quietly merging it is
 * how two versions of the taste start to exist.
 */

import { execFileSync } from 'node:child_process';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const VAULT = dirname(fileURLToPath(import.meta.url));
const ROOT = dirname(VAULT);
const git = (...args) => {
  try {
    return execFileSync('git', ['-C', ROOT, ...args], { encoding: 'utf8' }).trim();
  } catch (err) {
    return { error: (err.stderr || err.message || '').split('\n')[0] };
  }
};
const ok = (s) => typeof s === 'string';

console.log('');

/* ── 1 · is this copy current ─────────────────────────────────────────────── */
const branch = git('rev-parse', '--abbrev-ref', 'HEAD');
if (!ok(branch)) {
  console.error(`✗ not a git repository, or git is unavailable — ${branch.error}\n`);
  process.exit(1);
}

const fetched = git('fetch', 'origin', '--quiet');
if (!ok(fetched)) console.log(`  ! could not reach origin (${fetched.error}) — reporting on the local copy only`);

const counts = git('rev-list', '--left-right', '--count', `origin/${branch}...HEAD`);
const [behind, ahead] = ok(counts) ? counts.split(/\s+/).map(Number) : [0, 0];
const dirty = (ok(git('status', '--porcelain')) ? git('status', '--porcelain') : '')
  .split('\n').filter((l) => l.trim() && !l.includes('screenshots/'));

console.log(`copy: ${ROOT}`);
console.log(`branch ${branch} · ${behind} behind · ${ahead} ahead · ${dirty.length} local change${dirty.length === 1 ? '' : 's'}`);

if (behind && !ahead && !dirty.length) {
  const pulled = git('merge', '--ff-only', `origin/${branch}`);
  console.log(ok(pulled)
    ? `✓ fast-forwarded ${behind} commit${behind === 1 ? '' : 's'} — now at ${git('log', '--oneline', '-1')}`
    : `✗ fast-forward failed — ${pulled.error}`);
} else if (behind && (ahead || dirty.length)) {
  /* Deliberate refusal. A merge here would silently create a second version of
     the taste, which is the one failure this repo cannot recover from by revert. */
  console.log(`✗ ${behind} commit${behind === 1 ? '' : 's'} behind, but this copy has`
    + `${ahead ? ` ${ahead} local commit(s)` : ''}${dirty.length ? ` ${dirty.length} uncommitted change(s)` : ''}.`);
  console.log('  NOT merging. Commit or stash first, then: git pull --rebase origin ' + branch);
} else if (ahead) {
  console.log(`· ${ahead} commit${ahead === 1 ? '' : 's'} not pushed — git push origin ${branch}`);
} else {
  console.log('✓ current with origin');
}

/* ── 2 · what the vault owes ──────────────────────────────────────────────── */
const sitesPath = join(VAULT, 'sites.json');
if (!existsSync(sitesPath)) {
  console.log('\nno vault/sites.json — nothing to report\n');
  process.exit(0);
}
const sites = JSON.parse(readFileSync(sitesPath, 'utf8'));
const blank = (t) => !t || !String(t).trim() || String(t).trim().toUpperCase() === 'TODO';
const noJudgement = sites.filter((e) => blank(e.note) && blank(e.works) && blank(e.weaknesses));
const unreviewed = sites.filter((e) => e.dialectStatus === 'unreviewed');
const untagged = sites.filter((e) => !Object.values(e.tags ?? {}).some((v) => (v ?? []).length));
const failed = sites.filter((e) => e.captureError);
const r3 = sites.filter((e) => e.rating === 3);

console.log(`\nvault: ${sites.length} entries · ${r3.length} rated 3 · ${unreviewed.length} needing judgement`);
const line = (label, list) => {
  if (!list.length) return;
  console.log(`  ${String(list.length).padStart(2)} ${label}: ${list.map((e) => e.id).join(', ')}`);
};
line('no judgement written (tags only — unusable in a Design Read)', noJudgement);
line('no tags (invisible to every filter)', untagged);
line('needing a dialect call', unreviewed);
line('with a recorded capture failure', failed);

/* Free additions used once can never group anything — they are notes, not tags.
   The 2026-07-30 distillation found 122 of them and promoted none. */
const vocab = JSON.parse(readFileSync(join(VAULT, 'vocab.json'), 'utf8'));
const listOf = (c) => (Array.isArray(vocab.categories[c]) ? vocab.categories[c] : vocab.categories[c].tags ?? []);
const known = new Set(Object.keys(vocab.categories).flatMap((c) => listOf(c).map((t) => `${c}:${t}`)));
const freq = new Map();
for (const e of sites) {
  for (const [cat, tags] of Object.entries(e.tags ?? {})) {
    for (const t of tags ?? []) {
      const k = `${cat}:${t}`;
      if (!known.has(k)) freq.set(k, (freq.get(k) ?? 0) + 1);
    }
  }
}
const promotable = [...freq.entries()].filter(([, n]) => n >= 3);
const singles = [...freq.values()].filter((n) => n === 1).length;
console.log(`  free-addition tags: ${freq.size} (${singles} used once, ${promotable.length} at the 3× promotion threshold)`);
if (promotable.length) promotable.forEach(([k, n]) => console.log(`     ${n}×  ${k}  → promote into vocab.json`));

/* ── 3 · is the ritual overdue ────────────────────────────────────────────── */
const readme = readFileSync(join(VAULT, 'README.md'), 'utf8');
const runs = [...readme.matchAll(/^### (\d{4}-\d{2}-\d{2})/gm)].map((m) => m[1]).sort();
const last = runs.at(-1);
const added = sites.map((e) => e.added).filter(Boolean).sort();
const newest = added.at(-1);

console.log('');
if (!last) {
  console.log('distillation: never run — the vault has produced no rules yet');
} else {
  const since = sites.filter((e) => e.added > last);
  console.log(`distillation: last run ${last} · ${since.length} entr${since.length === 1 ? 'y' : 'ies'} added since`);
  if (since.length >= 3) {
    console.log('  → 3 or more new entries: a pattern can now clear the threshold. Run the ritual');
    console.log('    (the prompt is in vault/README.md → "The distillation prompt")');
  }
}
console.log(`newest entry: ${newest ?? 'none'}`);

console.log('\nnext:');
if (noJudgement.length) console.log('  · write the missing notes first — a shot without a note is a mood board');
if (unreviewed.length) console.log('  · make the dialect calls in the gallery (never set automatically)');
console.log('  · npm run vault        open the gallery');
console.log('  · npm run smoke        before committing anything in vault/index.html');
console.log('  · npm run projects:check   register collisions across your own projects\n');

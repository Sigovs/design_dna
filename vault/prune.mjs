#!/usr/bin/env node
/**
 * Delete shot directories that no entry in sites.json points at any more.
 *
 *   npm run prune            list what would go (no changes)
 *   npm run prune -- --yes   actually delete them
 *
 * Needed because removing an entry through the download-json fallback leaves its
 * shots directory behind — the browser can edit sites.json but cannot touch the
 * working tree. Removal through Save to GitHub deletes both in one commit and
 * leaves nothing for this to do.
 *
 * Deleting here is safe: every shot stays in git history. Removal is a commit,
 * recovery is a revert.
 */

import { readFile, rm } from 'node:fs/promises';
import { existsSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const VAULT = dirname(fileURLToPath(import.meta.url));
const SHOTS = join(VAULT, 'shots');
const APPLY = process.argv.slice(2).includes('--yes');

if (!existsSync(SHOTS)) {
  console.log('no vault/shots directory — nothing to prune');
  process.exit(0);
}

const entries = JSON.parse(await readFile(join(VAULT, 'sites.json'), 'utf8'));
const liveIds = new Set(entries.map((e) => e.id));
const referenced = new Set(
  entries.flatMap((e) => Object.values(e.shots ?? {}).filter(Boolean))
);

const dirs = readdirSync(SHOTS, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

/* Orphan = no entry with that id, and nothing referencing a file inside it.
   Both tests, so an entry whose shots are momentarily null (added from a phone,
   awaiting the capture Action) is never pruned out from under itself. */
const orphans = dirs.filter((dir) =>
  !liveIds.has(dir) && ![...referenced].some((rel) => rel.startsWith(`shots/${dir}/`))
);

if (!orphans.length) {
  console.log(`${dirs.length} shot director${dirs.length === 1 ? 'y' : 'ies'}, all referenced — nothing to prune`);
  process.exit(0);
}

console.log(`${orphans.length} orphaned shot director${orphans.length === 1 ? 'y' : 'ies'}:`);
for (const dir of orphans) console.log(`  · vault/shots/${dir}`);

if (!APPLY) {
  console.log('\nnothing deleted. Re-run with --yes to delete:');
  console.log('  npm run prune -- --yes');
  process.exit(0);
}

for (const dir of orphans) {
  await rm(join(SHOTS, dir), { recursive: true, force: true });
  console.log(`  removed vault/shots/${dir}`);
}
console.log(`\n✓ pruned ${orphans.length}. Commit the deletion — history keeps the images.`);

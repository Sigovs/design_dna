#!/usr/bin/env node
// npm run setup -- <path-to-project> ["Project Name"]
//
// Scaffolds a project that builds against this design system. It writes three
// files and never overwrites one that already exists.
//
// It deliberately copies NO rule file. TASTE.md, the skills and the build
// standard are resolved live from this working copy, because a copied rule file
// is a snapshot: it ages silently and there is no way to update it in place.
// That is the same reasoning as skills/design-dna Step 1.

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, join, basename } from 'node:path';
import { homedir } from 'node:os';

const DNA_ROOT = dirname(fileURLToPath(import.meta.url));
const REPO_URL = 'https://github.com/Sigovs/design_dna';

const STACK = [
  ['frontend-design@claude-plugins-official', 'anthropics/claude-plugins-official', 'base visual taste'],
  ['nateherk-design@nateherk', 'nateherkai/scroll-craft', 'scroll storytelling (Scrollcraft)'],
  ['threejs-webgl@claude-design-skillstack', 'freshtechbro/claudedesignskills', 'Three.js / WebGL technique'],
  ['gsap-scrolltrigger@claude-design-skillstack', 'freshtechbro/claudedesignskills', 'GSAP / ScrollTrigger technique'],
];

const [, , targetArg, nameArg] = process.argv;

if (!targetArg) {
  console.error('usage: npm run setup -- <path-to-project> ["Project Name"]');
  process.exit(1);
}

const target = resolve(process.cwd(), targetArg);
const name = nameArg || basename(target);

// ── sanity: this working copy has to be the real thing ────────────────────
for (const required of ['TASTE.md', join('.claude', 'rules', 'design-dna.md')]) {
  if (!existsSync(join(DNA_ROOT, required))) {
    console.error(`this does not look like the design_dna working copy — ${required} is missing at ${DNA_ROOT}`);
    process.exit(1);
  }
}

if (!existsSync(target)) mkdirSync(target, { recursive: true });

// ── the files ─────────────────────────────────────────────────────────────
const CLAUDE_MD = `# ${name}

> Built to Alex's design system. The rules are **not vendored here** — they are
> resolved live, so this project never drifts from a stale copy.

# DESIGN DNA

**Read before producing anything visual** — a page, a component, a scene, CSS,
tokens, an image — and before any art direction, palette, type scale, spacing
ramp, motion or composition decision.

1. \`${join(DNA_ROOT, 'TASTE.md')}\`
   — the manifest: operating rules, the two tiers, the Design Read, the dialect index.
2. \`${join(DNA_ROOT, '.claude', 'rules', 'design-dna.md')}\`
   — the build standard, \`DNA1\`–\`DNA89\`.
3. \`${join(DNA_ROOT, 'skills')}\` — load the skills the task actually touches.
4. Fallback if this machine has no working copy: ${REPO_URL}

**Say which path resolved, in one line, at the top of the report.**

## For scroll-driven or cinematic work

Load the **\`scroll-site\`** skill first. It carries the stack, the scaffold, the
concept gate and the definition of done.

## The concept gate

**\`BRIEF.md\` is complete before the first line of markup (\`DNA1\`).** An empty
section in it is an unfinished gate, not a detail to fill in later.

## Order of authority

1. Truth and access — contrast, provenance, reduced motion, discoverability.
2. \`TASTE.md\` and the INVARIANT tier of the skills.
3. The build standard, \`DNA1\`–\`DNA89\`.
4. The selected dialect, and this project's own direction below.
5. Plugins — \`frontend-design\`, Scrollcraft, \`threejs-webgl\`,
   \`gsap-scrolltrigger\`. **Reference only. They bind nothing** and are never the
   reason for a design decision. Neither is a library name.

## Working style

Never ask yes/no or confirmation questions to resolve taste — make the senior
call and note it in the report. Questions about **facts** — scope, content,
constraints, contradictions, missing assets — are expected. Three at most.

## Project direction

_A project direction is a brief executed inside the invariants, never instead of
them. Write it here: the business goal, the audience, what must not change._

TODO
`;

const BRIEF_MD = `# BRIEF — ${name}

The concept gate. **No markup exists before this file does (\`DNA1\`).** An empty
section is an unfinished gate.

---

## 1. Design Read

- **Deliverable / audience / family** —
- **Mandate** — REBRAND / REDESIGN / REFRESH (unstated defaults to REDESIGN)
- **Dialect** —
- **Dimensionality role** — MAIN / SUPPORT / ABSENT

The family is nameable and specific (\`DNA2\`). A library name is not a family.

## 2. The concept

_One sentence: what this page **is**, not what it contains._

## 3. The feeling curve (\`DNA29\`)

Emotion first, the thing on screen that causes it second. Two adjacent acts with
the same feeling means one of them is filler.

| # | Feeling | Caused by |
|---|---|---|
| 1 | | |
| 2 | | |
| 3 | | |

## 4. The peak (\`DNA28\`)

_The sentence a visitor would say to a friend. One per page. It gets the asset
budget, the silence in front of it, and the most scroll room._

## 5. Page grammar (\`DNA36\`)

_Filmic one-shot · chaptered editorial · live surface · continuous world ·
typographic poster · gallery · split stage · rhythmic cutlist · or a named new one._

**How it differs from the last build:**

## 6. The signature move (\`DNA37\`)

_One bespoke interaction, in a phrase. A parameter change to a known device is
not one._

## 7. Shot list (\`DNA27\`, \`DNA50\`)

Each act names its shot before its device.

| Act | Shot | Device | Viewport-heights |
|---|---|---|---|
| 1 | | | |
| 2 | | | |

## 8. Mobile shot list (\`DNA67\`, \`MJ8\`)

_Authored separately. Fewer acts, different devices, or no 3D at all._

## 9. Budget (\`DNA38\`, \`DNA72\`, \`DM3\`)

- Total viewport-heights —
- Total payload —
- Largest single asset —
- Frame budget —
- LCP target —

## 10. Assets (\`GI3\`, \`GI6\`)

_Real, licensed, or generated. Generated assets depict nothing real and carry
provenance._

## 11. Claims ledger (\`CP1\`)

Every claim-shaped string — price, count, date, duration, guarantee, coverage,
superlative — with its source.

| Claim | Source | Date |
|---|---|---|
| | | |

## 12. Reference (\`DNA3\`)

_If a storyboard or reference image exists, it lives here and it is the primary
visual authority for composition, scale, lighting, spacing and hierarchy. It never
overrides contrast, the type floor, or provenance._
`;

const GITIGNORE = `node_modules/
dist/
build/
.cache/
*.log
.env
.env.*
.DS_Store
Thumbs.db
`;

// ── write ─────────────────────────────────────────────────────────────────
const written = [], skipped = [];

for (const [file, body] of [['CLAUDE.md', CLAUDE_MD], ['BRIEF.md', BRIEF_MD], ['.gitignore', GITIGNORE]]) {
  const path = join(target, file);
  if (existsSync(path)) { skipped.push(file); continue; }
  writeFileSync(path, body, 'utf8');
  written.push(file);
}

// ── plugin check ──────────────────────────────────────────────────────────
function userScopedPlugins() {
  const manifest = join(homedir(), '.claude', 'plugins', 'installed_plugins.json');
  if (!existsSync(manifest)) return null;
  try {
    const json = JSON.parse(readFileSync(manifest, 'utf8'));
    return new Set(
      Object.entries(json.plugins || {})
        .filter(([, entries]) => (entries || []).some((e) => e.scope === 'user'))
        .map(([id]) => id)
    );
  } catch { return null; }
}

const installed = userScopedPlugins();
const missing = installed ? STACK.filter(([id]) => !installed.has(id)) : STACK;

// ── report ────────────────────────────────────────────────────────────────
console.log(`\ndesign system : ${DNA_ROOT}`);
console.log(`project       : ${target}\n`);
console.log(`written : ${written.join(', ') || '(nothing — all three already existed)'}`);
if (skipped.length) console.log(`kept    : ${skipped.join(', ')} — already present, left untouched`);

console.log('\nplugin stack (user scope):');
if (!installed) {
  console.log('  could not read the plugin manifest — check the four by hand');
} else {
  for (const [id, , what] of STACK) {
    console.log(`  ${installed.has(id) ? 'ok     ' : 'MISSING'}  ${id.padEnd(44)} ${what}`);
  }
}

if (missing.length) {
  console.log('\ninstall the missing ones:');
  for (const market of [...new Set(missing.map(([, m]) => m))]) console.log(`  /plugin marketplace add ${market}`);
  for (const [id] of missing) console.log(`  /plugin install ${id}`);
}

console.log(`
next:
  1. fill in BRIEF.md — it is the concept gate, and no markup exists before it does
  2. write the project direction at the bottom of CLAUDE.md
  3. load the scroll-site skill and build the static page first
`);

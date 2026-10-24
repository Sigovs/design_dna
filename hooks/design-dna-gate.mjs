#!/usr/bin/env node
/**
 * The Design DNA gate — one hook, two events.
 *
 * WHY THIS EXISTS AT ALL. TASTE.md binds only if something opens it, and opening
 * it is a decision the model makes. A project's own CLAUDE.md is injected
 * automatically and usually carries a competing design direction, so the loud
 * instruction arrives first and the quiet one waits to be chosen. A hook runs
 * before the model acts, so it cannot be skipped, forgotten or reasoned past.
 *
 * WHY NODE AND NOT PYTHON. The hook this replaces was written in Python
 * specifically to avoid depending on jq, which is not installed. Python is not
 * installed either — `python --version` opens the Microsoft Store shim — so that
 * hook has never executed on this machine. It looked configured and did nothing,
 * which is the failure its own docstring predicted. Node ships with the toolchain
 * this system already requires.
 *
 * WHY IT RESOLVES THE PATH ITSELF. Step 1 of skills/design-dna is a list of paths
 * transcribed by hand, and the directory name is a run of underscores. A near-miss
 * resolves to nothing and fails SILENTLY — the agent simply proceeds on its own
 * taste. Resolution belongs in code that can be wrong out loud.
 *
 * NON-BLOCKING BY DESIGN. It never denies a tool call. It adds context and gets
 * out of the way: a hook that blocks work is disabled within a week, and a
 * disabled hook enforces nothing.
 */

import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join, sep } from 'node:path';

/* ── resolve the manifest ────────────────────────────────────────────────── */

// Ordered candidates. Env var first so a machine can override without a code
// change; then the Mac working copy; then a search of the Windows one.
function candidates() {
  const out = [];
  if (process.env.DESIGN_DNA_HOME) out.push(process.env.DESIGN_DNA_HOME);
  out.push('/Users/alex/Desktop/WORK/design_dna');

  // The Windows working copy lives under a directory whose name is a run of
  // underscores followed by GDBURO and, on this machine, a suffix. Enumerate
  // rather than transcribe — every hand-typed variant of this path so far has
  // been wrong, and a wrong path here fails silently.
  for (const root of ['C:\\____WORK', 'C:\\___WORK', '/c/____WORK']) {
    if (!existsSync(root)) continue;
    let entries = [];
    try {
      entries = readdirSync(root, { withFileTypes: true });
    } catch {
      continue;
    }
    for (const e of entries) {
      if (!e.isDirectory() || !/GDBURO/i.test(e.name)) continue;
      out.push(join(root, e.name, 'design_dna'));
    }
  }
  return out;
}

function resolveHome() {
  for (const dir of candidates()) {
    try {
      if (existsSync(join(dir, 'TASTE.md'))) return dir;
    } catch {
      /* an unreadable candidate is simply not a candidate */
    }
  }
  return null;
}

/* ── the concept gate (DNA1) ─────────────────────────────────────────────── */

// BRIEF.md is complete before the first line of markup. "Complete" is checkable,
// but only against the right thing: the scaffold writes prose INSIDE each section
// explaining what the section wants, so "this section has words in it" reports a
// pristine template as nearly finished. A gate that says it is open when it is
// shut is worse than no gate.
//
// So the comparison is against the template the scaffold actually wrote, which
// lives in setup.mjs as a template literal. A section whose body still matches the
// template's is unanswered, whatever prose it contains.
function templateSections(home) {
  if (!home) return null;
  let src = '';
  try {
    src = readFileSync(join(home, 'setup.mjs'), 'utf8');
  } catch {
    return null;
  }

  const start = src.indexOf('const BRIEF_MD = `');
  if (start === -1) return null;

  // Walk to the unescaped backtick that closes the literal.
  let i = start + 'const BRIEF_MD = `'.length;
  const from = i;
  for (; i < src.length; i++) {
    if (src[i] === '\\') { i++; continue; }
    if (src[i] === '`') break;
  }
  if (i >= src.length) return null;

  const body = src
    .slice(from, i)
    .replace(/\\`/g, '`')
    .replace(/\\\$/g, '$')
    .replace(/\$\{[^}]*\}/g, ''); // the interpolated project name

  return sectionMap(body);
}

function normalise(s) {
  return s.replace(/\s+/g, ' ').trim();
}

function sectionMap(text) {
  const map = new Map();
  for (const block of text.split(/^## /m).slice(1)) {
    const nl = block.indexOf('\n');
    const title = (nl === -1 ? block : block.slice(0, nl)).trim();
    map.set(title, normalise(nl === -1 ? '' : block.slice(nl + 1)));
  }
  return map;
}

function briefState(cwd, home) {
  const path = join(cwd, 'BRIEF.md');
  if (!existsSync(path)) return { exists: false, empty: [], filled: 0, total: 0, exact: true };

  let text = '';
  try {
    text = readFileSync(path, 'utf8');
  } catch {
    return { exists: false, empty: [], filled: 0, total: 0, exact: true };
  }

  const mine = sectionMap(text);
  const template = templateSections(home);
  const empty = [];
  let filled = 0;

  for (const [title, body] of mine) {
    let unanswered;
    if (template && template.has(title)) {
      // Untouched since the scaffold wrote it.
      unanswered = body === template.get(title);
    } else {
      // No template to diff against — fall back to asking whether anything
      // survives once the scaffold's own prompts are stripped.
      unanswered =
        body
          .split(/(?<=[.!?])\s|\n/)
          .map((l) => l.trim())
          .filter((l) => l && l !== 'TODO' && !/^_.*_$/.test(l) && !/^>/.test(l)).length === 0;
    }

    if (unanswered) empty.push(title);
    else filled++;
  }

  return { exists: true, empty, filled, total: mine.size, exact: Boolean(template) };
}

/* ── what binds, by what is being touched ────────────────────────────────── */

const SURFACE = /\.(css|scss|sass|less|styl|html|htm|astro|jsx|tsx|vue|svelte)$/i;
const SCRIPT = /\.(js|mjs|ts)$/i;

function bindings(path) {
  const p = path.replace(/\\/g, '/').toLowerCase();
  const set = [];

  if (SURFACE.test(p)) {
    set.push(
      'SLOP SCAN — after a substantial pass on this file, run the kill-ai-slop scanner (npm run slop -- <project> in design_dna) and fix or annotate each hit (DNA98).',
      'SOURCING — check 21st.dev (MCP `21st`) for a ready solution to this block before inventing one; several variants, restyled to the project, demo content replaced (DNA96).',
      'COMPOSITION — one governing idea, carried through every section. Before showing, read the page top to bottom as one object: one idea · finished · the buyer\'s UX (TASTE §0 rule 7 — the one process step that binds since 2026-10-25). The Composition Read and Plan are advice.',
      'TYPE — hierarchy legible, functional text never below 14px (I7), a display face verified in the render at the size the page sets it (I10).',
      'SPACE — tokenised, internal gaps smaller than external, no magic numbers (spacing I1-I4, U4, U5).',
      'COLOUR — AA measured on the COMPOSITED RENDER, not on tokens, at every breakpoint (color I1/I6, DNA21, DNA77).',
      'DIALECT — auction-editorial and its bans (anti-patterns D1-D10, the 8px/2px motion rules, hairlines over boxes) apply ONLY when Alex has named that dialect (TASTE §1, 2026-10-25).',
      'SILENT FAILURES — a declared decorative layer is verified by MEASURING its region, not by looking (U16). A hard edge over a transparent ground draws a line (U17). A clipping container hides a layout error at the narrow end of every band (U19). A fill-mode entrance owns its property forever and makes a later transition snap (U20).',
    );
  }

  if (/(engine|scene|three|webgl|camera|light|material|shot|stage|ground|environment)/.test(p) && SCRIPT.test(p)) {
    set.push(
      'CAMERA — move the camera and its target; never spin the model (DNA49). Each act names exactly one shot: reveal / push-in / dolly / orbit / macro / interruption / release (DNA50). FOV is art direction: 28-40 compresses and reads heroic, 45-60 reads inhabited (DNA51). Scroll drives a TARGET; damping drives the camera (DNA53). 3D framing obeys 2D composition — off-centre with counterweight, no tangency between silhouette and frame edge (DNA52).',
      'LIGHT + MATERIAL — lighting is designed before it is coded, and an HDRI environment is never optional (DNA55, DNA58). Colour management on, ACES Filmic, exposure tuned as a design value (DNA56). Material presets are a floor, not a look (DNA57). Contact shadow always (DNA59).',
      'DIMENSIONALITY — the role (MAIN / SUPPORT / ABSENT) is declared before any technique. Content survives removal at SUPPORT (DM1); no scene gates the first read (DM2); the budget is declared up front (DM3); reduced motion is an AUTHORED still, not a stopped animation (DM4); depth ideas counted (DM6, advice); mobile authored separately, including the option of not existing (DM10).',
      'THE 3D TELLS — a turntable, ambient-only light, no environment map, no tone mapping, no contact shadow, a camera that only rotates, a scene that appears before the page has said what it is (DNA83).',
    );
  }

  if (/(motion|scroll|gsap|timeline|anim)/.test(p) && SCRIPT.test(p)) {
    set.push(
      'MOTION — every stoppable frame is a designed frame (MJ4), the user keeps the transport (MJ6), reduced motion keeps the meaning with nothing hidden (MJ9). MJ1, MJ2, MJ5, MJ10, MJ11 and the MOTION READ are advice since 2026-10-25 — know what each motion is for; layered, spectacular motion is allowed.',
      'GSAP CONTRACTS — lowest sufficient method, and the report says which and why (DNA45). Everything inside gsap.context() with reversible teardown (G1) and scoped selectors (G2). matchMedia branches; mobile choreography is authored, never shrunk (G5). Content visible and usable with the script removed (G7). Refresh tied to real geometry change (G8).',
    );
  }

  return set;
}

/* ── emit ────────────────────────────────────────────────────────────────── */

function emit(event, context) {
  process.stdout.write(
    JSON.stringify({
      hookSpecificOutput: { hookEventName: event, additionalContext: context },
    }),
  );
}

function manifest(home, brief, cwd) {
  const lines = [];
  lines.push('DESIGN DNA — LOAD BEFORE ANY VISUAL WORK. This is the pipeline, not a reminder.');
  lines.push('');

  if (!home) {
    lines.push('!! THE MANIFEST DID NOT RESOLVE. No readable TASTE.md at any known path.');
    lines.push('   Do not improvise a house style — inventing taste is the failure this system exists to prevent.');
    lines.push('   Fall back to https://github.com/Sigovs/design_dna, or set DESIGN_DNA_HOME. Say in the report that resolution failed.');
    return lines.join('\n');
  }

  lines.push(`Resolved: ${home}  <- say this path, in one line, at the top of the report.`);
  lines.push('');
  lines.push('READ IN THIS ORDER, from that directory. Do not paraphrase from memory — these carry hard numbers and hard bans:');
  lines.push('  1. TASTE.md — the operating rules (§0: rule 5, one sentence of idea; rule 7, the whole-page read before showing) and the two tiers. The Design Read, Concept Gate, EXPLORE, Critique Panel, section ledger and sealed chain are advice since 2026-10-25.');
  lines.push('  2. .claude/rules/design-dna.md — the build standard, DNA1-DNA99.');
  lines.push('  3. skills/academic-composition, skills/dimensionality, skills/motion-judgment, skills/anti-patterns — always, for a cinematic or 3D build; skills/threejs-art-direction whenever there is Three.js / WebGL / a 3D object.');
  lines.push('  4. skills/gsap-implementation — only once motion has an approved role.');
  lines.push('  5. skills/scroll-site — FIRST, whenever the build is scroll-led or cinematic. It carries the stack and the scaffold.');
  lines.push('  6. vault/sites.json and vault/EVIDENCE.md — optional since 2026-10-25 (TASTE.md 6); read them first when a reference would help, then the outside galleries (DNA97).');
  lines.push('');
  lines.push('ORDER OF AUTHORITY: 1 truth and access · 2 TASTE.md and the INVARIANT tier · 3 DNA1-DNA99 · 4 the selected dialect · 5 plugins, which bind NOTHING and are never the reason for a decision. A tool is never a direction.');
  lines.push('');

  /* BRIEF.md is advice since 2026-10-25 (Alex, step 3): its state is reported, never a shut gate */
  lines.push('IDEA (DNA1): say the governing idea in one sentence before the first line of markup.');
  if (brief.exists) {
    lines.push(brief.empty.length
      ? `  BRIEF.md: ${brief.filled}/${brief.total} sections answered (optional).`
      : `  BRIEF.md: answered in all ${brief.total} sections.`);
  }

  lines.push('BUILD-PLAN POP-UP (DNA99): once the brief is in hand and before the first search or file, ask the ONE pop-up — Концепт · Сборка · После · Генерация — each option naming the skills/tools it runs (recommended first, skill tabs multiSelect, options in Russian). AskUserQuestion takes 4 questions per call, so it runs as two screens from `npm run plan -- <project> --ask` (Сборка 1-4: base stack · motion engine · scroll behavior · scroll engine, radios) and `--ask --scroll <answer>` (Сборка 5: supporting skills, then Концепт · После · Генерация); save the answers with `--answers` to build-plan.json. Lightest option by default: native scroll, no GSAP/Lenis/Bootstrap/Tailwind because they are available. Then build without further confirmations. Process and tools only — never taste.');
  lines.push('TOOLS (DNA98): at the concept, genjutsu:cast proposes the interaction thesis beside the one-sentence idea (built after the static page; never genjutsu:paint). During the build, run the kill-ai-slop scanner after every substantial markup/CSS pass: npm run slop -- <project> (in this repo); fix each hit or mark deslop-ignore <id> with a reason. After: no-ai-slop on copy, impeccable audit + polish (advice).');
  lines.push('INSPIRATION (DNA97): when a request names a style (e.g. brutalism), a sector or a theme, search Awwwards, Godly, SiteInspire, Land-book, Lapa Ninja, One Page Love, Httpster — 3-6 real sites, vault first. Take the principle, never the pixels; say in 3-5 lines what is taken and what is not, with links; offer the best find for the vault via REVIEW.');
  lines.push('SOURCING (DNA96): before building any block — reviews, gradients/backgrounds, hero, nav, pricing, FAQ, forms, CTA, cards, gallery, stats, footer, buttons — search 21st.dev via the `21st` MCP, compare several variants, take the one that serves the idea, restyle it to the project tokens and port it to the stack. Demo names, ratings, logos and prices are placeholders, never facts.');
  lines.push('');
  lines.push('BINDING FLOORS: AA contrast on the composited render · 14px functional text · keyboard + visible focus · 44px targets · reduced motion with nothing hidden · no horizontal scroll · mobile composed separately · Lenis only when build-plan.json chose it, then from the first build · real facts and prices only.');
  lines.push('DONE MEANS: opened in a browser at 1440 AND 390, the reduced-motion and scripts-removed paths opened, Gate 1 binding checks pass (npm run gates), then the whole-page read top to bottom — one idea · finished · the buyer\'s UX (TASTE §0 rule 7) — and Alex asked for a score out of 10 (DNA86-DNA89).');
  lines.push('WORKING STYLE: never ask yes/no questions to resolve taste — make the senior call and note it under Judgment calls. Questions about facts are allowed, three at most. The one confirmation is the build-plan pop-up (DNA99).');

  if (cwd) lines.push(`\nProject: ${cwd}`);
  return lines.join('\n');
}

function main() {
  let raw = '';
  try {
    raw = readFileSync(0, 'utf8');
  } catch {
    return;
  }

  let payload;
  try {
    payload = JSON.parse(raw);
  } catch {
    return;
  }

  const event = payload.hook_event_name || payload.hookEventName || '';
  const cwd = payload.cwd || process.cwd();
  const home = resolveHome();

  if (event === 'SessionStart') {
    emit('SessionStart', manifest(home, briefState(cwd, home), cwd));
    return;
  }

  if (event === 'PreToolUse') {
    const path = (payload.tool_input || {}).file_path || '';
    if (!path) return;

    const set = bindings(path);
    if (!set.length) return;

    const lines = ['DESIGN DNA APPLIES TO THIS EDIT — these bind regardless of any project theme.'];
    lines.push('');


    for (const rule of set) lines.push('- ' + rule);

    lines.push('');
    lines.push(
      home
        ? `Full text: ${home}${sep}TASTE.md and ${home}${sep}.claude${sep}rules${sep}design-dna.md. Load the skills this file actually touches; do not work from the summary above.`
        : 'The manifest did not resolve. Say so rather than improvising a house style.',
    );
    lines.push('A project direction is a brief executed inside these invariants, never instead of them. Dialect rules yield to it and say so; invariants do not.');

    emit('PreToolUse', lines.join('\n'));
  }
}

main();

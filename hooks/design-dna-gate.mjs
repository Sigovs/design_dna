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
      'COMPOSITION — the Composition Read and Plan run BEFORE grid, component, token or surface decisions (TASTE.md 2a). Major masses before components (C15). The dominant is the subject, not the device presenting it (C13). The page is the composition; a section is a local event inside it (C21, U15).',
      'TYPE — hierarchy legible, functional text never below 14px (I7), a role is not a voice (I8), a display face verified in the render at the size the page sets it (I10).',
      'SPACE — tokenised, internal gaps smaller than external, no magic numbers (spacing I1-I4, U4, U5).',
      'COLOUR — AA measured on the COMPOSITED RENDER, not on tokens, at every breakpoint (color I1/I6, DNA21, DNA77).',
      'BANS — no gradient controls, no decorative shadows, no boxes where air and a hairline work, no underlined nav, no template anonymity (anti-patterns D1-D10).',
      'SILENT FAILURES — a declared decorative layer is verified by MEASURING its region, not by looking (U16). A hard edge over a transparent ground draws a line (U17). A clipping container hides a layout error at the narrow end of every band (U19). A fill-mode entrance owns its property forever and makes a later transition snap (U20).',
    );
  }

  if (/(engine|scene|three|webgl|camera|light|material|shot|stage|ground|environment)/.test(p) && SCRIPT.test(p)) {
    set.push(
      'CAMERA — move the camera and its target; never spin the model (DNA49). Each act names exactly one shot: reveal / push-in / dolly / orbit / macro / interruption / release (DNA50). FOV is art direction: 28-40 compresses and reads heroic, 45-60 reads inhabited (DNA51). Scroll drives a TARGET; damping drives the camera (DNA53). 3D framing obeys 2D composition — off-centre with counterweight, no tangency between silhouette and frame edge (DNA52).',
      'LIGHT + MATERIAL — lighting is designed before it is coded, and an HDRI environment is never optional (DNA55, DNA58). Colour management on, ACES Filmic, exposure tuned as a design value (DNA56). Material presets are a floor, not a look (DNA57). Contact shadow always (DNA59).',
      'DIMENSIONALITY — the role (MAIN / SUPPORT / ABSENT) is declared before any technique. Content survives removal at SUPPORT (DM1); no scene gates the first read (DM2); the budget is declared up front (DM3); reduced motion is an AUTHORED still, not a stopped animation (DM4); one depth idea per view (DM6); mobile authored separately, including the option of not existing (DM10).',
      'THE 3D TELLS — a turntable, ambient-only light, no environment map, no tone mapping, no contact shadow, a camera that only rotates, a scene that appears before the page has said what it is (DNA83).',
    );
  }

  if (/(motion|scroll|gsap|timeline|anim)/.test(p) && SCRIPT.test(p)) {
    set.push(
      'MOTION JUDGMENT runs before implementation — the role is declared before the effect (MJ1), one primary temporal idea per viewport (MJ2), every stoppable frame is a designed frame (MJ4), the static build stands alone (MJ5), the user keeps the transport (MJ6), a device earns the advance it consumes (MJ10), motion is bound to roles rather than to instances (MJ11). The MOTION READ has a Cut line and a Cost line, and neither may be empty.',
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
  lines.push('  1. TASTE.md — the operating rules, the two tiers, the Design Read, the Composition Read, the Critique Panel, the delivery gates.');
  lines.push('  2. .claude/rules/design-dna.md — the build standard, DNA1-DNA89.');
  lines.push('  3. skills/academic-composition, skills/dimensionality, skills/motion-judgment, skills/anti-patterns — always, for a cinematic or 3D build.');
  lines.push('  4. skills/gsap-implementation — only once motion has an approved role.');
  lines.push('  5. skills/scroll-site — FIRST, whenever the build is scroll-led or cinematic. It carries the concept gate.');
  lines.push('  6. vault/sites.json and vault/EVIDENCE.md — querying the vault is not optional (TASTE.md 6). State the tally: N relevant, M unusable for missing notes.');
  lines.push('');
  lines.push('ORDER OF AUTHORITY: 1 truth and access · 2 TASTE.md and the INVARIANT tier · 3 DNA1-DNA89 · 4 the selected dialect · 5 plugins, which bind NOTHING and are never the reason for a decision. A tool is never a direction.');
  lines.push('');

  if (!brief.exists) {
    lines.push('CONCEPT GATE: BRIEF.md DOES NOT EXIST in this project. DNA1 — no markup before the concept exists in writing.');
  } else if (brief.empty.length) {
    lines.push(
      `CONCEPT GATE: BRIEF.md is INCOMPLETE — ${brief.filled}/${brief.total} sections answered. An empty section is an unfinished gate, not a detail to fill in later (DNA1).`,
    );
    lines.push(`  Unanswered: ${brief.empty.join(' · ')}`);
  } else {
    lines.push(`CONCEPT GATE: BRIEF.md is answered in all ${brief.total} sections. Judge whether the answers are real before building on them.`);
  }

  lines.push('');
  lines.push('BUILD ORDER, and never the other way round: BRIEF.md -> the static page, standing alone with no motion -> motion, once each device has a declared role -> 3D, if the dimensionality role is MAIN or SUPPORT.');
  lines.push('DONE MEANS: opened in a browser at desktop AND mobile, screenshots taken, compared against the reference rather than against the previous build, the scroll stopped at ~8 positions with each judged as a composed frame, the reduced-motion and scripts-removed paths both opened, AA measured on the composited render. None of it is satisfied by describing it (DNA86-DNA89).');
  lines.push('WORKING STYLE: never ask yes/no questions to resolve taste — make the senior call and note it under Judgment calls. Questions about facts are allowed, three at most.');

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

    const brief = briefState(cwd, home);
    const lines = ['DESIGN DNA APPLIES TO THIS EDIT — these bind regardless of any project theme.'];
    lines.push('');

    if (SURFACE.test(path)) {
      if (!brief.exists) {
        lines.push('!! DNA1 — BRIEF.md does not exist and this is markup. The concept gate is shut. Write the concept before the first line.');
        lines.push('');
      } else if (brief.empty.length) {
        lines.push(
          `!! DNA1 — BRIEF.md has ${brief.empty.length} unanswered section(s): ${brief.empty.join(' · ')}. An empty section is an unfinished gate.`,
        );
        lines.push('');
      }
    }

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

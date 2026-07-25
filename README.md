# design-dna

A personal, reusable taste system for doing design work with AI agents.

Agents are competent and tasteless by default — they converge on the statistical
average of everything they've seen, which is why generated design all looks the
same. This repo is the correction: a portable set of opinions, hard numbers, and
hard bans that any agent reads before touching anything visual, so the output
comes out looking like Alex's work instead of like a template.

It is deliberately **not** a component library. No code to install, no framework
to adopt. It is taste as instructions, so it works in any stack, any project, and
with any agent that can read files.

---

## Wire it into any project

Add one line to that project's `CLAUDE.md`:

```md
Read and obey TASTE.md from this repo before any visual work:
c:\____WORK\______GDBURO\design_dna\TASTE.md
```

That's the whole integration. `TASTE.md` is the entry point — it carries the
operating rules, the Design Read procedure, the skill index, and the vault hook,
and it points the agent at whichever skills the task actually needs.

For a project that lives elsewhere or gets shared, clone this repo alongside it
and use a relative path, or symlink `design-dna/` into the project root. Same
line, same behaviour.

---

## Structure

```
design_dna/
├── TASTE.md                        # the manifest — agents read this first
├── skills/
│   ├── spacing-taste/SKILL.md      # air as default, 4px token scale, bottom-heavy sections, stack gap ladder
│   ├── typography-taste/SKILL.md   # display + grotesque + mono, italic accent word, mono micro-labels, spec plates
│   ├── color-taste/SKILL.md        # neutral base, smoky accents, banned palettes, text-on-photo, WCAG AA
│   ├── motion-taste/SKILL.md       # crossfade, subtle hover, 4 durations, skeletons, reduced-motion
│   └── anti-patterns/SKILL.md      # the hard bans — final gate before shipping
├── vault/                          # visual reference library (phase 2)
│   └── README.md
└── README.md
```

Each `SKILL.md` follows the standard skill format: frontmatter (`name`,
`description`) so an agent can decide when to load it, then opinionated rules —
every one with its rationale, because a rule without a reason gets
context-collapsed into a vague vibe and ignored the moment it's inconvenient.

`anti-patterns` outranks the rest. Conflict order inside the positive skills:
spacing → typography → color → motion.

---

## Working style

Agents using this system make senior decisions and don't ask yes/no questions to
resolve taste. Close calls get flagged in the final report under *Judgment
calls*, one line each — that's the review surface, not a stream of questions
mid-task. Anything that violates the DNA because of a real external constraint
gets named under *Known compromises*. Silent violations are the failure mode.

---

## Phase plan

**Phase 1 — taste skills (done, this commit).**
The written system: manifest, Design Read procedure, five skills. Enough to
change agent output on its own.

**Phase 2 — vault: capture tool + gallery.**
A capture tool for saving visual references (screenshot + tags + a note on *why*
it works) into `vault/`, plus a local gallery for browsing them. Activates the
vault hook in `TASTE.md` §3: *before designing X, query `vault/` for entries
tagged X.* Notes matter more than images — the goal is to transfer reasoning, not
to copy pixels. Image files stay gitignored until the gallery decides how to
store them.

**Phase 3 — distillation runs.**
Read the accumulated vault and extract the patterns Alex hasn't articulated yet,
then fold them back into the skills as new rules with rationale. This is where
the system stops being a snapshot of current opinions and starts learning from
evidence — the skills become the distillate of the vault rather than of memory.

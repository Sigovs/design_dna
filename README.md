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

Add to any project's `CLAUDE.md`:

```md
Before any visual work, fetch and obey TASTE.md and skills/ from
https://github.com/Sigovs/design-dna (or the local clone at ../design_dna
if present).
```

That's the whole integration. `TASTE.md` is the entry point — it carries the
operating rules, the Design Read procedure, the skill index, the working-style
clause, and the vault hook, and it points the agent at whichever skills the task
actually needs.

The local-clone fallback matters: a clone next to the project is faster, works
offline, and lets you edit the taste and see the effect immediately. Clone this
repo alongside the project (or symlink `design_dna/` into its root) and the same
line resolves locally instead of over the network.

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
├── CLAUDE.md                       # working-style rules for editing this repo
└── README.md
```

Each `SKILL.md` follows the standard skill format: frontmatter (`name`,
`description`) so an agent can decide when to load it, then opinionated rules —
every one with its rationale, because a rule without a reason gets
context-collapsed into a vague vibe and ignored the moment it's inconvenient.

`anti-patterns` outranks the rest. Conflict order inside the positive skills:
spacing → typography → color → motion.

---

## The taste in five lines

The canonical summary of what the skills add up to. **If a change to `TASTE.md`
or `skills/` makes a line below untrue, update it in the same commit** — this is
the surface Alex reads to catch drift, so it is only useful while it is honest.

1. **Space is the primary quality signal.** Generous, tokenised on a 4px scale,
   bottom-heavy sections, tuned gap ladders in text stacks — and whitespace is
   never filled to feel productive.
2. **Type carries the personality, in three voices.** Didone-energy display for
   emotion, invisible grotesque for reading, mono for anything factual; one
   true-italic word as the signature; data always as auction-catalog spec plates
   with hairlines, never boxes.
3. **Colour is restraint, not identity.** Off-black/off-white neutral first,
   smoky desaturated accent last and under ~5% of pixels; near-white or ink over
   photography with the image scrimmed to fix contrast; AA measured on every
   change.
4. **Motion seasons, it doesn't perform.** Crossfade over travel, 2px hover lift,
   four durations with ease-out in / ease-in exit, shape-matched skeletons, and a
   fully designed static path for reduced motion.
5. **The bans outrank everything, and anonymity is the real failure.** No
   AI-default palettes or layout archetypes, no gradient buttons, no decorative
   shadows, no boxes where air works, one primary CTA, no hidden mobile imagery,
   no horizontal scroll, no magic numbers — and every deliverable needs one
   structural move specific to *this* content.

---

## Working style

Agents using this system make senior decisions and don't ask yes/no questions to
resolve taste, and don't pause for permission between steps. Close calls get
flagged in the final report under *Judgment calls*, one line each — that's the
review surface, not a stream of questions mid-task. Anything that violates the
DNA because of a real external constraint gets named under *Known compromises*.
Silent violations are the failure mode. The one thing worth stopping for is an
external blocker — auth, missing credentials, a locked file — and then the report
says exactly what Alex must do.

This travels with the DNA: it's encoded in [TASTE.md](TASTE.md) §4, so any
project that wires in the manifest gets the working style too.
[CLAUDE.md](CLAUDE.md) holds the same rules for agents editing *this* repo.

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

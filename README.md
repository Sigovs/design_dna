# design-dna

A personal, reusable taste system for doing design work with AI agents.

Agents are competent and tasteless by default — they converge on the statistical
average of everything they've seen, which is why generated design all looks the
same. This repo is the correction: a portable set of opinions, hard numbers, and
hard bans that any agent reads before touching anything visual.

> **This DNA governs the QUALITY of decisions, not the sameness of outcomes.
> Invariants always apply; the dialect yields to the brief.**

That's the design of the system, and it's why it isn't a template. Rules sit in
one of **two tiers**: **invariants** are universal quality laws that never yield,
and **dialects** are aesthetic positions — strong defaults, each carrying a stated
`yields when:` condition. A brief that needs a different look gets one; a brief
never gets worse hierarchy, worse contrast, or arbitrary spacing.

It is deliberately **not** a component library. No code to install, no framework
to adopt. It is taste as instructions, so it works in any stack, any project, and
with any agent that can read files.

---

## Wire it into any project

Add to any project's `CLAUDE.md`:

```md
Before any visual work, fetch and obey TASTE.md and skills/ from
https://github.com/Sigovs/design_dna (or the local clone at ../design_dna
if present).
```

That's the whole integration. `TASTE.md` is the entry point — it carries the
operating rules, the two-tier model, the Design Read procedure, the skill and
dialect indexes, the working-style clause, and the vault hook, and it points the
agent at whichever skills the task actually needs.

The local-clone fallback matters: a clone next to the project is faster, works
offline, and lets you edit the taste and see the effect immediately. Clone this
repo alongside the project (or symlink `design_dna/` into its root) and the same
line resolves locally instead of over the network.

---

## Structure

```
design_dna/
├── TASTE.md                        # the manifest — agents read this first
├── skills/                         # each split INVARIANT / DIALECT
│   ├── spacing-taste/SKILL.md      # I: hierarchy, tokens, internal<external · D: air-first, bottom-heavy
│   ├── typography-taste/SKILL.md   # I: legible rank, optical correction · D: didone + grotesque + mono, spec plates
│   ├── color-taste/SKILL.md        # I: AA, no hue-only meaning, scrims · D: neutral dark base, smoky accents
│   ├── motion-taste/SKILL.md       # I: reduced-motion, keyboard parity, no jank · D: crossfade, subtle hover
│   └── anti-patterns/SKILL.md      # I: the universal failures · D: the trope bans
├── dialects/
│   └── auction-editorial.md        # the house dialect — PRINCIPLES + optional EXPRESSIONS
├── vault/                          # the taste vault — visual reference library
│   ├── sites.json                  # the library (entry schema in vault/README.md)
│   ├── vocab.json                  # controlled tag vocabulary — single source of truth
│   ├── capture.mjs                 # Playwright capture: full / hero / mobile
│   ├── index.html                  # the gallery — browse, filter, edit, add
│   ├── shots/<id>/                 # committed screenshots (the evidence)
│   └── README.md                   # workflow + the distillation prompt
├── CLAUDE.md                       # working-style rules for editing this repo
├── package.json
└── README.md
```

Each `SKILL.md` follows the standard skill format: frontmatter (`name`,
`description`) so an agent can decide when to load it, then an **INVARIANT**
section and a **DIALECT** section. Every rule carries its rationale, because a rule
without a reason gets context-collapsed into a vague vibe and ignored the moment
it's inconvenient — and every dialect rule additionally carries a `yields when:`,
because a rule with no stated exit gets broken silently instead.

Invariants outrank everything. Inside the dialect tier the conflict order is
anti-patterns → spacing → typography → color → motion.

`auction-editorial` is **not a silent default.** Every Design Read has to choose:
a stored dialect, a partial combination, or `brief-derived / no stored dialect`. An
underspecified brief does not become the house style by default.

---

## The taste vault

`vault/` is the evidence base: sites worth learning from, three screenshots each,
controlled tags, and a note on **why** it works. The note is the payload — the
shots are proof. Full detail and the entry schema live in
[vault/README.md](vault/README.md).

```bash
npm install                            # playwright + chromium, live-server
npm run vault                          # gallery at http://localhost:5177
```

**Three ways in, one way out.**

| | |
|---|---|
| **Add via command** | `npm run add -- <url>` — shoots full / hero / mobile, creates a stub entry with empty tags and `note: "TODO"`. Then open the gallery and write the note. |
| **Add via page** | `+ add site` in the gallery, or edit `sites.json` by hand from your phone. Shots arrive later: `npm run capture-missing` shoots every entry whose images are missing. |
| **Reshoot** | `npm run recapture -- <id>` when a site redesigns. |

The gallery has no backend by design. Saving downloads an updated `sites.json` —
**replace the file in `vault/` and commit it.** Edits survive a reload via
`localStorage`, but they aren't real until they're committed.

### The weekly distillation ritual

Once a week, turn references into rules. Run the distillation prompt — the full
text is in [vault/README.md](vault/README.md#the-distillation-prompt) — which
tells an agent to read entries added since the last run, weight them by rating,
and **propose skill amendments as a diff. The human approves.** Nothing lands in
`skills/` without a person reading the diff; that's the safeguard against the
vault quietly averaging your taste back toward the mean.

The most valuable section of that output is *contradictions*: references you admire
that break a current rule and work anyway. With two tiers, a contradiction now
splits — breaking a dialect rule usually means widening its `yields when:`, while
breaking an invariant means being sceptical of the reference, not the invariant.
Log each run at the bottom of `vault/README.md` so the next one knows where to start.

Entries also carry `dialectStatus` (`unreviewed` · `in` · `out` · `hybrid`). `out`
is not a rejection — it's the most valuable classification in the vault, because a
**new dialect may only be proposed from ≥3 human-approved `out` references that
share meaningful decision logic** (not similar colours, fonts, or surface styling),
and Alex approves before it exists. The full rule is in
[vault/README.md](vault/README.md#creating-a-new-dialect).

---

## The taste in five lines

The canonical summary of what the two tiers add up to. **If a change to
`TASTE.md`, `skills/`, or `dialects/` makes a line below untrue, update it in the
same commit** — this is the surface Alex reads to catch drift, so it is only useful
while it is honest.

1. **Two tiers, and the tier decides everything.** Invariants are universal
   quality laws and never yield; dialect rules are aesthetic positions, each with a
   stated `yields when:`. Yielding for a stated reason is correct practice —
   yielding silently is the only real failure.
2. **The invariants are about organisation, not appearance.** Intentional spatial
   hierarchy with internal gaps smaller than external; rhythm and optical balance;
   legible rank; body-length text built for sustained reading; line breaks that read
   as chosen; every value from a documented token scale; WCAG AA verified on every
   palette change; a complete static path for every animation; depth cues coherent
   with the spatial model they imply; and controlled irregularity that stays
   legible and intentional.
3. **The house dialect is auction-editorial, and it is chosen, never assumed.**
   Its principles are compositional: subtract before adding, hierarchy from space
   and scale before ornament, metadata composed rather than appended, one committed
   gesture over continuous novelty, mass above centre with a deeper field below,
   colour as a setting, materials over hues, motion as seasoning.
4. **Its expressions are optional, not a checklist.** Didone display + quiet
   grotesque + mono, one true-italic signature word, uppercase mono micro-labels,
   spec plates, smoky neutrals, hairlines instead of boxes, crossfades, a 2px hover
   lift. A design can belong to the dialect using few of them; using all of them
   without the principles is pastiche.
5. **Amount is a dialect question; intent never is.** How much air, how dark, how
   quiet, how irregular — all respond to the brief, audience, and density needs.
   That the spacing is deliberate, the contrast passes, the ranking is truthful, and
   the tokens are consistent does not.

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

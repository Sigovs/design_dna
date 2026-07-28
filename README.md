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
│   ├── academic-composition/SKILL.md # cross-dialect · I: dominant/subordinate, tone, figure-ground, eye path, resolution
│   ├── dimensionality/SKILL.md     # role-gated · I: removability, first read, budget, per-frame AA, one depth idea
│   ├── spacing-taste/SKILL.md      # I: hierarchy, tokens, internal<external · D: air-first, bottom-heavy
│   ├── typography-taste/SKILL.md   # I: legible rank, optical correction · D: didone + grotesque + mono, spec plates
│   ├── color-taste/SKILL.md        # I: AA, no hue-only meaning, scrims · D: neutral dark base, smoky accents
│   ├── motion-taste/SKILL.md       # I: reduced-motion, keyboard parity, no jank · D: crossfade, subtle hover
│   └── anti-patterns/SKILL.md      # I: the universal failures · D: the trope bans
├── dialects/
│   ├── README.md                   # dialect index + confirmed/provisional status
│   ├── auction-editorial.md        # the house dialect — PRINCIPLES + optional EXPRESSIONS
│   └── immersive-authored-world.md # PROVISIONAL — the page as a staged spatial experience
├── .github/workflows/capture.yml   # auto-captures shots when sites.json changes
├── projects/                       # records of MY OWN work — the inward half of the loop
│   ├── README.md                   # why, when to write, how it feeds distillation
│   ├── _TEMPLATE.md                # front-matter + five required sections
│   ├── check.mjs                   # npm run projects:check — register collisions
│   └── <project-slug>.md           # one per project, written at close
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
anti-patterns → composition → dimensionality → spacing → typography → color → motion.

**The Critique Panel** ([TASTE.md §2b](TASTE.md#2b-the-critique-panel)) runs twice —
after a Design Read, to critique the *direction*, and after a build, to critique the
*result*, before anything ships. Five critics in role, 3–6 lines each, **no consensus
required**: composition, craft, user advocate, brief advocate, and a **contrarian
whose dissent is mandatory** and who may not write "no objections". It ends in a
**disposition table** — every point marked accept / reject-with-reason / defer, and
**silence is not a disposition**.

It earns its place. Run against this repo's own gallery it caught a mobile wall
(the dominant mass sitting off-screen on the primary device), five interactive
surfaces at 2.48:1 contrast, and a filter model that rendered 42 chips for 7
entries — none of which the composition pass alone had surfaced.

**`academic-composition` is the cross-dialect quality layer.** It is a method for
judging visual relationships — masses, intervals, directions, tone, negative space
— not a style, and it does not push work toward looking classical, editorial, or
spacious. Its invariants bind in every dialect, including `brief-derived`. Its
**composition pass runs inside the Design Read: after the dialect declaration,
before typography, colour, effects, and motion** — because composition decided
after styling is just whatever the styling left over.

**No dialect is a silent default.** Every Design Read has to choose: a stored
dialect, a partial combination, or `brief-derived / no stored dialect`. An
underspecified brief does not become the house style by default.

Two dialects exist — see [dialects/README.md](dialects/README.md) for the index and
status. [auction-editorial](dialects/auction-editorial.md) is **confirmed** (the
house dialect). [immersive-authored-world](dialects/immersive-authored-world.md) is
**provisional**: the page as a staged spatial experience, author-created ahead of
Vault evidence and confirmed only once ≥3 human-reviewed entries carry it with
`dialectStatus: "in"`. Selection is always a human decision; a provisional dialect
is never inferred or recommended.

---

## The taste vault

`vault/` is the evidence base: sites worth learning from, screenshots as evidence,
controlled tags, and a note on **why** it works. The note is the payload — the
shots are proof. Full detail and the entry schema live in
[vault/README.md](vault/README.md).

Each entry carries the page shots (`full`, `hero`, `mobile`) plus a **scroll
filmstrip** — eight desktop frames and six mobile ones in scroll order — and the
pinned header after the first screen, stored only when it actually changes. The
filmstrip records what the full-page shot cannot: sequence, which is a decision.

> **Richer evidence increases the pull toward imitation, which is the opposite of
> this vault's purpose.** So the read has a required output form, in
> [TASTE.md §6 (d)](TASTE.md#6-vault-hook--the-vaultdesign-loop): *the reference
> solves &lt;problem&gt; by &lt;principle&gt;, which in this brief means
> &lt;different concrete move&gt;*. A read that produces "the reference does X, so do
> X" is a failed read. The live site is visited only when the entry's value is
> **temporal** and the filmstrip cannot answer the question — otherwise the archive
> is the source, because references go offline and change.

Tags are grouped into seven categories — **composition**, **risks**, typography,
layout, motion, color, imagery. `risks` is the only one that records something
wrong (`ambiguous-reading-order`, `mobile-recomposition-risk` and friends), which is
exactly what keeps the others merit-only. The composition category carries
**positive merit tags only**
(`dominant-mass`, `active-negative-space`, `directed-eye`, `tonal-structure`,
`rhythm-variation`, `intentional-crop`, `optical-balance`,
`compositional-resolution`, `responsive-recomposition`): a tag means a human
confirmed the quality is *present*. Compositional failures stay in the note, in
prose.

## Project records

> The vault holds other designers' sites. It is structurally incapable of detecting
> that MY work is repeating itself, because self-similarity is only visible by
> comparing my own projects to each other, and no such corpus exists. Across five
> briefs in one week the house dialect stopped yielding and four different clients
> came out looking like one studio — and nothing in the system could see it. Project
> records are that instrument. Second purpose: environment knowledge learned by hand
> evaporates (e.g. overriding kit tokens in a custom layer does not recolour an
> already-compiled style.css — discovered by hand, would be rediscovered by hand
> next time).

[`projects/`](projects/README.md) is the inward half of the loop. One record per
project, **written at close or at a direction lock, never continuously** — a record
that must be maintained will not be, and this repo already has the evidence: two
vault entries sat on TODO notes for days.

```bash
npm run projects:check     # register collisions between my own projects
```

Each record carries machine-readable front-matter — mandate, carried elements,
dialect and fit, suspended expressions, dimensionality role, and a **register**
(ground, display, accent, image treatment) — then five required prose sections,
the last of which is *what turned out wrong*. An empty section 5 is an incomplete
record, not a clean one. The check reads the registers and names any two projects
sharing ground + display + image treatment. **It reports, it does not judge.**

---

### 🔗 Live gallery — https://sigovs.github.io/design_dna/vault/

Served by GitHub Pages from `master`. No install, no terminal, works on a phone.

## Adding sites

### Online path (default)

1. Open the [live gallery](https://sigovs.github.io/design_dna/vault/) → **+ add site**,
   or open any entry and edit it.
2. **Save to github.** First time it asks for a **fine-grained PAT** (Contents:
   Read and write, this repo only). The token is stored in that browser's
   `localStorage` and sent only to `api.github.com` — *there is no server and no
   public endpoint anywhere in this design.* Revoke it on GitHub whenever you like.
3. Saving commits `vault/sites.json` as **`vault: edit from gallery`**.
4. That push triggers [`.github/workflows/capture.yml`](.github/workflows/capture.yml),
   which has a real browser, shoots any entry missing shots, and commits them back
   as **`shots: auto-capture [skip ci]`**. **~2 minutes**, then reload.

You never touch a terminal. `download json` stays as a fallback if the API call fails.

**Every Save produces a visible outcome** — a result, an error, or a choice. With no
stored token you get the choice explicitly: *paste a GitHub token to save online* or
*download the file instead*. In private browsing the token and edits are kept in
memory for the session and the page says so. Silence is treated as a bug.

**Removing an entry.** Detail view → **remove from vault** → confirm. With a token
it is one commit deleting the entry and its shots together; without one, `sites.json`
downloads without the entry and `npm run prune` clears the leftover shots directory.
**Removal is a commit; recovery is a revert** — see
[vault/README.md](vault/README.md#removing-an-entry).

**Stale-edit guard.** A browser holding unsaved edits does not silently win over a
newer file. If `vault/sites.json` changed after those edits were made, the gallery
shows the **remote** version, holds your copy, and asks — *keep my edits* or *take
remote*. Nothing is written or discarded without that choice.

### Offline path (terminal)

```bash
npm install                            # playwright + chromium, live-server
npm run vault                          # gallery at http://localhost:5177
npm run add -- <url>                   # shoot 3 images + create a stub entry
npm run capture-missing                # shoot every entry whose images are missing
npm run recapture -- <id>              # reshoot after a redesign
npm run prune                          # list orphaned shot dirs (--yes to delete)
npm run smoke                          # check the gallery, incl. the mobile matrix
```

Add `-- --insecure` to any capture command for hosts with a broken TLS cert (off by
default, logged when used). Saving from a locally served gallery works the same way —
it still writes to GitHub through the API.

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
   **Composition is the cross-dialect layer inside this tier** — a dominant with
   subordinates and support, unity, tonal structure before colour, actively shaped
   negative space, optically judged balance, a directed eye path, rhythm with felt
   variation, mass relationships chosen as ratios, committed edges and crops,
   tension with counterweight, sections that resolve, and a governing idea
   re-established at every breakpoint. Its **pass runs after the dialect
   declaration and before any surface styling**, and it judges relationships, not
   compliance with a preferred look.
   **Constructed depth is role-gated before it is anything else** — every read
   declares MAIN, SUPPORT or ABSENT, and then ten invariants bind: content survives
   removal at SUPPORT, no scene gates the first read, the frame and payload budget
   is declared up front, reduced motion gets an *authored* still, AA holds per
   frame over moving layers, one depth idea per view, apparent affordances are
   real, every timeline has a subject, nothing loops in a reading zone, and mobile
   is authored separately.
3. **Dialects are chosen, never assumed — and the house one is auction-editorial.**
   A second, **provisional** dialect exists
   ([immersive-authored-world](dialects/immersive-authored-world.md): the page as a
   staged spatial experience), author-created ahead of Vault evidence and usable
   only when explicitly selected.
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

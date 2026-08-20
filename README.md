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
│   ├── academic-composition/       # cross-dialect · the composition method
│   │   ├── SKILL.md                # I: masses-before-components, decided centre, dominant, tone, eye path, resolution
│   │   └── references/             # the academic method, routed to per task (not loaded wholesale)
│   ├── dimensionality/SKILL.md     # role-gated · I: removability, first read, budget, per-frame AA, one depth idea
│   ├── spacing-taste/SKILL.md      # I: hierarchy, tokens, internal<external · D: air-first, bottom-heavy
│   ├── typography-taste/SKILL.md   # I: legible rank, optical correction, icons as glyphs · D: didone + grotesque + mono
│   ├── design-dna/SKILL.md         # the entry point — no rules, routes to TASTE.md (globally symlinked)
│   ├── color-taste/SKILL.md        # I: AA, no hue-only meaning, scrims · D: neutral dark base, smoky accents
│   ├── generated-imagery/SKILL.md  # cross-dialect · I: origin declared, never depicts the real thing, provenance, survives a phone photo
│   ├── content-provenance/SKILL.md # cross-dialect · I: ledger before the claim, coverage not validity, no prior concept as a source, shape never invented to fill a slot
│   ├── motion-judgment/            # cross-dialect · whether to move at all, and what for
│   │   ├── SKILL.md                # I: declared role, one primary idea, subject over amount, stoppable frames
│   │   └── references/             # per-category judgment, audit rubric, implementation
│   ├── motion-taste/SKILL.md       # I: reduced-motion, keyboard parity, no jank · D: crossfade, subtle hover
│   └── anti-patterns/SKILL.md      # I: the universal failures · D: the trope bans
├── dialects/                       # 2 confirmed · 1 provisional · 7 library
│   ├── README.md                   # index + confirmed / provisional / library status
│   ├── HYBRID.md                   # style modes, Anchor/Contrast/Signature, CONTROL MAP, audit
│   ├── _TEMPLATE.md                # the shared dialect shape
│   ├── check.mjs                   # npm run dialects:check — shape, indexes, vocab in sync
│   ├── auction-editorial.md        # CONFIRMED — the house dialect, distilled from the vault
│   ├── immersive-authored-world.md # CONFIRMED — the page as a staged spatial experience
│   ├── brutalist-utility.md        # library — the structure of the thing is the design of it
│   ├── refined-elegance.md         # library — quality legible in proportion and interval
│   ├── swiss-editorial.md          # library — a declared system carries the meaning
│   ├── cinematic-industrial.md     # library — light, scale and material consequence persuade
│   ├── retro-futurist.md           # library — a named period's idea of the future
│   ├── expressive-poster.md        # library — type as image, one message, scale collisions
│   ├── technical-luxury.md         # PROVISIONAL — value demonstrated, not asserted
│   └── organic-tactile.md          # library — let the hand show
├── brief.mjs                       # npm run brief / brief:check — the brief compiler
├── art.mjs                         # npm run art / art:dry — compiled brief → generated imagery
├── gates/                          # the five-gate chain — a gate is run when its artefact exists
│   ├── README.md                   # the order, the three seal mechanisms, the detector's limits
│   ├── run.mjs                     # npm run gates — runs 1–4, writes the six artefacts, seals
│   ├── gate5.mjs                   # npm run gate5 — refuses the handoff unless the chain validates
│   ├── event.mjs                   # A1 — event ownership vs media coverage vs competition
│   ├── structure.mjs               # repetition by rendered geometry; reads no class names
│   ├── hero.mjs                    # closed-form cover mapping, per-sample boxes, annotated evidence
│   ├── content.mjs                 # claim harvest + ledger coverage
│   ├── lib/seal.mjs                # presence · staleness · order
│   ├── lib/server.mjs              # dependency-free static server with range support
│   └── test/                       # npm run test:gates — wrapper evasion, coverage, seal
├── projects/                       # records of MY OWN work — the inward half of the loop
│   ├── README.md                   # why, when to write, how it feeds distillation
│   ├── _TEMPLATE.md                # front-matter + required sections, incl. exploration
│   ├── check.mjs                   # npm run projects:check — register collisions
│   ├── fixtures/                   # npm run fixtures — four frozen rejections, four failure classes
│   ├── requests/<slug>.txt         # the raw DESIGN request a brief was compiled from
│   ├── briefs/_TEMPLATE.md         # the 14-section brief scaffold + provenance table
│   ├── briefs/<slug>.md            # one compiled brief per project
│   ├── art/<slug>/                 # generated imagery + prompts.md (images untracked)
│   └── <project-slug>.md           # one per project, written at close
├── explore/                        # EXPLORE artifacts — three directions per brief
│   └── README.md                   # the convention; artifacts are project-local
├── vault/                          # the taste vault — visual reference library
│   ├── sites.json                  # the library (entry schema in vault/README.md)
│   ├── vocab.json                  # controlled tag vocabulary — single source of truth
│   ├── EVIDENCE.md                 # the synthesis layer — claims at levels A/B/C/D
│   ├── evidence.mjs                # npm run evidence:check — synthesis vs. sites.json
│   ├── review.mjs                  # npm run review / review:deep — continuous ingestion
│   ├── reviews/<id>.md             # per-record revision history, append-only
│   ├── capture.mjs                 # Playwright capture: full / hero / mobile / filmstrip
│   ├── sync.mjs · distill.mjs      # npm run sync · npm run distill
│   ├── prune.mjs · smoke.mjs       # npm run prune · npm run smoke
│   ├── index.html                  # the gallery — browse, filter, edit, add
│   ├── shots/<id>/                 # committed screenshots (the evidence)
│   └── README.md                   # workflow + the distillation prompt
├── .github/workflows/capture.yml   # auto-captures shots when sites.json changes
├── .github/workflows/distill.yml   # runs the distillation check on sites.json changes
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

**Judgment is a procedure, not a reflex.** Three checks run during the build
([TASTE.md §2c](TASTE.md#2c-selection-coherence-and-device-discipline)): the
**Selection Pass** makes every significant decision name what it strengthens —
concept, character, hierarchy or usability — and bans the reaction-words that stand
in for explanations; the **section-language ledger** puts one row per section
against seven columns so a change of art direction becomes visible where it is
otherwise invisible; and the **device budget** requires a new visual device to name
a job no existing device can do. Neither quietness nor loudness counts as a
justification: when several solutions are viable, the one that expresses the central
idea most clearly wins.

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
entries — none of which the Composition Read alone had surfaced.

**`academic-composition` is the cross-dialect quality layer.** It is a method for
seeing, constructing and diagnosing visual relationships — masses, intervals,
directions, tone, negative space — not a style, and it does not push work toward
looking classical, editorial, or spacious. Its invariants bind in every dialect,
including `brief-derived`. Its **COMPOSITION READ and COMPOSITION PLAN run inside
the Design Read: after the dialect declaration, before typography, colour,
effects, motion — and before any grid, component or breakpoint** — because a
composition decided after the structure is whatever the structure left over. The
academic method behind each stage lives in
[skills/academic-composition/references/](skills/academic-composition/references/),
which the skill routes to per task rather than loading wholesale.

**No dialect is a silent default.** Every Design Read has to choose: a stored
dialect, a partial combination, or `brief-derived / no stored dialect`. An
underspecified brief does not become the house style by default.

**Delivery mode, declared before anything else.** The mandate answers *how much of
this brand may I replace*; the delivery mode answers *has a direction been chosen
yet*. **EXPLORE** produces three structurally different directions and Alex picks;
**BUILD** takes one direction to completion. EXPLORE is the default only when no
meaningful visual direction exists — a component change, a fix, an urgent revision,
anything on an already-approved composition, and *"just do it"* are all BUILD, and
offering three concepts instead is a way of not doing the work. Structural
difference is the test: three palettes on one layout is one direction. Invariants
bind in all three. The procedure is
[TASTE.md §2d](TASTE.md#2d-explore--three-directions-before-one-is-chosen);
artifacts go in [explore/](explore/README.md) and are **project-local** — a rejected
direction is not negative evidence about anything and never reaches the vault.

**Style mode sits inside a direction, not above it.** Delivery mode decides how many
directions exist; style mode decides what each one is made of, so under EXPLORE the
three often differ — A may be PURE, B DIRECTED HYBRID, C HYBRID.

**Style modes.** With no style named, the default is a **controlled hybrid**:
contrasting dialects, each holding a different systemic responsibility — Anchor
(~60–75%), Contrast (~20–30%), optional Signature (~5–10%). One dialect named is
**PURE**, and PURE admits no second dialect as an influence. Two or more named is
**DIRECTED HYBRID**, still with dominance assigned. The load-bearing rule:
**dialects are mixed by responsibility, never by page section** — a brutalist hero
above an elegant services section is [U11](skills/anti-patterns/SKILL.md#invariant),
not a hybrid. Selection and combination live in
[dialects/HYBRID.md](dialects/HYBRID.md).

**Ten dialect files exist, and two are evidence.**
[auction-editorial](dialects/auction-editorial.md) is **confirmed** — the house
dialect, distilled from the vault.
[immersive-authored-world](dialects/immersive-authored-world.md) is **confirmed as
of 2026-08-05** — the page as a staged spatial experience, author-created ahead of
Vault evidence and confirmed the other way round, by three human-reviewed entries
carrying it with `dialectStatus: "in"`.
[technical-luxury](dialects/technical-luxury.md) is **provisional as of
2026-08-05** — re-declared by Alex, who claims his own work decides this way, with
two independent observations behind it and one to go. The other seven are
**library**: described decision methods, available as inputs to a Read, asserting
nothing about Alex's taste and carrying no route to `confirmed` of their own. See
[dialects/README.md](dialects/README.md) for the index and the two original evidence
rules. Selection is always a human decision; no dialect is ever inferred or
recommended, and confirmed is not a licence to reach for one.

```bash
npm run dialects:check     # shape, indexes and vocabulary in sync
```

---

## The brief compiler

A short request compiles into a project-specific direction whose every claim says
where it came from. `brief.mjs` is **phase 1 only** — it is mechanical and produces
no design conclusion.

```bash
npm run brief -- --input projects/requests/<slug>.txt --out projects/briefs/<slug>.md
npm run brief -- --out projects/briefs/<slug>.md      # request on stdin
npm run brief:check -- projects/briefs/<slug>.md
```

**Phase 1** parses the request, pools the vault by `dialectStatus`, and orders each
pool by project-type relevance → Alex-approved layer relevance → dialect fit →
evidence completeness → rating. Then it emits the fourteen-section scaffold with the
decision slots empty. **Ranking is not selection** — a keyword score cannot decide
which reference belongs in a brief. **Phase 2** is the agent's: it authors the
direction into those slots.

**Four reference roles, and the vault's own status decides eligibility.**

| Role | Drawn from | Limit |
|---|---|---|
| **Primary** | `dialectStatus: in` | max 2 |
| **Secondary** | `dialectStatus: in` | max 3 |
| **Contextual** | `dialectStatus: hybrid` — **one named layer or function only**, never an overall endorsement | max 3 |
| **Anti-reference** | `dialectStatus: out` — prohibitions and failure patterns only | — |

Section 2 must also name what was **not carried forward**, and why each one lost.

**Five provenance markers, machine-validated.**

| Marker | Means | Validated against |
|---|---|---|
| `[P evidence:A1 sites:beings-co,ciridae-com]` | **Permanent** — a demonstrated preference | claim ids in [vault/EVIDENCE.md](vault/EVIDENCE.md); `sites:` required, resolved against `sites.json` |
| `[J]` | **Project** — a decision for this brief only | — |
| `[R site:<id> layer:<name>]` | **Reference-specific** — one site's device, **never a rule** | record id in `sites.json`; `layer:` must exist in that site's sidecar |
| `[A]` | **Agent** — a recommendation with no evidence behind it | — |
| `[?]` | **Unknown** — the evidence does not answer this | — |

Claim ids and record ids are different identifier types and are checked against
different sources; conflating them is how a brief cites a claim that does not exist.
`brief:check` verifies the sections are present, the provenance resolves, the caps
hold, sections 12 (anti-patterns) and 13 (evidence) carry real content, and any
`library` or `provisional` dialect is labelled as such wherever it is used. A brief
is a **project artifact** — nothing in it becomes a permanent preference without Alex
saying so.

---

## Generated art direction

`art.mjs` turns a **compiled brief** into imagery. Same two-phase split as the brief
compiler and the review loop, for the same reason: the script owns mechanics, the
brief owns meaning.

```bash
npm run art:dry -- --brief projects/briefs/<slug>.md            # prompts only, nothing called
npm run art -- --brief projects/briefs/<slug>.md --shots hero,detail --n 3
npm run art -- --brief <file> --subject "a 1972 911 mid-restoration, cold workshop"
npm run art -- --brief <file> --out "../Sports Car Rescue /assets/img/hero"
```

It reads §1 dialect, §3 art direction, §7 colour, §8 imagery and §12 prohibitions,
strips the provenance markers, and assembles a prompt. **It never writes a direction
of its own** — an unfilled scaffold is refused, because a plausible invented art
direction is worse than no image: it looks like a decision.

**Nothing dialect-specific is hardcoded.** The dialect arrives from the brief as
text. A generator that assumed `auction-editorial` would quietly make every project
resemble the last one — the exact convergence [projects/](projects/README.md) exists
to detect.

What *is* fixed is invariant-only, translated into language an image model acts on:
one dominant mass, figure-ground separation at a glance, an intentional crop, a
tonally calm region held for the headline so text stays legible without a scrim, and
the anti-pattern bans — no baked-in type, no UI, no gradient wash, no neon rim light,
no HDR crunch. Those hold on every brief, and repeating them in every brief is how
they get forgotten in one.

| Shot | Aspect | For |
|---|---|---|
| `hero` · `wide` | 16:9 | first screen, full-bleed band |
| `portrait` | 4:5 | single subject beside text |
| `detail` | 1:1 | material and surface close crop |
| `mobile` | 9:16 | composed for 390px, not a crop of the desktop frame |

Files land as `gen-<shot>-<n>.png` beside a `prompts.md` recording model, date and
the exact prompt. **The `gen-` prefix travels with the file wherever it is copied.**
Six months on, nobody can tell a generated hero from a photographer's frame by
looking, and a synthetic asset must never be confusable with a client's in a build
directory.

> **A generated image is not evidence and never enters `vault/`.** The vault holds
> other people's shipped work, judged. A generated frame is neither shipped nor
> anyone's. It is a project artifact, like an EXPLORE direction.

**Image generation is not in the Gemini API free tier.** Measured directly, not
inferred: a brand-new key answers every image model with
`GenerateRequestsPerDayPerProjectPerModel-FreeTier` — a daily allowance of zero —
while text models on that same key answer normally. Generating needs billing
enabled on the Google Cloud project; per-image cost is cents, not a subscription.
Get a key at [aistudio.google.com/apikey](https://aistudio.google.com/apikey) and
`export GEMINI_API_KEY=…` in `~/.zshrc`. `--model` switches models without editing
the file.

**The working route today is fal.ai, driven from the editor session.** `art:dry`
writes `prompts.md`; the agent runs that prompt through the connected fal MCP and
saves the frames with their `gen-` prefix. No second billing account, no leaving
VS Code, and measured cost: `fal-ai/flux/schnell` at $0.003/megapixel for drafts,
`fal-ai/flux-pro/v1.1-ultra` at $0.06 for a 2K final — with `raw: true`, which is
the flag that stops it looking rendered.

**Two constraints in the block were added from measured failures, not theory.**
A reading-room subject returned hundreds of pseudo-lettered book spines on both a
draft and a flagship model — a text ban does not survive a subject built of text,
so the block now moves the subject instead. And flagship models add cinematic matte
bars unprompted, which are dead pixels inside a full-bleed hero, so the block
demands an edge-to-edge frame. Both fixes verified on regeneration.

One standing caution the tool prints after every hero: **a generated hero raises the
project's asset dependency.** The composition still has to survive an ordinary client
photograph, and if it only works on the generated frame it is not finished.

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

### Continuous ingestion

```bash
npm run review -- <url>              # QUICK — capture, find or create, scaffold
npm run review:deep -- <url>         # DEEP — the same, with all nine layers stubbed
npm run review -- <url> --dry-run    # inspect and report, write nothing
```

`review.mjs` does **mechanics only**: URL normalisation, duplicate lookup, capture,
shot paths, record scaffolding, the revision sidecar, integrity checks. It never
reads meaning out of a comment — a regex cannot tell *"шрифтовая пара пока ни туда
ни сюда"* from a rejection, and guessing wrong writes a false judgement into
evidence. The agent fills the semantic fields; the script guarantees they have a
correct, deduplicated, honestly-labelled place to go.

Each record gets a sidecar in `vault/reviews/<id>.md` — **append-only revision
history**. Alex's wording is never edited, agent observations are never merged into
his judgement, and a layer verdict is never propagated to the whole record:
`dialectStatus` stays a whole-record field only Alex sets. Where a capture could not
reach the design — a bot wall, a loading screen, a page with no scroll room — the
limitation is recorded on the entry rather than papered over.

### The synthesis layer

[`vault/EVIDENCE.md`](vault/EVIDENCE.md) is where the vault stops being a list and
becomes readable taste — built **only** from Alex's own human-reviewed judgements,
never from agent observations. Claims sit at four levels: **A · demonstrated**,
**B · emerging**, **C · contextual**, **D · unknown or conflicted**. D is the point
of the file: colour, for instance, is recorded as *not known*, so a brief cites `[?]`
instead of inventing a preference.

```bash
npm run evidence:check     # synthesis layer vs. sites.json
```

It verifies mechanical truths only — every cited entry id exists, the inventory
counts match what `sites.json` actually contains, no claim id repeats, every claim
cites at least one supporting entry, and the recorded data-quality ambiguities are
still real. **It does not judge interpretation.** Whether a claim is true, or sits at
the right level, is Alex's review.

The layering is one-way: `sites.json` (evidence) → `EVIDENCE.md` (interpretation) →
`skills/` (executable). Nothing skips a layer, and promotion into `skills/` only ever
happens through the distillation ritual below.

## Project records

> The vault holds other designers' sites. It is structurally incapable of detecting
> that MY work is repeating itself, because self-similarity is only visible by
> comparing my own projects to each other, and no such corpus exists. A dialect that
> stops yielding makes unrelated projects converge on one look, and nothing in a
> reference library can detect that. Project records are the instrument. Second
> purpose: environment knowledge learned by hand evaporates — the build quirks and
> platform behaviour that took an afternoon to work out and will take another
> afternoon next time.

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

### Keeping copies in step

```bash
npm run sync     # before ANY design work, in whichever copy you are using
npm run distill  # what recurs across entries, and whether a rule can be argued
```

**Detection is automatic; authorship is not.** `npm run distill` reads every
entry's judgement fields, matches them against a declared theme lexicon, applies
the ritual's thresholds (3+ entries, or 2 rating-3s) and reports which themes
recur — quoting the sentence from each entry, so the evidence is verifiable rather
than asserted. It separates *patterns no rule covers yet* from *recurrences that
confirm an existing rule*, and exits 10 when something uncovered is over
threshold. [`.github/workflows/distill.yml`](.github/workflows/distill.yml) runs it
on every change to `sites.json` and on Mondays, and files a single reusable issue
with the evidence when that happens. **It never writes a rule** — a rule needs a
tier, an identifier and an argument, and the first ritual run proved why: its
amendment contradicted an existing line in the same skill, which no merge would
have caught.

Adding entries from the gallery writes straight to `origin`, and the capture Action
commits shots back — so **origin moves without this machine**, and every local clone
is stale by default. `npm run sync` fast-forwards when that is safe, refuses when the
copy has local commits or edits, and then reports what the vault owes: entries with no
judgement written, entries with no tags, entries awaiting a dialect call, capture
failures, free-addition tags at the promotion threshold, and how many entries have
arrived since the last distillation.

**Three or more new entries since the last run is the trip-wire** — that is the point
at which a pattern can clear the evidence threshold, so the ritual below is worth
running.

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

## Design DNA works at page scale

Design DNA does not treat sections as isolated design exercises.

For existing pages, the whole rendered page is the primary design object. New
sections are judged through scroll flow, neighbouring chapters, the existing visual
grammar and the reduced full-page read. **Local novelty never outranks page-level
coherence.**

The rule is [C21](skills/academic-composition/SKILL.md#invariant), its failure mode
is [U15](skills/anti-patterns/SKILL.md#invariant), and the procedure that enforces
it lives in the entry-point skill so that it loads even when nothing else does.

---

## The taste in five lines

The canonical summary of what the two tiers add up to. **If a change to
`TASTE.md`, `skills/`, or `dialects/` makes a line below untrue, update it in the
same commit** — this is the surface Alex reads to catch drift, so it is only useful
while it is honest.

0. **Delivery runs five gates, in order, and the last one is Alex's.** **Gate 1 —
   Measurable Conformance** measures the render against commitments the Read declared
   in advance, with one floor it may not lower: on identity-led and image-led pages
   **one governing event owns the first screen, and everything else defers to it**.
   That is measured as a composed system — subject, identity mass, supporting record,
   active field, CTA cluster and reserved space, each declared as a named component
   mapping to a rendered selector, never as a single full-viewport wrapper — with
   `eventCoverage` and `competition` deciding and **`mediaCoverage` reported and never
   decisive**. A composition owning its first screen on a fifth of a viewport of image
   passes; a full-bleed photograph carrying two independent events of equal rank fails.
   **Gate 2 — Structural and Authorship
   Conformance** asks of every device present what work it does — a full-screen hero
   names its event, a bleed names the chapter it separates, scale contrast says what
   the small type cannot, an overlap changes rank, emptiness is a pause between two
   events, two sections sharing one formula are one section — and asks whether the
   operations the Read committed to actually survived into the render. **Gate 3 —
   Product Usefulness** asks whether a person can do the thing they came to do.
   **Gate 4 — Content Provenance** requires every claim-shaped string to map to a
   ledger entry. **Gate 5 — Human Desirability** is a human verdict: clean desktop
   and mobile screenshots, no Design Read and no rationale attached, and approve /
   revise / reject from Alex; absence of approval is an unfinished gate, never a pass.

   **A gate is run when its artefact exists, not when a report says it passed.** The
   six chain artefacts must exist, be computed against this build, and be produced in
   order; `npm run gate5` refuses the handoff otherwise, and a refusal there is a
   workflow failure that teaches nothing about the design. **Gates 2 and 3 are
   conjunctive** — authorship and usefulness are both required and neither is ever
   traded for the other. **Structural repetition is measured semantically, never by
   class name:** `cards: 0` may not pass a layout containing card-equivalent repeated
   masses, and an empty detector report is not evidence of originality. A `defer` on
   the central proposition, the dominant, the Anchor, desire or perceived value blocks
   delivery outright, and if the defence is stronger than the artefact that is evidence
   against shipping. **Passing Gate 1 proves the means are present and nothing else** —
   `npm run fixtures` keeps four rejected artefacts on file across four failure
   classes: means absent, means present doing no work, authored-and-useless, and
   useful-and-unauthored — plus two instrument fixtures that calibrate A1 and carry
   no verdict at all. A hero owns the first screen as a **scene**, not as an object
   enlarged to the viewport edges — the air around the subject is part of the governing
   event — and it is verified on the **delivered composited render**, never on the
   source asset, with the worst sample governing when the subject moves.
1. **Two tiers, and the tier decides everything.** Invariants are universal
   quality laws and never yield; dialect rules are aesthetic positions, each with a
   stated `yields when:`. Yielding for a stated reason is correct practice —
   yielding silently is the only real failure.
2. **The invariants are about organisation, not appearance.** Intentional spatial
   hierarchy with internal gaps smaller than external; rhythm and optical balance;
   legible rank; body-length text built for sustained reading; line breaks that read
   as chosen; a 14px floor under every piece of functional text, below which type is
   decoration and carries no information; a display face proved in the render at
   every size the page sets it, not at the size it was chosen at; typographic roles kept distinct from
   typographic voices, each voice justified by a job the others cannot do; every value from a documented token scale;
   WCAG AA verified on every palette change, measured on the composited render
   rather than on the token table and re-measured per format, where the answer is
   often a differently-constructed scrim rather than a deeper one; a complete static path for every
   animation; a device that spends the visitor's advance — a pinned scene, a staged
   reveal, a scroll-linked sequence — returning it as understanding rather than as
   spectacle; depth cues coherent with the spatial model they imply; controlled
   irregularity that stays legible and intentional; every permanently-visible
   layer — sticky, floating, consent — counted in the composition rather than added
   on top of it, one over content at a time, and never going opaque while live
   content is still travelling under it; one page reading as one authored
   language rather than as several art directions sharing a URL; and every
   task-relevant route findable without hover, a completed animation or guesswork,
   legible before the visitor commits to it, distinguishable from the route beside
   it, and not moving the list it opens in;
   and a design re-hosted on another base layer verified by diffing computed values
   against the build it came from, because what the original inherited the new base
   declares on elements and outranks; and nothing left to be eaten by a clipping
   ancestor — an element anchored to a box that changes size at another viewport, or
   copy inside a fixed proportion whose padding still scales, checked by measuring
   rects against the clipping box at the narrow end of every band rather than at the
   two widths the design was authored at.
   **Composition is the cross-dialect layer inside this tier** — the page
   describable as 3–7 major masses before any component is named, a compositional
   centre that is decided rather than inherited, a dominant with subordinates and
   support, unity, tonal structure before colour, actively shaped negative space,
   optically judged balance, a directed eye path, rhythm with felt variation, mass
   relationships chosen as ratios, committed edges and crops, tension with
   counterweight, sections that resolve, a page that holds its standard to its last
   mass with an ending that is designed rather than left over, a declared asset
   dependency — on an exceptional asset or on a condition — that separates an
   authored constraint from an operational risk and survives the variation its own
   use guarantees, a first screen that says what the thing
   is (or a Read that declares the withholding), operational truth that organises
   the supporting content without displacing what the buyer actually came for, the
   page rather than the section treated as the composition, and a governing idea
   re-established at every breakpoint. Its **Read and Plan run after the dialect declaration and
   before any grid, component or surface styling**, and they judge relationships,
   not compliance with a preferred look.
   **Constructed depth is role-gated before it is anything else** — every read
   declares MAIN, SUPPORT or ABSENT, and then ten invariants bind: content survives
   removal at SUPPORT, no scene gates the first read, the frame and payload budget
   is declared up front, reduced motion gets an *authored* still, AA holds per
   frame over moving layers, one depth idea per view, apparent affordances are
   real, every timeline has a subject, nothing loops in a reading zone, and mobile
   is authored separately.
   **Motion is judged before it is tuned** — every motion system declares its role
   before it is built, one primary temporal idea owns a viewport, expressive
   amplitude is earned by what the subject *is* or by the register it is presented
   at rather than by the sector, every frame a
   visitor can stop on is a designed frame, the page stands up with all animation
   removed, the reader keeps control of pacing, comprehension never waits on
   choreography, mobile choreography is authored rather than inherited, reduced
   motion delivers the same meaning rather than a disabled interface, and the
   system is bound to roles rather than to a page's own sections — one written
   against instances silently applies to nothing on the next page.
   **Synthetic imagery is governed before it exists** — the origin of every image
   position is declared before a prompt does, the prompt is derived from the brief
   rather than typed from taste, nothing generated ever depicts a real product,
   premises or person, no type or interface is baked into a frame, the region text
   will sit over is held at generation instead of rescued with a scrim, provenance
   stays on the file permanently, the composition still reads with an ordinary
   photograph in place, and a mobile frame is composed rather than cropped.
3. **Dialects are chosen, never assumed — and the house one is auction-editorial.**
   A second **confirmed** dialect exists
   ([immersive-authored-world](dialects/immersive-authored-world.md): the page as a
   staged spatial experience) — author-created ahead of Vault evidence and confirmed
   the other way round on 2026-08-05, once three records carried a human `in`
   judgement. It is still selected explicitly, never assumed.
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
resolve taste, and don't pause for permission between steps. **They may ask a
clarifying question — up to three at once — when the missing piece is factual and
would change the architecture, the scope, the accuracy or the deliverable:** a
business goal, real content or constraints, a brand element that must stay fixed, a
genuinely ambiguous audience, the scope of the request, or a contradiction. Taste is
never the subject of a question, and where a reversible assumption exists it is
taken and disclosed rather than raised. Close calls get
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

**Phase 1 — taste skills. Done.**
The written system: manifest, Design Read procedure, the skills, the two tiers.
Enough to change agent output on its own.

**Phase 2 — the vault. Done.**
Capture tool, gallery, controlled vocabulary, committed shots, the online save path
and the capture Action. Notes matter more than images: the goal is to transfer
reasoning, not to copy pixels.

**Phase 3 — distillation and synthesis. Running.**
`npm run distill` detects what recurs; `vault/EVIDENCE.md` states what the evidence
supports and at what level; `brief.mjs` turns that into a project direction with
traceable provenance. Detection is automatic, authorship is not — nothing lands in
`skills/` without a person reading the diff.

**Phase 4 — the inward half.** `projects/` records Alex's own work so the system can
see self-repetition, which the vault is structurally incapable of detecting. It only
becomes useful once enough records exist to compare.

# TASTE.md — Alex's Design DNA

> **This is Alex's design DNA. Any agent doing visual work for Alex reads this
> first and obeys it over its own defaults.**

> **This DNA governs the QUALITY of decisions, not the sameness of outcomes.
> Invariants always apply; the dialect yields to the brief.**

Those two sentences are the whole system. The first says this file outranks your
priors. The second says it is not a template: it makes you decide *well*, not
decide *identically*.

---

## 0. Operating rules for agents

1. **Read this file before generating anything visual.** Layout, CSS, component
   markup, tokens, images, slide decks, diagrams, Figma output — all of it.
2. **Never ask Alex yes/no questions to resolve taste.** Make the senior
   decision. If a call was genuinely close, note it in your final report under
   *Judgment calls* — one line each, with what you chose and why.
3. **Load the relevant skill files.** Do not paraphrase them from memory;
   they contain hard numbers and hard bans.
4. **Invariants are not negotiable. Dialect rules are.** Know which is which
   before you break anything.
5. **State your Design Read first** (§2) — reading, mandate, dialect,
   dimensionality. It takes four lines and prevents most drift.

---

## 1. The two tiers

Every rule in `skills/` is filed under one of two tiers. The tier decides what
happens when a rule collides with the brief.

### INVARIANT

Universal quality laws. They describe what separates competent visual work from
incompetent visual work, in any aesthetic, for any audience. **They never yield.**
A brief that appears to require breaking one has actually specified a defect;
deliver the brief's intent without the defect and say so in your report.

The invariants, by domain — full text in the linked skills:

| Invariant | Where |
|---|---|
| Composed visual relationships — dominant/subordinate/support, unity and subordination, figure-ground clarity, optical balance, directed eye movement | [composition](skills/academic-composition/SKILL.md#invariant) |
| Tonal structure before colour — the major hierarchy survives grayscale, thumbnail, and squint | [composition](skills/academic-composition/SKILL.md#invariant) |
| Rhythm with variation, mass proportion, intentional edges and crops, tension with counterweight, compositional resolution | [composition](skills/academic-composition/SKILL.md#invariant) |
| Responsive recomposition — the governing idea re-established at every breakpoint, not merely the content | [composition](skills/academic-composition/SKILL.md#invariant) |
| **The dominant is the subject, not the device presenting it** — a signature mechanism serves the subject, never occupies its place | [composition](skills/academic-composition/SKILL.md#invariant) |
| **The means of the visitor's task survive the composition** — no compositional move may delete the means of doing what they came to do | [composition](skills/academic-composition/SKILL.md#invariant) |
| **Major masses before components** — the page is describable as 3–7 masses before any card, column or grid is named | [composition](skills/academic-composition/SKILL.md#invariant) |
| **The compositional centre is decided, not inherited** — semantic, optical, geometric and centre-of-action are distinguished, and one is declared to govern | [composition](skills/academic-composition/SKILL.md#invariant) |
| Intentional spatial hierarchy — grouping and separation are decided, never inherited | [spacing](skills/spacing-taste/SKILL.md#invariant) |
| Rhythm and optical balance — repeated relationships, optically corrected at size | [spacing](skills/spacing-taste/SKILL.md#invariant), [typography](skills/typography-taste/SKILL.md#invariant) |
| Token discipline — every value resolves to a documented scale; no magic numbers | [spacing](skills/spacing-taste/SKILL.md#invariant) |
| Legible hierarchy — rank is unambiguous and readable before the content is read | [typography](skills/typography-taste/SKILL.md#invariant) |
| Body-length text is built for sustained reading — face, size, spacing, and measure | [typography](skills/typography-taste/SKILL.md#invariant) |
| Line breaks are intentional and compositionally resolved | [typography](skills/typography-taste/SKILL.md#invariant) |
| Accessible contrast — WCAG AA as a contract, verified on every palette change | [color](skills/color-taste/SKILL.md#invariant) |
| **The accent is derived from something the project contains, the derivation is stated, and the result is then judged where it lands** | [color](skills/color-taste/SKILL.md#invariant) |
| Reduced-motion paths — every animation has a complete static equivalent | [motion](skills/motion-taste/SKILL.md#invariant) |
| **Controlled irregularity must remain legible and intentional.** | [anti-patterns](skills/anti-patterns/SKILL.md#invariant) |
| **Depth cues are coherent with the spatial model they imply** — interface elevation matches real layering; atmospheric and illustrative depth may be non-literal when intentional and not misleading | [anti-patterns](skills/anti-patterns/SKILL.md#invariant) |
| Universal failure modes — weak hierarchy, inaccessible contrast, gratuitous motion, arbitrary spacing, inconsistent tokens | [anti-patterns](skills/anti-patterns/SKILL.md#invariant) |

### DIALECT

Aesthetic positions. A coherent, opinionated way of resolving choices that the
invariants leave open. Dialect rules are strong defaults with **a stated
`yields when:` condition** — the circumstances under which following them would
make the work worse. Yielding to a stated condition is correct practice, not a
violation. Yielding silently is the failure.

Stored dialects live in `dialects/`.

### The floor mechanism — a repo convention

Some dialect rules are the *taste-tier statement* of something an invariant already
requires more narrowly. **Any dialect rule with an invariant core must name its floor
by identifier, and its `yields when:` may never breach that floor.**

```
`yields when:` <the condition>.
**Invariant floor:** <IDENTIFIER> still binds — <what remains true regardless>.
```

The identifier is required — `spacing I1`, `U7`, `color-taste I1`,
`dimensionality DM9` — because "still respect accessibility" is not checkable and
an unnamed floor is not a floor.

**Reference example.** [anti-patterns D9](skills/anti-patterns/SKILL.md#dialect)
dislikes ambient motion competing with content *anywhere*; it yields when the motion
is what the text describes. Its floor is
[dimensionality DM9](skills/dimensionality/SKILL.md#invariant), which forbids
perpetual motion inside a reading zone outright. So the yield can relax the dialect's
breadth and can never reach into the reading zone. Same shape elsewhere: D2's yield
cannot drop a control's label below AA, D6's cannot make emphasis lie about ranking,
D7's cannot drop content-bearing imagery.

Why the convention: a dialect rule and its invariant are easy to confuse precisely
because they say similar things at different strengths. Naming the floor makes the
difference operational — you can see, in the rule itself, exactly how much the exit
buys you.

---

## 2. The Design Read

Before generating anything visual, output exactly four lines:

```
Reading this as <deliverable> for <audience>, leaning <aesthetic family>.
Mandate: <REBRAND | REDESIGN | REFRESH> — <what is fixed, what is in scope>.
Dialect: <stored dialect | partial: X + brief-derived | brief-derived / no stored dialect>.
Dimensionality: <MAIN | SUPPORT | ABSENT> — <why, in one clause>.
```

Examples:

```
Reading this as a landing hero for first-time enterprise buyers, leaning editorial-technical.
Mandate: REDESIGN — wordmark, navy/cream palette and the serif display face carry through; layout and hierarchy in scope.
Dialect: auction-editorial.
Dimensionality: SUPPORT — one lit object carries emphasis; the page stands without it.

Reading this as an operations console for warehouse staff on shared terminals, leaning swiss-utility.
Mandate: REFRESH — identity and IA both fixed; only type scale, contrast and spacing in scope.
Dialect: brief-derived / no stored dialect — density and glanceability outrank restraint here.
Dimensionality: ABSENT — depth is carried by tone and overlap; a scene would cost the scan.

Reading this as a festival lineup page for an 18–25 audience, leaning expressive-poster.
Mandate: REBRAND — new festival, no prior identity; invention expected.
Dialect: partial: auction-editorial principles (metadata as composition) + brief-derived colour and motion.
Dimensionality: MAIN — the staged scene is the composition; DM1–DM10 bind at full weight.
```

**The mandate line is required, and the work cannot start without it.** It answers
one question — *how much of this brand am I allowed to replace?* — and it is
declared **before** the dialect, because the dialect is a way of executing an
identity, never a substitute for one.

| Mandate | Identity | What is in scope |
|---|---|---|
| **REBRAND** | In scope. **Invention expected.** | Everything: name-level expression, palette, type, voice, structure, surface. |
| **REDESIGN** | **Fixed.** | Execution. Layout, hierarchy, composition, structure, surface craft — while the brand stays itself. |
| **REFRESH** | **Fixed.** Structure fixed too. | Surface craft only: type scale, spacing, contrast, states, polish. |

**Under REDESIGN, list what carries through untouched BEFORE designing anything.**
Name the specific carriers — wordmark, palette, display face, photographic
treatment, voice, signature layout move — as a list, not as a promise. A carrier
you did not name is a carrier you will quietly replace. **The result must remain
recognisable as the same brand**, and §7 closes on exactly that question.

**Default when the brief does not say: REDESIGN.** An unstated mandate is never
read as licence to invent. If you believe the brief actually wants a REBRAND, say
so and name the evidence in the brief that says so; absence of a brand description
is not that evidence.

> **Why this step exists.** Across five briefs the agent substituted an invented
> identity for the client's existing one, because nothing in the procedure
> distinguished *fixing* a brand from *replacing* it. With no brand anchor
> declared, the agent falls back on the house dialect — which is how four different
> clients came out looking like the same studio. The mandate is the anchor:
> declared first, it makes "invent an identity" an explicit choice rather than a
> default that nobody noticed being made.

**The dialect line is a required choice, and it has three legal answers:**

- **a stored dialect** — the brief and brand are compatible with one in `dialects/`;
- **a partial combination** — name which parts you took and which you derived;
- **brief-derived / no stored dialect** — the right answer whenever no stored
  dialect fits.

**`auction-editorial` is not a silent universal default.** It is the preferred
fallback in exactly two situations: the brief and brand are compatible with it,
**or** Alex explicitly asks for a taste-led direction. An underspecified brief
must not auto-become auction-editorial — an absent brief is not a compatible
brief. When the brief is thin, derive the dialect from what you *do* know
(audience, function, sector, density needs) and say `brief-derived`. If you then
lean on auction-editorial anyway, you must be able to name the compatibility
you found; "nothing else was specified" is not one.

**The dimensionality line is also a required choice**, declared here — after the
dialect and **before** the composition pass, because the role decides what the
composition is made of. Its three answers and their obligations are in
[dimensionality](skills/dimensionality/SKILL.md#role-ladder):

- **MAIN** — depth or motion *is* the composition;
- **SUPPORT** — it reinforces a composition that stands without it;
- **ABSENT** — deliberately unused, and defensible: say what carries depth instead.

**Promoting SUPPORT → MAIN mid-project requires re-running this Design Read**, since
it changes the dominant, the eye path, and usually the dialect. Demotion never does.

### 2a. The Composition Read and Plan

**After the dialect declaration and before typography, colour, effects, motion,
grid, components, or any other structural or surface decision**, run the
[COMPOSITION READ](skills/academic-composition/SKILL.md#composition-read) and then
the [COMPOSITION PLAN](skills/academic-composition/SKILL.md#composition-plan) from
[academic-composition](skills/academic-composition/SKILL.md).

The Read observes and states the composition in relationships; the Plan commits to
them. **Grids, columns, cards, components, tokens and breakpoints are named only
after the Plan** — they are how a composition gets built, never where it starts.

Order matters: composition is decided in terms of masses, intervals, directions,
tone, and negative space *before* anything is styled. Choosing a typeface or a
palette first means the composition ends up being whatever the styling left over.

**Required for:** any full-page design, any substantial section-level design, any
visual critique.
**Not required for:** atomic UI edits, minor copy changes, small token
adjustments, isolated implementation fixes — apply only the relevant checks.

```
COMPOSITION READ                        (full form: 19 lines, in the skill)
1. Artistic image  2. Format forces   3. Major masses (3–7, no components)
4. Centres         5. Dominance       6. Balance
7. Direction       8. Rhythm          9. Negative space
10. Tension        11. Edges/depth    12. Unity
13. Type as mass   14. Imagery forces 15. Responsive
16. Functional     17. Diagnosis
```

Then a **COMPOSITION PLAN** — mass scheme, primary centre, hierarchy mechanism,
eye path, rhythm, negative space, tension, culmination, cropping, responsive
recomposition, functional realisation. **Only after the Plan** may grid, columns,
sections, components, cards, spacing values or breakpoints be named.

**The Read evaluates relationships, not compliance with a preferred visual
style.** It asks whether the visual forces are ranked, directed, balanced, and
resolved — not whether the result looks classical, editorial, spacious, or
asymmetric. A dense modular dashboard and a quiet catalogue page both pass or fail
on the same questions and look nothing alike.

Keep it compact — short clauses, one block. It is a thinking tool, not
documentation. Filler answers ("balanced and clean") mean the answer is missing.
The short form — artistic image, masses, centres, dominance, direction, rhythm,
negative space, responsive, diagnosis — serves section-level work and critique.

### 2b. The Critique Panel

Five critics, each in role, **3–6 lines each**. **No consensus is required** — the
panel's value is disagreement that survives contact with the work.

**It runs at two moments:**
- **after a Design Read** — critiquing the *direction*, before anything is built;
- **after a build** — critiquing the *result*, against what was declared.

Each role reads the skills it needs; none restates a rule. If a critic wants to
cite a limit, they cite it (`spacing I1`, `C10`, `color-taste I1`) rather than
paraphrasing it.

| Critic | Reads | Does |
|---|---|---|
| **1 · Composition critic** | [academic-composition](skills/academic-composition/SKILL.md) | Spot-checks the pass. Mass, eye path, resolution, edge failures — where the composition claims something the artefact does not deliver. |
| **2 · Craft critic** | the INVARIANT sections of every skill | Invariants sweep: measured contrast ratios, token discipline, legibility of hierarchy, reduced-motion path, tap targets. Numbers, not impressions. |
| **3 · User advocate** | the brief | Walks the **top 3 jobs** step by step. Counts taps. Names friction. States plainly *what will annoy on the 50th use.* |
| **4 · Brief advocate** | the brief | Drift check: does this still serve the stated jobs and audience, or has form begun to lead function? **Quotes the brief line** served or violated. |
| **5 · Contrarian** | everything above | **Mandatory dissent.** Must argue the strongest case *against* the result even while agreeing with it, and propose the one alternative most worth considering. **May not write "no objections".** |

**Output ends with a DISPOSITION table.** Every point raised gets exactly one of
**accept** · **reject-with-reason** · **defer**, filled in by the agent and
reviewed by the human. **Silence is not a disposition** — a point left off the
table is an unreported yield, which
[§7](#7-report-format) already treats as the failure mode.

A rejection must carry its reason in the same row. A deferral must say what it is
waiting on. "Accept" without a corresponding change in the work is a lie the next
run will inherit.

**Rules for the read**
- `<deliverable>` is the artefact, not the task ("landing hero", not "some HTML").
- `<audience>` is who judges it, and it sets the tolerance for expressiveness.
- **A library name is never an aesthetic family name.** "A Three.js site", "something
  Spline-y", "a GSAP page", "a Framer look" — these name a tool, not a direction, and
  the family must come **from the brief**. The tool is chosen last, to serve the
  read, and appears in the report beside the build. Tool characteristics are
  reference only:
  [dimensionality → tool notes](skills/dimensionality/SKILL.md#tool-notes-non-normative).
- `<aesthetic family>` must be nameable and specific: *editorial-technical*,
  *auction-catalog*, *quiet-luxury*, *swiss-utility*, *archival-print*,
  *expressive-poster*. "Modern", "clean", and "minimal" are not families — they
  are excuses.
- One read per deliverable. If a page has two moods, that is two reads, and
  you should probably reduce it to one.

The read is a commitment. If the output does not visibly match the family and
dialect you named, the output is wrong, not the read.

---

## 3. Skill index

Load these from `skills/`. Each is internally split into an **INVARIANT** section
and a **DIALECT** section. The invariant sections apply to every piece of work.
The dialect sections apply when you have selected that dialect — and each carries
its own `yields when:`.

| Skill | Invariant core | Dialect position |
|---|---|---|
| [academic-composition](skills/academic-composition/SKILL.md) | **Cross-dialect.** Major masses before components, a decided compositional centre, dominant/subordinate/support, unity, tonal structure before colour, figure-ground, optical balance, directed eye path, rhythm, mass proportion, intentional edges, tension with counterweight, resolution, responsive recomposition, the dominant being the subject rather than the device, the means of the task surviving. Routes to `references/` for the academic method behind each stage. | Composed asymmetry with counterweight, detail against quiet fields, mass above centre, downward exhale, one measured disruption. |
| [dimensionality](skills/dimensionality/SKILL.md) | **Role-gated.** Content survives removal at SUPPORT; no scene gates the first read; declared frame/payload budget; authored reduced-motion fallback; AA per frame; one depth idea per view; input honesty; choreography has a subject; no ambient motion in reading zones; mobile authored separately. | auction-editorial defaults to ABSENT/SUPPORT — material and light over geometry, patient camera. immersive-authored-world permits MAIN. |
| [spacing-taste](skills/spacing-taste/SKILL.md) | Spatial hierarchy is deliberate; spacing is tokenised; internal gaps < external gaps. | Air-first — generous space, bottom-heavy composition, whitespace as a status signal. |
| [typography-taste](skills/typography-taste/SKILL.md) | Hierarchy is legible; roles are bounded; type is optically corrected at every size. | Editorial contrast — expressive display + quiet grotesque + mono, italic signature word, spec plates. |
| [color-taste](skills/color-taste/SKILL.md) | AA verified every change; never meaning by hue alone; legibility fixed at the background layer. | Chromatic restraint — neutral dark base, smoky desaturated accents used as a setting. |
| [motion-taste](skills/motion-taste/SKILL.md) | Reduced-motion path for everything; state changes perceivable with keyboard parity; no jank. | Calm and physical — crossfade over travel, subtle hover, motion never as identity. |
| [anti-patterns](skills/anti-patterns/SKILL.md) | The five universal failure modes, plus controlled-irregularity legibility. | The trope bans — AI-default looks, gradient buttons, decorative shadows, boxes-for-boxes, template anonymity. |

**`academic-composition` applies across all dialects**, including
`brief-derived / no stored dialect`. It is not part of the house style and it does
not push work toward any look — it is the quality layer under all of them. Its
invariants bind whatever you selected in the dialect line, and its pass runs before
any surface decision (§2a).

**Conflict order.** Invariants beat everything. Inside the dialect tier:
anti-patterns → composition → dimensionality → spacing → typography → color →
motion. Composition sits above spacing because the shape of the masses and the eye
path decide what the spacing is *for*; dimensionality sits just under it because the
declared role decides what the composition is made of; motion is last because motion
is seasoning.

---

## 4. Dialect index

Index and status live in [dialects/README.md](dialects/README.md). Complete rules
live only in the dialect files.

| Dialect | Status | What it is |
|---|---|---|
| [auction-editorial](dialects/auction-editorial.md) | confirmed | The house dialect. Split into **PRINCIPLES** (compositional logic and decision tendencies) and **EXPRESSIONS** (optional visual manifestations). The expressions are not a checklist — a design can belong to this dialect while using few of them. |
| [immersive-authored-world](dialects/immersive-authored-world.md) | **provisional** | The page as a staged spatial experience rather than a document: one symbolic central event, layered depth, typography and interface belonging to the world, motion that changes narrative state, spectacle separated by silence. Carries a strict effect hierarchy and an INVARIANT COMPLIANCE section. |

**Neither is a default, and neither is ever inferred.** `immersive-authored-world`
is additionally **provisional** — author-created ahead of Vault evidence, confirmed
only once ≥3 human-reviewed entries carry it with `dialectStatus: "in"`. Select it
only when Alex names it; never recommend it because a brief sounds creative.

New dialects are not invented casually. The evidence route is the norm — one may be
proposed out of the vault under the rule in
[vault/README.md](vault/README.md#creating-a-new-dialect): **≥3 human-approved
out-of-dialect references sharing meaningful decision logic**, not merely similar
colours, fonts, or surface styling, and Alex approves before it exists. An
author-created dialect skips that evidence and is therefore marked provisional
until it earns it.

---

## 5. Working style — travels with this DNA

Adopting this file means adopting how the work gets done, not only how it looks:

- **No yes/no or confirmation questions.** Don't pause for permission between
  steps. The only thing worth stopping for is an external blocker (auth, missing
  credentials, a locked file) — and then state exactly what Alex must do.
- **Senior decisions, flagged afterwards.** Decide, build, then surface the close
  calls in the report under *Judgment calls*. Taste questions are answered in the
  work, reviewed in the report.
- **When a spec is silent, the invariants still bind and the dialect still has to
  be chosen.** Silence is not permission to reach for the house style; it is a
  prompt to derive one from the audience and the function, and to say which you
  did.

---

## 6. Vault hook — the vault→design loop

`vault/` is the visual reference library: captured shots, uploaded images, and the
notes on *why* each one works. It is live, and querying it is **not optional** —
it is the step that makes this DNA evidence-based rather than a set of assertions.

**Run this before any visual work, in this order.**

> **The other half of the loop:** `vault/` looks outward at other people's work;
> [`projects/`](projects/README.md) looks inward at mine, so the system can see its
> own repetition — `npm run projects:check` reports register collisions between my
> own projects. The vault cannot detect that my work is repeating itself; only the
> records can.

### (a) Load the library

```
local clone:  vault/sites.json        (and vault/shots/… for the images)
fallback:     https://raw.githubusercontent.com/Sigovs/design_dna/master/vault/sites.json
              https://raw.githubusercontent.com/Sigovs/design_dna/master/vault/shots/<id>/<file>
```

Try the local path first — it is faster and always current with the working tree.
Use the raw URL when there is no clone. If neither is reachable, say so in the
Design Read and proceed without references rather than inventing them.

### (b) Filter

By **tags** relevant to the task — the six categories are `composition`,
`typography`, `layout`, `motion`, `color`, `imagery` — and by **`dialectStatus`**.
Designing a dense data view? Filter `layout:dense-done-right`, `composition:*`.
Art-directing a hero? `imagery:*`, `composition:dominant-mass`,
`layout:bleed`.

### (c) Read all three judgement fields as reasoning

**Read them before the images.** Each entry carries up to three:

| Field | What it is | How to use it |
|---|---|---|
| `note` | The general reasoning — the claim about why this works | The payload. Take the *decision*, not the artefact. |
| `works` | What is strong, itemised | **Decisions to learn.** These are candidates to apply. |
| `weaknesses` | What fails, or nearly does | **What to avoid even in a reference you like.** |

> **Match the thinking, don't copy the pixels.**

Take the *decision* — what was ranked, what was subtracted, where the mass sits,
what carries the hierarchy — and apply it to this brief. Never transplant the
artefact.

**`weaknesses` is not a footnote.** A liked reference with a recorded weakness is
telling you exactly which part not to copy, which is more actionable than the
praise. **For an entry marked `out`, the weaknesses ARE the payload** — that is the
whole reason it was kept.

### (d) Read the images, for entries whose value is visual

For `upload` and `image-url` entries, and for any `extras` whose labels point at
something specific, **actually open and analyse the image.** Do not treat a
filename or a label as a substitute for looking.

What each image kind is for:

| Shot | What it answers |
|---|---|
| `hero` | What arrives before any scrolling — the first read. |
| `full` | The page as one object: proportion, rhythm, where the masses sit. |
| `mobile` | What survives one column. |
| `strip` / `stripMobile` | **The scroll sequence** — what arrives, in what order, against what. Read it as a sequence; the order IS the evidence. |
| `navScrolled` | Present only when the pinned header changes after the first screen. Its presence is itself the finding. |

In the Design Read, say what design decisions each relevant image demonstrates —
in these terms: **composition** (dominant/subordinate, eye path, figure-ground),
**tonal structure** (what survives grayscale, where the masses sit),
**spacing relationships** (proportions between masses, active negative space).
Extras' labels tell you what to look at — *"hover state"*, *"checkout page"*,
*"mobile menu"* — so look at that thing, not the whole frame.

#### The output of a read is a PRINCIPLE, never a description

**State what principle you take, never what the reference looks like.**

A read that produces *"the reference does X, so do X"* is a **failed read** — and so
is a read that produces a description at all. The required form is:

```
the reference solves <problem> by <principle>,
which in this brief means <different concrete move>
```

The third clause is not optional and it must be **different from the second**. If
the concrete move is the reference's move, nothing was read: the artefact was
transplanted and the derivation written backwards to justify it.

| Failed read | Real read |
|---|---|
| "Ruadh uses a full-bleed image with the type overlapping the bottom edge — do that." | "Ruadh solves *there is one thing to sell and no time to explain it* by making a single mass carry the whole first screen and letting everything else defer to it — which here, where the visitor arrives with a task rather than a desire, means the search field takes that role and the imagery drops to support." |
| "The Gentlewoman sets its headlines in a didone at 96px." | "The Gentlewoman solves *the reader must know the register before reading a word* by carrying the identity entirely in one typographic contrast — which here, on a tool, means the register is carried by density and restraint instead, because a display face on a working instrument is costume." |

> **Why this rule exists, recorded verbatim:** richer visual evidence increases the
> pull toward imitation, which is the opposite of this vault's purpose — the note
> is the payload, the shots are evidence.

The filmstrip is exactly the evidence this rule is for. Eight frames of somebody
else's scroll are a page you can rebuild; the principle behind their order is a
decision you can use.

Then **apply the decisions, never reproduce the artefact.** And where a reference's
decision conflicts with an invariant, **the invariant wins** — the reference is
evidence about taste, never a licence to break a quality law.

#### Live browsing — the narrow exception

**The archive is the source.** References go offline, get redesigned, and A/B-test
you into a variant nobody else will ever see. A shot is dated and stable; the live
site is neither.

Visit the live site **only** when both hold:

1. the entry's value is **temporal** — transitions, scroll choreography, staged
   motion, a state that only exists mid-interaction; **and**
2. the filmstrip and the extras **cannot answer the question**.

Then say so in the Design Read — *"visited live, because <the temporal question>"* —
and state the date. Everything else reads the archive.

### (e) Weight by rating and status

| Entry | How to use it |
|---|---|
| rating **3** | Reference. Let it shape decisions. |
| rating **2** | Supporting evidence. |
| rating **1** or `dialectStatus: out` | **Anti-reference — what to avoid.** Read it for the failure mode it documents, and check your work is not repeating it. |
| `dialectStatus: in` | Belongs to a stored dialect; strongest when you selected that dialect. |
| `hybrid` / `unreviewed` | Usable, but unclassified — say so. |

### (f) Ignore judgements that do not exist

An entry whose `note`, `works`, and `weaknesses` are all empty or `TODO`
**contributes its tags and nothing more.**
Do not infer reasoning from its title, its rating, or its screenshots' surface.
It is an unlabelled specimen.

**State the tally in your Design Read:**

```
Vault: N relevant references, M unusable for missing notes.
```

That line is deliberate pressure: an entry with no note is a capture that has not
become knowledge yet, and the count makes the debt visible every time the vault is
queried.

### Report

Cite the entries you leaned on by id (`vault/<id>`) so the reference chain stays
visible and Alex can correct the taste at its source.

**Worked example:** a full mock Design Read, including the query and how two notes
drive two concrete decisions, is in
[vault/README.md](vault/README.md#worked-example--a-design-read-that-uses-the-vault).

---

## 7. Report format

End any visual work with:

- **Design Read** — the four lines you committed to: reading, mandate, dialect,
  dimensionality.
- **Composition pass** — the nine-line block (§2a), where one was required.
- **Critique panel + disposition table** — where §2b ran. Every point disposed of.
- **Invariants applied** — which bound the work, and where they bit.
- **Dialect yields** — every dialect rule you set aside, with the `yields when:`
  condition that justified it. A yield is a normal outcome; an unreported yield
  is a defect.
- **Judgment calls** — close decisions, one line each. This is the only place
  taste questions get raised; never raise them as questions up front.
- **Vault entries cited** — ids, if any informed the work.
- **Known compromises** — anything that violates an invariant because of a real
  external constraint, named explicitly. Silent violations are the failure mode.

**Under REDESIGN, close the report with this question, answered:**

> **Would a regular visitor recognise this as the same brand?**

Answer it with the **specific carried elements as evidence** — the wordmark in its
original lockup, the palette's two anchor colours, the display face, the
photographic treatment, the one signature layout move — not with an assertion that
it feels consistent. If the honest answer is no, say no: that means the work became
a REBRAND without one being declared, and the mandate has to be renegotiated rather
than quietly widened.

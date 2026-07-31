# Design brief — <project>

*Compiled 2026-07-31 by `npm run brief`. Phase 1 (this scaffold) is mechanical;
every decision below is Phase 2, written by the agent and marked with where it
came from. A brief is a **project artefact** — nothing in it becomes a permanent
Design DNA preference without Alex saying so.*

## The request, verbatim

```
DESIGN:
Independent quarterly of long essays and photo reportage, read online.
Brand: none — a new publication, invented for this fixture, with no prior identity.
Goal: the issue index and an essay reading view.
Audience: subscribers who read in long sittings, mostly on a phone at night.
Content: essays of 4000-9000 words; commissioned photography for roughly one essay
in four; the rest is text only, with pull quotes and footnotes.
Constraint: no advertising, no recommendation feed, no infinite scroll. Reading
position must survive a closed tab.
```

Terms extracted for candidate ranking: independent · quarterly · long · essays · photo · reportage · read · online · none · publication · invented · this

## Provenance — one canonical syntax, machine-validated

| Marker | Means | Requires |
|---|---|---|
| `[P evidence:A1 sites:beings-co,ciridae-com]` | **Permanent** — a demonstrated preference | a claim id from `vault/EVIDENCE.md`, plus the site ids it rests on |
| `[J]` | **Project** — a decision for this brief only | nothing |
| `[R site:organimo-com layer:typography]` | **Reference-specific** — one site's device. **Never a rule** | a record id; `layer:` only where that site has a sidecar |
| `[A]` | **Agent** — a recommendation with no evidence behind it | nothing |
| `[?]` | **Unknown** — the evidence does not answer this | nothing |

Claim ids (`A1`, `D3`) and record ids (`organimo-com`) are different
identifier types and are validated against different sources.

## Candidates — ranked, NOT selected

Ranking order: project-type relevance → approved layer relevance → dialect fit →
evidence completeness → rating. **It orders the list. The agent selects.**

**`in` — eligible as primary or secondary**

| Record | Rating | Status | Term hits | Approved layers | Alex's layer verdicts |
|---|---|---|---|---|---|
| `beings-co` | 3 | in | 7 | — | — |
| `organimo-com` | 3 | in | 5 | 7 | composition:IN, typography:IN, colour:IN, imagery:IN, spacing / density:IN, motion:IN, interaction:IN |
| `ciridae-com` | 3 | in | 5 | — | — |
| `ruadh-com` | 2 | in | 5 | — | — |
| `augen-pro` | 2 | in | 5 | — | — |
| `kinncollective-co-uk` | 2 | in | 5 | — | — |
| `thenewmobileworkforce-imm-g-prod-com-back-at-hq` | 2 | in | 5 | — | — |
| `i-pinimg-com-736x-46-d9-d5-46d9d54b7cc97b5687cbfd24a1410d34-` | 2 | in | 4 | — | — |
| `trionn-com` | 2 | in | 4 | — | — |
| `rolls-roycemotorcars-com-en-us-home-html` | 3 | in | 3 | 8 | composition:IN, hierarchy:IN, colour:IN, spacing / density:IN, motion:IN, interaction:IN, interaction:IN, design dialect:IN |
| `immersive-g-com` | 3 | in | 3 | 7 | composition:IN, hierarchy:IN, typography:IN, imagery:IN, spacing / density:IN, motion:IN, interaction:IN |
| `electrafilmworks-com` | 2 | in | 3 | — | — |
| `obys-agency` | 2 | in | 1 | 4 | composition:IN, colour:IN, imagery:IN, motion:IN |

**`hybrid` — contextual only, limited to the named layer or function. Never presented as an overall positive reference.**

| Record | Rating | Status | Term hits | Approved layers | Alex's layer verdicts |
|---|---|---|---|---|---|


**`out` — anti-references only: prohibitions and failure patterns.**

| Record | Rating | Status | Term hits | Approved layers | Alex's layer verdicts |
|---|---|---|---|---|---|
| `thegentlewoman-co-uk` | 1 | out | 11 | — | — |
| `rmsothebys-com` | 1 | out | 7 | — | — |

## Dialects available

| Dialect | Status |
|---|---|
| `auction-editorial` | **confirmed** |
| `brutalist-utility` | **library** |
| `cinematic-industrial` | **library** |
| `expressive-poster` | **library** |
| `immersive-authored-world` | **provisional** |
| `organic-tactile` | **library** |
| `refined-elegance` | **library** |
| `retro-futurist` | **library** |
| `swiss-editorial` | **library** |
| `technical-luxury` | **library** |

**A `library` dialect may be selected as a project method and must be labelled as
one. Only a `confirmed` dialect may be called a demonstrated personal preference;
a `provisional` one keeps its label.**

---

## 1. Dialect

**STYLE MODE: PURE — `swiss-editorial`, a library dialect selected as this
project's method and not a demonstrated preference of Alex's.**

PURE is the decision, not the fallback `[J]`. The publication has one durable
asset — text, at 4000-9000 words, arriving four times a year with photography for
roughly one essay in four. A declared system is the only thing that lets a
text-only essay and a heavily illustrated one sit in the same publication without
one of them looking like a mistake. A second dialect would have to earn its place
by doing a job the system cannot, and on this brief there is no such job.

`auction-editorial` (**confirmed**, the house dialect) was considered and set
aside `[J]`: its subject is the singular lot, composed as a record. A quarterly
is a sequence, and sequence is the thing being designed.

## 2. References

- **Primary** — the two rating-3 records whose problem is closest to this one:
  - `ciridae-com` (3 / `in`): large editorial serif against restrained sans-serif
    metadata, numbered structure, hairline rules — a difficult body of text made
    navigable by typography rather than by interface.
  - `beings-co` (3 / `in`): type and image composed as one conflicted mass, with
    minimal navigation. The issue cover needs exactly this and nothing more.
- **Secondary** — supporting, each for one thing:
  - `ruadh-com` (2 / `in`): rhythm as a stated sequence, not as a feeling.
  - `kinncollective-co-uk` (2 / `in`): scale confident enough that a first screen
    needs no headline — with its own recorded cost, which section 12 carries.
  - `organimo-com` (3 / `in`): uppercase headings against normal-case body
    `[R site:organimo-com layer:typography]`, carried as a register decision.
- **Contextual** — none available. The vault currently holds no `hybrid` records,
  and the contextual role draws only from that class. An empty role is the honest
  result, not a gap to be filled from `in` `[J]`.
- **Anti-reference** — `thegentlewoman-co-uk` (1 / `out`): one viewport, three
  quarters empty, a magazine cover centred in white. The opening is exceptional and
  **the project fails as a website** — the idea never develops past the first
  screen. This is the exact failure a quarterly built around covers is exposed to.
- **Not carried forward**:
  - `obys-agency` — the side-scrolling sequence `[R site:obys-agency layer:composition]`.
    Horizontal movement fights sustained vertical reading.
  - `immersive-g-com` — cursor-tracked reveal. The reader is on a phone at night.
  - `thenewmobileworkforce-imm-g-prod-com-back-at-hq` — an interface to be learned.
    A reading view that must be learned has already lost.
  - `electrafilmworks-com` — `in` and relevant, but its subject is film and its
    lessons here duplicate the two primaries `[J]`.

## 3. Art direction

One continuous system rather than an accumulation of devices
`[P evidence:A2 sites:beings-co,ciridae-com,ruadh-com,electrafilmworks-com,kinncollective-co-uk]`.

The register is a **reading instrument, not a magazine's idea of itself** `[J]`.
The publication earns its character from the order it imposes on a quarter's worth
of essays — what is placed first, what is held back, how long a reader is left
alone with a text. Ornament is not the medium here; sequence is.

## 4. Composition and hierarchy

**The issue index.** One governing event owns the first screen and everything
defers to it
`[P evidence:A1 sites:beings-co,ciridae-com,ruadh-com,electrafilmworks-com,trionn-com,kinncollective-co-uk]`
— here the lead essay, at full measure, with its title set as the largest thing on
the page and the issue number as the only other mass.

The first screen must also say what this is `[P evidence:A1 sites:kinncollective-co-uk]`.
That entry's own recorded weakness is the warning: a first screen minimal enough to
be beautiful can fail to explain the thing. One line — quarterly, essays, this
issue's date — carries it.

**The essay view.** The interface is subordinate to the content
`[P evidence:A3 sites:electrafilmworks-com,ciridae-com,beings-co,ruadh-com]`, with
the floor that same record set: subordination stops at legibility. Nothing
functional below 14px, and progress, footnotes and the return path survive every
compositional decision.

Type and image are composed as one mass where photography exists
`[P evidence:B2 sites:beings-co,kinncollective-co-uk]` — the image enters the
title, it is not placed above it.

## 5. Layout and spacing

Rhythm stated as a sequence rather than trusted as a feeling
`[P evidence:B1 sites:ruadh-com,ciridae-com]`. For the index: lead essay → three
titles at text scale → one full-measure photograph → three titles → the archive
door. The alternation is the structure; without it a quarterly index is a list.

The essay is a single column at a measure fixed for the phone first, since that is
where it is read `[J]`. Density rises only in the apparatus — footnotes, credits,
the issue colophon — where proximity is the point.

`ciridae-com`'s recorded weakness is the counterweight: its rhythm is noted as
too sparse for the volume of information it carries. Air is not free when the
volume is real `[J]`.

## 6. Typography

Two voices `[P evidence:A2 sites:beings-co,ruadh-com]`: an editorial serif for
essay titles and body, and one quiet grotesque for everything that is not the
essay — issue numbers, credits, navigation, footnote markers. A third voice would
have to name a job neither can do, and there is none.

Uppercase confined to short labels with real tracking, normal case for reading
`[R site:organimo-com layer:typography]` — carried as a decision about register,
not as that site's setting.

Body type is built for sustained reading before it is styled: measure, leading and
paragraph spacing decided against a 9000-word essay, not against a sample
paragraph `[J]`.

## 7. Colour

**`[?]` The evidence does not answer this** — `vault/EVIDENCE.md` D1 records
that no `in` entry's judgement isolates colour as a reason for approval. The
palette is therefore derived and the derivation stated, never chosen from taste.

What the evidence does support is a negative: a dark atmospheric ground is not
itself a preference
`[P evidence:C2e sites:ciridae-com,electrafilmworks-com,rmsothebys-com]` — it
appears in approved and rejected records alike, so it discriminates nothing and
must not be reached for as a shortcut to seriousness.

Practical floor `[J]`: hierarchy survives grayscale, and long-form body text is
measured for AA on the composited render, not on the swatch.

## 8. Imagery and video

Real photography of real situations, never polished renders
`[P evidence:B3 sites:ciridae-com]` — one supporting entry only, so this is a
weak-but-directional claim and is stated as one.

**The dependency is declared: three essays in four have no commissioned imagery**
`[J]`. So the composition is carried by typographic mass, measure and interval,
and photography is what a quarter of the essays get *in addition*. If the index
only works on the illustrated essays, the index does not work.

`beings-co` and `ruadh-com` both record the same exposure in their weaknesses
— ordinary photography collapses the whole system. That is the failure being
designed against here, not one to be repeated.

No video. Nothing in the brief is temporal `[J]`.

## 9. Navigation and control geometry

Minimal and permanent `[J]`: the issue, the archive, the subscription state.
Everything else belongs to the essay it is in.

In the reading view the only persistent control is the return path. Reading
position survives a closed tab, and that is a **stored state, not a UI feature** —
nothing about it should need to be visible while reading `[A]`.

Every persistent layer — header, footnote sheet, subscription prompt — is counted
in the mass scheme before layout rather than added afterwards `[J]`. A reading
page with three floating layers is not a reading page.

## 10. Motion and interaction

Restraint, and here the evidence is specific
`[P evidence:C1e sites:thenewmobileworkforce-imm-g-prod-com-back-at-hq,trionn-com]`:
motion is approved where the subject is temporal and criticised where it
demonstrates capability. **An essay is not temporal.** Motion seasons the
transition between index and essay and does nothing else.

No scroll-jacking, and the reason is recorded rather than assumed: `organimo-com`
is rated 3, and its own limitation note says the capture preserved the visual
language but not the behaviour, because the site scroll-jacks `[J]`. Approving a
reference is not approving its scroll model.

Every animation has a complete static path, and reduced motion gets an authored
still rather than a disabled one `[J]`.

## 11. Component guidance

- **Issue masthead** — issue number, date, one line of what this is. No hero
  image required, and none faked when photography is absent `[J]`.
- **Lead essay block** — title at display scale, byline, one standfirst line, read
  time. The largest mass on the index.
- **Essay row** — title, byline, length. Text scale, not cards `[J]`.
- **Photograph band** — full measure, one image, caption composed rather than
  appended `[R site:thegentlewoman-co-uk]` — the one device that entry gets right,
  taken as a principle and not as its layout.
- **Reading view** — single column, footnote markers inline, footnotes reachable
  without losing position.
- **Archive** — issues by date, essays by title. A door, not a feed.

## 12. Anti-patterns — what this project must not do

- **A first screen so minimal it does not say what this is** — the recorded cost
  of the scale strategy this brief borrows, and the first thing to check.
- **One exceptional cover standing in for a designed site** — the anti-reference
  exists to name exactly this: the opening never develops, and the project fails
  as a website even though the first screen is excellent.
- **Composition that only works when the photography is good** — three essays in
  four have none.
- **Ornament substituting for sequence.** The publication's character comes from
  what is placed where; decoration cannot do that job.
- **Infinite scroll, recommendation feeds, advertising** — excluded by the brief
  and not to be reintroduced as engagement patterns.
- **Scroll-jacking and cursor-dependent discovery** — present in liked references,
  wrong for sustained night-time reading on a phone.
- **Functional text below 14px**, including footnote markers, credits and captions.
- **A second art direction between index and essay** — one language, both views.

## 13. Evidence

- `vault/EVIDENCE.md` — A1 (one governing event), A2 (identity carried by one
  system), A3 (interface subordinate to content), B1 (rhythm as a stated sequence),
  B2 (type and image as one mass), B3 (real photography, one entry, weak),
  C1e (motion where the subject is temporal), C2e (dark ground discriminates
  nothing), **D1 (colour: not answered by the evidence)**.
- Layer verdicts read from sidecars: `vault/reviews/organimo-com.md` (typography),
  `vault/reviews/obys-agency.md` (composition).
- Records carrying the recorded weaknesses cited above: `ciridae-com` (sparse
  rhythm against real volume), `kinncollective-co-uk` (a first screen that does
  not explain), `beings-co` and `ruadh-com` (systems exposed to ordinary
  photography).
- Anti-reference: `thegentlewoman-co-uk` (1 / `out`).

## 14. Implementation prompt

```
Design an independent quarterly of long essays and photo reportage: the issue index
and the essay reading view. Read mostly on a phone, at night, in long sittings.

DELIVERY: BUILD   MANDATE: REBRAND   CARRIED: nothing - no prior identity exists.

STYLE MODE: PURE
  swiss-editorial (library dialect - a method for this project, not a confirmed
  preference). No second dialect: none has a job the system cannot do.

CENTRAL IDEA: the publication is the order it imposes on a quarter of reading.

SIX DECISIONS THAT MATTER
1. The lead essay owns the index's first screen; the issue number is the only
   other mass.
2. One line on that screen says what this is - quarterly, essays, this issue's date.
3. The index alternates on a stated sequence: lead, three titles, one photograph,
   three titles, archive.
4. Two type voices. Editorial serif for the essay, one grotesque for everything else.
5. The composition holds with no photography at all; images are an addition, never
   the structure.
6. Reading position survives a closed tab, and nothing about that is visible while
   reading.

PROHIBITIONS
- no infinite scroll, no feed, no advertising     - no scroll-jacking
- no cursor-dependent discovery                   - no functional text under 14px
- no second art direction between index and essay
- no composition that depends on imagery three essays in four will not have
- no floating layer that was not counted in the mass scheme before layout

COLOUR: not answered by the evidence. Derive it, state the derivation, verify AA on
the composited render. A dark ground is not a shortcut to seriousness.

MOTION: the subject is not temporal. Transitions only, every one with a complete
static path, reduced motion authored rather than disabled.

ACCEPTANCE
- describable in 3-7 masses before any component is named
- hierarchy survives grayscale and thumbnail
- a 9000-word essay is comfortable at 390px; measure and leading judged against it
- footnotes reachable and returnable without losing position
- the index still reads when every essay is text-only
- one language across index and essay: same grid owner, same type roles, same
  motion logic
```

# Design brief — <project>

*Compiled 2026-07-31 by `npm run brief`. Phase 1 (this scaffold) is mechanical;
every decision below is Phase 2, written by the agent and marked with where it
came from. A brief is a **project artefact** — nothing in it becomes a permanent
Design DNA preference without Alex saying so.*

## The request, verbatim

```
DESIGN:
Luxury automotive dealer website.
Brand: Bentley Washington DC.
Goal: redesign the homepage.
```

Terms extracted for candidate ranking: automotive · dealer · bentley · washington

## Provenance — one canonical syntax, machine-validated

| Marker | Means | Requires |
|---|---|---|
| `[P evidence:A1 sites:beings-co,ciridae-com]` | **Permanent** — a demonstrated preference | a claim id from `vault/EVIDENCE.md`, plus the site ids it rests on |
| `[J]` | **Project** — a decision for this brief only | nothing |
| `[R site:rolls-roycemotorcars-com-en-us-home-html layer:colour]` | **Reference-specific** — one site's device. **Never a rule** | a record id; `layer:` only where that site has a sidecar |
| `[A]` | **Agent** — a recommendation with no evidence behind it | nothing |
| `[?]` | **Unknown** — the evidence does not answer this | nothing |

Claim ids (`A1`, `D3`) and record ids (`rolls-roycemotorcars-…`) are different
identifier types and are validated against different sources.

## Candidates — ranked, NOT selected

Ranking order: project-type relevance → approved layer relevance → dialect fit →
evidence completeness → rating. **It orders the list. The agent selects.**

**`in` — eligible as primary or secondary**

| Record | Rating | Status | Term hits | Approved layers | Alex's layer verdicts |
|---|---|---|---|---|---|
| `immersive-g-com` | 3 | in | 1 | 7 | composition:IN, hierarchy:IN, typography:IN, imagery:IN, spacing / density:IN, motion:IN, interaction:IN |
| `rolls-roycemotorcars-com-en-us-home-html` | 3 | in | 0 | 8 | composition:IN, hierarchy:IN, colour:IN, spacing / density:IN, motion:IN, interaction:IN, interaction:IN, design dialect:IN |
| `organimo-com` | 3 | in | 0 | 7 | composition:IN, typography:IN, colour:IN, imagery:IN, spacing / density:IN, motion:IN, interaction:IN |
| `obys-agency` | 2 | in | 0 | 4 | composition:IN, colour:IN, imagery:IN, motion:IN |
| `beings-co` | 3 | in | 0 | — | — |
| `ciridae-com` | 3 | in | 0 | — | — |
| `electrafilmworks-com` | 2 | in | 0 | — | — |
| `i-pinimg-com-736x-46-d9-d5-46d9d54b7cc97b5687cbfd24a1410d34-` | 2 | in | 0 | — | — |
| `ruadh-com` | 2 | in | 0 | — | — |
| `augen-pro` | 2 | in | 0 | — | — |
| `kinncollective-co-uk` | 2 | in | 0 | — | — |
| `thenewmobileworkforce-imm-g-prod-com-back-at-hq` | 2 | in | 0 | — | — |
| `trionn-com` | 2 | in | 0 | — | — |

**`hybrid` — contextual only, limited to the named layer or function. Never presented as an overall positive reference.**

| Record | Rating | Status | Term hits | Approved layers | Alex's layer verdicts |
|---|---|---|---|---|---|
| `carvana-com` | 2 | hybrid | 2 | — | — |
| `porsche-com-usa` | 2 | hybrid | 2 | — | — |

**`out` — anti-references only: prohibitions and failure patterns.**

| Record | Rating | Status | Term hits | Approved layers | Alex's layer verdicts |
|---|---|---|---|---|---|
| `rmsothebys-com` | 1 | out | 1 | — | — |
| `thegentlewoman-co-uk` | 1 | out | 0 | — | — |

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

**`technical-luxury` — library dialect selected as this project's method; not a
confirmed permanent Alex preference.** Contrast: **`cinematic-industrial` — also a
library dialect**, holding image light and depth only. Anchor owns structure,
specification and detailing; contrast owns nothing outside imagery.

What decided it `[J]`: the visitor arrives to evaluate a specific car at a specific
dealer, so specification has to be desirable content rather than a table at the
bottom. `auction-editorial` (**confirmed**, the house dialect) was considered and
rejected for this brief `[J]`: it is built for one-of-one lots, and a dealer page
carries inventory, service and finance.

## 2. References

- **Primary** — `rolls-roycemotorcars-com-en-us-home-html` (3 / `in`): the closest
  match on task, sector and price register, and the only automotive record Alex
  rated 3.
- **Secondary** — none. Two of the three remaining automotive records are
  `hybrid`, and no other `in` record is close enough on project type to earn a
  supporting role. An empty slot is a decision `[J]`.
- **Contextual** — `hybrid`, one named function each, never an overall endorsement:
  - `porsche-com-usa` — **the model-range function only**: one campaign screen
    handing over to a classified, configurable range. Nothing about its homepage
    sequence is carried; Alex's own note records that sequence as generic.
  - `carvana-com` — **the intent split only**: buy / sell / finance separated at
    the top so a visitor self-sorts before scrolling. Its card grid, its palette
    and its illustration style are not carried.
- **Anti-reference** — `rmsothebys-com` (1 / `out`): *"premium content alone does
  not create premium art direction."* Used to establish prohibitions in §12.
- **Not carried forward**:
  - `immersive-g-com` — cursor-tracked image reveal `[R site:immersive-g-com layer:interaction]`.
    A dealer visitor arrives with a task; exploration-by-cursor costs them time.
  - `obys-agency` — side-scrolling portfolio sequence `[R site:obys-agency layer:composition]`.
    Portfolio logic, not inventory logic.
  - `organimo-com` — the italic-word-inside-upright headline `[R site:organimo-com layer:typography]`.
    A signature that belongs to that brand's voice, not Bentley's.
  - `beings-co`, `ciridae-com` — rated 3 and `in`, and excluded anyway: casting
    directory and enterprise AI. Rating is not relevance `[J]`.

## 3. Art direction

One continuous environment rather than a sequence of styled bands
`[P evidence:A2 sites:beings-co,ciridae-com,ruadh-com,electrafilmworks-com]` — the
identity is carried by one system, not by an accumulation of devices.

The subject is the car and the dealer's ability to hand it over. Every device
present must serve that; the register is engineered confidence, not spectacle `[J]`.

## 4. Composition and hierarchy

One governing event owns the first screen and everything else defers
`[P evidence:A1 sites:beings-co,ciridae-com,ruadh-com,electrafilmworks-com,trionn-com]`.
Here that is one vehicle, at full bleed, with the model name and one action.

The first screen must also say what this is `[P evidence:A1 sites:kinncollective-co-uk]` —
a Bentley dealer in Washington DC, not Bentley the marque. Below it, the intent
split `[R site:carvana-com]`: inventory, service, finance, each
reachable without scrolling past a campaign.

Interface subordinate to the subject
`[P evidence:A3 sites:electrafilmworks-com,ciridae-com,beings-co,ruadh-com]`, with
the floor Alex's own weaknesses record: nothing functional below 14px, and no
compositional move deletes the means of the task.

## 5. Layout and spacing

Large sections, generous intervals, and a rhythm that changes between the
campaign screen and the inventory band `[A]` — the evidence for felt rhythm is
Alex's own testimony on two records, not a measurement, so this is stated as a
recommendation rather than a preference.

Density rises deliberately at the specification and inventory blocks: comparison
is the task there, and comparison needs proximity `[J]`.

## 6. Typography

Two voices, not more `[P evidence:A2 sites:beings-co,ruadh-com]`. A display
voice for model names and one number that matters; a quiet text voice for
everything else, including specification.

Uppercase confined to small labels with real tracking, normal case for reading
`[R site:organimo-com layer:typography]` — carried as a *principle about register*,
not as Organimo's setting.

Specification is set as content, at reading size, with tabular figures. Not a
footnote `[J]`.

## 7. Colour

**`[?]` Nothing is known about Alex's colour preference from the evidence**
(`vault/EVIDENCE.md` D1). The palette is therefore **derived from Bentley's own
assets and stated in the Design Read**, never chosen from taste.

What the evidence does support: hierarchy must survive grayscale, and the accent
must be derived from something the project contains rather than picked `[J]`.
Measured, not assumed: the primary reference runs a **warm** dark system
`[R site:rolls-roycemotorcars-com-en-us-home-html layer:colour]` — worth knowing,
not worth copying into a different marque.

## 8. Imagery and video

Vehicle imagery at full bleed, one subject per screen, art-directed rather than
catalogue-lit `[J]`.

Video, where it exists, is sized to the viewport with `object-fit: cover` and no
mask `[R site:rolls-roycemotorcars-com-en-us-home-html layer:imagery]` — measured on
that site: three viewport-sized videos, `border-radius: 0`, no `mask-image`. The
seamlessness comes from full-bleed sizing, not from a compositing trick. **This is
a reference-specific finding, not a rule.**

**`[?]`** Whether the dealer has usable video at all is unknown; if not, the
composition must hold on stills alone — a dependency to declare, not discover.

## 9. Navigation and control geometry

A side drawer for the full navigation, with the primary actions staying visible
in the bar `[R site:rolls-roycemotorcars-com-en-us-home-html layer:interaction]`.
Frosted glass on that drawer is **measured** on the reference —
`backdrop-filter: blur(150px) saturate(1.8)` — and is carried here only if it
survives an AA contrast check over real photography `[J]`.

Control geometry: pill actions used sparingly — the reference runs **three** on its
homepage and **zero circular controls** `[R site:rolls-roycemotorcars-com-en-us-home-html layer:interaction]`.
Sparing is the transferable part; the shape is not the point `[A]`.

Every persistent layer — bar, drawer, consent, chat — is counted in the mass scheme
before layout, not added after `[J]`.

## 10. Motion and interaction

Restraint `[P evidence:C1e sites:thenewmobileworkforce-imm-g-prod-com-back-at-hq,trionn-com]`:
motion is approved in the evidence where the subject is temporal and criticised
where it demonstrates capability. A dealer page is not temporal, so motion seasons
and does not perform.

**`[?]`** Timing, easing and transition mechanics of the primary reference were
**not preserved by any capture** and are not specified here. Whatever is built gets
its own reduced-motion path and its own timing decisions `[J]`.

## 11. Component guidance

- **Hero** — one vehicle, model name, one action. No carousel `[J]`.
- **Intent split** — three destinations, equal weight, above the fold
  `[R site:carvana-com]`.
- **Inventory row** — real photography, price and key specification visible without
  a hover; comparison is the job `[J]`.
- **Model range** — classified and configurable rather than a poster wall
  `[R site:porsche-com-usa]`.
- **Specification block** — composed as a record, tabular figures, reading size `[J]`.
- **Contact and service** — phone, address, hours, book-service, each a real target
  of at least 44px `[J]`.

## 12. Anti-patterns — what this project must not do

- **Competing art directions between sections** — one language for the whole page.
- **The device outranking the car** — the mechanism serves the subject or goes.
- **Deleting the means of the task** — inventory search, service booking, phone and
  address survive every compositional decision.
- **Premium content mistaken for art direction** `[R site:rmsothebys-com]` —
  the anti-reference exists to name exactly this failure.
- **A grid of identical cards** as the inventory answer `[J]`.
- **Functional text below 14px** — the most repeated weakness in the whole vault.
- **Cursor-dependent discovery, scroll-jacking, gated intros** — all present in
  liked references, none appropriate to a task-led dealer page `[J]`.
- **Effect stacking**: frosted glass, video, drawer and motion together, each
  because a reference had it. Prefer few decisions that cohere `[J]`.

## 13. Evidence

- `vault/EVIDENCE.md` — A1 (one governing event), A2 (identity carried by one
  system), A3 (interface subordinate), C1e (motion where the subject is temporal),
  **D1 (colour: unknown)**.
- `vault/reviews/rolls-roycemotorcars-com-en-us-home-html.md` — measured glass,
  video census, control geometry, warm dark palette; and its stated limits: menu
  timing, easing, playback continuity, masking — none preserved.
- `vault/reviews/obys-agency.md`, `vault/reviews/organimo-com.md`,
  `vault/reviews/immersive-g-com.md` — the layers cited above as not carried.
- Screenshots: `vault/shots/rolls-roycemotorcars-com-en-us-home-html/strip-1..8`,
  `strip-m-1..6`.
- Records: `rolls-roycemotorcars-com-en-us-home-html` (3/in), `porsche-com-usa`
  (2/hybrid), `carvana-com` (2/hybrid), `rmsothebys-com` (1/out).

## 14. Implementation prompt

```
Redesign the homepage for Bentley Washington DC — an authorised dealer, not the marque.

DELIVERY: BUILD   MANDATE: REDESIGN
CARRIED UNTOUCHED: the Bentley wordmark and its lockup, the marque's own vehicle
photography, the dealer's name and location.

STYLE MODE: DIRECTED HYBRID
  Anchor:   technical-luxury      (library dialect — a method for this project,
                                   not a confirmed Alex preference)
  Contrast: cinematic-industrial  (library dialect) — image light and depth ONLY
  CONTROL MAP: composition, hierarchy, information, geometry -> anchor;
               image light and depth -> contrast;
               task means and CTA rank -> the task, never a dialect.

CENTRAL IDEA: the specification is the seduction — this dealer can hand you this car.

FIVE DECISIONS THAT MATTER
1. One vehicle owns the first screen, full bleed, with the model name and one action.
2. The first screen says it is a Bentley dealer in Washington DC.
3. Inventory, service and finance are reachable without scrolling past a campaign.
4. Specification is content at reading size with tabular figures, never a footnote.
5. Two type voices. Uppercase only in small tracked labels.

PROHIBITIONS
- no second art direction in any section        - no carousel in the hero
- no card grid as the inventory answer          - no functional text under 14px
- no cursor-dependent discovery, no scroll-jacking, no gated intro
- no stacking glass + video + drawer + motion because a reference had them
- nothing may remove inventory search, service booking, phone, address or hours

COLOUR: unknown from evidence. Derive from Bentley's own assets, state the
derivation, verify AA on the composited render — never sample it from a reference.

MOTION: restrained; the subject is not temporal. Every animation has a complete
static path. Timing and easing are yours to decide — none was preserved by capture.

ACCEPTANCE
- describable in 3-7 masses before any component is named
- hierarchy survives grayscale and thumbnail
- every task means present and reachable at 390px, targets >= 44px
- AA on the composited render, measured with the text layer hidden
- one language down the whole page: same grid owner, same image treatment,
  same geometry logic, same motion logic in every section
```

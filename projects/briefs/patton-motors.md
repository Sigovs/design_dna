# Design brief — <project>

*Compiled 2026-08-11 by `npm run brief`. Phase 1 (this scaffold) is mechanical;
every decision below is Phase 2, written by the agent and marked with where it
came from. A brief is a **project artefact** — nothing in it becomes a permanent
Design DNA preference without Alex saying so.*

## The request, verbatim

```
Patton Motors — Pompano Beach, Florida. Collector-car dealer with four
businesses on one site: live auctions with a clock, a floor of about forty cars,
sell & consign, and a physical room open Saturdays 9–1.

REDESIGN of pattonmotors.com. Static mockup over the AAN WordPress theme, no
build step; everything written is an override on a compiled style.css.

The business's own sentence, taken off their About page where it was buried:
"a bohemian car place". It is the one line no competitor can say and it covers
auctions, floor and room at once. It carries through untouched.

What exists: a full-bleed video hero and a band of four routes. Nothing below
that. Three passes have already gone into the hero alone.

What is needed: the whole page, in one pass, all the way down. Order already
settled — hero, routes, auctions, the floor, sell & consign, why Patton, footer.
Auctions above inventory because a thing with a clock outranks a thing without
one.

Auction cards and inventory cards are the same component, distinguished by the
data plate: state + bid + time versus asking price. A car on the block leaves
the floor. Bids, counts and closing times are sample data and must be marked as
such.

Alex wants alternating section grounds and scroll overlays, used sparingly.

No commissioned photography. Imagery is the dealer's own inventory frames, of
uneven quality.
```

Terms extracted for candidate ranking: patton · motors · pompano · beach · florida · collector-car · dealer · four · businesses · live · auctions · clock

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
| `semlerpremium-dk-showroom` | 3 | in | 21 | 7 | composition:IN, composition:IN, hierarchy:IN, typography:IN, spacing / density:IN, imagery:IN, imagery:OUT, interaction:IN, interaction:OUT |
| `polestar-com-us` | 2 | in | 19 | 8 | composition:IN, composition:IN, composition:OUT, composition:OUT, hierarchy:IN, hierarchy:OUT, typography:IN, layout:IN, colour:IN, imagery:IN, imagery:OUT, interaction:IN |
| `morningstar-ventures` | 3 | in | 18 | — | — |
| `oilstainlab-com` | 3 | in | 18 | — | — |
| `rimac-automobili-com-nevera` | 2 | in | 17 | — | — |
| `beings-co` | 3 | in | 16 | — | — |
| `semlerpremium-dk-brands-porsche-911-gt3-11cec851-9b66-4905-a` | 3 | in | 15 | 6 | composition:IN, composition:IN, composition:OUT, composition:OUT, hierarchy:IN, hierarchy:OUT, typography:IN, spacing / density:IN, imagery:IN, imagery:OUT |
| `semlerpremium-dk` | 2 | in | 14 | 6 | composition:IN, composition:OUT, hierarchy:IN, typography:IN, spacing / density:IN, imagery:IN, imagery:OUT, interaction:IN, motion:OUT |
| `mclaren-com-cars-gl-en` | 2 | in | 14 | — | — |
| `hispanosuizacars-com` | 2 | in | 13 | — | — |
| `kinncollective-co-uk` | 2 | in | 13 | — | — |
| `rolls-roycemotorcars-com-en-us-home-html` | 3 | in | 12 | 8 | composition:IN, hierarchy:IN, colour:IN, spacing / density:IN, motion:IN, interaction:IN, interaction:IN, design dialect:IN |
| `ruadh-com` | 2 | in | 11 | — | — |
| `augen-pro` | 2 | in | 11 | — | — |
| `thenewmobileworkforce-imm-g-prod-com-back-at-hq` | 2 | in | 10 | — | — |
| `ciridae-com` | 3 | in | 9 | — | — |
| `i-pinimg-com-736x-46-d9-d5-46d9d54b7cc97b5687cbfd24a1410d34-` | 2 | in | 9 | — | — |
| `organimo-com` | 3 | in | 8 | 7 | composition:IN, typography:IN, colour:IN, imagery:IN, spacing / density:IN, motion:IN, interaction:IN |
| `electrafilmworks-com` | 2 | in | 8 | — | — |
| `trionn-com` | 2 | in | 8 | — | — |
| `immersive-g-com` | 3 | in | 4 | 7 | composition:IN, hierarchy:IN, typography:IN, imagery:IN, spacing / density:IN, motion:IN, interaction:IN |
| `obys-agency` | 2 | in | 2 | 4 | composition:IN, colour:IN, imagery:IN, motion:IN |

**`hybrid` — contextual only, limited to the named layer or function. Never presented as an overall positive reference.**

| Record | Rating | Status | Term hits | Approved layers | Alex's layer verdicts |
|---|---|---|---|---|---|
| `porsche-com-usa` | 2 | hybrid | 15 | — | — |

**`out` — anti-references only: prohibitions and failure patterns.**

| Record | Rating | Status | Term hits | Approved layers | Alex's layer verdicts |
|---|---|---|---|---|---|
| `hbbody-com-en-home` | 2 | out | 33 | — | — |
| `lapz-io` | 3 | out | 32 | — | — |
| `thegentlewoman-co-uk` | 1 | out | 19 | 5 | composition:IN, composition:OUT, typography:IN, colour:IN, imagery:IN, spacing / density:IN, interaction:OUT |
| `rivian-com` | 2 | out | 13 | — | — |
| `rmsothebys-com` | 1 | out | 12 | 3 | composition:IN, composition:OUT, composition:OUT, typography:IN, typography:OUT, colour:IN, imagery:OUT, interaction:OUT |

## Exclusions — explicit project verdicts, applied before ranking

**A record listed here was barred from this project by Alex. The bar is absolute:
it is applied before any ranking, so no axis can return it — not rating, not
compositional operation, not sector relevance, and not an axis added later. Its
standing everywhere else is untouched.**

| Record | Verdict | Reason |
|---|---|---|
| `rekorderstudios-com` | Alex, 2026-08-13 | Explicitly excluded from Patton Motors. It entered this brief by accident and must not be used as evidence, direction, compositional source or retrieval candidate for this project. Rating 3 and `in` everywhere else. |

## Dialects available

| Dialect | Status |
|---|---|
| `auction-editorial` | **confirmed** |
| `brutalist-utility` | **library** |
| `cinematic-industrial` | **library** |
| `expressive-poster` | **library** |
| `immersive-authored-world` | **confirmed** |
| `organic-tactile` | **library** |
| `refined-elegance` | **library** |
| `retro-futurist` | **library** |
| `swiss-editorial` | **library** |
| `technical-luxury` | **provisional** |

**A `library` dialect may be selected as a project method and must be labelled as
one. Only a `confirmed` dialect may be called a demonstrated personal preference;
a `provisional` one keeps its label.**

---

## 1. Dialect

**`auction-editorial`** — the **confirmed** house dialect, distilled from Alex's own
vault evidence, so it may be called a demonstrated personal preference rather than
a method borrowed for the job.

What decided it: the dialect's subject is *the singular lot, composed as a record*.
Patton runs live auctions with a clock, a floor of forty cars and a consignment
route — the whole business is lots and records. No other stored dialect has that
subject. `technical-luxury` proves value by specification and would fit a
manufacturer; Patton is not building the cars. `immersive-authored-world` stages a
symbolic event; a dealer needs forty of them findable `[J]`.

The dialect is declared here because it was **never declared before**, and that is
the specific reason the work reads as competent and characterless: every invariant
passes and nothing says why the page looks the way it does `[A]`.

## 2. References

- **Primary** (max 2):
  `semlerpremium-dk-showroom` — rating 3, seven Alex-approved layers. An SRP that
  reads as a curated collection *without disguising the SRP structure*. This is the
  floor section's reference and the single most transferable record in the vault for
  this brief `[R site:semlerpremium-dk-showroom]`.
  `semlerpremium-dk-brands-porsche-911-gt3-11cec851-9b66-4905-a` — rating 3. One
  inventory vehicle treated as a significant product rather than a database entry.
  This is the auction card and the lot page `[R site:semlerpremium-dk-brands-porsche-911-gt3-11cec851-9b66-4905-a]`.

- **Secondary** (max 3):
  `rolls-roycemotorcars-com-en-us-home-html` — rating 3, for the restrained luxury
  palette applied consistently and video treated as continuous environment rather
  than a media block `[R site:rolls-roycemotorcars-com-en-us-home-html]`.
  `mclaren-com-cars-gl-en` — campaign energy against a disciplined system `[R site:mclaren-com-cars-gl-en]`.
  `ciridae-com` — rating 3, `in`. Borrowed for **one thing only**: how restrained
  metadata on fine horizontal rules works as a technical counterpoint to a large
  editorial voice — *"restrained sans-serif metadata, numbered structures, and fine
  horizontal rules turn a technically complex platform into a calm and credible
  system."* Patton has a physical room open Saturdays 9–1, and that fact wants the
  same treatment: a plate, ruled, quiet, beside the loud thing rather than inside it
  `[R site:ciridae-com]`.

  *Replaced the record originally cited here on 2026-08-13. See Exclusions above —
  the substitution was made on the compositional operation, not on the category.*

- **Contextual** (max 3 · `hybrid`, named layer only):
  `porsche-com-usa` — inventory integration only. Not an overall endorsement `[R site:porsche-com-usa]`.

- **Anti-reference** — and this one is the sharpest instrument in the brief:
  `rmsothebys-com` (rating 1, `out`) is **an auction house whose site fails on
  exactly the axis Patton is currently failing on**: a strong opening that never
  develops, no sustained dominant–subordinate–support relationship after the hero,
  negative space acting as passive separation. Alex's own verdict on it —
  *"premium content alone does not create premium art direction"* `[R site:rmsothebys-com]`.
  `thegentlewoman-co-uk` (rating 1, `out`) fails identically: *"one decent cover
  does not make this a reference"* `[R site:thegentlewoman-co-uk]`.

- **Not carried forward:** `morningstar-ventures` and `lapz-io` — both rating 3 and
  both magnificent, but their governing move is a cinematic sequence carrying the
  argument, which is the failure mode this project must avoid, not adopt `[J]`.
  `oilstainlab-com` — one car, mythologised; Patton has forty and must keep them
  findable `[J]`.

## 3. Art direction

**A record of a floor, not a campaign for a car.**

The dealer's inventory photography is uneven by nature and will stay uneven. The
identity therefore cannot rest on any single frame — it rests on **interval,
plate and rule**: consistent crop ratio, a mono data plate under every car, hairline
separators, and generous air between lots `[J]`.

This is the declared asset dependency, and it is declared deliberately: the
composition must survive an ordinary phone photograph of a car on the floor. If a
section only works with the best frame in the set, it is not finished `[P evidence:B3 sites:ciridae-com]`.

The one place spectacle is permitted is the hero, which already exists. It does not
get a fourth pass.

## 4. Composition and hierarchy

**Six major masses, named before any component:**

1. hero — one held frame, the business's own sentence, one route out
2. routes — four doors of equal rank, each carrying a live fact rather than a label
3. **auctions** — the clock. The page's dominant after the hero
4. the floor — forty lots as a curated collection
5. sell & consign — the second door, a different shape from the first
6. why Patton + the room — Saturdays 9–1, address, the human close

**The compositional centre is the auction band**, not the hero. A thing with a
clock outranks a thing without one, and the hero's job is to hand over to it
rather than to hold `[J]`.

Dominant: auctions. Subordinate: the floor. Support: routes, consign, room `[J]`.

## 5. Layout and spacing

Air-first and bottom-heavy, per the dialect. Internal gaps always smaller than
external — the failure that makes a card grid read as a database `[P evidence:A2 sites:beings-co,ciridae-com]`.

**Alternating grounds get one rule, not a rhythm: two ground changes for the whole
page.** Alex's own record `hbbody-com-en-home` names the reason — without tonal
contrast layering does not register — and names the cost: repeated intensity leaves
no room for silence `[R site:hbbody-com-en-home]`.

## 6. Typography

Three voices, no more. Display for the sentence and the lot names; a quiet
grotesque for reading; **mono for data** — bids, times, mileage, price, hours.

`--t-micro: 14px` is the functional floor and nothing readable goes below it
`[P evidence:A3 sites:beings-co]`. Figures in the plates are tabular so prices and
times align down a column rather than compete `[R site:semlerpremium-dk-brands-porsche-911-gt3-11cec851-9b66-4905-a]`.

## 7. Colour

**Not dark by default.** `EVIDENCE.md` records colour as UNKNOWN, and darkness sits
on approved and rejected records alike — it discriminates nothing and is never a
shortcut to seriousness `[P evidence:D1 sites:beings-co]`.

The ground is derived from the room and the cars, and the derivation is stated when
it is chosen. One accent, rationed, carrying auction state only — live, closing,
sold. Colour as information, never as decoration `[J]`.

Legibility over imagery is fixed at the background layer: a scrim under text on a
photograph, not a lighter type colour `[?]` until the ground is chosen.

## 8. Imagery and video

The dealer's own inventory frames, uneven and staying uneven.

**`generated-imagery` binds, and GI3 is the one that matters here: nothing synthetic
may depict a real Patton car, the real floor, the real room or a real person.** A
generated photograph of a car being sold is a false statement about that car, made
in the medium buyers trust most `[J]`.

Any synthetic frame keeps a `gen-` prefix and a sidecar recording origin, model,
date and subject.

## 9. Navigation and control geometry

Four routes of genuinely different paths, each named by what it does, not by a
category noun. Two doors of equal rank — buy and sell — is a declared yield on
`anti-patterns` D6 under its "genuinely parallel choices" condition, and it is
stated rather than taken silently `[J]`.

**Both link states must be named.** Bootstrap 4's reboot sets
`a:hover{text-decoration:underline}` and the AAN theme ships it; naming only one
state returns the underline `[J]`.

## 10. Motion and interaction

Two scroll overlays for the whole page, at the two ground changes — not a
transition between every block `[R site:hbbody-com-en-home]`.

Every frame the visitor can stop on must work as a composition. Alex reached this
independently on three unrelated sites, and it is `motion-judgment` MJ4
`[R site:morningstar-ventures]`.

`prefers-reduced-motion` is not optional and is already present in all four
stylesheets — keep it that way `[J]`.

## 11. Component guidance

**One card component for auctions and inventory**, distinguished only by the data
plate: state + bid + time versus asking price. A car on the block leaves the floor
`[J]`.

The plate is the component's spine — mono, tabular, hairline-separated. Cards carry
no buttons; the whole card is the target `[R site:semlerpremium-dk-showroom]`.

## 12. Anti-patterns — what this project must not do

- **A strong opening that never develops into a page.** Both `out` records in the
  vault fail on this exact axis, one of them an auction house. Three passes have
  already gone into this hero. **The hero does not get a fourth** `[R site:rmsothebys-com]`.
- **Dark as a shortcut to seriousness** `[P evidence:D1 sites:beings-co]`.
- **A card grid that reads as a database** — internal gaps equal to or larger than
  external, badges on every card, a button per card `[J]`.
- **Repeated intensity.** Two overlays, two ground changes. If every chapter is
  loud the page has no silence to spend `[R site:hbbody-com-en-home]`.
- **Unmarked sample data.** Bids, counts and closing times are simulated and must
  say so wherever they appear `[J]`.
- **Underline returning through the Bootstrap reboot** `[J]`.
- **Generated imagery standing in for a real car, the real floor or a real person** `[J]`.
- **Functional text below 14px** `[P evidence:A3 sites:beings-co]`.

## 13. Evidence

- `semlerpremium-dk-showroom` — rating 3, seven Alex-approved layers including
  composition, hierarchy, typography, spacing/density and interaction. Shots in
  `vault/shots/semlerpremium-dk-showroom/`.
- `semlerpremium-dk-brands-porsche-911-gt3-…` — rating 3, six approved layers.
- `rmsothebys-com` — rating 1, `out`. The anti-reference, and the closest analogue
  to this business in the whole vault.
- `hbbody-com-en-home` — rating 2, `out`. Carries the overlay reasoning and its
  cost, in Alex's own words.
- `EVIDENCE.md` D1 — colour recorded as UNKNOWN.
- **Open the shots, not only the notes.** Three passes on this project were
  rejected while every judgement was quoted correctly and no screenshot had been
  opened.

## 14. Implementation prompt

MANDATE REDESIGN. Dialect **auction-editorial** (confirmed). Build the whole page
in one pass, top to bottom, and do not reopen the hero.

Order: hero (exists) → routes (exists) → **auctions** → the floor → sell & consign
→ why Patton + the room → footer. Auctions are the compositional centre; the hero
hands over to them.

One card component for auctions and inventory, separated by the data plate: state
+ bid + time versus asking price. Mono, tabular figures, hairline rules, no button
per card. A car on the block leaves the floor. Mark all sample data as sample.

Two ground changes and two scroll overlays for the entire page. Air-first,
bottom-heavy, internal gaps smaller than external. Three type voices, mono for all
data, nothing readable below 14px. Not dark by default — derive the ground and
state the derivation. One accent, carrying auction state only.

Name both link states or the Bootstrap reboot returns the underline. Keep
`prefers-reduced-motion` in every stylesheet.

Acceptance: the page reads as 3–7 major masses before any component is named; the
auction band outranks the hero; the floor survives an ordinary phone photograph;
every stoppable frame is a composition; no synthetic image depicts a real Patton
car, room or person.


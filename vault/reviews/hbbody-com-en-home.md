# Review history — hbbody-com-en-home

Append-only. `sites.json` holds the current state; this file holds how it got
there. Alex's wording is never edited, and agent observations are never merged
into his judgement.

**Layer verdicts are per layer.** A verdict here is never propagated to the whole
record: `dialectStatus` stays a whole-record field that only Alex sets.

---

## 2026-08-05 · JUDGEMENT

- **action:** whole-record judgement set by Alex
- **previous rating / dialectStatus:** **2 / unreviewed**
- **current rating / dialectStatus:** **2 / out** — **no dialect** — correct and required for `out`, not a gap
- **rating:** unchanged.

### Alex's judgement — verbatim

> `out`

> Reason as stated in the option he selected: kept for its weaknesses: a colour manufacturer with no colour on the first screen.

Given in conversation on 2026-08-05, against the record's shots and the agent
observations below.

### Agent observations — not Alex's judgement

| Layer | Observation | Source | Verdict |
|---|---|---|---|
| colour | A manufacturer whose product is colour opens on a nearly desaturated dark room, and the only saturated element is a purple-teal gradient chat icon. | agent | unreviewed |
| composition | That icon is a UI sticker rather than the subject, and it occupies the compositional centre. | agent | unreviewed |
| typography | The headline is set in a neutral geometric grotesque with no relation to the brand's own logotype. | agent | unreviewed |
| layout | The first screen is a five-state carousel, and the body copy runs five lines at body size over photography. | agent | unreviewed |

**Every row above is `agent` / `unreviewed`.** A layer Alex did not judge stays
unjudged.

### Still owed

The `note` field still reads `TODO`. Alex set the status
but has not written why in his own words, and **the note is his, so nothing here
fills it in.** For an `out` record the weaknesses *are* the reason it
is kept, so an empty note leaves the record without its only purpose.

## 2026-08-05 · NOTE, AND A CORRECTION TO THE ENTRY ABOVE

- **action:** Alex wrote the record's reasoning; `note`, `works` and `weaknesses` filled
- **rating:** unchanged at **2**
- **dialectStatus:** unchanged, `out` — **still correct, for the opposite reason**

### Correction — the reason recorded earlier is wrong

The JUDGEMENT entry above records: *"Reason as stated in the option he selected:
kept for its weaknesses: a colour manufacturer with no colour on the first
screen."*

**That reason is not his and it is not true.** It was the agent's reading of the
hero screenshot, written into the wording of the option he was asked to choose
from. His note says the opposite: *"Color используется концептуально: для
производителя покрытий цвет становится частью идентичности."* He opens the note
with *"этот сайт мне тоже очень нравится."*

This file is append-only, so the earlier entry stands as written and this
correction sits after it. What went wrong is worth keeping: **an option label
carried the agent's judgement, and selecting the option was recorded as
endorsing that judgement.** A verdict was collected honestly; a reason was not.

### Why `out` is nonetheless the right status

Not as a rejection. He names the record *Industrial Editorial / Layered Scroll
Architecture*, and no stored dialect covers it — which is exactly what `out`
means: good work outside every stored dialect, and the raw material a new one is
built from. The status survives the correction; only the reason changes.

### Alex's note — verbatim, never edited

His structure is unusual and was preserved rather than flattened: the
section-by-section walkthrough, the five reasons the overlays work, and the
front-end reading all sit in `works`, because they are all *why it works*.

### What this record now carries that no other does

A **front-end reading**: sticky sections with controlled top offsets, distinct
stacking contexts, foreground panels with their own backgrounds, scroll-progress
transforms, restrained easing over abrupt pinning — plus his own caution against
applying `position: sticky` to every section, and a named component pattern
(immersive scene → foreground chapter → release).

Notable for this repo: his required list — `prefers-reduced-motion`, no scroll
hijacking, stable height before media loads, GPU-transform control, Safari
verification, document order preserved for accessibility — **independently
restates the motion invariants** already in `skills/motion-taste` and
`skills/anti-patterns`. He arrived at them from the site, not from the rules.

### The applied instruction he wrote for his own work

*"Hero остаётся pinned, а inventory-intro накрывает его светлой панелью; затем SRP
уже отпускается в нормальный flow ... но не надо превращать весь dealer homepage в
десять sticky-screen — двух сильных overlay-переходов будет достаточно."*

That is a concrete dealer-site pattern with its own stated limit. It belongs in a
brief, not in `EVIDENCE.md`, until a second record supports it.

### Distillation candidates, recorded and not promoted

1. *"An industrial website becomes desirable when it visualizes the result of the
   product before explaining the product itself."*
2. *"Let the next section cover the previous one before asking the visitor to
   forget it."*
3. *"Use sticky overlays to connect chapters — not merely to make scrolling look
   expensive."*
4. *"The strongest scroll effect does not animate objects inside the layout — it
   changes how the layout occupies space."*

The fourth is the strongest of anything written today: it is a general statement
about motion, not about this site, and it would sit naturally beside
`motion-judgment`'s rule that the subject decides rather than the amount.

### Tags

On existing terms: `tonal-structure` (his own observation — dark media against
pale panels is what makes the depth planes readable), `structured-specification`,
`product-storytelling`, `asymmetry`, `restraint`, `art-direction`,
`repeated-composition-risk` — the last named exactly by his central weakness, that
repeated intensity leaves no room for visual silence.

`chapter-navigation` follows today's precedent from `rimac`. `sticky-layering` is a
new free addition in `motion`, **pending vocab** — `parallax`, `scroll-reveal` and
`state-transition` all describe something else, and the whole point of his note is
that this effect is none of them.

Queued in `unsorted`: *Industrial Branding* · *Layered Scroll* · *Sticky Overlays* · *Spatial Composition* · *Editorial B2B* · *Product Ecosystem* · *Manufacturing Data* · *Automotive Culture* · *Color Systems* · *Scroll Choreography* · *Industrial Photography* · *Automotive Refinish*.

**Three weaknesses have no term and stay in prose:** dependence on high rendering
performance, the foreground panel covering the scene too fast on small laptops
(viewport-dependent but not mobile, so `mobile-recomposition-risk` would be
wrong), and the homepage system not carrying into utilitarian inner pages.

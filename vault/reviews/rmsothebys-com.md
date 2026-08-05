# Review history — rmsothebys-com

Append-only. `sites.json` holds the current state; this file holds how it got
there. Alex's wording is never edited, and agent observations are never merged
into his judgement.

**Layer verdicts are per layer.** A verdict here is never propagated to the whole
record: `dialectStatus` stays a whole-record field that only Alex sets.

---

## 2026-08-05 · QUICK · **SIDECAR WRITTEN AFTER THE RECORD**

> **Written after the fact.** The record was created 2026-07-24, before this
> directory covered it. Nothing was re-captured and nothing was re-judged.

> **Written to answer one question**, set by Alex: **separate the specific
> failures from the general dislike.** An anti-reference is only useful if what
> it proves is nameable — otherwise it is a page somebody did not enjoy, and a
> corpus of those teaches nothing.

> **An anti-reference can never be positive foundation.** This record is `out`
> and is kept because it fails. It cannot support a new dialect, cannot supply
> governing logic, and its only evidential use is confirming rules that already
> exist by showing what their absence costs.

- **submitted:** https://www.rmsothebys.com/
- **rating / dialectStatus:** **1 / out** — unchanged
- **capture limitation:** none recorded.

### Alex's comment — verbatim, stored in `note`

> Captured as the working example for the auction-catalog register that skills/typography-taste borrows from.
>
> Anti-reference — exceptional automotive assets trapped inside a generic corporate-luxury CMS. Premium content alone does not create premium art direction.

### Alex's durable summary — verbatim, stored in `works`

> The hero is the right idea: full-bleed night photography, and the lot text sits in a translucent grey scrim block in the lower left rather than being centred over the image — the scrim is doing the legibility work, exactly the escalation ladder in skills/color-taste §5.
>
> The title is set in a high-contrast serif with true typographic quotes ('The Pop Art F1'), the supporting lines drop to a neutral grotesque, and the date/venue line goes smallest — three registers in a four-line block, which is the whole editorial-contrast idea in miniature.

### Alex's limitation statement — verbatim, stored in `weaknesses`

> Where it falls short of a rating 3: the nav is a plain uppercase grotesque row with no tracking discipline, VIEW LOT is an underlined text link inside a scrim (a banned pattern — it reads as prose, not as an action), and the carousel arrows are large chrome overlays on the photograph. The lot plate below the fold is closer to a generic e-commerce grid than to a printed catalog page. Useful for the hero treatment; not a model for the rest.
>
> The hero relies almost entirely on photography, while the rest of the page collapses into repetitive card grids, mechanical 50/50 bands, cosmetic luxury typography, weak micro-hierarchy, and arbitrary tonal alternation. There is no sustained dominant-subordinate-support relationship after the hero. Negative space acts as passive separation rather than an active compositional shape. Image directions fail to build a continuous eye path, tonal masses fragment between modules, and the repeated card cadence becomes metronomic. The grid measures correctly without composing meaningfully.

### The separation Alex asked for

**Named, checkable, and anchored to a frame.** Each of these can be verified by
someone else looking at the same file, and each maps onto a rule that already
exists — which is the whole evidential value of an anti-reference.

| Failure | Frame | Rule it confirms by absence |
|---|---|---|
| Uppercase nav row set without tracking | `hero.jpg` | typography [I4](../../skills/typography-taste/SKILL.md#invariant) |
| `VIEW LOT` as an underlined text link inside a scrim — reads as prose, not as an action | `hero.jpg` | anti-patterns — a control that does not read as a control |
| **The same action carries two different control treatments on one page**: underlined text in the hero, a filled grey button in the Tucker band | `hero.jpg` vs `strip-3.jpg` | typography [I8](../../skills/typography-taste/SKILL.md#invariant) applied to controls — one job, one voice |
| **One row of four cards labels the same action three ways**: `AVAILABLE LOTS` ×3 and `VIEW LOT` ×1 | `strip-3.jpg` | same |
| The card label is a translucent plate dead-centre on every image, regardless of what the photograph is doing underneath | `strip-3.jpg` | academic-composition — the label ignores the picture, so no eye path can form between cards |
| Mechanical 50/50 band: text left, image right, repeated | `strip-3.jpg` | academic-composition [C7](../../skills/academic-composition/SKILL.md#invariant) — rhythm with variation |
| Carousel arrows as large chrome overlays on the photograph | `hero.jpg` | anti-patterns — persistent overlay taking the image |

**Not separable, and recorded as such.** These are verdicts rather than
mechanisms, and they are kept in Alex's words above without being promoted into
the table: *"cosmetic luxury typography"*, *"arbitrary tonal alternation"*,
*"the grid measures correctly without composing meaningfully"*. Each is probably
true and none states a test another person could run. A corpus of unfalsifiable
verdicts is a corpus of taste assertions, which is the thing this repository
exists to avoid.

**The two-control finding is new**, and it was not in Alex's text: the hero and
the Tucker band give the identical action two different bodies, and one card row
gives it two different names. That is a sharper failure than "generic CMS",
because it is the symptom that proves the diagnosis — a page assembled by module
rather than composed as a page cannot keep one control language, and here it
visibly does not.

### Layer judgements

| Layer | Observation | Source | Judgement | Evidence limit |
|---|---|---|---|---|
| composition | the hero is the right idea: full-bleed night photography with the lot text in a translucent scrim block in the lower left rather than centred over the image | Alex | IN | |
| composition | no sustained dominant–subordinate–support relationship after the hero; negative space acts as passive separation rather than an active shape; the repeated card cadence becomes metronomic | Alex | OUT | |
| composition | premium content alone does not create premium art direction — exceptional assets inside a generic corporate-luxury CMS | Alex | OUT | |
| typography | three registers in a four-line block — high-contrast serif with true typographic quotes, supporting lines in a neutral grotesque, date and venue smallest | Alex | IN | |
| typography | the nav is a plain uppercase grotesque row with no tracking discipline | Alex | OUT | |
| typography | the same action appears as an underlined text link and as a filled button on the same page, and one card row labels it both `AVAILABLE LOTS` and `VIEW LOT` | agent | unreviewed | directly observed across hero.jpg and strip-3.jpg |
| colour | the scrim does the legibility work rather than the type being dropped on the image — the escalation ladder in `color-taste` §5 | Alex | IN | |
| imagery | image directions fail to build a continuous eye path and tonal masses fragment between modules | Alex | OUT | |
| interaction | `VIEW LOT` as an underlined text link inside a scrim — it reads as prose, not as an action; carousel arrows are large chrome overlays on the photograph | Alex | OUT | |
| design dialect | — | — | unreviewed | Alex set the record `out`; `out` names the absence of a match, never a dialect |

**Judgement rules for this table.** A layer Alex did not mention and the agent did
not directly verify stays out of the table entirely. Only `Source: Alex` rows with
IN or OUT count as evidence in distillation.

### What this capture does not prove

The static frames carry the hero, six desktop stops and six mobile stops. They do
not carry the carousel's behaviour, the transition between lots, or anything below
the captured depth. Alex's verdict on the page as a whole is user-supplied and
stands on its own; what is verified here is the seven named failures and their
frames.

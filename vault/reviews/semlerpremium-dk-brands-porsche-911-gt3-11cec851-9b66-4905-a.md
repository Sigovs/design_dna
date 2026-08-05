# Review history — semlerpremium-dk-brands-porsche-911-gt3-11cec851-9b66-4905-a

Append-only. `sites.json` holds the current state; this file holds how it got
there. Alex's wording is never edited, and agent observations are never merged
into his judgement.

**Layer verdicts are per layer.** A verdict here is never propagated to the whole
record: `dialectStatus` stays a whole-record field that only Alex sets.

---

## 2026-08-04 · QUICK · **SIDECAR WRITTEN AFTER THE RECORD**

> **Written after the fact, same day.** The record was created by editing
> `sites.json` directly instead of going through `npm run review`, so no sidecar
> existed and the entry was invisible to `distill.mjs`. Nothing was re-captured
> and nothing was re-judged.

> **ONE DESIGN SYSTEM, THREE RECORDS.** This page, `semlerpremium-dk` and
> `semlerpremium-dk-showroom` are three pages of one site. They are **not** three
> independent references and must never be counted as three in distillation.

- **submitted:** https://semlerpremium.dk/brands/porsche/911-gt3-11cec851-9b66-4905-a234-005f24fb800a/
- **action:** record created 2026-08-04
- **previous rating / dialectStatus:** n/a — new record
- **current rating / dialectStatus:** **3 / unreviewed**. Alex asked for it as its
  own reference and named the pattern it carries. He gave no dialect judgement.
- **capture limitation:** none recorded.
- **why a separate record:** Alex's reason, in his words — the homepage "показывает
  общий уровень дилерского сайта, а эта страница демонстрирует отдельный паттерн:
  VDP, поднятый до уровня полноценной editorial product page."

### Alex's comment — verbatim, stored in `note`

> This feels like an upscaled VDP rather than a conventional vehicle listing page. It retains all the necessary commercial information — price, leasing terms, mileage, specifications and equipment — but presents the car with the scale, pacing and visual confidence of a dedicated model experience.
>
> The oversized imagery and restrained interface give the individual vehicle a sense of importance. Instead of placing everything inside a standard dealership template, the page allows the photography and the specific character of the GT3 Touring to shape the experience.

### Alex's durable summary — verbatim, stored in `works`

> The strongest decision is treating one inventory vehicle as a significant product rather than a database entry. The page opens with pricing and essential vehicle data, then expands into an 18-image gallery, editorial description, selected highlights, detailed equipment, performance figures and related inventory.
>
> Commercial information remains accessible, but it does not dominate the visual presentation. Data is broken into deliberate groups instead of being compressed into one dense specification table. This gives the page rhythm and makes a large amount of information easier to scan.
>
> The progression is particularly effective:
>
> desire → visual inspection → story → highlights → complete data → related vehicles
>
> This is highly relevant to premium dealer VDP design. It demonstrates that a functional inventory page can feel cinematic and bespoke without sacrificing price transparency or practical vehicle information.

**Alex's transferable lesson, verbatim:**

> A premium VDP should not hide vehicle data — it should give that data hierarchy, pacing and product-level art direction.

### Alex's limitation statement — verbatim, stored in `weaknesses`

> The experience becomes less distinctive as it moves deeper into specifications and the long equipment list. These sections return to a more conventional dealer-data presentation and do not fully sustain the visual authority of the opening gallery.
>
> Some information is also repeated: pricing and vehicle data appear in multiple areas. This may support different viewport states or sticky behavior, but it risks making the page feel longer than necessary.
>
> The large gallery works because the photography is unusually strong and the car itself is exceptional. With inconsistent dealer photos, ordinary inventory or weak image sequencing, the same oversized treatment could magnify asset problems rather than create a premium experience.
>
> The related-vehicle section also brings the page back toward a recognizable inventory grid. Functionally this is appropriate, but visually the transition from bespoke product story to standard listings could be handled with greater continuity.

### Confirmed changes to the record

- `note` / `works` / `weaknesses` — Alex's text, verbatim; the lesson is kept as
  the closing line of `works` so it sits beside its evidence
- `rating` → **3**
- `dialectStatus` — `unreviewed`
- `tags` — four promoted for this record: `editorial-inventory`,
  `product-storytelling` and `structured-specification` (composition), and
  `asset-dependency-risk` (risks). The last one is Alex's own warning, and it is
  already an invariant in `academic-composition`: a declared asset dependency has
  to survive an ordinary asset.

### Layer judgements

| Layer | Observation | Source | Judgement | Evidence limit |
|---|---|---|---|---|
| composition | one inventory vehicle treated as a significant product rather than a database entry | Alex | IN | |
| composition | the sequence desire → visual inspection → story → highlights → complete data → related vehicles | Alex | IN | |
| composition | the experience becomes less distinctive deeper into the specifications and the equipment list, and does not sustain the authority of the opening gallery | Alex | OUT | |
| composition | the related-vehicle section returns the page to a recognisable inventory grid without a transition | Alex | OUT | |
| hierarchy | commercial information stays accessible without dominating the visual presentation | Alex | IN | |
| hierarchy | pricing and vehicle data are repeated in several places, which risks making the page feel longer than necessary | Alex | OUT | |
| typography | data broken into deliberate groups instead of one dense specification table, which gives the page rhythm | Alex | IN | |
| typography | label / value pairs set on hairlines, one grotesque, no mono voice for the figures | agent | unreviewed | directly observed in full.jpg |
| spacing / density | a large amount of information made easier to scan by grouping rather than compression | Alex | IN | |
| imagery | oversized imagery and a restrained interface give the individual vehicle a sense of importance | Alex | IN | |
| imagery | the gallery works because the photography is unusually strong; with ordinary dealer images the same treatment would magnify asset problems | Alex | OUT | |
| colour | dark ground throughout, unlike the light homepage; one acid-lime accent | agent | unreviewed | directly observed; Alex did not judge colour |
| design dialect | — | — | unreviewed | Alex gave no dialect judgement, and none is inferred |

**Judgement rules for this table.** A layer Alex did not mention and the agent did
not directly verify stays out of the table entirely. Only `Source: Alex` rows with
IN or OUT count as evidence in distillation.

### What this capture does not prove

The record is one vehicle at one moment of one dealer's stock. It does not prove
how the template holds for a car with fewer photographs, a plainer specification,
or no video — which is exactly the failure mode Alex named. Gallery behaviour,
sticky elements and any motion are not preserved by the shots.

## 2026-08-05 · JUDGEMENT

- **action:** whole-record judgement set by Alex
- **previous rating / dialectStatus:** **3 / unreviewed**
- **current rating / dialectStatus:** **3 / in** — dialect `technical-luxury`
- **rating:** unchanged. Alex judged status and dialect only.

### Alex's judgement — verbatim

> `in` · `technical-luxury`

Given in conversation on 2026-08-05, after reviewing the record's shots alongside the
agent observations below. He was asked for the whole-record status and the dialect
separately, because the dialect assignment is what a confirmation count rests on.

### Agent observations — not Alex's judgement

| Layer | Observation | Source | Verdict |
|---|---|---|---|
| composition | A lighter inset window over the same photograph, with the model name straddling the seam — one committed gesture rather than an accumulation. | agent | unreviewed |
| composition | The inset sits centred and cuts the car at the rear haunch. Whether that is an intentional crop or a device seated on the subject is the open question. | agent | unreviewed |
| typography | The spec bar stays quiet and the figures are tabular, so price and mileage align rather than compete. | agent | unreviewed |

**Every row above is `agent` / `unreviewed`.** Alex gave a whole-record verdict,
not layer verdicts, and a layer he did not judge stays unjudged.

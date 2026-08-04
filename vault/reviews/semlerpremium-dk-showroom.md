# Review history — semlerpremium-dk-showroom

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
> `semlerpremium-dk-brands-porsche-911-gt3-...` are three pages of one site. They
> are **not** three independent references and must never be counted as three in
> distillation.

- **submitted:** https://semlerpremium.dk/showroom/?leasingTypes=Flexleasing
- **normalised:** the query is kept deliberately — the filtered state is what Alex
  sent, and it is the state that shows the active-filter chip and the reset
  control doing their work
- **action:** record created 2026-08-04
- **previous rating / dialectStatus:** n/a — new record
- **current rating / dialectStatus:** **3 / unreviewed**. Alex called it "очень
  сильный benchmark" and asked for it to be kept as its own reference, so the top
  of the scale was set. He gave no dialect judgement.
- **capture limitation:** none recorded. The filmstrip holds three desktop frames
  rather than eight because the page is 2505px against a 900px viewport — that is
  the page's real length, not a failure.

### Alex's comment — verbatim, stored in `note`

> This is an unusually refined showroom page. It performs the practical role of an SRP — filtering, sorting, comparing and opening inventory — but visually feels closer to a curated automotive editorial.
>
> The generous vehicle photography, restrained typography, controlled spacing and minimal interface allow every car to retain its presence. The page does not overwhelm the inventory with badges, borders, promotional buttons or dense dealership metadata. It feels calm, expensive and exceptionally confident.
>
> What makes it especially strong is that the design does not attempt to disguise the inventory structure. It simply gives familiar SRP elements better hierarchy, scale and art direction.

### Alex's durable summary — stored in `works`, verbatim, with his two lessons

> The vehicle cards are the strongest part of the experience. Photography receives most of the visual space, while location, model, derivative and price are arranged as a restrained information layer rather than a conventional dealer-card overlay.
>
> The cards contain very little interface chrome. There are no competing CTAs, oversized price banners, financing badges or unnecessary borders. "Quick View" remains available, but it does not compete with the vehicle itself.
>
> The restrained card design also allows very different brands — Porsche, Bentley, Ferrari, Lamborghini, Rolls-Royce, McLaren and others — to coexist without producing visual chaos. Semler provides a neutral premium frame while each vehicle carries its own character.
>
> The filtering system is extensive but logically grouped. This is serious inventory functionality presented without making the entire page feel like a search form.
>
> The overall density is particularly well judged. The images are large enough to create desire, but the page still operates as a browsable collection rather than a succession of oversized campaign sections.
>
> The page creates a natural bridge to Semler's upscaled VDP.

**Alex's transferable lessons, verbatim:**

> A premium SRP does not need to stop behaving like inventory. It needs to remove dealership noise, elevate the imagery and give comparison data a deliberate hierarchy.

> The SRP creates desire at collection scale; the VDP expands that desire at product scale.

### Alex's limitation statement — verbatim, stored in `weaknesses`

> The minimal presentation sometimes withholds information that comparison-oriented shoppers may want immediately. Mileage, year, drivetrain and other essential specifications are not always as prominent as the model and price, potentially requiring Quick View or entry into the VDP.
>
> Price presentation is inherently complicated because the inventory mixes monthly leasing payments, cash prices, tax-inclusive prices and prices excluding registration tax.
>
> The filter system is comprehensive, although its depth may become demanding on mobile.
>
> The large-format cards depend heavily on consistently excellent photography. Mixed crops, weak lighting or ordinary dealer images would become more noticeable at this scale and could quickly weaken the showroom quality.
>
> Quick View must also add genuine comparison value.
>
> Overall, these are mostly functional tensions rather than visual failures. This is one of the strongest examples of a premium automotive SRP because it preserves both desire and inventory utility.

### Confirmed changes to the record

- `note` / `works` / `weaknesses` — Alex's text, verbatim
- `rating` → **3**, on his instruction that it be kept as a benchmark
- `dialectStatus` — `unreviewed`
- `tags` — one promoted for this record: `curated-inventory` (composition).
  "Restrained UI", "Clear Hierarchy" and "Editorial Commerce" were **not**
  promoted: `visual-silence`, `conversion-first-hierarchy` and
  `editorial-inventory` already carry them, and three synonyms would make the
  vocabulary worse rather than richer.

### Layer judgements

| Layer | Observation | Source | Judgement | Evidence limit |
|---|---|---|---|---|
| composition | inventory reads as a curated collection rather than a database result, without disguising the SRP structure | Alex | IN | |
| composition | the neutral premium frame lets Porsche, Bentley, Ferrari, Lamborghini, Rolls-Royce and McLaren coexist without visual chaos | Alex | IN | |
| composition | the filter column is pinned: the grid scrolls, the photographic panel does not, so the art direction survives the scroll | agent | unreviewed | directly observed at 1440x900 |
| hierarchy | familiar SRP elements given better hierarchy, scale and art direction | Alex | IN | |
| hierarchy | card titles wrap to two lines unevenly, so price baselines do not align across a row | agent | unreviewed | directly observed; Alex did not judge this |
| typography | restrained typography | Alex | IN | |
| spacing / density | overall density particularly well judged — large enough images to create desire, still a browsable collection | Alex | IN | |
| imagery | generous vehicle photography; photography receives most of the visual space | Alex | IN | |
| imagery | the treatment depends heavily on consistently excellent photography; mixed crops or ordinary dealer images would weaken it at this scale | Alex | OUT | |
| imagery | manufacturer certification marks are baked into the photograph rather than applied as UI chips, which is why the cards carry almost no chrome | agent | unreviewed | directly observed across the card grid |
| colour | frosted filter panel over a photograph: small labels sit on the busiest region of the image | agent | unreviewed | directly observed. Same technique ruled out for Rolls-Royce, where the plate behind it is uncontrolled video; here it is one controlled still |
| interaction | extensive filtering, logically grouped, without making the page feel like a search form | Alex | IN | **not verified** — no filter was operated; the shots record one filtered state |
| interaction | the minimal presentation withholds specifications comparison shoppers may want immediately; Quick View must add genuine comparison value | Alex | OUT | |
| design dialect | — | — | unreviewed | Alex gave no dialect judgement, and none is inferred |

**Judgement rules for this table.** A layer Alex did not mention and the agent did
not directly verify stays out of the table entirely. Only `Source: Alex` rows with
IN or OUT count as evidence in distillation.

### What this capture does not prove

The shots record one filtered state — Flexleasing — at one moment of the
inventory. They do not prove filter behaviour, sort behaviour, Quick View
content, pagination, or how the grid holds with a different or emptier result
set. Alex's judgements about the filtering system and about Quick View are
user-supplied and stand on their own.

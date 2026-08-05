# Review history — semlerpremium-dk

Append-only. `sites.json` holds the current state; this file holds how it got
there. Alex's wording is never edited, and agent observations are never merged
into his judgement.

**Layer verdicts are per layer.** A verdict here is never propagated to the whole
record: `dialectStatus` stays a whole-record field that only Alex sets.

---

## 2026-08-04 · QUICK · **SIDECAR WRITTEN AFTER THE RECORD**

> **Written after the fact, same day.** The record was created by editing
> `sites.json` directly instead of going through `npm run review`, so no sidecar
> existed and the entry was invisible to `distill.mjs`, which reads this
> directory and nothing else. This file closes that gap. Nothing was re-captured
> and nothing was re-judged: every Alex row below is quoted from text he
> submitted in his own words, which is stored verbatim in the record.

> **ONE DESIGN SYSTEM, THREE RECORDS.** `semlerpremium-dk`,
> `semlerpremium-dk-showroom` and `semlerpremium-dk-brands-porsche-911-gt3-...`
> are three pages of one site. They are **not** three independent references and
> must never be counted as three in distillation.

- **submitted:** https://semlerpremium.dk/
- **normalised:** https://semlerpremium.dk/
- **action:** record created 2026-08-04
- **previous rating / dialectStatus:** n/a — new record
- **current rating / dialectStatus:** **2 / unreviewed**. The rating is the
  repository default and was never taste evidence; Alex has not set one. He gave
  no dialect judgement, so none is recorded.
- **capture limitation:** none. The first capture filed the Danish cookie wall as
  the site across all 17 frames; `CONSENT_PATTERNS` was English-only. Re-captured
  clean after the fix.

### Alex's comment — verbatim, stored in `note`

> The site feels much more considered than a typical multi-brand dealership website. It successfully brings Porsche, Bentley and Lamborghini into one premium environment without allowing the individual brand identities to fragment the overall experience.
>
> I like the restrained typography, confident use of large imagery, generous spacing and editorial composition. The design feels sophisticated without relying on excessive decoration or predictable luxury clichés. It gives the dealership its own identity while still allowing the vehicles and manufacturer campaigns to remain visually dominant.

### Alex's durable summary — verbatim, stored in `works`

> The strongest decision is the separation between Semler Premium's identity and the identities of its three brands. The neutral visual foundation can accommodate the precision of Porsche, the elegance of Bentley and the intensity of Lamborghini without visibly favoring one of them.
>
> The opening content has a calm, confident rhythm. Large headlines, concise messaging and full-width imagery create presence without crowding the screen with dealership promotions. The writing also reinforces a curated ownership experience rather than presenting the business merely as a place to purchase cars.
>
> The information architecture is unusually complete for a premium dealer. Showroom inventory, individual brands, service booking, events, news, leasing and dealership information are all identifiable. This makes the experience aspirational while still supporting practical customer tasks.
>
> The transition from brand storytelling into real inventory is valuable. It connects desire with an actionable showroom instead of separating the editorial experience from the commercial purpose of the site. Upcoming events, ownership services and specialist support also help position Semler Premium as a long-term relationship rather than a single transaction.

### Alex's limitation statement — verbatim, stored in `weaknesses`

> The homepage becomes too long and tries to accommodate almost every part of the business. Brand introductions, Bentley campaigns, authorization messaging, service benefits, locations, events, Porsche promotion, inventory, news, workshop booking and leasing conversion all appear in one sequence. Individually these sections are useful, but together they weaken the page's central narrative.
>
> The visual quality is not completely consistent. The more editorial sections feel carefully art-directed, while inventory cards, event listings, booking modules and the leasing form move closer to conventional dealership UI. The experience gradually shifts from a distinctive premium publication into a well-styled content portal.
>
> There is also an inherent tension between the three manufacturers. Each brings its own imagery, tone and campaign language, so the site sometimes feels like a refined container for separate brand campaigns rather than one fully authored visual world.
>
> Compared with Rolls-Royce, the interface and media do not form the same continuous spatial experience. Semler Premium is more practical and commercially useful, but less immersive. Compared with McLaren, it has greater restraint and broader usability, but less energy and a less distinctive motion character.
>
> Overall, the site succeeds as a sophisticated premium dealer platform, but it does not fully sustain the clarity and visual authority of its strongest opening sections throughout the entire homepage.

### Confirmed changes to the record

- `note` / `works` / `weaknesses` — Alex's text, verbatim
- `rating` — left at the default 2; Alex has not rated it
- `dialectStatus` — `unreviewed`; he named no dialect
- `tags` — from the vocabulary, plus three promoted for this record:
  `brand-architecture` and `inventory-integration` (composition) and
  `narrative-dilution-risk` (risks)
- `unsorted` — brand and market labels he supplied that no category holds

### Layer judgements

| Layer | Observation | Source | Judgement | Evidence limit |
|---|---|---|---|---|
| composition | editorial composition; the neutral foundation carries three brand identities without favouring one | Alex | IN | |
| composition | the homepage tries to accommodate almost every part of the business, and the sections together weaken its central narrative | Alex | OUT | |
| composition | image-left / text-right bands repeat across most of the page with the same internal geometry | agent | unreviewed | observed across full.jpg and the filmstrip |
| hierarchy | large headlines, concise messaging and full-width imagery create presence without crowding the screen | Alex | IN | |
| typography | restrained typography | Alex | IN | |
| typography | one grotesque throughout, uppercase reserved for eyebrows and controls | agent | unreviewed | directly observed in hero.jpg and the filmstrip |
| spacing / density | generous spacing | Alex | IN | |
| imagery | confident use of large imagery; the vehicles and manufacturer campaigns remain visually dominant | Alex | IN | |
| imagery | the editorial sections are art-directed, while event and inventory imagery drops to ordinary stock | Alex | OUT | |
| interaction | the information architecture is unusually complete for a premium dealer and still supports practical customer tasks | Alex | IN | **not verified by the static evidence** — no route was followed; Alex's judgement is user-supplied and stands on its own |
| colour | warm off-white ground with near-black type; one acid-lime accent, confined to the arrow badge inside pill controls | agent | unreviewed | directly observed; Alex did not judge colour |
| motion | less energy and a less distinctive motion character than McLaren | Alex | OUT | **not verified** — the static capture preserves no behaviour or timing, and no mechanics are described here |
| design dialect | — | — | unreviewed | Alex gave no dialect judgement, and none is inferred |

**Judgement rules for this table.** A layer Alex did not mention and the agent did
not directly verify stays out of the table entirely — an empty row is a claim.
Only `Source: Alex` rows with IN or OUT count as evidence in distillation.

### What this capture does not prove

The shots are correct for what they show: the first screen, the full page, the
mobile view and both filmstrips, with no consent wall in frame. They do not prove
motion, timing, transition behaviour, or any route through the site. Alex's
judgements about flow, usability and motion character are preserved as
user-supplied evidence and are neither corroborated nor weakened by the shots.

## 2026-08-05 · JUDGEMENT

- **action:** whole-record judgement set by Alex
- **previous rating / dialectStatus:** **2 / unreviewed**
- **current rating / dialectStatus:** **2 / in** — dialect `technical-luxury`
- **rating:** unchanged.
### Alex's judgement — verbatim

> `in` · `technical-luxury`

Given in conversation on 2026-08-05, against the record's shots and the agent
observations below. Status and dialect were asked separately.

### Agent observations — not Alex's judgement

| Layer | Observation | Source | Verdict |
|---|---|---|---|
| composition | The same portrait inset device as the GT3 page, here holding video over a full-bleed still — one gesture reused across the site rather than a new one per page. | agent | unreviewed |
| imagery | The background frame shows Bentley, Porsche and Lamborghini together head-on, and a legible registration plate sits in the lower left. | agent | unreviewed |
| typography | The welcome sentence is set at body size over the busiest region of the photograph, bottom right. | agent | unreviewed |

**Every row above is `agent` / `unreviewed`.** A layer Alex did not judge stays
unjudged.

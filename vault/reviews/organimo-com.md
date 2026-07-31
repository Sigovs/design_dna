# Review history — organimo-com

Append-only. `sites.json` holds the current state; this file holds how it got
there. Alex's wording is never edited, and agent observations are never merged
into his judgement.

**Layer verdicts are per layer.** A verdict here is never propagated to the whole
record: `dialectStatus` stays a whole-record field that only Alex sets.

---

## 2026-07-30 (time unavailable) · QUICK · **RETROSPECTIVE**

> **Written after the fact.** This record was reviewed before the revision-sidecar
> mechanism existed, so this entry is **reconstructed from the record itself and
> from the confirmed review exchange** — nothing was re-captured, nothing was
> re-judged, and no time of day is known. The date comes from the record's
> `added` field. Everything below is either quoted from `sites.json` or was
> directly observed during that review; there is no reconstruction from memory.
>
> **This is one reference, not two.** A retrospective revision of an existing
> record never counts as independent evidence in distillation.

- **submitted:** https://organimo.com/
- **normalised:** https://organimo.com/
- **action:** record created (2026-07-30), then rating and status set by Alex
- **previous rating / dialectStatus:** n/a — new record. Repository defaults were
  `rating 2` / `unreviewed`; Alex then set **3 / in**. Those defaults were never
  taste evidence.
- **current rating / dialectStatus:** **3 / in** — unchanged by this entry
- **capture limitation:** partial capture — the intro gate was passed, but the site uses scroll-jacking (document height stays 900px), so the filmstrip holds one frame instead of eight.

### Alex's comment — verbatim, never edited

> Нравится:
> - hero section;
> - крупный масштаб типографики;
> - движение и анимация изображений;
> - сдержанная, спокойная цветовая гамма;
> - шрифтовая пара;
> - сочетание uppercase-заголовков с обычным регистром в основном тексте;
> - общий flow страницы;
> - крупные, просторные секции и большое количество свободного пространства.
>
> Сайт хорошо «дышит»: контент не зажат, а анимация поддерживает композицию и ритм, не перегружая страницу.

### Alex's durable summary — verbatim, stored in `works`

> Strong reference for an open, breathable page rhythm. Large sections and generous negative space let the composition unfold without feeling empty. The hero uses oversized typography, restrained color, and image motion as one coordinated system. Uppercase is reserved mainly for small labels, while normal text keeps a natural case. The italic word inside 'Limitless begins here' creates controlled typographic contrast without turning into decoration. The nearly black background, soft pink-lilac atmospheric haze, and gold as the only sharp accent feel disciplined rather than flashy. Motion and transitions support the page flow and connect the large sections instead of behaving like isolated effects.

### Alex's limitation statement — verbatim, stored in `weaknesses`

> The current screenshots are incomplete evidence of the reference because the site uses scroll-jacking and motion-driven transitions. The static capture preserves the visual language but not the behavior, timing, or full flow.

### Confirmed changes to the record

- `note` — Alex's comment, verbatim
- `works` — Alex's durable summary, verbatim
- `weaknesses` — Alex's limitation statement, verbatim
- `rating` → **3**. Alex asked for 4; the documented scale is 1–3 and the gallery
  renders three controls, so the top of the current scale was set. **Resolved:** the
  vault keeps the 1–3 scale and 3 is the maximum "reference" level. No rating 4, no
  schema change — the question is closed, not pending.
- `dialectStatus` → **in**, on Alex's explicit instruction
- `tags` — from the existing vocabulary only
- `captureError` — reduced to the observed facts after the re-capture
- **First capture recorded the intro screen as the site.** It was replaced by a
  second capture that passed the gate. The safe-gate whitelist in `capture.mjs`
  exists because of this record.

### Layer judgements

| Layer | Observation | Source | Judgement | Evidence limit |
|---|---|---|---|---|
| composition | крупный hero; product as a single dominant object standing in an environment rather than framed in a card | Alex | IN | |
| hierarchy | headline is the largest mass, labels are small, one call to action | agent | unreviewed | observed on the static hero only |
| typography | крупный масштаб типографики; шрифтовая пара; uppercase reserved for small labels while body text keeps normal case | Alex | IN | |
| typography | italic word inside an upright setting in one line — contrast inside the line, not between blocks | agent | unreviewed | directly observed in hero.jpg; Alex did not judge this detail separately |
| colour | сдержанная, спокойная цветовая гамма | Alex | IN | |
| colour | near-black ground, pink-lilac atmospheric haze, gold as the only sharp accent | agent | unreviewed | directly observed in hero.jpg |
| imagery | движение и анимация изображений | Alex | IN | **not verified by the static evidence** — Alex's judgement is user-supplied and stands on its own |
| spacing / density | крупные, просторные секции и большое количество свободного пространства; сайт «дышит» | Alex | IN | later sections not captured |
| motion | motion and transitions support the page flow and connect the large sections | Alex | IN | **not verified** — the static capture preserves no behaviour, timing or transition. No mechanics are described here |
| interaction | общий flow страницы | Alex | IN | **not verified** — one filmstrip state was captured instead of a sequence |
| interaction | an intro gate ("COMPLETE") and an audio prompt stand before the content | agent | unreviewed | directly observed; passed once, within the safe whitelist |
| design dialect | — | — | unreviewed | Alex gave no dialect judgement, and none is inferred |

**Judgement rules for this table.** A layer Alex did not mention and the agent did
not directly verify stays out of the table entirely — an empty row is a claim.
"not sure", "neutral", "not bad", "ни туда ни сюда" are `unreviewed`, never
forced into IN or OUT. Only `Source: Alex` rows with IN or OUT count as evidence
in distillation.

### What this capture does not prove

The static evidence is real and correct for what it shows: the first screen after
the gate, the full-page shot, and the mobile view. It does **not** prove flow,
timing, transition behaviour, or the later sections — the page holds a document no
taller than the viewport and swaps state under script, so the filmstrip holds one
frame instead of eight. **Alex's positive judgement of the motion and the flow is
preserved as user-supplied evidence** and is not weakened by the capture's limits;
it simply is not corroborated by the shots, and no animation mechanics are
described anywhere in this record.

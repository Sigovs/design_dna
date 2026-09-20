# Review history — collabcapitolium-fr

Append-only. `sites.json` holds the current state; this file holds how it got
there. Alex's wording is never edited, and agent observations are never merged
into his judgement.

**Layer verdicts are per layer.** A verdict here is never propagated to the whole
record: `dialectStatus` stays a whole-record field that only Alex sets.

---

## 2026-09-20 12:45 · QUICK — judged by delegation

- **submitted:** https://www.collabcapitolium.fr/
- **action:** record created and judged in one pass
- **capture limitation:** two gates before content — a French cookie banner (non-essential
  declined) and an "ENTRER" splash. `capture.mjs` gets one whitelisted click per visit, so
  the shots may stop at the splash; check them when they land.

### Alex's comment — verbatim, never edited

> eshe odn, large images, krasivaja font rabota akademichesksja kompozicija https://www.collabcapitolium.fr/

Three layer readings from him — imagery, typography, composition — and no overall verdict.
The rating and the status below are the agent's under the standing delegation, recorded in
`judgementBy`.

### Layer judgements

| Layer | Observation | Source | Judgement | Evidence limit |
|---|---|---|---|---|
| imagery | "large images" | Alex | **IN** | |
| typography | "красивая работа со шрифтом" | Alex | **IN** | |
| composition | "академическая композиция" | Alex | **IN** | |
| composition | Built as a book: chapters I–III, a bordered CHAPITRE plate fixed at bottom centre, one dominant per spread. Photographs sit as plates, with margins and rules, never edge to edge against each other — the margin is part of the composition. | agent | IN | |
| typography | Gin for display, Times in the body set justified, Edwardian Script for the signature line, Rubik for utility — four faces, each kept to one role. | agent | IN | |
| colour | Cream rgb(240,227,207) with gold rgb(195,166,119); some photographs converted to black and white so tone carries structure rather than decoration. | agent | IN | |
| hierarchy | The two club crests set in a bordered triptych either side of an "=" — the whole collaboration stated in one spread, without a sentence. | agent | IN | |
| design dialect | Classical book-editorial: ornament, gold, script, photography-led spreads. That is not `auction-editorial`'s restraint-by-metadata, and not `refined-elegance`'s proportion-first presence. | agent | contextual | recorded `out` — see below |

**Judgement rules for this table.** Only `Source: Alex` rows with IN or OUT count as evidence
in distillation. Three of them here are his, and they are layer verdicts only — they say
nothing about the whole record.

### Why `out`, and what it is raw material for

`out` is not a rejection. This page decides the way a printed book decides: chapter rhythm,
plates with margins, one dominant per spread, tone as structure. None of the stored dialects
resolves choices that way — so it is kept as evidence that a **classical book-editorial**
dialect exists outside the library. One record is not a dialect; the threshold in
[vault/README.md](../README.md#creating-a-new-dialect) is what decides, and this is the first
entry that would count toward it.

### The transferable lesson

**A chapter marker is cheaper than a progress bar.** The fixed CHAPITRE plate tells the
reader where they are in a 64,000px document without a scrollbar metaphor, and it makes the
long scroll feel finite. It only works because the chapters are real — each one opens on a
full-bleed photograph and closes, so the marker names something the reader can feel.

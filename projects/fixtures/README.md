# Regression fixtures — two rejected artefacts, frozen

`npm run fixtures`

Two Chicago Motor Cars homepage concepts, both rejected by Alex on 2026-08-13,
kept as **frozen copies** and used as the system's only regression test with a
known verdict.

## Why two, and why these two

They fail in **different classes**, and one alone would teach the wrong lesson.

| | `cmc-concept-2` | `cmc-concept-3` |
|---|---|---|
| **Failure class** | **A — the means are absent** | **B — formal compliance without compositional success** |
| First-screen governing mass | **58 %** | **100 %** |
| Full-bleed media | 2 of 10 | 2 of 4 |
| Type-scale ratio | 5.2× | **15.9×** (223 px) |
| Page | 8.9 screens | 4.1 screens |
| **Gate 1 — measurable** | **fails** the A1 floor | **meets** it |
| **Gate 2 — structural review** | fails, 4 of 4 devices | fails, **7 of 7 devices** |
| **Gate 3 — human verdict** | reject | reject |

**Concept 3 is the more valuable of the pair.** It has the full-viewport hero, the
full-bleed masses and the enormous type — every measurable commitment met — and it
was rejected outright. It exists so the system cannot congratulate itself for
hitting numbers: *a change that lets Concept 3 pass every gate has broken the
system rather than improved it.*

Concept 2 carries the opposite half: it is what happens when the means are simply
missing, and a measurement catches it without any judgement at all.

## What is frozen, and what is not

The fixtures are **copies**, never the live project folder. Concept 3 was being
iterated in that same directory on the day these were taken, so a fixture pointing
at the working files would have measured whatever existed at the time.

Every file carries a SHA-256 in `MANIFEST.json` and the runner verifies all of them
before it measures anything. One 20 MB source video is recorded by hash and not
copied; the composition is judged without it, and the omission is listed so it is
auditable rather than silent.

## What the runner asserts

1. **Immutability** — file list and every hash match the manifest.
2. **Gate 1** — Concept 2 fails the floor, Concept 3 meets it, re-measured live in
   Chrome at 1440×900 rather than trusted from the manifest.
3. **Gate 2** — both fail, and the recorded device-by-device findings are printed
   so a reader sees *why*: the giant `REGERA` repeating the caption beneath it,
   two bleeds that mark no chapter change, an overlap that changes no rank, two
   vehicle sections sharing one formula.
4. **Gate 3** — neither has an approval on record; Alex's verdict is `reject` for
   both, with his reason stored beside it.
5. **The pair stays a pair** — both failure classes present, and class B still
   meeting the measurable floor while failing the review.

`npm run fixtures -- --no-render` skips Chrome and checks hashes and recorded
verdicts only.

## What this is not

It is not a taste test and it cannot become one. It proves that the gates still
catch two known failures. **Gate 3 is a human verdict** — the runner asserts the
absence of approval, never the presence of quality.

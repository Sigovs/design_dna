# Taste evidence — the synthesis layer

**Three layers, kept separate on purpose.** `sites.json` holds **evidence** — Alex's
own judgements, never edited by an agent. This file holds **interpretation** — what
those judgements appear to say, with the confidence they actually earn. `skills/`
holds **executable guidance** — and a claim only arrives there through the
[distillation ritual](README.md#the-distillation-prompt), never from this file
directly.

**Every claim below carries its evidence chain.** A preference with no traceable
supporting entry is not in this file, and a claim is never strengthened to make the
document look finished.

`npm run evidence:check` verifies the mechanical truths only: that cited ids exist,
that levels and tiers are valid values, that no claim id repeats, and that the
counts stated here match the data. **It cannot verify whether an interpretation is
correct** — that is Alex's review, and the claims below are marked accordingly.

---

## Evidence inventory — counted from `vault/sites.json`, 2026-07-30

| Class | Count | Entry ids |
|---|---|---|
| **Usable `in`** (human-set) | **13** | `beings-co` (3) · `ciridae-com` (3) · `ruadh-com` (2) · `electrafilmworks-com` (2) · `thenewmobileworkforce-…-back-at-hq` (2) · `trionn-com` (2) · `kinncollective-co-uk` (2) · `augen-pro` (2) · `i-pinimg-…-46d9d54b` (2) · `organimo-com` (3) · `immersive-g-com` (3) · `rolls-roycemotorcars-…-home-html` (3) · `obys-agency` (2) |
| **Usable `out`** (human-set) | **2** | `rmsothebys-com` (1) · `thegentlewoman-co-uk` (1) |
| **Partial / contextual** (`hybrid`) | **2** | `porsche-com-usa` (2) · `carvana-com` (2) |
| **Not yet a judgement** (`unreviewed`) | **0** | — the library is fully reviewed |

> **Counter refresh, 2026-07-30.** Four records reviewed through the continuous
> ingestion workflow — `organimo-com` (3), `immersive-g-com` (3),
> `rolls-roycemotorcars-…-home-html` (3) and `obys-agency` (2) — took the usable
> `in` total from 9 to 13. **Counted, not interpreted:** no claim below was
> reinterpreted, promoted, weakened or removed, and none of the four is cited in
> A, B, C or D yet. Their reasoning belongs to the next distillation pass.
>
> **Reviewed 2026-07-30, in the gallery, across several sittings.** Alex set
> `kinncollective-co-uk` `unreviewed → in`, `augen-pro` `hybrid → in`,
> `i-pinimg-…-46d9d54b` `unreviewed → in`, and `carvana-com` `unreviewed → hybrid`.
> **Nothing is unreviewed any more, and no note/status mismatch remains.**
>
> **The three new `in` entries are counted, not yet interpreted.** Their reasoning
> — `augen-pro`'s semantic blur and its own recorded low-contrast weakness,
> `i-pinimg`'s layered overlap and extreme microtype, `carvana`'s intent-splitting
> at `hybrid` — belongs to the next distillation pass. A count edit is not a
> reading, and inflating the claims below to match a larger sample would be exactly
> the overgeneralisation this file exists to prevent.

**Two `out` entries is below the three the binding rule requires for anything to be
distilled into a new dialect.** Nothing here proposes one.

### Data-quality facts, reported and not repaired

An agent may not change a human judgement, so these are listed for Alex and left
exactly as they are:

| Entry | The ambiguity |
|---|---|
`trionn-com` | note opens **"MAYBE —"** while `dialectStatus` is `in`. Not a mismatch of approval — an approval with a recorded reservation, which is why [D3](#d--unknown-or-conflicted) keeps the conflict rather than resolving it |
`carvana-com` | `captureError` — the desktop capture is a Cloudflare wall, so its visual evidence is partly unavailable |
`electrafilmworks-com`, `trionn-com` | zero tags, so invisible to every tag filter |

**All four "IN —" against a non-`in` status are resolved** by Alex's review on
2026-07-30: `kinncollective-co-uk`, `augen-pro` and `i-pinimg-…-46d9d54b` are now
`in`; `carvana-com` is `hybrid`, which its own note ("MAYBE —") already implied.

The rule stands for the future: **the status field is the human act, the note is the
reasoning about it.** Where they disagree, the status governs and the disagreement is
reported, never repaired by an agent.

---

## A · DEMONSTRATED

*Repeated across multiple independent human-set `in` entries. Strong enough to be
proposed to the ritual; still not a rule until it lands in a skill.*

### A1 — One governing event owns the first screen, and everything else defers to it

| | |
|---|---|
| **Supporting** | `beings-co` (3) · `ciridae-com` (3) · `ruadh-com` (2) · `electrafilmworks-com` (2) · `trionn-com` (2) · `kinncollective-co-uk` (2) |
| **Evidence** | kinncollective (reviewed `in` 2026-07-30): *"hero элементарный: одна фотография и огромный wordmark. Но масштаб настолько уверенный, что отдельный headline вообще не требуется"*. beings: the wordmark and the portrait read as **one** mass, *"портреты входят с ним в конфликт, перекрываются"*. ciridae: a single centred mark on an atmospheric field, flanked by two micro-labels — visually inspected. ruadh: *"огромный RÙADH поверх split-screen hero сразу создаёт уверенный брендовый жест"*. electrafilmworks: *"navigation, project metadata, restrained typography remain visually subordinate to the cinematic material"*. trionn: the three-part identity mark is the hero. |
| **Limiting** | `thenewmobileworkforce` — the first screen is an interface to be learned, and its own weakness records the cost: *"пользователь сначала осваивает интерфейс, а потом получает информацию"* |
| **Applies** | Identity-led and image-led pages |
| **Yields when** | The visitor arrived with a task rather than a first impression — utility, transaction, dense reference |
| **Tier if promoted** | Already covered by [C1](../skills/academic-composition/SKILL.md#invariant) and [C13](../skills/academic-composition/SKILL.md#invariant). **This is confirmation of existing invariants from Alex's own evidence, not a new rule.** |
| **Confidence** | High — 6 of 9 `in`, including both rating-3s. Three entries reviewed after this reading are not yet counted for or against it |

### A2 — Identity is carried by ONE system, never by an accumulation of devices

| | |
|---|---|
| **Supporting** | `beings-co` (3) · `ciridae-com` (3) · `ruadh-com` (2) · `electrafilmworks-com` (2) · `kinncollective-co-uk` (2) |
| **Evidence** | kinncollective: character carried by *"одна фотография и огромный wordmark"* with no headline added. beings: *"система почти предельно простая: выразительные портреты, oversized grotesk, два контрастных цвета"*. ciridae: *"почти монохромная палитра… сложная тема объясняется через очень простую визуальную иерархию"*. ruadh: *"никакого стандартного luxury serif. Один сдержанный grotesk — характер создают фотографии, crop и композиция"*. electrafilmworks: *"the minimal overlays and controlled transitions preserve atmosphere"*. |
| **Opposing** | None among `in`. `trionn-com` is the counter-case *inside* the `in` set: many devices, and its weakness says so — *"каждый эпизод хочет стать главным"* |
| **Applies** | Everywhere in the evidence so far |
| **Yields when** | Not observed to yield. Insufficient evidence to state a yield honestly |
| **Tier if promoted** | Reinforces the [device budget](../TASTE.md#2c-selection-coherence-and-device-discipline) and [C2](../skills/academic-composition/SKILL.md#invariant) |
| **Confidence** | High — 5 independent, both rating-3s among them |

### A3 — The interface is subordinate to the content it presents

| | |
|---|---|
| **Supporting** | `electrafilmworks-com` (2) · `ciridae-com` (3) · `beings-co` (3) · `ruadh-com` (2) |
| **Evidence** | electrafilmworks names it directly. ciridae: *"restrained sans-serif metadata"* against editorial serif. beings: *"минимальная навигация"* — praised in `works`, and the same entry records the cost in `weaknesses`, which is why this is a preference and not a law. ruadh: navigation deliberately quiet. |
| **Opposing / limiting** | `ruadh-com` weakness: *"навигация, названия и цены слишком мелкие"* — subordination taken past legibility. `beings-co`: minimal nav *"заставляет часть функциональности раскрывать через меню"* |
| **Applies** | Content-led pages where the content is strong |
| **Yields when** | The interface **is** the task, or subordination crosses [typography I7](../skills/typography-taste/SKILL.md#invariant) / [C14](../skills/academic-composition/SKILL.md#invariant) — which Alex's own notes flag as a fault, twice |
| **Tier if promoted** | Dialect-tier tendency with an invariant floor at I7 and C14 |
| **Confidence** | High for the preference · **the floor is Alex's own, recorded in his own weaknesses** |

---

## B · EMERGING

*A real pattern, too small or too narrow a sample to state as a preference.*

### B1 — Rhythm as a felt alternation, stated as a sequence

Supporting: `ruadh-com` (2) — *"чёткий ритм: 4 товара → две editorial-фотографии → 4 товара → крупный image band"*; `ciridae-com` (3) — *"excellent visual rhythm: statement → structured explanation → platform → proof"*.
Limiting: only **two** entries, both commerce/enterprise; no counter-case observed.
Tier: would reinforce [C7](../skills/academic-composition/SKILL.md#invariant). **Not proposed** — two entries is under the ritual's threshold.
Confidence: Medium.

### B2 — Type and image composed as one conflicted mass, not as layers

Supporting: `beings-co` (3) — the portrait rising into the letterforms, visually inspected; `kinncollective-co-uk` (2) — reviewed `in` on 2026-07-30, *"масштаб настолько уверенный, что отдельный headline вообще не требуется"*, with the mass carried by wordmark and photograph together.
Limiting: **two** entries, and only one of them is rating-3. Both are also identity-led pages, so the sample is narrow in project type as well as in size.
Tier: the case the accepted [C13 monumental-mark clause](../skills/academic-composition/SKILL.md#invariant) already covers.
**Stays EMERGING.** Two entries is under the ritual's threshold (3+ entries, or 2 rating-3s — and it has one), so this is not proposed and not promoted.
Confidence: Medium — up from Low, on one new human judgement.

### B3 — Real photography of real situations outranks polished renders

Supporting: `ciridae-com` (3) — *"реальные enterprise-фотографии сильнее обычных AI-рендеров"*.
Limiting: one entry. `porsche-com-usa` (`hybrid`) points the same way but is a partial judgement.
Confidence: Low. Recorded so a second entry can settle it.

---

## C · CONTEXTUAL

*Observed only under stated conditions. Do not generalise past them.*

### C1e — Motion as identity is accepted only where the subject is temporal

`thenewmobileworkforce` (`in`, 2): motion **is** the subject — *"скорость выражена не фотографией болида, а самой навигацией"*. `trionn-com` (`in`, 2): the same ambition, and Alex records the failure — *"motion здесь часто демонстрирует возможности технологии, а не раскрывает содержание"*.
So: approved where movement carries the meaning; criticised where it demonstrates capability. Both entries are `in`, so **the discriminator is the subject, not the amount**.
Yields when: the subject is static — then motion returns to seasoning
([auction-editorial P8](../dialects/auction-editorial.md#p8--motion-seasons-it-does-not-perform)).
Confidence: Medium, 2 entries, both with recorded reservations.

### C2e — A dark, atmospheric ground is not itself a preference

`ciridae-com` (`in`, 3) and `electrafilmworks-com` (`in`, 2) are dark. So is
`rmsothebys-com` (**`out`**, 1). **Darkness does not discriminate between approval
and rejection in this evidence set** — which is the useful finding, because it is the
inference a careless reading would make. What discriminates is A1–A3.
Confidence: High as a *negative* finding.

---

## D · UNKNOWN OR CONFLICTED

*Recorded so nobody fills the gap with theory.*

- **D1 · Colour.** No `in` entry's judgement isolates colour as a reason for approval.
  `beings-co` praises *"два контрастных цвета"* only as part of the simple system (A2).
  **Nothing is known about Alex's colour preferences from this evidence.**
- **D2 · Mobile authorship.** One data point: `thenewmobileworkforce` weakness —
  *"на mobile пространственный эффект неизбежно теряет часть глубины"*. Not a
  preference; a single observation about one technique.
- **D3 · `trionn-com` is internally conflicted.** Status `in`, note *"MAYBE"*, and a
  severe weakness. **The conflict is retained, not averaged.** It supports A1 and
  counter-supports A2 simultaneously.
- **D4 · No status/note mismatch remains.** All four were resolved by Alex on
  2026-07-30. What remains open is not ambiguity but *unread evidence*: three new `in`
  entries and one new `hybrid` are counted above and not yet interpreted, which the
  next distillation pass owns.
- **D5 · Anti-patterns from `out` are under threshold.** Both `out` entries fail on
  the *same* axis — a strong opening that never develops into a page:
  `rmsothebys-com` — *"premium content alone does not create premium art direction"*;
  `thegentlewoman-co-uk` — *"the initial visual idea never develops into a coherent web
  experience"*. Two entries. This maps onto existing
  [C11](../skills/academic-composition/SKILL.md#invariant),
  [C2](../skills/academic-composition/SKILL.md#invariant) and
  [U11](../skills/anti-patterns/SKILL.md#invariant), so **it is recorded as
  confirmation of those rules by Alex's own rejections — not as a new anti-pattern.**
- **D6 · Baseline vs Alex-specific.** A1 and A3 are also ordinary good practice. The
  evidence shows Alex *rewards* them; it does not show they are distinctive to him.
  Distinctiveness needs `out` entries that are competent and still rejected — and
  both current `out` entries are rejected for execution, not for position.

---

## How this file is used, and how it is not

**A Design Read consults section A and C** — those are the levels with enough
evidence to inform a decision. It **may cite B and D as open questions** and must
never present them as preferences.

**Nothing in this file overrides a skill.** If A-level interpretation collides with an
invariant, the invariant wins; that is [§1](../TASTE.md#1-the-two-tiers) and it does
not bend for evidence about taste.

**Promotion path.** A claim leaves this file only through the
[distillation ritual](README.md#the-distillation-prompt), which applies the same
thresholds as always (3+ entries, or 2 rating-3s), produces a diff, and waits for
Alex. Recording something here is explicitly **not** promotion.

**When Alex reviews an entry in the gallery**, the counts in this file go stale — it
happened four times inside one day while this file was being written. Re-run
`npm run evidence:check`: it recomputes from `sites.json`, prefers the canonical copy
on `origin/master` when the local one is behind, names which it read, and fails on a
mismatch. That is the check the previous stale count in `dialects/README.md` did not
have, which is why it survived for days undetected.

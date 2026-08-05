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

## Evidence inventory — counted from `vault/sites.json`, 2026-08-05

| Class | Count | Entry ids |
|---|---|---|
| **Usable `in`** (human-set) | **21** | `beings-co` (3) · `ciridae-com` (3) · `ruadh-com` (2) · `electrafilmworks-com` (2) · `thenewmobileworkforce-…-back-at-hq` (2) · `trionn-com` (2) · `kinncollective-co-uk` (2) · `augen-pro` (2) · `i-pinimg-…-46d9d54b` (2) · `organimo-com` (3) · `immersive-g-com` (3) · `rolls-roycemotorcars-…-home-html` (3) · `obys-agency` (2) · `mclaren-com-cars-gl-en` (2) · `semlerpremium-dk-showroom` (3) · `semlerpremium-dk-brands-porsche-911-gt3-…` (3) · `polestar-com-us` (2) · `semlerpremium-dk` (2) · `rimac-automobili-com-nevera` (2) · `oilstainlab-com` (2) · `hispanosuizacars-com` (2) |
| **Usable `out`** (human-set) | **4** | `rmsothebys-com` (1) · `thegentlewoman-co-uk` (1) · `hbbody-com-en-home` (2) · `rivian-com` (2) |
| **Partial / contextual** (`hybrid`) | **1** | `porsche-com-usa` (2) |
| **Not yet a judgement** (`unreviewed`) | **0** | — every record in the vault now carries a human status. |

> **The three contested assignments are resolved, 2026-08-05, sixth pass — read
> against the notes this time, not the hero shots.** Alex's re-reading:
> `hispanosuizacars-com` `cinematic-industrial` → **`immersive-authored-world`**,
> still `in`, because what governs there is the construction of a surreal cultural
> world and heritage used as material, not an object made convincing by light.
> `rimac-automobili-com-nevera` `cinematic-industrial` → **`technical-luxury`**,
> still `in`, because value is proved by data, construction, manufacturing and the
> link from every specification to a performance benefit — cinematic presentation
> supports that system rather than governing it. `rivian-com` leaves
> `swiss-editorial` for **`out`** with no dialect assigned. Inventory moves to
> **21 `in` · 4 `out` · 1 `hybrid` · 0 `unreviewed`**.
>
> **`cinematic-industrial` now holds zero `in` records.** It lost both, and they
> were its entire evidence. That is not a fault — it is a `library` dialect, a
> method available to a project, never a demonstrated preference of Alex's — but
> nothing in this vault currently evidences it, and any brief selecting it must say
> so as a method rather than cite the vault.
>
> **`immersive-authored-world` reaches four.** It was already confirmed earlier
> today at three, so Hispano Suiza strengthens a confirmed dialect rather than
> triggering a decision. **The tally stated in the fourth-pass block below —
> `auction-editorial` 3 and `immersive-authored-world` 3 — is superseded by this
> one**; that block is left as written because it records what was true when it was
> written.
>
> **`technical-luxury` reaches two independent observations.** Four records, but
> three of them are Semler pages counting as one, plus Rimac. One short of the
> threshold, and the first time that dialect has had evidence from more than a
> single site. `swiss-editorial` falls back to one (Polestar).
>
> **`out` is explicitly not rejection here**, in Alex's words: *"out здесь не
> означает «плохой сайт» или «мне не нравится». Это означает: сайт нравится, но его
> decision logic пока не описана существующими диалектами."* Both `rivian-com` and
> `hbbody-com-en-home` are liked and neither fits. He also refused to file Rivian
> under `organic-tactile` for tidiness — **a near-fit assigned to empty the queue is
> how a dialect stops meaning anything.** Two named characters now sit outside the
> ten: *Human-Centered EV / Adventure Technology* and *Industrial Editorial /
> Layered Scroll Architecture*.
>
> **Each of those rests on exactly one record — 1 of 3, not 2 of 3.**
> *Human-Centered EV* is `rivian-com` alone; *Industrial Editorial* is
> `hbbody-com-en-home` alone. The vault's only other `out` records are
> `rmsothebys-com` and `thegentlewoman-co-uk`, both rating 1 and neither related to
> either character. Written down because the miscount is the failure a raw tally
> always invites: at "2 of 3" the next single record would read as confirmation
> while only two observations existed. **Two more independent records are needed for
> each — different brands, not more pages of Rivian or HB Body.**
>
> **They are not to be merged.** Both are human and applied in orientation, and
> that resemblance is the trap. Their governing logic differs: one makes technology
> desirable by expanding what a person can do, the other makes an industrial product
> desirable by showing its result before explaining it. Collapsing them would
> manufacture a dialect out of a shared mood. The next independent record decides
> whether either is a repeating pattern or simply one brand's strong idea.

> **The note debt is cleared, 2026-08-05, fifth pass — and it produced a finding
> larger than itself.** Alex wrote full reasoning for all five records that held a
> status and no note: `oilstainlab-com`, `hispanosuizacars-com`,
> `rimac-automobili-com-nevera`, `rivian-com`, `hbbody-com-en-home`. Every one now
> carries `note`, `works` and `weaknesses` in his own words, split at his own
> headings and not edited. **No record in the vault reads `TODO` any more.**
> `oilstainlab-com` rose 2 → 3 on his sentence *"я бы сохранил его как очень
> сильный reference"*; the other four keep their ratings, because praise is not
> the word *reference* and a rating is his to state.
>
> **Three of the five notes contradict the dialect the record was filed under.**
> `hispanosuizacars-com` and `rimac-automobili-com-nevera` were both filed
> `cinematic-industrial`; the first is described as surreal heritage-as-material,
> the second as *"engineered rather than merely styled"* with a principle that is
> `technical-luxury`'s premise. `rivian-com` was filed `swiss-editorial` and his
> note says in as many words that it has **less** typographic discipline and
> editorial restraint than Polestar — the other record of that dialect.
>
> **The cause is procedural.** The dialect assignments were collected before the
> notes existed, from one hero screenshot each. A hero shot shows surface; a note
> carries decision logic, and decision logic is what a dialect *is*. Asking in that
> order built the classifications on the weaker evidence. Nothing has been
> reassigned — only Alex sets `dialectStatus` and `dialects` — but until he
> re-reads those three, **`cinematic-industrial`'s two independent records and
> `swiss-editorial`'s two are both in question**, and those are the entire
> independent evidence for either.
>
> **A reason was recorded that was never his.** `hbbody-com-en-home` was set `out`
> from an option whose wording carried the agent's reading — *a colour
> manufacturer with no colour on the first screen*. His note says the opposite and
> praises the colour concept explicitly. The status survives on other grounds; the
> reason did not, and the correction is appended to that record's sidecar rather
> than replacing the original. **The lesson is about method: an option label that
> carries the agent's judgement collects a verdict honestly and a reason
> dishonestly.**
>
> **Nine transferable principles were stated and none was promoted.** They sit in
> the five sidecars as distillation candidates. The strongest is general rather
> than site-specific — *"the strongest scroll effect does not animate objects
> inside the layout, it changes how the layout occupies space"* — and it belongs
> next to `motion-judgment`'s subject-over-amount rule if a second record supports
> it. Promotion runs through the ritual; one record is one record.

> **`unreviewed` reaches zero, 2026-08-05, fourth pass.** `oilstainlab-com` →
> **`expressive-poster`**, `hispanosuizacars-com` → **`cinematic-industrial`**,
> `hbbody-com-en-home` → **`out`**. Every one of the 26 records now carries a
> human status: **22 `in` · 3 `out` · 1 `hybrid` · 0 `unreviewed`**. The whole
> automotive cluster that arrived on TODO notes has been judged.
>
> **`hbbody-com-en-home` is the informative one.** A manufacturer whose product is
> colour opens on a nearly desaturated dark room whose only saturated element is a
> gradient chat icon holding the compositional centre. Alex set it `out`, selecting
> the reason *kept for its weaknesses*. It takes no dialect, and an empty
> `dialects` array is the correct value there rather than a gap.
>
> **Dialect tallies after this pass, with the independence caveat applied.**
> `auction-editorial` 3 and `immersive-authored-world` 3 — both already confirmed.
> `technical-luxury` 3 records but **one** independent observation, all three being
> Semler pages. `cinematic-industrial` 2 (Rimac, Hispano Suiza — independent),
> `swiss-editorial` 2 (Polestar, Rivian — independent), `expressive-poster` 1
> (Oil Stain Lab). **No dialect became confirmable in this pass**, and none was
> promoted.
>
> **Five records now hold a status and no reasoning.** `hbbody-com-en-home`,
> `hispanosuizacars-com`, `oilstainlab-com`, `rimac-automobili-com-nevera` and
> `rivian-com` still read `note: TODO`. They count toward a tally and are **not
> usable as references in a brief**: a reference whose note nobody can read teaches
> an agent to copy pixels, which is the failure this layer exists to prevent. The
> note is Alex's field and nothing has been written into it on his behalf. **This
> is now the vault's largest single debt** — larger than the counter drift that
> preceded it, because a wrong count is visible and an absent reason is not.

> **Three more judgements, 2026-08-05, third pass.** `semlerpremium-dk` →
> **`technical-luxury`**, `rimac-automobili-com-nevera` →
> **`cinematic-industrial`**, `rivian-com` → **`swiss-editorial`**. All `in`,
> ratings unchanged at 2. `unreviewed` falls 6 → 3, `in` rises 17 → 20.
>
> **`technical-luxury` now shows three `in` records and is still not
> confirmable.** All three are Semler pages — a homepage, an SRP and a VDP from
> one site. Under the distillation thresholds that is **one** independent
> observation, not three, and the raw count is the trap this paragraph exists to
> disarm. `swiss-editorial` holds two records that *are* independent (Polestar,
> Rivian); `cinematic-industrial` holds one (Rimac).
>
> **Two of the three carry a classification with no reasoning.**
> `rimac-automobili-com-nevera` and `rivian-com` still have `note: TODO`. Alex set
> status and dialect but has not written why, and the note is his to write. They
> count toward a dialect tally and are **not** usable as a reference in a brief
> until he does — a reference whose note nobody can read teaches an agent to copy
> pixels, which is the failure this whole layer exists to prevent.
>
> **Both captures are partial.** Rimac reports 2 canvas elements, Rivian 3;
> motion and WebGL state are not preserved by a static shot, and the Rivian first
> screen is a four-state carousel of which one frame was caught. Neither record's
> temporal behaviour has been judged by anyone.

> **Three judgements, 2026-08-05, second pass.** Alex reviewed
> `semlerpremium-dk-showroom`, `semlerpremium-dk-brands-porsche-911-gt3-…` and
> `polestar-com-us` against their shots and set all three `in`: the two Semler
> pages to **`technical-luxury`**, Polestar to **`swiss-editorial`**. Ratings
> unchanged (3 / 3 / 2). `unreviewed` falls 9 → 6, `in` rises 14 → 17. He was
> asked for status and dialect as separate questions, because a dialect
> assignment is what a confirmation count rests on and a guessed one confirms a
> dialect falsely.
>
> **The two Semler records are one design system and count as one.** A showroom
> SRP and a VDP from the same site share art direction, type and palette by
> construction. Under the distillation thresholds, several pages of one design
> system are not independent records — so `technical-luxury` holds **two `in`
> records but one independent observation**, and is nowhere near confirmable.
> `swiss-editorial` holds one. Both remain **library** dialects, usable as a
> declared project method and never as a demonstrated preference of Alex's.
>
> **What these three do not settle.** Alex gave a whole-record verdict, not layer
> verdicts. Every layer observation in the three sidecars is `agent` /
> `unreviewed` — noticed, not judged. In particular the open question on the GT3
> page, whether the centred inset is an intentional crop or a device seated on the
> subject, is recorded and unanswered.

> **Counter refresh, 2026-08-05, and the first dialect movement.** Five more
> records arrived from the gallery — HB Body, Hispano Suiza, Oil Stain Lab, Rimac
> Nevera and Rivian — all automotive, all `unreviewed`, all still on a `TODO`
> note. `unreviewed` therefore goes from 4 to 9. They are captured and tagged and
> count for nothing until Alex writes the note and sets the status, which is
> correct rather than a gap.
>
> **`immersive-g-com` gained `dialects: ["immersive-authored-world"]`**, its third
> `in` record, and the dialect is now **confirmed** — see the
> [distillation log](README.md#distillation-log). The `in` total is unchanged at
> 14: that entry was already `in`, it simply never said what it was in. Eight of
> the fourteen still do not.
>
> **The unreviewed nine are the automotive cluster**, and they are the raw
> material for the only route to a new dialect: ≥3 records Alex sets to `out`
> sharing decision logic. Two `out` records exist today, an auction house and a
> fashion magazine, and they share none.

> **Counter refresh, 2026-08-04.** Five records added since the last count, and
> the library is no longer fully reviewed. `mclaren-com-cars-gl-en` was added and
> set `in` by Alex in the gallery, taking the usable `in` total from 13 to 14.
> Four more arrived with his written judgement but **no dialect judgement**, so
> `unreviewed` returns to the table after standing at zero: three pages of
> **Semler Premium** — the homepage (2), the showroom SRP (3) and the 911 GT3
> VDP (3) — and **Polestar United States** (2).
>
> **Three of those four are one design system.** The Semler ids are three pages
> of one site. They are counted as three records and are **not** three
> independent references; distillation must treat them as one. The warning is
> repeated in each of their review sidecars.
>
> **Counted, not interpreted.** No claim below was reinterpreted, promoted,
> weakened or removed, and none of the five is cited in A, B, C or D. Their
> reasoning belongs to the next distillation pass.
>
> **One group crosses the arithmetic and is still not a candidate.**
> `npm run distill` now reports `composition · OUT` at three records — Polestar
> and two Semler pages — all three saying the same thing in Alex's own words: a
> premium page whose opening authority dissolves into a run of functional
> modules further down. Two of those three are Semler, so the independent count
> is **two**, not three, and the threshold is not met. It is recorded here
> because one more unrelated record would make it real, and because the failure
> already has a name in the vocabulary: `narrative-dilution-risk`.

> **One record removed, two restored, 2026-07-31.** A third commerce platform was
> deleted from the vault and stays deleted. `porsche-com-usa` and
> `thenewmobileworkforce-…-back-at-hq` were removed alongside it and have since been
> **restored from history, unedited** — original notes, `works`, `weaknesses`,
> metadata and every frame, byte for byte.
>
> **The claims below follow the data back.** [A1](#a1--one-governing-event-owns-the-first-screen-and-everything-else-defers-to-it)
> has its limiting case again, [B3](#b--emerging) has its corroboration again, and
> `C1e` and `D2` — both deleted while their evidence was absent — are **restored in
> their original wording**, because the entries they rest on are the same entries.
> The `D7` bullet that stood in for `C1e` is removed: it existed only while the
> contrast had one half.
>
> Nothing here was rewritten to fit the restoration. A claim whose evidence returns
> unchanged is restored, not re-derived.

> **Counter refresh, 2026-07-30.** Four records reviewed through the continuous
> ingestion workflow — `organimo-com` (3), `immersive-g-com` (3),
> `rolls-roycemotorcars-…-home-html` (3) and `obys-agency` (2) — took the usable
> `in` total from 9 to 13. **Counted, not interpreted:** no claim below was
> reinterpreted, promoted, weakened or removed, and none of the four is cited in
> A, B, C or D yet. Their reasoning belongs to the next distillation pass.
>
> **Reviewed 2026-07-30, in the gallery, across several sittings.** Alex set
> `kinncollective-co-uk` `unreviewed → in`, `augen-pro` `hybrid → in` and
> `i-pinimg-…-46d9d54b` `unreviewed → in`.
> **Nothing is unreviewed any more, and no note/status mismatch remains.**
>
> **The three new `in` entries are counted, not yet interpreted.** Their reasoning
> — `augen-pro`'s semantic blur and its own recorded low-contrast weakness, and
> `i-pinimg`'s layered overlap and extreme microtype — belongs to the next
> distillation pass. A count edit is not a reading, and inflating the claims below
> to match a larger sample would be exactly the overgeneralisation this file exists
> to prevent.

**Two `out` entries is below the three the binding rule requires for anything to be
distilled into a new dialect.** Nothing here proposes one.

### Data-quality facts, reported and not repaired

An agent may not change a human judgement, so these are listed for Alex and left
exactly as they are:

| Entry | The ambiguity |
|---|---|
`trionn-com` | note opens **"MAYBE —"** while `dialectStatus` is `in`. Not a mismatch of approval — an approval with a recorded reservation, which is why [D3](#d--unknown-or-conflicted) keeps the conflict rather than resolving it |
`electrafilmworks-com`, `trionn-com` | zero tags, so invisible to every tag filter |

**Every "IN —" against a non-`in` status is resolved** by Alex's review on
2026-07-30: `kinncollective-co-uk`, `augen-pro` and `i-pinimg-…-46d9d54b` are now
`in`.

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
| **Confidence** | High — 6 of the 9 `in` entries that existed at this reading, including both rating-3s. The other 4 of today's 13 were reviewed after it and are not yet counted for or against it |

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
- **D4 · No status/note mismatch remains.** All were resolved by Alex on
  2026-07-30. What remains open is not ambiguity but *unread evidence*: three new `in`
  entries are counted above and not yet interpreted, which the next distillation pass
  owns.
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

## E · CANDIDATE TENSIONS

*Territory where the vault has evidence and the skills have no rule at all —
distinct from D, which records what is unknown or self-contradicting. Every group
here was surfaced by `npm run distill` as `NO RULE COVERS THIS`, and every one is
**below threshold**.*

**These are not rules and must not be cited as taste.** They are held so that
the next confirming record has somewhere to land instead of being noticed and
forgotten. Promotion into `skills/` is the distillation ritual plus Alex, exactly
as for everything else — the counter below is the whole basis for the wording,
and one observation is a wording, not a finding.

Recorded 2026-08-05, on Alex's instruction, after he declined to promote any of
them.

### E1 — Learning the mechanism before receiving the content

> **An interface fails when the visitor must understand its mechanism before
> receiving its content.**

**2 independent observations.**

- `electrafilmworks-com` (r2/in, weaknesses) — *"risks trapping the visitor behind
  an unresolved preloader, preventing it from qualifying as a complete 3/3
  reference."*
- `thenewmobileworkforce-…-back-at-hq` (r2/in, weaknesses) — *"Navigation
  эффектная, но требует изучения — пользователь сначала осваивает интерфейс, а
  потом получает информацию."*

Nearest existing rules are about discoverability and about motion earning its
place; neither covers the cost of a mechanism that must be *learned* before the
content arrives. One more unrelated record makes this a real candidate.

### E2 — A mechanism demonstrating itself

> **A mechanism earns its visibility only when demonstrating it also reveals
> something about the subject.**

**1 independent observation.**

- `trionn-com` (r2/in, weaknesses) — *"Главная проблема: motion здесь часто
  демонстрирует возможности технологии, а не раскрывает содержание студии."*

One observation. The wording is provisional in the strongest sense: it was
written from a single record and would very likely change on the second.

### E3 — Where negative space stops reading as intention

> **Negative space reads as luxury only when surrounding cues make its intention
> unmistakable; without those cues, absence is interpreted as missing content.**

**1 independent observation**, and the one that matters most, because it draws a
boundary rather than adding a preference.

- `augen-pro` (r2/in, weaknesses) — *"Некоторые viewport'ы настолько пустые, что
  пользователь может решить, будто контент не загрузился."*

**It does not overturn air-as-status.** `thegentlewoman-co-uk` is the reference
case for exactly that — one viewport, three-quarters empty, the cover reading as
an object — and its note already carries a recorded `CONTRADICTION`. The two sit
on the same axis at opposite ends, and the axis has never been named.

Alex's stated conditions for absence reading as intention rather than as failure:
a strong compositional support · an obvious focal point · a deliberate
typographic hierarchy · a sufficient signal of continuation or completion · no
impression of a broken load. Absent those, it is not negative space but a loss of
informational confidence.

---

## How this file is used, and how it is not

**A Design Read consults section A and C** — those are the levels with enough
evidence to inform a decision. It **may cite B, D and E as open questions** and must
never present them as preferences.

**Section E is the strictest case of that.** Those three are territory where no
rule exists at all, which makes them the most tempting to quote and the least
entitled to be quoted: two of them rest on a single record. An open tension may
be raised in a Read as a question to answer; it may never be raised as an answer.

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

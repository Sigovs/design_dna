# Review history — morningstar-ventures

Append-only. `sites.json` holds the current state; this file holds how it got
there. Alex's wording is never edited, and agent observations are never merged
into his judgement.

**Layer verdicts are per layer.** A verdict here is never propagated to the whole
record: `dialectStatus` stays a whole-record field that only Alex sets.

---

## 2026-08-06 21:09 · DEEP

- **submitted:** https://morningstar.ventures/
- **normalised:** https://morningstar.ventures/
- **action:** record created
- **previous rating / dialectStatus:** n/a — new record, defaults applied
- **capture limitation:** partial evidence — 1 canvas element(s) — motion and WebGL state are not preserved by a static shot

### Alex's comment — verbatim, never edited

> <paste exactly what Alex wrote, in his language>

### Confirmed changes to the record

- <field: what changed, or "none">
- **previous works:** <only when it changed>
- **previous weaknesses:** <only when it changed>

### Layer judgements

| Layer | Observation | Source | Judgement | Evidence limit |
|---|---|---|---|---|
| composition | <observation, or not verified> | Alex \| agent | IN \| OUT \| unreviewed \| contextual | <if any> |
| hierarchy | <observation, or not verified> | Alex \| agent | IN \| OUT \| unreviewed \| contextual | <if any> |
| typography | <observation, or not verified> | Alex \| agent | IN \| OUT \| unreviewed \| contextual | <if any> |
| colour | <observation, or not verified> | Alex \| agent | IN \| OUT \| unreviewed \| contextual | <if any> |
| imagery | <observation, or not verified> | Alex \| agent | IN \| OUT \| unreviewed \| contextual | <if any> |
| spacing / density | <observation, or not verified> | Alex \| agent | IN \| OUT \| unreviewed \| contextual | <if any> |
| motion | <observation, or not verified> | Alex \| agent | IN \| OUT \| unreviewed \| contextual | <if any> |
| interaction | <observation, or not verified> | Alex \| agent | IN \| OUT \| unreviewed \| contextual | <if any> |
| design dialect | <observation, or not verified> | Alex \| agent | IN \| OUT \| unreviewed \| contextual | <if any> |

**Judgement rules for this table.** A layer Alex did not mention and the agent did
not directly verify stays out of the table entirely — an empty row is a claim.
"not sure", "neutral", "not bad", "ни туда ни сюда" are `unreviewed`, never
forced into IN or OUT. Only `Source: Alex` rows with IN or OUT count as evidence
in distillation.

## 2026-08-06 · DEEP — capture and first observations

- **action:** record created by `npm run review:deep`; Alex's comment recorded verbatim
- **rating / dialectStatus:** **2 / unreviewed** — repository defaults,
  **awaiting Alex.** Not evidence of taste and not inferred from his comment.

### Alex's comment — verbatim, never edited

> Этот мне очень нравится. Очень сдержанный, для портфолио вообще огонь. Интересуют анимация, motion, шрифты, работы, меню/навигация, переходы.

### Agent observations — not Alex's judgement

| Layer | Observation | Source | Verdict |
|---|---|---|---|
| typography | Two families and exactly two voices, read from computed styles: Punta carries display at 700 and the subhead at 300; Simplon carries body at 400. Nothing else is loaded. | agent | unreviewed |
| typography | Body copy computes to 14.4px — above the 14px floor, but only just. | agent | unreviewed |
| colour | Near-black ground throughout, the only chroma a blue dot on the scroll ring and the section rail. | agent | unreviewed |
| composition | One dominant mass — a fractured sphere, centred — with the headline set over its darkest region; a section rail at far left and a "scroll to explore" ring at lower right. | agent | unreviewed |
| motion | One canvas element is present and the capture records it as unpreserved. What actually moves was not observed — see the limitation below. | agent | unreviewed |
| interaction | The pinned header does not change after the first screen; the capture checked and stored nothing, which is an answer rather than a gap. | agent | unreviewed |

Every row is `agent` / `unreviewed`. His comment is an overall reaction, not a
set of layer verdicts, and nothing here was promoted into one.

### Limitations

**Not verified, and asked about specifically.** The menu, the page transitions and
the motion behaviour were **not observed**. A live pass found no menu trigger in the
1200px window and the run stopped rather than clicking at a guessed position — an
unidentified click on somebody else's site is an action, not a read. The canvas
means the static shots cannot answer it either.

**Verified and worth naming: there is no `prefers-reduced-motion` rule in any
stylesheet on the page.** Checked directly by walking every accessible
`document.styleSheets` rule. With a live canvas and scroll choreography, that is a
missing static path — an invariant in `motion-taste`, not a dialect preference.
Recorded here as an observation about the reference, not as a judgement of it.

## 2026-08-10 · NOTE — Alex's full reasoning

- **action:** `note`, `works` and `weaknesses` filled from Alex's written note, verbatim
- **rating / dialectStatus:** unchanged at **2 / unreviewed** — still his to set
- The menu he describes is the thing the 2026-08-06 pass marked `not verified`.
  **He has now seen it and the observation is his, not reconstructed.**

### Alex's note — verbatim, never edited

Split at his own headings (NOTE / WORKS / DOESN'T). The four principles he wrote
under KEY DESIGN DNA PRINCIPLES are kept at the end of the `note` field in his
wording.

### Two of his principles are not new — and that is the interesting part

**"A scroll transition is only complete when every frame at which the user can
stop still works as a composition."** This restates **`motion-judgment` MJ4** —
every stoppable frame is a designed frame — arrived at from the site rather than
from the rules. It is a **confirming recurrence**, not a candidate: the rule
exists and this is evidence it earns its place.

**"Keep the world constant while each section changes its informational job."**
This is the positive statement of the **second pending rule candidate** — the one
with no home in the DNA, where six independent records already carry
`narrative-dilution-risk`. Every earlier sighting was a *complaint*; this is the
first time it has been written as a **principle**, and by Alex. That matters for
the distillation: a rule is easier to write from a stated positive than from a
pile of negatives.

**"Motion should advance the page's argument, not merely make the visitor advance
an animation."** Matches the `device-over-content` theme in `distill.mjs`, which
was at one site and is now at two.

### Tags

On existing terms: `responsive-recomposition` and `visual-silence` (both
confirmed in his prose, not inferred), `big-type`, `bold-accent`,
`state-transition`, `scroll-reveal`, `restraint`.

Risks, both earned by his own weaknesses: `decorative-information-legibility-risk`
for the small body copy competing with grain and motion,
`repeated-composition-risk` for the logo field making unlike companies read alike.

**Three weaknesses have no term and stay in prose:** the transitional frames that
are not compositions, the mismatch between menu labels and page sequence, and the
missing reduced-motion path — which the 2026-08-06 pass verified directly by
walking every stylesheet rule, and which Alex has now independently asked for.

Queued in `unsorted`: *Immersive Portfolio* · *Venture Capital* · *Authored World* · *WebGL* · *3D Art Direction* · *Electric Blue Accent* · *Full-Screen Menu* · *Scroll Choreography* · *Portfolio Filters* · *Restrained UI* · *Cinematic Web Design*.

## 2026-08-10 · JUDGEMENT

- **action:** whole-record judgement set by Alex, **after** his note existed
- **previous rating / dialectStatus:** **2 / unreviewed**
- **current rating / dialectStatus:** **3 / in** — dialect `immersive-authored-world`

### Alex's judgement — verbatim

> `in` · `immersive-authored-world` · rating **3**

### The order was deliberate this time

Note first, then status, then dialect — each asked separately. On 2026-08-05 the
dialect was collected before the notes existed, from one hero screenshot per
record, and three of five assignments had to be reversed. A hero shot shows
surface; a dialect is decision logic, and decision logic only appears in the
reasoning.

`immersive-authored-world` moves to **five** `in` records. It was confirmed at
three on 2026-08-05, so this strengthens a confirmed dialect rather than
triggering anything. Rating 3 makes this the ninth record that may lead a brief.

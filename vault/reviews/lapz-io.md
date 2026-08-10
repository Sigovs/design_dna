# Review history — lapz-io

Append-only. `sites.json` holds the current state; this file holds how it got
there. Alex's wording is never edited, and agent observations are never merged
into his judgement.

**Layer verdicts are per layer.** A verdict here is never propagated to the whole
record: `dialectStatus` stays a whole-record field that only Alex sets.

---

## 2026-08-06 21:11 · DEEP

- **submitted:** https://www.lapz.io/
- **normalised:** https://lapz.io/
- **action:** record created
- **previous rating / dialectStatus:** n/a — new record, defaults applied
- **capture limitation:** <none observed — or state what the capture does not prove>

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

> Тут мне нравится, как footer выполнен — с большим текстом.

### Agent observations — not Alex's judgement

| Layer | Observation | Source | Verdict |
|---|---|---|---|
| typography | One family only — Inter — across headings, body and controls. A single-voice system. | agent | unreviewed |
| typography | The footer wordmark is set oversized in italic and cropped by both edges, mid-grey on black, so it reads as a field rather than as a sign-off. | agent | unreviewed |
| composition | The footer inverts the usual weighting: two small community cards sit above, and the largest element on the page sits under them carrying no information. | agent | unreviewed |
| colour | Black ground, white type, one violet accent borrowed from the Discord mark rather than from a palette. | agent | unreviewed |
| motion | Four video elements, no canvas. Their behaviour was not observed. | agent | unreviewed |

Every row is `agent` / `unreviewed`. His comment is an overall reaction, not a
set of layer verdicts, and nothing here was promoted into one.

### Limitations

**A caveat on the part Alex singled out.** A scan for the largest text node on the
page returned a 42px heading, not the giant wordmark — so the oversized `lapz` in
the footer is **most likely an SVG or an image, not live text.** That changes what
is transferable: as a graphic it cannot reflow, rewrap or be selected, and the
narrow-viewport behaviour is a separate decision rather than a consequence of the
type. Stated as likely rather than certain: the element itself was not inspected.

**Also verified: no `prefers-reduced-motion` rule in any stylesheet**, with four
autoplaying video elements on the page.

## 2026-08-10 · NOTE — Alex's full reasoning

- **action:** `note`, `works` and `weaknesses` filled from Alex's written note, verbatim
- **rating / dialectStatus:** unchanged at **2 / unreviewed** — his to set

### Alex's note — verbatim, never edited

Split at his own headings. The eight principles under KEY DESIGN DNA PRINCIPLES
are kept at the end of the `note` field in his wording.

### The same two findings as morningstar-ventures, on an unrelated site

**MJ4, reached from the site for the second time.** *"Because scrolling is
user-controlled, every stoppable state needs enough compositional authority to
survive as a frame"*, and as a principle: *"The more explanation motion carries,
the more carefully every stoppable frame must be composed."* On
`morningstar-ventures` he wrote the same thing in different words. Two unrelated
sites, the same conclusion, neither derived from the rules — `motion-judgment`
MJ4 is earning its place rather than sitting in the file.

**The animation-instead-of-argument failure, almost word for word.** Here:
*"The visitor sometimes appears to be advancing an animation rather than learning
something new about Lapz."* On Morningstar: *"the visitor appears to be advancing
the animation rather than advancing the argument."* That is the
`device-over-content` theme in `distill.mjs`, which **no rule covers** and which
this record takes to a third independent site.

**And the information-architecture candidate again, stated positively:**
*"Do not let a powerful demonstration substitute for information architecture.
Extract each visible capability into a clear product argument."* Same shape as
Morningstar's *"keep the world constant while each section changes its
informational job"* — every section owing a job no other section does.

**Reduced motion, third request.** He asks for it here as well. Verified absent on
this page on 2026-08-06 by walking every stylesheet rule.

### Tags

On existing terms: `dominant-mass` (his "the main race feed remains the visual
anchor"), `product-storytelling`, `structured-specification`, `scroll-reveal`,
`restraint`. Risks: `decorative-information-legibility-risk` for objects and text
approaching invisibility on ordinary displays, `narrative-dilution-risk` for a
homepage whose argument lives inside the sequence instead of the page.

**Not tagged, no term exists:** the performance responsibility of heavy video and
scroll-linked motion, the uncertain availability state behind the CTA, and the
uncaptioned interior gallery. Left in his prose.

He also used *Technical Luxury* as a tag. That is a **dialect name**, not a tag,
and it is not written into `dialects` — that field is set by the status question,
by him, and never inferred from a word in a tag list.

Queued in `unsorted`: *Spatial Computing* · *Apple Vision Pro* · *Formula 1* · *Motorsport Experience* · *AR Interface* · *Immersive Product Demo* · *Spatial UI* · *Race Visualization* · *Live Timing* · *Multi-Screen Experience* · *3D Circuit* · *Cinematic Hero* · *Scroll Choreography* · *RealityKit* · *SwiftUI* · *TestFlight* · *Spatial Entertainment* · *Restrained UI*.

## 2026-08-10 · JUDGEMENT

- **action:** whole-record judgement set by Alex, after his note existed
- **previous rating / dialectStatus:** **2 / unreviewed**
- **current rating / dialectStatus:** **3 / out** — no dialect, which is the correct
  and required value for `out` rather than a gap

### Alex's judgement — verbatim

> `out` · rating **3**

### The first rating-3 `out` record in the vault

`out` is not rejection — the vault README calls it the most valuable kind of
entry: evidence that good work exists outside every stored dialect, and the only
raw material a new dialect can be built from. Until now the four `out` records
were two rating-1 and two rating-2. **This is the first at rating 3**, which
carries real weight under the threshold rule: two independent rating-3 records
sharing decision logic clears the bar.

Recorded and not acted on: he used *Technical Luxury* among his tags and then set
the record `out`. The two are not the same statement — a tag is vocabulary, a
dialect is a whole-record judgement — and the judgement is what governs. Nothing
was written into `dialects`.

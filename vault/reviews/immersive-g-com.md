# Review history — immersive-g-com

Append-only. `sites.json` holds the current state; this file holds how it got
there. Alex's wording is never edited, and agent observations are never merged
into his judgement.

**Layer verdicts are per layer.** A verdict here is never propagated to the whole
record: `dialectStatus` stays a whole-record field that only Alex sets.

---

## 2026-07-30 23:03 · QUICK

- **submitted:** https://immersive-g.com/
- **normalised:** https://immersive-g.com/
- **action:** record created
- **previous rating / dialectStatus:** n/a — new record
- **current rating / dialectStatus:** **2 / unreviewed** — repository defaults,
  **awaiting Alex.** They are not evidence of taste and were not inferred from
  anything he wrote.
- **capture limitation:** partial evidence — the capture reached the loading state only: the shots show the wordmark and a progress rule on a near-white ground, not the site. 8 canvas elements, and the document is 900px against a 900px viewport with content present — consistent with a WebGL, scroll-driven page. The filmstrip holds one frame instead of eight. Nothing about the cursor effect, the scrollytelling or the transitions is preserved by this capture.

### Alex's comment — verbatim, never edited

> Нравится общее ощущение цельного, авторского digital-world, а не обычного агентского portfolio-сайта.
>
> Особенно нравится: - интерактивный эффект курсора: скрытые изображения раскрываются и следуют за движением мыши, создавая ощущение исследования;
> - scrollytelling — контент, изображения и переходы последовательно раскрываются по мере прокрутки;
> - взаимодействие пользователя напрямую управляет визуальным повествованием, а не просто запускает декоративную анимацию.
> - очень крупная типографика и уверенная визуальная иерархия;
> - масштабные изображения проектов;
> - свободная, editorial-композиция без стандартной сетки карточек;
> - сочетание минималистичного интерфейса с насыщенным визуальным контентом;
> - большие секции, пространство и хороший ритм страницы;
> - motion и переходы между проектами;
> - ощущение, что весь сайт работает как единый immersive experience.
>
> Сайт выглядит смело и экспериментально, но при этом сохраняет контроль и не превращается в набор случайных эффектов.
>
> Пока не уверен, насколько отдельные motion-приёмы применимы к обычным dealer или corporate-сайтам. Рассматриваю их скорее как источник принципов: масштаб, атмосфера, переходы, визуальный ритм и создание цельного мира.

### Confirmed changes to the record

- `note` — Alex's comment, verbatim
- `captureError` — the limitation above
- `works` / `weaknesses` — **left empty.** QUICK records what Alex supplied plus
  what was directly verified, and nothing about the site itself was verified
- `tags` — **left empty.** A tag asserts a quality is present in the artefact; the
  artefact was not captured. To be filled by Alex, or after a capture that reaches
  the content
- `rating` / `dialectStatus` — untouched

### Layer judgements

| Layer | Observation | Source | Judgement | Evidence limit |
|---|---|---|---|---|
| composition | свободная, editorial-композиция без стандартной сетки карточек | Alex | IN | **not verified** — the capture never reached the content |
| hierarchy | уверенная визуальная иерархия | Alex | IN | **not verified** |
| typography | очень крупная типографика | Alex | IN | **not verified** |
| imagery | масштабные изображения проектов | Alex | IN | **not verified** |
| spacing / density | большие секции, пространство и хороший ритм страницы; минималистичный интерфейс при насыщенном визуальном контенте | Alex | IN | **not verified** |
| motion | motion и переходы между проектами; scrollytelling — контент и изображения раскрываются по мере прокрутки | Alex | IN | **not verified.** No mechanics are described here — the shots preserve none |
| interaction | интерактивный эффект курсора: скрытые изображения следуют за движением мыши; взаимодействие управляет повествованием, а не запускает декоративную анимацию | Alex | IN | **not verified** |
| design dialect | ощущение цельного авторского digital-world, а не агентского портфолио; смело и экспериментально, но под контролем | Alex | unreviewed | Alex describes the register but gives no dialect verdict, and none is inferred |
| interaction | применимость отдельных motion-приёмов к dealer или corporate-сайтам — под вопросом; ценность видится в принципах: масштаб, атмосфера, переходы, ритм, цельный мир | Alex | contextual | Alex's own scoping. Project-local: it constrains where this transfers, and is not a judgement of the site |
| — | the capture shows a loading state: wordmark in small tracked caps beside a thin progress rule, near-white ground | agent | unreviewed | this is the preloader, not the design |

**Judgement rules for this table.** A layer Alex did not mention and the agent did
not directly verify stays out of the table entirely — an empty row is a claim.
"not sure", "neutral", "not bad", "ни туда ни сюда" are `unreviewed`, never
forced into IN or OUT. Only `Source: Alex` rows with IN or OUT count as evidence
in distillation.

### What this capture does not prove

**Nothing about the site.** The shots preserve the loading screen. Alex's
judgements stand as user-supplied evidence and are recorded as his, but no shot in
this record corroborates any of them, and no animation mechanics are described
anywhere. A capture that reaches the content would need the page's own load to
complete under a longer wait — worth doing before this record is rated.

---

## 2026-07-31 00:08 · QUICK · capture retry

Alex re-sent the three interaction points, so the capture was attempted again with
a longer wait for the page's own loader. **It reached the content**, and three of
his claims moved from *user-supplied* to *directly observed*.

- **action:** shots replaced (`hero.jpg`, `full.jpg`, `strip-1.jpg`); `captureError` rewritten
- **rating / dialectStatus:** unchanged — **2 / unreviewed**, still repository defaults awaiting Alex
- **note, works, weaknesses:** unchanged

| Layer | Observation | Source | Judgement | Evidence limit |
|---|---|---|---|---|
| interaction | moving the cursor to three positions produced three different frames; a colour image is revealed inside a rectangle that follows the pointer over a pale relief field | agent | unreviewed | verified that the reveal exists and tracks the pointer. Its timing and easing are not preserved |
| motion | wheel input changed the view while `window.scrollY` stayed 0 | agent | unreviewed | scroll-jacking is now observed, not inferred. The *sequence* it drives is still not preserved |
| composition | page text present (2 371 characters), 2 canvas elements, document height equals the viewport | agent | unreviewed | structural facts only |

**Alex's IN judgements are unchanged and still his.** What changed is that
`interaction` and `motion` now have corroborating evidence for *existence* — not
for the flow, the timing, or the transitions between projects, which no static
capture can hold. No mechanics are described beyond what the frames show.

---

## 2026-07-31 00:12 · QUICK · rating and status set, interaction filmstrip captured

- **rating:** 2 → **3** · **dialectStatus:** unreviewed → **in**
- **Alex's explicit overall judgement**, given as a whole-record decision. Not
  inferred from any single layer — the layer verdicts below are unchanged by it.
- **note / works / weaknesses:** unchanged. **No duplicate record was created**
  (one id, 15 entries before and after).
- **shots:** `strip-1..8.jpg` replaced with eight distinct interaction states.

### How the sequence was captured

Wheel input in controlled steps, because `window.scrollY` stays 0 on this page.
A frame was kept only when it differed materially from the last kept one, so the
eight are distinct states rather than eight samples of the same view.

### Directly verified by the agent

| Observation | Evidence limit |
|---|---|
| The cursor reveal tracks the pointer — three cursor positions produce three different frames, with a colour image appearing inside a rectangle that follows it over a pale relief field | existence and tracking only |
| Wheel input advances the experience while the document does not scroll (`scrollY` = 0) | scroll-jacking observed, not inferred |
| Eight materially different states exist across the sequence: an opening state, intermediate states, a large dark project frame with an embedded screen and a "Showreel" control, and later states | the frames are states, not a flow |
| Structural facts: 2 371 characters of text, canvas elements present, document height equal to the viewport | — |

### Supported only by Alex's testimony

- that the interaction **drives the narrative** rather than triggering decorative
  animation;
- that the transitions between projects read as one continuous experience;
- the felt quality of the rhythm and of the "single authored world".

These stay his. No shot corroborates them, and none is described here as though it did.

### Remaining capture limitations

Timing, easing and the transitions **between** states are not preserved — the
filmstrip holds eight stills, and a still cannot hold a transition. Nothing about
mechanics beyond what the frames show is recorded anywhere in this record.

---

## 2026-07-31 00:19 · QUICK · mobile interaction pass and tags

- **rating 3 · dialectStatus in** — unchanged. Note, works, weaknesses, desktop
  filmstrip and cursor evidence all unchanged. One record, no duplicate.
- **shots:** `strip-m-1..6.jpg` replaced with six distinct mobile states.

### What gesture advances it — tested, not assumed

Chromium with Pixel 5 emulation and real touch events dispatched over CDP.

| Gesture | Result |
|---|---|
| touch swipe up | **changes the view**, `window.scrollY` stays 0 |
| `window.scrollBy` | also changes the view, `scrollY` still 0 |

So the mobile experience advances on swipe, and — as on desktop — the document
itself never scrolls. Six materially distinct states were reachable this way;
frames were kept only when they differed from the previous kept frame.

### How mobile differs from desktop

- **The cursor reveal has no verified touch equivalent.** It is a pointer-tracking
  behaviour, and no pointer exists here. It was **not observed** on mobile — and its
  absence was **not proven** either. Neither claim is recorded as fact.
- **Swipe replaces wheel** as the advancing gesture; both bypass document scroll.
- Everything else about the mobile composition is a still-frame observation only.

### Still supported only by Alex's testimony

That interaction **drives the narrative**, that transitions read as one continuous
experience, and the felt rhythm of the "single authored world". No frame
corroborates these, on either device.

### Remaining limitations

Timing, easing and the transitions between states are preserved on neither device.
A still cannot hold a transition, and none is described here as though it could.

### Tag decision — exact vocabulary only

Applied, each an exact term already in `vocab.json`:

| Category | Tags |
|---|---|
| composition | `dominant-mass` · `active-negative-space` · `visual-silence` |
| typography | `big-type` · `editorial` |
| layout | `air` · `bleed` · `grid-break` · `asymmetry` |
| motion | `scroll-reveal` · `state-transition` |
| imagery | `photography` · `art-direction` |

**No risk tags** — no weakness has been confirmed.

**Two approved characteristics have no exact vocabulary match and were deliberately
left untagged:**

1. **immersive authored world** — nothing in `vocab.json` names it. The stored
   dialect `immersive-authored-world` exists, but a dialect is not a tag and
   `dialects` on this record stays empty until Alex assigns it.
2. **cursor-controlled image reveal** — the closest terms are `sensory-cursor`
   (not present) and `image-type-interaction` (not present). The behaviour is
   recorded in this sidecar and in `captureError`, not forced into an approximate tag.

**These tags describe this reference.** They are not a general Design DNA
preference and do not become one by being applied here.

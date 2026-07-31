# Review history — rolls-roycemotorcars-com-en-us-home-html

Append-only. `sites.json` holds the current state; this file holds how it got
there. Alex's wording is never edited, and agent observations are never merged
into his judgement.

**Layer verdicts are per layer.** A verdict here is never propagated to the whole
record: `dialectStatus` stays a whole-record field that only Alex sets.

---

## 2026-07-31 00:41 · DEEP

- **submitted:** https://www.rolls-roycemotorcars.com/en_US/home.html
- **action:** record created · no duplicate (one id, 17 entries)
- **rating: 3 · dialectStatus: in** — **Alex's explicit overall judgement about the
  site**, given as a whole-record decision, not inferred from any single layer.

### Alex's original comment — verbatim, never edited

> ooo zabil. mne etot ochenj nravitsja.....https://www.rolls-roycemotorcars.com/en_US/home.html tut vse cvet, menu bokovoje, frozen glass, models, vs evse vse krugliej knoki k mestu video vpisivaetsja ochenj kruto kak ne otdeljnij a kak prodolzhenije backgrounda, posmotri.

### Alex's expanded list — his judgements

> - вся визуальная система сайта целиком;
> - сдержанная luxury-палитра и её последовательное применение;
> - боковое раскрывающееся меню;
> - frozen-glass / frosted-glass поверхности и прозрачные слои;
> - презентация модельного ряда;
> - круглые и pill-shaped кнопки, применённые выборочно и к месту;
> - мягкая геометрия интерфейса без ощущения чрезмерно округлого шаблона;
> - видео интегрировано в композицию как продолжение изображения и фоновой среды;
> - видео не выглядит отдельным прямоугольным медиаблоком, вставленным между секциями;
> - согласованность цвета, навигации, типографики, изображений, видео, кнопок и motion;
> - современная digital-подача, которая сохраняет ощущение дорогого автомобильного бренда.
>
> Главный переносимый принцип: luxury создаётся не отдельными «премиальными» декоративными элементами, а согласованностью всей среды. Навигация, стеклянные поверхности, цвет, формы контролов, модели, изображения и видео должны восприниматься как один непрерывный визуальный мир.

### Directly verified by the agent — measured, not inferred

| Claim | How it was checked | Result |
|---|---|---|
| **Frosted glass** | computed `backdrop-filter` on every element, menu closed and open | **real background diffusion, not mere transparency:** `blur(150px) saturate(1.8)` on the open menu pane — 600×900 desktop, 390×664 mobile. A second element carries `blur(20px)` for the mobile nav |
| **Side menu** | locating the control, capturing closed / mid / open | **opens on both viewports.** Model names (SPECTRE, SERIES II) sit alongside a long utility group — dealer, whispers, FAQs, careers, legal, language, social |
| **Video integration** | `<video>` census: box, `object-fit`, radius, mask, playback state | **three videos sized exactly to the viewport** (1440×900 desktop, 390×664 mobile), `object-fit: cover`, `border-radius: 0`, muted and looping, one playing. **No `mask-image` on any of them** — the seamlessness comes from full-bleed sizing, not masking |
| **Control geometry** | radius census across links and buttons | **3 pill controls** ("DISCOVER NOW", "DISCOVER MORE"), **0 circular controls**, 30 with radius under 4px, at 1440×900 |
| **Colour** | pixel histogram of the rendered page | warm dark browns dominate — 26.6% near (72,48,24), 10.8% near (48,24,24), then near-black. A **warm** dark system, not a neutral black one |
| **Page structure** | scroll geometry | document 3620px, ordinary scrolling; states captured at 1200 / 2600 / 4200 |

### Layer judgements

| Layer | Observation | Source | Judgement | Evidence limit |
|---|---|---|---|---|
| composition | видео как продолжение фоновой среды, а не отдельный медиаблок; согласованность всей среды | Alex | IN | |
| composition | every captured state is dominated by one viewport-filling image or video with type over it | agent | unreviewed | still frames only |
| hierarchy | презентация модельного ряда | Alex | IN | model names were read in the menu; the Models experience itself was not traversed |
| typography | — | — | unreviewed | Alex made no typography judgement, and none is inferred |
| colour | сдержанная luxury-палитра и её последовательное применение | Alex | IN | |
| colour | warm dark browns dominate the render across sampled states | agent | unreviewed | desktop 1440×900 |
| imagery | full-viewport cinematic imagery and video with type layered over it | agent | unreviewed | |
| spacing / density | мягкая геометрия интерфейса без ощущения чрезмерно округлого шаблона | Alex | IN | |
| motion | согласованность motion со всей средой | Alex | IN | **not verified** — no timing, easing or transition mechanics were observed, and none is described |
| interaction | боковое раскрывающееся меню; frozen-glass поверхности | Alex | IN | both confirmed by measurement above |
| interaction | круглые и pill-shaped кнопки к месту | Alex | IN | **partially verified:** pill controls exist and are used sparingly (3). **Circular controls were not found** at 1440×900 — neither their existence elsewhere nor their absence is claimed |
| design dialect | современная digital-подача, сохраняющая ощущение дорогого автомобильного бренда | Alex | IN | Alex characterises the register; no stored dialect is assigned and `dialects` stays empty |

### Supported only by Alex's judgement

That the whole environment reads as **one continuous visual world**, that motion is
coherent with it, and the transferable principle that luxury comes from the
coherence of the environment rather than from individually "premium" decorations.
No frame corroborates a felt continuity, and none is described as though it did.

### Tag decision — exact vocabulary only

| Category | Tags |
|---|---|
| composition | `dominant-mass` · `active-negative-space` · `tonal-structure` |
| layout | `air` · `bleed` |
| colour | `dark` · `neutral` |
| motion | `restraint` |
| imagery | `photography` · `art-direction` · `product` |

**No risk tags** — no weakness confirmed.

**Approved characteristics with no exact vocabulary match, left untagged:**
*restrained luxury colour system* · *side-drawer navigation* · *frosted or
translucent layering* · *integrated background video* · *seamless media
composition* · *rounded or pill-shaped controls* · *circular controls* (also not
observed) · *model-led automotive storytelling* · *cinematic imagery* · *visual
continuity across sections* · *restrained interface density*. Nothing was
approximated to fill a field; each is recorded in prose above.

### Remaining limitations

The Models experience was not traversed — model names were read from the menu, not
from a models page. Menu transition timing and easing, video playback continuity,
and any compositing or masking technique are not preserved; **no mask was found and
none is claimed.** Circular controls were not observed at the captured viewport.

---
name: motion-taste
description: Motion rules in two tiers — INVARIANT (a designed static path for prefers-reduced-motion, perceivable state changes with keyboard parity, durations from a documented scale with coherent easing, no jank, no layout-shifting loaders) and DIALECT (auction-editorial's crossfade over travel, 2px hover lift, skeletons over spinners, motion never as identity, each with a yields-when). Use before writing any transition, animation, transform, scroll effect, loading state, or page transition.
---

# Motion Taste

Two tiers. The **invariants** are health, access, and performance laws. The
**dialect** section is the house feel, active when a Design Read selects
[auction-editorial](../../dialects/auction-editorial.md), and every rule in it
states when it yields.

---

## INVARIANT

### I1 — prefers-reduced-motion is first-class

**Every animation has a static path — designed, not degraded.** The
reduced-motion version must be complete and correct on its own.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

The blanket reset is the floor, not the answer:

- **Scroll-reveal content must be visible.** Anything animating in from
  `opacity: 0` defaults to `opacity: 1` under reduced motion. Prefer applying the
  hidden state *by script only when motion is allowed*, so a JS failure also
  leaves content visible.
- Autoplaying video and loops: paused by default, with a play control.
- Carousels and marquees never auto-advance under reduced motion.
- Instant state changes still need a non-motion signal — colour, rule, position.

```js
const allowMotion = !matchMedia('(prefers-reduced-motion: reduce)').matches;
if (allowMotion) el.dataset.animate = 'in';   // never hide content by default
```

*Why:* for some people motion causes actual nausea and vertigo — this is a health
setting, not a preference toggle. It's also a design test: if the static version
is incomplete, the motion was carrying meaning the layout should have carried.

### I2 — State changes are perceivable, with keyboard parity

Every interactive element has a visible state change on interaction, and every
hover effect has a `:focus-visible` equivalent. Motion is never the *only* signal
that something is interactive.

*Why:* keyboard and assistive-tech users get no hover event, and motion-suppressed
users get no transition. If interactivity is communicated by movement alone, it
isn't communicated.

### I3 — Durations come from a documented scale; easing is directionally coherent

Every duration resolves to a token. Entering and expanding decelerate; exiting and
collapsing accelerate. Exits may be one step faster than entrances, never slower.

```css
:root {
  --dur-1: 0.15s;  --dur-2: 0.25s;  --dur-3: 0.4s;  --dur-4: 1.2s;
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);   /* entering, expanding */
  --ease-in:  cubic-bezier(0.55, 0, 1, 0.45);   /* exiting, collapsing */
}
```

*Why:* a closed set makes motion across an interface feel like one system — the
same reason spacing uses tokens. The easing asymmetry is physical: things arriving
decelerate into place, things leaving accelerate away. Inverting it is the single
most common reason UI motion feels sluggish, because an ease-in entrance appears
to hesitate before it starts.

The specific four values are a dialect default; that a documented scale exists and
is the only source of durations is not.

### I4 — Motion must not cost frames or shift layout

- Animate `opacity` and `transform` only. Animating `width`, `height`, `top`, or
  `left` is a defect.
- Everything is interruptible: a new interaction cancels the previous animation.
- Loading placeholders match the real content's dimensions, so the swap causes no
  layout shift.
- Nothing blocks input while it animates.

*Why:* layout-property animation forces reflow on every frame, and jank reads as
brokenness rather than as slowness. Layout shift on load is worse than no
placeholder at all, because it moves the thing the user was already reading.

### I5 — Gratuitous motion is a defect

Motion must serve comprehension: explain a state change, show where something came
from, confirm an action, or indicate progress. Motion with no communicative job is
removed — not tuned.

*Why:* attention is the scarcest resource on any screen, and decorative movement
spends it without returning anything. This is the universal floor; how *much*
communicative motion is tasteful is a dialect question (D4).

---

## DIALECT

*auction-editorial — strong defaults, each with a stated exit.*

Calm and physical. Strong defaults, not laws.

### D1 — Crossfade over carousel-whoosh

Content changing in place crossfades. It doesn't slide in from off-screen, scale up
from zero, bounce, or flip.

```css
@keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
.panel[data-enter] { animation: fade-in var(--dur-2) var(--ease-out); }

/* fade plus a hint of travel — max 8px, in the reading direction */
@keyframes rise-in {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: none; }
}
```

Avoided: horizontal slide carousels, `translateX(100%)` entrances,
`scale(0)→scale(1)` reveals, spring overshoot on content, parallax moving more
than ~15% of scroll distance, elastic easing on real UI.

*Why:* a whoosh asserts the content travelled through space, which is false — it
was always in the same place and only its identity changed. Large travel also
costs attention: the eye tracks movement instead of reading the arrival. Small
travel (≤8px) reads as settling rather than flight and gives a direction cue.

`yields when:` spatial continuity genuinely aids comprehension — wizards and
multi-step flows where direction encodes progress, hierarchical drill-down where
travel shows depth, maps and timelines where position is meaning, or mobile
patterns where a slide matches the platform's own idiom. Also when the brand is
kinetic by nature.

### D2 — Hover is a subtle lift or colour shift, nothing more

```css
.card {
  transition: transform var(--dur-1) var(--ease-out),
              border-color var(--dur-1) var(--ease-out);
}
.card:hover  { transform: translateY(-2px); border-color: var(--rule-strong); }
.card:active { transform: translateY(0); }
```

Budget: **one** of translateY ≤3px, a colour/opacity shift, or a rule
strengthening. No scale (it resamples text), no shadow bloom, no gradient sweep,
no rotate.

*Why:* hover feedback answers exactly one question — "is this live?" — so anything
past a whisper over-answers it. A 2px lift and a firming rule read as physical: the
object came slightly toward you, which is what a cursor over an object should mean.

`yields when:` the brand is playful or expressive; the context is entertainment,
gaming, or children's product; or the target is large and coarse enough
(touch-first tiles, TV interfaces at distance) that a whisper isn't perceivable.
I2's keyboard parity holds regardless.

### D3 — Skeletons over spinners for content

If you know the shape of what's loading, draw the shape.

```css
.skeleton {
  background: var(--bg-raised);
  border-radius: 2px;
  animation: pulse 1.6s var(--ease-out) infinite;   /* opacity only, no shimmer sweep */
}
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.55; } }
```

- Under ~200ms: show nothing. A flashed loader is noise.
- Over ~5s: show progress or a status message, not a longer animation.
- Pulse opacity; a shimmer gradient sweeping across is the template look.

*Why:* a skeleton is information — it says the layout is coming and roughly what it
will be, so the page reads as assembling rather than stalled. A spinner says only
that time is passing, and centred on a blank page it reads as a failure state.

`yields when:` the incoming shape is unknown or highly variable (search results,
user-generated feeds, arbitrary query output) — a wrong skeleton is worse than
none; or the wait is inside a control where a spinner is the clearer, more local
signal (a submitting button). I4's no-layout-shift rule binds either way.

### D4 — Motion is not the personality

At most **one** ambient/`--dur-4` moment per page. Scroll-linked effects rare and
subtle. Total motion on first load: one entrance, ≤1.2s.

If the design's distinctiveness would collapse without the animation, fix the
typography, spacing, and colour first. Dialect principle
[P8](../../dialects/auction-editorial.md#p8--motion-seasons-it-does-not-perform).

*Why:* motion is the fastest thing to become irritating on second viewing — a
first impression is not a design. Restraint here is also durable: a page whose
character lives in type and space still works with motion off, on a slow device,
or in a screenshot.

`yields when:` the brand is motion-led — entertainment, sport, music, launches,
games — or motion *is* the product (a motion showreel, an animation tool, a
scrollytelling narrative where movement carries the story). Then choreography is a
primary medium and rationing it guts the work. I1 and I5 still bind: a
motion-led design still needs a complete static path, and still has no room for
movement that communicates nothing.

---

## Checklist

**Invariant — every deliverable**
- [ ] Reduced motion tested — nothing invisible, nothing autoplaying, page complete.
- [ ] Every hover has focus parity; motion is never the only affordance.
- [ ] Every duration is a token; ease-out enters, ease-in exits.
- [ ] Only `opacity`/`transform` animated; interruptible; no layout shift.
- [ ] No animation without a communicative job.

**Dialect — when auction-editorial is active**
- [ ] Content swaps crossfade; travel ≤8px in the reading direction.
- [ ] Hover = one subtle lift/colour/rule change.
- [ ] Loading uses shape-matched skeletons; no full-page spinner, no shimmer sweep.
- [ ] ≤1 ambient moment.
- [ ] Any yield above is named in the report with its condition.

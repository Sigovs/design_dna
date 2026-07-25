---
name: motion-taste
description: Alex's motion rules — calm and physical animation, crossfade instead of carousel whoosh, subtle hover lift or colour shift, a four-step duration scale (.15/.25/.4/1.2s) with ease-out enter and ease-in exit, skeletons instead of spinners, and a first-class static path for prefers-reduced-motion. Use before writing any transition, animation, transform, scroll effect, loading state, or page transition.
---

# Motion Taste

**Position: calm and physical.** Motion exists to explain a change in state —
where something came from, what replaced what, that a thing is now interactive.
It is never the personality. It seasons.

---

## 1. Crossfade over carousel-whoosh

Content changing in place **crossfades**. It does not slide in from off-screen,
scale up from zero, bounce, or flip.

```css
/* good: content swap */
@keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
.panel[data-enter] { animation: fade-in var(--dur-2) var(--ease-out); }

/* good: fade plus a hint of travel — max 8px, and only in the reading direction */
@keyframes rise-in {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: none; }
}
```

Banned: horizontal slide carousels, `translateX(100%)` panel entrances,
`scale(0) → scale(1)` reveals, spring overshoot on content, parallax layers that
move more than ~15% of scroll distance, anything using an elastic or bounce
easing on a real UI element.

**Rationale.** A whoosh asserts that the content travelled through space, which
is false — it was always in the same place, only its identity changed, and
crossfade is the honest depiction of that. Big travel also costs attention:
the eye tracks the movement instead of reading the arrival, so a flashy
transition makes content slower to consume. Small travel (≤8px) is different:
it reads as settling rather than as flight, and it gives a subtle direction cue.

---

## 2. Hover is a subtle lift or colour shift — nothing more

```css
.card {
  transition: transform var(--dur-1) var(--ease-out),
              border-color var(--dur-1) var(--ease-out);
}
.card:hover  { transform: translateY(-2px); border-color: var(--rule-strong); }
.card:active { transform: translateY(0); }

.link { transition: color var(--dur-1) var(--ease-out); }
.link:hover { color: var(--ink); }              /* dimmed → full ink */
```

Budget per hover: **one** of translateY ≤ 3px, a colour/opacity shift, or a rule
strengthening. Never scale (it resamples text), never a shadow bloom, never a
gradient sweep, never a rotate, never more than one property class at once.

Every hover effect must have a keyboard equivalent via `:focus-visible`, and
none of it may be the only signal that something is interactive.

**Rationale.** Hover feedback answers exactly one question — "is this live?" — so
anything past a whisper is over-answering it. Scale is specifically bad because
it blurs text mid-transition and shifts neighbouring layout attention. A 2px lift
and a rule that firms up reads as physical: the object came very slightly toward
you, which is precisely what a cursor over an object should mean.

---

## 3. Four durations, two easings

```css
:root {
  --dur-1: 0.15s;  /* micro: hover, focus, colour, small state flips */
  --dur-2: 0.25s;  /* standard: content crossfade, dropdowns, tooltips */
  --dur-3: 0.4s;   /* large: modal/drawer/sheet, section reveal */
  --dur-4: 1.2s;   /* ambient: hero entrance, slow scroll-linked drift */

  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);   /* entering, expanding */
  --ease-in:  cubic-bezier(0.55, 0, 1, 0.45);   /* exiting, collapsing */
}
```

Rules: **ease-out to enter, ease-in to exit.** No values off this scale — if
something needs 0.6s, it is a `--dur-3` element that is too big. Exits may run
one step faster than their entrance; they must never run slower. `linear` is only
for opacity-only crossfades and continuous loops.

**Rationale.** A small closed set means motion across an interface feels like one
system rather than a collection of individual decisions — the same reason spacing
uses a token scale. The easing asymmetry is physical: things arriving decelerate
into place (ease-out) and things leaving accelerate away (ease-in). Inverting it
is the single most common reason UI motion feels sluggish and wrong, because an
ease-in entrance appears to hesitate before it starts.

---

## 4. Skeletons over spinners for content

If you know the *shape* of what is loading, draw the shape.

```css
.skeleton {
  background: var(--bg-raised);
  border-radius: 2px;
  animation: pulse 1.6s var(--ease-out) infinite;   /* opacity only, no shimmer sweep */
}
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.55; } }
```

- Skeletons mirror the real layout's line heights, widths, and gaps. A skeleton
  that doesn't match causes a visible jolt on swap — worse than no skeleton.
- Spinners are allowed only for indeterminate, shapeless waits inside a control
  (a button submitting, for instance) — never as a full-page loader.
- Under ~200ms: show nothing. A flashed loader is noise.
- Over ~5s: show progress or a status message, not a longer animation.
- Pulse opacity, not a shimmer gradient sweeping across — the sweep is the
  template look.

**Rationale.** A skeleton is information: it tells you the layout is coming and
roughly what it will be, so the page feels like it is assembling rather than
stalled. A spinner tells you only that time is passing, and centred on a blank
page it reads as a failure state. Matching real dimensions also removes the
layout shift that otherwise undoes the benefit.

---

## 5. prefers-reduced-motion is first-class

**Every animation has a static path.** Not a degraded one — a designed one. The
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

The blanket reset is the floor, not the whole answer:

- **Scroll-reveal content must be visible.** Anything animating in from
  `opacity: 0` must default to `opacity: 1` under reduced motion — this is the
  #1 way reduced motion blanks a page. Prefer `opacity: 0` applied *by script
  only when motion is allowed*, so a JS failure also leaves content visible.
- Autoplaying video/loops: pause by default and offer a play control.
- Carousels/marquees: never auto-advance under reduced motion.
- Instant state changes still need a non-motion signal (colour, rule, position).

```js
const allowMotion = !matchMedia('(prefers-reduced-motion: reduce)').matches;
if (allowMotion) el.dataset.animate = 'in';   // never hide content by default
```

**Rationale.** For some people motion causes actual nausea and vertigo, so this
is a health setting, not a preference toggle — treating it as an afterthought
ships a broken product to those users. It's also a design test: if the static
version is incomplete, the motion was carrying meaning it shouldn't have been
carrying, which means the layout was under-designed.

---

## 6. Motion must never be the personality

Ration it. A page should have **at most one** ambient/`--dur-4` moment, and
scroll-linked effects should be rare, subtle, and interruptible.

- If the design's distinctiveness would collapse without the animation, the
  typography, spacing, and colour are not doing their jobs — fix those first.
- Never animate on a loop in the periphery of reading content.
- Everything must be interruptible: a new interaction cancels the old animation.
- Total motion on first load: one entrance, ≤1.2s, and never blocking input.
- Respect the frame budget — animate only `opacity` and `transform`; animating
  layout properties (`width`, `top`, `height`) is a bug.

**Rationale.** Motion is the most attention-expensive tool available and the
fastest to become irritating on the second viewing — a first impression is not a
design. Restraint here is also durable: a page whose character lives in its type
and space still works with motion off, on a slow device, or in a screenshot.

---

## Checklist

- [ ] Content swaps crossfade; travel is ≤8px and in the reading direction.
- [ ] Hover = one subtle lift/colour/rule change; keyboard parity via `:focus-visible`.
- [ ] Every duration is `--dur-1..4`; ease-out enters, ease-in exits.
- [ ] Loading uses shape-matched skeletons; no full-page spinner, no shimmer sweep.
- [ ] Reduced motion tested — nothing invisible, nothing autoplaying, page complete.
- [ ] ≤1 ambient moment; only `opacity`/`transform` animated; all interruptible.

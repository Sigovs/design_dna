# Anime.js v4 — verified API map (4.5.0)

Source of truth: `github.com/juliangarnier/anime` (`src/`, `src/types`, `examples/`) and
animejs.com/documentation. Checked 2026-11-14. Everything below is v4; do not mix v3.

## Import

```js
// build-free page
import { animate, createTimeline, stagger, spring, splitText, createDraggable,
         onScroll, createScope, utils, svg } from 'https://cdn.jsdelivr.net/npm/animejs@4.5.0/+esm';
// bundler
import { animate, ... } from 'animejs'; // npm i animejs@4.5.0
```

`src/` modules: adapters, animatable, animation, core, draggable, easings, engine,
events (onScroll), layout, scope, svg, text (splitText), timeline, timer, types, utils,
waapi (a WAAPI-backed `animate` variant).

## animate(targets, params)

```js
animate(el, {
  x: '0%', y: [ '115%', '0%' ],          // individual transforms: x y z rotate scale ...
  opacity: { to: 1, duration: 500, ease: 'out(2)' }, // per-property overrides
  ease: 'out(3)',                         // v4 names: 'linear','in(n)','out(n)','inOut(n)','outElastic', cubicBezier(...)
  duration: 800, delay: stagger(40),      // 'easing' (v3) is gone — it is 'ease'
  loop: false, alternate: false, autoplay: true,
  onUpdate, onComplete,
});
```
- From→to: `[from, to]` array or `{ from, to }`.
- Returns an Animation with `play() pause() restart() reverse() seek(ms) revert() then()`.
- `utils.set(targets, props)` sets values instantly (use for from-states and reduced motion).

## stagger(value, opts)

`stagger(16)`, `stagger(90, { start: 420 })`, `stagger(50, { from: 'center' })`,
grid: `stagger(40, { grid: [cols, rows], from: 'center' })`.

## spring(params) — an easing

```js
ease: spring({ bounce: .22, duration: 620 })        // perceived params; bounce -1..1 (recommended -.5 to .5)
ease: spring({ stiffness: 95, damping: 13, mass: 1 }) // physics params
```
**Overrides the animation's `duration`** with the settling time. `onComplete` inside
`spring()` fires at the perceived duration.

## createTimeline(params)

```js
const tl = createTimeline({ defaults: { ease: 'out(3)' } });
tl.add(a, { x: 100 }).add(b, { y: 50 }, '-=200').add(c, { opacity: 1 }, '<');
```

## splitText(target, params) — text module

```js
const split = splitText(el, { lines: { wrap: 'clip' }, words: false, chars: true });
split.addEffect(({ lines, words, chars }) => animate(chars, { y: ['100%', '0%'], delay: stagger(16) }));
split.revert(); // restores markup and reverts effects
```
- `wrap: 'clip'` wraps each unit in an overflow-clip mask (the "rise inside its line" look).
- When splitting **lines**, splitting waits for `document.fonts.ready` and **re-splits on
  resize**, replacing the elements → animate inside `addEffect` (see SKILL A5).
- Nested elements (`<a>`, `<em>`) are duplicated across lines as needed.
- Chars get `data-char`, lines `data-line`.

## createDraggable(target, params)

```js
const d = createDraggable(track, {
  container: () => [top, right, bottom, left],   // bounds, can be a function
  x: { snap: () => pageWidth }, y: false,
  releaseEase: spring({ bounce: .18, duration: 700 }), // or 'out(3)'; spring overrides releaseMass/Stiffness/Damping
  velocityMultiplier: 1.4, containerFriction: .6,
  trigger: el,                                    // optional drag handle
  onGrab, onDrag, onUpdate, onRelease, onSettle, onResize, onAfterResize,
});
d.x; d.setX(v); d.animateInView(dur, gap, ease); d.scrollInView(); d.revert();
```
Programmatic glide: tween a proxy and write `setX` in `onUpdate` (see recipes).

## onScroll(params) — as autoplay

```js
animate(el, { x: 100, ease: 'linear',
  autoplay: onScroll({ target: el, container: window, enter: 'bottom top', leave: 'top bottom', sync: true }) });
```
`sync: true` scrubs; a number smooths; omit for trigger-once play. `debug: true` draws markers.
`onEnter / onLeave / onUpdate / onSyncComplete`, `revert()`.

## createScope(params)

```js
const scope = createScope({ root: '.section', defaults: { ease: 'out(3)' },
  mediaQueries: { mobile: '(max-width: 640px)', reduce: '(prefers-reduced-motion: reduce)' } })
  .add(({ matches }) => { if (matches.reduce) return; /* animations here; reverted on MQ change */ });
scope.revert();
```

## v3 → v4 traps

| v3 (wrong here) | v4 |
|---|---|
| `anime({ targets, ... })` | `animate(targets, { ... })` |
| `easing: 'easeOutExpo'` | `ease: 'outExpo'` or `'out(3)'` |
| `anime.timeline()` | `createTimeline()` |
| `anime.stagger()` | `stagger()` |
| `translateX` | `x` (translateX still accepted) |
| `anime.set` | `utils.set` |
| `direction: 'alternate'` | `alternate: true` |
| `spring(mass, stiffness, damping, velocity)` string | `spring({ ... })` object |

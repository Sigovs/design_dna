# Recipes — proven on a shipped page

From the Exotic Motors Midwest sell page (`c:\____WORK\Exotic Motors Midwest\site\index.html`),
2026-11-14: an A/B lab against a WAAPI build; the user approved all three. Use as starting
points; tokens and amplitudes still come from the project's motion register.

## 0. Load gate + timeout (A7)

```html
<!-- inline, non-module, after the page script -->
<script>
setTimeout(() => {
  if (!document.documentElement.classList.contains('anime-on'))
    document.querySelectorAll('.hero h1, .hero .lead, .step, .step .n, .step h3')
      .forEach((e) => e.classList.add('m-in'));   // whatever the module would have revealed
}, 2500);
</script>
<script type="module">
import { animate, splitText, stagger, spring, createDraggable, utils } from 'https://cdn.jsdelivr.net/npm/animejs@4.5.0/+esm';
const root = document.documentElement;
root.classList.add('anime-on');
const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
const motion = root.classList.contains('js-motion') && !still;   // the page's own motion gate
/* recipes below */
</script>
```
CSS hides from-states only under the page gate: `.js-motion .hero h1:not(.m-in){opacity:0}`.

## 1. Per-character spring hero (staircase across lines)

```js
const h1 = document.querySelector('.hero h1');
if (motion) {
  let played = false;
  splitText(h1, { lines: { wrap: 'clip' }, chars: true }).addEffect(({ chars }) => {
    h1.classList.add('m-in');
    if (played || !chars.length) return;
    played = true;
    utils.set(chars, { y: '115%', x: '-.35em', opacity: 0 });
    return animate(chars, { y: '0%', x: '0em', opacity: 1,
      ease: spring({ bounce: .22, duration: 620 }), delay: stagger(16) });
  });
} else h1.classList.add('m-in');
```
Lead paragraph: same, `lines: { wrap: 'clip' }`, lines from `x: '-104%'`,
`spring({ bounce: 0, duration: 760 })`, `delay: stagger(90, { start: 420 })`.
The form is never part of this sequence.

## 2. Cards float up on a spring, one rung after another

```js
const cards = [...document.querySelectorAll('.step')];
if (motion) {
  utils.set(cards, { y: 110, opacity: 0 });
  cards.forEach((c) => c.classList.add('m-in'));
  new IntersectionObserver(([e], io) => {
    if (!e.isIntersecting) return; io.disconnect();
    animate(cards, { y: 0, opacity: { to: 1, duration: 500, ease: 'out(2)' },
      ease: spring({ bounce: .3, duration: 900 }), delay: stagger(190) });
  }, { rootMargin: '0px 0px -12% 0px' }).observe(document.querySelector('.how'));
}
```
A CSS scroll-timeline pull on the same cards must use `translate:` not `transform:` (A6).

## 3. Draggable inertia rail with native fallback

Markup: `.rail-shell > (side arrows) + .rail-vp > .rail#rail > .car*`.
Fallback CSS (always): `.rail` is a scroll-snap grid track; a scroll pager drives the arrows.
Upgrade CSS (only `.anime-on`):
```css
.anime-on .rail-vp{overflow:hidden}
.anime-on .rail{overflow:visible;scroll-snap-type:none;touch-action:pan-y;cursor:grab}
.anime-on .rail img{pointer-events:none}
```
```js
const rail = document.getElementById('rail'), vp = document.querySelector('.rail-vp');
// take the arrows over from the native pager
const [prev, next] = ['[data-rprev]', '[data-rnext]'].map((s) => {
  const b = document.querySelector(s), c = b.cloneNode(true); b.replaceWith(c); return c; });
rail.scrollLeft = 0;
rail.style.width = 'max-content';
const fit = () => { const g = parseFloat(getComputedStyle(rail).columnGap) || 0;
  const per = parseInt(getComputedStyle(rail).getPropertyValue('--per'), 10) || 4;
  rail.style.gridAutoColumns = (vp.clientWidth - (per - 1) * g) / per + 'px'; };
fit();
const geo = () => { const g = parseFloat(getComputedStyle(rail).columnGap) || 0;
  const card = rail.firstElementChild.getBoundingClientRect().width;
  const per = Math.max(1, Math.round((vp.clientWidth + g) / (card + g)));
  return { stride: per * (card + g), max: Math.max(0, rail.children.length * (card + g) - g - vp.clientWidth) }; };
const sync = (x) => { prev.setAttribute('aria-disabled', String(x >= -1));
  next.setAttribute('aria-disabled', String(x <= -geo().max + 1)); };
const drag = createDraggable(rail, {
  container: () => [0, 0, 0, -geo().max], x: { snap: () => geo().stride }, y: false,
  releaseEase: still ? 'out(3)' : spring({ bounce: .18, duration: 700 }),
  velocityMultiplier: 1.4, containerFriction: .6,
  onUpdate: (s) => sync(s.x), onSettle: (s) => sync(s.x), onResize: fit,
  onAfterResize: (s) => s.setX(Math.max(-geo().max, utils.snap(s.x, geo().stride))),
});
const glide = (dir) => { const { stride, max } = geo();
  const to = Math.max(-max, Math.min(0, utils.snap(drag.x, stride) - dir * stride));
  const p = { x: drag.x };
  animate(p, { x: to, ease: still ? 'linear' : spring({ bounce: .12, duration: 760 }),
    duration: still ? 0 : undefined, onUpdate: () => drag.setX(p.x), onComplete: () => sync(to) }); };
prev.addEventListener('click', () => prev.getAttribute('aria-disabled') !== 'true' && glide(-1));
next.addEventListener('click', () => next.getAttribute('aria-disabled') !== 'true' && glide(1));
sync(0);
```

## Verification notes (A8)

- In an automated browser the tab is often in the background: Anime animations stall,
  WAAPI ones do not. Read end states after a wait or ask the user to watch the page.
- Check: `html.anime-on` set · chars exist (`[data-char]`) · `scrollWidth === clientWidth`
  · no console warnings ("No target found" = splitText used outside addEffect).
- Block the CDN (or rename the import) once: content must still appear within 2.5 s and
  the rail must still page with the native pager.

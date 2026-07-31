# Implementation and verification

*Read when: the decisions are made and the motion is about to be built.*

**Framework-neutral by design.** GSAP, Framer Motion, Lenis, Motion One, ScrollTimeline
and CSS all implement the same judgments. A library is never a direction — see
[CLAUDE.md](../../../CLAUDE.md). Nothing here prescribes a tool, and nothing in the
vault supports one.

## What to animate

**Composite-only properties by default:** `transform` and `opacity`. They run off the
main thread and cost nothing in layout.

**Never animate** `width`, `height`, `top`, `left`, `margin` or `padding` on anything
a visitor can see moving. They force layout on every frame, and the jank is the
finding — [motion-taste I4](../../motion-taste/SKILL.md#invariant).

**`filter` and `backdrop-filter` are expensive.** A blur over a large area on a
mid-range phone is a frame-rate decision, not a style decision. Budget it, measure
it, and have a version without it.

**Reserve space before content arrives.** Aspect-ratio boxes, explicit dimensions,
skeletons at final size. A layout that settles after load has animated the wrong
thing — [motion-taste D3](../../motion-taste/SKILL.md#dialect).

## Reduced motion, built first

Write the reduced path as you write the animated one, not afterwards. Afterwards it
becomes a global kill-switch, which is the failure `MJ9` names.

- Query it in **both** CSS and JS, and keep the two in agreement.
- **Listen for changes** — the setting can be toggled while the page is open.
- Reduced does not mean absent: instant state changes, opacity-only transitions, and
  authored stills are all reduced motion.
- Every reveal still reveals. Every sequence still resolves. Every state change is
  still perceivable — [motion-taste I1](../../motion-taste/SKILL.md#invariant),
  [dimensionality DM4](../../dimensionality/SKILL.md#invariant).

## Scroll

- **Never block or replace the native scroll** `MJ6`. Smooth-scroll libraries hijack
  wheel input by definition — if one is used, it is a declared decision with a
  disable path, not a default.
- Scroll handlers are passive, and read layout once per frame rather than per event.
- Scroll-linked progress must be **derived from position, not accumulated** — an
  accumulated value drifts, and drift is what breaks a sequence scrubbed backwards.
- Restore scroll position across navigation, and decide what happens to an
  in-progress sequence when the visitor leaves mid-way.

## Interruption and lifecycle

- Every animation is **interruptible and reversible from its current state** — never
  queued behind a completion.
- Kill timelines, observers and listeners on unmount. An animation library that
  outlives its component is a leak that shows up as degradation, not as an error.
- Guard against double-initialisation on route change.
- Pause anything offscreen; pause everything on `visibilitychange`.

## Focus and keyboard

- Focus states are **not derived from hover states**. They are designed, visible, and
  present on every interactive element —
  [motion-taste I2](../../motion-taste/SKILL.md#invariant).
- Anything reachable by pointer is reachable by keyboard, in a sensible order.
- Focus never lands inside a hidden or mid-transition element.
- Nothing that moves may steal focus.

## Video and media

- Muted, `playsinline`, poster frame present, no autoplay with audio.
- Sized to its box so nothing shifts on load.
- Decide the no-video path: blocked, slow, save-data, or reduced motion.
- If audio exists, expose the control as a real, visible one rather than burying it
  `[R site:thenewmobileworkforce-imm-g-prod-com-back-at-hq]` — its `SOUND` toggle sits
  in the header at the same rank as navigation, and the record still notes that many
  visitors will not want it.

## Safety

- Nothing flashes more than three times per second.
- No large-area strobing, high-contrast oscillation, or rapid rotation.
- Nothing loops perpetually in a reading zone —
  [dimensionality DM9](../../dimensionality/SKILL.md#invariant).

---

# The verification pass

Run all of it before calling motion finished. Each line is pass/fail, not opinion.

**Behaviour**

- [ ] Normal scroll — every sequence resolves
- [ ] Fast scroll to bottom and back — nothing missing, nothing doubled
- [ ] Interrupted mid-sequence — no stuck or half state
- [ ] Reversed — sequences run backwards correctly
- [ ] Stopped at 25 / 50 / 75% — every frame legible and identifiable `MJ4`
- [ ] Reload mid-page — position and state restored

**Contexts**

- [ ] Mid-range phone, not a development machine `MJ8`
- [ ] Keyboard only — full reach, visible focus, correct order
- [ ] `prefers-reduced-motion` — same meaning, same state, nothing hidden `MJ9`
- [ ] Touch — nothing depends on hover
- [ ] Throttled network — waits read as progress
- [ ] Video blocked — composition still holds

**Cost**

- [ ] Frame rate holds during the heaviest sequence, on the weakest target device
- [ ] No layout shift attributable to animation
- [ ] Frame and payload budget within what was declared —
      [dimensionality DM3](../../dimensionality/SKILL.md#invariant)
- [ ] No animation still running after its component is gone

**Judgment, last and hardest**

- [ ] Every shipped system still matches the role written in the MOTION READ `MJ1`
- [ ] Still exactly one primary temporal idea per viewport `MJ2`
- [ ] Anything that survived only because it was already built has been removed
- [ ] The whole reads as one rhythm, with rests that exist on purpose

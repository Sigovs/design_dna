---
name: gsap-implementation
description: Implementation contracts for building an already-approved motion concept with GSAP — an instrumental skill outside the taste tiers, with no DIALECT layer. Covers the intake gate (an approved role, an active register, a declared dimensional role and budget), the method-sufficiency ladder from CSS through WAAPI, GSAP core, ScrollTrigger and other renderers, and eight contracts (G1–G8) on context and teardown, scoped selectors, timeline membership, token governance, matchMedia branching, property ownership and overwrite, progressive enhancement over visible content, and refresh strategy. Routes to references/ for ScrollTrigger modes and lifecycle detail. Load only after motion has been approved elsewhere and GSAP is under consideration.
---

# GSAP Implementation

> **This skill cannot authorize motion, define its character, assign a dimensional
> role, or justify GSAP's presence. It implements a motion decision already made
> elsewhere. It may reject GSAP; it may not use GSAP as the reason for a design
> decision.**

**Instrumental, and outside the taste tiers.** There is no DIALECT section here and
there never will be. `G1`–`G8` are engineering contracts, not aesthetic positions:
they decide how a thing is built and how it fails, never how it looks or feels.

A tool is never a direction — [CLAUDE.md](../../CLAUDE.md),
[TASTE.md §2](../../TASTE.md#2-the-design-read). "A GSAP page" names a library, not an
aesthetic family, and nothing in this file may appear in a report as the reason for
a design choice. It appears as an implementation note beside the build.

---

## Intake gate

**Four things exist before this skill is loaded. If any is missing, stop and go
get it — do not infer it here.**

| Required | Owner | Where it comes from |
|---|---|---|
| An **approved role** for this motion system | [motion-judgment MJ1](../motion-judgment/SKILL.md#invariant) | the MOTION READ |
| The **register and character** — amplitude, duration tokens, easing family | [motion-taste](../motion-taste/SKILL.md) | the active dialect |
| A declared **dimensional role** — MAIN / SUPPORT / ABSENT | [dimensionality](../dimensionality/SKILL.md) | the Design Read |
| A declared **frame and payload budget** | [DM3](../dimensionality/SKILL.md#invariant) | the Design Read |

**The budget is not re-opened here.** `DM3` owns it; this skill checks the work
against it and executes inside it, and never establishes a competing one.

**A motion system with no approved role is not implemented in any technology.**
The correct output of this skill is frequently *no GSAP*, and sometimes *no
animation*.

---

## Method sufficiency

```
CSS  →  WAAPI  →  GSAP core  →  ScrollTrigger  →  another renderer
```

**A sufficiency check, not a mechanical hierarchy.** The rule:

> **Choose the lightest method that fully satisfies the approved requirement.** An
> isolated stagger rarely justifies adding GSAP; one requirement may justify it
> when the required capability is materially unavailable or substantially less
> reliable with the lighter method.

**The report states why the selected level is the lowest sufficient method** — one
line, naming the capability that the level below could not deliver. "It was easier"
is not that capability; "interruptible mid-flight reversal across nine elements
sharing one timeline" is.

**No prototype tax.** Where the approved requirement inherently needs scroll-linked
sequencing, pinning, or a renderer, start there. Building a CSS version first to
prove it cannot work is waste, and this ladder never asks for it.

| Level | Genuinely wins when |
|---|---|
| **CSS** | State transitions, hover and focus, a single long ambient transform, a marquee, anything expressible as transition or keyframes |
| **WAAPI** | The same, but JS must own timing, interruption or completion — without adding a library |
| **GSAP core** | Coordinated multi-element sequencing where interruption, reversal and shared state have to stay correct |
| **ScrollTrigger** | Scroll position genuinely governs the event — see [references/scrolltrigger.md](references/scrolltrigger.md) |
| **Another renderer** | The subject needs real depth, material or light. Declare the role first; GSAP becomes a time bus, never the author of the scene |

**Two standing routes out of this skill:**

- **SPA page transitions** — prefer the View Transitions API, or the router's own
  transition mechanism. Reach for GSAP only for a **named** requirement those do not
  adequately cover.
- **Perpetual ambient movement** — route first to
  [D9](../anti-patterns/SKILL.md#dialect) and [U3](../anti-patterns/SKILL.md#invariant)
  and settle whether it should exist at all. If approved, use the lightest
  sufficient implementation, normally CSS.

---

## Contracts

`G1`–`G8`. Engineering only. Every one is checkable in a browser rather than by
reading the code.

### G1 — Context and reversible teardown

Component- or page-owned GSAP animation lives in `gsap.context()` and has explicit
reversible teardown through `revert()` or a documented equivalent lifecycle
cleanup.

*Why:* an animation that outlives its component is not an error anyone sees — it is
degradation, and it compounds on every route change.

### G2 — Scoped selectors

Selectors are scoped to their owning root. **No accidental document-global
animation targets.**

*Why:* a global selector silently adopts every matching element added later,
including ones belonging to other components.

### G3 — Timeline membership is meaningful

Tweens related by timing or shared state belong to one timeline. Unrelated effects
stay independent. **A timeline is not used merely as a container.**

*Why:* a timeline is a statement that these things share a clock. Putting unrelated
tweens in one makes every future timing change a regression risk.

### G4 — Tokens govern events; scroll ranges govern scrubs

**Project motion tokens govern event-based duration and easing** — the scale in
[motion-taste I3](../motion-taste/SKILL.md#invariant) is the only source, not
whatever number the tween call accepts.

**Scrubbed sequences derive their mapping from the declared scroll range**, not from
a duration token, and **normally use linear progress** — the visitor's scroll is
already the easing. Another mapping requires the approved concept to call for it
explicitly.

### G5 — matchMedia is the branch

`gsap.matchMedia()` is the standard branch for viewport-dependent GSAP behavior.
**CSS remains responsible for purely visual responsive differences** — do not move a
breakpoint into JS because the animation happens to be there.

**Mobile choreography is authored separately when the composition changes.
Proportional shrinking of a desktop timeline is prohibited**
([MJ8](../motion-judgment/SKILL.md#invariant),
[DM10](../dimensionality/SKILL.md#invariant)).

### G6 — Property ownership is explicit

Ownership of animated properties and overwrite behavior is explicit. **Concurrent
timelines may not unintentionally compete for the same property.**

*Why:* two timelines writing one transform produce a bug that appears only under
timing the developer did not try, and reads to a visitor as the page glitching.

### G7 — Enhancement over a correct static state

**Content is visible and usable before successful GSAP initialization.** Animation
progressively enhances the correct static state; **initialization or asset failure
may not conceal content.**

*Why:* the from-state pattern — hide everything, reveal on init — makes the library
load-bearing for content. Script fails, content is gone. This is the same floor as
[MJ5](../motion-judgment/SKILL.md#invariant) and
[MJ9](../motion-judgment/SKILL.md#invariant), stated where it actually gets broken.

### G8 — Refresh is declared, not reflexive

Geometry-dependent ScrollTrigger scenes have a declared refresh strategy for
**actual** layout changes, including relevant font, image and dynamic-content
changes. **Do not call `refresh()` globally or unconditionally when geometry did not
change.**

*Why:* a missing refresh puts every trigger at the wrong position; a reflexive one
recalculates every trigger on the page and shows up as a stall.

---

## Routing

| Read | When |
|---|---|
| [references/scrolltrigger.md](references/scrolltrigger.md) | Trigger, toggle, scrub and pin modes · refresh strategy · dynamic content · mobile reconstruction · frame sequences · failure and performance checks |
| [references/lifecycle.md](references/lifecycle.md) | `context` and scope · `revert` · `matchMedia` · duplicate initialization · route mount and unmount · frameworks · overwrite and interruption semantics |

**Not restated here, and binding anyway:** what to animate and the verification
pass live in
[motion-judgment/references/implementation.md](../motion-judgment/references/implementation.md);
reduced motion, keyboard parity, the duration scale and the no-jank rule live in
[motion-taste](../motion-taste/SKILL.md) `I1`–`I5`.

## Checklist

- [ ] An approved role, register, dimensional role and declared budget all exist
- [ ] The chosen level is the lowest sufficient one, and the report says why
- [ ] Every animation inside a `context()` with reversible teardown `G1`
- [ ] No document-global selectors `G2`
- [ ] Timelines contain things that genuinely share a clock `G3`
- [ ] Event durations and easing from project tokens; scrubs mapped to scroll range,
      linear unless the concept says otherwise `G4`
- [ ] Viewport branching through `matchMedia`; mobile authored, not shrunk `G5`
- [ ] One owner per animated property; overwrite deliberate `G6`
- [ ] Content visible and usable with the script removed `G7`
- [ ] Refresh strategy declared, and tied to real geometry change `G8`

*Authored 2026-07-31* `[J]`. Engineering contracts, resting on no vault record and
carrying no aesthetic claim.

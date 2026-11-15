---
name: animejs-implementation
description: Implementation contracts for building an already-approved motion concept with Anime.js v4 (pinned 4.5.0) — an instrumental skill outside the taste tiers, with no DIALECT layer. Covers the intake gate, when Anime.js beats CSS / WAAPI / GSAP (spring physics, per-character text splitting, draggable with inertia, SVG drawing, JS-object tweening on a build-free page), and eight contracts (A1–A8) on version pinning and import, scope and revert, scoped targets, token governance and springs, splitText via addEffect, property ownership against CSS and WAAPI layers, progressive enhancement with a load gate and timeout, and verification in a visible tab. Routes to references/ for the verified v4 API map and recipes proven on a shipped page. Load only after motion has been approved elsewhere and Anime.js is under consideration.
---

# Anime.js Implementation

> **This skill cannot authorize motion, define its character, assign a dimensional
> role, or justify Anime.js's presence. It implements a motion decision already made
> elsewhere. It may reject Anime.js; it may not use Anime.js as the reason for a
> design decision.**

**Instrumental, and outside the taste tiers** — the same standing as
[gsap-implementation](../gsap-implementation/SKILL.md). `A1`–`A8` are engineering
contracts: how the thing is built and how it fails, never how it looks. A library is
never a direction ([TASTE.md §2](../../TASTE.md#2-the-design-read)).

**Version: Anime.js 4.5.0** (released 2026-06-22, MIT, `juliangarnier/anime`).
Last checked against upstream 2026-11-14. **v4 is not v3**: no global `anime()`
function, no `anime.timeline`, no `easing:` key, no `translateX` shorthand defaults.
Most snippets on the internet are v3 and are wrong here. Re-sync from the upstream
repo (`src/`, `src/types`, `examples/`) and animejs.com docs when bumping the pin.

---

## Intake gate

Identical to gsap-implementation. Before this skill loads, these exist:

| Required | Owner |
|---|---|
| An **approved role** for the motion | [motion-judgment MJ1](../motion-judgment/SKILL.md#invariant) |
| The **register** — amplitude, duration tokens, easing family | [motion-taste](../motion-taste/SKILL.md) |
| A **dimensional role** and **budget** | [dimensionality](../dimensionality/SKILL.md), DM3 |

Missing any → stop. The correct output is often *no Anime.js*.

---

## Method sufficiency — when Anime.js is the lightest sufficient level

```
CSS  →  WAAPI  →  Anime.js  /  GSAP  →  another renderer
```

Anime.js and GSAP sit on the same rung. **Choose by the named capability, not by
habit**, and state it in one line in the report.

| Anime.js genuinely wins when | Prefer instead |
|---|---|
| **Spring physics** on entrances or releases (`spring({ bounce, duration })`) — a perceptible overshoot-and-settle that a cubic-bezier cannot draw | CSS/WAAPI when no overshoot is wanted |
| **Per-character / per-word / per-line text cascades** with masks (`splitText`) on a build-free page | WAAPI + a hand splitter when only whole lines move |
| **Draggable with inertia, snap and spring release** (`createDraggable`) — a track that feels physical under the hand | native scroll-snap when a plain swipe is enough |
| **SVG drawing / morphing** (`svg.createDrawable`, `morphTo`) | CSS `stroke-dashoffset` for a single static draw |
| Tweening **JS objects** that drive something else (`animate(obj, {...onUpdate})`) | — |
| Long, interruptible **multi-element timelines with shared state** | GSAP is equally valid; pick one per project, never both |
| **Scroll-scrubbed** sequences | CSS `animation-timeline: view()` first; Anime `onScroll` only when JS must own the mapping |

**Never load Anime.js and GSAP on the same page.** One timing engine per project.
A WAAPI/CSS layer may coexist (see A6).

---

## Contracts

### A1 — Pinned version, ESM, no globals

Import named functions from a **pinned** build:
`https://cdn.jsdelivr.net/npm/animejs@4.5.0/+esm` (build-free) or `npm i animejs@4.5.0`.
Never an unpinned `animejs` / `latest` URL. Inside one `<script type="module">`.

### A2 — Scope and revert

Component- or page-owned animation lives in `createScope({ root, mediaQueries })` and
is torn down with `scope.revert()` (or the object's own `revert()` — `splitText`,
`createDraggable`, `onScroll` all have one). An animation that outlives its owner is
degradation that compounds on every route change.

### A3 — Scoped targets

String selectors resolve inside the scope's `root`, or the target is a node reference.
No accidental document-global targets.

### A4 — Tokens govern; springs are declared

Event durations and easings come from the project tokens (`--m-*` read via
`getComputedStyle`), never a magic number in the call. **A spring is a declared
token pair** — `bounce` and perceived `duration` — written next to the other motion
tokens, and only where the approved concept calls for overshoot. Scrubs map to the
scroll range and stay linear unless the concept says otherwise. Note: `spring()`
**overrides the animation's `duration`** with its own settling time.

### A5 — splitText goes through addEffect

`splitText(el, { lines: ... })` re-splits **after `document.fonts.ready`** and on
every resize, so the returned arrays are empty at call time and are replaced later.
**Animate inside `split.addEffect(({ lines, words, chars }) => animate(...))`**, return
the animation, and guard with a played-once flag so a resize does not replay the
entrance. Calling `animate(split.chars)` directly logs *"No target found"* and
silently animates nothing.

### A6 — Property ownership across layers

Anime.js writes the inline `transform`. A coexisting CSS scroll-timeline or WAAPI
layer must use **the individual `translate` / `scale` properties** (or a different
element) so the two never compete for one property. Never let Anime.js and a WAAPI
animation own `transform` on the same node.

### A7 — Enhancement over a correct static state

Content is visible and usable if the module never loads.
- Hidden from-states apply only under a class the **module** sets (`html.anime-on`)
  or under the page's motion gate, never unconditionally.
- A **timeout fallback** in the inline script reveals anything the module would have
  revealed (≈2.5 s) if `anime-on` never appears.
- Interaction upgrades (draggable track) replace a working native fallback (scroll-snap
  + pager), switched by the same class; the module removes the fallback's listeners
  (clone-and-replace the buttons) when it takes over.
- `prefers-reduced-motion: reduce` → set end states with `utils.set`, no springs; a
  drag release uses a plain `out(3)` ease.

### A8 — Verify in a visible tab

The Anime.js engine runs on `requestAnimationFrame`. **A background, minimized or
occluded tab produces no frames**: animations stall at their from-state and
screenshots or screencasts capture nothing, while WAAPI/CSS layers keep running.
Verify by reading end states after a wait (`el.style.transform`), by pausing and
seeking, or in a foreground window — never conclude "it works" or "it's broken" from
a background tab. Report which method was used.

---

## Routing

| Read | When |
|---|---|
| [references/api-v4.md](references/api-v4.md) | The verified v4 module map and signatures: `animate`, `createTimeline`, `stagger`, `spring`, `splitText`, `createDraggable`, `onScroll`, `createScope`, `utils`, `svg` — plus v3→v4 traps |
| [references/recipes.md](references/recipes.md) | Recipes proven on a shipped page (Exotic Motors Midwest, 2026-11-14): per-character spring hero, staircase card float, draggable inertia rail with native fallback, load gate + timeout |

**Binding and not restated:** what to animate and the verification pass —
[motion-judgment/references/implementation.md](../motion-judgment/references/implementation.md);
reduced motion, duration scale, no-jank — [motion-taste](../motion-taste/SKILL.md) `I1`–`I5`.

## Checklist

- [ ] Approved role, register, dimensional role and budget exist
- [ ] The report names the capability that made Anime.js the lightest sufficient level
- [ ] Pinned 4.5.0 ESM import; no GSAP on the same page `A1`
- [ ] Everything owned is revertible (`scope` / object `revert()`) `A2`
- [ ] No document-global targets `A3`
- [ ] Durations/eases from tokens; springs declared as tokens `A4`
- [ ] `splitText` animated through `addEffect`, played once `A5`
- [ ] One owner per property; CSS/WAAPI layers use `translate`/`scale` `A6`
- [ ] Content visible with the module blocked; native fallback for interactions; reduced-motion end states `A7`
- [ ] Verified in a visible tab or by end-state reads; method stated `A8`

*Authored 2026-11-14* from the upstream repo (v4.5.0), the animejs.com docs and an A/B
lab on the Exotic Motors Midwest sell page that the user approved. Engineering
contracts only; no aesthetic claim.

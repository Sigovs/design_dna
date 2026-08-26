# Lifecycle, scope and interruption

*Read when: wiring GSAP into a component tree, a router, or anything that mounts
and unmounts. Most GSAP defects are lifecycle defects wearing an animation
costume.*

---

## Context and scope — `G1`, `G2`

**`gsap.context()` is the unit of ownership.** Everything a component creates —
tweens, timelines, ScrollTriggers, event listeners registered through GSAP — belongs
to one context, created with the component's root element as its scope.

**Scope makes selectors local.** A context created against a root resolves selector
strings inside that root, which removes the whole class of bugs where a component
animates an element belonging to a sibling. Where a selector must reach outside its
root, that is a decision worth a comment, not a default.

**`revert()` is the teardown, and it is not the same as `kill()`.** Reverting
restores the inline styles GSAP wrote, which is what makes teardown *reversible* —
the DOM returns to the state the stylesheet describes rather than keeping the last
frame of an animation that no longer exists. A component that kills without
reverting leaves transforms behind, and the next mount inherits them.

**A documented equivalent is acceptable.** `G1` does not mandate the API, it
mandates that teardown exists, is explicit, and restores state.

## Duplicate initialization

The failure: a component mounts twice — a strict-mode double render, a hot reload,
a route returned to — and two contexts now animate one element.

- Initialization is idempotent, or guarded by the context's own existence.
- Never key initialization off a global flag; it fails the moment two instances of
  the component exist.
- Hot-reload and dev-mode double invocation are not edge cases. They are the
  environment the work is built in, and a setup that breaks under them will break
  under a real remount too.

## Routes: mount, unmount, and back

- **Unmount reverts.** No exceptions, and no reliance on the element disappearing to
  clean up scroll listeners that were registered globally.
- **Back-forward cache.** A page restored from bfcache did not re-run setup. Decide
  what happens on `pageshow` when `persisted` is true.
- **Scroll restoration and triggers interact.** A restored scroll position with
  freshly created triggers needs the triggers to exist before the restoration is
  meaningful, or a refresh after it.
- **In-flight animation on navigation.** Decide whether it completes, reverses or
  reverts. Leaving it running into an unmount is how a route change starts leaking.

## Frameworks

Framework-neutral by intent — the contract is the same, the hook differs.

- **React** — create the context in an effect keyed to the root ref; return
  `() => ctx.revert()`. Assume the effect runs twice in development.
- **Vue** — create on mount, revert on unmount; be explicit about whether a keyed
  re-render is a remount.
- **Svelte** — the action or `onMount` return is the teardown.
- **Astro / island architectures** — hydration timing decides when setup runs; an
  island that hydrates late must not have hidden its own content in the meantime
  — `G7`.
- **Server rendering** — the static markup that arrives is the state `G7` requires to
  be correct. Nothing may be hidden waiting for hydration.

## Property ownership and overwrite — `G6`

**One owner per animated property per element**, at any moment.

- **`overwrite` is a decision, not a default.** `"auto"` kills conflicting tweens of
  the same properties; `true` kills all tweens of the target. Choose, and say why in
  a comment where it is not obvious.
- **Concurrent timelines writing one transform** is the classic silent conflict: it
  looks correct until timing shifts, then reads to a visitor as a glitch.
- **Prefer restructuring over overwriting.** Two timelines fighting for a property is
  usually `G3` telling you they were one timeline.
- **Separate the axes.** Where two concerns genuinely animate one element, give them
  different properties — one owns `x`, the other owns `scale` — rather than both
  owning `transform` through different tweens.

## Interruption and reversal

- **Everything is interruptible from its current state** —
  [motion-taste I4](../../motion-taste/SKILL.md#invariant). A new interaction cancels
  the previous animation rather than queueing behind it.
- **Reverse versus restart is chosen by state semantics.** A panel returning to
  closed reverses — it is the same journey travelled back. A notification appearing
  again restarts — it is a new event that happens to look like the last one. Getting
  this wrong is not a bug the code shows; it is a bug the visitor feels.
- **Rapid repeated input may not corrupt state.** Hammer the trigger: the end state
  must be correct regardless of how many times it was interrupted.
- **The completed state is correct when the animation is skipped entirely** —
  reduced motion, a killed context, or a tab that was never focused. If the final
  state only exists because an `onComplete` ran, it does not really exist.
- **Timeline position is authoritative, not accumulated.** Deriving state by adding
  up deltas drifts; reading the playhead does not.

## Cleanup checklist

- [ ] One context per component root, scoped — `G1` `G2`
- [ ] Teardown reverts rather than only killing — `G1`
- [ ] Idempotent under double invocation and hot reload
- [ ] ScrollTriggers die with their context
- [ ] Listeners, observers and RAF loops registered outside GSAP also removed
- [ ] Nothing animates offscreen or in a hidden tab
- [ ] `overwrite` explicit wherever two systems touch one element — `G6`
- [ ] Final state correct with the animation skipped — `G7`

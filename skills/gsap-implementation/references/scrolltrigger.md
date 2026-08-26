# ScrollTrigger

*Read when: scroll position genuinely governs an approved motion system. Whether
that system should exist was settled in the MOTION READ — nothing here reopens it.*

**The first question is not which mode.** It is whether scroll governs the event or
merely happens near it. A reveal that could fire on any signal does not need
ScrollTrigger; it needs an IntersectionObserver, or a CSS animation with
`animation-timeline: view()` where support allows.

---

## The four modes, and what each actually claims

| Mode | The claim it makes | Use when |
|---|---|---|
| **toggle** (`toggleActions`) | *Arriving here is an event* | A section resolves on entry; state does not track scroll position |
| **scrub** | *Scroll position **is** the playhead* | The sequence is the content — a process, an assembly, a transformation |
| **pin** | *This frame is the stage for a change happening inside it* | The change genuinely needs a fixed viewport to be read |
| **batch** | *Many similar elements share one behaviour* | Grids and lists, where one trigger per item would be waste |

**Choosing scrub when toggle was meant** is the most common misuse: it converts a
moment into a scrubbing exercise, and the visitor now has to operate the page to
receive something that could simply have arrived.

**`batch` before N triggers.** A per-card trigger on a 30-card grid is thirty
scroll listeners for one behaviour. It is also usually the wrong design — see
`MJ2` on universal reveals.

## Scrub

- **Mapping comes from the declared scroll range, not a duration** — `G4`. The
  distance is the timing.
- **Linear by default.** The visitor's own scroll is the easing; adding a curve on
  top makes the page feel like it is resisting. Another mapping needs the approved
  concept to require it.
- **`scrub: true` versus a number.** A number adds catch-up smoothing, which is a
  *feel* decision and therefore belongs to
  [motion-taste](../../motion-taste/SKILL.md), not to this file. Implement what was
  approved.
- **Both directions.** A scrub built only forwards breaks on reverse. Test
  backwards as a first-class case.
- **Every held frame is a designed frame** —
  [MJ4](../../motion-judgment/SKILL.md#invariant). Check at 25 / 50 / 75%.

## Pin

- **Budget scroll distance against narrative change.** A pin that advances the story
  by one line over a screen of scroll is a page that has stopped.
- **`pinSpacing`** is a layout decision with consequences for everything below.
  Decide it, do not inherit it.
- **Pinning must not trap.** Predictable release, always, and never the last thing
  before a page boundary.
- **Nested and adjacent pins** are where the geometry maths goes wrong. Consecutive
  pins with nothing between them are a single pin that lost its nerve.
- **Pin on mobile is a separate decision**, not an inherited one — `G5`.

## Frame sequences

- **The budget is `DM3`'s and was declared before this file was opened.** Frame
  count, dimensions, total payload and decode cost are checked against it, not
  re-negotiated.
- Preload deliberately, decode off the main thread, and draw to a canvas rather than
  swapping `img` sources.
- **State the fallback:** what a visitor sees when the sequence has not loaded. It is
  a designed frame, not a blank.

## Refresh strategy — `G8`

**Refresh when geometry actually changed:**

- Fonts finished loading and reflowed text — resolve `document.fonts.ready`.
- Images and media resolved to their real dimensions — which is also why they carry
  explicit dimensions or `aspect-ratio` in the first place.
- Content added, removed or expanded — accordions, tabs, filtered lists, lazy
  sections.
- Orientation change, and viewport resize past a breakpoint that alters layout.

**Do not refresh:** on every resize event, on a timer, or after any state change
whose geometry is unchanged. A global refresh recalculates every trigger on the page.

**Prefer narrowing to widening:** refresh the triggers whose geometry moved.

## Dynamic content

Content arriving after triggers are created is the single most common source of
wrong start positions.

- Create triggers **after** the content they measure, or refresh the affected ones
  when it arrives.
- Infinite or paginated lists: `batch`, plus a refresh tied to insertion.
- Route changes: triggers are killed with their context — `G1` — never left to be
  garbage collected.

## Mobile

**Reconstructed, not scaled** — `G5`, [MJ8](../../motion-judgment/SKILL.md#invariant),
[DM10](../../dimensionality/SKILL.md#invariant).

- Branch in `gsap.matchMedia()`, with a real teardown for the branch not in use.
- Address-bar resize on mobile browsers fires resize during scroll. Do not tie a
  refresh to raw viewport height.
- A scrubbed sequence that costs frames on a mid-range phone is not the same
  sequence; either author a lighter one or declare the scene absent for that
  breakpoint.
- Touch never inherits hover-triggered behaviour.

## Failure and performance checks

- [ ] Content present and usable with the script blocked — `G7`
- [ ] `prefers-reduced-motion` branch authored, not disabled —
      [motion-taste I1](../../motion-taste/SKILL.md#invariant)
- [ ] Fast scroll to bottom and back: nothing missing, nothing doubled, nothing stuck
- [ ] Reverse scroll correct through every scrub
- [ ] Held frames legible at 25 / 50 / 75% — `MJ4`
- [ ] Reload mid-page: positions and state restored
- [ ] Frame rate holds through the heaviest sequence on the weakest target device
- [ ] Trigger count proportionate to distinct behaviours, not to elements
- [ ] No layout shift attributable to trigger setup — `motion-taste I4`
- [ ] Every trigger dies with its context on unmount — `G1`

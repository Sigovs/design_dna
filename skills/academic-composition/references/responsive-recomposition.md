# Responsive recomposition

*Read when: adapting to mobile, or diagnosing a design that works on desktop and
collapses on a phone. Supports [C12](../SKILL.md#invariant).*

---

## Mobile is a different format, and often a different medium

Desktop is largely **simultaneous** — several masses are seen at once and their
relationships are read in parallel. Mobile is largely **sequential** — masses
arrive one after another, so the composition is closer to a time-based sequence
than to a picture.

That difference decides everything else. Relationships that depend on
simultaneity — an asymmetric counterweight 900px to the right, a diagonal running
across two columns, a mass that reads as small *because* the thing next to it is
large — **do not exist** in a single column. They are not smaller. They are gone.

## What to re-establish at every format

Run these deliberately; each is a decision, not a consequence of the CSS:

| | Question |
|---|---|
| **Format forces** | New ratio, new edge pressure, new fold behaviour |
| **Major masses** | Are they still 3–7? Stacking often produces 12 |
| **Centre** | Which centre governs here, and how is it made now? |
| **Dominance** | What dominated by isolation may need to dominate by scale or tone |
| **Order** | Source order is the reading order; is it still the intended one? |
| **Crop** | A new frame, not the same one squeezed |
| **Edges** | What bled and what inset — the answer can differ per format |
| **Density** | Compressed or opened, decided rather than inherited |
| **Intervals** | Re-derived; desktop intervals rarely translate |
| **Negative space** | Vertical space is cheap to add and expensive to read; shape it |
| **Direction** | Horizontal vectors have nowhere to go in one column |
| **Tension** | Does the containing force still exist here? |
| **Culmination** | The sequence is longer; where does it pay off now? |
| **Fixed elements** | A sticky bar is a much larger fraction of a small viewport |
| **Reach and priority** | What must be reachable by thumb, and what must be reachable at all |

State explicitly, per format, what is: **preserved · reordered · compressed ·
expanded · re-cropped · re-emphasised · removed.** "Removed" is bounded by
[anti-patterns U7](../../anti-patterns/SKILL.md#invariant): content parity is the
floor, and recomposing is the work.

## Counterweights that stop existing

The most frequent silent failure. Desktop composition: a heavy mass left, a large
quiet field right, balanced. Mobile: they stack, the quiet field becomes a gap
below, and the "balance" is now a heavy thing followed by emptiness.

Either re-establish the counterweight by other means — tonal field, scale
relationship to the next mass, a different interval — or **abandon the asymmetry
for that format**. Keeping an asymmetry whose counterweight is gone is keeping the
appearance of a decision after its reason has left.

## Sequence effects that only exist on mobile

- **Everything becomes rhythm.** With one column, pace is the whole composition;
  intervals matter more than on desktop, not less.
- **Culmination moves later in real time** even at the same scroll fraction — the
  page is taller relative to the viewport.
- **Adjacency changes.** Elements that were side by side are now before/after,
  which implies sequence, causality or ranking that may be wrong.
- **Fixed chrome grows** as a proportion of the screen. A 64px sticky bar is 7% of
  a desktop viewport and 10% of a phone's, above a keyboard it can be far more.
- **The fold is shallower**, so what "arrives first" is a much smaller decision
  space — usually room for exactly one mass.

## Testing

1. **Thumbnail both.** Desktop and mobile at ~200px. Compare centre, dominance and
   rhythm. If they are different compositions with the same content, that is
   correct; if the mobile one has no structure, that is the finding.
2. **Real content, longest case.** Long headlines, long product names, missing
   images, ten items instead of three.
3. **The states.** Open menu, error, empty, loading — each is a different mass
   structure on a small screen.
4. **Measure the first screen.** What is actually visible at the real viewport
   height, not at a design-tool artboard height. Is a reference to the page's
   subject visible on arrival, or only apparatus?
5. **Touch and keyboard.** Targets, spacing between them, focus order matching the
   visual order.

## Failure signatures

| Observation | Cause |
|---|---|
| "It's just a long stack" | Recomposition never happened; stacking inherited |
| "It feels empty on mobile" | Desktop counterweight became a gap |
| "The important thing is below the fold" | First-screen priority never re-decided |
| "The image is unreadable" | Desktop crop reused in a different aspect ratio |
| "Everything is the same size" | Scale relationships collapsed with the columns |
| "The sticky bar covers things" | Fixed mass not counted in the mobile scheme |
| "It works until the text is long" | Composed against short placeholder copy |

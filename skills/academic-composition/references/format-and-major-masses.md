# Format and major masses

*Read when: constructing a new page, art-directing a hero, or adapting to a new
format. Supports [C15](../SKILL.md#invariant) and [C8](../SKILL.md#invariant).*

---

## Format is an active force, not a container

The same arrangement changes character in a different format. A mass that
dominates a 16:9 frame can read as an interruption in a 9:16 one; a diagonal that
carries the eye across a wide viewport exits the frame immediately in a narrow
one.

Read the format before placing anything:

- **Aspect ratio and orientation** — what direction the format itself favours.
  A wide format wants horizontal development and resists tall masses; a tall one
  is the reverse.
- **Edge pressure** — how close a mass sits to a boundary, and whether the
  boundary is holding it or squeezing it.
- **Top and bottom gravity** — the top of a viewport is arrival, the bottom is
  either continuation or ending. They are not interchangeable positions.
- **Centre and periphery** — what the format's middle does to whatever occupies
  it, and what the periphery does to whatever is exiled there.
- **Fold and continuation** — not "above the fold" as a content rule, but as a
  compositional fact: something is cut by the viewport edge, and whether that cut
  reads as *there is more* or as *this is finished* is a decision.
- **Open or closed** — do masses continue beyond the frame (open) or is everything
  contained by it (closed)? Open compositions imply a larger world; closed ones
  assert completeness. Neither is superior; mixing them accidentally is the fault.
- **Fixed viewport vs scroll sequence** — a scrolling page is not one composition
  seen through a window; it is a **time-based sequence of compositions** with a
  through-line. See [rhythm-interval-and-pause](rhythm-interval-and-pause.md).
- **Chrome and safe areas** — browser UI, notches, home indicators, sticky bars.
  A sticky header is a permanent mass in every screen of the composition, and it
  belongs in the mass scheme rather than being discovered later.

**Desktop, tablet and mobile are different formats, not sizes of one format.**
Treating them as sizes is what produces the stacked miniature that
[C12](../SKILL.md#invariant) forbids.

## Major masses before components

Reduce the work to **3–7 masses**. Fewer than three and there is nothing to
relate; more than seven and the eye cannot hold them as a structure — it starts
reading detail instead, which is exactly what a thumbnail test destroys.

For each mass, name:

| Property | The question it answers |
|---|---|
| Silhouette | What shape does it make against its surroundings? |
| Area | How much of the format does it occupy? |
| Visual weight | How much attention does it pull, and from what — value, density, detail, semantics? |
| Value | Where does it sit between the darkest and lightest fields? |
| Density | Is it packed or open inside itself? |
| Direction | Does it push, pull, sit still, or lead somewhere? |
| Edge contact | Does it touch, bleed, approach, or stay clear of the frame? |
| Relation | What is it in tension, in support, or in sequence with? |

**Describe the page with no component named.** If the description contains
"header", "hero", "card grid" or "footer", it is an inventory of containers and
not a mass structure. Written properly it sounds like this:

> *One dense dark band across the top, unbroken. Below it a large low-detail image
> field, weighted to the right, its subject moving back into the page. Against it,
> a compact high-contrast type mass in the left third — the smallest area and the
> heaviest thing on the screen. A deep quiet interval, roughly the height of the
> type mass, holds the two apart. Below the interval a repeated low-density band,
> even in value, which reads as texture rather than as objects.*

That description survives a component-library change, a redesign of every card, a
CMS migration and a colour change. The container inventory survives none of them.

## Relationships between masses

**Ratios, not sizes** ([C8](../SKILL.md#invariant)). Before deciding what
something measures, decide what it is doing to its neighbour:

- **~1:1** — peers. Reads as comparison or as competition; only correct when the
  two things genuinely rank equally, which is rarer than layouts imply.
- **~1:1.2–1:1.5** — tension. Close enough to compare, different enough to rank.
  Uncomfortable when unintended, powerful when the discomfort is the point.
- **~1:2–1:3** — clear subordination. One serves the other, and the eye resolves
  the order instantly.
- **beyond ~1:5** — the smaller reads as detail on the larger, not as an element
  in its own right. Useful for signatures, labels and marks; wrong when the small
  thing is load-bearing.

Then express the chosen relationship with existing tokens
([spacing I2](../../spacing-taste/SKILL.md#invariant)). Pick the relationship
first, the value second — never the reverse.

## Static and dynamic mass structures

- **Static** — masses aligned to the format's own axes, weight low or centred,
  few diagonals. Reads as stability, institution, permanence, calm. Fails as
  inertia when nothing varies.
- **Dynamic** — diagonals, offset weight, masses cropped by the frame, direction
  crossing direction. Reads as movement, urgency, event. Fails as noise when
  nothing is stable enough to move against.

Most compositions need both: a stable field with one dynamic event is legible;
everything dynamic is chaos; everything static is a chart.

## Common failures at this stage

- **Component-first composition.** The mass structure was never established, so
  balance and rhythm judgements are being made about containers.
- **Uniform masses.** Five sections of equal height, weight and density — a
  meter, not a composition.
- **Surface fragmentation.** Every group given its own card, so the mass structure
  is 14 small rectangles and the eye has nothing to hold.
- **Format-blind reuse.** The desktop mass scheme carried into a narrow format,
  where its horizontal relationships no longer exist.
- **The unplanned permanent mass.** A sticky bar, cookie banner or chat bubble
  that was never in the scheme and now occupies the corner the composition needed.

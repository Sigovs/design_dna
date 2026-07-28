# Rhythm, interval and pause

*Read when: composing a long scrolling page, or diagnosing one that "feels
endless" or "all the same". Supports [C7](../SKILL.md#invariant) and
[C11](../SKILL.md#invariant).*

---

## Meter is not rhythm

- **Meter** — the underlying regular beat: a repeating interval, a grid step, a
  constant section height. Necessary, invisible when working, deadly when it is
  all there is.
- **Rhythm** — what happens *against* the meter: variation, accent, syncopation,
  pause. Rhythm is what the reader feels; meter is what makes the feeling legible.

A page of identically-sized sections has meter and no rhythm. A page where every
section differs has rhythm and no meter, which the reader experiences as
arbitrariness — nothing can be a departure when there is no expectation.

## The vocabulary, translated

| Musical term | In a page |
|---|---|
| Meter | The repeating vertical interval and the underlying grid step |
| Accent | A section that departs — in scale, density, tone or direction |
| Interval | The distance between two masses, as a shape and a duration |
| Pause | A field with nothing in it, long enough to be felt |
| Acceleration | Intervals shortening, density rising |
| Deceleration | Intervals lengthening, density falling |
| Buildup | Successive increases in one property toward a point |
| Culmination | The moment the buildup pays off — the page's loudest event |
| Release | What follows the culmination, and how far the page comes down |
| Restoration | The return to meter, which makes the departure legible in hindsight |

**A long page must develop.** If a reader can be dropped at 70% of the scroll and
cannot tell whether they are near the start or the end, the page has meter only.

## Where the culmination goes

A page has one culmination. Decide where, from the task:

- **Early** — the decision is made in the first screen; everything after is
  evidence and support. Correct for transactional and utility pages; the rest of
  the page decelerates continuously.
- **Middle** — a buildup, a payoff, a long release. Correct for narrative,
  product-story and campaign pages.
- **Late** — everything defers to a final statement. Correct for editorial and
  manifesto work, and dangerous everywhere else: most readers never arrive.
- **None, deliberately** — a reference or catalogue page that is even by design.
  Legitimate, and it must still vary its intervals or it becomes a wall.

## Intervals are shapes with duration

An interval is not "padding". It is a **shape** (see
[negative-space-and-tension](negative-space-and-tension.md)) and a **duration** —
how long the reader spends crossing it.

Three intervals to distinguish, and to keep distinct in scale:

1. **Within a mass** — the internal gaps of a group.
2. **Between masses in a passage** — separating related things.
3. **Between passages** — the page's real rhythm, and the one usually too small.

The internal-smaller-than-external rule ([spacing I1](../../spacing-taste/SKILL.md#invariant))
is the floor; rhythm is the composition of the differences above that floor. If
every gap in the page is one of two values, the page has no pacing.

## Section alternation is not rhythm

`image left / image right / image left / image right` is the most common false
rhythm in web design. It is a meter with a decoration, and readers stop
registering the alternation by the third instance.

Legitimate reasons to alternate: the content itself alternates (a dialogue, a
before/after, a chronology with two threads); the direction of each image demands
its side; or the alternation is establishing a meter that will be *broken* at a
specific point. Otherwise vary something that carries meaning — density, scale,
tonal field, interval, the number of things in a row.

## Pause

A pause is a field with nothing in it, held long enough to be felt as time rather
than seen as a gap. In practice this is a large tonal or empty band before
something that must land.

Pauses are the first thing cut when a page is "too long" and the last thing that
should be. Cutting content shortens a page; cutting pauses only makes it faster
and less legible.

## Rhythm in dense interfaces

Density does not remove rhythm; it compresses its scale. In a table, a console or
a dashboard:

- the meter is the row height and the column step;
- accents are state changes — a flagged row, a threshold crossed, an empty state;
- pauses are the rule lines and the group separations that let a long list be
  read as parts rather than as a stream;
- **the culmination is usually the alert**, and if every row can shout, nothing
  is an alert.

## Failure signatures

| Observation | Cause | Smallest intervention |
|---|---|---|
| "It feels endless" | Pure meter, no accent | Change scale or density of one passage |
| "Every section looks different" | Variation with no meter | Return three sections to a shared interval |
| "It's exhausting" | Continuous accent — everything is a highlight | Demote all but one |
| "It reads fast and nothing sticks" | Acceleration with no braking | Insert a pause before the passage that matters |
| "The ending just stops" | No release designed after the culmination | Resolve: tonal change, interval, or a closing mass |
| "The middle sags" | Buildup began too early and plateaued | Move the culmination, or shorten the approach |

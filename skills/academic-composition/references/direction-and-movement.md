# Direction and movement

*Read when: art-directing an image-led page, choosing or cropping photography, or
diagnosing a page where "the eye goes to the wrong place". Supports
[C6](../SKILL.md#invariant).*

---

## Six kinds of movement, often confused

| Kind | Produced by | Controlled by |
|---|---|---|
| **Inside an image** | The subject's gaze, motion, perspective, horizon | Selection and crop |
| **Created by layout** | Alignment axes, mass placement, diagonals, scale steps | Composition |
| **Caused by scroll** | The reader's own progression through a sequence | Pacing and interval |
| **Caused by animation** | Elements that actually move | [motion](../../motion-taste/SKILL.md) |
| **Implied by sequence** | Numbered steps, chronology, progressive disclosure | Content structure |
| **Of attention** | Where the eye actually goes, which is the sum of all five | Everything above |

Only the last one matters to the visitor, and it is never designed directly. It
is the *result*. Compositions fail when four of the five inputs point one way and
the fifth — usually the image — points elsewhere.

## Directional forces are page forces

An image is not a rectangle of content. Its internal vectors act on everything
around it:

- **Gaze.** A subject looking out of frame points the viewer out of the page. Same
  crop, placed on the opposite side, points them back into it. Placement decides
  which.
- **Direction of travel.** A car, a runner, a bird moving left carries the eye
  left, regardless of where you put the headline.
- **Perspective and vanishing point.** Converging lines are the strongest
  direction available; they overpower type, alignment, and colour.
- **Horizon.** Its height sets the composition's stability — low horizon reads
  monumental, high reads observational, dead centre reads static.
- **Lean and diagonal.** A leaning building, a raked shadow, a diagonal edge in a
  crop; all of these are vectors whether or not they were intended.

**Never mirror an image to fix its direction** if that misrepresents the subject —
a flipped car with the steering wheel on the wrong side, reversed lettering, a
mirrored face. Re-crop, reposition on the page, or choose another frame.

## Layout-made direction

- **Alignment axes.** A shared left edge is a vertical line the eye travels; a
  broken axis stops it. Breaking an axis is a legitimate way to halt movement at a
  point of emphasis — as long as the break is decisive
  ([C9](../SKILL.md#invariant): commit or clear).
- **Scale steps.** Descending sizes read as a path; equal sizes read as a set.
- **Density gradients.** The eye moves from open toward dense, then rests.
- **Diagonals.** Any non-orthogonal edge is a vector. In interfaces they are rare
  enough that one diagonal dominates a whole screen — which is why one is usually
  the correct number.
- **Convergence.** Two or more directions meeting at a point construct a centre
  ([compositional-center-and-hierarchy](compositional-center-and-hierarchy.md)).

## Centripetal and centrifugal

- **Centripetal** — forces point inward, the composition holds the eye. Suits
  reading, evaluation, contemplation, decision.
- **Centrifugal** — forces point outward, the composition releases the eye. Suits
  transitions, endings, and pages whose job is to send you somewhere else.

A page that is centrifugal where it should hold — everything pointing off the
right edge above a block of text nobody reaches — is a common and invisible
failure, because each element is individually fine.

## Scroll as movement

In a scrolling page the reader supplies the movement. Composition decides the
**rate**:

- **Acceleration** — shortening intervals, rising density, repeated similar
  masses. The eye speeds up and starts skimming.
- **Deceleration** — lengthening intervals, falling density, larger quiet fields.
  The eye slows; this is how you make someone actually read.
- **Braking** — a full-width tonal change, a mass across the path, a deliberate
  emptiness. Used before something that must not be skimmed.
- **Exit** — where the composition lets go. Every page has one; if it is not
  designed, it is wherever the content ran out.

See [rhythm-interval-and-pause](rhythm-interval-and-pause.md) for the pacing
system that carries these.

## Motion, briefly — the composition's half of it

Composition decides **what must move, what must stay stable, and what culminates.**
Timing, easing, trajectory and state transitions belong to
[motion-taste](../../motion-taste/SKILL.md), and reduced-motion parity is an
invariant there, not a preference.

Two composition-level rules:

- **A moving element outranks everything static in the frame.** So motion is a
  hierarchy decision before it is a delight decision — animate the dominant, or
  animate nothing.
- **Fade-up-on-scroll applied to every section is not motion design.** It gives
  every mass the same entrance, which flattens the hierarchy the composition
  established and makes the page's rhythm identical everywhere.

## Failure signatures

| Observation | Cause |
|---|---|
| "The eye leaves the page immediately" | Subject or perspective pointing out of frame, unopposed |
| "Nobody reads the second section" | Acceleration into it; no braking, no interval |
| "The image and the headline fight" | Two strong directions, neither subordinate |
| "It feels static" | No vectors at all — every edge orthogonal, every mass centred |
| "It feels chaotic" | Multiple unresolved diagonals; nothing stable to move against |
| "The CTA is missed" | No direction converges on the centre of action |

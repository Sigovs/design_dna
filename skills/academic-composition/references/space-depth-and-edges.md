# Space, depth and edges

*Read when: art-directing an image-led page, deciding whether something needs a
card, or diagnosing "fragmented" or "flat". Supports [C9](../SKILL.md#invariant)
and [C4](../SKILL.md#invariant).*

---

## Layout is spatial, not only flat

Even a page with no shadows has planes: what is in front, what recedes, what is
atmosphere. Depth is constructed by overlap, scale, value, chroma, detail
gradient, transparency, occlusion and fixed-versus-moving layers — and only
lastly by shadow.

Three planes are usually enough:

- **Foreground** — interaction and the primary subject. Highest contrast, most
  detail, sharpest edges.
- **Middle ground** — the body of the content. The plane the reader lives in.
- **Background** — atmosphere, field, context. Lowest contrast, least detail;
  never competes for attention with what sits on it.

**Depth is a hierarchy statement.** If the background has the same contrast and
detail as the foreground, the page is flat regardless of shadows — and if a
decorative background out-contrasts the content, the hierarchy is inverted.

Constructed depth as a *technique* — 3D, parallax, scenes — is governed by
[dimensionality](../../dimensionality/SKILL.md), which gates it by role before
anything else. This file is about spatial organisation in ordinary flat layout.

## Surfaces: the fragmentation problem

A card is a surface, and a surface is a claim that its contents are a distinct
object on a distinct plane. Introduce one only when there is a real functional or
spatial relationship to express.

**Do not place every content group on its own rounded rectangle to make the
interface feel organised.** The result is a page whose mass structure is fourteen
small plates of identical value — no dominant, no field, no interval, and nothing
to squint at. This is *excessive surface fragmentation*, and it is the most common
structural failure in contemporary interface work.

Alternatives that group without fragmenting: shared alignment, a common interval,
a tonal band across the full width, a rule, or simply proximity. Grouping by
proximity and interval costs nothing and adds no plane.

Rank your surfaces. If a page has three surface levels, say which is the work and
which is apparatus — three equal plates is three unranked masses.

## Edges

Every meeting between a form and the frame is a decision. Four states, and only
the middle two are ambiguous:

| State | Reads as |
|---|---|
| **Full bleed** | The world continues beyond the frame — open composition |
| **Near-bleed** (a small margin) | Usually an error, unless the margin is large enough to read as deliberate |
| **Near-alignment** (a few px off) | Always an error — the eye detects it and attributes it to carelessness |
| **Clear inset** | Contained, deliberate, closed |

**Commit or clear** ([C9](../SKILL.md#invariant)). Bleed fully or inset visibly.
Align exactly or offset enough to read as a choice.

Active vs inactive edges: an edge is *active* when a form engages it — bleeding,
cropping, running along it. Deciding which edges are active is a compositional
choice; letting all four be equally busy is not.

## Tangency

Two forms that just touch, or just miss, create an unintended connection and a
visual snag. Common cases: a headline's descender grazing an image edge; a card
corner meeting a rule; an object in a photo touching the crop boundary; a fixed
header sitting exactly on top of a content edge.

The fix is always the same — increase the separation until it reads as a gap, or
overlap decisively until it reads as a relationship.

## Cropping

A crop is a compositional act performed on someone else's composition. It decides:

- **What the subject is** — how much context survives.
- **Where the internal centre sits** relative to the page's centre.
- **Which internal vectors survive** — a crop can remove the gaze that was
  carrying the eye, or add a diagonal that was not there.
- **How much air the subject has** — the same object reads monumental with a tight
  crop and incidental with a loose one.

**Do not reuse one crop across every format.** A 16:9 hero crop forced into a 4:5
mobile frame either loses the subject or loses the space that made it read.
Art-direct per format: a different crop, or a different frame from the same shoot.
This is the same requirement as [C12](../SKILL.md#invariant), applied to imagery.

Avoid crops that cut at a joint — a wrist, an ankle, a wheel arch, the junction of
a letterform. Cut between joints, where the eye completes the form.

## Fixed elements

Sticky headers, floating actions, cookie bars and chat bubbles are permanent
masses. They belong in the mass scheme
([format-and-major-masses](format-and-major-masses.md)) from the start.

Two consequences usually discovered too late: a sticky bar lands on whatever a
scroll or an anchor jump brings into view (give scrollable targets a
scroll-margin), and a floating action occupies a corner the composition may have
been using as release or counterweight.

## Failure signatures

| Observation | Cause |
|---|---|
| "Fragmented" | Every group on its own surface; no field, no dominant |
| "Flat" | All planes at the same contrast and detail |
| "Cluttered but there's not much on it" | Too many surface levels for the number of masses |
| "Something's off at the corner" | Tangency or near-alignment |
| "The image looks cheap on mobile" | One crop reused across formats |
| "The header eats the content" | A fixed mass excluded from the scheme, no scroll-margin |

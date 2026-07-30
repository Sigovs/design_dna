# Dialect — technical-luxury

> **Status: library.** An art direction available as an input to a Design Read —
> not a claim about Alex's own taste, and not a house dialect. The only route to
> `confirmed` is the evidence rule in
> [vault/README.md](../vault/README.md#creating-a-new-dialect).

**Core thesis.** Value is demonstrated, not asserted: present engineering evidence —
specification, tolerance, material, provenance — with enough compositional care that
the evidence itself becomes the desirable content.

**Emotional character.** Confident competence. A visitor feels they are being shown
facts by someone who expects them to understand, and that the restraint is a
consequence of having nothing to hide.

---

## DECISION LOGIC

**Specification is content, not an appendix.** A number, a tolerance, a material name
is treated as something a visitor came for — composed, ranked, given space — rather
than filed under a collapsible tab at the bottom.

**Evidence outranks adjectives.** When a claim can be made with a measurement or a
photograph of the real thing, it is made that way. Superlatives are a symptom of
missing evidence.

**Detailing is where the value shows.** Alignment to a tighter tolerance than
necessary, consistent optical margins, tabular figures, correct units, one hairline
weight throughout. The visitor rarely names these and always feels them.

**Restraint by confidence, not by fashion.** Nothing is quiet to look expensive;
things are quiet because the evidence does not need help.

**When two goods conflict, precision wins over impact.** A page that overstates by
one degree loses the credibility that is the entire product.

---

## SYSTEMS — what this dialect does to each domain

| Domain | This dialect's behaviour |
|---|---|
| **Composition / grid** | Precise, orthogonal, tight tolerances. Strong alignment axes maintained across sections; asymmetry allowed but always measurable |
| **Hierarchy / density** | Moderate-to-high density, always ordered. Specification groups are dense; the field around them is calm. Rank by position and register more than by size |
| **Typography behaviour** | Two or three voices with clear jobs — one text voice, one mono for data, occasionally one display. Mono is functional, not costume. Tabular figures everywhere numbers align ([I5](../skills/typography-taste/SKILL.md#invariant)) |
| **Spacing / rhythm** | A fine scale, used exactly. Repeated intervals inside spec groups; larger, calm intervals between them |
| **Colour / contrast logic** | Restrained, material-derived: metals, anodised tones, machine greys, one functional accent for state. Colour classifies and signals; it never decorates |
| **Image behaviour** | Product-forward and evidential: real components, consistent light and angle system, macro detail where a tolerance is the point. Comparable framing across a range |
| **Containers / borders / geometry** | Hairlines and machined edges; radii small, single-valued or absent. A container marks a *system boundary*, not a decorative frame |
| **Depth / materiality** | Material honesty over elevation. Surfaces read as the actual material; depth from overlap and light, at most one plane of interface elevation |
| **Motion / interaction** | Precise and short. Motion confirms a state or reveals a measurement; nothing performs. Interaction feels mechanical and repeatable |
| **Information presentation** | **The dialect's centre of gravity.** Spec plates, comparison tables, exploded detail, provenance records — designed as objects, with units, tolerances and sources intact |

---

## SIGNATURE DEVICES

- **The spec plate** — a compact, aligned block of measurements set as a designed
  object. Its job is to make specification desirable.
- **The comparison row** — the same framing, angle and metrics across a range. Its
  job is to make difference legible without prose.
- **The tolerance detail** — one macro image or measured callout on a junction. Its
  job is to prove the claim the page is making.

As a SIGNATURE influence in another dialect's hybrid, borrow exactly one — most often
the spec plate.

## WHAT IT AVOIDS

Black-and-gold luxury signalling; serif-plus-thin-tracking "premium" typography;
superlatives without figures; decorative micro-lines and crosshairs that measure
nothing; fake instrument clusters and dashboard motifs; and any technical-looking
graphic whose data is invented.

## FALSE VERSIONS — the clichés that wear its clothes

**Technical decoration without evidence** is the failure: crosshair marks in the
corners, dotted alignment lines that align nothing, `[ 01 / 04 ]` counters,
plus-signs at grid intersections, a mono font on marketing copy, and a "TECH SPEC"
heading over three vague bullets. It borrows the *appearance* of measurement while
containing no measurements.

Tells: no units; no tolerances; no source for any number; mono used for prose rather
than data; a diagram that would not survive an engineer reading it; and a spec table
whose rows are marketing phrases.

Second false version: **generic dark luxury** — near-black, thin uppercase, gold
accent, one hero render — which is `cinematic-industrial`'s cliché wearing this
dialect's name and has no evidence in it either.

---

## FIT

**Good fit:** engineered products and components; performance and instrument brands;
watchmaking, audio, optics, vehicles, tooling; anything sold to buyers who compare
specifications; briefs with real data and real photography of real parts.

**Poor fit:** services without artefacts; emotional or lifestyle propositions;
briefs where the specification is uninteresting or unavailable — the dialect will
manufacture technical-looking decoration to fill the gap, which is exactly its
cliché. Prefer `refined-elegance` or `organic-tactile`.

## PURE MODE

The whole art direction: precise grid, material palette, mono for data, spec plates
as content, macro evidence, short mechanical motion.

**It does not license:** mono at small sizes below the functional floor
([I7](../skills/typography-taste/SKILL.md#invariant)), dense tables that fail AA in
their secondary rows, invented figures, or units dropped for visual tidiness. A
number without a unit is not precise; it is decoration.

## HYBRID RELATIONSHIPS

**Useful**
- **+ `cinematic-industrial`** — *the object earns the drama it is given.* Technical
  owns specification, detailing, information; cinematic owns light, depth, image.
  The pairing this dialect is strongest in.
- **+ `expressive-poster`** — one scale collision where the product meets its own
  name, inside an otherwise measured system. Keeps precision from reading as
  timidity.
- **+ `organic-tactile`** — *made by hand to a measured standard.* Technical owns
  structure and spec; organic owns texture, image warmth and rhythmic variation.
  Strong for craft manufacture.

**Dangerous**
- **+ `refined-elegance`** — adjacent theses; without a clearly declared Anchor the
  two merge into one quiet register and the contrast disappears.
- **+ `retro-futurist`** — period instrumentation is the fastest route to the fake
  dashboard, which is this dialect's own cliché. Only as a tightly bounded signature.

## ACCESSIBILITY AND USABILITY

Density and mono are the risks: mono runs optically smaller at the same px, so the
14px floor is a floor for it too; spec tables need real `th` scope and readable
secondary rows; numeric colour-coding must not be the only carrier of meaning
([color I2](../skills/color-taste/SKILL.md#invariant)); and comparison tables must
reflow to stacked records rather than scroll away
([U7](../skills/anti-patterns/SKILL.md#invariant)).

## DIAGNOSTICS

1. Pick any number on the page. Does it have a unit and a source?
2. Is the specification composed as content, or filed at the bottom?
3. Is mono carrying data, or is it carrying prose?
4. Does any technical-looking mark measure something real?
5. Could two products in the range be compared without reading prose?
6. Remove the accent colour. Is the information still classified?

## THE LOGIC, COMPACTLY

*Brief: a manufacturer of aluminium bicycle cranksets, six models, real CNC and
fatigue-test data, buyers who are mechanics and racers.*

The buyer compares stiffness, weight and Q-factor, so those become the page's
content rather than its footnotes: one spec plate per model, same six metrics, same
order, tabular figures, units present, each with its test method named — because a
racer who spots a missing method stops believing the other five numbers. Photography
is a comparison system: identical angle and light across all six, plus one macro on
the crank-arm junction where the fatigue claim lives. The palette comes from the
material — raw, anodised black, one functional accent marking the model in view.
Hairlines mark system boundaries; nothing has a radius that the machining does not
have. One short motion: the exploded view resolving on demand. What the dialect
decided was not "look premium" — it was that *the test data is the product's
argument*, and everything else is arranged to let a mechanic read it quickly.

# Dialect — organic-tactile

> **Status: library.** An art direction available as an input to a Design Read —
> not a claim about Alex's own taste, and not a house dialect. The only route to
> `confirmed` is the evidence rule in
> [vault/README.md](../vault/README.md#creating-a-new-dialect).

**Core thesis.** Let the hand show: build rhythm from natural variation rather than
from repetition, and let real material — paper, clay, cloth, wood, skin, plant — carry
the warmth that a system cannot manufacture.

**Emotional character.** Warm, unhurried, human-scaled. A visitor feels a person made
this and that nothing is trying to look inevitable.

---

## DECISION LOGIC

**Variation is the rhythm.** Where another dialect repeats an interval exactly, this
one repeats it approximately, and the small differences are the pace. The variation is
authored — a range, not an accident.

**Material honesty.** Texture comes from photographed or genuine material, at a scale
where the material is legible. A tiling paper texture at 6% opacity is not tactile; it
is a filter.

**Imperfection needs a job.** An off-axis placement, a hand mark, a rough edge must be
doing something — marking a maker, separating a passage, showing process. Decorative
imperfection is the cliché.

**Soft transitions, not soft thinking.** Edges, tones and motion can be gentle while
hierarchy stays unambiguous. This dialect fails most often by letting warmth blur rank.

**When two goods conflict, warmth wins over polish — never over legibility.** The
dialect's whole value is that it is comfortable to be with; illegibility is not
comfortable.

---

## SYSTEMS — what this dialect does to each domain

| Domain | This dialect's behaviour |
|---|---|
| **Composition / grid** | A loose underlying structure with authored deviation: elements sit near an axis rather than on it, within a stated range. Asymmetry is comfortable, not tense |
| **Hierarchy / density** | Clear but gentle steps; moderate density with generous internal air. Rank from scale and position, rarely from heavy weight |
| **Typography behaviour** | Humanist forms — a text face with real calligraphic origin; optional hand or letterpress-derived display used sparingly. Generous leading; ragged right; sentence case |
| **Spacing / rhythm** | A scale used with tolerance: intervals vary within a range so the page breathes irregularly. Rhythm from that irregularity |
| **Colour / contrast logic** | Pigment-derived, from real material — earth, clay, indigo, unbleached, plant greens. Moderate contrast, warm neutrals; colour carries feeling and still has to pass AA |
| **Image behaviour** | Process and hands, not products on white. Natural light, soft fall-off, real settings, visible making. Consistent light temperature across the library |
| **Containers / borders / geometry** | Soft, irregular or absent. Radii uneven or organic where used; edges may be torn, printed or drawn — but consistently so |
| **Depth / materiality** | Shallow, physical: paper layered on paper, real shadow at short distance, occlusion rather than elevation |
| **Motion / interaction** | Slow, eased, slightly irregular timing. Motion behaves like fabric or paper, never like a machine. Few and gentle |
| **Information presentation** | Prose-forward, conversational registers, handwritten or drawn annotation where honest. Data is set plainly and never pretends to be technical |

---

## SIGNATURE DEVICES

- **The authored deviation** — a repeated element placed within a range rather than on
  an axis. Its job is to make rhythm feel breathed rather than clocked.
- **The material edge** — a torn, printed or drawn boundary between passages, from real
  material. Its job is to divide without a rule.
- **The hand annotation** — one genuine mark, note or drawing. Its job is to show a
  person, once.

As a SIGNATURE influence in another dialect's hybrid, borrow exactly one — most often
the material edge or the image warmth.

## WHAT IT AVOIDS

Tiled texture overlays; drop shadows standing in for material; symmetrical
"handmade" ornament; wobbly borders applied uniformly (which is repetition wearing
irregularity's clothes); pastel gradients; and softness used to avoid ranking.

## FALSE VERSIONS — the clichés that wear its clothes

**Generic wellness branding** is the failure: beige and sage, one rounded geometric
sans at three sizes, a 6% paper texture over everything, blob shapes, a stock
photograph of hands holding a ceramic cup, and lowercase everything. It is a template
with warm colours, and no material anywhere is real.

Tells: the texture repeats visibly; the "irregular" shapes are identical; the palette
came from a palette, not from a material; the photography is stock and inconsistent in
light; and nothing on the page shows a process.

Second false version: **decorative imperfection** — hand marks, wobbles and offsets
applied evenly as a style, which is precisely the repetition this dialect exists to
avoid. If every element is imperfect in the same way, the page is machine-made and
lying about it.

---

## FIT

**Good fit:** makers and craft manufacture; food, ceramics, textiles, agriculture;
care, education and community work; cultural projects with a human subject; briefs
with genuine process photography.

**Poor fit:** engineering and performance claims; dense functional tools; anything
where precision is the product — softness will read as imprecision; briefs with no
real material or process imagery, where the dialect can only produce its own cliché.
Prefer `technical-luxury`, `swiss-editorial` or `brutalist-utility`.

## PURE MODE

The whole art direction: loose structure with authored deviation, humanist type, real
material texture and colour, process imagery, shallow physical depth, slow irregular
motion.

**It does not license:** warm low-contrast text below AA
([color I1](../skills/color-taste/SKILL.md#invariant)), gentle hierarchy that stops
being a hierarchy ([U1](../skills/anti-patterns/SKILL.md#invariant)), or irregularity
that breaks reading order or alignment expectations
([U8](../skills/anti-patterns/SKILL.md#invariant)). Comfortable is the goal; vague is
the failure.

## HYBRID RELATIONSHIPS

**Useful**
- **+ `technical-luxury`** — *made by hand to a measured standard.* Technical owns
  structure, specification and detailing; organic owns texture, image warmth and
  rhythmic variation. The strongest pairing for craft manufacture, and it resolves
  both dialects' weaknesses at once.
- **+ `swiss-editorial`** — *an ordered archive of things made by hand.* Swiss owns
  grid, hierarchy and density; organic owns image treatment and variation inside it.
- **+ `expressive-poster`** (as signature into organic) — one loud statement in a warm
  page, when a campaign needs a voice.

**Dangerous**
- **+ `refined-elegance`** — both quiet, both owning texture and rhythm: no tension,
  no identifiable anchor, and the result reads as an unfinished version of either.
- **+ `cinematic-industrial`** — hard directional light against soft natural light:
  the image treatment splits and the page looks like two photographers.

## ACCESSIBILITY AND USABILITY

Warm palettes are the recurring risk: earth tones sit close in luminance, so AA has to
be measured rather than assumed, and tonal structure must survive grayscale
([C3](../skills/academic-composition/SKILL.md#invariant)). Irregular placement must
not break DOM order or focus order. Hand-drawn or textured type is decoration and
carries no information ([I7](../skills/typography-taste/SKILL.md#invariant)); real text
sits above it. Motion with irregular timing still needs a reduced-motion path.

## DIAGNOSTICS

1. Is any texture on the page from real material, at a legible scale?
2. Is the variation authored — can you state its range — or is it noise?
3. Does the palette come from a material you can name?
4. Desaturate. Does the hierarchy survive?
5. Does the photography show a process, or a product on a nice background?
6. Is any imperfection doing a job other than signalling handmade-ness?

## THE LOGIC, COMPACTLY

*Brief: a small pottery studio, 40 pieces a season, teaches weekend classes, real
process photography, buyers who care that a person made the object.*

The buyer's question is *who made this and how*, so the making is the content: hands
at the wheel, the drying shelf, the kiln — natural light, one temperature, consistent
across the library. The pieces are photographed on the studio's own bench rather than
on white, because the bench is evidence. Rhythm comes from authored deviation: each
piece sits near a shared axis within about a 40px range, so the column breathes and
still scans. The palette is lifted from three real glazes, which makes it specific
rather than tasteful — and each pairing is measured for AA, because clay tones sit
close together. One torn-paper edge divides the shop from the classes; one handwritten
note appears once, from the potter. Class times are set plainly, at the floor, because
that is a task and warmth is not an excuse. What the dialect decided was not "make it
warm" — it was that *the maker's presence is the product*, and everything above is a
way of keeping her in the room.

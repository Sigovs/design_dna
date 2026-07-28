# Optical balance

*Read when: diagnosing a layout that is "correctly aligned but feels off", or
deciding placement in an asymmetric composition. Supports
[C5](../SKILL.md#invariant).*

---

## Mathematical balance is a measurement; optical balance is a perception

Two elements can be perfectly centred and perceptually lopsided. Alignment tools
report coordinates; the eye reports weight. When the two disagree, **the eye is
right** — it is the instrument the work will be judged with.

## What actually carries visual weight

Ordered roughly by force in interface work:

1. **Value contrast against the field** — the strongest lever, and the one that
   still works in grayscale, at thumbnail, and on bad screens.
2. **Semantic importance** — a price, a face, a name the visitor is hunting.
   Meaning pulls attention before treatment does.
3. **Isolation** — space around a thing multiplies its weight. This is why
   removing neighbours is often the fastest way to strengthen an element.
4. **Detail density** — a complex region outweighs a plain one of equal area.
5. **Human faces and gaze** — disproportionate weight, and they also aim
   attention ([direction-and-movement](direction-and-movement.md)).
6. **Chroma** — saturated against neutral, at any size.
7. **Irregular contour** — a ragged or organic silhouette outweighs a rectangle
   of the same area.
8. **Area** — real, but weaker than every one of the above. Large and quiet loses
   to small and loud, every time.
9. **Edge proximity** — a mass near the frame gains apparent weight and pulls
   outward; the same mass inboard sits still.
10. **Motion** — any movement outweighs everything static in the same frame.
11. **Recurrence** — a shape repeated three times weighs more than the sum of
    three unrelated shapes.

**Typographic density is a tonal mass.** A paragraph is a grey rectangle whose
value is set by size, weight, leading and measure. Compositions get judged with
the text as lorem and then break when real copy arrives at a different density —
check with the real text ([typography-and-imagery](typography-and-imagery.md)).

## Kinds of balance

- **Symmetrical** — mirrored weight. Reads as institution, formality, stillness,
  ceremony. Legitimate and currently under-used; it fails when it is chosen to
  avoid deciding, and it can still be optically wrong if the mirrored halves have
  different value or detail.
- **Asymmetrical** — unequal masses held by an opposing force. Reads as movement
  and modernity. **Requires a named counterweight**; without one it is drift.
- **Radial** — forces arranged around a centre. Rare in interfaces outside data
  and identity work; strong when the centre is the subject.
- **Stable imbalance** — weight deliberately off, and *contained* by the frame or
  by a directional force pointing back in. Reads as tension with intent.
- **Accidental drift** — weight off with nothing containing it. Reads as an error.
  This is the most common failure in generated layouts, and the one people
  describe as "it looks unfinished".

**Local vs global balance.** Each screen of a scrolling page can balance
internally while the page as a whole leans — all the weight in the first third,
nothing after. Judge both: the frame you can see, and the sequence you scroll.

## Empty space as counterweight

**Do not automatically add an element to an empty area.** Emptiness has weight:
a large quiet field opposite a dense mass is a counterweight, and it is usually
the better one, because it counterbalances without adding another thing to rank.

The instinct "this space looks unused" is the instinct that produces decorative
filler, redundant illustration, and a third call to action nobody asked for.
Ask instead: *is this space doing work?* If it isolates, separates, holds pressure
or gives release — it is working.

Equally: **do not automatically centre something to fix imbalance.** Centring
resolves the tension by deleting it, which is right only if the tension was
accidental.

## The procedure, when balance is wrong

1. **Thumbnail it.** Reduce to ~200px wide. Where does the weight sit? A
   composition's balance problem is visible at thumbnail and invisible at 100%,
   because at 100% you are reading, not seeing.
2. **Squint.** Detail drops out and only mass and value remain. If the centre
   moves when you squint, the optical centre is not where you thought.
3. **Mark the centres of gravity.** For each major mass, one point. Are they
   distributed, or all on one side with nothing opposing?
4. **Name the containing force.** For every off-centre weight, what holds it —
   a mass, a directional force pointing back, a field of space, an edge? If
   nothing, that is the diagnosis.
5. **Fix by subtraction first.** Lower, quieten, or remove a competing weight
   before adding a balancing one. Adding is how a composition becomes crowded
   while nobody makes a decision.

## Failure signatures

| Signature | What it actually is |
|---|---|
| "Aligned but feels off" | Value or detail weight differs across a symmetric layout |
| "The page leans" | All heavy masses in one half of the scroll, nothing after |
| "The hero is fine, the page is empty" | Local balance without global balance |
| "Too much whitespace" | Space with no shape and no function — not too much, unshaped |
| "It looks generated" | Mathematically placed, optically unjudged — arithmetic where looking was required |
| "Balanced but dead" | Symmetry plus uniform value: nothing to resolve, so the eye leaves |

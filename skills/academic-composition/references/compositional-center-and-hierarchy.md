# Compositional centre and hierarchy

*Read when: constructing a page, adapting to mobile, or diagnosing a layout where
"nothing stands out" or "everything competes". Supports
[C16](../SKILL.md#invariant), [C1](../SKILL.md#invariant),
[C2](../SKILL.md#invariant) and [C13](../SKILL.md#invariant).*

---

## Four centres, and they are not the same point

| Centre | What it is | How it is found |
|---|---|---|
| **Semantic** | What the page is *about* | Ask what the visitor came for |
| **Optical** | Where visual weight actually gathers | Squint; the first thing that resolves |
| **Geometric** | The middle of the format | Measure |
| **Of action** | Where the visitor does the thing | Follow the task, not the design |

They coincide only by decision. A product page whose semantic centre is the
product, whose optical centre is a full-bleed lifestyle image, and whose centre of
action is a button in the lower right has **three** centres, and the visitor
resolves them in whatever order the design accidentally suggests.

**State which centre governs, and what the others do about it.** Common workable
arrangements:

- Semantic = optical, action subordinate but adjacent — the classic product page.
- Action = optical, semantic carried by context — a transaction step, a search.
- Semantic = optical, action deliberately delayed — an editorial or provenance
  page where deciding precedes acting.
- Optical held by a quiet field, semantic centre small and isolated inside it —
  the "one object, much air" arrangement; powerful, and fragile on mobile.

## How a centre is made

Not by being biggest. By any of these, usually two or three together:

- **Isolation** — space around a thing outranks size. A small mass alone in a
  field beats a large mass in a crowd.
- **Contrast** — tonal contrast first ([C3](../SKILL.md#invariant)), then chroma,
  then detail against plainness.
- **Convergence** — several directions pointing at the same place: gaze,
  perspective, alignment axes, the diagonal of a road.
- **Interruption of rhythm** — a break in an established pattern becomes the
  centre precisely because the pattern trained the eye to expect continuation.
- **Density** — a concentration of detail in an otherwise open field.
- **Semantic importance** — a price, a number, a name the visitor is looking for
  pulls attention regardless of treatment. This one operates whether or not you
  designed it.
- **Position within the format** — near the optical centre (slightly above
  geometric middle) reads as arrival; a corner reads as departure.

## Secondary centres: strengthen, compete, fragment

Every additional focus does exactly one of three things. Name it:

- **Strengthens** — it leads to the primary centre, frames it, or resolves after
  it. A supporting image whose subject faces the headline strengthens.
- **Competes** — it holds equal force at a different place, so the eye alternates
  and neither wins. Two full-bleed elements at the same scale compete;
  so do a bold statistic and a bold illustration side by side.
- **Fragments** — many small foci of similar weight, so no centre forms at all.
  A row of six equally-weighted cards fragments; so does a page where every
  section has its own oversized headline.

The test is not "is there a focal point" but "**if I remove this, does the primary
centre get stronger?**" If yes, it was competing.

## Dominance, subordination, support — and the two roles usually missing

Beyond dominant / subordinate / support, name two more:

- **Bridge** — what carries the eye from one major passage to the next. Without
  bridges, sections are autonomous and the page reads as a stack
  ([C11](../SKILL.md#invariant)).
- **Counterweight** — what holds the composition against the dominant's pull.
  Often empty space, which is why "add something on the left to balance it" is
  usually the wrong instinct.

**Hierarchy is relational, not additive.** The generated-layout failure is to
strengthen everything important: bigger, bolder, brighter, boxed. Six emphasised
things are six unemphasised things. To raise one element, **lower its
neighbours** — that costs nothing and works immediately.

Equal visual force is a defect when it lands on: sections, cards, headlines,
buttons, images, statistics, borders, background surfaces, or motion events. All
of those default to equality unless someone decides otherwise.

## In dense functional interfaces

Density does not exempt a page from having a centre — it changes what the centre
is made of. In a dashboard, an inbox, a console:

- the centre is usually **a state**, not an object: what is wrong, what is
  waiting, what changed since last time;
- it is made by **isolation and value**, because scale is unavailable when
  everything must fit;
- the centre of action is often the same as the semantic centre, and that
  coincidence is the design;
- **rank the surfaces**: a table, a filter bar and a summary strip must not read
  as three equal plates. One is the work; the others are apparatus.

A dense interface where nothing dominates is not neutral, it is unreadable — the
operator's eye starts wherever it happens to land, every session.

## Diagnosing centre problems

| Observation | Likely cause | Smallest intervention |
|---|---|---|
| "Nothing stands out" | Equal weight across masses | Lower everything except one; change nothing else |
| "It feels busy" | Fragmented centres | Merge or subordinate small foci; remove surfaces, not content |
| "The eye keeps jumping" | Two competing centres | Demote one — scale, value, or isolation |
| "It looks fine but reads slowly" | Semantic ≠ optical centre | Move weight onto the semantic centre, or accept and state the delay |
| "The CTA gets missed" | Centre of action is peripheral and unsupported | Direct movement toward it, or relocate it into the primary passage |
| "It drifts" | No centre decided; the loudest element took it | Decide the centre, then build it with isolation + contrast |

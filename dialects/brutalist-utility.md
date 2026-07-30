# Dialect — brutalist-utility

> **Status: library.** An art direction available as an input to a Design Read —
> not a claim about Alex's own taste, and not a house dialect. The only route to
> `confirmed` is the evidence rule in
> [vault/README.md](../vault/README.md#creating-a-new-dialect).

**Core thesis.** The structure of the thing is the design of the thing: show the
frame, the grid, the controls and the data as they are, and let composition come
from arranging real parts rather than from covering them.

**Emotional character.** Direct, unembarrassed, a little confrontational. A visitor
feels they are being told the truth quickly and not being sold to. Confidence
without charm.

---

## DECISION LOGIC

**Expose before you refine.** When a choice is between revealing how something
works and smoothing it, reveal. A visible column edge, a real field, a raw number,
an actual state — these are the material. Ornament that hides structure is a loss.

**Rank hard.** Emphasis is not distributed; it is spent. One thing is first by a
wide margin, and the gap is visible without reading. Where another dialect would
step 1.2×, this one steps 3×.

**Function is a compositional argument.** A search field, a phone number, a status,
a filter row are not "UI to be styled" — they are masses with weight, and they get
placed for their weight, not tucked into a corner because controls are ugly.

**Irregularity is governed, or it is a bug.** Breaks recur with their own logic:
if an element sits off the grid, others do too, in the same way, for the same
reason. A single unexplained offset reads as an error — that is
[U8](../skills/anti-patterns/SKILL.md#invariant), and it binds.

**When two goods conflict, legibility of structure wins over comfort.** But never
over legibility of *content*: a page nobody can read is not brutalist, it is
unfinished.

---

## SYSTEMS — what this dialect does to each domain

| Domain | This dialect's behaviour |
|---|---|
| **Composition / grid** | The grid is visible and load-bearing. Full-width bands, hard column edges, deliberate collisions at boundaries. Asymmetry from function, not from taste |
| **Hierarchy / density** | Extreme steps. Dense where information lives, empty where it does not — and the emptiness is flat, not atmospheric |
| **Typography behaviour** | One or two voices, heavy weights, tight leading at scale. Left-aligned by default; centring must be argued. Uppercase used structurally, tracked per [typography I4](../skills/typography-taste/SKILL.md#invariant) |
| **Spacing / rhythm** | Few values, large jumps, repeated exactly. Rhythm from repetition of the same interval, not from graded variation |
| **Colour / contrast logic** | Flat fields, no gradients as ground. High tonal contrast carries hierarchy; at most one accent, used for state and action rather than decoration |
| **Image behaviour** | Full-bleed or hard-cropped, never floated. Images are blocks with edges, cropped by the frame rather than fitted into it. Documentary over styled |
| **Containers / borders / geometry** | Right angles. Rules and 1px lines instead of boxes; where a container exists, it is a plain rectangle with a real edge. No radii by default, no shadows |
| **Depth / materiality** | Flat. Layering by adjacency and overlap, not elevation. Depth cues, if any, are honest per [U9](../skills/anti-patterns/SKILL.md#invariant) |
| **Motion / interaction** | Instant state change over transition. Hover and focus are unmistakable and cheap. No entrances, no parallax |
| **Information presentation** | Tables, lists, plain labels, real numbers. Specification is set as specification, not as marketing copy |

---

## SIGNATURE DEVICES

- **The exposed rule** — a hairline or heavy line doing structural work: separating
  bands, marking a column, carrying a label. Its job is to make the grid visible.
- **The plain data block** — a table or definition list presented at content scale
  rather than shrunk into a footnote. Its job is to rank information as content.
- **The oversized functional control** — search, call, filter given mass
  proportional to how often it is used. Its job is to make the task the subject.

As a SIGNATURE influence inside another dialect's hybrid, borrow exactly one — most
often the exposed rule.

## WHAT IT AVOIDS

Decorative containers; soft shadows; gradient grounds; radii applied for warmth;
illustrations standing in for information; centred text as a default; graded
type scales that make three ranks look like one; motion that delays a state
change; and any device whose only job is to signal effort.

## FALSE VERSIONS — the clichés that wear its clothes

**Fake brutalism is the most common failure in this dialect**, and it is easy to
spot: ugly typefaces chosen for ugliness, 4px black borders on everything, default
blue links used ironically, deliberate inconvenience, Times New Roman as a
statement, and clashing colour as a personality. None of that is exposed structure;
it is costume with no frame underneath.

The tell: remove the "brutalist" surface and ask whether a rigorous structure
remains. In the real dialect, the structure was the point and the surface merely
stopped hiding it. In the false one, there was never a structure — the roughness
*was* the design.

Second false version: **hostility mistaken for honesty.** Small hit targets,
unreadable contrast and hidden navigation are not positions. They are the failures
[U1](../skills/anti-patterns/SKILL.md#invariant),
[U2](../skills/anti-patterns/SKILL.md#invariant) and
[I7](../skills/typography-taste/SKILL.md#invariant) already name.

---

## FIT

**Good fit:** tools and instruments; trades and services where competence is the
sell; data-dense products; archives and directories; anything where the visitor
arrived with a task and no patience; brands whose credibility comes from doing the
work rather than from presentation.

**Poor fit:** products sold on desire or sensation; audiences that read visual
softness as trustworthiness (healthcare, children, bereavement services); briefs
whose only asset is beautiful photography — the photograph will fight the frame.
Prefer `refined-elegance`, `organic-tactile` or `cinematic-industrial` there.

## PURE MODE

The whole art direction: page-wide visible grid, flat ground, hard ranks, real
controls, no radii, no elevation, instant states.

**It does not license:** small type, low contrast, tiny targets, invisible focus,
missing alt text, or a page whose reading order differs from its DOM order. PURE
removes other dialects, never the invariants. A brutalist page is *harder-edged*
than a conventional one and no less usable — the difficulty is in the confrontation,
never in the operation.

## HYBRID RELATIONSHIPS

**Useful**
- **+ `refined-elegance`** — exposed structure, precisely made. Brutalist owns
  composition, geometry, information; refined owns spacing and typographic detail
  throughout. The pairing's whole value is that the structure stays visible while
  the craft stops it reading as cheap.
- **+ `cinematic-industrial`** (signature) — the frame stays flat and hard; the
  photography gets depth and light. Best when the subject is physical.
- **+ `swiss-editorial`** — related but not identical: Swiss brings a rational
  grid, brutalist brings the willingness to show it. Only pair when Swiss is the
  Anchor; otherwise they compete for the same domain.

**Dangerous**
- **+ `expressive-poster`** — both want the loudest voice and both own scale. One
  will silently become decoration behind the other.
- **+ `organic-tactile`** — opposite theses on material honesty: irregular-by-hand
  against exposed-by-structure. Possible only with a very narrow signature role
  (one texture, one place), and it usually reads as indecision.

## ACCESSIBILITY AND USABILITY

This dialect's tendencies pull toward high contrast and large functional elements,
which mostly *helps*. The real risks are three: uppercase used at length (bounded
by [typography I4](../skills/typography-taste/SKILL.md#invariant)); the flat ground
making focus rings easy to lose (they must be explicit, per
[U2](../skills/anti-patterns/SKILL.md#invariant)); and "raw" being used to justify
skipping states — empty, error, loading and long-content are compositions here too.

## DIAGNOSTICS

1. Remove every heavy border and hard rule. Is a rigorous structure still visible?
2. Can you name the grid — column count, band logic — from the artefact alone?
3. Is the most-used control one of the three heaviest masses on the page?
4. Does every irregularity recur with a rule you can state?
5. Is any roughness doing a job other than signalling roughness?
6. Would a visitor with a task finish it faster here than on a conventional page?
   If not, the dialect has become a costume.

## THE LOGIC, COMPACTLY

*Brief: a two-person structural engineering firm, 40 projects, technical drawings
and site photography, clients who are contractors.*

The engineer's credibility is in the drawings, so the drawings are the material,
not the illustrations of it: full-bleed, hard-cropped, at content scale. The project
list becomes a real table — span, load, year, contractor — set at reading size,
because a contractor scans that table and ignores prose. One heavy rule under the
firm's name marks the column the whole page hangs from, and the same rule recurs at
every band boundary so the grid stays visible. Two type voices, three ranks, steps
wide enough to read at a glance. The phone number is the third-heaviest mass on the
page, because half the visitors came to call. Nothing is centred, nothing has a
radius, nothing fades in. What the dialect decided here was not a look — it was that
*the evidence outranks the presentation*, and everything else followed.

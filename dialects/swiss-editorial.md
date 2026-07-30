# Dialect — swiss-editorial

> **Status: library.** An art direction available as an input to a Design Read —
> not a claim about Alex's own taste, and not a house dialect. The only route to
> `confirmed` is the evidence rule in
> [vault/README.md](../vault/README.md#creating-a-new-dialect).

**Core thesis.** A declared system carries the meaning: build a grid and a
typographic scale with real authority, then let content occupy them so that
position and interval do the explaining.

**Emotional character.** Lucid, impersonal in the best sense, quietly authoritative.
A visitor feels oriented — they know where they are and what kind of thing they are
reading before they read it.

---

## DECISION LOGIC

**The system is decided first and then obeyed.** Column count, baseline step, scale
ratio, alignment axes — these are settled before any section exists, and a section
that needs an exception has to argue for it.

**Position is an argument.** Where something sits in the grid states its rank; that
is cheaper and more durable than making it bigger. When emphasis is needed, first
try moving it.

**Asymmetry is purposeful, not decorative.** An off-axis placement means something —
a different category, a departure, a hierarchy step. Asymmetry applied for interest
is noise inside a system whose whole value is that placement is meaningful.

**Density is a service.** This dialect can carry volume: many items, long text,
tables, indexes. It organises rather than reduces, which is what separates it from
`refined-elegance`.

**When two goods conflict, the system wins over the individual section.** A section
that would look better breaking the grid usually makes three other sections worse.

---

## SYSTEMS — what this dialect does to each domain

| Domain | This dialect's behaviour |
|---|---|
| **Composition / grid** | A real modular grid, stated and visible in the alignments. Content spans declared column groups; the grid is the composition, not a scaffold under it |
| **Hierarchy / density** | Rank from position, scale step and space, in that order. Comfortable with high density; never uniform, always ordered |
| **Typography behaviour** | One or two voices, usually one grotesque doing several roles by size and weight. Flush-left, ragged right; a declared scale with audible steps; tables and figures set properly |
| **Spacing / rhythm** | A baseline or modular step everything lands on. Rhythm from repeated intervals across the whole page, with departures at structural boundaries |
| **Colour / contrast logic** | Achromatic ground with one or two functional colours. Colour classifies — sections, categories, states — rather than decorating |
| **Image behaviour** | Images sized to column groups, cropped to the grid, consistent treatment. A caption is part of the composition and set as such |
| **Containers / borders / geometry** | Rules and alignment, not boxes. Where a container exists it aligns to the grid exactly. Geometry is orthogonal |
| **Depth / materiality** | Flat, print-derived. Layering by tonal field rather than elevation |
| **Motion / interaction** | Minimal and functional. Transitions clarify a change of state or position; nothing enters decoratively |
| **Information presentation** | Its strongest domain: indexes, tables, numbered structures, definition lists, captioned figures — set as designed objects, not dumps |

---

## SIGNATURE DEVICES

- **The declared index** — a numbered or lettered structure running down the page,
  with the numbers as typographic objects. Its job is to make sequence legible.
- **The column-locked caption** — metadata occupying a fixed column beside its
  content throughout. Its job is to give support text a permanent place.
- **The tonal band** — a full-width ground change marking a structural boundary. Its
  job is to divide without a rule or a box.

As a SIGNATURE influence in another dialect's hybrid, borrow exactly one — most
often the declared index.

## WHAT IT AVOIDS

Decorative asymmetry; centred layouts; boxes where alignment suffices; more than one
expressive voice; images fitted to arbitrary sizes; gradients and elevation;
colour used for atmosphere; and any section that needs its own grid.

## FALSE VERSIONS — the clichés that wear its clothes

**The generic clean corporate template** is the failure: a 12-column grid nobody
looks at, one grotesque at three barely-different sizes, grey-on-white, evenly
spaced cards, a hero with a centred headline, and an icon row. It has the *residue*
of the dialect — sans-serif, tidy, rectangular — and none of its authority.

Tells: the grid produces no visible relationships (everything spans 12 or 4, never
7 or 5); nothing is ranked by position; the type scale steps by 1.1 so three ranks
read as one; and no information object anywhere — no index, no table, no caption
system — despite the dialect's whole strength being information.

Second false version: **Swiss as an excuse for coldness.** The dialect is
impersonal about presentation, not about content: the writing, the photography and
the specificity are what stop lucidity becoming blankness.

---

## FIT

**Good fit:** editorial and cultural work; documentation and reference; catalogues
and indexes; institutions; multi-language content; any brief with real volume that
must stay navigable; audiences who read.

**Poor fit:** briefs whose value is sensation or atmosphere; single-message
campaigns with almost no content — the system will have nothing to organise and read
as an empty framework. Prefer `expressive-poster` or `cinematic-industrial` there.

## PURE MODE

The whole art direction: one declared grid, one or two voices, achromatic ground
with functional colour, flat depth, information objects, minimal motion.

**It does not license:** density that breaks the 14px functional floor
([I7](../skills/typography-taste/SKILL.md#invariant)), grey text below AA
([color I1](../skills/color-taste/SKILL.md#invariant)), or a page so systematic it
never says what it is ([C18](../skills/academic-composition/SKILL.md#invariant)).

## HYBRID RELATIONSHIPS

**Useful**
- **+ `expressive-poster`** — one planned rupture inside a rigorous system. Swiss
  owns grid, hierarchy and density; the poster owns one scale collision and the
  display voice. The rupture works *because* the system is real.
- **+ `organic-tactile`** — an ordered archive of things made by hand. Swiss owns
  structure; organic owns image warmth, texture and rhythmic variation inside it.
- **+ `retro-futurist`** — period logic disciplined by a grid. Swiss anchors;
  retro contributes one mechanism and the palette logic.

**Dangerous**
- **+ `brutalist-utility`** — same domain, different manners: both own the grid and
  information display. Workable only with Swiss as Anchor and brutalist reduced to a
  signature (the exposed rule); otherwise they compete invisibly.
- **+ `immersive-authored-world`** — a flat declared system against a staged spatial
  claim. The scene either breaks the grid or is quarantined into one section, which
  is [U11](../skills/anti-patterns/SKILL.md#invariant).

## ACCESSIBILITY AND USABILITY

Its strengths align with accessibility: real hierarchy, logical order, consistent
position. Watch three things — density pushing type under the floor; grey-on-white
secondary text below AA; and reading order diverging from DOM order when a grid is
built with placement rather than structure. Captions and figures need real
`figcaption` markup, not visual proximity alone.

## DIAGNOSTICS

1. Can you state the grid — columns, step, spans in use — from the artefact?
2. Is anything ranked by *position* rather than by size?
3. Are there at least two spans that are not the full width or a simple half?
4. Is there a real information object — index, table, caption system?
5. Do the type steps read as distinct ranks at a glance?
6. Would a second section break the grid to look better? If yes, the system is not
   yet authoritative enough.

## THE LOGIC, COMPACTLY

*Brief: a municipal arts centre, four programme strands, 60 events a season,
mixed-quality photography, audiences from teenagers to pensioners.*

Sixty events is volume, so the system does the work: a seven-column grid where a
strand occupies a fixed column group, which means a returning visitor learns
*position* as the classifier and stops reading category labels by the third visit.
Dates set as a numbered index down the left, tabular figures, so a season scans
vertically. One grotesque, four ranks, steps wide enough to survive a squint;
functional colour marks strand, never mood. Photography is uneven, so it is cropped
to the same two column-widths and treated identically — consistency substitutes for
quality, which is the honest answer to a mixed library ([C17](../skills/academic-composition/SKILL.md#invariant)).
The decision the dialect made was not "use a grid" — it was that *the season is the
subject and navigation is the design*, and every choice above follows from it.

---
name: spacing-taste
description: Spacing and layout rules in two tiers — INVARIANT (intentional spatial hierarchy, tokenised rhythm, internal gaps smaller than external, no magic numbers, spacing that scales rather than collapses) and DIALECT (auction-editorial's air-first, bottom-heavy composition with whitespace as a status signal, each with a yields-when). Use before writing any layout, padding, margin, gap, or spacing token, and when reviewing a design that feels cramped, busy, arbitrary, or cheap.
---

# Spacing Taste

Two tiers. The **invariants** apply to every piece of work regardless of dialect.
The **dialect** section applies when a Design Read has selected
[auction-editorial](../../dialects/auction-editorial.md), and every rule in it
states when it yields.

The amount of negative space is a dialect question. That space is *organised* is
not.

---

## INVARIANT

### I1 — Spatial hierarchy is intentional

Every gap is a decision. Proximity encodes grouping before a single word is read,
so no spacing relationship may be inherited from a default, a framework reset, or
whatever the previous element happened to do.

**The hard form: internal gaps must be smaller than the gap to the neighbouring
group.** If a stack's items sit 32px apart and the next block is 32px away, the
grouping is gone and the hierarchy is a lie.

Every text stack has its relationships set deliberately — eyebrow→heading,
heading→lead, lead→body, body→body, text→CTA, stack→next block. Set them as a
component, not by hand:

```css
.stack > * + *          { margin-block-start: var(--space-4); }
.stack > .eyebrow + *   { margin-block-start: var(--space-3); }
.stack > h1 + .lead,
.stack > h2 + .lead     { margin-block-start: var(--space-5); }
.stack > .lead + *      { margin-block-start: var(--space-6); }
.stack > * + .cta-row   { margin-block-start: var(--space-7); }
```

*Why:* proximity *is* the hierarchy. Uniform gaps flatten meaning into a list;
differentiated gaps make a heading and its lead read as one thought and a CTA read
as a decision point. This holds in every aesthetic — dense or airy, editorial or
utilitarian. A dense design with deliberate hierarchy is good work; an airy one
with uniform gaps is not.

### I2 — Rhythm comes from a token scale; no magic numbers

Every spacing value resolves to a token on a documented scale with a consistent
base step. No `margin-top: 37px`. No `padding: 1.35rem`. If the value you want
isn't on the scale, either you're wrong about the value or the scale needs a
documented addition — decide which and say which.

The reference scale, 4px base:

```css
:root {
  --space-1:  0.25rem; /*  4px  hairline nudges, icon gaps */
  --space-2:  0.5rem;  /*  8px  inside small controls */
  --space-3:  0.75rem; /* 12px  label → field */
  --space-4:  1rem;    /* 16px  body paragraph rhythm */
  --space-5:  1.5rem;  /* 24px  component internal padding */
  --space-6:  2rem;    /* 32px  card padding, stack gaps */
  --space-7:  3rem;    /* 48px  sub-block separation */
  --space-8:  4rem;    /* 64px  section padding, mobile */
  --space-9:  6rem;    /* 96px  section padding, desktop */
  --space-10: 8rem;    /* 128px major section breaks */
  --space-11: 12rem;   /* 192px chapter breaks, hero breathing room */
}
```

*Why:* repeated multiples of one step create rhythm the eye reads as intentional
even when it can't name it. Ad-hoc values destroy that rhythm and guarantee drift
the moment a second person — or a second agent — touches the file.

The **base step and the number of steps are a system decision**; an 8px base or a
tighter 6-step scale is fine. What never yields is that a scale exists, is
documented, and is the only source of spacing values.

### I3 — Every element earns its place

No element exists because a region looked empty. If you cannot state an element's
communicative job in one line, delete it. This applies equally to a decorative
flourish in an airy layout and to a redundant panel in a dense one.

*Why:* elements added to fill space have no rank, so they dilute the hierarchy of
everything around them — the cost is paid in comprehension, not just in taste.

### I4 — Spacing scales across viewports; it never collapses

Small screens get *less* space, not *none*. Preserve the proportional
relationships and shrink the absolutes.

- Text never runs to the viewport edge. There is always a gutter.
- Relationships established at desktop (which gaps are larger than which) hold at
  every width.
- Prefer continuous scaling over breakpoint jumps:

```css
.section { padding-block: clamp(3rem, 8vw, 6rem) clamp(4.5rem, 12vw, 12rem); }
```

*Why:* the proportional relationships are what carry hierarchy across
breakpoints. Collapsing them at small widths means the majority of real traffic
sees a layout with no structure — a wireframe of the design rather than the design.

---

## DIALECT — auction-editorial

Air-first. These are strong defaults, not laws.

### D1 — When in doubt, take one spacing step MORE

Choosing between two adjacent steps, take the larger. If the first pass looks
slightly too airy, it is right — density creeps in during implementation, never out.

*Why:* erring tight and erring loose are not symmetric errors. Too much air reads
as confidence and editorial control; too little reads as a template with the
padding knocked out. Given an even bet, take the error that flatters.

`yields when:` the deliverable's job is density — dashboards, data tables,
catalogues, feeds, operational tooling, anything where the user's task is
comparison or scanning at volume. Also when the audience expects density as a
signal of capability (professional and financial tools especially). Then take the
smaller step and let I1 carry the hierarchy.

### D2 — Bottom padding of any section exceeds top

Target **1 : 1.5 to 1 : 2**, bottom-heavy, at every breakpoint.

```css
.section {
  padding-block: var(--space-8) var(--space-10); /* top 64, bottom 128 */
}
@media (min-width: 60rem) {
  .section { padding-block: var(--space-9) var(--space-11); } /* 96 / 192 */
}
```

This is the sectional form of the dialect's composition principle: *visual mass
slightly above centre, deeper field of space below*
([P5](../../dialects/auction-editorial.md#p5--visual-mass-slightly-above-centre-deeper-field-of-space-below)).

*Why:* reading runs downward, so a block visually leans into the space below it;
equal padding therefore *reads* as bottom-tight and shoves each section into the
next. Extra bottom space gives a section a clean ending, which makes a long page
feel like chapters rather than a scroll.

`yields when:` usability, information density, audience expectations, or brand
character require another composition. Vertical space at a premium, above-the-fold
content requirements, or a rhythm the brand already owns all justify even or
top-heavy distribution.

### D3 — Whitespace is a luxury signal

Space surrounding content is doing work. Don't answer it with a flourish, a stock
illustration, a features card, or a background pattern.

- Body measure caps at ~65–75ch; display lines at ~20–30ch. Wide viewports get
  margin, not longer lines.
- A hero may be mostly empty. Intentional emptiness above the fold is a
  confidence move, not a bug report.
- Asymmetry is often better — a 7/12 column with 5/12 of air beats a 12/12 stretch.

*Why:* density is cheap to produce and reads cheap; restraint is a visible,
non-fakeable editorial decision. Premium print and gallery layouts buy space, and
readers have learned to price it.

`yields when:` the audience reads emptiness as unfinished or as low value — some
sectors and regions genuinely do — or when the page must demonstrate breadth
(marketplaces, catalogues, portfolios where volume *is* the value proposition).
The measure caps hold longer than the emptiness does: long lines hurt reading in
every aesthetic.

### D4 — Gutters stay generous on mobile

Never below `--space-5` (24px). Section padding `--space-8` mobile → `--space-9`/
`--space-10` desktop.

*Why:* cramping the phone view is how a design earns "generic app".

`yields when:` the content is a full-bleed medium (imagery, video, maps, charts)
or the screen is small enough that 24px meaningfully costs legibility — then go
narrower, but never to zero (I4).

---

## Checklist

**Invariant — every deliverable**
- [ ] Every spacing value is a token; zero magic numbers.
- [ ] Text stacks use deliberate, differentiated gaps; internal < external.
- [ ] Nothing exists purely to fill space.
- [ ] Gutters present at every width; relationships preserved, not collapsed.

**Dialect — when auction-editorial is active**
- [ ] You took the larger step on at least one call you hesitated over.
- [ ] Sections are bottom-heavy (1:1.5 → 1:2).
- [ ] Measure capped; emptiness left intentionally empty.
- [ ] Any yield above is named in the report with its condition.

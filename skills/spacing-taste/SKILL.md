---
name: spacing-taste
description: Alex's spacing and layout rhythm rules — generous whitespace as the default, 4px-step token scale, asymmetric section padding, and explicit gap rules for text stacks. Use before writing any layout, padding, margin, gap, or spacing token, and when reviewing a design that feels cramped, busy, or cheap.
---

# Spacing Taste

**Position: air is the default; cramped is a bug.**

Spacing is the single strongest cheapness signal in a layout. Wrong type still
reads as a choice; wrong spacing reads as an accident. Most generated layouts
fail here first, because filling space feels productive and leaving it empty
feels unfinished. It is the opposite: whitespace is what expensive work looks
like.

---

## 1. When in doubt, take one spacing step MORE

The rule is literal. If you are choosing between two adjacent steps on the
scale, take the larger one. If the layout looks slightly too airy on your first
pass, it is correct — density creeps in during implementation, never out.

**Rationale.** Erring tight and erring loose are not symmetric errors. Too much
air reads as confidence and editorial control. Too little reads as a template
with the padding knocked out. Given an even bet, take the error that flatters.

---

## 2. Rhythm comes from a 4px-step token scale, never ad-hoc

Every spacing value resolves to a token. No `margin-top: 37px`. No `padding:
1.35rem`. If a value you want is not on the scale, you are either wrong about
the value or the scale needs a documented addition — decide which, don't
sidestep it.

```css
:root {
  /* 4px base step; the scale is geometric-ish so adjacent steps read as different */
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

**Rationale.** Repeated multiples of one step create rhythm the eye reads as
intentional even when it can't name it. Ad-hoc values destroy that rhythm and
guarantee drift the moment a second person — or a second agent — touches the
file. A token also makes "one step more" a mechanical operation instead of a
debate.

---

## 3. Bottom padding of any section always exceeds top

Non-negotiable, on every section, every breakpoint.

```css
.section {
  padding-block: var(--space-8) var(--space-10); /* top 64, bottom 128 */
}
@media (min-width: 60rem) {
  .section { padding-block: var(--space-9) var(--space-11); } /* 96 / 192 */
}
```

Target ratio **1 : 1.5 to 1 : 2**, bottom-heavy. Never 1:1, never top-heavy.

**Rationale.** Reading runs downward, so a block's content visually leans into
the space below it; equal padding therefore *reads* as bottom-tight and shoves
each section into the next. Extra bottom space also gives a section a clean
ending, which is what makes a long page feel like chapters instead of a scroll.

---

## 4. Text stacks get explicit gap rules

A text stack is never "whatever the margins do." Set each relationship
deliberately. Default ladder:

| Relationship | Token | Why |
|---|---|---|
| eyebrow → heading | `--space-3` (12px) | The eyebrow is a label *on* the heading; it must feel attached, not stacked. |
| heading → lead | `--space-5` (24px) | Clear break, still one unit — the lead is the heading's completion. |
| lead → body | `--space-6` (32px) | Register change from voice to detail; earns real air. |
| body → body | `--space-4` (16px) | Paragraph rhythm, tuned to line-height, not larger. |
| any text → CTA | `--space-7` (48px) | The CTA is a separate act. Crowd it and it reads as a footnote. |
| stack → next block | `--space-8`+ | Never smaller than the largest internal gap, or hierarchy inverts. |

Implement as a component, not by hand:

```css
.stack > * + *          { margin-block-start: var(--space-4); }
.stack > .eyebrow + *   { margin-block-start: var(--space-3); }
.stack > h1 + .lead,
.stack > h2 + .lead     { margin-block-start: var(--space-5); }
.stack > .lead + *      { margin-block-start: var(--space-6); }
.stack > * + .cta-row   { margin-block-start: var(--space-7); }
```

**Rationale.** Proximity *is* the hierarchy — before anyone reads a word, the
gaps have already told them what belongs to what. Uniform gaps flatten meaning
into a list; a tuned ladder makes a heading and its lead read as one thought and
the CTA read as a decision point. Encoding it in CSS also means the ladder
survives content changes.

**Hard rule: the internal gap must always be smaller than the gap to the
neighbour.** If a stack's items are 32px apart and the next block is 32px away,
the grouping is gone.

---

## 5. Whitespace is a luxury signal — never fill it out of fear

Empty space that surrounds content is *doing work*. Do not answer it with a
decorative flourish, a stock illustration, a "features" card, a background
pattern, or a stretched-to-fill image.

Practical limits:
- Content column caps at **~65–75ch** for body, **~20–30ch** for display lines.
  Wide viewports get margin, not longer lines.
- A hero may be mostly empty. Intentional emptiness above the fold is a
  confidence move; it is not a bug report.
- Asymmetry is allowed and often better — a 7/12 column with 5/12 of air beats
  a 12/12 stretch.
- If you cannot justify an element beyond "the space looked empty", delete it.

**Rationale.** Density is cheap to produce and reads cheap; restraint is a
visible, non-fakeable editorial decision. Also literal: premium print and
gallery layouts buy space, and readers have learned to price it.

---

## 6. Responsive spacing scales, it doesn't collapse

Small screens get *less* air, not *no* air. Drop one or two steps, never to
zero, and keep the bottom-heavy ratio.

- Section padding: `--space-8` mobile → `--space-9`/`--space-10` desktop.
- Gutters: never below `--space-5` (24px) on mobile. Edge-to-edge text is a bug.
- Prefer `clamp()` on section padding so the change is continuous:

```css
.section { padding-block: clamp(3rem, 8vw, 6rem) clamp(4.5rem, 12vw, 12rem); }
```

**Rationale.** Cramping the phone view is how a design earns "generic app". The
proportional relationships are what carry the taste across breakpoints, so
preserve the ratios and shrink the absolutes.

---

## Checklist before you ship a layout

- [ ] Every spacing value is a token; zero magic numbers.
- [ ] Every section is bottom-heavy (1:1.5 → 1:2).
- [ ] Text stacks use the explicit ladder, internal gaps < external gaps.
- [ ] You took the larger step on at least one call you hesitated over.
- [ ] Nothing exists purely to fill space.
- [ ] Mobile has gutters ≥ 24px and still breathes.

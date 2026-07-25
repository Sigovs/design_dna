---
name: typography-taste
description: Alex's typography rules — editorial contrast between an expressive display face, a quiet grotesque body, and mono for data; one italic accent word as a signature; uppercase mono micro-labels; auction-catalog spec plates; fluid clamp() sizing with balanced display lines and no orphans. Use before choosing typefaces, setting type scales, writing headings, or laying out any data, label, or caption.
---

# Typography Taste

**Position: editorial contrast.** Three voices, each with one job, none of them
trying to do another's work. The display face carries the emotion, the body face
gets out of the way, and mono makes data look like a record rather than a
paragraph.

---

## 1. The three-voice system

| Voice | Role | Character |
|---|---|---|
| **Display** | Headlines, pull quotes, the one number that matters | Expressive — didone / high-contrast serif energy. Sharp thin-to-thick, tight optical spacing at size. |
| **Body** | Leads, paragraphs, UI copy | Quiet grotesque. Neutral, low-personality, excellent at 16–18px. It should be forgettable. |
| **Mono** | Data, labels, eyebrows, buttons, technical plates, metadata | Machine register. Fixed rhythm, uppercase micro-use with wide tracking. |

Reasonable starting stacks (substitute freely inside the same character class):

```css
:root {
  --font-display: "Playfair Display", "Didot", "GFS Didot", Georgia, serif;
  --font-body:    "Inter", "Söhne", "Helvetica Neue", system-ui, sans-serif;
  --font-mono:    "JetBrains Mono", "IBM Plex Mono", ui-monospace, monospace;
}
```

**Rationale.** Contrast between faces creates hierarchy without needing size
escalation, colour, or boxes. A didone-family display face reads *edited* — it
carries print and fashion associations that no grotesque at any weight can
produce. Pairing it with a neutral body means the expressive face stays a
special event; two expressive faces cancel each other out and read as costume.
Mono's fixed advance width makes columns of numbers scan as a ledger, which is
exactly the authority signal data needs.

**Hard limits.** Three families maximum. Never a display face for body text.
Never a grotesque doing display work when the display face exists. Never a
second serif.

---

## 2. One italic accent word — the signature move

Per headline (or per page for short pages): exactly **one** word set in the
display face's italic, ideally an adjective or verb carrying the promise.

```html
<h1 class="display">Objects with a <em>documented</em> life</h1>
```

```css
h1 em { font-style: italic; font-weight: inherit; } /* true italic, never oblique */
```

**Rationale.** A didone italic is a genuinely different letterform, not a slant —
using one word of it puts a stress mark on the sentence the way a voice would.
It is small, cheap, and unmistakably deliberate, which is what a signature is.

**Constraints.** One per headline, never two. Never italicise a whole line or a
lead paragraph. Never combine with colour, weight change, or underline — the
italic *is* the emphasis. Requires a real italic cut; if the family only has a
faux oblique, skip the move entirely rather than fake it.

---

## 3. Uppercase mono micro-labels

Eyebrows, spec-plate keys, buttons, captions, nav items, table headers:

```css
.eyebrow, .plate dt, .btn, .caption, th {
  font-family: var(--font-mono);
  font-size: 0.6875rem;      /* 11px — small on purpose */
  text-transform: uppercase;
  letter-spacing: 0.12em;    /* 0.08em–0.16em; more tracking as size drops */
  font-weight: 500;
  line-height: 1.2;
}
```

**Rationale.** Uppercase has no ascender/descender variation, so it reads as a
*label* rather than as language — the eye files it as metadata and moves on to
the real content. Wide tracking is mandatory, not decorative: uppercase
letterforms are drawn for word-shape spacing, and untracked uppercase looks
jammed and amateur. Small size keeps a label from competing with the heading it
introduces; authority here comes from tracking and register, not scale.

**Never** set more than ~5 words in this style, and never a full sentence.

---

## 4. Data as spec plates — the auction-catalog aesthetic

Any set of facts (specs, metadata, credits, pricing, stats, provenance) is a
**spec plate**: mono keys, left-aligned values, hairline rules, no boxes, no
zebra stripes, no card.

```html
<dl class="plate">
  <dt>Medium</dt>      <dd>Silver gelatin print</dd>
  <dt>Dimensions</dt>  <dd>40 × 50 cm</dd>
  <dt>Edition</dt>     <dd>3 of 12</dd>
  <dt>Estimate</dt>    <dd>£4,000–6,000</dd>
</dl>
```

```css
.plate {
  display: grid;
  grid-template-columns: minmax(8rem, 14rem) 1fr;
  column-gap: var(--space-6);
  row-gap: 0;
}
.plate dt {                       /* mono micro-label, see §3 */
  padding-block: var(--space-3);
  border-block-start: 1px solid var(--rule);   /* hairline, not a border-box */
  color: var(--ink-60);
}
.plate dd {
  padding-block: var(--space-3);
  border-block-start: 1px solid var(--rule);
  font-family: var(--font-body);
  font-variant-numeric: tabular-nums;
}
@media (max-width: 40rem) {
  .plate { grid-template-columns: 1fr; }        /* stack; dd loses its top rule */
  .plate dd { border-block-start: 0; padding-block-start: 0; }
}
```

**Rationale.** Catalog raisonné and auction lot pages are the highest-credibility
data layout in print, and the reason is structural: the key column is visually
subordinate (mono, small, uppercase, dimmed) so the *values* form the reading
line, and hairline rules separate rows without drawing a container. Boxes and
stripes add weight that says "table widget"; rules say "record". Tabular numerals
are required — proportional digits make figures fail to align down the column,
which instantly reads as unconsidered.

---

## 5. Fluid sizing with clamp()

Every size in the type scale is fluid. No breakpoint-swapped font sizes.

```css
:root {
  --text-xs:      0.6875rem;                            /* labels stay fixed */
  --text-sm:      clamp(0.8125rem, 0.8vw + 0.7rem, 0.9375rem);
  --text-body:    clamp(1rem, 0.35vw + 0.95rem, 1.125rem);
  --text-lead:    clamp(1.125rem, 0.9vw + 1rem, 1.5rem);
  --text-h3:      clamp(1.5rem, 1.6vw + 1.1rem, 2rem);
  --text-h2:      clamp(2rem, 3vw + 1.2rem, 3.25rem);
  --text-display: clamp(2.75rem, 7vw + 1rem, 7rem);
}
```

Companion rules that scale with size:

```css
.display { line-height: 0.95; letter-spacing: -0.02em; }  /* tighter as it grows */
body     { line-height: 1.6;  letter-spacing: 0; }
.lead    { line-height: 1.45; }
```

**Rationale.** Fixed sizes with breakpoints produce a headline that is correct at
two widths and wrong at every width in between — and awkward mid-range headlines
are exactly where generated designs break. Optical spacing is size-dependent:
large type needs negative tracking and sub-1 line-height to hold together as a
shape, small type needs the opposite. Encode that in the scale so nobody has to
remember it. Micro-labels stay fixed because 11px is already the floor.

---

## 6. Balance display lines; kill orphans

```css
h1, h2, .display, .lead { text-wrap: balance; }   /* short, multi-line blocks */
p, li                   { text-wrap: pretty; }    /* long blocks: fix the last line only */
```

Plus: bind the last two words of a headline with `&nbsp;` when balance isn't
supported, and cap display measure at ~20–30ch so wrapping stays predictable.

**Rationale.** A single word alone on the final line of a headline is the most
visible typographic error a page can have — it reads as broken rather than as a
line break. `balance` distributes across lines so the block forms a deliberate
shape; `pretty` on body copy only adjusts the ragged ending, which is all long
copy needs (balancing a whole paragraph makes the measure jitter).

---

## Checklist

- [ ] Exactly three families, each in its lane; no display face in body copy.
- [ ] One italic accent word per headline — a real italic, no other emphasis on it.
- [ ] Every micro-label is uppercase mono with ≥0.08em tracking, ≤5 words.
- [ ] All factual data is a spec plate: hairline rules, tabular numerals, no box.
- [ ] Every size is `clamp()`; large type has negative tracking and tight leading.
- [ ] `text-wrap: balance` on display lines; zero orphans at any width.

---
name: typography-taste
description: Typography rules in two tiers — INVARIANT (legible hierarchy, bounded type roles, body faces built for reading, optical correction at every size, tabular figures for aligned data, tracked and short uppercase, no orphans) and DIALECT (auction-editorial's didone display + quiet grotesque + mono, italic signature word, mono micro-labels, spec plates, each with a yields-when). Use before choosing typefaces, setting type scales, writing headings, or laying out any data, label, or caption.
---

# Typography Taste

Two tiers. The **invariants** are reading laws — they hold in every aesthetic.
The **dialect** section is the house voice, active when a Design Read selects
[auction-editorial](../../dialects/auction-editorial.md), and every rule in it
states when it yields.

---

## INVARIANT

### I1 — Hierarchy must be legible before the content is read

A reader must be able to rank the elements on a page — what is a label, what is
the headline, what is supporting, what is metadata — at a glance, without reading
words. Rank comes from contrast in size, weight, register, or position; the source
doesn't matter, the unambiguity does.

Two ranks must never be near-identical. If a heading and a lead differ by 2px,
the hierarchy is decorative rather than real. Make the step obvious or collapse
the two into one rank.

*Why:* hierarchy is the interface to the content. When it's ambiguous, readers
serialise — they read everything in order to find out what matters — which is the
most expensive possible failure mode and it happens before any aesthetic
judgement is made.

### I2 — Type roles are defined, bounded, and respected

Define the roles your system has (display, body, label, data — or fewer) and which
face and size serves each. Then don't use a face outside its role.

**Body copy is set in a face designed for extended reading.** A high-contrast
display face, a condensed face, or a decorative face at paragraph sizes is a
defect in every aesthetic — thin strokes disappear and the reader's eye works
harder for every line.

*Why:* bounded roles are the type equivalent of token discipline. Unbounded
faces produce a page that reads as assembled by several people, and readers lose
the ability to use typographic cues at all.

The *number* of families and *which* families is a dialect choice. That the roles
are defined and enforced is not.

### I3 — Optical correction scales with size

Spacing and leading are size-dependent, and the correction must be encoded, not
remembered:

```css
.display { line-height: 0.95; letter-spacing: -0.02em; }  /* tighter as it grows */
body     { line-height: 1.6;  letter-spacing: 0; }
.lead    { line-height: 1.45; }
```

Large type needs negative tracking and sub-1 leading to hold together as a shape.
Small type needs the opposite. Sizes should be fluid so type is correct at every
width, not only at breakpoints:

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

*Why:* this is optical balance, and it is measurable rather than stylistic —
untracked large type reads as gappy and loose at any scale of taste. Fixed sizes
with breakpoints are correct at two widths and wrong at every width between, and
awkward mid-range headlines are where generated work most often breaks.

### I4 — Uppercase is tracked and short

If you use uppercase, add tracking (≥0.08em, more as size drops) and keep it to a
few words. Never a full sentence, never a paragraph.

*Why:* uppercase letterforms are drawn for word-shape spacing; untracked
uppercase looks jammed. And uppercase removes ascender/descender variation, which
is what the eye uses to recognise word shapes — so extended uppercase measurably
slows reading. This is a legibility fact, not a preference; only *whether* you
reach for uppercase is a dialect choice.

### I5 — Aligned data uses tabular figures

Any column of numbers — prices, dimensions, dates, measurements, stats — uses
`font-variant-numeric: tabular-nums` and aligns.

*Why:* proportional digits make figures fail to align down a column, which
defeats the only reason to put them in a column. Comparison is the task; misaligned
digits break it.

### I6 — No orphans; display lines are balanced

```css
h1, h2, .display, .lead { text-wrap: balance; }   /* short, multi-line blocks */
p, li                   { text-wrap: pretty; }    /* long blocks: last line only */
```

Bind the final two words with `&nbsp;` where `balance` isn't supported.

*Why:* a single word alone on the last line of a headline reads as broken rather
than as a line break — it is the most visible typographic error a page can make.
`balance` gives the block a deliberate shape; `pretty` fixes only the ragged
ending of long copy, which is all long copy needs.

---

## DIALECT — auction-editorial

Editorial contrast: three voices, each with one job.

### D1 — The three-voice system

| Voice | Role | Character |
|---|---|---|
| **Display** | Headlines, pull quotes, the one number that matters | Expressive — didone / high-contrast serif energy |
| **Body** | Leads, paragraphs, UI copy | Quiet grotesque. Neutral, forgettable |
| **Mono** | Data, labels, eyebrows, buttons, technical plates | Machine register |

```css
:root {
  --font-display: "Playfair Display", "Didot", "GFS Didot", Georgia, serif;
  --font-body:    "Inter", "Söhne", "Helvetica Neue", system-ui, sans-serif;
  --font-mono:    "JetBrains Mono", "IBM Plex Mono", ui-monospace, monospace;
}
```

Three families maximum. Never two expressive faces — they cancel out and read as
costume.

*Why:* contrast between faces creates hierarchy without escalating size, colour,
or containers. A didone-family display face reads *edited* — it carries print and
fashion associations no grotesque produces at any weight. Mono's fixed advance
width makes numbers scan as a ledger, which is the authority signal data needs.

`yields when:` the brand has its own type system (then use it, and apply the
principles); the deliverable is purely technical or utilitarian and a single
well-chosen family is clearer; the rendering environment can't do a didone justice
(low-DPI, small sizes, heavy compression); or the script has no didone equivalent —
most non-Latin scripts don't, and a mismatched fallback is worse than a good
single-family setting.

### D2 — One italic accent word — the signature move

Per headline (or per page, on short pages): exactly **one** word in the display
face's true italic, ideally the adjective or verb carrying the promise.

```html
<h1 class="display">Objects with a <em>documented</em> life</h1>
```

One per headline, never two. Never a whole line, never a lead paragraph. Never
combined with colour, weight change, or underline — the italic *is* the emphasis.

*Why:* a didone italic is a genuinely different letterform, not a slant, so one
word of it puts a stress mark on the sentence the way a voice would. Small, cheap,
unmistakably deliberate — which is what a signature is.

`yields when:` the family has no true italic cut (a faux oblique is worse than
nothing — skip the move); the brand voice is deliberately flat or technical; or
the script has no italic convention (CJK, Arabic, most Indic scripts), where
emphasis is conventionally carried by weight or colour instead.

### D3 — Uppercase mono micro-labels

Eyebrows, spec-plate keys, buttons, captions, nav items, table headers:

```css
.eyebrow, .plate dt, .btn, .caption, th {
  font-family: var(--font-mono);
  font-size: 0.6875rem;      /* 11px — small on purpose */
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-weight: 500;
  line-height: 1.2;
}
```

*Why:* uppercase mono reads as a *label* rather than as language — the eye files
it as metadata and moves on to the content. Small size keeps a label from
competing with the heading it introduces; authority comes from tracking and
register, not scale.

`yields when:` the brand's label register is different (a small-caps or weighted
sans label system is equally valid); localisation makes uppercase costly — German
compounds, Cyrillic at small sizes, and any script without case all suffer; or the
label carries enough words that I4 forbids uppercase anyway. The tracking and
length rules in I4 hold regardless.

### D4 — Data as spec plates

Any set of facts — specs, metadata, credits, pricing, stats, provenance — as mono
keys, left-aligned values, hairline rules. No boxes, no zebra stripes, no card.

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
.plate dt {
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
  .plate { grid-template-columns: 1fr; }
  .plate dd { border-block-start: 0; padding-block-start: 0; }
}
```

*Why:* the catalogue raisonné page is the highest-credibility data layout in
print, and the reason is structural: the key column is visually subordinate (mono,
small, dimmed) so the *values* form the reading line, and hairlines separate rows
without drawing a container. Boxes and stripes say "table widget"; rules say
"record". This is the typographic form of dialect principle
[P3](../../dialects/auction-editorial.md#p3--metadata-is-composed-not-appended).

`yields when:` the facts are the primary *interaction* rather than the primary
content — sortable, filterable, selectable, or comparable-across-rows data needs
real table affordances (headers, zebra or hover banding, sticky columns,
alignment controls) and a plate can't provide them. Also when the set is long
enough that scanning needs row banding. Tabular figures (I5) hold either way.

---

## Checklist

**Invariant — every deliverable**
- [ ] Ranks are unambiguous; no two ranks near-identical.
- [ ] Type roles defined and respected; body face built for reading.
- [ ] Sizes fluid; large type optically tightened.
- [ ] Any uppercase is tracked ≥0.08em and short.
- [ ] Numeric columns use tabular figures and align.
- [ ] Display lines balanced; zero orphans at any width.

**Dialect — when auction-editorial is active**
- [ ] Three families, each in its lane.
- [ ] One true-italic accent word per headline, no other emphasis on it.
- [ ] Micro-labels are uppercase mono, ≤5 words.
- [ ] Factual data set as a spec plate with hairline rules, no box.
- [ ] Any yield above is named in the report with its condition.

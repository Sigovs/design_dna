---
name: typography-taste
description: Typography rules in two tiers — INVARIANT (legible hierarchy, bounded type roles, body-length text built for sustained reading, optical correction at every size, a 14px floor under functional text, roles distinguished from voices with casing applied by role, icons treated as glyphs — one set, stroke matched, sized optically, never meaning alone — tabular figures for aligned data, tracked and short uppercase, intentional line breaks, and a display face verified in the render at the sizes the page sets) and DIALECT (auction-editorial's didone display + quiet grotesque + mono, italic signature word, mono micro-labels, spec plates, each with a yields-when). Use before choosing typefaces, setting type scales, writing headings, or laying out any data, label, or caption.
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

### I2 — Type roles are defined and bounded; body-length text is built for reading

Define the roles your system has (display, body, label, data — or fewer) and which
face and size serves each. Then don't use a face outside its role.

**Body-length text must be set in a face, size, spacing, and measure built for
sustained reading.** All four, not just the face — a good reading face at 13px, at
1.2 line-height, or across a 120-character measure fails just as surely as a
didone at paragraph size. Thin strokes disappear, lines lose their return path,
and the reader's eye works harder for every line.

**The boundary:** this rule governs *body-length* text — passages a reader is
expected to read continuously. A short expressive passage set at display scale is
**display use**, not body text, and is governed by the U-tier legibility laws
([U8](../anti-patterns/SKILL.md#invariant), and I1 above) rather than by this rule.
A pull quote in the display face is legitimate; three paragraphs in it are not.
Judge by reading length and role, not by tag name.

*Why:* bounded roles are the type equivalent of token discipline — unbounded faces
produce a page that reads as assembled by several people, and readers lose the
ability to use typographic cues at all. And sustained reading is a measurable
task: the four variables above set how fast the eye can find the next line, which
is why all four are in the law rather than just the typeface.

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
  --text-xs:      0.875rem;      /* 14px — the floor (I7), fixed, never smaller */
  --text-sm:      clamp(0.9375rem, 0.5vw + 0.8rem, 1rem);
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

### I6 — Line breaks are intentional and compositionally resolved

**Line breaks must be intentional and compositionally resolved. Avoid accidental
widows, orphans, and weak display-line breaks.**

A weak break is one that fights the sentence: a single word stranded on the last
line, a break splitting a name or a number from its unit, a headline breaking
after an article or preposition, a rag that collides with a neighbouring element.

`text-wrap` is **an implementation technique, not the invariant** — a common way to
satisfy it, not the definition of satisfying it:

```css
h1, h2, .display, .lead { text-wrap: balance; }   /* short, multi-line blocks */
p, li                   { text-wrap: pretty; }    /* long blocks: last line only */
```

Other legitimate techniques: `&nbsp;` binding the final two words, `<wbr>` and
explicit `<br>` at chosen points, `max-inline-size` set so the break lands where
you want it, or hand-set breaks on a headline that matters.

**Evenly balanced lines are not required.** An expressive rag, a deliberately
asymmetric block, a stepped or staggered headline, or compositional tension between
line lengths all satisfy this invariant — as long as the break pattern reads as a
decision. What this rule forbids is the break nobody chose.

*Why:* a stranded word or a headline broken after "the" reads as broken rather than
as a line break — it is the most visible typographic error a page can make, and it
signals that no one looked. The obligation is authorship of the breaks, not
uniformity of the lines.

### I7 — Functional text has a floor

**Text that carries information the visitor has to read is never smaller than
14px (0.875rem), at any breakpoint.** That covers navigation, prices, labels,
captions, addresses, metadata, table cells, form labels and helper text, button
sub-labels, and every micro-label in an interface.

Below the floor, type is **decoration, and decoration may carry no information.** A
watermark, a background numeral, an ornamental repeat — those may be any size,
because nothing is lost when they are not read.

**A 12px label is not a design decision. It is information the author decided the
reader does not need** — and if that is true, delete it; if it is false, set it at
the floor.

*Why:* this is the single most frequent recorded failure in the vault, and it
appears in exactly the entries whose art direction is otherwise strongest — the
confidence that produces a monumental opening also shrinks the functional layer
until it disappears. Contrast is a separate axis and is governed by
[color I1](../color-taste/SKILL.md#invariant): micro-type at AA is still
unreadable if it is 11px on a phone at arm's length. It is also not a
density question — dense interfaces need *more* legibility per line, not less,
because they are read for hours.

> **Evidence — distilled from the vault, 2026-07-30.** Five entries record it
> independently, including both rating-3 references:
> `vault/ciridae-com` (3, in) — *"светло-серый текст иногда слабоват по
> контрасту"*; `vault/ruadh-com` (2, in) — *"навигация, названия и цены слишком
> мелкие"*; `vault/kinncollective-co-uk` (2) — *"некоторые подписи под
> изображениями слишком мелкие"*; `vault/augen-pro` (2, hybrid) — *"контраст
> микротекста местами объективно слишком низкий… информация почти исчезает"*;
> `vault/i-pinimg-…-46d9d54b` (2) — *"extreme microtype… limit its value"*.
> Measured on the author's own work: this repository's own gallery adopted the 14px
> floor only after five of its surfaces were found failing at 12px.

### I8 — A role is not a voice

Two different things, and the words are not interchangeable:

- **A role is a functional job text does** — display, lead, body, label, caption,
  metadata, data, control, legal. Roles are named and bounded by
  [I2](#invariant), and a system can have many of them.
- **A voice is a visibly distinct typographic expression** — a different face, a
  different width, a different casing convention, a different tracking regime, a
  different scale behaviour, a different alignment logic, or a decorative treatment
  that reads as its own register.

**A new role does not earn a new voice.** Most roles are served by the existing
voices at different sizes, weights and colours — that is what a type system is for.
Adding a voice per role is how a page ends up looking like four designers were paid
by the typeface.

**Every voice beyond the first must have a systemic purpose you can state** — a job
the existing voices structurally cannot do. "Data must scan as a ledger, which
proportional figures cannot do" is a systemic purpose. "The testimonials section
needed something different" is not: that is a role, and a role gets a size and a
weight.

**No number is imposed here.** How many voices a system runs is a dialect decision
— [D1](#dialect) sets three for auction-editorial, and yields when the brand has
its own system. The invariant is that each one is *justified*, not that there are
three.

#### The voice audit — across sections, not within one

Run down the page, section by section, and record what changes. This is the type
column of the [section-language ledger](../../TASTE.md#2c-selection-coherence-and-device-discipline):

| Axis | Drift looks like |
|---|---|
| **Typeface** | A face appearing in one section and nowhere else |
| **Width** | Condensed here, normal there, with no reason for either |
| **Casing** | Uppercase headings in three sections, sentence case in the fourth |
| **Tracking** | Tight display tracking in one passage, default in the next at the same size |
| **Scale behaviour** | One section fluid, another fixed; steps that jump by 1.2 here and 2.0 there |
| **Alignment logic** | Centred sections alternating with left-aligned ones, unexplained |
| **Decorative treatment** | Underlines, outlines, gradients, strokes on type in one place only |

**Each change is either carried by the concept — and you can say which part of it —
or it is drift.** A deliberate register shift at a section boundary is authorship;
seven of them are [anti-patterns U11](../anti-patterns/SKILL.md#invariant).

*Why:* type is the cheapest place to add apparent variety and the most expensive
place to lose coherence, because the reader uses typographic consistency to know
what kind of thing they are reading. When the voice changes without a reason, the
cue stops working everywhere, not just where it changed.

#### Casing is a role signal, and it is applied by role

Casing is the cheapest role signal a system has — it costs no face, no weight and
no colour — which is exactly why it gets applied half-way and left there.

**Every label of the same role takes the same casing across the whole page.** One
"View all inventory" standing beside four Title Case CTAs does not read as
variation; it reads as the one nobody checked. Casing is decided once per role and
then applied exhaustively, by sweeping the rendered page for the role rather than
by fixing the instances someone happened to notice.

**And casing is applied to roles, not to voice.** Recasing headings and editorial
copy to match the buttons is not consistency — it flattens the very distinction
this invariant exists to protect. A page whose CTAs read *Sell Today · View All
Inventory · Read More* while its headings still read *We buy classic cars!* is
working correctly: the labels are a role, the headings are a voice, and the
difference in casing is what tells the reader which is which.

**An accessible name is a description, not a label.** It is written as a sentence
for someone listening to it, and it does not take the label's casing — recasing
`aria-label="Sell your classic car — we buy classic cars"` into title case makes it
worse to hear and confuses a description with a control.

> **Evidence — Beverly Hills Car Club, 2026-08-20.** A CTA recasing pass had been
> started and abandoned: the two hero buttons had been moved to Title Case, while
> *View all inventory*, *View details*, *Sell today*, *See all articles* and *Read
> more* had not. Half-applied, the casing carried no information at all — it looked
> like inconsistency rather than like a role. Finishing the sweep across all ten
> labels made casing mean "this is a control", and holding the headings and the
> trust lines in sentence case is what let it mean that.

---

### I9 — An icon is a glyph, and lives under the glyph rules

Icons appeared in this system only as bans — icon-only navigation, icons for
concepts that don't need them, emoji-as-icon-system — and as a 3:1 contrast target
in [color-taste](../color-taste/SKILL.md#invariant). A rule that only says *no*
gets re-litigated on every project, which is why this exists.

**One set per project, and an aggregator is not a set.** Two icon sets on one page
is [I8](#invariant) in pictures: a second voice with no systemic purpose. A library
that offers two hundred thousand glyphs from ninety families has not made the
decision — it has moved it into the page, one icon at a time. Choose the set once,
name it in the project record beside the typefaces, and draw the missing icon in
that set's grid rather than borrowing one that nearly matches.

**Stroke weight is matched to the type it sits with, not to the icon set's
default.** A 2px stroke next to a 400-weight grotesque reads heavier than the
words; the same stroke next to a 700-weight display reads thinner. The icon is a
glyph in that line of text and must carry the same colour of ink. Scale the stroke,
or change the weight of the text, but do not ship the mismatch.

**Sized optically, never nominally.** An icon set is drawn on a grid with its own
padding, so nominal parity is not visual parity: a 24px icon beside 16px text is
usually too big, and a 16px icon beside 16px text is usually too small. Match the
icon's *drawn* height to the cap height or x-height of its neighbour and then nudge
by eye — the same procedure as [I3](#invariant), for the same reason.

**Never the only carrier of meaning.** An icon may accompany a label, replace one
whose convention is genuinely established (search, close, menu, play, external
link, back), or repeat a meaning stated in text nearby. Anything else gets the
word. This is the same rule colour follows in
[color-taste](../color-taste/SKILL.md#invariant) — meaning is never carried by one
channel alone — and it is what
[anti-patterns](../anti-patterns/SKILL.md#invariant) already bans from the other
side.

**An icon is earned by repetition or by constraint, not by decoration.** If a
concept appears once and there is room for a word, it gets the word. Icons pay for
themselves in lists that repeat, in controls that recur, and where space genuinely
forbids text. The three-icon feature row exists because a section looked empty, and
that is not a reason.

*Why:* every one of these is a consistency cue the reader uses without noticing.
Mixed sets, mismatched strokes and nominal sizing all read as carelessness before
they read as anything else — and unlike a typeface, an icon is small enough that
the mistake is usually shipped rather than seen.

> **Non-normative, and deliberately not a rule.** If no set is already chosen and
> nothing in the brief decides it: a single geometric set on a uniform grid with
> one stroke weight — Lucide is the common one — costs nothing, works offline and
> is easy to draw into. It is recorded here so the question has a default answer,
> not because the set is taste. **A library name is never a direction**
> ([TASTE.md §2](../../TASTE.md#2-the-design-read)), and the choice belongs in the
> project record beside the build, not in a Design Read.

---

### I10 — A display face is verified in the render, at the sizes the page sets

**A typeface is not chosen, it is proved.** Before a display face is adopted, set
the page's own strings — its digits, its hyphenated phone number, its shortest
label — at the sizes the page actually renders, on every ground it uses, and look
at the result. Compare candidates side by side in one image rather than one after
another.

The failure this prevents is invisible at the size you naturally check. A face is
picked on a 68px headline, where it is flawless, and it is the 26px rating and the
11px caption that break.

**Where the display ranks live below roughly 40px, a high-contrast face is out.** A
didone's hairlines fall under one device pixel there and antialias to about 15%
grey, so parts of letters simply stop being drawn. That is not a taste question and
no amount of tracking or weight fixes it.

*Why:* the damage is not that it looks worse. It is that the page starts stating
things that are false, and nothing in the markup is wrong, so nothing flags it.

> **Evidence — measured on the author's own work, 360 Auto Care, 2026-07-30.**
> Bodoni Moda was adopted for a display rank spanning 26–68px and verified at the
> hero. At 26px it rendered the shop's review score **"4.8" as "1.8"** — the 4 loses
> its diagonal and its crossbar — and rendered the phone number "820-0360" as
> "820 0360", the hyphen gone entirely. Both had shipped. The fault was first
> misread as a CSS defect and cost several rounds — synthetic bold, stale
> composited tiles, pseudo-elements, `text-wrap: balance` were all tested and
> cleared — before a 4× zoom showed the "ghosting" was the letters' own hairlines.
> Newsreader, the same editorial register at moderate contrast, held every stroke
> at 26px on both grounds.
## DIALECT

*auction-editorial — strong defaults, each with a stated exit.*

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
  font-size: var(--text-xs);  /* 14px — the I7 floor; these all carry information */
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-weight: 500;
  line-height: 1.2;
}
```

**This block used to specify 11px, "small on purpose".** It was corrected by the
2026-07-30 distillation: every selector in it — eyebrow, plate key, button,
caption, table header — carries information, so all of them sit above the
[I7](#invariant) floor. The label register survives on **tracking, case and
family**, not on being tiny; that is what the *Why* below already claimed, and the
11px was doing none of the work.

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
- [ ] Type roles defined and respected; body-length text has a reading face, size,
      spacing, and measure.
- [ ] Sizes fluid; large type optically tightened.
- [ ] Any uppercase is tracked ≥0.08em and short.
- [ ] Numeric columns use tabular figures and align.
- [ ] Every line break reads as chosen; no accidental widows, orphans, or weak
      display breaks at any width.

**Dialect — when auction-editorial is active**
- [ ] Three families, each in its lane.
- [ ] One true-italic accent word per headline, no other emphasis on it.
- [ ] Micro-labels are uppercase mono, ≤5 words.
- [ ] Factual data set as a spec plate with hairline rules, no box.
- [ ] Any yield above is named in the report with its condition.

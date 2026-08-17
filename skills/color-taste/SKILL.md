---
name: color-taste
description: Colour rules in two tiers — INVARIANT (WCAG AA verified on every palette change, never meaning by hue alone, visible focus states, legibility over imagery fixed at the background layer against worst-case regions, contrast measured on the composited render rather than on the tokens) and DIALECT (auction-editorial's neutral dark-first base, smoky desaturated tones, accent as a setting, banned overused palettes, near-white/ink over photography, each with a yields-when). Use before defining any palette, colour token, accent, gradient, background, or text-over-image treatment.
---

# Colour Taste

Two tiers. The **invariants** are accessibility and legibility contracts — they
never yield to a brief. The **dialect** section is the house palette philosophy,
active when a Design Read selects
[auction-editorial](../../dialects/auction-editorial.md), and every rule in it
states when it yields.

---

## INVARIANT

### I1 — WCAG AA is a contract, verified on every palette change

Not once at the end. **Every change.**

| Content | Minimum |
|---|---|
| Body text, and anything under 18px | **4.5:1** |
| Large text (≥24px, or ≥19px bold) | **3:1** |
| UI boundaries, icons, focus rings, form borders | **3:1** |
| Disabled text | exempt, but never below 2.5:1 in practice |

- Dimmed ink ladders (`--ink-50` and friends) are for micro-labels and decoration
  only — check them, and if body copy uses one it still clears 4.5:1.
- Accent-as-background requires its paired text colour checked, both directions.
- **Report the measured ratios for every text/background pair you introduce.**

*Why:* a contract, because failing it is a defect rather than a stylistic
difference. Practically it's also a quality floor — contrast failures are the most
common reason a beautiful mock falls apart on a real screen in real light.

### I2 — Never encode meaning in hue alone

Anything colour communicates — status, category, validity, selection, severity —
is also carried by a label, icon, shape, position, or weight.

*Why:* roughly 1 in 12 men has a colour vision deficiency, and hue is also the
first thing lost to bad screens, glare, greyscale printing, and dark-mode
inversion. A hue-only signal is an unreadable signal for a predictable share of
your audience.

### I3 — Focus states are always visible

A ≥2px ring at ≥3:1 against both the element and the page. Never `outline: none`
without a stronger replacement.

*Why:* keyboard users navigate by focus. Removing the indicator doesn't simplify
the design; it removes the ability to use it.

### I4 — Legibility over imagery is fixed at the background layer

Text over a photograph or video must meet I1 **against the lightest (or darkest)
region it actually overlaps** — not against the image's average.

When it fails, fix the background, not the text. Escalate in order: reposition the
text into a quiet region → directional scrim → global darkening → a small
deliberate blur behind the text block → recrop or replace the image.

```css
.media-block { position: relative; isolation: isolate; }
.media-block::after {
  content: "";
  position: absolute; inset: 0; z-index: -1;
  background: linear-gradient(to top, #0e0f11e6 0%, #0e0f1199 45%, #0e0f1100 85%);
}
```

*Why:* photographic backgrounds are multi-hued and vary across the frame, so an
average-case check passes while the real overlap fails. Scrimming treats
legibility as an image-composition problem, which is what it is. Degrading the
text instead — adding shadows, outlines, or heavier weights — trades one defect
for another.

### I5 — The accent is derived, and the derivation is stated

An accent is never chosen. It is **derived from something the project actually
contains**, and the derivation is stated in one line before the palette is used.
An accent that cannot name its source is a default, and the default is whatever
the generating model reaches for.

Legitimate derivation routes, in no fixed order:

- an existing identity's own values, **measured** rather than eyeballed;
- the material or environment the subject lives in;
- **the hue the project's photography leaves unoccupied** — read the image set,
  find the clearest free chromatic territory, and take the accent there so it
  never competes with the subject.

**Derivation is necessary and not sufficient.** A correctly derived value can
still fail in place. After deriving, judge the accent **where it actually lands**
— on buttons, on prices, beside the subject — and replace it if it reads wrong,
recording that the derivation was sound and the result was not.

*Relationship to [I2](#invariant):* I2 forbids encoding meaning in hue alone. I5
adds the inverse check: a hue can **carry** unintended meaning from the domain. In
an automotive context green reads as electric or eco; in finance red reads as
loss; in medicine it reads as alarm. After deriving, test the accent against the
domain's existing colour conventions, not only against the composition.

**The three failure shapes, in the order they appear.** *No derivation* — a page
built without a declared palette returns near-black with a warm gold accent, which
is the generating model's default idea of premium and not a decision. *Derivation
without judgement* — a value taken correctly from an existing identity, corrected
for contrast, and still wrong in place, because it carries the register of the
category it came from. *Derivation from the image set* — reading the photography for
the clearest unoccupied chromatic territory and taking the accent there, which is
the only route of the three that produces a colour that both belongs and does not
compete.

### I6 — Contrast is measured on the composited render, not on the tokens

A palette that passes as a table of values still fails on the page. Two things
break the correspondence, and both were found by measuring rather than by reading:

- **Translucent layers.** A tint over a ground makes a *third* colour, and that is
  the one the text sits on. Reading `rgba(20,20,19,.055)` as if it were its own RGB
  is not a rounding error, it inverts the answer.
- **The glyph's own pixels.** Text over a photograph must be measured where the
  strokes actually land. A bounding box includes the gaps between words and the
  end of every line, so it reports the worst pixel in a rectangle the text does
  not occupy.

**Method.** Screenshot the page twice — once with the text layer hidden, once with
it visible — diff the two to find the pixels the glyphs cover, and measure those
against the ground beneath them. Composite every translucent layer between the text
and its first opaque ancestor before comparing.

**A scrim's AXIS is part of the composition, and it does not survive a reflow.**
Where the type sits beside its subject rather than under it, the fix belongs on the
horizontal — carrying the type's own column deep costs the photograph nothing,
where a bottom-up pass deep enough to do the same job flattens the subject as well.
That construction then depends on the column existing. Stacked, the type spans the
full width, a left-to-right pass falls *inside* the text instead of beside it, and
it separates nothing. **Re-measure at every format, and expect the answer to be a
different scrim rather than a deeper one** — a single gradient tuned until all
formats pass is how the subject gets flattened to rescue one breakpoint.

*Why:* the point of [I1](#invariant) is that contrast is a contract rather than an
intention. A contract checked against the wrong artefact is not checked — and a
responsive page has more than one artefact.

> **Evidence — measured on the author's own work, 360 Auto Care, 2026-07-30/31.**
> Two failures of two different kinds. A hero lead measured **2.06:1 against its
> bounding box and 4.12:1 against its actual glyph pixels** — the rectangle
> included a bright lamp the text never crossed; the true figure was still under
> AA, so the fix stood, but the number that would have justified it was wrong by a
> factor of two. Separately, an ink solved to **4.95:1 against the bare ground fell
> to 4.46:1** once the 5.5% tint of the chip it sat inside was composited — four
> hundredths under the floor, passing every check made against the tokens. On the
> same page a sweep of all 155 rendered text elements found the token table clean
> and the render not.
>
> **The axis clause, same project, 2026-08-17.** An interior page's head put the
> type in the left half with the lit subject on the right. A bottom-up scrim left
> the eyebrow at **2.57:1** against the 4.5 it owed; deepening it far enough
> flattened the building, which was the subject. A left-to-right pass fixed it at
> **7.46:1** and cost the photograph nothing — and then failed the stack, where the
> panel goes full-width and the pass lands inside the text: the lead measured
> **3.22:1**. Two constructions, one per format, rather than one gradient bullied
> into covering both. Four formats were measured; only the wide two shared an
> answer.
---

## DIALECT

*auction-editorial — strong defaults, each with a stated exit.*

Premium as chromatic restraint. Strong defaults, not laws.

### D1 — Neutral base, dark first, colour second

Build in this order and don't skip ahead: **base → ink → rules and surfaces →
accent.** Dark first: if the brief doesn't demand light, start dark and check
whether light is genuinely better.

```css
:root { /* dark base */
  --bg:        #0e0f11;  /* near-black, slightly warm — never #000 */
  --bg-raised: #16181b;  /* one step only; not a card stack */
  --ink:       #f2f1ee;  /* near-white, slightly warm — never #fff */
  --ink-70:    #f2f1eeb3;
  --ink-50:    #f2f1ee80;
  --rule:      #f2f1ee1f;
  --accent:    #6e7f76;  /* smoky sage — a setting, not a shout */
}
```

*Why:* pure `#000` and `#fff` are not neutral, they are *absent* — they flatten
shadow detail, buzz against each other, and are the default of anything
unconsidered. A slightly warm off-black/off-white reads as printed paper or
exposed film. Dark-first because a dark base makes desaturated colour look
expensive and enforces restraint, whereas a light base is forgiving of colour and
therefore tempts you into more of it.

`yields when:` the brand palette is established; the content needs a light reading
surface (long-form reading, print-parity documents, medical or educational
material); the sector has strong light-mode norms (healthcare, government,
education, finance); or ambient use conditions favour light (bright environments,
outdoor, projected). The off-black/off-white rule outlives the direction — avoid
pure black and pure white in either mode.

### D2 — Smoky and desaturated over saturated

Pull chroma down and mix a little of the base into anything entering the palette.

- Target ~8–25% HSL saturation, or `oklch` chroma ≈ `0.02–0.08`.
- Prefer colours reading as a *material or condition* — slate, sage, oxblood, ash,
  tobacco, bone — over colours reading as a *hue name*.
- Tint the neutrals toward the accent's hue rather than adding more colours.

```css
--accent-dim:  oklch(0.55 0.03 165);
--accent:      oklch(0.64 0.05 165);
--accent-lift: oklch(0.74 0.06 165);
```

*Why:* saturated colour dominates whatever it touches, so a saturated accent
becomes the design's whole identity — and identities built on a hue age badly.
Desaturated colour sits *inside* the neutral world, letting typography and spacing
carry the design. It's also more truthful: pigment, dye, and film rarely reach
digital saturation, so muted tones read as real materials. Dialect principle
[P7](../../dialects/auction-editorial.md#p7--materials-over-hues).

`yields when:` the brand is colour-led; the audience is young or the register is
playful, expressive, cultural, or experimental; colour must differentiate at a
glance (wayfinding, categorical data, status systems); or the medium eats chroma
(projection, print on uncoated stock, low-quality screens) and needs headroom.

> **Counter-evidence (Gentlewoman) reviewed and dismissed** — the example fails as
> a whole; an attribute observed inside a failed composition does not amend a rule.
> Logged 2026-07-25.

### D3 — Accent is a setting, not an identity

Budget: **under ~5% of visible pixels**, in a small number of named roles decided
up front (e.g. primary action + active state + one editorial mark). Everything
else neutral. Never accent body text, accent headings, accent section
backgrounds, accent borders everywhere, or accent-on-accent.

*Why:* accent works by scarcity — its job is to mark where meaning concentrates.
Spread across many roles it signals nothing and the eye loses the one reliable cue
for where to act. Constraining it also makes a theme swap a token change rather
than a redesign. Dialect principle
[P6](../../dialects/auction-editorial.md#p6--colour-is-a-setting-not-an-identity).

`yields when:` identity is genuinely colour-led; colour carries meaning at scale
(status, categories, data visualisation, wayfinding); or the palette is one
saturated colour against an otherwise monochrome world, where the restraint is
structural rather than chromatic.

### D4 — The banned palettes

Avoid these as *pairings*. They are the statistical default of generated design,
so they read as machine-made regardless of execution quality:

- **Cream + terracotta** (`#faf6f0` + `#c4693d`) and the warm earthy-startup family
- **Black + acid green** (`#000` + `#c8ff00`/`#39ff14`) and its acid siblings
- **Purple→blue gradient** as an identity (the SaaS default)
- **Teal + coral**, **navy + gold "luxury"**, **beige + sage wellness** as literal
  pairings rather than considered desaturated palettes
- Neon-on-dark "cyber" palettes; glow/bloom standing in for depth

Where a brief seems to call for one, deliver the adjacent *considered* version:
keep the temperature, drop the saturation, change the ratio, let the neutral work.

*Why:* taste is partly negative knowledge. These aren't ugly in isolation — they
are exhausted, and an exhausted palette makes original work look derivative.
Avoiding them is the cheapest available differentiation.

`yields when:` the palette is brand-mandated (then execute it with a structural
difference instead — layout, type, and space do the differentiating); the sector
genuinely owns the pairing and the audience reads it as competence rather than as
cliché; or the reference is deliberate and legible as such (period work, pastiche,
homage). A trope executed with a real structural idea is no longer the trope.

### D5 — Text over photography is near-white or ink

Over any image or video, text is `--ink` (near-white) or `--ink-inverse`
(near-black). Not an accent colour, not a hue borrowed from the photo.

*Why:* coloured text over photography fails twice — photographic backgrounds are
multi-hued so hue-on-hue is unstable across the frame, and accent over imagery
reads as a caption sticker rather than a statement. Near-white/ink is the only
pair holding legibility over an arbitrary background.

`yields when:` the brand mandates a colour there and the art direction supports it
(a controlled, flat-toned or duotone image, not an arbitrary photograph); or the
type layer is itself the art direction — deliberate editorial colour-on-image,
where the image has been chosen or graded for it. **I4 still binds:** whatever the
colour, it meets AA against the worst-case region it overlaps, and the fix stays
at the background layer.

---

## Checklist

**Invariant — every deliverable**
- [ ] Every text/background pair measured; ratios stated in the report.
- [ ] No meaning carried by hue alone.
- [ ] Focus rings visible at ≥3:1 against element and page.
- [ ] Text over media checked against worst-case overlap; fixed with a scrim.
- [ ] Accent derived from something the project contains, derivation stated in one
      line, then judged where it lands and against the domain's colour conventions.

**Dialect — when auction-editorial is active**
- [ ] Base is off-black or off-white; no `#000`, no `#fff`.
- [ ] Built base → ink → rules → accent, in order.
- [ ] Accent desaturated (chroma ≤ ~0.08) and under ~5% of pixels.
- [ ] No banned pairing, or a named structural differentiation.
- [ ] Text over media is near-white or ink.
- [ ] Any yield above is named in the report with its condition.

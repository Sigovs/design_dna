---
name: color-taste
description: Alex's colour rules — chromatic restraint, neutral dark or light bases, smoky desaturated accents used as a setting rather than an identity, banned AI-default palettes, near-white or ink only for text over photography, and WCAG AA verified on every palette change. Use before defining any palette, colour token, accent, gradient, background, or text-over-image treatment.
---

# Colour Taste

**Position: premium is chromatic restraint.** Cheap design announces itself with
colour. Expensive design establishes a neutral world and then admits one colour
into it, quietly. The accent is a **setting**, not an identity.

---

## 1. Neutral base, dark first, colour second

Build the palette in this order, and do not skip ahead:

1. **Base** — a neutral, either dark or light. Dark first: if the brief doesn't
   demand light, start dark and see whether light is genuinely better.
2. **Ink** — the text colour and its opacity ladder.
3. **Rules and surfaces** — hairlines, and at most one raised surface.
4. **Accent** — last, and only if the design still needs something.

```css
:root { /* dark base */
  --bg:        #0e0f11;  /* near-black, slightly warm-neutral — never #000 */
  --bg-raised: #16181b;  /* one step only; not a card stack */
  --ink:       #f2f1ee;  /* near-white, slightly warm — never #fff */
  --ink-70:    #f2f1eeb3;
  --ink-50:    #f2f1ee80;
  --rule:      #f2f1ee1f;  /* hairlines live here */
  --accent:    #6e7f76;    /* smoky sage — a setting, not a shout */
}
```

**Rationale.** Pure `#000` and `#fff` are not neutral, they are *absent* —
they flatten shadow detail, buzz against each other, and are the default of
anything unconsidered. A slightly warm off-black/off-white reads as printed
paper or exposed film. Dark-first because a dark base makes desaturated colour
look expensive and forces restraint (loud colour on dark instantly looks
neon/gaming), whereas a light base is forgiving of colour and therefore tempts
you into more of it.

---

## 2. Smoky and desaturated over saturated

Any colour that enters the palette gets its chroma pulled down and, usually, a
little of the base mixed into it.

- Target roughly **8–25% saturation** in HSL terms, or `oklch` chroma ≈
  `0.02–0.08`. Above that, justify it in the report.
- Prefer colours that read as a *material or condition* — slate, sage, oxblood,
  ash-blue, tobacco, bone — over colours that read as a *hue name*.
- Tint the neutrals toward the accent's hue rather than adding more colours.
  That is how a palette becomes coherent instead of assembled.

```css
/* good: one hue, chroma held low, expressed as a range */
--accent-dim:  oklch(0.55 0.03 165);
--accent:      oklch(0.64 0.05 165);
--accent-lift: oklch(0.74 0.06 165);
```

**Rationale.** Saturated colour dominates whatever it touches, so a saturated
accent becomes the design's entire identity — and identities built on a hue age
badly and read as branding-by-default. Desaturated colour sits *inside* the
neutral world, which lets typography and spacing carry the design while colour
sets mood. Physically it's also more truthful: pigment, dye, and film rarely hit
digital saturation, so muted tones read as real materials.

---

## 3. Accent is a setting, not an identity

Budget for accent colour: **under ~5% of visible pixels**, and it appears in a
small number of named roles you decide up front (e.g. *primary action + active
state + one editorial mark*). Everything else is neutral.

Never: accent-coloured body text, accent headings, accent section backgrounds,
accent borders everywhere, accent icons throughout, accent-on-accent.

**Rationale.** Accent works by scarcity — its only job is to mark where meaning
concentrates. Spread across many roles it stops signalling anything and becomes
decoration, and the eye loses the one reliable cue for where to act. Constraining
accent also means a rebrand or a theme swap is a token change, not a redesign.

---

## 4. Banned palettes — the AI-default looks

These are hard bans. They are banned because they are the statistical default of
generated design, so they read as "made by a machine" regardless of execution
quality:

- **Cream + terracotta** (`#faf6f0` + `#c4693d` and neighbours) — the whole warm
  earthy-startup family.
- **Black + acid green** (`#000` + `#c8ff00`/`#39ff14`) and its acid siblings.
- **Purple-to-blue gradient** as the identity (the SaaS default).
- **Teal + coral**, **navy + gold "luxury"**, **beige + sage wellness** as a
  literal pairing rather than a considered desaturated palette.
- Neon-on-dark "cyber" palettes, and any glow/bloom effect standing in for depth.

If a brief seems to call for one of these, deliver the adjacent
*considered* version: keep the temperature, drop the saturation, change the
ratio, and make the neutral do the work.

**Rationale.** Taste is partly negative knowledge. These combinations are not
ugly in isolation — they are exhausted, and an exhausted palette makes original
work look derivative. Avoiding them is the cheapest available differentiation.

---

## 5. Text on photography: near-white or ink only

Over any image or video: text is **near-white** (`--ink`) or **near-black**
(`--ink-inverse`). Never an accent colour. Never a hue borrowed from the photo.

If contrast fails, **fix the image, not the text**:

```css
.media-block { position: relative; isolation: isolate; }
.media-block::after {          /* scrim: directional, tuned to where the text sits */
  content: "";
  position: absolute; inset: 0; z-index: -1;
  background: linear-gradient(to top, #0e0f11e6 0%, #0e0f1199 45%, #0e0f1100 85%);
}
```

Escalation ladder, in order: reposition the text into a quiet region → directional
scrim → global darkening (max ~40%) → a small, deliberate blur behind the text
block → recrop or replace the image. Blanket 60% black over a photograph means
the photograph was the wrong choice.

**Rationale.** Coloured text over photography fails twice: photographic
backgrounds are multi-hued so a hue-on-hue relationship is unstable across the
frame, and accent colour over imagery reads as a caption sticker rather than a
statement. Near-white/ink is the only pair that holds legibility across an
arbitrary background. Scrimming is honest — it treats legibility as an
image-composition problem, which is what it is.

---

## 6. WCAG AA is a contract, not a preference

**Verify ratios on every palette change.** Not once at the end — every change.

| Content | Minimum |
|---|---|
| Body text, and anything under 18px | **4.5:1** |
| Large text (≥24px, or ≥19px bold) | **3:1** |
| UI boundaries, icons, focus rings, form borders | **3:1** |
| Disabled text | exempt, but never below 2.5:1 in practice |

Rules that follow from the contract:
- Dimmed ink (`--ink-50` and friends) is for micro-labels and decoration only —
  check it, and if body copy uses it, it must still clear 4.5:1.
- Accent-as-background needs its *paired text colour* checked, both directions.
- Focus states are always visible: a ≥2px ring at ≥3:1 against both the element
  and the page. Never `outline: none` without a stronger replacement.
- Text over images: check against the *lightest* pixel region the text overlaps,
  not the average.
- Never encode meaning in hue alone — pair colour with a label, icon, or weight.

Report the measured ratios for every text/background pair you introduce.

**Rationale.** A contract, because failing it is a defect rather than a
stylistic difference — and because a desaturated palette makes it easy to drift
into pretty-but-illegible territory without noticing. Practically, AA is also a
quality floor: contrast failures are the most common reason a beautiful mock
falls apart on a real screen in real light.

---

## Checklist

- [ ] Base is a neutral off-black or off-white; no `#000`, no `#fff`.
- [ ] Palette was built base → ink → rules → accent, in that order.
- [ ] Accent is desaturated (chroma ≤ ~0.08) and under ~5% of pixels.
- [ ] Zero banned AI-default combinations.
- [ ] All text over media is near-white or ink, with a scrim if needed.
- [ ] Every text/background pair measured; ratios stated in the report.
- [ ] Focus rings visible at ≥3:1; no meaning carried by hue alone.

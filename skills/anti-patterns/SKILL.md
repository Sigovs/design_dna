---
name: anti-patterns
description: Alex's hard bans for visual work — AI-default palettes and layouts, gradient buttons, decorative shadows, boxes where open air and thin rules would work, underlined nav links, repeated primary CTAs, imagery hidden on mobile, horizontal page scroll, magic numbers instead of tokens, and template-looking output. Use as a final gate before shipping any visual work, and whenever choosing between a container and open air.
---

# Anti-Patterns — Hard Bans

These are **bans**, not preferences. They outrank every other skill in this
repo. If a ban and a brief conflict, solve the brief a different way; if a ban
and your own instinct conflict, the ban wins.

Run this file as a gate before declaring visual work finished. Any violation
that survives must be named explicitly in the report under *Known compromises*,
with the external constraint that forced it. Silent violations are the failure
mode this file exists to prevent.

---

## 1. AI-default looks

**Banned:** cream + terracotta; black + acid green; purple→blue SaaS gradient
identity; teal + coral; navy + gold "luxury"; beige + sage wellness; neon-on-dark
cyber; glow/bloom standing in for depth. Also the structural defaults: the
three-icon feature triptych, the centred hero with a subtitle and two buttons,
the full-bleed stock photo with centred white text, the emoji-as-icon system.

**Why:** these are the statistical centre of generated design. Executing one well
still reads as "machine-made", which is the one impression this whole DNA exists
to avoid. See [color-taste](../color-taste/SKILL.md) §4 for the considered
alternatives.

**Instead:** keep the temperature, drop the saturation, break the symmetry, and
let type and space carry the identity.

---

## 2. Gradient buttons

**Banned:** any gradient fill on an interactive control. Also gradient text,
gradient borders, gradient icon fills, and animated gradient backgrounds.

**Why:** a gradient button is the single most reliable date-stamp on a design
(2014 iOS, 2021 SaaS) and it fights legibility, since the label's contrast ratio
varies across its own background. Buttons need a *flat, verifiable* surface.

**Instead:** solid accent fill, or ink-on-transparent with a 1px rule. One
primary style, one secondary, one ghost. That is the whole system. A single large
gradient may exist as an atmospheric background *behind* content — never on it,
and never as the brand's identity.

---

## 3. Decorative shadows

**Banned:** `box-shadow` used for prettiness — soft glows under cards, ambient
drop shadows on static blocks, layered "elevation" on things that never rise,
`text-shadow` on headings, coloured shadows.

**Why:** a shadow is a claim about physical elevation. When nothing is actually
above anything, the shadow is a lie the eye detects as mush, and it's the
fastest way to make a crisp layout look like a slide template.

**Instead:** hierarchy from space, scale, and hairline rules. Shadow is permitted
only on genuinely floating, temporary layers — dropdown, popover, modal, drag
preview — where it must be tight and neutral:
`0 8px 24px -8px rgb(0 0 0 / 0.4)`. For text over images, use a scrim
([color-taste](../color-taste/SKILL.md) §5), never a text shadow.

---

## 4. Boxes where open air + thin rules work

**Banned as the default:** wrapping content in a bordered/filled card because it
"needs structure". Nested boxes, boxed spec tables, boxed testimonials, boxed
stats, boxed form sections, panel-in-panel.

**Why:** a box is a heavy, permanent separator used to fix a problem that is
almost always insufficient spacing. Boxes also multiply — one card invites a grid
of cards, and a grid of cards is the template look. Editorial layouts group with
proximity and separate with a hairline, which is lighter and more precise.

**Instead:** ranked by preference — (1) whitespace alone, per
[spacing-taste](../spacing-taste/SKILL.md); (2) a 1px hairline rule; (3) a
subtle background shift with **no** border; (4) an actual bordered card, only
when the element is independently interactive or genuinely reorderable. Prove
step 1 fails before moving down.

---

## 5. Underlined nav links

**Banned:** `text-decoration: underline` on navigation, buttons, tabs, logos, or
card titles. Also underline-on-hover as a nav's only affordance.

**Why:** the underline means "inline link inside prose". Applying it to nav
dilutes that meaning and adds visual noise to a row of items that the eye should
scan as a set. Nav items are already understood as links by position.

**Instead:** nav state via ink opacity (dimmed → full), a short rule *offset*
below the active item, or a mono uppercase treatment
([typography-taste](../typography-taste/SKILL.md) §3). **Inline links inside body
copy must stay underlined** — use `text-underline-offset: 0.2em` and
`text-decoration-thickness: 1px`. Removing those is the opposite bug.

---

## 6. More than one primary CTA, repeated in a grid

**Banned:** the same filled primary button appearing on every card in a grid or
several times down a page. Also two primary buttons side by side.

**Why:** "primary" is a ranking, and a ranking with N winners has no winner —
repetition converts a decision point into wallpaper, and the eye stops seeing
it. It also usually indicates the page has no single intended next action, which
is a content problem wearing a visual costume.

**Instead:** one primary action per view. Repeated items get a text link, a
whole-card click target, or a chevron. Decide the page's one action; everything
else is secondary or ghost.

---

## 7. Hiding imagery on mobile

**Banned:** `display: none` on photography, illustration, charts, or diagrams at
small widths. Same for hiding data columns rather than restructuring them.

**Why:** mobile is usually the majority of real traffic, so hiding the imagery
means most people never see the design — they see a wireframe of it. It also
signals the layout was designed at desktop width and never re-composed.

**Instead:** re-compose. Recrop to a portrait or square aspect, move the image
above the text, go edge-to-edge, or reduce resolution. Tables become spec plates
([typography-taste](../typography-taste/SKILL.md) §4). Purely decorative
flourishes may be dropped — but if it can be dropped on mobile, ask whether it
should exist at all.

---

## 8. Horizontal page scroll

**Banned:** any horizontal overflow on the document at any viewport width,
including the 320px case. Usually caused by a `100vw` element inside a padded
parent, an unconstrained image, a wide table, or a long unbroken string.

**Why:** it is unambiguously a bug — content becomes unreachable and the page
feels broken and untrustworthy, undoing every other quality signal.

**Instead:**

```css
html, body { overflow-x: clip; }        /* the safety net, not the fix */
img, svg, video { max-width: 100%; height: auto; }
.wide-content { overflow-x: auto; }     /* deliberate, scoped, inside its own container */
```

Intentional horizontal scrolling is fine *inside* a bounded container (a table,
a code block, a filmstrip) as long as the page itself never moves. Verify at
320px before shipping.

---

## 9. Magic numbers instead of tokens

**Banned:** any raw spacing, size, duration, colour, or radius value in a
component. `margin-top: 37px`, `#3a3a3a`, `transition: 0.3s`, `font-size: 19px`.

**Why:** untokenised values destroy the rhythm that carries the taste
([spacing-taste](../spacing-taste/SKILL.md) §2), and they make a global change
impossible — which guarantees the design decays as soon as anyone else edits it.
A one-off value is also usually a symptom: it means a layout is being nudged
instead of composed.

**Instead:** every value resolves to a token. If the token you need doesn't
exist, either you're wrong about the value or the scale needs a documented
addition — pick one and say which in the report. Exceptions: `1px` hairlines,
`0`, and `100%`/`100vh`-class values.

---

## 10. Template-looking anything

The catch-all, and the one that requires judgment. **Banned:** output that could
be swapped into an unrelated product without noticing. Symptoms: everything
centred; every section the same height and rhythm; icons for concepts that don't
need icons; equal-weight 3- or 4-column grids repeated down the page; generic
copy in the layout ("Powerful features", "Built for teams"); rounded corners on
everything at the same radius; a header, hero, features, testimonials,
CTA, footer sequence with nothing else.

**Why:** template design isn't badly executed, it's *anonymous* — and anonymity
is the actual failure. Every prior in a generative model points at the average,
so avoiding the average requires deliberate effort on every deliverable.

**Instead:** make at least one structural decision that is specific to this
content — asymmetric grid, an oversized number, a full-bleed image against a
narrow text column, one section that breaks the established rhythm on purpose,
type at a size the template wouldn't dare. One committed move beats ten safe
ones. If you can't name what makes the output specific to *this* project, it
isn't finished.

---

## The gate

Before shipping, confirm all ten:

- [ ] No banned palette or default layout archetype.
- [ ] No gradient on any interactive control; no gradient text.
- [ ] No decorative shadows; shadows only on truly floating layers.
- [ ] Every box justified — whitespace and hairlines were tried first.
- [ ] No underlined nav; inline prose links *are* underlined.
- [ ] Exactly one primary CTA per view.
- [ ] All imagery present and re-composed on mobile.
- [ ] Zero horizontal page scroll at 320px.
- [ ] Zero magic numbers; every value is a token.
- [ ] At least one structural decision specific to this content, nameable in one line.

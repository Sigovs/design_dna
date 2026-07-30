---
name: anti-patterns
description: Failure modes in two tiers — INVARIANT universal failures (weak hierarchy, inaccessible contrast, gratuitous motion, arbitrary spacing, inconsistent tokens, uncounted persistent overlays, competing art directions inside one page, horizontal page scroll, content parity across viewports, controlled irregularity that stops being legible or intentional, and depth cues incoherent with the spatial model they imply) and DIALECT trope bans (AI-default looks, gradient buttons, decorative shadows, boxes-for-boxes, underlined nav, repeated primary CTAs, imagery hidden on mobile, the default Spline aesthetic, ambient motion behind body copy, template anonymity — each with a yields-when). Use as the final gate before shipping any visual work, and whenever choosing between a container and open air.
---

# Anti-Patterns

Two tiers, and the distinction matters more here than anywhere else in this repo.

**INVARIANT failures are defects.** They make work worse for everyone, in every
aesthetic. They never yield to a brief; a brief that requires one has specified a
bug.

**DIALECT bans are aesthetic positions** — personal dislikes and overused tropes.
They are strong defaults inside
[auction-editorial](../../dialects/auction-editorial.md), each with a stated
`yields when:`. A dialect ban set aside for its stated condition is correct
practice. Set aside silently, it is drift.

Run this file as the final gate. Any invariant violation that survives must be
named in the report under *Known compromises* with the external constraint that
forced it. Any dialect yield must be named under *Dialect yields* with its
condition.

---

## INVARIANT

*Universal failures — defects in every aesthetic.*

### U1 — Weak hierarchy

Rank is ambiguous: nothing is clearly first, or several things claim to be. The
symptoms — everything centred, every section the same visual weight, ranks
separated by 2px, emphasis applied so widely it stops being emphasis.

*Why it's universal:* hierarchy is the interface to content. When it's ambiguous
readers serialise — reading everything to find out what matters — which is the most
expensive failure a layout can cause, and it happens before anyone forms an
aesthetic opinion.

**Includes: emphasis must encode ranking truthfully.** If three things carry
identical primary emphasis, the design is claiming three firsts. Either they
genuinely are peers (then the emphasis is honest — see D6) or the ranking is
broken.

### U2 — Inaccessible contrast

Any text, control boundary, focus ring, or meaningful graphic below the AA ratios
in [color §I1](../color-taste/SKILL.md#invariant). Also: meaning carried by hue
alone, and invisible focus states.

*Why it's universal:* it makes the work unusable for a predictable share of the
audience, and marginal for everyone else in bright light or on a bad screen. It is
measurable, so it is never a matter of opinion.

### U3 — Gratuitous motion

Animation with no communicative job: decorative loops, movement in the periphery
of reading content, entrance animations on everything, motion that delays input.
Plus the hard failures — animating layout properties, non-interruptible
animations, and any animation with no reduced-motion path.

*Why it's universal:* movement is involuntarily attention-capturing. Motion that
communicates nothing spends the user's attention and returns nothing, and for
motion-sensitive users it causes physical symptoms.

### U4 — Arbitrary spacing

Gaps chosen by nudging rather than by decision: uniform gaps where grouping is
needed, internal gaps equal to or larger than external gaps, spacing that
collapses to zero at small widths, text running to the viewport edge.

*Why it's universal:* proximity encodes grouping pre-attentively. Arbitrary gaps
don't just look unconsidered — they actively assert wrong relationships.

### U5 — Inconsistent tokens

Raw values in components: `margin-top: 37px`, `#3a3a3a`, `transition: 0.3s`,
`font-size: 19px`. Two scales in one system. A token defined and then bypassed.

*Why it's universal:* untokenised values destroy the rhythm that carries any
aesthetic, and make global change impossible — so the design decays as soon as
anyone else edits it. A one-off value is also a symptom: it means a layout is being
nudged instead of composed. Exceptions: `1px` hairlines, `0`, and
`100%`/`100vh`-class values.

### U6 — Horizontal page scroll

Any horizontal overflow on the document at any viewport width, including 320px.

```css
html, body { overflow-x: clip; }        /* safety net, not the fix */
img, svg, video { max-width: 100%; height: auto; }
.wide-content { overflow-x: auto; }     /* deliberate, scoped, inside its container */
```

Intentional horizontal scrolling *inside* a bounded container — a table, a code
block, a filmstrip — is fine as long as the page itself never moves.

*Why it's universal:* content becomes unreachable and the page reads as broken,
undoing every other quality signal. It is unambiguously a bug.

### U7 — Content parity across viewports

No content-bearing element is removed to avoid re-composing the layout. Not
imagery that carries information, not data columns, not context. Re-compose
instead: recrop, reorder, restructure a table into stacked records.

Purely decorative elements may be dropped — but if it can be dropped, ask whether
it should exist at all (U1).

*Why it's universal:* mobile is usually the majority of real traffic, so removing
content there means most people never see the design — they see a reduction of it.
Hiding rather than re-composing is a layout that was designed at one width and
never finished.

### U8 — Controlled irregularity must remain legible and intentional

Irregularity — broken grids, unexpected scale jumps, asymmetry, deliberate
misalignment, overlap, rule-breaking composition — is legitimate and often
excellent. It has exactly two obligations:

- **Legible.** The reading order, grouping, and rank still survive it. A reader
  can tell what to read first and what belongs with what.
- **Intentional.** It reads as a decision, not as an accident or a bug. The
  distinction is usually consistency of the break: an irregularity that recurs
  with its own logic reads as designed; a single unexplained misalignment reads as
  a mistake.

*Why it's universal:* this is the floor that makes expressive work possible rather
than the ceiling that prevents it. It bans neither disruption nor density nor
novelty — only illegibility and accident. Any aesthetic can meet it.

> **The related preference is a dialect rule, not an invariant.** *Prefer one
> measured compositional disruption over continuous novelty* lives in
> [auction-editorial P4](../../dialects/auction-editorial.md#p4--one-committed-gesture-beats-several-safe-ones)
> and yields when an expressive, experimental, cultural, or youth-oriented brand
> benefits from a more continuously disruptive visual language. A continuously
> disruptive design is fully permitted by U8 — it just has to stay legible and
> deliberate.

### U9 — Depth cues are coherent with the spatial model they imply

**Visual depth cues must be coherent with the spatial model they imply. Interface
elevation cues must correspond to actual interface layering; atmospheric,
illustrative, or volumetric depth may be non-literal when clearly intentional and
not misleading.**

So: a shadow, an overlap, or a blur that claims one element sits above another
must be telling the truth about the layer order — a modal casts a shadow because it
*is* above the page, and two elements at the same level don't cast shadows on each
other. Inconsistent elevation across a system (a card at rest reading as higher
than an open dropdown) is the failure this catches.

Atmospheric and illustrative depth is exempt from literalism: a gradient sky, a
depth-of-field photograph, a volumetric illustration, a 3D scene, or a hero with
receding haze may imply space that has no counterpart in the interface's layer
stack. What they may not do is mislead — depth that reads as an interactive
elevation cue, or that obscures which element is actually on top, is a defect
regardless of how decorative its intent was.

*Why it's universal:* depth is a spatial claim, and the eye resolves it
pre-attentively to work out what is on top, what is reachable, and what is
currently active. When the claim contradicts the real structure, users
mis-target and mis-read state — a cost paid in interaction errors, not in taste.
The exemption exists because pictorial and atmospheric depth is a different
language, understood as imagery rather than as structure.

> **Taste is separate and lives in the dialect.** Whether decorative shadows are
> used at all — and how restrained they should be — is
> [D3](#d3--decorative-shadows), with its own yields-when. **This invariant governs
> spatial coherence; the dialect governs taste.** A Material-Design surface full of
> elevation is fine under U9 as long as its elevations are truthful.

### U10 — Anything permanently on screen is part of the composition

**An element that is always present — sticky header, floating navigation, cookie
bar, chat bubble, cart drawer, custom cursor, scroll indicator — is a mass, and it
is counted in the mass scheme and in the first-screen budget
([C15](../academic-composition/SKILL.md#invariant)) like any other.**

Two failures follow, both defects:

- **Uncounted.** The layout is composed, then the persistent layer is added, so it
  lands wherever it lands — usually on the corner the composition was using as
  release, or on top of the content an anchor jump just scrolled to.
- **Stacked.** Two or more persistent overlays over content at once. Each was
  defensible alone; together they occupy the page, and the visitor's first act is
  dismissal rather than reading.

*Why it is universal:* these elements are exempted from review by convention —
they arrive from a consent vendor, a support widget, a framework default, or a
component library, and no one composes them. The result is that the most
consistently visible part of the interface is the least designed part of it. The
cost is not taste; it is the first screen, which is the only one most visitors see.

*Satisfying it:* name every persistent element in the mass scheme before layout;
allow **one** overlay over content at a time; give anchor targets scroll-margin
equal to the sticky mass; and check the first screen at a real viewport height with
every persistent layer present, not with them mocked away.

> **Evidence — distilled from the vault, 2026-07-30.** `vault/ciridae-com`
> (3, in) — *"cookie panel и floating chat одновременно перекрывают значительную
> часть страницы"*, recorded against an entry whose composition is otherwise
> rated a reference; `vault/augen-pro` (2, hybrid) — floating capsule navigation
> plus a custom cursor, both noted as pattern-recognisable overlay rather than
> authored structure; `vault/rmsothebys-com` (1, out) — *"the carousel arrows are
> large chrome overlays on the photograph."*

### U11 — Competing art directions inside one page

**One page is one authored whole.** When sections stop belonging to the same
direction, the page is several designs sharing a URL — and the reader pays for it
even though every individual section reviews well.

Symptoms, in the order they are usually visible:

- **Every section introduces a new signature device** — a marquee here, an outlined
  badge there, a diagonal wipe below, each one arriving once and never returning.
- **Unrelated background systems** — a photographic field, then a flat tint, then a
  gradient, then a pattern, with nothing establishing which is the page's ground.
- **Typography voice drift** — a face, width, casing or tracking regime that changes
  at section boundaries without a reason ([typography I8](../typography-taste/SKILL.md#invariant)).
- **Inconsistent image treatment** — graded here, full-colour there, cut-out below;
  different crops logics; some bleeding, some inset, with no rule.
- **Border, radius, depth or motion logic changing without conceptual
  justification** — hairlines then heavy strokes; 0px then 16px radii; flat then
  elevated; crossfade then slide.
- **Locally attractive sections that do not form one whole** — the diagnostic
  symptom, and the reason this failure survives review: it is invisible section by
  section, and only appears when the page is seen at once.

*Why it's universal:* readers build a model of the page's language in the first two
screens and use it to interpret everything after. Every unexplained change spends
that model, and once it is gone, nothing on the page is read as intentional — the
work reads as assembled rather than authored, in any aesthetic.

**This is not a demand for uniformity, and it is the opposite failure to
[D10](#dialect).** D10 is anonymity — a page so consistent it could belong to
anything. U11 is incoherence. Between them sits the intended state: one language,
developed, with departures that mean something
([C7](../academic-composition/SKILL.md#invariant)).

**Where it is caught and corrected** — this rule diagnoses; the mechanisms already
exist and are not restated here:

| Mechanism | What it does |
|---|---|
| [Section-language ledger](../../TASTE.md#2c-selection-coherence-and-device-discipline) | Makes the drift visible: one row per section, seven columns, read down |
| [Device budget](../../TASTE.md#2c-selection-coherence-and-device-discipline) | Stops the next single-use device from entering |
| [Selection Pass](../../TASTE.md#2c-selection-coherence-and-device-discipline) | Forces each change to name what it strengthens |
| [C2](../academic-composition/SKILL.md#invariant) · [unity-and-plastic-connection](../academic-composition/references/unity-and-plastic-connection.md) | The compositional altitude: unity, plastic connection, the repair order |
| [Composition critic](../../TASTE.md#2b-the-critique-panel) | Asks directly whether any section belongs to a different art direction |

---

## DIALECT

*auction-editorial trope bans — aesthetic positions with stated exits.*

Personal aesthetic positions. Strong defaults with stated exits.

### D1 — AI-default looks

**Avoided:** cream + terracotta; black + acid green; purple→blue SaaS gradient
identity; teal + coral; navy + gold "luxury"; beige + sage wellness; neon-on-dark
cyber; glow/bloom as depth. Plus the structural defaults — the three-icon feature
triptych, the centred hero with subtitle and two buttons, the full-bleed stock
photo with centred white text, emoji-as-icon-system.

*Why:* these are the statistical centre of generated design. Executing one well
still reads as machine-made, which is the impression this DNA exists to avoid.

`yields when:` the palette or archetype is brand-mandated; the sector genuinely
owns it and the audience reads it as competence rather than cliché; the reference
is deliberate and legible as such (period work, homage, pastiche); or the archetype
is the most usable answer for the audience — a centred hero with one clear action
is a good landing page for a low-context audience. **Then differentiate
structurally instead**: keep the archetype, change the grid, the type, or the space.

### D2 — Gradient buttons

**Avoided:** gradient fills on interactive controls; gradient text; gradient
borders; gradient icon fills; animated gradient backgrounds.

*Why:* a gradient button is the most reliable date-stamp on a design (2014 iOS,
2021 SaaS), and it fights legibility — the label's contrast varies across its own
background. Controls need a flat, verifiable surface. Preferred instead: solid
accent fill, or ink-on-transparent with a 1px rule. One primary, one secondary, one
ghost.

`yields when:` the brand identity is genuinely gradient-led, or the control is part
of a deliberately expressive surface where flatness would read as broken.
**Invariant floor:** the label must clear AA against the *worst* point of its own
background (U2) — a gradient control that only passes at its lightest stop is a
defect, not a yield.

A single large gradient as atmosphere *behind* content was never banned.

### D3 — Decorative shadows

**Avoided:** `box-shadow` for prettiness — soft glows under cards, ambient drops on
static blocks, layered "elevation" on things that never rise, `text-shadow` on
headings, coloured shadows.

*Why:* a shadow is a claim about physical elevation. When nothing is above
anything, the shadow is a claim the eye detects as mush, and it's the fastest way to
make a crisp layout look like a slide template. Preferred instead: hierarchy from
space, scale, and hairlines. Shadow is fine on genuinely floating, temporary layers
— dropdown, popover, modal, drag preview — kept tight and neutral:
`0 8px 24px -8px rgb(0 0 0 / 0.4)`.

`yields when:` the design language is explicitly material/elevation-based (Material
Design and its descendants), the brand uses depth as a signature, or a platform
convention expects it (native-feeling mobile surfaces). Yielding here changes how
much shadow is tasteful, not whether it may lie: [U9](#u9--depth-cues-are-coherent-with-the-spatial-model-they-imply)
still binds, so elevation must correspond to actual layering.

For text over images, use a scrim ([color §I4](../color-taste/SKILL.md#invariant)),
never a text shadow — that one is an invariant, not a preference.

### D4 — Boxes where open air and thin rules work

**Avoided as the default:** wrapping content in a bordered or filled card because it
"needs structure". Nested boxes, boxed spec tables, boxed testimonials, boxed
stats, boxed form sections, panel-in-panel.

*Why:* a box is a heavy, permanent separator applied to a problem that is usually
insufficient spacing. Boxes also multiply — one card invites a grid of cards, and a
grid of cards is the template look. Preferred order: (1) whitespace alone;
(2) a 1px hairline; (3) a subtle background shift with no border; (4) an actual
bordered card.

`yields when:` the information environment is dense and boundaries aid scanning
(dashboards, admin, comparison tables); the element is independently interactive,
selectable, draggable, or reorderable — then a container communicates its edges
honestly; accessibility calls for explicit region boundaries; or the content is
user-generated and unpredictable, where a container prevents collisions air can't.

### D5 — Underlined nav links

**Avoided:** `text-decoration: underline` on navigation, buttons, tabs, logos, or
card titles; underline-on-hover as a nav's only affordance.

*Why:* the underline means "inline link inside prose". On nav it dilutes that
meaning and adds noise to a row the eye should scan as a set. Nav items are already
understood as links by position. Preferred instead: ink opacity (dimmed → full), a
short rule offset below the active item, or a mono uppercase treatment.

`yields when:` the audience or standard requires maximum affordance clarity —
public-sector and government systems (GOV.UK style), low-vision-first design, or
any context where users may not recognise position-as-affordance. Then underline
everything clickable and accept the noise.

**Not covered by this ban, and invariant:** inline links inside body copy stay
underlined, and are distinguishable by more than colour (U2). Use
`text-underline-offset: 0.2em` and `text-decoration-thickness: 1px`. Removing
those is the opposite bug.

### D6 — More than one primary CTA, repeated in a grid

**Avoided:** the same filled primary button on every card in a grid, or several
times down a page; two primary buttons side by side.

*Why:* repetition converts a decision point into wallpaper and the eye stops seeing
it. It usually also indicates the page has no single intended next action.
Preferred instead: one primary action per view; repeated items get a text link, a
whole-card click target, or a chevron.

`yields when:` the choices are genuinely parallel and the user must pick one —
pricing tiers, plan selection, account types, language pickers. There, identical
emphasis is *honest*, and demoting all but one would misrepresent the choice.
**Invariant floor:** emphasis must encode ranking truthfully (U1). Parallel
choices with parallel emphasis satisfies that; a grid of unrelated items all
shouting does not.

### D7 — Hiding imagery on mobile

**Avoided:** `display: none` on photography, illustration, charts, or diagrams at
small widths, even when decorative.

*Why:* it signals a layout designed at desktop width and never re-composed, and it
usually strips the art direction that carried the design's character. Preferred
instead: recrop to portrait or square, move above the text, go edge-to-edge, reduce
resolution.

`yields when:` the element is genuinely decorative *and* its weight costs real
performance on mobile connections, or the small-viewport composition is stronger
without it. **Invariant floor:** content parity (U7) — anything carrying
information gets re-composed, never dropped.

### D8 — The default Spline aesthetic

**Avoided as an unmodified look:** soft gradient blobs, glossy plastic material,
floating primitives at rest in an empty field. Recognisable at a glance because it
is what the tool produces before anyone makes a decision.

*Why:* it is the 3D equivalent of the banned palettes in D1 — not ugly,
*exhausted* — and it reads as "the default was accepted". The house look is what the
tool gives away free; overriding it with real material reference, considered light,
and a form that has a reason to exist is where the design begins. Related:
[dimensionality DM6](../dimensionality/SKILL.md#invariant) (one depth idea per view)
and auction-editorial's preference for material and light over geometry.

`yields when:` the soft-gradient register is genuinely the brand's own and predates
the tool, or the piece is deliberately and legibly referencing that idiom. Then
execute it with a structural difference — as with any trope, the exit is a real idea,
not permission.

### D9 — Ambient motion behind body copy

**Avoided:** any perpetual loop — particles, drifting gradients, a rotating object,
a looping video — running behind, beside, or within a block of text meant to be read.

*Why:* peripheral movement is involuntarily attention-capturing and cannot be
ignored on request, so it makes sustained reading measurably harder. This is the
taste-tier statement of the matter;
[dimensionality DM9](../dimensionality/SKILL.md#invariant) is the **invariant** that
forbids it outright inside reading zones. This entry is the dialect's broader
dislike of ambient motion competing with content anywhere.

`yields when:` the motion *is* what the text is describing and stillness would
misrepresent it — a motion showreel, a physics explanation, a live data field.
Then keep it out of the measure or give the reader a stop control. **Invariant
floor:** dimensionality DM9 still binds — nothing loops perpetually inside a
reading zone.

### D10 — Template-looking anything

**Avoided:** output that could be swapped into an unrelated product without anyone
noticing. Symptoms: every section the same height and rhythm; icons for concepts
that don't need icons; equal-weight column grids repeated down the page; generic
copy standing in for content ("Powerful features", "Built for teams"); one radius
on everything; header → hero → features → testimonials → CTA → footer with nothing
else.

*Why:* template design isn't badly executed, it's *anonymous* — and anonymity is
the failure. Every prior in a generative model points at the average, so avoiding
the average takes deliberate effort on every deliverable. Preferred instead: make
at least one structural decision specific to *this* content, and be able to name it
in one line.

`yields when:` familiarity is the product's value — internal tooling, admin
consoles, government and public services, medical and safety-critical interfaces,
anything where convention lowers cognitive load and novelty costs comprehension.
Recognisability there is a feature, and distinctiveness should move to the parts
that don't affect learnability (type, space, colour restraint) rather than to
structure.

---

## The gate

**Invariant — must all pass**
- [ ] Hierarchy unambiguous; emphasis encodes ranking truthfully.
- [ ] All contrast meets AA; no hue-only meaning; focus visible.
- [ ] No motion without a job; reduced-motion path everywhere; no layout animation.
- [ ] Spacing deliberate; internal gaps < external; gutters never zero.
- [ ] Zero magic numbers; one scale per dimension.
- [ ] Zero horizontal page scroll at 320px.
- [ ] Content parity across viewports.
- [ ] Any irregularity is legible and reads as intentional.
- [ ] Depth cues coherent with the spatial model; elevation matches real layering.

**Dialect — when auction-editorial is active**
- [ ] No AI-default palette or archetype (or a named structural differentiation).
- [ ] No gradient on controls; no gradient text.
- [ ] No decorative shadows; shadows only on truly floating layers.
- [ ] Every box justified — whitespace and hairlines tried first.
- [ ] No underlined nav; inline prose links *are* underlined.
- [ ] One primary CTA per view.
- [ ] Imagery present and re-composed on mobile.
- [ ] No unmodified default-tool aesthetic.
- [ ] No ambient motion competing with body copy.
- [ ] One structural decision specific to this content, nameable in one line.
- [ ] Every yield named in the report with its condition.

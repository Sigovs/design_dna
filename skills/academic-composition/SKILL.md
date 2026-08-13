---
name: academic-composition
description: Classical academic composition translated into digital art direction, interface design, responsive design, and visual critique — in two tiers. INVARIANT (dominant/subordinate/support hierarchy, unity and subordination, tonal structure before colour, figure-ground clarity, optical over mathematical balance, directed eye movement, rhythm with variation, proportion relationships, intentional edges and crops, tension with counterweight, compositional resolution, a page that holds its standard to its last mass, responsive recomposition, the dominant being the subject rather than the device presenting it, the means of the visitor's task surviving the composition, major masses established before components, a decided compositional centre, a declared asset dependency that survives an ordinary asset, and a first screen that identifies what it is) and DIALECT (auction-editorial's composed asymmetry and downward exhale, with yields-when). Contains the COMPOSITION READ and COMPOSITION PLAN that run after dialect selection and before any grid, component or surface styling decision, and routes to references/ for the academic method behind each stage. Use before laying out any full page or substantial section, when art-directing imagery, and when critiquing a design.
---

# Academic Composition

> **Academic composition governs the quality and intentionality of visual
> relationships, not a predetermined visual outcome. The same principles may
> produce radically different compositions for different briefs.**

This skill is **not a visual style.** It will not make a project look classical,
editorial, minimal, spacious, symmetrical, or "artistic". It is a method for
seeing, constructing, developing and diagnosing relationships — between visual
forces, masses, intervals, directions, scale, tone, and negative space — and it
applies **across every dialect**, including a dialect derived entirely from the
brief.

A dense operational dashboard, a playful youth-brand campaign page, a
government service form, and a quiet auction catalogue are all subject to these
invariants. They will look nothing alike, and all four can pass.

## ⚠ Required warnings

> **Academic composition is a method of seeing and judging relationships, not a
> library of fixed templates. Never apply the golden ratio, rule of thirds,
> symmetry, asymmetry, or any preferred proportion automatically.**

> **Academic knowledge should increase sensitivity and judgment. It must never
> become a justification for decorative complexity, forced irregularity, or
> art-direction decisions that weaken usability.**

Specifically: the rule of thirds is not in this skill. Neither is the golden
ratio, a fixed proportion set, mandatory asymmetry, or centred symmetry. If you
find yourself reaching for a ratio to justify a decision, you have replaced
judgement with arithmetic — which is the failure this file exists to prevent.

## The governing sequence

Composition is **constructed before it becomes interface structure.** Work in
this order, and treat it as recursive rather than linear — the artistic image
informs every structural decision, and the structure that emerges refines the
artistic image:

```
OBSERVATION → ARTISTIC INTENTION → FORMAT → MAJOR MASSES → COMPOSITIONAL CENTRE
→ DOMINANCE AND SUBORDINATION → BALANCE → DIRECTION AND MOVEMENT
→ RHYTHM AND INTERVAL → SPACE → TENSION AND COUNTERWEIGHT → UNITY
→ FUNCTIONAL REALISATION → RESPONSIVE RECOMPOSITION → VALIDATION
```

**Grids, columns, cards, components, tokens, breakpoints and section templates
are instruments of the last stages.** They are how a composition is built; they
are never where it starts. A page that begins as a component inventory or a
twelve-column grid has no mass structure to inventory or place.

Do not begin from a reference site. A reference answers somebody else's format,
content and subject, so borrowing its arrangement imports a conclusion whose
premises you do not have. Read references for the **principle** —
[TASTE.md §6 (d)](../../TASTE.md#6-vault-hook--the-vaultdesign-loop).

---

## INVARIANT

*Universal composition quality — applies in every dialect, for every audience.*

### C1 — Dominant, subordinate, support

Every full composition establishes a clear hierarchy of visual forces: a
**primary** visual mass or idea, quieter **subordinate** elements, and
**supporting** detail.

**The dominant does not need to be the physically largest object.** Dominance can
come from contrast, isolation, position, density, direction, colour, motion, or
semantic importance. A small, isolated, high-contrast element in a quiet field
dominates a large soft one. A number in the display face dominates the paragraph
beside it. A single moving element dominates a static page.

**Equal emphasis everywhere is not hierarchy.**

*Why:* a composition without a dominant has no entry point, so the viewer picks
one arbitrarily and every subsequent relationship is read out of order. This
holds regardless of aesthetic — a dense dashboard needs a dominant just as much
as a hero does; its dominant is simply likely to be a state or an alert rather
than an image.

*Relationship to other rules:* this is the compositional altitude of
[anti-patterns U1](../anti-patterns/SKILL.md#invariant) (weak hierarchy) and
[typography I1](../typography-taste/SKILL.md#invariant) (legible rank). U1 asks
whether rank is unambiguous; C1 asks whether the *forces* are ranked, including
non-typographic ones.

### C2 — Unity and subordination

All elements contribute to one governing visual idea. Secondary elements
**strengthen, frame, counterbalance, or clarify** the dominant — they do not
compete with it accidentally.

**Unity does not mean uniformity.** Variation is welcome when it belongs to the
same compositional logic. Three differently sized, differently cropped images can
be more unified than three identical ones, if their differences follow a single
reasoning.

Practical test: name the governing idea in one sentence. Then, for each element,
say which of *strengthen / frame / counterbalance / clarify* it does. An element
that does none is either support detail or it should not be there.

*Why:* competing centres of interest split attention and the composition reads
as two unfinished designs sharing a page. Accidental competition is the common
case — a strong background image behind a strong headline, two full-bleed
elements at the same scale, a bold illustration next to a bold statistic.

Depth: [unity-and-plastic-connection](references/unity-and-plastic-connection.md).

### C3 — Tonal structure before colour

The major hierarchy must remain intelligible in **grayscale**, at **thumbnail
size**, and through a **squint test**.

Colour may reinforce hierarchy, atmosphere, and meaning — but it must not
compensate for the absence of underlying tonal structure. If desaturating the
design destroys the hierarchy, the hierarchy was never built; it was painted on.

**Scope:** evaluate the **major masses and hierarchy**. Do not require every
subtle interface detail — a dimmed micro-label, a hairline rule, a focus ring —
to survive at thumbnail scale. Those are support detail, judged at their own
altitude and by [color I1](../color-taste/SKILL.md#invariant).

*Why:* tone is processed faster and more reliably than hue, survives bad screens,
glare, greyscale printing, and colour-vision deficiency, and is what the eye uses
to resolve mass. A design whose structure is carried by tone works everywhere; one
whose structure is carried by hue works only under ideal conditions.

### C4 — Figure-ground clarity

Positive forms and negative space are **composed together**.

**Empty space is an active shape** with proportion, direction, pressure, and
visual weight — not leftover padding between components. The gap between two
masses has a shape; that shape is a design decision whether or not anyone made it.

The figure-ground relationship stays legible even when intentionally ambiguous or
layered. Deliberate ambiguity — overlap, transparency, a form reading as both
figure and ground — is legitimate; unresolved ambiguity, where the viewer cannot
tell which plane an element occupies, is not.

*Why:* the eye separates figure from ground before it identifies anything, so an
unclear separation costs comprehension at the earliest possible stage. And
treating space as *residue* is how layouts end up with awkward trapped gaps that
no amount of component polish will fix.

*Note:* this is not a rule about *how much* space. Amount is a dialect question
([spacing D1/D3](../spacing-taste/SKILL.md#dialect)). C4 is about whether the
space has a considered shape at whatever amount the brief calls for — dense
layouts have figure-ground relationships too, and they are harder.

Depth: [negative-space-and-tension](references/negative-space-and-tension.md).

### C5 — Optical balance over mathematical balance

Judge visual weight through **scale, contrast, density, detail, position, colour,
direction, isolation, motion, and semantic importance.**

**Geometric centering does not guarantee perceptual balance**, and **asymmetry
does not automatically create tension or sophistication.** A centred element can
feel like it is sliding off the page; an off-centre one can feel inert.

Balance is judged **optically** — by looking, at real size, and at thumbnail.

*Why:* perceived weight is a product of many variables at once, none of which a
coordinate captures. This is also the invariant that most often exposes
generated layouts: they are mathematically placed and optically wrong, because
arithmetic was used where looking was required.

Depth: [optical-balance](references/optical-balance.md).

### C6 — Directed eye movement

Photography, typography, alignment, diagonals, gaze direction, vehicle and
subject direction, cropping, contrast, and spatial progression create an
**intentional path** through the composition.

The path may be immediate, gradual, circular, interrupted, or exploratory
depending on the brief — but it must not be **accidental**.

**Directional forces inside images are part of the page composition, not isolated
content.** A subject looking left on the right-hand side of a layout points the
viewer back into the page; the same crop on the left points them out of it. A
car's direction of travel, a model's gaze, a road's vanishing point, the lean of
a building — all of these are page-level forces. Crop and place accordingly, and
flip nothing that would misrepresent the subject.

*Why:* the eye moves whether or not the design directs it. Undirected movement
means the reading order is decided by accident, so the argument the design is
making arrives scrambled.

Depth: [direction-and-movement](references/direction-and-movement.md).

### C7 — Rhythm with variation

Repetition creates coherence, recognition, and pace. **Vary intervals, scale,
density, duration, proportion, or emphasis** where needed to prevent mechanical,
metronomic layouts.

**Variation must serve the governing rhythm.** Do not introduce difference merely
to make every section look unique — that is novelty, not rhythm, and it destroys
the recognition that repetition bought.

A useful frame: rhythm is a pattern the viewer can *predict*, with departures
they can *feel*. No pattern is chaos; no departure is a metronome.

*Why:* uniform repetition reads as machine output and gives the viewer no cue
about where they are in a page. Uniform variation is equally exhausting for the
opposite reason. Pace is the actual deliverable.

Depth: [rhythm-interval-and-pause](references/rhythm-interval-and-pause.md).

### C8 — Proportion and scale relationships

Evaluate **relationships between masses**, not isolated component sizes. Small
proportional changes create:

- tension or calm;
- monumentality or intimacy;
- speed or stillness;
- openness or compression;
- authority or approachability.

**Avoid selecting dimensions only because they are conventional component
sizes.** A 400px card, a 64px hero heading, and a 16:9 image are defaults, not
decisions. Ask what the *ratio* between two masses is doing before you ask what
either measures.

*Why:* meaning in composition lives in relationships. Two elements at 1:1.2 read
as peers in tension; at 1:3 one clearly serves the other. Neither is right in the
abstract — but choosing the ratio blindly means the design is saying something
you did not intend.

*Note:* this does not contradict token discipline
([spacing I2](../spacing-taste/SKILL.md#invariant)). Tokens constrain *which*
values are available; C8 governs *which relationship* you are choosing between
them. Pick the relationship, then express it with the nearest token — and if no
token serves it, that is a documented scale addition, not a magic number.

### C9 — Intentional edges, crops, and tangencies

Every interaction with an edge is deliberate: viewport collisions, image bleeds,
crops, overlaps, alignment axes, near-alignments, objects touching frames, text
meeting imagery, and forms continuing beyond the viewport.

**Avoid** accidental tangencies (two forms just touching), weak near-alignments
(elements 3px out of alignment — align them or offset them clearly),
uncomfortable crops (a limb, a wheel, or a letter cut at its joint), and edges
that appear *almost* but not clearly intentional.

The rule of thumb: **commit or clear.** Overlap decisively or leave visible air.
Bleed fully or inset visibly. Align exactly or offset enough to read as a choice.
The ambiguous middle is where compositions look unfinished.

*Why:* the eye is extremely sensitive to near-misses — a 3px misalignment is more
noticeable than a 30px offset, because the first reads as an error and the second
as a decision. Tangencies also create unintended visual connections between
unrelated elements.

Depth: [space-depth-and-edges](references/space-depth-and-edges.md).

### C10 — Tension, counterweight, and rest

**Visual tension must have a purpose.** When a composition uses imbalance,
compression, collision, directional force, or disruption, provide an intentional
**counterweight, release, continuation, or resolution.**

A composition should not remain **uniformly tense** or **uniformly passive**
unless the brief clearly requires that condition. Sustained tension exhausts;
sustained passivity fails to hold attention. Both are legitimate as deliberate
answers to a specific brief, and neither is a default.

*Why:* tension is a promise of significance. Unresolved, it reads as
misalignment rather than as force — the viewer registers discomfort and
attributes it to sloppiness. Counterweight is what converts imbalance into
intent.

**Not every tension is to be neutralised.** Some compositions depend on force
that is never released — that is a decision, stated in the Read, not an accident
left in place.

### C11 — Compositional resolution

A section **resolves, transitions, continues, or deliberately remains open.** It
does not merely **stop because the content module ended.**

Control the release with spacing, tonal change, image direction, alignment,
scale, or continuation of visual forces. Ask, at every section boundary: what
carries the eye across it, and does the next section receive what the previous
one handed over?

*Why:* module-shaped stopping is the single clearest tell of a page assembled from
components rather than composed. It's also why long pages feel like scrolling
instead of reading — nothing hands off, so every section restarts.

*Note:* the dialect's preferred *mechanism* for this — deeper space below than
above, the downward exhale — is a dialect preference (D5 below), not this
invariant. C11 requires resolution; it does not prescribe its form.

### C12 — Responsive recomposition

**Mobile is not a vertically stacked miniature of desktop.**

At every major breakpoint, re-establish: the **dominant mass**, **subordinate
relationships**, **eye path**, **tonal hierarchy**, **rhythm**, **image direction
and crop**, **active negative space**, and **compositional resolution.**

**Preserve the governing idea, not merely every individual desktop element.** If
necessary, change order, crop, scale, alignment, density, or emphasis to preserve
the composition. A dominant established by horizontal isolation on desktop may
need to become a dominant established by scale or tone on mobile, because
horizontal isolation does not exist at 390px.

**A counterweight that is no longer visible is no longer a counterweight.**
Desktop asymmetry held by a mass 900px to the right does not survive one column:
either the counterweight is re-established by other means, or the asymmetry is
abandoned for that format.

*Why:* stacking preserves content and discards composition — every element
survives and every relationship dies. Since small screens are usually the
majority of real traffic, an un-recomposed layout means most people never see the
design.

*Relationship to other rules:*
[anti-patterns U7](../anti-patterns/SKILL.md#invariant) (content parity) forbids
*dropping* content to avoid re-composing. C12 requires *actively recomposing*
what remains. U7 is the floor; C12 is the work.

Depth: [responsive-recomposition](references/responsive-recomposition.md).

### C13 — The dominant is the subject

**The dominant mass of a composition must be the subject itself, never the device
used to present it.** A signature mechanism serves the subject; it never occupies
the subject's place. When the mechanism is the largest thing on screen, the subject
has been demoted to an illustration of a technique.

**Corollary — literal metaphor.** When a concept is drawn from a metaphor ("the
vehicle as a documented record"), **the metaphor governs treatment, not content.**
If the document becomes the subject and the vehicle becomes evidence of the
document, the metaphor has eaten the work.

*Why it's universal:* a viewer arrives for the thing, not for the idea about the
thing. Ranking the device first inverts the only hierarchy the page exists to
express, and no amount of craft in the device repairs it — the page is now about
its own cleverness. This is [C1](#invariant) applied to the specific case the
author keeps losing: C1 asks whether *a* dominant exists, C13 asks whether it is
the *right* one.

*How it fails in practice:* the metaphor is applied twice. Once in the composition,
where the device takes the dominant position the subject should hold, and again in
the treatment, where the subject is suppressed to keep the device legible — cropped
small, desaturated, or withheld entirely. Either move alone is recoverable. Together
they are the diagnosis.

**INVARIANT, not dialect: it holds under every dialect.** A brutalist, a Swiss, and
an immersive treatment of the same subject all fail the same way when the device
outranks the thing. Restraint is not a defence — suppressing the subject is the
failure, whatever the register doing the suppressing.

**The monumental identity mark — a permitted case, distilled from the vault
2026-07-30.** A wordmark at monumental scale *may* be the dominant of the opening
composition, in two conditions and no others:

1. **The subject cannot be shown** — an abstract service, a platform, a capability.
   `vault/ciridae-com` (3, in): a centred mark on an atmospheric field, flanked by
   two micro-labels, because "AI transformation" has no photograph.
2. **The subject enters and disrupts the mark**, so the two are one mass rather than
   two ranked ones. `vault/beings-co` (3, in): BEINGS at full width with the
   portrait rising into the letterforms — *"портреты входят с ним в конфликт,
   перекрываются и меняют его восприятие."* Supported at rating 2 by
   `vault/kinncollective-co-uk` and `vault/ruadh-com`, where the wordmark's scale is
   confident enough that a headline is not needed at all.

**Outside those two conditions the mark is a device and C13 binds.** The same
`beings-co` note records the failure mode from the inside — *"огромный wordmark
иногда конкурирует с лицами и может восприниматься как foreground decoration."*
A mark that could be swapped for any other name without changing the composition is
decoration at scale.

### C14 — The means of the task survive the composition

**Every full-page deliverable serves a visitor who arrived to do something. No
compositional decision may remove the means by which they do it.**

Consolidating sections for rhythm, inverting a grid for asymmetry, and suppressing
a control for silence are all legitimate moves — they become defects the moment
they delete a means.

*Why it's universal:* **composition is what removes these things, so composition is
where the constraint belongs.** Calling it a UX concern puts the rule in a
document nobody consults while cutting a section for rhythm, which is precisely
when it is needed. A page that presents an offer and withholds the means of
accepting it is not restrained; it is broken.

*How it disappears:* never in one move, and never obviously. A means is lost to
section consolidation, to breaking a rhythm that had become monotonous, to concept
purity — each defensible on its own terms, and none of them announcing that the
page now presents an offer with no way to accept it.

*How to satisfy it:* name the task in plain words and list the means before
composing, then check each one is still present and reachable afterwards. A means you never named is a means you will lose to the next good compositional
argument, which is why the project record keeps *task and means* as a written
section ([projects/_TEMPLATE.md](../../projects/_TEMPLATE.md)).

### C15 — Major masses before components

**Before any component, card, column, grid or navigation pattern is named, the
composition must be describable as 3–7 major masses** — silhouette, area, visual
weight, value, density, and the intervals between them — stated without reference
to a single UI element.

A compliant description reads: *one dense dark upper band; one large directional
image field pulling right; one compact high-contrast type mass held against it;
one quiet interval; one repeated low-density information band.* A non-compliant
one reads: *a header, a hero card, a feature grid, a CTA section.*

**If the page cannot be described this way, there is no composition to evaluate**
— there is an arrangement of containers, and every later judgement (balance,
rhythm, centre) will be made about the containers instead of about the work.

*Why it's universal:* the mass structure is what survives squinting, thumbnailing,
a changed component library, and a redesign of every card on the page. Components
are the *implementation* of masses; naming them first fixes the implementation
before the thing being implemented exists. This is the mechanism underneath C1 and
C3 — you cannot rank forces you have never identified as forces.

*Relationship to other rules:* C3 tests whether the mass hierarchy survives
grayscale; C15 requires that masses were established as masses in the first place.
Depth: [format-and-major-masses](references/format-and-major-masses.md).

### C16 — The compositional centre is decided, not inherited

**A composition has a centre, and which centre it is must be a decision.** The
semantic centre (what the page is about), the optical centre (where weight
gathers), the geometric centre (the middle of the format), and the centre of
action (where the visitor acts) are four different things, and they coincide only
by choice.

State which one governs, and how it is made: by isolation, contrast, direction,
scale, density, value, surrounding quiet, convergence of movement, semantic
importance, or an interruption of rhythm. Then say what the secondary centres do —
**strengthen, compete, or fragment.** Two centres of equal force is not a
composition with a rich centre; it is a composition with none.

**The centre is not automatically** the largest object, the brightest object, the
headline, the hero image, the geometric middle, or the primary call to action.

*Why it's universal:* an undecided centre drifts. The page still has one — the eye
finds it regardless — but it was chosen by whichever element happened to be
loudest, which is how a legal disclaimer ends up holding the optical centre of a
product page. This is distinct from [C1](#invariant): C1 ranks the *forces*, C16
places their *convergence* inside the format.

Depth:
[compositional-center-and-hierarchy](references/compositional-center-and-hierarchy.md).

### C17 — The composition declares what it depends on

**When a composition's identity is carried by one class of asset — the photography,
the film, the artwork, the one exceptional hero frame — or by one condition holding
— the exact sequence of sections, the motion between them, the content arriving at
the length and volume it was designed for — the Read names that dependency,
distinguishes an authored constraint from an operational risk, and tests the
composition against the plausible variation the system is expected to survive.**

**An authored constraint is legitimate; an operational risk is a defect.** A
landing page with a fixed, authored sequence may depend on its section order —
reordering the chapters of a piece of storytelling is not a variation it promised
to survive, and a system that breaks under an arbitrary rearrangement of its own
argument has not failed. A template, a CMS-driven page or a commercial site that
will grow is making the opposite promise, and must hold under the variation it will
actually meet: longer text, more or fewer cards, ordinary asset quality, a
different content mix. The test is not whether the composition survives having its
intent dismantled; it is whether it survives the variation its own use guarantees.

`vault/eco-com` (2, in) is the authored case — *"такая система сильно зависит от
точного ритма, motion и порядка секций"* — and it is declared rather than fixed.
`vault/mugenstudio-framer-website` (2, in) is the operational one: a Framer template
advertises reuse, so robustness to real client content is part of what it is
claiming, and *"при небольшом изменении контента или более слабых изображениях
композиция может легко развалиться"* is therefore a defect rather than a
constraint.

Name, in the Read: *what carries the identity*, and *what carries it if that
degrades*. If the honest answer to the second is "nothing", the composition is not
finished — it is a presentation of an asset, and it will read as generic the first
time the imagery is ordinary.

Not a prohibition on depending on great assets: exceptional imagery is a legitimate
and often correct strategy. **The requirement is that the dependency is stated and
survivable** — a second mechanism (structure, typographic mass, tonal system,
interval, sequence) that keeps the work recognisable when the first weakens.

*Why it's universal:* an asset dependency is invisible at delivery, when the assets
are at their best, and becomes the whole story at the first content update. It is
also the failure that no other invariant catches — C1–C16 all judge the composition
as it stands, and this one judges what happens to it next. Study L in
[academic-studies](references/academic-studies.md) is how you test it: swap the
hero for a worse frame, triple the headline, remove the photography.

> **Evidence — distilled from the vault, 2026-07-30.** Five entries record it
> independently, and it is the most-repeated weakness in the library:
> `vault/beings-co` (3, in) — *"hero очень зависит от сильных портретов. С обычной
> корпоративной фотографией вся система резко потеряет энергию"*;
> `vault/ruadh-com` (2, in) — *"почти весь характер держится на фотографии и
> логотипе. Поставь обычный fashion-контент — сайт резко станет generic"*;
> `vault/electrafilmworks-com` (2, in) — *"depends heavily on the strength of the
> underlying films"*; `vault/kinncollective-co-uk` (2) — *"характер сильно
> зависит"* from the interiors; `vault/i-pinimg-…-46d9d54b` (2) — *"heavy
> dependence on pre-existing character artwork."* Four of the five are rated `in`
> or better, so this is not a weakness of bad work — it is the standing cost of
> image-led art direction.

### C18 — The first screen identifies what this is

**The first screen either says what the thing is, or the Read declares that
withholding it is the subject.** One of the two. There is no third state where the
question simply went unasked.

Identification does not mean explaining. It means a visitor arriving cold can
answer *what is this, and is it for me* — from the dominant, the copy, the imagery,
or all three together. A monumental wordmark identifies the **brand**; it does not
identify the **offer**, and those are different questions.

Where withholding is genuinely the design — a teaser, an art piece, an
invitation-only launch — that is a legitimate composition, and it is declared in
the Read as *the subject is the withholding*. Declared, it can be judged. Undeclared,
it is indistinguishable from a page whose author forgot the visitor did not already
know.

*Why it's universal:* atmosphere is easy and identification is work, so the second
loses whenever the first is going well. This is why it appears in the vault as a
weakness of *strong* pages rather than weak ones: the register arrives, the offer
does not. It is also distinct from every neighbouring rule —
[C13](#invariant) asks whether the dominant is the subject, [C14](#invariant)
whether the means survive, C18 whether the visitor can tell **what they are looking
at at all**. A page can pass both and still leave a caster wondering whether they
have found a talent directory or a social campaign.

> **Evidence — distilled from the vault, 2026-07-30, second pass.** Three entries,
> including a rating-3, all recording it as the cost of an otherwise excellent
> opening: `vault/beings-co` (3, in) — *"на первом экране не сразу очевидно, что
> это именно searchable casting directory, а не социальная кампания"*;
> `vault/kinncollective-co-uk` (2) — *"первый экран настолько минимален, что не
> сразу объясняет, чем занимается компания"*; `vault/augen-pro` (2, hybrid) —
> *"чтение принесено в жертву атмосфере: сайт хорошо создаёт ощущение, но хуже
> объясняет, что именно делает компания."*

---

### C19 — The page holds its standard to the last mass

**A page is composed to its end. The masses after the opening are held to the
standard the opening set, and the final mass is a designed ending rather than the
place the remaining content went.**

This does not ask the later sections to be as expressive as the first — pace
falls, and C7 requires that it can. It asks that they still be composed: ranked,
related, resolved. **Convention is permitted; formlessness is not.** A
specification archive, a related-inventory grid, a disclaimer and a footer are all
legitimate masses, and each is still a mass with a dominant, an interval and an
ending.

The check is one question asked at the bottom of the page rather than the top:
**name the last three masses and say what each hands to the next.** If the honest
answer for any of them is "it is where the remaining content went", the page is
unfinished there.

*Why it's universal:* attention at the top is bought by the design; attention at
the bottom is spent by the visitor, and an uncomposed mass is the one place no
aesthetic earns that back. A utilitarian or documentation page may be calm, dense
and conventional and still satisfy this rule — its last masses are ranked,
connected and finished. What the rule forbids is not restraint but formlessness,
which is why it does not impose an editorial register on page types that do not
want one.

It is also the failure that hides from review — sections are examined one at a
time, the page is never examined as one object, and the decay is only visible in a
full-page capture.

*Boundary with C11:* C11 governs a single seam — does this section hand over to the
next. C19 governs the sequence — does the standard survive the length of the page.
A page can pass every seam and still arrive at a formless tail.

> **Evidence — distilled from the vault, 2026-08-13.** Ten records, `in` and `out`
> alike, one of them rating 3: `vault/semlerpremium-dk-brands-porsche-911-gt3-…`
> (3, in) — *"becomes less distinctive as it moves deeper into specifications …
> does not fully sustain the visual authority of the opening gallery"*;
> `vault/polestar-com-us` (2, in) — *"a sequence of functional modules rather than a
> strong editorial narrative"*; `vault/mclaren-com-cars-gl-en` (2, in) — *"the
> transition from cinematic brand experience to corporate content feed is
> noticeable"*; `vault/rimac-automobili-com-nevera` (2, in) — *"gradually becomes a
> long technical archive … a heavy ending"*; `vault/hispanosuizacars-com` (2, in) —
> *"the model pages do not fully sustain the authority of the homepage"*;
> `vault/semlerpremium-dk` (2, in) — *"does not fully sustain the clarity and visual
> authority of its strongest opening sections"*; `vault/rivian-com` (2, out) — *"a
> sequence of beautifully designed modules rather than one continuously building
> story"*; `vault/hbbody-com-en-home` (2, out) — *"the weaker editorial moments
> return to a more familiar corporate news-grid structure"*; `vault/rmsothebys-com`
> (1, out) — *"the initial visual idea never develops"*;
> `vault/thegentlewoman-co-uk` (1, out) — *"one decent cover does not make this a
> reference"*. The full-page capture of `polestar-com-us` shows it plainly: one
> authored typographic event, then a disclaimer wall and a link farm.

## COMPOSITION READ

Runs **after the dialect declaration** and **before typography, colour, effects,
motion, grid, components and any other structural or surface decision.** Wired
into the Design Read in [TASTE.md §2](../../TASTE.md#2-the-design-read).

**When it is required:** any full-page design, any substantial section-level
design, or any visual critique.

**When it is not:** atomic UI edits, minor copy changes, small token adjustments,
isolated implementation fixes. For smaller work, run the short form — often three
or four lines.

Answer in **one compact block.** Short clauses, not paragraphs. Every line names
something observable in the artefact or the brief.

```
COMPOSITION READ
1.  Context:       <business, content, cultural, technical and user conditions>
2.  Artistic image:<the world / state / character the composition must construct>
3.  Format forces: <ratio, edge pressure, fold, scroll-as-sequence, safe areas>
4.  Major masses:  <3–7 masses, named without components>
5.  Centres:       <semantic / optical / geometric / action — which governs, how made>
6.  Dominance:     <dominant, subordinate, support, bridge, counterweight>
7.  Balance:       <centre of gravity; stable, intentionally unstable, or drifting>
8.  Direction:     <major vectors, convergences, oppositions, where the eye exits>
9.  Rhythm:        <meter, variation, pause, buildup, culmination, release>
10. Negative space:<the shapes of the empty fields, and what they do>
11. Tension:       <where, what causes it, what contains it — or that it stays open>
12. Spatial depth: <foreground / middle / background, overlap, surface logic>
13. Edges:         <crops, frame contact, continuation, edge pressure>
14. Unity:         <what makes this one work rather than several>
15. Typography:    <text as mass, texture and direction — not as content>
16. Imagery:       <the images' internal forces, and how the page answers them>
17. Responsive:    <what collapses when the format changes>
18. Functional:    <task, means, navigation, interaction, accessibility conditions>
19. Diagnosis:     <the single most important opportunity or failure>
```

**Short form** — section-level work and quick critique: lines 2, 4, 5, 6, 8, 9,
10, 17, 19.

**The Read must reveal reasoning and stay concise.** It is a thinking tool, not
ceremonial documentation. If a line would be filler ("balanced and clean"), the
answer is missing — say what actually creates the balance, or say the composition
does not have it yet.

Banned in a Read: *premium, clean, bold, elegant, modern, luxury, dynamic,
minimal* — unsupported adjectives standing where an observation belongs. Not
*"a bold premium composition with strong hierarchy"* but *"a horizontally
compressed opening mass anchors the upper-left field while a large low-detail
image carries force toward the right edge; a deep lower interval delays the next
group and releases the dense opening."*

For a critique, the same lines run against the existing design, and each answer
names evidence in the artefact rather than a general impression.

## COMPOSITION PLAN

After the Read, and **before** any grid, column count, section template,
component, container, card, spacing value or breakpoint is named:

```
COMPOSITION PLAN
- mass scheme            - negative-space strategy
- primary centre         - tension and counterweight mechanism
- hierarchy mechanism    - image ↔ typography relationship
- centre of gravity      - sectional development, culmination, release
- static or dynamic      - edge and cropping strategy
- eye path               - responsive recomposition, per format
- density distribution   - functional realisation (task, means, states)
- rhythm and intervals   - dialect if any · unresolved dependencies · validation criteria
```

Only then: grid, columns, sections, components, containers, cards, spacing
values, breakpoints, implementation patterns.

---

## Reference routing

`SKILL.md` is the law and the procedure. The academic method behind each stage
lives in `references/`. **Do not load them all.** Read what the task needs:

| Task | Read |
|---|---|
| Constructing a new page | [academic-foundations](references/academic-foundations.md), [format-and-major-masses](references/format-and-major-masses.md), [compositional-center-and-hierarchy](references/compositional-center-and-hierarchy.md), [rhythm-interval-and-pause](references/rhythm-interval-and-pause.md), [responsive-recomposition](references/responsive-recomposition.md) |
| Diagnosing an existing page | [diagnosis](references/diagnosis.md), [optical-balance](references/optical-balance.md), [negative-space-and-tension](references/negative-space-and-tension.md), [unity-and-plastic-connection](references/unity-and-plastic-connection.md) |
| Image-led hero | [format-and-major-masses](references/format-and-major-masses.md), [direction-and-movement](references/direction-and-movement.md), [typography-and-imagery](references/typography-and-imagery.md), [space-depth-and-edges](references/space-depth-and-edges.md) |
| Long scrolling homepage | [rhythm-interval-and-pause](references/rhythm-interval-and-pause.md), [unity-and-plastic-connection](references/unity-and-plastic-connection.md), [responsive-recomposition](references/responsive-recomposition.md) |
| Mobile adaptation | [responsive-recomposition](references/responsive-recomposition.md), [format-and-major-masses](references/format-and-major-masses.md), [compositional-center-and-hierarchy](references/compositional-center-and-hierarchy.md) |
| Dense functional interface | [compositional-center-and-hierarchy](references/compositional-center-and-hierarchy.md), [optical-balance](references/optical-balance.md), [space-depth-and-edges](references/space-depth-and-edges.md), [diagnosis](references/diagnosis.md) |
| Auction / collector work | the universal references above **plus** [dialects/auction-editorial](references/dialects/auction-editorial.md) |
| Learning to see it | [academic-studies](references/academic-studies.md) |

Adjacent skills own their own depth and are not duplicated here:
[colour](../color-taste/SKILL.md) owns chromatic relationships (composition owns
where the colour masses sit and what they weigh), [typography](../typography-taste/SKILL.md)
owns setting (composition owns type as mass, texture and direction),
[motion](../motion-taste/SKILL.md) owns timing and easing (composition owns what
must move, stay stable, or culminate), [spacing](../spacing-taste/SKILL.md) owns
the token scale (composition owns which interval relationship you are choosing),
and [dimensionality](../dimensionality/SKILL.md) owns constructed depth.

---

## DIALECT

*auction-editorial — tendencies, not fixed formulas.*

The dialect's compositional preferences, risks and yields are collected in
[references/dialects/auction-editorial.md](references/dialects/auction-editorial.md),
which defers to [dialects/auction-editorial.md](../../dialects/auction-editorial.md)
as the single source of truth for the dialect itself.

### D1 — Composed asymmetry with a stable optical counterweight

Asymmetric placement, held in balance by a deliberate counterweight rather than
by symmetry.

### D2 — Concentrated visual detail against larger quiet fields

Detail collects in one region; the rest of the field stays quiet enough for the
concentration to register.

### D3 — Controlled alternation between tension and visual rest

Passages of tension alternate with passages of rest, at a pace the reader can
feel.

### D4 — Visual mass slightly above the geometric centre

Stated in [auction-editorial P5](../../dialects/auction-editorial.md#p5--visual-mass-slightly-above-centre-deeper-field-of-space-below) — the single source of truth for this preference.

### D5 — Deeper negative space below the primary content than above; sections exhale downward

Stated in [auction-editorial P5](../../dialects/auction-editorial.md#p5--visual-mass-slightly-above-centre-deeper-field-of-space-below) — the single source of truth for this preference.

### D6 — One measured compositional disruption over continuous novelty

Stated in [auction-editorial P4](../../dialects/auction-editorial.md#p4--one-committed-gesture-beats-several-safe-ones) — the single source of truth for this preference.

---

**These are tendencies, not fixed formulas. Do not translate them automatically
into:**

- a mandatory asymmetric layout;
- a fixed top/bottom padding ratio;
- one oversized editorial image per section;
- repeated off-centre placement;
- the same disruption pattern on every page.

A design following all six mechanically is not in this dialect — it is a template
wearing the dialect's clothes. D1–D6 describe what the dialect *tends to
conclude*, not steps to execute.

**`yields when:`**

- usability requires a more direct structure;
- information density requires compact scanning;
- audience expectations favour familiarity or speed;
- the brand requires another spatial character;
- cultural context changes the appropriate visual language;
- an intentionally expressive, experimental, youth-oriented, or disruptive brand
  benefits from continuous visual energy;
- the brief calls for symmetry, modularity, playfulness, utility, or another
  compositional system.

When any of these applies, the **invariants C1–C18 still bind.** A symmetrical,
modular, dense, or playful composition still needs a mass structure, a dominant,
a decided centre, a directed eye path, active negative space, optical balance,
and resolution. Yielding changes the compositional *system*, never the
requirement that the relationships be composed.

---

## Checklist

**Invariant — every full page or substantial section**
- [ ] The page is describable as 3–7 masses with no component named (C15).
- [ ] A dominant exists, and you can say what makes it dominant.
- [ ] The governing centre is named — semantic, optical, geometric or action (C16).
- [ ] Every element strengthens, frames, counterbalances, or clarifies the dominant.
- [ ] Major hierarchy survives grayscale, thumbnail, and squint.
- [ ] Negative space has named shapes; figure-ground is legible.
- [ ] Balance judged by looking, not by coordinates.
- [ ] Eye path intentional; image directions treated as page forces.
- [ ] Rhythm has a predictable pattern and felt departures.
- [ ] Mass relationships chosen as ratios, not as conventional component sizes.
- [ ] Edges committed or cleared — no near-alignments, no accidental tangencies.
- [ ] Tension has counterweight, or is deliberately left open and said to be.
- [ ] Every section resolves, transitions, or stays open on purpose.
- [ ] Each breakpoint re-establishes the governing idea, not just the content.
- [ ] The dominant is the SUBJECT, not the device presenting it (C13).
- [ ] The task is named in plain words, and every means serving it survives (C14).
- [ ] The asset dependency is named, and a second mechanism holds without it (C17).
- [ ] The first screen says what this is — or the Read declares the withholding (C18).

**Dialect — when auction-editorial is active**
- [ ] Asymmetry, if used, has a stable counterweight — and it survives mobile.
- [ ] Detail concentrated against quiet fields.
- [ ] Tension and rest alternate at a felt pace.
- [ ] Mass slightly above centre; deeper field below; sections exhale downward.
- [ ] One committed disruption, not continuous novelty.
- [ ] None of the above applied mechanically or identically across pages.
- [ ] Any yield named in the report with its condition.

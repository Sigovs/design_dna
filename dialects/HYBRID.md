# Style modes and the hybrid role model

> **Do not avoid the incompatible. Find the rule under which incompatible ideas
> begin to feel inevitable.**

This file governs **how dialects are selected and combined**. The dialects
themselves live in the files listed in [the index](README.md); nothing here
restates their rules.

**A dialect is a method of deciding, not an appearance.** It acts on composition,
hierarchy, rhythm, density, typography, image behaviour, materiality, interaction,
motion, information presentation, emotional tension and the use of space. A dialect
reduced to a font list, a palette, a radius or an effect stack has been turned into
a theme, and a theme cannot resolve a choice it has not seen before.

**Terminology, once.** *Style mode* is how many dialects are in play and how they
relate. *Anchor / Contrast / Signature* are the roles they hold. *Central idea* is
the one thing the page is organised around. *Unifying principle* is the rule under
which the chosen dialects stop being a contradiction. Note the collision to avoid:
the vault's `dialectStatus: "hybrid"` describes **an entry** that shares a
dialect's logic while diverging in expression — it is not `STYLE MODE: HYBRID`.

---

## The three modes

| Mode | Trigger | What it means |
|---|---|---|
| **HYBRID** | **The default.** No style named by Alex | Contrasting dialects, each holding a different systemic responsibility |
| **PURE** | Alex names one dialect, or asks for a single-system execution | That dialect controls the entire art direction |
| **DIRECTED HYBRID** | Alex names two or more dialects | Those dialects, with responsibilities and dominance still assigned |

**Style mode sits inside a direction, not above it.** Under
[EXPLORE](../TASTE.md#2d-explore--three-directions-before-one-is-chosen) each of
the three directions resolves its own style mode, and they will often differ — A
may be PURE, B DIRECTED HYBRID, C HYBRID. The delivery mode decides how many
directions exist; the style mode decides what each one is made of.

**HYBRID is the default, and it is not a licence to mix.** A hybrid exists to
express the central idea more clearly than any single dialect could. If one dialect
expresses it better, the honest answer is PURE — declared as a decision, not
arrived at by omission.

**When Alex asks for neutral, conventional, restrained or single-system work, that
is a direction and it is followed.** Theatrical hybridity imposed on a request for
a plain answer is drift, not authorship.

### PURE mode is protected

Under PURE, **no second dialect enters as a stylistic influence** — not as a
"touch", not as "just the image treatment", not because the page felt like it
needed something. A borrowed device under PURE is a defect and is reported as one.

What is **not** a competing dialect, and therefore always still applies: usability,
accessibility ([the invariants](../TASTE.md#1-the-two-tiers) bind under every
mode), content clarity, and platform conventions. A PURE brutalist page still has a
44px tap target, an AA contrast ratio, a 14px functional floor, and a focus ring.
PURE governs art direction; it never buys an exemption from a quality law.

### DIRECTED HYBRID respects the request

The named dialects are the ones used. **"A + B" is never a 50/50 collage:**
responsibilities and dominance are still assigned, because two systems with equal
authority produce a page where every domain has two answers.

If Alex names the dominant one, that is the Anchor. If not, derive dominance from
brand character, content, audience, functional requirements, medium, and the central
idea — and state which of those decided it.

---

## The role model

```
STYLE MODE:               HYBRID | PURE | DIRECTED HYBRID
CENTRAL IDEA:             the one idea the work is organised around
ANCHOR DIALECT:           name
ANCHOR RESPONSIBILITIES:  the systems it controls
CONTRAST DIALECT:         name  (n/a under PURE)
CONTRAST RESPONSIBILITIES:the systems it controls, and where it stops
SIGNATURE INFLUENCE:      name, optional  (n/a under PURE)
SIGNATURE JOB:            its one limited behaviour or device
UNIFYING PRINCIPLE:       why these belong together
CONTROL MAP:              domain → dialect, for every domain
COLLISION RISKS:          what would make this collapse
COHERENCE GUARDRAILS:     what is checked, and where
REJECTED ALTERNATIVES:    the combinations considered and dropped, with why
WHY THIS DIRECTION FITS:  what it strengthens — concept / character / hierarchy / usability
```

Under PURE, the hybrid fields are marked **n/a** rather than filled artificially.
Under HYBRID and DIRECTED HYBRID the block is required for any full-page or
substantial section-level work, alongside the
[Composition Read](../TASTE.md#2a-the-composition-read-and-plan). Keep it to the
block: it exists to make the judgement checkable, not to generate paperwork.

**Dominance, stated as proportion of authority — not as a measurable quota:**

| Role | Share | What it does |
|---|---|---|
| **ANCHOR** | ~60–75% | Controls the primary system. When two domains conflict, it wins by default |
| **CONTRAST** | ~20–30% | Introduces productive tension inside named domains. Never replaces the system |
| **SIGNATURE** | ~5–10%, optional | One identifiable behaviour or device, doing one job |

Nobody measures these. They describe how much of the page's logic each dialect
answers for; a Contrast that answers half the domains is an Anchor nobody declared.

---

## Dialects are mixed by responsibility, never by page section

**This is the load-bearing rule of the whole system.**

> **Dialects must be mixed by responsibility, not by page section.**

Forbidden — a brutalist hero, elegant services, cinematic reviews, a retro footer.
That is [anti-patterns U11](../skills/anti-patterns/SKILL.md#invariant): four
sections, four art directions, one URL.

Correct — brutalist logic governs page-wide composition; refined logic governs
spacing and typographic detail *throughout*; a cinematic influence governs image
lighting *throughout*. Every section is then made of all three, in the same
proportions, and the page reads as one authored thing.

The **CONTROL MAP** is the mechanism. One row per domain, one owner each, for the
whole page:

```
CONTROL MAP
composition / grid        → <dialect>
hierarchy / density       → <dialect>
typography voices         → <dialect>
spacing / rhythm          → <dialect>
colour / contrast         → <dialect>
image behaviour           → <dialect>
containers / geometry     → <dialect>
depth / materiality       → <dialect>
motion / interaction      → <dialect>
information presentation  → <dialect>
task means / CTA rank     → central idea + usability, never a dialect
```

The last row is not negotiable: the means of the visitor's task are owned by the
task ([C14](../skills/academic-composition/SKILL.md#invariant)), and no dialect
inherits authority over whether they exist.

**A domain whose owner changes between sections is the failure this map exists to
prevent.** If the grid is brutalist above the fold and Swiss below it, the page has
two grids, not a hybrid.

---

## Selection logic

Evaluate, before naming any dialect: **brand character · central concept ·
audience · content type · functional needs · desired emotional effect · existing
identity assets · available imagery · interaction intensity · technical
constraints · risk of cliché · the productive contrast available between
candidates.**

Then, for every dialect selected, state **what it strengthens** — central concept,
brand character, hierarchy, or usability, per
[the Selection Pass](../TASTE.md#2c-selection-coherence-and-device-discipline).
*"Looks cool", "feels premium", "adds personality", "creates visual interest"* are
reactions, not reasons, and a Read containing them is incomplete.

**Never select by randomness, and never optimise for maximum contrast.** The
combination that expresses the central idea most clearly wins — which is often a
mild contrast, and is sometimes no contrast at all.

### The incompatibility test — required under HYBRID

Seven answers. If any is missing, the hybrid is not ready to build:

1. **What tension exists** between the selected dialects?
2. **Why is that tension useful** for *this* project, specifically?
3. **What single principle reconciles them?**
4. **Which domain belongs to each dialect?** (the CONTROL MAP)
5. **Where must the secondary dialect stop?**
6. **What would make this collapse into a collage?**
7. **What would be lost if one dialect were removed?** If the answer is
   "nothing", remove it — that is PURE, and it is a better answer.

---

## Compatibility — reasoning, not a permission table

Pairings are not "compatible" or "incompatible". Each relationship has a tension,
a likely reconciling principle, a natural responsibility split, and a specific way
it fails.

| Pairing | Productive tension | Likely unifying principle | Natural split | Primary collision risk |
|---|---|---|---|---|
| **brutalist-utility + refined-elegance** | Exposed structure against considered proportion | *Honest structure, precisely made* | Brutalist owns composition, geometry, information display; refined owns spacing, rhythm, typographic detail | Refinement softens the structure until nothing is exposed — a normal page with wide margins |
| **swiss-editorial + expressive-poster** | Systematic order against confrontation | *One planned rupture inside a rigorous system* | Swiss owns grid, hierarchy, density; poster owns one scale collision and the display voice | The poster escapes its one moment; the grid becomes decoration behind noise |
| **cinematic-industrial + technical-luxury** | Atmosphere against evidence | *The object earns the drama it is given* | Cinematic owns light, depth, image; technical owns specification, detailing, information | Two dark, atmospheric systems merge into one mood with no facts in it |
| **organic-tactile + technical-luxury** | Human variation against machine precision | *Made by hand to a measured standard* | Organic owns texture, rhythm, image warmth; technical owns structure, spec, detailing | Texture becomes a veneer over a hard system, or precision reads as coldness with decoration |
| **retro-futurist + swiss-editorial** | Historical memory against neutral order | *Period logic, disciplined by a grid* | Swiss owns structure and hierarchy; retro owns one period mechanism and the palette logic | Costume: the grid disappears and the page becomes a pastiche |
| **immersive-authored-world + brutalist-utility** | Staged fiction against exposed function | *The machinery of the world is visible* | Immersive owns depth, scene, motion; brutalist owns interface, geometry, information | The scene swallows the controls, or the controls break the world's spatial claim |
| **auction-editorial + cinematic-industrial** | Catalogue restraint against dramatic scale | *The record, lit* | Auction owns metadata, hierarchy, restraint; cinematic owns image light and depth | Both defer, and the page becomes atmosphere with a caption |

### Combining a pair that is not in the table

The table is examples, not a permission list. For any pairing, derive it:

1. **Name each dialect's thesis in one line**, from its file.
2. **Find the axis they disagree on** — usually one of: order vs rupture, warmth vs
   precision, evidence vs atmosphere, exposure vs refinement, memory vs novelty.
   That disagreement is the tension; if you cannot find one, the pairing adds
   nothing and one of the two is redundant.
3. **Write the reconciling principle as a single sentence a client could repeat.**
   If it needs two sentences, the pairing has not been understood yet.
4. **Split by domain, not by section** — give each dialect the domains its thesis
   actually has an opinion about, and give contested domains to the Anchor.
5. **Name where the Contrast stops**, in domains, not in percentages.
6. **Name the collapse** — the specific way this pair becomes a collage — and put
   it in COLLISION RISKS so the critic can look for it.

**Do not pair three dialects as equals.** Three roles exist; three Anchors do not.

---

## The page-wide dialect audit

Runs after a build, alongside the [critique panel](../TASTE.md#2b-the-critique-panel).
The composition critic's fourth standing question calls it.

1. Does the whole page express **one** central idea?
2. Can the **Anchor** still be identified from the artefact alone?
3. Is the **Contrast** present as productive tension, or as interruption?
4. Is the **Signature** still doing one job, in one place, at one scale?
5. Are responsibilities **consistent across sections** — same owner per domain?
6. Do any sections look **imported from another art direction**?
7. Would **removing a dialect** make the concept clearer?
8. Would cutting **~20% of the visual devices** strengthen the dialect
   relationship?
9. **What would be strengthened** by that cut?
10. **What would be lost?**

**Questions 7 and 8 may not be answered by reflex.** "Simplify" is not a finding.
Each removal is argued both ways, and *keep it* is a legitimate verdict said
plainly. So is *this page needs a device it does not have*.

---

## Worked examples — reasoning, not layouts

**1 · Automotive service business.** Anchor `brutalist-utility`, Contrast
`refined-elegance`, Signature `cinematic-industrial` (image lighting only).
Unifying principle: *workshop honesty, presented with professional precision.*
Brutalist owns composition, geometry and how information is displayed — the bay,
the lift, the price, the hours are structural, not decorated. Refined owns spacing
and typographic detail everywhere, which is what separates "honest" from "cheap".
The cinematic signature lights the photography and touches nothing else.
Guardrails: the moment refinement reaches the composition, the structure stops
being exposed and the page becomes ordinary; the moment cinematic reaches type or
layout, the shop becomes a car advert. Task means — call, hours, address, what is
serviced — are owned by the task under every mode.

**2 · High-end performance dealership.** Anchor `technical-luxury`, Contrast
`expressive-poster`, Signature `auction-editorial` (evidence behaviour — the
composed record). Unifying principle: *the specification is the seduction.*
Technical owns structure, detailing and information; the poster owns exactly one
scale collision, where the car meets its own name; auction-editorial contributes
how provenance and specification are composed as a record rather than dumped as a
table. Guardrail: if the poster moment repeats, the page becomes a campaign and the
evidence stops being credible.

**3 · Cultural / editorial project.** Anchor `swiss-editorial`, Contrast
`organic-tactile`, Signature a limited `retro-futurist` interaction cue. Unifying
principle: *an ordered archive of things made by hand.* Swiss owns grid, hierarchy
and density; organic owns image warmth, texture and rhythmic variation within that
grid; the retro cue appears on one interaction — a control that behaves like
period equipment — and nowhere else. Guardrail: texture must not soften the grid
into a scrapbook, which is the failure this pairing has.

**4 · PURE brutalist execution.** `STYLE MODE: PURE · DIALECT: brutalist-utility`,
every hybrid field n/a. Exposed structure, hard hierarchy, governed irregularity,
controls as compositional material. **And:** AA contrast, 44px targets, a 14px
functional floor, visible focus, keyboard order matching the visual one, real
alt text. PURE removes other *dialects*, not the invariants — a page that is hard
to read is not more brutalist, it is less finished. Ugliness is not a dialect and
inconvenience is not a position.

**5 · A failed hybrid — why this is not a Design DNA hybrid.** A page with a
brutalist hero, an elegant services section, a cinematic testimonial band and a
retro-futurist footer. Each section is defensible and photographs well. It fails
because the dialects were assigned **to sections instead of to responsibilities**:
there is no page-wide owner of the grid, four different geometry logics, four image
treatments, and a reader whose model of the page is invalidated three times on the
way down. There is no Anchor to identify, no tension — only sequence — and no
unifying principle, because none was needed to build it. Diagnosed by
[U11](../skills/anti-patterns/SKILL.md#invariant); found by the
[section-language ledger](../TASTE.md#2c-selection-coherence-and-device-discipline);
prevented by a CONTROL MAP written before the first section.

---

## Aliases — user language, read as clues

Natural language maps to dialects, and **the mapping is a clue, not a
substitution.** Context can override it: "brutalist" from a client who means
"plain and cheap to build" is a different request from "brutalist" meaning exposed
structure.

| What Alex says | Read as |
|---|---|
| brutalism · brutalist · raw · raw utility | [brutalist-utility](brutalist-utility.md) |
| elegant · refined · sophisticated · understated | [refined-elegance](refined-elegance.md) |
| Swiss · grid-led · editorial grid · international style | [swiss-editorial](swiss-editorial.md) |
| cinematic · dark industrial · mechanical atmosphere · filmic | [cinematic-industrial](cinematic-industrial.md) |
| retro future · retro-tech · period sci-fi | [retro-futurist](retro-futurist.md) |
| poster-like · expressive type · loud typography | [expressive-poster](expressive-poster.md) |
| engineered premium · precision luxury · spec-led | [technical-luxury](technical-luxury.md) |
| tactile · human · natural material · warm | [organic-tactile](organic-tactile.md) |
| auction · catalogue · lot · collector record | [auction-editorial](auction-editorial.md) |
| immersive · world · staged · scene | [immersive-authored-world](immersive-authored-world.md) |

One dialect named → **PURE**. Two or more named → **DIRECTED HYBRID**. None named
→ **HYBRID**. A request for something plain and conventional → the mode Alex asked
for, stated as such.

**A style label is not a decision.** "Make it brutalist" sets the mode and the
Anchor; it does not answer the central idea, the control map, or what any of it
strengthens. Those are still the work.

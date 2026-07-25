---
name: immersive-authored-world
description: PROVISIONAL personal dialect — the page behaves as a staged spatial experience rather than a conventional document. One symbolic central event, layered depth, in-world typography and interface, motion that changes narrative state, controlled surrealism, atmospheric texture, and spectacle separated by silence. Load only when a Design Read explicitly selects it; never inferred or recommended automatically.
status: provisional
---

# Dialect — immersive-authored-world

> ## ⚠ PROVISIONAL
>
> **Author-created ahead of sufficient Vault evidence.** This dialect was written
> from intent, not distilled from references, which is the reverse of how
> [vault/README.md](../vault/README.md#creating-a-new-dialect) says dialects
> normally come into being.
>
> **It is confirmed only when at least three human-reviewed Vault entries
> explicitly carry `dialects: ["immersive-authored-world"]` with
> `dialectStatus: "in"`.** Until then it is a working hypothesis about a way of
> deciding — usable when Alex selects it, but not yet evidence-backed, and not a
> precedent for creating further dialects this way.
>
> Provisional status is tracked in [dialects/README.md](README.md).

**The page may behave as a staged spatial experience rather than a conventional
document.**

**This is a dialect, not a law.** Every preference here is a strong default with a
stated exit. The invariants in `skills/` bind regardless of which dialect is
active — see [INVARIANT COMPLIANCE](#invariant-compliance) below, which is not
optional and not negotiable.

**Selection is a human decision.** Per [TASTE.md §2](../TASTE.md#2-the-design-read),
this dialect applies only when Alex names it in the Design Read. Do not infer it
from a brief, do not recommend it, do not reach for it because a project sounds
creative or a brief is thin. An underspecified brief becomes `brief-derived`, never
this.

**It does not merge with [auction-editorial](auction-editorial.md).** They are
separate dialects with different logic. A partial combination is legal in a Design
Read, but it must be declared as a partial and the parts named.

---

## PRINCIPLES — compositional logic and decision tendencies

### P1 — One symbolic central object or governing visual event

The scene has a single subject that carries the meaning: an object, a figure, a
threshold, a moment. Everything else exists in relation to it.

*Why:* a staged space without a subject is a demo. The symbol is what makes the
spectacle legible as an idea rather than as capability.

### P2 — Layered depth and deliberate figure-ground relationships

Compose in planes — foreground, subject, midground, atmosphere — and decide what
occupies each. Depth is authored, not accumulated.

*Why:* immersion comes from the reader locating themselves in a space, which
requires the planes to be distinct and consistent. This is
[C4](../skills/academic-composition/SKILL.md#invariant) taken into three
dimensions, and [U9](../skills/anti-patterns/SKILL.md#invariant) governs whether
those depth cues are allowed to be non-literal.

### P3 — Typography integrated into the scene

Type sits *in* the space: occluded by objects, catching the scene's light, aligned
to its perspective, scaled by its depth — rather than floating on a separate UI
plane above it.

*Why:* type that ignores the space it is drawn over breaks the fiction faster than
any other element, because it announces two unrelated coordinate systems.

### P4 — Interface elements that belong to the fictional world

Controls, labels, navigation, and states are drawn from the world's own logic —
diegetic rather than generic. A control can be a mechanism, a marking, a light.

*Why:* a default component set inside an authored world reads as a website with a
picture behind it. Diegetic interface is the difference between a set and a scene.

### P5 — Motion that changes narrative state, not merely reveals content

Movement advances something: a state, a moment, a consequence. Motion whose only
job is to make content appear belongs to a quieter dialect.

*Why:* in a staged experience motion is the medium of causality. Reveal-only
animation spends the reader's attention and returns no story.

### P6 — Controlled surrealism and unexpected mixtures of cultural languages

Juxtapositions that would not co-occur naturally — periods, registers, materials,
idioms — held under one authored logic.

*Why:* surrealism creates the sense of an authored world rather than a photographed
one. **Controlled** is the load-bearing word: the mixture needs a rule the viewer
can feel, or it reads as arbitrary.

### P7 — Atmospheric texture

Grain, bloom, particles, volumetric light, spatial audio — as the air of the scene,
not as a filter applied afterwards.

*Why:* texture is what makes a rendered space feel inhabited; perfectly clean
surfaces read as a mockup. Audio only ever plays on deliberate user action — never
on load, always with a visible control, and silence is a valid default.

### P8 — Moments of spectacle separated by visual silence

Spectacle is rationed and framed by quiet. Silence is composed with the same care
as the event.

*Why:* spectacle is defined by contrast with stillness. Continuous intensity
flattens into noise and the reader stops registering any of it — the same mechanism
as [C10](../skills/academic-composition/SKILL.md#invariant), applied to intensity
over time.

---

## EFFECT HIERARCHY

**Strict, and in this order:**

```
primary event  →  supporting motion  →  ambient motion  →  interaction feedback
```

- **Primary event** — the one thing the moment is about. At most one at a time.
- **Supporting motion** — moves because of the primary event; subordinate to it.
- **Ambient motion** — the scene breathing. Continuous, low amplitude, never
  competing.
- **Interaction feedback** — the quietest layer, and never suppressed by the
  others: a control must still visibly respond during a spectacle.

Each tier is quieter than the one above it. If two tiers read as equally loud, the
hierarchy has collapsed and the scene is noise.

---

## AVOID

- **Technology demonstrations without an emotional idea** — capability shown for
  its own sake. If the answer to "what is this about" is a technique, it isn't
  finished.
- **Simultaneous animation of every layer** — a direct violation of the effect
  hierarchy above.
- **Generic glassmorphism as a substitute for composition** — frosted panels
  standing in for figure-ground decisions. The panel is not the composition.
- **Illegible HUD microtext** — in-world text that cannot actually be read. This is
  not a separate rule: it is **[color-taste I1](../skills/color-taste/SKILL.md#invariant)
  (WCAG AA) applying to in-world text exactly as it applies to everything else.**
  Atmosphere is not an exemption, and diegetic framing does not lower the ratio.
- **Decorative 3D objects with no symbolic role** — geometry present because it
  renders. Fails P1 and [C1](../skills/academic-composition/SKILL.md#invariant).
- **Continuous motion without stillness or resolution** — no silence, no landing.
  Fails P8 and [C11](../skills/academic-composition/SKILL.md#invariant).

---

## `yields when:`

- transactional usability requires a quieter structure — checkout, forms, account
  management, anything where the user has a task rather than an experience;
- the content is dense information that must be scanned or compared;
- accessibility requires it — motion sensitivity, screen-reader flows, cognitive
  load, low-bandwidth or assistive contexts;
- performance requires it — the device, connection, or frame budget cannot carry
  the scene, and a degraded scene is worse than a composed quiet page;
- audience expectations require familiarity, speed, or trust signals that a staged
  experience undercuts.

Yielding here means choosing a different dialect for that surface, not building a
half-staged one. A checkout inside an authored world should be quiet and
conventional, and that is not a failure of this dialect.

---

## INVARIANT COMPLIANCE

Not optional, not negotiable, and not modified by anything above.

- **[Academic composition C1–C12](../skills/academic-composition/SKILL.md#invariant)
  remain binding in full.** A staged scene still needs a dominant with
  subordinates and support, unity, tonal structure before colour, figure-ground
  clarity, optically judged balance, a directed eye path, rhythm, considered mass
  proportions, committed edges, tension with counterweight, resolution, and
  responsive recomposition. Atmosphere is not a substitute for any of them.
- **Reduced motion must produce a directed, intentionally composed static scene —
  not a gutted version of the page.** The still frame is a designed deliverable:
  choose the moment, compose it, keep the symbol and the depth. Content must never
  be missing or invisible under
  [motion I1](../skills/motion-taste/SKILL.md#invariant), and a scene that only
  makes sense once it moves has failed the invariant, not the setting.
- **Motion stays `opacity`/`transform` based and introduces no layout shift**
  ([motion I4](../skills/motion-taste/SKILL.md#invariant)). Atmospheric ambition
  does not license animating layout properties or shifting content under the
  reader.
- **WCAG AA applies to all in-world text**
  ([color-taste I1](../skills/color-taste/SKILL.md#invariant)) — labels, HUD
  microtext, captions, diegetic markings, type composited into the scene. Measure
  against the worst-case region the text overlaps
  ([color-taste I4](../skills/color-taste/SKILL.md#invariant)) and fix it at the
  background layer, since a moving scene makes the worst case move too.

Additionally, and following from the invariants rather than from this dialect:
audio never autoplays, spectacle never blocks input, and every effect tier
degrades to the static scene above.

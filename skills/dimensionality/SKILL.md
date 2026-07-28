---
name: dimensionality
description: Constructed depth and choreographed time — 3D scenes, camera, material and light, scroll-linked and timeline motion — in two tiers. Declares a ROLE (MAIN / SUPPORT / ABSENT) once per brief before any technique is chosen, then binds ten invariants (DM1–DM10) covering removability, first read, frame budget, reduced-motion fallback, per-frame contrast, one depth idea, input honesty, choreography subject, reading-zone stillness, and separately authored mobile. Tool-agnostic. Use before proposing a 3D scene, a camera move, a scroll-linked timeline, or any material/light treatment.
---

# Dimensionality

Constructed depth and choreographed time. Everything here applies whether the
depth is real (a rendered scene with a camera), implied (parallax, layered
planes, occlusion), or temporal (a timeline, a scroll-linked sequence).

**Tool-agnostic by design.** A technique is never a direction — see
[Tool notes](#tool-notes-non-normative), which are reference only.

---

## ROLE LADDER

**Declare the role once per brief, before choosing any technique.** The role is a
statement about what the depth is *for*, and it decides which invariants bite
hardest.

| Role | Meaning |
|---|---|
| **MAIN** | Depth or motion **is** the composition. Remove it and there is no design left — the scene carries the dominant, the eye path, and the resolution. |
| **SUPPORT** | It reinforces a composition that **stands without it**. The page is complete and legible with the scene switched off; depth adds emphasis, atmosphere, or continuity. |
| **ABSENT** | Deliberately unused. **Must be defensible** — "we didn't think about it" is not ABSENT, it is an omission. State what carries depth instead: tone, scale, overlap, typography. |

**Promotion mid-project is not free.** Moving SUPPORT → MAIN **requires re-running
the Design Read**, because it changes the dominant, the eye path, the frame
budget, and usually the dialect. Demotion (MAIN → SUPPORT/ABSENT) does not — you
may always subtract.

**Log the declared role in the Design Read output** ([TASTE.md §2](../../TASTE.md#2-the-design-read)).
A brief with no role line has not been read.

---

## INVARIANT

*Universal — they hold at every role, in every dialect, with every tool. The role
changes how much they cost, never whether they apply.*

### DM1 — Content survives removal at SUPPORT

At SUPPORT and ABSENT, **every piece of content and every action must remain
present, reachable, and legible with the scene removed.** Not degraded — present.
Build the page so that deleting the canvas leaves a complete design.

*Why:* SUPPORT is a promise that the composition stands on its own. If it doesn't,
the role was mis-declared and the honest answer was MAIN — which carries obligations
D2–D10 at full weight. This is also what makes a scene safe to drop on a slow
device, a failed load, or a reduced-motion request.

### DM2 — No scene gates the first read

The primary content must be readable **before** the scene loads, initialises, or
finishes its entrance. No preloader holding the page hostage, no first paint that
waits on a canvas, no "enter" gate before the reason the user came.

*Why:* a scene is the most expensive thing on the page and the most likely to fail.
Gating the first read behind it converts a slow asset into a broken product — a
failure mode the vault has already recorded in a rating-2 entry whose preloader can
trap the visitor.

### DM3 — Frame and payload budget declared up front

State the budget **before building**: target frame rate on the worst device you
intend to support, and a hard ceiling on scene payload. Measure against it, and
when you exceed it, cut scope — not the budget.

*Why:* depth work has no natural stopping point; without a declared number the
scene grows until something else breaks. A budget written down before the first
asset is the only version anyone honours.

### DM4 — prefers-reduced-motion gets an authored fallback

Not a disabled scene — an **authored** one. Choose the frame, compose it, and let
it carry the same idea. A still that is obviously "the animation, stopped" is a
failure of the fallback, not of the setting.

*Why:* motion sensitivity is a health condition, and the reduced-motion path is a
deliverable with its own composition. This extends
[motion I1](../motion-taste/SKILL.md#invariant) into constructed depth: the same
obligation, applied to a scene rather than a transition.

### DM5 — AA holds over moving layers, per frame

Text over a moving or rendered layer must meet
[color-taste I1](../color-taste/SKILL.md#invariant) **at every frame it is
readable during** — not at the average, not at the opening frame. When the
background moves, the worst case moves with it.

*Why:* a scrim tuned to one frame fails three seconds later. Either constrain the
region behind the text for the whole duration, or fix legibility at the layer
between text and scene — never by weighting the type.

### DM6 — One depth idea per view

A view gets **one** spatial concept: one camera behaviour, one parallax logic, one
layering model. Two competing depth systems in the same view read as an accident,
because the viewer cannot build a single mental model of the space.

*Why:* depth is a claim about where things are. Two claims contradict, and the eye
resolves the contradiction as noise. This is
[U9](../anti-patterns/SKILL.md#invariant) (depth cues coherent with the spatial
model) taken forward: U9 forbids lying about the model, D6 forbids running two.

### DM7 — Input honesty

Anything that looks draggable, orbitable, hoverable or scrubable **must be**. The
inverse also binds: if a scene responds to input, that must be discoverable without
trial. Do not fake interactivity with an autoplaying loop, and do not hide real
interactivity behind an undiscoverable affordance.

*Why:* a 3D object trains the expectation that it can be manipulated. An unfulfilled
affordance costs the user an attempt and the design its credibility — and on touch
it steals the gesture the page needed for scrolling.

### DM8 — Choreography has a subject

Every timeline answers "what is this about?" in one sentence. Sequenced motion must
move a **subject** through a **change** — a state, a reveal, a consequence. Motion
that exists because a timeline exists is decoration on a schedule.

*Why:* choreography is expensive attention. Without a subject it becomes a screensaver
the user has to sit through, and the second viewing is where that is felt. Extends
[motion I5](../motion-taste/SKILL.md#invariant) from single transitions to sequences.

### DM9 — No perpetual ambient motion in reading zones

Nothing loops indefinitely behind, beside, or within a block of body copy.
Ambient motion belongs where nobody is reading, or it stops.

*Why:* peripheral movement is involuntarily attention-capturing; it makes sustained
reading measurably harder and cannot be ignored on request. A reader should not have
to scroll a paragraph away from an animation to finish a sentence.

### DM10 — Mobile is authored separately

The mobile scene is a **separate authored composition**, not the desktop scene at a
smaller size with a lighter mesh. Re-decide the camera, the crop, the subject scale,
the interaction, and whether the scene should exist at all on that device.

*Why:* the mechanism that creates dominance at 1440px usually does not exist at
390px — which is the same substitution rule as
[C12](../academic-composition/SKILL.md#invariant), applied to constructed space.
Phones also carry the tightest frame budget and the most hostile conditions, so
"scene ABSENT on mobile" is a legitimate and often correct authored answer.

---

## DIALECT

### auction-editorial — default ABSENT or SUPPORT

MAIN is available but is **not** this dialect's instinct: restraint is the house
position, and a scene that becomes the composition contradicts
[P1](../../dialects/auction-editorial.md#p1--subtract-before-adding) (subtract
before adding) and [P8](../../dialects/auction-editorial.md#p8--motion-seasons-it-does-not-perform)
(motion seasons, it does not perform).

**Material and light over geometry.** When depth is used, it reads through surface
and illumination — grain, weight, the way light falls across a form — rather than
through shape count or camera acrobatics. A single well-lit object beats an
articulated scene.

**Patient camera.** Slow, few moves, long holds. The camera observes; it does not
tour. Cuts are preferred to swoops.

*These are expressions, never a checklist.* A design belongs to this dialect by its
reasoning, not by containing a lit object.

`yields when:` the brief is genuinely about a made thing whose form is the
argument — a product, a material, a physical mechanism — and showing it in space
communicates faster than describing it; or the audience expects spatial
demonstration as evidence of capability. Then MAIN is defensible, and DM1–DM10 tighten
accordingly.

### immersive-authored-world — MAIN permitted

MAIN is native here: the page may behave as a staged spatial experience.

**Defer to that dialect's existing effect hierarchy** — primary event → supporting
motion → ambient motion → interaction feedback
([immersive-authored-world](../../dialects/immersive-authored-world.md#effect-hierarchy)).
This skill does not restate or fork it; where the two overlap, the effect hierarchy
governs sequencing and this skill governs the invariants.

Note that D9 and that dialect's ambient tier are compatible: ambient motion is
permitted *as the quietest tier*, and D9 says where it may not go — behind reading.

**Its PROVISIONAL status is unchanged.** Selecting MAIN does not promote the
dialect, and the dialect is still never inferred: it applies only when Alex names
it. Confirmation still requires three human-reviewed vault entries carrying it with
`dialectStatus: "in"`.

`yields when:` the dialect's own yields-when fires — transactional usability, dense
information, accessibility, performance, or audience expectations requiring a
quieter structure. Then the role drops to SUPPORT or ABSENT for that surface, which
is a role change, not a betrayal of the dialect.

---

## Tool notes (non-normative)

**Reference only. These are not rules, and no direction may be named after any of
them** (see [anti-patterns](../anti-patterns/SKILL.md#dialect)).

| Tool | What it actually gives you |
|---|---|
| **Three.js** | Arbitrary real depth — full control of camera, material, and light. The **highest cost** in payload, build time, and maintenance, and it **must be earned**: reach for it when the brief needs depth nothing else can express, not when it needs a look. |
| **Spline** | Fast authored scenes with a short path from idea to page. Carries a **recognisable house look** — the default material and lighting are identifiable at a glance — **which must be overridden**, or the work advertises its tool instead of its idea. |
| **GSAP** | Choreography and timelines. Most often justified at **SUPPORT**, where sequencing clarifies a composition that already stands; at MAIN it is doing a job the composition should be doing. |

The role and the invariants decide what is appropriate. The tool follows, and is an
implementation note in the report — never the direction.

---

## Checklist

**Before any technique is chosen**
- [ ] Role declared: MAIN / SUPPORT / ABSENT, and logged in the Design Read.
- [ ] If ABSENT: what carries depth instead is stated.
- [ ] Frame rate target and payload ceiling written down (DM3).

**Invariant — every deliverable that uses constructed depth or time**
- [ ] Content complete with the scene removed, at SUPPORT and ABSENT (DM1).
- [ ] First read never waits on the scene (DM2).
- [ ] Measured against the declared budget; scope cut, not budget raised (DM3).
- [ ] Reduced-motion fallback is an authored still, not a stopped animation (DM4).
- [ ] Contrast verified per frame over moving layers (DM5).
- [ ] Exactly one depth idea in the view (DM6).
- [ ] Every apparent affordance is real; every real one is discoverable (DM7).
- [ ] Each timeline's subject nameable in one sentence (DM8).
- [ ] No perpetual motion in any reading zone (DM9).
- [ ] Mobile scene authored separately, including the option of not existing (DM10).

**Dialect**
- [ ] auction-editorial: ABSENT or SUPPORT unless the yields-when is named.
- [ ] immersive-authored-world: effect hierarchy respected; PROVISIONAL intact.
- [ ] No direction named after a tool.

---
name: motion-judgment
description: How to decide whether a page should move at all, what earns movement, and what must stay still — nine invariants (MJ1–MJ9) covering declared role before effect, one primary temporal idea per viewport, the subject deciding rather than the amount, every stoppable frame being a designed frame, the static build standing alone, the user keeping the transport, comprehension never waiting on choreography, separately authored mobile, and reduced motion that preserves meaning. Contains the MOTION READ and MOTION PLAN, a five-level motion hierarchy, camera vocabulary, and routes to references/ for per-category judgment, the audit rubric and framework-neutral implementation. Use before proposing any animation, scroll effect, transition, hover treatment or loading choreography, and when auditing motion that already exists.
---

# Motion Judgment

**This skill decides whether motion should exist and what it is for.
[motion-taste](../motion-taste/SKILL.md) governs how it behaves once it does, and
[dimensionality](../dimensionality/SKILL.md) governs constructed depth and
scroll-linked timelines.** Three skills, one domain, no overlap: judgment, feel,
depth. When they are all in play, read this one first — a well-eased, accessible,
sixty-frame animation of something that should not be animated is still wrong.

**It is not an animation catalogue.** Nothing here recommends an effect because a
category for it exists. Most of the work this skill does is subtraction.

## The distinction everything rests on

**Motion earns its place when it reveals meaning, establishes temporal hierarchy,
clarifies interaction, expresses the nature of the subject, or controls attention.**

**Motion is weak when it demonstrates technical capability, decorates a composition
that was already understood, delays access to content, or makes every element
compete to be noticed.**

> **Evidence — the governing contrast.**
> `[P evidence:C1e sites:thenewmobileworkforce-imm-g-prod-com-back-at-hq,trionn-com]`
> Both records are `in`. In the first, motion *is* the subject — *"скорость выражена
> не фотографией болида, а самой навигацией"* — and the interface behaves like the
> system it describes. In the second, the same ambition is recorded as a failure —
> *"motion здесь часто демонстрирует возможности технологии, а не раскрывает
> содержание"*. **The discriminator is the subject, not the amount.**

**This is not "less motion is better."** Expressive, cinematic, highly visible
motion is accepted, and the strongest positive record in the evidence is one of the
most heavily animated pages in the vault. What is rejected is motion with no
answerable role.

---

## INVARIANT

Nine rules, `MJ1`–`MJ9`. Namespaced because `M#` and `D#` already mean something in
[motion-taste](../motion-taste/SKILL.md). These hold under every dialect and every
style mode.

**This skill has no DIALECT tier.** The house motion feel — crossfade over travel,
the 2px hover lift, skeletons over spinners, motion never as identity — already
lives in [motion-taste](../motion-taste/SKILL.md) `D1`–`D4`. Judgment about whether
to move at all is not a matter of taste position, so it does not yield to one.

### MJ1 — The role is declared before the effect

**Every motion system states, in one sentence and before it is built, what job it
does.** A system with no answerable role is not refined; it is removed.

Valid roles: **orientation** · **hierarchy** · **continuity** · **state change** ·
**feedback** · **spatial explanation** · **narrative progression** · **atmosphere** ·
**subject expression**.

Not roles: *make it feel premium* · *make it dynamic* · *add visual interest* ·
*modern sites do this* · *the section felt empty*. These name a mood or a fear, not
a job, and a mood cannot be tested afterwards.

*Why it's invariant:* the role is the only thing the finished work can be judged
against. Without it, every effect survives review, because "does it look good" has
no failing answer and "what was this for" has one.

`[J]`, with the failing case observed: `[R site:trionn-com]` — *"эффектов больше,
чем смысловой необходимости"*, against a stated central idea of *designed to mean
intention*. A page can declare intent and still animate without it.

### MJ2 — One primary temporal idea per viewport

**Motion is ranked, not levelled.** Five bands, and the top one is singular:

| Band | What it is | Budget |
|---|---|---|
| **1 · Primary** | The one dominant temporal idea of a page, section or moment | **One at a time.** Never two in a viewport |
| **2 · Structural** | Navigation, section transitions, layout change, spatial relationship | As many as the structure genuinely has |
| **3 · Interaction feedback** | Hover, press, focus, drag, selection, confirmation | Every interactive element, uniformly |
| **4 · Atmospheric** | Background or ambient movement | Subordinate to content, always |
| **5 · Micro** | Small tactile detail | Sparingly, and never on a reading surface |

A band-4 or band-5 effect that draws attention away from band 1 has been promoted
by accident and must be reduced or cut.

*Why it's invariant:* attention is not divisible. Two things competing to be
noticed first means neither is, and the page reads as busy rather than as authored.
This is [C1](../academic-composition/SKILL.md#invariant) in the time dimension: a
composition has one dominant, and so does a choreography.

`[R site:trionn-com]` — *"Blast, sparks, helix, exploding letters, frame sequence,
stripe wipes — каждый эпизод хочет стать главным."* Every episode wanting to be
primary is the same defect as no dominant at all.

### MJ3 — The subject decides, not the amount

**Ask what the subject *is* before asking how much to move.** Where the subject is
temporal — speed, process, sequence, transformation, performance, live state —
expressive motion is not decoration but description, and restraint would be a
failure to say the thing. Where the subject is static — a text, a specification, a
catalogue, a service — motion returns to seasoning.

*Why it's invariant:* this is the one thing the evidence discriminates on, and it
discriminates cleanly. Both records are heavily animated; only one is criticised.

`[P evidence:C1e sites:thenewmobileworkforce-imm-g-prod-com-back-at-hq,trionn-com]`.

Related, and separately recorded: the transition **between two modes of presenting
the same subject** can itself be the system — a subject moving between a cinematic
register and a classified, configurable one, with the change of register designed
rather than incidental `[R site:porsche-com-usa]`. That is one record's device and a
partial judgement; it is not a rule.

### MJ4 — Every frame a user can stop on is a designed frame

**A mid-transition state is a state.** Users scroll fast, scroll back, tab away,
land mid-sequence and stop wherever they stop. If a frame that can be held is
illegible, incomplete or nonsensical, the effect is not finished.

Test it by stopping: at 25%, 50% and 75% of every scrubbed or scroll-linked
sequence, is the content readable and is the section identifiable?

*Why it's invariant:* the animation is not the artefact — the frames are. An
effect that only reads at full speed is a video that the user is not permitted to
pause.

`[R site:trionn-com]` — **measured on the captured frames, not inferred**: the
services sequence was caught mid-explosion with the section heading scattered into
loose characters and its own strapline broken across the effect. The section is on
screen and cannot be read.

### MJ5 — The static build stands alone first

**Design and evaluate the page with every animation removed.** Hierarchy, reading
order, meaning and the means of the visitor's task must all survive with nothing
moving. Motion is added to a page that already works.

*Why it's invariant:* motion applied to a weak composition hides the weakness from
its author and from nobody else. A page whose hierarchy only exists while things are
moving has no hierarchy.

Floor, and it is not negotiable: [motion-taste I5](../motion-taste/SKILL.md#invariant)
(gratuitous motion is a defect) and
[dimensionality DM1–DM2](../dimensionality/SKILL.md#invariant) (content survives
removal; no scene gates the first read).

### MJ6 — The user keeps the transport

**Scroll belongs to the reader.** Motion may be *driven* by scroll; it may not take
scroll away. No hijacking, no forced pacing, no section that cannot be left, no
sequence that must be watched to completion.

Scroll distance is budgeted against narrative change: a long pin that advances the
story by one line is a page that has stopped.

*Why it's invariant:* the scrollbar is the one control every visitor already knows.
Removing it to deliver choreography trades the whole audience's agency for one
author's timing.

`[R site:thenewmobileworkforce-imm-g-prod-com-back-at-hq]` — the positive case
hands transport over explicitly: **PREV / NEXT**, a named channel selector, and a
`SOUND` toggle exposed as a first-class control rather than buried. The user chooses
when the next spatial transition happens.

### MJ7 — Comprehension never waits on choreography

**What the page is, and what it offers, is available before any animation
completes.** An interface that must be learned before it informs has inverted its
own purpose.

*Why it's invariant:* the visitor arrived for the content. Time spent decoding the
mechanism is time the mechanism took from the thing it was built to present.

`[R site:thenewmobileworkforce-imm-g-prod-com-back-at-hq]` — recorded as the cost
of even the successful case: *"Navigation эффектная, но требует изучения —
пользователь сначала осваивает интерфейс, а потом получает информацию"*, and
*"из-за переходов просмотр может ощущаться медленнее, хотя визуально всё изображает
скорость."* **The strongest motion reference in the vault carries this as its own
weakness.** Approving the approach is not approving the cost.

`[R site:trionn-com]` records the same shape from the other side: *"Пользователю
нужно научиться взаимодействовать с hero, хотя эти действия не помогают выбрать
услугу или найти проект."*

### MJ8 — Mobile choreography is authored, not scaled

**Decide mobile motion separately.** A desktop sequence ported to a phone loses the
spatial room it depended on, costs more to run, and lands on a device held in one
hand with a thumb over part of the screen.

Re-author, reduce, or replace — and if a sequence has no mobile answer, it is a
desktop enhancement, which means the mobile build must be complete without it.

*Why it's invariant:* it is the majority device, and the failure is silent — the
sequence still technically runs.

Floor: [dimensionality DM10](../dimensionality/SKILL.md#invariant).
`[R site:thenewmobileworkforce-imm-g-prod-com-back-at-hq]` — *"на mobile
пространственный эффект неизбежно теряет часть глубины и кинематографичности"*,
and its mobile frame keeps the same one-subject structure and the same PREV/NEXT
rather than compressing the desktop composition.
`[R site:trionn-com]` — recorded as done right: separate motion logic for mobile
and reduced-motion support, *"важный признак продуманной реализации"*, in a record
otherwise criticised for its motion.

### MJ9 — Reduced motion preserves meaning, not just stillness

**`prefers-reduced-motion` is an authored alternative, not a switch that disables
the interface.** Every state change, every reveal, every piece of information a
sequence was carrying must still arrive — instantly, or through opacity, or as a
static composition built for the purpose.

A reduced-motion path that leaves content hidden, a sequence unresolved or a
control unlabelled is a bug, not an accommodation.

*Why it's invariant:* the setting expresses a physical need. Answering it by
removing function punishes the user for having it.

Floor: [motion-taste I1](../motion-taste/SKILL.md#invariant) and
[dimensionality DM4](../dimensionality/SKILL.md#invariant).

---

## MOTION READ

Runs **after the Composition Read and Plan** — the static structure must exist
before anything is scheduled in time — and **before any animation is written.**

Output these lines. Short answers. `not needed` is a complete and frequent answer.

```
Subject          <what the page is about, and whether it is temporal>
Journey          <what the visitor does, in order>
Static verdict   <does the page work with nothing moving? if no, stop and fix that>
Time adds        <the moments where time carries meaning static layout cannot>
Primary idea     <the one dominant temporal idea — or "none">
Stable           <what must not move, ever>
Roles            <each proposed system: name -> role from MJ1>
Transport        <who controls pacing: the reader, or the page>
Mobile           <re-authored / reduced / absent>
Reduced motion   <what the authored alternative is>
Cut              <what was proposed and rejected, and why>
```

**The `Cut` line is required and may not be empty on a page of any size.** A motion
plan that rejected nothing did not make decisions.

## MOTION PLAN

Then, and only then:

1. **Storyboard in plain language** before any code — what the visitor sees, in
   order, in sentences. If it cannot be described, it cannot be directed.
2. **Build the smallest convincing version.** Ship the idea, not the maximum
   expression of it.
3. **Test the four scrolls:** normal, fast, interrupted mid-sequence, reversed.
4. **Test the four contexts:** desktop, mobile, keyboard only, reduced motion.
5. **Remove what cannot defend its role.** Re-read the `Roles` line against what
   actually shipped.
6. **Critique the whole as one rhythm** — not effect by effect. Where does it
   accelerate, where does it rest, and does the rest exist on purpose?

---

## Routing

| Read this | When |
|---|---|
| [references/motion-judgment.md](references/motion-judgment.md) | Per-category judgment — entrances, scroll, parallax, pinning, navigation, hover, typography, video, cursors, loaders, ambient loops — plus camera vocabulary and timing judgment |
| [references/motion-audit.md](references/motion-audit.md) | Auditing motion that exists: severity rubric, the AI-overload diagnostic, and what to remove first |
| [references/implementation.md](references/implementation.md) | Framework-neutral implementation and the verification pass |

## Checklist

- [ ] The page works with every animation removed `MJ5`
- [ ] Every motion system has a role from the MJ1 list, written down `MJ1`
- [ ] Exactly one primary temporal idea per viewport `MJ2`
- [ ] The amount of motion is argued from what the subject *is* `MJ3`
- [ ] Every stoppable frame is legible — checked at 25 / 50 / 75% `MJ4`
- [ ] The reader still controls pacing `MJ6`
- [ ] What the page is is clear before any sequence finishes `MJ7`
- [ ] Mobile choreography decided separately, not inherited `MJ8`
- [ ] Reduced motion delivers the same meaning and state `MJ9`
- [ ] The `Cut` line is not empty

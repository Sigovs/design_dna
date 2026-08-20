---
name: motion-judgment
description: How to decide whether a page should move at all, what earns movement, and what must stay still — ten invariants (MJ1–MJ10) covering declared role before effect, one primary temporal idea per viewport, the subject deciding rather than the amount, every stoppable frame being a designed frame, the static build standing alone, the user keeping the transport, comprehension never waiting on choreography, separately authored mobile, reduced motion that preserves meaning, and a device earning the advance it consumes. Contains the MOTION READ and MOTION PLAN, a five-level motion hierarchy, camera vocabulary, and routes to references/ for per-category judgment, the audit rubric and framework-neutral implementation. Use before proposing any animation, scroll effect, transition, hover treatment or loading choreography, and when auditing motion that already exists.
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

**Continuity between chapters is structural work, not decoration.** Motion that
carries one section into the next — an overlay holding the outgoing chapter while
the incoming one arrives, a film that continues the surrounding environment instead
of sitting inside a rectangle — is band 2 doing exactly its job.

**Repetition alone does not remove a transition from band 2.** A device used at
every seam may be the page's grammar, telling the visitor that a state or a chapter
has changed. It leaves the structural band when the same device is applied
regardless of what relationship the seam needs to express — when it no longer
clarifies continuity, contrast, hierarchy or change and survives only as a
signature effect.

`vault/rolls-roycemotorcars-com-en-us-home-html` (3, in) — *"the video, UI and
background feel like one continuous environment rather than separate layers"*;
`vault/organimo-com` (3, in) — *"motion and transitions support the page flow and
connect the large sections instead of behaving like isolated effects"*;
`vault/immersive-g-com` (3, in) — interaction driving the visual narrative rather
than triggering decorative animation; `vault/morningstar-ventures` (3, in) —
*"motion should advance the page's argument, not merely make the visitor advance an
animation."* `vault/hbbody-com-en-home` (2, out) records Alex's own preference on
the amplitude, and it is a preference rather than a universal limit: *"Overlay
должен оставаться событием, а не становиться стандартным переходом между всеми
блоками."*

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

**Two things earn expressive motion, not one.** A subject that is *itself* temporal
is the case the evidence covers. A subject *presented* at a heightened register —
an automotive hero, a campaign launch, a piece of luxury storytelling — earns it
too, because there the ambition of the presentation is the message. Visible,
committed, cinematic movement is legitimate in both; **spectacle is not confined to
pages whose subject moves** `[J]`.

What does not change between the two: the movement is still one primary idea
`MJ2`, still declared `MJ1`, still leaves the composition standing without it
`MJ5`, and still never delays comprehension `MJ7`. **The register raises the
permitted amplitude, never the number of ideas.**

**The register is declared, with a reason.** *Heightened* is a decision recorded in
the Design Read and named by what causes it — the subject, the campaign, the
dramaturgy, the job the hero is doing. **The word "luxury" on its own is not a
reason**, and without one the clause becomes a pass that every brief can claim
`[J]`.

**And it does not overrule the dialect.** This rule decides *whether* a page has
earned expressive motion. The dialect that the Design Read selected still rations
its **character and density** — the same hero is quieter under
[auction-editorial](../../dialects/auction-editorial.md) than under
`brief-derived`, and that is the dialect doing its job, not a contradiction. If the
concept genuinely will not fit inside the selected dialect, **re-run the Design
Read**; a dialect that has to be silently broken was the wrong dialect
`[J], calibrated`.

*Calibrated 2026-07-31.* An earlier draft read this rule as "static subject →
seasoning only", which made every hero timid. That reading was too restrained and
is corrected here. These clauses are authored judgment and rest on no vault record —
do not cite them as evidence.

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
story by one line is a page that has stopped. **That budget is now its own rule —
see [MJ10](#invariant), which owns what the advance buys.** MJ6 owns the agency:
whether the visitor still controls the transport at all.

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

**The threshold — what may be learned, and what may not.** `[J], calibrated 2026-07-31`

**Never learned:** what the page is, what it offers, and the first way to act on it.
All three are available with no required interaction and before any animation
finishes. **Depth may be learned; the entrance may not.** No mandatory hold, swipe,
drag or gesture stands between a visitor and the first content.

**Legitimately learned:** a mechanism that a visitor infers quickly from visible
signals and that is not required in order to reach the main value. One action or one
hint is a good guide, **not a law** — the real test is whether the mechanism reads
itself, not how many steps it takes.

**The tool exception.** Where operating the interface *is* the task — a configurator,
an editor, a comparison tool — learning the interaction is the work, and this rule
does not apply to the instrument itself. It still applies to everything around it:
what the tool is for, how to enter, the primary controls and the way out must all be
plain.

**Exploration as content.** An experience may make discovery the subject, provided
the visitor first understands where they have arrived. **A visible skip or exit is
required whenever the experience delays access to ordinary content** — not as a
blanket tax on every experimental page.

**Hidden routes are not a motion question.** Choreography never justifies concealing
navigation, but the rule that owns undiscoverable routes lives in
[anti-patterns](../anti-patterns/SKILL.md), not here. Motion judgment stops at: an
effect may not be the reason a route became invisible.

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

### MJ10 — A device earns its advance by what it delivers

**A device that consumes the visitor's advance — a scroll-linked sequence, a staged
reveal, a drag exploration, a chapter transition, a pinned scene — is justified by
what each of its stages tells them about the subject, never by what it demonstrates
about itself.**

Three obligations:

- **Every stage delivers a truth the previous stage did not.** Two stages saying the
  same thing at different intensities are one stage and a repetition.
- **A demonstration may precede an explanation and may not replace one.** Showing
  before telling is a legitimate order; showing *instead of* telling is the failure.
- **The removal test.** Take the device out. If what disappears is the spectacle, and
  nothing about the subject becomes harder to understand, the device was carrying the
  page's ambition rather than its content.

**Scope — it applies to devices that spend the visitor's progress**, not to feedback.
A 200 ms hover fade costs nothing and owes nothing; four viewports of pinned scroll
cost real advance and owe a return in proportion. **Where the mechanism itself is the
subject** — a motion showreel, an engine demonstration, a spatial product — the rule
does not soften, it resolves: each stage must still reveal something new *about the
mechanism*.

*Why it's invariant:* the rule is not about how much a page moves or how expressive
it is allowed to be. It is about whether attention the visitor has already spent
comes back as understanding, and that exchange holds for every audience and every
register. It bans neither spectacle nor long choreography — the strongest
demonstration in the vault is rated 3 and the complaint against it is not that it is
too much, but that it stood in for the architecture.

**Boundaries.** [MJ6](#invariant) owns agency — whether the transport is still the
visitor's. [MJ7](#invariant) owns delay — comprehension waiting on choreography.
[MJ4](#invariant) owns the single frame; this rule owns the sequence of them.
[MJ5](#invariant) requires the static build to stand alone; this rule asks the
converse question — if it stands entirely alone, what did the device add.
[C13](../academic-composition/SKILL.md#invariant) owns the spatial case, where the
device takes the dominant's place; a device can be modest in size and still consume
the whole scroll. [DM1](../dimensionality/SKILL.md#invariant) is not in conflict: it
forbids a scene *gating* content, this rule requires the scene to *contribute*, and
the scope clause above keeps it away from micro-feedback.

> **Evidence — distilled from the vault, 2026-08-13.** Five records, three of them
> rating 3, and the group had been over threshold since 2026-08-10 without a rule:
> `vault/lapz-io` (3, out) — *"Do not let a powerful demonstration substitute for
> information architecture"*, and *"the visitor sometimes appears to be advancing an
> animation rather than learning something new"*;
> `vault/morningstar-ventures` (3, in) — *"advancing the animation rather than
> advancing the argument"*, stated positively in the same record as *"motion should
> advance the page's argument"*; `vault/oilstainlab-com` (3, in) — *"сайт настолько
> занят демонстрацией собственной креативности, что автомобиль и информация
> становятся вторичными"*; `vault/trionn-com` (2, in) — *"motion здесь часто
> демонстрирует возможности технологии, а не раскрывает содержание студии"*;
> `vault/hispanosuizacars-com` (2, in) — *"both sometimes prioritize mythology over
> understanding"*. Four of the five are `in`, so this is the standing cost of
> ambitious motion rather than a complaint about bad work.

### MJ11 — Motion is bound to roles, not to instances

**A motion system written against one page's specific sections is that page's
choreography, not a system — and the moment a second page exists, the difference
is invisible.**

Binding by instance means naming the thing: *this* section, *this* id, *this*
hero. It works, it reads clearly, and it is the natural way to write the first
page. Then page two arrives with different sections, matches none of the names,
and **moves not at all** — no error, no warning, no half-played timeline. A
reviewer sees a page where motion was apparently never designed, which is exactly
what a page where motion was never designed looks like.

Bind by the **role** instead — what the section *is* to the composition, declared
in the markup and read by the system: a section that leads with its picture, a
head, a full-bleed moment. Then a new page costs markup, and its motion is
inherited rather than reimplemented.

Two consequences worth stating:

- **The opening is the legitimate exception.** A page's arrival is composed for
  that page and may be bound to it by name. Everything below the first screen
  should not be.
- **Absence needs a check, because it raises no alarm.** After a page loads,
  confirm the system actually took hold — that it recognised the page at all, and
  that its parts are playing. A silent no-op fails every test that asks whether
  anything is broken.

*Why:* [MJ5](#invariant) makes the static build stand alone so a failed motion
system leaves a readable page. This is the other half — a motion system that
silently applies to nothing also leaves a readable page, and is therefore
indistinguishable from success by every check MJ5 satisfies.

> **Evidence — 360 Auto Care, 2026-08-17/20.** The homepage's motion looked its
> sections up by id and returned early unless the homepage hero was present. It
> was correct, thorough, and worked perfectly — on one page. Adding a second page
> would have produced a completely static one, silently. Rebinding the shared
> parts to a role attribute naming the side the TEXT sits on made the second page
> cost markup rather than JavaScript; the hero kept its by-name binding, because
> it is the arrival.

## MOTION READ

Runs **after the Composition Read and Plan** — the static structure must exist
before anything is scheduled in time — and **before any animation is written.**

Output these lines. Short answers. `not needed` is a complete and frequent answer.

```
Subject          <what the page is about, and whether it is temporal>
Journey          <what the visitor does, in order>
Static verdict   <does the page work with nothing moving? if no, stop and fix that>
Time adds        <the moments where time carries meaning static layout cannot>
Register         <ordinary | heightened — and if heightened, what makes it so>
Primary idea     <the one dominant temporal idea — or "none">
Stable           <what must not move, ever>
Roles            <each proposed system: name -> role from MJ1>
Transport        <who controls pacing: the reader, or the page>
Learning         <what a visitor must work out, and where the skip or exit is>
Mobile           <re-authored / reduced / absent>
Reduced motion   <what the authored alternative is>
Cost             <what this choreography costs: delay, learning, load, distraction>
Cut              <what was proposed and rejected, and why>
```

**The `Cut` line is required and may not be empty on a page of any size.** A motion
plan that rejected nothing did not make decisions.

**The `Cost` line is required too, and most required when the answer is yes.**
Approving an expressive idea is not approving its price, and the price is stated
rather than discovered later: delay before comprehension, mechanics the visitor has
to work out, payload and frame cost, attention taken from the subject, and what
happens to it on mobile and under reduced motion. The strongest motion reference in
the vault records its own weakness this way
`[R site:thenewmobileworkforce-imm-g-prod-com-back-at-hq]`; a plan that reports no
cost has not looked `[J], calibrated`.

**`Register` is `ordinary` unless a reason is written next to it** — see `MJ3`.

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

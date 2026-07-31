# Per-category judgment

*Read when: a specific kind of motion is on the table. Nothing here is a
recommendation to use the category — each entry exists so that a proposal can be
argued down as easily as up.*

Every entry answers the same four questions: **when it earns its place**, **when it
becomes noise**, **what must stay stable**, and **what to check after building**.
The AI-generated failure patterns are collected in
[motion-audit.md](motion-audit.md) rather than repeated here.

> **Calibrated 2026-07-31, round 1.** Passages marked *calibrated* carry Alexander's
> direct answer to a specific proposal and are `[J]`. Several replaced absolute bans
> with scoped permissions: the earlier draft forbade outright what he permits under
> conditions, and a ban that is wrong in one context gets ignored in all of them.
> **None of this rests on a vault record. Do not cite it as evidence.**

---

## Entrance and initial load

**Earns it** when the page has a genuine assembly order — a first screen that
resolves, one element arriving after another because the reading order says so.

**Noise** when it exists to make loading feel intentional. A fast page needs no
entrance; an entrance that hides a slow one is a delay wearing a costume.

**Stable:** the layout box of everything. Nothing may reflow as it arrives.

**Check:** with a warm cache, does the entrance still make sense at full speed? Time
from navigation to *the visitor knows what this is* — `MJ7`.

## Hero choreography

**Earns it** when the hero is the primary temporal idea — either because the subject
is temporal or because the presentation register is heightened `MJ3`. One idea, at
full commitment.

*Calibrated:* **a strong hero may move visibly.** A movement so small it reads as
drift is a decision not taken — it costs the frames and delivers no impression.
Commit to an amplitude that is felt, keep the subject itself stable inside it, and
let the environment carry the movement `[J]`.

**Noise** when the hero animates because heroes animate. Also when the hero must be
*learned* — an interaction the visitor has to discover before the page gives
anything `[R site:trionn-com]`, *"hold to blast"* as the entry fee.

**Stable:** the headline's legibility at every moment; the primary action's
position.

**Check:** land, wait two seconds, do nothing. Is the offer clear? Then reload and
scroll immediately — does the hero survive being skipped?

## Scroll reveals

**Earns it** when a section genuinely benefits from arriving rather than being
present — a punchline, a reveal the copy sets up, a change of register.

**Noise** the moment it becomes a global rule. Every section fading up from below is
the single most common signature of unjudged motion, and it flattens exactly the
hierarchy it appears to create: when everything arrives the same way, arrival stops
carrying information.

*Calibrated:* a **set** that changes together — a filtered grid, a swapped result
list — may take **one short shared transition**, because the change is one event and
one event gets one signal. That is not a reveal cascade; nothing is staggered and
nothing arrives late `[J]`.

**Stable:** anything above the fold; anything a visitor scrolled *to* on purpose.

**Check:** scroll fast to the bottom and back. Did anything fail to appear, or
appear twice? Are there sections whose reveal you cannot justify individually?

## Scroll-linked and scrubbed sequences

**Earns it** when the sequence is the content — a process, a transformation, an
assembly, a route.

**Noise** when scroll distance buys almost no change of information, or when the
sequence is a video the visitor is forced to scrub.

**Stable:** the ability to leave. Always.

**Check:** `MJ4` at 25 / 50 / 75%. Then scroll it backwards — a sequence built only
forwards usually breaks. Then check the frame budget:
[dimensionality DM3](../../dimensionality/SKILL.md#invariant).

> `[R site:trionn-com]` runs a 371-frame scrubbed sequence. It is recorded as
> engineering coherence *and* as **"огромная сложность для agency homepage"** — the
> technique is not the problem; the ratio of complexity to communicative need is.

## Parallax and depth

**Earns it** when there is a real spatial model and the parallax expresses it.

**Noise** when applied to every image as a default. Parallax on a photograph that
depicts no space asserts a depth the picture does not have.

*Calibrated:* the test is the **composition**, not the genre. An archival or
editorial image whose composition is genuinely layered — foreground, subject,
ground — may carry a light parallax where it supports the story. An image that is
flat in fact stays flat `[J]`.

**Stable:** text over the moving layer — or better, do not put it there.

**Check:** per-frame contrast over the moving layer
([dimensionality DM5](../../dimensionality/SKILL.md#invariant)); one depth idea per
view ([DM6](../../dimensionality/SKILL.md#invariant)).

## Pinned sections

**Earns it** when a fixed frame is genuinely the stage for a change happening within
it.

**Noise** when used to buy time, or when pins run back to back — consecutive pinning
turns scrolling into waiting.

*Calibrated:* the unit is **the chapter, not the page.** One dominant pinned
sequence per narrative chapter, and a long page may legitimately have several —
provided each is separated from the next by a full static zone that is read, not
passed through. Two pins with nothing between them is one pin that lost its nerve
`[J]`.

**Stable:** the exit. A pin must release predictably and never trap.

**Check:** how many viewport-heights of scroll per unit of new information? If the
answer is more than roughly one screen of scroll per idea, cut the pin.

## Section transitions

**Earns it** when two sections have a relationship worth expressing — a continuation,
a contrast, a hand-off.

**Noise** when every boundary gets the same wipe. A page of identical transitions is
a slideshow.

**Stable:** the reading position. A transition may not scroll the page for the user.

## Navigation and menus

**Earns it** as **structural** motion (band 2): a menu that explains where it came
from and what it covers.

**Noise** when the menu becomes a set piece. A visitor opening navigation has already
decided to leave the current view; making them wait is friction at exactly the wrong
moment.

**Stable:** focus order, and the trigger's position.

**Check:** keyboard open and close; escape; focus trapped correctly and returned.

> The positive record turns navigation into meaning rather than spectacle: an
> F1-style menu where moving between sections reads as selecting a racing mode or a
> telemetry channel `[R site:thenewmobileworkforce-imm-g-prod-com-back-at-hq]`. The
> motion belongs to the subject, not to the menu.

## Cards and image interactions

**Earns it** when hover or focus reveals something genuinely useful — metadata, a
second image, a crop that shows more.

**Noise:** the default package where every card simultaneously lifts, scales, glows,
shifts its border and slides an arrow. Five signals for one binary state.

**Stable:** the card's footprint. A card that grows on hover moves its neighbours,
and a grid that breathes under the cursor is unusable at speed.

**Check:** touch devices, where hover does not exist. Everything revealed on hover
must be reachable another way.

## Hover and focus states

Treat hover as **feedback and revelation**, never as decoration. Choose from: image
scale · crop change · colour or tonal transition · surface or border change · type
shift · metadata reveal · icon displacement · cursor response.

*Calibrated:* **two or three coordinated signals, not one.** A single change is too
thin for a premium card, and the earlier draft was wrong to make it the universal
answer. The requirement is coordination, not scarcity — the signals must read as one
gesture with one intent, not as several effects firing together. Beyond three, or
where the signals point in different directions, it is the overload pattern `[J]`.

**The line between coordinated and overloaded:** crop change + tonal shift + arrow
response is one gesture — the card leans toward you. Lift + scale + glow + border +
arrow is five announcements of the same binary state.

**Never:** hover as the only route to essential information; hover that hides what
was visible; hover that fires on a container so large the pointer triggers it by
accident.

**Focus parity is not optional** —
[motion-taste I2](../../motion-taste/SKILL.md#invariant).

## Typography animation

**Earns it** when the words *are* the subject and the movement carries their sense.

**Noise:** splitting text into characters because a library makes it easy — every
heading on the page fragmenting on entry, with no relationship to what any of them
say.

*Calibrated:* **character and word animation is not banned.** It is legitimate as
**one** expressive device on a page, tied to the concept — a word that breaks
because the story is about breaking, a line that assembles because the subject is
assembly. What is banned is the default: meaningless fragmentation applied to every
headline `[J]`. If it appears twice on a page it has stopped being a device and
become a template.

**Stable:** the type's final position, and its legibility at every intermediate
frame `MJ4`.

**Check:** screen reader — is the text one string, or a pile of spans? Is real text
still real text, or has it been baked into a canvas?

> `[R site:trionn-com]` is credited for exactly this: *"настоящие заголовки остаются
> DOM-текстом, а не запекаются внутрь canvas"* — and criticised, in the same record,
> for the exploding-services sequence where the heading cannot be read.

## Masks, clips and wipes

**Earns it** as a transition between two states of the same subject — a reveal with
a direction that means something.

**Noise** when the mask shape is the point, or when every image is introduced
through one.

**Check:** the mask's midpoint `MJ4`; behaviour at extreme aspect ratios.

## Image and video transitions

**Earns it** when continuity matters — the same subject moving between two
presentations. Crossfade over travel is the house default
([motion-taste D1](../../motion-taste/SKILL.md#dialect)).

**Noise:** autoplaying video as ambience behind reading matter.

*Calibrated — the task-led case.* On a service or conversion page, a short video is
permitted **when it shows the actual work being done** — real hands, real process,
real premises. It is evidence, and evidence is allowed to move. The conditions are
absolute: it must not delay the phone number, the address or the booking control by
a single frame, and the page must be complete with the video absent `[J]`.

**Stable:** the frame. Video sized to its box with no layout shift on load.

**Check:** poster frames; what happens with video blocked or slow; audio never
autoplays.

## Counters, data and status

**Earns it** when the *change* is the information — a live value, a state that just
became true.

**Noise:** counting up to a static number on scroll. The number was always that
number; animating it says something happened when nothing did.

**Stable:** the digits' box — tabular figures, so nothing jitters
([typography-taste](../../typography-taste/SKILL.md#invariant)).

## SVG and line animation

**Earns it** when a diagram is genuinely built in front of the reader and the
construction order teaches something.

**Noise:** drawing every icon and rule on entry.

**Check:** the finished state is correct with the animation removed entirely.

## Ambient loops

**Earns it** rarely: a background whose slow change is atmosphere, far from
anything being read.

**Noise:** perpetual floating shapes. They are never finished, so the eye never
settles.

**Hard floor:** no perpetual ambient motion in a reading zone —
[dimensionality DM9](../../dimensionality/SKILL.md#invariant) and
[anti-patterns](../../anti-patterns/SKILL.md#dialect).

## Cursor effects

**Earns it** when the pointer is a genuine instrument of the experience.

*Calibrated:* **permitted on experimental and editorial desktop work** where the
cursor communicates interactivity or carries the concept. **Not on a search-results
page, a service site, or anything task-led**, and never on touch, where it does not
exist `[J]`.

**Noise:** custom cursors as signature on ordinary pages. They cost precision and
often hide the system cursor's own state information.

**Stable:** the real cursor's affordances. Never replace a text caret or a resize
handle.

**Check:** touch, trackpad, keyboard-only. Nothing may be discoverable by pointer
alone.

## Loading and progress

**Earns it** whenever a wait is real. Honest progress is one of the few motions that
is always justified.

**Noise:** a loader on a fast page; any loader that runs for a fixed minimum
duration.

*Calibrated:* a **branded** loader is permitted in one case beyond a real wait —
when it is the authored threshold into a deliberately special experience, and the
experience is genuinely one. It is not permitted as a house habit on ordinary
pages `[J]`.

**Stable:** layout. Skeletons match final dimensions
([motion-taste D3](../../motion-taste/SKILL.md#dialect)).

**Check:** throttled network — does the wait read as progress or as breakage?

## Route transitions

**Earns it** when it preserves continuity between two views — a shared element that
persists.

**Noise:** a full-screen wipe on every navigation. It taxes every click for the
benefit of the first one.

**Stable:** scroll restoration, focus, and the back button's behaviour.

**Check:** rapid back-and-forth; interrupted mid-transition; deep link straight in.

## Mobile motion

Not a scaled desktop — see `MJ8`. Prefer transitions tied to touch over scroll-linked
sequences; assume a lower frame budget; assume one hand.

*Calibrated:* **authored separately does not mean stripped.** Mobile is not
required to give up ambient or expressive motion — it gets its own choreography,
shorter and cheaper than the desktop one. Swapping a continuous movement for a
single frame change is one legitimate answer, not the rule `[J]`.

**Check:** on a mid-range device, not a development machine.

## Reduced motion

Not a category but a parallel deliverable — see `MJ9`. Every sequence has an
authored still or an instant state, and it delivers the same information.

---

# Camera vocabulary

Alexander's briefs use camera language. It is precise, and misusing it produces the
wrong move. **A camera move is not a lens change.**

| Term | What actually moves | Interface analogue when honest |
|---|---|---|
| **Pan** | Camera body rotates horizontally, fixed position | Horizontal survey of a wide subject from one vantage |
| **Tilt** | Camera body rotates vertically, fixed position | Vertical survey — a tall object read top to bottom |
| **Truck** | Whole camera travels laterally | Lateral travel through a scene with real parallax |
| **Pedestal** | Whole camera travels vertically | Rising or lowering through layered planes |
| **Dolly** | Whole camera travels along the lens axis | Approach that changes perspective — near layers shift faster |
| **Push-in / pull-out** | A dolly with intent — toward or away from a subject | Committing to a subject, or releasing it |
| **Zoom** | **Nothing moves.** Focal length changes | Scale change only — no parallax, no perspective shift |
| **Orbit** | Camera arcs around a fixed subject | Only with real 3D. Faked, it reads as a wobble |
| **Rack focus** | Focus plane shifts between depths | Depth-of-field shift moving attention between planes |
| **Parallax** | Consequence of camera travel, not a move | Layered planes at different rates — see above |

**Dolly and zoom are not interchangeable.** A dolly changes the spatial
relationships between planes; a zoom changes none of them. Calling a scale a dolly
produces a move that reads as wrong without the viewer knowing why.

*Calibrated:* **real parallax is preferred, and a controlled push-in on a flat
image is legitimate** — provided the source withstands the scaling at the sizes it
will be shown, and the movement is slow and committed rather than a nervous drift.
Name it a push-in. It is not a dolly, and dressing a CSS scale in camera
terminology is the thing to avoid, not the scale itself `[J]`.

**Use camera language only when the spatial metaphor is coherent** — when there is
a scene, and the viewer is somewhere in it. A card grid has no camera position, so
a "cinematic push-in" on it is a scale transform with a film word attached. `[J]`

> The positive record earns its cinematic vocabulary because it built a place to
> move through: *"резкие пространственные переходы, размытие, ускорение, смена
> глубины"* across track, garage and factory
> `[R site:thenewmobileworkforce-imm-g-prod-com-back-at-hq]`. The move is legible
> because there is a space for it to happen in.

---

# Timing and easing judgment

**No universal duration table.** Values below are starting ranges to be tuned by
eye, in context, at real content length. The scale itself is owned by
[motion-taste I3](../../motion-taste/SKILL.md#invariant) — this section is about
choosing within it.

**Duration follows distance, scale and importance.** A small element moving a short
way is fast (~150–250ms). A large mass travelling across the viewport needs time to
be read (~400–700ms). A full spatial transition can run longer if it is carrying
the visitor somewhere. Applying one duration to all three makes the small feel
sluggish and the large feel yanked.

**Stagger follows reading order**, not source order or DOM order. Its length is
decided by **how many items, how far apart, and how much drama the moment carries** —
not by a fixed number. A short list of two or three elements in a functional
interface wants a stagger that is felt but not watched; a cinematic hero can carry a
visibly longer one, because there the sequence *is* part of the impression
`[J], calibrated`. What stays wrong at any length is a stagger that makes the last
item arrive after the visitor has already looked at it.

**Entrances and exits are not symmetrical.** Exits are faster: the visitor has
already decided. An exit at entrance speed feels like the interface arguing.

**Interruption is a requirement, not an edge case.** Every animation is
interruptible and reversible from its current state. Anything that must finish before
responding will be experienced as lag.

**Pauses are authored.** A deliberate rest between two moments is a decision and
should be written into the storyboard. Silence in a rhythm is part of the rhythm —
the same argument as
[academic-composition C7](../../academic-composition/SKILL.md#invariant). *Calibrated:*
a rest is placed where the composition needs one, **not mechanically after every
image** — a rhythm of image-rest-image-rest is as uniform as no rest at all `[J]`.

**Scroll velocity is an input.** At speed, reveals should shorten or resolve
immediately rather than queue. A visitor scrolling fast is looking for something,
and making them wait for choreography they are already past is the clearest possible
signal that the motion serves the author.

**Never synchronise everything.** One easing curve on one duration across a whole
page produces the fade-up-together signature — mechanically consistent, and
expressively dead.

**Easing has character.** Sharp-out reads as decisive; long-tail as heavy; near-linear
as mechanical or technical. Pick it from the subject `MJ3`, and keep the family
coherent across the page.

**`[?]` The vault does not answer this.** No record's judgement isolates a duration,
a curve, or a numeric threshold as a reason for approval or rejection. Everything in
this section is authored judgment `[J]`, and none of it may be cited as a
demonstrated preference.

# DESIGN DNA — the build standard

**What this is.** The execution layer for visual work: how a page is conceived,
composed, shot, lit, animated and shipped. It is the default standard for every
page, component and scene built in or from this repository.

**What this is not.** It is not a second taste system. `TASTE.md` is Alex's Design
DNA and `skills/` is its executable form; this file never restates a rule that
lives there, it **cites it by identifier** so that drift stays visible. Where a
line below carries a citation like `C15` or `MJ2`, that rule is the authority and
this file is only saying how it lands in a cinematic build.

---

## 0. Order of authority

Highest first. When two lines disagree, the higher one wins and the lower one
yields **out loud**, in the report.

| | Layer | Examples |
|---|---|---|
| 1 | **Truth and access** — never yields to anything | `color I1` `I2` `I3` `I6` · `CP1`–`CP7` · `GI3` · `DM4` `DM5` · `U6` `U7` `U12` |
| 2 | **`TASTE.md` + the INVARIANT tier of `skills/`** | `C1`–`C22` · `I1`–`I10` · `DM1`–`DM10` · `MJ1`–`MJ11` · `U1`–`U19` · `G1`–`G8` |
| 3 | **This file** — `DNA1`–`DNA89`, the build standard | camera language, shot list, lighting, annotation craft |
| 4 | **The selected dialect's DIALECT tier** | `auction-editorial` · `cinematic-industrial` · `immersive-authored-world` |
| 5 | **Plugins and `external/`** — reference only, binds nothing | `frontend-design` · Scrollcraft · `threejs-webgl` · `gsap-scrolltrigger` |

**Layer 5 is material, not instruction.** `external/README.md` states the rule and
it applies to the installed plugins identically: an agent that has read `TASTE.md`,
`skills/` and this file is fully instructed. A plugin may be mined for technique.
It may never be cited as the reason for a design decision, and neither may a
library name — a tool is never a direction (`TASTE.md` §2).

**Where this file states an aesthetic default** — a dark ground, a compressed FOV,
a hairline annotation — **a declared dialect may replace it.** Where it states an
engineering or perceptual contract, it does not yield to taste.

---

## 1. The standing principles

Fifteen positions that sit under everything below. Not negotiable by convenience;
negotiable only by a stated brief requirement.

1. Never default to generic SaaS, dashboard, template or AI-looking layout.
2. Every page has a stated visual concept before implementation.
3. Composition beats adding UI.
4. Strong hierarchy, deliberate negative space, asymmetry where it earns it, bold
   scale change.
5. No repetitive cards, no repeated equal columns, no pill clusters, no icon per
   feature, no decorative noise.
6. Scroll animation has narrative purpose or it does not exist.
7. Cinematic pages are thought in shots: reveal, push-in, dolly, orbit, macro,
   interruption, release.
8. In 3D the camera and its target move with intent — never a model on a turntable.
9. Lighting, reflections, environment, FOV, framing and material response are
   design, not technical afterthoughts.
10. One or two strong signature interactions beat dozens of small effects.
11. Large typography may act as scenery and depth, including behind 3D objects.
12. Restraint. Premium is not more elements.
13. Compare the result to the intended reference, never to the previous build.
14. Nothing is done until it has been seen in a browser at desktop **and** mobile.
15. When a reference image or storyboard exists, its composition, scale, lighting,
    spacing and hierarchy are the primary visual authority unless told otherwise.

---

## 2. Visual direction and the concept gate

**`DNA1` — No markup before the concept exists in writing.** Four lines of Design
Read (`TASTE.md` §2: deliverable / audience / family · mandate · dialect ·
dimensionality role), one sentence of concept, and the named peak. An unstated
mandate is REDESIGN, never invention.

**`DNA2` — The aesthetic family is nameable and specific.** *auction-catalog*,
*technical-luxury*, *nocturne-industrial*. "Modern", "clean" and "minimal" are
excuses; "a Three.js site" or "a GSAP page" names a tool and is refused outright.

**`DNA3` — Reference authority.** When a storyboard, frame or reference image
exists it governs composition, scale, lighting, spacing and hierarchy, and every
deviation is named in the report with its reason. It does **not** override layer 1:
a reference with unreadable type gets a re-composed reading zone (`GI5`), not a
waiver on `I7` or `color I6`.

**`DNA4` — One page, one language.** Competing art directions inside one page is
`U11`; a section built as its own little site is `U15`. The page is the composition
(`C21`) and it holds its standard to the last mass (`C19`) — footer, legal line and
contact block included.

---

## 3. Spacing and composition

**`DNA5` — Major masses before components (`C15`).** Block the whole page as four
to seven masses before a single component exists. If the plan cannot be drawn as
masses on one screen, there is no composition yet — only a list of sections.

**`DNA6` — Asymmetry with a stable counterweight (`C5`, composition `D1`).**
Centre-everything is the default that reads as a template. Off-centre needs a
counterweight — a mass, a rule, a field of quiet — or it reads as a mistake.

**`DNA7` — Scale changes are bold or they are not changes.** Adjacent hierarchy
levels differ by at least ~1.6×, or they are one level wearing two sizes (`I1`).

**`DNA8` — Negative space has a job.** It is the pause between two events (`C10`),
and sections exhale downward — more space below than above (spacing `D2`, composition `D5`).
Empty space not doing this is unfinished layout, not restraint.

**`DNA9` — Repeated equal columns are a decision that must be argued.** Three equal
cards is right only when the content is genuinely parallel and equal in rank.
Otherwise it is a sequence, a table, a list, or one dominant plus two subordinates
(`C1`). Content shape is never invented to fill a grid (`CP7`).

---

## 4. Grid and alignment

**`DNA10` — One grid per page, declared before use.** Column count, gutter, maximum
measure, and the bleed rule. Every element sits on it or breaks it on purpose.

**`DNA11` — Optical alignment beats mathematical (`C5`, `I3`).** Display type,
quotation marks, icons and circular forms are corrected by eye at the size the page
actually sets them.

**`DNA12` — Full bleed is a chapter device.** A bleed names the seam it separates;
it is not a way to make a section feel bigger. A full-screen field is a scene, not
an object enlarged to the viewport edges (`C22`).

---

## 5. Typography hierarchy

**`DNA13` — Three levels visible at once, maximum.** Roles are defined and bounded
(`I2`), and a role is not a voice (`I8`) — every additional face justifies itself
by a job no existing face can do.

**`DNA14` — The floor and the proof.** Functional text never below 14px (`I7`). A
display face is verified in the render at every size the page sets it, not at the
size it was chosen at (`I10`). Uppercase is tracked and short (`I4`).

**`DNA15` — Body text is built for reading.** 60–75 characters of measure, and line
breaks at display sizes are chosen rather than inherited from the viewport (`I6`).

**`DNA16` — Data is typeset, not dumped.** Aligned figures are tabular (`I5`);
technical data reads as a spec plate (typography `D4`) with mono micro-labels
(typography `D3`).

---

## 6. Large typography as a spatial layer

**`DNA17` — Scenery type must be redundant.** A word may sit behind the vehicle, be
cropped by the viewport, or travel at its own rate — but any word carrying
information the visitor needs cannot be the scenery. The page survives the scenery
layer being removed entirely (`DM1`), and it never gates the first read (`DM2`).

**`DNA18` — Scenery type still obeys contrast where it touches content.** Measured
on the composited render, per frame (`color I6`, `DM5`). The alternative is
deliberate: push it far below the legibility threshold, mark it `aria-hidden`, and
say so.

**`DNA19` — One scenery idea per view (`DM6`).** A wordmark behind the car, plus
kinetic assembling lines, plus a marquee rail, is three ideas and reads as none.

---

## 7. Colour and contrast

**`DNA20` — The palette derives from the subject's material and light**, not from a
swatch trend. The accent is derived and the derivation is stated (`color I5`).

**`DNA21` — AA is verified on the composited render**, at every breakpoint and over
every moving layer (`color I1`, `I6`, `DM5`). When text over an image fails, the
fix is usually a differently *constructed* scrim rather than a deeper one — and a
scrim is a sibling of the copy, never a child of it.

**`DNA22` — A dark ground is the cinematic default and still a decision.** State why
it is right for this subject. Meaning is never carried by hue alone (`color I2`).

---

## 8. Image treatment

**`DNA23` — One image system per page.** One grade, one logic of light direction,
one crop language. Two grades in one page is `U11` arriving through the assets.

**`DNA24` — The reading zone is held at capture or generation**, never patched with
a scrim afterwards (`GI5`).

**`DNA25` — Synthetic imagery never depicts a real product, place or person
(`GI3`)**, provenance travels with the file (`GI6`), and mobile frames are authored
rather than cropped (`GI8`, `DM10`).

**`DNA26` — Crops are intentional (`C9`).** No accidental tangency between a
silhouette and a frame edge. A vehicle cropped at the wheel arch is a decision that
gets stated; a vehicle cropped at the mirror by its container is a bug.

---

## 9. Cinematic art direction — think in shots

**`DNA27` — The page is a shot list.** Each act names its shot before its device:
**reveal · push-in · dolly · orbit · macro · interruption · release**. The feeling
picks the shot, the shot picks the device — never the reverse.

**`DNA28` — One peak per page.** It gets the asset budget, the silence in front of
it, and the most scroll room. A page with three peaks has none — demote the
competitor to a shorter span, a plainer device, a lesser asset.

**`DNA29` — Write the feeling curve before the acts exist.** One line per act: the
emotion first, the thing on screen that causes it second. Two adjacent acts
producing the same feeling means one of them is filler — cut it or change what it
does.

**`DNA30` — The ending resolves.** The last feeling is the one carried away. The
page arrives somewhere and stops: the type reaches its quietest setting, the world
lands, the surface hands over an input. Fading into an empty footer overwrites the
peak.

---

## 10. Premium automotive / editorial presentation

**`DNA31` — The vehicle is the dominant and the interface is not (`C1`, `C13`).**
Chrome recedes: the nav is a hairline and a wordmark until it has a reason to be
more. Anything permanently on screen is part of the composition and is composed
(`U10`).

**`DNA32` — Specification is evidence, not decoration.** The chain is *technical
fact → observable consequence → value to this buyer*. A spec that stops at the fact
is a datasheet; a claim that skips the fact is marketing. Operational truth does not
outrank the buyer's motivation (`C20`), and every figure maps to a ledger entry
(`CP1`, `CP5`).

**`DNA33` — Premium is subtraction.** No badge rows, no trust-pill clusters, no icon
per feature, no gradient CTA. If a section looks thin the answer is proportion, scale
and air — not another element.

**`DNA34` — Editorial furniture outperforms another card.** A caption set in mono, a
hairline rule, a folio number, a running head, a dateline: these buy perceived value
at a fraction of the visual cost of a card grid.

---

## 11. Scroll storytelling

**`DNA35` — Every scroll device has a declared narrative role (`MJ1`) and earns its
advance by what it delivers (`MJ10`).** "Because ScrollTrigger can" is not a role.

**`DNA36` — The page grammar is declared, and varied between builds.** Filmic
one-shot · chaptered editorial · live surface · continuous world · typographic
poster · gallery/catalog · split stage · rhythmic cutlist — or a named new one.
Shipping the same grammar, hero device and act shape as the last build is how a
house style becomes a template.

**`DNA37` — One signature move per build, bespoke to that site.** A parameter change
to a known device is not a signature move, and neither is a second instance of a
device already on the page. The test: describe it to someone who has seen the other
builds — if they cannot tell it apart, it is not one.

**`DNA38` — The scroll budget is declared up front (`DM3`)**: viewport-heights per
act and for the page. Comprehension never waits on choreography (`MJ7`); the user
keeps the transport (`MJ6`).

**`DNA39` — The static build stands alone (`MJ5`, `G7`).** With scripts removed the
page is readable, navigable and complete. Content that only exists once an animation
runs does not exist.

---

## 12. Motion choreography

**`DNA40` — One primary temporal idea per viewport (`MJ2`), and every frame the
visitor can stop on is a designed frame (`MJ4`).**

**`DNA41` — Two signature interactions at most.** Dozens of micro-effects read as
noise, and the subject decides the motion rather than the amount (`MJ3`,
motion `D4`).

**`DNA42` — Durations and easing come from project tokens (motion `I3`, `G4`).**
Scrubbed motion is linear unless the concept explicitly wants weight; entrances ease
out, exits ease in, and the family stays coherent across the page.

**`DNA43` — Reduced motion is an authored state (`DM4`, `MJ9`, motion `I1`).** A
scrubbed sequence becomes a composed still, not a blank frame. Meaning survives.

**`DNA44` — Mobile choreography is authored, never scaled (`MJ8`, `DM10`, `G5`).**

---

## 13. GSAP / ScrollTrigger usage

`skills/gsap-implementation` (`G1`–`G8`) is authoritative here and is loaded **after**
motion has an approved role. It cannot authorize motion, and neither can this
section. The installed `gsap-scrolltrigger` plugin is technique reference only.

**`DNA45` — Lowest sufficient method.** CSS transition → scroll-driven CSS animation
→ WAAPI → GSAP core → ScrollTrigger. Reaching for ScrollTrigger to do a fade is the
usual first mistake; the report states which level was chosen and why.

**`DNA46` — Everything lives in a `gsap.context()` with reversible teardown (`G1`)
and scoped selectors (`G2`).** Route unmount kills triggers and reverts. A
document-global selector is a defect even when it works.

**`DNA47` — Pinning is disciplined.** One pinned section at a time, honest
`pinSpacing`, no nested ScrollTrigger inside a scrubbed timeline,
`invalidateOnRefresh` on anything measured, and refresh tied to real geometry change
(`G8`) rather than to every resize event.

**`DNA48` — `scrub` is a decision, not a decoration.** A number (≈0.5–1) is lag with
weight; `true` is exact. Snap only where the content genuinely has discrete states,
never to hide an unresolved layout.

---

## 14. Three.js / WebGL camera language

**`DNA49` — Move the camera and its target; do not spin the model.** A rotating
object reads as a product configurator. A moving camera with a moving target reads
as a film. This single decision separates the two.

**`DNA50` — The shot vocabulary has 3D definitions**, and each act names exactly one:

| Shot | What actually moves |
|---|---|
| **reveal** | position holds, the target changes — the subject is discovered, not approached |
| **push-in** | dolly along the view axis toward the subject, target fixed |
| **dolly** | lateral travel with the target tracking — parallax across the scene |
| **orbit** | an arc at fixed radius around a fixed target, never a full revolution |
| **macro** | short distance, narrow FOV, shallow field — one detail at a scale the eye cannot get in person |
| **interruption** | a cut, a blackout, a hard grade change — the seam is the event |
| **release** | the camera settles, damping resolves, motion stops on a composed frame |

**`DNA51` — FOV is art direction.** 28–40° compresses and reads heroic and
product-like; 45–60° reads spatial and inhabited; above that reads like a phone lens
and flatters nothing. Never animate FOV and position together unless the distortion
*is* the effect.

**`DNA52` — 3D framing obeys 2D composition.** Subject off-centre with counterweight
(`C5`, composition `D1`), horizon placement decided, enough ground plane to read
scale, no tangency between silhouette and frame edge (`C9`).

**`DNA53` — Scroll drives a target value; damping drives the camera.** Never bind the
camera transform directly to scroll position. Every stoppable position is a composed
frame (`MJ4`), and the choreography has a subject (`DM8`).

**`DNA54` — One canvas, one renderer, one loop.** Near and far planes as tight as the
scene allows, aspect updated on resize, no object allocation inside the frame loop.

---

## 15. Lighting and materials

**`DNA55` — Lighting is designed before it is coded.** Decide the look — key
direction, fill ratio, rim separation — then build it, plus an HDRI environment.
**An environment map is what makes metal and clearcoat read as metal and clearcoat.**
Ambient-only lighting is why most web 3D looks like clay.

**`DNA56` — Colour management is on, always.** `outputColorSpace` sRGB, colour
textures tagged sRGB and data textures linear, ACES Filmic tone mapping, and exposure
tuned as a design value rather than left at 1.

**`DNA57` — Material presets are a floor, not a look.** Vehicle paint is
`MeshPhysicalMaterial` — clearcoat 1.0, clearcoat roughness ≈0.03–0.1, metalness
≈0.8, roughness ≈0.3–0.4; glass is transmission with real thickness and ior ≈1.5. A
hero vehicle never ships on `MeshBasicMaterial` or `MeshLambertMaterial`.

**`DNA58` — What is reflected is a design decision.** Studio, city, dusk sky or
workshop — the environment tells the visitor where this object lives. A default studio
HDRI under a nocturne art direction is a mismatch, and it is visible.

**`DNA59` — Contact shadow always.** An object with no contact shadow floats and reads
as a render. Shadow map resolution and shadow-camera bounds are tuned to the subject;
on mobile shadows are reduced, baked, or replaced by a shadow plane.

---

## 16. Callouts and technical annotations

**`DNA60` — Annotations are typographic, not chrome.** Hairline leader, mono
micro-label (typography `D3`), value in tabular figures (`I5`). No rounded tooltip
bubbles, no drop shadows, no coloured chips.

**`DNA61` — An annotation anchors to a real point and stays anchored** through the
shot it belongs to. A label that drifts off its feature during a camera move is worse
than no label.

**`DNA62` — Annotations obey the floor.** 14px minimum (`I7`), AA over the composited
render (`color I6`). If it cannot be read at mobile scale it becomes a list below the
frame — never smaller type.

**`DNA63` — Every annotated number maps to a ledger entry (`CP1`–`CP5`).** A dated
figure carries its date in the render. A placeholder is visibly a placeholder.

---

## 17. Transitions

**`DNA64` — A seam says what changed.** Chapter, scale, time of day, ground, or
subject. One transition applied at every boundary regardless of what that boundary
expresses is a defect, not a system (`MJ2`).

**`DNA65` — Ground and colour travel is continuous, or it is a cut.** A page whose
background alternates without a reason reads as sections pasted together.

**`DNA66` — Route transitions clean up after themselves (`G1`)**: triggers killed,
scroll position restored, and no transition long enough to hide a failed load.

---

## 18. Responsive behaviour

**`DNA67` — Mobile is a recomposition, not a stack (`C12`, `DM10`).** The mobile shot
list is written separately and may contain fewer acts, different devices, or no 3D at
all.

**`DNA68` — Content parity (`U7`).** No information that exists only on hover; touch
targets at least 44px; every route findable and distinguishable (`U12`).

**`DNA69` — Spacing scales and never collapses** (spacing `I4`, `D4`). Gutters stay
generous on mobile — that is where the luxury signal survives or dies.

**`DNA70` — Branch with `matchMedia` (`G5`).** Desktop choreography is replaced or
removed on mobile, never shrunk.

**`DNA71` — No horizontal page scroll (`U6`).** Wide content scrolls inside its own
container, and a clipping container never hides a layout error (`U19`).

---

## 19. Performance

**`DNA72` — The budget is declared before the build (`DM3`)**: total payload, largest
single asset, frame budget, LCP target. A budget discovered afterwards is a
postmortem.

**`DNA73` — Targets.** Desktop: 60fps, under ~100 draw calls, DPR capped at 2.
Mobile: 30–60fps, under ~50 draw calls, DPR 1, textures ≤1024px, shadows reduced or
off, post-processing off.

**`DNA74` — LCP never sits behind a canvas or an animation (`DM2`, `MJ7`).** The first
headline is HTML text, present in the document, styled to its final size.

**`DNA75` — The loop stops when nothing is watching.** Pause on hidden tab and when
the canvas is offscreen; dispose geometries, materials and textures on unmount.

**`DNA76` — DOM animation is transform and opacity only** (motion `I4`). Nothing
animates a property that triggers layout.

---

## 20. Accessibility

**`DNA77` — AA on the composited render, at every breakpoint and over every moving
layer (`color I1`, `I6`, `DM5`).**

**`DNA78` — Keyboard parity and visible focus (`color I3`, motion `I2`).** Anything a
pointer can do in a canvas has a non-pointer path, or it is non-essential by design
(`DM7`).

**`DNA79` — `prefers-reduced-motion` is a designed state (`DM4`, `MJ9`).** Scrubbed
sequences resolve to the composed frame the act was built around.

**`DNA80` — Decoration is hidden from assistive tech.** Scenery type, canvases and
ornamental layers are `aria-hidden`; all meaning exists in real text.

**`DNA81` — No perpetual ambient motion in reading zones (`DM9`).**

---

## 21. Anti-patterns

`skills/anti-patterns` (`U1`–`U19`) is the authority. These are the build-side
additions — the shapes this kind of work fails into specifically.

**`DNA82` — Banned by default; each requires a written argument to appear.**
Generic SaaS or dashboard shells · hero + three feature cards + logo strip + FAQ ·
equal-column card grids as a first answer · pill and badge clusters · an icon per
feature · gradient buttons · decorative drop shadows · boxes inside boxes ·
parallax applied to everything · counters that count for no reason ·
"scroll to explore" as the only idea on the first screen.

**`DNA83` — The 3D tells.** A model on a turntable · ambient-only lighting · no
environment map · no tone mapping · an object with no contact shadow · a camera that
only rotates · a scene that appears before the page has said what it is.

**`DNA84` — Motion noise.** Animation with no narrative role (`U3`, `MJ1`), more than
two competing effects in one viewport, and entrance animations on content the visitor
has already scrolled past once.

**`DNA85` — Judging against the wrong thing.** Comparing the build to the previous
build instead of to the reference is how a page drifts a long way from its concept
while every individual step looks like an improvement.

---

## 22. Definition of done

**`DNA86` — Nothing is complete until it has been opened in a browser at desktop and
mobile sizes, screenshotted, and compared against the reference or storyboard** —
against the intent, not against the previous implementation (`DNA3`, `DNA85`).

**`DNA87` — The scroll is reviewed by stopping**, at roughly eight positions across
the page. Each stop is judged as a composed frame (`MJ4`). A page that only looks
right in motion is not finished.

**`DNA88` — The reduced-motion path and the scripts-removed path are both opened**
before delivery, not described.

**`DNA89` — Where the repository's delivery chain applies, the five gates run in order
and Gate 5 is Alex's.** Absence of approval is an unfinished gate, never a pass, and a
gate is run when its artefact exists — not when a report says it passed.

---

## 23. Conflicts, and how this file changes

**This is a build standard, not a taste promotion.** If a rule here turns out to be
generally true about Alex's taste rather than about cinematic builds, it does not stay
here: it goes through the distillation ritual into `skills/`, as a diff Alex reads.
Nothing in this file may quietly become an invariant.

**If a line here contradicts `TASTE.md` or a skill, the skill wins and this file is
wrong.** Report the contradiction rather than working around it — a build standard
that has drifted from the taste system is worse than no build standard, because it is
obeyed.

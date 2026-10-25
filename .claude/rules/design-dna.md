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
| 1 | **Truth and access** — never yields to anything | `color I1` `I2` `I3` `I6` · `CP3`–`CP7` (CP1/CP2 ledger advice) · `GI3` · `DM4` `DM5` · `U6` `U7` `U12` |
| 2 | **`TASTE.md` + the INVARIANT tier of `skills/`** | `C1`–`C21` (C17, C20 advice, C22 retired) · `I1`–`I10` (typography I4, color I4 advice) · `DM1`–`DM10` · `MJ1`–`MJ11` (MJ1, MJ2, MJ10 advice) · `U1`–`U19` · `G1`–`G8` |
| 3 | **This file** — `DNA1`–`DNA101`, the build standard | camera language, shot list, lighting, annotation craft |
| 4 | **The selected dialect's DIALECT tier** | `auction-editorial` · `cinematic-industrial` · `immersive-authored-world` |
| 5 | **Plugins and `external/`** — reference only, binds nothing | `frontend-design` · Scrollcraft · `threejs-webgl` · `gsap-scrolltrigger` · Awwwards and other galleries, 21st.dev (standing sources, `DNA96`–`DNA97`) |

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
5. No pill clusters, no icon per feature, no decorative noise. (Card grids are
   allowed — the ban was cancelled by Alex on 2026-10-25; see `DNA9`.)
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

## 2. Visual direction and the idea

**`DNA1` — One sentence of idea before markup.** *Relaxed by Alex on 2026-10-25
(step 3):* the four-line Design Read, the Concept Gate (`CG1`–`CG7`), a complete
`BRIEF.md` and the named peak are advice, not a gate. What stays: say the governing
idea in one sentence before building, and carry it through every section. Before
showing anything, read the finished page top to bottom as one object and check the
UX as the buyer would (`TASTE.md` §0, rule 7).

**`DNA2` — The aesthetic family is nameable and specific.** *auction-catalog*,
*technical-luxury*, *nocturne-industrial*. "Modern", "clean" and "minimal" are
excuses; "a Three.js site" or "a GSAP page" names a tool and is refused outright.

**`DNA3` — Reference authority.** When a storyboard, frame or reference image
exists it governs composition, scale, lighting, spacing and hierarchy, and every
deviation is named in the report with its reason. It does **not** override layer 1:
a reference with unreadable type gets a re-composed reading zone (`GI5`), not a
waiver on `I7` or `color I6`.

**`DNA4` — The page holds its standard to the last mass (`C19`)** — footer, legal
line and contact block included. One language per page (`C21`, `U11`, `U15`) is
advice since 2026-10-25: a deliberate change of style between sections is allowed.

---

## 2b. Sourcing solutions, inspiration and tools

*Alex, 2026-10-25.* Two standing outside sources, used on my own initiative and not
only when asked: **inspiration galleries** for the direction (`DNA97`), and
**21st.dev** for ready solutions to individual blocks (`DNA96`). The vault comes
first, because it holds Alex's own judgements. Outside sources widen what the vault
cannot cover.

**`DNA97` — Look for real sites when a request names a style, a sector or a theme.**
"Do brutalism", "something like a watch atelier", a sector the vault has not seen, a
mood image: in each case search the inspiration galleries before deciding the
direction. The galleries are **Awwwards** (by style, category and Site of the Day),
**Godly**, **SiteInspire**, **Land-book**, **Lapa Ninja**, **One Page Love**,
**Httpster**, **Dark** (https://www.dark.design/ — dark-themed sites, filtered by
category) and **Cosmos** (https://www.cosmos.so/explore — visual clusters for
mood, imagery and art direction), both added by Alex 2026-10-25, plus the studios
behind any strong find. Use WebSearch and WebFetch, or
open them in the browser when motion matters.
- Look at **3–6 real sites**, not one.
- **Read them like vault entries.** Take the principle, never the pixels: *the
  reference solves X by Y, which here means Z*, with Z different from Y (`TASTE.md`
  §6). Brutalism found on Awwwards is evidence of how others resolve it, never a
  layout to trace.
- Before building, say in 3–5 lines what is taken and what is not, with links.
- **Offer the strongest find for the vault.** It goes in through
  `REVIEW: <url>` with Alex's own comment, since an unjudged find is not taste
  evidence.

**`DNA96` — 21st.dev is a standing source of solutions for any block.** Before
building a block, search 21st.dev through its MCP server (`21st`) and look at several
variants, not the first hit. That covers reviews and testimonials,
gradients and backgrounds, heroes, navigation, pricing, FAQ, forms, CTAs, cards,
galleries, stats, logo rows, footers, buttons and micro-interactions. Take a solution
when it is better than one invented from scratch, and take the one that serves the
page's idea best.

Then make it belong to the page:
- **Restyle it** to the project's type, colour, spacing and radius. Never ship a
  component's default skin.
- **Port it** to the project's stack. A vanilla page gets the solution in HTML, CSS
  and JS; React is never added just to host a component.
- **Replace the demo content.** Sample names, ratings, quotes, logos and prices in a
  component are placeholders, never facts (`CP3`, `CP4`).

What still binds: the floors (AA, 14px, keyboard and focus, 44px targets, reduced
motion, no horizontal scroll), and one idea carried through the page (`TASTE.md` §0
rule 7). A page assembled from good components with no idea between them is the
kit-of-devices failure that scored 3/10. The report names which 21st components were
used and what was changed.

**`DNA98` — Two tools are wired into every build.** *Alex, 2026-10-25.*
- **At the concept: `genjutsu:cast`.** It proposes the interaction thesis, the
  signature move, alongside the one-sentence idea. The thesis serves the idea and
  never replaces it. It is built once the static page stands, because content must
  work without scripts (`G7`). `genjutsu:paint` is not used: it brings a design
  system of its own, which would be a second art director.
- **During the build: the kill-ai-slop scanner.** Run `npm run slop -- <project>`
  after every substantial pass of markup and CSS, not only at the end. Each hit is
  either fixed or marked `deslop-ignore <id>` with a reason in the same comment. A
  hit is a lead to read, not a verdict (`external/kill-ai-slop`).

After the build: `no-ai-slop` on the copy, and `impeccable` `audit` then `polish`
(`bolder` when the page came out timid). Never `impeccable` `shape`/`init`/`generate`,
since those set a direction of their own.

**`DNA100` — A moodboard is scanned for motion before the stack is chosen.**
*Alex, 2026-10-24.* A moodboard is not only a style reference. Before the pop-up's
Концепт stage is asked, read whether its static composition implies time, sequence or changing
state. A signal counts as strong when it is visible in the composition itself, not
inferred from a caption or a mood word:
- the same subject repeated at different scales;
- progressive movement from context to detail;
- one persistent visual anchor across several scenes;
- overlays, guides, reticles or measurements aimed at changing targets;
- interrupted or incomplete information that expects revelation;
- overlapping masses that imply foreground/background movement;
- a long vertical composition that reads as a storyboard;
- visual cause and effect between adjacent frames;
- a subject whose meaning changes through inspection, assembly, comparison,
  transformation or verification.

**Three or more strong signals mean a scroll-based interaction thesis, proposed
before the Сборка stage** and written as explicit states, never as "use parallax"
or "add scroll animation":
1. **Persistent** — what stays on screen throughout.
2. **Change** — what changes, state by state.
3. **Learned** — what the visitor knows after the change that they did not before.
4. **Why scroll** — why scroll position, rather than time, a click or nothing, has
   to control it.
5. **Reduced motion** — the equivalent that carries the same meaning (`DNA43`).

With fewer than three, the report names the count and the signals, the moodboard
is read for style, and no thesis is forced (`MJ1`). The thesis feeds the plan: the
scan (`--scan scan.json`: signals with their evidence, the five states, its
recommendations) is shown in the pop-up's Концепт stage and marks Сборка's options,
unless Концепт answers «Только стиль». A recommendation can also be given directly
(`--recommend scrollArchitecture=pinned --evidence pinned="…"`), and the answer to
question 4 becomes `reasons.pinned`. It may also
recommend supporting scroll operations, each one naming the visible evidence that
asks for it: repeated object states for a pinned sequence, separated planes for
layer parallax, concealed or cropped masses for masks, a changing type rank for
progress-driven typography. Parallax is never recommended because a page is
cinematic, and pinning is never recommended for every section. One governing
pinned sequence beside native chapters is a normal answer. It is a proposal, not a
decision: the scroll architecture, operations and engine are still chosen in the
pop-up, and a thesis never
adds GSAP or Lenis by itself (`DNA99`, `DNA90`). It is the evidence that
`genjutsu:cast` (`DNA98`) builds its interaction thesis on, never replaced by it.

**`DNA101` — The compositing plan comes before generation.** *Alex, 2026-10-24,
from a live experiment in which the concept correctly found a scroll-driven
persistent subject and the generation plan then flattened subject, environment and
atmosphere into finished rectangles. The look survived and the idea did not: the
subject could no longer move on its own.* **Generation follows the compositing
plan; the plan never follows whatever flattened images happen to come back.** The
pre-build order is:

> concept → moodboard motion scan (`DNA100`) → interaction thesis →
> **compositing-layer scan** → generation plan and approval → build plan →
> implementation

In the pop-up (`DNA99`) these are the Концепт, Ассеты and Сборка stages.

**It activates** once the concept and motion thesis are known and before any paid
generation is proposed, when the composition or motion needs any of these: one
subject persisting across chapters · foreground and background at different rates
· a subject scaling independently of its environment · text, HUD or measurements
tracking a moving subject · one object moving between scenes · controlled overlap
of independent masses · an object repositioned separately for desktop and mobile ·
scroll revealing or magnifying parts of one subject · atmosphere (smoke, dust,
light, particles) moving on its own · foreground, middle-ground and background
explicitly behaving differently. Animation alone does not activate it: a static
full-bleed scene, an ordinary crop change or a plain opacity reveal needs no alpha
subject.

**The compositing plan** is written before the generation budget is approved. Per
asset: ID · subject · role (background plate · middle-ground · persistent
foreground subject · atmosphere · interface/HUD · typography · mask/matte) ·
source (supplied · generated · extracted locally · HTML/CSS · SVG · WebGL/3D) ·
format · whether genuine alpha is required · whether exact identity must hold
across scenes · desktop, mobile and reduced-motion behaviour · the approved master
it derives from · paid generation or local derivative. It states outright which
elements may be flattened together and which stay independent. Interface, HUD,
copy and data are SVG or HTML, never a raster generation.

**An independent subject is a real isolated asset or a genuinely independent
render.** An alpha asset keeps the complete silhouette, fine edge highlights,
transparent or reflective boundaries, attachments and protruding details; it
carries no baked background, and no baked smoke, shadow or environment unless the
plan assigns them to that layer; it has no dark or light halo; it has a genuine
alpha channel, with PNG as the lossless master and WebP/AVIF derived locally. None
of these substitutes for it: blend-mode tricks · a rectangle moved as if it were an
object · a rough clipping path around a complex subject · background-colour
matching · a mask that destroys reflections or edges · a nominally identical
product regenerated per scene · a flattened hero when the subject must outlive it.

**Master identity.** One product, person, vehicle or object across several assets
starts from one approved MASTER source. Later views derive from it wherever that is
technically possible, its invariant identity features are written down, and a
derivative that silently changes them is rejected. Shared palette or category does
not make unrelated generations a family. The plan separates MASTER source
generation · paid derived generation · local crop · local resize · local background
extraction · responsive derivative. **File count is never reported as generation
count.**

**Approval (`GI1`, and the «Ассеты · одобрение» gate of `DNA99`).** Before paid
generation, show the compositing plan, the number of paid source generations, the
expected cost, the local derivatives that need no generation, the alpha assets
required, and any risk that a source will not extract cleanly. Approval covers only
those listed sources and that budget; any further paid generation needs approval
again. Local resizing, format conversion and optimisation do not. The approval
(`assets.planApproval` and the budget) records the plan's identity, so a changed
plan, paid list or budget reopens it.

**Build gate.** Motion implementation does not start until the independent layers
exist or are stood in for by honest temporary placeholders: development or debug
view only, each naming the layer it represents, never shown as visitor-facing
design and never used to claim the interaction is visually validated. If a layer
cannot be obtained, go back to the composition or motion plan. The governing idea
is never silently flattened. Separately, `npm run plan -- <project> --gate
implementation` stays closed until the asset plan is approved.

A plan for a persistent product scene might read: environment/operator, background
plate, generated, no alpha · master product, persistent foreground,
generated/extracted, alpha · smoke, atmosphere, generated or procedural, alpha
preferred · reticle/HUD, interface, SVG/HTML · copy and data, typography, HTML.
That illustrates the rule and is not a formula. `DNA101` selects no technology:
GSAP, Lenis and Three.js are still chosen in the build plan, for their own reasons.
`npm run layers -- <plan.json> [--approval <approval.json | build-plan.json>]` validates a plan and
prints the approval summary.

**`DNA99` — A build runs through one pop-up: five stages, asked as lifecycle
gates, with the skills named.** *Alex, 2026-10-25; lifecycle and approval gates
2026-10-24.*

> **Бриф → Концепт → Ассеты → Сборка → Проверка**

The stages are not six dialogs fired before work starts. Each is asked when the
evidence it needs exists:

1. **Бриф** — after `BRIEF.md` has been read and its gaps identified.
2. **Концепт** — routing, before concept exploration.
3. **Концепт · одобрение** — after the actual direction board, visual contract and
   thesis have been shown.
4. **Ассеты** — once the concept is approved.
5. **Ассеты · одобрение** — after the `DNA101` compositing plan and the paid list
   exist; before paid generation or implementation.
6. **Сборка** — after the concept, and under `DNA101` the assets, are approved.
7. **Проверка** — after implementation.

**`BRIEF.md` stays the factual source of truth.** The Бриф stage reads and
summarises it, records the task type and the sources, asks only the gaps it leaves
open, and records missing content. A complete `BRIEF.md` raises no gap question.
«Всё есть» against unanswered sections is refused, because facts are not invented.
The checkboxes never become the brief.

**The approval gates.** `concept.approval` and `assets.planApproval` each take
`approved`, `revise` or `reject`, and the paid list and budget are approved beside
the plan.
- Implementation does not begin unless the concept is approved and, where
  `DNA101` applies, the asset plan is approved. Paid generation does not begin
  unless the asset plan and its paid list and budget are approved.
- An approval records the identity of what was shown: a hash of the governing idea,
  the board, the visual contract and the thesis, or of the whole compositing plan.
  Changing any of them, including the paid list or budget, makes the gate read
  "it changed", and a new approval is needed.
- `revise` and `reject` close the gate. The same unchanged direction or plan cannot
  then be approved as it was.
- A gate's question cannot be asked or answered until its evidence has been shown.
- `npm run plan -- <project> --gate implementation|generation` exits 1 while a gate
  is closed, and says why. It re-reads the recorded board and plan files.

**These approvals are art direction, not taste questions.** The agent never asks
Alex to invent taste, pick arbitrary style ingredients or do its creative work.
Once it has produced concrete evidence, approve · revise · reject is the question
that is owed, because Alex remains the art director (`TASTE.md` §5).

**The pop-up is defined in code, not retyped:** `lib/build-plan.mjs` holds the
stages, steps, groups, options, gates and rules, and `npm run plan -- <project>`
drives it. `AskUserQuestion` takes four questions per dialog and four options per
question, so a step spans as many dialogs as it needs: **Сборка 1/2**, **Сборка
2/2**. Every question opens with its dialog's label. It cannot clear one box when
another is ticked. `toggle()` records how the exclusive boxes («Нет операций»,
«Всё есть», «Только мудборд») behave live, and a submitted answer with both ticked
is refused, never guessed.

- `--ask --list` gives the steps in order, with what each gate is still waiting for.
- `--ask --stage <step> [--part <n>]` gives one dialog. Its evidence flags are
  `--scan` (the `DNA100` scan), `--no-thesis` (Концепт chose «Только стиль»),
  `--board`, `--idea` and `--contract` (the shown direction; the idea defaults to
  `BRIEF.md`'s concept section), `--compositing` (the `DNA101` plan),
  `--recommend <field>=<option> --evidence <option>="…"`, and `--scroll
  <architecture>` for Сборка 2/2.
- `--answers <json>` merges the answered steps into `<project>/build-plan.json`,
  checking each against what must already stand. Сборка sits at the top level; the
  other stages sit under `brief`, `concept`, `assets` and `review`. Reasons go in
  `--reason <key>="…"`, implementation notes in `--note "…"` and 3D fallbacks in
  `--fallback mobile|reducedMotion="…"`. A version-1 plan is read as version 2
  without losing its meaning, and a plan from before the 3D question reads as
  `3d: none`.

A recommendation only marks an option; the plan is built from what was answered.

| step · question | kind | options |
|---|---|---|
| **Бриф** · task | one, radio | new site · redesign (default when unstated) · refresh · a section or block |
| **Бриф** · sources | checkboxes | the request or brief · the current site · the brandbook · references or a moodboard |
| **Бриф** · requirements | checkboxes, may be empty | real facts and prices (CP) · leads and conversion · CMS or integration · handoff to developers |
| **Бриф** · missing | checkboxes, only while `BRIEF.md` leaves gaps | real photographs · copy · facts and prices · nothing (exclusive). Missing photography never cancels the concept (`GI3`) |
| **Концепт** · mode | one, radio | one direction (BUILD, default) · three directions (EXPLORE, when Alex asks) |
| **Концепт** · idea search | checkboxes | vault + galleries (DNA97) · `genjutsu:cast` for the interaction thesis · a moodboard only (exclusive) |
| **Концепт** · moodboard | one, radio, carries the `DNA100` scan | thesis → Сборка (three or more signals and all five states) · style only · no moodboard |
| **Концепт · одобрение** · direction | one, radio, after the board is shown | approve · revise · reject |
| **Ассеты** · images | checkboxes | supplied assets · fal.ai generation (disclosed art direction, `GI3`) · placeholders for facts only (`CP4`) |
| **Ассеты** · compositing | one, radio, carries the `DNA101` plan | layers per DNA101 · flat images |
| **Ассеты · одобрение** · asset plan | one, radio, after the plan is shown | approve · revise · reject |
| **Ассеты · одобрение** · budget | one, radio, shows paid sources, cost, local derivatives, alpha, extraction risk | approve the list · no paid generation · revise the plan |
| **Сборка** · base stack | one, radio | Astro + Tailwind (a new standalone site) · Bootstrap 5 (dealer sites, existing templates, handoff) · the project's existing stack (first choice when modifying an established build) · plain HTML / CSS / JS |
| **Сборка** · motion engine | one, radio | GSAP (authored timelines, scrub, coordinated scenes) · CSS / WAAPI (simple transitions and reveals) · no motion |
| **Сборка** · scroll architecture | one, radio: the page's governing structure | native document · pinned / scrub sequence · scroll-snap chapters · horizontal passage |
| **Сборка** · scroll engine | one, radio | native scroll (default) · Lenis (only when controlled smoothing materially supports the thesis; with ScrollTrigger, explicit synchronisation and native keyboard, anchor, focus and reduced-motion behaviour kept, `DNA90`) |
| **Сборка** · scroll operations | checkboxes, beside any architecture | scroll-triggered reveals · layer parallax · sticky elements · masks / wipes · progress-driven typography · chapter transitions · scroll progress indicator · none (exclusive) |
| **Сборка** · 3D | one, radio | no realtime 3D (default) · Three.js (framework-independent) · React Three Fiber (React stack only) · an external or embedded scene |
| **Сборка** · supporting skills | checkboxes | 21st.dev blocks (DNA96) · kill-ai-slop scan per pass (DNA98) · `scroll-site` (selected automatically for a pinned sequence) · `threejs-webgl` (recommended for Three.js or R3F, never added) |
| **Проверка** · capture | checkboxes, beyond what is always checked | every breakpoint 1920–390 · scroll stops (DNA87) · a scroll recording |
| **Проверка** · quality passes | checkboxes, may be empty | `no-ai-slop` on copy · `impeccable audit` + `polish` · `bolder` |

**Realtime 3D is its own decision, never a note.** Anything but «none» needs
written evidence and a recorded mobile and reduced-motion fallback. React Three
Fiber needs a stack that declares React. An external scene is embedded or hosted
elsewhere, not a local Three.js build. A moodboard signal alone cannot recommend 3D.
`DNA101` recommends it only when the compositing plan holds an independently
controlled volumetric subject, camera or scene, and even then it never selects it.

**Проверка always runs** Gate 1, the whole-page read, the browser at 1440 and 390,
and the reduced-motion and scripts-off paths (`DNA86`–`DNA89`). The stage only adds
to them.

**Сборка closes on one line, shown in the pop-up:** *"Choose the lightest stack that
can faithfully execute the approved concept. Tools may execute the idea. Tools may
not become the idea."* What the plan enforces:
- Every group starts on its lightest option. GSAP, Lenis, Three.js, Bootstrap and
  Tailwind are never added because they are installed or available, and every
  nonessential dependency is left out (`DNA45`).
- GSAP, a pinned sequence, Lenis and realtime 3D each need a stated reason. A pinned
  sequence is for content that has meaningful states, never decoration or cover for
  thin content, and its reduced-motion path stays complete (`DNA43`). It does not
  imply Lenis.
- Bootstrap and Tailwind are never combined, unless the project already runs both
  and the brief requires keeping them, which is the existing-stack choice.
  Bootstrap is infrastructure, not a direction: no default Bootstrap cards, nav,
  accordions, buttons, spacing or type survive into the page.
- A supporting skill never changes the approved direction, stack or content, and
  changing a technology never reopens the approved visual contract.

Options are written in Russian, and skill names are kept exactly as they are called.
The routing questions are about **process and tools**; the gates are approve ·
revise · reject on evidence already shown. Neither asks Alex to supply style,
layout or colour.

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

**`DNA9` — Card grids are an ordinary tool.** *The ban on grids of equal cards was
cancelled by Alex on 2026-10-25, "raz i navsegda".* A grid of equal cards is a
legitimate way to present inventory and any parallel content, and it needs no
argument. The reflex it produced — replacing every grid with a hairline-ruled list —
is the failure that got it cancelled. What still binds: content shape is never
invented to fill a grid (`CP7`).

---

## 4. Grid and alignment

**`DNA10` — One grid per page, declared before use.** Column count, gutter, maximum
measure, and the bleed rule. Every element sits on it or breaks it on purpose.

**`DNA11` — Optical alignment beats mathematical (`C5`, `I3`).** Display type,
quotation marks, icons and circular forms are corrected by eye at the size the page
actually sets them.

**`DNA12` — Full bleed is a chapter device.** A bleed names the seam it separates;
it is not a way to make a section feel bigger. An object cropped edge to edge is a
legitimate dramatic frame (`C22` was retired by Alex on 2026-10-25).

---

## 5. Typography hierarchy

**`DNA13` — Hierarchy reads at a glance (`I1`).** Roles are defined and bounded
(`I2`). How many faces and voices a page runs is the concept's call (`I8` is advice
since 2026-10-25).

**`DNA14` — The floor and the proof.** Functional text never below 14px (`I7`). A
display face is verified in the render at every size the page sets it, not at the
size it was chosen at (`I10`). Small uppercase at label size is tracked; large
uppercase headlines of any length are allowed (`I4`, advice since 2026-10-25).

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

**`DNA19` — Scenery ideas are counted and reported (`DM6`, advice since 2026-10-25).**
Several may share a view when the concept layers them on purpose.

---

## 7. Colour and contrast

**`DNA20` — The palette derives from the subject's material and light**, not from a
swatch trend — or is chosen freely for the concept, with one line saying why
(`color I5` is advice since 2026-10-25).

**`DNA21` — AA is verified on the composited render**, at every breakpoint and over
every moving layer (`color I1`, `I6`, `DM5`). When text over an image fails, the
fix is usually a differently *constructed* scrim rather than a deeper one — and a
scrim is a sibling of the copy, never a child of it.

**`DNA22` — The ground has no default.** *Relaxed by Alex on 2026-10-25 (step 3):*
dark is no longer the cinematic default. Light, dark, saturated colour fields or a
mix are chosen fresh for each concept. Meaning is never carried by hue alone
(`color I2`).

---

## 8. Image treatment

**`DNA23` — One image system per page.** One grade, one logic of light direction,
one crop language — unless mixing them is the concept (`U11` is advice).

**`DNA24` — Text over an image is readable, by whatever means.** A calm zone held
at capture or generation, a plate, a panel or a scrim are all allowed (`GI5`,
`color I4` advice since 2026-10-25). Contrast is measured on the composited render
(`DNA21`).

**`DNA25` — Synthetic imagery is never passed off as the real item for sale, the
real premises or a real person (`GI3`)** — atmosphere scenes, generic vehicles, the
city and disclosed art-directed subjects are allowed and labelled, and provenance
travels with the file (`GI6`). GI3 protects factual truth, not a medium: missing
production photography is never, by itself, a reason to swap the concept for
diagrams, placeholders or SVG.
Mobile is composed, by a considered crop or a separate frame (`GI8` advice, `DM10`).

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
is a datasheet; a claim that skips the fact is marketing. Operational truth should
not outrank the buyer's motivation (`C20`, advice since 2026-10-25), and every figure comes from a real
source (`CP3`, `CP5`; the ledger file itself is advice since 2026-10-25).

**`DNA33` — Premium is subtraction.** No badge rows, no trust-pill clusters, no icon
per feature, no gradient CTA. If a section looks thin the answer is proportion, scale
and air — not another element.

**`DNA34` — Editorial furniture is one option among others.** A caption set in mono, a
hairline rule, a folio number, a running head, a dateline can buy perceived value
cheaply. It is not a default and not a substitute for a card grid (cancelled
anti-card stance, 2026-10-25, see `DNA9`).

---

## 11. Scroll storytelling

**`DNA35` — Every scroll device has a narrative job (`MJ1`).** Nothing has to be
declared in writing first, and whether it earns its advance (`MJ10`) is advice for
the report — both relaxed by Alex on 2026-10-25. "Because ScrollTrigger can" is
still not a job.

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

**`DNA39` — Content survives without scripts (`G7`).** With scripts removed the
page is readable, navigable and complete; it need not be designed static-first
(`MJ5` is advice since 2026-10-25). Content that only exists once an animation
runs does not exist.

---

## 12. Motion choreography

**`DNA40` — Every frame the visitor can stop on is a designed frame (`MJ4`).**
One primary temporal idea per viewport (`MJ2`) is advice, reported rather than
enforced — relaxed by Alex on 2026-10-25.

**`DNA41` — The subject decides the motion rather than the amount (`MJ3`).**
Layered, simultaneous motion is allowed. The old cap of two signature interactions
was dropped by Alex on 2026-10-25; dozens of micro-effects that say nothing are
still gratuitous (motion `I5`).

**`DNA42` — Durations and easing come from project tokens (motion `I3`, `G4`).**
Scrubbed motion is linear unless the concept explicitly wants weight; entrances ease
out, exits ease in, and the family stays coherent across the page.

**`DNA43` — Reduced motion is an authored state (`DM4`, `MJ9`, motion `I1`).** A
scrubbed sequence becomes a composed still, not a blank frame. Meaning survives.

**`DNA44` — Mobile choreography is authored, never scaled (`MJ8`, `DM10`, `G5`).**

---

## 13. GSAP / ScrollTrigger / Lenis usage

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

**`DNA95` — Default for a text + media split: the pinned section with a scroll-scrubbed text exit.**
Alex's standing pattern (Pagani of Miami, 2 Oct 2026, "The Atelier"), and the first
answer whenever a large split section is being argued over slide-ins, slide-outs or
a second animated layer. It replaces those debates rather than adding to them.

- **Pin** the section when its top reaches the top of the viewport (`pin: true`,
  one pinned section at a time, `DNA47`).
- **Hold** first: roughly half of the pinned distance is a read pause where nothing
  moves, so the words can actually be read.
- **Exit, scrubbed:** the text block alone rises (~60–90 px) and fades to 0, linear
  (`ease: 'none'`), a small scrub (≈0.35) — reversible, it returns on the way back.
- **Release** the moment the text is gone; the page then moves on normally.
- **The media does not perform.** A photograph stays still or drifts; a film plays as
  an ambient loop (`DNA94`). No reveal choreography is added on top of the exit.
- **Length:** ≈0.9 viewport of pinned scroll on desktop. Phone and
  `prefers-reduced-motion`: no pin, the section scrolls in the flow.
- Animate the text block's own `opacity`/`y`, never `autoAlpha` on elements another
  reveal already owns (`G6`).
- **If the block is centred with `transform: translate(-50%)` in CSS, hand that to GSAP as
  `yPercent: -50` first** and tween `y` from 0. Otherwise GSAP reads the centring as a
  pixel `y` and the "exit" runs downward (it did, on Pagani's Service, 2 Oct 2026).

*Why:* it gives reading time without a long pin, has one moving part, reverses
cleanly, and closes off the slide-in / slide-out / split-reveal variations that cost
rounds of iteration and rarely look better.

**`DNA90` — Native scroll by default; Lenis when the build plan chooses it.**
*Alex, 2026-10-24, replacing "Lenis ships on every project".* The scroll engine is
its own decision in the build-plan pop-up (`DNA99`), and native scroll is the
default. Lenis is chosen only when the approved motion direction shows a real need
for managed smooth scrolling, and the reason is written into `build-plan.json`.
Lenis is a scroll engine, not a scrollytelling concept: a pinned sequence does not
require it, and a standard page does not get it without a documented reason. It is
a stack decision, never an aesthetic one, so it lives here and never in `TASTE.md`.
**When it is chosen, it goes in with the first build**, before any sticky, pinned or
scroll-linked section is tuned, because tuning against native wheel steps and adding
Lenis afterwards means tuning twice. Gate 1 requires it only when the plan chose it.
The contract it ships under:

- **Reduced motion turns it off.** Under `prefers-reduced-motion: reduce`, Lenis
  is not constructed and the page scrolls natively (`DM4`, `MJ9`, motion `I1`).
- **The visitor keeps the transport (`MJ6`).** `anchors: true`, keyboard and
  focus scrolling intact, and every nested scroller (a modal, a drawer, a table)
  marked `data-lenis-prevent` or covered by `allowNestedScroll`.
- **One loop.** With GSAP on the page, Lenis runs on `gsap.ticker` with
  `autoRaf: false` and feeds `ScrollTrigger.update` (`scroll-site` Step 2b).
  Without GSAP, `autoRaf: true`. Never beside `ScrollSmoother`, and never beside
  Locomotive Scroll — whose one allowed case replaces Lenis (`DNA91`).
- **Its stylesheet ships with it** (`lenis/dist/lenis.css`), and it is destroyed
  on route unmount (`G1`).
- **Verification scrolls through it:** `lenis.scrollTo(y, { immediate: true })`,
  never `window.scrollTo`.

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

**`DNA63` — Every annotated number comes from a real source (`CP3`–`CP5`).** A dated
figure carries its date in the render. A placeholder is visibly a placeholder.

---

## 17. Transitions

**`DNA64` — A seam says what changed.** Chapter, scale, time of day, ground, or
subject. One transition applied at every boundary regardless of what that boundary
expresses is a defect, not a system (`C21`).

**`DNA65` — Ground and colour travel is continuous, or it is a cut.** A page whose
background alternates without a reason reads as sections pasted together.

**`DNA66` — Route transitions clean up after themselves (`G1`)**: triggers killed,
scroll position restored, and no transition long enough to hide a failed load.

**`DNA92` — A route transition is a real page change.** `<title>`, meta and the
canonical update with the route; focus moves to the new page's first heading or
main landmark, and the change is announced (`color I3`, `U12`). The incoming page
holds its initial state until its entrance begins — no flash of the final frame —
and during a crossfade both containers are taken out of flow so neither shifts the
layout. Under reduced motion the transition is an instant swap with the same focus
and head handling.

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

**`DNA93` — 3D assets are budgeted like images, per role.** Geometry ships
compressed (Draco or meshopt), textures ship GPU-compressed (KTX2 / Basis), and
occlusion, roughness and metalness are packed into one ORM map. Texture size
follows the object's role, not its source: background 512, standard 1024, hero
2048 — and 2048 only when the shot actually reaches macro distance (`DNA50`).
Texture memory stays near 100–150 MB on desktop and 30–50 MB on mobile; the hero
triangle count is stated in the budget (`DNA72`), not discovered in the profiler.
Colour textures are sRGB, data textures linear (`DNA56`), normal maps OpenGL Y+.

**`DNA94` — Embedded animation files obey the same loop rules as the canvas.**
Lottie, Rive, video loops and R3F scenes load when they approach the viewport,
pause offscreen and on a hidden tab, and are destroyed on unmount (`DNA75`, `G1`).
R3F renders on demand (`frameloop="demand"`) unless the scene is genuinely moving.
Lottie ships as dotLottie, on the canvas renderer when it is large. Under reduced
motion each one shows an authored still, never its first or a blank frame (`DM4`).

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
pill and badge clusters · an icon per
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

**`DNA91` — Off-default libraries, and the only case each one is allowed.** These
are not part of the stack. Each may appear only in the case named here, the report
names the case in one line, and no case waives a layer-1 floor. Outside its case
the library is a `DNA82` item.

- **AOS / scroll-reveal libraries** — only where the stack cannot take a build
  step or GSAP (a CMS or page builder, a client-hosted template). One reveal
  pattern for the whole page, with a declared role (`MJ1`), `once: true`, off
  under reduced motion, and content visible when the script never runs (`DNA39`)
  — AOS hides content in CSS by default, so that default is overridden. Where
  scroll-driven CSS is available it wins (`DNA45`).
- **Magic UI / React Bits** — only on a React project, only for the *mechanism*
  of one component the page genuinely needs, and only after it is rebuilt on the
  project's tokens (motion `I3`, `G4`) so nothing of the library's look survives.
  Never the signature move (`DNA37`), never more than one per page.
- **Vanilla-Tilt** — only on an object that *is* the subject (a vehicle, a lot, a
  product in a catalog), never on text or UI. Pointer-only by design, so it is
  absent on touch and under reduced motion, and nothing depends on it (`DM7`).
- **Vanta / Zdog** — only as the one depth idea of a first screen with
  dimensionality role SUPPORT (`DM6`), never behind body copy (`DM9`), paused
  offscreen (`DNA75`), and a composed still under reduced motion and on mobile.
- **Locomotive Scroll** — only where an existing site already runs it and the
  mandate is REFRESH or REDESIGN. It then replaces Lenis on that project, under the
  same contract as `DNA90`. Never both, and never chosen for a new build.
- **`modern-web-design` and other trend digests** — reference only (layer 5),
  for vocabulary and for spotting what already looks dated. Never the reason for a
  decision, and never a source of rules.

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

**`DNA89` — Before showing: the whole-page read, the binding checks, then Alex's
score.** *Relaxed by Alex on 2026-10-25 (step 3):* the sealed gate chain no longer
blocks a handoff. What stays: read the page top to bottom as one object, so one idea
runs through every section and the UX works for the buyer (`TASTE.md` §0, rule 7).
Gate 1's binding checks pass: keyboard and visible focus, 44px targets, reduced
motion with nothing hidden, no horizontal scroll, no console errors. Then open the
page in the browser and ask Alex for a score out of 10. Silence is not approval.

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

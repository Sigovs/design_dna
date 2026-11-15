# TECHNIQUES.md — the technique palette

**Non-normative. Nothing here binds, authorizes or forbids anything.** `TASTE.md` and
`skills/` decide whether a page moves and what it may do; this file only makes sure a
technique Alex has never seen can still be *offered* to him. A tool that nobody
mentions can never be chosen, and "lowest sufficient method" (`DNA45`) applied with no
palette in view quietly turns into "only what is already installed".

**How an agent uses it** (TASTE.md §2, rules for the read):
1. The idea comes first, in one sentence. Then read this palette.
2. Offer **up to two** techniques the idea could genuinely use — each with the clause
   of the idea it serves and what it costs. In the report, under *Technique offers*.
3. An offer is not a choice. The build plan still picks the lightest method that
   executes the approved concept, and Alex decides whether an offer is taken.
4. Never offer a technique for the look alone. "This would look cool" is not an offer;
   "the buyer can drag the car's panel and feel the weight of it" is.
5. Every offer carries its reduced-motion still and its mobile answer (`DM4`, `DM10`)
   — an offer without them is not finished.

**How it grows.** Add a row when a technique is seen working somewhere (vault, a
gallery, a post, a build). Write what it *does*, not what its README promises, and
re-run the upstream check (bottom of the file) for the row. Rows are never promoted
into `skills/` from here — that goes through the usual diff Alex reads.

**Status:** **stack** = an implementation skill or a DNA rule already covers it ·
**available** = never used on a build here, free to offer · **dormant** = upstream
inactive; usable, but pin the version and expect to own any bug · **friction** = runs
into a named rule; offer it only with that rule's `yields when:`.

---

## 1. Web — DOM, SVG, scroll

| Technique | What it does that lighter means can't | An idea it could serve | Cost · constraints | Status |
|---|---|---|---|---|
| **GSAP** ([site](https://gsap.com/)) — core plus ScrollTrigger, SplitText, Flip, MorphSVG, DrawSVG, Observer, all free | Authored timelines where many elements answer one clock; scroll scrub and pinning; **Flip** animates an element between two layouts (grid → detail) as one continuous move; **MorphSVG** turns one outline into another | A catalogue lot that opens into its detail view in one move — the photograph travels to its new place instead of the page cutting | `gsap-implementation` G1–G8 · `DNA45` ladder first · never on a page with Anime.js | stack |
| **Anime.js 4** ([site](https://animejs.com/)) | Springs with real settle, per-character `splitText` cascades, draggable with inertia, SVG drawing and morphing, build-free | A spec sheet whose figures settle on a spring as the buyer drags a slider through the model years | `animejs-implementation` A1–A8 · one timing engine per page | stack |
| **Motion** ([motion.dev](https://motion.dev/)) | Declarative springs, gestures, `layout` animation (cards rearrange instead of jumping), exit animation for removed items; also a small vanilla-JS build | Inventory filters where the remaining cars slide into their new order and the removed ones leave visibly | `motion-framer` · React for the full API · its reduced-motion default snaps — author the still | stack |
| **react-spring** ([repo](https://github.com/pmndrs/react-spring)) | Physics-based UI animation in React; pairs with R3F | — overlaps Motion; offer only when the project already runs it or pairs it with R3F | React only | available |
| **Lenis** ([repo](https://github.com/darkroomengineering/lenis)) | Controlled scroll smoothing; one loop with GSAP | A long editorial read where inertia is part of the register | `DNA90` · native scroll is the default | stack |
| **Vivus** ([demo](https://maxwellito.github.io/vivus/)) | SVG line-drawing with per-path sequencing: `delayed`, `sync`, `oneByOne`, and `scenario` (each path's start and duration authored in `data-start` / `data-duration` on the SVG itself). `setFrameProgress(0–1)` lets scroll drive the drawing — a scrubbed draw, not a timed one | A coachbuilder's blueprint that draws stroke by stroke as the buyer scrolls through the restoration chapter, the line finishing when the photograph of the finished panel arrives | Strokes only: filled shapes and outlined type must be redrawn as single strokes first. Tiny, no dependencies. For one or two paths, CSS `stroke-dashoffset` or Anime.js is lighter (`DNA45`). Reduced motion shows the finished drawing | dormant |
| **Typed.js** ([repo](https://github.com/mattboldt/typed.js)) | Typewriter text with backspacing and loops | A telemetry or auction-clock readout where text arriving character by character *is* the content | Delays reading (`MJ7`); a cliché on marketing copy. Reduced motion shows the full string | friction |

## 2. Web — canvas, WebGL, physics

| Technique | What it does that lighter means can't | An idea it could serve | Cost · constraints | Status |
|---|---|---|---|---|
| **Three.js** ([site](https://threejs.org/)), or R3F on React | Real depth: camera, material, light, environment reflections on paint | A car you walk around under studio light, the reflections moving across the panels as the camera does | Highest cost · `dimensionality` DM1–DM10 · `DNA72` budget, `DNA94` loop rules | stack |
| **Theatre.js** ([repo](https://github.com/theatre-js/theatre)) | A visual keyframe editor in the browser for Three.js and DOM values — camera paths tuned by eye on a timeline, saved as JSON, played by a small runtime | A cinematic camera move through a garage, authored like a film shot instead of guessed in numbers | Studio is dev-time only; the runtime ships. Upstream silent since 2024 — pin it | dormant |
| **PixiJS 8** ([site](https://pixijs.com/)) | Fast 2D on WebGL / WebGPU: thousands of sprites at frame rate, displacement maps, filters, masks | An index of 200 lots as one field of photographs that parts around the pointer; a displacement "heat haze" crossing a still photograph | Canvas — every word stays in the DOM (a11y, SEO) · mobile frame budget (`DM3`) | available |
| **p5.js 2** ([site](https://p5js.org/)) | Generative drawing and creative coding: noise fields, grids of form, image sampling, sound input | A generative pattern derived from something measured — the car's engine-note waveform, a track's lap data — rendered once as a brand asset | Heavy as a runtime; strongest at **authoring time** (render to PNG / SVG, ship the file). LGPL-2.1 | available |
| **Paper.js** ([site](https://paperjs.org/)) | A vector scene graph on canvas: paths you can unite / subtract / intersect live, smooth and simplify (a hand-drawn stroke cleaned into a few curves), offset, hit-test and export to SVG. Can read a photograph's pixels and redraw it as vector line — the *Spiral Raster* and *Division Raster* examples | (1) A car photograph redrawn as an engraving: one spiral line whose weight follows the image's brightness, as on a banknote or a collector's certificate. (2) A pointer that "cuts" a window through one layer into the photograph beneath (live boolean subtract) | Canvas — text stays in the DOM. Best used at **authoring time**: generate the engraving once, export SVG, ship the SVG — no runtime cost (`DNA45`) | available |
| **matter.js** ([repo](https://github.com/liabru/matter-js)) | 2D rigid-body physics: gravity, collision, stacking, constraints, dragging with weight | A "parts drawer" where restored components fall and stack with real weight, each one a link to its story | Gimmick risk is high — `CG3`: if a fade says the same, remove it · reduced motion shows the settled stack | friction |
| **tsParticles** ([repo](https://github.com/tsparticles/tsparticles)) | Configurable particle systems: emitters, links, confetti, fireworks | Only where the particles *are* the subject — sparks from a grinder in a workshop film, spray in a detailing chapter | `anti-patterns` D9 · `DM9` forbids it in reading zones · never as ambience | friction |
| **mo.js** ([site](https://mojs.github.io/)) | Motion-graphic bursts, shape morphs and timeline-based "pops" with a curve editor | A single earned moment — the confirmation when a viewing is booked | Decorative by default (D9); no release since 2023 | friction · dormant |

## 3. Embedded animation files

| Technique | What it does that lighter means can't | An idea it could serve | Cost · constraints | Status |
|---|---|---|---|---|
| **Lottie** ([lottie-web](https://github.com/airbnb/lottie-web), shipped as dotLottie) | Plays animation authored in After Effects — the motion designer's own timing, not a re-implementation | An animated monogram or icon set where the motion is part of the brand, delivered by a motion designer | `DNA94` · dotLottie, canvas renderer when large, authored still · lottie-web itself is quiet since 2025; check the dotLottie player's own activity before relying on it | stack |
| **Rive** ([rive-wasm](https://github.com/rive-app/rive-wasm)) | Interactive animation driven by a state machine — the file itself knows its states and reacts to input, hover, scroll or data | A configurator control — roof open / closed, wheel finish — that animates between real states instead of swapping images; an instrument-cluster gauge fed by real numbers | `DNA94` · the runtime is MIT; the editor is a hosted product (plans not verified) · the state machine must mirror real product states, never invent them (`CP`) | stack |

## 4. Video output — code that renders to MP4, not to a page

A separate decision from the web stack: the deliverable is a film (reel, social cut,
case-study video, explainer), not a site. `generated-imagery` and `content-provenance`
still apply to every frame.

| Technique | What it does | An idea it could serve | Cost · constraints | Status |
|---|---|---|---|---|
| **Remotion** ([site](https://www.remotion.dev/)) | React components rendered to video frame-exactly; data in, film out; renders locally or in the cloud | A portfolio case-study film cut from the actual build; a model-line reel generated from one inventory file, one cut per car | Own licence, not MIT: free for individuals and small teams, a company licence above that — read its `LICENSE.md` before client work · a kit already lives in `external/mg-styles-15` | available |
| **HyperFrames** ([repo](https://github.com/heygen-com/hyperframes)) | HTML compositions rendered to video through headless Chromium + ffmpeg — the page *is* the frame | Recording a built page's scroll and motion as a clean, frame-perfect film for the portfolio instead of a screen capture | Apache-2.0 · pre-1.0, moving fast — pin the version · surveyed in `external/posthuman-explorer-chat` | available |
| **Motion Canvas** ([site](https://motioncanvas.io/)) | TypeScript, generator-driven animated explainers with an editor preview and audio sync | A "how the car was restored" step-by-step explainer synced to a voice-over | Explainer register, not brand film · last release 2024-12 | dormant |

## 5. Surfaces and backgrounds — grounds that keep a design from reading flat

Source: Charles Liu, "22 Backgrounds to Make Designs Less Flat" (Facebook reel, seen
2026-11-15). Only items 1–13 were legible in the capture; 14–22 are not recorded
here rather than guessed.

Four rules from DNA apply to every row and are not repeated below:
- **One ground per page.** A page that changes background system per section reads
  as several designs sharing a URL (`anti-patterns`, competing art directions:
  *unrelated background systems*). Offer a surface as *the page's* ground, or as one
  recurring role — never one per section.
- **Contrast is measured on the composited pixels**, over the worst region of the
  texture, and across its whole travel if it moves (`color-taste`).
- **A declared texture must measurably paint.** Sample its darkest and brightest
  pixel; equal values mean it is not there (`anti-patterns`, *a layer that fails
  paints nothing*).
- **A texture never sits on the product.** The buyer's photograph of the car stays
  unfiltered; surfaces belong to the ground, the frame, the chapter break.

Build means, lightest first: a tiled PNG/WebP → CSS gradients and blend modes → an
SVG filter (`feTurbulence`, `feDisplacementMap`, `feComponentTransfer`) → a canvas or
WebGL shader. Large SVG filters repaint expensively on scroll — rasterize them once
when they do not move. Photographic textures (felt, paper, grass, landscape) are
either photographed or disclosed as generated (`generated-imagery` GI1–GI9).

| Surface | What it does | An idea it could serve | How it is made · constraints | Status |
|---|---|---|---|---|
| **Felt texture** | A soft, matte, fibrous ground that absorbs light — reads as lining, not as wall | The felt of a watch box or a glove-box tray: lots laid out on it like objects in a collector's case | Photographed or scanned felt, tiled; dark felt under light type needs the measured contrast check | available |
| **Fluted glass** | Vertical reeds that refract what sits behind them into strips — privacy glass in a showroom partition | A chapter break where the next car is seen blurred through a reeded showroom partition, resolving as the reader scrolls past | SVG `feDisplacementMap` with a repeating-gradient map, or a shader; `backdrop-filter` is costly on mobile. Type never sits *on* the reeds | available |
| **Thermal gradients** | Heat-map colour: black → magenta → orange → yellow-white | A thermal reading of an engine bay or brake disc after a run — the colour *is* the data | Only when it maps real heat; as decoration it collides with the banned-palette trope (`anti-patterns` D1) | friction |
| **Water ripples** | Concentric or flowing distortion of a surface | Reflection on a wet concours lawn or a rain-wet road under the car | Static: SVG displacement. Moving: a shader — then `DM9` and D9 forbid it in reading zones; reduced motion shows the still surface | friction |
| **Speckled graphite** | Dark grey ground with fine irregular speckle — stone, cast iron, powder-coat | A workshop floor or cast-metal ground for a dark technical page; carries a dark-first base without flat black | Tiled noise texture or `feTurbulence` rasterized; speckle density low enough that small type stays clean | available |
| **Single-hue landscapes** | A landscape photograph reduced to one hue (duotone / monotone) — place without competing colour | The road or region a car was built for, in one tone behind the specification chapter | `feColorMatrix` or graded at authoring; a real place is captioned as that place (`content-provenance`) | available |
| **Blueprint grids** | Fine engineering grid, often with dimension marks and a coloured ground | A coachbuilder's or restorer's drawing board behind the build-sheet section; pairs with a Vivus line drawing | CSS `repeating-linear-gradient` or SVG pattern; grid pitch tied to the layout grid, not arbitrary (`spacing-taste`) | available |
| **Halftone** | An image or tone rendered as dots of varying size — print, newspaper, poster | An archival chapter: period press photographs of the model, printed as they appeared in the magazine | Authoring-time conversion (Photoshop, p5.js, Paper.js) or an SVG/CSS dot mask; never on the inventory photograph | available |
| **Grainy gradients** | A gradient with film grain over it — removes banding, adds tooth | Atmosphere *behind* content on a dark-first page; a light falling across the ground | Gradient + tiled noise or `feTurbulence`; a single large gradient as atmosphere is allowed (`anti-patterns` D2), soft gradient blobs as the look are not (D8), and it never drifts (D9) | available |
| **Grass texture** | A lawn as a ground plane | A concours d'elegance: cars presented on the lawn, the page set on it | Photographed only — generated grass reads as generated · narrow fit | available |
| **Dithered images** | An image reduced to a few tones with patterned dither — 1-bit, early-screen, technical | A telemetry or archive register: the car's period documentation rendered as an early printout | Authoring-time (p5.js or an image tool); dithering destroys product detail, so never on the photograph the buyer judges | available |
| **Paper texture** | Visible paper stock — tooth, fibre, slight tone | An auction catalogue printed on real stock: the lot description set on paper, the photograph tipped in | Scanned paper, tiled at low contrast; the strongest native fit to auction-editorial's archival side | available |
| **Contour lines** | Topographic isolines — elevation drawn as nested curves | Elevation of a real road or circuit the car is associated with, drawn from the actual terrain data rather than invented | `d3-contour` or Paper.js over real elevation data, exported as SVG; invented terrain presented as a real place violates `content-provenance` | available |

## 6. Reference libraries to offer from

Larger catalogues that are not one technique each. Offer from them the same way: up
to two, each with the clause of the idea it serves.

| Library | What it holds | How it is used here | Status |
|---|---|---|---|
| **ui-ux-pro-max** (installed plugin · [repo](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill), MIT) | A searchable database: ~84 styles, 192 palettes, 74 font pairings, GSAP motion presets, UX guidelines | Searched for a style, palette or type pairing worth offering — or as the concept's starting point (Alex, 2026-11-15). Before markup the style becomes one sentence about what it means for this client (`CG1`). A palette passes accent derivation and measured contrast (`color-taste`) and is not a D1 trope (TASTE.md §3) | available |

---

## Upstream check — 2026-11-15

Read from the GitHub API (`gh api repos/<repo>`); "last push" is the latest commit on
any branch. Re-run for a row before offering it if this date is more than a few
months old.

| Repo | Last push | Latest release | Licence |
|---|---|---|---|
| greensock/GSAP | 2026-11-04 | — (npm) | GSAP Standard "no charge" licence, not OSI |
| motiondivision/motion | 2026-11-15 | — (npm) | MIT |
| juliangarnier/anime | 2026-11-02 | v4.5.0 · 2026-06-22 | MIT |
| pmndrs/react-spring | 2026-11-01 | v10.1.2 · 2026-06-24 | MIT |
| darkroomengineering/lenis | 2026-11-13 | v1.3.27 · 2026-10-15 | MIT |
| maxwellito/vivus | 2022-07-06 | v0.4.6 · 2021-04-17 | MIT |
| mattboldt/typed.js | 2026-01-25 | v3.0.0 · 2026-01-24 | see repo |
| mrdoob/three.js | 2026-11-15 | r187 · 2026-10-30 | MIT |
| theatre-js/theatre | 2024-08-14 | — | Apache-2.0 |
| pixijs/pixijs | 2026-11-11 | v8.23.0 · 2026-11-11 | MIT |
| processing/p5.js | 2026-11-14 | v2.4.0 · 2026-11-12 | LGPL-2.1 |
| paperjs/paper.js | 2026-11-14 | v0.17.0 · 2026-11-03 | MIT-style (see repo) |
| liabru/matter-js | 2026-09-30 | — (npm) | MIT |
| tsparticles/tsparticles | 2026-11-15 | v4.4.0 · 2026-08-31 | MIT |
| mojs/mojs | 2026-07-30 | v1.7.1 · 2023-10-06 | MIT |
| airbnb/lottie-web | 2025-09-01 | — (npm) | MIT |
| rive-app/rive-wasm | 2026-11-15 | 2.50.0 · 2026-11-09 | MIT |
| remotion-dev/remotion | 2026-11-15 | v4.0.543 · 2026-11-11 | Remotion licence |
| heygen-com/hyperframes | 2026-11-15 | v0.9.52 · 2026-11-15 | Apache-2.0 |
| motion-canvas/motion-canvas | 2026-07-02 | v3.17.2 · 2024-12-14 | MIT |

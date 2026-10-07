# mg-styles-15: 15 motion-design styles as prompts for a coding agent

**Status:** reading material. **Nothing here binds** (see `external/README.md`). A rule binds only when it has
been argued into `skills/` in our own words.

## Upstream

| | |
|---|---|
| Gallery | https://vincentwei1021.github.io/mg-styles-15/ |
| Repo | https://github.com/vincentwei1021/mg-styles-15 |
| Commit | `49052d80bfaf9fa8412cc9710530e5e95a3b8d8c` (2026-10-05) |
| Licence | MIT, © 2026 Vincentwei1021 (`upstream/LICENSE`). Vendoring is permitted if the notice is kept. |
| Taken | 2026-10-07 |
| Vendored, in `upstream/` at that commit (3.5 MB) | `prompts/` (all 15), `rubric.md`, `template.md`, `harness/`, both READMEs, `LICENSE`, `package.json`, `requirements.txt`, and `posters/` (the poster frame of each film). |
| Not vendored | `videos/` (441 MB), `demos/` source (66 MB), `lib/`, `assets/`, `docs/`. Get them from the commit above. |

## What it actually is

Each of the 15 styles ships five things:
1. a 10-second film;
2. a description of the style;
3. one long prompt with a fixed structure: **Output → Suggested technical route → Creative seed → Signature
   features and key techniques**;
4. full source code;
5. a `rubric.md` for a second AI to critique the cut, after which the maker revises.

Every film is a web page rendered to video (HTML, SVG, Canvas, Three.js, WebGL). Most also carry a soundtrack
synthesised in code and mastered to −14 LUFS.

The styles:
- 01 Flat Vector
- 02 Line Art
- 03 Isometric
- 04 3D Render
- 05 Frame-by-Frame (line boil)
- 06 Collage
- 07 Liquid
- 08 Shape Morph
- 09 Bauhaus
- 10 Synthwave
- 12 Aurora & Glass
- 18 Variety Captions
- 19 Sticker Explainer
- 20 Pixel Art
- 22 Cyberpunk HUD

## Where it agrees with us

- **"Signature features" are kept and the "creative seed" is swapped.** This is our two tiers: the
  recognisable mechanics play the invariant, the content and brand play the dialect.
- **A second agent critiques, then the maker revises.** This is our Critique Panel / design-critic loop.
- **Motion is authored choreography:** layered build-up, staggered draw-on, a decided peak. That is
  `motion-judgment`, not fades.

## Where it disagrees with us

- **The canonical HUD look is a skin:** cyan neon, glow, chromatic aberration, micro-glitch. On a luxury,
  dealer or finance brief that skin is the casino/kitsch failure and anti-patterns D1, the AI default. The
  mechanics travel; the skin does not.
- **"A clean result is a fail"** is a Behance-shortlist benchmark. Ours is legibility and restraint first;
  density has to be earned.
- **Several styles (Isometric, Pixel, Flat Vector, Collage, Stickers) draw or recompose the subject.** When
  the subject is a real product, GI3 decides: a stylised rendering is acceptable only if it is derived from
  the real photograph or its mask, never invented.

## What is worth taking first

**The HUD mechanics, recast as an *inspection* language rather than a sci-fi one.** For any brief where "the
system examines the object" is the point (verification, provenance, certification, condition reports), HUD
is the native grammar. The kit is in `hud-inspection/`.

Kept from the style:
- the instrument frame draws on in staggered order (stroke-dashoffset);
- a scan line crosses the subject, and shot points tick on as it passes;
- an identifier rolls random glyphs for 3–5 frames per character, then settles left to right;
- status lines type out with a cursor, each closing on `[OK]`;
- lock brackets snap from 1.4× to 1.0× (fast-out, slow-in);
- sound is cued to the frames: ticks, a scan sweep, a patter during the roll, a blip on each `[OK]`, then a
  thump and a two-note lock.

Translated into a restrained register:
- a dark ground with thin light linework;
- **one** accent moment, at the lock;
- no neon, glow, glitch or chromatic aberration;
- a radial shade that keeps the subject lit and holds a busy background down;
- readout panels on frosted glass (from #12, without the aurora);
- a #02 Line Art opening: one line traces the subject's real silhouette before the photograph rises.

What the kit contains:
- **`Inspection.tsx`** is a brand-agnostic Remotion component. The photograph, silhouette, subject box, shot
  points, all copy and the palette are props. It renders 16:9 and 9:16. The subject is placed on the frame's
  focal point; a big subject scales down, and any edge that enters the frame dissolves.
- **`trace_outline.py`** turns a cut-out mask into the silhouette path, the box and 12 shot points spaced
  along the contour (OpenCV).
- **`sound.py`** synthesises the soundtrack (numpy, no samples). It writes a raw WAV; loudness is set in
  ffmpeg (`loudnorm`).
- **`render.sh`** renders the frames, then lets ffmpeg encode them and mux the audio. It works around
  Remotion's encoder, which fails on macOS 13.

The kit was proved on a real dealer-auction brief: a 12-lot catalogue in both formats, from the site's data.
That project's files stay in the project, not here.

## What is not a candidate

- The cyan/orange neon skin, glitch and chromatic aberration as a default on any client brief.
- Variety Captions (#18) and Pixel (#20) as house languages. They can be samples or one-off campaign
  devices at most.
- Anything that draws a real product, real premises or a real person from imagination (GI3).

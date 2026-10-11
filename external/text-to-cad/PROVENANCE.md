# text-to-cad — provenance (tool, NOT vendored)

- **Upstream:** https://github.com/earthtojake/text-to-cad · docs https://www.texttocad.dev
- **Commit read:** `b48ff49e00968ac07af08572b0595483dae07c85` (2026-10-10)
- **Recorded:** 2026-10-11, at Alex's request.
- **Licence:** MIT. Vendoring would be permitted, but it isn't worth it. The repo is
  around 300 MB of apps, a CAD runtime and a viewer. It is a tool to install, not
  text to mine.
- **Install (Claude Code):**

  ```bash
  claude plugin marketplace add earthtojake/text-to-cad#latest
  claude plugin install text-to-cad@earthtojake
  uvx cadgen telemetry off   # it sends usage stats by default
  ```

  It needs `uv` (installed on the Windows machine: 0.12.5). The first start
  downloads the CAD runtime.

## What it actually is

A plugin that gives an agent a local parametric CAD pipeline: Python
[build123d](https://github.com/gumyr/build123d) on Open CASCADE, through the
`cadgen` package. The agent writes code. Out come STEP / GLB / STL / 3MF, which you
inspect in a local viewer (`cadgen mcp`, a card in the chat or a browser link). The
skills: `cad`, `sdf` (signed-distance modelling), `step-parts`, `dfm` and
`dfam-check` (manufacturability), `engineering-drawing`, `dxf`, `gcode`,
`bambu-labs`, `sendcutsend`, and `urdf`/`srdf` (robot descriptions).

## Where it fits our work

- **Three.js scenes (dimensionality, threejs-art-direction).** It makes *exact,
  owned* geometry for a scene: pedestals, plinths, display stands, architectural
  props, a turntable, an abstract sculptural object, a branded physical token. The
  GLB goes straight into Three.js.
- **The `sdf` skill** is the interesting part for us. Signed-distance modelling
  gives soft, blended, organic forms that classic CAD does not. Read it before
  reaching for a stock asset.
- **Physical deliverables.** Signage, a showroom fixture, a 3D-printed gift or
  model, with drawings and DFM checks attached.

## Where it does not fit

- **It cannot make a car, or any real product.** generated-imagery GI3 already
  bans depicting a real product with generated assets. Parametric CAD is the wrong
  tool for a car body anyway, and a "close enough" model of a real marque is
  exactly what that invariant forbids. Real vehicles come from licensed models or
  photography.
- **CAD is engineering geometry.** Materials, light and art direction still come
  from threejs-art-direction. A correct GLB is not a composed scene.
- **The geometry is free, the look is not.** Default viewer renders are not
  delivery imagery.

## Worth taking first

1. Install it, and try `sdf` on one prop for the next Three.js scene. Record the
   result in `projects/`.
2. Add one line to threejs-art-direction's asset notes as a candidate: "a prop or
   pedestal that is ours to own may be modelled with text-to-cad; a real product
   never." It goes in only as an approved diff.

## Status

Nothing here binds. Promotion into `skills/` happens only as a diff Alex approves.

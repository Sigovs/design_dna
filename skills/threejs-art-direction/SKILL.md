---
name: threejs-art-direction
description: Art direction for real-time 3D on editorial, automotive and luxury web pages. Use AUTOMATICALLY whenever a task involves Three.js, WebGL, 3D objects, procedural geometry, 3D materials, 3D lighting, scroll-controlled 3D, 3D automotive presentation, 3D background objects, or shaders used as dimensional page elements. Two tiers. INVARIANT TA1–TA12: 3D is part of the page composition, not a demo; silhouette before detail; no faceting or banding; restrained believable PBR; light designed around the type; placement and crop set against the typography, no accidental foreshortening; scroll owns motion via scrub and pins, never wheel blocking; impact → hold → release; declared budget, lazy-loaded Three.js, no idle loop; canvas never steals input; authored reduced-motion and mobile states; verified on the render. DIALECT: dark, low-key, material over geometry. Load with dimensionality (role first), motion-taste and academic-composition.
---

# Three.js Art Direction

> **For GDBuro work, 3D behaves like part of the page composition, not like a separate
> 3D demo.** It takes a place in the mass scheme, a rank under the typography it sits
> with, and a job a still image could not do. If it could be cut without the page
> losing an idea, it is decoration with a frame budget.

This skill decides **what a 3D element should look like, where it goes and how it
moves on a page**. It does not decide whether there is depth at all — that is
[dimensionality](../dimensionality/SKILL.md), whose role ladder (MAIN / SUPPORT /
ABSENT) and DM1–DM10 run **first** and are never restated here. How a GSAP timeline is
built belongs to [gsap-implementation](../gsap-implementation/SKILL.md) (G1–G8). Where a
3D element sits in the page is judged with
[academic-composition](../academic-composition/SKILL.md); its timing with
[motion-taste](../motion-taste/SKILL.md).

**Technique references, beneath this skill.** Projects may carry the generic
`threejs-geometry`, `-materials`, `-lighting`, `-animation`, `-scene`, `-debugging`,
`-performance` and `-web` skills. They are the right source for API behaviour —
attribute layout, colour management, shadow bias, mixer lifecycles, disposal — and
they bind nothing about taste. Where one of them and this skill disagree on a visual
matter, this skill wins; on an API matter, the official docs for the installed
revision win over both.

**Order of work:** dimensionality role → composition (where, how big, what crop) →
form → material → light → motion → budget → verification. Styling a shader before the
object has a place on the page is how a scene ends up advertising its renderer.

---

## INVARIANT

### TA1 — The object serves the page

A 3D element is declared as a mass in the page's composition before it is modelled:
its rank (normally **support** under the type), the region it occupies, what it
crops against, and the one thing it adds that a photograph or a still render could
not. A canvas that would be equally at home on any page has not been art-directed.

*Why:* a 3D demo competes with the content it was meant to frame — the failure
[C16](../academic-composition/SKILL.md#invariant) names (the dominant is the subject,
not the device presenting it).

### TA2 — Proportion and silhouette before detail

Block the form from its reference proportions first and judge it **as a silhouette at
the size it will render**. Correct masses, ratios and the read of the shape (a gavel
reads as a gavel, a car as its model) come before bevels, grooves, inlays or texture.
No ornament until the silhouette is right.

*Why:* detail on a wrong proportion is the most expensive way to look amateur, and no
material rescues a shape that reads as a different object (a head that reads as a
tube, a handle that reads as a rod).

### TA3 — No faceting, no banding at the rendered size

Curved forms get enough radial and height segments that no flat facet or stepped
specular band is visible **at the largest size the element is shown, on a 2× screen**.
Every hard edge a real object would have softened gets a bevel or fillet, which is
what catches the highlight. Normals are smooth across curvature and split only where
a crease is intended; verify them, do not assume them. Density follows silhouette and
highlight, not an arbitrary high count.

*Why:* banding and faceting are the single most visible tell of procedural 3D, and
they appear exactly where a dark polished material puts its highlight.

### TA4 — Believable, restrained PBR

Materials are physically plausible: metalness either 0 or 1 for the real substance,
roughness in a believable range with **variation** rather than one uniform value, and
clearcoat used only when the real object is lacquered — at low strength. Dark
materials need **broad** highlights from an environment, not tight sparkles from point
lights. Never: plastic sheen, mirror gloss on wood, glowing edges, saturated colour
the real material does not have. The material supports the art direction; it does not
advertise the shader.

*Why:* a surface that looks rendered breaks the photographic world it sits in; on an
automotive or luxury page every other image is a photograph.

### TA5 — Light is designed for the composition

Lighting is a key, a rim and an environment, each with a job: the **key** models the
form broadly; the **rim** separates the silhouette from the ground where the read
needs it; the **environment** gives believable reflections. Not every surface is lit —
falloff into darkness is part of the image. Light is placed against the typography:
highlights land away from the reading zone, and the brightest point of the object is
never behind body copy.

*Why:* even, all-round lighting flattens the form and fights the type; directed light
is what makes a dark object legible without making it loud.

### TA6 — Placement and crop are decided against the type

The camera and object are composed for the page, not for a product render: a large
background object is usually **cropped by the frame on purpose**, off-centre, and
sits behind or beside the copy with its mass balanced against the type's. Choose a
long lens / low field of view and an angle that shows the object's defining profile;
**camera-facing foreshortening and wide-angle distortion are avoided** unless they are
the deliberate idea. Fit framing against both horizontal and vertical field of view.

*Why:* foreshortening makes a familiar object unrecognisable and a wide lens makes it
cheap; a centred hero object turns a section into a showroom.

### TA7 — Scroll owns the motion; input is never hijacked

Scroll-driven 3D maps **section progress** (a pinned ScrollTrigger, a scrubbed
timeline) to object and camera state, and handles reverse scrolling and jumps exactly.
The visitor's wheel, trackpad and keys are never blocked, throttled or re-timed to
fake weight; a pause is made by **extending the pinned distance** (a dead zone in the
timeline), never by slowing input. One system owns each property — the 3D state
reads the same progress the section's other choreography reads, never a parallel
scroll listener.

*Why:* hijacked input is the fastest way to make a premium page feel broken, and two
systems writing one transform is the classic source of jitter.

### TA8 — Impact → hold → release

A decisive event (a strike, a stop, a reveal) is followed by a **hold**: roughly
15–20 % of the pinned distance in which almost nothing moves and the resulting state
can be read. Then release. Motion is restrained and physical — no spinning, no
bounce, no elastic, no turntable rotation as a default. The camera observes; it does
not tour.

*Why:* an event without a beat after it has no weight; continuous motion through the
moment of consequence erases it. Extends [DM8](../dimensionality/SKILL.md#invariant)
(choreography has a subject).

### TA9 — Budget declared, work only when it shows

State before building: target frame rate on the worst supported device, triangle and
texture budget, and a pixel-ratio cap (normally `min(devicePixelRatio, 2)`, lower on
mobile). Three.js is **lazy-loaded** when the section approaches; nothing renders while
the canvas is off-screen or nothing has changed; render on demand from the scroll /
ticker update, never a free-running loop. No per-frame allocations. Owned geometry,
materials, textures and environments are disposed on teardown.

*Why:* [DM3](../dimensionality/SKILL.md#invariant) states the budget rule; this is its
WebGL form. An idle render loop costs battery and scroll smoothness for nothing.

### TA10 — The canvas never takes the page's job

A background 3D canvas is transparent, `pointer-events: none`, `aria-hidden`, sized
from its container (ResizeObserver, zero sizes skipped), and adds no horizontal
overflow. Links, buttons, selection, focus and scrolling all work through it. If WebGL
is unavailable or the context is lost, the section is complete without it.

*Why:* [DM1](../dimensionality/SKILL.md#invariant) — at SUPPORT the page stands with the
scene removed; a canvas that eats clicks breaks that in the one way users notice.

### TA11 — Reduced motion and mobile are authored states

`prefers-reduced-motion` gets a **composed still** of the object (one chosen frame,
or a poster image), not the animation frozen mid-move. Mobile gets its own framing,
smaller movement and lighter scene — or no scene, which is often right. Neither state
loses information the motion carried.

*Why:* [DM4](../dimensionality/SKILL.md#invariant) and [DM10](../dimensionality/SKILL.md#invariant)
applied to a rendered object.

### TA12 — Verified on the render, not in the code

Before delivery, inspect in a real browser: normals (a normal-material or flat-shaded
pass), segmentation under a grazing light, z-fighting and near-plane clipping, canvas
size versus drawing buffer, premultiplied transparency and dark fringes on the page
ground, pointer-events, text contrast over the object **at its brightest frame**
([DM5](../dimensionality/SKILL.md#invariant)), frame time while scrolling, reduced
motion, mobile and the no-WebGL fallback. Record what was measured and on what device.

*Why:* every failure above is invisible in source and obvious on screen.

---

## DIALECT

### auction-editorial / GDBuro house position

**Dark, low-key, material over geometry.** One well-made object, lit like a museum
piece at night: a broad soft key from above-front, a thin cool rim, deep falloff, no
fill that flattens the shadow side. Dark woods, blackened metals, smoked glass,
lacquer at low clearcoat. Accent colour comes from the object's own material, never
from coloured lights. Camera is long-lens and patient; moves are few, slow and
scrubbed; the strongest frame is often a still.

**Large and cropped beats small and complete.** A background object is usually bigger
than the frame, entering from an edge, and quieter than the type in front of it.

`yields when:` the brief is a product or configurator whose purpose is to inspect the
object (orbit, colour change, exploded view) — then the object may be centred, fully
shown, evenly lit and interactive, and TA6's crop preference gives way to
[DM7](../dimensionality/SKILL.md#invariant)'s input honesty.
**Invariant floor:** TA3, TA4, TA7, TA9, TA10 still bind — inspection does not excuse
faceting, plastic materials, hijacked scroll, an unbudgeted loop or a canvas that
eats the page.

---

## Checklist

**Before modelling**
- [ ] Dimensionality role declared (MAIN / SUPPORT / ABSENT) and logged (dimensionality).
- [ ] The object's place in the page: region, rank, crop, the job only 3D can do (TA1, TA6).
- [ ] Budget: fps target, triangles, textures, DPR cap; lazy-load plan (TA9).

**Form, material, light**
- [ ] Silhouette right at render size before any detail (TA2).
- [ ] No facets or bands at the largest size on a 2× screen; bevels on real edges; normals verified (TA3).
- [ ] PBR values believable, roughness varied, no plastic sheen; dark material has broad highlights (TA4).
- [ ] Key / rim / environment each has a job; brightest point not behind body copy (TA5).
- [ ] Long lens, defining profile, no accidental foreshortening; framed on both FOVs (TA6).

**Motion and integration**
- [ ] Scroll progress drives state; reverse and jumps exact; no wheel blocking; one owner per property (TA7).
- [ ] Impact → hold (~15–20 % of the pin) → release; no spin, bounce or turntable (TA8).
- [ ] Renders only on change and only in view; disposal on teardown (TA9).
- [ ] Transparent, `pointer-events: none`, `aria-hidden`, no overflow, page complete without WebGL (TA10).
- [ ] Reduced-motion still and mobile composition authored (TA11).
- [ ] Render-level verification pass recorded (TA12).

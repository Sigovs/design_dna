---
project:      ns-barbers-v5-enamel
client:       NS Barbers (Highland Park, IL)
date:         2026-10-25
mandate:      REDESIGN
carried:      [shop logo, phone (847) 777-0274, "Call to book", real price list, Visit block with live status]
delivery:     BUILD — concept paragraph and references approved by Alex before the build
style_mode:   not recorded
dialect:      not recorded
anchor:       not recorded
contrast:     not recorded
signature:    scroll-driven background paint change (one field colour per chapter)
dialect_fit:  not recorded
suspended:    not recorded
role:         ABSENT                       # 3D only as offline still renders, no WebGL on the page
register:
  ground:     flat enamel field per chapter — royal blue #1c3577, cream #efe7d7, mint #b7d2bb, ink #101513
  display:    Anton (all caps), with Source Serif 4 text and IBM Plex Mono labels — reused from v4
  accent:     red #b3261e, booking action only
  image:      contained
  hero:       split
  symmetry:   asymmetric
  density:    sparse
  voices:     3+
  motion:     restrained
outcome:      abandoned
---

# NS Barbers — v5 "Enamel"

**Rejected outright by Alex on 2026-10-25: "1/10, всё скучно" — "kill this version
completely".** Not a revision request. The build passed every check it was given and
failed the only one that mattered: it was boring. This record exists to be read
before the next small-business or service brief, and it is deliberately not softened.

Artefact, moved unchanged (not deleted):
`.✨ NS_BARBERS/versions/_rejected/v5-enamel-rejected-2026-10-25/` — README, source,
`qa/` captures at 1440/1024/768/390, offline renderer `tools/render.html`, and the
dist zip. The project's own failure list is in `.✨ NS_BARBERS/CLAUDE.md`, feedback
log entry of 2026-10-25.

## 1. The brief in my own words

A fifth homepage for a two-owner neighbourhood barbershop that has almost no usable
documentary photography. Alex's brief (`BRIEF-v5.md`): don't touch v4, ≤ 7 screens
at 1440×900, one motion idea, find the strength in type, objects (chairs, tools,
pole), illustration and colour instead of photos, and don't look like a generic AI
barbershop. What it actually asked for, unsaid: **a site with an idea strong enough
to replace the photography** — something more interesting than v4, not something
shorter and tidier than v4.

## 2. Task and means

- **Task:** see that this is a real, good local shop; check the prices; call to book;
  find it and know whether it is open.
- **Means:** "Call to book" in the header and the first screen; a full price list
  (chapter 2); Sergey and Nick from the shop's studio shoot (chapter 3); Visit with
  live open/closed status, hours, address and satellite map (chapter 4).
  The means all worked. The page gave no reason to care about any of them.

## 3. Decisions

- decided: colour of the shop's own chair enamel as the identity, one flat field per chapter | rejected: v4's graded cinematic photography | why: replace missing photos with colour confidence (concept). **Result: a flat field with nothing in it — no light, texture or depth. It read as a template, not a world.**
- decided: first screen = huge wordmark + one rendered chair on royal blue | rejected: a person-at-work hero (AI-barbershop cliché, per brief) | why: identity and object at one glance (hierarchy). **Result: no idea and no tension; half the screen is empty colour.**
- decided: offline three.js renders of the Meshy chair reconstructions as hero objects | rejected: WebGL on the page (weight) and the real chair photos | why: clean objects on colour (character). **Result: plastic enamel, CG shine, floating with no floor or light — stock 3D, not the shop's antique chairs.**
- decided: the one motion idea = the page background crossfades to the active chapter's colour (0.7 s) | rejected: a pinned scrub | why: motion that never hides text (usability). **Result: nobody notices it, so it is not an idea.**
- decided: keep v4's Anton + Source Serif + Plex Mono, set nearly everything in uppercase Anton | rejected: a new type voice | why: continuity with what worked in v4 (character). **Result: no new voice, a monotone hierarchy.**
- decided: price list numbered 01–17 "like a catalogue", three columns | rejected: v4's sticky-frame services | why: scannable, object-catalogue flavour (usability). **Result: numbers that mean nothing, on a plain menu template.**
- decided: Sergey and Nick as the studio cut-outs on flat mint, cropped at the knee | rejected: v4's magazine cover | why: shorter page, real people (concept). **Result: still cut-outs on flat colour; the crop fixed nothing.**
- decided: live status as the Visit headline | rejected: address as headline | why: the most useful fact first (usability). **Result: "CLOSED NOW" in giant type leads with a negative.**
- decided: no real shop photography anywhere | rejected: the storefront and floor photos | why: they were weak (brief). **Result: the shop disappeared from its own site.**

## 3b. Exploration, if one ran

No EXPLORE. One concept paragraph ("Enamel") with references was shown and approved
("davaj kruti!!!!"), then built. **The approval was of a paragraph, not of a screen.**

- **Selected:** Enamel — what decided it was a convincing sentence, not a rendered frame.
- **Rejected:** none shown.
- **Combined:** n/a.
- **Marked as a general preference:** none stated beyond "boring is the failure".

## 4. Environment knowledge

- Windows + Git Bash: `mv` of a folder an Astro preview server had touched fails with
  "Device or resource busy"; PowerShell `Move-Item -LiteralPath` succeeds.
- `Compress-Archive` writes backslashes into zip entries; the `/test-v5/` host needs
  forward slashes — `tools/pack.py` (Python `zipfile`, `arcname` with `/`) does it.
- Offline stills from a GLB without WebGL on the page: a local `render.html` with
  three.js + `RoomEnvironment` + `toDataURL`, driven by chrome-devtools, served from a
  `python -m http.server` in the version folder. It works — and it makes renders look
  exactly as CG as they are; no grading in `stills.py` rescued the material.
- Astro `base: '/test-v5'`: every asset path must go through `import.meta.env.BASE_URL`;
  a hard-coded `/img/...` works on preview at the root and breaks on the host.

## 5. What turned out wrong

Everything above is this section. The process failures, which matter more than the
surface ones:

- **References were picked to fit an idea already formed.** The Red (333 S. Wabash)
  and Object & Archive are a real-estate site and an object archive — not barbershops,
  not service businesses. The barbershop references found in the same search (Blind
  Barber, Crisp, Panike) were "set aside" because they rely on photography, which is
  exactly where to look for how a shop without good photos still feels alive.
- **I judged "does it read as one whole?" instead of "is it interesting?"** Coherence
  passed; interest was never asked. This is the same failure as
  [chicago-motor-cars-concept-2](chicago-motor-cars-concept-2.md) — *the system
  verified everything it could measure* (4.46 screens, no overflow, console clean,
  focus visible, ledger complete) *and never asked whether anyone would want it* —
  and it happened **with** [TASTE.md §2c](../TASTE.md#2c-selection-coherence-and-device-discipline)
  coherence-is-not-quality already in force.
- **Concept approval replaced a hard look at the first rendered screen.** The first
  screen should have been rendered and shown with the concept, before the rest was
  built; one look at `qa/1440-1-hero.jpeg` was enough to reject it.
- **"Fewer screens" was treated as the goal.** v4's 19 screens were a real failure,
  but cutting to 4.5 by removing content, photography and motion produced a short
  boring page, not a strong one.
- **Two wins quietly reused from v4** (type system, cut-outs) carried v4's weaknesses
  into a version that was meant to replace it.

The single sentence worth carrying: **a page with no failures is not a page with an
idea — "is it interesting?" must be asked of the first rendered screen, before the
build, by the same person who will defend it.**

## An observation, held as evidence and not yet a rule

Two abandoned records now share the pattern *disciplined, verified, empty*: Chicago
Motor Cars Concept 2 (2026-08-13) and this one. Both had large empty areas read as an
unfinished template, both passed every gate the system runs, both were approved at
the concept stage. **Nothing is derived from this here** — no amendment to skills/ or
TASTE.md. It is a question for the next distillation run: whether a rendered first
screen should be a required part of concept approval.

---
name: scroll-site
description: The setup and the concept gate for a scroll-driven or cinematic build — a scrollytelling page, a pinned-sequence landing page, an Apple-style scroll experience, a 3D or WebGL product or automotive site, a page where scrolling plays a video or moves a camera. Load it BEFORE any markup whenever the work is scroll-led, cinematic, or has 3D in it. It resolves the design system, verifies the plugin stack, scaffolds the project, and refuses to let a build start before its concept artefact exists. It carries no aesthetic rules of its own — TASTE.md and .claude/rules/design-dna.md carry those.
---

# Scroll site — setup and the concept gate

**Instrumental, and outside the taste tiers.** There is no DIALECT section here and
there never will be. This skill decides *what must exist before a cinematic build
starts* and *what must be true before it is called done*. It decides nothing about
how the page looks — `TASTE.md` and `.claude/rules/design-dna.md` do that, and this
file may never be cited as the reason for a design decision.

A tool is never a direction. "A GSAP page", "a Three.js site", "a Scrollcraft
build" name libraries, not aesthetic families ([TASTE.md §2](../../TASTE.md#2-the-design-read)).

---

## Step 1 — resolve the system

Follow [design-dna Step 1](../design-dna/SKILL.md) and say which path won.

Then read, in this order:

1. `TASTE.md` — operating rules, the two tiers, the Design Read, the dialect index.
2. `.claude/rules/design-dna.md` — the build standard, `DNA1`–`DNA89`.
3. The skills the work touches. For a cinematic scroll build that is always
   `academic-composition`, `dimensionality`, `motion-judgment`, `anti-patterns`,
   and `gsap-implementation` once motion has an approved role.

**If the build standard cannot be read, stop and say so.** A cinematic build
without `DNA1`–`DNA89` is the case where an agent produces a competent-looking
template and nothing in the output shows that the standard was missing.

---

## Step 2 — the stack

Four plugins, three marketplaces, and no fifth plugin. The number is the point: a
second opinion about the same decision is how a build ends up with two competing
art directions ([U11](../anti-patterns/SKILL.md#invariant)).

```
/plugin marketplace add anthropics/claude-plugins-official
/plugin marketplace add nateherkai/scroll-craft
/plugin marketplace add freshtechbro/claudedesignskills

/plugin install frontend-design@claude-plugins-official
/plugin install nateherk-design@nateherk
/plugin install threejs-webgl@claude-design-skillstack
/plugin install gsap-scrolltrigger@claude-design-skillstack
```

| Plugin | What it is for |
|---|---|
| `frontend-design` | base visual taste — layout, typography, hierarchy, anti-generic |
| `nateherk-design` (Scrollcraft) | scroll storytelling, pinned sequences, page grammar, scroll QA |
| `threejs-webgl` | Three.js / WebGL technique — camera, lights, materials, PBR |
| `gsap-scrolltrigger` | GSAP + ScrollTrigger technique — timelines, pinning, scrubbing |

**All four are layer 5: reference material that binds nothing.** They are mined for
technique. They never outrank `TASTE.md`, the skills, or the build standard, and a
plugin's own taste rules are not this system's rules. Where `gsap-scrolltrigger`
and [`gsap-implementation`](../gsap-implementation/SKILL.md) disagree, `G1`–`G8`
win.

If a plugin is missing, print the two lines above that install it and carry on —
a missing plugin is a missing reference, never a blocker.

---

## Step 2b — the runtime libraries

The four plugins above are reading material. These are the code that actually
ships, and the list is short on purpose.

| | Version tested | What it is for |
|---|---|---|
| **GSAP** | 3.15.0 | timelines, ScrollTrigger, and every former Club plugin |
| **Lenis** | 1.3.26 | momentum scrolling, without breaking `position: sticky` |
| **three.js** | r160 | the 3D layer, when `dimensionality` has given it a role |

**Every GSAP plugin is free**, including for commercial use — Webflow bought
GreenSock and dropped the paid tier in April 2025. There is no membership, no
licence key and no auth token, and the whole set installs from public npm. The
ones that used to be behind Club and are now simply available:

`SplitText` — split a heading into lines, words or characters, which is the
entry point to almost all typographic motion · `ScrambleText` · `MorphSVG` ·
`DrawSVG` — draw a stroke along its own path · `Flip` — animate a layout change
you did not have to hand-author · `CustomEase`, `CustomWiggle`, `CustomBounce` ·
`Physics2D`, `InertiaPlugin` · `Observer` — one input abstraction over wheel,
touch and pointer · `MotionPathPlugin` · `ScrollSmoother`.

**Lenis is the smooth-scroll layer, and it is not optional-by-default any more.**
It is what nearly every scroll-led site of the last two years is running, and its
absence is why a hand-rolled build feels stiff next to them in a way that no
amount of easing on the individual tweens fixes.

**Wire Lenis and ScrollTrigger together explicitly, or each will fight the other:**

```js
const lenis = new Lenis({ autoRaf: false })
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add(t => lenis.raf(t * 1000))
gsap.ticker.lagSmoothing(0)
```

One ticker drives both. `autoRaf: false` stops Lenis running a second loop of
its own — two loops is the usual cause of scroll that stutters only sometimes.

**With Lenis active, `window.scrollTo` no longer scrolls the page.** Lenis owns
the scroll position, so programmatic movement goes through `lenis.scrollTo(y)`.
This bites hardest in verification: a test that scrolls with `window.scrollTo`
and then measures reports every scroll-driven animation as broken, and the
animation is fine. Use `lenis.scrollTo(y, { immediate: true })` in tests.

`ScrollSmoother` does a similar job to Lenis and the two must never both be on
the same page. Pick one — Lenis unless there is a stated reason.

---

## Step 3 — scaffold

From the design_dna working copy:

```
npm run setup -- <path-to-project> ["Project Name"]
```

It writes, and never overwrites what already exists:

| File | What it carries |
|---|---|
| `CLAUDE.md` | the resolution order for this system, and the project's own direction |
| `BRIEF.md` | the concept gate below, as an empty artefact to fill in |
| `.gitignore` | if the project has none |

It also reports which of the four plugins are installed. It writes **no copy** of
`TASTE.md` or the build standard: a copied rule file is a snapshot that silently
ages, and the resolution order already finds the live one.

---

## Step 4 — the concept gate

**`BRIEF.md` is complete before the first line of markup.** `DNA1` states the rule;
this is the checklist that satisfies it. An empty section is an unfinished gate.

- [ ] **Design Read** — deliverable / audience / family · mandate · dialect ·
      dimensionality role. The family is nameable and specific (`DNA2`).
- [ ] **The concept**, in one sentence — what this page *is*, not what it contains.
- [ ] **The feeling curve** — one line per act: the emotion first, the thing on
      screen that causes it second. Two adjacent acts with the same feeling means
      one is filler (`DNA29`).
- [ ] **The peak** — written as the sentence a visitor would say to a friend. One
      per page; it gets the asset budget, the silence in front of it, and the most
      scroll room (`DNA28`).
- [ ] **The page grammar** — filmic one-shot · chaptered editorial · live surface ·
      continuous world · typographic poster · gallery · split stage · rhythmic
      cutlist · or a named new one. Say how it differs from the last build (`DNA36`).
- [ ] **The signature move** — one bespoke interaction, described in a phrase. A
      parameter change to a known device is not one (`DNA37`).
- [ ] **The shot list** — each act names its shot before its device: reveal ·
      push-in · dolly · orbit · macro · interruption · release (`DNA27`, `DNA50`).
- [ ] **The mobile shot list**, authored separately (`DNA67`, `MJ8`).
- [ ] **The budget** — viewport-heights per act, total payload, largest asset,
      frame budget, LCP target (`DNA38`, `DNA72`, `DM3`).
- [ ] **Asset origin** — real, licensed, or generated; generated assets carry
      provenance and depict nothing real (`GI3`, `GI6`).
- [ ] **The claims ledger** — every claim-shaped string with a source (`CP1`).

**If a reference image or storyboard exists, it goes in `BRIEF.md` and it is the
primary visual authority** for composition, scale, lighting, spacing and hierarchy
(`DNA3`). It never overrides contrast, the type floor, or provenance.

---

## Step 5 — build order

1. **The static page first, and it must stand alone** (`DNA39`, `MJ5`, `G7`).
   Real semantic HTML, real content, the full composition, no motion. If it is not
   good here, motion will not rescue it.
2. **Then motion**, once the MOTION READ has given each device a role (`MJ1`).
   Lowest sufficient method (`DNA45`), everything inside a `gsap.context()` (`G1`).
3. **Then 3D**, if the dimensionality role is MAIN or SUPPORT. The camera and its
   target move; the model does not spin (`DNA49`). Lighting, environment and
   materials are designed before they are coded (`DNA55`–`DNA59`).

Never in the other order. A scene built first becomes the thing the page is
arranged around, and that is how the first read ends up gated on a canvas
(`DM2`, `DNA74`).

---

## Step 6 — done

Not before all of this, and none of it is satisfied by describing it (`DNA86`–`DNA89`):

- [ ] Opened in a browser at desktop **and** mobile, screenshots taken.
- [ ] Compared against the reference or the storyboard — **not** against the
      previous implementation.
- [ ] The scroll reviewed by stopping at ~8 positions; every stop judged as a
      composed frame.
- [ ] `prefers-reduced-motion` opened, and the scripts-removed path opened.
- [ ] AA measured on the composited render, at both sizes.
- [ ] The report names the shot list, the peak, the signature move, and the
      implementation notes — libraries beside the build, never as reasons.

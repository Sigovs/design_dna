# GDBURO Production Pipeline

> Companion to the GDBURO Design DNA. This file defines production order and tool responsibilities.
> The Design DNA remains the visual and interaction authority.

## Core rule

**Design direction first. Implementation second. Motion refinement third. Presentation/output last.**

Downstream tools must not redefine the project's visual direction unless that change is explicitly approved.

## Authority stack

1. **GDBURO Design DNA** — global visual / interaction principles.
2. **Project-specific direction** — approved overrides, references, constraints, and rejected patterns.
3. **OpenDesign exploration** — alternative compositions and critique.
4. **Claude Code implementation** — builds the approved direction into the real project.
5. **Motion refinement** — improves movement on the running page without reopening the whole design.
6. **Presentation / video tools** — package finished work for clients, reels, decks, and handoff.

If these conflict, the higher level wins.

## 01 — OpenDesign

**Role:** art direction, UX/UI exploration, design-system comparison, critique.

Use before major visual implementation when composition is unresolved or generic.

Workflow:
1. Select the real working directory.
2. Select a design system as a **lens**, not as a brand replacement.
3. Ask for 2–3 materially different directions.
4. Keep explorations separate from production source.
5. Review stills and live behavior.
6. Choose or hybridize a direction.
7. Only then hand the approved direction to implementation.

Do not let OpenDesign silently replace production code during exploration.

## 02 — Claude Code

**Role:** production implementation and engineering.

Use for HTML/CSS/JS/React, Three.js, GSAP/ScrollTrigger, state machines, data binding, responsive behavior, accessibility, performance and QA.

Rules:
- checkpoint before major structural changes;
- preserve approved functional foundations;
- do not let coding convenience redefine composition;
- keep these states distinct: **WORKING FOUNDATION / APPROVED DESIGN / FINAL POLISH**.

Claude is the executor, not the default art director.

## 03 — Motion Anything

**Role:** motion refinement on the running page.

Use after layout, hierarchy and interaction architecture are stable.

Best for entrance/exit timing, scroll triggers, hover feedback, kinetic type, component-level animation, easing, springs, motion paths and restraint audits.

**Do not use motion to rescue a weak composition. Fix composition first.**

## 04 — HTML Video

**Role:** finished-project promo / walkthrough / reel output.

Use when the site or prototype is stable.

Typical outputs:
- project reveal;
- scrolling showcase;
- redesign before/after;
- repo → project explainer;
- social reel;
- client launch video.

The video is downstream of the website design. Do not make the site conform to a video template.

## 05 — HTML Anything

**Role:** designed communication artifacts.

Use for design reviews, UX audits, client handoff, before/after reports, competitive analysis, case studies, visual QA reports, styled documentation and one-page presentations.

Prefer this over raw Markdown when presentation quality matters.

## 06 — Codex Slides

**Role:** formal presentation decks.

Use for client redesign presentations, design rationale, pitch decks, AAN master-template presentations, case studies and research decks.

Preferred process:
1. research / source material;
2. outline;
3. visual direction;
4. approval;
5. rendering;
6. edit;
7. PPTX / PDF export.

## 07 — Nexu / communication layer

**Role:** optional remote/team agent access from Slack, Discord, WeChat, etc.

This is an operations layer, not a visual-design authority.

## Taste / rejection rule

Record both approvals and rejections.

High-value rejection signals:
- generic SaaS aesthetics;
- excessive cards;
- weak hierarchy;
- cramped layouts;
- UI overwhelming the primary visual;
- decorative gradients with no purpose;
- excessive blur / glass;
- generic fade-up motion;
- too much simultaneous motion;
- Awwwards-for-the-sake-of-Awwwards;
- black-and-gold luxury cliché;
- tiny technical text used as decoration;
- admin/dashboard feeling where an emotional experience is required.

Repeated cross-project rejection = global GDBURO preference.
Project-specific rejection = project override, not universal law.

## Project handoff pattern

For every major project, keep these states explicit:

**FOUNDATION** — functional mechanics that must survive redesign.

**APPROVED DIRECTION** — chosen visual / UX composition.

**REJECTED DIRECTIONS** — what was tested and why it was rejected.

**MOTION PASS** — approved movement language after layout stabilizes.

**FINAL OUTPUT** — production website + presentation/video assets.

Never confuse **implemented** with **approved**.

## Short version

```text
DESIGN DNA
   ↓
PROJECT DIRECTION / REFERENCES / REJECTIONS
   ↓
OPEN DESIGN
explore + critique + compare
   ↓
APPROVE DIRECTION
   ↓
CLAUDE CODE
implement + QA
   ↓
MOTION ANYTHING
refine movement on running page
   ↓
HTML VIDEO
promo / reel / walkthrough
   ↓
HTML ANYTHING / CODEX SLIDES
handoff / audit / client presentation
```

## Non-negotiable principle

**The toolchain serves the design. The design does not serve the toolchain.**

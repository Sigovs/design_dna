# CLAUDE.md — working style for this repo

> **Mirrored verbatim at [AGENTS.md](AGENTS.md)**, for agents that do not read this
> file. Only the title line differs — change one, change both in the same commit.

---

# DESIGN DNA

**All design work in this repository follows [`.claude/rules/design-dna.md`](.claude/rules/design-dna.md).
Read it before producing anything visual** — a page, a component, a scene, CSS,
tokens, an image, a slide, Figma output — and before any redesign, art direction,
palette, type scale, spacing ramp, motion or composition decision. It is the
default visual and interaction standard for all future work here, and it outranks
default agent taste.

It carries the detail as `DNA1`–`DNA89`: visual direction and the concept gate ·
typography hierarchy · spacing and composition · grid and alignment · colour and
contrast · image treatment · cinematic art direction · premium automotive and
editorial presentation · scroll storytelling · motion choreography · GSAP and
ScrollTrigger · Three.js camera language · lighting and materials · large
typography as a spatial layer · callouts and technical annotations · transitions ·
responsive behaviour · performance · accessibility · anti-patterns · definition of
done.

## Order of authority

1. **Truth and access** — contrast, provenance, reduced motion, discoverability.
   Never yields.
2. **`TASTE.md` and the INVARIANT tier of `skills/`** — the taste system is the
   authority on taste.
3. **`.claude/rules/design-dna.md`** — the build standard.
4. **The selected dialect's DIALECT tier** — each rule with its own `yields when:`.
5. **Plugins and `external/`** — `frontend-design`, Scrollcraft, `threejs-webgl`,
   `gsap-scrolltrigger`. **Reference material only; they bind nothing** and may
   never be named as the reason for a design decision.

## The standing principles

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

## Load order for a visual task

`TASTE.md` → the relevant `skills/` → `.claude/rules/design-dna.md` → the selected
dialect. Plugins last, and only for technique.

## Starting a scroll site

```
npm run setup -- <path-to-project> "Project Name"
```

Writes the project's `CLAUDE.md` and `BRIEF.md`, never overwrites, and reports
which of the four stack plugins are installed. Then load the **`scroll-site`**
skill: it carries the stack, the concept gate and the definition of done.

`~/.claude/skills/design-dna` and `~/.claude/skills/scroll-site` are **junctions
into `skills/`**, so both load in every folder and neither can go stale. If either
is ever a plain copy again, fix that first — a stale entry point fails silently and
the agent proceeds on its own taste with no error to notice.

## Autonomy

**Never ask yes/no or confirmation questions. Never pause for permission between
steps.** Make senior-level decisions and continue. Flag judgment calls in the
final report only — not as questions mid-task.

**EXPLORE is not an exception to this.** Presenting three finished directions is a
deliverable, not a question that hands design responsibility back to Alex — and
inside each direction every decision is still made autonomously, with no options
offered and nothing deferred. Use it only when no visual direction has been chosen;
a small change, a fix, an urgent revision or "just do it" is BUILD.

### Clarifying questions

**A clarifying question is justified only when its answer could change the
architecture, the scope, the factual accuracy, or what has to be delivered — never
when it would merely refine taste.**

Ask when what is missing is: a business goal or required functionality · real
content, assets, pages or technical constraints · a brand element that must stay
unchanged · the audience or conversion priority, where it is genuinely ambiguous ·
the intended scope of the request · a contradiction between instructions, or
between instruction and evidence.

Never ask Alex to make a decision this system exists to make: *what style do you
prefer · which layout · what colours · what should I do next · do you like this.*
In BUILD make the evidence-led decision; in EXPLORE deliver three resolved
directions; otherwise state the assumption in one line and keep going.

**Three questions at most, at once.** And if a reasonable, reversible assumption is
available, take it and disclose it rather than stopping — a blocked task costs more
than a stated assumption that turns out wrong.

**Sole exception for stopping outright: external blockers** (auth failures, locked files, missing
credentials, a remote that doesn't exist yet). Stop and state exactly what the
user must do — the specific action, not a general problem description. Everything
that is a taste or implementation decision is yours to make.

## Git hygiene

**Never blind `git add -A` — stage explicitly or review `git status` before
staging.** A sweep-everything stage will commit files you did not write and have
not read: exports dropped into the tree by another session, scratch files, local
config. A file that enters the repository this way is rarely noticed going in and
is awkward to remove afterwards, because by then something else references it.

Stage the paths you actually changed. If you do use `-A`, run `git status` first
and account for every line.

## Consistency

**Every change to `skills/`, `dialects/`, or `TASTE.md` must keep the five-line
taste summary in `README.md` in sync.** That summary is the human's
drift-detection surface — if it stops describing what the rules actually say, the
whole system silently decays. Treat it as part of the same edit, not a follow-up.

Related: `TASTE.md`'s skill-index and dialect-index one-liners must match the
files they point at, and the working-style clause in `TASTE.md` §5 mirrors the
autonomy rules above — change one, change both.

**Tier discipline.** Every rule in `skills/` sits under `## INVARIANT` or
`## DIALECT`. A new dialect rule without a `yields when:` is incomplete. Never
move a rule between tiers as a side effect of another edit — a tier change is its
own decision and needs its own argument in the commit.

**Declarations before techniques.** The Design Read outputs four lines —
deliverable/audience/family, **mandate** (REBRAND / REDESIGN / REFRESH), **dialect**,
and **dimensionality role** (MAIN / SUPPORT / ABSENT). Each is declared before the
thing it governs: the mandate before the dialect, because a dialect executes an
identity and never substitutes for one; the role before any technique and before
the Composition Read, because it decides what the composition is made of.

**An unstated mandate defaults to REDESIGN, never to invention.** Under REDESIGN,
list what carries through untouched before designing anything, and close the report
with "would a regular visitor recognise this as the same brand?" answered with the
named carriers as evidence. Promoting SUPPORT → MAIN mid-project requires re-running
the Design Read; demotion never does.

**Rule identifiers are namespaced when they would collide.** `D#` already means a
DIALECT rule in every skill, so `dimensionality` uses `DM1`–`DM10` for its
invariants. A new skill whose natural prefix already means something else picks a
distinct one rather than overloading it.

**Any dialect rule with an invariant core names its floor by identifier**, and its
`yields when:` may never breach that floor. The convention and its reference example
are in `TASTE.md` §1.

**A tool is never a direction.** Three.js, Spline, GSAP and their kin are
implementation notes, recorded beside the build in the report. **A library name is
never an aesthetic family name** — that rule lives in the Design Read procedure in
`TASTE.md` §2, not in `anti-patterns`, because it is a process error rather than an
aesthetic trope. The tool notes in `skills/dimensionality` are explicitly
non-normative; never cite them as a reason.

## Reporting

Keep reports short and practical. For completed work, report only:

- **what changed** — max 5 short bullets;
- **files changed**;
- **validation result**;
- **preview URL**, where there is one;
- **anything that genuinely needs Alex's decision.**

Write in normal conversational language. Do not explain choices that are visually
obvious; explain only real tradeoffs or problems.

**Do not expose internal design reasoning unless Alex asks for it.** No MANDATE /
CARRIED / TASK / MEANS block, no DECISIONS / rejected / why list, no equivalent
reasoning protocol, no abstract design-theory language, no section references like
"§2c", and no re-confirming files that did not change.

The procedures themselves are unchanged — the Design Read, the Composition Read and
Plan, the Selection Pass and the critique panel still run. They inform the work;
they are not the report.

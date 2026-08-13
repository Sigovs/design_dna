---
name: design-dna
description: Alex's design taste system — the entry point. Load this FIRST, before any visual, design, UI, layout, CSS, typography, colour, spacing, imagery or motion work, in any project and any stack, including redesigns, landing pages, dealership and automotive sites, components, slide decks, diagrams and Figma output. It routes to TASTE.md (the manifest with the two-tier model, the Design Read, the delivery modes and the dialect index) and to whichever taste skill the task needs, and it carries one mandatory rule of its own: a section is never designed or critiqued as an isolated composition when it belongs to an existing page. If a project's own CLAUDE.md states a design direction, this still applies — a project direction is executed inside these invariants, never instead of them.
---

# Design DNA — the entry point

**This skill carries exactly one rule of its own, and everything else lives in
`TASTE.md` and in the taste skills beside it.** This file exists for one reason:
the rules are in a file, and a file only binds if something opens it.

The exception is deliberate and is the section at the bottom, **PAGE-AS-OBJECT**.
It is here rather than only in the skills because it governs *when the other rules
get read at all* — a request to build one section is the case where an agent
reaches for none of them, and the one surface guaranteed to load in every session
is this one.

`CLAUDE.md` is loaded into a session automatically. `TASTE.md` is not — it has to
be read on purpose, and an agent that skips it produces work that looks finished
and obeys nothing, with no error to notice. A skill is the one mechanism that
announces itself in every session, in every folder, without being installed per
project. So the entry point is a skill and the rules stay files.

---

## Step 1 — find the manifest

In this order. **The first readable path wins.**

1. `/Users/alex/Desktop/WORK/design_dna/TASTE.md` — the canonical working copy.
2. `./design_dna/TASTE.md` in the project root — **only if it is a live git clone
   or a symlink.** A plain copied folder is a snapshot; it silently ages and there
   is no way to update it in place. Check for `design_dna/.git` or use `ls -l` to
   see a symlink. If it is neither, **skip it and use the canonical path**, and say
   so in the report.
3. `https://github.com/Sigovs/design_dna` — for a machine that has neither. Fetch
   `TASTE.md` and the skills the task needs.

If none of the three is reachable, say that plainly and stop rather than
improvising a house style. Inventing taste is the failure this repo exists to
prevent.

## Step 2 — read TASTE.md and follow it

It carries the operating rules, the two tiers, the Design Read, the Composition
Read, the Critique Panel, the delivery modes, the dialect index and the vault
hook. It also points at whichever of these to load for the task at hand:

`academic-composition` · `anti-patterns` · `spacing-taste` · `typography-taste` ·
`color-taste` · `generated-imagery` · `dimensionality` · `motion-judgment` ·
`motion-taste`

Load them from the same location the manifest came from. Do not paraphrase them
from memory — they hold hard numbers and hard bans, and a remembered rule is a
vague one.

## Step 3 — reconcile with the project's own instructions

A project's `CLAUDE.md` is loaded automatically and often carries a design
direction of its own — a theme, a mood, a named look. **That is a brief, not a
replacement.**

- **Invariants never yield to it.** Hierarchy, contrast, token discipline,
  reduced-motion paths, the composition invariants: a project direction that seems
  to require breaking one has specified a defect. Deliver its intent without the
  defect and name that in the report.
- **Dialect rules do yield to it**, for the stated reason, said out loud.
- If the project direction and the DNA genuinely conflict on something that is not
  an invariant, the project wins and the yield is recorded.

This step exists because the competing instruction always arrives first: the
project file is injected, this system is opened. Loud and automatic beats quiet
and optional unless the order is written down.

---

## PAGE-AS-OBJECT — MANDATORY CONTEXT RULE

**Never design or critique a section as an isolated composition when it belongs to
an existing page. The PAGE is the primary composition; a SECTION is a local event
inside it.**

This section is the **procedure only**. The invariant it enforces is
[C21](../academic-composition/SKILL.md#invariant), the failure it prevents is
[U15](../anti-patterns/SKILL.md#invariant), and the reasoning for both lives there,
not here.

### Before any major visual decision on a section of an existing page

1. **Inspect the whole rendered page** — a full-page render, or a scaled full-page
   screenshot for a long page.
2. **Inspect the section immediately before it, and the one immediately after it**
   where it exists.
3. **Identify the closest approved sibling section** already on the page.
4. **Read the page-level rhythm and write down what you found:** tonal rhythm ·
   light/dark sequence · density · image scale · subject distance · typographic
   hierarchy · component language · edge and radius language · motion amplitude ·
   pacing · **which gestures the page has already spent**.
5. **Decide what the section must continue** before deciding what it may introduce.

### Before calling the section complete

6. **Inspect it in three-chapter context** — PREVIOUS → CURRENT → NEXT, judged as
   one sequence.
7. **Take the reduced full-page read** — the whole page as one object, at a scale
   where rhythm and repetition are visible and craft is not.
8. **Reject a locally strong section that weakens the whole page.** That outcome is
   a failed section, not a trade-off, and no isolated screenshot approves it.

### Order of authority for an established design

1. explicit user direction
2. the current approved whole-page composition
3. the closest approved sibling sections
4. the existing design system and components
5. Design DNA principles
6. new local invention

---

## Why this file is otherwise not a rule file

Repo convention is that every rule under `skills/` sits in an `## INVARIANT` or
`## DIALECT` section. Apart from the mandatory context rule above — which is a
procedure, not a taste position — nothing here is a rule: this is a loader, and
giving it taste would put taste in two places at once. Anything else that reads
like guidance is a restatement of `TASTE.md`, and `TASTE.md` is the version that
governs.

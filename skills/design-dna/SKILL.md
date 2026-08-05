---
name: design-dna
description: Alex's design taste system — the entry point. Load this FIRST, before any visual, design, UI, layout, CSS, typography, colour, spacing, imagery or motion work, in any project and any stack, including redesigns, landing pages, dealership and automotive sites, components, slide decks, diagrams and Figma output. It routes to TASTE.md (the manifest with the two-tier model, the Design Read, the delivery modes and the dialect index) and to whichever taste skill the task needs. If a project's own CLAUDE.md states a design direction, this still applies — a project direction is executed inside these invariants, never instead of them.
---

# Design DNA — the entry point

**This skill carries no rules of its own.** Every rule lives in `TASTE.md` and in
the taste skills beside it. This file exists for one reason: the rules are in a
file, and a file only binds if something opens it.

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

## Why this is not a rule file

Repo convention is that every rule under `skills/` sits in an `## INVARIANT` or
`## DIALECT` section. Nothing here is a rule, so neither section exists — this is
a loader, and giving it rules would put taste in two places at once. Anything that
reads like guidance above is a restatement of `TASTE.md`, and `TASTE.md` is the
version that governs.

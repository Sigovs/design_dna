# kill-ai-slop — provenance

- **Upstream:** https://github.com/yetone/kill-ai-slop
- **Commit:** `f6e2ae32b30443ec7bd0da4da971ee18d8f8ffcb` (2026-09-15)
- **Vendored:** 2026-10-05, at Alex's request. It is also installed as a live skill
  (`~/.agents/skills/kill-ai-slop`, symlinked into Claude Code).
- **Licence:** Apache-2.0. Vendoring is permitted with LICENSE kept.
- **Files kept:** `skill/` in full (SKILL.md, references/, scripts/) plus LICENSE.
  The marketing `website/` was left out.

## What it actually is

A **visual and copy** de-slop pass for web projects, built from three parts:
- a 35-item taxonomy of machine-default tells, in `references/taxonomy.md`;
- regex detection notes with their false positives, in `references/detection.md`;
- a dependency-free Node scanner (`scripts/scan.mjs`) that prints `file:line`
  hits per tell and never edits files.

The workflow is scan, then triage by hand, then report, then fix only what the user
approves. The scanner gives a starting map, not a verdict.

## First use: Golden Lion Auctions HOME, 2026-10-05

10 hits came back, and 3 were real after triage:
- **#34 "tasteful terminal":** mono in nav, tabs, eyebrows, captions and footer, on
  near-black with one warm accent. Fixed by keeping mono for data only.
- **#24 hand-drawn SVG icons:** replaced with Lucide.
- **#06 an atmospheric light pool:** removed.

The false positives were `©` read as an emoji, a status dot read as glassmorphism,
"Lot 01 of 12" read as an ornamental ordinal, and the photographic stage mask read
as an atmospheric gradient.

## Where it agrees with us

- **anti-patterns D1 (AI-default looks):** this is that rule turned into a
  checklist, and it is more granular than ours. Tells #01–#06 are our gradient and
  glow bans.
- **typography: "a role is not a voice":** #34 is the same failure seen from the
  other side. Mono is a voice with one job (data), not a costume for the whole UI.
- **typography: "an icon is a glyph", one set per project:** #24.
- **content-provenance CP-series:** "invented stat rows" (#33-family).

## Where it disagrees, or needs our judgement

- **#30, ordinals:** it bans 01/02/03 markers, while auction-editorial uses lot
  numbers and real sequences. The skill's own fix ("number what's genuinely
  ordered") covers this; the scanner just can't tell the difference.
- **#06, gradients:** it flags every radial gradient. A gradient that composites a
  photograph (our stage mask) is not atmosphere. Triage, don't obey.
- **Serif-italic emphasis** is flagged as slop. auction-editorial D2 (the italic
  signature word) is a confirmed house expression with a yields-when. When it is
  used deliberately, it stays.

## Worth taking first

1. **Run `scan.mjs` as a pre-delivery step** next to the gates in `gates/`. It costs
   seconds and found a real failure (#34) that our own review had let through.
2. **Promote #34** into `anti-patterns` as an INVARIANT candidate, worded our way:
   "monospace is a data voice; UI chrome in mono on a near-black ground is a
   template, not a decision".

## Status

Nothing here binds. Promotion into `skills/` happens only as a diff Alex approves.

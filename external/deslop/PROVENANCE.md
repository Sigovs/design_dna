# deslop — provenance (reference only, NOT vendored)

- **Upstream:** https://github.com/mishanaer/deslop (Misha Naer)
- **Commit read:** `c38287513d3d1e4b04be0d349380633c1a9d49f2` (2026-10-07)
- **Recorded:** 2026-10-11, at Alex's request.
- **Licence: none.** The repo has no LICENSE file, which means all rights are
  reserved, and copying it into this repo is not permitted. **That is why this entry
  holds only this file.** The companion repo
  [mishanaer/sound](https://github.com/mishanaer/sound) (interface sounds) has no
  licence either.
- **Fonts warning:** `primitives/fonts/` ships the SB Sans / SB Serif families
  (Sber's corporate typefaces). Do not take them into any client project. The
  repo grants no rights to them, and a Sber typeface on a non-Sber product is a
  brand problem as well as a legal one.
- **To use it:** install from upstream into `~/.claude/skills/` (or
  `.agents/skills/`) by hand. Do not copy it into `skills/` or `external/` until
  there is a licence. If Alex wants it here, ask the author for one: MIT or
  Apache would settle it.

## What it actually is

A small kit for agents, written for a Russian-speaking product team:

- **sasha** (`sasha/`). A skill for **Russian** interface, marketing and
  documentation copy: principles, component patterns, error states, Russian
  typography, a code-review checklist, before/after examples, a machine-readable
  `rules.json`, and two Python scripts. `extract_ui_strings.py` pulls Russian
  strings from json/yml/ts/tsx/vue. `ui_text_lint.py` prints heuristic warnings.
  Generation returns 2–4 options: «Безопасный», «Короткий», «Более явный», «Для
  узкого места».
- **serega** (`serega/`). Two per-character text-reveal skills. *gentle* rises
  15px over 500ms with a 15ms stagger and `cubic-bezier(.2,.8,.2,1)`, without blur.
  *emotional* adds blur, rotation and a spring, for 2–4 words. Both split text by
  grapheme with `Intl.Segmenter`, wrap each word so lines never break inside it,
  and render static text under `prefers-reduced-motion`. Demo:
  https://serega-skill.vercel.app
- **primitives**. Colour, typography, layout tokens and icons (Material Symbols),
  meant to be *the* design system for the author's projects.
- **mini-app**. React components for Telegram Mini Apps (adapted from Ilya
  Grishin's library).
- **AGENTS.md**. Shared agent behaviour: answer in Russian, lead with the result,
  verify and say what was not verified.

## Where it agrees with us

- **sasha ↔ content-provenance and the copy side of anti-patterns.** "Do not invent
  product behaviour; flag missing or conflicting sources" is CP-adjacent. "Prefer
  fixing structure over explaining a weak interface" matches our order of
  authority.
- **sasha typography ↔ typography-taste "intentional line breaks".** Non-breaking
  spaces after single-letter prepositions, before an em dash, inside numbers and
  between a number and ₽. En dash for ranges, a true minus, «ёлочки». This is the
  Russian version of the rule we already hold, with concrete characters.
- **serega ↔ motion-taste.** It animates transform and opacity only, never breaks a
  word, and stops on a static frame under reduced motion.
- **AGENTS.md ↔ MASTER_CLAUDE.md §10.** Say what was verified and what was not.

## Where it disagrees, or needs our judgement

- **Sasha's full-stop rule** (no final period on a one- or two-sentence string) is
  a product-UI convention from Russian fintech. It suits buttons, toasts and
  errors. It does not suit editorial body copy, where a full stop is normal.
- **serega as a default.** A per-character reveal is exactly the "cheap reveal"
  MASTER_CLAUDE.md §6 warns about when it is used everywhere. It earns its place
  only through motion-judgment: one primary temporal idea per viewport, and never
  on text the visitor must read in order to act.
- **primitives as "the" system.** The author's AGENTS.md forbids any other design
  system. For us it is a reference at most. A client's tokens always win.

## Worth taking first

1. **sasha, for any Russian-language build.** We have no Russian copy skill at all:
   `no-ai-slop` and `kill-ai-slop` are English-only. Its `04-typography.md`
   non-breaking-space list is the most immediately useful page.
2. **serega-gentle's motion contract** as a reference value for a text reveal,
   *when* motion-judgment has already approved one.
3. **mishanaer/sound** for interface sounds. Read it before any build that uses
   audio; we have only the synthesised HUD sound in `mg-styles-15/hud-inspection`.

## Status

Nothing here binds, and nothing upstream is copied here. Promotion into `skills/`
happens only as a diff Alex approves, and only in our own words.

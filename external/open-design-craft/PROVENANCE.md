# open-design-craft — provenance

- **Upstream:** https://github.com/nexu-io/open-design (`craft/`)
- **Commit:** `17e255959703a3fad7c8eb7f7b70dcafccc5629a` (2026-10-10)
- **Vendored:** 2026-10-11, at Alex's request.
- **Licence:** Apache-2.0, LICENSE kept. Part of the craft text is itself adapted
  from [refero_skill](https://github.com/referodesign/refero_skill) (MIT, © Refero
  Design), as `craft/README.md` and `craft/anti-ai-slop.md` say.
- **Files kept:** `craft/` in full (13 files) and LICENSE. Nothing else from the
  repo was taken: the app is around 3.5 GB, and its `design-systems/` and
  `design-templates/` are deliberately left out (see "Not a candidate").

## What it actually is

Open Design is an open alternative to Claude Design: a daemon and an app that run
skills on top of Claude Code or Codex. `craft/` is its brand-agnostic layer. Each
file is one short rulebook (typography, colour, motion, states, forms, a11y, RTL,
laws of UX, anti-slop). A skill opts in with `od.craft.requires`, and only the
files it lists are injected. Only the P0 list in `anti-ai-slop.md` is enforced by a
linter (`lint-artifact.ts`). Everything else is guidance.

Already in our pipeline as the explore/compare stage:
[GDBURO_PRODUCTION_PIPELINE.md](../../GDBURO_PRODUCTION_PIPELINE.md).

## Where it agrees with us

- **anti-ai-slop.md ↔ anti-patterns D1 and content-provenance.** Its sin #6
  ("invented metrics: pull from a real source or use a labelled placeholder") is
  our CP-series in one line. Its #2 (two-stop hero gradient) and #3 (emoji as
  icons) are our gradient and glyph bans.
- **animation-discipline.md ↔ motion-judgment / motion-taste.** Motion has to earn
  its place, durations come from a scale, and reduced motion is a designed state
  rather than motion switched off.
- **typography-hierarchy-editorial.md ↔ typography-taste DIALECT.** Dramatic scale
  jumps, whitespace carrying hierarchy, restrained bold, pull quotes as rhythm
  breaks, asymmetric rhythm. This is closest to auction-editorial of anything in
  the repo.
- **accessibility-baseline.md / color.md ↔ color-taste INVARIANT.** Contrast floors,
  focus visibility, never conveying meaning by hue alone.

## Where it fills a gap we have

- **state-coverage.md: we have no invariant for it.** It requires five states on
  every surface that holds data (loading, empty, error, populated, edge), with
  hard numbers: a loading indicator chosen by expected duration (0–300 ms none …
  60 s+ stop and error), a 15 s "taking longer" fallback, and a backoff rule of
  three retries before falling back to support. It forbids collapsing an error
  into an empty state, and it carries an ARIA/focus table for state changes.
  `anti-ui-slop/PROVENANCE.md` flagged the same gap on 2026-10-05.
- **form-validation.md.** An input state machine, validate on blur, the Constraint
  Validation API as the floor, WCAG 3.3.x. We have nothing comparable.
- **laws-of-ux.md.** Hick, Fitts, Miller, Von Restorff, Peak-End and so on, mapped
  to page types (pricing, dashboard, onboarding, modal). Useful for product
  screens. Our editorial composition doesn't reach for these.

## Where it is weaker than us, or disagrees

- **Nothing on composition or the page as one object.** It is a rulebook for UI
  surfaces. It does not cover masses, a compositional centre, tonal structure or
  rhythm across a page.
- **anti-ai-slop sin #4** binds display text to a serif whenever the seed asks for
  one. That is a constraint of its own seed system, not a universal rule.
- **The "first-use empty = illustration + headline + CTA" recipe** is itself a
  template. Keep the requirement (the empty state does a job) and not the recipe.
- **typography.md** uses `≥0.06em` tracking on ALL CAPS. typography-taste has its
  own numbers. Ours govern; compare before quoting.

## Worth taking first

1. **state-coverage.md as an INVARIANT candidate** for anti-patterns (or a new
   skill): "every surface that fetches, transforms or accepts data renders
   loading, empty, error, populated and edge, and error is never shown as empty".
   This matches item "Real states" in Alex's QA checklist (MASTER_CLAUDE.md §8),
   which today has no rule behind it.
2. **The loading-duration table** as a motion-taste addition next to "skeletons
   over spinners".
3. **form-validation.md**, for any build with a lead or enquiry form.

## Not a candidate

- `design-systems/` (71 brand packages such as `linear-app`, `apple`, `notion`)
  and `design-templates/` (`saas-landing`, `pricing-page` …). They are what
  anti-patterns D10 calls template anonymity, and they were left upstream on
  purpose. For a fast mockup the template is fine as a starting point (that rule
  was dropped from MASTER_CLAUDE.md on 2026-10-11), but nothing from there gets
  vendored as a reference.

## Status

Nothing here binds. Promotion into `skills/` happens only as a diff Alex approves.

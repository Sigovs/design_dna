# ux-ui-agent-skills — provenance

- **Upstream:** https://github.com/plugin87/ux-ui-agent-skills
- **Commit:** `55156b40e3a9aafa52448bde76cdcb5147b958db` (last push 2026-10-20)
- **Vendored:** 2026-10-25, at Alex's request ("забираем, что подходит").
- **Licence:** MIT, © the upstream authors. LICENSE kept. Vendoring and adaptation are
  permitted.
- **Files kept (12):**
  - `scripts/` — `verify_target_size`, `verify_keyboard`, `verify_focustrap`, `verify_reduced_motion`;
  - `accessibility/aria-patterns.md`;
  - `skills/grill-me/SKILL.md`;
  - `evals/` — `critic-answer-key.json`, `score_critic.mjs` and the four critic fixtures.

  The rest of the repo was left out on purpose (see "Not a candidate"): about 140
  design-system files, 52 component specs, DTCG tokens, framework adapters,
  dashboard templates and the brand assets. The scripts are kept as published, so
  they still import `./_targets.mjs` and will not run from here. They are reference
  copies. The running code is `gates/a11y.mjs`.

## What it actually is

It is a Claude Code plugin aimed at **product UI**: settings screens, dashboards,
data tables and forms. It ships a token system, component specs and about 50
scripted "gates". Its stance matches ours: a gate that cannot render fails out loud,
never states a number it did not measure, and is never claimed rather than run. Most
of the gates are Playwright scripts that drive a real page. The plugin also has a
critic agent, and a scored test that checks whether the critic finds defects no
script can see.

## Where it agrees with us

- **Measured, not asserted.** This is the same line as `gates/README.md` ("a gate
  could be claimed rather than run"). Its scripts drive the keyboard and render the
  page twice; they do not grep the source.
- **The critic covers what gates cannot.** `critic-answer-key.json` seeds 14 defects,
  and every one of them passes every script. That is our Gate 2/3 point: the
  human-judgement half is not optional.
- **The brief is interrogated before building.** `grill-me` asks at most seven
  questions, and only ones that change the work; everything unasked becomes a written
  assumption with its cost. This is close to our Design Read and Concept Gate, and it
  adds the discipline we did not have about unasked questions.

## Where it disagrees with us

- **Screen economy.** `verify_screen_economy` fails a first screen that is all image
  and a hero that fills the viewport. Under auction-editorial that is the signature,
  not a defect. **Not taken.**
- **Slop tells.** `slop_tells` treats one border radius used everywhere as a tell.
  Ours treats a consistent radius as a token. The rest overlaps `kill-ai-slop` and
  `anti-ui-slop`, which are already in `external/`.
- **The design-system library** (Ferrari, BMW, Lamborghini, Bugatti and the rest) is
  descriptive prose with hex values and no capture date or method. It clashes with
  CP and with "a dialect is never a silent default". At most, a page could become a
  vault note after we capture the site ourselves.
- **Blocking Stop hook.** Its hook refuses to end a session with unmeasured pages.
  Ours are non-blocking by design (`hooks/design-dna-gate.mjs` explains why).

## What was taken, and where it went

| upstream | here | status |
|---|---|---|
| the four `verify_*` scripts | `gates/a11y.mjs`, inside Gate 1; tests in `gates/test/a11y.test.mjs` | **running.** Adapted rather than copied: a 44px touch floor (DNA68) beside the 24px WCAG floor; parity keyed by element identity, so GSAP pin-spacers and SplitText wrappers do not read as lost content; tab-disabled controls are not "unreachable"; the inline exception reads the parent's own text nodes (upstream excused two adjacent icon buttons as "inline"); the visible trigger is used; the Lenis contract is added (DNA90) |
| `grill-me` | `TASTE.md` §5, Working style | **diff for Alex to read.** Its question rule (at most seven, only ones that change the work) is already in §5 in a stricter form (three), so it is not duplicated. Two additions were taken: a disclosed assumption carries its cost, and content reality (zero, one and the most items; the longest real string) is settled before layout. The `BRIEF.md` template is not taken, because `npm run brief` already owns that file |
| `aria-patterns.md` | here | reference, for building listbox, combobox, dialog and tabs |
| critic answer key + fixtures | here | **not yet built.** The method is the thing to take: seed defects that pass every gate, keep the answer key away from the critic, and score the catch rate as a floor. Our version should be built from our own rejections in `projects/` (four equal cards, the cropped car, the useless spine) and should test the `design-critic` agent, not product-UI screens |

## Not a candidate

- `design-systems/library/` — about 140 files.
- `components/`, `tokens/`, `frameworks/`, `templates/`, `examples/` — product-UI
  infrastructure.
- `verify_screen_economy`, `slop_tells`, `taste_audit`, `lint_taste` — they contradict
  our dialects or duplicate what we already hold.
- `hooks/stop-require-measurement.mjs` — it blocks.

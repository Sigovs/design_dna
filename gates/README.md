# gates

Five gates, in order, and the machinery that stops any of them being skipped.

> **Since 2026-10-25 (Alex, step 3) only Gate 1 binds.** Its checks are the floors
> that still hold: keyboard and visible focus, 44px targets, reduced motion with
> nothing hidden, no horizontal scroll, no console errors. Every other artefact is a
> report — missing, stale, failing or out of order is listed in `notes`, never in
> `problems`. `.gates/declare.json` is optional, and Gate 4 without a ledger lists
> the claim-shaped strings to check instead of failing. `gate5` refuses only on
> Gate 1, then prints the whole-page read (`TASTE.md` §0 rule 7). The text below
> describes what each instrument measures; where it says *blocks* or *refuses*, read
> *reports*.

```
Gate 1  Measurable Conformance                    gate1.json   (+ composition.json, hero.json)
Gate 2  Structural and Authorship Conformance     gate2.json   (+ authorship.json)
Gate 3  Product Usefulness                        product.json
Gate 4  Content Provenance                        content-ledger.json
Gate 5  Human Desirability                        — Alex's verdict. Never sealed.
```

```sh
npm run gates -- <project-dir>     # run 1–4, write the artefacts, seal the chain
npm run gate5 -- <project-dir>     # refuse or release the screenshot handoff
```

## Why this exists

Two concepts were rejected on the same day, for opposite reasons.

One was authored and useless: distinctive, internally coherent, and it failed task
hierarchy, inventory discoverability and desire. The register became the product.

The other was useful and unauthored. It was built to correct the first, and the
correction restored every banned structure at once — four equal inventory cards,
four equal process columns, repeated horizontal bands, a cropped hero, generic
dark-luxury register, and four fabricated prices.

Both cleared the gates as they then stood. Not because the gates were wrong about
what they measured, but because of *how* they were run:

- a gate could be **claimed** rather than run, since its result was a sentence in a
  report rather than an artefact on disk;
- structural repetition was detected by **class name**, so a page with no `.card`
  anywhere reported `cards: 0` and shipped four card-equivalent modules;
- **authorship and usefulness were tradeable**, so failing one was survivable by
  excelling at the other;
- the hero was verified on the **source frame**, not on the delivered render, so a
  crop that clipped the car passed a check that never saw the crop;
- and no gate ever asked where a number came from.

Each file here closes one of those.

**A sixth was found on 2026-08-31 and `composition.mjs` closes it.** Every value on a
hero was correct — contrast, the type floor, the spacing base — and the composition
was not: the subject sat dead centre at 49% of the frame with a third of the screen
empty beside it and every word in the left fifth. No gate had anything to say,
because nothing there was a wrong *value*. Alex named it in one look. The gate now
measures where the masses actually are, so the argument starts from numbers.

It reports and does not judge. `verdict: pass` on this artefact means *no measurable
defect*, and the seal says so out loud — "passes on machine checks only" until a
human confirms. A machine can find a stranded void; it cannot tell you the
composition is good.

## The files

| file | what it does |
| --- | --- |
| `run.mjs` | Runs Gates 1–4 against a project, writes the six artefacts and `chain.json`, merges forward any human answers already given, exits non-zero unless the chain validates. |
| `gate5.mjs` | Refuses the screenshot handoff unless the chain validates. Prints each artefact as NOT RUN / STALE / pass / fail. A refusal here is a **workflow** failure and is reported as one — it is never recorded as taste evidence. |
| `lib/seal.mjs` | Presence, staleness and order. Defines `CHAIN`, the six required artefacts in sequence. |
| `lib/server.mjs` | A dependency-free static server with HTTP range support, so a `<video>` can seek. Replaces the `python3 -m http.server` spawn, which on Windows resolved to a Store shim that exited immediately and turned every measured assertion into a silent fallback. |
| `composition.mjs` | Where the masses are: extent, optical centre, the gutter between the two principal ones, dead air at an edge. Catches a dominant left unplaced. A 3D subject is measured from the box the scene publishes as `window.__subject`; a stage that publishes nothing is UNMEASURED, not passed. |
| `event.mjs` | A1 — measures whether one declared governing event owns the first screen. Keeps `eventCoverage`, `mediaCoverage` and `competition` apart. |
| `structure.mjs` | Finds repeated modules by rendered geometry. Reads no class names. |
| `hero.mjs` | Closed-form `object-fit` mapping, per-sample subject boxes, annotated evidence images. |
| `content.mjs` | Harvests claim-shaped strings from the render and requires each to map to a ledger entry. |
| `a11y.mjs` | Part of Gate 1. Drives the keyboard (Tab reachability, Enter/Space on stateful custom controls, arrows in composite widgets), measures touch targets (44px under 900px wide, per DNA68; 24px on desktop, per WCAG 2.5.8, with its spacing and inline exceptions), renders twice to compare `prefers-reduced-motion` (no policy, motion still running, content lost), checks the Lenis contract (present when `build-plan.json` chose it; absent under reduce, per DNA90), and opens the dialogs declared in `a11y.dialogs` to check trap, Escape and focus return. Adapted from ux-ui-agent-skills (MIT); see `external/ux-ui-agent-skills/`. |

## The three mechanisms in `seal.mjs`

**Presence.** A gate with no artefact is NOT RUN. There is no way to express "this
gate passed" other than by producing the file the gate writes.

**Staleness.** Every artefact stores the `sourceSeal` — one hash over every source
file in the build — it was computed against. Change one byte of the page afterwards
and all six artefacts revert to not-run. This is what stops a page being fixed after
its gate passed.

**Order.** The seal is computed over the artefacts in the required sequence with
their finish times. Out-of-order timestamps fail. Gate 3 cannot be answered before
Gate 2 has been.

A `pass` also requires `humanConfirmed !== false`. `hero.json` in particular cannot
pass on machine checks alone: someone has to look at the annotated frame and confirm
the declared subject box actually contains the vehicle.

## The structural detector is a detector, not an oracle

`structure.mjs` buckets elements by rendered width and height, keeps the outermost
non-containing members of each bucket, and requires their widths to agree within 4%.
An extra wrapper, two nested wrappers, a `<ul>`, a flex row instead of a grid — none
of them hide four equal modules, because none of them change what the modules
measure. `gates/test/structure.test.mjs` asserts every one of those evasions.

It reports only groups that carry an actual formula. A repeated *width* is what a
grid system does to every page ever laid out on one; reporting those buries the four
real modules under thirty coincidences and teaches the reviewer to skim.

**What it cannot see:** absolutely-positioned repeats, masses that repeat across
scroll rather than within a section, and any repetition that is compositional rather
than geometric. So Gate 2 is not the detector's output. Gate 2 is:

1. the detector's output, with **every finding explicitly disposed of by a human** —
   findings arrive with `disposition: null` and the detector never clears itself;
2. a full-page screenshot;
3. a human section-by-section formula inventory, written out;
4. reconciliation between the two.

**An empty detector report is not evidence of structural originality.** It is
evidence that this particular detector found nothing.

## The hero is verified on the delivered render

Not on the source asset. `hero.mjs` maps the declared subject box through the actual
`object-fit` / `object-position` mapping at every required viewport, and checks
clipping, clearance, and overlap against nav and declared text-safe zones.

If the subject moves — video, or a sequence — a single declared box is insufficient.
Sample the declared interval and give per-sample boxes or a union box. **The worst
sample governs the pass.**

It emits annotated evidence: the media bounds, the subject box, the nav, the declared
text-safe zone, the actual headline and CTA positions, clearances and CLIPPED
markers, drawn on the real render. Plus one annotated *source* frame, so a human can
confirm the declared box really contains the vehicle. A manually declared but visually
wrong box cannot produce a pass.

This is the check that was missed. In the rejected concept the declared hero interval
was not even the delivered one — the encode opens on a daylight side profile before
cutting to the night garage, and by the end of the clip the car is clipped at the
bottom on desktop and on both edges on mobile. Every one of those is invisible from
the source master and obvious on the render.

## Tests

```sh
npm run test:gates        # all six suites
npm run test:a11y         # keyboard, targets, reduced motion, Lenis — bad cases and known false positives
npm run test:plan         # the build-plan pop-up: radio exclusivity, Bootstrap/Tailwind, scroll-site, Lenis, persistence
npm run test:a1           # ownership vs media coverage, competition, declaration honesty
npm run test:structure    # wrapper-evasion regressions
npm run test:content      # coverage, banned sources, dated figures
npm run test:seal         # presence, staleness, order
npm run fixtures          # the four frozen rejections + two A1 instrument fixtures
```

`npm run fixtures` is the one that matters. It holds four recorded rejections across
four failure classes:

```
A  cmc-concept-2            the required means are absent
B  cmc-concept-3            the means are present and do no work
C  cmc-index2-spine         authored, and useless as a product
D  cmc-index3-conventional  useful as a product, and unauthored
```

**The standing rule: this suite is broken the moment any fixture can pass the
complete chain.** C and D are the two halves of one proof — the correction applied
to C produced D — which is why Gate 2 and Gate 3 are conjunctive and neither may be
traded for the other.

## A1 measures ownership, not media coverage

`event.mjs`. A1 says *one governing event owns the first screen, and everything else
defers to it*. It used to be measured as the tallest media element on the first
screen — which scored the authored fixture at **35%** and the stock full-bleed video
at **100%**. The rule was right; the instrument was measuring a different thing. It
was replaced on 2026-08-15 and A1 itself was not touched.

Three numbers now, and only two of them can fail a build:

| | | |
|---|---|---|
| `eventCoverage` | the declared event as a composed system, over the first screen outside persistent chrome | floor **0.90** |
| `competition` | the strongest independent mass, over the event's rank mass | limit **0.60** |
| `mediaCoverage` | how much of the first screen is image or video | **reported, never decisive** |

The event is declared through **named components** — subject, identity mass,
supporting record or interface, active field, CTA cluster, reserved negative space —
each mapping to a rendered selector or a declared rectangle, plus what is explicitly
excluded. **A single full-viewport wrapper is not a declaration** and fails on that
ground however much it covers. Reserved space counts only where it is **bounded on
at least two sides by event masses** and carries one of the named functions;
unbounded blank viewport cannot be annexed to reach the floor. Rank excludes
full-viewport components, so declaring the photograph as the subject cannot make the
denominator the whole screen and immunise the page against competitors.

Every run emits an annotated first screen: each component box colour-coded by role,
the event envelope, reserved regions marked counted or not counted with the sides
that bound them, competitors in magenta with their ratio, and the three numbers
along the bottom.

Where the four design fixtures land, and what it changed:

| fixture | media | event | competition | A1 |
|---|---|---|---|---|
| `cmc-concept-2` | 29% | 57% | 9% | **fail** — a split hero; half the screen was never composed |
| `cmc-concept-3` | 100% | 100% | 22% | pass — it owns the screen and does nothing with it, which is Gate 2's finding |
| `cmc-index2-spine` | 22% | 93% | 0% | **pass** — the case the old instrument got wrong |
| `cmc-index3-conventional` | 100% | 100% | 0% | pass — and it gains nothing: Gate 1 still fails on the delivered hero |

Two instrument fixtures hold the ends of the scale. `a1-composed-low-media` passes
on **6%** media coverage. `a1-two-events` fails at **100%** media coverage, on
competition. Neither is a design, neither carries a verdict from Alex, and neither
may ever be cited as taste evidence.

## Keyboard, targets and reduced motion are driven, not read

`a11y.mjs` exists because DNA68, DNA78, DNA79 and DNA90 were written down and never
measured: each was "checked" by reading the source. It runs inside Gate 1 and needs
nothing declared to do its main work. One field is optional:

```json
"a11y": {
  "dialogs": [{ "open": "[data-inq-open]" }],
  "touchTarget": 44, "pointerTarget": 24, "lenis": true
}
```

`dialogs` lists the triggers to open. A dialog is never found by guessing, because
guessing clicks things a visitor would not. The first trigger visible at the viewport
is the one used, since pages often repeat a trigger in a dock that only exists on
phones. `dialog` defaults to `[role="dialog"],dialog[open]`. Lenis is required only
when `lenis: true`, or when the project's `build-plan.json` chose it as the scroll
engine (`DNA90`); native scroll is the default. Wherever Lenis runs, it must not be
constructed under reduced motion.

The first run on a real build (Tucson v4, 2026-10-25) produced three false positives:

- a rail's "Next" button that tabbing to the last card disables;
- a GSAP `.pin-spacer` and SplitText word wrappers that exist only when motion is allowed;
- a native `<dialog>` whose first trigger sat in the phone-only dock.

Each one is now a CLEAN case in `test/a11y.test.mjs`. The one finding that held up was
real: footer links 42px tall on a phone, 2px under DNA68.


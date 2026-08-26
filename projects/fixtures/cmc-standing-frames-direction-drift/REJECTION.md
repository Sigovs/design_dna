# cmc-standing-frames-direction-drift — frozen, rejected 2026-08-26

**Verdict: REJECT DIRECTION.** Alex, 2026-08-26.

Not wired into `MANIFEST.json` and not asserted by `npm run fixtures`. It is
evidence held for the canonical Design DNA review, not a regression test, and
nothing in `TASTE.md`, `skills/` or `README.md` was changed for it.

---

## What this is

A revision of **Direction C — Standing Frames** for the Chicago Motor Cars
homepage, produced in one session from a written rejection of the previous build.
Published at `https://claude.ai/code/artifact/d66c424f-0870-48b5-9aa3-afb3e40fae2b`
and preserved here unmodified.

Five compositions: the first screen, one vehicle screen, the record chapter, and
both mobile screens.

## The failure it demonstrates

> **A revision may improve desirability while silently replacing the approved
> direction and violating explicit constraints.**

This is the value of the fixture. The build is *better looking* than the one it
replaced and it is *further* from the brief. Every step was a defensible local
improvement — the first screen was not selling, so it became a full-screen scene;
the scene had no idea in it, so it acquired a governing device; the type had no
voice, so it got a display face. No single step announced itself as a change of
direction, and the direction changed anyway.

## The recorded outcome

| | |
|---|---|
| Visual quality | **improved** |
| Product desire | **improved** |
| Direction fidelity | **failed** |
| Exclusion fidelity | **failed** |
| Typography constraint fidelity | **failed** |
| Full-page governing-system continuity | **failed** |

## What was rejected, in Alex's terms

- *"The Floor"*, *"Lot 02"*, *"Open This Lot"*, the numbered rail and the oversized
  lot numerals define an **auction/catalogue metaphor** — a metaphor the creative
  brief explicitly excluded.
- **Bodoni Moda directly violates the confirmed "No serif typography" requirement.**
- The approved **side-switching field** and the **Standing Frames chapter system**
  no longer govern the page.
- The first screen carries **too many competing identity systems**.
- Desktop and mobile **do not feel like the same authored system**.
- Later chapters fall back into **conventional editorial rows** and a **standard
  social-media mosaic**.
- **The governing operation does not survive across the complete experience.**

## How it happened, for the review

Three constraints were live and none was checked before building against them:
the excluded metaphor, the serif ban, and the requirement that Standing Frames
govern the whole page rather than the hero alone. The prior instruction *"I usually
want to see full screen"* was applied as a licence to rebuild the hero; the frame /
field operation was dropped to make room for it, and once it was gone the page had
no governing system left. The catalogue device and the display serif were then
invented to fill that hole — inventing a direction rather than executing the
approved one, which is the failure `TASTE.md` §2 names when a mandate is unstated.

The one measurable thing that did hold: contrast was verified on the composited
render at every text mass, and a failing kicker at 2.98:1 was found and corrected
before delivery. Measurement caught what measurement can catch and said nothing
about the direction — which is the second half of what this fixture is for.

## Contents

| Path | What it is |
|---|---|
| `index.html` | the published build, byte for byte |
| `build-contract.mjs` | the generator that produced it, with the asset choices |
| `shots/01-floor.png` | first screen, 1440 × 900 |
| `shots/02-lot.png` | vehicle screen, 1440 × 960 |
| `shots/03-record.png` | record chapter, 1440 × 1280 |
| `shots/04-mobile-floor.png` | mobile first screen, 390 × 844 |
| `shots/05-mobile-lot.png` | mobile vehicle screen, 390 × 800 |

SHA-256, recorded so the copy is auditable:

```
4a17ac5ef50fe557b61f42021e326ae43d6651a1cc804e7c720bc2d4e04b9cbd  build-contract.mjs
97a24ea823d23dd402c137fc0162f943190b2bfda537fb76ca93196589470926  index.html
b74e583f1692e1699e47cb352db5d9c3c787a755b21600f3ec0ea4d4ae2e8aa5  shots/01-floor.png
b19684fd450eaf27dca92394467515e83ed3bea2cbe0b362943fcd73764e988e  shots/02-lot.png
908c22589fd164426347e5e686b180658f47fba5ad7bfbbdb122368250652269  shots/03-record.png
1b7746f16d539dcbbc48e604da21d9419a558a3175cb384423cdf74b6f17b3dc  shots/04-mobile-floor.png
91520fa81251213129fcb7fc269bcb7d9e1da624731fb6fb154e27a9e827a989  shots/05-mobile-lot.png
```

## Assets

Every image is Chicago Motor Cars' own, verified before use, and none was
generated. The showroom frame and its mobile crop come from
`assets/img/backgrounds/cmc-mclaren-showroom-*`, the vehicle from
`assets/img/inventory/cutout-aventador-svj-roadster.png`, the building from
`assets/img/locations/loc-west-chicago-1200.jpg`, the feed from
`assets/img/instagram/`. `cmc-ford-gt-showroom` was rejected during the build
because its sidecar records that its origin was never confirmed.

Asset selection is not among the failures above.

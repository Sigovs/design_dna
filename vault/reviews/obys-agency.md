# Review history — obys-agency

Append-only. `sites.json` holds the current state; this file holds how it got
there. Alex's wording is never edited, and agent observations are never merged
into his judgement.

**Layer verdicts are per layer.** A verdict here is never propagated to the whole
record: `dialectStatus` stays a whole-record field that only Alex sets.

---

## 2026-07-31 00:28 · QUICK

- **submitted / normalised:** https://obys.agency/
- **action:** record created · **no duplicate** (one id, 16 entries)
- **rating / dialectStatus:** **2 / unreviewed** — repository defaults, untouched,
  awaiting Alex's explicit overall decision. Not evidence of taste.

### Alex's original comment — verbatim, never edited

> creative, ispoljzovanije kompozicii. portfolio site. 2 color scheme. ne krichashij. strogij. mestami interesnoje primenenije graficheskih elelemntov. scroll s boku dlja portfolio screen shots.

### Alex's expanded list — his judgements

> - креативное использование композиции;
> - строгая, контролируемая подача без визуального шума;
> - сдержанная двухцветная схема — сайт не кричащий;
> - интересные графические элементы появляются выборочно и не перегружают интерфейс;
> - нестандартная презентация портфолио;
> - боковой скролл с последовательностью скриншотов проектов;
> - возможность менять представление работ между Vertical, Horizontal и Grid;
> - сочетание экспериментальной композиции с ясной структурой портфолио.
>
> Главный переносимый принцип: выразительность создаётся композицией, масштабом, направлением просмотра и редкими графическими акцентами, а не большим количеством цветов или декоративных эффектов.

### Directly verified by the agent

| What | How it was checked | Result |
|---|---|---|
| Colour system | pixel histogram of the rendered page, **two independent samples** — first screen and mid-sequence | first screen **99.7% pure black (0,0,0)**, remainder near-white ~240 and dark greys; mid-sequence **96.8% black**, 1.0% at 24, 0.4% near-white. A strongly limited black / near-white system, measured, not read off one shot |
| Page advance | wheel input, then reading `window.scrollY` / `scrollX` | the view changes while **both stay 0** — the document never scrolls; advancement is script-driven |
| Horizontal overflow | counting elements with `scrollWidth > clientWidth` | **4 such elements exist**, consistent with side-scrolling containers |
| Distinct states | frames kept only when materially different | **5 states** captured |
| A "Grid" control | searching the DOM for controls labelled Vertical / Horizontal / Grid, then clicking | only **"Grid"** was found, and it **did not respond to a click within the timeout**. Recorded as an agent observation; **no claim that Vertical or Horizontal modes exist**, and not pursued further |

### Alex's judgements, kept as his

"creative composition", "strict", "not loud", "graphic elements used selectively",
"unconventional portfolio presentation", and the transferable principle about
expressiveness coming from composition and scale rather than colour count — all
recorded as Alex's, none of them re-stated as agent findings.

**His "2 color scheme" is his characterisation.** What was measured is a
black-dominant, near-monochrome render. The two readings agree in substance; they
are kept separate anyway.

### Layer judgements

| Layer | Observation | Source | Judgement | Evidence limit |
|---|---|---|---|---|
| composition | креативное использование композиции; экспериментальная композиция при ясной структуре портфолио | Alex | IN | |
| composition | states are dominated by one central mass on a black field, with a page-number marker at the right edge | agent | unreviewed | several captured frames are mid-transition, not settled compositions |
| colour | сдержанная двухцветная схема — сайт не кричащий | Alex | IN | |
| colour | 96.8–99.7% pure black across two samples, remainder near-white and greys | agent | unreviewed | measured on desktop at 1440×900 only |
| imagery | боковой скролл с последовательностью скриншотов проектов | Alex | IN | side-scroll containers exist; the sequence itself was not traversed |
| interaction | a control labelled "Grid" is present in the DOM at 1440×900 and did not respond to a click within the timeout | agent | unreviewed | **corrected 2026-07-30** — this was previously attributed to Alex in error. He did not mention view modes. No claim is made that Vertical or Horizontal modes exist |
| motion | графические элементы появляются выборочно и не перегружают интерфейс | Alex | IN | no timing, easing or mechanics observed or described |
| design dialect | — | — | unreviewed | Alex gave no dialect verdict, and none is inferred |

### Tag decision — exact vocabulary only

| Category | Tags |
|---|---|
| composition | `visual-silence` · `dominant-mass` |
| layout | `air` · `grid-break` |
| colour | `monochrome` · `dark` |
| motion | `state-transition` |

**No risk tags** — no weakness confirmed.

**Approved characteristics with no exact vocabulary match, left untagged and
recorded here only:** *creative use of composition* · *strict, controlled delivery
without visual noise* · *selective graphic elements* · *unconventional portfolio
presentation* · *side-scrolling project sequence*. Nothing was approximated to fill a field.

**These tags describe this reference.** They do not become a general Design DNA
preference by being applied here.

### Remaining limitations

Several frames
are mid-transition. Timing, easing and transition mechanics are preserved nowhere,
and none is described. Mobile was not captured in this pass.

---

## 2026-07-31 00:31 · QUICK · finalised

- **rating:** 2 → **2** (confirmed as Alex's decision, no longer a default)
- **dialectStatus:** unreviewed → **in**
- **Alex's overall decision:** a positive supporting reference, deliberately **not**
  a maximum-level rating 3.

### Attribution correction

Alex's original comment mentions **the side-scrolling portfolio screenshots** and
does **not** mention or approve Vertical / Horizontal / Grid view modes. An earlier
revision of this file attributed that to him. **Corrected above:**

- the view-mode line is no longer an Alex judgement;
- the unresponsive **"Grid"** control remains only as an **agent observation**,
  `unreviewed`;
- **no claim is made that Vertical or Horizontal modes exist** — they were never
  observed, and no further capture time was spent trying to prove them;
- it is also removed from the list of untagged approved characteristics, because it
  was never an approved characteristic.

### Unchanged

Alex's original comment verbatim · the existing screenshots (`hero`, `full`,
`mobile`, `strip-1..5`, `strip-m-1..6`) · the exact-vocabulary tags · no risk tags ·
every documented limitation about mid-transition frames, timing, easing and
incomplete interaction mechanics. The desktop evidence is treated as sufficient for
this QUICK review; no mobile interaction filmstrip was required or captured.

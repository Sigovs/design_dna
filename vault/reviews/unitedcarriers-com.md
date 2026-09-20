# Review history — unitedcarriers-com

Append-only. `sites.json` holds the current state; this file holds how it got
there. Alex's wording is never edited, and agent observations are never merged
into his judgement.

**Layer verdicts are per layer.** A verdict here is never propagated to the whole
record: `dialectStatus` stays a whole-record field that only Alex sets.

---

## 2026-09-20 12:05 · QUICK

- **submitted:** https://unitedcarriers.com/
- **normalised:** https://unitedcarriers.com/
- **action:** record created
- **previous rating / dialectStatus:** n/a — new record
- **capture limitation:** no shots yet. The cloud session cannot run a headless browser and
  this working tree has no Linux playwright binaries, so the page was read live in a browser
  at 1024×768 and 800×863, scrolling by position. The auto-capture Action shoots it on push.
  Static frames will understate this page more than most: most of its content only exists
  part-way through a scrub.

### Alex's comment — verbatim, never edited

> horoshij site mnogo animacii mne rnavistaja scroo scrub

> eshe odin ahuenjuj siate s animacijaj i scrollom story telling

Asked whether the second line was this site or another URL, he answered **"oba"** — both
lines are about this page.

### Confirmed changes to the record

- `rating` **3** — from "ahuenjuj", his word, not an agent reading
- `dialectStatus` **in**, `dialects` **immersive-authored-world** — Alex chose it when asked;
  the dialect now stands at 6 `in` records
- `note` / `works` / `weaknesses` written in Russian
- no `judgementBy`: the rating and the status are his

### Layer judgements

| Layer | Observation | Source | Judgement | Evidence limit |
|---|---|---|---|---|
| motion | "много анимации, мне нравится scroll scrub" | Alex | **IN** | |
| composition | "сторителлинг" — the scroll tells a story | Alex | **IN** | |
| composition | One cargo carried the length of the page: a reach-stacker lifts a container, transfers it to a chassis, the truck drives, the ground turns black, a speedometer counts in the corner. `home-service` is 10 213 px and `home-why` 5 532 px and sticky — about 70% of a 22 569 px document is two pinned runs. | agent | IN | measured from the DOM; frames read at fixed offsets |
| composition | Camera flips top-down and the same truck drives up a narrow vertical band at the centre while the "why us" blocks pass on the right — the road becomes the scroll axis. | agent | IN | |
| colour | White → black is a scene change, not a dark section: day at the terminal, night on the road. | agent | IN | |
| imagery | 3D containers, chassis and truck as cut-out objects; hero is a 3D Earth from space, night side lit, route arcs with country labels. | agent | IN | |
| typography | BT Steinhart and BT Steinhart Mono; condensed grotesque headlines, mono eyebrows, pill buttons. | agent | contextual | |
| interaction | Scroll-linked counters ("00 KM/H") rather than timer-driven ones. Hover states not tested. | agent | unreviewed | |
| hierarchy | Strong through the scrub; the tail — testimonials in two columns with portraits, partners, FAQ — returns to ordinary corporate layout. | agent | contextual | this is the `narrative-dilution-risk` tag |

**Judgement rules for this table.** A layer Alex did not mention and the agent did
not directly verify stays out of the table entirely — an empty row is a claim.
"not sure", "neutral", "not bad", "ни туда ни сюда" are `unreviewed`, never
forced into IN or OUT. Only `Source: Alex` rows with IN or OUT count as evidence
in distillation.

### The transferable lesson

**Scroll as the thing itself, not as a delivery mechanism.** The page does not animate
sections in; it moves one object through a process, and the reader's scroll *is* that
movement — literally so once the camera goes top-down and the road runs along the scroll
axis. The test before reusing it: there has to be a real process with an order to it
(pick up → transfer → drive → arrive). Without that, a long pinned run is just an expensive
way to delay content, and the tail of this same page shows what happens when the story runs
out before the page does.

### Technical note

gsap 3.15.0 + lenis 1.3.23 + Three.js, 28 sticky/fixed elements, 22 569 px document.
`ScrollTrigger` is not exposed on `window`, so the scrub was read from rendered frames at
fixed scroll offsets, never from its configuration.

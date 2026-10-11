# Review history — marshallgoldman-com

Append-only. `sites.json` holds the current state; this file holds how it got
there. Alex's wording is never edited, and agent observations are never merged
into his judgement.

**Layer verdicts are per layer.** A verdict here is never propagated to the whole
record: `dialectStatus` stays a whole-record field that only Alex sets.

---

## 2026-10-08 · ADD (vault-curator, delegated)

- **submitted:** "Marshall Goldman (Beverly Hills luxury/exotic dealer)". The URL was resolved by the agent.
- **resolved:** https://www.marshallgoldman.com/ returns 200 with title "Marshall Goldman Motor Sales | Luxury & Exotic Car Dealers". The footer lists Beverly Hills (8833 Wilshire Blvd, CA 90211), Cleveland, Newport Beach and Baltimore. Accepted as the real dealer site.
- **action:** record created by `npm run add`; judgement fields written by vault-curator
- **previous rating / dialectStatus:** n/a. New record, so `rating 2` / `unreviewed` are **repository defaults awaiting Alex**
- **origin of the request:** the duPont REGISTRY Select client cited it as a structural reference for **footer location cards** only. There is no comment from Alex on the site itself.
- **capture limitation:** none material. Hover state captured separately as an extra.

### Note on independence (agent)

The site runs on the All Auto Network platform (theme `aanWordpress`), the same vendor as
Alex's agency work. Authorship of the design is not established. Proposed for Alex: rating 1
(structural reference only; the page as a whole is a template).

### Layer judgements (agent observation, unreviewed by Alex)

| Layer | Observation | Source | Judgement | Evidence limit |
|---|---|---|---|---|
| hierarchy | Footer: four equal columns, uniform city → street → city/state/ZIP → phone | agent | unreviewed | — |
| interaction | "Book A Private Visit" opacity:0 until hover; absent on touch (U12, U7) | agent | unreviewed | computed style read directly |
| composition | Every section a centred headline over a grid; no dominant after the hero (C19) | agent | unreviewed | — |
| typography | One tracked Futura voice for every heading role (I8) | agent | unreviewed | — |

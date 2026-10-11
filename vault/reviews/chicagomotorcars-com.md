# Review history — chicagomotorcars-com

Append-only. `sites.json` holds the current state; this file holds how it got
there. Alex's wording is never edited, and agent observations are never merged
into his judgement.

**Layer verdicts are per layer.** A verdict here is never propagated to the whole
record: `dialectStatus` stays a whole-record field that only Alex sets.

---

## 2026-10-08 · ADD (vault-curator, delegated)

- **submitted:** https://www.chicagomotorcars.com/
- **normalised:** https://chicagomotorcars.com/ (id `chicagomotorcars-com`)
- **action:** record created by `npm run add`; judgement fields written by vault-curator
- **previous rating / dialectStatus:** n/a. New record, so `rating 2` / `unreviewed` are **repository defaults awaiting Alex**
- **origin of the request:** the duPont REGISTRY Select client cited CMC as a structural reference for **footer location cards** only (recorded in `C:\____WORK\DU PONT REGESTRY\CLAUDE.md`, feedback log 2026-10-08). There is no comment from Alex on the site itself.
- **capture limitation:** desktop and mobile full-page shots clipped at 14,000px, so the footer is missing from both. The close-ups were added as `extras`. See `captureError`.

### Provenance finding (agent, verified)

The live homepage's location section is Alex's own build:
`C:\____WORK\CHICAGO MOTOR CARS\index.html` line 1747 carries the same eyebrow and
headline that ship live. This record is **self-work, not external evidence**, and must not
be counted by `distill` as an independent observation. Proposed for Alex: rating 1, or
removal to `projects/` if he prefers the vault to stay strictly external.

### Layer judgements (agent observation, unreviewed by Alex)

| Layer | Observation | Source | Judgement | Evidence limit |
|---|---|---|---|---|
| hierarchy | One open card and four closed; flagship open by default (C1) | agent | unreviewed | hover observed in a scripted browser, card 3 spot-checked |
| interaction | Hover and focus-within expand; mouse-out reverts; click does not keep it open | agent | unreviewed | touch at desktop width not verified |
| spacing / density | Mobile stacks all five open with full-width targets; socials repeat 5× | agent | unreviewed | — |
| imagery | Aerial night photo/video graded near-black; Newport Beach is a placeholder | agent | unreviewed | video not recorded |

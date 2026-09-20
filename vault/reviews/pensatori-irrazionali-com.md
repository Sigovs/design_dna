# Review history — pensatori-irrazionali-com

Append-only. `sites.json` holds the current state; this file holds how it got
there. Alex's wording is never edited, and agent observations are never merged
into his judgement.

**Layer verdicts are per layer.** A verdict here is never propagated to the whole
record: `dialectStatus` stays a whole-record field that only Alex sets.

---

## 2026-09-20 10:58 · QUICK

- **submitted:** https://pensatori-irrazionali.com/
- **normalised:** https://pensatori-irrazionali.com/
- **action:** record created
- **previous rating / dialectStatus:** n/a — new record, defaults applied
- **capture limitation:** no shots. `npm run review` ran, `capture.mjs` launched, and every
  navigation failed with `net::ERR_TUNNEL_CONNECTION_FAILED` — the cloud session's egress
  gateway refuses CONNECT for a headless browser to any external host, confirmed by trying
  `example.com` and an existing vault URL in the same browser. **This is an environment
  limit, not a bot wall on the site.** The page was then read live in a browser on Alex's
  machine, at 819×925 and at an emulated 1440×900, scrolling by position. That is enough for
  layout, type, colour and section structure, and **not** enough for transitions, scroll
  behaviour or the WebGL hero in motion. Shots are pending: `npm run capture-missing`.

### Alex's comment — verbatim, never edited

> dobavj v design vault: https://pensatori-irrazionali.com/

No judgement was given — the submission is a URL. Every row below is `Source: agent`
and `unreviewed`, and none of it is evidence of taste.

### Confirmed changes to the record

- record created; `rating 2` / `dialectStatus unreviewed` are repository defaults awaiting Alex
- `note`: TODO — the judgement is Alex's to write
- `agentObservation`: written from the live read
- `tags`: typography `grotesque`, `big-type`, `type-crossing-subject`; color `neutral`,
  `bold-accent`; imagery `illustration`, `product` — descriptive and directly verified.
  Composition, layout, motion and risks deliberately left empty: a merit tag means a human
  confirmed the quality.
- `captureError`: the environment limit above

### Layer judgements

| Layer | Observation | Source | Judgement | Evidence limit |
|---|---|---|---|---|
| composition | First screen carries two masses: the 3D pennant bundle fanning off the right edge, and one three-line paragraph at lower left. Nothing else competes. | agent | unreviewed | read at 819px and emulated 1440×900; no shots on disk |
| hierarchy | Numbered sections — (01) Works, (02) Disciplines — with the section title in script at display size and the ordinal in parentheses beside it. | agent | unreviewed | |
| typography | Two families only: Helvetica Now for all structure, Ballet (thin script) for section titles and oversized numerals. Client names in section 01 set very large; spec tables in small grotesque, label left / value flush right. | agent | unreviewed | |
| colour | Warm off-white ground, near-black text, one bright green accent restricted to the section dot and the full-bleed marquee bands. | agent | unreviewed | |
| imagery | Client logos printed on woven cloth pennants in 3D — the logo strip built as the hero object rather than a band below it. Section heads use 19th-century engraved plates (Pegasus, heraldic lion) crossed by the script title. | agent | unreviewed | |
| spacing / density | Full-width hairline-ruled rows with generous leading; long empty stretches between discipline sections in static frames. | agent | unreviewed | the empty stretches are consistent with scroll-linked content that a static read does not preserve — not proven either way |
| motion | Not verified. Loader is a white disc on black with the script mark; a marquee band repeats between sections; the hero is a WebGL canvas. Scrolling to ~12,000px returned the view to the opening composition — consistent with a looping scroll, **not proven**. | agent | unreviewed | no filmstrip; nothing here describes a transition that was directly observed running |
| interaction | Section-01 rows carry a right-edge arrow; discipline blocks end in a dark LEARN MORE pill. Hover states not tested. | agent | unreviewed | |
| design dialect | Not called. The material — off-white ground, engraved plates, script display, spec tables — sits near `refined-elegance` and near `technical-luxury` without being either on this evidence. | agent | unreviewed | `dialectStatus` is Alex's call, and stays `unreviewed` |

**Judgement rules for this table.** A layer Alex did not mention and the agent did
not directly verify stays out of the table entirely — an empty row is a claim.
"not sure", "neutral", "not bad", "ни туда ни сюда" are `unreviewed`, never
forced into IN or OUT. Only `Source: Alex` rows with IN or OUT count as evidence
in distillation.

### What this entry is here for — pending Alex

The one mechanism worth taking: **the client roster and the hero image are the same
object.** A logo wall is proof and normally reads as a dull band; rendering the logos as
printed cloth and fanning them into a single sculpture makes the proof carry the whole
first screen, so the page never has to state the roster twice. Whether that survives as a
transferable rule is Alex's call, not the agent's.

Candidate weakness, unconfirmed: four structurally identical discipline sections run
consecutively, each separated by an identical marquee band. If it holds against the live
page it is `repeated-composition-risk`; from static frames it is an observation only.

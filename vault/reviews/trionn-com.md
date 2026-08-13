# Review history — trionn-com

Append-only. `sites.json` holds the current state; this file holds how it got
there. Alex's wording is never edited, and agent observations are never merged
into his judgement.

**Layer verdicts are per layer.** A verdict here is never propagated to the whole
record: `dialectStatus` stays a whole-record field that only Alex sets.

**This file starts late.** The record was created on 2026-08-04 and judged without
a sidecar; everything before the first entry below lives in `sites.json` and in the
distillation log, not here.

---

## 2026-08-13 · the scrolled-header state recovered

- **action:** `shots.navScrolled` changed from `null` to
  `shots/trionn-com/nav-scrolled.jpg`. No judgement field touched.
- **provenance:** recovered byte-identical (md5 `a5764e72…`) from
  `design_dna.stale-copy-2026-08-05/`, a snapshot of this repository found untracked
  inside the Sports Car Rescue project. The record had been asserting `null` — *no
  such state* — while the file existed.
- **verified before wiring it in:** the frame shows the pinned header after scroll —
  wordmark left, sound toggle, a `LET'S TALK` pill and a `MENU` pill right. It is
  the state it claims to be.
- **why it matters:** `navScrolled` is present only when the pinned header changes
  after the first screen, and **its presence is itself the finding**. A `null` here
  was not a missing file, it was a claim about the site that the evidence contradicts.

**The snapshot was deleted after this transfer.** It carried nothing else unique.

# Review history — forgeautomotive-co-uk

Append-only. `sites.json` holds the current state; this file holds how it got
there. Alex's wording is never edited, and agent observations are never merged
into his judgement.

**Layer verdicts are per layer.** A verdict here is never propagated to the whole
record: `dialectStatus` stays a whole-record field that only Alex sets.

---

## 2026-10-08 · ADD (vault-curator, delegated)

- **submitted:** https://forgeautomotive.co.uk/. Relayed by the orchestrating agent as Alex sending it as a "high-quality reference for scroll choreography, typography, cinematic pacing, transitions and overall art direction" for duPont REGISTRY Select. This is the relay's wording, not a verbatim comment from Alex on the site.
- **action:** record created by `npm run add`; judgement fields written by vault-curator as a curator's read
- **previous rating / dialectStatus:** n/a. New record, so `rating 2` / `unreviewed` are **repository defaults awaiting Alex**
- **capture limitation:** the page is scroll-jacked. Body overflow is hidden and the document is one viewport tall (Lenis), so `capture.mjs` produced one strip frame per pass and a hero caught mid-intro. The gate was ENTER, which is on the whitelist; pressing it accepts analytics cookies.
- **live visit (TASTE §6(d) exception), 2026-10-08:** the value is temporal and the filmstrip could not answer it. Local Playwright (Chromium) recordings: `shots/forgeautomotive-co-uk/scroll-1920.webm` (45s) and `scroll-390.webm` (62s), driven by wheel steps of half a viewport every ~650ms. Contact sheets, a settled hero and a reduced-motion frame are in `extras`. ffmpeg and ImageMagick were used for encoding and sheets. No paid service.
- **not verified:** hover states, the NAVIGATE overlay, inner pages, real touch swipes (the 390 pass used wheel input), and performance under load.

### Layer judgements (agent observation, unreviewed by Alex)

| Layer | Observation | Source | Judgement | Evidence limit |
|---|---|---|---|---|
| composition | One event per beat against still chrome; the 50/50 service split repeats six times unchanged | agent | unreviewed | — |
| hierarchy | Display serif headline, then 22px body, then 12px caps labels; the scale step does the ranking | agent | unreviewed | — |
| typography | Light, narrow display serif for every headline + Geist Sans; functional text at 12px (below I7) | agent | unreviewed | sizes measured from computed styles |
| colour | Near-black textured ground, white type, red sourced from photography plus one letter tint | agent | unreviewed | — |
| imagery | Commissioned studio and detail photography; images enter through windows, wipes and rises | agent | unreviewed | — |
| spacing and density | Generous on statement beats; the services run is a fixed template | agent | unreviewed | — |
| motion | Type resolves in place through blur; images travel; chapters hand over by image; scroll-jacked; reduced motion not designed | agent | unreviewed | observed in recordings; RM checked at a single moment |
| interaction | ENTER gate with bundled consent; progress rule is the only wayfinding | agent | unreviewed | nav overlay not opened |
| design dialect | Not proposed. Nearest reading: `cinematic-industrial` or `immersive-authored-world`. Left for Alex | agent | unreviewed | — |

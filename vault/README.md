# Taste Vault

The visual reference library behind the taste system. Every entry is a site worth
learning from, three screenshots as evidence, a controlled set of tags, and — the
part that actually matters — **a note saying why it works.**

The note is the payload. Shots without a note are a mood board, and a mood board
teaches an agent nothing except how to copy pixels. Write the note as if you were
explaining the decision to someone who has to reproduce the *reasoning* on a
different brief.

---

## Files

| File | What it is |
|---|---|
| `sites.json` | The library. An array of entries — schema below. Hand-editable. |
| `vocab.json` | The controlled tag vocabulary. **Single source of truth** — `index.html` and `capture.mjs` both read it. Add tags here. |
| `capture.mjs` | Playwright capture tool. Three shots per entry. |
| `index.html` | The gallery. Browse, search, filter, edit, add. No backend. |
| `smoke.mjs` | `npm run smoke` — checks the gallery still works. No build step means nothing else catches a boot-time throw, and one throw kills every listener on the page. |
| `shots/<id>/` | `full.jpg` (1440w full page), `hero.jpg` (1440×900 crop, 2x), `mobile.jpg` (390w full page). **Committed.** |

Shots are JPEG, and only the hero is 2x. PNG at 2x measured ~33MB per entry,
which makes a reference library that nobody can clone. Full-page shots are also
clipped at 14,000px so an infinite-scroll site can't produce an unusable strip.

---

## Entry schema

```json
{
  "id": "rmsothebys-com",
  "url": "https://www.rmsothebys.com/",
  "title": "RM Sotheby's",
  "added": "2026-07-24",
  "rating": 3,
  "tags": {
    "typography": ["display-serif", "mono-details"],
    "layout": ["air", "bleed"],
    "motion": ["restraint"],
    "color": ["dark", "smoky"],
    "imagery": ["photography", "art-direction"]
  },
  "note": "What I liked and why.",
  "shots": {
    "full": "shots/rmsothebys-com/full.jpg",
    "hero": "shots/rmsothebys-com/hero.jpg",
    "mobile": "shots/rmsothebys-com/mobile.jpg"
  }
}
```

- `id` — slug derived from the URL; the shots directory name. Stable, don't rename.
- `rating` — `1` keep · `2` good · `3` reference. Only 3s should influence a design.
- `tags` — one array per category in `vocab.json`. Free additions allowed; promote
  the ones you reuse into `vocab.json` deliberately.
- `shots` — paths relative to `vault/`, or `null` when not yet captured.

---

## Adding entries

**From a machine with the repo** — capture immediately:

```bash
npm run add -- https://example.com     # shoots 3 images, creates a stub entry
npm run vault                          # open the gallery, fill in tags + note
```

**From the gallery** (or from your phone, by editing `sites.json` by hand):

1. `+ add site` → URL, tags, note. Save downloads an updated `sites.json`.
2. Replace `vault/sites.json` with the downloaded file and commit.
3. On a machine with the repo: `npm run capture-missing` — shoots every entry
   whose shots are missing or absent from disk.

**Reshoot** when a site redesigns: `npm run recapture -- <id>`.

> The gallery has no backend on purpose. Saving downloads `sites.json`; you
> **replace the file and commit**. Edits are held in `localStorage` until then, so
> a reload won't lose them — but they aren't real until they're in a commit.

---

## The weekly distillation ritual

Once a week, turn accumulated references into rules. Point an agent at the repo
and give it the prompt below. **The agent proposes; you approve.** Nothing lands
in `skills/` without a human reading the diff — that's the whole safeguard against
the vault slowly averaging your taste back toward the mean.

### The distillation prompt

```
Read TASTE.md and every file in skills/ so you know the current rules.

Then read vault/sites.json and look at the shots for every entry added since
<DATE OF LAST RUN> (use the `added` field). Weight rating-3 entries heavily,
rating-2 lightly, and ignore rating-1 except as counter-evidence. Read the notes
before the images — the note is the claim, the shots are the evidence for it.

Produce, in this order:

1. PATTERNS — what recurs across these entries that the skills do NOT already
   say. Only patterns supported by 3+ entries, or by 2 rating-3 entries. Cite
   the entry ids behind each one. If a pattern has fewer than 2 entries behind
   it, list it separately under "watch list" and do not propose a rule for it.

2. CONTRADICTIONS — anything in these entries that violates a current rule and
   works anyway. This is the most valuable output. For each: name the rule, the
   entries that break it, and say whether the rule needs a documented exception,
   a narrower scope, or should be deleted outright. Do not soften a rule just
   because one admired site breaks it.

3. AMENDMENTS — concrete proposed edits, as a unified diff against the actual
   files in skills/ and TASTE.md. Every new or changed rule must carry its
   rationale in the same voice as the existing rules, and must be specific
   enough to check (numbers, tokens, bans — not "consider using more space").
   Cite the vault entry ids that justify each amendment as a trailing comment in
   the diff so the evidence chain stays visible.

4. VOCAB — tags used as free additions 3+ times that should be promoted into
   vault/vocab.json, and vocabulary tags that have never been used and should be
   retired.

5. SUMMARY DRIFT — if any amendment is accepted, state the exact replacement
   lines for the five-line taste summary in README.md. Never leave that summary
   describing rules that no longer exist.

Constraints:
- Do not apply anything. Output the diff for review only.
- Do not add rules that merely restate an existing rule in new words. Say so if
  a pattern is already covered, and name where.
- Prefer amending or narrowing an existing rule over adding a new one. The skills
  should get sharper, not longer.
- If the evidence does not support any amendment this cycle, say exactly that.
  A distillation run that proposes nothing is a valid and common outcome.
```

Record what you ran and when at the bottom of this file, so the next run knows
where to start.

### Distillation log

| Run date | Entries considered | Outcome |
|---|---|---|
| — | — | Phase 2 shipped; no distillation run yet. |

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
  "dialectStatus": "unreviewed",
  "dialects": [],
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
- `dialectStatus` — **a human judgement, never set automatically.**
  `unreviewed` (nobody has judged it yet — the default for every new entry) ·
  `in` (belongs to a stored dialect) · `out` (good work outside every stored
  dialect) · `hybrid` (shares decision logic with a stored dialect but diverges in
  expression). Set it in the gallery's detail view.
- `dialects` — which stored dialects it belongs to, from `vocab.json`'s `dialects`
  list. Empty is normal and correct for `unreviewed` and `out`.
- `tags` — one array per category in `vocab.json`. Free additions allowed; promote
  the ones you reuse into `vocab.json` deliberately.
- `shots` — paths relative to `vault/`, or `null` when not yet captured.

`out` is not a rejection. An `out` entry is the most valuable kind in the vault:
it is evidence that good work exists outside the house dialect, and it is the only
raw material from which a new dialect can be built. Rate it on quality, mark it
`out` on classification, and keep it.

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
Read TASTE.md, every file in skills/, and every file in dialects/ so you know
the current rules AND which tier each one sits in: INVARIANT (universal quality
law, never yields) or DIALECT (aesthetic position with a stated yields-when).

Then read vault/sites.json and look at the shots for every entry added since
<DATE OF LAST RUN> (use the `added` field). Weight rating-3 entries heavily,
rating-2 lightly, and ignore rating-1 except as counter-evidence. Read the notes
before the images — the note is the claim, the shots are the evidence for it.
Note each entry's dialectStatus; treat `unreviewed` entries as unclassified
evidence, not as in-dialect.

Produce, in this order:

1. PATTERNS — what recurs across these entries that the skills do NOT already
   say. Only patterns supported by 3+ entries, or by 2 rating-3 entries. Cite
   the entry ids behind each one. If a pattern has fewer than 2 entries behind
   it, list it separately under "watch list" and do not propose a rule for it.
   For each pattern, state which TIER it belongs in and why. Default to DIALECT:
   a new INVARIANT must be defensible as a universal quality law that holds in
   every aesthetic for every audience — evidence that it looks good in this
   vault is not evidence that it is universal.

2. CONTRADICTIONS — anything in these entries that breaks a current rule and
   works anyway. This is the most valuable output. For each: name the rule and
   its tier, the entries that break it, and then:
   - If it breaks a DIALECT rule: does the existing yields-when already cover
     this case? If yes, say so and stop — that is the system working, not a
     finding. If no, propose either a widened yields-when or a narrower rule.
   - If it breaks an INVARIANT: be sceptical of the entry, not the invariant.
     Check whether the work actually succeeds *despite* the violation or whether
     the note is generous. Only propose changing an invariant when the case is
     overwhelming, and say plainly that you are proposing it.
   Do not soften a rule just because one admired site breaks it.

3. AMENDMENTS — concrete proposed edits, as a unified diff against the actual
   files in skills/, dialects/, and TASTE.md. Every new or changed rule must
   carry its rationale in the same voice as the existing rules, must be specific
   enough to check (numbers, tokens, bans — not "consider using more space"),
   and every DIALECT rule must carry a yields-when. Cite the vault entry ids
   that justify each amendment as a trailing comment in the diff so the evidence
   chain stays visible. Never move a rule between tiers silently — a tier change
   is its own proposal with its own argument.

4. DIALECT REVIEW — list entries whose dialectStatus is `unreviewed` with a
   recommended status (in / out / hybrid) and a one-line reason. Recommendations
   only; the human sets the field.

5. NEW DIALECT — only if the binding rule below is satisfied. If it is not, say
   which condition fails and how many qualifying entries exist so far.

6. VOCAB — tags used as free additions 3+ times that should be promoted into
   vault/vocab.json, and vocabulary tags that have never been used and should be
   retired.

7. SUMMARY DRIFT — if any amendment is accepted, state the exact replacement
   lines for the five-line taste summary in README.md. Never leave that summary
   describing rules that no longer exist.

Constraints:
- Do not apply anything. Output the diff for review only.
- Do not add rules that merely restate an existing rule in new words. Say so if
  a pattern is already covered, and name where.
- Prefer amending or narrowing an existing rule over adding a new one. The skills
  should get sharper, not longer.
- Never propose promoting a dialect rule into an invariant to make it stronger.
  Strength is not the criterion; universality is.
- If the evidence does not support any amendment this cycle, say exactly that.
  A distillation run that proposes nothing is a valid and common outcome.
```

Record what you ran and when at the bottom of this file, so the next run knows
where to start.

---

## Creating a new dialect

**Binding rule.** A new dialect may be proposed **only** when **≥3 references
whose `dialectStatus` a human has set to `out`** share **meaningful decision
logic** — and **Alex approves before the dialect exists.**

"Meaningful decision logic" means shared *compositional reasoning*: how they rank
information, where they place mass, what they subtract, how they handle metadata,
what they let carry the hierarchy. **Similar colours, similar typefaces, or
similar surface styling are not decision logic.** Three dark sites with serif
headlines are three dark sites with serif headlines; three sites that all
subordinate imagery to a rigid data column are a dialect.

Additional conditions:

- **Human-approved only.** `unreviewed` entries do not count toward the three, no
  matter how obviously out-of-dialect they look. The count is a count of
  judgements, not of files.
- **The logic must be nameable in one sentence** without referring to any specific
  colour or typeface. If you can't, you have a mood, not a dialect.
- **It must conflict with an existing dialect's principles**, not merely differ in
  expression. If it follows auction-editorial's principles with different
  expressions, it is `hybrid` — the existing dialect already covers it.
- **A proposal is a file draft**, structured like
  [dialects/auction-editorial.md](../dialects/auction-editorial.md): PRINCIPLES
  (decision logic, each with a yields-when) and EXPRESSIONS (optional
  manifestations, explicitly not a checklist). Plus the entry ids as evidence.

Then Alex approves or rejects. On approval: add the file to `dialects/`, add its
name to `dialects` in `vocab.json`, add a row to the dialect index in `TASTE.md`,
and re-mark the qualifying entries from `out` to `in`.

*Why the bar is this high:* a dialect is a licence to make a whole class of
decisions differently, so a weak one dissolves the system into "anything goes with
extra steps". Three independent human judgements plus shared reasoning is the
minimum evidence that a genuinely different way of deciding exists, rather than a
run of superficially similar pages.

### Distillation log

| Run date | Entries considered | Outcome |
|---|---|---|
| — | — | Phase 2 shipped; no distillation run yet. |

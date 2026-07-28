# Taste Vault

The visual reference library behind the taste system. Every entry is a site worth
learning from, screenshots as evidence — page shots plus the scroll filmstrip — a
controlled set of tags, and — the part that actually matters — **a note saying why
it works.**

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
| `capture.mjs` | Playwright capture tool. Page shots, the scroll filmstrip, and the scrolled header. |
| `index.html` | The gallery. Browse, search, filter, edit, add. No backend. |
| `smoke.mjs` | `npm run smoke` — checks the gallery still works, including a real mobile matrix (WebKit iPhone 13 / iPhone SE, Chrome Pixel 5) plus blocked-storage and hanging-API scenarios. No build step means nothing else catches a boot-time throw, and one throw kills every listener on the page. |
| `prune.mjs` | `npm run prune` — deletes shot directories no entry points at any more. |
| `shots/<id>/` | `full.jpg` (1440w full page), `hero.jpg` (1440×900 crop, 2x), `mobile.jpg` (390w full page), `strip-1..8.jpg` (desktop scroll filmstrip), `strip-m-1..6.jpg` (mobile), `nav-scrolled.jpg` (only when the pinned header changes). **Committed.** |

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
    "composition": ["dominant-mass", "directed-eye"],
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
    "mobile": "shots/rmsothebys-com/mobile.jpg",
    "strip": ["shots/rmsothebys-com/strip-1.jpg", "… 8 frames, in scroll order"],
    "stripMobile": ["shots/rmsothebys-com/strip-m-1.jpg", "… 6 frames"],
    "navScrolled": null
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
  the ones you reuse into `vocab.json` deliberately. Adding a category to
  `vocab.json` is the only step needed — normalisation gives every entry the new
  key on next load, and filters, forms, save, and export pick it up automatically.
- `works` / `weaknesses` — optional. `note` stays the general reasoning; these two
  split the verdict. **Nothing is auto-split** — move text yourself if you want to.
  For an `out` entry the weaknesses are the reason it is kept. The card shows the
  clamped note plus small `+N` / `−N` marks when these exist.
- `unsorted` — tags the classifier could not place confidently. Visible in the
  editor with proposed homes, never silently binned. **No new categories are
  created here:** the six are deliberate, and a new one is a human decision made by
  editing `vocab.json`. Leaving a tag queued is better than forcing it somewhere
  wrong.
- `tags.risks` — **the only category that records something wrong.** Named failure
  modes and near-failures: `ambiguous-reading-order`,
  `decorative-information-legibility-risk`, `mobile-recomposition-risk`,
  `repeated-composition-risk`. It exists so the merit categories stay merit-only —
  a query for `composition:*` should never return a warning. A risk tag is a
  *label* for a failure the note or `weaknesses` describes; it does not replace
  writing it down.
- `tags.composition` — **positive merit tags only**, from
  [academic-composition](../skills/academic-composition/SKILL.md). A tag means the
  quality is **present** and a human has confirmed it. **Never apply one to record
  that a quality is missing.** Compositional *failures* stay in the `note`, in
  prose — there is no issue taxonomy in this schema, and this is not the task to
  invent one. Composition tags are also never inferred from a rating or a note:
  they need human review or clear existing evidence.
- `shots` — paths relative to `vault/`, or `null` when not yet captured.
  `strip` and `stripMobile` are **arrays** of frame paths in scroll order — an
  empty array means no filmstrip yet. `navScrolled` is a string only when the
  pinned header actually changes after the first screen; **`null` is an answer,
  not a gap**, and it is never re-asked. Anything reading `shots` as a flat map of
  strings has to flatten first — see `shotFiles()` in `index.html` and `prune.mjs`.

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

**Shots are static — if an entry earns its place through motion, transitions, or
interaction, the note must describe *what* moves and *how*.** That is the part the
capture cannot hold, and an entry whose whole value is a transition is worthless in
the vault unless the note carries it.

**Reshoot** when a site redesigns: `npm run recapture -- <id>`.

## Removing an entry

Detail view → **remove from vault** → confirm (*"Remove &lt;title&gt;? Shots remain in
git history."*). Two taps, never one.

> **Removal is a commit; recovery is a revert.**

Nothing is destroyed. The entry leaves `sites.json` and its shots leave the working
tree, but every image stays in history — `git revert <sha>` brings the whole entry
back, shots included.

| Path | What happens |
|---|---|
| **Save to GitHub** (token stored) | One commit, `vault: remove <id>`, deleting the entry *and* its shots directory together. Uses the Git Data API, because the Contents API can only delete one file per commit. |
| **Download fallback** (no token) | `sites.json` downloads without the entry; you replace and commit. The shots directory stays behind until you run **`npm run prune`**. |

```bash
npm run prune              # list orphaned shot directories, change nothing
npm run prune -- --yes     # delete them, then commit
```

An orphaned directory is normal residue, not a fault — `npm run smoke` reports it as
a warning pointing at `prune`, and does not fail.

> The gallery has no backend on purpose. **Save to github** writes
> `vault/sites.json` through the Contents API using your own fine-grained PAT, held
> in that browser; `download json` remains the fallback. Either way git is the
> source of truth — edits held in `localStorage` are not real until they are in a
> commit.

### Tagging: one box, transparent sorting

The editor has a single tag field above the category checkboxes — both work. It
takes a comma-separated batch, an **ADD** button as well as Enter, and a category
selector defaulting to **AUTO**. Set the selector to a category and the tags go
straight there, bypassing classification — that is also how you correct a wrong
guess. It resets to AUTO after every add, and the field clears and refocuses so
several rounds flow without extra taps.

Sorting order, all of it visible in `vault/index.html`:

1. exact match in `vocab.json` → that category, instantly;
2. a stored dialect name → `dialects`, not tags;
3. already used as a free addition elsewhere → follow that precedent;
4. otherwise a **keyword/stem map shipped in the page** (`STEM_MAP`) scores each
   category; weights break real ambiguities, so `monochrome` goes to color rather
   than typography despite containing `mono`;
5. a tie or no match → `unsorted`, for a human.

**Vocabulary discipline.** A new tag lands on the **entry** immediately and is
marked *pending vocab* on its chip. It enters `vocab.json` only when a human
confirms it in the proposals bar — an auto-guess never silently becomes canon.
Unconfirmed tags still filter and display: they are real on their entries, just not
canonical yet. Confirming writes `vocab.json` alongside `sites.json` in one commit,
so it needs the online path.

### Stale-edit guard

A working copy in `localStorage` **never silently wins over a newer file.** On load
and again before every save, the gallery compares when the browser's edits were made
against when `vault/sites.json` last actually changed (the file's latest commit date,
falling back to `Last-Modified`). If the file is newer *and* the two disagree about
any entry, the gallery:

1. displays the **remote** version — canonical data wins the screen;
2. holds the browser copy rather than discarding it;
3. shows a bar naming the conflicting entries and both sets of values, with
   **keep my edits** / **take remote**.

Nothing is written or dropped without that choice, and a save in that state is
refused rather than merged.

**Why this exists.** A browser holding pre-review edits for `thegentlewoman-co-uk`
displayed `rating 3 / unreviewed` for some time after the human review had landed in
git as `rating 1 / out` — and a Save from that tab would have pushed the stale values
back over the reviewed ones. Git was never wrong; the browser was, silently. See the
distillation log below for the review itself.

---

## Worked example — a Design Read that uses the vault

The loop in [TASTE.md §6](../TASTE.md#6-vault-hook--the-vaultdesign-loop), run for a
hypothetical brief. This is the shape every agent's output should take.

**Brief:** *a landing page for a small architectural photography studio, aimed at
developers and architects commissioning shoots.*

```
Reading this as a studio landing page for professional commissioners,
leaning quiet-luxury.
Dialect: auction-editorial — the audience buys on evidence of craft, and the
work is photographic, which is what this dialect is built to frame.

Vault: queried imagery:*, composition:dominant-mass, layout:air, typography:editorial.
4 relevant references, 1 unusable for missing notes.
  · thegentlewoman-co-uk  (rating 1 / out) — anti-reference
  · rmsothebys-com        (rating 1 / out) — anti-reference
  · <studio-a>            (rating 3 / in)
  · <studio-b>            (rating 2 / in)
  · <studio-c>            — tags only, note is TODO

COMPOSITION READ (short form)
Artistic image:  a working studio seen mid-use — documentary, not staged
Major masses:    one full-bleed interior field at 7/12; one compact type mass in
                 the remaining 5/12; one deep quiet interval below both
Centres:         semantic = the space itself; optical = the corridor's vanishing
                 point; they coincide by choice, action deferred to the index
Dominance:       image dominates by area AND by convergence; the type mass is
                 subordinate, the credits plate is support
Direction:       the receding corridor leads down-right into the credits
Rhythm:          one event per screen; the interval below is the pause
Negative space:  the 5/12 column is a shape, not a gap; it carries the eyebrow
Tension:         the crop's compression, released by the deep field below
Edges:           image bleeds left and bottom, commits; text column clears fully
Responsive:      at 390px the corridor recrops to portrait; dominance moves from
                 isolation to scale, because isolation does not exist in a column
Diagnosis:       the mechanism depends on one exceptional photograph — flagged as
                 an unresolved dependency, not designed around yet
```

**How two notes produced two decisions**

1. **`rmsothebys-com` (anti-reference).** Its note records that the hero works —
   full-bleed night photography with the lot text in a translucent scrim, legibility
   fixed at the image layer — but that everything below collapses into repetitive
   card grids and metronomic cadence, with no sustained dominant-subordinate
   relationship after the hero.
   → **Decision:** take the scrim-over-photography treatment for the hero, and
   *reject* the card grid for the project index below it. The index becomes a
   hairline-ruled list with one oversized lead project, so the page keeps a dominant
   past the fold. The note supplied both halves: what to steal and what to avoid.

2. **`thegentlewoman-co-uk` (anti-reference).** Its note records genuine strength —
   a landing page three-quarters empty, where a single object reads as an object
   because nothing competes — alongside the verdict that the site fails as a whole:
   unresolved footer, an idea that never develops.
   → **Decision:** adopt the near-empty first viewport with one photograph as the
   sole object, and explicitly *plan the second and third sections* so the idea
   develops instead of stopping. The anti-reference set the requirement that the
   page must resolve, not just open well.

**Note the shape of it:** both usable references were rated **1 / out**. Anti-
references are not dead weight — a well-written note on a failed site is often more
actionable than praise, because it isolates the mechanism. And the one entry with a
`TODO` note contributed nothing but tags, which is exactly what §6(f) requires.

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

Then read projects/ — every record, front-matter and prose. Those are MY own
projects; vault/ is other people's work. The vault cannot detect that my work is
repeating itself, because self-similarity is only visible by comparing my projects
to each other. Run npm run projects:check and read what it reports.

Then read vault/sites.json and look at the shots for every entry added since
<DATE OF LAST RUN> (use the `added` field). Weight rating-3 entries heavily,
rating-2 lightly, and ignore rating-1 except as counter-evidence. Read the
judgement fields before the images — they are the claim, the shots are the
evidence for it. Note each entry's dialectStatus; treat `unreviewed` entries as
unclassified evidence, not as in-dialect.

Each entry carries up to three judgement fields, and all three are FIRST-CLASS
evidence — do not treat works/weaknesses as a footnote to note:

- `note`     — general reasoning.
- `works`    — itemised strengths. These are your PRINCIPLE CANDIDATES: a
               strength recurring across entries is what a new dialect principle
               or a sharpened rule is made of.
- `weaknesses` — itemised failures and near-failures. For an entry whose
               dialectStatus is `out`, THE WEAKNESSES ARE THE PAYLOAD — that is
               why the entry was kept at all. For an `in` entry, weaknesses are
               YIELDS-WHEN CANDIDATES: a rule that an admired reference had to
               break, or nearly broke, is a rule whose exit condition is
               probably too narrow.

Cite which field each pattern came from, so the evidence chain stays legible.

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

7. SELF-REPETITION — from projects/ and the register collisions reported by
   npm run projects:check: what is recurring across MY OWN projects that no
   brief asked for? Name the projects and the shared register. Distinguish a
   brand legitimately carried across two briefs from the house dialect that
   stopped yielding — and if you cannot tell, say so rather than guessing. A
   pattern that appears in the records but in no vault entry is not taste, it
   is a habit. Cross-check against each record's section 5: a habit the author
   already recorded as wrong is the strongest possible finding.

8. SUMMARY DRIFT — if any amendment is accepted, state the exact replacement
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

> This is the rule for dialects *distilled from the vault*, which is the norm. Alex
> may also author one directly ahead of evidence; that one is marked **provisional**
> and earns confirmation the other way round — ≥3 human-reviewed entries carrying it
> with `dialectStatus: "in"`. See [dialects/README.md](../dialects/README.md#status-confirmed-vs-provisional).
> An agent still may not create either kind.

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
| 2026-07-25 | `thegentlewoman-co-uk` | **First resolved case — rule upheld.** Counter-evidence dismissed; `color-taste` D2/D3 chroma rules stand unamended. See below. |
| — | — | Phase 2 shipped; no full distillation run yet. |

#### First resolved case — the loop, end to end

Worth keeping as the worked example of how a contradiction is supposed to die.

1. **Capture.** `thegentlewoman-co-uk` entered the vault with a note written partly
   from memory, claiming the site had "no accent colour anywhere".
2. **Evidence contradicted the note.** The captured shots showed a bright saturated
   turquoise used throughout. The note was corrected against the shots.
3. **Contradiction logged.** The corrected note argued the site broke
   [color-taste](../skills/color-taste/SKILL.md) D2 and D3 — high chroma, used *as*
   the identity — and worked anyway because it was the only colour in a monochrome
   world. Suggested the rules' real mechanism might be "one colour, ruthlessly"
   rather than "low chroma". Parked inline in `color-taste` for review; **not
   applied.**
4. **Human review.** Rated **1**, `dialectStatus` **out**: the cover composition is
   sound, the website is not — ugly desktop navigation, unresolved footer, an
   initial idea that never develops.
5. **Rule upheld.** The counter-evidence is withdrawn. **An attribute observed
   inside a failed composition does not amend a rule** — a single admired detail is
   not evidence when the whole fails. `color-taste` D2/D3 stand unamended; the
   inline note is replaced by a one-line dismissal record.

The transferable lesson: *isolate the attribute from the artefact's overall
quality before letting it change anything.* A rule may only be amended by
evidence that succeeds as a whole. This is also why `out` entries are kept rather
than deleted — the entry is now a useful anti-reference, and the dismissal is part
of the record.

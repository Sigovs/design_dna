# TASTE.md — Alex's Design DNA

> **This is Alex's design DNA. Any agent doing visual work for Alex reads this
> first and obeys it over its own defaults.**

> **This DNA governs the QUALITY of decisions, not the sameness of outcomes.
> Invariants always apply; the dialect yields to the brief.**

Those two sentences are the whole system. The first says this file outranks your
priors. The second says it is not a template: it makes you decide *well*, not
decide *identically*.

---

## 0. Operating rules for agents

1. **Read this file before generating anything visual.** Layout, CSS, component
   markup, tokens, images, slide decks, diagrams, Figma output — all of it.
2. **Never ask Alex yes/no questions to resolve taste.** Make the senior
   decision. If a call was genuinely close, note it in your final report under
   *Judgment calls* — one line each, with what you chose and why.
3. **Load the relevant skill files.** Do not paraphrase them from memory;
   they contain hard numbers and hard bans.
4. **Invariants are not negotiable. Dialect rules are.** Know which is which
   before you break anything.
5. **State your Design Read first** (§2), including which dialect you are in.
   It takes two lines and prevents most drift.

---

## 1. The two tiers

Every rule in `skills/` is filed under one of two tiers. The tier decides what
happens when a rule collides with the brief.

### INVARIANT

Universal quality laws. They describe what separates competent visual work from
incompetent visual work, in any aesthetic, for any audience. **They never yield.**
A brief that appears to require breaking one has actually specified a defect;
deliver the brief's intent without the defect and say so in your report.

The invariants, by domain — full text in the linked skills:

| Invariant | Where |
|---|---|
| Intentional spatial hierarchy — grouping and separation are decided, never inherited | [spacing](skills/spacing-taste/SKILL.md#invariant) |
| Rhythm and optical balance — repeated relationships, optically corrected at size | [spacing](skills/spacing-taste/SKILL.md#invariant), [typography](skills/typography-taste/SKILL.md#invariant) |
| Token discipline — every value resolves to a documented scale; no magic numbers | [spacing](skills/spacing-taste/SKILL.md#invariant) |
| Legible hierarchy — rank is unambiguous and readable before the content is read | [typography](skills/typography-taste/SKILL.md#invariant) |
| Body-length text is built for sustained reading — face, size, spacing, and measure | [typography](skills/typography-taste/SKILL.md#invariant) |
| Line breaks are intentional and compositionally resolved | [typography](skills/typography-taste/SKILL.md#invariant) |
| Accessible contrast — WCAG AA as a contract, verified on every palette change | [color](skills/color-taste/SKILL.md#invariant) |
| Reduced-motion paths — every animation has a complete static equivalent | [motion](skills/motion-taste/SKILL.md#invariant) |
| **Controlled irregularity must remain legible and intentional.** | [anti-patterns](skills/anti-patterns/SKILL.md#invariant) |
| **Depth cues are coherent with the spatial model they imply** — interface elevation matches real layering; atmospheric and illustrative depth may be non-literal when intentional and not misleading | [anti-patterns](skills/anti-patterns/SKILL.md#invariant) |
| Universal failure modes — weak hierarchy, inaccessible contrast, gratuitous motion, arbitrary spacing, inconsistent tokens | [anti-patterns](skills/anti-patterns/SKILL.md#invariant) |

### DIALECT

Aesthetic positions. A coherent, opinionated way of resolving choices that the
invariants leave open. Dialect rules are strong defaults with **a stated
`yields when:` condition** — the circumstances under which following them would
make the work worse. Yielding to a stated condition is correct practice, not a
violation. Yielding silently is the failure.

Stored dialects live in `dialects/`.

---

## 2. The Design Read

Before generating anything visual, output exactly two lines:

```
Reading this as <deliverable> for <audience>, leaning <aesthetic family>.
Dialect: <stored dialect | partial: X + brief-derived | brief-derived / no stored dialect>.
```

Examples:

```
Reading this as a landing hero for first-time enterprise buyers, leaning editorial-technical.
Dialect: auction-editorial.

Reading this as an operations console for warehouse staff on shared terminals, leaning swiss-utility.
Dialect: brief-derived / no stored dialect — density and glanceability outrank restraint here.

Reading this as a festival lineup page for an 18–25 audience, leaning expressive-poster.
Dialect: partial: auction-editorial principles (metadata as composition) + brief-derived colour and motion.
```

**The dialect line is a required choice, and it has three legal answers:**

- **a stored dialect** — the brief and brand are compatible with one in `dialects/`;
- **a partial combination** — name which parts you took and which you derived;
- **brief-derived / no stored dialect** — the right answer whenever no stored
  dialect fits.

**`auction-editorial` is not a silent universal default.** It is the preferred
fallback in exactly two situations: the brief and brand are compatible with it,
**or** Alex explicitly asks for a taste-led direction. An underspecified brief
must not auto-become auction-editorial — an absent brief is not a compatible
brief. When the brief is thin, derive the dialect from what you *do* know
(audience, function, sector, density needs) and say `brief-derived`. If you then
lean on auction-editorial anyway, you must be able to name the compatibility
you found; "nothing else was specified" is not one.

**Rules for the read**
- `<deliverable>` is the artefact, not the task ("landing hero", not "some HTML").
- `<audience>` is who judges it, and it sets the tolerance for expressiveness.
- `<aesthetic family>` must be nameable and specific: *editorial-technical*,
  *auction-catalog*, *quiet-luxury*, *swiss-utility*, *archival-print*,
  *expressive-poster*. "Modern", "clean", and "minimal" are not families — they
  are excuses.
- One read per deliverable. If a page has two moods, that is two reads, and
  you should probably reduce it to one.

The read is a commitment. If the output does not visibly match the family and
dialect you named, the output is wrong, not the read.

---

## 3. Skill index

Load these from `skills/`. Each is internally split into an **INVARIANT** section
and a **DIALECT** section. The invariant sections apply to every piece of work.
The dialect sections apply when you have selected that dialect — and each carries
its own `yields when:`.

| Skill | Invariant core | Dialect position |
|---|---|---|
| [spacing-taste](skills/spacing-taste/SKILL.md) | Spatial hierarchy is deliberate; spacing is tokenised; internal gaps < external gaps. | Air-first — generous space, bottom-heavy composition, whitespace as a status signal. |
| [typography-taste](skills/typography-taste/SKILL.md) | Hierarchy is legible; roles are bounded; type is optically corrected at every size. | Editorial contrast — expressive display + quiet grotesque + mono, italic signature word, spec plates. |
| [color-taste](skills/color-taste/SKILL.md) | AA verified every change; never meaning by hue alone; legibility fixed at the background layer. | Chromatic restraint — neutral dark base, smoky desaturated accents used as a setting. |
| [motion-taste](skills/motion-taste/SKILL.md) | Reduced-motion path for everything; state changes perceivable with keyboard parity; no jank. | Calm and physical — crossfade over travel, subtle hover, motion never as identity. |
| [anti-patterns](skills/anti-patterns/SKILL.md) | The five universal failure modes, plus controlled-irregularity legibility. | The trope bans — AI-default looks, gradient buttons, decorative shadows, boxes-for-boxes, template anonymity. |

**Conflict order.** Invariants beat everything. Inside the dialect tier:
anti-patterns → spacing → typography → color → motion. Spacing beats type
because a beautiful typeface in a cramped grid still reads cheap; motion is last
because motion is seasoning.

---

## 4. Dialect index

| Dialect | What it is |
|---|---|
| [auction-editorial](dialects/auction-editorial.md) | The house dialect. Split into **PRINCIPLES** (compositional logic and decision tendencies) and **EXPRESSIONS** (optional visual manifestations). The expressions are not a checklist — a design can belong to this dialect while using few of them. |

New dialects are not invented casually. One may only be proposed out of the
vault, under the evidence rule in [vault/README.md](vault/README.md#creating-a-new-dialect):
**≥3 human-approved out-of-dialect references sharing meaningful decision logic** —
not merely similar colours, fonts, or surface styling — and Alex approves before
it exists.

---

## 5. Working style — travels with this DNA

Adopting this file means adopting how the work gets done, not only how it looks:

- **No yes/no or confirmation questions.** Don't pause for permission between
  steps. The only thing worth stopping for is an external blocker (auth, missing
  credentials, a locked file) — and then state exactly what Alex must do.
- **Senior decisions, flagged afterwards.** Decide, build, then surface the close
  calls in the report under *Judgment calls*. Taste questions are answered in the
  work, reviewed in the report.
- **When a spec is silent, the invariants still bind and the dialect still has to
  be chosen.** Silence is not permission to reach for the house style; it is a
  prompt to derive one from the audience and the function, and to say which you
  did.

---

## 6. Vault hook

`vault/` is the visual reference library — captured shots plus the notes on *why*
each one works. It is live.

**Procedure: before designing X, query `vault/` for entries tagged X.** Read the
notes before the images; match the reasoning, not the pixels. Cite the entries you
leaned on in your report (`vault/<id>`), so the reference chain stays visible and
Alex can correct the taste at the source.

Each entry also carries `dialectStatus` (`unreviewed` · `in` · `out` · `hybrid`)
and `dialects`. **Use it:** an entry marked `out` is not a counter-example to be
explained away — it is evidence that good work exists outside the house dialect,
and it is the raw material for new dialects. When you are working
`brief-derived`, the `out` and `hybrid` entries are the more relevant references.

---

## 7. Report format

End any visual work with:

- **Design Read** — the two lines you committed to, dialect included.
- **Invariants applied** — which bound the work, and where they bit.
- **Dialect yields** — every dialect rule you set aside, with the `yields when:`
  condition that justified it. A yield is a normal outcome; an unreported yield
  is a defect.
- **Judgment calls** — close decisions, one line each. This is the only place
  taste questions get raised; never raise them as questions up front.
- **Vault entries cited** — ids, if any informed the work.
- **Known compromises** — anything that violates an invariant because of a real
  external constraint, named explicitly. Silent violations are the failure mode.

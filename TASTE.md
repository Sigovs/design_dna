# TASTE.md — Alex's Design DNA

> **This is Alex's design DNA. Any agent doing visual work for Alex reads this
> first and obeys it over its own defaults.**

This file is not a style guide to consult when convenient. It is a constraint
set. Where this document and your training priors disagree, this document wins.
Where this document is silent, choose the option that is quieter, more spacious,
and less templated.

---

## 0. Operating rules for agents

1. **Read this file before generating anything visual.** Layout, CSS, component
   markup, tokens, images, slide decks, diagrams, Figma output — all of it.
2. **Never ask Alex yes/no questions to resolve taste.** Make the senior
   decision. If a call was genuinely close, note it in your final report under
   *Judgment calls* — one line each, with what you chose and why.
3. **Load the relevant skill files.** Do not paraphrase them from memory;
   they contain hard numbers and hard bans.
4. **Anti-patterns are bans, not preferences.** If you catch yourself shipping
   one, stop and re-solve the problem.
5. **State your Design Read first** (below). It takes one line and prevents
   most drift.

---

## 1. The Design Read

Before generating anything visual, output exactly one line:

```
Reading this as <deliverable> for <audience>, leaning <aesthetic family>.
```

Examples:

```
Reading this as a landing hero for first-time enterprise buyers, leaning editorial-technical.
Reading this as a data plate for internal operators, leaning auction-catalog.
Reading this as a pitch deck for investors, leaning quiet-luxury.
```

Then check that read against the skills below and let it drive the concrete
choices — type pairing, spacing step, whether accent colour appears at all.
The Design Read is a commitment: if the output does not visibly match the
aesthetic family you named, the output is wrong, not the read.

**Rules for the read**
- `<deliverable>` is the artefact, not the task ("landing hero", not "some HTML").
- `<audience>` is who judges it, and it sets the tolerance for expressiveness.
- `<aesthetic family>` must be nameable and specific: *editorial-technical*,
  *auction-catalog*, *quiet-luxury*, *swiss-utility*, *archival-print*.
  "Modern", "clean", and "minimal" are not families — they are excuses.
- One read per deliverable. If a page has two moods, that is two reads, and
  you should probably reduce it to one.

---

## 2. Skill index

Load these from `skills/`. Each is authoritative in its domain.

| Skill | One-line position |
|---|---|
| [spacing-taste](skills/spacing-taste/SKILL.md) | Air is the default and cramped is a bug — when in doubt, take one spacing step more. |
| [typography-taste](skills/typography-taste/SKILL.md) | Editorial contrast: expressive display face + quiet grotesque body + mono for data, with one italic accent word as the signature. |
| [color-taste](skills/color-taste/SKILL.md) | Premium is chromatic restraint — neutral base, smoky tones, accent as a setting rather than an identity. |
| [motion-taste](skills/motion-taste/SKILL.md) | Calm and physical — crossfade over whoosh, four durations, and a static path for every animation. |
| [anti-patterns](skills/anti-patterns/SKILL.md) | The hard bans: AI-default looks, gradient buttons, decorative shadows, boxes where air would do, template-anything. |

Conflict order when two skills disagree: **anti-patterns → spacing → typography
→ color → motion.** Spacing beats type because a beautiful typeface in a cramped
grid still reads cheap; motion is last because motion is seasoning.

---

## 3. Vault hook (activates in phase 2)

`vault/` is the visual reference library — captured screenshots and stills with
tags, plus the notes on *why* each one works.

**Procedure, once populated:** before designing X, query `vault/` for entries
tagged X. Read the notes before the images; match the reasoning, not the pixels.
Cite the entries you leaned on in your report (`vault/<id>`), so the reference
chain stays visible and Alex can correct the taste at the source.

Until phase 2 lands, `vault/` is a stub — skip the query, and if a reference
would genuinely have changed your decision, say so in your report so it becomes
a capture target.

---

## 4. Report format

End any visual work with:

- **Design Read** — the line you committed to.
- **Skills applied** — which files, and the specific rules that bit.
- **Judgment calls** — close decisions, one line each. This is the only place
  taste questions get raised; never raise them as questions up front.
- **Known compromises** — anything that violates this DNA because of a real
  external constraint, named explicitly. Silent violations are the failure mode.

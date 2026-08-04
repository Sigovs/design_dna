---
project:      hinderer
client:       Hinderer
date:         not recorded
mandate:      not recorded
carried:      not recorded
delivery:     not recorded
style_mode:   not recorded
dialect:      not recorded
anchor:       not recorded
contrast:     not recorded
signature:    not recorded
dialect_fit:  not recorded
suspended:    not recorded
role:         not recorded
register:
  ground:     warm near-black #1f1d19
  display:    Degular
  accent:     bronze #a86537
  image:      mixed
outcome:      not recorded
---

> **Reconstructed 2026-08-04, from the build only.** Every field above was read out
> of the code; everything unreadable is `not recorded` rather than guessed.

## 1. The brief in my own words

not recorded.

## 2. Task and means

- **Task:** find a vehicle and open it. Read from the page set: `index` ·
  `inventory` · `vehicle`, plus a `DS.html` design-system page.
- **Means:** not recorded. One thing is on record from the session that built it:
  the inventory filter panel was made to clear the fold on every screen, sized by
  arithmetic across four stacked elements rather than by eye, with the labels that
  repeat what their control already says dropped to `sr-only` below 928px.

## 3. Decisions

not recorded, with one exception carried from the build log:

- decided: the filter panel fits inside the fold at 1440×900 and 1366×768 |
  rejected: an internal scroll inside the panel | why: a panel that scrolls inside
  a page that also scrolls gives the visitor two transports for one task, and the
  smaller screen is where that costs the most — it strengthened usability.

## 3b. Exploration, if one ran

not recorded.

## 4. Environment knowledge

- **Build-free**, no `package.json`. Four HTML pages, one JS file, five CSS files,
  `tokens.css` carrying 112 custom properties — the second-densest token layer in
  the corpus.
- **Three type roles:** `--font-display` Degular, `--font-serif` Playfair Display,
  `--font-body` Inter Tight. Degular is not a Google font; the fallback chain runs
  Hanken Grotesk → Inter Tight, so the display rank degrades to the body face on
  any machine without the licensed file. Worth checking before assuming the
  headline register survives.
- Deployed to GitHub Pages — the preview is `sigovs.github.io/HINDERER/`, and a
  push takes about a minute to appear.

## 5. What turned out wrong

not recorded.

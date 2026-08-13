---
project:      prestige-final
client:       Prestige
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
  ground:     light neutral #F4F4F4
  display:    Plus Jakarta Sans
  accent:     not recorded
  image:      mixed
  hero:       image-led
  symmetry:   asymmetric
  density:    measured
  voices:     2
  motion:     choreographed
outcome:      not recorded
---

> **Reconstructed 2026-08-04, from the build only.** Written long after the fact
> and only because `projects/` held one record, which left `projects:check`
> comparing nothing. Every field above was read out of the code. Everything that
> could not be read is `not recorded` rather than guessed — a guessed field
> corrupts the corpus this record exists to populate.

## 1. The brief in my own words

not recorded — no brief survives in the repository and none is reconstructed here.

The one thing on record is external: a later client named this site as the bar to
beat — *"prestige is the benchmark and it needs to be better than that site."*
That is a fact about how the work was received, not about what was asked for.

## 2. Task and means

- **Task:** find a car and reach the dealership. Read from the page set:
  `index` · `srp` · `vdp` · `service` · `about_our_dealership` · `our_story` ·
  `contact`, plus a `design` page carrying the system.
- **Means:** not recorded. Which element serves which step was not written down at
  the time and is not inferred now.

## 3. Decisions

not recorded. Decisions and their rejected alternatives were not captured, and a
decision reconstructed from its outcome is not a decision — it is a description.

## 3b. Exploration, if one ran

not recorded.

*Register provenance — `hero`, `symmetry`, `density` and `motion` were read off the
built homepage (served locally, scrolled to fire every reveal) on 2026-08-13 rather
than stated by Alex, at his instruction. `motion` is the one judgement call: the page
reveals section content sequentially on scroll through an IntersectionObserver, which
was read as choreography rather than as restraint. Everything else on this record
still reads `not recorded`.*

## 4. Environment knowledge

- **Build-free.** No `package.json`, no toolchain. Eight HTML pages, five CSS
  files, a `tokens.css` carrying 27 custom properties, four JS files. Open the
  file and look at it.
- **GSAP is the only external library**, loaded by `<script src>`; nothing else
  is pulled in.
- The system keeps a `design.html` page in the build — the token sheet ships
  alongside the site rather than living in a separate document.
- **Register note:** no accent token exists. The palette is neutral only — ground,
  three greys, three ink steps. Whatever contrast the pages carry comes from
  photography and type weight, not from a colour.

## 5. What turned out wrong

not recorded.

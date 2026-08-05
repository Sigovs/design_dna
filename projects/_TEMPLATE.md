---
project:      <slug — must match the filename>
client:       <name or "self">
date:         <yyyy-mm-dd of the close or the direction lock>
mandate:      REBRAND | REDESIGN | REFRESH
carried:      [<named elements>]          # [] for REBRAND
delivery:     EXPLORE | BUILD | not recorded
style_mode:   HYBRID | PURE | DIRECTED HYBRID | not recorded
dialect:      [<names from dialects/README.md>]   # anchor first
anchor:       <dialect name, or not recorded>
contrast:     <dialect name · n/a under PURE · not recorded>
signature:    <dialect name + its one job · n/a · not recorded>
dialect_fit:  full | partial | override
suspended:    [<dialect expressions switched off>]
role:         MAIN | SUPPORT | ABSENT      # dimensionality ladder
register:                                   # for self-similarity checks
  # Open fields — written as prose, never compared for equality.
  ground:     <background colour>
  display:    <display typeface family>
  accent:     <accent colour>
  # Enumerated fields — ONE of the listed values, or "not recorded".
  # These are compared, so a value outside the list is a malformed record.
  # They exist because TASTE.md §2d requires three EXPLORE directions to differ
  # structurally, and until now the only structure this file recorded was a
  # colour, a typeface and one image habit.
  image:      contained | bleed | mixed
  hero:       image-led | type-led | object-led | split | index | none
  symmetry:   symmetric | asymmetric | centred
  density:    sparse | measured | dense
  voices:     1 | 2 | 3+                    # distinct typographic voices (I8)
  motion:     absent | restrained | choreographed
outcome:      shipped | abandoned | superseded
---

<!-- Anything unknown is "not recorded". Never guess: a guessed field corrupts the
     corpus that projects:check depends on. All five sections are required. -->

## 1. The brief in my own words

Not the client's words. What they asked for, restated as what it actually is —
including the part they did not say out loud.

## 2. Task and means

What the visitor came to do, in plain words, and the specific means serving it
with where each one lives. Written down here rather than in the report, so
[C14](../skills/academic-composition/SKILL.md#invariant) stays checkable after
the fact — by then the page has changed and memory has not kept the list.

- **Task:**
- **Means:**

## 3. Decisions

One line each. The rejected option is the informative half — a decision with
nothing rejected was not a decision. `why:` states the **specific intended
effect** and which of concept / character / hierarchy / usability it strengthened
([TASTE.md §2c](../TASTE.md#2c-selection-coherence-and-device-discipline)) — a
style name is not an effect.

- decided: … | rejected: … | why: …

## 3b. Exploration, if one ran

Only when the project went through [EXPLORE](../TASTE.md#2d-explore--three-directions-before-one-is-chosen).
**These stay project-local:** a rejected direction is not negative taste evidence,
and nothing here reaches the vault unless Alex says it is a broader preference.

- **Selected:** <direction, and what decided it>
- **Rejected:** <the others, one line each — what they lost on, not what was wrong with them>
- **Combined:** <parts Alex asked to carry across, or n/a>
- **Marked as a general preference:** <what Alex said travels beyond this project, or none>

## 4. Environment knowledge

Things learned by hand that no documentation states. Build quirks, platform
behaviour, the thing that cost an hour and would cost an hour again. Write it even
if it feels too specific to matter — especially then.

## 5. What turned out wrong

Written after the fact, honestly. What the client pushed back on, what broke in
use, what I would not repeat, what I got away with.

**An empty section 5 is an incomplete record, not a clean one.**

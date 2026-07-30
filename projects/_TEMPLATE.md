---
project:      <slug — must match the filename>
client:       <name or "self">
date:         <yyyy-mm-dd of the close or the direction lock>
mandate:      REBRAND | REDESIGN | REFRESH
carried:      [<named elements>]          # [] for REBRAND
dialect:      [<declared dialects>]
dialect_fit:  full | partial | override
suspended:    [<dialect expressions switched off>]
role:         MAIN | SUPPORT | ABSENT      # dimensionality ladder
register:                                   # for self-similarity checks
  ground:     <background colour>
  display:    <display typeface family>
  accent:     <accent colour>
  image:      contained | bleed | mixed
outcome:      shipped | abandoned | superseded
---

<!-- Anything unknown is "not recorded". Never guess: a guessed field corrupts the
     corpus that projects:check depends on. All five sections are required. -->

## 1. The brief in my own words

Not the client's words. What they asked for, restated as what it actually is —
including the part they did not say out loud.

## 2. Task and means

What the visitor came to do, in plain words, and the specific means serving it
with where each one lives. Same shape as `TASK:` / `MEANS:` in the response
contract, so [C14](../skills/academic-composition/SKILL.md#invariant) stays
checkable after the fact.

- **Task:**
- **Means:**

## 3. Decisions

One line each. The rejected option is the informative half — a decision with
nothing rejected was not a decision. `why:` states the **specific intended
effect** and which of concept / character / hierarchy / usability it strengthened
([TASTE.md §2c](../TASTE.md#2c-selection-coherence-and-device-discipline)) — a
style name is not an effect.

- decided: … | rejected: … | why: …

## 4. Environment knowledge

Things learned by hand that no documentation states. Build quirks, platform
behaviour, the thing that cost an hour and would cost an hour again. Write it even
if it feels too specific to matter — especially then.

## 5. What turned out wrong

Written after the fact, honestly. What the client pushed back on, what broke in
use, what I would not repeat, what I got away with.

**An empty section 5 is an incomplete record, not a clean one.**

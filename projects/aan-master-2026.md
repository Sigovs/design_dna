---
project:      aan-master-2026
client:       not recorded
date:         2026-07-28
mandate:      not recorded
carried:      [not recorded]
dialect:      [not recorded]
dialect_fit:  not recorded
suspended:    [not recorded]
role:         not recorded
register:
  ground:     not recorded
  display:    not recorded
  accent:     not recorded
  image:      not recorded
outcome:      not recorded
---

<!-- Reconstructed after the fact, on 2026-07-28, from what this repository
     actually contains. AAN appears nowhere in 202 commits and in no file; the
     only trace is a single instruction that design_dna must NOT import tokens
     from it. Everything not evidenced is "not recorded" rather than guessed.
     This record is thin on purpose, and its thinness is the argument the
     projects/README makes about writing at close. -->

## 1. The brief in my own words

**Not recorded.** No brief, scope or deliverable for AAN survives in this
repository. What is recorded is one boundary decision *about* AAN, taken while
scoping the taste vault's token layer: AAN is a separate project with its own
context, and design_dna does not inherit from it.

## 2. Task and means

**Not recorded.** No visitor, task or means for AAN was ever written down.

This absence is itself the finding. `TASK:` and `MEANS:` became required fields in
the response contract *because* they kept going unrecorded — and when they are
unrecorded, the means are the thing that disappears. The logged case behind
[C14](../skills/academic-composition/SKILL.md#invariant) is exactly this: a
make/model inventory search specified, then absent from five consecutive runs,
each time lost to a legitimate-sounding compositional move.

## 3. Decisions

Only one decision involving AAN is evidenced in this repository. It was made
during the Phase A token-scope declaration for the vault, not during AAN work.

- decided: design_dna's token layer lives inside `vault/index.html` as a compact
  `:root` block | rejected: importing tokens from AAN, or standing up a shared
  design-system project | why: this tool has its own context, and an external token
  source adds coupling with no consumer

Every other decision on AAN — mandate, dialect, register, what was carried, what
was suspended — **is not recorded.** It cannot be reconstructed from here without
inventing it.

## 4. Environment knowledge

One piece of environment knowledge is preserved, recorded verbatim from the
instruction that created this file. **Its originating project is not recorded** —
it is kept here because it was supplied as the archetype of knowledge that
evaporates, and losing it again would prove the point:

> Overriding kit tokens in a custom layer does not recolour an already-compiled
> `style.css` — discovered by hand, would be rediscovered by hand next time.

The general shape, worth carrying: **a token override only reaches what is compiled
after it.** Anything already built into a shipped stylesheet is past the point where
a variable can reach it, so the override appears to do nothing and the next person
concludes the token is broken.

## 5. What turned out wrong

**The record itself.** It was written after the project rather than at its close,
and by then almost nothing could be recovered — thirteen of fifteen front-matter
fields are `not recorded`, including the entire `register` block, which is the one
part `projects:check` actually reads. This record therefore **cannot participate in
the self-similarity check at all.** It is a corpus entry that adds nothing to the
corpus.

That is the concrete cost of writing late, and it is worth stating plainly: the
week in which four clients came out looking like one studio is exactly the week
this record would have detected, had its register been filled in at the time. The
instrument existed too late to see the thing it was built for.

Second, smaller: the environment knowledge in section 4 survives only because it
was quoted in a later instruction. It was never written down when it was learned.
It cost an hour once and was one paraphrase away from costing an hour again.

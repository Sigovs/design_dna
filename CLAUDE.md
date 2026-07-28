# CLAUDE.md — working style for this repo

## Autonomy

**Never ask yes/no or confirmation questions. Never pause for permission between
steps.** Make senior-level decisions and continue. Flag judgment calls in the
final report only — not as questions mid-task.

**Sole exception: external blockers** (auth failures, locked files, missing
credentials, a remote that doesn't exist yet). Stop and state exactly what the
user must do — the specific action, not a general problem description. Everything
that is a taste or implementation decision is yours to make.

## Git hygiene

**Never blind `git add -A` — stage explicitly or review `git status` before
staging.** A sweep-everything stage will commit files you did not write and have
not read: exports dropped into the tree by another session, scratch files, local
config. This has already happened once in this repo (`vault/shots/f1_redbull.json`
was committed blind, then had to be recovered and untracked).

Stage the paths you actually changed. If you do use `-A`, run `git status` first
and account for every line.

## Consistency

**Every change to `skills/`, `dialects/`, or `TASTE.md` must keep the five-line
taste summary in `README.md` in sync.** That summary is the human's
drift-detection surface — if it stops describing what the rules actually say, the
whole system silently decays. Treat it as part of the same edit, not a follow-up.

Related: `TASTE.md`'s skill-index and dialect-index one-liners must match the
files they point at, and the working-style clause in `TASTE.md` §5 mirrors the
autonomy rules above — change one, change both.

**Tier discipline.** Every rule in `skills/` sits under `## INVARIANT` or
`## DIALECT`. A new dialect rule without a `yields when:` is incomplete. Never
move a rule between tiers as a side effect of another edit — a tier change is its
own decision and needs its own argument in the commit.

**Declarations before techniques.** The Design Read outputs four lines —
deliverable/audience/family, **mandate** (REBRAND / REDESIGN / REFRESH), **dialect**,
and **dimensionality role** (MAIN / SUPPORT / ABSENT). Each is declared before the
thing it governs: the mandate before the dialect, because a dialect executes an
identity and never substitutes for one; the role before any technique and before
the Composition Read, because it decides what the composition is made of.

**An unstated mandate defaults to REDESIGN, never to invention.** Under REDESIGN,
list what carries through untouched before designing anything, and close the report
with "would a regular visitor recognise this as the same brand?" answered with the
named carriers as evidence. Promoting SUPPORT → MAIN mid-project requires re-running
the Design Read; demotion never does.

**Rule identifiers are namespaced when they would collide.** `D#` already means a
DIALECT rule in every skill, so `dimensionality` uses `DM1`–`DM10` for its
invariants. A new skill whose natural prefix already means something else picks a
distinct one rather than overloading it.

**Any dialect rule with an invariant core names its floor by identifier**, and its
`yields when:` may never breach that floor. The convention and its reference example
are in `TASTE.md` §1.

**A tool is never a direction.** Three.js, Spline, GSAP and their kin are
implementation notes, recorded beside the build in the report. **A library name is
never an aesthetic family name** — that rule lives in the Design Read procedure in
`TASTE.md` §2, not in `anti-patterns`, because it is a process error rather than an
aesthetic trope. The tool notes in `skills/dimensionality` are explicitly
non-normative; never cite them as a reason.

## Response contract

**Every response ends with a DECISIONS block. No exceptions.** It opens with four
required fields:

```
MANDATE: REBRAND | REDESIGN | REFRESH
CARRIED: <named elements, or n/a for REBRAND>
TASK:    <what the visitor arrived to do — plain words>
MEANS:   <the specific means serving it, and where each one is>

DECISIONS
- decided: <what you chose> | rejected: <what you didn't> | why: <one line>
- ...
BLOCKERS: none | <the exact action the user must take>
```

**A response missing any of the four fields is incomplete.** `MANDATE` and
`CARRIED` mirror the Design Read declaration in `TASTE.md` §2. `TASK` and `MEANS`
make [C14](skills/academic-composition/SKILL.md#invariant) checkable without
re-reading the page: a means you never named is a means you will lose to the next
good compositional argument.

For work with no visitor-facing surface — a refactor, a rule change, a data
migration — `TASK` and `MEANS` describe the operator and the controls the change
touches, and `MANDATE`/`CARRIED` describe what of the existing system is fixed.
The fields are never omitted; they are answered at the altitude of the work.

**A question to the user is only valid inside `BLOCKERS`**, and only for external
blockers — auth, missing credentials, absent files. Everything else is a decision
you make and log above.

> **Why the contract carries these and not only the procedure.** Procedures fade
> over a long session: the Composition Read and the critique panel both went unrun
> for a week, while the report contract held from the first run. Rules that must
> survive belong in the contract, not only in the procedure.

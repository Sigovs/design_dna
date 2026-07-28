# projects/

Records of **my own** work. One file per project, written at close.

## Why this exists

> The vault holds other designers' sites. It is structurally incapable of
> detecting that MY work is repeating itself, because self-similarity is only
> visible by comparing my own projects to each other, and no such corpus exists.
> Across five briefs in one week the house dialect stopped yielding and four
> different clients came out looking like one studio — and nothing in the system
> could see it. Project records are that instrument. Second purpose: environment
> knowledge learned by hand evaporates (e.g. overriding kit tokens in a custom
> layer does not recolour an already-compiled style.css — discovered by hand,
> would be rediscovered by hand next time).

Two instruments, two directions. `vault/` looks outward at work worth learning
from. `projects/` looks inward at work already done, so the system can see its own
drift. Neither can do the other's job.

## When to write

**At project close, or at a direction lock. Never continuously.**

A record that must be maintained will not be, and this repo already has the
evidence: two vault entries sat on `TODO` notes for days while everything around
them was rewritten several times over. A record written once, after the fact, with
section 5 filled in honestly, is worth more than five kept half-current.

A record written late is still worth writing — see
[aan-master-2026](aan-master-2026.md), reconstructed after the fact, where most
fields could not be recovered. That record is thin, and its thinness is the
argument for writing at close.

## Structure

```
projects/
  README.md          this file
  _TEMPLATE.md       copy it, fill it, delete nothing
  <project-slug>.md  one per project
  check.mjs          the self-similarity check
```

Each record opens with machine-readable front-matter, then five prose sections.
The front-matter is what `projects:check` reads; the prose is what a human and an
agent read. Both matter — the front-matter catches repetition, the prose explains
it.

### Front-matter fields

| Field | Meaning |
|---|---|
| `project` | slug, matching the filename |
| `client` | name, or `self` |
| `date` | `yyyy-mm-dd` of the close or the lock |
| `mandate` | `REBRAND` / `REDESIGN` / `REFRESH` — as declared in the Design Read |
| `carried` | named elements that carried through untouched (`[]` for REBRAND) |
| `dialect` | the declared dialects |
| `dialect_fit` | `full` / `partial` / `override` |
| `suspended` | dialect expressions deliberately switched off |
| `role` | `MAIN` / `SUPPORT` / `ABSENT` — the dimensionality ladder |
| `register` | `ground`, `display`, `accent`, `image` — **the self-similarity surface** |
| `outcome` | `shipped` / `abandoned` / `superseded` |

`register` exists for one purpose: to make repetition machine-visible. It records
what the work *looked like* at the level where sameness shows — the background,
the display face, the accent, and whether imagery was contained, bleeding, or
mixed.

Anything unknown is written **`not recorded`**, never guessed. A guessed field
corrupts the corpus the check depends on.

### Prose sections — all five required

1. **The brief in my own words** — not the client's. What they asked for, restated
   as what it actually is.
2. **Task and means** — what the visitor came to do, and what serves it.
   Mirrors `TASK:` / `MEANS:` in the response contract and makes
   [C14](../skills/academic-composition/SKILL.md#invariant) checkable later.
3. **Decisions** — chose / rejected / why, one line each.
4. **Environment knowledge** — things learned by hand that no documentation
   states. The kit-tokens example above is the archetype: true, costly to
   discover, written nowhere.
5. **What turned out wrong** — written after the fact, honestly.
   **A record with an empty section 5 is incomplete, not clean.**

## The self-similarity check

```bash
npm run projects:check
```

Reads every record's `register` block and reports collisions: any two projects
sharing **ground + display + image treatment** are flagged as a possible dialect
collapse, with both slugs named.

**It reports, it does not judge.** Two projects may legitimately share a register —
a client's own brand carried across two briefs is not drift. The check cannot tell
the difference, and does not try. It puts the pair in front of a human, which is
the whole job: nothing in the system could see this before.

## How this feeds distillation

The weekly ritual in [vault/README.md](../vault/README.md#the-weekly-distillation-ritual)
now reads `projects/` alongside `vault/`. The vault answers *what is worth
learning from*; the records answer *what have I actually been doing* — and a
pattern that appears in the records but in no vault entry is not taste, it is a
habit.

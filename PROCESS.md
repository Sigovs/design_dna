# PROCESS.md — how a project actually runs

`TASTE.md` says what good looks like. This file says how a project gets from an
empty folder to a client review, in the order Alex actually works.

> **Written from the real process, not an ideal one.** It was described on
> 2026-08-31 and is recorded here because two of its steps live only in Alex's head
> and are therefore skipped under pressure. A step that depends on remembering is
> not a process step; it is a hope.

---

## The order, and why it is hero-first

Alex starts with the hero and extracts the design system from it afterwards. That
looks backwards against `DNA1` — *no markup before the concept exists in writing* —
and it is not. The position is already written down, on an in-house build:

> **Extracted from the hero. Not invented for it.**
>
> The hero is the only screen this brand has built, so it is the only evidence the
> system has. Every token is either a value the hero already proved, or is marked
> `AUTHORED` with the job it does.

**The principle travels; that build does not.** It is work in progress, not a
reference — no project in WORK is the template, and this file names none.

That is a stronger position than inventing a palette in the abstract and discovering
in the hero that it does not hold. **The concept still gets written before markup.
What is deferred is the token layer, not the thinking.**

So: hero first, tokens extracted, and the extraction is not optional.

---

## 1 · The folder

`~/Desktop/WORK/<CLIENT>` on either machine. One folder per client, and **Claude is
always opened from that folder** — never from a subfolder. A session started one
level down gets its own empty memory and cannot see what the folder above knows.
Prestige has six separate memories for this reason.

## 2 · Scaffold

```sh
cd ~/Desktop/WORK/design_dna
npm run setup -- "../<CLIENT>" "<Client Name>"
```

Writes `CLAUDE.md`, `BRIEF.md` and `.gitignore`. Never overwrites. It copies no rule
file — the project reads the live `TASTE.md`, so it cannot drift from a snapshot.

**Then git, immediately:**

```sh
cd ~/Desktop/WORK/<CLIENT> && git init && git add . && git commit -m "scaffold"
```

Not at the end. Git is the only thing that crosses to the other machine, and 126 of
the 155 folders in WORK have no repository at all.

## 3 · Material and the Design Read

Reference sites, client photos, a brief — **usually some of it, sometimes none.**
That is normal and it is not a blocker.

- Material exists → run `brand-extractor` first. It returns the token layer, a
  provenance ledger, and the gap list. **The gap list is the useful half:** it says
  what you are inventing rather than inheriting.
- Nothing exists → say so in `BRIEF.md` and derive the direction from audience,
  sector and function. `TASTE.md` §2: an absent brief is not a compatible brief, and
  it never auto-becomes `auction-editorial`.

Either way the Design Read's four lines get written before markup. Four lines is not
a ceremony; it is the difference between a decision and a default.

## 4 · The hero — and the motion decision that has to happen here

Build the hero. This is where the concept becomes visible and it is the right place
to start.

**The motion role is declared now, not later.** `MJ1` requires a declared role before
any effect, and the reason it belongs in this step is practical: Alex wants strong
animation in every build and it is the thing that gets cut when time runs out.
Motion decided at the end is motion that never happens. Decided here, with a scroll
budget (`DNA38`), it survives — or it is honestly ABSENT and nobody pretends
otherwise.

Load `scroll-site` when the build is scroll-led or cinematic. It carries the concept
gate and refuses to let markup start before the concept artefact exists.

## 5 · Extract the design system — the step that gets skipped

**As soon as the hero holds, before any second section.**

This is the one that is forgotten most, and skipping it is expensive in a specific
way: every later section re-decides colour, type and spacing from scratch, and the
page arrives at competing art directions one defensible section at a time — which is
`U15`, section-as-microsite.

What "extracted" means:

- `tokens.css` — every value the system has. Each token is either **proved by the
  hero** or marked `AUTHORED` with the job it does. Nothing below it introduces a
  raw number.
- `ds.html` — the system, visible. **Contrast figures computed in the browser from
  the live tokens at load**, so they cannot drift from the CSS. A pair that drops
  below its threshold turns orange there before it reaches a visitor.
- The hero's own CSS owns one composition and nothing else. Delete it and the site
  still works.

```sh
npm run extract-ds -- "<path to the built page>"
```

Reads the **rendered** page rather than the stylesheet — computed values are what the
visitor got, after the cascade and after the framework's defaults won an argument
nobody watched. It writes `tokens.draft.css` with a use count against every value,
and a `ds.html` that computes its contrast figures in the browser from the live
tokens, so they cannot drift from the CSS.

**The findings are the larger half of the output**, and they are things no source
read would show: two inks the eye cannot tell apart, five type ranks one pixel apart
that are one rank wearing five sizes, a price at 2.16:1 over its own ground.

The draft is a proposal. Naming a token, choosing the scale, and marking a value
`AUTHORED` with the job it does stay judgement.

## 6 · The rest of the sections

Every later section is built **against the tokens**, never beside them. Before
designing one, read the page as a whole and the sections either side of it — the
page is the composition and a section is a local event inside it (`C21`, and the
PAGE-AS-OBJECT rule in `skills/design-dna`).

## 7 · Review, then hand over

`design-critic` before the client sees it — a different agent than the one that
built it, because a builder reviewing its own page re-runs the reasoning that made
the defect. It runs the Critique Panel and the gate chain, measures rather than
looks, and never edits.

Handing to AAN developers is a **separate step with its own tool**:
`aan-dealer-mockups`, invoked by name. It decides the stack the result ships in and
has no opinion about design.

## 8 · Close the record

```sh
npm run corrections -- "~/Desktop/WORK/<CLIENT>"
```

Then `project-recorder` writes the record into `projects/`. This is what lets the
system see Alex's own work repeating itself — the vault is structurally blind to it.
Eight records exist against ~155 project folders, so this step is currently theory.

---

## The stack question, answered honestly

Alex prefers Tailwind and builds in Bootstrap. That is not indecision — it is a
constraint that only applies to some projects:

| Where it ships | Stack | Why |
|---|---|---|
| AAN developers build it | **Bootstrap 4.0.0** + the AAN theme kit | Their environment. A mockup in anything else costs them a translation. |
| Static site, Alex ships it | **Tailwind**, or whatever suits | No handoff constraint exists, so the preference wins |

The question to ask at step 2 is *who builds the production version*. Answer that and
the stack is decided, not argued.

## Two machines

Git is the sync for projects. Google Drive is the sync for `_OPS` and the documents
archive. **One folder, one mechanism, never both** — a git repo inside a Drive folder
corrupts silently.

Do not run sessions on the same project from both machines at once. Memory is local
to each machine and will diverge, and a session left waiting on the other machine
blocks there rather than here.

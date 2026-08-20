---
name: content-provenance
description: Standing discipline for every factual claim that ships — seven invariants (CP1–CP7) binding prices, counts, dates, durations, guarantees, coverage and superlatives on any page, in any dialect. Covers the ledger existing before the claim is typed, coverage rather than validity as the mechanism, what may never be a source, placeholders that are visibly placeholders, dated figures carrying their date in the render, promises the client has to honour, and the ban on inventing plausible numbers to fill a composition. Use before writing any number or promise into a layout, and when auditing content whose origin is unclear.
---

# Content Provenance

**This skill governs claims, not copy.** A claim is anything a reader could hold the
business to: a price, a count, a date, a duration, a guarantee, a coverage area, a
fee structure, a superlative. Tone, headline and rhythm are elsewhere. This is only
about whether the things the page asserts are true, and whether anyone checked.

**Why this exists as a standing rule.** A homepage was delivered with four asking
prices — $2,900,212, $1,600,212, $1,100,212, $900,212 — invented to look like the
real ones, alongside "Same-day", "no listing fees", "no commissions", "Zero-risk",
"within two business days", "factory warranty" and "the best". Every gate passed.
Not one of those claims was recorded as false, because not one of them was recorded
at all. The composition needed a price-shaped object in a slot, and a price-shaped
object arrived.

That is the failure mode this exists for, and it is not a copywriting failure. It is
a **composition** failure: the layout demanded content of a certain shape, and shape
was supplied without substance. It is [C17](../academic-composition/SKILL.md#invariant)
— a composition that has not declared what it depends on has not been designed —
applied to text instead of imagery, and it is the exact sibling of
[GI1](../generated-imagery/SKILL.md#invariant).

The frozen evidence is `projects/fixtures/cmc-index3-conventional`.

---

## INVARIANT

Seven rules. They bind whatever dialect was selected, including
`brief-derived / no stored dialect`, and they bind private concept builds as well
as production ones — see CP5.

### CP1 — The ledger exists before the claim is typed

Every project that displays a claim has a **content ledger**: one entry per claim,
recorded before that claim reaches a layout. An entry is

```json
{ "id": "price-01", "claim": "$1,349,800", "status": "verified",
  "source": "client inventory export, 2026-08-10", "sourceType": "client-data",
  "appearsAt": [".lot__price"] }
```

**A project with no ledger fails this gate outright, with no claims examined.** The
absence is the finding. A page that has never been asked where its numbers came from
is in exactly the state the rejected concept was in, and reading through it looking
for suspicious figures reproduces the review that already failed.

### CP2 — Coverage is the mechanism, not validity

Checking that the recorded claims are true is necessary and catches nothing, because
the fabricated ones were never recorded. So the test runs the other way: **every
claim-shaped string in the rendered page must map to a ledger entry.**

A claim you forgot to enter fails identically to one you entered falsely. There is
no practical difference between them — both ship an unsourced number — and treating
them differently is what let four invented prices through.

Corollary: the test runs against the **rendered page**, not the source. Content
assembled in JavaScript, injected from a data file or produced by a template is
still content, and a string that never appears in the markup still appears to the
reader.

### CP3 — A prior concept is not a source

The following can never be a source, whatever they contain:

- **a previous concept, mockup or prototype** — including this project's own earlier
  index files
- **a design read, brief, or concept document** — those record intentions
- **anything an agent produced**, including this one
- **the composition's own requirements** — "the slot needed a seven-figure number"

Copying a number out of a prior mockup launders a fabrication into a citation. The
number was invented once; quoting it does not make it observed. The only sources
that count are ones outside the design work: client data, a live system, a written
client statement, a public record, a dated capture of a real page.

### CP4 — A placeholder must be visibly a placeholder

If real content is unavailable, the page may use a placeholder — and the placeholder
must be **unmistakable in the render**, not merely in a comment or a ledger. `$—`,
`XXX`, a visible `SAMPLE DATA` label, an obviously impossible figure.

**A realistic placeholder is not a placeholder; it is a fabrication with an excuse.**
$2,900,212 was intended as a stand-in. Nothing on screen said so, so it shipped as a
price, and it would have been read as one by every person who saw the page.

### CP5 — A dated figure carries its date in the render

Anything true only at a moment — inventory counts, "vehicles in stock", price,
availability — is recorded as `dated-requires-reconciliation` with a `captureDate`,
and **the date is visible on screen next to the figure**. "301 vehicles" is not a
fact; "301 vehicles as of 10 Aug 2026" is.

A figure with a `captureDate` in the ledger and no date on screen fails. The ledger
is not the reader's; the render is.

**`provenance-pending` is the narrow allowance and it is narrow.** A claim may carry
that status only in a **private concept build**, only when explicitly marked safe for
one, and it never survives into anything a client sees. It is the same allowance
[GI7](../generated-imagery/SKILL.md#invariant) makes for imagery, on the same terms:
it buys time, not permission.

### CP6 — A promise is a claim about the business, not a piece of copy

"Same-day", "no listing fees", "no commissions", "zero-risk", "within two business
days", "factory warranty", "nationwide delivery", "the best" — these look like tone
and are contractual. They commit a real business to a real obligation, and the
designer is not the person who gets to decide the business offers them.

Every promise needs a source that is a statement **by the client**, not an inference
from their category. "Dealers usually offer this" is not a source. Neither is "the
competitor's site says it".

Corollary: **a superlative needs a citation or it is removed.** There is no version
of "the leading exotic dealer in the Midwest" that is sourced by wanting the sentence
to be there.

### CP7 — Content shape may not be invented to fill a composition

When a layout needs content that does not exist — a fourth vehicle, a fifth
testimonial, a statistic to balance a row — the answer is to **change the
composition**, never to manufacture the content.

This is the rule the other six exist to protect. Four equal slots were the reason
four prices were needed; the prices were fabricated because the grid had already been
built. A composition whose integrity depends on content nobody can source is not
finished, and filling it is not a content decision that happened later — it is the
composition failing, quietly, in a place nobody looks.

If the honest content is three items, the composition holds three items. If the
honest answer is that the number is unknown, the page says so or does without it.

**Reassignment is the same failure, and it is the one that gets through.**
Manufacturing a fourth item looks like fabrication and is caught. Taking an asset
that already exists and moving it under a name it does not belong to looks like
reuse — and it is the same lie, told with a real file. A photograph of one car
placed under another car's name; one client's interior standing in for another's;
a marque's badge over a picture of a different marque's product. Nothing was
invented, the ledger has an entry for every asset, and the render still says
something untrue.

The tell is that the slot came first: the grid wanted nine and six exist, the
roster wanted a picture and this car's folder was empty. **A slot with no asset
of its own is a composition finding, not a sourcing problem** — the answer is six
cards, or a treatment that does not need a picture per row. It has cost this
system twice: a Carrera GT shipped over a photograph that was not it, and a 3×3
marque wall was refused for the same reason and built as 3×2.

---

## What this is not

**Not a fact-checking pass at the end.** A gate at the end catches what it can read;
it cannot detect a missing entry for a claim nobody recorded. The ledger comes first
or the mechanism does not work.

**Not a legal review.** These rules stop the design work from inventing obligations.
Whether an obligation the client actually offers is lawfully expressed is the
client's counsel's question.

**Not a licence once satisfied.** A page can be fully sourced and still be a bad
page. This gate is necessary and never sufficient — like every other gate in the
chain, it may not be traded against Gate 2 or Gate 3.

---

## Implementation note

`gates/content.mjs` implements CP1–CP6 mechanically: it harvests claim-shaped
strings from the rendered page across fourteen classes, requires each to map to a
ledger entry, blocks `unsupported` and `fabricated` statuses, rejects banned sources
and source types, and requires dated figures to be visibly dated. `npm run
test:content` is its regression suite.

CP7 is not mechanically checkable and is not meant to be. It is a question asked at
Gate 2, in front of the composition: *does any part of this layout require content
we cannot source?* The detector cannot see a slot; a reviewer can.

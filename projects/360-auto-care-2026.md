---
project:      360-auto-care-2026
client:       360 Auto Care Inc (Lynbrook, New York)
date:         2026-07-29
mandate:      REDESIGN
carried:      [company name, service taxonomy, Lynbrook locality, brief's dark palette tokens, brief's headline and supporting copy]
dialect:      [partial: auction-editorial principles + brief-derived register]
dialect_fit:  partial
suspended:    [desaturated accent under chroma 0.08, serif display face, italic signature word]
adopted_late: [stress word as a weight drop rather than an italic]
role:         ABSENT
register:
  ground:     "#090c0d near-black with three darker-green steps to #1b2528, plus one inverted bone band"
  display:    "Archivo variable, 900 — heavy grotesque; expressive by mass, not by style"
  accent:     "#f47a17 safety orange, saturated"
  image:      mixed
  hero:       not recorded
  symmetry:   not recorded
  density:    not recorded
  voices:     3+                            # Archivo 900 display · Inter 400 body · mono index — all three named in §3
  motion:     not recorded
outcome:      shipped
---

## 1. The brief in my own words

A one-page site for a local independent repair shop, delivered with an unusually
complete direction document: dark palette values, section order, type direction,
copy, and an explicit list of what it must not look like (generic mechanic
template, luxury dealership, exotic detailing studio, SaaS landing page, card
collection, black-and-red motorsport site).

The part not said out loud: those five exclusions are all the same fear — that a
small local business gets a template. So the deliverable is not "a dark editorial
page" but *evidence of capability*, composed. Which is why the photography had to
be documentary rather than aspirational, and why the services could not be six
cards no matter how well styled.

Second unstated thing: the brief asks for editorial composition **and** for a
low-context visitor with a broken car to find a phone number fast. Those pull
against each other, and the resolution is that the phone is the largest type mass
on the page outside the hero.

## 2. Task and means

- **Task:** get a car that is broken, due for service, or about to be bought
  looked at by a shop that can actually do the work.
- **Means:** the phone, five times — masthead, mobile menu, hero anchor, contact
  section (as the band's dominant), footer, all `tel:` linked · the solid
  SCHEDULE SERVICE block in the hero, carrying a second line of promise and going
  full-width below 48rem · a per-service request link in each of the six directory rows, which
  pre-selects that service in the form · the request form itself · address, hours
  and a directions link in the contact band · the NYS-inspection and
  extended-warranty facts in the capability rail, because those two are the
  reason a specific subset of visitors is on the page at all.

## 3. Decisions

- decided: partial auction-editorial — principles only (subtract before adding,
  hierarchy from space and scale, metadata composed as a record, one committed
  gesture, mass above centre) | rejected: the full dialect including its
  expressions | why: the brief mandates a saturated safety-orange accent, which the
  house expressions forbid; the principles survive the brief, that expression does
  not. The brief's condensed-grotesk display was the second conflict and it did
  not survive — see the two type reversals below.
- decided: a grotesque display at 900, with the stress word dropped to 400 |
  rejected: the house serif display and its italic signature word | why: the client
  rejected both serifs outright — "uberi serif, sdelaj bold font" — after seeing
  them built. The diagnosis behind the serif was still correct: the first build had
  no expressive voice, so every rank was built out of size alone. But the cure was
  never the serif category, it was a violent WEIGHT separation. Archivo 900 against
  Inter 400 is five steps; nothing can be mistaken for "the body font, larger", and
  a heavy grotesque is what a workshop sounds like. General rule extracted: when a
  page has no expressive voice, check whether the axis is missing before concluding
  the family is wrong.
- decided: Newsreader rather than Bodoni Moda while the display was still a serif |
  rejected: the didone the house register reaches for first | why: measured, not
  tasteful. This page's
  display ranks land at 26–68px, and a didone's hairlines fall below one device
  pixel at the bottom of that range: the review score rendered as "1.8" because the
  4 lost its diagonal and crossbar, and "820-0360" rendered as "820 0360" with the
  hyphen gone. A page may not misstate its own review score in service of a
  typeface. Newsreader holds the same editorial register with moderate contrast.
  General rule extracted: the house didone preference has a floor at roughly 40px,
  and a page whose display type lives below it wants a text serif instead.
- decided: no optical-size handling at all, since Archivo has no opsz axis |
  rejected: porting the pinned `opsz` tokens forward | why: they were wrong even
  where they applied — they had the 58px hero asking for `opsz` 72, i.e. for finer
  strokes than its own size wants, the same direction that broke the didone.
- decided: cap the review figure and the contact phone below the h1 | rejected:
  letting the phone be the biggest thing on the page | why: both tokens capped at
  the same 4.25rem as the hero but climbed on steeper clamp() slopes, so they got
  there first: 72px and 65px against the headline's 58. A supporting figure may not
  outrank the page's dominant type rank, however much the business wants it read.
- decided: accent derived from the sodium-orange work lamp written into every
  image prompt | rejected: picking the brief's orange and calling it brand |
  why: derivation has to name a source the project actually contains, and now the
  accent continues the photography instead of competing with it.
- decided: near-black ink on every orange fill | rejected: white labels |
  why: white on `#f47a17` measures 2.41:1. It was never an option, but it is the
  default a generator reaches for.
- decided: one numbering system in two weights — small mono index for ordinary
  bands, large numeral for the three chapters, both carrying the section number |
  rejected: the brief's separate chapter numbering (01/02/03 alongside 06/07/08) |
  why: two counts in one band made the reader reconcile them; the first draft had
  "07 COVERAGE" directly above a large "02" and it read as an error.
- decided: services as an index with a sticky image stage driven by hover *and*
  focus, with every description, related-service line and request link readable
  without interacting | rejected: an image that only appears on interaction |
  why: the brief's own line — all content accessible without interaction — and
  C14; the image is reinforcement, the text is the content.
- decided: `<details open>` for all six rows, with script adding `name` and
  closing all but the first below 62rem | rejected: a JS-driven accordion |
  why: script-off leaves six open rows (complete, if long) instead of six
  collapsed ones (broken), and the exclusive accordion comes free from the
  platform.
- decided: mobile hero fully recomposed — image field on top, whole type stack in
  a deep lower band | rejected: the desktop composition stacked | why: the
  measured headline contrast at 390px was 1.87:1 where it crossed a taillight;
  the desktop composition depends on horizontal isolation, which does not exist
  at 390px.
- decided: no scroll reveals — LATER REVERSED at the client's explicit request for
  a full motion system | rejected (originally): a systematic fade-up on section
  entry | why: motion I5 still stands as an argument — a paragraph fading in
  communicates nothing — so the reveals that were built are gated behind a
  `.js-motion` class with a 3s watchdog, neutralised under
  `prefers-reduced-motion`, and verified to leave nothing hidden with the gate off.
  That is the compromise: the objection was to content that can get stuck
  invisible, and that failure mode is now closed by construction rather than by
  abstention.
- decided: wordmark texture band dropped below 62rem | rejected: keeping it |
  why: half-hidden behind the action bar it read as an artefact; it carries no
  information, and the legible wordmark is in the masthead.
- decided: reviews section renders from an empty array and shows an honest
  awaiting-data note | rejected: sample reviews, even marked as samples | why:
  the brief says verified reviews only, and a fabricated review is a false
  statement about a real customer.
- decided: `(516) 555-0100` from the reserved fictitious range for the placeholder
  phone | rejected: a plausible-looking invented number | why: a preview site
  with a real-format number can ring a stranger.
- decided: intervals between masses built from grid columns (`offset-lg-1`) rather
  than gutters | rejected: Bootstrap's default gutter model | why: with `g-0` and
  offsets, column content lands exactly on the shell's padding axis, so the
  twelve-column bands align with the hand-built rails that sit between them.

## 4. Environment knowledge

**Bootstrap's own selectors outrank single-class project overrides, and the
failure is silent and geometric.** Three separate bugs, one cause:

- `.form-check .form-check-input` (0,2,0) beat `.form-check-input` (0,1,0), kept
  `float: left; margin-left: -1.5em`, and hung the checkbox two pixels outside the
  viewport at 320px.
- `.field:nth-child(even)` (0,2,0) beat `.field--full` (0,1,0), so the full-width
  textarea kept a 48px indent and a divider rule it was explicitly told to drop.
  Fix: `.field.field--full`.
- Anything overriding a Bootstrap component needs to match or exceed its
  specificity, not merely come later in the file.

**Bounding a media query removes the declarations inside it, including the ones
you meant to keep.** Changing `@media (min-width: 48rem)` to
`(min-width: 48rem) and (max-width: 61.9375rem)` to stop two-up padding rules
leaking into a four-up layout also removed `padding-inline` from the four-up
layout, which had been inheriting it. Result: three rails whose cell text sat
directly against its own divider rule. Re-state, do not assume inheritance
across a bound.

**A sticky column inside a Bootstrap `.row` has nowhere to travel.** `.row`
defaults to `align-items: stretch`, so the column is as tall as the row and
`position: sticky` does nothing at all. It needs `align-items-lg-start` on the
row. This cost the service directory its whole signature interaction and looked
like a CSS bug rather than a layout one.

**Playwright's full-page screenshot silently drops lazily-decoded images**, which
produces black rectangles that look exactly like broken art direction. Verify
composition in real viewport captures; use the full-page shot for rhythm only.

**Measure type over photography on the composited render, not the source image.**
Hiding the text layer with `visibility: hidden`, screenshotting, and sampling the
worst pixel in each text box is the only method that accounts for the scrims. The
source-image estimate said the hero's anchor label passed; the composited render
said 4.34:1.

## 5. What turned out wrong

**The hero's oversized wordmark was tuned three times and is still the weakest
element.** At 0.09 alpha it read as a grey watermark across the technician; at
0.05 sitting above the anchor row it works, but it is doing very little for the
space it occupies, and on mobile the honest answer was to delete it. The brief
asked for it, the composition tolerates it, and I would argue for cutting it on
wide formats too if there were a second round.

**I over-corrected the hero's right-side scrim before measuring.** One pass
darkened the right half to 0.92 alpha, which flattened the photograph — the
dominant mass — to fix a legibility problem that measurement later showed was
7.97:1 and never existed. Measure first; the escalation ladder is an order, not a
starting point.

**The detailing chapter's first build put a 520px text panel over a 561px image**
and called it "copy attached to the lower edge". It was a text block over a
photograph, with the headline crossing the brightest streak in the frame. Two
fixes were needed — move the steps out of the overlay, add a corner scrim — and
the second one only became obvious after the first.

**Three of the sixteen generated frames carry artefacts I chose to live with**
(legible generic signage on the exterior, illegible characters on a rotor hub, a
lighter exposure needing a tonal wash). They are documented, but a preview handed
to a client is exactly where "documented" gets skipped.

**The `?todo` placeholder outline is a good idea that nobody will remember
exists.** It is in the README and in CONTENT-TODO.md, and it will still be the
thing that gets missed if this ships in a hurry. A pre-launch check that fails
loudly would be better than a mode you have to know about.

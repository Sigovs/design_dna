---
name: generated-imagery
description: Standing discipline for synthetic imagery — eight invariants (GI1–GI8) binding every generated, upscaled or AI-edited image in any project, whatever produced it. Covers origin declared before generation, the prompt derived from the brief rather than typed from taste, the ban on depicting a real product, premises or person, no baked-in type or UI in the frame, the reading zone held at generation instead of patched with a scrim, provenance travelling with the file, the composition surviving an ordinary photograph, and mobile frames authored rather than cropped. Tool-agnostic; the repo's own generator is an implementation note, not a rule. Use before generating any image, and when auditing imagery whose origin is unclear.
---

# Generated Imagery

**This skill governs images that were not photographed.** Generated, AI-upscaled,
AI-extended, generatively filled, style-transferred — if a model produced any part
of what ships, these rules bind.

It is a discipline, not a workflow, and deliberately **tool-agnostic**. Gemini, fal,
Midjourney, whatever replaces them next year — the rules below hold across all of
them, because they are about what an image must be, not about how it was made. The
repo's generator is recorded at the bottom as an implementation note, and a tool
note is never a reason.

**Why this exists as a standing rule rather than a per-project decision.** Synthetic
imagery is cheap, fast and arrives already looking finished. That combination
defeats judgement: the image is in the layout before anyone asks whether the
composition needed it, whether it can honestly represent what it appears to
represent, or what happens when the client's own photograph replaces it. The
decisions below are therefore made *before* generating, every time, because after
generating everyone is looking at a picture instead of at the question.

---

## INVARIANT

Eight rules. They bind whatever dialect was selected, including
`brief-derived / no stored dialect`.

### GI1 — The origin is declared before anything is generated

Every image position in a project is one of: **commissioned · client-supplied ·
stock · synthetic · none**. That is settled in the brief's imagery section, and it
is settled before a prompt exists.

This is [C17](../academic-composition/SKILL.md#invariant) applied to a specific
asset class: a composition that has not declared what it depends on has not been
designed, it has been hoped for. Generating first and declaring afterwards inverts
that — the composition ends up depending on whatever the model happened to produce.

**A project may declare `none` and that is a complete answer.** Type, rule, interval
and colour carry a great many pages, and reaching for imagery because a slot looks
empty is how a page acquires a dependency it never needed.

### GI2 — The prompt is derived from the declared direction, never typed from taste

A prompt is assembled from what the brief already says — art direction, imagery,
colour, prohibitions — and from the invariants. It is not composed freehand at the
moment of generating.

**A freehand prompt is an undeclared second art direction.** It is written in a
different sitting, in a different mood, from a different set of references than the
brief, and it produces exactly what [U11](../anti-patterns/SKILL.md#invariant) bans:
one page speaking two visual languages. The failure is invisible in the prompt and
obvious in the layout, which is the worst possible order to discover it in.

Corollary: **regenerating for a better result is legitimate; rewriting the direction
inside the prompt to get a better result is not.** If the direction is wrong, the
brief is edited and the change is a decision with a reason. Prompt-tuning your way
out of a direction is how the brief stops describing the project.

### GI3 — Nothing synthetic depicts a real product, place or person

A generated image may carry atmosphere, material, light, texture, landscape,
abstraction and generic context. It may **never** stand in for:

- **the actual item being sold** — this specific car, this specific watch, this
  specific property;
- **the actual premises** — the showroom, the workshop, the office as they are;
- **an actual person** — staff, client, testimonial, founder.

**This is not a taste rule and it does not yield.** A generated photograph of a car
a dealership is selling is a false statement about that car, made in the medium
buyers trust most. It survives screenshots, outlives the listing, and the client
carries the consequence, not the designer. The same applies to a workshop that looks
better than the workshop and a team photograph of people who do not work there.

Where the real asset is poor and the real asset is what the page is about, the
answer is composition — crop, scale, sequence, type doing more work — or
photography. It is never a convincing substitute.

### GI4 — No type, no UI, no logo, no signage in the frame

The frame carries no letterforms, numerals, wordmarks, watermarks, captions,
interface, device mockups or browser chrome.

Typography is set in the document, where it can be a token, be translated, be read
by a screen reader, and recompose at every breakpoint — [C12](../academic-composition/SKILL.md#invariant).
Type baked into an image can do none of those and pins the layout to one viewport.
Generated interface is worse: it is a screenshot of a product that does not exist,
and it will be read as a claim that it does.

**The subject yields, not the rule.** Stating the ban is not enough: a reading-room
scene generated on both a draft and a flagship model returned hundreds of book
spines carrying pseudo-lettering, because the subject was made of text. If a scene
would naturally contain letterforms — spines facing camera, signage, packaging,
posters, screens, number plates — turn them away, crop them out, or choose a
different subject. A prohibition cannot survive a subject that contradicts it.

### GI5 — The reading zone is held at generation, not patched afterwards

Any image that will carry text over it is generated with a tonally calm, low-detail,
even-value region where that text will sit — named before generating, not found
afterwards.

This is [I4](../color-taste/SKILL.md#invariant) moved upstream. A scrim, overlay or
gradient added later to rescue contrast is not a fix; it is the evidence that the
wrong image was generated, and it costs the depth and colour the image was chosen
for in the first place. Generating the right image is free. Rescuing the wrong one
is paid for in every viewport.

### GI6 — Provenance travels with the file, permanently

Every synthetic file carries a `gen-` prefix in its filename and a sidecar recording
model, date and the exact prompt. The prefix is not stripped on copy into a project,
and the sidecar is not deleted when the folder is tidied.

Six months on, nobody can distinguish a generated hero from a photographer's frame
by looking — not the client, not the next developer, and not Alex. An unlabelled
synthetic asset is an unanswerable question about licensing, about honesty, and
about whether it can be reused. **Label it once at birth or argue about it forever.**

### GI7 — The composition survives an ordinary photograph

Build and judge the composition against a plain, badly-lit, phone-shot version of
the image. The generated frame is the upgrade, never the requirement.

The vault records this failure twice, in `beings-co` and `ruadh-com`: *ordinary
photography collapses the whole system.* Generated imagery raises that exposure to
its maximum, because the frame is always excellent and the replacement never is —
and the replacement always comes. A layout that only reads with the generated hero
in place is not finished; it is a mockup that shipped.

### GI8 — Mobile frames are generated, not cropped

A mobile image is generated at its own aspect with its own composition. A centre
crop of a 16:9 frame is not a mobile image — the subject drifts, the reading zone
disappears, and the crop lands wherever the frame happened to be busiest.

Consistent with [C12](../academic-composition/SKILL.md#invariant) and with the
separately-authored-mobile rule that recurs across `dimensionality` and
`motion-judgment`. Note that hiding the image instead is already banned by
[D7](../anti-patterns/SKILL.md#dialect) — the choice is *author it*, not *drop it*.

---

## DIALECT

**None.** Whether an image may be synthetic is not an aesthetic position, and the
house has no preferred generated look — a preferred generated look would be
[D1](../anti-patterns/SKILL.md#dialect), the AI-default, arriving through the back
door.

What the image should look like once it is permitted comes from the dialect that was
already selected, through the brief. This skill only decides whether it may exist,
what it may claim, and what has to be true of it.

---

## Before generating — four questions, in this order

1. **What does this position depend on?** Declare the origin (GI1). If the answer is
   `none`, stop here — that is a result, not a gap.
2. **What is it allowed to claim?** If the position needs the real car, the real
   room or a real person, generation is not available (GI3).
3. **Where does the text sit?** Name the reading zone before the prompt exists (GI5).
4. **What does this look like with a phone photo instead?** If the answer is "it
   breaks", fix the composition first (GI7).

Then assemble the prompt from the brief (GI2), generate, and label (GI6).

## Auditing imagery already in a build

Ask of every image: **can I tell where this came from?** If not, that is GI6 and it
is fixable in a minute. Then: is there a scrim rescuing text over it (GI5)? Is
there type inside it (GI4)? Is the mobile version a crop (GI8)? Does the page still
work with the image replaced by a grey box (GI7)?

An image that fails GI3 is removed. Not re-prompted, not disclosed in small print —
removed.

---

## Tool note — non-normative

**Not a rule, and never cited as a reason.** `npm run art` in this repo assembles
prompts from a compiled brief and enforces GI2, GI4, GI5, GI6 and GI8 mechanically.
It is backed by the Gemini image API, which does **not** include image generation
in its free tier — without billing enabled, `npm run art:dry` writes the prompts
and generation happens wherever it can. That changes nothing above: GI2 is about
where a prompt comes from, not about which service renders it. See the README
section *Generated art direction*.

GI1, GI3 and GI7 are judgements and no script can make them. A tool that reported
them as satisfied would only be reporting that it had not checked.

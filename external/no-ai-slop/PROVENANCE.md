# no-ai-slop — provenance

- **Upstream:** https://github.com/petergyang/no-ai-slop
- **Commit:** `000650b156983f5159695b441477f4e63b25dc85` (2026-09-01)
- **Vendored:** 2026-10-05, at Alex's request ("record it in our DNA"), during
  Golden Lion Auctions.
- **Licence:** MIT (Peter Yang, 2026). Vendoring is permitted with the licence kept.
- **Files kept:** `SKILL.md`, `eval.md`, `README.md`, `LICENSE`. The plugin build
  script, agent YAML and assets were left out.

## What it actually is

A **copy** skill, not a visual one. It edits prose to strip machine-default writing
habits while keeping the writer's voice, or it only detects them and quotes each
line. Two layers do the work:
- a word ban list (delve, leverage, robust, elevate, empower, seamless-family, plus
  empty adverbs and empty phrases);
- about twenty named sentence patterns: binary contrast ("not X, it's Y"),
  colon reveals, fake-profound kickers, importance puffery, weasel attribution,
  negative listing, dramatic fragments, recap endings, and em-dash crutches.

`eval.md` is a pass/fail self-check to run after an edit.

## Where it agrees with us

- **content-provenance CP1–CP7:** "Don't invent claims, examples, stats" and "name
  the source or cut the claim" match our rule that no plausible number or claim is
  invented to fill a composition.
- **anti-patterns, template anonymity:** its "portability test" (a sentence that
  could move unchanged to another company is filler) is the copy version of our
  "if the logo disappeared, would this still be specific?".
- **Subtract first.** Minimum effective edit, never make things tidier just for
  consistency.

## Where it is silent, or disagrees

- It knows nothing about **UI strings**: labels, keys, button text, status words,
  captions. Its rules are tuned for posts and essays. A 3-word button cannot be
  "made concrete" with a number.
- **Em dashes:** it bans them in short copy. That is a house-style choice, not a
  quality law. Our typography skill has no position on them; take it as a default
  for marketing copy, not a rule for data.
- **Fragments:** it treats "X. And Y." as slop. Auction-editorial headings
  legitimately use short declaratives ("Recently sold."). Judge them by the
  portability test, not by sentence length.

## Worth taking first

1. **The portability test** as the review question for every headline and lede on
   a page.
2. **The binary-contrast and colon-reveal bans** for hero and section copy. They
   are the two most common machine tells in our own drafts.
3. **Detect mode** (quote the line, name the pattern, give a short fix) as the
   format for copy review in a design critique.

## Not a candidate

- The "generate slop for fun" mode.
- Any rule that would rewrite a client's own sentence. *"A bohemian car place"* on
  Patton is protected as given. The skill's own "preserve the writer's voice"
  principle agrees.

## Status

Nothing here binds. A rule from this file starts binding only when it is argued
into `skills/` (most likely `content-provenance` or a future copy skill) in our
own words, as a diff Alex approves.

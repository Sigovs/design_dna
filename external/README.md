# external/

Other people's work, kept whole so it does not get lost, and kept **out of
`skills/`** so it cannot get in by accident.

`skills/` is executable: an agent reads it and obeys it. Everything in here is
the opposite — material to be read, argued with, and mined. The repository's
layering rule is one-way and it applies to outside material at least as hard as
it applies to our own vault:

> promotion into `skills/` only ever happens through the distillation ritual …
> Nothing lands in `skills/` without a person reading the diff.

So the rule for this directory is one line: **nothing here binds anything.** An
agent that reads `TASTE.md` and `skills/` is fully instructed; nothing in
`external/` changes what it must do. A rule only starts binding when it has been
argued into `skills/` in our own words, as a diff Alex approved.

Each entry carries a `PROVENANCE.md` with, at minimum:

- upstream URL, commit and date
- the licence, and whether vendoring is permitted under it
- what it actually is, judged from the source rather than its README
- where it agrees with us and where it disagrees, both specifically
- what is worth taking first, and what is not a candidate at all

The last two are the point. A vendored library with no argument attached is a
dependency nobody decided to take.

## Entries

| | what it is | licence | vendored |
|---|---|---|---|
| [scrollcraft](scrollcraft/) | a Claude Code skill that builds scroll-driven pages against a stated design floor — ten device families, a variety rule, a fingerprint gate, and a verification harness that screenshots its own scroll | MIT | 2026-08-26 |
| [posthuman-explorer-chat](posthuman-explorer-chat/) | a ChatGPT conversation from 2026-09-06 surveying the nexu-io toolchain and drafting `GDBURO_PRODUCTION_PIPELINE.md`; kept as text, the page export was not committed | Alex’s own | 2026-09-21 |
| [no-ai-slop](no-ai-slop/) | a copy skill: strips machine-default writing tics (banned words, "not X, it's Y", colon reveals, puffery, recap endings) while keeping the writer's voice; has a detect-only mode and a pass/fail eval | MIT | 2026-10-05 |
| [kill-ai-slop](kill-ai-slop/) | a visual + copy de-slop pass: 35-tell taxonomy, detection notes, and a dependency-free scanner (`scan.mjs`) that prints file:line hits for triage | Apache-2.0 | 2026-10-05 |
| [anti-ui-slop](anti-ui-slop/) | UIZZE's router to six short playbooks (new work, operate, polish, distill, audit, iOS); the audit returns ≤3 findings with evidence and the smallest fix | Apache-2.0 | 2026-10-05 |

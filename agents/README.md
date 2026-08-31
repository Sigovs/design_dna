# agents/ — the subagent roster

Agents live here, in the repository, and are **symlinked** into `~/.claude/agents/`.
The repository is the source of truth; the symlink is what Claude reads.

```
design_dna/agents/designer.md          ← edit this
~/.claude/agents/designer.md  ─────────→ symlink to the above
~/Desktop/WORK/AGENTS         ─────────→ symlink to this folder (Finder convenience)
```

## Why not just keep them in ~/.claude/agents/

Because a loose file there is outside version control, outside the repository, and
outside every backup — so it never reaches the other machine, and there is no history
when it turns out to be wrong. `designer.md` sat there for 53 days written against a
version of the taste system that no longer existed, and nothing surfaced the drift.

The skills already solved this. Agents now use the same mechanism.

## The shape of an agent file

Claude Code reads **flat `.md` files** here — one file per agent, never a folder.
(Folders are the *skill* convention: `skills/<name>/SKILL.md`. Do not mirror it here.)

```markdown
---
name: kebab-case-name            # must match the filename
description: When to use this agent. Written for the dispatcher, not for a human —
             it is the only thing read when deciding whether to hand work over.
model: opus                      # omit to inherit the session model
---

The system prompt.
```

Optional frontmatter: `tools:` to restrict the tool set, `model:` to pin a tier.

## The one rule

**An agent states its method, never its taste.** Any agent doing visual work enters at the
`design-dna` skill and follows the repo's load order — `TASTE.md` → the relevant `skills/`
→ `.claude/rules/design-dna.md` → the selected dialect — under the order of authority in
[AGENTS.md](../AGENTS.md). It does not restate contrast thresholds, spacing scales, type
rules or dialect positions in its own words.

A rule copied into an agent file is a fork. It cannot be updated from `skills/`, it does
not appear in the five-line summary in `README.md`, and it will quietly outrank the real
system inside that agent's context. Method — how to source assets, how to build, how to
verify, how to report — is what belongs here, because the taste system says nothing about it.

## Adding one

1. Write `agents/<name>.md` here.
2. Link it: `ln -s "$PWD/agents/<name>.md" ~/.claude/agents/<name>.md`
3. Commit both the file and this README's roster line below.

## Roster

| Agent | Model | Job |
|---|---|---|
| `designer` | opus | Builds and reproduces premium dealership and automotive sites from brand books, reference sites and client assets. Verifies in a real browser. |
| `brand-extractor` | opus | Extracts exact brand values from source material and returns a token layer plus a provenance ledger. Extraction only — never designs. |
| `design-critic` | opus | Independent review of built work: the Critique Panel, the gate chain, measured rather than looked at. Reports and never edits. |
| `vault-curator` | opus | Runs the taste vault — entries, judgements, captures, the distillation watch. Drafts rules; never lands them in `skills/`. |
| `project-recorder` | opus | Writes the record of a closed project into `projects/`, then runs the self-similarity check. Records evidence; never writes rules. |

**Why `design-critic` never edits, and `brand-extractor` never designs.** Both restrictions
exist for the same reason: an agent that both produces and judges its own output re-runs the
reasoning that made the mistake. Splitting the roles is what makes the second pass worth
anything. Do not "improve" either agent by giving it the other half of the job.

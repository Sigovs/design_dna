# CLAUDE.md — working style for this repo

## Autonomy

**Never ask yes/no or confirmation questions. Never pause for permission between
steps.** Make senior-level decisions and continue. Flag judgment calls in the
final report only — not as questions mid-task.

**Sole exception: external blockers** (auth failures, locked files, missing
credentials, a remote that doesn't exist yet). Stop and state exactly what the
user must do — the specific action, not a general problem description. Everything
that is a taste or implementation decision is yours to make.

## Consistency

**Every change to `skills/` or `TASTE.md` must keep the five-line taste summary
in `README.md` in sync.** That summary is the human's drift-detection surface —
if it stops describing what the skills actually say, the whole system silently
decays. Treat it as part of the same edit, not a follow-up.

Related: `TASTE.md`'s skill-index one-liners must also match the skills they
point at, and the working-style clause in `TASTE.md` §4 mirrors the autonomy
rules above — change one, change both.

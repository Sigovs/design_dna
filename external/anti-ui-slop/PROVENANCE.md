# anti-ui-slop — provenance

- **Upstream:** https://github.com/github/awesome-copilot (skill `anti-ui-slop`,
  authored by UIZZE). awesome-copilot HEAD when vendored:
  `143a3d976b3c1603cc8932984d5e1f28501cb5fc`. Skill version: `1.2.13`
  (manifest `quiet-expert-v12`).
- **Vendored:** 2026-10-05, at Alex's request. It is also installed as a live skill
  (`~/.claude/skills/anti-ui-slop`).
- **Licence:** Apache-2.0, with a NOTICE that credits ehmo/platform-design-skills
  for the iOS playbook. Vendoring is permitted with LICENSE and NOTICE kept.
- **Files kept:** everything except `agents/openai.yaml`.

## What it actually is

A thin router to **one of six playbooks**: new work, operate (dashboards), polish,
distill, audit, and iOS. Each playbook is short (115 lines in total). The paid
UIZZE MCP (800k real screens) is optional, and the free skill works without it.
The audit playbook is strict in a useful way: **at most three material findings,
ordered by user impact, each with observable evidence and the smallest fix**, and
no taste dressed up as defects.

## First use: Golden Lion Auctions HOME, 2026-10-05

Three findings, all fixed:
1. Inert controls (View lot, search, mobile menu). Fixed with a lot page stub,
   working search and a working menu.
2. A hero countdown with no units. Fixed with d · h · m · s.
3. Sold thumbnails dominated by the dealer's wall sign. Fixed with a wider plate and
   a tighter crop.

## Where it agrees with us

- **"The means of the visitor's task survive the composition"**, from our
  composition invariants. Its audit checks task clarity and inert interactions
  before anything visual.
- **State coverage** (empty, error, loading, disabled, recovery). We have no
  invariant for it yet. Open Design's `craft/state-coverage.md` covers the same
  ground.
- **"Work from the product"**: the brief and the existing system outrank the skill.
  This is the same order of authority as our Step 3.

## Where it is weaker than us

- Nothing on composition, tone, rhythm or the page as one object. It audits a UI,
  not a page.
- Its taste position is deliberately thin ("keep familiar conventions"). It is a
  gate, not a direction.

## Worth taking first

1. **The three-findings audit format** as the shape of the "Product Usefulness"
   gate (Gate 3) report: evidence plus the smallest fix, capped at three.
2. **Inert-interaction check** as an explicit line in the delivery gates. In a
   prototype, a dead primary button is the first thing a client clicks.

## Status

Nothing here binds. Promotion into `skills/` happens only as a diff Alex approves.

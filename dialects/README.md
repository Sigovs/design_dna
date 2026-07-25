# dialects/

A dialect is a coherent, opinionated way of resolving the choices the invariants
leave open. Each file holds **PRINCIPLES** (decision logic) and, where useful,
**EXPRESSIONS** (optional manifestations), and every rule carries a stated
`yields when:`.

Invariants in `skills/` bind regardless of which dialect is active. Nothing in a
dialect file can override one.

**Dialect selection is a human decision.** Per [TASTE.md §2](../TASTE.md#2-the-design-read),
every Design Read must name a stored dialect, a declared partial combination, or
`brief-derived / no stored dialect`. Nothing here is a silent default, and an
underspecified brief never becomes one.

| Dialect | Status | One line |
|---|---|---|
| [auction-editorial](auction-editorial.md) | **confirmed** | The house dialect — restraint, hierarchy from space and scale, metadata composed as a record. |
| [immersive-authored-world](immersive-authored-world.md) | **provisional** | The page as a staged spatial experience — one symbolic event, layered depth, in-world type and interface. |

The rules live only in the dialect files. This index deliberately does not repeat
them.

---

## Status: confirmed vs provisional

**confirmed** — distilled from evidence. The normal route: ≥3 human-reviewed Vault
entries marked `dialectStatus: "out"` that share meaningful decision logic, then
Alex approves. The full rule is in
[vault/README.md](../vault/README.md#creating-a-new-dialect).

**provisional** — author-created ahead of evidence. A working hypothesis about a
way of deciding. Usable when Alex selects it explicitly; not evidence-backed, and
not a precedent for creating more dialects this way.

### Promotion criteria

A provisional dialect becomes **confirmed** when **at least three human-reviewed
Vault entries explicitly carry it in `dialects` with `dialectStatus: "in"`.**

- The count is a count of *human* judgements. `unreviewed` entries never count.
- Entries must carry the dialect by name, not merely resemble it.
- Until the threshold is met, the file keeps its `⚠ PROVISIONAL` header and its
  row here says provisional.

On promotion: drop the header block, change the row above, and log it in the
[distillation log](../vault/README.md#distillation-log).

### Current provisional dialects

| Dialect | Created | Entries carrying it with status `in` | Needed |
|---|---|---|---|
| [immersive-authored-world](immersive-authored-world.md) | 2026-07-25 | 0 | 3 |

Nothing has been tagged with it yet, and nothing should be tagged with it
automatically — tagging is a human review action in the gallery, like every other
`dialectStatus` decision.

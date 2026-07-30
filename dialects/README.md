# dialects/

> **Do not avoid the incompatible. Find the rule under which incompatible ideas
> begin to feel inevitable.**

A dialect is a coherent, opinionated way of resolving the choices the invariants
leave open — **a method of deciding, not an appearance.** It acts on composition,
hierarchy, rhythm, density, typography, image behaviour, materiality, interaction,
motion, information presentation, emotional tension and the use of space. A dialect
reduced to a font list, a palette, a radius or an effect stack has been turned into
a theme, and a theme cannot resolve a choice it has not seen before.

Invariants in `skills/` bind regardless of which dialect is active. Nothing in a
dialect file can override one.

**How dialects are selected and combined lives in one place:**
**[HYBRID.md](HYBRID.md)** — the three style modes (`HYBRID` · `PURE` ·
`DIRECTED HYBRID`), the Anchor / Contrast / Signature role model, the CONTROL MAP,
the incompatibility test, compatibility reasoning, the page-wide dialect audit,
worked examples, and the alias table. It is not repeated here or in TASTE.md.

**The shared file shape** is [_TEMPLATE.md](_TEMPLATE.md), and
`npm run dialects:check` verifies it — so no dialect becomes a detailed system while
another stays a mood description. The two dialects that predate the shape keep their
own `PRINCIPLES` / `EXPRESSIONS` structure and are exempt from the domain table only.

---

## The library

| Dialect | Status | One line |
|---|---|---|
| [auction-editorial](auction-editorial.md) | **confirmed** | The house dialect — restraint, hierarchy from space and scale, metadata composed as a record. |
| [immersive-authored-world](immersive-authored-world.md) | **provisional** | The page as a staged spatial experience — one symbolic event, layered depth, in-world type and interface. |
| [brutalist-utility](brutalist-utility.md) | library | The structure of the thing is the design of the thing — exposed frame, hard ranks, controls as compositional material. |
| [refined-elegance](refined-elegance.md) | library | Quality legible in proportion and interval before anything else — restraint *with* presence, not absence. |
| [swiss-editorial](swiss-editorial.md) | library | A declared system carries the meaning — real grid, real scale, position as argument, information as designed objects. |
| [cinematic-industrial](cinematic-industrial.md) | library | Light, scale and material consequence do the persuading — the subject staged as a physical object. |
| [retro-futurist](retro-futurist.md) | library | A named period's idea of the future, run on present technology — borrowed logic, never borrowed artefacts. |
| [expressive-poster](expressive-poster.md) | library | Type as image — one message, scale collisions, compression and release, aimed confrontation. |
| [technical-luxury](technical-luxury.md) | library | Value demonstrated rather than asserted — specification, tolerance and provenance as the desirable content. |
| [organic-tactile](organic-tactile.md) | library | Let the hand show — rhythm from authored variation, warmth from real material. |

The rules live only in the dialect files. This index deliberately does not repeat
them.

---

## Status: what each one means, and what it authorises

**confirmed** — distilled from evidence, and a claim about how Alex's own work
decides. The normal route: ≥3 human-reviewed Vault entries marked
`dialectStatus: "out"` that share meaningful decision logic, then Alex approves. The
full rule is in [vault/README.md](../vault/README.md#creating-a-new-dialect).

**provisional** — author-created ahead of evidence. A working hypothesis about a way
of deciding. Usable when Alex selects it explicitly; not evidence-backed.

**library** — a recognised art direction, described rigorously, available as an
**input** to a Design Read and to a hybrid. **It is not a claim about Alex's taste
and carries no house authority.** A library dialect is selected because it expresses
this brief's central idea, never because it is available.

**Exact counts, as of 2026-07-30 — ten files, and only one of them is evidence:**

| Status | Count | What it asserts |
|---|---|---|
| confirmed | **1** | `auction-editorial` — the only dialect distilled from Alex's own vault evidence, and the only one that is part of his demonstrated Design DNA |
| provisional | **1** | `immersive-authored-world` — an author's hypothesis, **2 of 3** `in` records (`ruadh-com`, `electrafilmworks-com`) |
| library | **8** | Described decision methods available as inputs. **Zero** are evidence of Alex's taste |

So: **ten dialect files · one demonstrated · one hypothesised · eight described.**

> **The evidence rule is untouched, and there are exactly two of them.** The
> [binding rule](../vault/README.md#creating-a-new-dialect) already distinguishes a
> dialect **distilled from the vault** (≥3 references a human set to `out`, sharing
> meaningful decision logic, Alex approving before it exists) from one **authored
> ahead of evidence** (marked `provisional`, earning confirmation the other way
> round — ≥3 human-reviewed entries carrying it with `dialectStatus: "in"`).
>
> A **library** dialect was authored ahead of evidence, so **the authored route is
> the only one that could ever apply to it** — and it does not apply automatically.
> A library dialect does **not** become `confirmed` by being used, being liked,
> being written well, or accumulating `in` records. Alex must first re-declare it
> `provisional`, which is a claim that his own work decides this way; only then does
> the ≥3-`in` test mean anything. **An agent may do neither** — the binding rule
> says so for both kinds.

### Promotion criteria

A **provisional** dialect becomes **confirmed** when **at least three human-reviewed
Vault entries explicitly carry it in `dialects` with `dialectStatus: "in"`.**

- The count is a count of *human* judgements. `unreviewed` entries never count.
- Entries must carry the dialect by name, not merely resemble it.
- Until the threshold is met, the file keeps its `⚠ PROVISIONAL` header and its row
  here says provisional.

A **library** dialect has **no promotion path of its own.** It was authored, so the
authored route is the only one that could apply — and it only becomes reachable if
Alex explicitly re-declares the dialect `provisional` first, because that
re-declaration is the claim being tested. Until then, `in` records against a library
dialect are useful evidence about *entries* and prove nothing about the dialect's
status. `npm run dialects:check` reports such records as a human decision waiting to
be made, never as a promotion.

On promotion: change the row above, drop or replace the status block in the file, and
log it in the [distillation log](../vault/README.md#distillation-log).

### Current provisional dialects

| Dialect | Created | Entries carrying it with status `in` | Needed |
|---|---|---|---|
| [immersive-authored-world](immersive-authored-world.md) | 2026-07-25 | **2** — `ruadh-com`, `electrafilmworks-com` | 1 more |

Counted from `vault/sites.json` by `npm run dialects:check`, which is why this row
is no longer maintained by hand — it read 0 for days while two human judgements
already existed. **One more entry carrying it with `in` and it is confirmable**, and
that tagging stays a human review action in the gallery, like every other
`dialectStatus` decision.

---

## A note on one word

The vault's `dialectStatus: "hybrid"` describes **an entry** that shares a dialect's
decision logic while diverging in expression. It is **not** `STYLE MODE: HYBRID`,
which describes **a construction**: contrasting dialects holding different systemic
responsibilities. Same word, two objects, never interchangeable.

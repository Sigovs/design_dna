# scrollcraft — vendored, not promoted

**Upstream:** `github.com/nateherkai/scroll-craft`
**Commit:** `e957985187` · 2026-08-23
**Licence:** MIT (see `LICENSE`) — © the upstream author. Vendored here under it,
unmodified, with attribution.
**Vendored:** 2026-08-26, on Alex's instruction: *"if it's a working thing, put it
into our design_dna so it doesn't get lost."*

Install upstream instead of copying from here if you want it live in Claude Code:

```
/plugin marketplace add nateherkai/scroll-craft
/plugin install nateherk-design
```

`media/` is not vendored — three webp demos, 3.8 MB. They are in the upstream repo.

---

## WHY THIS IS IN `external/` AND NOT IN `skills/`

Because this repository's own rule says so. The layering is one-way —
`vault/sites.json` → `EVIDENCE.md` → `skills/` — and README.md states it twice:

> promotion into `skills/` only ever happens through the distillation ritual
>
> Nothing lands in `skills/` without a person reading the diff; that's the
> safeguard against the vault quietly averaging your taste back toward the mean.

A third-party skill dropped straight into `skills/` is exactly the failure that
sentence exists to prevent, and it would be a worse violation than the vault
averaging taste: it is *someone else's* taste, arriving whole, with its own
rules already written. So it sits here, complete and readable, and anything worth
having moves into `skills/` as a diff Alex reads.

---

## WHAT IT ACTUALLY IS

A Claude Code skill that builds scroll-driven pages and holds them to a stated
design floor. Judged from the source rather than the README:

- **SKILL.md is 22 KB of procedure**, not a prompt. Eight reference guides, a
  57 KB engine, a verification harness, a `doctor.mjs` that checks its own
  dependencies.
- **Ten device families** (`scrub`, `pin`, `pan`, `reveal`, `kinetic`,
  `parallax`, `count`, `flow`/`in`, pointer devices, `drift`) with a rule that a
  page uses at least four and never the same one twice in a row. Its own framing:
  *five sections that behave identically are one section shown five times.*
- **A fingerprint gate.** A new build must differ from the previous one on at
  least four of six axes — grammar, navigation, hero, act structure, closing,
  signature move. This is the same instrument as our project records, aimed at
  the same failure: work converging on one skeleton.
- **It bans its own most likely output.** Soft matte low-poly clay diorama is
  banned as a default. "Generate a flythrough and drop text on it" is named and
  refused. A single unbroken camera flight is refused unless the brief literally
  asks for one journey, on the grounds that it is the most expensive and most
  fragile thing to build and exists only to hide cuts.
- **It interviews the human before generating.** Eight questions, asked and
  written down — explicitly not a brief inferred from the brand name.

## WHY IT IS WORTH KEEPING

`references/taste.md` checks the **rendered result, not the intention**:

> "I used a spacing scale" is not evidence; a computed value is.

That is our gate principle arriving independently, which is the strongest kind of
agreement. Several of its rules are ours in different words — rhythm from the
contrast between tight and generous rather than one value repeated; optical
correction over mathematical; measure 45–75; tracking tightening as size grows;
light-on-dark needing compensation on three axes.

And `scripts/doctor.mjs` knows that a **stripped ffmpeg silently lacks filters**.
Nobody writes that line who has not lost an afternoon to it.

## WHERE IT DISAGREES WITH US — both narrow, both real

1. **Two font families maximum.** `references/taste.md`: *"Display carries voice,
   text carries prose. A third is a costume."* Our typography rule is three
   voices with three jobs — Familjen announces, Source Sans informs, JetBrains
   Mono records figures, units and labels. Neither is wrong; they are different
   positions on whether a mono record voice is a role or a costume. If any of
   this is promoted, that rule has to be resolved, not averaged.
2. **Its own token system.** `--sc-*`, six colour roles, a 4px base. Ours is
   `tokens.css`, below which there is no hex and no px. Two token systems in one
   build is two design systems in one build.

Neither conflict is a reason to reject it. Both are reasons it cannot be adopted
by installing it and walking away.

## WHAT TO TAKE FIRST, IF ANYTHING IS TAKEN

In the order I would argue for:

1. **The device-variety rule.** "At least four device families, never the same
   twice in a row" is a testable structural rule and we have nothing equivalent.
   Nearest home: `skills/motion-judgment/`.
2. **The fingerprint gate.** Six axes, four must differ. Nearest home: the
   project records, which exist for precisely this and currently have no test.
3. **The named refusals** — clay diorama by default, flythrough-plus-text,
   unbroken chain. Nearest home: `skills/anti-patterns/`, which is already the
   place trope bans live.

The engine, the asset pipeline and the token system are not candidates. They are
another house's plumbing, and we have our own.

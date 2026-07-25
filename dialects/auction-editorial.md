---
name: auction-editorial
description: The house dialect — the aesthetic Alex defaults to when the brief and brand are compatible, or when Alex asks for a taste-led direction. Split into PRINCIPLES (compositional logic and decision tendencies) and EXPRESSIONS (optional visual manifestations). Load when a Design Read selects this dialect in whole or in part.
---

# Dialect — auction-editorial

The register of a printed auction catalogue and a well-edited magazine: facts
presented as records, photography given room, typography doing the work that
decoration does elsewhere.

**This is a dialect, not a law.** Every rule here is a strong default with a
stated `yields when:`. Yielding to a stated condition is correct practice.
Yielding silently is the failure. The invariants in `skills/` bind regardless of
which dialect is active — nothing in this file can override them.

**This dialect is not a silent default.** Per [TASTE.md](../TASTE.md#2-the-design-read),
it applies when the brief and brand are compatible with it, or when Alex asks for
a taste-led direction. An underspecified brief does not qualify.

---

## PRINCIPLES — compositional logic and decision tendencies

Principles are *how this dialect thinks*. They survive changes of typeface,
palette, and medium. If a design follows the principles and none of the
expressions, it still belongs to this dialect.

### P1 — Subtract before adding

When something isn't working, the first move is removal: fewer elements, fewer
weights, fewer containers, fewer colours. Addition is the second resort.

*Why:* most weak layouts are over-populated rather than under-decorated, and
subtraction is the only edit that cannot introduce a new problem.

`yields when:` the deliverable is genuinely under-informative — an empty state, a
first-run experience, or a page whose job is to teach rather than to present.
Then adding explanation is the correct move and restraint is an obstacle.

### P2 — Hierarchy from space and scale before ornament

Rank is established with position, size, and distance. Containers, rules,
colour, and weight are later tools, used when space and scale have been exhausted.

*Why:* space and scale are read pre-attentively — they order a page before anyone
processes a word. Ornament asserts rank without establishing it, which is why
heavily decorated layouts still feel flat.

`yields when:` the layout must survive arbitrary user-generated content, or
must be scannable in a glance under time pressure (dashboards, alerts,
operational tooling). Explicit boundaries and colour coding beat elegant
proportion when the reader has two seconds.

### P3 — Metadata is composed, not appended

Facts — specs, credits, provenance, dates, prices, dimensions — get a deliberate
register of their own and a deliberate position in the composition. They are
never a leftover row at the bottom.

*Why:* in catalogue work the metadata *is* the content, and giving it its own
voice is what makes a page read as a record rather than as marketing. It also
separates the two reading modes cleanly: prose is read, facts are scanned.

`yields when:` the facts are the primary interaction rather than the primary
content — sortable, filterable, comparable data needs table affordances, and
composition must give way to function.

### P4 — One committed gesture beats several safe ones

*Prefer one measured compositional disruption over continuous novelty.* Pick a
single structural move per deliverable — an oversized number, a full-bleed image
against a narrow column, one section that breaks the established rhythm — and let
everything else be quiet enough that the move registers.

*Why:* disruption works by contrast with order. Continuous novelty is
self-cancelling: when every element is exceptional, none is, and the reader loses
the thread that made the exception meaningful.

`yields when:` an expressive, experimental, cultural, or youth-oriented brand
benefits from a more continuously disruptive visual language. Then sustained
irregularity is the point, and one-gesture restraint reads as timidity.

> The related **invariant** is narrower and never yields: *controlled irregularity
> must remain legible and intentional*. A continuously disruptive design is
> allowed; an illegible or accidental-looking one is not. See
> [anti-patterns](../skills/anti-patterns/SKILL.md#invariant).

### P5 — Visual mass slightly above centre, deeper field of space below

Compose so the weight of a block sits a little above the optical middle, with a
deeper field of space beneath it than above it.

*Why:* reading runs downward, so a block leans into the space below it; an
above-centre mass with a deep lower field reads as settled and deliberate, while
a true-centre mass reads as floating and a low mass reads as sinking. It also
gives each section a clean ending, which is what makes a long page read as
chapters.

`yields when:` usability, information density, audience expectations, or brand
character require another composition. Dense catalogues, data tools, feeds, and
anything where vertical space is the scarce resource should distribute space
evenly and get more content above the fold.

### P6 — Colour is a setting, not an identity

Establish a neutral world first; admit colour late, in a small number of named
roles, to mark where meaning concentrates.

*Why:* colour works by scarcity. An identity built on a hue reads as
branding-by-default and dates quickly; a neutral world lets type and space carry
the character, which is more durable and harder to imitate.

`yields when:` the brand identity is genuinely colour-led, or colour must carry
meaning at scale — status systems, categorical data, wayfinding, accessibility
aids. Then colour is functional and rationing it degrades the product.

### P7 — Materials over hues

When colour does enter, prefer tones that read as a material or a condition —
slate, sage, oxblood, ash, tobacco, bone — over tones that read as a hue name.

*Why:* pigment, dye, and film rarely reach digital saturation, so muted tones
read as real things rather than as UI. It also keeps a palette coherent, because
material tones sit closer together than named hues do.

`yields when:` the brief calls for energy, play, or immediate differentiation, or
the audience is young and expects saturation. Desaturation reads as expensive to
some audiences and as drab to others.

### P8 — Motion seasons; it does not perform

Motion explains a change of state and then gets out of the way. If the design's
character would collapse without its animation, the typography and spacing
weren't doing their jobs.

*Why:* motion is the most attention-expensive tool available and the fastest to
irritate on second viewing. A design whose character survives a screenshot is a
stronger design.

`yields when:` the brand is motion-led — entertainment, sport, launches, games —
or motion is itself the product. Then choreography is a primary medium, not
seasoning.

---

## EXPRESSIONS — optional visual manifestations

Expressions are *how this dialect has looked so far*. *They are never a required
checklist.* A design need not use all of them — or most of them — to belong to
this dialect. Using every one of them without the principles produces pastiche,
which is the failure mode this section exists to warn about.

Pick the ones that serve the deliverable. The linked skill sections hold the hard
numbers; nothing is duplicated here.

| Expression | Detail |
|---|---|
| **Didone display face** — high-contrast serif carrying the emotional register | [typography §D1](../skills/typography-taste/SKILL.md#dialect) |
| **Quiet grotesque body** — neutral, forgettable, excellent at reading sizes | [typography §D1](../skills/typography-taste/SKILL.md#dialect) |
| **Mono for data and labels** — machine register for anything factual | [typography §D1](../skills/typography-taste/SKILL.md#dialect) |
| **Italic signature word** — one true-italic word per headline as a stress mark | [typography §D2](../skills/typography-taste/SKILL.md#dialect) |
| **Uppercase mono micro-labels** — wide tracking, ≤5 words, small on purpose | [typography §D3](../skills/typography-taste/SKILL.md#dialect) |
| **Spec plates** — facts as a hairline-ruled record, no box, tabular figures | [typography §D4](../skills/typography-taste/SKILL.md#dialect) |
| **Smoky neutral palette** — off-black or off-white base, desaturated accent | [color §D1–D2](../skills/color-taste/SKILL.md#dialect) |
| **Hairlines instead of containers** — separation by rule and air, not by card | [anti-patterns §D4](../skills/anti-patterns/SKILL.md#dialect) |
| **Generous, bottom-heavy space** — air as a status signal | [spacing §D1–D3](../skills/spacing-taste/SKILL.md#dialect) |
| **Crossfade transitions** — content swaps fade; travel stays ≤8px | [motion §D1](../skills/motion-taste/SKILL.md#dialect) |
| **Subtle hover lift** — 2px and a rule that firms up; nothing more | [motion §D2](../skills/motion-taste/SKILL.md#dialect) |

### Using expressions honestly

- An expression without its principle is decoration. A didone headline over a
  cramped, arbitrary grid is not this dialect; it is a costume.
- Two or three expressions, chosen for the deliverable, is a normal amount.
- Drop any expression the medium fights. A didone at 11px on a low-DPI screen, or
  an italic in a family with no true italic cut, is worse than the alternative.
- Localisation overrides expression: scripts without didone or true-italic
  equivalents, or where uppercase harms readability, get a different treatment
  and still belong here.

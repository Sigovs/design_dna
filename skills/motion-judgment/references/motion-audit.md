# Auditing motion that already exists

*Read when: critiquing a live page, reviewing a build, or deciding what to cut from
something already made.*

**An audit's output is a list of removals, not a list of refinements.** The default
finding on any over-animated page is *delete*, and "tune the easing" is what you say
about the effects that survived.

## Finding format

One block per finding, ordered by severity.

```
MOTION      <what moves, and where>
ROLE        <the role it appears to claim — or "none stated">
ACTUAL      <what a visitor actually experiences>
VERDICT     <why it succeeds or fails, against MJ1-MJ9>
ACTION      remove | reduce | redesign | keep
```

**`ACTUAL` is observed, not inferred.** Scroll it. Stop mid-sequence. Look at the
frame. The gap between what an effect claims and what it does is where every real
finding lives.

## Severity

| Level | Meaning | Examples |
|---|---|---|
| **Blocking** | Content or function is unreachable | Reduced motion hides content · sequence traps scroll · essential information only on hover · comprehension gated behind choreography `MJ7` |
| **Serious** | Meaning is damaged | Two primary ideas competing `MJ2` · unreadable stoppable frames `MJ4` · page incoherent with motion removed `MJ5` · desktop choreography shipped to mobile `MJ8` |
| **Notable** | Craft or cost | Uniform reveals flattening hierarchy · duration wrong for scale · effects that cannot state a role `MJ1` · frame budget exceeded |
| **Minor** | Polish | Easing character mismatched · stagger slightly long · a micro-detail that could go |

## The diagnostic questions

Run these in order. The first failure usually explains the rest.

1. **Turn every animation off.** Does the page still work, and does its hierarchy
   still exist? If no — the finding is compositional, not motion. Stop here and fix
   `MJ5`.
2. **Name each system's role** without asking the author. Anything you cannot name is
   a removal candidate `MJ1`.
3. **Count the primary ideas per viewport.** More than one is a serious finding
   `MJ2`.
4. **Ask what the subject is.** Is the amount of motion argued by it, or by the
   sector, or by fashion? `MJ3`
5. **Stop three sequences mid-way.** Is each frame legible and identifiable? `MJ4`
6. **Scroll fast, then backwards.** What breaks, doubles, or never appears?
7. **Time to comprehension.** How long until the visitor knows what this is? `MJ7`
8. **Open it on a phone**, mid-range, and on a keyboard, and with reduced motion
   on. `MJ8` `MJ9`
9. **Count what would be lost by deletion.** For each effect: if it vanished
   tomorrow, what would the page fail to say? If the honest answer is *nothing*,
   that is the finding.

---

# The AI-generated motion signature

Generated pages fail in a recognisable, repeated way. The pattern is not that any
one effect is wrong — most are defensible in isolation — but that **all of them are
applied uniformly, because a rule was applied instead of a decision being made.**

Flag each of these on sight:

| Pattern | Why it is a defect |
|---|---|
| **Every section fades and translates up** | Arrival stops carrying information the moment it is universal. Flattens hierarchy while appearing to create it `MJ2` |
| **Identical staggered entrances everywhere** | Same defect, one level down. Sequence implies reading order; the same sequence everywhere implies none |
| **Parallax on every image** | Asserts depth the pictures do not have. One depth idea per view — [DM6](../../dimensionality/SKILL.md#invariant) |
| **Perpetual floating decorative objects** | Never resolve, so the eye never settles. Banned in reading zones — [DM9](../../dimensionality/SKILL.md#invariant) |
| **Glow + blur + scale together** | Three signals, no hierarchy between them. Usually applied to whatever had no idea behind it |
| **Text split into characters** | Almost never semantic. Costs legibility for the duration and usually the accessibility tree with it |
| **Scroll hijacking** | Takes the one control every visitor already has `MJ6` |
| **Overlong loaders and branded intros** | A wait manufactured to be filled |
| **Motion masking weak composition** | The author's own review is what the motion is hiding from `MJ5` |
| **Animation delaying primary content** | Inverts the page's purpose `MJ7` |
| **Technology demonstration unrelated to the subject** | The exact failure C1e names `MJ3` |
| **Every card with the same hover package** | Lift + scale + glow + border + arrow: five signals for one binary state |
| **Desktop choreography copied to mobile** | Silent failure — it still runs `MJ8` |

## What to remove first

In order, because earlier removals often make later ones unnecessary:

1. **Anything with no nameable role.** No argument needed; there is nothing to argue
   with `MJ1`.
2. **The second primary idea.** Keep the one that belongs to the subject `MJ2` `MJ3`.
3. **Universal rules** — the global fade-up, the global parallax, the global hover
   package. Then re-add individually, to the two or three places that earn it.
4. **Anything blocking comprehension** — loaders, intros, gates `MJ7`.
5. **Ambient and decorative loops**, starting with any near text.
6. **Micro-motion on reading surfaces.**

Then, and only then, tune what remains.

## The imitation warning

> **A reference that is technically impressive is the most dangerous kind.**
> `[R site:trionn-com]`, recorded in the vault's own words: *"Это опасный reference
> для Claude: он скопирует WebGL object + giant type + scroll effects, но не сможет
> воспроизвести инженерную связность оригинала."*

The visible layer of an ambitious motion site is cheap to copy and its coherence is
not. What made the original work was a single system applied consistently — one
principle of energy and reassembly running through mark, typography, services and
transitions. Copying the episodes without the system produces the failure without
the achievement.

**So the read of any motion reference outputs a principle, never a description** —
[TASTE.md §6 (d)](../../../TASTE.md#the-output-of-a-read-is-a-principle-never-a-description).
*The reference solves &lt;problem&gt; by &lt;principle&gt;, which in this brief means
&lt;different concrete move&gt;.*

## What this evidence does not license

- **No universal durations, curves or thresholds.** `[?]` No record's judgement turns
  on one.
- **No framework rules.** The libraries named in the vault are implementation notes,
  not directions — [CLAUDE.md](../../../CLAUDE.md), and
  [dimensionality's tool notes](../../dimensionality/SKILL.md) are explicitly
  non-normative.
- **No promotion from one observation.** Everything marked `[R]` here is one site's
  device and stays that way.
- **Not a preference for dark, cinematic pages.** Both motion records are dark, and
  so is a rejected one — darkness discriminates nothing
  (`vault/EVIDENCE.md` C2e).

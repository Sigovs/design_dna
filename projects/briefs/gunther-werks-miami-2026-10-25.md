# Design brief — Gunther Werks Miami (Prestige Imports child site)

*Compiled 2026-10-25 by `npm run brief`. Phase 1 (this scaffold) is mechanical;
every decision below is Phase 2, written by the agent and marked with where it
came from. A brief is a **project artefact** — nothing in it becomes a permanent
Design DNA preference without Alex saying so.*

## The request, verbatim

```
DESIGN:
Gunther Werks Miami: a dealer child site for Prestige Imports (Miami), selling Gunther Werks, the California atelier that re-engineers the air-cooled Porsche 993 in carbon fibre (F-26, Turbo, GWR, GWX, special editions, completed Coupe/400R and Speedster, certified pre-owned "Provenance Succession").
Brand: Gunther Werks' own identity is fixed and must stay recognisable: the GUNTHER / W E R K S wordmark and GW monogram, strict black and white with a per-program accent, uppercase Gill Sans Nova voice, dark-studio photography with one coloured rim light, haze, glossy floor and large negative space; golden-hour California location work; macro craft detail.
Goal: a trimmed, corporate-type version of guntherwerks.com in our own design, not a copy of its layout. Home (atelier story, lineup, pre-owned, Miami showroom, enquire), model pages for F-26 / Turbo / GWR / GWX, special editions and legacy grouped, News and Events taken from GW's newsroom, contact.
Audience: collectors and high-net-worth enthusiasts in South Florida and the East Coast; desktop and phone; the action is a private enquiry or appointment with the dealer contact.
Content: 43 true-alpha car cutouts (side profiles 4200-4800 px for most programs, all left-facing), studio and location stills up to 9504 px, four direct MP4s usable for scroll-scrubbed moments (End Game crane-down reveal, Speedster studio orbit, F-26 and Turbo Goodwood drive-pasts), 12 news posts and one events page. No prices published; figures contradict between GW sources.
Motion: scroll-scrubbed video considered, built with GSAP ScrollTrigger.
Constraint: sibling Prestige child sites (Czinger, Pagani, Lamborghini) are not to be inherited for palette or type; facts follow content provenance; no implied availability.
```

Terms extracted for candidate ranking: gunther · werks · miami · dealer · child · prestige · imports · selling · california · atelier · that · re-engineers

## Provenance — one canonical syntax, machine-validated

| Marker | Means | Requires |
|---|---|---|
| `[P evidence:A1 sites:beings-co,ciridae-com]` | **Permanent** — a demonstrated preference | a claim id from `vault/EVIDENCE.md`, plus the site ids it rests on |
| `[J]` | **Project** — a decision for this brief only | nothing |
| `[R site:organimo-com layer:typography]` | **Reference-specific** — one site's device. **Never a rule** | a record id; `layer:` only where that site has a sidecar |
| `[A]` | **Agent** — a recommendation with no evidence behind it | nothing |
| `[?]` | **Unknown** — the evidence does not answer this | nothing |

Claim ids (`A1`, `D3`) and record ids (`organimo-com`) are different
identifier types and are validated against different sources.

## Candidates — ranked, NOT selected

Ranking order, two independent axes and the composition first: **device relevance**
(the move a reference can teach) → rating → **sector relevance** (the industry it
happens to be in) → approved layers → dialect fit → completeness. **It orders the
list. The agent selects.**

Sector relevance is still printed and still orders — it was demoted, not removed.
Ranking by vocabulary first is what put three dealer inventory pages at the top of
the Chicago Motor Cars brief and left every record documenting overlap, scale
collision and grid interruption below rating.

**`in` — eligible as primary or secondary**

| Record | Rating | Status | Device hits | Sector hits | Approved layers | Alex's layer verdicts |
|---|---|---|---|---|---|---|
| `mclaren-com-cars-gl-en` | 2 | in | 12 | 13 | — | — |
| `ruadh-com` | 2 | in | 11 | 15 | — | — |
| `rekorderstudios-com` | 3 | in | 10 | 30 | — | — |
| `semlerpremium-dk-showroom` | 3 | in | 9 | 23 | 7 | composition:IN, composition:IN, hierarchy:IN, typography:IN, spacing / density:IN, imagery:IN, imagery:OUT, interaction:IN, interaction:OUT |
| `oilstainlab-com` | 3 | in | 9 | 17 | — | — |
| `thenewmobileworkforce-imm-g-prod-com-back-at-hq` | 2 | in | 9 | 13 | — | — |
| `semlerpremium-dk-brands-porsche-911-gt3-11cec851-9b66-4905-a` | 3 | in | 8 | 16 | 6 | composition:IN, composition:IN, composition:OUT, composition:OUT, hierarchy:IN, hierarchy:OUT, typography:IN, spacing / density:IN, imagery:IN, imagery:OUT |
| `kinncollective-co-uk` | 2 | in | 8 | 13 | — | — |
| `i-pinimg-com-736x-46-d9-d5-46d9d54b7cc97b5687cbfd24a1410d34-` | 2 | in | 8 | 7 | — | — |
| `immersive-g-com` | 3 | in | 7 | 8 | 7 | composition:IN, hierarchy:IN, typography:IN, imagery:IN, spacing / density:IN, motion:IN, interaction:IN |
| `hispanosuizacars-com` | 2 | in | 7 | 21 | — | — |
| `morningstar-ventures` | 3 | in | 6 | 22 | — | — |
| `rolls-roycemotorcars-com-en-us-home-html` | 3 | in | 6 | 13 | 8 | composition:IN, hierarchy:IN, colour:IN, spacing / density:IN, motion:IN, interaction:IN, interaction:IN, design dialect:IN |
| `organimo-com` | 3 | in | 6 | 12 | 7 | composition:IN, typography:IN, colour:IN, imagery:IN, spacing / density:IN, motion:IN, interaction:IN |
| `semlerpremium-dk` | 2 | in | 6 | 23 | 6 | composition:IN, composition:OUT, hierarchy:IN, typography:IN, spacing / density:IN, imagery:IN, imagery:OUT, interaction:IN, motion:OUT |
| `polestar-com-us` | 2 | in | 6 | 21 | 8 | composition:IN, composition:IN, composition:OUT, composition:OUT, hierarchy:IN, hierarchy:OUT, typography:IN, layout:IN, colour:IN, imagery:IN, imagery:OUT, interaction:IN |
| `beings-co` | 3 | in | 5 | 15 | — | — |
| `rimac-automobili-com-nevera` | 2 | in | 5 | 20 | — | — |
| `electrafilmworks-com` | 2 | in | 5 | 12 | — | — |
| `unitedcarriers-com` | 3 | in | 4 | 9 | — | — |
| `augen-pro` | 2 | in | 4 | 15 | — | — |
| `trionn-com` | 2 | in | 4 | 14 | — | — |
| `mugenstudio-framer-website` | 2 | in | 4 | 6 | 7 | composition:IN, composition:IN, composition:OUT, hierarchy:IN, typography:IN, colour:IN, spacing / density:IN, interaction:IN, interaction:OUT, imagery:OUT, risks:OUT |
| `hashgraphvc-com` | 3 | in | 3 | 3 | — | — |
| `obys-agency` | 2 | in | 3 | 0 | 4 | composition:IN, colour:IN, imagery:IN, motion:IN |
| `ciridae-com` | 3 | in | 2 | 6 | — | — |
| `eco-com` | 2 | in | 2 | 9 | 7 | composition:IN, composition:IN, hierarchy:IN, typography:IN, colour:IN, spacing / density:IN, spacing / density:OUT, interaction:IN |

**`hybrid` — contextual only, limited to the named layer or function. Never presented as an overall positive reference.**

| Record | Rating | Status | Device hits | Sector hits | Approved layers | Alex's layer verdicts |
|---|---|---|---|---|---|---|
| `porsche-com-usa` | 2 | hybrid | 5 | 22 | — | — |
| `pensatori-irrazionali-com` | 3 | hybrid | 4 | 4 | — | — |

**`out` — anti-references only: prohibitions and failure patterns.**

| Record | Rating | Status | Device hits | Sector hits | Approved layers | Alex's layer verdicts |
|---|---|---|---|---|---|---|
| `hbbody-com-en-home` | 2 | out | 11 | 26 | — | — |
| `collabcapitolium-fr` | 3 | out | 5 | 6 | — | — |
| `lapz-io` | 3 | out | 4 | 28 | — | — |
| `rivian-com` | 2 | out | 3 | 22 | — | — |
| `rmsothebys-com` | 1 | out | 2 | 9 | 3 | composition:IN, composition:OUT, composition:OUT, typography:IN, typography:OUT, colour:IN, imagery:OUT, interaction:OUT |
| `thegentlewoman-co-uk` | 1 | out | 1 | 14 | 5 | composition:IN, composition:OUT, typography:IN, colour:IN, imagery:IN, spacing / density:IN, interaction:OUT |
| `coffee-tech-com` | 2 | out | 0 | 3 | — | — |

## Exclusions — explicit project verdicts, applied before ranking

**A record listed here was barred from this project by Alex. The bar is absolute:
it is applied before any ranking, so no axis can return it — not rating, not
compositional operation, not sector relevance, and not an axis added later. Its
standing everywhere else is untouched.**

| Record | Verdict | Reason |
|---|---|---|
| — | — | none recorded for this project |

## Dialects available

| Dialect | Status |
|---|---|
| `auction-editorial` | **confirmed** |
| `brutalist-utility` | **library** |
| `cinematic-industrial` | **library** |
| `expressive-poster` | **library** |
| `immersive-authored-world` | **confirmed** |
| `organic-tactile` | **library** |
| `refined-elegance` | **library** |
| `retro-futurist` | **library** |
| `swiss-editorial` | **library** |
| `technical-luxury` | **provisional** |

**A `library` dialect may be selected as a project method and must be labelled as
one. Only a `confirmed` dialect may be called a demonstrated personal preference;
a `provisional` one keeps its label.**

---

## 1. Dialect

**Style mode: DIRECTED HYBRID.** Anchor `cinematic-industrial` (library — taken as a project method, not as a stated preference); signature `technical-luxury` (provisional), borrowing exactly one device from it, the comparison row. [J]

What decided it: Gunther Werks' own photography already argues by light — a dark cove, one coloured rim light, haze, a glossy floor, a small car in a large field (research/corp/GUNTHER_WERKS_CI.md §3.4). That is the anchor's thesis, "light, scale and material consequence do the persuading", and it is the client's carrier, not our taste. The signature comes from the product: an atelier that makes "over 90%" of components in-house (BG-PDF) is sold on evidence, and every program shares one base car and one camera angle in its cutouts, which is exactly what a comparison row needs. [J]

Not chosen: `auction-editorial` (confirmed) — not named by Alex for this project, so its hairlines, mono micro-labels and spec plates stay out. `immersive-authored-world` (confirmed) — loaded only when a Read selects it explicitly; the scroll-scrub idea does not by itself make the page a staged world. [J]

**Mandate: REDESIGN.** Carried through untouched: the GUNTHER / W E R K S wordmark and GW monogram (SVG, black and white, in assets/logos), the model logotypes, the black-and-white ground with one accent per program, the uppercase humanist-sans voice, the dark-cove photographic treatment, the "not a manufacturer — an atelier" positioning. In scope: layout, hierarchy, composition, sitemap, motion. The sibling Prestige sites (Czinger, Pagani, Lamborghini) are not carriers: their grounds, palettes and type are not inherited. [J]

## 2. References

- **Primary:** `rolls-roycemotorcars-com-en-us-home-html` — the video reads as a continuation of the surrounding environment rather than a box; every element speaks one visual language. The model for a scrubbed film that melts into the black cove. [R site:rolls-roycemotorcars-com-en-us-home-html layer:motion]
- **Primary:** `oilstainlab-com` — the closest sector match (a small builder of an obsessive machine): product, language and interaction aligned, attitude before specification. Taken for that alignment only; its friction (a navigation the visitor must learn) is recorded as an anti-pattern below. [R site:oilstainlab-com]
- **Secondary:** `rimac-automobili-com-nevera` — numbers treated as visual moments rather than table rows; its weakness (too long, repetitive by the end) bounds how many such moments we spend. [R site:rimac-automobili-com-nevera]
- **Secondary:** `semlerpremium-dk-showroom` — inventory given editorial hierarchy without dealer-card chrome; the model for Provenance Succession (certified pre-owned). [R site:semlerpremium-dk-showroom layer:composition]
- **Secondary:** `immersive-g-com` — scroll that drives the narrative rather than decorating it. [R site:immersive-g-com layer:motion]
- **Contextual:** `porsche-com-usa` (hybrid) — **function only**: the progression from brand emotion to model to dealer action. Its rounded gradient model tiles are not taken. [R site:porsche-com-usa]
- **Anti-reference:** `hbbody-com-en-home` — overlays on every chapter; Alex's own weakness note: the page loses its quiet stretches when every chapter is equally strong. `lapz-io` — the concept communicated better than the product. `rmsothebys-com` (rating 1) — dark luxury with nothing behind it. [R site:hbbody-com-en-home]
- **Not carried forward**, with the reason each one lost: `hispanosuizacars-com` — myth before product, a fragmented sequence; GW's buyer needs the programs quickly. `mclaren-com-cars-gl-en` — ambiguous reading-order risk. `rekorderstudios-com` — display-serif editorial, ambiguous reading order, mobile recomposition risk. `ruadh-com`, `beings-co`, `kinncollective-co-uk` — they carry the identity-first evidence (A1, A2) but are fashion and identity pages, not product pages. `organimo-com` — strong, but its accent-led colour has no carrier here.

## 3. Art direction

Governing idea, proposed for the Concept stage: **the atelier lights each car the way it builds it — one at a time, in the dark, with the evidence in the light.** The page is the cove: a black field where one program at a time is lit, and what the light falls on is proof (carbon, the Rothsport 4.0, the machined key, the production count). [A]

One governing event per screen, and the first screen belongs to one car and the wordmark — no headline competing with them. [P evidence:A1 sites:beings-co,ciridae-com,ruadh-com,electrafilmworks-com,trionn-com,kinncollective-co-uk]
Identity carried by one system — the cove, its light and the cutouts — never by an accumulation of devices. [P evidence:A2 sites:beings-co,ciridae-com,ruadh-com,electrafilmworks-com,kinncollective-co-uk]
The black ground is the client's carrier, not a taste default: darkness alone does not discriminate approval in the evidence. [P evidence:C2e sites:ciridae-com,electrafilmworks-com,rmsothebys-com]

## 4. Composition and hierarchy

- First screen: one active program in the cove. The F-26 is the natural lead: current flagship, a 4800×2700 dark-cove still, a 4259 px cutout and a 4K film all exist. [J]
- The lineup is one comparison row: the active programs (F-26, Turbo, GWR, GWX) as left-facing side-profile cutouts at one shared scale on one shared ground line, so difference is read from the cars, not from cards. Special editions and legacy follow as a quieter second tier. [J]
- Rarity is the evidence that does not contradict itself: production counts (26 · 75 · 40 · by invitation) are the figures that get size. Horsepower and weight stay small until a single sourced figure is chosen (§13). [J]
- Home sequence: cove/hero → atelier (Peter Nam, the Gunther Wendt name, 90% in-house, Built in California) → lineup → one scrubbed film moment → Provenance Succession → News & Events → Miami (Prestige Imports, Javier Roque) → enquire. The quiet stretches between strong moments are designed, not leftovers. [J]

## 5. Layout and spacing

Large negative space above a small-to-medium car, as in GW's photography; on desktop the car never fills the frame edge to edge. Text never sits on a car. One alignment axis held across sections; content width constrained on 1920+. The phone is authored separately: the comparison row becomes one car at a time, not a shrunken row. [J]

## 6. Typography

GW's voice is an uppercase humanist sans (Gill Sans Nova, in an Adobe Fonts kit on GW's account), Bebas Neue for stat numbers and Javacom for model names (free for personal use only). Decided by Alex (25 Oct 2026): **replace** Gill Sans Nova with the closest freely licensed humanist sans — candidates Cabin (Google Fonts, drawn after Johnston and Gill) and Gillius ADF; chosen at the Concept stage from a render at real sizes. Javacom is not used; model names are carried by GW's own model logotype files. [J] Two voices at most, plus tabular figures for every aligned number. [J]

## 7. Colour

Black and white, with one accent per program exactly as GW assigns them (GXR red, Thermal red, navy, by-invitation gold), used to classify, never to decorate. No gold as a luxury signal outside the by-invitation tier. [J]

## 8. Imagery and video

- Only GW's own imagery (research/corp/assets): the dark-cove stills as the primary register; golden-hour California and macro craft as the second; white-seamless catalogue frames only where a cutout or comparison needs them. No generated or invented vehicles. [J]
- Cutouts: every profile faces left; there are no right-facing, top or rear views (except the GXR-EVO rear). Turbo and Thermal profiles exist only at 1400 px, so they cannot be shown wider than about 700 CSS px at 2x. The Coupe front has its roof cut off; the GWR front is clipped. [J]
- Video: direct MP4s only. Scrub candidates: End Game 0:45.3–0:52.1 crane-down reveal (1080p); F-26 Goodwood 0:02.75–0:08.5 drive-past (4K); Turbo Goodwood 0:06.75–0:14.25 (1080p); Speedster 0:16.75–0:22.25 orbit (720p — contained, never full-bleed). No segments with a burnt-in logo. [J]
- Rights: Prestige is an official Gunther Werks dealer, and this is the official dealer site — GW imagery and film are used under that relationship (Alex, 25 Oct 2026). [J]

## 9. Navigation and control geometry

A quiet header — wordmark, Programs, Provenance, News, Miami, Enquire — subordinate to the content but never below legibility. [P evidence:A3 sites:electrafilmworks-com,ciridae-com,beings-co,ruadh-com] One persistent enquiry action; the phone number and Javier Roque's contact reachable from every page. No navigation the visitor has to learn first. [J]

## 10. Motion and interaction

Motion carries meaning only where the subject is temporal: a scrub is spent on a car that moves (a drive-past, a crane reveal), never on a static object, and never as the default transition between sections. [P evidence:C1e sites:thenewmobileworkforce-imm-g-prod-com-back-at-hq,trionn-com] At most two scrubbed moments on the home page; everything else is still or lightly seasoned. GSAP ScrollTrigger, as named by Alex. Every scrub has a designed reduced-motion still and a separately authored phone version. [J]

## 11. Component guidance

- Comparison row: shared scale, shared ground line, the production count under each car, one link per program. [J]
- Spec block per program: only figures with a source and date. Where GW contradicts itself (Alex does not know which is right), the figure from GW's own dated press release or fact sheet is used and cited; a figure with no dated document behind it is omitted. If wrong, the cost is one number per program to swap. [J]
- Provenance Succession: inventory with editorial hierarchy, no badges, no competing CTAs. Treated as sold through Prestige (Alex, 25 Oct 2026, to be confirmed later); no per-car availability claims until then. [J]
- News & Events: a dated list; third-party coverage shows the outlet and links out; GW press releases open as articles. [J]
- Enquiry: model pre-selectable; routes to Prestige Imports · 15050 Biscayne Blvd · Javier Roque · (305) 783-6493. [J]
- Footer: a non-affiliation line for Porsche, as GW carries. [J]

## 12. Anti-patterns — what this project must not do

- No prices, no "available now", no sold-out claims: GW publishes none, and the only prices on its site are third-party quotes (Motor1, Top Gear). [J]
- No contradicted figure shown as fact (F-26 1,067 vs 1,000 hp; Turbo 850 vs 840; Coupe 435 vs 430+). [J]
- No scroll overlay or scrub on every chapter (the hbbody failure), and no navigation that must be learned (the oilstainlab friction). [R site:hbbody-com-en-home]
- No generic dark luxury: near-black, thin caps, gold and one render, with no evidence in it. No technical decoration without data: crosshairs, dotted lines that align nothing, mono on prose. [J]
- No fake 360 (GW's own "360°" is one flat photo wrapped in a sphere). No mirrored cutouts presented as right-facing views. [J]
- No palette, type or layout carried from Czinger, Pagani or Lamborghini. [J]
- No full-bleed 720p video and no upscaled 1400 px cutouts. [J]

## 13. Evidence

- Research: `PRESTIGE_GUNTHER/research/corp/GUNTHER_WERKS_CI.md` (53 pages, a source on every fact), `research/corp/assets/ASSETS.md` (107 files, alpha verified on 44 cutouts), `research/current-site/CURRENT_SITE_AUDIT.md` (dealer page: contacts and claims only).
- Vault claims used: A1, A2, A3, C2e, C1e (vault/EVIDENCE.md). Reference judgements were read from `note` / `works` / `weaknesses` in vault/sites.json; **the reference screenshots were not re-inspected for this brief** — do that before the Concept stage cites a visual device from them.
- Settled by Alex on 25 Oct 2026: font replaced; official-dealer rights; figures from dated GW documents; Provenance Succession treated as sold through Prestige.
- Still open: [?] Provenance Succession through Prestige, to confirm later; [?] the "official franchise / entire East Coast" claims seen on the dealer page.
- Outside references (DNA97, 25 Oct 2026; Awwwards, dark.design, 21st.dev). Principle taken, never pixels; none is vault evidence until Alex reviews it. Files: `PRESTIGE_GUNTHER/research/references/awwwards/AWWWARDS_REFS.md`, `research/references/21st/21ST_REFS.md`.
  - Scout Motors (scoutmotors.com, Awwwards SOTD 16 Jan 2025): the scrubbed drive is the page, not a box — a canvas sequence of webp frames, captions keyed to film seconds, portrait frames authored for phones. Not taken: 720p frames stretched over wide screens.
  - Charge Cars (dark.design, Hardware): the nearest to GW's own cove — one rim light, haze, a small car; chapters played forward from one MP4 and backward from a pre-rendered reversed copy, so it never seeks backwards. The fallback route for the End Game reveal. Not taken: full-page scroll hijack, the headline on the bonnet, the phone crop of the car.
  - Electronic Materials Office, Altar II (dark.design, Hardware): one lit object on true black; the film plays once and rests on a composed still that is also the poster and the reduced-motion state; a separately rendered portrait film.
  - ESPN "How F1 has evolved since 1950" (Awwwards HM): side profiles on one ground line at one scale — the only live precedent for the comparison row. Not taken: the 60,000 px horizontal hijack.
  - 21st.dev Hero Scrub / Image Sequence: canvas sequence with progressive frame loading; Spec Sheet: compare only the rows that differ.
  - Traps seen: gate screens before the car (Forge), generic dark luxury (Forge), technical decoration with nothing behind it (S-2K), a film boxed into a shrinking card (Spyker), text across the car (ESR, Charge), lineups as cards with mixed angles and scales (Bugatti, Porsche Motorsport).

## 14. Implementation prompt

Build Gunther Werks Miami, a Prestige Imports child site, as a trimmed corporate-type version of guntherwerks.com in our own design. Mandate REDESIGN: GW's wordmark, monogram, model logotypes, black-and-white ground with one accent per program, uppercase humanist voice and dark-cove photography carry through; the sibling Prestige sites are not inherited. Directed hybrid: a cinematic-industrial (library) anchor with the technical-luxury (provisional) comparison row as the one signature device. Home: one lit program owns the first screen; atelier; a comparison row of the four active programs at one scale with production counts; at most two scrubbed film moments (GSAP ScrollTrigger), spent on moving subjects; Provenance Succession; News & Events; Miami; enquire. Pages: F-26, Turbo, GWR, GWX; special editions and legacy grouped; news; contact. Acceptance: no unsourced or contradicted figure, no price, no implied availability; reduced-motion stills and authored phone layouts for every scrub; a whole-page read at 1440 and 390 before anything is shown.

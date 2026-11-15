# TOOLCHAIN.md: the standing design tools

**These tools are always installed. Nobody sets them up again by hand.**
`hooks/mcp-health.mjs` checks every item below at **every SessionStart**, reinstalls or
re-registers whatever is missing, and prints one `MCP health` line into the session. On a
new machine, `npm run setup-machine` (step 6) runs the same script.
*Alex, 2026-11-15: "they must always be there, I don't want to redo this every time".*

If the status line says **NEEDS ATTENTION**, fix it before any design work and tell Alex.
A tool that fails is reported. It is never quietly skipped.

All the tools work **inside** the DNA order, never instead of it. `design-dna` loads first.
A concept follows `DNA102`. Taste comes from `TASTE.md` and `skills/`.

---

## MCP servers (user scope, `~/.claude.json`)

| Server | What it is for | How it is kept | Rules |
|---|---|---|---|
| **awwwards** | References and motion evidence: `search_sites`, `get_site_details`, `get_motion_dna`, `analyze_scroll_map`, `record_site_motion`, `verify_build`… | `awwwards-mcp`, `playwright` and `ffmpeg-static` are installed **globally, side by side**, with Playwright's Chromium. The server is launched as `node <npm root -g>/awwwards-mcp/dist/cli.js`, **never `npx -y`**: npx's cache has no Playwright, which broke it once. | `DNA102` step 1, `DNA97` |
| **awwwards index** | The local index of winners (`~/.awwwards-mcp/cache.db`), so searches cover thousands of sites instead of ~31 per live page. The server refreshes it weekly. | Built once with `node <npm root -g>/awwwards-mcp/dist/index-cli.js` (about 4 minutes, resumable). | — |
| **21st** | Ready blocks: components, themes and templates (`mcp__21st__search`, `get_component`). | HTTP server. Its **API key lives only in `~/.claude.json`**, never in this repo. If the entry is missing, re-add it with `claude mcp add --scope user --transport http 21st https://21st.dev/api/mcp --header "x-api-key: <key>"`. | `DNA96`. The free tier gives free search but only 2 `get_component` pulls a day. |
| **awardy** | Awards intelligence: programmes, winners, entries. | HTTP server, `https://mcp.awardy.ai/mcp`, re-added automatically. Sign in with OAuth: `/mcp` → awardy → Authenticate. | — |
| **fal-ai** | Image and video generation. | Configured by Alex. The read-only tools (search, pricing, schema) are pre-allowed. | `GI1`: every paid generation needs Alex's approval. |
| **chrome-devtools** | Browser QA: viewports, screenshots, console, reduced-motion emulation. | `npx -y chrome-devtools-mcp@latest`, which has no optional dependencies. | DNA86–89 |

## Agent skills (`~/.claude/skills`)

| Set | Skills | Installed by | Rules |
|---|---|---|---|
| **21st.dev** (8) | `21st-ui-build`, `21st-ui-explore`, `21st-ui-review`, `21st-cli-use`, `21st-ai`, `21st-registry`, `21st-design-sync`, `21st-video` | `npx @21st-dev/cli install-skill` | Use them inside the DNA order (TASTE §3). Everything taken is restyled, ported and stripped of demo content. |
| **Awwwards** (9) | `awwwards-inspiration`, `awwwards-motion-study`, `awwwards-section-loop`, `awwwards-design-md`, `awwwards-setup`, `awwwards-doctor`, `awwwards-atlas`, `motion-authoring`, `recreate` | `npx skills add INSANE0777/awwwards-skills -g -a claude-code --copy -y` | `inspiration` and `motion-study` are how DNA102 step 1 runs. `recreate`, `section-loop` and `design-md` are for study builds or a client's **own** site only (TASTE §3, `DNA97`). |
| **ui-ux-pro-max** | Styles, palettes, font pairings, motion presets | Claude plugin | A reference library and an allowed starting point; the style is turned into the idea sentence (TASTE §3, `CG1`). |
| **DNA skills** | `design-dna`, the taste skills, `gsap-implementation`, `animejs-implementation`, `scroll-site`… | Linked from `skills/` by `npm run setup-machine` | `TASTE.md` |

## Hooks (`~/.claude/settings.json`)

| Hook | Event | What it does |
|---|---|---|
| `hooks/design-dna-gate.mjs` | SessionStart | Injects the DNA manifest: what to read and in what order. |
| `hooks/design-dna-gate.mjs` | PreToolUse (Edit / Write / MultiEdit) | Injects the binding rules for the design file being edited. |
| `hooks/mcp-health.mjs` | SessionStart | Checks and repairs everything on this page, and re-registers all three hooks if they are gone. |

*Found on 2026-11-15: the hooks block was empty, and the DNA gate had never run.*

## Palettes the concept reads

- [`TECHNIQUES.md`](TECHNIQUES.md): motion techniques, surfaces, and reference libraries to offer.
- The vault (`vault/`): Alex's own judgements, read first.

## Adding a tool

1. Install it at **user scope** and globally, never through a throwaway cache.
2. Add its check and its repair to `hooks/mcp-health.mjs`.
3. Add a row here, with what it is for and the rule that governs it.
4. If it overlaps the DNA's triggers, record in TASTE §3 that it works inside the DNA order.
5. Commit and push.

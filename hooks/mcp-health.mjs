#!/usr/bin/env node
/**
 * MCP health — runs at SessionStart, checks the design toolchain, and repairs it.
 *
 * WHY. On 2026-11-15 the Awwwards MCP lost Playwright without anyone noticing. It
 * was launched with `npx -y awwwards-mcp`, so npx kept it in a throwaway cache. A
 * new version landed in a fresh cache folder, and Playwright (never a dependency of
 * the package) was not in it. `get_motion_dna` failed on every site, and the concept
 * was directed without motion evidence. Alex: "this must be a rule, 100%".
 *
 * WHAT IT GUARANTEES, every session:
 *   - awwwards-mcp, playwright and ffmpeg-static are installed GLOBALLY (persistent),
 *     and Playwright's Chromium is present. Anything missing is reinstalled.
 *   - ~/.claude.json launches awwwards from the global install (node + cli.js), never
 *     through `npx -y`. If the entry has drifted, it is rewritten.
 *   - The 21st.dev MCP is configured at user scope. Its API key is a secret, so it is
 *     never stored here. When the entry is missing, the hook says how to re-add it.
 * It prints one status line, which SessionStart adds to the session's context.
 */
process.noDeprecation = true;
import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const win = process.platform === 'win32';
const run = (cmd, args, timeout = 600000) =>
  spawnSync(cmd, args, { encoding: 'utf8', shell: win, timeout, windowsHide: true });

const notes = [];
const repaired = [];

const root = (run('npm', ['root', '-g'], 30000).stdout || '').trim();
const pkg = (name) => join(root, name, 'package.json');
const cli = join(root, 'awwwards-mcp', 'dist', 'cli.js');

function chromiumOk() {
  try {
    const req = createRequire(join(root, 'awwwards-mcp', 'package.json'));
    const exe = req('playwright').chromium.executablePath();
    return existsSync(exe);
  } catch { return false; }
}

if (!root) {
  notes.push('npm root -g failed: is Node on PATH?');
} else {
  const missing = ['awwwards-mcp', 'playwright', 'ffmpeg-static'].filter((n) => !existsSync(pkg(n)));
  if (missing.length) {
    const r = run('npm', ['i', '-g', 'awwwards-mcp', 'playwright', 'ffmpeg-static']);
    if (r.status === 0) repaired.push(`installed ${missing.join(', ')}`);
    else notes.push(`npm i -g failed: ${(r.stderr || '').split('\n').slice(-3).join(' ')}`);
  }
  if (existsSync(pkg('playwright')) && !chromiumOk()) {
    const r = run('node', [join(root, 'playwright', 'cli.js'), 'install', 'chromium']);
    if (r.status === 0 && chromiumOk()) repaired.push('installed Playwright Chromium');
    else notes.push('Playwright Chromium missing and install failed');
  }
}

// ~/.claude.json — awwwards from the global install; 21st present.
const cfgPath = join(homedir(), '.claude.json');
let has21st = false;
let hasAwardy = false;
try {
  const cfg = JSON.parse(readFileSync(cfgPath, 'utf8'));
  cfg.mcpServers ??= {};
  const want = { type: 'stdio', command: 'node', args: [cli], env: {} };
  const cur = cfg.mcpServers.awwwards;
  if (root && existsSync(cli) && JSON.stringify(cur) !== JSON.stringify(want)) {
    cfg.mcpServers.awwwards = want;
    writeFileSync(cfgPath, JSON.stringify(cfg, null, 2));
    repaired.push(cur ? 'awwwards MCP repointed to the global install (restart to apply)' : 'awwwards MCP added (restart to apply)');
  }
  has21st = Boolean(cfg.mcpServers['21st']);
  // Awardy (awards intelligence, OAuth — no secret stored). Added by Alex 2026-11-15.
  if (!cfg.mcpServers.awardy) {
    cfg.mcpServers.awardy = { type: 'http', url: 'https://mcp.awardy.ai/mcp' };
    writeFileSync(cfgPath, JSON.stringify(cfg, null, 2));
    repaired.push('awardy MCP re-added (restart, then /mcp → awardy → Authenticate)');
  }
  hasAwardy = true;
} catch (e) {
  notes.push(`could not read ${cfgPath}: ${e.message}`);
}
// 21st.dev's official agent skills (search/install/build/explore/review/video) — installed by
// `npx @21st-dev/cli install-skill` (Alex, 2026-11-15). Reinstalled when any is missing.
const SKILLS_21ST = ['21st-ai', '21st-cli-use', '21st-design-sync', '21st-registry', '21st-ui-build', '21st-ui-explore', '21st-ui-review', '21st-video'];
const skillsDir = join(homedir(), '.claude', 'skills');
const missingSkills = () => SKILLS_21ST.filter((n) => !existsSync(join(skillsDir, n, 'SKILL.md')));
if (missingSkills().length) {
  const r = run('npx', ['-y', '@21st-dev/cli', 'install-skill'], 300000);
  const still = missingSkills();
  if (r.status === 0 && !still.length) repaired.push('reinstalled 21st skills');
  else notes.push(`21st skills missing: ${still.join(', ')} — run: npx @21st-dev/cli install-skill`);
}

if (!has21st) {
  notes.push('21st.dev MCP is MISSING. Re-add it: claude mcp add --scope user --transport http 21st https://21st.dev/api/mcp --header "x-api-key: <21st key>"');
}

// ~/.claude/settings.json — the two DNA hooks stay registered. On 2026-11-15 the
// hooks block was found EMPTY: design-dna-gate.mjs (the DNA manifest at
// SessionStart, binding rules on every design edit) had never been running.
{
  const here = fileURLToPath(new URL('.', import.meta.url)).replace(/\\/g, '/').replace(/\/$/, '');
  const gate = `node "${here}/design-dna-gate.mjs"`;
  const self = `node "${here}/mcp-health.mjs"`;
  const setPath = join(homedir(), '.claude', 'settings.json');
  try {
    const s = existsSync(setPath) ? JSON.parse(readFileSync(setPath, 'utf8')) : {};
    s.hooks ??= {};
    const has = (event, cmd) => (s.hooks[event] || []).some((e) => (e.hooks || []).some((h) => (h.command || '').includes(cmd)));
    const added = [];
    if (!has('SessionStart', gate)) { (s.hooks.SessionStart ??= []).unshift({ hooks: [{ type: 'command', command: gate, timeout: 30 }] }); added.push('DNA gate (SessionStart)'); }
    if (!has('SessionStart', self)) { (s.hooks.SessionStart ??= []).push({ hooks: [{ type: 'command', command: self, timeout: 900 }] }); added.push('MCP health (SessionStart)'); }
    if (!has('PreToolUse', gate)) { (s.hooks.PreToolUse ??= []).push({ matcher: 'Edit|Write|MultiEdit', hooks: [{ type: 'command', command: gate, timeout: 30 }] }); added.push('DNA gate (PreToolUse)'); }
    if (added.length) { writeFileSync(setPath, JSON.stringify(s, null, 2)); repaired.push(`re-registered hooks: ${added.join(', ')} (restart to apply)`); }
  } catch (e) {
    notes.push(`could not check hooks in ${setPath}: ${e.message}`);
  }
}

const ver = (n) => { try { return JSON.parse(readFileSync(pkg(n), 'utf8')).version; } catch { return '—'; } };
const ok = !notes.length;
const line = [
  `MCP health ${ok ? 'OK' : 'NEEDS ATTENTION'}:`,
  `awwwards ${ver('awwwards-mcp')} (global) · playwright ${ver('playwright')} · chromium ${chromiumOk() ? 'ok' : 'missing'} · ffmpeg ${existsSync(pkg('ffmpeg-static')) ? 'ok' : 'missing'} · 21st MCP ${has21st ? 'configured' : 'MISSING'} · awardy ${hasAwardy ? 'configured' : 'MISSING'} · 21st skills ${missingSkills().length ? 'MISSING' : SKILLS_21ST.length}.`,
  'Standing design tools: Awwwards MCP for references and motion (DNA102), 21st.dev MCP + skills for every block (DNA96: search is free; on the free tier get_component works 2×/day). The 21st skills work INSIDE the DNA order — design-dna loads first, concepts follow DNA102 — never instead of it.',
  repaired.length ? `Repaired: ${repaired.join('; ')}.` : '',
  notes.length ? `Problems: ${notes.join(' | ')}` : '',
].filter(Boolean).join(' ');
process.stdout.write(line + '\n');

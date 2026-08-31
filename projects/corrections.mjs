#!/usr/bin/env node
/**
 * What Alex actually changed — the strongest evidence this system can get.
 *
 *   node projects/corrections.mjs "<path to project>" [--window 20] [--since 2026-08-01]
 *
 * WHY THIS EXISTS
 *
 * `vault/` judges other people's sites. `vault/transcripts.mjs` reads what Alex
 * complained about. Both are one-sided: a complaint records the judgement and not
 * the fix, and a fix in git records the change and not the reason.
 *
 * This joins them. A correction-shaped message, and the commit that landed a few
 * minutes later, are two halves of one piece of evidence — the judgement and the
 * concrete change it produced. Nothing has to be interpreted, because both halves
 * were written down at the time.
 *
 * WHY THE JOIN IS BY TIME AND NOT BY AUTHOR
 *
 * Measured on Chicago Motor Cars, 2026-08-31: 216 commits, every one authored by
 * Alex under three spellings of his own name, every message written in the agent's
 * voice. Authorship cannot separate what an agent produced from what Alex fixed,
 * and no heuristic on the message text can either.
 *
 * Timing can. On the same repo, six correction messages sampled at random each had
 * a commit 1–9 minutes later that described exactly the fix asked for.
 *
 * WHAT THIS SCRIPT WILL NOT DO
 *
 * It will not tell you which bucket a pair belongs in. That is judgement and it
 * needs the skills read:
 *
 *   · an existing rule was broken   → a compliance problem, not a missing rule
 *   · no rule covers it             → a distillation candidate
 *   · the taste of this one project → the project record, never the rules
 *
 * Without that split every finding lands in one heap and the report stops being
 * read. The `project-recorder` agent does the split; this script hands it facts.
 *
 * The pairs are also NOT proof. A twenty-minute window catches a commit that was
 * already in flight before the message arrived. Every pair is a proposal for a
 * human to confirm, which is why the gap is printed on every line.
 */
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, resolve, basename } from 'node:path';
import { homedir } from 'node:os';
import { execFileSync } from 'node:child_process';

const TRANSCRIPTS = join(homedir(), '.claude', 'projects');

/* Claude keys a session directory to its working directory, with every character
   that is not a letter or a digit replaced by a dash. One project can own several
   of them — a session started in a subfolder gets its own. */
const encode = (p) => p.replace(/[^A-Za-z0-9]/g, '-');

/* A message is evidence only if it corrects something. A request carries no
   information about taste: "add the address" says nothing that "the address is
   missing again" does not say better. */
const CORRECTION = new RegExp([
  'propustil', 'пропустил', 'opjatj', 'опять', 'ja zhe', 'я же',
  'ne tak', 'не так', 'ne rabotaet', 'не работает', 'peredelaj', 'переделай',
  'uberi', 'убери', 'udali', 'удали', 'zameni', 'замени', 'pomenj', 'поменя',
  'ne prosil', 'не просил', 'zachem', 'зачем', 'pochemu ti', 'почему ты',
  'ne vizhu', 'не вижу', 'propal', 'пропал', 'slomal', 'сломал',
  'ne nado', 'не надо', 'ploho', 'плохо', 'uzhasno', 'ужасно',
].join('|'), 'i');

/* Hints only. A hint is a reason to go and read the rule, never a verdict — the
   verdict needs the rule's own text and its boundaries section. */
const RULE_HINTS = [
  [/podcherkiv|подчёркив|подчеркив|underline/i, 'anti-patterns D-tier — underlined nav is a trope ban'],
  [/kontrast|контраст|ne vidno|не видно|blekl|блёкл/i, 'color-taste I1 — AA on the composited render'],
  [/melk|мелк|malenjk|маленьк|ne prochitatj|не прочитать/i, 'typography I7 — the 14px floor'],
  [/otstup|отступ|tesn|тесн|vozduh|воздух|spacing/i, 'spacing I1/I2 — hierarchy and the token scale'],
  [/ne dvigaetsja|не двигается|scroll|скролл|anim/i, 'motion-judgment MJ1/MJ4 — declared role, designed frames'],
  [/placeholder|плейсхолдер|zaglushk|заглушк|lorem/i, 'content-provenance CP4 — a placeholder must look like one'],
  [/vse foto|все фото|vesj kontent|весь контент|propustil|пропустил/i, 'no rule yet — the CP8 candidate (supplied material dropped)'],
  [/shablon|шаблон|skuchn|скучн|basic|generic/i, 'no rule yet — generic output with the system loaded'],
];

/* ── arguments ─────────────────────────────────────────────────────────────── */
const argv = process.argv.slice(2);
const flag = (name, dflt) => {
  const i = argv.indexOf(`--${name}`);
  return i === -1 ? dflt : argv[i + 1];
};
const target = argv.find((a) => !a.startsWith('--') && argv[argv.indexOf(a) - 1] !== '--window'
  && argv[argv.indexOf(a) - 1] !== '--since');
const WINDOW = Number(flag('window', 20)) * 60 * 1000;
const SINCE = flag('since', null);

if (!target) {
  console.error('usage: node projects/corrections.mjs "<path to project>" [--window 20] [--since YYYY-MM-DD]');
  process.exit(1);
}
const projectPath = resolve(process.cwd(), target);
if (!existsSync(join(projectPath, '.git'))) {
  console.error(`not a git repository: ${projectPath}`);
  console.error('the join needs commits — a folder with no history has nothing to pair against.');
  process.exit(1);
}

/* ── the two halves ────────────────────────────────────────────────────────── */
export function sessionsFor(projectPath, root = TRANSCRIPTS) {
  const key = encode(projectPath);
  if (!existsSync(root)) return [];
  return readdirSync(root).filter((d) => d === key || d.startsWith(key + '-'));
}

export function corrections(projectPath, { root = TRANSCRIPTS, since = null } = {}) {
  const out = [];
  for (const dir of sessionsFor(projectPath, root)) {
    const full = join(root, dir);
    let files = [];
    try {
      if (!statSync(full).isDirectory()) continue;
      files = readdirSync(full).filter((f) => f.endsWith('.jsonl'));
    } catch { continue; }
    for (const file of files) {
      let raw;
      try { raw = readFileSync(join(full, file), 'utf8'); } catch { continue; }
      for (const line of raw.split('\n')) {
        if (!line.trim()) continue;
        let o;
        try { o = JSON.parse(line); } catch { continue; }
        const m = o.message ?? {};
        if ((m.role ?? o.type) !== 'user') continue;
        const c = m.content;
        const text = (typeof c === 'string' ? c
          : Array.isArray(c) ? c.filter((b) => b?.type === 'text').map((b) => b.text ?? '').join('\n')
            : '').trim();
        if (!text || text.length > 400) continue;
        if (/^Base directory|^<[a-z_-]+>|^Another Claude session|^This session is being/i.test(text)) continue;
        if (!CORRECTION.test(text)) continue;
        const at = new Date(o.timestamp ?? 0);
        if (Number.isNaN(+at) || +at === 0) continue;
        if (since && at < new Date(since)) continue;
        out.push({ at, text: text.replace(/\s+/g, ' ') });
      }
    }
  }
  return out.sort((a, b) => a.at - b.at);
}

export function commits(projectPath, { since = null } = {}) {
  const args = ['-C', projectPath, 'log', '--format=%H%x1f%aI%x1f%s', '--no-merges'];
  if (since) args.push(`--since=${since}`);
  return execFileSync('git', args, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 })
    .trim().split('\n').filter(Boolean)
    .map((l) => { const [sha, iso, subject] = l.split('\x1f'); return { sha, at: new Date(iso), subject }; })
    .sort((a, b) => a.at - b.at);
}

/** Pair each correction with the first commit inside the window. */
export function pair(corr, coms, window = WINDOW) {
  const used = new Set();
  const pairs = [];
  for (const c of corr) {
    const hit = coms.find((k) => !used.has(k.sha) && k.at >= c.at && k.at - c.at <= window);
    if (!hit) continue;
    used.add(hit.sha);
    pairs.push({ ...c, commit: hit, gapMin: Math.round((hit.at - c.at) / 60000) });
  }
  return pairs;
}

/* ── report ────────────────────────────────────────────────────────────────── */
const corr = corrections(projectPath, { since: SINCE });
const coms = commits(projectPath, { since: SINCE });
const pairs = pair(corr, coms);
const name = basename(projectPath);

console.log('');
console.log(`corrections — ${name}`);
console.log(`  ${sessionsFor(projectPath).length} session dir(s) · ${corr.length} correction-shaped messages`
  + ` · ${coms.length} commits · ${pairs.length} paired inside ${WINDOW / 60000} min`);
console.log('');

if (!pairs.length) {
  console.log('  nothing paired. Either the sessions are on the other machine, or the');
  console.log('  work was not committed as it went. Widen with --window, or check that');
  console.log('  this project has a session directory at all.');
  console.log('');
  process.exit(0);
}

for (const p of pairs) {
  const hints = RULE_HINTS.filter(([rx]) => rx.test(p.text)).map(([, h]) => h);
  console.log(`  ${p.at.toISOString().slice(0, 16).replace('T', ' ')}  (+${p.gapMin}m)`);
  console.log(`    asked : ${p.text.slice(0, 160)}`);
  console.log(`    fixed : ${p.commit.sha.slice(0, 8)}  ${p.commit.subject.slice(0, 130)}`);
  for (const h of hints) console.log(`    hint  : ${h}`);
  console.log('');
}

console.log('  Every pair above is a PROPOSAL, not a finding. A 20-minute window will');
console.log('  sometimes catch a commit that was already in flight — read the gap, and');
console.log('  drop the ones where the commit does not answer the message.');
console.log('');
console.log('  Then split what survives into three, which this script deliberately does');
console.log('  not do: an existing rule was broken · no rule covers it · the taste of');
console.log('  this one project. Only the middle one is a distillation candidate.');
console.log('');

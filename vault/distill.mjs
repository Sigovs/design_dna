#!/usr/bin/env node
/**
 * npm run distill — the detection half of the distillation ritual, automated.
 *
 *   npm run distill              report candidates for the whole vault
 *   npm run distill -- --since 2026-07-30    only entries added after a date
 *   npm run distill -- --write   also write vault/DISTILL-CANDIDATES.md
 *
 * WHAT THIS DOES AND DOES NOT DO.
 * It reads every entry's note / works / weaknesses, matches them against a
 * declared theme lexicon, weights by rating, applies the ritual's own evidence
 * thresholds, and reports which themes recur — quoting the matched sentence from
 * each entry so the evidence is verifiable rather than asserted.
 *
 * It does NOT write rules. A rule needs a tier decision, an identifier, an
 * argument, and a check against what the skills already say — and today's first
 * ritual run proved why: the amendment that landed contradicted an existing line
 * in the same skill (11px mono labels), which a mechanical merge would have left
 * standing. Detection is arithmetic; authorship is judgement.
 *
 * THE LEXICON IS THE HONEST PART. It is declared below, in the open, in both
 * languages the vault is written in. A theme this file cannot see is a theme the
 * report will miss — so when a run says "nothing new", check the lexicon before
 * believing it.
 */

import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const VAULT = dirname(fileURLToPath(import.meta.url));
const argv = process.argv.slice(2);
const WRITE = argv.includes('--write');
const SINCE = (() => {
  const i = argv.indexOf('--since');
  return i > -1 ? argv[i + 1] : null;
})();

/* ── the lexicon ───────────────────────────────────────────────────────────
   theme → what to match, and which rule already covers it. `covered: null`
   means the skills say nothing about it yet: those are the candidates. */
const THEMES = [
  {
    key: 'micro-type',
    label: 'functional text set too small to read',
    patterns: [/мелк/i, /микротекст/i, /microtype/i, /micro-?text/i, /too small/i, /слишком мал/i],
    covered: 'typography I7',
  },
  {
    key: 'asset-dependence',
    label: 'identity carried by one class of asset',
    patterns: [
      /сильно завис/i, /очень завис/i, /depends heavily/i,
      /(heavy|complete) dependence on/i, /dependence on (exceptional|pre-existing|the strength)/i,
      /станет generic/i, /become generic/i, /поставь обычн/i,
    ],
    covered: 'composition C17',
  },
  {
    key: 'persistent-overlays',
    label: 'permanent layers taking the page',
    /* Tightened after the first run: bare /overlay/ matched "minimal overlay
       typography" (praise) and /перекрыва/ matched portraits overlapping a
       wordmark. A theme has to match the COMPLAINT, not the vocabulary. */
    patterns: [
      /cookie/i,
      /(floating|persistent|sticky)[^.]{0,40}(chat|panel|nav|capsule|widget)/i,
      /(chat|panel|banner)[^.]{0,30}(перекрыва|overlap|cover)/i,
      /перекрыва\w+ (значительную|большую) часть/i,
      /(chrome|arrow)[^.]{0,20}overlays? on/i,
      /кастомн\w* курсор/i, /custom cursor/i,
    ],
    covered: 'anti-patterns U10',
  },
  {
    key: 'repeated-mechanism',
    label: 'the same compositional mechanism repeated across sections',
    patterns: [/одинаков\w* схем/i, /почти одинаков/i, /предсказуем/i, /знаком\w* последовательност/i, /repeats essentially/i, /familiar sequence/i, /same compositional mechanism/i],
    covered: 'composition C7',
  },
  {
    key: 'low-contrast',
    label: 'contrast below the floor',
    patterns: [/контраст\w* (слишком )?низк/i, /слабоват\w* по контраст/i, /недостаточно контрастн/i, /low contrast/i, /sacrifices .*contrast/i],
    covered: 'color I1 · anti-patterns U2',
  },
  {
    key: 'mobile-loss',
    label: 'the composition not re-established on a small screen',
    patterns: [/mobile-recomposition/i, /на мобильн\w* тер/i, /desktop-motion-advantage/i, /mobile.*(теряет|ломается)/i],
    covered: 'composition C12',
  },
  {
    key: 'first-screen-unclear',
    label: 'the first screen does not say what this is',
    patterns: [
      /не сразу (очевидно|понятно|объясня)/i, /не объясня\w+, чем/i, /не сразу ясно/i,
      /хуже объясняет/i, /not (immediately )?(obvious|clear) what/i, /unclear what/i,
    ],
    /* Was `null` until 2026-07-30, when this theme crossed the threshold and
       became C18. WHEN A RULE LANDS, MOVE ITS THEME HERE — a theme left as a
       candidate makes the watch file an issue for a rule that already exists,
       and two of those teach you to ignore the third. */
    covered: 'composition C18',
  },

  /* ── no rule covers these yet ─────────────────────────────────────────── */
  {
    key: 'device-over-content',
    label: 'the mechanism demonstrating itself instead of revealing the content',
    patterns: [
      /демонстрир\w+ (возможности|технолог)/i, /посмотри, что мы/i, /не раскрывает содержан/i,
      /demonstrat\w+ the (technology|capability)/i, /утомитель/i,
    ],
    covered: null,
  },
  {
    key: 'empty-reads-as-broken',
    label: 'emptiness read as a loading failure',
    patterns: [/будто контент не загруз/i, /контент не загруз/i, /настолько пуст/i, /looks like .*not loaded/i, /content failed to load/i],
    covered: null,
  },
  {
    key: 'gate-before-content',
    label: 'the visitor made to learn the interface before getting the content',
    patterns: [/сначала осваивает/i, /требует изучения/i, /preloader/i, /trapping the visitor/i, /learn the interface/i],
    covered: null,
  },
];

/* ── evidence ─────────────────────────────────────────────────────────────── */
const sites = JSON.parse(readFileSync(join(VAULT, 'sites.json'), 'utf8'));

/* ── layer verdicts from the revision sidecars ─────────────────────────────
   Only rows Alex judged count. An agent observation is not evidence about taste;
   `unreviewed` is the answer "noticed, not judged" and must never be counted as
   either side; `contextual` is project-local by definition. Revisions of one
   site are one reference no matter how many times it was reviewed, so verdicts
   are collapsed per record id and per layer. */
function layerVerdicts() {
  const dir = join(VAULT, 'reviews');
  if (!existsSync(dir)) return [];
  const rows = [];
  for (const f of readdirSync(dir).filter((n) => n.endsWith('.md'))) {
    const id = f.replace(/\.md$/, '');
    const rec = sites.find((e) => e.id === id);
    if (!rec) continue;
    const seen = new Set();
    for (const line of readFileSync(join(dir, f), 'utf8').split('\n')) {
      const m = line.match(/^\|\s*([a-z][a-z \/]+?)\s*\|\s*(.+?)\s*\|\s*(Alex|agent)\s*\|\s*(IN|OUT|unreviewed|contextual)\s*\|/i);
      if (!m) continue;
      const [, layer, observation, source, verdict] = m;
      if (!/^alex$/i.test(source)) continue;                 // agent-only: not evidence
      if (!/^(IN|OUT)$/i.test(verdict)) continue;            // unreviewed / contextual: not evidence
      if (/^<|not verified/i.test(observation)) continue;    // an unfilled template row
      const key = layer.toLowerCase() + '|' + verdict.toUpperCase();
      if (seen.has(key)) continue;                           // one record counts once per layer
      seen.add(key);
      rows.push({ id, layer: layer.trim().toLowerCase(), verdict: verdict.toUpperCase(),
        observation: observation.trim(), rating: rec.rating ?? 0 });
    }
  }
  return rows;
}
const pool = SINCE ? sites.filter((e) => (e.added ?? '') > SINCE) : sites;

const sentences = (text) => String(text ?? '')
  .split(/(?<=[.!?])\s+|\n+/)
  .map((s) => s.replace(/\s+/g, ' ').trim())
  .filter(Boolean);

const hits = new Map(THEMES.map((t) => [t.key, []]));
for (const entry of pool) {
  const fields = [['note', entry.note], ['works', entry.works], ['weaknesses', entry.weaknesses]];
  for (const theme of THEMES) {
    for (const [field, text] of fields) {
      const found = sentences(text).find((s) => theme.patterns.some((p) => p.test(s)));
      if (found) {
        hits.get(theme.key).push({ id: entry.id, rating: entry.rating ?? 0, status: entry.dialectStatus, field, quote: found.slice(0, 190) });
        break;                                  // one citation per entry per theme
      }
    }
  }
}

/* The ritual's threshold, unchanged: 3+ entries, or 2 rating-3 entries.
   rating-1 counts only as counter-evidence and never carries a pattern. */
const clears = (list) => {
  const strong = list.filter((h) => h.rating >= 2);
  return strong.length >= 3 || strong.filter((h) => h.rating === 3).length >= 2;
};

const lines = [];
const say = (s = '') => { lines.push(s); console.log(s); };

say('');
say(`distillation candidates — ${pool.length} entr${pool.length === 1 ? 'y' : 'ies'} read`
  + (SINCE ? ` (added after ${SINCE})` : '') + `, ${THEMES.length} themes in the lexicon`);

const candidates = [];
const confirming = [];
for (const theme of THEMES) {
  const list = hits.get(theme.key);
  if (!list.length) continue;
  (theme.covered ? confirming : candidates).push({ theme, list, over: clears(list) });
}

const block = (rows, heading, note) => {
  say('');
  say(`## ${heading}`);
  if (!rows.length) { say('  none'); return; }
  say(note);
  for (const { theme, list, over } of rows.sort((a, b) => b.list.length - a.list.length)) {
    const r3 = list.filter((h) => h.rating === 3).length;
    say('');
    say(`${over ? '▲ OVER THRESHOLD' : '· below threshold'}  ${theme.label}`
      + `  [${list.length} entr${list.length === 1 ? 'y' : 'ies'}${r3 ? `, ${r3} rated 3` : ''}]`
      + (theme.covered ? `  — already covered by ${theme.covered}` : '  — NO RULE COVERS THIS'));
    for (const h of list) say(`    ${h.id} (r${h.rating}/${h.status}, ${h.field}): "${h.quote}"`);
  }
};

block(candidates, 'Patterns no rule covers yet',
  '  These are what the ritual\'s PATTERNS section is for. Over threshold means a\n'
  + '  rule can be argued from them — it does not mean one should be written without\n'
  + '  a tier decision and an identifier.');

block(confirming, 'Recurrences that confirm an existing rule',
  '  No amendment needed. Useful as evidence if the rule is ever questioned, and as\n'
  + '  a check that the rule is still earning its place.');

const over = candidates.filter((c) => c.over);
/* Layer verdicts, reported beside the note-derived themes and under the same
   thresholds. They are candidates — this file never promotes anything. */
const verdicts = layerVerdicts();
if (verdicts.length) {
  say('');
  say('## Layer verdicts Alex recorded in the revision sidecars');
  const byLayer = new Map();
  for (const v of verdicts) {
    const k = v.layer + ' · ' + v.verdict;
    if (!byLayer.has(k)) byLayer.set(k, []);
    byLayer.get(k).push(v);
  }
  for (const [k, list] of [...byLayer.entries()].sort((a, b) => b[1].length - a[1].length)) {
    const ids = [...new Set(list.map((v) => v.id))];
    const r3 = ids.filter((id) => list.find((v) => v.id === id)?.rating === 3).length;
    const clears = ids.length >= 3 || r3 >= 2;
    say('');
    say(`${clears ? '▲ OVER THRESHOLD' : '· below threshold'}  ${k}  [${ids.length} record${ids.length === 1 ? '' : 's'}${r3 ? ', ' + r3 + ' rated 3' : ''}]`);
    for (const v of list) say(`    ${v.id} (r${v.rating}): "${v.observation.slice(0, 120)}"`);
  }
  say('');
  say('  Same-site revisions are collapsed. Pages from one design system are not');
  say('  independent evidence — check before treating two ids as two references.');
} else {
  say('');
  say('## Layer verdicts');
  say('  none recorded yet — vault/reviews/ holds no Alex-sourced IN or OUT rows');
}

say('');
say(over.length
  ? `▲ ${over.length} uncovered pattern${over.length === 1 ? '' : 's'} over threshold — run the ritual in vault/README.md`
  : '✓ nothing uncovered is over threshold yet');
say('');
say('Detection is arithmetic. Writing the rule is judgement: it needs a tier, an');
say('identifier, an argument, and a check against what the skills already say.');
say('');

if (WRITE) {
  const out = join(VAULT, 'DISTILL-CANDIDATES.md');
  writeFileSync(out, `# Distillation candidates\n\n*Generated by \`npm run distill\`. Detection only — no rule is written here.*\n\n\`\`\`\n${lines.join('\n')}\n\`\`\`\n`);
  console.log(`written: ${out}\n`);
}

process.exit(over.length ? 10 : 0);         // 10 = something is worth a ritual run

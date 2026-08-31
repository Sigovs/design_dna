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
 *
 * THREE PASSES, BECAUSE ONE WAS NOT ENOUGH.
 *
 * 1 · The lexicon, above. It only finds what someone already taught it. That is
 *     a checklist, not a detector, and it is why two real patterns sat unfound
 *     for days while the run cheerfully reported "nothing over threshold".
 * 2 · Risk tags. A `tags.risks` entry is a named failure a HUMAN attached to a
 *     record — stronger evidence than a regex matching a word, and ignored here
 *     entirely until 2026-08-10. Six records carried narrative-dilution-risk
 *     through several silent runs.
 * 3 · The unnamed pass. Words recurring in WEAKNESSES across unrelated sites
 *     that no theme claimed. It names nothing; it points at where a pattern may
 *     be hiding so a human can read the sentences. This is the only pass that
 *     can surface a theme the lexicon has never heard of.
 *
 * INDEPENDENCE IS COUNTED, NOT WARNED ABOUT. Thresholds count distinct hosts,
 * not records. Three Semler pages are one observation. This file used to print
 * that caveat as prose while its arithmetic counted them as three — which is
 * exactly how technical-luxury read as "3 of 3" twice while resting on one site.
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

  {
    key: 'device-over-content',
    label: 'the mechanism demonstrating itself instead of revealing the content',
    patterns: [
      /демонстрир\w+ (возможности|технолог)/i, /посмотри, что мы/i, /не раскрывает содержан/i,
      /demonstrat\w+ the (technology|capability)/i, /утомитель/i,
      /* Added 2026-08-10. Alex reached this failure twice in English, on two
         unrelated sites, in wording none of the patterns above could match:
         "advancing an animation rather than learning something new" and
         "advancing the animation rather than advancing the argument". The run
         reported one site while three were in the data — the lexicon finding
         only what it was taught, demonstrated live. */
      /advanc\w+ (the |an )?animation/i,
      /confus\w+ (cinematic )?duration with (informational )?progress/i,
      /scroll(ing)? (distance|length)[^.]{0,40}(few|small number|little)/i,
      /продвига\w+ анимацию/i,
    ],
    /* Covered since 2026-08-13: MJ10 was distilled from this exact group —
       lapz-io, morningstar-ventures and trionn-com are cited in its own
       evidence block. The entry was left at `covered: null` when the rule
       landed, so every run since reported an uncovered pattern and invited
       a duplicate of a rule that already exists. Corrected 2026-08-31.
       When a rule lands, its theme moves up here in the SAME commit — that
       is the step this miss is evidence for. */
    covered: 'motion-judgment MJ10',
  },
  /* ── no rule covers these yet ─────────────────────────────────────────── */
  {
    key: 'empty-reads-as-broken',
    label: 'emptiness read as a loading failure',
    patterns: [
      /будто контент не загруз/i, /контент не загруз/i, /настолько пуст/i,
      /looks like .*not loaded/i, /content failed to load/i,
      /* Added 2026-08-10. Same failure, different register: a deliberate
         composition read as a fault. Alex wrote "appear like rendering errors
         rather than deliberate typography" and "resemble missing content or a
         rendering error" — neither matched a pattern written around loading. */
      /(rendering|render) errors?/i,
      /resembl\w+ missing content/i,
      /(appear|look|read)\w* like (a )?(mistake|fault|bug|broken)/i,
      /выглядит как (ошибк|сбой|баг)/i,
    ],
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

/* One design system is one observation. Three Semler pages are not three
   references, and until now this file only said so in a closing paragraph while
   its arithmetic counted them as three — which is exactly how technical-luxury
   read as "3 of 3" twice while resting on a single site. The host is the cheapest
   honest proxy for a design system. */
const hostOf = (entry) => {
  try { return new URL(entry.url).hostname.replace(/^www\./, ''); }
  catch { return entry.id; }
};

const hits = new Map(THEMES.map((t) => [t.key, []]));
/* Sentences no theme claimed, kept for the unnamed-pattern pass below. */
const unmatched = [];

for (const entry of pool) {
  const fields = [['note', entry.note], ['works', entry.works], ['weaknesses', entry.weaknesses]];
  const claimed = new Set();
  for (const theme of THEMES) {
    for (const [field, text] of fields) {
      const found = sentences(text).find((s) => theme.patterns.some((p) => p.test(s)));
      if (found) {
        hits.get(theme.key).push({ id: entry.id, host: hostOf(entry), rating: entry.rating ?? 0, status: entry.dialectStatus, field, quote: found.slice(0, 190) });
        claimed.add(found);
        break;                                  // one citation per entry per theme
      }
    }
  }
  /* Only weaknesses feed the unnamed-pattern pass. A recurring word in `works`
     is a shared merit and usually already has a tag; a recurring word in
     `weaknesses` across unrelated sites is a failure nobody has named. */
  for (const s of sentences(entry.weaknesses)) {
    if (!claimed.has(s)) unmatched.push({ host: hostOf(entry), id: entry.id, rating: entry.rating ?? 0, sentence: s });
  }
}

/* The ritual's threshold, unchanged in spirit and corrected in arithmetic:
   3+ INDEPENDENT sites, or 2 rating-3 independent sites. rating-1 counts only as
   counter-evidence and never carries a pattern. */
const independent = (list) => new Set(list.filter((h) => h.rating >= 2).map((h) => h.host));
const clears = (list) => {
  const hosts = independent(list);
  const r3Hosts = new Set(list.filter((h) => h.rating === 3).map((h) => h.host));
  return hosts.size >= 3 || r3Hosts.size >= 2;
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
    const sites_n = independent(list).size;
    say(`${over ? '▲ OVER THRESHOLD' : '· below threshold'}  ${theme.label}`
      + `  [${sites_n} independent site${sites_n === 1 ? '' : 's'}`
      + (list.length !== sites_n ? ` from ${list.length} records` : '')
      + `${r3 ? `, ${r3} rated 3` : ''}]`
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

/* ── risk tags ─────────────────────────────────────────────────────────────
   A risk tag is a named failure a HUMAN attached to a record. That is stronger
   evidence than a regex finding a word, and this file ignored it entirely until
   now — six records carried narrative-dilution-risk while the run reported
   "nothing over threshold". */
const riskHosts = new Map();
for (const entry of pool) {
  for (const tag of entry.tags?.risks ?? []) {
    if (!riskHosts.has(tag)) riskHosts.set(tag, []);
    riskHosts.get(tag).push({ id: entry.id, host: hostOf(entry), rating: entry.rating ?? 0 });
  }
}
say('');
say('## Risk tags — failures a human already named');
if (!riskHosts.size) {
  say('  none applied');
} else {
  say('  Counted by independent site. A tag over threshold is a failure Alex has');
  say('  labelled repeatedly, which is a stronger starting point than prose matching.');
  for (const [tag, list] of [...riskHosts.entries()].sort((a, b) => independent(b[1]).size - independent(a[1]).size)) {
    const n = independent(list).size;
    say('');
    say(`${clears(list) ? '▲ OVER THRESHOLD' : '· below threshold'}  ${tag}`
      + `  [${n} independent site${n === 1 ? '' : 's'}${list.length !== n ? ` from ${list.length} records` : ''}]`);
    say(`    ${[...new Set(list.map((h) => h.id))].join(', ')}`);
  }
}

/* ── the unnamed pass ──────────────────────────────────────────────────────
   Everything above can only find what the lexicon already knows. A closed
   checklist cannot surface a pattern nobody has named, which is precisely what
   a distillation is for. So: words recurring in WEAKNESSES across unrelated
   sites that no theme claimed. This does not name a pattern — it points at
   where one may be hiding, and a human reads the sentences. */
const STOP = new Set(`
the a an and or but of to in on at for with without from by as is are was were be been it its this that these those
not no more most less than then there here when where which who what how why some any all both each other same
page site design visual very much too also only just still even more feel feels feeling look looks reads read
homepage experience brand content interface compared becomes become section sections product visitor user
часть части страниц страницы страница контент опыт бренд раздел разделы пользователь
и в на с по для от до что как это тот эта то же бы не ни но или а так уже ещё есть быть был была было были
очень более менее чем чуть почти сайт страница дизайн выглядит ощущается читается может можно надо
`.trim().split(/\s+/));

const wordHosts = new Map();
for (const u of unmatched) {
  if (u.rating < 2) continue;                   // rating-1 never carries a pattern
  const words = new Set(u.sentence.toLowerCase().match(/[a-zа-яё][a-zа-яё-]{4,}/g) ?? []);
  for (const w of words) {
    if (STOP.has(w)) continue;
    if (!wordHosts.has(w)) wordHosts.set(w, new Map());
    wordHosts.get(w).set(u.host, u);
  }
}
const spread = [...wordHosts.entries()]
  .map(([w, m]) => ({ word: w, hosts: m.size, sample: [...m.values()][0] }))
  .filter((x) => x.hosts >= 3)
  .sort((a, b) => b.hosts - a.hosts)
  .slice(0, 12);

say('');
say('## Unnamed — recurring weakness vocabulary no theme claimed');
if (!spread.length) {
  say('  nothing recurs across three or more independent sites');
} else {
  say('  RAW VOCABULARY, NOT A PATTERN. The lexicon above only finds what it was');
  say('  already taught; this is the opposite pass. A word here means three or more');
  say('  unrelated sites complained using it and no theme matched. Read the');
  say('  sentences before deciding whether anything is actually there.');
  say('');
  for (const s of spread) {
    say(`  ${String(s.hosts).padStart(2)} sites  ${s.word}`);
    say(`           e.g. ${s.sample.id}: "${s.sample.sentence.slice(0, 150)}"`);
  }
}

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
    /* Same correction as the themes above: a design system is one observation.
       Two Semler pages agreeing about composition is one site agreeing with
       itself. */
    const hostFor = (id) => hostOf(sites.find((e) => e.id === id) ?? { id });
    const hosts = new Set(ids.map(hostFor));
    const r3Hosts = new Set(list.filter((v) => v.rating === 3).map((v) => hostFor(v.id)));
    const clears = hosts.size >= 3 || r3Hosts.size >= 2;
    say('');
    say(`${clears ? '▲ OVER THRESHOLD' : '· below threshold'}  ${k}  [${hosts.size} independent site${hosts.size === 1 ? '' : 's'}`
      + (ids.length !== hosts.size ? ` from ${ids.length} records` : '')
      + `${r3Hosts.size ? ', ' + r3Hosts.size + ' rated 3' : ''}]`);
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

/* The headline used to count prose themes only, so it could announce "nothing
   over threshold" while two human-applied risk tags sat over it — the false
   negative this whole pass exists to end. */
const risksOver = [...riskHosts.entries()].filter(([, l]) => clears(l)).map(([t]) => t);
say('');
if (over.length || risksOver.length) {
  if (over.length) say(`▲ ${over.length} uncovered pattern${over.length === 1 ? '' : 's'} over threshold`);
  if (risksOver.length) say(`▲ ${risksOver.length} risk tag${risksOver.length === 1 ? '' : 's'} over threshold: ${risksOver.join(', ')}`);
  say('  run the ritual in vault/README.md');
} else {
  say('✓ nothing over threshold yet — neither an uncovered prose pattern nor a risk tag');
}
say('');
say('Detection is arithmetic. Writing the rule is judgement: it needs a tier, an');
say('identifier, an argument, and a check against what the skills already say.');
say('');

if (WRITE) {
  const out = join(VAULT, 'DISTILL-CANDIDATES.md');
  writeFileSync(out, `# Distillation candidates\n\n*Generated by \`npm run distill\`. Detection only — no rule is written here.*\n\n\`\`\`\n${lines.join('\n')}\n\`\`\`\n`);
  console.log(`written: ${out}\n`);
}

process.exit(over.length || risksOver.length ? 10 : 0);   // 10 = something is worth a ritual run

/**
 * The third evidence source: Alex's own working sessions.
 *
 * `vault/` holds judgements about other people's sites. `projects/` holds records
 * of finished work. Neither can see the thing that happens most often and is never
 * written down anywhere: **Alex correcting an agent, in the same way, on unrelated
 * projects.** A correction that recurs across three different clients is not a
 * project instruction. It is a standing preference that no rule has caught yet.
 *
 * WHY THIS IS HARD, AND WHY THE LEXICON IS SMALL
 *
 * Signal-to-noise here is far worse than in the vault. A vault entry is authored
 * to be evidence; a session message is authored to get a job done. Measured on
 * this machine on 2026-08-31: 1,889 user messages across the project sessions,
 * 432 of them about images — and exactly three of those generalised. Everything
 * else was "replace this photo", "add the address", "make it smaller": correct,
 * useful, and about one page rather than about taste.
 *
 * So the design is deliberately strict:
 *
 *   1. Only CORRECTIONS count. Not requests, not descriptions — messages where the
 *      agent produced something and Alex said it was wrong. A request has no
 *      information about taste; a correction does, because it names a gap between
 *      what was expected and what arrived.
 *   2. INDEPENDENCE IS BY PROJECT, never by message count. Twenty complaints inside
 *      one build are one instance: the same page, the same brief, the same day.
 *      Three projects means three clients who could not have influenced each other.
 *   3. The threshold is 3 independent projects. Higher than the vault's, because
 *      this source is noisier and a false candidate here costs more — it teaches
 *      Alex to stop reading the report.
 *   4. The lexicon only finds what it was taught. That is the same limitation the
 *      site lexicon has, and it bit once already (see `device-over-content`). The
 *      unmatched pass below is the mitigation, not a fix.
 *
 * PRIVACY — this one is not optional.
 *
 * These transcripts contain the estate case: names, jurisdictions, case numbers,
 * medical detail, correspondence with lawyers. They also contain client names and
 * commercial terms. This module drops any message matching PERSONAL outright, and
 * the report prints project SLUGS rather than paths. Nothing here should ever be
 * pasted into a public issue without reading it first.
 */
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { homedir } from 'node:os';

export const TRANSCRIPT_ROOT = join(homedir(), '.claude', 'projects');

/* Not client projects, and excluded by default.
   `-Users-alex-Desktop-WORK` is the folder Alex opens for the estate track and for
   meta-conversations about this system — including the session that wrote this
   file. Left in, the tooling reads its own construction as evidence about design.
   `-Users-alex` is the home directory, same problem. A correction only counts when
   it was made while building something for a client. */
export const NOT_PROJECTS = ['-Users-alex-Desktop-WORK', '-Users-alex', '-private-tmp'];

/* Dropped whole. The estate track and anything medical or financial-personal has
   no business in a design distillation, and a regex that "probably" excludes it is
   not good enough for a file that gets read aloud in a report. */
const PERSONAL = new RegExp([
  'наслед', 'nasled', 'estate', 'apostil', 'апостил', 'notar', 'нотар',
  'lannecel', 'баскаев', 'skatteverket', 'swedbank', 'seb\\b', 'kpa\\b',
  'юрист', 'jurist', 'lawyer', 'natalie', 'svante', 'пронженко', 'pronzhenko',
  'медиц', 'medic', 'insurance', 'страхов', 'диагноз', 'diagnoz',
  'свидетельство о рожд', 'svideteljstvo', 'завещан', 'testament',
  'мам[ыаеу]\\b', 'mam[aiy]\\b', 'uhoda mamy', 'папк[иу] с докум', 'bumag[ai]\\b',
  'квартир', 'kvartir', 'банк', 'bank schet', 'pensi', 'пенси',
].join('|'), 'i');

/* Not evidence: the harness talking, a pasted file, a skill header, a summary. */
const NOISE = [
  /^Base directory for this skill/i,
  /^<[a-z_-]+>/,
  /^Another Claude session/i,
  /^This session is being continued/i,
  /^\[Pasted text/i,
  /^Caveat: The messages below/i,
  /^Analysis:/i,
];

/**
 * The correction lexicon.
 *
 * Each entry is a FAILURE MODE, phrased the way a rule would be — not a topic.
 * `covered` names the rule that already owns it, exactly as in distill.mjs, and
 * the same discipline applies: when a rule lands, its theme moves to `covered` in
 * the SAME commit.
 *
 * Seeded 2026-08-31 from a full read of the existing transcripts. Only the first
 * entry cleared the threshold on that read; the rest are here because the failure
 * is nameable and worth watching, and they are honestly marked as unproven.
 */
export const CORRECTIONS = [
  {
    key: 'supplied-material-dropped',
    label: 'material Alex supplied was silently left out',
    /* Cleared threshold on the seeding read: iBUY 2026-07-28, BHCC 2026-07-29,
       Chicago Motor Cars 2026-08-18 — three unrelated clients, same failure. */
    patterns: [
      /ispoljzuj vs[eё]|используй вс[её]/i,
      /vs[eё] (foto|kontent|content|photo)|вс[её] (фото|контент)/i,
      /(ti |ты )?propustil|пропустил/i,
      /pochemu ti ne (delajesh|ispoljzu)|почему ты не (делаешь|использу)/i,
      /ne vse (foto|kartink|content)|не все (фото|картинк)/i,
    ],
    covered: null,
  },
  {
    key: 'instruction-not-carried-forward',
    label: 'an instruction already given had to be given again',
    patterns: [
      /ja zhe (govoril|dal|skazal|prosil)|я же (говорил|дал|сказал|просил)/i,
      /opjatj|опять/i,
      /snova to zhe|снова то же/i,
      /skoljko raz|сколько раз/i,
    ],
    covered: null,
  },
  {
    key: 'reverted-approved-work',
    label: 'something already approved was changed without being asked',
    patterns: [
      /verni (kak bilo|nazad)|верни (как было|назад)/i,
      /zachem (ti )?(pomenjal|tronul)|зачем (ты )?(поменял|тронул)/i,
      /ja ne prosil|я не просил/i,
      /kto tebja prosil|кто тебя просил/i,
    ],
    covered: null,
  },
  {
    key: 'generic-output',
    label: 'the result came out generic despite the system being loaded',
    patterns: [
      /basic base/i,
      /shablon|шаблон|template[- ]?n/i,
      /skuchn|скучн|boring/i,
      /dlja kogo ja sobiral|для кого я собирал/i,
    ],
    covered: null,
  },
];

const isNoise = (t) => NOISE.some((rx) => rx.test(t));

/** Every user message from the project sessions, filtered and tagged by project. */
export function readMessages({ root = TRANSCRIPT_ROOT, exclude = NOT_PROJECTS } = {}) {
  if (!existsSync(root)) return [];
  const out = [];
  for (const dir of readdirSync(root)) {
    if (exclude.includes(dir)) continue;
    const full = join(root, dir);
    let files;
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
        const text = typeof c === 'string'
          ? c
          : Array.isArray(c)
            ? c.filter((b) => b && b.type === 'text').map((b) => b.text ?? '').join('\n')
            : '';
        const t = text.trim();
        if (!t || t.length > 600) continue;      // long pastes are material, not opinion
        if (isNoise(t)) continue;
        if (PERSONAL.test(t)) continue;          // the estate track never reaches the report
        out.push({ project: dir, date: String(o.timestamp ?? '').slice(0, 10), text: t });
      }
    }
  }
  return out;
}

/** Human-readable project name from the transcript directory key. */
export function projectSlug(dir) {
  return dir
    .replace(/^-Users-alex-Desktop-WORK-?/, '')
    .replace(/^-Users-alex-?/, '~')
    .replace(/-+/g, ' ')
    .trim() || 'WORK (root)';
}

/**
 * Group corrections by theme. Independence is by PROJECT — the whole point.
 * Returns [{ theme, projects:Map<project, [{date,text}]>, independent, over }]
 */
export function findCorrections(messages, { threshold = 3 } = {}) {
  const rows = [];
  for (const theme of CORRECTIONS) {
    const projects = new Map();
    for (const msg of messages) {
      if (!theme.patterns.some((rx) => rx.test(msg.text))) continue;
      if (!projects.has(msg.project)) projects.set(msg.project, []);
      projects.get(msg.project).push({ date: msg.date, text: msg.text });
    }
    if (!projects.size) continue;
    rows.push({
      theme,
      projects,
      independent: projects.size,
      over: projects.size >= threshold,
    });
  }
  return rows.sort((a, b) => b.independent - a.independent);
}

/**
 * The unmatched pass — the mitigation for a lexicon that only finds what it knows.
 * Reports words that recur across MANY projects inside correction-shaped messages,
 * so a failure nobody has named yet can still surface. Reported, never scored.
 */
const STOP = new Set(`
a i v k s u o na po za do ne net da tak tut tam eto etot eta chto kak gde kogda
the a an and or but for with from this that is it be to of in on at ne nado mne
ja ti on ona mi vi oni ego ee ih moj tvoj nash vash bil bila bilo est budet
sdelaj sdelal delaj nuzhno nado mozhno davaj ok da net esli ili tozhe eshe uzhe
page site stranica sekcia section text foto image images photo
`.trim().split(/\s+/));

export function unnamedPass(messages, { minProjects = 4 } = {}) {
  const SHAPE = /(propustil|пропустил|ne tak|не так|opjatj|опять|ja zhe|я же|zachem|зачем|pochemu|почему|ne prosil|не просил|peredelaj|переделай)/i;
  const byWord = new Map();
  for (const msg of messages) {
    if (!SHAPE.test(msg.text)) continue;
    const words = new Set(
      msg.text.toLowerCase().match(/[a-zа-яё]{5,}/gi)?.filter((w) => !STOP.has(w)) ?? [],
    );
    for (const w of words) {
      if (!byWord.has(w)) byWord.set(w, new Set());
      byWord.get(w).add(msg.project);
    }
  }
  return [...byWord.entries()]
    .filter(([, projects]) => projects.size >= minProjects)
    .map(([word, projects]) => ({ word, projects: projects.size }))
    .sort((a, b) => b.projects - a.projects)
    .slice(0, 15);
}

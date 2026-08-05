#!/usr/bin/env node
/**
 * Art generator — a compiled brief becomes art direction, mechanically.
 *
 *   npm run art -- --brief projects/briefs/<slug>.md --dry-run
 *   npm run art -- --brief projects/briefs/<slug>.md --shots hero,detail
 *   npm run art -- --brief <file> --subject "1972 Porsche 911 in a cold workshop"
 *   npm run art -- --brief <file> --out "../Sports Car Rescue /assets/img/hero"
 *
 * SAME SPLIT AS review.mjs AND brief.mjs, AND FOR THE SAME REASON.
 *
 * The script owns mechanics — reading the brief, stripping provenance markers,
 * assembling the prompt, calling the model, writing files and the sidecar.
 *
 * The brief owns meaning. §3 Art direction and §8 Imagery and video are the
 * direction; this file never writes one. It cannot: an art direction is a
 * judgement about a project, and a template string cannot make it. An unfilled
 * scaffold is refused rather than filled with a guess, because a plausible
 * invented direction is worse than no image — it looks like a decision.
 *
 * WHAT IS FIXED, AND WHY IT IS FIXED HERE RATHER THAN IN THE BRIEF.
 *
 * The constraint block below is INVARIANT-derived only: composition
 * (one dominant mass, figure-ground, intentional crop), legibility over imagery
 * fixed at the background layer, and the anti-pattern bans. Those hold on every
 * brief, so repeating them in every brief is how they get forgotten in one.
 *
 * NOTHING DIALECT-SPECIFIC IS HARDCODED. The dialect arrives from §1 of the
 * brief, as text. A generator that assumed auction-editorial would quietly make
 * every project look like the last one — the exact failure projects/ exists to
 * detect.
 *
 * A GENERATED IMAGE IS NOT EVIDENCE. It never enters vault/. It is a project
 * artefact, like an EXPLORE direction, and it carries its prompt in prompts.md
 * so it can never be mistaken later for a photograph someone took.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, basename, resolve } from 'node:path';

const ROOT = dirname(fileURLToPath(import.meta.url));
const argv = process.argv.slice(2);
const flag = (n, d = null) => { const i = argv.indexOf(n); return i > -1 ? argv[i + 1] : d; };
const has = (n) => argv.includes(n);

const DRY = has('--dry-run');
/* Image generation is NOT in the API free tier — every image model answers a new
   key with GenerateRequestsPerDayPerProjectPerModel-FreeTier, i.e. a daily
   allowance of zero, while text models on the same key answer normally. Billing
   on the Google Cloud project is what unlocks it. Until then --dry-run is the
   whole tool: it writes the prompt, and the prompt is the part this repo owns. */
const MODEL = flag('--model', 'gemini-3.1-flash-image');
const KEY = process.env.GEMINI_API_KEY ?? process.env.GOOGLE_API_KEY ?? null;
const N = Math.max(1, Math.min(4, Number(flag('--n', '2')) || 2));
const SECTION_BUDGET = 900;   // chars per brief section fed to the model

/* Aspect ratios are the five the image API has accepted consistently. A newer
   one may exist; --aspect overrides per run rather than being guessed at here. */
const SHOTS = {
  hero:    { aspect: '16:9', frame: 'Wide establishing frame, shot at eye level or just below.' },
  wide:    { aspect: '16:9', frame: 'Wide supporting frame for a full-bleed band mid-page.' },
  portrait:{ aspect: '4:5',  frame: 'Vertical frame, single subject, generous headroom.' },
  detail:  { aspect: '1:1',  frame: 'Close crop on material and surface. Texture is the subject.' },
  mobile:  { aspect: '9:16', frame: 'Tall frame composed for a 390px-wide screen, subject held high.' },
};

const TEXT_ZONES = {
  'lower-left':  'the lower-left quadrant',
  'lower-right': 'the lower-right quadrant',
  'upper-left':  'the upper-left quadrant',
  'upper-right': 'the upper-right quadrant',
  'lower':       'the lower third, full width',
  'none':        null,
};

/* ── the brief ─────────────────────────────────────────────────────────── */

const briefPath = flag('--brief');
if (!briefPath) die('--brief <file> is required. Compile one with `npm run brief` first.');
if (!existsSync(briefPath)) die(`brief not found: ${briefPath}`);

const doc = readFileSync(briefPath, 'utf8');
const slug = basename(briefPath).replace(/\.md$/, '');

/**
 * Body of a numbered brief section, exclusive of the next heading.
 *
 * Deliberately not one regex with an end-of-input alternative: JavaScript has no
 * `\Z`, so `(?=^## \d\. |\Z)` silently compiles to "next heading, or the letter
 * Z" and truncates any section containing a capital Z. Two searches and a slice
 * cannot be wrong in a way that looks right.
 */
function section(n) {
  const start = doc.search(new RegExp(`^## ${n}\\. `, 'm'));
  if (start < 0) return '';
  const body = doc.slice(start + doc.slice(start).indexOf('\n') + 1);
  const next = body.search(/^## \d+[a-z]?\. /m);
  return (next < 0 ? body : body.slice(0, next)).trim();
}

/**
 * Provenance markers are repository bookkeeping. `[P evidence:A2 sites:...]`
 * means something to brief:check and nothing at all to an image model, where it
 * only spends attention. Markdown emphasis goes the same way.
 */
function plain(s) {
  return s
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/\[(?:P|J|R|A|\?)(?:\s[^\]]*)?\]/g, '')
    .replace(/`([^`]*)`/g, '$1')
    .replace(/\*\*([^*]*)\*\*/g, '$1')
    .replace(/\*([^*]*)\*/g, '$1')
    .replace(/^[-–—]\s*/gm, '')
    .replace(/[ \t]{2,}/g, ' ')
    .replace(/\s+([.,;:])/g, '$1')
    /* A stripped marker leaves debris — a line that was `[P evidence:A2 …].`
       becomes a lone full stop, and a lone full stop is a token the model has to
       read and decide to ignore. Drop anything that is now only punctuation. */
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l && !/^[.,;:—–\-]+$/.test(l))
    .join('\n')
    /* The brief is hard-wrapped at ~80 columns for humans reading it in a
       terminal. Those breaks are typography, not structure, and left in place
       they hand the model a stack of sentence fragments. Rejoin a line only when
       it clearly continues — no terminator before, lowercase or a dash after. */
    .replace(/([^.!?:;])\n(?=[a-z—–(])/g, '$1 ')
    .trim();
}

/* Cut at a sentence boundary or not at all worth cutting there. A fragment
   ending "and long-form body text is" reads to the model as an instruction that
   was interrupted, and it will try to complete the thought. */
function clip(s, budget) {
  if (s.length <= budget) return { text: s, cut: false };
  const cut = s.slice(0, budget);
  /* A bare newline is not a sentence boundary in a hard-wrapped document — it is
     usually mid-clause, which is how a cut lands on "and long-form body text is".
     Only real terminal punctuation counts. */
  const ends = [...cut.matchAll(/[.!?](?=\s|$)/g)];
  const stop = ends.length ? ends[ends.length - 1].index : -1;
  return { text: (stop > 0 ? cut.slice(0, stop + 1) : cut).trim(), cut: true };
}

const dialect = plain(section(1));
const artDirection = plain(section(3));
const colour = plain(section(7));
const imagery = plain(section(8));
const prohibitions = plain(section(12));

/* An unfilled scaffold is the failure this guard exists for. §3 and §8 are the
   direction; without them there is nothing to generate from but the invariants,
   and invariants describe quality, never a subject. */
const missing = [];
if (artDirection.length < 40) missing.push('§3 Art direction');
if (imagery.length < 40) missing.push('§8 Imagery and video');
if (missing.length) {
  die(`the brief has no art direction to work from — ${missing.join(' and ')} ${missing.length > 1 ? 'are' : 'is'} empty.\n` +
      `  Phase 2 of the brief is authored, not generated. Fill those sections, then run this again.`);
}

if (/^\s*no video\b/im.test(imagery) && has('--video')) {
  warn('the brief says no video, and --video was passed. Ignoring the flag; change the brief if that is wrong.');
}

/* ── the prompt ────────────────────────────────────────────────────────── */

const subject = flag('--subject');
const zoneKey = flag('--text-zone', 'lower-left');
if (!(zoneKey in TEXT_ZONES)) die(`unknown --text-zone "${zoneKey}". One of: ${Object.keys(TEXT_ZONES).join(', ')}`);
const zone = TEXT_ZONES[zoneKey];

/**
 * INVARIANT-derived, every brief, no exceptions. Written as instructions an
 * image model acts on rather than as rule identifiers it would ignore.
 */
function constraints(shot) {
  const lines = [
    'Photographic. Real optics, real light, plausible depth of field and falloff. Not an illustration, not a 3D render, not a matte painting, not a composite.',
    'No text of any kind in the frame — no letterforms, numerals, logos, signage, watermarks or captions. Typography is set in CSS over this image, and baked-in type destroys it.',
    /* Measured, not assumed: a reading-room subject produced hundreds of
       pseudo-lettered book spines on both a draft and a flagship model. The ban
       does not survive a subject built out of text — the subject has to yield. */
    'If anything in the scene would naturally carry text — book spines facing camera, signage, packaging, posters, screens, number plates — turn it away, crop it out, or put something else there. A ban on letterforms cannot survive a subject made of them.',
    'No user interface, no device mockups, no browser chrome, no screens showing content.',
    /* Flagship models add "cinematic" matte bars unprompted. Baked-in bars are
       not a look here, they are dead pixels inside a full-bleed hero. */
    'Fill the entire frame edge to edge. No letterbox bars, no black bands top or bottom, no cinematic matte, no border, no film-frame edges.',
    'One dominant mass and one subject. No second centre competing with it.',
    'Figure and ground separate at a glance, before anything is read.',
    'Restrained natural colour. No saturated gradient wash, no neon rim light, no lens flare, no HDR crunch, no glossy plastic sheen, no scattered bokeh highlights.',
    'No vignette or drop shadow added for mood. Light does the work or nothing does.',
    'Composed rather than centred by default. An intentional crop beats a safe one; an edge may cut the subject if the cut is decided.',
    'It must not look generated. If a choice reads as the average of a thousand stock images, make the other choice.',
  ];
  if (zone && shot !== 'detail') {
    lines.splice(4, 0,
      `Hold ${zone} tonally calm, low in detail and even in value — headline and body text sit there over the image, and must stay legible without a scrim laid on top.`);
  }
  return lines.map((l) => `- ${l}`).join('\n');
}

function buildPrompt(shotKey) {
  const shot = SHOTS[shotKey];
  const ad = clip(artDirection, SECTION_BUDGET);
  const im = clip(imagery, SECTION_BUDGET);
  const co = clip(colour, Math.round(SECTION_BUDGET * 0.6));
  const pr = clip(prohibitions, Math.round(SECTION_BUDGET * 0.6));

  const parts = [
    `A single photographic image for the ${shotKey} position of a website. ${shot.frame}`,
    subject ? `\nSUBJECT\n${subject}` : null,
    `\nART DIRECTION\n${ad.text}`,
    `\nIMAGERY\n${im.text}`,
    co.text ? `\nCOLOUR\n${co.text}` : null,
    dialect ? `\nDESIGN DIALECT THIS SERVES\n${dialect.split('\n').slice(0, 4).join(' ')}` : null,
    pr.text ? `\nTHIS PROJECT MUST NOT DO\n${pr.text}` : null,
    `\nHARD CONSTRAINTS — all binding\n${constraints(shotKey)}`,
  ].filter(Boolean);

  return { text: parts.join('\n'), aspect: flag('--aspect', shot.aspect), truncated: ad.cut || im.cut || co.cut || pr.cut };
}

const shotKeys = (flag('--shots', 'hero')).split(',').map((s) => s.trim()).filter(Boolean);
for (const k of shotKeys) if (!(k in SHOTS)) die(`unknown shot "${k}". One of: ${Object.keys(SHOTS).join(', ')}`);

/* ── output ────────────────────────────────────────────────────────────── */

const outDir = resolve(flag('--out', join(ROOT, 'projects', 'art', slug)));

/* ── adopt ──────────────────────────────────────────────────────────────────
   The other half of --dry-run, and the half that was missing.

   Without billing, the whole tool is: write the prompt, paste it into whatever
   can generate — the Gemini app, a subscription anyone already pays for — and
   save the frame by hand. At that moment every mechanical guarantee this file
   makes stops applying. GI6 says the `gen-` prefix and the sidecar travel with
   the file permanently, and a rule that only holds when the script happens to
   be the one writing the file is a rule that holds on the easy path only.

   So: hand it the file you saved and it becomes a legitimate artefact —
   renamed, filed beside its prompt, and recorded as adopted rather than
   generated here, because claiming this script produced it would be a lie in
   the one document whose whole job is provenance.

     npm run art -- --brief <file> --adopt ~/Downloads/x.png --shot hero
                    [--model-used "gemini app · nano banana pro"]           */
const adopt = flag('--adopt');
if (adopt) {
  const shot = flag('--shot');
  if (!shot) die('--adopt needs --shot <name> — which position this frame fills.');
  if (!SHOTS[shot]) die(`unknown shot "${shot}". Known: ${Object.keys(SHOTS).join(', ')}`);
  if (!existsSync(adopt)) die(`file not found: ${adopt}`);

  mkdirSync(outDir, { recursive: true });
  const ext = (adopt.match(/\.([a-z0-9]+)$/i)?.[1] ?? 'jpg').toLowerCase();

  let n = 1;
  while (existsSync(join(outDir, `gen-${shot}-${n}.${ext}`))) n++;
  const name = `gen-${shot}-${n}.${ext}`;
  writeFileSync(join(outDir, name), readFileSync(adopt));

  /* The prompt is quoted from prompts.md rather than rebuilt, so the record
     shows what was actually pasted — a rebuild months later would silently
     substitute today's brief for the one the image came from. */
  const file = join(outDir, 'prompts.md');
  const existing = existsSync(file) ? readFileSync(file, 'utf8') : '';
  /* Sliced rather than matched. JavaScript has no `\z`, so the obvious
     "up to the next heading or end of string" lookahead silently matches a
     literal z and finds nothing — which it did, quietly, on the first run. */
  const heading = existing.split('\n').findIndex((l) => l.startsWith(`## ${shot} `) || l.trim() === `## ${shot}`);
  let quoted = null;
  if (heading > -1) {
    const rest = existing.split('\n').slice(heading + 1);
    const end = rest.findIndex((l) => l.startsWith('## '));
    const body = (end > -1 ? rest.slice(0, end) : rest).join('\n');
    quoted = body.match(/```\n([\s\S]*?)\n```/)?.[1] ?? null;
  }

  const used = flag('--model-used', 'not recorded');
  writeFileSync(file, (existing || `# Generated art — ${slug}\n`) + [
    ``,
    `## ${name} — ADOPTED`,
    ``,
    `Adopted ${new Date().toISOString().slice(0, 10)} from \`${adopt}\`, generated outside this script.`,
    `Model as declared: \`${used}\`. Position: \`${shot}\`.`,
    ``,
    quoted
      ? `Prompt, quoted from the \`${shot}\` block above — this is what the frame was asked to be:\n\n\`\`\`\n${quoted}\n\`\`\``
      : `> **No prompt for \`${shot}\` in this file.** GI6 wants the exact prompt and it is not\n`
        + `> recoverable from the image. Run \`--dry-run\` first, or paste the prompt in here by hand.`,
    ``,
  ].join('\n'));

  console.log(`\nadopted → ${join(outDir, name)}`);
  console.log(`prompts.md updated${quoted ? '' : '   (no prompt found for this shot — see the note written there)'}`);
  if (used === 'not recorded') {
    console.log('\nnote — model recorded as "not recorded". Pass --model-used "<what you used>"');
    console.log('       so the sidecar says where the frame came from while anyone still remembers.');
  }
  process.exit(0);
}

if (DRY) {
  const built = shotKeys.map((k) => ({ k, p: buildPrompt(k) }));
  for (const { k, p } of built) {
    console.log(`\n${'─'.repeat(72)}\n${k}  ·  ${p.aspect}  ·  ${N} image${N > 1 ? 's' : ''}${p.truncated ? '  ·  brief text truncated to budget' : ''}\n${'─'.repeat(72)}\n`);
    console.log(p.text);
  }

  /* Written, not just printed. Without API billing the prompt IS the deliverable
     — it gets pasted into whatever tool can actually generate — and a prompt that
     only ever existed in terminal scrollback is a prompt nobody can reproduce or
     compare against the image it produced. */
  mkdirSync(outDir, { recursive: true });
  const file = join(outDir, 'prompts.md');
  writeFileSync(file, [
    `# Prompts — ${slug}`,
    ``,
    `Built ${new Date().toISOString().slice(0, 10)} by \`npm run art:dry\` from [${basename(briefPath)}](../../briefs/${basename(briefPath)}).`,
    `**No images were generated.** Paste these into whichever tool has generation available.`,
    `Governed by [generated-imagery](../../../skills/generated-imagery/SKILL.md) — GI2 (the prompt is derived, not typed),`,
    `GI6 (whatever you save keeps a \`gen-\` prefix), GI3 (never the real car, room or person).`,
    ``,
    ...built.map(({ k, p }) => [`## ${k} · ${p.aspect}`, ``, '```', p.text, '```', ``].join('\n')),
  ].join('\n'));

  console.log(`\n${'─'.repeat(72)}`);
  console.log(`dry run — nothing was called, no images written.`);
  console.log(`prompts written to: ${file}`);
  console.log(`model for a real run: ${MODEL}${KEY ? '' : '   (no GEMINI_API_KEY in env)'}`);
  process.exit(0);
}

if (!KEY) {
  die('no API key. Get a free one at https://aistudio.google.com/apikey, then:\n' +
      '  export GEMINI_API_KEY="…"        (add it to your shell profile to keep it)\n' +
      '  Run with --dry-run to see the prompts without a key.');
}

const ENDPOINT = (model) => `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

/** One call, one image. Retries only what is worth retrying. */
async function generate(prompt, aspect, attempt = 1) {
  const res = await fetch(ENDPOINT(MODEL), {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-goog-api-key': KEY },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { responseModalities: ['IMAGE'], imageConfig: { aspectRatio: aspect } },
    }),
  });

  if (!res.ok) {
    const body = await res.text();

    /* 429 is two different failures wearing one status code, and treating them
       alike is wrong in both directions. A per-MINUTE token or request limit is
       transient and the API says exactly how long to wait, in RetryInfo. A
       per-DAY limit is not waitable at all — backing off from that only looks
       busy. Read the violation rather than assuming the worse one. */
    if (res.status === 429) {
      let info = null;
      try { info = JSON.parse(body); } catch { /* non-JSON error body — fall through */ }
      const details = info?.error?.details ?? [];
      const violations = details.flatMap((d) => d.violations ?? []);
      const perDay = violations.some((v) => /PerDay/i.test(v.quotaId ?? ''));
      const retryStr = details.find((d) => d.retryDelay)?.retryDelay ?? '';
      const retrySec = Number(String(retryStr).replace(/[^0-9.]/g, '')) || 0;

      if (!perDay && retrySec > 0 && retrySec <= 120 && attempt <= 4) {
        const wait = Math.ceil(retrySec) + 1;
        process.stdout.write(`rate limit, waiting ${wait}s … `);
        await new Promise((r) => setTimeout(r, wait * 1000));
        return generate(prompt, aspect, attempt + 1);
      }
      const which = perDay
        ? 'the free DAILY allowance is spent — it resets at midnight Pacific'
        : `rate limited and it did not clear after ${attempt} attempts`;
      throw new Error(`429 — ${which}.\n${violations.map((v) => `  ${v.quotaId}`).join('\n') || body.slice(0, 300)}`);
    }

    if (res.status >= 500 && attempt < 3) {
      await new Promise((r) => setTimeout(r, 1500 * attempt));
      return generate(prompt, aspect, attempt + 1);
    }
    throw new Error(`HTTP ${res.status}\n${body.slice(0, 800)}`);
  }

  const json = await res.json();
  /* Scan every part rather than indexing a fixed position — the response shape
     has moved before, and an index that silently returns undefined is worse
     than a loop that finds nothing and says so. */
  const parts = json?.candidates?.[0]?.content?.parts ?? [];
  const image = parts.find((p) => p.inlineData?.data);
  if (!image) {
    const text = parts.map((p) => p.text).filter(Boolean).join(' ').slice(0, 300);
    const block = json?.promptFeedback?.blockReason;
    throw new Error(block ? `refused by the model: ${block}` : `no image in the response.${text ? ` Model said: ${text}` : ''}`);
  }
  return { data: Buffer.from(image.inlineData.data, 'base64'), mime: image.inlineData.mimeType ?? 'image/png' };
}

mkdirSync(outDir, { recursive: true });

const stamp = new Date().toISOString().slice(0, 10);
const written = [];
const failed = [];

for (const k of shotKeys) {
  const p = buildPrompt(k);
  for (let i = 1; i <= N; i++) {
    process.stdout.write(`  ${k} ${i}/${N} … `);
    try {
      const { data, mime } = await generate(p.text, p.aspect);
      const ext = mime.includes('jpeg') ? 'jpg' : 'png';
      /* The gen- prefix is not decoration. Six months from now nobody can tell a
         generated hero from a photographer's frame by looking, and a client asset
         and a synthetic one must never be confusable in a build directory. */
      const name = `gen-${k}-${i}.${ext}`;
      writeFileSync(join(outDir, name), data);
      written.push({ shot: k, name, aspect: p.aspect, prompt: p.text });
      console.log(`${name}  ${(data.length / 1024).toFixed(0)}kb`);
    } catch (e) {
      console.log(`failed`);
      failed.push({ shot: k, n: i, why: e.message });
    }
  }
}

/* The sidecar is the part that survives. An image with no record of what it was
   asked to be is a mood board of one, and the prompt is the only place the
   reasoning is legible after the fact. */
if (written.length) {
  const sidecar = [
    `# Generated art — ${slug}`,
    ``,
    `Generated ${stamp} by \`npm run art\` from [${basename(briefPath)}](../../briefs/${basename(briefPath)}).`,
    `Model: \`${MODEL}\`.`,
    ``,
    `> **These are project artefacts, not evidence.** Nothing here enters \`vault/\` —`,
    `> the vault holds other people's shipped work, judged. A generated frame is`,
    `> neither shipped nor anyone's. The \`gen-\` prefix stays on the filename`,
    `> wherever the file is copied, so a synthetic asset is never mistaken for a`,
    `> photograph in a build.`,
    ``,
    ...written.map((w) => [
      `## ${w.name}`,
      ``,
      `\`${w.shot}\` · ${w.aspect}`,
      ``,
      '```',
      w.prompt,
      '```',
      ``,
    ].join('\n')),
  ].join('\n');
  writeFileSync(join(outDir, 'prompts.md'), sidecar);
}

console.log(`\n${written.length} written to ${outDir}`);
if (failed.length) {
  console.log(`${failed.length} failed:`);
  for (const f of failed) console.log(`  ${f.shot} ${f.n} — ${f.why.split('\n')[0]}`);
}

/* C-invariant, and the one this tool makes easier to break: a composition built
   around a commissioned-looking hero has an asset dependency, and generated
   imagery hides the cost of it right up until the client sends their own photo. */
if (written.some((w) => w.shot === 'hero' || w.shot === 'mobile')) {
  console.log(
    `\nnote — a generated hero raises this project's asset dependency.\n` +
    `  The composition still has to survive an ordinary client photograph.\n` +
    `  If it only works on this frame, the composition is not finished.`);
}

function die(msg) { console.error(`\nart: ${msg}\n`); process.exit(1); }
function warn(msg) { console.error(`art: warning — ${msg}`); }

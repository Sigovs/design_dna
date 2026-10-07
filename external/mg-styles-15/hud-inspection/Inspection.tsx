import React from 'react';
import {AbsoluteFill, Img, Easing, interpolate, staticFile, useCurrentFrame} from 'remotion';

/* HUD inspection readout — a brand-agnostic Remotion template.
   The mechanics of the "HUD / FUI" style (mg-styles-15 #22), opened with #02 Line Art and set on #12 frosted glass,
   but in a restrained register: a dark ground, thin light linework and ONE accent moment at the lock.
   No neon, glow, glitch or chromatic aberration.

   Beats (30 fps; INTRO frames of line art, then the inspection clock t):
     line art  – one line traces the subject's real silhouette, the photograph rises under it
     t 6–40    – the instrument frame draws on
     t 30–104  – a scan crosses the subject; shot points tick on as it passes
     t 58–82   – the identifier rolls random glyphs per character, then settles left → right
     t 120–250 – the checks type out, each closing on [OK]
     t 250–276 – lock brackets snap 1.4× → 1.0× (fast-out, slow-in); the verdict lands in the accent colour
     t 284+    – the footer line

   Everything is a prop: the photograph, the silhouette (an SVG path in the photo's pixels, e.g. traced from a
   cut-out mask with OpenCV), the subject's box, the shot points, all copy and the palette. Use real photographs
   for real products; never generate the subject. One component, two layouts (16:9 and 9:16). */

export const INTRO = 60;
export const TOTAL = INTRO + 360;

export type Subject = {
  photo: string; w: number; h: number;                 // the photograph (staticFile path) and its pixel size
  outline: string;                                     // SVG path of the silhouette, in photo pixels
  box: {x0: number; y0: number; x1: number; y1: number}; // the subject's bounding box, in photo pixels
  shots: [number, number][];                           // shot points, in photo pixels (e.g. 12 spaced along the outline)
};
export type Copy = {
  topLeft: string; topRight: string;                   // the instrument's header
  identityLabel: string; identity: string;             // e.g. "Identity", "CHASSIS 5066" (this one rolls)
  identityLines: string[];                             // supporting lines under the identifier
  checksLabel: string; checks: string[];               // the checks, each typed and closed with [OK]
  verdict: string; verdictMark?: string;               // e.g. "Verified" + an optional mark image (staticFile path)
  footer: {label: string; value?: string}[];           // the closing line (mark sample data as sample)
};
export type Palette = {ground: string; ink: string; ink2: string; accent: string; display: string; text: string};

export const DEFAULT_PALETTE: Palette = {ground: '#0E1012', ink: '#ECEAE4', ink2: '#A4A39E', accent: '#D4A85F', display: 'Oswald', text: 'Roboto Condensed'};

export type Layout = {
  W: number; H: number; focus: [number, number]; pad: number; scale: number;
  identity: React.CSSProperties; checks: React.CSSProperties; bottom: React.CSSProperties; bottomColumn?: boolean;
};
export const LANDSCAPE: Layout = {W: 1920, H: 1080, focus: [960, 672], pad: 48, scale: 1,
  identity: {left: 120, top: 182, width: 460}, checks: {right: 120, top: 182, width: 600}, bottom: {left: 120, right: 120, bottom: 52}};
export const PORTRAIT: Layout = {W: 1080, H: 1920, focus: [540, 880], pad: 40, scale: 1.1,
  identity: {left: 72, right: 72, top: 200}, checks: {left: 72, right: 72, top: 1262}, bottom: {left: 72, right: 72, bottom: 96}, bottomColumn: true};

const EASE = Easing.bezier(0.2, 0.7, 0.2, 1);
const SNAP = Easing.bezier(0.16, 1, 0.3, 1);
const p = (f: number, a: number, b: number, e = EASE) => interpolate(f, [a, b], [0, 1], {easing: e, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
const corner = (x: number, y: number, dx: number, dy: number, L: number) => `M${x + dx * L},${y} L${x},${y} L${x},${y + dy * L}`;

// place the photograph so the subject lands on the focus; a big subject scales down and exposed edges dissolve
const fit = (s: Subject, L: Layout) => {
  const c = s.box, cw = c.x1 - c.x0, ch = c.y1 - c.y0, cx = (c.x0 + c.x1) / 2, cy = (c.y0 + c.y1) / 2;
  const k = L.W > L.H ? Math.min(1, 400 / (ch + 40), 1700 / (cw + 80)) : Math.min(1.12, 960 / cw, 440 / ch);
  const ox = L.focus[0] - cx * k, oy = L.focus[1] - cy * k;
  return {k, ox, oy, coversX: ox <= 0 && ox + s.w * k >= L.W, coversY: oy <= 0 && oy + s.h * k >= L.H};
};

export const Inspection: React.FC<{subject: Subject; copy: Copy; layout?: Layout; palette?: Palette}> = ({subject: S, copy: K, layout: L = LANDSCAPE, palette: P = DEFAULT_PALETTE}) => {
  const f = useCurrentFrame();
  const t = f - INTRO;
  const z = (n: number) => n * L.scale;
  const MONO: React.CSSProperties = {fontFamily: P.text, fontWeight: 400, fontVariantNumeric: 'tabular-nums', letterSpacing: '0.08em', textTransform: 'uppercase', color: P.ink, margin: 0};
  const DISPLAY: React.CSSProperties = {fontFamily: P.display, fontWeight: 600, textTransform: 'uppercase', color: P.ink, margin: 0};
  const line = 'rgba(236,234,228,.72)', faint = 'rgba(236,234,228,.28)';

  const F = fit(S, L);
  const box = {x0: S.box.x0 * F.k + F.ox, y0: S.box.y0 * F.k + F.oy, x1: S.box.x1 * F.k + F.ox, y1: S.box.y1 * F.k + F.oy};
  const cx = (box.x0 + box.x1) / 2, cy = (box.y0 + box.y1) / 2;
  const shade = `radial-gradient(ellipse ${(box.x1 - box.x0) * 0.68}px ${(box.y1 - box.y0) * 0.95}px at ${cx}px ${cy}px, rgba(14,16,18,.12) 0%, rgba(14,16,18,.56) 56%, rgba(14,16,18,.92) 100%)`;
  const idSize = K.identity.length > 14 ? 52 * Math.max(0.6, 14 / K.identity.length) : 52;

  const lineK = p(f, 4, 54, Easing.inOut(Easing.cubic)), lineOut = 1 - p(f, 70, 92), photo = p(f, 46, 76);
  const push = interpolate(f, [0, TOTAL], [1.07, 1.0]);
  const scanX = interpolate(t, [30, 100], [box.x0 - 60, box.x1 + 60], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.quad)});
  const lk = p(t, 250, 268, SNAP), acc = p(t, 266, 276), s = 1.4 - 0.4 * lk;
  const bw = box.x1 - box.x0 + 80, bh = box.y1 - box.y0 + 80;
  const bx0 = cx - (bw * s) / 2, by0 = cy - (bh * s) / 2, bx1 = cx + (bw * s) / 2, by1 = cy + (bh * s) / 2;

  const Type: React.FC<{text: string; at: number; style?: React.CSSProperties; cps?: number}> = ({text, at, style, cps = 1.4}) => {
    const n = Math.max(0, Math.min(text.length, Math.floor((t - at) * cps)));
    return <p style={{...MONO, whiteSpace: 'pre', ...style}}>{text.slice(0, n)}{n > 0 && n < text.length && Math.floor(t / 4) % 2 === 0 ? '▍' : ''}</p>;
  };
  const Roll: React.FC<{text: string; at: number; style?: React.CSSProperties}> = ({text, at, style}) => {
    const pool = '0123456789ABCDEFGHJKLMNPRSTUVWXYZ';
    const out = text.split('').map((ch, i) => (t < at ? ' ' : t >= at + 4 + i * 2 || ch === ' ' ? ch : pool[(Math.floor(t) * 7 + i * 13) % pool.length])).join('');
    return <p style={{...MONO, whiteSpace: 'pre', ...style}}>{out}</p>;
  };
  const Draw: React.FC<{d: string; k: number; stroke?: string; w?: number}> = ({d, k, stroke = line, w = 1.5}) => (
    <path d={d} fill="none" stroke={stroke} strokeWidth={w} pathLength={1} strokeDasharray="1" strokeDashoffset={1 - k} />
  );
  const glass: React.CSSProperties = {background: 'rgba(18,20,24,.42)', backdropFilter: 'blur(18px) saturate(1.05)', WebkitBackdropFilter: 'blur(18px) saturate(1.05)', borderRadius: 6};
  const panelIn = (a: number) => ({opacity: p(t, a, a + 14), transform: `translateY(${(1 - p(t, a, a + 14)) * 12}px)`});
  const mask = [!F.coversX && 'linear-gradient(to right, transparent, #000 14%, #000 86%, transparent)', !F.coversY && 'linear-gradient(to bottom, transparent, #000 14%, #000 86%, transparent)'].filter(Boolean).join(', ') || undefined;

  return (
    <AbsoluteFill style={{background: P.ground}}>
      <AbsoluteFill style={{transform: `scale(${push})`, transformOrigin: `${cx}px ${cy}px`}}>
        <AbsoluteFill style={{opacity: photo}}>
          <Img src={staticFile(S.photo)} style={{position: 'absolute', left: F.ox, top: F.oy, width: S.w * F.k, height: S.h * F.k, WebkitMaskImage: mask, WebkitMaskComposite: !F.coversX && !F.coversY ? 'source-in' : undefined}} />
          <AbsoluteFill style={{background: shade}} />
          <AbsoluteFill style={{background: 'linear-gradient(to bottom, rgba(14,16,18,.6) 0%, rgba(14,16,18,0) 24%, rgba(14,16,18,0) 72%, rgba(14,16,18,.7) 100%)'}} />
        </AbsoluteFill>
        <svg width={L.W} height={L.H} style={{position: 'absolute', inset: 0}}>
          <g transform={`translate(${F.ox} ${F.oy}) scale(${F.k})`} opacity={lineOut}>
            <path d={S.outline} fill="none" stroke={P.ink} strokeWidth={2 / F.k} strokeLinejoin="round" pathLength={1} strokeDasharray="1" strokeDashoffset={1 - lineK} />
          </g>
          <g opacity={1 - p(t, 236, 250)}>
            <Draw d={`M${box.x0},${box.y1 + 46} L${box.x1},${box.y1 + 46}`} k={p(t, 34, 64)} stroke={faint} w={1} />
          </g>
          <defs><linearGradient id="scanfade" x1="0" x2="1"><stop offset="0" stopColor={P.ink} stopOpacity="0" /><stop offset="1" stopColor={P.ink} stopOpacity=".16" /></linearGradient></defs>
          {t >= 30 && t <= 104 && <>
            <rect x={scanX - 90} y={box.y0 - 70} width={90} height={box.y1 - box.y0 + 140} fill="url(#scanfade)" />
            <line x1={scanX} x2={scanX} y1={box.y0 - 70} y2={box.y1 + 70} stroke={P.ink} strokeWidth={1.5} />
          </>}
          {S.shots.map(([x0, y0], i) => {
            const x = x0 * F.k + F.ox, y = y0 * F.k + F.oy;
            const at = 30 + ((x - (box.x0 - 60)) / (box.x1 - box.x0 + 120)) * 70;
            const k = p(t, at, at + 10) * (1 - p(t, 236, 250));
            return <g key={i} opacity={k}><circle cx={x} cy={y} r={7 + (1 - k) * 10} fill="none" stroke={P.ink} strokeWidth={1.25} /><circle cx={x} cy={y} r={2} fill={P.ink} /></g>;
          })}
          {t >= 250 && <g stroke={acc > 0.5 ? P.accent : P.ink} strokeWidth={2.5} fill="none">
            <path d={corner(bx0, by0, 1, 1, 56)} /><path d={corner(bx1, by0, -1, 1, 56)} />
            <path d={corner(bx0, by1, 1, -1, 56)} /><path d={corner(bx1, by1, -1, -1, 56)} />
          </g>}
        </svg>
      </AbsoluteFill>

      <svg width={L.W} height={L.H} style={{position: 'absolute', inset: 0}}>
        <Draw d={corner(L.pad, L.pad, 1, 1, 40)} k={p(t, 6, 24)} />
        <Draw d={corner(L.W - L.pad, L.pad, -1, 1, 40)} k={p(t, 8, 26)} />
        <Draw d={corner(L.pad, L.H - L.pad, 1, -1, 40)} k={p(t, 10, 28)} />
        <Draw d={corner(L.W - L.pad, L.H - L.pad, -1, -1, 40)} k={p(t, 12, 30)} />
        <Draw d={`M${L.pad + 72},${L.pad + 70} L${L.W - L.pad - 72},${L.pad + 70}`} k={p(t, 14, 40)} stroke={faint} w={1} />
      </svg>

      <div style={{position: 'absolute', left: L.pad + 72, right: L.pad + 72, top: L.pad + 22, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, opacity: p(t, 14, 30)}}>
        <p style={{...MONO, fontSize: z(20), letterSpacing: '0.3em'}}>{K.topLeft}</p>
        <p style={{...MONO, fontSize: z(20), color: P.ink2}}>{K.topRight}</p>
      </div>

      <div style={{position: 'absolute', ...L.identity, ...glass, padding: z(26), display: 'grid', gap: z(10), ...panelIn(44)}}>
        <Type text={K.identityLabel} at={48} style={{fontSize: z(18), color: P.ink2, letterSpacing: '0.24em'}} />
        <Roll text={K.identity.toUpperCase()} at={58} style={{...DISPLAY, fontSize: z(idSize), letterSpacing: '0.04em', whiteSpace: 'nowrap'}} />
        {K.identityLines.map((l, i) => <Type key={i} text={l} at={92 + i * 18} style={{fontSize: z(20), color: P.ink2}} cps={2.4} />)}
      </div>

      <div style={{position: 'absolute', ...L.checks, ...glass, padding: z(26), display: 'grid', gap: z(16), ...panelIn(116)}}>
        <Type text={K.checksLabel} at={120} style={{fontSize: z(18), color: P.ink2, letterSpacing: '0.24em'}} />
        {K.checks.map((label, i) => {
          const at = 132 + i * 22;
          return (
            <div key={i} style={{display: 'flex', alignItems: 'baseline', gap: z(18)}}>
              <Type text={String(i + 1).padStart(2, '0')} at={at} style={{fontSize: z(20), color: P.ink2, width: z(30)}} cps={2} />
              <Type text={label} at={at + 2} style={{fontSize: z(23), flex: 1}} cps={3} />
              <p style={{...MONO, fontSize: z(20), opacity: p(t, at + 16, at + 20), color: acc > 0.5 ? P.accent : P.ink}}>[OK]</p>
            </div>
          );
        })}
      </div>

      <div style={{position: 'absolute', left: 0, right: 0, top: box.y1 + 54, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20, opacity: acc, transform: `translateY(${(1 - acc) * 10}px)`}}>
        {K.verdictMark && <Img src={staticFile(K.verdictMark)} style={{height: z(54), width: 'auto'}} />}
        <p style={{...DISPLAY, fontSize: z(46), letterSpacing: '0.14em', color: P.accent}}>{K.verdict}</p>
      </div>

      <div style={{position: 'absolute', ...L.bottom, display: 'flex', flexDirection: L.bottomColumn ? 'column' : 'row', justifyContent: 'space-between', alignItems: L.bottomColumn ? 'flex-start' : 'baseline', gap: L.bottomColumn ? z(10) : 0, opacity: p(t, 284, 300)}}>
        {K.footer.map((it, i) => (
          <p key={i} style={{...MONO, fontSize: z(22), color: it.value ? P.ink : P.ink2}}>{it.label}{it.value && <span style={{...DISPLAY, fontSize: z(34), marginLeft: 12}}>{it.value}</span>}</p>
        ))}
      </div>
    </AbsoluteFill>
  );
};

/* Example (placeholders — replace with the project's own data):
   <Inspection subject={{photo: 'subject.jpg', w: 1920, h: 1280, outline: 'M…Z', box: {x0: 440, y0: 630, x1: 1360, y1: 960}, shots: [[…]]}}
     copy={{topLeft: 'Brand · Inspection', topRight: 'Item 01 · Name', identityLabel: 'Identity', identity: 'SERIAL 0000',
            identityLines: ['Year · Make · Model', 'Location · City'], checksLabel: 'Verification',
            checks: ['Identity read and decoded', 'Photographed · 12 positions', 'Function recorded on video', 'Listing drafted', 'Specialist signed'],
            verdict: 'Verified', footer: [{label: 'Price · sample', value: '$0'}, {label: 'Photographed on site'}]}} /> */

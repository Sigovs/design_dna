import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const HERE = 'C:/Users/Sigoff/AppData/Local/Temp/claude/c------WORK--------------GDBURO-design-dna/df0b474b-438d-446b-a8e8-9ba20c372ea5/scratchpad';
const CMC = join(HERE, 'cmc');
const LOGOS = 'C:/____WORK/CHICAGO MOTOR CARS/assets/logos';

const b64 = (f) => `data:image/webp;base64,${readFileSync(join(CMC, f)).toString('base64')}`;
const svg = (f) => readFileSync(join(LOGOS, f), 'utf8').replace(/<!--[\s\S]*?-->/g, '').trim();

const MCLAREN = b64('mclaren.webp');
const MCTALL = b64('mclaren-tall.webp');
const SVJ = b64('svj.webp');
const WESTCHI = b64('westchicago.webp');
const IG = [1, 2, 3, 4, 5].map((n) => b64('ig' + n + '.webp'));

const WORDMARK = svg('cmc-wordmark.svg').replace(/<svg /, '<svg class="wm" ');
const MARK = svg('cmc-mark.svg').replace(/<svg /, '<svg class="mk" ');

// the lot rail — the device that runs through every screen
const rail = (active, opts = {}) => {
  const { top = 150, right = 40, count = 8 } = opts;
  let rows = '';
  for (let i = 1; i <= count; i++) {
    const n = String(i).padStart(2, '0');
    rows += `<span class="lot${i === active ? ' on' : ''}"><i></i>${n}</span>`;
  }
  return `<div class="rail" style="top:${top}px;right:${right}px">${rows}</div>`;
};

const html = `<title>Standing Frames Revised</title>

<style>
@import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:opsz,wght@6..96,400;6..96,500&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');

:root{
  --ground:#070A0F; --stage:#04060A;
  --rule:#1C232D; --rule-2:#2C3743; --rule-o:rgba(255,255,255,.16);
  --ink:#F5F7F9; --ink-2:#BAC3CE; --ink-3:#7F8A98; --ink-4:#525C68;
  --act:#CB141D;
  --display:"Bodoni Moda",Georgia,"Times New Roman",serif;
  --sans:"Inter",-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif;
  --mono:"IBM Plex Mono",ui-monospace,"SFMono-Regular",Consolas,monospace;
  --mclaren:url("${MCLAREN}");
  --mctall:url("${MCTALL}");
  --svj:url("${SVJ}");
  --westchi:url("${WESTCHI}");
}
*{box-sizing:border-box}
html,body{background:#020304}
body{margin:0;color:var(--ink);font-family:var(--sans);-webkit-font-smoothing:antialiased}
.sheet{max-width:1380px;margin:0 auto;padding:56px 20px 120px}
.stage{position:relative;width:100%;overflow:hidden;background:#000;margin:0 0 68px}
.stage>.vp{position:absolute;top:0;left:0;transform-origin:0 0}
.vp{background:var(--ground);position:relative;overflow:hidden}
.s1440x900{aspect-ratio:1440/900}
.s1440x960{aspect-ratio:1440/960}
.s1440x1280{aspect-ratio:1440/1280}
.s390x844{aspect-ratio:390/844}
.s390x800{aspect-ratio:390/800}
.phones{display:grid;grid-template-columns:390px 390px;gap:52px;justify-content:center}
@media(max-width:900px){.phones{grid-template-columns:1fr}}

.wm{display:block;fill:currentColor;height:auto}
.mk{display:block;fill:currentColor;height:auto;width:32px;color:var(--ink)}

/* ── the armature: hairlines you can see, everything hangs off them ── */
.vrule{position:absolute;top:0;bottom:0;width:1px;background:var(--rule)}
.hrule{position:absolute;height:1px;background:var(--rule)}

/* ── the lot rail: the device that runs through every screen ── */
.rail{position:absolute;display:flex;flex-direction:column;gap:15px;align-items:flex-end}
.lot{display:flex;align-items:center;gap:11px;font-family:var(--mono);font-size:11.5px;
  letter-spacing:.16em;color:var(--ink-4)}
.lot i{display:block;width:16px;height:1px;background:var(--rule-2)}
.lot.on{color:var(--ink)}
.lot.on i{width:38px;height:1px;background:var(--act)}

/* ── chrome ── */
.bar{position:absolute;top:0;left:0;right:0;height:82px;display:flex;align-items:center;
  justify-content:space-between;padding:0 40px;background:var(--stage);border-bottom:1px solid var(--rule);z-index:6}
.nav{display:flex;gap:28px;font-size:14.5px;color:var(--ink-2);letter-spacing:.004em}
.nav b{color:var(--ink);font-weight:600}
.barlink{font-family:var(--mono);font-size:12.5px;letter-spacing:.16em;color:var(--ink-2)}

.scene{position:absolute;inset:0;background-size:cover;background-repeat:no-repeat}

/* ── type ── */
.kicker{font-family:var(--mono);font-size:11.5px;letter-spacing:.2em;text-transform:uppercase;color:var(--ink-3);margin:0}
.display{font-family:var(--display);font-optical-sizing:auto;font-weight:400;font-size:66px;line-height:1.07;
  letter-spacing:-.012em;margin:0}
.display em{font-style:italic}
.h2{font-family:var(--display);font-weight:400;font-size:52px;line-height:1.08;letter-spacing:-.01em;margin:0}
.h3{font-family:var(--sans);font-size:26px;font-weight:600;letter-spacing:-.015em;margin:0}
.lede{font-size:16px;line-height:1.66;color:var(--ink-2);margin:0;max-width:38ch}
.para{font-size:17px;line-height:1.72;color:var(--ink-2);margin:0}
.spec{font-family:var(--mono);font-size:12.5px;letter-spacing:.12em;text-transform:uppercase;color:var(--ink-3);margin:0}
.acts{display:flex;align-items:center;gap:28px}
.cta{display:inline-flex;align-items:center;justify-content:center;background:var(--act);color:#fff;
  height:54px;padding:0 30px;font-family:var(--mono);font-size:12px;letter-spacing:.18em;text-transform:uppercase}
.route{font-family:var(--mono);font-size:12px;letter-spacing:.18em;text-transform:uppercase;
  color:var(--ink);border-bottom:1px solid var(--rule-o);padding-bottom:5px}
.cap{position:absolute;font-family:var(--mono);font-size:12.5px;letter-spacing:.13em;color:var(--ink-3);margin:0}

/* ── facts, set as a plate under the armature ── */
.plate{position:absolute;display:grid;grid-auto-flow:column;grid-auto-columns:1fr}
.plate div{padding-right:30px}
.plate dt{font-family:var(--mono);font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:var(--ink-4);margin:0}
.plate dd{font-family:var(--mono);font-size:14px;letter-spacing:.06em;color:var(--ink-2);margin:9px 0 0}

/* ── the lot number as a spatial layer ── */
.lotmark{position:absolute;font-family:var(--display);font-weight:400;line-height:.8;
  color:rgba(255,255,255,.055);letter-spacing:-.02em;pointer-events:none}

/* ── the standing ground ── */
.ground{position:absolute;overflow:hidden;background:var(--stage)}
.ground .env{position:absolute;inset:-8%;background-image:var(--mclaren);background-size:cover;
  background-position:52% 62%;filter:blur(34px) brightness(.4) saturate(.66)}
.ground .pool{position:absolute;left:50%;top:50%;width:124%;height:76%;transform:translate(-50%,-50%);
  background:radial-gradient(ellipse at 50% 58%, rgba(66,82,100,.5) 0%, rgba(20,28,37,.4) 36%, rgba(5,7,11,.86) 68%, #04060A 84%)}
.ground .floor{position:absolute;left:0;right:0;bottom:0;height:34%;
  background:linear-gradient(to bottom, rgba(8,12,17,0) 0%, #070A0F 60%, #05070B 100%)}
.ground .vig{position:absolute;inset:0;background:radial-gradient(ellipse at 50% 50%, transparent 36%, rgba(4,6,10,.94) 96%)}
.ground .car{position:absolute;left:50%;transform:translateX(-50%);background-image:var(--svj);
  background-size:contain;background-repeat:no-repeat;background-position:center bottom}

.frame{position:absolute;background:var(--stage);overflow:hidden;background-size:cover;background-repeat:no-repeat}
.other{display:grid;grid-template-columns:150px 1fr auto;gap:0 20px;align-items:baseline;padding:16px 0;
  border-top:1px solid var(--rule);font-size:16px;color:var(--ink-2)}
.other .a{font-family:var(--mono);font-size:12.5px;letter-spacing:.06em;color:var(--ink-3)}
.other .t{font-family:var(--mono);font-size:13.5px;letter-spacing:.08em;color:var(--ink-2)}
.other.soon{color:var(--ink-4)}
.addr{font-family:var(--mono);font-size:13.5px;line-height:1.7;letter-spacing:.05em;color:var(--ink-3);margin:12px 0 0}
.phone{font-family:var(--mono);font-size:18px;letter-spacing:.1em;color:var(--ink);margin:14px 0 0;display:block}
</style>

<div class="sheet">

<!-- ─── the floor ─── -->
<div class="stage s1440x900" data-w="1440"><div class="vp" style="width:1440px;height:900px">
  <div class="scene" style="background-image:var(--mclaren);background-position:88% 94%;background-size:176%"></div>
  <div class="bar">
    ${MARK}
    <nav class="nav"><b>The floor</b><span>Sell or trade</span><span>Financing</span><span>Warranty</span><span>Service</span><span>Showrooms</span></nav>
    <span class="barlink">630 221 1800</span>
  </div>

  <div class="vrule" style="left:104px;top:82px"></div>
  <div class="hrule" style="left:104px;right:40px;top:764px"></div>

  <div style="position:absolute;left:140px;top:300px;width:660px">
    <span style="display:block;width:186px;color:var(--ink)">${WORDMARK}</span>
    <p class="kicker" style="margin-top:36px;color:var(--ink-2)">The floor &mdash; West Chicago</p>
    <p class="display" style="margin-top:20px">Some cars only make<br>sense <em>standing still.</em></p>
    <p class="lede" style="margin-top:26px;max-width:46ch">Rare, exotic and collector vehicles, kept indoors where they can be walked around before anything is signed.</p>
    <div class="acts" style="margin-top:34px"><a class="cta">See the floor</a><a class="route">Sell or trade</a></div>
  </div>

  <div class="plate" style="left:140px;top:800px;right:40px">
    <div><dt>Showrooms</dt><dd>Four, three states</dd></div>
    <div><dt>On the floor</dt><dd>Rare &middot; exotic &middot; collector</dd></div>
    <div><dt>Karma</dt><dd>Authorised dealer</dd></div>
    <div><dt>Enquiries</dt><dd>630 221 1800</dd></div>
  </div>

  ${rail(1, { top: 396 })}
</div></div>

<!-- ─── lot 02 ─── -->
<div class="stage s1440x960" data-w="1440"><div class="vp" style="width:1440px;height:960px">
  <div class="ground" style="left:0;top:0;width:1440px;height:960px">
    <div class="env"></div><div class="pool" style="top:38%"></div><div class="floor"></div>
    <div class="vig"></div>
  </div>
  <div class="lotmark" style="left:96px;top:96px;font-size:330px">02</div>
  <div class="ground" style="left:0;top:0;width:1440px;height:960px;background:none">
    <div class="car" style="width:1030px;height:419px;bottom:378px"></div>
  </div>

  <div class="vrule" style="left:104px;top:0"></div>
  <div class="hrule" style="left:104px;right:40px;top:600px"></div>

  <div style="position:absolute;left:140px;top:650px;width:760px">
    <p class="kicker">Lot 02 &mdash; on the floor now</p>
    <p class="h2" style="margin-top:18px">2021 Lamborghini<br>Aventador SVJ Roadster</p>
    <p class="spec" style="margin-top:20px">6.5&#8202;L V12 &middot; 770&#8202;hp &middot; Roadster &middot; All-wheel drive</p>
    <div class="acts" style="margin-top:32px"><a class="cta">Open this lot</a><a class="route">Request price</a></div>
  </div>

  ${rail(2, { top: 150 })}
  <p class="cap" style="right:40px;top:892px">West Chicago</p>
</div></div>

<!-- ─── the record ─── -->
<div class="stage s1440x1280" data-w="1440"><div class="vp" style="width:1440px;height:1280px">
  <div class="vrule" style="left:104px;top:0"></div>
  <div class="hrule" style="left:104px;right:40px;top:300px"></div>
  <div class="hrule" style="left:104px;right:40px;top:868px"></div>

  <p class="kicker" style="position:absolute;left:140px;top:104px">Where the cars are</p>
  <p class="h2" style="position:absolute;left:140px;top:142px">Four floors open,<br>and a fifth on the way.</p>
  <p class="para" style="position:absolute;left:800px;top:150px;width:600px">Chicago Motor Cars sells rare, exotic and collector vehicles out of West Chicago, and now runs four showrooms across three states. Every car is photographed and inspected before it reaches the floor, kept indoors until it is sold, and serviced afterwards in the building it was sold from.</p>

  <div class="frame" style="left:140px;top:356px;width:660px;height:440px;background-image:var(--westchi);background-position:50% 46%"></div>
  <p class="cap" style="left:140px;top:812px">27W110 North Avenue, West Chicago</p>

  <div style="position:absolute;left:872px;top:356px;width:528px">
    <p class="h3">West Chicago</p>
    <p class="addr">27W110 North Avenue<br>West Chicago, IL 60185</p>
    <span class="phone">630 221 1800</span>
  </div>
  <div style="position:absolute;left:872px;top:540px;width:528px">
    <div class="other"><span>Naperville</span><span class="a">2104 Ferry Road</span><span class="t">630 221 1800</span></div>
    <div class="other"><span>Rock Hill</span><span class="a">727 Marine Drive</span><span class="t">803 891 7788</span></div>
    <div class="other"><span>Tonganoxie</span><span class="a">1650 Commerce Avenue</span><span class="t">913 845 9633</span></div>
    <div class="other soon" style="border-bottom:1px solid var(--rule)"><span>Newport Beach</span><span class="a">California</span><span class="t">Opening soon</span></div>
  </div>

  <p class="kicker" style="position:absolute;left:140px;top:906px">@chicagomotorcars</p>
  <div style="position:absolute;right:40px;top:900px"><a class="route">Follow</a></div>

  <div style="position:absolute;left:140px;top:952px;width:1260px;height:280px">
    <div style="position:absolute;left:0;top:0;width:508px;height:280px;background-image:url('${IG[0]}');background-size:cover;background-position:center"></div>
    <div style="position:absolute;left:520px;top:0;width:240px;height:280px;background-image:url('${IG[1]}');background-size:cover;background-position:center"></div>
    <div style="position:absolute;left:772px;top:0;width:240px;height:134px;background-image:url('${IG[2]}');background-size:cover;background-position:center"></div>
    <div style="position:absolute;left:772px;top:146px;width:240px;height:134px;background-image:url('${IG[3]}');background-size:cover;background-position:center"></div>
    <div style="position:absolute;left:1024px;top:0;width:236px;height:280px;background-image:url('${IG[4]}');background-size:cover;background-position:center"></div>
  </div>
</div></div>

<!-- ─── mobile ─── -->
<div class="phones">
  <div class="stage s390x844" data-w="390"><div class="vp" style="width:390px;height:844px;background:var(--stage)">
    <div class="bar" style="height:58px;padding:0 20px">
      <span style="display:block;width:26px;color:var(--ink)">${MARK}</span>
      <span class="barlink" style="font-size:11.5px">Menu</span>
    </div>
    <div class="vrule" style="left:52px;top:58px"></div>

    <div class="lotmark" style="right:16px;top:74px;font-size:120px">01</div>

    <p class="kicker" style="position:absolute;left:74px;top:98px;font-size:11px">The floor &mdash; West Chicago</p>
    <p class="display" style="position:absolute;left:74px;top:124px;width:300px;font-size:40px">Some cars only make sense <em>standing still.</em></p>

    <div style="position:absolute;left:0;top:328px;width:390px;height:346px;background-image:var(--mctall);background-size:cover;background-position:50% 46%"></div>
    <div style="position:absolute;left:0;top:328px;width:390px;height:66px;background:linear-gradient(to bottom,#04060A,rgba(4,6,10,0))"></div>
    <div style="position:absolute;left:0;top:602px;width:390px;height:72px;background:linear-gradient(to top,#04060A,rgba(4,6,10,0))"></div>

    <p class="lede" style="position:absolute;left:74px;top:690px;width:296px;font-size:14.5px;max-width:none">Rare, exotic and collector vehicles, kept indoors where they can be walked around.</p>
    <a class="cta" style="position:absolute;left:74px;top:756px;width:296px;height:52px">See the floor</a>
    <div class="hrule" style="left:52px;right:20px;top:818px"></div>
    <p class="cap" style="left:74px;top:822px;font-size:11px">West Chicago &middot; Naperville &middot; Rock Hill</p>
  </div></div>

  <div class="stage s390x800" data-w="390"><div class="vp" style="width:390px;height:800px;background:var(--stage)">
    <div class="ground" style="left:0;top:0;width:390px;height:470px">
      <div class="env"></div><div class="pool" style="top:40%"></div><div class="floor"></div>
      <div class="vig"></div>
    </div>
    <div class="lotmark" style="left:14px;top:40px;font-size:150px">02</div>
    <div class="ground" style="left:0;top:0;width:390px;height:470px;background:none">
      <div class="car" style="width:344px;height:140px;bottom:180px"></div>
    </div>

    <div class="vrule" style="left:52px;top:0"></div>
    <div class="hrule" style="left:52px;right:20px;top:430px"></div>

    <div style="position:absolute;left:74px;top:466px;width:296px">
      <p class="kicker" style="font-size:11px">Lot 02 &mdash; on the floor now</p>
      <p class="h2" style="margin-top:14px;font-size:28px">2021 Lamborghini<br>Aventador SVJ<br>Roadster</p>
      <p class="spec" style="margin-top:16px;font-size:11px">6.5&#8202;L V12 &middot; 770&#8202;hp &middot; Roadster</p>
      <a class="cta" style="margin-top:26px;width:296px;height:52px">Open this lot</a>
      <a class="route" style="display:inline-block;margin-top:24px;font-size:11.5px">Request price</a>
    </div>

    <div class="hrule" style="left:52px;right:20px;top:752px"></div>
    <p class="cap" style="left:74px;top:772px;font-size:11.5px">Lot 02 of the floor &middot; West Chicago</p>
  </div></div>
</div>

</div>

<script>
(function(){
  function fit(){
    document.querySelectorAll('.stage').forEach(function(s){
      var w = +s.dataset.w, v = s.querySelector('.vp');
      if (!v || !w) return;
      v.style.transform = 'scale(' + (s.clientWidth / w) + ')';
    });
  }
  fit();
  addEventListener('resize', fit);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
})();
</script>
`;

writeFileSync(join(HERE, 'contract.html'), html, 'utf8');
console.log('contract.html', (Buffer.byteLength(html) / 1024 / 1024).toFixed(2), 'MB');

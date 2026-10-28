import { useEffect, useRef } from 'react';

/* IntelOasis hero — a still desert oasis at night.
   One canvas: static layers (sky, stars, moon, dunes, palms) are painted once
   to offscreen buffers; only star twinkle and the lake's reflections animate.
   Paused when off-screen or hidden; a single still frame for reduced motion. */

function rng(seed) { let s = seed >>> 0; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); }
function gauss(r) { return (r() + r() + r() + r() - 2) / 2; }

/* Smooth dune ridge: sum of low-frequency sines with a sharper crest. */
function ridge(w, baseY, amp, seed, freq) {
  const r = rng(seed); const ph = [r() * 6.28, r() * 6.28, r() * 6.28];
  const pts = [];
  for (let x = -10; x <= w + 10; x += 4) {
    const t = x / w;
    let v = 0.62 * Math.sin(t * freq + ph[0]) + 0.28 * Math.sin(t * freq * 2.1 + ph[1]) + 0.1 * Math.sin(t * freq * 4.3 + ph[2]);
    v = Math.sign(v) * Math.pow(Math.abs(v), 0.85);
    pts.push([x, baseY - amp * v]);
  }
  return pts;
}

/* Date palm: tapered, gently curved trunk; feathery fronds of fine leaflets. */
function palm(ctx, x, y, H, lean, col, seed) {
  const r = rng(seed);
  const tx = x + lean * H, ty = y - H;
  const cx = x + lean * H * 0.15, cy = y - H * 0.55;
  ctx.fillStyle = col; ctx.strokeStyle = col;
  const b = H * 0.035, t = H * 0.016;
  ctx.beginPath();
  ctx.moveTo(x - b, y);
  ctx.quadraticCurveTo(cx - (b + t) / 2, cy, tx - t, ty);
  ctx.lineTo(tx + t, ty);
  ctx.quadraticCurveTo(cx + (b + t) / 2, cy, x + b, y);
  ctx.closePath(); ctx.fill();
  // crown
  ctx.beginPath(); ctx.ellipse(tx, ty + H * 0.01, H * 0.03, H * 0.022, 0, 0, Math.PI * 2); ctx.fill();
  const n = 13;
  for (let i = 0; i < n; i++) {
    const a = -Math.PI + (i / (n - 1)) * Math.PI + (r() - 0.5) * 0.25;   // spread over the upper half
    const up = Math.sin(-a);                                              // 0 at sides, 1 at top
    const len = H * (0.42 + r() * 0.14) * (0.75 + 0.25 * (1 - up));
    const droop = H * (0.22 + 0.2 * (1 - up)) * (0.8 + r() * 0.4);
    const ex = tx + Math.cos(a) * len, ey = ty + Math.sin(a) * len * 0.55 + droop;
    const mx = tx + Math.cos(a) * len * 0.55, my = ty + Math.sin(a) * len * 0.75 - H * 0.04;
    const steps = 26; let px = tx, py = ty;
    ctx.lineWidth = Math.max(0.8, H * 0.006); ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(tx, ty); ctx.quadraticCurveTo(mx, my, ex, ey); ctx.stroke();
    ctx.lineWidth = Math.max(0.6, H * 0.0035);
    ctx.beginPath();
    for (let s = 1; s <= steps; s++) {
      const u = s / steps, iu = 1 - u;
      const qx = iu * iu * tx + 2 * iu * u * mx + u * u * ex;
      const qy = iu * iu * ty + 2 * iu * u * my + u * u * ey;
      const dx = qx - px, dy = qy - py, dl = Math.hypot(dx, dy) || 1;
      const nx = -dy / dl, ny = dx / dl;
      const L = H * 0.075 * Math.sin(Math.PI * Math.min(1, u * 1.15)) * (0.85 + r() * 0.3);
      if (u > 0.08) {
        for (const sgn of [1, -1]) {
          const lx = qx + (nx * sgn * 0.75 + dx / dl * 0.35) * L;
          const ly = qy + (ny * sgn * 0.75 + dy / dl * 0.35) * L + L * 0.55;
          ctx.moveTo(qx, qy); ctx.lineTo(lx, ly);
        }
      }
      px = qx; py = qy;
    }
    ctx.stroke();
  }
}

export default function OasisHero({ className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0, h = 0, dpr = 1, raf = 0, visible = true, last = 0;
    let base = null, fore = null, twinklers = [], reflStars = [];
    let horizon = 0, lake = null, moon = null, mobile = false;

    function build() {
      const rect = canvas.getBoundingClientRect();
      w = Math.max(1, rect.width); h = Math.max(1, rect.height);
      mobile = w < 720;
      dpr = Math.min(window.devicePixelRatio || 1, mobile ? 2 : 2);
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      horizon = h * (mobile ? 0.7 : 0.66);
      moon = { x: w * (mobile ? 0.76 : 0.74), y: h * (mobile ? 0.12 : 0.2), r: Math.max(9, Math.min(w, h) * (mobile ? 0.026 : 0.022)) };
      lake = { cx: w * 0.5, top: horizon + h * (mobile ? 0.085 : 0.075), rx: w * (mobile ? 0.44 : 0.3), ry: h * (mobile ? 0.05 : 0.06) };
      lake.cy = lake.top + lake.ry;

      const mk = () => { const c = document.createElement('canvas'); c.width = canvas.width; c.height = canvas.height; const x = c.getContext('2d'); x.scale(dpr, dpr); return [c, x]; };
      const [bc, b] = mk(); base = bc;
      const [fc, f] = mk(); fore = fc;

      // Sky
      const g = b.createLinearGradient(0, 0, 0, horizon);
      g.addColorStop(0, '#030409'); g.addColorStop(0.45, '#070a14'); g.addColorStop(0.82, '#0f1220'); g.addColorStop(1, '#1a1a22');
      b.fillStyle = g; b.fillRect(0, 0, w, h);
      // faint warm air glow at the horizon
      const hz = b.createLinearGradient(0, horizon - h * 0.18, 0, horizon);
      hz.addColorStop(0, 'rgba(200,164,90,0)'); hz.addColorStop(1, 'rgba(200,164,90,0.07)');
      b.fillStyle = hz; b.fillRect(0, horizon - h * 0.18, w, h * 0.18);

      // Milky Way: a soft band of dust and dense faint stars
      const r = rng(11);
      b.save();
      b.translate(w * 0.5, horizon * 0.55); b.rotate(-0.42);
      const bandW = Math.hypot(w, h), bandH = h * 0.16;
      for (let i = 0; i < 26; i++) {
        const x = (r() - 0.5) * bandW, y = gauss(r) * bandH * 0.4, rad = bandH * (0.4 + r() * 0.8);
        const cg = b.createRadialGradient(x, y, 0, x, y, rad);
        cg.addColorStop(0, `rgba(170,180,210,${0.035 + r() * 0.03})`); cg.addColorStop(1, 'rgba(170,180,210,0)');
        b.fillStyle = cg; b.fillRect(x - rad, y - rad, rad * 2, rad * 2);
      }
      const dust = Math.round(w * (mobile ? 0.9 : 1.6));
      for (let i = 0; i < dust; i++) {
        const x = (r() - 0.5) * bandW, y = gauss(r) * bandH * 0.45;
        b.fillStyle = `rgba(225,228,240,${0.08 + r() * 0.22})`;
        b.fillRect(x, y, 0.6, 0.6);
      }
      b.restore();

      // Star field: fine, mostly static; a subset twinkles at runtime
      const sr = rng(5);
      const count = Math.round((w * horizon) / (mobile ? 1300 : 1000));
      twinklers = []; reflStars = [];
      for (let i = 0; i < count; i++) {
        const y = Math.pow(sr(), 1.35) * horizon * 0.96;
        const x = sr() * w;
        const m = sr();
        const s = m > 0.985 ? 1.25 + sr() * 0.5 : m > 0.9 ? 0.75 + sr() * 0.35 : 0.35 + sr() * 0.35;
        const fade = 1 - Math.pow(y / horizon, 3) * 0.75;
        const a = (0.35 + sr() * 0.55) * fade;
        const tint = sr() < 0.12 ? '255,236,205' : sr() < 0.1 ? '205,220,255' : '245,245,250';
        if (s > 0.7) twinklers.push({ x, y, s, a, tint, f: 0.4 + sr() * 1.4, p: sr() * 6.28 });
        else { b.fillStyle = `rgba(${tint},${a})`; b.beginPath(); b.arc(x, y, s, 0, 6.283); b.fill(); }
        if (s > 0.6) reflStars.push({ x, y, s, a, tint, p: sr() * 6.28 });
      }

      // Moon: soft disc, faint maria, wide atmospheric glow
      const { x: mx, y: my, r: mr } = moon;
      const halo = b.createRadialGradient(mx, my, mr, mx, my, mr * 14);
      halo.addColorStop(0, 'rgba(232,226,205,0.16)'); halo.addColorStop(0.25, 'rgba(232,226,205,0.05)'); halo.addColorStop(1, 'rgba(232,226,205,0)');
      b.fillStyle = halo; b.fillRect(mx - mr * 14, my - mr * 14, mr * 28, mr * 28);
      const md = b.createRadialGradient(mx - mr * 0.25, my - mr * 0.25, mr * 0.1, mx, my, mr);
      md.addColorStop(0, '#fbf8ef'); md.addColorStop(0.8, '#ece5d2'); md.addColorStop(1, '#d9cfb6');
      b.fillStyle = md; b.beginPath(); b.arc(mx, my, mr, 0, 6.283); b.fill();
      b.save(); b.beginPath(); b.arc(mx, my, mr, 0, 6.283); b.clip();
      [[0.25, -0.2, 0.42, 0.07], [-0.3, 0.15, 0.32, 0.06], [0.05, 0.42, 0.25, 0.05]].forEach(([dx, dy, rr, al]) => {
        const sg = b.createRadialGradient(mx + dx * mr, my + dy * mr, 0, mx + dx * mr, my + dy * mr, rr * mr);
        sg.addColorStop(0, `rgba(140,130,110,${al})`); sg.addColorStop(1, 'rgba(140,130,110,0)');
        b.fillStyle = sg; b.fillRect(mx - mr, my - mr, mr * 2, mr * 2);
      });
      b.restore();

      // Dunes: atmospheric perspective — far ranges lighter and cooler
      const layers = [
        { y: horizon, amp: h * 0.03, seed: 3, f: 5.5, top: '#1a1b26', bot: '#121320', rim: 0.07 },
        { y: horizon + h * 0.03, amp: h * 0.04, seed: 9, f: 3.6, top: '#14151f', bot: '#0c0d15', rim: 0.09 },
      ];
      const drawLayer = (cx2, L) => {
        const pts = ridge(w, L.y, L.amp, L.seed, L.f);
        cx2.beginPath(); cx2.moveTo(-10, h); pts.forEach(([x, y]) => cx2.lineTo(x, y)); cx2.lineTo(w + 10, h); cx2.closePath();
        const lg = cx2.createLinearGradient(0, L.y - L.amp, 0, L.y + h * 0.12);
        lg.addColorStop(0, L.top); lg.addColorStop(1, L.bot);
        cx2.fillStyle = lg; cx2.fill();
        // moonlit crest: a fine highlight, brighter on the side facing the moon
        const rg = cx2.createLinearGradient(0, 0, w, 0);
        rg.addColorStop(0, `rgba(222,205,165,${L.rim * 0.35})`); rg.addColorStop(moon.x / w, `rgba(222,205,165,${L.rim})`); rg.addColorStop(1, `rgba(222,205,165,${L.rim * 0.5})`);
        cx2.strokeStyle = rg; cx2.lineWidth = 0.8;
        cx2.beginPath(); pts.forEach(([x, y], i) => i ? cx2.lineTo(x, y) : cx2.moveTo(x, y)); cx2.stroke();
      };
      layers.forEach((L) => drawLayer(b, L));

      // Basin floor around the lake
      const floorY = lake.top - h * 0.02;
      const fl = b.createLinearGradient(0, floorY, 0, h);
      fl.addColorStop(0, '#0d0e15'); fl.addColorStop(1, '#07080d');
      b.fillStyle = fl;
      b.beginPath(); b.moveTo(-10, h);
      ridge(w, floorY, h * 0.012, 21, 2.2).forEach(([x, y]) => b.lineTo(x, y));
      b.lineTo(w + 10, h); b.closePath(); b.fill();
      // pale sand rim along the far shore
      b.save(); b.translate(lake.cx, lake.cy); b.scale(1, lake.ry / lake.rx);
      const sand = b.createRadialGradient(0, 0, lake.rx * 0.98, 0, 0, lake.rx * 1.12);
      sand.addColorStop(0, 'rgba(200,180,140,0.10)'); sand.addColorStop(1, 'rgba(200,180,140,0)');
      b.fillStyle = sand; b.beginPath(); b.arc(0, 0, lake.rx * 1.12, 0, 6.283); b.fill(); b.restore();

      // Foreground: palms framing the water, and a dark near dune
      const P = '#030408';
      const sc = mobile ? h * 0.17 : h * 0.24;
      const palms = mobile
        ? [[lake.cx - lake.rx * 0.98, lake.cy - lake.ry * 0.3, sc * 1.0, -0.14, 2], [lake.cx - lake.rx * 0.8, lake.cy + lake.ry * 0.2, sc * 0.68, 0.06, 4],
           [lake.cx + lake.rx * 0.92, lake.cy - lake.ry * 0.4, sc * 1.12, 0.16, 6], [lake.cx + lake.rx * 0.75, lake.cy, sc * 0.6, -0.08, 8]]
        : [[lake.cx - lake.rx * 1.02, lake.cy - lake.ry * 0.4, sc * 1.0, -0.12, 2], [lake.cx - lake.rx * 0.86, lake.cy + lake.ry * 0.15, sc * 0.7, 0.07, 4], [lake.cx - lake.rx * 1.2, lake.cy + lake.ry * 0.4, sc * 0.55, -0.2, 5],
           [lake.cx + lake.rx * 0.95, lake.cy - lake.ry * 0.5, sc * 1.15, 0.14, 6], [lake.cx + lake.rx * 1.12, lake.cy + lake.ry * 0.1, sc * 0.78, 0.24, 8], [lake.cx + lake.rx * 0.8, lake.cy + lake.ry * 0.25, sc * 0.5, -0.06, 9]];
      lake.palms = palms;
      palms.forEach(([x, y, H, lean, s]) => palm(f, x, y, H, lean, P, s));
      // reeds / low scrub at the waterline
      const rr = rng(31); f.strokeStyle = P; f.lineWidth = 0.8;
      for (let i = 0; i < (mobile ? 50 : 110); i++) {
        const side = rr() < 0.5 ? -1 : 1;
        const ang = (0.55 + rr() * 0.4) * Math.PI;
        const x = lake.cx + side * lake.rx * (0.7 + rr() * 0.32);
        const y = lake.cy + Math.sin(ang) * lake.ry * 0.6 * (rr() < 0.5 ? -1 : 1);
        const hh = 4 + rr() * (mobile ? 8 : 14);
        f.beginPath(); f.moveTo(x, y); f.quadraticCurveTo(x + (rr() - 0.5) * 4, y - hh * 0.6, x + (rr() - 0.5) * 6, y - hh); f.stroke();
      }
      const near = ridge(w, h - h * 0.06, h * 0.03, 41, 1.6);
      f.beginPath(); f.moveTo(-10, h); near.forEach(([x, y]) => f.lineTo(x, y)); f.lineTo(w + 10, h); f.closePath();
      const ng = f.createLinearGradient(0, h - h * 0.1, 0, h); ng.addColorStop(0, '#06070b'); ng.addColorStop(1, '#030407');
      f.fillStyle = ng; f.fill();
    }

    function drawLake(t) {
      const { cx, cy, rx, ry } = lake;
      ctx.save();
      ctx.beginPath(); ctx.ellipse(cx, cy, rx, ry, 0, 0, 6.283); ctx.clip();
      // water mirrors the sky near the horizon: lighter at the far edge
      const wg = ctx.createLinearGradient(0, cy - ry, 0, cy + ry);
      wg.addColorStop(0, '#22232e'); wg.addColorStop(0.4, '#12141d'); wg.addColorStop(1, '#07080d');
      ctx.fillStyle = wg; ctx.fillRect(cx - rx, cy - ry, rx * 2, ry * 2);
      // reflected stars, compressed and gently broken by the surface
      for (const s of reflStars) {
        if (s.x < cx - rx || s.x > cx + rx) continue;
        const yy = cy - ry + (s.y / horizon) * ry * 2.2;
        if (yy > cy + ry) continue;
        const k = reduce ? 0.6 : 0.45 + 0.55 * Math.pow(Math.sin(t * 0.9 + s.p), 2);
        const dx = reduce ? 0 : Math.sin(t * 0.8 + yy * 0.35) * 0.9;
        ctx.fillStyle = `rgba(${s.tint},${s.a * 0.45 * k})`;
        ctx.fillRect(s.x + dx - s.s, yy, s.s * 2.4, Math.max(0.5, s.s * 0.6));
      }
      // moon glade: a column of fine, drifting glints
      const cxm = Math.max(cx - rx * 0.7, Math.min(cx + rx * 0.7, moon.x));
      const rows = mobile ? 22 : 30;
      for (let i = 0; i < rows; i++) {
        const u = i / rows;
        const yy = cy - ry * 0.96 + u * ry * 1.9;
        const spread = (6 + u * 26) * (rx / 420);
        const segs = 2 + Math.floor(u * 3);
        for (let j = 0; j < segs; j++) {
          const ph = i * 1.7 + j * 2.3;
          const off = (reduce ? Math.sin(ph) : Math.sin(t * 0.7 + ph)) * spread;
          const len = (4 + u * 16) * (rx / 420) * (0.6 + 0.4 * Math.sin(t * 1.3 + ph * 1.1));
          const a = (0.5 - u * 0.36) * (0.55 + 0.45 * Math.sin(t * 1.9 + ph));
          ctx.fillStyle = `rgba(240,232,210,${Math.max(0, a)})`;
          ctx.fillRect(cxm + off - len / 2, yy, len, 0.9 + u * 0.6);
        }
      }
      // inverted palm reflections, softened
      const m = cy - ry * 0.3;
      ctx.save(); ctx.globalAlpha = 0.55;
      ctx.setTransform(1, 0, 0, -1, 0, 2 * m * dpr);
      ctx.drawImage(fore, 0, 0);
      ctx.restore();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // slow horizontal swell bands
      if (!reduce) {
        for (let i = 0; i < 5; i++) {
          const yy = cy - ry + ((t * 4 + i * (ry * 0.45)) % (ry * 2));
          ctx.fillStyle = 'rgba(169,196,192,0.025)';
          ctx.fillRect(cx - rx, yy, rx * 2, 1);
        }
      }
      ctx.restore();
      // crisp far-shore line
      ctx.strokeStyle = 'rgba(220,205,170,0.14)'; ctx.lineWidth = 0.8;
      ctx.beginPath(); ctx.ellipse(cx, cy, rx, ry, 0, Math.PI * 1.04, Math.PI * 1.96); ctx.stroke();
    }

    function frame(ms) {
      if (!reduce && ms - last < 33) { raf = requestAnimationFrame(frame); return; }
      last = ms; const t = ms / 1000;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.drawImage(base, 0, 0);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      for (const s of twinklers) {
        const k = reduce ? 0.85 : 0.62 + 0.38 * Math.sin(t * s.f + s.p);
        ctx.fillStyle = `rgba(${s.tint},${s.a * k})`;
        ctx.beginPath(); ctx.arc(s.x, s.y, s.s, 0, 6.283); ctx.fill();
        if (s.s > 1.2) {
          const gl = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.s * 5);
          gl.addColorStop(0, `rgba(${s.tint},${0.18 * k})`); gl.addColorStop(1, `rgba(${s.tint},0)`);
          ctx.fillStyle = gl; ctx.fillRect(s.x - s.s * 5, s.y - s.s * 5, s.s * 10, s.s * 10);
        }
      }
      drawLake(t);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.drawImage(fore, 0, 0);
      if (!reduce && visible && !document.hidden) raf = requestAnimationFrame(frame);
    }
    const start = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(frame); };
    build(); start();
    let rt = 0;
    const ro = new ResizeObserver(() => { clearTimeout(rt); rt = setTimeout(() => { build(); start(); }, 120); }); ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) start(); }); io.observe(canvas);
    const vis = () => { if (!document.hidden) start(); }; document.addEventListener('visibilitychange', vis);
    return () => { cancelAnimationFrame(raf); clearTimeout(rt); ro.disconnect(); io.disconnect(); document.removeEventListener('visibilitychange', vis); };
  }, []);
  return <canvas ref={ref} aria-hidden="true" className={`absolute inset-0 w-full h-full ${className}`} />;
}

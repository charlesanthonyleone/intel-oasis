import { useEffect, useRef } from 'react';

/* A literal oasis at night: starry sky, moon, shooting stars, layered dunes,
   palm silhouettes and an animated lake reflecting moon + stars.
   variant="hero" (full scene) | "backdrop" (stars + dune horizon, no lake). */

function rng(seed) { let s = seed >>> 0; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); }

function dunePath(ctx, w, h, baseY, amp, seed, freq) {
  const r = rng(seed); const p = [r() * 6, r() * 6, r() * 6];
  ctx.beginPath(); ctx.moveTo(0, h);
  for (let x = 0; x <= w; x += 6) {
    const t = x / w;
    const y = baseY - amp * (0.55 * Math.sin(t * freq + p[0]) + 0.3 * Math.sin(t * freq * 2.3 + p[1]) + 0.15 * Math.sin(t * freq * 5.1 + p[2]));
    ctx.lineTo(x, y);
  }
  ctx.lineTo(w, h); ctx.closePath();
}

function palm(ctx, x, baseY, height, lean, scale, color) {
  ctx.save(); ctx.fillStyle = color; ctx.strokeStyle = color;
  const topX = x + lean * height, topY = baseY - height;
  ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(x - 5 * scale, baseY);
  ctx.quadraticCurveTo(x + lean * height * 0.2, baseY - height * 0.55, topX - 1.5 * scale, topY);
  ctx.lineTo(topX + 1.5 * scale, topY);
  ctx.quadraticCurveTo(x + lean * height * 0.2 + 6 * scale, baseY - height * 0.55, x + 5 * scale, baseY);
  ctx.fill();
  const fronds = [-2.9, -2.4, -1.9, -1.2, -0.6, -0.15, 0.35];
  fronds.forEach((a, i) => {
    const len = (52 + (i % 3) * 10) * scale;
    const ex = topX + Math.cos(a) * len, ey = topY + Math.sin(a) * len * 0.55 + len * 0.45;
    const cx = topX + Math.cos(a) * len * 0.5, cy = topY - 18 * scale;
    ctx.beginPath(); ctx.moveTo(topX, topY);
    ctx.quadraticCurveTo(cx, cy, ex, ey);
    ctx.quadraticCurveTo(cx, cy + 9 * scale, topX, topY + 4 * scale);
    ctx.fill();
  });
  ctx.beginPath(); ctx.arc(topX, topY + 3 * scale, 4 * scale, 0, Math.PI * 2); ctx.fill();
  ctx.restore();
}

export default function OasisScene({ variant = 'hero', className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hero = variant === 'hero';
    let w = 0, h = 0, dpr = 1, stars = [], raf = 0, visible = true, last = 0;
    let land = null, sky = null, shooting = null, nextShoot = 0;
    let lake = { cx: 0, cy: 0, rx: 0, ry: 0 }, moon = { x: 0, y: 0, r: 0 };

    function build() {
      const rect = canvas.getBoundingClientRect();
      w = Math.max(1, rect.width); h = Math.max(1, rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, w < 700 ? 1.5 : 2);
      canvas.width = w * dpr; canvas.height = h * dpr;
      const mobile = w < 700;
      const horizon = hero ? h * (mobile ? 0.74 : 0.68) : h * 0.86;
      moon = { x: w * (mobile ? 0.8 : 0.8), y: h * (hero ? (mobile ? 0.1 : 0.18) : 0.14), r: Math.min(w, h) * (hero ? 0.055 : 0.03) + 8 };
      lake = { cx: w * 0.5, cy: horizon + (h - horizon) * 0.5, rx: w * (mobile ? 0.4 : 0.26), ry: (h - horizon) * 0.22 };

      const r = rng(7);
      const n = Math.round((w * h) / (mobile ? 2600 : 1900) * (hero ? 1 : 0.7));
      stars = Array.from({ length: n }, () => {
        const big = r() < 0.06;
        return { x: r() * w, y: r() * horizon * 0.98, s: big ? 1.1 + r() * 1.1 : 0.3 + r() * 0.8, tw: 0.6 + r() * 2.4, ph: r() * 6.28,
          c: r() < 0.15 ? '255,226,170' : r() < 0.3 ? '190,240,235' : '255,255,255', glint: big };
      });

      // static sky
      sky = document.createElement('canvas'); sky.width = canvas.width; sky.height = canvas.height;
      const s = sky.getContext('2d'); s.scale(dpr, dpr);
      const g = s.createLinearGradient(0, 0, 0, h);
      g.addColorStop(0, '#02040b'); g.addColorStop(0.45, '#071328'); g.addColorStop(hero ? 0.66 : 0.86, '#1b2440'); g.addColorStop(1, '#0a0d18');
      s.fillStyle = g; s.fillRect(0, 0, w, h);
      // milky band
      const mb = s.createLinearGradient(0, h * 0.05, w, h * 0.45);
      mb.addColorStop(0, 'rgba(120,160,220,0)'); mb.addColorStop(0.5, 'rgba(140,180,230,0.07)'); mb.addColorStop(1, 'rgba(120,160,220,0)');
      s.fillStyle = mb; s.fillRect(0, 0, w, horizon);
      // horizon glow
      const hg = s.createRadialGradient(w * 0.5, horizon, 0, w * 0.5, horizon, w * 0.6);
      hg.addColorStop(0, 'rgba(200,164,90,0.14)'); hg.addColorStop(1, 'rgba(200,164,90,0)');
      s.fillStyle = hg; s.fillRect(0, 0, w, h);

      // static land (dunes + palms), lake hole drawn later in frame
      land = document.createElement('canvas'); land.width = canvas.width; land.height = canvas.height;
      const l = land.getContext('2d'); l.scale(dpr, dpr);
      const layers = hero
        ? [[horizon + 4, h * 0.05, 11, 3.2, '#121a30'], [horizon + h * 0.05, h * 0.06, 23, 2.4, '#0d1324'], [horizon + h * 0.15, h * 0.05, 41, 1.7, '#080c18']]
        : [[horizon + 6, h * 0.035, 11, 3.2, 'rgba(18,26,48,0.9)'], [horizon + h * 0.06, h * 0.04, 23, 2.2, 'rgba(10,15,28,0.95)']];
      layers.forEach(([y, amp, seed, f, col], i) => {
        dunePath(l, w, h, y, amp, seed, f);
        const dg = l.createLinearGradient(0, y - amp, 0, h);
        dg.addColorStop(0, col); dg.addColorStop(1, '#04060c');
        l.fillStyle = dg; l.fill();
        // moonlit sand rim
        l.save(); l.clip(); l.strokeStyle = `rgba(245,214,150,${0.10 - i * 0.025})`; l.lineWidth = 1.2;
        dunePath(l, w, h, y, amp, seed, f); l.stroke(); l.restore();
      });
      if (hero) {
        const { cx, cy, rx, ry } = lake;
        // shore sand
        const sg = l.createRadialGradient(cx, cy, rx * 0.8, cx, cy, rx * 1.25); sg.addColorStop(0, 'rgba(60,52,40,0.45)'); sg.addColorStop(1, 'rgba(60,52,40,0)'); l.save(); l.scale(1, ry / rx); l.fillStyle = sg; l.beginPath(); l.arc(cx, cy * rx / ry, rx * 1.25, 0, Math.PI * 2); l.fill(); l.restore();
        const sc = mobile ? 0.5 : Math.min(1.1, w / 1300);
        const pc = '#03050a';
        palm(l, cx - rx * 0.95, cy - ry * 0.2, 170 * sc, -0.22, sc, pc);
        palm(l, cx - rx * 0.78, cy + ry * 0.1, 120 * sc, -0.08, sc * 0.8, pc);
        palm(l, cx + rx * 0.9, cy - ry * 0.25, 190 * sc, 0.2, sc * 1.05, pc);
        palm(l, cx + rx * 1.05, cy + ry * 0.05, 120 * sc, 0.32, sc * 0.75, pc);
        if (!mobile) { palm(l, w * 0.08, horizon + h * 0.09, 140 * sc, 0.12, sc * 0.8, '#070b15'); palm(l, w * 0.93, horizon + h * 0.07, 120 * sc, -0.15, sc * 0.7, '#070b15'); }
      }
    }

    function drawMoon(t) {
      const { x, y, r } = moon;
      const halo = ctx.createRadialGradient(x, y, r * 0.6, x, y, r * 6);
      halo.addColorStop(0, 'rgba(255,240,205,0.28)'); halo.addColorStop(1, 'rgba(255,240,205,0)');
      ctx.fillStyle = halo; ctx.fillRect(x - r * 6, y - r * 6, r * 12, r * 12);
      const mg = ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, r * 0.1, x, y, r);
      mg.addColorStop(0, '#fffaf0'); mg.addColorStop(1, '#f1dcae');
      ctx.fillStyle = mg; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = 'rgba(200,170,120,0.18)';
      [[-0.3, -0.1, 0.22], [0.25, 0.3, 0.15], [0.1, -0.4, 0.1]].forEach(([dx, dy, rr]) => { ctx.beginPath(); ctx.arc(x + dx * r, y + dy * r, rr * r, 0, Math.PI * 2); ctx.fill(); });
    }

    function drawStars(t) {
      for (const st of stars) {
        const a = reduce ? 0.75 : 0.45 + 0.55 * Math.sin(t * st.tw + st.ph) ** 2;
        ctx.fillStyle = `rgba(${st.c},${a})`;
        ctx.beginPath(); ctx.arc(st.x, st.y, st.s, 0, Math.PI * 2); ctx.fill();
        if (st.glint && a > 0.8) {
          const L = st.s * 6 * a;
          ctx.strokeStyle = `rgba(${st.c},${(a - 0.6)})`; ctx.lineWidth = 0.7;
          ctx.beginPath(); ctx.moveTo(st.x - L, st.y); ctx.lineTo(st.x + L, st.y); ctx.moveTo(st.x, st.y - L); ctx.lineTo(st.x, st.y + L); ctx.stroke();
        }
      }
    }

    function drawShooting(t) {
      if (reduce) return;
      if (!shooting && t > nextShoot) {
        shooting = { x: Math.random() * w * 0.7, y: Math.random() * h * 0.25, vx: 6 + Math.random() * 4, vy: 2 + Math.random() * 2, life: 0 };
        nextShoot = t + 5 + Math.random() * 9;
      }
      if (!shooting) return;
      const s = shooting; s.life += 1; s.x += s.vx; s.y += s.vy;
      const a = Math.max(0, 1 - s.life / 60);
      const g = ctx.createLinearGradient(s.x, s.y, s.x - s.vx * 14, s.y - s.vy * 14);
      g.addColorStop(0, `rgba(255,250,235,${a})`); g.addColorStop(1, 'rgba(255,250,235,0)');
      ctx.strokeStyle = g; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.lineTo(s.x - s.vx * 14, s.y - s.vy * 14); ctx.stroke();
      if (a <= 0) shooting = null;
    }

    function drawLake(t) {
      const { cx, cy, rx, ry } = lake;
      ctx.save();
      ctx.beginPath(); ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2); ctx.clip();
      const wg = ctx.createLinearGradient(0, cy - ry, 0, cy + ry);
      wg.addColorStop(0, '#0f2a3a'); wg.addColorStop(0.5, '#0a1d2c'); wg.addColorStop(1, '#06121c');
      ctx.fillStyle = wg; ctx.fillRect(cx - rx, cy - ry, rx * 2, ry * 2);
      // star reflections
      for (let i = 0; i < stars.length; i += 4) {
        const st = stars[i];
        if (st.x < cx - rx || st.x > cx + rx) continue;
        const ry2 = cy - ry + ((st.y / (h * 0.66)) * ry * 2);
        const wob = reduce ? 0 : Math.sin(t * 1.6 + st.y * 0.08) * 2;
        const a = (0.2 + 0.3 * Math.sin(t * st.tw + st.ph) ** 2);
        ctx.fillStyle = `rgba(${st.c},${a})`; ctx.fillRect(st.x + wob, ry2, st.s * 2.2, st.s * 0.7);
      }
      // moon reflection column of shimmering streaks
      const mx = cx + (moon.x - cx) * 0.25;
      for (let k = 0; k < 22; k++) {
        const yy = cy - ry * 0.85 + (k / 22) * ry * 1.8;
        const width = (10 + k * 2.2) * (0.6 + 0.4 * Math.sin(t * 2.2 + k * 1.3)) * (rx / 300);
        const a = 0.55 * (1 - k / 26) * (0.6 + 0.4 * Math.sin(t * 3 + k));
        const off = reduce ? 0 : Math.sin(t * 1.4 + k * 0.7) * 6;
        ctx.fillStyle = `rgba(255,236,190,${a})`;
        ctx.fillRect(mx - width / 2 + off, yy, width, 1.6);
      }
      // ripples
      ctx.strokeStyle = 'rgba(150,235,225,0.10)'; ctx.lineWidth = 1;
      for (let k = 0; k < 4; k++) {
        const p = ((reduce ? 0.3 : t * 0.12) + k / 4) % 1;
        ctx.globalAlpha = 1 - p;
        ctx.beginPath(); ctx.ellipse(cx - rx * 0.2, cy + ry * 0.1, rx * 0.15 + p * rx * 0.7, ry * 0.12 + p * ry * 0.7, 0, 0, Math.PI * 2); ctx.stroke();
      }
      ctx.globalAlpha = 1;
      // teal sheen at the far edge
      const sh = ctx.createLinearGradient(0, cy - ry, 0, cy - ry * 0.5);
      sh.addColorStop(0, 'rgba(200,164,90,0.22)'); sh.addColorStop(1, 'rgba(200,164,90,0)');
      ctx.fillStyle = sh; ctx.fillRect(cx - rx, cy - ry, rx * 2, ry * 0.5);
      ctx.restore();
      ctx.strokeStyle = 'rgba(245,214,150,0.18)'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.ellipse(cx, cy, rx, ry, 0, Math.PI * 1.05, Math.PI * 1.95); ctx.stroke();
    }

    function frame(ms) {
      const t = ms / 1000;
      if (!reduce && ms - last < 30) { raf = requestAnimationFrame(frame); return; } // ~33fps cap
      last = ms;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.drawImage(sky, 0, 0);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawStars(t); drawShooting(t); drawMoon(t);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.drawImage(land, 0, 0);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (hero) drawLake(t);
      if (!reduce && visible && !document.hidden) raf = requestAnimationFrame(frame);
    }
    const start = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(frame); };

    build(); start();
    const ro = new ResizeObserver(() => { build(); start(); }); ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) start(); }); io.observe(canvas);
    const vis = () => { if (!document.hidden) start(); }; document.addEventListener('visibilitychange', vis);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); document.removeEventListener('visibilitychange', vis); };
  }, [variant]);
  return <canvas ref={ref} aria-hidden="true" className={`absolute inset-0 w-full h-full ${className}`} />;
}

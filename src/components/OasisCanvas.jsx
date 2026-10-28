import { useEffect, useRef } from 'react';

/* Hand-built 2D canvas night oasis: aurora curtains, rotating stars, shooting stars,
   moon + beam, rippling reflective lake, swaying date palms, reeds, parallax dunes. */
const TAU = Math.PI * 2;
function mulberry(a) { return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
const n1 = (x, t) => Math.sin(x * 1.7 + t * 0.9) * 0.5 + Math.sin(x * 3.1 - t * 1.3 + 1.7) * 0.3 + Math.sin(x * 5.3 + t * 0.6 + 4.1) * 0.2;

function strip(c0, c1) { // vertical curtain sprite: bright hem at bottom fading up
  const c = document.createElement('canvas'); c.width = 1; c.height = 256; const g = c.getContext('2d');
  const gr = g.createLinearGradient(0, 0, 0, 256);
  gr.addColorStop(0, 'rgba(0,0,0,0)'); gr.addColorStop(0.45, c1 + '0.25)'); gr.addColorStop(0.86, c0 + '0.85)'); gr.addColorStop(0.93, c0 + '1)'); gr.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = gr; g.fillRect(0, 0, 1, 256); return c;
}

function makeMoon(r) {
  const c = document.createElement('canvas'); const s = Math.ceil(r * 2 + 4); c.width = c.height = s; const g = c.getContext('2d');
  const cx = s / 2, rnd = mulberry(11);
  let gr = g.createRadialGradient(cx - r * .3, cx - r * .3, r * .1, cx, cx, r);
  gr.addColorStop(0, '#fffaf0'); gr.addColorStop(.7, '#ece3cf'); gr.addColorStop(1, '#c9bda5');
  g.fillStyle = gr; g.beginPath(); g.arc(cx, cx, r, 0, TAU); g.fill();
  g.save(); g.clip();
  const maria = [[-.25, -.15, .38], [.2, -.3, .25], [.15, .2, .32], [-.3, .3, .2], [.35, .05, .15]];
  for (const [mx, my, mr] of maria) { const gg = g.createRadialGradient(cx + mx * r, cx + my * r, 0, cx + mx * r, cx + my * r, mr * r); gg.addColorStop(0, 'rgba(150,140,130,.45)'); gg.addColorStop(1, 'rgba(150,140,130,0)'); g.fillStyle = gg; g.fillRect(0, 0, s, s); }
  for (let i = 0; i < 26; i++) { const a = rnd() * TAU, d = Math.sqrt(rnd()) * r * .9, cr = r * (.02 + rnd() * .07); const x = cx + Math.cos(a) * d, y = cx + Math.sin(a) * d;
    g.strokeStyle = 'rgba(255,250,235,.35)'; g.lineWidth = 1; g.beginPath(); g.arc(x + .6, y + .6, cr, 0, TAU); g.stroke();
    g.fillStyle = 'rgba(120,112,105,.28)'; g.beginPath(); g.arc(x, y, cr, 0, TAU); g.fill(); }
  const sh = g.createRadialGradient(cx - r * .45, cx - r * .45, r * .2, cx, cx, r * 1.05); sh.addColorStop(.6, 'rgba(0,0,0,0)'); sh.addColorStop(1, 'rgba(40,30,60,.45)');
  g.fillStyle = sh; g.fillRect(0, 0, s, s); g.restore(); return c;
}

function palm(g, x, y, h, lean, t, seed, rim) {
  // trunk: cubic bezier with taper and ring segments
  const p0 = [x, y], p1 = [x + lean * h * .15, y - h * .4], p2 = [x + lean * h * .55, y - h * .75], p3 = [x + lean * h * .5 + Math.sin(t * .6 + seed) * h * .012, y - h];
  const B = (u, i) => (1 - u) ** 3 * p0[i] + 3 * (1 - u) ** 2 * u * p1[i] + 3 * (1 - u) * u * u * p2[i] + u ** 3 * p3[i];
  const N = 36, L = [], R = [];
  for (let k = 0; k <= N; k++) { const u = k / N, px = B(u, 0), py = B(u, 1); const dx = B(Math.min(1, u + .01), 0) - B(Math.max(0, u - .01), 0), dy = B(Math.min(1, u + .01), 1) - B(Math.max(0, u - .01), 1); const l = Math.hypot(dx, dy) || 1; const w = h * (.045 - .02 * u) * (1 + .25 * Math.max(0, .08 - u) * 12); L.push([px - dy / l * w, py + dx / l * w]); R.push([px + dy / l * w, py - dx / l * w]); }
  const fill = rim ? 'rgba(226,214,190,.3)' : '#07060c';
  g.fillStyle = fill; g.beginPath(); g.moveTo(L[0][0], L[0][1]); for (const q of L) g.lineTo(q[0], q[1]); for (let k = R.length - 1; k >= 0; k--) g.lineTo(R[k][0], R[k][1]); g.closePath(); g.fill();
  if (!rim) { g.strokeStyle = 'rgba(150,135,120,.28)'; g.lineWidth = 1; for (let k = 2; k < N; k += 1) { g.beginPath(); g.moveTo(L[k][0], L[k][1]); g.quadraticCurveTo((L[k][0] + R[k][0]) / 2, (L[k][1] + R[k][1]) / 2 + 2.2, R[k][0], R[k][1]); g.stroke(); } }
  if (rim) return;
  // crown fronds
  const cx = p3[0], cy = p3[1]; const rnd = mulberry(seed * 97 + 3);
  g.strokeStyle = fill; g.fillStyle = fill;
  const F = 15;
  for (let i = 0; i < F; i++) {
    const base = -Math.PI / 2 + (i / (F - 1) - .5) * Math.PI * 1.9 + (rnd() - .5) * .25;
    const len = h * (.42 + rnd() * .22) * (Math.abs(Math.cos(base)) * .35 + .7);
    const sway = Math.sin(t * .9 + seed + i * .7) * .06 + Math.sin(t * .37 + i) * .03;
    const a = base + sway, droop = .9 + rnd() * .6;
    // rachis as quadratic: goes out & up, then droops with gravity
    const ex = cx + Math.cos(a) * len, ey = cy + Math.sin(a) * len * .55 + len * droop * .55;
    const qx = cx + Math.cos(a) * len * .55, qy = cy + Math.sin(a) * len * .75 - len * .12;
    const Q = (u, a0, a1, a2) => (1 - u) * (1 - u) * a0 + 2 * (1 - u) * u * a1 + u * u * a2;
    g.lineWidth = Math.max(1, h * .012); g.beginPath(); g.moveTo(cx, cy); g.quadraticCurveTo(qx, qy, ex, ey); g.stroke();
    if (rim) continue;
    g.beginPath();
    const LF = 44;
    for (let k = 3; k < LF; k++) {
      const u = k / LF, px = Q(u, cx, qx, ex), py = Q(u, cy, qy, ey);
      const tx = Q(u + .01, cx, qx, ex) - px, ty = Q(u + .01, cy, qy, ey) - py, tl = Math.hypot(tx, ty) || 1;
      const nx = -ty / tl, ny = tx / tl; const ll = h * .1 * Math.sin(Math.PI * Math.min(1, u * 1.05)) ** .7 * (.85 + rnd() * .3) + h * .01;
      const fl = Math.sin(t * 2.2 + k * .5 + i) * .1;
      for (const sd of [1, -1]) { let dx = nx * sd + tx / tl * .7, dy = ny * sd + ty / tl * .7 + 1.1 + fl; const dl = Math.hypot(dx, dy); dx /= dl; dy /= dl;
        const tipx = px + dx * ll, tipy = py + dy * ll + ll * .15, w = Math.max(.7, ll * .07), mxp = px + dx * ll * .5, myp = py + dy * ll * .45;
        g.moveTo(px - dy * w * .4, py + dx * w * .4); g.quadraticCurveTo(mxp - dy * w, myp + dx * w, tipx, tipy); g.quadraticCurveTo(mxp + dy * w, myp - dx * w, px + dy * w * .4, py - dx * w * .4); }
    }
    g.fill();
  }
  if (!rim) { g.fillStyle = '#07060c'; for (let k = 0; k < 6; k++) { g.beginPath(); g.arc(cx + (rnd() - .5) * h * .06, cy + h * .03 + rnd() * h * .03, h * .012, 0, TAU); g.fill(); } }
}

export default function OasisCanvas({ variant = 'hero' }) {
  const ref = useRef(null);
  useEffect(() => {
    const cv = ref.current, g = cv.getContext('2d');
    const hero = variant === 'hero';
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let W, H, dpr, mob, stars, moonImg, sky, sg, au, ag, sprites, raf, vis = true, mx = 0, my = 0, tmx = 0, tmy = 0, shoots = [], nextShoot = 1.5;
    const resize = () => {
      const r = cv.getBoundingClientRect(); W = r.width; H = r.height; mob = W < 768;
      dpr = Math.min(window.devicePixelRatio || 1, mob ? 1.5 : 2);
      cv.width = W * dpr; cv.height = H * dpr;
      sky = document.createElement('canvas'); sky.width = cv.width; sky.height = cv.height; sg = sky.getContext('2d');
      au = document.createElement('canvas'); au.width = Math.ceil(W / 2); au.height = Math.ceil(H / 2); ag = au.getContext('2d');
      const rnd = mulberry(5); const n = hero ? (mob ? 260 : 650) : (mob ? 140 : 300);
      const D = Math.hypot(W, H) * 1.2;
      stars = Array.from({ length: n }, () => { const big = rnd() < .06; return { r: Math.sqrt(rnd()) * D, a: rnd() * TAU, s: big ? 1.4 + rnd() * 1.2 : .4 + rnd() * .9, b: big ? .9 : .35 + rnd() * .55, f: .8 + rnd() * 3.5, p: rnd() * TAU, c: rnd() < .15 ? '220,210,255' : rnd() < .1 ? '255,240,215' : '245,245,255' }; });
      moonImg = makeMoon(mob ? 26 : 38);
      sprites = [strip('rgba(225,222,240,', 'rgba(170,150,230,'), strip('rgba(190,165,245,', 'rgba(140,110,210,'), strip('rgba(185,225,225,', 'rgba(150,140,220,')];
    };
    const geo = () => mob ? { hz: H - 230, mX: W * .78, mY: 150, lx0: -W * .1, lx1: W * 1.1, ly0: H - 170, ly1: H - 40 } : { hz: H * .66, mX: W * .72, mY: H * .2, lx0: W * .3, lx1: W * 1.02, ly0: H * .705, ly1: H * .9 };
    const drawSky = (t) => {
      const { mX, mY } = geo(), c = sg; c.setTransform(dpr, 0, 0, dpr, 0, 0);
      const gr = c.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, '#07061a'); gr.addColorStop(.45, '#17123a'); gr.addColorStop(.7, '#2f2650'); gr.addColorStop(1, '#4a3e5a');
      c.globalCompositeOperation = 'source-over'; c.fillStyle = gr; c.fillRect(0, 0, W, H);
      // stars rotating around a pole far up-left
      const rot = t * .006, px = W * .1, py = -H * .3;
      for (const s of stars) { const a = s.a + rot, x = px + Math.cos(a) * s.r, y = py + Math.sin(a) * s.r; if (x < -4 || x > W + 4 || y < -4 || y > H * .8) continue;
        const tw = reduce ? 1 : .55 + .45 * Math.sin(t * s.f + s.p); const al = s.b * tw; c.fillStyle = `rgba(${s.c},${al})`;
        c.beginPath(); c.arc(x, y, s.s * (.8 + .2 * tw), 0, TAU); c.fill();
        if (s.s > 1.4) { c.fillStyle = `rgba(${s.c},${al * .15})`; c.beginPath(); c.arc(x, y, s.s * 4, 0, TAU); c.fill(); } }
      // aurora curtains at half res, then composited (natural softening)
      ag.setTransform(1, 0, 0, 1, 0, 0); ag.clearRect(0, 0, au.width, au.height); ag.globalCompositeOperation = 'lighter';
      const AW = au.width, AH = au.height, step = mob ? 3 : 2, k = hero ? 1 : .55;
      const bands = [{ y: .30, h: .26, sp: 0, amp: .07, sh: .0 }, { y: .22, h: .2, sp: 1, amp: .06, sh: 2.3 }, { y: .4, h: .18, sp: 2, amp: .05, sh: 4.7 }];
      for (const bd of bands) for (let x = 0; x < AW; x += step) {
        const u = x / AW, base = AH * (bd.y + n1(u * 2.2 + bd.sh, t * .35) * bd.amp + Math.sin(u * 6 + t * .5 + bd.sh) * .025);
        let I = .5 + .5 * n1(u * 3.5 + bd.sh * 2, t * .5); I = I * I * (.55 + .45 * Math.sin(u * 140 + t * 1.4 + bd.sh) ** 2) * (.6 + .4 * Math.sin(u * 37 - t * .8));
        I *= Math.min(1, u * 4) * Math.min(1, (1 - u) * 3 + .4);
        const hh = AH * bd.h * (.7 + .6 * (.5 + .5 * n1(u * 5 + bd.sh, t * .4)));
        ag.globalAlpha = Math.min(1, I * 1.05 * k); ag.drawImage(sprites[bd.sp], x, base - hh, step + .6, hh);
      }
      c.globalCompositeOperation = 'lighter'; c.filter = mob ? 'none' : 'blur(1.2px)'; c.globalAlpha = .95; c.drawImage(au, 0, 0, W, H); c.filter = 'none'; c.globalAlpha = .35; c.filter = 'blur(14px)'; if (!mob) c.drawImage(au, 0, 0, W, H); c.filter = 'none'; c.globalAlpha = 1;
      // moon halo, moon, beam
      let hg = c.createRadialGradient(mX, mY, 0, mX, mY, mob ? 160 : 260); hg.addColorStop(0, 'rgba(240,232,214,.35)'); hg.addColorStop(.2, 'rgba(220,210,235,.12)'); hg.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = hg; c.fillRect(0, 0, W, H);
      c.globalCompositeOperation = 'source-over'; c.drawImage(moonImg, mX - moonImg.width / 2, mY - moonImg.height / 2);
      c.globalCompositeOperation = 'lighter';
      const bm = c.createRadialGradient(mX, mY, 0, mX, mY, W * .6); bm.addColorStop(0, 'rgba(236,228,210,.10)'); bm.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = bm; c.globalAlpha = .8 + .2 * Math.sin(t * .4); c.fillRect(0, 0, W, H); c.globalAlpha = 1;
      // shooting stars
      if (!reduce && t > nextShoot) { const r = Math.random(); shoots.push({ x: W * (.15 + r * .6), y: H * (.05 + Math.random() * .25), a: .35 + Math.random() * .35, t0: t, L: 160 + Math.random() * 140 }); nextShoot = t + 4 + Math.random() * 4; }
      shoots = shoots.filter(s => t - s.t0 < 1.1);
      for (const s of shoots) { const p = (t - s.t0) / 1.1, d = p * W * .45, hx = s.x + Math.cos(s.a) * d, hy = s.y + Math.sin(s.a) * d, fade = Math.sin(p * Math.PI);
        const sgr = c.createLinearGradient(hx, hy, hx - Math.cos(s.a) * s.L, hy - Math.sin(s.a) * s.L); sgr.addColorStop(0, `rgba(255,255,255,${fade})`); sgr.addColorStop(1, 'rgba(200,190,255,0)');
        c.strokeStyle = sgr; c.lineWidth = 1.6; c.beginPath(); c.moveTo(hx, hy); c.lineTo(hx - Math.cos(s.a) * s.L, hy - Math.sin(s.a) * s.L); c.stroke(); }
      c.globalCompositeOperation = 'source-over';
    };
    const dune = (y0, amp, f, ph, off, c0, c1, rim) => {
      g.beginPath(); g.moveTo(-50, H); const pts = [];
      for (let x = -50; x <= W + 50; x += 8) { const u = (x + off) / W; const y = y0 + Math.sin(u * f + ph) * amp + Math.sin(u * f * 2.3 + ph * 1.7) * amp * .35; pts.push([x, y]); g.lineTo(x, y); }
      g.lineTo(W + 50, H); g.closePath(); const gr = g.createLinearGradient(0, y0 - amp, 0, H); gr.addColorStop(0, c0); gr.addColorStop(1, c1); g.fillStyle = gr; g.fill();
      if (rim) { g.strokeStyle = rim; g.lineWidth = 1.4; g.beginPath(); pts.forEach(([x, y], i) => i ? g.lineTo(x, y) : g.moveTo(x, y)); g.stroke(); }
    };
    const frame = (ms) => {
      const t = reduce ? 12 : ms / 1000;
      mx += (tmx - mx) * .05; my += (tmy - my) * .05;
      drawSky(t);
      g.setTransform(1, 0, 0, 1, 0, 0); g.drawImage(sky, 0, 0); g.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!hero) { raf = reduce ? 0 : requestAnimationFrame(frame); return; }
      const { hz, mX, lx0, lx1, ly0, ly1 } = geo(), sc = window.scrollY * .15;
      dune(hz - 10, H * .03, 5, 1, mx * 12, '#3d3352', '#1d182c', 'rgba(220,206,186,.35)');
      dune(hz + 18 + sc * .2, H * .04, 3.4, 2.6, mx * 22, '#9a8a78', '#2a2232', 'rgba(240,226,198,.75)');
      // lake: reflected sky with ripples
      g.save(); g.beginPath(); g.ellipse((lx0 + lx1) / 2, (ly0 + ly1) / 2 + (ly1 - ly0) * .1, (lx1 - lx0) / 2, (ly1 - ly0) * .62, 0, Math.PI, 0, false); g.lineTo(lx1, ly1 + 40); g.lineTo(lx0, ly1 + 40); g.closePath();
      g.beginPath(); g.ellipse((lx0 + lx1) / 2, (ly0 + ly1) / 2, (lx1 - lx0) / 2, (ly1 - ly0) / 2, 0, 0, TAU); g.clip();
      g.fillStyle = '#120f22'; g.fillRect(lx0, ly0, lx1 - lx0, ly1 - ly0);
      const rows = Math.ceil(ly1 - ly0); g.setTransform(1, 0, 0, 1, 0, 0);
      for (let j = 0; j < rows; j += 1) { const d = j / rows; const y = ly0 + j; const sy = Math.max(0, ly0 - H * .1 - j * 3.2);
        const off = (Math.sin(j * .55 - t * 2.4) * 3 + Math.sin(j * .19 + t * 1.3) * 4) * (.4 + d * 1.4);
        g.globalAlpha = .78 - d * .35; g.drawImage(sky, 0, sy * dpr, sky.width, dpr, (off - 14) * dpr, y * dpr, sky.width + 28 * dpr, dpr * 1.6); }
      g.globalAlpha = 1; g.setTransform(dpr, 0, 0, dpr, 0, 0);
      g.fillStyle = 'rgba(14,10,30,.12)'; g.fillRect(lx0, ly0, lx1 - lx0, ly1 - ly0);
      // moon path: shimmering vertical glitter
      g.globalCompositeOperation = 'lighter';
      for (let j = 0; j < rows; j += 2) { const d = j / rows, y = ly0 + j; const w = (8 + d * 70) * (.4 + .6 * Math.abs(Math.sin(j * .9 + t * 3.1) * Math.sin(j * .23 - t * 1.7)));
        const xo = mX + Math.sin(j * .4 + t * 2) * (2 + d * 8) - (mX - W * .55) * d * .0; g.fillStyle = `rgba(245,236,214,${.55 * (1 - d * .5) * (.4 + .6 * Math.abs(Math.sin(j * 1.3 + t * 4)))})`; g.fillRect(xo - w / 2, y, w, 1.3); }
      // wave lines
      g.strokeStyle = 'rgba(210,200,235,.16)'; g.lineWidth = 1;
      for (let k = 0; k < 9; k++) { const y = ly0 + (ly1 - ly0) * ((k + .5) / 9) ** 1.4; const ph = t * .6 + k * 1.7; const x0 = lx0 + ((Math.sin(ph) * .5 + .5) * (lx1 - lx0) * .7); g.beginPath(); g.moveTo(x0, y); g.quadraticCurveTo(x0 + 30, y - 1.2, x0 + 60 + k * 8, y); g.stroke(); }
      g.globalCompositeOperation = 'source-over'; g.restore();
      // palms + reeds at lake edges
      const ph = mob ? 150 : H * .34, px = mob ? W * .9 : W * .86 + mx * 30;
      const P = mob ? [[px, ly0 + 12, ph, -.25, 1], [px + ph * .22, ly0 + 18, ph * .78, .18, 2], [px - ph * .55, ly0 + 22, ph * .55, -.35, 3]]
        : [[px, ly0 + 14, ph, -.22, 1], [px + ph * .2, ly0 + 22, ph * .82, .2, 2], [px - ph * .3, ly0 + 24, ph * .62, -.4, 3]];
      for (const [x, y, h, l, s] of P) { g.save(); g.translate(1.6, -1.2); palm(g, x + 0, y, h, l, reduce ? 0 : t, s, true); g.restore(); palm(g, x, y, h, l, reduce ? 0 : t, s, false); }
      g.strokeStyle = '#08070e'; g.lineCap = 'round';
      for (let i = 0; i < (mob ? 40 : 90); i++) { const r = mulberry(i + 40)(); const bx = (i % 2 ? W * .58 : W * .97) + (r - .5) * (mob ? 120 : 260) + mx * 30, by = ly0 + 18 + r * 26, hh = 16 + r * 34;
        const sw = Math.sin(t * 1.4 + i) * 4; g.lineWidth = .8 + r * 1.6; g.beginPath(); g.moveTo(bx, by); g.quadraticCurveTo(bx + sw * .3, by - hh * .6, bx + sw + (r - .5) * 10, by - hh); g.stroke(); }
      dune(ly1 - 6 + sc * .4, H * .025, 2.2, .4, mx * 40, '#8a7a6c', '#120e18', 'rgba(236,222,196,.55)');
      dune(H * .97, H * .02, 1.6, 3.3, mx * 60, '#1a1522', '#07060c', 'rgba(200,186,170,.25)');
      raf = reduce ? 0 : requestAnimationFrame(frame);
    };
    resize();
    const onR = () => { resize(); if (reduce) frame(0); };
    const onM = (e) => { tmx = e.clientX / W - .5; tmy = e.clientY / H - .5; };
    window.addEventListener('resize', onR); if (hero) window.addEventListener('mousemove', onM);
    const io = new IntersectionObserver(([e]) => { vis = e.isIntersecting; cancelAnimationFrame(raf); if (vis) raf = requestAnimationFrame(frame); });
    io.observe(cv); raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); io.disconnect(); window.removeEventListener('resize', onR); window.removeEventListener('mousemove', onM); };
  }, [variant]);
  return <canvas ref={ref} className={`oasis-canvas oc-${variant}`} aria-hidden="true" />;
}

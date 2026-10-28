import { useEffect, useRef } from 'react';

/* Photographic oasis (generated plate, sky masked out) with a live astrophotography sky:
   Milky Way, scintillating stars with glow + diffraction spikes, soft volumetric aurora,
   rippling sky reflection in the lake. */
const TAU = Math.PI * 2;
const BASE = import.meta.env.BASE_URL + 'oasis/';
function rng(a) { return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
const gauss = (r) => { let s = 0; for (let i = 0; i < 4; i++) s += r(); return (s - 2) / 1.15; };
const load = (src) => new Promise((ok) => { const i = new Image(); i.onload = () => ok(i); i.onerror = () => ok(null); i.src = src; });
const mk = (w, h) => { const c = document.createElement('canvas'); c.width = Math.max(1, Math.round(w)); c.height = Math.max(1, Math.round(h)); return c; };

function glowSprite(rgb) {
  const c = mk(64, 64), g = c.getContext('2d'), gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  gr.addColorStop(0, `rgba(255,255,255,1)`); gr.addColorStop(.08, `rgba(${rgb},.95)`); gr.addColorStop(.22, `rgba(${rgb},.32)`); gr.addColorStop(.5, `rgba(${rgb},.08)`); gr.addColorStop(1, `rgba(${rgb},0)`);
  g.fillStyle = gr; g.fillRect(0, 0, 64, 64); return c;
}
function spikeSprite(rgb) {
  const c = mk(128, 128), g = c.getContext('2d');
  for (const [dx, dy] of [[1, 0], [0, 1]]) { const gr = g.createLinearGradient(64 - dx * 64, 64 - dy * 64, 64 + dx * 64, 64 + dy * 64);
    gr.addColorStop(0, `rgba(${rgb},0)`); gr.addColorStop(.5, `rgba(255,255,255,.9)`); gr.addColorStop(1, `rgba(${rgb},0)`);
    g.fillStyle = gr; if (dx) g.fillRect(0, 63.3, 128, 1.4); else g.fillRect(63.3, 0, 1.4, 128); }
  return c;
}

function milkyWay(W, H, mob) { // static plate: dense star field + nebulous glow + dust lane along a diagonal band
  const c = mk(W, H), g = c.getContext('2d'), r = rng(42);
  const ax = W * (mob ? -.2 : .05), ay = H * (mob ? .15 : .95), bx = W * (mob ? 1.2 : .85), by = H * (mob ? .55 : -.15);
  const L = Math.hypot(bx - ax, by - ay), ux = (bx - ax) / L, uy = (by - ay) / L, nx = -uy, ny = ux, bw = Math.min(W, H) * (mob ? .2 : .16);
  const lo = mk(W / 6, H / 6), lg = lo.getContext('2d');
  for (let i = 0; i < 900; i++) { const s = r() * L, o = gauss(r) * bw * .55, x = (ax + ux * s + nx * o) / 6, y = (ay + uy * s + ny * o) / 6, rad = (6 + r() * 22) / 6 * (W / 1440 + .5);
    const warm = r() < .35; const gr = lg.createRadialGradient(x, y, 0, x, y, rad * 3); gr.addColorStop(0, warm ? 'rgba(235,215,200,.07)' : 'rgba(190,200,240,.07)'); gr.addColorStop(1, 'rgba(0,0,0,0)'); lg.fillStyle = gr; lg.fillRect(x - rad * 3, y - rad * 3, rad * 6, rad * 6); }
  // dust lane
  lg.globalCompositeOperation = 'destination-out';
  for (let i = 0; i < 260; i++) { const s = r() * L, o = (gauss(r) * .18 + Math.sin(s / L * 9) * .12) * bw, x = (ax + ux * s + nx * o) / 6, y = (ay + uy * s + ny * o) / 6, rad = (4 + r() * 10) / 6 * (W / 1440 + .5);
    const gr = lg.createRadialGradient(x, y, 0, x, y, rad * 2.5); gr.addColorStop(0, 'rgba(0,0,0,.35)'); gr.addColorStop(1, 'rgba(0,0,0,0)'); lg.fillStyle = gr; lg.fillRect(x - rad * 3, y - rad * 3, rad * 6, rad * 6); }
  g.filter = 'blur(6px)'; g.drawImage(lo, 0, 0, W, H); g.filter = 'none';
  const n = mob ? 4500 : 11000;
  for (let i = 0; i < n; i++) { const s = r() * L, o = gauss(r) * bw * (r() < .3 ? 1.6 : .7), x = ax + ux * s + nx * o, y = ay + uy * s + ny * o; const b = Math.pow(r(), 3);
    g.fillStyle = `rgba(${r() < .3 ? '255,236,220' : '225,232,255'},${.15 + b * .7})`; g.fillRect(x, y, .6 + b * .9, .6 + b * .9); }
  for (let i = 0; i < (mob ? 900 : 2200); i++) { const x = r() * W, y = r() * H, b = Math.pow(r(), 4); g.fillStyle = `rgba(230,235,255,${.12 + b * .6})`; g.fillRect(x, y, .7 + b, .7 + b); }
  return c;
}

export default function PhotoSky({ variant = 'hero' }) {
  const ref = useRef(null);
  useEffect(() => {
    const cv = ref.current, g = cv.getContext('2d'), hero = variant === 'hero';
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let W, H, dpr, mob, mw, stars, au, ag, refl, rg, land, lake, imgs = {}, raf, alive = true, place, shoots = [], next = 2;
    const sprites = { w: glowSprite('215,225,255'), y: glowSprite('255,225,190'), b: glowSprite('180,200,255'), s: spikeSprite('210,220,255') };
    const fit = (img) => { // cover-fit, anchored bottom; desktop x-anchor .7 keeps palms, mobile anchor right
      const s = Math.max(W / img.width, H / img.height); const w = img.width * s, h = img.height * s;
      return { x: (W - w) * (mob ? .85 : .7), y: H - h + (mob ? h * .03 : 0), w, h, s };
    };
    const build = () => {
      const r = cv.getBoundingClientRect(); W = r.width; H = r.height; mob = W < 768;
      dpr = Math.min(window.devicePixelRatio || 1, mob ? 1.75 : 2); cv.width = W * dpr; cv.height = H * dpr;
      mw = milkyWay(W, H, mob);
      const rnd = rng(9), n = mob ? 70 : 140;
      stars = Array.from({ length: n }, (_, i) => { const m = Math.pow(rnd(), 2.2); return { x: rnd() * W, y: rnd() * H * (hero ? .75 : 1), m, sz: 7 + m * 30, spike: m > .72, k: rnd() < .2 ? 'y' : rnd() < .3 ? 'b' : 'w', f1: 3 + rnd() * 7, f2: 7 + rnd() * 13, p: rnd() * TAU }; });
      au = mk(W / 8, H / 8); ag = au.getContext('2d');
      refl = mk(W, H); rg = refl.getContext('2d');
      const L = imgs[mob ? 'landm' : 'land'], M = imgs[mob ? 'landmLake' : 'landLake'];
      if (hero && L) { place = fit(L); land = L; lake = M; } else land = null;
    };
    const sky = (c, t, a = 1) => {
      const gr = c.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, '#03040f'); gr.addColorStop(.55, '#0a1030'); gr.addColorStop(1, '#16204a');
      c.fillStyle = gr; c.fillRect(0, 0, W, H);
      c.globalCompositeOperation = 'lighter'; c.globalAlpha = a; c.drawImage(mw, 0, 0, W, H);
      // soft volumetric aurora: low-res curtains, heavily blurred, slow
      const AW = au.width, AH = au.height; ag.clearRect(0, 0, AW, AH); ag.globalCompositeOperation = 'lighter';
      for (let L = 0; L < 3; L++) for (let x = 0; x < AW; x++) { const u = x / AW;
        const base = AH * (.36 + L * .07 + .07 * Math.sin(u * 4.2 + t * .09 + L * 2) + .035 * Math.sin(u * 9.5 - t * .14 + L));
        let I = .5 + .5 * Math.sin(u * 6.3 + t * .12 + L * 1.7); I *= .6 + .4 * Math.sin(u * 23 + t * .25 + L * 3); I *= Math.sin(Math.PI * u) * (L === 0 ? 1 : .7);
        const h = AH * (.22 + .1 * Math.sin(u * 5 + t * .1 + L));
        const gr2 = ag.createLinearGradient(0, base - h, 0, base + 2);
        const col = L === 1 ? '170,150,225' : L === 2 ? '150,205,200' : '205,200,230';
        gr2.addColorStop(0, `rgba(${col},0)`); gr2.addColorStop(.75, `rgba(${col},${.26 * I})`); gr2.addColorStop(.95, `rgba(${col},${.45 * I})`); gr2.addColorStop(1, `rgba(${col},0)`);
        ag.fillStyle = gr2; ag.fillRect(x, base - h, 1, h + 2); }
      c.filter = `blur(${mob ? 10 : 18}px)`; c.globalAlpha = (hero ? .9 : .7) * a; c.drawImage(au, 0, 0, W, H); c.filter = 'none';
      // stars: glow core, scintillation, spikes on brightest
      for (const s of stars) { const sc = reduce ? .8 : .55 + .3 * Math.sin(t * s.f1 + s.p) + .15 * Math.sin(t * s.f2 + s.p * 2.3) ** 3;
        const k = Math.max(.15, sc), sz = s.sz * (.75 + .35 * k); c.globalAlpha = Math.min(1, (.35 + s.m * .9) * k) * a;
        c.drawImage(sprites[s.k], s.x - sz / 2, s.y - sz / 2, sz, sz);
        if (s.spike) { const sl = sz * 2.4 * (.7 + .3 * k); c.globalAlpha = .55 * k * a; c.drawImage(sprites.s, s.x - sl / 2, s.y - sl / 2, sl, sl); } }
      c.globalAlpha = a;
      if (!reduce && hero && t > next) { shoots.push({ x: W * (.15 + Math.random() * .6), y: H * (.05 + Math.random() * .25), an: .3 + Math.random() * .4, t0: t, L: 120 + Math.random() * 120 }); next = t + 5 + Math.random() * 5; }
      shoots = shoots.filter(s => t - s.t0 < .9);
      for (const s of shoots) { const p = (t - s.t0) / .9, d = p * W * .35, hx = s.x + Math.cos(s.an) * d, hy = s.y + Math.sin(s.an) * d, f = Math.sin(p * Math.PI);
        const gr3 = c.createLinearGradient(hx, hy, hx - Math.cos(s.an) * s.L, hy - Math.sin(s.an) * s.L); gr3.addColorStop(0, `rgba(255,255,255,${f})`); gr3.addColorStop(1, 'rgba(200,210,255,0)');
        c.strokeStyle = gr3; c.lineWidth = 1.3; c.beginPath(); c.moveTo(hx, hy); c.lineTo(hx - Math.cos(s.an) * s.L, hy - Math.sin(s.an) * s.L); c.stroke(); }
      c.globalCompositeOperation = 'source-over'; c.globalAlpha = 1;
    };
    const frame = (ms) => {
      if (!alive) return; const t = reduce ? 20 : ms / 1000;
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      sky(g, t, hero ? 1 : .9);
      if (land) {
        const P = place;
        g.drawImage(land, P.x, P.y, P.w, P.h);
        if (lake) { // reflect sky into the lake with ripple displacement, masked to water
          rg.setTransform(1, 0, 0, 1, 0, 0); rg.globalCompositeOperation = 'source-over'; rg.clearRect(0, 0, W, H);
          const top = P.y + P.h * (mob ? .81 : .74), bot = P.y + P.h * (mob ? .87 : .96);
          for (let y = Math.floor(top); y < bot; y += 2) { const d = (y - top) / (bot - top), sy = top - (y - top) * 2.2 - H * .02;
            const off = reduce ? 0 : Math.sin(y * .45 - t * 1.6) * (1 + d * 4) + Math.sin(y * .13 + t * .7) * 2;
            if (sy > 0) rg.drawImage(cv, 0, sy * dpr, cv.width, 2 * dpr, off - 6, y, W + 12, 2.4); }
          rg.globalCompositeOperation = 'destination-in'; rg.drawImage(lake, P.x, P.y, P.w, P.h);
          g.globalCompositeOperation = 'screen'; g.globalAlpha = .55; g.drawImage(refl, 0, 0, W, H);
          // faint shimmer lines on the water
          g.globalCompositeOperation = 'lighter'; g.globalAlpha = 1; rg.globalCompositeOperation = 'source-over'; rg.clearRect(0, 0, W, H);
          for (let k = 0; k < 26; k++) { const yy = top + (bot - top) * ((k + .5) / 26), x0 = P.x + P.w * (.35 + .45 * (.5 + .5 * Math.sin(k * 2.1 + t * .35))), al = .05 + .05 * Math.sin(t * 1.3 + k);
            rg.fillStyle = `rgba(200,210,240,${al})`; rg.fillRect(x0, yy, 30 + 50 * (.5 + .5 * Math.sin(k)), .8); }
          rg.globalCompositeOperation = 'destination-in'; rg.drawImage(lake, P.x, P.y, P.w, P.h); g.drawImage(refl, 0, 0, W, H);
          g.globalCompositeOperation = 'source-over'; g.globalAlpha = 1;
        }
      }
      raf = reduce ? 0 : requestAnimationFrame(frame);
    };
    let io;
    (async () => {
      if (hero) { const [a, b, c2, d] = await Promise.all(['land.webp', 'landm.webp', 'land-lake.png', 'landm-lake.png'].map(f => load(BASE + f))); imgs = { land: a, landm: b, landLake: c2, landmLake: d }; }
      if (!alive) return; build(); raf = requestAnimationFrame(frame);
      io = new IntersectionObserver(([e]) => { cancelAnimationFrame(raf); if (e.isIntersecting && !reduce) raf = requestAnimationFrame(frame); }); io.observe(cv);
    })();
    const onR = () => { build(); if (reduce) frame(0); }; window.addEventListener('resize', onR);
    return () => { alive = false; cancelAnimationFrame(raf); io && io.disconnect(); window.removeEventListener('resize', onR); };
  }, [variant]);
  return <canvas ref={ref} className={`oasis-canvas oc-${variant}`} aria-hidden="true" />;
}

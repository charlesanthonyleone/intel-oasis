import { useEffect, useRef } from 'react';

/* Lightweight canvas: drifting stars + rising light motes + a slow water-light shimmer band.
   Static single frame when the user prefers reduced motion; pauses when off-screen or tab hidden. */
export default function Starfield({ className = '', density = 1, warm = false }) {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2), raf = 0, visible = true, t = 0;
    let stars = [], motes = [];
    const palette = warm ? ['255,200,140', '255,120,90', '255,235,200'] : ['153,246,228', '245,198,107', '186,230,253', '255,255,255'];
    function init() {
      const r = canvas.getBoundingClientRect(); w = r.width; h = r.height;
      canvas.width = w * dpr; canvas.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round((w * h) / 5200 * density);
      stars = Array.from({ length: n }, () => ({ x: Math.random() * w, y: Math.random() * h, r: Math.random() * 1.2 + 0.2, a: Math.random() * 0.7 + 0.2, p: Math.random() * Math.PI * 2, s: Math.random() * 0.02 + 0.004 }));
      motes = Array.from({ length: Math.round(n / 7) }, () => ({ x: Math.random() * w, y: Math.random() * h, r: Math.random() * 2.2 + 0.6, vy: Math.random() * 0.25 + 0.05, vx: (Math.random() - 0.5) * 0.12, c: palette[(Math.random() * palette.length) | 0], a: Math.random() * 0.5 + 0.2 }));
    }
    function draw() {
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        const tw = reduce ? s.a : s.a * (0.55 + 0.45 * Math.sin(s.p + t * s.s * 60));
        ctx.fillStyle = `rgba(255,255,255,${tw})`; ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, 6.283); ctx.fill();
      }
      // water-light shimmer band near the horizon
      const by = h * 0.82;
      for (let i = 0; i < 3; i++) {
        const g = ctx.createLinearGradient(0, by - 40, 0, by + 60);
        g.addColorStop(0, 'rgba(45,212,191,0)'); g.addColorStop(0.5, `rgba(45,212,191,${0.05 + 0.03 * Math.sin(t * 0.6 + i)})`); g.addColorStop(1, 'rgba(45,212,191,0)');
        ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(0, by + 60);
        for (let x = 0; x <= w; x += 24) ctx.lineTo(x, by + Math.sin(x * 0.008 + t * (0.5 + i * 0.2) + i * 2) * (10 + i * 6));
        ctx.lineTo(w, by + 60); ctx.closePath(); ctx.fill();
      }
      for (const m of motes) {
        if (!reduce) { m.y -= m.vy; m.x += m.vx; if (m.y < -10) { m.y = h + 10; m.x = Math.random() * w; } }
        const g = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, m.r * 4);
        g.addColorStop(0, `rgba(${m.c},${m.a})`); g.addColorStop(1, `rgba(${m.c},0)`);
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(m.x, m.y, m.r * 4, 0, 6.283); ctx.fill();
      }
    }
    function loop() { t += 1 / 60; draw(); if (visible && !document.hidden) raf = requestAnimationFrame(loop); }
    init(); draw();
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; cancelAnimationFrame(raf); if (visible && !reduce) raf = requestAnimationFrame(loop); });
    io.observe(canvas);
    const onVis = () => { cancelAnimationFrame(raf); if (!document.hidden && visible && !reduce) raf = requestAnimationFrame(loop); };
    document.addEventListener('visibilitychange', onVis);
    const onResize = () => { init(); draw(); };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(raf); io.disconnect(); window.removeEventListener('resize', onResize); document.removeEventListener('visibilitychange', onVis); };
  }, [density, warm]);
  return <canvas ref={ref} aria-hidden="true" className={`absolute inset-0 w-full h-full pointer-events-none ${className}`} />;
}

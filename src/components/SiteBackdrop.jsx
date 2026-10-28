import { useMemo } from 'react';
function rng(seed) { let s = seed; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); }
/* Fixed, lightweight site-wide sky: CSS star layers + SVG dune horizon. */
export default function SiteBackdrop() {
  const layers = useMemo(() => {
    const r = rng(3);
    const mk = (n, size, col) => Array.from({ length: n }, () => `${Math.round(r() * 2000)}px ${Math.round(r() * 1400)}px 0 ${size} ${col}`).join(',');
    return [mk(160, '0px', 'rgba(255,255,255,0.7)'), mk(60, '0.5px', 'rgba(255,236,190,0.85)'), mk(25, '1px', 'rgba(190,245,238,0.9)')];
  }, []);
  return (
    <div className="site-backdrop" aria-hidden="true">
      <div className="sky" />
      {layers.map((sh, i) => <div key={i} className={`stars stars-${i}`} style={{ boxShadow: sh }} />)}
      <div className="moon-glow" />
      <svg className="dunes" viewBox="0 0 1440 220" preserveAspectRatio="none">
        <defs>
          <linearGradient id="dg1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#141c33" /><stop offset="1" stopColor="#050a14" /></linearGradient>
          <linearGradient id="dg2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0c1326" /><stop offset="1" stopColor="#050a14" /></linearGradient>
        </defs>
        <path d="M0 120 C 180 70, 360 70, 520 105 S 860 150, 1040 95 S 1320 60, 1440 100 L1440 220 L0 220Z" fill="url(#dg1)" />
        <path d="M0 120 C 180 70, 360 70, 520 105 S 860 150, 1040 95 S 1320 60, 1440 100" fill="none" stroke="rgba(245,214,150,0.16)" />
        <path d="M0 170 C 220 130, 420 150, 640 165 S 1020 120, 1220 150 S 1400 175, 1440 160 L1440 220 L0 220Z" fill="url(#dg2)" />
      </svg>
    </div>
  );
}

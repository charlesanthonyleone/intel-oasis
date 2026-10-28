/* Moonlit desert: smoky aurora, moonbeam, dunes, palms, lake. Pure SVG + CSS transforms. */
const rnd = (s => () => (s = (s * 16807) % 2147483647) / 2147483647)(7);
const STARS = Array.from({ length: 90 }, () => ({ x: rnd() * 100, y: rnd() * 55, r: rnd() * 1.1 + 0.3, d: (rnd() * 6 + 3).toFixed(1), o: (rnd() * 5).toFixed(1) }));

function Palm({ x, y, s = 1, flip }) {
  const f = 'M0 0 C -20 -8 -48 -6 -70 8 C -46 -2 -22 0 0 4Z';
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`} fill="#06060d">
      <path d="M-3 0 C 2 -60 10 -110 4 -150 L 9 -150 C 15 -110 8 -60 4 0Z" />
      <g transform="translate(6 -150)">
        {[-20, 15, 50, 160, 195, 230, 100].map((r, i) => <path key={i} d={f} transform={`rotate(${r}) scale(${i % 2 ? 1 : 0.85})`} />)}
      </g>
    </g>
  );
}

export default function Nightscape({ variant = 'hero' }) {
  const full = variant === 'hero';
  return (
    <div className={`ns ns-${variant}`} aria-hidden="true">
      <div className="ns-sky" />
      <div className="ns-aurora">
        <span className="au au1" /><span className="au au2" /><span className="au au3" /><span className="au au4" />
      </div>
      <div className="ns-stars">
        {STARS.map((s, i) => <i key={i} style={{ left: s.x + '%', top: s.y + '%', width: s.r * 2, height: s.r * 2, animationDuration: s.d + 's', animationDelay: s.o + 's' }} />)}
        <b className="ns-shoot" />
      </div>
      <div className="ns-moon" />
      <div className="ns-beam" />
      {full && (
        <svg className="ns-land" viewBox="0 0 1600 420" preserveAspectRatio="xMidYMax slice">
          <defs>
            <linearGradient id="d1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#5a4f62" /><stop offset="1" stopColor="#15131f" /></linearGradient>
            <linearGradient id="d2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#c2b292" /><stop offset=".18" stopColor="#5c5060" /><stop offset=".6" stopColor="#231e30" /><stop offset="1" stopColor="#100e18" /></linearGradient>
            <linearGradient id="lk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#4a4466" /><stop offset="1" stopColor="#14121e" /></linearGradient>
            <linearGradient id="rim" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#d9cdb4" stopOpacity="0" /><stop offset=".7" stopColor="#e8dcc2" stopOpacity=".7" /><stop offset="1" stopColor="#d9cdb4" stopOpacity=".1" /></linearGradient>
          </defs>
          <path d="M0 250 C 220 190 420 200 640 235 C 860 270 1060 180 1280 190 C 1420 196 1520 220 1600 230 V420 H0Z" fill="url(#d1)" opacity=".85" />
          <path d="M0 250 C 220 190 420 200 640 235 C 860 270 1060 180 1280 190 C 1420 196 1520 220 1600 230" fill="none" stroke="url(#rim)" strokeWidth="1.2" opacity=".6" />
          <ellipse cx="1330" cy="318" rx="330" ry="26" fill="url(#lk)" />
          <g className="ns-shimmer">
            <rect x="1330" y="300" width="40" height="2" fill="#efe6d2" opacity=".55" />
            <rect x="1318" y="309" width="62" height="1.5" fill="#efe6d2" opacity=".35" />
            <rect x="1340" y="318" width="26" height="1.5" fill="#efe6d2" opacity=".3" />
            <rect x="1180" y="312" width="120" height="1.2" fill="#b9a8d8" opacity=".25" />
          </g>
          <Palm x={1170} y={318} s={0.95} /><Palm x={1205} y={322} s={0.68} flip /><Palm x={1500} y={312} s={0.8} flip /><Palm x={1470} y={316} s={0.55} />
          <path d="M0 330 C 260 270 520 300 760 340 C 980 376 1240 300 1600 320 V420 H0Z" fill="url(#d2)" />
          <path d="M0 330 C 260 270 520 300 760 340 C 980 376 1240 300 1600 320" fill="none" stroke="url(#rim)" strokeWidth="1.6" />
          <path d="M0 395 C 300 360 700 375 1000 400 C 1250 420 1450 380 1600 390 V420 H0Z" fill="#0b0a12" />
        </svg>
      )}
    </div>
  );
}

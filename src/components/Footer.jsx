import { Link } from 'react-router-dom';
import Logo from './Logo';

const COLS = [
  ['Explore', [['Ideas', '/Ideas'], ['Books', '/Books'], ['Software', '/Software'], ['Clubs', '/Clubs'], ['Traditions', '/Traditions']]],
  ['Read', [['The Resolution', '/TheResolution'], ['Public Domain', '/PublicDomain'], ['The Warning', '/Warning'], ['Search', '/Search']]],
];

export default function Footer() {
  return (
    <footer className="mt-28 border-t" style={{ borderColor: 'var(--line)', background: 'linear-gradient(180deg, rgba(5,10,20,0), rgba(3,7,14,0.9))' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo size={26} />
            <div className="mt-8 space-y-3">
              <p className="font-display text-3xl leading-tight" style={{ color: 'rgba(255,255,255,0.9)' }}>
                Explore, learn — <span className="gold-text">preserve, teach.</span>
              </p>
              <p className="font-display text-3xl leading-tight" style={{ color: 'rgba(255,255,255,0.9)' }}>
                Every problem has <span className="grad-text">a thousand solutions.</span>
              </p>
            </div>
          </div>
          {COLS.map(([h, links]) => (
            <div key={h}>
              <p className="eyebrow mb-4" style={{ color: 'rgba(232,238,245,0.35)' }}>{h}</p>
              <ul className="space-y-2.5">
                {links.map(([l, to]) => (
                  <li key={l}><Link to={to} className="text-[14px] transition-colors hover:text-white" style={{ color: 'rgba(232,238,245,0.6)' }}>{l}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 pt-6 flex flex-col sm:flex-row justify-between gap-3 text-[12px] border-t" style={{ borderColor: 'var(--line)', color: 'rgba(232,238,245,0.35)' }}>
          <span>IntelOasis · Leone University</span>
          <span>Open source ideas. Take one. Build it.</span>
        </div>
      </div>
    </footer>
  );
}

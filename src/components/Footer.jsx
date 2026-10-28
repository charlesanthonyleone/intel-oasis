import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Logo from './Logo';

export const LEONE_URL = 'https://charlesanthonyleone.github.io/leone-university/';

const COLS = [
  ['Explore', [['Ideas', '/Ideas'], ['Books', '/Books'], ['Software', '/Software'], ['Clubs', '/Clubs'], ['Traditions', '/Traditions']]],
  ['Read', [['The Resolution', '/TheResolution'], ['Public Domain', '/PublicDomain'], ['The Warning', '/Warning'], ['Search', '/Search']]],
];

export default function Footer() {
  return (
    <footer className="mt-32 border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-20">
        <div className="grid gap-14 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <Logo size={22} />
            <div className="mt-10 space-y-2">
              <p className="font-display font-light text-2xl md:text-3xl leading-snug text-white/80">
                Explore, learn — <span className="italic text-[#c8a45a]">preserve, teach.</span>
              </p>
              <p className="font-display font-light text-2xl md:text-3xl leading-snug text-white/80">
                Every problem has <span className="italic text-[#c8a45a]">a thousand solutions.</span>
              </p>
            </div>
          </div>
          {COLS.map(([h, links]) => (
            <div key={h}>
              <p className="eyebrow mb-6 !text-white/30">{h}</p>
              <ul className="space-y-3">
                {links.map(([l, to]) => (
                  <li key={l}><Link to={to} className="text-[13px] font-light text-white/50 hover:text-[#e8cc8a] transition-colors duration-500">{l}</Link></li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <p className="eyebrow mb-6 !text-white/30">Leone University</p>
            <a href={LEONE_URL} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1.5 text-[13px] font-light text-white/50 hover:text-[#e8cc8a] transition-colors duration-500">
              Leone University <ArrowUpRight className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100" />
            </a>
          </div>
        </div>
        <div className="mt-20 pt-8 flex flex-col sm:flex-row justify-between gap-3 text-[10px] tracking-[0.3em] uppercase border-t border-white/[0.05] text-white/25">
          <span>IntelOasis · Leone University</span>
          <span>Open source ideas. Take one. Build it.</span>
        </div>
      </div>
    </footer>
  );
}

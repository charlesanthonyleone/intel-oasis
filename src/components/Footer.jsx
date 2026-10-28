import { Link } from 'react-router-dom';
import { Lightbulb, Code2, Users, BookOpen, Flame, Home } from 'lucide-react';

const LINKS = [
  { label: 'Home', path: '/', icon: Home },
  { label: 'Ideas', path: '/Ideas', icon: Lightbulb },
  { label: 'Software', path: '/Software', icon: Code2 },
  { label: 'Clubs', path: '/Clubs', icon: Users },
  { label: 'Books', path: '/Books', icon: BookOpen },
  { label: 'Traditions', path: '/Traditions', icon: Flame },
];

export default function Footer() {
  return (
    <footer className="mt-24 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)', background: '#060608' }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14">

        {/* Quotes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
          <div className="px-5 py-5 rounded-2xl" style={{ background: 'rgba(245,158,11,0.05)', border: '1px solid rgba(245,158,11,0.12)' }}>
            <p className="text-[18px] font-black tracking-tight leading-snug mb-1" style={{ color: 'rgba(255,255,255,0.88)' }}>
              Explore, learn —
            </p>
            <p className="text-[18px] font-black tracking-tight leading-snug" style={{ color: '#f59e0b' }}>
              preserve, teach.
            </p>
          </div>
          <div className="px-5 py-5 rounded-2xl" style={{ background: 'rgba(139,92,246,0.05)', border: '1px solid rgba(139,92,246,0.12)' }}>
            <p className="text-[18px] font-black tracking-tight leading-snug mb-1" style={{ color: 'rgba(255,255,255,0.88)' }}>
              Every problem has
            </p>
            <p className="text-[18px] font-black tracking-tight leading-snug" style={{ color: '#a78bfa' }}>
              a thousand solutions.
            </p>
          </div>
        </div>

        {/* Nav links */}
        <div className="flex flex-wrap gap-2 mb-8">
          {LINKS.map(({ label, path, icon: Icon }) => (
            <Link key={label} to={path}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.35)' }}
              onMouseEnter={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.75)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.35)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; }}>
              <Icon className="w-3 h-3" />
              {label}
            </Link>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="flex items-center gap-1.5">
            <span className="text-[13px] font-black tracking-tight">
              <span className="gold-text">Intel</span><span className="grad-text">Oasis</span>
            </span>
            <span className="text-[11px]" style={{ color: 'rgba(255,255,255,0.18)' }}>· Leone University</span>
          </div>
          <div className="flex flex-wrap gap-3 text-[11px]" style={{ color: 'rgba(255,255,255,0.2)' }}>
            <a href="https://chronicle-forge-now.base44.app" target="_blank" rel="noopener noreferrer"
              className="transition-colors hover:text-white/50">Library (Early Build)</a>
            <span style={{ color: 'rgba(255,255,255,0.08)' }}>·</span>
            <span>Open source ideas. Take one. Build it.</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
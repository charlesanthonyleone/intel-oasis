import { Link } from 'react-router-dom';
import { Lightbulb, Code2, Users, BookOpen, Home, Flame, Shield } from 'lucide-react';
import Footer from './components/Footer';

const NAV = [
  { label: 'Home',    page: 'Home',     icon: Home },
  { label: 'Ideas',   page: 'Ideas',    icon: Lightbulb },
  { label: 'Software',page: 'Software', icon: Code2 },
  { label: 'Clubs',   page: 'Clubs',    icon: Users },
  { label: 'Books',   page: 'Books',    icon: BookOpen },
  { label: 'Traditions', page: 'Traditions', icon: Flame },
  { label: 'Public Domain', page: 'PublicDomain', icon: Shield },
];

export default function Layout({ children, currentPageName }) {
  return (
    <div className="min-h-screen" style={{ background: '#060608', color: '#e2e2e2' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&display=swap');
        * { font-family: 'Inter', -apple-system, sans-serif; box-sizing: border-box; }
        ::selection { background: rgba(139,92,246,0.3); color:#fff; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #060608; }
        ::-webkit-scrollbar-thumb { background: #1e1b2e; border-radius: 2px; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .grad-text {
          background: linear-gradient(135deg, #a78bfa 0%, #7c3aed 50%, #6d28d9 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .gold-text {
          background: linear-gradient(135deg, #fde68a 0%, #f59e0b 50%, #d97706 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .glass {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          backdrop-filter: blur(12px);
        }
        .glass-hover:hover {
          background: rgba(255,255,255,0.05) !important;
          border-color: rgba(255,255,255,0.1) !important;
        }
      `}</style>

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50"
        style={{ background: 'rgba(6,6,8,0.85)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-5xl mx-auto px-4 flex items-center justify-between h-11">
          <Link to="/" className="flex items-center text-[13px] font-bold tracking-tight" style={{ letterSpacing: '-0.02em' }}>
            <span className="gold-text">Intel</span><span style={{ background: 'linear-gradient(135deg, #a78bfa 0%, #7c3aed 50%, #6d28d9 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', paddingRight: '3px' }}>Oasis</span>
          </Link>
          <div className="flex items-center gap-0.5">
            {NAV.map(({ label, page, icon: Icon }) => {
              const isActive = currentPageName === page;
              return (
                <Link key={page} to={`/${page}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all duration-150"
                  style={{
                    color: isActive ? '#a78bfa' : 'rgba(255,255,255,0.35)',
                    background: isActive ? 'rgba(139,92,246,0.12)' : 'transparent',
                    border: `1px solid ${isActive ? 'rgba(139,92,246,0.25)' : 'transparent'}`,
                  }}>
                  <Icon className="w-3 h-3" />
                  <span className="hidden sm:inline">{label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      <div className="pt-11">
        {children}
        <Footer />
      </div>
    </div>
  );
}
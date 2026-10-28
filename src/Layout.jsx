import SiteBackdrop from '@/components/SiteBackdrop';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, Menu, X, ArrowUpRight } from 'lucide-react';
import Footer, { LEONE_URL } from './components/Footer';
import Logo from './components/Logo';

const NAV = [
  { label: 'Home', page: 'Home', to: '/' },
  { label: 'Ideas', page: 'Ideas', to: '/Ideas' },
  { label: 'Books', page: 'Books', to: '/Books' },
  { label: 'Software', page: 'Software', to: '/Software' },
  { label: 'Clubs', page: 'Clubs', to: '/Clubs' },
  { label: 'Traditions', page: 'Traditions', to: '/Traditions' },
  { label: 'Public Domain', page: 'PublicDomain', to: '/PublicDomain' },
];

export default function Layout({ children, currentPageName }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const loc = useLocation();
  useEffect(() => { setOpen(false); }, [loc.pathname, loc.search]);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on(); window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; }, [open]);
  const isWarning = currentPageName === 'Warning';

  return (
    <div className="min-h-screen relative grain" style={{ color: 'var(--ink)' }}>
      <SiteBackdrop />
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] px-4 py-2 rounded-lg bg-[#c8a45a] text-black font-semibold">Skip to content</a>

      <header className="fixed top-0 inset-x-0 z-50 transition-all duration-500"
        style={{
          background: scrolled || open ? 'rgba(7,8,13,0.86)' : 'transparent',
          backdropFilter: scrolled || open ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled || open ? 'blur(20px)' : 'none',
          borderBottom: `1px solid ${scrolled ? 'var(--line)' : 'transparent'}`,
        }}>
        <nav className="max-w-7xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between gap-4" aria-label="Primary">
          <Link to="/" aria-label="IntelOasis home"><Logo /></Link>

          <div className="hidden xl:flex items-center gap-7">
            {NAV.map(n => {
              const active = currentPageName === n.page;
              return (
                <Link key={n.page} to={n.to} aria-current={active ? 'page' : undefined}
                  className={`relative py-2 text-[11px] tracking-[0.18em] uppercase transition-colors duration-500 ${active ? 'text-[#e8cc8a]' : 'text-white/50 hover:text-white/90'}`}>
                  {n.label}
                  {active && <motion.span layoutId="nav-dot" className="absolute inset-x-0 -bottom-0.5 h-px bg-[#c8a45a]/60" />}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-5">
            <Link to="/Warning" className={`hidden sm:inline text-[11px] tracking-[0.18em] uppercase transition-colors duration-500 ${isWarning ? 'text-red-300' : 'text-red-300/70 hover:text-red-300'}`}>
              The Warning
            </Link>
            <a href={LEONE_URL} target="_blank" rel="noopener noreferrer" className="hidden md:inline-flex items-center gap-1 text-[11px] tracking-[0.18em] uppercase text-white/50 hover:text-[#e8cc8a] transition-colors duration-500">
              Leone University <ArrowUpRight className="w-3 h-3" />
            </a>
            <Link to="/Search" aria-label="Search the library and ideas"
              className="inline-flex items-center gap-2 h-9 px-4 rounded-full text-[11px] tracking-[0.18em] uppercase border border-white/10 hover:border-[#c8a45a]/40 text-white/60 hover:text-white transition-colors duration-500">
              <Search className="w-3.5 h-3.5" /><span className="hidden md:inline">Search</span>
            </Link>
            <button className="xl:hidden inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/10 text-white/70"
              aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(o => !o)}>
              {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: '100dvh' }} exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
              className="xl:hidden overflow-hidden" style={{ background: 'rgba(7,8,13,0.98)' }}>
              <div className="px-6 pt-6 pb-24 flex flex-col gap-1">
                {[...NAV, { label: 'The Warning', page: 'Warning', to: '/Warning' }, { label: 'Search', page: 'Search', to: '/Search' }, { label: 'Leone University', page: 'Leone', href: LEONE_URL }].map((n, i) => {
                  const cls = 'flex items-center justify-between py-4 border-b border-white/[0.05] font-display font-light text-[26px]';
                  const col = { color: currentPageName === n.page ? '#e8cc8a' : n.page === 'Warning' ? '#fca5a5' : 'rgba(255,255,255,0.85)' };
                  const inner = <>{n.label}<span className="text-[10px] tracking-[0.3em] font-sans text-white/25">{String(i + 1).padStart(2, '0')}</span></>;
                  return (
                  <motion.div key={n.page} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 + i * 0.035 }}>
                    {n.href ? <a href={n.href} target="_blank" rel="noopener noreferrer" className={cls} style={col}>{inner}</a>
                      : <Link to={n.to} className={cls} style={col}>{inner}</Link>}
                  </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main id="main" className="relative z-[2] pt-20">
        {children}
      </main>
      <div className="relative z-[2]"><Footer /></div>
    </div>
  );
}

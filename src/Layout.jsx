import SiteBackdrop from '@/components/SiteBackdrop';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, Menu, X, AlertTriangle } from 'lucide-react';
import Footer from './components/Footer';
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
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] px-4 py-2 rounded-lg bg-teal-400 text-black font-semibold">Skip to content</a>

      <header className="fixed top-0 inset-x-0 z-50 transition-all duration-500"
        style={{
          background: scrolled || open ? 'rgba(5,10,20,0.78)' : 'linear-gradient(180deg, rgba(5,10,20,0.6), rgba(5,10,20,0))',
          backdropFilter: scrolled || open ? 'blur(18px) saturate(150%)' : 'none',
          WebkitBackdropFilter: scrolled || open ? 'blur(18px) saturate(150%)' : 'none',
          borderBottom: `1px solid ${scrolled ? 'var(--line)' : 'transparent'}`,
        }}>
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4" aria-label="Primary">
          <Link to="/" aria-label="IntelOasis home"><Logo /></Link>

          <div className="hidden lg:flex items-center gap-1">
            {NAV.map(n => {
              const active = currentPageName === n.page;
              return (
                <Link key={n.page} to={n.to} aria-current={active ? 'page' : undefined}
                  className="relative px-3 py-2 text-[13px] font-medium transition-colors"
                  style={{ color: active ? '#fff' : 'rgba(232,238,245,0.55)' }}>
                  {n.label}
                  {active && <motion.span layoutId="nav-dot" className="absolute left-3 right-3 -bottom-0.5 h-px"
                    style={{ background: 'linear-gradient(90deg, transparent, #5eead4, transparent)' }} />}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <Link to="/Warning" className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-semibold transition-all hover-rise"
              style={{ color: isWarning ? '#fff' : '#fca5a5', background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(248,113,113,0.3)' }}>
              <AlertTriangle className="w-3.5 h-3.5" /> The Warning
            </Link>
            <Link to="/Search" aria-label="Search the library and ideas"
              className="inline-flex items-center gap-2 h-9 px-3 rounded-full text-[12px] glass glass-hover"
              style={{ color: 'rgba(232,238,245,0.7)' }}>
              <Search className="w-4 h-4" /><span className="hidden md:inline">Search</span>
            </Link>
            <button className="lg:hidden inline-flex items-center justify-center w-9 h-9 rounded-full glass"
              aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(o => !o)}>
              {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: '100dvh' }} exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
              className="lg:hidden overflow-hidden" style={{ background: 'rgba(5,10,20,0.96)' }}>
              <div className="px-6 pt-6 pb-24 flex flex-col gap-1">
                {[...NAV, { label: 'The Warning', page: 'Warning', to: '/Warning' }, { label: 'Search', page: 'Search', to: '/Search' }].map((n, i) => (
                  <motion.div key={n.page} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 + i * 0.035 }}>
                    <Link to={n.to} className="flex items-center justify-between py-3.5 border-b font-display text-[28px]"
                      style={{ borderColor: 'var(--line)', color: currentPageName === n.page ? '#5eead4' : n.page === 'Warning' ? '#fca5a5' : '#fff' }}>
                      {n.label}<span className="text-[12px] font-sans" style={{ color: 'rgba(232,238,245,0.3)' }}>0{i + 1}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main id="main" className="relative z-[2] pt-16">
        {children}
      </main>
      <div className="relative z-[2]"><Footer /></div>
    </div>
  );
}

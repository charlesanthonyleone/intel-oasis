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
  { label: 'Library', page: 'Books', to: '/Books' },
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
    <div className="min-h-screen relative" style={{ color: 'var(--ink)' }}>
      
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] px-4 py-2 rounded-lg bg-[#c8a45a] text-black font-semibold">Skip to content</a>

      <header className="site-head">
        <nav className="max-w-6xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between gap-6" aria-label="Primary">
          <Link to="/" aria-label="IntelOasis home" className="wordmark">IntelOasis</Link>
          <div className="hidden lg:flex items-center gap-7">
            {[...NAV.slice(1), { label: 'The Warning', page: 'Warning', to: '/Warning' }, { label: 'Search', page: 'Search', to: '/Search' }].map(n => (
              <Link key={n.page} to={n.to} aria-current={currentPageName === n.page ? 'page' : undefined} className="nav-link">{n.label}</Link>
            ))}
          </div>
          <button className="lg:hidden nav-link" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(o => !o)}>
            {open ? 'Close' : 'Menu'}
          </button>
        </nav>
        {open && (
          <div className="lg:hidden mobile-menu">
            {[...NAV, { label: 'The Warning', page: 'Warning', to: '/Warning' }, { label: 'Search', page: 'Search', to: '/Search' }].map(n => (
              <Link key={n.page} to={n.to} className="mobile-link" aria-current={currentPageName === n.page ? 'page' : undefined}>{n.label}</Link>
            ))}
            <a href={LEONE_URL} target="_blank" rel="noopener noreferrer" className="mobile-link">Leone University</a>
          </div>
        )}
      </header>

      <main id="main" className="relative z-[2] pt-16">
        {children}
      </main>
      <div className="relative z-[2]"><Footer /></div>
    </div>
  );
}

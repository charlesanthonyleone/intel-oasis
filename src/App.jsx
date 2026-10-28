import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Layout from './Layout.jsx';
import Home from './pages/Home';
import Books from './pages/Books';
import Ideas from './pages/Ideas';
import IdeaDetail from './pages/IdeaDetail';
import Clubs from './pages/Clubs';
import Traditions from './pages/Traditions';
import Software from './pages/Software';
import TheResolution from './pages/TheResolution';
import PublicDomain from './pages/PublicDomain';
import Series from './pages/Series';
import Search from './pages/Search';
import Warning from './pages/Warning';
import SupremeWarning from './pages/SupremeWarning';
import SupremeWarningPage from './pages/SupremeWarningPage';
import InteractiveWarning from './pages/InteractiveWarning';
import InteractiveWarningMap from './pages/InteractiveWarningMap';
import PageNotFound from './pages/PageNotFound';

const PAGES = { Home, Books, Ideas, IdeaDetail, Clubs, Traditions, Software, TheResolution, PublicDomain, Search, Warning, SupremeWarning, InteractiveWarning, InteractiveWarningMap };
const WARNING_PAGES = ['Warning', 'SupremeWarning', 'InteractiveWarning', 'InteractiveWarningMap', 'supreme-warning', 'interactive-warning'];

function pageName(pathname) {
  const seg = pathname.split('/')[1] || 'Home';
  if (seg === 'series') return 'Books';
  if (WARNING_PAGES.includes(seg)) return 'Warning';
  return seg;
}

function Shell() {
  const location = useLocation();
  const reduce = useReducedMotion();
  useEffect(() => { window.scrollTo(0, 0); }, [location.pathname, location.search]);
  useEffect(() => {
    const n = pageName(location.pathname);
    document.title = n === 'Home' ? 'IntelOasis' : `${n.replace(/([a-z])([A-Z])/g, '$1 $2')} · IntelOasis`;
  }, [location.pathname]);
  const anim = reduce ? {} : { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -6 }, transition: { duration: 0.35, ease: [0.2, 0.7, 0.2, 1] } };
  return (
    <Layout currentPageName={pageName(location.pathname)}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={location.pathname + location.search} {...anim}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            {Object.entries(PAGES).map(([name, Page]) => <Route key={name} path={`/${name}`} element={<Page />} />)}
            <Route path="/supreme-warning" element={<SupremeWarningPage />} />
            <Route path="/interactive-warning" element={<InteractiveWarningMap />} />
            <Route path="/series/:key" element={<Series />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </Layout>
  );
}

export default function App() {
  return <HashRouter><Shell /></HashRouter>;
}

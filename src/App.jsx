import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
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
import PageNotFound from './pages/PageNotFound';

function ScrollTop() {
  const { pathname, search } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname, search]);
  return null;
}

const PAGES = { Home, Books, Ideas, IdeaDetail, Clubs, Traditions, Software, TheResolution, PublicDomain };

export default function App() {
  return (
    <HashRouter>
      <ScrollTop />
      <Routes>
        <Route path="/" element={<Layout currentPageName="Home"><Home /></Layout>} />
        {Object.entries(PAGES).map(([name, Page]) => (
          <Route key={name} path={`/${name}`} element={<Layout currentPageName={name}><Page /></Layout>} />
        ))}
        <Route path="/series/:key" element={<Layout currentPageName="Books"><Series /></Layout>} />
        <Route path="*" element={<Layout currentPageName=""><PageNotFound /></Layout>} />
      </Routes>
    </HashRouter>
  );
}

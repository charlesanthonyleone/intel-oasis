import { Link } from 'react-router-dom';

export const LEONE_URL = 'https://leoneuniversity.org/';

const LINKS = [['Ideas', '/Ideas'], ['Library', '/Books'], ['Software', '/Software'], ['Clubs', '/Clubs'], ['Traditions', '/Traditions'], ['The Resolution', '/TheResolution'], ['Public Domain', '/PublicDomain'], ['The Warning', '/Warning'], ['Search', '/Search']];

export default function Footer() {
  return (
    <footer className="site-foot">
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-14 flex flex-col md:flex-row md:justify-between gap-8">
        <span className="wordmark">IntelOasis</span>
        <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Footer">
          {LINKS.map(([l, to]) => <Link key={l} to={to} className="nav-link">{l}</Link>)}
          <a href={LEONE_URL} target="_blank" rel="noopener noreferrer" className="nav-link">Leone University</a>
        </nav>
      </div>
    </footer>
  );
}

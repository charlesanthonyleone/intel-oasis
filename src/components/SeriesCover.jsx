import { Link } from 'react-router-dom';

export function SeriesIconView() { return null; }

/* One entry in the series table of contents: number, title, his descriptor. */
export function SeriesCover({ s, n }) {
  return (
    <Link to={`/series/${s.key}`} className="toc-row group">
      <span className="toc-num">{n != null ? String(n).padStart(2, '0') : ''}</span>
      <span className="toc-body">
        <span className="toc-title">{s.label}</span>
        {s.tagline && <span className="toc-desc">{s.tagline}</span>}
      </span>
    </Link>
  );
}

export function SeriesIndex({ list }) {
  return <div className="toc">{list.map((s, i) => <SeriesCover key={s.key} s={s} n={i + 1} />)}</div>;
}

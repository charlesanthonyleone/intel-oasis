import { Link } from 'react-router-dom';

export function PageHead({ kicker, title, lede, children }) {
  return (
    <header className="ed-head">
      {kicker && <p className="h-label">{kicker}</p>}
      <h1 className="h-page">{title}</h1>
      {lede && <p className="lede">{lede}</p>}
      {children}
    </header>
  );
}

export function Filters({ items, active, onChange }) {
  return (
    <nav className="ed-filters" aria-label="Filter">
      {items.map(it => (
        <button key={it.key} onClick={() => onChange(it.key)} className={'ed-filter' + (active === it.key ? ' on' : '')}>
          {it.label}{it.count != null && <span className="ed-count">{it.count}</span>}
        </button>
      ))}
    </nav>
  );
}

export function SearchField({ value, onChange, placeholder = 'Search', autoFocus }) {
  return (
    <input className="ed-search" type="search" value={value} autoFocus={autoFocus}
      onChange={e => onChange(e.target.value)} placeholder={placeholder} aria-label={placeholder} />
  );
}

export function ItemRows({ items, numbered = true, meta }) {
  if (!items.length) return <p className="row-sub ed-empty">Nothing here yet.</p>;
  return (
    <ol className="rows ed-rows">
      {items.map((it, i) => (
        <li key={it.id}>
          <Link to={it.to || `/IdeaDetail?id=${it.id}`} className="row">
            {numbered && <span className="row-num">{String(i + 1).padStart(2, '0')}</span>}
            <span className="row-body">
              {meta && meta(it) && <span className="ed-meta">{meta(it)}</span>}
              <span className="row-title">{it.title}</span>
              {it.tagline && <span className="ed-tag">{it.tagline}</span>}
              {it.summary && <span className="row-sub">{it.summary}</span>}
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}

export function Section({ label, children }) {
  return <section className="ed-sec">{label && <h2 className="h-label">{label}</h2>}{children}</section>;
}

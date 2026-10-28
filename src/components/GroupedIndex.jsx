import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { SearchField } from '@/components/Editorial';

/* v13 — scannable listing: search, jump index, then numbered groups.
   Each group opens with one featured entry, then an aligned ledger of rows
   (serif title · one-line descriptor · metadata). Body text is never edited, only clamped visually. */
const pad = n => String(n).padStart(2, '0');
const desc = it => it.tagline || it.summary || '';
const hit = (it, q) => !q || [it.title, it.tagline, it.summary, ...(it.tags || [])].join(' ').toLowerCase().includes(q.toLowerCase());
const to = it => it.to || `/IdeaDetail?id=${it.id}`;

export default function GroupedIndex({ groups, meta = () => null, placeholder = 'Search', noun = 'entries', search = true }) {
  const [q, setQ] = useState('');
  const shown = useMemo(() => groups.map(g => ({ ...g, items: g.items.filter(i => hit(i, q)) })).filter(g => g.items.length), [groups, q]);
  const total = shown.reduce((a, g) => a + g.items.length, 0);
  const jump = (k) => document.getElementById('g-' + k)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  return (
    <div className="gx">
      {search && <div className="gx-search"><SearchField value={q} onChange={setQ} placeholder={placeholder} />
        {q && <p className="gx-res">{total} {noun} match “{q}”</p>}</div>}
      {shown.length > 1 && <div className="gx-bar">
        {shown.length > 1 && <nav className="gx-nav" aria-label="Sections">
          {shown.map((g, i) => <button key={g.key} onClick={() => jump(g.key)}><span className="gx-n">{pad(i + 1)}</span>{g.label}<span className="gx-c">{g.items.length}</span></button>)}
        </nav>}
      </div>}
      {!shown.length && <p className="row-sub ed-empty">Nothing matches that search.</p>}
      {shown.map((g, gi) => {
        const [f, ...rest] = g.items;
        return (
          <section key={g.key} id={'g-' + g.key} className="gx-group">
            <header className="gx-head">
              <span className="gx-num">{pad(gi + 1)}</span>
              <div className="gx-hd">
                <h2 className="gx-title">{g.to ? <Link className="link" to={g.to}>{g.label}</Link> : g.label}</h2>
                {g.note && <p className="gx-note">{g.note}</p>}
              </div>
              <span className="gx-count">{g.items.length} {g.items.length === 1 ? noun.replace(/s$/, '').replace(/ie$/, 'y') : noun}</span>
            </header>
            <Link to={to(f)} className="gx-feat">
              <span className="gx-feat-k">Begin here{meta(f) ? ` · ${meta(f)}` : ''}</span>
              <span className="gx-feat-t">{f.title}</span>
              {f.tagline && <span className="gx-feat-tag">{f.tagline}</span>}
              {f.summary && <span className="gx-feat-s">{f.summary}</span>}
              <span className="gx-open">Open →</span>
            </Link>
            {!!rest.length && <ol className="gx-rows">
              {rest.map(it => (
                <li key={it.id}><Link to={to(it)} className="gx-row">
                  <span className="gx-rt">{it.title}</span>
                  <span className="gx-rd">{desc(it)}</span>
                  <span className="gx-rm">{meta(it) || ''}</span>
                </Link></li>))}
            </ol>}
          </section>);
      })}
    </div>
  );
}

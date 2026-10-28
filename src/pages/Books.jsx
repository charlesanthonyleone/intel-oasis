import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import booksAndLaw, { series as SERIES } from '@/components/booksAndLawData';
import { PageHead, Filters, SearchField, ItemRows, Section } from '@/components/Editorial';

const SECTIONS = [
  { key: 'home', label: 'Series' },
  { key: 'all', label: 'All Works' },
  { key: 'book', label: 'Books' },
  { key: 'fiction', label: 'Fiction' },
  { key: 'medical', label: 'Research & Papers' },
  { key: 'law', label: 'Law & Policy' },
];
const CAT_LABEL = { book: 'Book', fiction: 'Fiction', law: 'Law & Policy', medical: 'Research' };

function matchesSearch(item, q) {
  if (!q) return true;
  const lq = q.toLowerCase();
  return item.title.toLowerCase().includes(lq) || item.summary.toLowerCase().includes(lq) || (item.tags||[]).some(t=>t.toLowerCase().includes(lq));
}

function matchesSeries(item, seriesKey) {
  if (!seriesKey) return true;
  const s = SERIES.find(x => x.key === seriesKey);
  if (!s) return true;
  return s.ids.includes(item.id);
}

// ── Sub-components ──────────────────────────────────────────────────────────
function SeriesCard({ series, index }) {
  const items = series.ids.map(id => booksAndLaw.find(i => i.id === id));
  return (
    <section className="lib-series">
      <div className="lib-series-head">
        <span className="toc-num">{String(index + 1).padStart(2, '0')}</span>
        <div>
          <Link to={`/series/${series.key}`} className="toc-title link">{series.label}</Link>
          {series.tagline && <p className="toc-desc mt-2">{series.tagline}</p>}
        </div>
      </div>
      <ol className="rows lib-items">
        {items.map((item, i) => (
          <li key={item.id}><Link to={`/IdeaDetail?id=${item.id}`} className="row group">
            <span className="row-num">{i + 1}</span>
            <span className="row-body"><span className="row-title sm">{item.title}</span></span>
          </Link></li>
        ))}
      </ol>
    </section>
  );
}

export default function Books() {
  const [section, setSection] = useState('home');
  const [q, setQ] = useState('');
  const counts = useMemo(() => { const c = { all: booksAndLaw.length, home: SERIES.length }; booksAndLaw.forEach(i => { c[i.category] = (c[i.category] || 0) + 1; }); return c; }, []);
  const listView = section !== 'home' || !!q;
  const filtered = useMemo(() => (section === 'all' || section === 'home' ? booksAndLaw : booksAndLaw.filter(i => i.category === section)).filter(i => matchesSearch(i, q)), [section, q]);
  return (
    <div className="page">
      <PageHead kicker="The Open Library" title="The Library"
        lede={`Fifteen series and ${booksAndLaw.length} works. Each one asks what is actually happening, and refuses the easy answer.`} />
      <div className="ed-tools">
        <SearchField value={q} onChange={setQ} placeholder="Search the written works" />
        <Filters items={SECTIONS.map(s => ({ ...s, count: counts[s.key] }))} active={q && section === 'home' ? 'all' : section} onChange={k => { setSection(k); if (k === 'home') setQ(''); }} />
      </div>
      {!listView ? (
        <>
          <div>{SERIES.map((s, i) => <SeriesCard key={s.key} series={s} index={i} />)}</div>
          <Section label="Standalone Books">
            <ItemRows items={booksAndLaw.filter(i => i.category === 'book' && !i.series)} />
          </Section>
        </>
      ) : (
        <ItemRows items={filtered} meta={i => CAT_LABEL[i.category]} />
      )}
      <div style={{ height: '4rem' }} />
    </div>
  );
}

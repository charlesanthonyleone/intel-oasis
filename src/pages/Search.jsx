import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { PageHead, Filters, SearchField, ItemRows } from '@/components/Editorial';
import library from '@/data/library.json';
import ideas from '@/data/ideas.json';
import clubs from '@/data/clubs.json';
import traditions from '@/data/traditions.json';
import software from '@/data/software.json';
import publicDomain from '@/data/publicDomain.json';
import series from '@/data/series.json';

const TYPES = [
  { key: 'all', label: 'All' },
  { key: 'series', label: 'Series', accent: '#c8a45a' },
  { key: 'library', label: 'The Library', accent: '#c8a45a' },
  { key: 'ideas', label: 'Ideas', accent: '#c8a45a' },
  { key: 'software', label: 'Software', accent: '#c8a45a' },
  { key: 'clubs', label: 'Clubs', accent: '#c8a45a' },
  { key: 'traditions', label: 'Traditions', accent: '#c8a45a' },
  { key: 'publicDomain', label: 'Public Domain', accent: '#c8a45a' },
];
const ACC = Object.fromEntries(TYPES.map(t => [t.key, t.accent]));

const INDEX = [
  ...series.map(s => ({ type: 'series', id: s.key, title: s.label, sub: s.tagline, body: s.desc, tags: [], to: `/series/${s.key}`, accent: s.accent })),
  ...[['library', library], ['ideas', ideas], ['software', software], ['clubs', clubs], ['traditions', traditions], ['publicDomain', publicDomain]]
    .flatMap(([type, arr]) => arr.map(i => ({ type, id: i.id, title: i.title, sub: i.tagline, body: i.summary, tags: i.tags || [], to: `/IdeaDetail?id=${i.id}` }))),
].map(r => ({ ...r, hay: [r.title, r.sub, r.body, ...(r.tags || [])].filter(Boolean).join(' ').toLowerCase() }));

export default function Search() {
  const [params, setParams] = useSearchParams();
  const q = params.get('q') || '';
  const type = params.get('type') || 'all';
  const set = (k, v) => { const p = new URLSearchParams(params); v && v !== 'all' ? p.set(k, v) : p.delete(k); setParams(p, { replace: true }); };

  const results = useMemo(() => {
    const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    return INDEX.filter(r => (type === 'all' || r.type === type) && terms.every(t => r.hay.includes(t)));
  }, [q, type]);
  const counts = useMemo(() => {
    const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    const c = {}; INDEX.forEach(r => { if (terms.every(t => r.hay.includes(t))) { c[r.type] = (c[r.type] || 0) + 1; c.all = (c.all || 0) + 1; } }); return c;
  }, [q]);

  return (
    <div className="page">
      <PageHead kicker="Search" title="Ask the archive." lede="Every series, paper, idea, society and rite, in one index." />
      <div className="ed-tools">
        <SearchField value={q} onChange={v => set('q', v)} placeholder="What are you looking for?" autoFocus />
        <Filters items={TYPES.map(t => ({ key: t.key, label: t.label, count: counts[t.key] || 0 }))} active={type} onChange={k => set('type', k)} />
      </div>
      <ItemRows numbered={false} items={results.slice(0, 200).map(r => ({ id: r.type + r.id, to: r.to, title: r.title, tagline: r.sub, summary: r.sub ? '' : r.body, kind: TYPES.find(t => t.key === r.type)?.label }))} meta={r => r.kind} />
      <div style={{ height: '4rem' }} />
    </div>
  );
}

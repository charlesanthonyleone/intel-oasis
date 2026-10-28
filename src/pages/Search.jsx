import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search as SearchIcon, ArrowUpRight, X } from 'lucide-react';
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
  { key: 'library', label: 'The Library', accent: '#7ab494' },
  { key: 'ideas', label: 'Ideas', accent: '#c8a45a' },
  { key: 'software', label: 'Software', accent: '#a9c4c0' },
  { key: 'clubs', label: 'Clubs', accent: '#c8a45a' },
  { key: 'traditions', label: 'Traditions', accent: '#b4845a' },
  { key: 'publicDomain', label: 'Public Domain', accent: '#9a8fb8' },
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
    <div className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-16 pb-24">
      <h1 className="font-display text-5xl md:text-7xl font-semibold text-white mb-8">Search</h1>
      <label className="relative block mb-6">
        <span className="sr-only">Search</span>
        <SearchIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#c8a45a]" />
        <input autoFocus value={q} onChange={e => set('q', e.target.value)} type="search"
          className="w-full rounded-full pl-14 pr-12 py-4 text-[16px] text-white placeholder-white/30 glass outline-none focus:ring-2 focus:ring-[#c8a45a]/50" placeholder="…" />
        {q && <button onClick={() => set('q', '')} aria-label="Clear" className="absolute right-5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"><X className="w-4 h-4" /></button>}
      </label>
      <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2 mb-10">
        {TYPES.map(t => {
          const on = type === t.key;
          return (
            <button key={t.key} onClick={() => set('type', t.key)}
              className="flex-shrink-0 px-4 py-2 rounded-full text-[13px] font-medium transition-colors"
              style={on ? { background: `${t.accent || '#c8a45a'}22`, border: `1px solid ${t.accent || '#c8a45a'}66`, color: t.accent || '#c8a45a' } : { background: 'rgba(255,255,255,0.03)', border: '1px solid var(--line)', color: 'rgba(232,238,245,0.6)' }}>
              {t.label} <span className="opacity-50 ml-1">{counts[t.key] || 0}</span>
            </button>
          );
        })}
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        {results.slice(0, 200).map(r => {
          const a = r.accent || ACC[r.type];
          return (
            <Link key={r.type + r.id} to={r.to} className="group relative block rounded-2xl p-5 glass glass-hover">
              <p className="eyebrow mb-2" style={{ color: a }}>{TYPES.find(t => t.key === r.type)?.label}</p>
              <p className="font-display text-xl font-semibold text-white leading-snug pr-6">{r.title}</p>
              {(r.sub || r.body) && <p className="text-[13px] mt-1.5 line-clamp-2" style={{ color: 'rgba(232,238,245,0.5)' }}>{r.sub || r.body}</p>}
              <ArrowUpRight className="absolute top-5 right-5 w-4 h-4 opacity-30 group-hover:opacity-90" style={{ color: a }} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

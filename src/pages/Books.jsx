import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, X, BookOpen, ArrowUpRight, FlaskConical, Scale, Brain, Feather, Sparkles, HeartPulse, Globe2, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import booksAndLaw from '@/components/booksAndLawData';

// ── Series Definitions ──────────────────────────────────────────────────────
import { seriesIcon } from '@/components/seriesIcons';
import { series as SERIES_DATA } from '@/components/booksAndLawData';
const SERIES = SERIES_DATA.map(s => ({ ...s, icon: seriesIcon(s.icon) }));

// ── Category Config ─────────────────────────────────────────────────────────
const SECTIONS = [
  { key: 'all',     label: 'All Works',        icon: Feather,      accent: '#e2e8f0' },
  { key: 'book',    label: 'Books',             icon: BookOpen,     accent: '#b48a8a' },
  { key: 'fiction', label: 'Fiction',           icon: Sparkles,     accent: '#9a8fb8' },
  { key: 'medical', label: 'Research & Papers', icon: Brain,        accent: '#7ab494' },
  { key: 'law',     label: 'Law & Policy',      icon: Scale,        accent: '#a9c4c0' },
];

const CAT_META = {
  book:    { accent: '#b48a8a', icon: BookOpen,     label: 'Book' },
  fiction: { accent: '#9a8fb8', icon: Sparkles,     label: 'Fiction' },
  law:     { accent: '#a9c4c0', icon: Scale,        label: 'Law & Policy' },
  medical: { accent: '#7ab494', icon: FlaskConical, label: 'Research' },
};

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

// ── Main Page ───────────────────────────────────────────────────────────────
export default function Books() {
  const [activeSection, setActiveSection] = useState(null); // null = homepage
  const [activeSeries, setActiveSeries] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const counts = useMemo(() => {
    const c = { all: booksAndLaw.length };
    booksAndLaw.forEach(i => { c[i.category] = (c[i.category]||0)+1; });
    return c;
  }, []);

  const filtered = useMemo(() => {
    let base = !activeSection || activeSection === 'all' ? booksAndLaw : booksAndLaw.filter(i => i.category === activeSection);
    if (activeSeries) base = base.filter(i => matchesSeries(i, activeSeries));
    return base.filter(i => matchesSearch(i, searchQuery));
  }, [activeSection, activeSeries, searchQuery]);

  const isListView = activeSection !== null || activeSeries !== null || searchQuery;

  return (
    <div className="min-h-screen" style={{ background: 'transparent' }}>
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px]"
          style={{ background: 'radial-gradient(ellipse, rgba(251,113,133,0.06) 0%, transparent 70%)', filter: 'blur(40px)' }} />
        <div className="absolute top-[40%] right-0 w-[500px] h-[400px]"
          style={{ background: 'radial-gradient(ellipse, rgba(192,132,252,0.04) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-10 pt-16 pb-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex items-center gap-2 mb-1">
            <Feather className="w-4 h-4" style={{ color: '#b48a8a' }} />
            
          </div>
          <h1 className="h-page">The Library</h1>
          <p className="text-[13px] font-light mb-5" style={{ color: 'rgba(255,255,255,0.3)' }}>
            <span className="lede not-italic block mb-10" style={{fontStyle:"normal"}}>Fifteen series and {booksAndLaw.length} works. Each one asks what is actually happening, and refuses the easy answer.</span>
          </p>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'rgba(255,255,255,0.25)' }} />
            <input type="text" placeholder="Search written works…" value={searchQuery} onChange={e => { setSearchQuery(e.target.value); if (e.target.value) setActiveSection('all'); }}
              className="w-full pl-10 pr-10 py-3 rounded-xl text-[14px] text-white placeholder-white/25 focus:outline-none"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }} />
            {searchQuery && (
              <button onClick={() => { setSearchQuery(''); setActiveSection(null); }} className="absolute right-3.5 top-1/2 -translate-y-1/2" style={{ color: 'rgba(255,255,255,0.3)' }}>
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Section tabs */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 hide-scrollbar">
            <button onClick={() => { setActiveSection(null); setActiveSeries(null); setSearchQuery(''); }}
              className="px-3 py-1.5 rounded-full text-[11px] font-semibold flex-shrink-0 transition-all"
              style={{
                background: !activeSection && !activeSeries && !searchQuery ? 'rgba(251,113,133,0.2)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${!activeSection && !activeSeries && !searchQuery ? 'rgba(251,113,133,0.5)' : 'rgba(255,255,255,0.08)'}`,
                color: !activeSection && !activeSeries && !searchQuery ? '#b48a8a' : 'rgba(255,255,255,0.4)',
              }}>
              Home
            </button>
            {SECTIONS.map(sec => {
              const Icon = sec.icon;
              const active = activeSection === sec.key && !activeSeries;
              return (
                <button key={sec.key}
                  onClick={() => { setActiveSection(sec.key); setActiveSeries(null); setSearchQuery(''); }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold flex-shrink-0 transition-all"
                  style={{
                    background: active ? `${sec.accent}20` : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${active ? `${sec.accent}50` : 'rgba(255,255,255,0.08)'}`,
                    color: active ? sec.accent : 'rgba(255,255,255,0.4)',
                  }}>
                  <Icon style={{ width: 10, height: 10 }} />
                  {sec.label}
                  <span className="opacity-50 text-[10px]">{counts[sec.key] || counts.all}</span>
                </button>
              );
            })}
          </div>
        </motion.div>
      </div>

      <div className="h-px mx-4" style={{ background: 'rgba(255,255,255,0.05)' }} />

      <div className="max-w-6xl mx-auto px-6 md:px-10 py-6">

        {/* ── HOMEPAGE VIEW ── */}
        {!isListView && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>

            {/* Series spotlight */}
            <div className="mb-8">
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase mb-4" style={{ color: 'rgba(255,255,255,0.2)' }}>Series</p>
              <div>
                {SERIES.map((s, i) => <SeriesCard key={s.key} series={s} index={i} />)}
              </div>
            </div>

            {/* Standalone books */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: 'rgba(255,255,255,0.2)' }}>Standalone Books</p>
                <button onClick={() => setActiveSection('book')}
                  className="text-[11px] font-medium transition-colors"
                  style={{ color: 'rgba(255,255,255,0.25)' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.25)'}>
                  All books →
                </button>
              </div>
              <div className="space-y-2">
                {booksAndLaw.filter(i => i.category === 'book' && !i.series).map((item, i) => {
                  const cat = CAT_META.book;
                  const Icon = cat.icon;
                  return (
                    <motion.div key={item.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: Math.min(i * 0.04, 0.2) }}>
                      <Link to={`/IdeaDetail?id=${item.id}`}
                        className="flex items-start gap-3 px-4 py-3.5 rounded-xl transition-all group"
                        style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(251,113,133,0.05)'; e.currentTarget.style.borderColor = 'rgba(251,113,133,0.22)'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; }}>
                        <div className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center mt-0.5"
                          style={{ background: 'rgba(251,113,133,0.1)', border: '1px solid rgba(251,113,133,0.2)' }}>
                          <Icon style={{ width: 12, height: 12, color: '#b48a8a' }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="text-[13px] font-semibold leading-snug" style={{ color: 'rgba(255,255,255,0.85)' }}>{item.title}</h3>
                            <ArrowUpRight className="w-3.5 h-3.5 flex-shrink-0 opacity-0 group-hover:opacity-50 transition-opacity mt-0.5" style={{ color: '#b48a8a' }} />
                          </div>
                          <p className="text-[11px] font-light mt-0.5 leading-relaxed" style={{ color: 'rgba(255,255,255,0.28)' }}>
                            {item.summary.slice(0, 100)}{item.summary.length > 100 ? '…' : ''}
                          </p>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* ── LIST VIEW ── */}
        {isListView && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
            <div className="mb-4">
              <span className="text-[11px] font-medium" style={{ color: 'rgba(255,255,255,0.25)' }}>{filtered.length} works</span>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-20" style={{ color: 'rgba(255,255,255,0.2)' }}>No works match.</div>
            ) : (
              <div className="space-y-2">
                {filtered.map((item, i) => {
                  const cat = CAT_META[item.category] || CAT_META.book;
                  const Icon = cat.icon;
                  return (
                    <motion.div key={item.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, delay: Math.min(i * 0.02, 0.15) }}>
                      <Link to={`/IdeaDetail?id=${item.id}`}
                        className="flex items-start gap-3 px-4 py-4 rounded-xl transition-all group"
                        style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
                        onMouseEnter={e => { e.currentTarget.style.background = `${cat.accent}06`; e.currentTarget.style.borderColor = `${cat.accent}28`; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; }}>
                        <div className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mt-0.5"
                          style={{ background: `${cat.accent}12`, border: `1px solid ${cat.accent}22` }}>
                          <Icon style={{ width: 13, height: 13, color: cat.accent }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-3 mb-1">
                            <h3 className="text-[14px] font-semibold leading-snug" style={{ color: 'rgba(255,255,255,0.88)' }}>{item.title}</h3>
                            <ArrowUpRight className="w-4 h-4 flex-shrink-0 opacity-0 group-hover:opacity-50 transition-opacity mt-0.5" style={{ color: cat.accent }} />
                          </div>
                          <p className="text-[12px] font-light leading-relaxed mb-2" style={{ color: 'rgba(255,255,255,0.35)' }}>
                            {item.summary.slice(0, 150)}{item.summary.length > 150 ? '…' : ''}
                          </p>
                          <div className="flex flex-wrap gap-1.5 items-center">
                            <span className="px-2 py-0.5 rounded text-[10px] font-medium"
                              style={{ background: `${cat.accent}10`, color: cat.accent, border: `1px solid ${cat.accent}22` }}>
                              {cat.label}
                            </span>
                            {item.tags?.slice(0, 3).map(tag => (
                              <span key={tag} className="px-1.5 py-0.5 rounded text-[10px]"
                                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.25)' }}>
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>
        )}

      </div>
    </div>
  );
}
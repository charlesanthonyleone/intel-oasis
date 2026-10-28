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
  { key: 'book',    label: 'Books',             icon: BookOpen,     accent: '#fb7185' },
  { key: 'fiction', label: 'Fiction',           icon: Sparkles,     accent: '#c084fc' },
  { key: 'medical', label: 'Research & Papers', icon: Brain,        accent: '#6ee7b7' },
  { key: 'law',     label: 'Law & Policy',      icon: Scale,        accent: '#67e8f9' },
];

const CAT_META = {
  book:    { accent: '#fb7185', icon: BookOpen,     label: 'Book' },
  fiction: { accent: '#c084fc', icon: Sparkles,     label: 'Fiction' },
  law:     { accent: '#67e8f9', icon: Scale,        label: 'Law & Policy' },
  medical: { accent: '#6ee7b7', icon: FlaskConical, label: 'Research' },
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
  const Icon = series.icon;
  const isStringIcon = typeof Icon === 'string';
  const items = series.ids.map(id => booksAndLaw.find(i => i.id === id));
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: index * 0.07 }}>
      <div className="rounded-2xl overflow-hidden"
        style={{ background: `${series.accent}06`, border: `1px solid ${series.accent}20` }}>
        {/* Header */}
        <div className="px-5 pt-5 pb-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ background: `${series.accent}15`, border: `1px solid ${series.accent}28` }}>
                {isStringIcon ? <span style={{ fontSize: 13 }}>{Icon}</span> : <Icon style={{ width: 14, height: 14, color: series.accent }} />}
              </div>
              <span className="text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full"
                style={{ background: `${series.accent}12`, color: series.accent, border: `1px solid ${series.accent}22` }}>
                {series.badge}
              </span>
            </div>
          </div>
          <Link to={`/series/${series.key}`} className="hover:underline"><h2 className="text-[17px] font-black tracking-tight mb-1" style={{ color: 'rgba(255,255,255,0.92)' }}>{series.label}</h2></Link>
          <p className="text-[12px] italic font-medium mb-2" style={{ color: series.accent, opacity: 0.9 }}>{series.tagline}</p>
          <p className="text-[12px] font-light leading-relaxed" style={{ color: 'rgba(255,255,255,0.32)' }}>{series.desc}</p>
        </div>
        {/* Items */}
        <div style={{ borderTop: `1px solid ${series.accent}12` }}>
          {items.map((item, i) => (
            <Link key={item.id} to={`/IdeaDetail?id=${item.id}`}
              className="flex items-center gap-3 px-5 py-2.5 group transition-all"
              style={{ borderBottom: i < items.length - 1 ? `1px solid ${series.accent}08` : 'none' }}
              onMouseEnter={e => e.currentTarget.style.background = `${series.accent}08`}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              <span className="text-[10px] font-black w-4 flex-shrink-0 text-center" style={{ color: `${series.accent}70` }}>
                {i + 1}
              </span>
              <span className="flex-1 text-[12px] font-medium truncate" style={{ color: 'rgba(255,255,255,0.72)' }}>{item.title}</span>
              <ChevronRight className="w-3 h-3 flex-shrink-0 opacity-0 group-hover:opacity-50 transition-opacity" style={{ color: series.accent }} />
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
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

      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-12 pb-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex items-center gap-2 mb-1">
            <Feather className="w-4 h-4" style={{ color: '#fb7185' }} />
            <span className="text-[11px] font-bold tracking-[0.18em] uppercase" style={{ color: 'rgba(255,255,255,0.3)' }}>Leone University</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-1" style={{ color: 'rgba(255,255,255,0.92)' }}>
            Written<span style={{ color: '#fb7185' }}>Works</span>
          </h1>
          <p className="text-[13px] font-light mb-5" style={{ color: 'rgba(255,255,255,0.3)' }}>
            {booksAndLaw.length} works · every word is a long argument with the world
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
                color: !activeSection && !activeSeries && !searchQuery ? '#fb7185' : 'rgba(255,255,255,0.4)',
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

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">

        {/* ── HOMEPAGE VIEW ── */}
        {!isListView && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>

            {/* Series spotlight */}
            <div className="mb-8">
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase mb-4" style={{ color: 'rgba(255,255,255,0.2)' }}>Series</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                          <Icon style={{ width: 12, height: 12, color: '#fb7185' }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="text-[13px] font-semibold leading-snug" style={{ color: 'rgba(255,255,255,0.85)' }}>{item.title}</h3>
                            <ArrowUpRight className="w-3.5 h-3.5 flex-shrink-0 opacity-0 group-hover:opacity-50 transition-opacity mt-0.5" style={{ color: '#fb7185' }} />
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
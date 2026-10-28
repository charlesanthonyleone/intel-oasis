import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, X, Code2, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import softwareIdeas from '@/components/softwareData';

const CATEGORY_COLORS = {
  'Communication':   '#22d3ee',
  'Child Safety':    '#fb7185',
  'Enterprise AI':   '#c084fc',
  'Commerce':        '#fcd34d',
  'Platform Safety': '#fb923c',
  'Infrastructure':  '#6ee7b7',
  'Productivity':    '#5eead4',
  'Relationships':   '#f9a8d4',
  'Education':       '#67e8f9',
};

const STATUS = {
  'in-progress': { label: 'Building', color: '#fcd34d' },
  'concept':     { label: 'Concept',  color: '#67e8f9' },
  'open':        { label: 'Open',     color: '#6ee7b7' },
};

function matches(item, q) {
  if (!q) return true;
  const lq = q.toLowerCase();
  return item.title.toLowerCase().includes(lq) ||
    (item.tagline||'').toLowerCase().includes(lq) ||
    item.summary.toLowerCase().includes(lq) ||
    (item.tags||[]).some(t=>t.toLowerCase().includes(lq));
}

export default function Software() {
  const [activeCategory, setActiveCategory] = useState('__all__');
  const [searchQuery, setSearchQuery] = useState('');

  const allCategories = useMemo(() => ['__all__', ...new Set(softwareIdeas.map(i => i.category))].sort((a,b) => a === '__all__' ? -1 : b === '__all__' ? 1 : a.localeCompare(b)), []);

  const filtered = useMemo(() => {
    const base = activeCategory === '__all__' ? softwareIdeas : softwareIdeas.filter(i => i.category === activeCategory);
    return base.filter(i => matches(i, searchQuery));
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen" style={{ background: 'transparent' }}>
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px]"
          style={{ background: 'radial-gradient(ellipse, rgba(34,211,238,0.06) 0%, transparent 70%)', filter: 'blur(40px)' }} />
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-12 pb-6">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex items-center gap-2 mb-1">
            <Code2 className="w-4 h-4" style={{ color: '#22d3ee' }} />
            <span className="text-[11px] font-bold tracking-[0.18em] uppercase" style={{ color: 'rgba(255,255,255,0.3)' }}>Leone University</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-1" style={{ color: 'rgba(255,255,255,0.92)' }}>
            Software<span style={{ color: '#22d3ee' }}>Lab</span>
          </h1>
          <p className="text-[13px] font-light mb-5" style={{ color: 'rgba(255,255,255,0.3)' }}>
            {softwareIdeas.length} platforms built for the problems that actually matter
          </p>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'rgba(255,255,255,0.25)' }} />
            <input type="text" placeholder="Search software concepts…" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-3 rounded-xl text-[14px] text-white placeholder-white/25 focus:outline-none"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }} />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3.5 top-1/2 -translate-y-1/2" style={{ color: 'rgba(255,255,255,0.3)' }}>
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category pills */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 hide-scrollbar">
            {allCategories.map(cat => {
              const accent = cat === '__all__' ? '#22d3ee' : (CATEGORY_COLORS[cat] || '#94a3b8');
              const active = activeCategory === cat;
              return (
                <button key={cat} onClick={() => setActiveCategory(cat)}
                  className="px-3 py-1.5 rounded-full text-[11px] font-semibold flex-shrink-0 transition-all"
                  style={{
                    background: active ? `${accent}20` : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${active ? `${accent}50` : 'rgba(255,255,255,0.08)'}`,
                    color: active ? accent : 'rgba(255,255,255,0.4)',
                  }}>
                  {cat === '__all__' ? 'All' : cat}
                </button>
              );
            })}
          </div>
        </motion.div>
      </div>

      <div className="h-px mx-4" style={{ background: 'rgba(255,255,255,0.05)' }} />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4">
        <div className="mb-4">
          <span className="text-[11px] font-medium" style={{ color: 'rgba(255,255,255,0.25)' }}>{filtered.length} concepts</span>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20" style={{ color: 'rgba(255,255,255,0.2)' }}>No concepts match.</div>
        ) : (
          <div className="space-y-2">
            {filtered.map((idea, i) => {
              const accent = CATEGORY_COLORS[idea.category] || '#94a3b8';
              const status = STATUS[idea.status] || STATUS['concept'];
              return (
                <motion.div key={idea.id}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: Math.min(i * 0.025, 0.2) }}>
                  <Link to={`/IdeaDetail?id=${idea.id}`}
                    className="flex items-start gap-4 px-4 py-4 rounded-xl transition-all group"
                    style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
                    onMouseEnter={e => { e.currentTarget.style.background = `${accent}06`; e.currentTarget.style.borderColor = `${accent}25`; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; }}>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 mb-1">
                        <div>
                          <h3 className="text-[14px] font-semibold leading-snug" style={{ color: 'rgba(255,255,255,0.88)' }}>{idea.title}</h3>
                          {idea.tagline && <p className="text-[12px] font-medium mt-0.5" style={{ color: accent }}>{idea.tagline}</p>}
                        </div>
                        <ArrowUpRight className="w-4 h-4 flex-shrink-0 opacity-0 group-hover:opacity-50 transition-opacity mt-0.5" style={{ color: accent }} />
                      </div>
                      <p className="text-[12px] font-light leading-relaxed mb-2" style={{ color: 'rgba(255,255,255,0.35)' }}>
                        {idea.summary.slice(0, 160)}{idea.summary.length > 160 ? '…' : ''}
                      </p>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-medium"
                          style={{ background: `${accent}12`, color: accent, border: `1px solid ${accent}25` }}>
                          {idea.category}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold" style={{ color: status.color }}>
                          <span className="w-1.5 h-1.5 rounded-full" style={{ background: status.color }} />
                          {status.label}
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
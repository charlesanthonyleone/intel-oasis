import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, X, Lightbulb, ArrowUpRight, Cpu, Gamepad2, HeartPulse, Leaf, Scale, Users, Utensils, GraduationCap, BookOpen, Palette, FlaskConical, Globe, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import SuggestionBox from '@/components/SuggestionBox';
import ideas from '@/components/ideasData';

const CATEGORIES = [
  { key: 'all',         label: 'All',             icon: Globe,         accent: '#f59e0b', tags: [] },
  { key: 'ai',          label: 'AI & Tech',        icon: Cpu,           accent: '#22d3ee', tags: ['AI','LLM','Technology','Automation','Wearables'] },
  { key: 'gaming',      label: 'Gaming',           icon: Gamepad2,      accent: '#a78bfa', tags: ['Gaming','Simulation','ARG','Game','MMORPG','Gamification'] },
  { key: 'health',      label: 'Health',           icon: HeartPulse,    accent: '#6ee7b7', tags: ['Health','Neuroscience','Mental Health','Sleep','Medicine'] },
  { key: 'environment', label: 'Environment',      icon: Leaf,          accent: '#34d399', tags: ['Climate','Environment','Ecology','Sustainability','Biodiversity'] },
  { key: 'governance',  label: 'Governance',       icon: Scale,         accent: '#fb923c', tags: ['Governance','Policy','Democracy','Law','Justice'] },
  { key: 'social',      label: 'Social',           icon: Users,         accent: '#f9a8d4', tags: ['Community','Social','Culture','Wellbeing','Heritage'] },
  { key: 'food',        label: 'Food',             icon: Utensils,      accent: '#fbbf24', tags: ['Food','Agriculture','Farming'] },
  { key: 'education',   label: 'Education',        icon: GraduationCap, accent: '#67e8f9', tags: ['Education','Learning','Knowledge'] },
  { key: 'philosophy',  label: 'Philosophy',       icon: BookOpen,      accent: '#c084fc', tags: ['Philosophy','Ethics','Consciousness','Metaphysics'] },
  { key: 'art',         label: 'Art & Media',      icon: Palette,       accent: '#fb7185', tags: ['Art','Culture','Music','Media','Literature'] },
  { key: 'science',     label: 'Science',          icon: FlaskConical,  accent: '#86efac', tags: ['Science','Space','Biology','Physics','Research'] },
  { key: 'economy',     label: 'Economy',          icon: Zap,           accent: '#fde68a', tags: ['Economy','Commerce','Finance','Decentralized'] },
];

function matchesCat(item, cat) {
  if (cat.key === 'all' || !cat.tags.length) return true;
  const t = (item.tags || []).map(x => x.toLowerCase());
  return cat.tags.some(ct => t.some(it => it.includes(ct.toLowerCase()) || ct.toLowerCase().includes(it)));
}

function matchesQ(item, q) {
  if (!q) return true;
  const lq = q.toLowerCase();
  return item.title.toLowerCase().includes(lq) || item.summary.toLowerCase().includes(lq) || (item.tags||[]).some(t=>t.toLowerCase().includes(lq));
}

const STATUS_DOT = { 'in-progress': '#fcd34d', open: '#6ee7b7', claimed: '#c084fc' };
const STATUS_LABEL = { 'in-progress': 'Building', open: 'Open', claimed: 'Claimed' };

export default function IdeasPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const currentCat = CATEGORIES.find(c => c.key === activeCategory) || CATEGORIES[0];

  const filtered = useMemo(() =>
    ideas.filter(i => matchesCat(i, currentCat) && matchesQ(i, searchQuery)),
    [activeCategory, searchQuery, currentCat]
  );

  return (
    <div className="min-h-screen" style={{ background: '#060608' }}>
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px]"
          style={{ background: 'radial-gradient(ellipse, rgba(245,158,11,0.06) 0%, transparent 70%)', filter: 'blur(40px)' }} />
      </div>

      {/* HEADER */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-12 pb-6">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Lightbulb className="w-4 h-4" style={{ color: '#f59e0b' }} />
                <span className="text-[11px] font-bold tracking-[0.18em] uppercase" style={{ color: 'rgba(255,255,255,0.3)' }}>IntelOasis</span>
              </div>
              <p className="text-[10px] italic mb-1" style={{ color: 'rgba(255,255,255,0.2)', fontFamily: 'Georgia, serif' }}>
                All ideas are formed via relationship. Jesus said: love God, love people — every idea worth building flows from one of those two.
              </p>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight" style={{ color: 'rgba(255,255,255,0.92)' }}>
                Open Source <span style={{ color: '#f59e0b' }}>Ideas</span>
              </h1>
              <p className="text-[13px] font-light mt-1" style={{ color: 'rgba(255,255,255,0.3)' }}>
                {ideas.length} ideas · take any one, build it, change the world
              </p>
            </div>
            <SuggestionBox />
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'rgba(255,255,255,0.25)' }} />
            <input
              type="text"
              placeholder="Search ideas…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-3 rounded-xl text-[14px] text-white placeholder-white/25 focus:outline-none transition-all"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3.5 top-1/2 -translate-y-1/2" style={{ color: 'rgba(255,255,255,0.3)' }}>
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category pills */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 hide-scrollbar">
            {CATEGORIES.map(cat => {
              const Icon = cat.icon;
              const active = activeCategory === cat.key;
              return (
                <button key={cat.key} onClick={() => setActiveCategory(cat.key)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold flex-shrink-0 transition-all"
                  style={{
                    background: active ? `${cat.accent}20` : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${active ? `${cat.accent}50` : 'rgba(255,255,255,0.08)'}`,
                    color: active ? cat.accent : 'rgba(255,255,255,0.4)',
                  }}>
                  <Icon style={{ width: 10, height: 10 }} />
                  {cat.label}
                </button>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* DIVIDER */}
      <div className="h-px mx-4" style={{ background: 'rgba(255,255,255,0.05)' }} />

      {/* RESULTS */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[11px] font-medium" style={{ color: 'rgba(255,255,255,0.25)' }}>
            {filtered.length} {filtered.length === 1 ? 'idea' : 'ideas'}
            {searchQuery && <span> matching "<em>{searchQuery}</em>"</span>}
          </span>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20" style={{ color: 'rgba(255,255,255,0.2)' }}>No ideas match.</div>
        ) : (
          <div className="space-y-2">
            {filtered.map((idea, i) => {
              const dot = STATUS_DOT[idea.status] || STATUS_DOT.open;
              const label = STATUS_LABEL[idea.status] || 'Open';
              return (
                <motion.div key={idea.id}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: Math.min(i * 0.025, 0.2) }}>
                  <Link to={`/IdeaDetail?id=${idea.id}`}
                    className="flex items-start gap-4 px-4 py-4 rounded-xl transition-all group"
                    style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(245,158,11,0.05)'; e.currentTarget.style.borderColor = 'rgba(245,158,11,0.2)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; }}>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 mb-1">
                        <h3 className="text-[14px] font-semibold leading-snug" style={{ color: 'rgba(255,255,255,0.88)' }}>
                          {idea.title}
                        </h3>
                        <ArrowUpRight className="w-4 h-4 flex-shrink-0 opacity-0 group-hover:opacity-50 transition-opacity mt-0.5" style={{ color: '#f59e0b' }} />
                      </div>
                      <p className="text-[12px] font-light leading-relaxed mb-2" style={{ color: 'rgba(255,255,255,0.35)' }}>
                        {idea.summary.slice(0, 160)}{idea.summary.length > 160 ? '…' : ''}
                      </p>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold"
                          style={{ color: dot }}>
                          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: dot }} />
                          {label}
                        </span>
                        {idea.tags?.slice(0, 4).map(tag => (
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
      </div>
    </div>
  );
}
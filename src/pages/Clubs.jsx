import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ChevronDown, Users, ArrowUpRight, Flame, ChevronLeft } from 'lucide-react';
import clubs, { traditions } from '@/components/clubsData';
import { Link } from 'react-router-dom';

const CLUB_ACCENTS = ['#c8a45a','#a9c4c0','#b48a8a','#9a8fb8','#7ab494','#b4845a','#c8a45a','#a9c4c0','#b48a8a','#7ab494'];

// Theme groups using tag-based matching
const THEMES = [
  { key: 'media',     label: 'Media & Culture',     accent: '#b48a8a', tags: ['News','Film','Music','Sports','Entertainment','Cinema','Television','Wrestling'] },
  { key: 'knowledge', label: 'Knowledge & Learning', accent: '#a9c4c0', tags: ['Law','History','Learning','Mastery','Knowledge','Archive','Archaeology','Education'] },
  { key: 'community', label: 'Community & Safety',   accent: '#7ab494', tags: ['Community Safety','Child Safety','Accountability','Protection','Guardian'] },
  { key: 'wellness',  label: 'Health & Wellness',    accent: '#c8a45a', tags: ['Health','Fitness','Biohacking','Cannabis','Wellness','Performance'] },
  { key: 'tech',      label: 'Tech & Code',          accent: '#a9c4c0', tags: ['Code','Development','AI','Open Source','Bots','Automation','Games','Simulation'] },
  { key: 'lifestyle', label: 'Lifestyle & Home',     accent: '#e8cc8a', tags: ['Food','Cooking','Farming','Household','Maintenance','Habits','Productivity','Covenant'] },
  { key: 'society',   label: 'Society & Philosophy', accent: '#9a8fb8', tags: ['Philosophy','Ethics','Leadership','Economics','Consciousness','Metaphysics','Psychology'] },
];

function matchesTheme(club, theme) {
  const clubTags = (club.tags || []).map(t => t.toLowerCase());
  return theme.tags.some(tt => clubTags.some(ct => ct.includes(tt.toLowerCase()) || tt.toLowerCase().includes(ct)));
}

function matchesSearch(item, q) {
  if (!q) return true;
  const lq = q.toLowerCase();
  return item.title.toLowerCase().includes(lq) || item.summary.toLowerCase().includes(lq) || (item.tags||[]).some(t=>t.toLowerCase().includes(lq));
}

function ClubCard({ club, index }) {
  const [expanded, setExpanded] = useState(false);
  const accent = CLUB_ACCENTS[index % CLUB_ACCENTS.length];

  return (
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: Math.min(index*0.04, 0.28) }}>
      <div className="rounded-xl overflow-hidden transition-all duration-200"
        style={{ background: expanded ? `${accent}06` : 'rgba(255,255,255,0.02)', border: `1px solid ${expanded ? `${accent}25` : 'rgba(255,255,255,0.06)'}` }}>
        <button onClick={() => setExpanded(!expanded)} className="w-full text-left px-4 py-4 flex items-start gap-3">
          <div className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-black"
            style={{ background: `${accent}12`, border: `1px solid ${accent}25`, color: accent }}>
            {String(index + 1).padStart(2, '0')}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-[14px] font-semibold tracking-tight leading-snug mb-1" style={{ color: 'rgba(255,255,255,0.88)' }}>{club.title}</h3>
            <p className="text-[12px] font-light leading-relaxed mb-2" style={{ color: 'rgba(255,255,255,0.28)' }}>{club.summary.slice(0,120)}{club.summary.length > 120 ? '…' : ''}</p>
            <div className="flex flex-wrap gap-1">
              {club.tags?.slice(0, 4).map(tag => (
                <span key={tag} className="px-1.5 py-0.5 rounded text-[10px]"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.22)' }}>{tag}</span>
              ))}
            </div>
          </div>
          <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.25 }} className="flex-shrink-0 mt-1">
            <ChevronDown className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.2)' }} />
          </motion.div>
        </button>
        <AnimatePresence>
          {expanded && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
              <div className="px-4 pb-4">
                <div className="pt-3 space-y-4" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                  {club.sections?.map((s, i) => (
                    <div key={i}>
                      {s.heading && <h4 className="text-[10px] font-bold tracking-widest uppercase mb-1.5" style={{ color: accent }}>{s.heading}</h4>}
                      <p className="text-[12px] font-light leading-relaxed whitespace-pre-line" style={{ color: 'rgba(255,255,255,0.32)' }}>{s.content}</p>
                    </div>
                  ))}
                  {club.vision && (
                    <div className="px-3 py-2.5 rounded-lg" style={{ background: `${accent}08`, border: `1px solid ${accent}20` }}>
                      <p className="text-[12px] italic font-light leading-relaxed" style={{ color: accent, opacity: 0.85 }}>"{club.vision}"</p>
                    </div>
                  )}
                  <Link to={`/IdeaDetail?id=${club.id}`} onClick={e => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-medium"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.4)' }}>
                    <ArrowUpRight className="w-3 h-3" />
                    Full page & share
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function TraditionCard({ item, index }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: Math.min(index*0.06, 0.3) }}>
      <div className="rounded-xl overflow-hidden transition-all duration-200"
        style={{ background: expanded ? 'rgba(251,146,60,0.06)' : 'rgba(255,255,255,0.02)', border: `1px solid ${expanded ? 'rgba(251,146,60,0.25)' : 'rgba(255,255,255,0.06)'}` }}>
        <button onClick={() => setExpanded(!expanded)} className="w-full text-left px-4 py-4 flex items-start gap-3">
          <div className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'rgba(251,146,60,0.12)', border: '1px solid rgba(251,146,60,0.25)' }}>
            <Flame style={{ width: 14, height: 14, color: '#b4845a' }} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-[14px] font-semibold leading-snug mb-0.5" style={{ color: 'rgba(255,255,255,0.88)' }}>{item.title}</h3>
            {item.tagline && <p className="text-[11px] font-medium mb-1" style={{ color: '#b4845a' }}>{item.tagline}</p>}
            <p className="text-[12px] font-light leading-relaxed" style={{ color: 'rgba(255,255,255,0.28)' }}>{item.summary.slice(0,120)}{item.summary.length > 120 ? '…' : ''}</p>
          </div>
          <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.25 }} className="flex-shrink-0 mt-1">
            <ChevronDown className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.2)' }} />
          </motion.div>
        </button>
        <AnimatePresence>
          {expanded && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
              <div className="px-4 pb-4">
                <div className="pt-3 space-y-4" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                  {item.sections?.map((s, i) => (
                    <div key={i}>
                      {s.heading && <h4 className="text-[10px] font-bold tracking-widest uppercase mb-1.5" style={{ color: '#b4845a' }}>{s.heading}</h4>}
                      <p className="text-[12px] font-light leading-relaxed whitespace-pre-line" style={{ color: 'rgba(255,255,255,0.32)' }}>{s.content}</p>
                    </div>
                  ))}
                  {item.vision && (
                    <div className="px-3 py-2.5 rounded-lg" style={{ background: 'rgba(251,146,60,0.08)', border: '1px solid rgba(251,146,60,0.2)' }}>
                      <p className="text-[12px] italic font-light leading-relaxed" style={{ color: '#b4845a', opacity: 0.85 }}>"{item.vision}"</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function Clubs() {
  const [activeTheme, setActiveTheme] = useState(null);
  const [showTraditions, setShowTraditions] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const currentTheme = THEMES.find(t => t.key === activeTheme);

  const displayClubs = useMemo(() => {
    let base;
    if (!activeTheme || activeTheme === '__all__') {
      base = clubs;
    } else {
      base = clubs.filter(c => matchesTheme(c, currentTheme));
    }
    return base.filter(c => matchesSearch(c, searchQuery));
  }, [activeTheme, searchQuery, currentTheme]);

  const themeCounts = useMemo(() => {
    const c = {};
    THEMES.forEach(t => { c[t.key] = clubs.filter(cl => matchesTheme(cl, t)).length; });
    return c;
  }, []);

  return (
    <div className="min-h-screen" style={{ background: 'transparent' }}>
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px]"
          style={{ background: 'radial-gradient(ellipse, rgba(192,132,252,0.06) 0%, transparent 70%)', filter: 'blur(40px)' }} />
      </div>

      <header className="relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-14 pb-10 text-center">
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 text-[10px] font-semibold tracking-[0.15em] uppercase"
            style={{ background: 'rgba(192,132,252,0.08)', border: '1px solid rgba(192,132,252,0.18)', color: '#9a8fb8' }}>
            <Users className="w-3 h-3" />
            Leone University · Official Clubs
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-black tracking-[-0.04em] leading-[1] mb-3"
            style={{ color: 'rgba(255,255,255,0.88)' }}>
            LU<span style={{ color: '#9a8fb8' }}>Clubs</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="text-[14px] font-light max-w-sm mx-auto leading-relaxed mb-6"
            style={{ color: 'rgba(255,255,255,0.28)' }}>
            Every club is a world. Every member, a builder.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="flex justify-center gap-2">
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <span className="text-lg font-bold" style={{ color: '#9a8fb8' }}>{clubs.length}</span>
              <span className="text-[10px] uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.22)' }}>Active Clubs</span>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(192,132,252,0.2), transparent)' }} />
      </header>

      <div className="sticky top-16 z-30 backdrop-blur-xl" style={{ background: 'rgba(6,6,8,0.92)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-4xl mx-auto px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {activeTheme && (
              <button onClick={() => { setActiveTheme(null); setSearchQuery(''); setShowSearch(false); }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-medium"
                style={{ background: 'rgba(192,132,252,0.1)', border: '1px solid rgba(192,132,252,0.25)', color: '#9a8fb8' }}>
                <ChevronLeft className="w-3 h-3" />
                Themes
              </button>
            )}
            {activeTheme && currentTheme && (
              <span className="text-[11px] font-medium" style={{ color: 'rgba(255,255,255,0.4)' }}>
                / {currentTheme.label} ({displayClubs.length})
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {activeTheme && (
              <>
                <AnimatePresence>
                  {showSearch && (
                    <motion.div initial={{ width: 0, opacity: 0 }} animate={{ width: 180, opacity: 1 }} exit={{ width: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3" style={{ color: 'rgba(255,255,255,0.2)' }} />
                        <input autoFocus type="text" placeholder="Search clubs…" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                          className="w-full pl-7 pr-3 py-1.5 text-[12px] rounded-lg text-white placeholder-white/20 focus:outline-none"
                          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(192,132,252,0.2)' }} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <button onClick={() => { setShowSearch(!showSearch); if (showSearch) setSearchQuery(''); }}
                  style={{ color: 'rgba(255,255,255,0.3)' }} className="p-1.5 rounded-lg">
                  {showSearch ? <X className="w-4 h-4" /> : <Search className="w-4 h-4" />}
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <AnimatePresence mode="wait">
          {!activeTheme ? (
            <motion.div key="hub" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mb-3">
                {THEMES.map((theme, i) => (
                  <motion.button key={theme.key}
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.04 }}
                    onClick={() => setActiveTheme(theme.key)}
                    className="group text-left rounded-xl p-3.5 transition-all"
                    style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
                    onMouseEnter={e => { e.currentTarget.style.background = `${theme.accent}08`; e.currentTarget.style.borderColor = `${theme.accent}28`; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; }}>
                    <div className="flex items-center justify-between mb-2.5">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                        style={{ background: `${theme.accent}12`, border: `1px solid ${theme.accent}25` }}>
                        <span style={{ fontSize: 12, color: theme.accent }}>●</span>
                      </div>
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-40 transition-opacity" style={{ color: theme.accent }} />
                    </div>
                    <p className="text-[12px] font-semibold mb-0.5" style={{ color: 'rgba(255,255,255,0.78)' }}>{theme.label}</p>
                    <p className="text-[10px]" style={{ color: 'rgba(255,255,255,0.22)' }}>{themeCounts[theme.key] || 0} clubs</p>
                  </motion.button>
                ))}
              </div>
              <div className="flex gap-2">
                <button onClick={() => setActiveTheme('__all__')}
                  className="flex-1 py-3 rounded-xl text-[12px] font-medium transition-all"
                  style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.3)' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.3)'}>
                  Browse all {clubs.length} clubs →
                </button>
                <button onClick={() => setShowTraditions(true)}
                  className="px-4 py-3 rounded-xl text-[12px] font-medium transition-all flex items-center gap-2"
                  style={{ background: 'rgba(251,146,60,0.06)', border: '1px solid rgba(251,146,60,0.18)', color: '#b4845a' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(251,146,60,0.12)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(251,146,60,0.06)'}>
                  <Flame className="w-3.5 h-3.5" />
                  Traditions ({traditions.length})
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div key={activeTheme + searchQuery} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
              {displayClubs.length === 0 ? (
                <div className="text-center py-24 text-sm" style={{ color: 'rgba(255,255,255,0.2)' }}>No clubs match.</div>
              ) : (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-2">
                  {displayClubs.map((club, i) => <ClubCard key={club.id} club={club} index={i} />)}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Traditions Modal */}
      <AnimatePresence>
        {showTraditions && (
          <motion.div className="fixed inset-0 z-50 overflow-y-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(16px)' }}>
            <div className="max-w-3xl mx-auto px-4 py-12">
              <div className="flex items-center gap-3 mb-6">
                <button onClick={() => setShowTraditions(false)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-medium"
                  style={{ background: 'rgba(251,146,60,0.1)', border: '1px solid rgba(251,146,60,0.25)', color: '#b4845a' }}>
                  <ChevronLeft className="w-3 h-3" />
                  Back
                </button>
                <div>
                  <h2 className="text-[16px] font-bold" style={{ color: 'rgba(255,255,255,0.88)' }}>Traditions</h2>
                  <p className="text-[11px]" style={{ color: 'rgba(255,255,255,0.3)' }}>Living practices passed down, built up, and carried forward</p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {traditions.map((item, i) => <TraditionCard key={item.id} item={item} index={i} />)}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="py-8" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-4xl mx-auto px-6 flex items-center justify-between">
          <span className="text-sm font-light" style={{ color: 'rgba(255,255,255,0.3)' }}>LU<span style={{ color: '#9a8fb8', fontWeight: 900 }}>Clubs</span></span>
          <p className="text-[10px] tracking-[0.2em] uppercase" style={{ color: 'rgba(255,255,255,0.1)' }}>Build Your World</p>
        </div>
      </footer>
    </div>
  );
}
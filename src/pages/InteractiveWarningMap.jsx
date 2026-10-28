import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, X, ChevronRight } from 'lucide-react';

const CHAPTERS = [
  {
    id: 'ignored-truth',
    num: '01',
    label: 'The Ignored Eternal Truth',
    sublabel: 'Present. Ignored. Buried under comfort.',
    color: '#a78bfa',
    desc: 'The warning is not new. The truth has always been here. What is being said now has been said in every era, by every genuine light-bearer, in every tradition.'
  },
  {
    id: 'conquest',
    num: '02',
    label: 'Unification Through Conquest',
    sublabel: 'War. Imposition. The hoarding of truth.',
    color: '#dc2626',
    desc: 'The world has begun unifying through conquest — through war, manipulation, and the deliberate breeding of ignorance.'
  },
  {
    id: 'churches',
    num: '03',
    label: 'Churches as Nations',
    sublabel: 'Power structures masquerading as shepherds.',
    color: '#fcd34d',
    desc: 'Churches are a type of nation. They have become super-nations with wealth, hierarchy, and political reach.'
  },
  {
    id: 'subtraction',
    num: '04',
    label: 'Divine Subtraction & Reversal',
    sublabel: 'Not conquered. Unwoven. Variables returned.',
    color: '#22d3ee',
    desc: 'The Whole Maker will make grand displays of subtraction. Nations will not be conquered — they will be unwoven.'
  },
  {
    id: 'nations',
    num: '05',
    label: 'Nations — Transform or Fall',
    sublabel: 'Some survive through their children. Others vanish.',
    color: '#fb923c',
    desc: 'Some nations will be transformed by younger descendants who change their ways. Others will fall off the map entirely.'
  },
  {
    id: 'rulers',
    num: '06',
    label: 'For Those Who Rule',
    sublabel: 'The shepherd who ignores the sheep is an occupier.',
    color: '#f0abfc',
    desc: 'A designed ruler who abandons their flock has betrayed the function they were placed there to fulfill.'
  },
  {
    id: 'individual',
    num: '07',
    label: 'For the Individual',
    sublabel: 'The reservoir grows. It does not shrink.',
    color: '#22c55e',
    desc: "For the ordinary individual, the calculus has not changed. Seek truth, pursue it honestly."
  },
  {
    id: 'soul-dissolution',
    num: '08',
    label: 'The Personal Supreme Warning',
    sublabel: 'Soul Dissolution — They become the vessel.',
    color: '#f87171',
    desc: 'Those who intentionally chose evil face the dismantling of the soul itself. They become the wineskin.'
  },
];

function CosmicBg() {
  return (
    <div className="fixed inset-0 pointer-events-none">
      <div className="absolute inset-0 cosmic-bg" />
      <motion.div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px]"
        style={{ background: 'radial-gradient(ellipse, rgba(220,38,38,0.1) 0%, transparent 65%)', filter: 'blur(70px)' }} />
      <motion.div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px]"
        style={{ background: 'radial-gradient(ellipse, rgba(245,158,11,0.06) 0%, transparent 65%)', filter: 'blur(70px)' }} />
      {Array.from({ length: 45 }, (_, i) => (
        <motion.div key={i} className="absolute rounded-full bg-white"
          style={{ left: `${(i * 17.3 + 5) % 100}%`, top: `${(i * 13.7 + 3) % 100}%`, width: i % 5 === 0 ? 2 : 1, height: i % 5 === 0 ? 2 : 1 }}
          animate={{ opacity: [0, 0.6, 0] }}
          transition={{ duration: 2 + (i % 4), repeat: Infinity, delay: (i * 0.37) % 6 }} />
      ))}
    </div>
  );
}

function WarningNode({ chapter, index, isActive, onClick }) {
  const isLeft = index % 2 === 0;
  const c = chapter.color;

  return (
    <motion.div
      className="relative flex items-center gap-4 cursor-pointer group"
      style={{ justifyContent: isLeft ? 'flex-start' : 'flex-end' }}
      initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.09 }}
      onClick={() => onClick(chapter)}>

      {!isLeft && (
        <div className="flex-1 h-px opacity-20 group-hover:opacity-50 transition-opacity"
          style={{ background: `linear-gradient(to left, ${c}, transparent)` }} />
      )}

      <motion.div
        className="relative flex-shrink-0 rounded-2xl px-5 py-3.5 transition-all duration-300 glass-panel"
        style={{
          background: isActive ? `${c}18` : `${c}0a`,
          border: `1px solid ${isActive ? c + '60' : c + '28'}`,
          boxShadow: isActive ? `0 0 32px ${c}28` : 'none',
        }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}>

        <div className="absolute -top-2.5 left-3 text-[9px] font-black tracking-widest uppercase px-1.5 py-0.5 rounded"
          style={{ background: '#060608', color: `${c}aa`, border: `1px solid ${c}22` }}>
          {chapter.num}
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-shrink-0">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
            {isActive && (
              <div className="absolute inset-0 rounded-full animate-ping" style={{ background: c, opacity: 0.4 }} />
            )}
          </div>
          <div>
            <p className="text-[14px] font-black tracking-tight glowing-text-white" style={{ color: isActive ? c : 'rgba(255,255,255,0.85)' }}>
              {chapter.label}
            </p>
            <p className="text-[11px] font-light opacity-50">{chapter.sublabel}</p>
          </div>
        </div>

        <ArrowUpRight className="absolute top-2 right-2 w-3 h-3 opacity-0 group-hover:opacity-60 transition-opacity"
          style={{ color: c }} />
      </motion.div>

      {isLeft && (
        <div className="flex-1 h-px opacity-20 group-hover:opacity-50 transition-opacity"
          style={{ background: `linear-gradient(to right, ${c}, transparent)` }} />
      )}
    </motion.div>
  );
}

function DetailPanel({ chapter, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 10 }}
      transition={{ duration: 0.25 }}
      className="rounded-2xl overflow-hidden glass-panel"
      style={{ background: `${chapter.color}08`, border: `1px solid ${chapter.color}30` }}>
      
      <div className="flex items-start justify-between gap-3 p-5 pb-4"
        style={{ borderBottom: `1px solid ${chapter.color}18` }}>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full" style={{ background: chapter.color }} />
            <span className="text-[10px] font-black tracking-widest uppercase glowing-text-white opacity-70">
              Chapter {chapter.num}
            </span>
          </div>
          <h2 className="text-[20px] font-black tracking-tight glowing-text-white">
            {chapter.label}
          </h2>
        </div>
        <button onClick={onClose} className="p-1.5 rounded-lg transition-colors flex-shrink-0 opacity-50 hover:opacity-100"
          style={{ color: 'hsl(var(--foreground))' }}>
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="px-5 pt-4 pb-5 max-h-[55vh] overflow-y-auto">
        <p className="text-[13px] font-light leading-relaxed opacity-70" style={{ fontFamily: 'Georgia, serif' }}>
          {chapter.desc}
        </p>
        <Link to="/supreme-warning" className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-[12px] font-bold transition-all mt-5"
          style={{ background: `${chapter.color}15`, border: `1px solid ${chapter.color}35`, color: chapter.color }}
          onMouseEnter={e => e.currentTarget.style.background = `${chapter.color}25`}
          onMouseLeave={e => e.currentTarget.style.background = `${chapter.color}15`}>
          View Full Original Text →
        </Link>
      </div>
    </motion.div>
  );
}

export default function InteractiveWarningMap() {
  const [activeChapter, setActiveChapter] = useState(null);

  const handleNodeClick = (chapter) => {
    setActiveChapter(prev => prev?.id === chapter.id ? null : chapter);
  };

  return (
    <div className="min-h-screen relative overflow-hidden cosmic-bg">
      <CosmicBg />

      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 w-max max-w-[90vw]">
        <Link to="/supreme-warning"
          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-[11px] font-bold transition-all glass-panel"
          style={{ background: 'rgba(220,38,38,0.15)', border: '1px solid rgba(220,38,38,0.4)', color: 'rgba(248,113,113,0.95)', boxShadow: '0 0 20px rgba(220,38,38,0.2)' }}>
          📖 Read the full warning straight through
          <ChevronRight className="w-3 h-3" />
        </Link>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-12 pb-28">

        {/* Nav */}
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
          className="flex items-center justify-between mb-14">
          <Link to="/" className="inline-flex items-center gap-2 text-[12px] transition-colors glowing-text-white opacity-50 hover:opacity-100">
            ← Back to Home
          </Link>
          <Link to="/supreme-warning" className="text-[11px] transition-colors glowing-text-white opacity-40 hover:opacity-100">
            Read full text →
          </Link>
        </motion.div>

        {/* Hero */}
        <motion.div className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-[10px] font-bold tracking-[0.22em] uppercase glass-panel"
            style={{ background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.28)', color: 'rgba(220,38,38,0.9)' }}>
            <motion.div className="w-1.5 h-1.5 rounded-full bg-red-500"
              animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.4, repeat: Infinity }} />
            Spiritual Physics · Interactive Map
          </div>
          <h1 className="font-serif font-black tracking-[-0.03em] leading-[1] mb-5 glowing-text-white"
            style={{ fontSize: 'clamp(32px, 7vw, 68px)' }}>
            The Map of the<br />
            <span className="glowing-text-gold">Supreme Warning</span>
          </h1>
          <p className="text-[14px] italic font-light max-w-md mx-auto mb-3 opacity-60" style={{ fontFamily: 'Georgia, serif' }}>
            Spiritual Physics Visualized
          </p>
          <p className="text-[12px] font-light max-w-lg mx-auto leading-relaxed opacity-50">
            Eight chapters of the warning. Click any node to expand with the original text.
          </p>
        </motion.div>

        {/* Main layout: Map + Detail Panel */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* Left: The Map */}
          <div className="flex-1 relative min-w-0">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 flex flex-col items-center pointer-events-none" style={{ width: 2 }}>
              <div className="flex-1 w-px" style={{
                background: 'linear-gradient(to bottom, transparent, rgba(220,38,38,0.25) 5%, rgba(252,211,77,0.15) 25%, rgba(167,139,250,0.15) 55%, rgba(248,113,113,0.22) 90%, transparent)',
              }} />
            </div>

            <motion.div className="text-center mb-6"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              <span className="text-[9px] font-bold tracking-[0.3em] uppercase px-3 py-1 rounded-full glass-panel"
                style={{ color: 'rgba(248,113,113,0.6)', border: '1px solid rgba(248,113,113,0.18)', background: 'rgba(248,113,113,0.06)' }}>
                ↑ The Personal Supreme Warning
              </span>
            </motion.div>

            <div className="space-y-3 relative">
              {[...CHAPTERS].reverse().map((chapter, i) => (
                <WarningNode
                  key={chapter.id}
                  chapter={chapter}
                  index={i}
                  isActive={activeChapter?.id === chapter.id}
                  onClick={handleNodeClick}
                />
              ))}
            </div>

            <motion.div className="text-center mt-6"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              <span className="text-[9px] font-bold tracking-[0.3em] uppercase px-3 py-1 rounded-full glass-panel"
                style={{ color: 'rgba(167,139,250,0.6)', border: '1px solid rgba(167,139,250,0.18)', background: 'rgba(167,139,250,0.06)' }}>
                ↓ The Ignored Eternal Truth
              </span>
            </motion.div>

            <motion.div className="mt-10 rounded-2xl p-5 glass-panel"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.5 }}>
              <p className="text-[9px] font-bold tracking-[0.2em] uppercase mb-4 opacity-50">The Warning's Logic</p>
              <div className="flex items-center gap-2 flex-wrap text-[11px]">
                {[
                  'Truth Always Present', '→', 'Ignored for Comfort', '→', 'Conquest Chosen', '→',
                  'Reversal Begins', '→', 'Nations Transform or Fall', '→', 'Souls Face Final Account',
                ].map((step, i) => (
                  <span key={i} style={{ color: step === '→' ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.48)', fontWeight: step !== '→' ? 500 : 300 }}>
                    {step}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Detail Panel */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <AnimatePresence mode="wait">
              {activeChapter ? (
                <DetailPanel key={activeChapter.id} chapter={activeChapter} onClose={() => setActiveChapter(null)} />
              ) : (
                <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="rounded-2xl p-6 text-center glass-panel">
                  <motion.div className="text-4xl mb-4 opacity-40"
                    animate={{ opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 3, repeat: Infinity }}>
                    ✦
                  </motion.div>
                  <p className="text-[13px] font-light mb-5 opacity-60">
                    Click any node on the map to read the full original text for that chapter.
                  </p>
                  <div className="space-y-2">
                    {CHAPTERS.slice(0, 4).map(ch => (
                      <button key={ch.id} onClick={() => setActiveChapter(ch)}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-all glass-panel-hover"
                        style={{ background: `${ch.color}08`, border: `1px solid ${ch.color}18` }}>
                        <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: ch.color }} />
                        <span className="text-[11px] font-medium opacity-70">{ch.label}</span>
                      </button>
                    ))}
                    <p className="text-[10px] pt-1 opacity-30">+ {CHAPTERS.length - 4} more chapters</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div className="mt-4"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
              <div className="rounded-2xl p-4 glass-panel" style={{ background: 'rgba(220,38,38,0.05)', border: '1px solid rgba(220,38,38,0.2)' }}>
                <div className="flex items-center gap-2 mb-2">
                  <motion.div className="w-1.5 h-1.5 rounded-full bg-red-500"
                    animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.6, repeat: Infinity }} />
                  <span className="text-[10px] font-black tracking-[0.2em] uppercase glowing-text-white opacity-70">
                    The Supreme Warning
                  </span>
                </div>
                <p className="text-[11px] font-light leading-relaxed mb-3 opacity-50" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
                  Issued March 29, 2026 · In the earliest hours after midnight. Written by hand — with the intuitive guidance of the Spirit of Truth.
                </p>
                <Link to="/supreme-warning"
                  className="flex items-center justify-center gap-2 py-2 rounded-xl text-[11px] font-bold transition-all glass-panel-hover glowing-border-teal"
                  style={{ background: 'rgba(220,38,38,0.12)', border: '1px solid rgba(220,38,38,0.3)', color: 'rgba(220,38,38,0.85)' }}>
                  Read Full Warning →
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Closing */}
        <motion.div className="mt-20 text-center"
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <div className="h-px mb-12" style={{ background: 'linear-gradient(90deg, transparent, rgba(220,38,38,0.2), rgba(245,158,11,0.2), transparent)' }} />
          <p className="serif text-[17px] italic mb-2 glowing-text-white opacity-70" style={{ fontFamily: 'Georgia, serif' }}>
            "The truth was never newly presented. It has always been here."
          </p>
          <p className="text-[12px] mb-8 opacity-40">
            The reservoir grows. It does not shrink. Even when empires try to dam it, it finds another way through.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/supreme-warning"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-[13px] font-bold glass-panel-hover glowing-border-teal"
              style={{ background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.3)', color: 'rgba(220,38,38,0.88)' }}>
              Read the Full Warning
            </Link>
            <Link to="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-[13px] font-bold glass-panel-hover glowing-border-teal"
              style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.28)', color: 'rgba(167,139,250,0.88)' }}>
              Back to IntelOasis
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
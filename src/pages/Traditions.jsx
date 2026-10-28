import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, ChevronDown, ArrowLeft, ArrowUpRight } from 'lucide-react';
import { traditions } from '@/components/clubsData';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

function TraditionDetail({ item, index }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="rounded-2xl overflow-hidden transition-all duration-300"
        style={{
          background: expanded ? 'rgba(251,146,60,0.05)' : 'rgba(255,255,255,0.02)',
          border: `1px solid ${expanded ? 'rgba(251,146,60,0.3)' : 'rgba(255,255,255,0.07)'}`,
        }}
      >
        {/* Header */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full text-left px-6 py-6 flex items-start gap-5"
        >
          <div
            className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ background: 'rgba(251,146,60,0.12)', border: '1px solid rgba(251,146,60,0.28)' }}
          >
            <Flame className="w-5 h-5" style={{ color: '#b4845a' }} />
          </div>

          <div className="flex-1 min-w-0">
            <h2 className="text-[18px] md:text-[22px] font-semibold tracking-tight leading-snug mb-1" style={{ color: 'rgba(255,255,255,0.92)' }}>
              {item.title}
            </h2>
            {item.tagline && (
              <p className="text-[12px] font-medium mb-2" style={{ color: '#b4845a' }}>{item.tagline}</p>
            )}
            <p className="text-[13px] font-light leading-relaxed" style={{ color: 'rgba(255,255,255,0.32)' }}>
              {item.summary}
            </p>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {item.tags?.map(tag => (
                <span key={tag} className="px-2 py-0.5 rounded-full text-[10px]"
                  style={{ background: 'rgba(251,146,60,0.08)', border: '1px solid rgba(251,146,60,0.15)', color: 'rgba(251,146,60,0.7)' }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.25 }} className="flex-shrink-0 mt-1">
            <ChevronDown className="w-5 h-5" style={{ color: 'rgba(255,255,255,0.2)' }} />
          </motion.div>
        </button>

        {/* Expanded Content */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-8">
                <div className="space-y-8" style={{ borderTop: '1px solid rgba(251,146,60,0.1)', paddingTop: '28px' }}>
                  {item.sections?.map((s, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: i * 0.06 }}
                    >
                      {s.heading && (
                        <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase mb-3" style={{ color: '#b4845a' }}>
                          {s.heading}
                        </h4>
                      )}
                      <p className="text-[14px] font-light leading-[1.8] whitespace-pre-line" style={{ color: 'rgba(255,255,255,0.5)' }}>
                        {s.content}
                      </p>
                    </motion.div>
                  ))}

                  {item.vision && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                      className="px-6 py-5 rounded-2xl"
                      style={{ background: 'rgba(251,146,60,0.06)', border: '1px solid rgba(251,146,60,0.18)' }}
                    >
                      <p className="text-[15px] italic font-light leading-relaxed" style={{ color: '#b4845a', opacity: 0.85 }}>
                        "{item.vision}"
                      </p>
                    </motion.div>
                  )}

                  <Link
                    to={createPageUrl(`IdeaDetail?id=${item.id}`)}
                    onClick={e => e.stopPropagation()}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[12px] font-medium transition-all"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.4)' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
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

export default function Traditions() {
  return (
    <div className="min-h-screen" style={{ background: 'transparent' }}>

      {/* Ambient */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full blur-[200px]"
          style={{ background: 'radial-gradient(ellipse, rgba(251,146,60,0.07) 0%, rgba(180,83,9,0.04) 50%, transparent 100%)' }} />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[150px]"
          style={{ background: 'rgba(251,146,60,0.04)' }} />
      </div>

      <div className="relative">

        {/* HERO */}
        <header className="max-w-4xl mx-auto px-6 pt-14 pb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-8 text-[10px] font-semibold tracking-[0.15em] uppercase"
            style={{ background: 'rgba(251,146,60,0.08)', border: '1px solid rgba(251,146,60,0.2)', color: '#b4845a' }}
          >
            <Flame className="w-3 h-3" />
            Leone University · Living Traditions
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-extralight tracking-[-0.04em] leading-[0.9] mb-4"
            style={{ fontSize: 'clamp(52px, 11vw, 100px)', color: 'rgba(255,255,255,0.85)' }}
          >
            Tradi<span className="font-black" style={{ color: '#b4845a' }}>tions</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mx-auto mb-6 h-px max-w-xs"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(251,146,60,0.5), rgba(251,191,36,0.4), rgba(251,146,60,0.5), transparent)' }}
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-[15px] font-light max-w-xl mx-auto leading-relaxed mb-8"
            style={{ color: 'rgba(255,255,255,0.3)' }}
          >
            Practices passed down, built up, and carried forward. Not rules — rituals. Ways of living that create honesty,
            closeness, and the kind of depth that most people are quietly starving for.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex justify-center items-center gap-4"
          >
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <span className="text-lg font-bold" style={{ color: '#b4845a' }}>{traditions.length}</span>
              <span className="text-[10px] uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.22)' }}>Traditions</span>
            </div>
            <Link
              to={createPageUrl('Clubs')}
              className="flex items-center gap-1.5 text-[11px] transition-colors"
              style={{ color: 'rgba(255,255,255,0.2)' }}
              onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.2)'}
            >
              <ArrowLeft className="w-3 h-3" />
              Back to Clubs
            </Link>
          </motion.div>
        </header>

        {/* TRADITIONS LIST */}
        <main className="max-w-4xl mx-auto px-4 md:px-6 pb-16">
          <div className="space-y-4">
            {traditions.map((item, i) => (
              <TraditionDetail key={item.id} item={item} index={i} />
            ))}
          </div>
        </main>

        {/* FOOTER */}
        <footer className="py-8" style={{ borderTop: '1px solid rgba(251,146,60,0.07)' }}>
          <div className="max-w-4xl mx-auto px-6 flex items-center justify-between">
            <span className="text-sm font-light" style={{ color: 'rgba(255,255,255,0.3)' }}>
              Tradi<span className="font-black" style={{ color: '#b4845a' }}>tions</span>
              <span className="ml-2" style={{ color: 'rgba(255,255,255,0.12)' }}>· Leone University</span>
            </span>
            <p className="text-[10px] tracking-[0.2em] uppercase" style={{ color: 'rgba(255,255,255,0.12)' }}>
              Living Practices
            </p>
          </div>
        </footer>

      </div>
    </div>
  );
}
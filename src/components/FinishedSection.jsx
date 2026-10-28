import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ChevronDown, CheckCircle2, Star } from 'lucide-react';
import finished from '@/components/finishedData';

function FinishedCard({ item, index }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.08, 0.3), ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="rounded-2xl overflow-hidden transition-all duration-300"
        style={{
          background: expanded ? `${item.accent}07` : 'rgba(255,255,255,0.025)',
          border: `1px solid ${expanded ? `${item.accent}35` : `${item.accent}20`}`,
        }}>

        <button onClick={() => setExpanded(!expanded)} className="w-full text-left px-5 py-4 flex items-start gap-4">
          {/* Live badge */}
          <div className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: `${item.accent}15`, border: `1px solid ${item.accent}30` }}>
            <CheckCircle2 style={{ width: 16, height: 16, color: item.accent }} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
              <div>
                <h3 className="text-[16px] font-bold tracking-tight" style={{ color: 'rgba(255,255,255,0.92)' }}>{item.title}</h3>
                <p className="text-[11px] font-medium mt-0.5" style={{ color: item.accent }}>{item.tagline}</p>
              </div>
              <span className="flex-shrink-0 text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full"
                style={{ background: `${item.accent}15`, border: `1px solid ${item.accent}30`, color: item.accent }}>
                ✓ Live
              </span>
            </div>
            <p className="text-[12px] font-light leading-relaxed mt-1" style={{ color: 'rgba(255,255,255,0.3)' }}>{item.summary}</p>
            <div className="flex flex-wrap gap-1 mt-2">
              {item.tags?.slice(0, 5).map(tag => (
                <span key={tag} className="px-1.5 py-0.5 rounded-full text-[10px]"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.22)' }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.25 }} className="flex-shrink-0 mt-1">
            <ChevronDown className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.25)' }} />
          </motion.div>
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
              <div className="px-5 pb-5">
                <div className="pt-4 space-y-4" style={{ borderTop: `1px solid ${item.accent}15` }}>
                  {/* Assessment */}
                  <div>
                    <div className="flex items-center gap-1.5 mb-2">
                      <Star style={{ width: 11, height: 11, color: item.accent }} />
                      <h4 className="text-[10px] font-bold tracking-widest uppercase" style={{ color: item.accent }}>Assessment</h4>
                    </div>
                    <p className="text-[12px] font-light leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>{item.assessment}</p>
                  </div>

                  {/* CTA */}
                  <a href={item.url} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[12px] font-semibold transition-all"
                    style={{ background: `${item.accent}15`, border: `1px solid ${item.accent}35`, color: item.accent }}
                    onMouseEnter={e => { e.currentTarget.style.background = `${item.accent}25`; }}
                    onMouseLeave={e => { e.currentTarget.style.background = `${item.accent}15`; }}>
                    <ExternalLink className="w-3.5 h-3.5" />
                    Visit {item.urlLabel}
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function FinishedSection() {
  return (
    <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(134,239,172,0.2)', background: 'rgba(134,239,172,0.02)' }}>
      {/* Header */}
      <div className="px-5 py-4 flex items-center gap-4" style={{ borderBottom: '1px solid rgba(134,239,172,0.1)' }}>
        <div className="flex items-center gap-3 flex-1">
          <div className="w-2 h-2 rounded-full bg-[#c8a45a] animate-pulse" />
          <div>
            <h3 className="text-[14px] font-semibold tracking-tight" style={{ color: 'rgba(255,255,255,0.85)' }}>Finished & Live</h3>
            <p className="text-[11px] mt-0.5" style={{ color: 'rgba(255,255,255,0.28)' }}>Completed Leone University projects — open to the world</p>
          </div>
        </div>
        <span className="text-[12px] font-semibold px-2.5 py-1 rounded-full"
          style={{ background: 'rgba(134,239,172,0.15)', color: '#7ab494' }}>
          {finished.length}
        </span>
      </div>

      {/* Cards */}
      <div className="px-3 pb-3 pt-3 grid grid-cols-1 xl:grid-cols-2 gap-2">
        {finished.map((item, i) => <FinishedCard key={item.id} item={item} index={i} />)}
      </div>
    </div>
  );
}
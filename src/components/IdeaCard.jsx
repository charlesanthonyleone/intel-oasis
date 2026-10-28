import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Building2, Globe, Sparkles, ArrowUpRight, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const statusConfig = {
  'in-progress': { label: 'In Progress', dot: '#fcd34d',   color: '#fcd34d' },
  'open':        { label: 'Open',        dot: '#6ee7b7',   color: '#6ee7b7' },
  'claimed':     { label: 'Claimed',     dot: '#c084fc',   color: '#c084fc' },
};

export default function IdeaCard({ idea, index }) {
  const [expanded, setExpanded] = useState(false);
  const status = statusConfig[idea.status] || statusConfig['open'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.25), ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="rounded-2xl overflow-hidden transition-all duration-300"
        style={{
          background: expanded ? 'rgba(245,158,11,0.04)' : 'rgba(255,255,255,0.02)',
          border: `1px solid ${expanded ? 'rgba(245,158,11,0.2)' : 'rgba(255,255,255,0.06)'}`,
        }}>

        <button onClick={() => setExpanded(!expanded)} className="w-full text-left px-5 py-4 flex items-start gap-3">
          <div className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-bold mt-0.5"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.25)' }}>
            {String(index + 1).padStart(2, '0')}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-[14px] font-semibold leading-snug mb-1.5 pr-2" style={{ color: 'rgba(255,255,255,0.88)' }}>
              {idea.title}
            </h3>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium tracking-wide uppercase"
                style={{ background: `${status.color}12`, border: `1px solid ${status.color}28`, color: status.color }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: status.dot }} />
                {status.label}
              </span>
              {idea.utilizingEntity && (
                <span className="inline-flex items-center gap-1 text-[11px]" style={{ color: 'rgba(255,255,255,0.22)' }}>
                  <Building2 className="w-2.5 h-2.5" />
                  {idea.utilizingEntity}
                </span>
              )}
            </div>
            <p className="text-[12px] font-light leading-relaxed" style={{ color: 'rgba(255,255,255,0.28)' }}>
              {idea.summary}
            </p>
            {idea.tags && (
              <div className="flex flex-wrap gap-1 mt-2">
                {idea.tags.slice(0, 5).map(tag => (
                  <span key={tag} className="px-1.5 py-0.5 rounded-full text-[10px]"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.2)' }}>
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.25 }} className="flex-shrink-0 mt-1">
            <ChevronDown className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.2)' }} />
          </motion.div>
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
              <div className="px-5 pb-5">
                <div className="pt-4 space-y-4" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                  {idea.sections?.map((section, i) => (
                    <div key={i}>
                      {section.heading && (
                        <h4 className="text-[10px] font-semibold tracking-widest uppercase mb-1.5" style={{ color: '#fcd34d' }}>
                          {section.heading}
                        </h4>
                      )}
                      <p className="text-[12px] font-light leading-relaxed whitespace-pre-line" style={{ color: 'rgba(255,255,255,0.32)' }}>
                        {section.content}
                      </p>
                    </div>
                  ))}
                  {idea.vision && (
                    <div className="px-4 py-3 rounded-xl" style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.15)' }}>
                      <p className="text-[12px] italic font-light leading-relaxed" style={{ color: 'rgba(252,211,77,0.75)' }}>"{idea.vision}"</p>
                    </div>
                  )}
                  <Link to={createPageUrl(`IdeaDetail?id=${idea.id}`)} onClick={e => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-medium transition-all"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.38)' }}>
                    <ArrowUpRight className="w-3 h-3" />
                    Open full page & share
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
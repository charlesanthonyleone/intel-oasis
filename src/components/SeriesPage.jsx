import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, BookOpen, ChevronRight } from 'lucide-react';

export default function SeriesPage({ series, papers, book, allItems }) {
  const Icon = series.icon;
  const isStringIcon = typeof Icon === 'string';

  return (
    <div className="min-h-screen" style={{ background: '#060608' }}>
      {/* Ambient */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px]"
          style={{ background: `radial-gradient(ellipse at center, ${series.accent}10 0%, transparent 65%)`, filter: 'blur(50px)' }} />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px]"
          style={{ background: `radial-gradient(ellipse, ${series.accent}06 0%, transparent 70%)`, filter: 'blur(40px)' }} />
      </div>

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 py-14">

        {/* Back */}
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <Link to="/Books" className="inline-flex items-center gap-2 text-[12px] mb-10 transition-colors"
            style={{ color: 'rgba(255,255,255,0.25)' }}
            onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.25)'}>
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Written Works
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5 text-[10px] font-bold tracking-[0.2em] uppercase"
            style={{ background: `${series.accent}10`, border: `1px solid ${series.accent}28`, color: series.accent }}>
            {isStringIcon ? <span>{Icon}</span> : <Icon style={{ width: 11, height: 11 }} />}
            {series.badge}
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-[-0.04em] leading-[1.05] mb-4"
            style={{ color: 'rgba(255,255,255,0.92)' }}>
            {series.label}
          </h1>
          <p className="text-[16px] italic mb-3" style={{ color: series.accent, opacity: 0.85 }}>{series.tagline}</p>
          <p className="text-[14px] font-light leading-relaxed max-w-xl" style={{ color: 'rgba(255,255,255,0.35)' }}>
            {series.desc}
          </p>

          {series.quote && (
            <div className="mt-6 p-4 rounded-xl" style={{ background: `${series.accent}06`, border: `1px solid ${series.accent}16` }}>
              <p className="text-[13px] italic font-light leading-relaxed text-center" style={{ color: 'rgba(255,255,255,0.45)' }}>
                "{series.quote}"
              </p>
            </div>
          )}
        </motion.div>

        {/* Papers */}
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-6">
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase mb-3" style={{ color: 'rgba(255,255,255,0.2)' }}>
            The Papers
          </p>
          <div className="rounded-2xl overflow-hidden"
            style={{ background: `${series.accent}03`, border: `1px solid ${series.accent}14` }}>
            {papers.map((item, i) => (
              <Link key={item.id} to={`/IdeaDetail?id=${item.id}`}
                className="flex items-center gap-4 px-5 py-4 group transition-all"
                style={{ borderBottom: i < papers.length - 1 ? `1px solid ${series.accent}0a` : 'none' }}
                onMouseEnter={e => e.currentTarget.style.background = `${series.accent}09`}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                <span className="text-[11px] font-black w-5 flex-shrink-0 text-center"
                  style={{ color: `${series.accent}80` }}>
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-semibold leading-snug" style={{ color: 'rgba(255,255,255,0.88)' }}>{item.title}</p>
                  {item.tagline && (
                    <p className="text-[12px] font-light mt-0.5" style={{ color: 'rgba(255,255,255,0.28)' }}>{item.tagline}</p>
                  )}
                  {!item.tagline && item.summary && (
                    <p className="text-[12px] font-light mt-0.5 truncate" style={{ color: 'rgba(255,255,255,0.28)' }}>
                      {item.summary.slice(0, 100)}…
                    </p>
                  )}
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 flex-shrink-0 opacity-0 group-hover:opacity-50 transition-opacity"
                  style={{ color: series.accent }} />
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Book */}
        {book && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }}>
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase mb-3" style={{ color: 'rgba(255,255,255,0.2)' }}>
              The Book
            </p>
            <Link to={`/IdeaDetail?id=${book.id}`}
              className="flex items-center gap-4 px-5 py-5 rounded-2xl group transition-all"
              style={{ background: `${series.accent}09`, border: `1px solid ${series.accent}25` }}
              onMouseEnter={e => { e.currentTarget.style.background = `${series.accent}14`; e.currentTarget.style.borderColor = `${series.accent}40`; }}
              onMouseLeave={e => { e.currentTarget.style.background = `${series.accent}09`; e.currentTarget.style.borderColor = `${series.accent}25`; }}>
              <BookOpen style={{ width: 16, height: 16, color: series.accent, flexShrink: 0 }} />
              <div className="flex-1 min-w-0">
                <p className="text-[15px] font-bold" style={{ color: series.accent }}>{book.title}</p>
                {book.summary && (
                  <p className="text-[12px] font-light mt-1 leading-relaxed" style={{ color: 'rgba(255,255,255,0.3)' }}>
                    {book.summary.slice(0, 140)}…
                  </p>
                )}
              </div>
              <ArrowUpRight className="w-4 h-4 flex-shrink-0 opacity-30 group-hover:opacity-80 transition-opacity"
                style={{ color: series.accent }} />
            </Link>
          </motion.div>
        )}

        <div className="mt-12 text-center">
          <Link to="/Books"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[12px] font-medium transition-all"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.35)' }}
            onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.35)'}>
            <ArrowLeft className="w-3 h-3" />
            Back to Written Works
          </Link>
        </div>

      </div>
    </div>
  );
}
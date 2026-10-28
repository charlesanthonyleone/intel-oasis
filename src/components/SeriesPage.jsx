import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, BookOpen } from 'lucide-react';
import OasisScene from '@/components/OasisScene';
import Reveal from '@/components/Reveal';

const ROMAN = ['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII','XIII','XIV','XV','XVI','XVII','XVIII','XIX','XX'];

export default function SeriesPage({ series, papers, book }) {
  const Icon = series.icon;
  const isStringIcon = typeof Icon === 'string';
  const a = series.accent;
  const reduce = useReducedMotion();
  const up = (d) => reduce ? {} : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay: d, ease: [0.2, 0.7, 0.2, 1] } };

  return (
    <div className="relative">
      <header className="relative -mt-16 pt-16 overflow-hidden" style={{ minHeight: '68vh' }}>
        <div className="absolute inset-0" style={{ WebkitMaskImage: 'linear-gradient(180deg, #000 65%, transparent)', maskImage: 'linear-gradient(180deg, #000 65%, transparent)' }}>
          <OasisScene variant="backdrop" />
        <div className="absolute inset-0 mix-blend-screen" style={{ background: `radial-gradient(ellipse 70% 70% at 30% 20%, ${a}38, transparent 65%), radial-gradient(ellipse 60% 50% at 0% 100%, ${a}1c, transparent 70%)` }} />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-10 pb-20">
          <Link to="/Books" className="flex w-fit items-center gap-2 text-[13px] mb-14 text-white/50 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Written Works
          </Link>
          <motion.div {...up(0)} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-6 eyebrow"
            style={{ background: `${a}18`, border: `1px solid ${a}44`, color: a }}>
            {isStringIcon ? <span>{Icon}</span> : <Icon style={{ width: 13, height: 13 }} />}
            {series.badge}
          </motion.div>
          <motion.h1 {...up(0.1)} className="font-display font-semibold leading-[0.98] tracking-[-0.01em] text-white mb-6" style={{ fontSize: 'clamp(44px, 8vw, 96px)', textShadow: `0 0 60px ${a}55` }}>
            {series.label}
          </motion.h1>
          <motion.p {...up(0.2)} className="font-display italic text-2xl md:text-3xl mb-5" style={{ color: a }}>{series.tagline}</motion.p>
          <motion.p {...up(0.3)} className="text-[16px] leading-relaxed max-w-2xl" style={{ color: 'rgba(232,238,245,0.7)' }}>{series.desc}</motion.p>
          {series.quote && (
            <motion.blockquote {...up(0.4)} className="mt-8 max-w-2xl pl-5 font-display italic text-xl" style={{ borderLeft: `2px solid ${a}`, color: 'rgba(232,238,245,0.75)' }}>
              "{series.quote}"
            </motion.blockquote>
          )}
        </div>
      </header>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 pb-16">
        <Reveal><p className="eyebrow mb-5" style={{ color: a }}>The Papers</p></Reveal>
        <div className="grid sm:grid-cols-2 gap-4 mb-14">
          {papers.map((item, i) => (
            <Reveal key={item.id} delay={(i % 2) * 0.06} className="h-full">
              <Link to={`/IdeaDetail?id=${item.id}`} className="group relative flex flex-col h-full rounded-2xl p-6 glass glass-hover overflow-hidden">
                <span className="absolute -right-2 -top-6 font-display font-semibold select-none pointer-events-none" style={{ fontSize: 120, color: `${a}14` }} aria-hidden>{ROMAN[i] || i + 1}</span>
                <span className="font-display text-xl mb-4" style={{ color: a }}>{ROMAN[i] || i + 1}</span>
                <p className="font-display text-[26px] font-semibold leading-[1.1] text-white mb-2 relative">{item.title}</p>
                {item.tagline && <p className="text-[14px] relative" style={{ color: 'rgba(232,238,245,0.6)' }}>{item.tagline}</p>}
                {!item.tagline && item.summary && <p className="text-[14px] line-clamp-3 relative" style={{ color: 'rgba(232,238,245,0.55)' }}>{item.summary}</p>}
                <span className="mt-auto pt-6 inline-flex items-center gap-1.5 text-[12px] font-semibold opacity-60 group-hover:opacity-100 transition-opacity" style={{ color: a }}>
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        {book && (
          <Reveal>
            <p className="eyebrow mb-5" style={{ color: a }}>The Book</p>
            <Link to={`/IdeaDetail?id=${book.id}`} className="group relative flex flex-col md:flex-row gap-8 items-start md:items-center rounded-3xl p-7 md:p-10 overflow-hidden glass-hover"
              style={{ background: `linear-gradient(120deg, ${a}26, ${a}08 55%, rgba(255,255,255,0.015))`, border: `1px solid ${a}55` }}>
              <div className="flex-shrink-0 w-28 h-40 rounded-md relative flex items-end p-3" style={{ background: `linear-gradient(160deg, ${a}, ${a}55 60%, #0b1220)`, boxShadow: `0 20px 50px -15px ${a}88, inset 4px 0 0 rgba(0,0,0,0.25)` }}>
                <BookOpen className="w-6 h-6 text-white/80" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-display text-3xl md:text-4xl font-semibold leading-tight text-white mb-3">{book.title}</p>
                {book.summary && <p className="text-[15px] leading-relaxed line-clamp-3" style={{ color: 'rgba(232,238,245,0.65)' }}>{book.summary}</p>}
              </div>
              <ArrowUpRight className="absolute top-6 right-6 w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity" style={{ color: a }} />
            </Link>
          </Reveal>
        )}

        <div className="mt-14 text-center">
          <Link to="/Books" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] glass glass-hover text-white/70 hover:text-white">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Written Works
          </Link>
        </div>
      </div>
    </div>
  );
}

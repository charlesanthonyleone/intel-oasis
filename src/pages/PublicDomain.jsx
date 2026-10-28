import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, ArrowUpRight, Flame, ChevronRight, ExternalLink } from 'lucide-react';

import PUBLIC_DOMAIN_IDEAS from '@/data/publicDomain.json';
const STATUS_DOT = { 'in-progress': '#e8cc8a', open: '#7ab494', claimed: '#9a8fb8' };
const STATUS_LABEL = { 'in-progress': 'Building', open: 'Open', claimed: 'Claimed' };

export default function PublicDomain() {
  const [expanded, setExpanded] = useState(null);

  return (
    <div className="min-h-screen" style={{ background: 'transparent' }}>
      {/* Ambient */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px]"
          style={{ background: 'radial-gradient(ellipse, rgba(239,68,68,0.07) 0%, transparent 70%)', filter: 'blur(40px)' }} />
        <div className="absolute bottom-0 right-0 w-[500px] h-[400px]"
          style={{ background: 'radial-gradient(ellipse, rgba(239,68,68,0.04) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-12 pb-16">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-4 h-4" style={{ color: '#b48a8a' }} />
            <span className="text-[11px] font-bold tracking-[0.18em] uppercase" style={{ color: 'rgba(255,255,255,0.3)' }}>IntelOasis</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2" style={{ color: 'rgba(255,255,255,0.92)' }}>
            Public <span style={{ color: '#b48a8a' }}>Domain</span>
          </h1>

          {/* Manifesto block */}
          <div className="rounded-2xl px-6 py-5 mb-8 mt-4"
            style={{ background: 'rgba(239,68,68,0.04)', border: '1px solid rgba(239,68,68,0.14)' }}>
            <p className="text-[13px] font-light leading-relaxed mb-3" style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
              "There are ideas that cannot exist within the bounds of existing law, jurisdiction, or liability frameworks — not because they are immoral, but because the protective apparatus of civilization has, in protecting against the worst outcomes, also made the best ones impossible."
            </p>
            <p className="text-[13px] font-light leading-relaxed mb-3" style={{ color: 'rgba(255,255,255,0.45)' }}>
              The Public Domain is the space where those ideas live. Every entry here requires a zone where the usual rules do not apply — because the usual rules prevent the specific thing from existing. This is not anarchism. It is the deliberate construction of space for human beings to operate, by mutual agreement and full understanding of consequence, at the edge of what civilization has so far been willing to permit.
            </p>
            <p className="text-[13px] font-light leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Michelle Mouton stopped racing when they banned the riskier cars. Risk is what propels. Risk is what evolves. There are tame sports to show what exists — and then there is the space where no one is held liable, where international law does not reach, where every person is their own jurisdiction. This page is where we begin building that world.
            </p>
          </div>

          {/* Warning badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-8 text-[11px] font-bold"
            style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#b48a8a' }}>
            <Flame className="w-3 h-3" />
            No laws exist here. No liability. No jurisdiction. Enter with full understanding.
          </div>
        </motion.div>

        {/* Divider */}
        <div className="h-px mb-8" style={{ background: 'rgba(239,68,68,0.15)' }} />

        {/* Ideas */}
        <div className="space-y-4">
          {PUBLIC_DOMAIN_IDEAS.map((idea, i) => {
            const dot = STATUS_DOT[idea.status] || STATUS_DOT.open;
            const label = STATUS_LABEL[idea.status] || 'Open';
            const isOpen = expanded === idea.id;

            return (
              <motion.div key={idea.id}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}>
                <div className="rounded-2xl overflow-hidden transition-all"
                  style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${isOpen ? 'rgba(239,68,68,0.25)' : 'rgba(255,255,255,0.06)'}` }}>

                  {/* Card header */}
                  <button
                    className="w-full text-left px-5 py-5 group"
                    onClick={() => setExpanded(isOpen ? null : idea.id)}>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold"
                            style={{ color: dot }}>
                            <span className="w-1.5 h-1.5 rounded-full" style={{ background: dot }} />
                            {label}
                          </span>
                          {idea.tags?.slice(0, 4).map(tag => (
                            <span key={tag} className="px-1.5 py-0.5 rounded text-[10px]"
                              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.25)' }}>
                              {tag}
                            </span>
                          ))}
                        </div>
                        <h2 className="text-[16px] font-black leading-snug mb-1" style={{ color: 'rgba(255,255,255,0.9)' }}>
                          {idea.title}
                        </h2>
                        <p className="text-[12px] italic mb-2" style={{ color: 'rgba(239,68,68,0.75)', fontFamily: 'Georgia, serif' }}>
                          {idea.tagline}
                        </p>
                        <p className="text-[12px] font-light leading-relaxed" style={{ color: 'rgba(255,255,255,0.35)' }}>
                          {idea.summary.slice(0, 200)}{idea.summary.length > 200 ? '…' : ''}
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 flex-shrink-0 mt-1 transition-transform"
                        style={{ color: 'rgba(239,68,68,0.5)', transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)' }} />
                    </div>
                  </button>

                  {/* Expanded content */}
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}>
                      <div className="px-5 pb-6" style={{ borderTop: '1px solid rgba(239,68,68,0.1)' }}>
                        <div className="pt-5 space-y-5">
                          {idea.sections.map((section, si) => (
                            <div key={si}>
                              <h3 className="text-[12px] font-black tracking-widest uppercase mb-2"
                                style={{ color: '#b48a8a', opacity: 0.8 }}>
                                {section.heading}
                              </h3>
                              <p className="text-[13px] font-light leading-relaxed whitespace-pre-line"
                                style={{ color: 'rgba(255,255,255,0.5)' }}>
                                {section.content}
                              </p>
                            </div>
                          ))}
                          {idea.vision && (
                            <div className="rounded-xl px-5 py-4 mt-4"
                              style={{ background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.12)' }}>
                              <p className="text-[12px] italic font-light leading-relaxed"
                                style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'Georgia, serif' }}>
                                "{idea.vision}"
                              </p>
                            </div>
                          )}
                          {idea.seriesLink && (
                            <Link to={idea.seriesLink}
                              className="inline-flex items-center gap-2 mt-4 text-[12px] font-semibold transition-opacity hover:opacity-100 opacity-60"
                              style={{ color: '#b48a8a' }}>
                              {idea.seriesLabel} <ExternalLink className="w-3 h-3" />
                            </Link>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* More coming */}
        <div className="mt-12 text-center">
          <p className="text-[11px] font-medium" style={{ color: 'rgba(255,255,255,0.15)' }}>
            More entries forming. The domain is open.
          </p>
        </div>
      </div>
    </div>
  );
}
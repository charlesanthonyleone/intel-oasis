import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Share2, Tag, Building2, CheckCircle, Clock, Lightbulb, Quote } from 'lucide-react';
import { createPageUrl } from '@/utils';
import { Link, useSearchParams } from 'react-router-dom';
import publicDomain from '@/data/publicDomain.json';
import { series as allSeries } from '@/components/booksAndLawData';
import ideas from '@/components/ideasData';
import clubs, { traditions } from '@/components/clubsData';
import booksAndLaw from '@/components/booksAndLawData';
import softwareIdeas from '@/components/softwareData';

const allIdeas = [...ideas, ...clubs, ...traditions, ...booksAndLaw, ...softwareIdeas, ...publicDomain];

const statusConfig = {
  'in-progress': { label: 'In Progress', color: 'bg-amber-500/10 text-amber-400 border-amber-500/20', icon: Clock },
  open:          { label: 'Open',         color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', icon: Lightbulb },
  concept:       { label: 'Concept',      color: 'bg-sky-500/10 text-sky-400 border-sky-500/20', icon: Lightbulb },
  done:          { label: 'Complete',     color: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20', icon: CheckCircle },
};

export default function IdeaDetail() {
  const [params] = useSearchParams();
  const rawId = params.get('id');
  // Handle both numeric and string IDs
  const id = isNaN(rawId) ? rawId : parseInt(rawId, 10);

  const idea = useMemo(() => allIdeas.find((i) => i.id === id || String(i.id) === String(id)), [id]);
  const inSeries = idea && idea.series ? allSeries.find(x => x.key === idea.series) : null;

  if (!idea) {
    return (
      <div className="min-h-screen bg-[#0A0A0B] flex flex-col items-center justify-center gap-4">
        <p className="text-white/30 text-lg font-light">Idea not found.</p>
        <Link to={createPageUrl('Home')} className="text-amber-400 hover:text-amber-300 text-sm flex items-center gap-1 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to IntelOasis
        </Link>
      </div>
    );
  }

  const status = statusConfig[idea.status] || statusConfig['open'];
  const StatusIcon = status.icon;

  function copyLink() {
    navigator.clipboard.writeText(window.location.href);
  }

  // Determine back link based on idea type
  const backPage = inSeries ? `series/${inSeries.key}` : String(idea.id).startsWith('pd-') ? 'PublicDomain' : idea.category === 'club' ? 'Clubs' : (['book','law','medical','fiction'].includes(idea.category)) ? 'Books' : 'Ideas';
  const backLabel = inSeries ? inSeries.label : String(idea.id).startsWith('pd-') ? 'Public Domain' : idea.category === 'club' ? 'LU Clubs' : (['book','law','medical','fiction'].includes(idea.category)) ? 'The Library' : 'IntelOasis';

  return (
    <div className="min-h-screen bg-[#0A0A0B] noise-bg">
      {/* Header */}
      <div className="sticky top-10 z-20 bg-[#0A0A0B]/95 backdrop-blur-xl border-b border-white/[0.05]">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to={createPageUrl(backPage)} className="flex items-center gap-2 text-sm text-white/30 hover:text-white/70 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            {backLabel}
          </Link>
          <button onClick={copyLink}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-xs text-white/40 hover:text-white/70 hover:border-white/[0.1] transition-all">
            <Share2 className="w-3.5 h-3.5" />
            Share
          </button>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-20">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-medium ${status.color}`}>
              <StatusIcon className="w-3 h-3" />
              {status.label}
            </span>
            {idea.utilizingEntity && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] text-white/30 text-xs font-medium border border-white/[0.06]">
                <Building2 className="w-3 h-3" />
                {idea.utilizingEntity}
              </span>
            )}
            {idea.category && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] text-white/30 text-xs font-medium border border-white/[0.06] capitalize">
                {idea.category}
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-[52px] font-light text-white/95 tracking-tight leading-[1.1] mb-4">
            {idea.title}
          </h1>

          {/* Tagline (software ideas) */}
          {idea.tagline && (
            <p className="text-lg text-cyan-400 font-medium mb-4">{idea.tagline}</p>
          )}

          {/* Summary */}
          <p className="text-lg text-white/40 font-light leading-relaxed mb-8 border-l-2 border-amber-500/40 pl-5">
            {idea.summary}
          </p>

          {/* Tags */}
          {idea.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-12">
              {idea.tags.map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/[0.04] text-white/30 text-xs border border-white/[0.06]">
                  <Tag className="w-2.5 h-2.5" />
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Sections */}
          {idea.sections?.length > 0 && (
            <div className="space-y-10">
              {idea.sections.map((section, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 + i * 0.07 }}
                  className="border-t border-white/[0.06] pt-8">
                  {section.heading && (
                    <h2 className="text-sm font-semibold text-white/50 tracking-widest uppercase mb-4">{section.heading}</h2>
                  )}
                  <div className="text-white/55 font-light leading-relaxed whitespace-pre-line text-[15px]">
                    {section.content}
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Raw Voice */}
          {idea.raw_voice && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-14 rounded-2xl overflow-hidden"
              style={{ background: 'rgba(167,139,250,0.04)', border: '1px solid rgba(167,139,250,0.15)' }}>
              <div className="px-6 py-3 flex items-center gap-2"
                style={{ background: 'rgba(167,139,250,0.07)', borderBottom: '1px solid rgba(167,139,250,0.12)' }}>
                <span className="text-[10px] font-black tracking-[0.2em] uppercase" style={{ color: '#a78bfa' }}>
                  Original Voice — Charles Leone
                </span>
              </div>
              <div className="px-6 py-6">
                <p className="text-[14px] font-light leading-[1.85] whitespace-pre-line" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  {idea.raw_voice}
                </p>
              </div>
            </motion.div>
          )}

          {/* Vision */}
          {idea.vision && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-16 p-8 rounded-2xl bg-amber-500/[0.04] border border-amber-500/10">
              <Quote className="w-5 h-5 text-amber-500/40 mb-3" />
              <p className="text-xl font-light text-amber-300/70 italic leading-relaxed">
                {idea.vision}
              </p>
            </motion.div>
          )}
        </motion.div>
      </main>

      <footer className="border-t border-white/[0.05] py-8 text-center">
        <p className="text-xs text-white/15 tracking-[0.2em] uppercase">IntelOasis by Leone University — Ideas for Humanity</p>
      </footer>
    </div>
  );
}
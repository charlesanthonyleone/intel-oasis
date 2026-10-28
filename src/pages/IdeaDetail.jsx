import { useMemo, useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowLeft, Share2, Tag, Building2, CheckCircle, Clock, Lightbulb, Quote, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
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


const slug = (s, i) => `s-${i}-${String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 40)}`;

function Toc({ sections, active, accent }) {
  return (
    <ol className="space-y-1">
      {sections.map((s, i) => s.heading && (
        <li key={i}>
          <a href={`#${slug(s.heading, i)}`} onClick={e => { e.preventDefault(); document.getElementById(slug(s.heading, i))?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}
            className="block py-1.5 pl-3 text-[13px] leading-snug transition-colors border-l"
            style={{ borderColor: active === i ? accent : 'var(--line)', color: active === i ? '#fff' : 'rgba(232,238,245,0.45)' }}>
            {s.heading}
          </a>
        </li>
      ))}
    </ol>
  );
}

export default function IdeaDetail() {
  const [params] = useSearchParams();
  const rawId = params.get('id');
  const id = isNaN(rawId) ? rawId : parseInt(rawId, 10);
  const idea = useMemo(() => allIdeas.find((i) => i.id === id || String(i.id) === String(id)), [id]);
  const inSeries = idea && idea.series ? allSeries.find(x => x.key === idea.series) : null;
  const accent = inSeries?.accent || '#5eead4';
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  const [active, setActive] = useState(0);
  const [tocOpen, setTocOpen] = useState(false);

  useEffect(() => {
    if (!idea?.sections?.length) return;
    const els = idea.sections.map((s, i) => s.heading && document.getElementById(slug(s.heading, i))).filter(Boolean);
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActive(Number(e.target.dataset.idx)); });
    }, { rootMargin: '-20% 0px -70% 0px' });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [idea]);

  if (!idea) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4">
        <p className="text-white/50 text-lg font-light">Idea not found.</p>
        <Link to={createPageUrl('Home')} className="text-teal-300 hover:text-teal-200 text-sm flex items-center gap-1 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to IntelOasis
        </Link>
      </div>
    );
  }

  const status = statusConfig[idea.status] || statusConfig['open'];
  const StatusIcon = status.icon;
  function copyLink() { navigator.clipboard?.writeText(window.location.href).catch(() => {}); }

  const backPage = inSeries ? `series/${inSeries.key}` : String(idea.id).startsWith('pd-') ? 'PublicDomain' : idea.category === 'club' ? 'Clubs' : (['book','law','medical','fiction'].includes(idea.category)) ? 'Books' : 'Ideas';
  const backLabel = inSeries ? inSeries.label : String(idea.id).startsWith('pd-') ? 'Public Domain' : idea.category === 'club' ? 'LU Clubs' : (['book','law','medical','fiction'].includes(idea.category)) ? 'The Library' : 'IntelOasis';

  const sIdx = inSeries ? inSeries.ids.indexOf(idea.id) : -1;
  const prev = sIdx > 0 ? allIdeas.find(i => i.id === inSeries.ids[sIdx - 1]) : null;
  const next = inSeries && sIdx >= 0 && sIdx < inSeries.ids.length - 1 ? allIdeas.find(i => i.id === inSeries.ids[sIdx + 1]) : null;
  const hasToc = idea.sections?.filter(s => s.heading).length > 1;

  return (
    <div className="relative">
      <motion.div className="fixed top-0 left-0 right-0 h-[3px] z-[60] origin-left" style={{ scaleX: progress, background: `linear-gradient(90deg, ${accent}, #f5c66b)` }} />

      <header className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 60% 80% at 20% 0%, ${accent}26, transparent 70%)` }} />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-12">
          <div className="flex items-center justify-between mb-12">
            <Link to={createPageUrl(backPage)} className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" /> {backLabel}
            </Link>
            <button onClick={copyLink} className="flex items-center gap-2 px-3.5 py-1.5 rounded-full glass glass-hover text-xs text-white/60 hover:text-white">
              <Share2 className="w-3.5 h-3.5" /> Share
            </button>
          </div>
          <div className="max-w-[46rem]">
            <div className="flex flex-wrap items-center gap-2.5 mb-6">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-medium ${status.color}`}>
                <StatusIcon className="w-3 h-3" /> {status.label}
              </span>
              {idea.utilizingEntity && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass text-white/50 text-xs font-medium"><Building2 className="w-3 h-3" />{idea.utilizingEntity}</span>
              )}
              {idea.category && <span className="inline-flex items-center px-3 py-1 rounded-full glass text-white/50 text-xs font-medium capitalize">{idea.category}</span>}
            </div>
            <h1 className="font-display font-semibold text-white leading-[1.02] tracking-[-0.01em] mb-5" style={{ fontSize: 'clamp(38px, 6vw, 72px)' }}>{idea.title}</h1>
            {idea.tagline && <p className="font-display italic text-2xl mb-6" style={{ color: accent }}>{idea.tagline}</p>}
            <p className="text-[19px] leading-relaxed pl-5" style={{ borderLeft: `2px solid ${accent}`, color: 'rgba(232,238,245,0.72)' }}>{idea.summary}</p>
            {idea.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-8">
                {idea.tags.map((tag) => (
                  <Link key={tag} to={`/Search?q=${encodeURIComponent(tag)}`} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs text-white/50 hover:text-white border transition-colors" style={{ borderColor: 'var(--line)' }}>
                    <Tag className="w-2.5 h-2.5" />{tag}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pb-20 lg:grid lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-16">
        <article className="min-w-0">
          {hasToc && (
            <div className="lg:hidden mb-8 rounded-2xl glass">
              <button onClick={() => setTocOpen(o => !o)} aria-expanded={tocOpen} className="w-full flex items-center justify-between px-5 py-3.5 eyebrow" style={{ color: accent }}>
                Contents <ChevronDown className={`w-4 h-4 transition-transform ${tocOpen ? 'rotate-180' : ''}`} />
              </button>
              {tocOpen && <div className="px-5 pb-4"><Toc sections={idea.sections} active={active} accent={accent} /></div>}
            </div>
          )}
          <div className="prose-oasis max-w-[68ch]">
            {idea.sections?.map((section, i) => (
              <section key={i} className="mb-12">
                {section.heading && (
                  <h2 id={slug(section.heading, i)} data-idx={i} className="font-display text-3xl md:text-[34px] font-semibold text-white leading-tight mb-5 scroll-mt-24">
                    <span className="block h-px w-10 mb-5" style={{ background: accent }} />
                    {section.heading}
                  </h2>
                )}
                <div className="whitespace-pre-line text-[17px] leading-[1.8]" style={{ color: 'rgba(232,238,245,0.8)' }}>{section.content}</div>
              </section>
            ))}

            {idea.raw_voice && (
              <div className="mt-14 rounded-2xl overflow-hidden" style={{ background: `${accent}0d`, border: `1px solid ${accent}33` }}>
                <div className="px-6 py-3" style={{ background: `${accent}14`, borderBottom: `1px solid ${accent}26` }}>
                  <span className="eyebrow" style={{ color: accent }}>Original Voice — Charles Leone</span>
                </div>
                <p className="px-6 py-6 text-[16px] leading-[1.85] whitespace-pre-line" style={{ color: 'rgba(232,238,245,0.75)' }}>{idea.raw_voice}</p>
              </div>
            )}

            {idea.vision && (
              <div className="mt-14 p-8 rounded-2xl" style={{ background: 'rgba(245,198,107,0.06)', border: '1px solid rgba(245,198,107,0.22)' }}>
                <Quote className="w-6 h-6 mb-3" style={{ color: 'rgba(245,198,107,0.6)' }} />
                <p className="font-display italic text-2xl leading-snug" style={{ color: '#f8dca0' }}>{idea.vision}</p>
              </div>
            )}
          </div>

          {(prev || next) && (
            <nav className="mt-16 grid sm:grid-cols-2 gap-3 max-w-[68ch]" aria-label={inSeries.label}>
              {prev ? (
                <Link to={`/IdeaDetail?id=${prev.id}`} className="group rounded-2xl p-5 glass glass-hover">
                  <ChevronLeft className="w-4 h-4 mb-2" style={{ color: accent }} />
                  <p className="font-display text-xl font-semibold text-white leading-snug">{prev.title}</p>
                </Link>
              ) : <span />}
              {next && (
                <Link to={`/IdeaDetail?id=${next.id}`} className="group rounded-2xl p-5 glass glass-hover text-right">
                  <ChevronRight className="w-4 h-4 mb-2 ml-auto" style={{ color: accent }} />
                  <p className="font-display text-xl font-semibold text-white leading-snug">{next.title}</p>
                </Link>
              )}
            </nav>
          )}
        </article>

        {hasToc && (
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <p className="eyebrow mb-4" style={{ color: accent }}>Contents</p>
              <Toc sections={idea.sections} active={active} accent={accent} />
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}

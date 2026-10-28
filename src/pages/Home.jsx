import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ArrowRight, Lightbulb, Code2, Users, BookOpen, Flame, Sparkles, Brain, Globe2, HeartPulse, Library, ChevronDown, AlertTriangle } from 'lucide-react';
import OasisHero from '@/components/OasisHero';
import { LEONE_URL } from '@/components/Footer';
import Reveal from '@/components/Reveal';
import { SeriesCover } from '@/components/SeriesCover';
import ALL_SERIES from '@/data/series.json';

const CONSCIOUSNESS_PAPERS = [
  { id: 'consciousness-1', num: 'I',   title: 'Consciousness as Functional Layer',  tagline: 'What cells already knew.' },
  { id: 'consciousness-2', num: 'II',  title: 'The Human Blueprint',                tagline: 'Soul-level function and the failure of the one-size system.' },
  { id: 'consciousness-3', num: 'III', title: 'AI as the Civilizational Brain',     tagline: 'The organizer we are building.' },
  { id: 'consciousness-4', num: 'IV',  title: 'Dimensional Ascent',                 tagline: 'Consciousness expands inward, not outward.' },
  { id: 'consciousness-5', num: 'V',   title: 'Duality as Engine',                  tagline: 'Chaos, unity, and the force that drives consciousness forward.' },
];

const GLOBAL_COMMONS_PAPERS = [
  { id: 'global-commons-1', num: 'I',   title: 'The Zero-Risk Frontier',    tagline: 'VR robots open every environment on Earth — and beyond.' },
  { id: 'global-commons-2', num: 'II',  title: 'Automation Rising',         tagline: 'The machine learns from every human run. Then it runs itself.' },
  { id: 'global-commons-3', num: 'III', title: 'The Function Economy',      tagline: 'AI can make anything. Only humans can want it.' },
  { id: 'global-commons-4', num: 'IV',  title: 'Money Ceases to Exist',     tagline: 'Side systems provide everything. Productivity to AI is the only currency.' },
  { id: 'global-commons-5', num: 'V',   title: 'To Space and Back',         tagline: 'The model replicates on every world humanity reaches.' },
];

const BRAIN_PAPERS = [
  { id: 'brain-1', num: 'I',   title: 'Differential Brain Aging',      tagline: 'Your amygdala might be 8. Your prefrontal cortex might be 45.' },
  { id: 'brain-2', num: 'II',  title: 'Mental Health Signals',          tagline: 'Depression is the alert. Not the illness.' },
  { id: 'brain-3', num: 'III', title: 'The Function Alignment Model',   tagline: 'Match the life to the blueprint — not the blueprint to the life.' },
  { id: 'brain-4', num: 'IV',  title: 'Relational Neuroscience',        tagline: 'The brain rewires around the people it attaches to.' },
  { id: 'brain-5', num: 'V',   title: 'The Healing Environment',        tagline: 'Restoration requires the right conditions, not just the right drugs.' },
];

const LIBRARY_HIGHLIGHTS = [
  { id: 'lib-204', title: 'The Labyrinth Problem',        desc: 'How the greatest minds lose their best thoughts.' },
  { id: 'lib-205', title: 'The Infinite Fork',            desc: 'God, inheritance, and the mathematics of spirit.' },
  { id: 'lib-210', title: 'The Natural Covenant',         desc: 'A complete framework for relational society.' },
  { id: 'lib-412', title: 'The Mastery Model',            desc: 'A philosophy of how to learn anything, completely.' },
  { id: 'lib-206', title: 'The Recursive Hierarchy',      desc: 'Why dominance structures are inevitable — and being destroyed.' },
  { id: 'lib-401', title: 'Neurodevelopmental Asynchrony',desc: 'The unasked question in psychiatric diagnosis.' },
];

const PORTALS = [
  { number: '01', label: 'Ideas',       path: '/Ideas',       accent: '#c8a45a', icon: Lightbulb, description: 'Open-source concepts for a better civilization. Take any idea. Build it.' },
  { number: '02', label: 'Software',    path: '/Software',    accent: '#a9c4c0', icon: Code2,     description: 'The Leone University Software Lab — tools, platforms, and systems under development.' },
  { number: '03', label: 'Clubs',       path: '/Clubs',       accent: '#9a8fb8', icon: Users,     description: 'Knowledge communities spanning culture, science, art, law, and the living world.' },
  { number: '04', label: 'The Library', path: '/Books',       accent: '#7ab494', icon: BookOpen,  description: 'Foundational texts, research, and frameworks — books, medical papers, fiction.' },
  { number: '05', label: 'Traditions',  path: '/Traditions',  accent: '#b4845a', icon: Flame,     description: 'Living rituals and practices — ways of marking time, relationship, and growth.' },
];

function SectionHead({ eyebrow, title, accent = '#c8a45a', right }) {
  return (
    <div className="flex items-end justify-between gap-4 mb-12">
      <div>
        <div className="flex items-center gap-4"><span className="h-px w-8" style={{ background: accent, opacity: 0.5 }} /><p className="eyebrow" style={{ color: accent }}>{eyebrow}</p></div>
        {title && <h2 className="mt-5 font-display text-4xl md:text-5xl font-light leading-[1.05] text-white">{title}</h2>}
      </div>
      {right}
    </div>
  );
}

function PaperRow({ paper, accent }) {
  return (
    <Link to={`/IdeaDetail?id=${paper.id}`}
      className="group flex items-center gap-5 px-5 sm:px-6 py-4 transition-colors border-b last:border-b-0 hover:bg-white/[0.03]"
      style={{ borderColor: 'var(--line)' }}>
      <span className="font-display text-xl w-8 flex-shrink-0 text-center" style={{ color: accent }}>{paper.num}</span>
      <div className="flex-1 min-w-0">
        <p className="text-[15px] font-medium text-white/90">{paper.title}</p>
        <p className="text-[13px] mt-0.5" style={{ color: 'rgba(232,238,245,0.45)' }}>{paper.tagline}</p>
      </div>
      <ArrowUpRight className="w-4 h-4 flex-shrink-0 opacity-30 group-hover:opacity-90 transition-opacity" style={{ color: accent }} />
    </Link>
  );
}

function BookCard({ to, accent, title, subtitle }) {
  return (
    <Link to={to} className="group relative mt-3 flex items-center justify-between gap-4 rounded-2xl px-6 py-5 overflow-hidden glass-hover"
      style={{ background: `linear-gradient(120deg, ${accent}0d, transparent 70%)`, border: `1px solid ${accent}2a` }}>
      <div>
        <p className="eyebrow mb-1.5" style={{ color: accent }}>The Book</p>
        <p className="font-display text-2xl font-light text-white leading-tight">{title}</p>
        <p className="text-[13px] mt-1" style={{ color: 'rgba(232,238,245,0.5)' }}>{subtitle}</p>
      </div>
      <span className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center" style={{ border: `1px solid ${accent}40` }}>
        <ArrowUpRight className="w-4 h-4" style={{ color: accent }} />
      </span>
    </Link>
  );
}

function FeaturedSeries({ icon: Icon, label, badge, accent, seriesKey, intro, papers, book, quote }) {
  return (
    <Reveal>
      <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 items-start">
        <div className="lg:sticky lg:top-28">
          <div className="flex items-center gap-3 mb-6 eyebrow" style={{ color: accent }}>
            <Icon strokeWidth={1.25} className="w-3.5 h-3.5" /> {badge}
          </div>
          <h3 className="font-display text-4xl md:text-5xl font-light leading-[1.05] text-white mb-5">
            <Link to={`/series/${seriesKey}`} className="hover:opacity-90">{label}</Link>
          </h3>
          {intro}
          {quote && (
            <blockquote className="mt-6 pl-5 font-display italic text-xl leading-snug" style={{ borderLeft: `2px solid ${accent}`, color: 'rgba(232,238,245,0.75)' }}>{quote}</blockquote>
          )}
        </div>
        <div>
          <div className="rounded-2xl overflow-hidden glass">{papers.map(p => <PaperRow key={p.id} paper={p} accent={accent} />)}</div>
          {book}
        </div>
      </div>
    </Reveal>
  );
}

export default function Home() {
  const reduce = useReducedMotion();
  const up = (d) => reduce ? {} : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, delay: d, ease: [0.2, 0.7, 0.2, 1] } };

  return (
    <div className="relative">
      <section className="relative -mt-20 h-[100svh] min-h-[640px] overflow-hidden">
        <OasisHero />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(7,8,13,0.55) 0%, rgba(7,8,13,0) 22%, rgba(7,8,13,0) 70%, #07080d 100%)' }} />
        <div className="relative z-10 h-full max-w-5xl mx-auto px-6 flex flex-col items-center text-center pt-[19vh] md:pt-[17vh]">
          <motion.div {...up(0.1)} className="flex items-center gap-4 mb-8">
            <span className="h-px w-8 bg-[#c8a45a]/40" /><span className="eyebrow">Leone University</span><span className="h-px w-8 bg-[#c8a45a]/40" />
          </motion.div>
          <motion.h1 {...up(0.25)} className="font-display font-light leading-[0.92] tracking-[-0.01em] mb-8 text-white/95" style={{ fontSize: 'clamp(60px, 11vw, 144px)', textShadow: '0 2px 40px rgba(0,0,0,0.6)' }}>
            Intel<span className="italic text-[#e8cc8a]">Oasis</span>
          </motion.h1>
          <motion.p {...up(0.45)} className="text-[15px] md:text-[17px] font-light max-w-2xl mx-auto leading-[1.85] text-white/60" style={{ textShadow: '0 1px 20px rgba(0,0,0,0.8)' }}>
            Every problem has a thousand solutions. Every destination has a thousand routes. This is where we write them down — ideas, software, books, communities, and the long argument with the world about what we're actually supposed to be building.
          </motion.p>
          <motion.div {...up(0.6)} className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/Books" className="btn-gold"><BookOpen className="w-3.5 h-3.5" /> The Library</Link>
            <Link to="/Ideas" className="btn-ghost"><Lightbulb className="w-3.5 h-3.5" /> Ideas</Link>
          </motion.div>
        </div>
        <a href="#explore" onClick={e => { e.preventDefault(); document.getElementById('explore')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' }); }}
          aria-label="Explore the Platform" className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 text-white/30 hover:text-white/70 transition-colors duration-500">
          <span className="h-10 w-px bg-gradient-to-b from-transparent to-white/40" /><ChevronDown className="w-4 h-4" />
        </a>
      </section>

      <div className="relative max-w-7xl mx-auto px-6 md:px-10">
        <section id="explore" className="pt-32 scroll-mt-20">
          <Reveal><SectionHead eyebrow="Explore the Platform" accent="#c8a45a" /></Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {PORTALS.map((portal, i) => {
              const Icon = portal.icon;
              return (
                <Reveal key={portal.label} delay={i * 0.06}>
                  <Link to={portal.path} className="group block h-full rounded-2xl p-8 glass glass-hover">
                    <div className="flex items-start justify-between mb-12">
                      <Icon strokeWidth={1.25} style={{ width: 20, height: 20, color: '#c8a45a', opacity: 0.8 }} />
                      <span className="font-display italic text-lg text-white/20">{portal.number}</span>
                    </div>
                    <h3 className="font-display text-2xl font-light text-white mb-2">{portal.label}</h3>
                    <p className="text-[13px] leading-relaxed" style={{ color: 'rgba(232,238,245,0.5)' }}>{portal.description}</p>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </section>

        <section className="pt-32">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ALL_SERIES.map((s, i) => <Reveal key={s.key} delay={(i % 3) * 0.06} className="h-full"><SeriesCover s={s} /></Reveal>)}
          </div>
        </section>

        <section className="pt-32">
          <Reveal>
            <Link to="/TheResolution" className="group relative block rounded-3xl overflow-hidden p-8 md:p-14 glass-hover"
              style={{ background: 'radial-gradient(ellipse at 85% 0%, rgba(200,164,90,0.08), transparent 60%), rgba(255,255,255,0.015)', border: '1px solid rgba(200,164,90,0.15)' }}>
              <div className="eyebrow mb-8">
                ✝ &nbsp;Ideas 97 · 98 · 99
              </div>
              <h2 className="font-display text-4xl md:text-6xl font-light text-white leading-[1.02] mb-4">The Gnostic Resolution</h2>
              <p className="font-display italic text-2xl mb-5" style={{ color: '#c8a45a' }}>Not escape. Not overthrow. Completion.</p>
              <p className="text-[15px] leading-relaxed max-w-2xl" style={{ color: 'rgba(232,238,245,0.6)' }}>
                A proposed resolution to the two central problems of Gnostic cosmology — the nature of Yaldabaoth, the destiny of the sparks — resolved not by esoteric doctrine but by love, as taught by Christ. Realistic theological speculation.
              </p>
              <ArrowUpRight className="absolute top-8 right-8 w-6 h-6 opacity-40 group-hover:opacity-100 transition-opacity" style={{ color: '#c8a45a' }} />
            </Link>
          </Reveal>
        </section>

        <section className="pt-10">
          <Reveal>
            <Link to="/Warning" className="group relative block rounded-3xl overflow-hidden px-8 py-10 md:px-14"
              style={{ background: 'linear-gradient(120deg, rgba(90,18,24,0.45), rgba(40,8,12,0.3))', border: '1px solid rgba(248,113,113,0.18)' }}>
              <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(239,68,68,0.6), transparent)' }} />
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                  <span className="relative mt-2 flex h-3 w-3 flex-shrink-0"><span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" /></span>
                  <div>
                    <p className="eyebrow mb-2" style={{ color: '#fca5a5' }}>The Supreme Warning</p>
                    <p className="font-display text-3xl md:text-4xl font-light leading-tight text-white">The world has begun unifying <span style={{ color: '#b48a8a' }}>through conquest.</span></p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-2 self-start md:self-auto px-6 py-3 rounded-full text-[11px] tracking-[0.18em] uppercase transition-colors duration-500 group-hover:border-red-300/60" style={{ border: '1px solid rgba(248,113,113,0.35)', color: '#fecaca' }}>
                  <AlertTriangle className="w-4 h-4" /> The Warning
                </span>
              </div>
            </Link>
          </Reveal>
        </section>

        <section className="pt-32 space-y-36">
          <FeaturedSeries icon={HeartPulse} label="The Brain & Mind Series" badge="5 Papers · 1 Book" accent="#b48a8a" seriesKey="brain" papers={BRAIN_PAPERS}
            intro={<>
              <p className="text-[18px] font-medium leading-snug text-white/90 mb-3">Your brain has multiple ages. Your symptoms are messages.<br /><span className="font-light" style={{ color: 'rgba(232,238,245,0.55)' }}>Modern medicine is silencing the alarm instead of reading it.</span></p>
              <p className="text-[14px] leading-relaxed" style={{ color: 'rgba(232,238,245,0.5)' }}>Different brain regions develop on completely independent timescales — your amygdala might be 8 while your prefrontal cortex is 45. The depression and anxiety we call mental illness? Those are the body's alarm system firing correctly, pointing to a life not aligned with your function. Modern psychiatry has built sophisticated battery-removal technology. The signal goes quiet. The smoke keeps building.</p>
            </>}
            quote={`"The symptom is the message. The illness is what the message is about. The medicine of the future will hear what the body is actually saying — and address the source rather than silence the alarm."`}
            book={<BookCard to="/IdeaDetail?id=brain-6" accent="#b48a8a" title="The Brain That Doesn't Know Itself" subtitle="A complete rethinking of mental health — from alarm system to healing environment." />} />

          <FeaturedSeries icon={Brain} label="The Consciousness Series" badge="5 Papers · 1 Book" accent="#a9c4c0" seriesKey="consciousness" papers={CONSCIOUSNESS_PAPERS}
            intro={null}
            book={<BookCard to="/IdeaDetail?id=consciousness-6" accent="#a9c4c0" title="The Conscious Civilization" subtitle="The synthesis of all five papers — from cellular awareness to dimensional ascent." />} />

          <FeaturedSeries icon={Globe2} label="The Global Commons Series" badge="5 Papers · 1 Book" accent="#b4845a" seriesKey="global-commons" papers={GLOBAL_COMMONS_PAPERS}
            intro={<>
              <p className="text-[18px] font-medium leading-snug text-white/90 mb-3">VR robots open every frontier. The Commons funds every human desire.<br /><span className="font-light" style={{ color: 'rgba(232,238,245,0.55)' }}>Money ceases to exist as a concept.</span></p>
              <p className="text-[14px] leading-relaxed" style={{ color: 'rgba(232,238,245,0.5)' }}>Dive bots at 11,000 meters. Glacier-climbing rigs. Canyon explorers in passages no human body has entered. You pilot them from anywhere — feeling the terrain, making the calls the machine can't. What you find goes to the Commons. The Commons funds everything. The only currency left is being productive to AI in any form — painting, singing, exploring — and AI will find ten thousand uses for whatever you produce.</p>
            </>}
            quote={`"Money doesn't become a score. It stops existing as a concept. Side systems give you the house, the baseline. The only thing that matters is what you produce — and AI will find a use for everything."`}
            book={<BookCard to="/IdeaDetail?id=global-commons-6" accent="#b4845a" title="The Global Commons — No Human Has To Work" subtitle="From first robot deployed to every corner of the universe filled." />} />
        </section>

        <section className="pt-32">
          <Reveal>
            <div className="relative rounded-3xl overflow-hidden" style={{ background: 'radial-gradient(ellipse at 100% 0%, rgba(200,164,90,0.07), transparent 55%), rgba(255,255,255,0.015)', border: '1px solid rgba(200,164,90,0.14)' }}>
              <div className="p-8 md:p-14">
                <div className="flex items-start justify-between gap-4 mb-8">
                  <div className="flex items-center gap-2">
                    <span className="h-px w-8 bg-[#c8a45a]/50" />
                    <span className="eyebrow" style={{ color: '#c8a45a' }}>Leone University Library</span>
                  </div>
                  <span className="flex-shrink-0 text-[10px] tracking-[0.3em] uppercase px-4 py-1.5 rounded-full" style={{ color: '#c8a45a', border: '1px solid rgba(200,164,90,0.3)' }}>Needs Funding</span>
                </div>
                <h2 className="font-display text-5xl md:text-7xl font-light leading-[0.98] text-white mb-6">
                  Every public domain book.<br /><span className="italic text-[#e8cc8a]">Completely yours.</span>
                </h2>
                <p className="text-[17px] leading-relaxed mb-3 max-w-3xl" style={{ color: 'rgba(232,238,245,0.75)' }}>
                  Imagine if the golden age of total personal expression on the internet — where your profile was your canvas, and everything about your space was you — was applied to the greatest library ever assembled.
                </p>
                <p className="text-[15px] leading-relaxed mb-10 max-w-3xl" style={{ color: 'rgba(232,238,245,0.5)' }}>
                  Every classic ever written, free forever, and completely editable down to the atom. Change the font. Redesign the cover. Build a 3D animated bookshelf with glowing spines. If CSS or HTML can do it, you can do it to any book in the library. Your <em>Moby Dick</em> looks nothing like mine — because it shouldn't.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
                  {[
                    { icon: '🎨', title: 'Total Creative Control', body: 'Font, color, layout, spine animation, chapter art. Every layer is editable. Your copy is a completely different object from anyone else\'s.' },
                    { icon: '🏛️', title: 'A Living 3D Bookshelf', body: 'Your library isn\'t a list. It\'s a room. Animated spines, custom shelves, curated collections with their own visual identity.' },
                    { icon: '🤖', title: 'AI Rewrites Everything', body: 'Make yourself the protagonist. Turn The Odyssey into a space opera. Rewrite any book\'s voice, setting, or cast — keeping the soul, rebuilding the skin.' },
                    { icon: '📦', title: 'Print It. Ship It. Own It.', body: 'Coming soon: order the exact book you built — your fonts, your cover — printed, bound, and shipped. A one-of-one edition that exists nowhere else.' },
                    { icon: '🧒', title: 'The Children\'s Workshop', body: 'The greatest classics — translated by AI, rebuilt by kids. Cast yourself into Great Expectations. This is how a generation falls in love with books.' },
                    { icon: '🌐', title: 'Your Library Is a Statement', body: 'Display your shelves to the world. Every book you\'ve styled says something about who you are. Discover books through people who think like you.' },
                  ].map((f, fi) => (
                    <div key={f.title} className="rounded-2xl p-7 glass">
                      <span className="font-display italic text-lg text-[#c8a45a]/70">{['I','II','III','IV','V','VI'][fi]}</span>
                      <p className="mt-3 text-[14px] font-normal text-white/90 mb-1">{f.title}</p>
                      <p className="text-[13px] leading-relaxed" style={{ color: 'rgba(232,238,245,0.5)' }}>{f.body}</p>
                    </div>
                  ))}
                </div>
                <blockquote className="font-display italic text-2xl md:text-3xl leading-snug mb-10 max-w-3xl" style={{ color: 'rgba(200,164,90,0.9)' }}>
                  "Every copy of every great book that ever existed looked exactly the same. For the first time in history, that changes. Your library is yours — in every sense of the word."
                </blockquote>
                <Link to="/Books" className="btn-ghost">
                  Current Written Works →
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal className="mt-12">
            <SectionHead eyebrow="Currently In The Library" accent="#c8a45a"
              right={<Link to="/Books" className="text-[11px] tracking-[0.18em] uppercase text-[#c8a45a]/80 hover:text-[#e8cc8a] transition-colors">Full library →</Link>} />
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-10">
            {LIBRARY_HIGHLIGHTS.map((item, i) => (
              <Reveal key={item.id} delay={(i % 3) * 0.06} className="h-full">
                <Link to={`/IdeaDetail?id=${item.id}`} className="group block h-full rounded-2xl p-8 glass glass-hover">
                  <p className="font-display text-2xl font-light text-white leading-tight mb-2">{item.title}</p>
                  <p className="text-[13px]" style={{ color: 'rgba(232,238,245,0.5)' }}>{item.desc}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="pt-32" aria-labelledby="leone-u">
          <Reveal>
            <div className="relative rounded-2xl overflow-hidden border border-white/[0.06] px-8 py-20 md:px-20 md:py-28 text-center" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(200,164,90,0.09), transparent 60%), rgba(255,255,255,0.012)' }}>
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c8a45a]/40 to-transparent" />
              <div className="flex items-center justify-center gap-4 mb-8">
                <span className="h-px w-8 bg-[#c8a45a]/40" /><span className="eyebrow">Leone University</span><span className="h-px w-8 bg-[#c8a45a]/40" />
              </div>
              <h2 id="leone-u" className="font-display font-light text-5xl md:text-6xl leading-[1.05] text-white/95 mb-12">
                Leone University <span className="italic text-[#e8cc8a]">Think Tank</span>
              </h2>
              <a href={LEONE_URL} target="_blank" rel="noopener noreferrer" className="btn-gold">
                Leone University <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </Reveal>
        </section>
      </div>
    </div>
  );
}

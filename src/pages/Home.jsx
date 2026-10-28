import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ArrowRight, Lightbulb, Code2, Users, BookOpen, Flame, Sparkles, Brain, Globe2, HeartPulse, Library, ChevronDown, AlertTriangle } from 'lucide-react';
import OasisScene from '@/components/OasisScene';
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
  { number: '01', label: 'Ideas',       path: '/Ideas',       accent: '#f59e0b', icon: Lightbulb, description: 'Open-source concepts for a better civilization. Take any idea. Build it.' },
  { number: '02', label: 'Software',    path: '/Software',    accent: '#22d3ee', icon: Code2,     description: 'The Leone University Software Lab — tools, platforms, and systems under development.' },
  { number: '03', label: 'Clubs',       path: '/Clubs',       accent: '#a78bfa', icon: Users,     description: 'Knowledge communities spanning culture, science, art, law, and the living world.' },
  { number: '04', label: 'The Library', path: '/Books',       accent: '#6ee7b7', icon: BookOpen,  description: 'Foundational texts, research, and frameworks — books, medical papers, fiction.' },
  { number: '05', label: 'Traditions',  path: '/Traditions',  accent: '#fb923c', icon: Flame,     description: 'Living rituals and practices — ways of marking time, relationship, and growth.' },
];

function SectionHead({ eyebrow, title, accent = '#5eead4', right }) {
  return (
    <div className="flex items-end justify-between gap-4 mb-8">
      <div>
        <p className="eyebrow mb-3" style={{ color: accent }}>{eyebrow}</p>
        {title && <h2 className="font-display text-4xl md:text-5xl font-semibold leading-[1.05] text-white">{title}</h2>}
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
      style={{ background: `linear-gradient(120deg, ${accent}1f, ${accent}08 60%, transparent)`, border: `1px solid ${accent}40` }}>
      <div>
        <p className="eyebrow mb-1.5" style={{ color: accent }}>The Book</p>
        <p className="font-display text-2xl font-semibold text-white leading-tight">{title}</p>
        <p className="text-[13px] mt-1" style={{ color: 'rgba(232,238,245,0.5)' }}>{subtitle}</p>
      </div>
      <span className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-transform group-hover:scale-110" style={{ background: `${accent}22`, border: `1px solid ${accent}55` }}>
        <ArrowUpRight className="w-4 h-4" style={{ color: accent }} />
      </span>
    </Link>
  );
}

function FeaturedSeries({ icon: Icon, label, badge, accent, seriesKey, intro, papers, book, quote }) {
  return (
    <Reveal>
      <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 items-start">
        <div className="lg:sticky lg:top-24">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5 text-[11px] font-semibold" style={{ background: `${accent}14`, border: `1px solid ${accent}33`, color: accent }}>
            <Icon className="w-3.5 h-3.5" /> {badge}
          </div>
          <h3 className="font-display text-4xl md:text-5xl font-semibold leading-[1.05] text-white mb-5">
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
      <section className="relative -mt-16 min-h-[100svh] flex items-center justify-center overflow-hidden">
        <OasisScene variant="hero" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-16 pb-[22vh]">
          <motion.div {...up(0.05)} className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 eyebrow glass" style={{ color: '#f5c66b' }}>
            <Sparkles className="w-3.5 h-3.5" /> Leone University
          </motion.div>
          <motion.h1 {...up(0.15)} className="font-display font-semibold leading-[0.9] tracking-[-0.02em] mb-8" style={{ fontSize: 'clamp(64px, 14vw, 168px)' }}>
            <span className="shimmer-text">IntelOasis</span>
          </motion.h1>
          <motion.p {...up(0.35)} className="text-[17px] md:text-[19px] font-light max-w-2xl mx-auto leading-relaxed" style={{ color: 'rgba(232,238,245,0.72)' }}>
            Every problem has a thousand solutions. Every destination has a thousand routes. This is where we write them down — ideas, software, books, communities, and the long argument with the world about what we're actually supposed to be building.
          </motion.p>
          <motion.div {...up(0.5)} className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/Books" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-semibold text-[14px] text-[#04111a] transition-transform hover:scale-[1.03]"
              style={{ background: 'linear-gradient(120deg, #fde68a, #f5c66b 40%, #5eead4)', boxShadow: '0 10px 40px -10px rgba(245,198,107,0.6)' }}>
              <BookOpen className="w-4 h-4" /> The Library
            </Link>
            <Link to="/Ideas" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-semibold text-[14px] glass glass-hover text-white">
              <Lightbulb className="w-4 h-4" style={{ color: '#5eead4' }} /> Ideas
            </Link>
          </motion.div>
        </div>
        <a href="#explore" onClick={e => { e.preventDefault(); document.getElementById('explore')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' }); }}
          aria-label="Explore the Platform" className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/40 hover:text-white/80 transition-colors">
          <ChevronDown className={`w-6 h-6 ${reduce ? '' : 'animate-bounce'}`} />
        </a>
      </section>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <section id="explore" className="pt-24 scroll-mt-20">
          <Reveal><SectionHead eyebrow="Explore the Platform" accent="#f5c66b" /></Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {PORTALS.map((portal, i) => {
              const Icon = portal.icon;
              return (
                <Reveal key={portal.label} delay={i * 0.06}>
                  <Link to={portal.path} className="group block h-full rounded-2xl p-6 glass glass-hover">
                    <div className="flex items-start justify-between mb-8">
                      <span className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `${portal.accent}18`, border: `1px solid ${portal.accent}33` }}>
                        <Icon style={{ width: 18, height: 18, color: portal.accent }} />
                      </span>
                      <span className="font-display text-lg" style={{ color: 'rgba(232,238,245,0.25)' }}>{portal.number}</span>
                    </div>
                    <h3 className="font-display text-2xl font-semibold text-white mb-2">{portal.label}</h3>
                    <p className="text-[13px] leading-relaxed" style={{ color: 'rgba(232,238,245,0.5)' }}>{portal.description}</p>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </section>

        <section className="pt-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ALL_SERIES.map((s, i) => <Reveal key={s.key} delay={(i % 3) * 0.06} className="h-full"><SeriesCover s={s} /></Reveal>)}
          </div>
        </section>

        <section className="pt-24">
          <Reveal>
            <Link to="/TheResolution" className="group relative block rounded-3xl overflow-hidden p-8 md:p-14 glass-hover"
              style={{ background: 'radial-gradient(ellipse at 85% 0%, rgba(245,198,107,0.18), transparent 55%), radial-gradient(ellipse at 0% 100%, rgba(45,212,191,0.14), transparent 55%), rgba(255,255,255,0.02)', border: '1px solid rgba(245,198,107,0.25)' }}>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-6 text-[11px] font-semibold tracking-[0.15em] uppercase" style={{ background: 'rgba(245,198,107,0.1)', border: '1px solid rgba(245,198,107,0.3)', color: '#f5c66b' }}>
                ✝ &nbsp;Ideas 97 · 98 · 99
              </div>
              <h2 className="font-display text-4xl md:text-6xl font-semibold text-white leading-[1.02] mb-4">The Gnostic Resolution</h2>
              <p className="font-display italic text-2xl mb-5" style={{ color: '#f5c66b' }}>Not escape. Not overthrow. Completion.</p>
              <p className="text-[15px] leading-relaxed max-w-2xl" style={{ color: 'rgba(232,238,245,0.6)' }}>
                A proposed resolution to the two central problems of Gnostic cosmology — the nature of Yaldabaoth, the destiny of the sparks — resolved not by esoteric doctrine but by love, as taught by Christ. Realistic theological speculation.
              </p>
              <ArrowUpRight className="absolute top-8 right-8 w-6 h-6 opacity-40 group-hover:opacity-100 transition-opacity" style={{ color: '#f5c66b' }} />
            </Link>
          </Reveal>
        </section>

        <section className="pt-10">
          <Reveal>
            <Link to="/Warning" className="group relative block rounded-3xl overflow-hidden px-8 py-10 md:px-14"
              style={{ background: 'linear-gradient(120deg, rgba(127,29,29,0.55), rgba(69,10,10,0.35) 50%, rgba(20,5,5,0.4))', border: '1px solid rgba(248,113,113,0.35)', boxShadow: '0 0 120px -40px rgba(220,38,38,0.6)' }}>
              <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, #ef4444, #f5c66b, transparent)' }} />
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                  <span className="relative mt-2 flex h-3 w-3 flex-shrink-0"><span className={`absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-60 ${reduce ? '' : 'animate-ping'}`} /><span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" /></span>
                  <div>
                    <p className="eyebrow mb-2" style={{ color: '#fca5a5' }}>The Supreme Warning</p>
                    <p className="font-display text-3xl md:text-4xl font-semibold leading-tight text-white">The world has begun unifying <span style={{ color: '#f87171' }}>through conquest.</span></p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-2 self-start md:self-auto px-5 py-3 rounded-full text-[13px] font-semibold transition-transform group-hover:scale-105" style={{ background: 'rgba(220,38,38,0.2)', border: '1px solid rgba(248,113,113,0.5)', color: '#fecaca' }}>
                  <AlertTriangle className="w-4 h-4" /> The Warning
                </span>
              </div>
            </Link>
          </Reveal>
        </section>

        <section className="pt-28 space-y-28">
          <FeaturedSeries icon={HeartPulse} label="The Brain & Mind Series" badge="5 Papers · 1 Book" accent="#f87171" seriesKey="brain" papers={BRAIN_PAPERS}
            intro={<>
              <p className="text-[18px] font-medium leading-snug text-white/90 mb-3">Your brain has multiple ages. Your symptoms are messages.<br /><span className="font-light" style={{ color: 'rgba(232,238,245,0.55)' }}>Modern medicine is silencing the alarm instead of reading it.</span></p>
              <p className="text-[14px] leading-relaxed" style={{ color: 'rgba(232,238,245,0.5)' }}>Different brain regions develop on completely independent timescales — your amygdala might be 8 while your prefrontal cortex is 45. The depression and anxiety we call mental illness? Those are the body's alarm system firing correctly, pointing to a life not aligned with your function. Modern psychiatry has built sophisticated battery-removal technology. The signal goes quiet. The smoke keeps building.</p>
            </>}
            quote={`"The symptom is the message. The illness is what the message is about. The medicine of the future will hear what the body is actually saying — and address the source rather than silence the alarm."`}
            book={<BookCard to="/IdeaDetail?id=brain-6" accent="#f87171" title="The Brain That Doesn't Know Itself" subtitle="A complete rethinking of mental health — from alarm system to healing environment." />} />

          <FeaturedSeries icon={Brain} label="The Consciousness Series" badge="5 Papers · 1 Book" accent="#22d3ee" seriesKey="consciousness" papers={CONSCIOUSNESS_PAPERS}
            intro={null}
            book={<BookCard to="/IdeaDetail?id=consciousness-6" accent="#22d3ee" title="The Conscious Civilization" subtitle="The synthesis of all five papers — from cellular awareness to dimensional ascent." />} />

          <FeaturedSeries icon={Globe2} label="The Global Commons Series" badge="5 Papers · 1 Book" accent="#fb923c" seriesKey="global-commons" papers={GLOBAL_COMMONS_PAPERS}
            intro={<>
              <p className="text-[18px] font-medium leading-snug text-white/90 mb-3">VR robots open every frontier. The Commons funds every human desire.<br /><span className="font-light" style={{ color: 'rgba(232,238,245,0.55)' }}>Money ceases to exist as a concept.</span></p>
              <p className="text-[14px] leading-relaxed" style={{ color: 'rgba(232,238,245,0.5)' }}>Dive bots at 11,000 meters. Glacier-climbing rigs. Canyon explorers in passages no human body has entered. You pilot them from anywhere — feeling the terrain, making the calls the machine can't. What you find goes to the Commons. The Commons funds everything. The only currency left is being productive to AI in any form — painting, singing, exploring — and AI will find ten thousand uses for whatever you produce.</p>
            </>}
            quote={`"Money doesn't become a score. It stops existing as a concept. Side systems give you the house, the baseline. The only thing that matters is what you produce — and AI will find a use for everything."`}
            book={<BookCard to="/IdeaDetail?id=global-commons-6" accent="#fb923c" title="The Global Commons — No Human Has To Work" subtitle="From first robot deployed to every corner of the universe filled." />} />
        </section>

        <section className="pt-28">
          <Reveal>
            <div className="relative rounded-3xl overflow-hidden" style={{ background: 'radial-gradient(ellipse at 100% 0%, rgba(245,198,107,0.16), transparent 50%), linear-gradient(160deg, rgba(245,198,107,0.06), rgba(255,255,255,0.015))', border: '1px solid rgba(245,198,107,0.25)' }}>
              <div className="p-8 md:p-14">
                <div className="flex items-start justify-between gap-4 mb-8">
                  <div className="flex items-center gap-2">
                    <Library className="w-4 h-4" style={{ color: '#f5c66b' }} />
                    <span className="eyebrow" style={{ color: '#f5c66b' }}>Leone University Library</span>
                  </div>
                  <span className="flex-shrink-0 text-[11px] font-semibold px-3 py-1 rounded-full pulse-glow" style={{ background: 'rgba(245,198,107,0.12)', color: '#f5c66b', border: '1px solid rgba(245,198,107,0.35)' }}>Needs Funding</span>
                </div>
                <h2 className="font-display text-5xl md:text-7xl font-semibold leading-[0.98] text-white mb-6">
                  Every public domain book.<br /><span className="gold-text">Completely yours.</span>
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
                  ].map((f) => (
                    <div key={f.title} className="rounded-2xl p-5 glass">
                      <span className="text-2xl">{f.icon}</span>
                      <p className="mt-3 text-[14px] font-semibold text-white/90 mb-1">{f.title}</p>
                      <p className="text-[13px] leading-relaxed" style={{ color: 'rgba(232,238,245,0.5)' }}>{f.body}</p>
                    </div>
                  ))}
                </div>
                <blockquote className="font-display italic text-2xl md:text-3xl leading-snug mb-10 max-w-3xl" style={{ color: 'rgba(245,198,107,0.9)' }}>
                  "Every copy of every great book that ever existed looked exactly the same. For the first time in history, that changes. Your library is yours — in every sense of the word."
                </blockquote>
                <Link to="/Books" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-[14px] font-semibold transition-transform hover:scale-[1.03]"
                  style={{ background: 'rgba(245,198,107,0.16)', border: '1px solid rgba(245,198,107,0.45)', color: '#f5c66b' }}>
                  Current Written Works →
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal className="mt-12">
            <SectionHead eyebrow="Currently In The Library" accent="#f5c66b"
              right={<Link to="/Books" className="text-[13px] font-semibold" style={{ color: '#f5c66b' }}>Full library →</Link>} />
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-10">
            {LIBRARY_HIGHLIGHTS.map((item, i) => (
              <Reveal key={item.id} delay={(i % 3) * 0.06} className="h-full">
                <Link to={`/IdeaDetail?id=${item.id}`} className="group block h-full rounded-2xl p-6 glass glass-hover">
                  <p className="font-display text-2xl font-semibold text-white leading-tight mb-2">{item.title}</p>
                  <p className="text-[13px]" style={{ color: 'rgba(232,238,245,0.5)' }}>{item.desc}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

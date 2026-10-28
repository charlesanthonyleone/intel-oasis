import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Lightbulb, Code2, Users, BookOpen, Flame, Sparkles, Brain, FlaskConical, Globe2, Pickaxe, HeartPulse, Library, ChevronRight } from 'lucide-react';

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

function SectionLabel({ icon: Icon, label, badge, color }) {
  return (
    <div className="flex items-center gap-2.5 mb-5">
      <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ background: `${color}15`, border: `1px solid ${color}25` }}>
        <Icon style={{ width: 12, height: 12, color }} />
      </div>
      <span className="text-[11px] font-bold tracking-[0.2em] uppercase" style={{ color: 'rgba(255,255,255,0.35)' }}>{label}</span>
      {badge && (
        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
          style={{ background: `${color}12`, color, border: `1px solid ${color}22` }}>
          {badge}
        </span>
      )}
    </div>
  );
}

function PaperRow({ paper, accent, isLast }) {
  return (
    <Link to={`/IdeaDetail?id=${paper.id}`}
      className="flex items-center gap-4 px-5 py-3.5 transition-all group"
      style={{ borderBottom: isLast ? 'none' : '1px solid rgba(255,255,255,0.04)' }}
      onMouseEnter={e => e.currentTarget.style.background = `${accent}08`}
      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
      <span className="text-[11px] font-black w-5 flex-shrink-0 text-center"
        style={{ color: `${accent}80` }}>
        {paper.num}
      </span>
      <div className="flex-1 min-w-0">
        <span className="text-[13px] font-semibold" style={{ color: 'rgba(255,255,255,0.82)' }}>{paper.title}</span>
        <span className="text-[11px] font-light ml-2 hidden sm:inline" style={{ color: 'rgba(255,255,255,0.22)' }}>
          — {paper.tagline}
        </span>
      </div>
      <ChevronRight className="w-3.5 h-3.5 flex-shrink-0 opacity-0 group-hover:opacity-50 transition-opacity"
        style={{ color: accent }} />
    </Link>
  );
}

function BookCard({ to, accent, title, subtitle }) {
  return (
    <Link to={to}
      className="flex items-center justify-between px-5 py-4 rounded-xl transition-all group mt-2"
      style={{ background: `${accent}08`, border: `1px solid ${accent}20` }}
      onMouseEnter={e => { e.currentTarget.style.background = `${accent}14`; e.currentTarget.style.borderColor = `${accent}38`; }}
      onMouseLeave={e => { e.currentTarget.style.background = `${accent}08`; e.currentTarget.style.borderColor = `${accent}20`; }}>
      <div>
        <p className="text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: `${accent}cc` }}>The Book</p>
        <p className="text-[13px] font-semibold" style={{ color: 'rgba(255,255,255,0.85)' }}>{title}</p>
        <p className="text-[11px] font-light mt-0.5" style={{ color: 'rgba(255,255,255,0.28)' }}>{subtitle}</p>
      </div>
      <ArrowUpRight className="w-4 h-4 flex-shrink-0 opacity-20 group-hover:opacity-70 transition-opacity ml-4"
        style={{ color: accent }} />
    </Link>
  );
}

function Divider() {
  return <div className="h-px my-10" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)' }} />;
}

export default function Home() {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="min-h-screen" style={{ background: '#060608' }}>

      {/* ── AMBIENT BACKGROUND ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[1000px] h-[600px]"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(139,92,246,0.12) 0%, transparent 65%)', filter: 'blur(40px)' }} />
        <div className="absolute top-[40%] right-[-100px] w-[700px] h-[500px]"
          style={{ background: 'radial-gradient(ellipse, rgba(245,158,11,0.06) 0%, transparent 65%)', filter: 'blur(60px)' }} />
        <div className="absolute bottom-0 left-[-100px] w-[600px] h-[500px]"
          style={{ background: 'radial-gradient(ellipse, rgba(110,231,183,0.05) 0%, transparent 65%)', filter: 'blur(60px)' }} />
      </div>

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6">

        {/* ── HERO ── */}
        <div className="pt-24 pb-16 text-center">
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-[10px] font-bold tracking-[0.2em] uppercase"
              style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.2)', color: '#a78bfa' }}>
              <Sparkles className="w-3 h-3" />
              Leone University
            </div>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="text-7xl md:text-9xl font-black tracking-[-0.05em] leading-[0.95] mb-7">
            <span className="gold-text">Intel</span><span className="grad-text">Oasis</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35, duration: 0.6 }}
            className="text-[16px] font-light max-w-lg mx-auto leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.28)' }}>
            Every problem has a thousand solutions. Every destination has a thousand routes. This is where we write them down — ideas, software, books, communities, and the long argument with the world about what we're actually supposed to be building.
          </motion.p>


        </div>

        {/* ── PORTAL GRID ── */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-12">
          <SectionLabel icon={FlaskConical} label="Explore the Platform" color="#f59e0b" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {PORTALS.map((portal, i) => {
              const Icon = portal.icon;
              const isHovered = hovered === portal.label;
              return (
                <motion.div key={portal.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.42 + i * 0.05 }}>
                  <Link to={portal.path}
                    className="block rounded-2xl p-5 h-full transition-all"
                    style={{
                      background: isHovered ? `${portal.accent}08` : 'rgba(255,255,255,0.02)',
                      border: `1px solid ${isHovered ? `${portal.accent}30` : 'rgba(255,255,255,0.06)'}`,
                    }}
                    onMouseEnter={() => setHovered(portal.label)}
                    onMouseLeave={() => setHovered(null)}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                        style={{ background: `${portal.accent}12`, border: `1px solid ${portal.accent}22` }}>
                        <Icon style={{ width: 15, height: 15, color: portal.accent }} />
                      </div>
                      <span className="text-[11px] font-bold" style={{ color: 'rgba(255,255,255,0.08)' }}>
                        {portal.number}
                      </span>
                    </div>
                    <h3 className="text-[15px] font-semibold mb-1.5" style={{ color: 'rgba(255,255,255,0.85)' }}>
                      {portal.label}
                    </h3>
                    <p className="text-[12px] font-light leading-relaxed" style={{ color: 'rgba(255,255,255,0.25)' }}>
                      {portal.description}
                    </p>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* ── GNOSTIC RESOLUTION ── */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-0">
          <Link to="/TheResolution"
            className="block rounded-2xl p-7 transition-all group"
            style={{ background: 'rgba(167,139,250,0.05)', border: '1px solid rgba(167,139,250,0.18)' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(167,139,250,0.09)'; e.currentTarget.style.borderColor = 'rgba(167,139,250,0.35)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(167,139,250,0.05)'; e.currentTarget.style.borderColor = 'rgba(167,139,250,0.18)'; }}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full mb-4 text-[10px] font-bold tracking-[0.15em] uppercase"
                  style={{ background: 'rgba(167,139,250,0.1)', border: '1px solid rgba(167,139,250,0.22)', color: '#a78bfa' }}>
                  ✝ &nbsp;Ideas 97 · 98 · 99
                </div>
                <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-2" style={{ color: 'rgba(255,255,255,0.92)' }}>
                  The Gnostic Resolution
                </h2>
                <p className="text-[13px] italic mb-3" style={{ color: '#a78bfa', opacity: 0.8 }}>Not escape. Not overthrow. Completion.</p>
                <p className="text-[13px] font-light leading-relaxed" style={{ color: 'rgba(255,255,255,0.3)' }}>
                  A proposed resolution to the two central problems of Gnostic cosmology — the nature of Yaldabaoth, the destiny of the sparks — resolved not by esoteric doctrine but by love, as taught by Christ. Realistic theological speculation.
                </p>
              </div>
              <ArrowUpRight className="w-5 h-5 flex-shrink-0 mt-1 opacity-20 group-hover:opacity-60 transition-opacity"
                style={{ color: '#a78bfa' }} />
            </div>
          </Link>
        </motion.div>

        <Divider />

        {/* ── BRAIN & MIND SERIES ── */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.6 }}>
          <SectionLabel icon={HeartPulse} label="The Brain & Mind Series" badge="5 Papers · 1 Book" color="#f87171" />

          <div className="rounded-2xl p-5 mb-3"
            style={{ background: 'rgba(248,113,113,0.04)', border: '1px solid rgba(248,113,113,0.12)' }}>
            <p className="text-[14px] font-semibold mb-2 leading-snug" style={{ color: 'rgba(255,255,255,0.85)' }}>
              Your brain has multiple ages. Your symptoms are messages.<br />
              <span style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 300 }}>Modern medicine is silencing the alarm instead of reading it.</span>
            </p>
            <p className="text-[12px] font-light leading-relaxed" style={{ color: 'rgba(255,255,255,0.28)' }}>
              Different brain regions develop on completely independent timescales — your amygdala might be 8 while your prefrontal cortex is 45. The depression and anxiety we call mental illness? Those are the body's alarm system firing correctly, pointing to a life not aligned with your function. Modern psychiatry has built sophisticated battery-removal technology. The signal goes quiet. The smoke keeps building.
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden"
            style={{ background: 'rgba(248,113,113,0.025)', border: '1px solid rgba(248,113,113,0.1)' }}>
            {BRAIN_PAPERS.map((p, i) => <PaperRow key={p.id} paper={p} accent="#f87171" isLast={i === BRAIN_PAPERS.length - 1} />)}
          </div>

          <BookCard to="/IdeaDetail?id=brain-6" accent="#f87171"
            title="The Brain That Doesn't Know Itself"
            subtitle="A complete rethinking of mental health — from alarm system to healing environment." />

          <div className="mt-3 px-5 py-4 rounded-xl"
            style={{ background: 'rgba(248,113,113,0.03)', border: '1px solid rgba(248,113,113,0.08)' }}>
            <p className="text-[12px] italic font-light leading-relaxed" style={{ color: 'rgba(255,255,255,0.35)' }}>
              "The symptom is the message. The illness is what the message is about. The medicine of the future will hear what the body is actually saying — and address the source rather than silence the alarm."
            </p>
          </div>
        </motion.div>

        <Divider />

        {/* ── CONSCIOUSNESS SERIES ── */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }}>
          <SectionLabel icon={Brain} label="The Consciousness Series" badge="5 Papers · 1 Book" color="#22d3ee" />

          <div className="rounded-2xl overflow-hidden"
            style={{ background: 'rgba(34,211,238,0.025)', border: '1px solid rgba(34,211,238,0.1)' }}>
            {CONSCIOUSNESS_PAPERS.map((p, i) => <PaperRow key={p.id} paper={p} accent="#22d3ee" isLast={i === CONSCIOUSNESS_PAPERS.length - 1} />)}
          </div>

          <BookCard to="/IdeaDetail?id=consciousness-6" accent="#22d3ee"
            title="The Conscious Civilization"
            subtitle="The synthesis of all five papers — from cellular awareness to dimensional ascent." />
        </motion.div>

        <Divider />

        {/* ── GLOBAL COMMONS SERIES ── */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.6 }}>
          <SectionLabel icon={Globe2} label="The Global Commons Series" badge="5 Papers · 1 Book" color="#fb923c" />

          <div className="rounded-2xl p-5 mb-3"
            style={{ background: 'rgba(251,146,60,0.04)', border: '1px solid rgba(251,146,60,0.12)' }}>
            <p className="text-[14px] font-semibold mb-2 leading-snug" style={{ color: 'rgba(255,255,255,0.85)' }}>
              VR robots open every frontier. The Commons funds every human desire.<br />
              <span style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 300 }}>Money ceases to exist as a concept.</span>
            </p>
            <p className="text-[12px] font-light leading-relaxed" style={{ color: 'rgba(255,255,255,0.28)' }}>
              Dive bots at 11,000 meters. Glacier-climbing rigs. Canyon explorers in passages no human body has entered. You pilot them from anywhere — feeling the terrain, making the calls the machine can't. What you find goes to the Commons. The Commons funds everything. The only currency left is being productive to AI in any form — painting, singing, exploring — and AI will find ten thousand uses for whatever you produce.
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden"
            style={{ background: 'rgba(251,146,60,0.025)', border: '1px solid rgba(251,146,60,0.1)' }}>
            {GLOBAL_COMMONS_PAPERS.map((p, i) => <PaperRow key={p.id} paper={p} accent="#fb923c" isLast={i === GLOBAL_COMMONS_PAPERS.length - 1} />)}
          </div>

          <BookCard to="/IdeaDetail?id=global-commons-6" accent="#fb923c"
            title="The Global Commons — No Human Has To Work"
            subtitle="From first robot deployed to every corner of the universe filled." />

          <div className="mt-3 px-5 py-4 rounded-xl"
            style={{ background: 'rgba(251,146,60,0.03)', border: '1px solid rgba(251,146,60,0.08)' }}>
            <p className="text-[12px] italic font-light leading-relaxed" style={{ color: 'rgba(255,255,255,0.35)' }}>
              "Money doesn't become a score. It stops existing as a concept. Side systems give you the house, the baseline. The only thing that matters is what you produce — and AI will find a use for everything."
            </p>
          </div>
        </motion.div>

        <Divider />

        {/* ── LEONE UNIVERSITY LIBRARY ── */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.6 }}>

          <div className="rounded-2xl overflow-hidden mb-5"
            style={{ background: 'linear-gradient(145deg, rgba(252,211,77,0.07) 0%, rgba(245,158,11,0.02) 100%)', border: '1px solid rgba(252,211,77,0.22)' }}>
            <div className="p-7">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Library className="w-4 h-4" style={{ color: '#fcd34d' }} />
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: '#fcd34d' }}>Leone University Library</span>
                </div>
                <span className="flex-shrink-0 text-[10px] font-bold px-2.5 py-1 rounded-full animate-pulse"
                  style={{ background: 'rgba(252,211,77,0.1)', color: '#fcd34d', border: '1px solid rgba(252,211,77,0.3)' }}>
                  Needs Funding
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-tight mb-4" style={{ color: 'rgba(255,255,255,0.95)' }}>
                Every public domain book.<br />
                <span style={{ color: '#fcd34d' }}>Completely yours.</span>
              </h2>

              <p className="text-[14px] font-light leading-relaxed mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>
                Imagine if the golden age of total personal expression on the internet — where your profile was your canvas, and everything about your space was you — was applied to the greatest library ever assembled.
              </p>
              <p className="text-[13px] font-light leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.28)' }}>
                Every classic ever written, free forever, and completely editable down to the atom. Change the font. Redesign the cover. Build a 3D animated bookshelf with glowing spines. If CSS or HTML can do it, you can do it to any book in the library. Your <em>Moby Dick</em> looks nothing like mine — because it shouldn't.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                {[
                  { icon: '🎨', title: 'Total Creative Control', body: 'Font, color, layout, spine animation, chapter art. Every layer is editable. Your copy is a completely different object from anyone else\'s.' },
                  { icon: '🏛️', title: 'A Living 3D Bookshelf', body: 'Your library isn\'t a list. It\'s a room. Animated spines, custom shelves, curated collections with their own visual identity.' },
                  { icon: '🤖', title: 'AI Rewrites Everything', body: 'Make yourself the protagonist. Turn The Odyssey into a space opera. Rewrite any book\'s voice, setting, or cast — keeping the soul, rebuilding the skin.' },
                  { icon: '📦', title: 'Print It. Ship It. Own It.', body: 'Coming soon: order the exact book you built — your fonts, your cover — printed, bound, and shipped. A one-of-one edition that exists nowhere else.' },
                  { icon: '🧒', title: 'The Children\'s Workshop', body: 'The greatest classics — translated by AI, rebuilt by kids. Cast yourself into Great Expectations. This is how a generation falls in love with books.' },
                  { icon: '🌐', title: 'Your Library Is a Statement', body: 'Display your shelves to the world. Every book you\'ve styled says something about who you are. Discover books through people who think like you.' },
                ].map((f) => (
                  <div key={f.title} className="flex items-start gap-3 rounded-xl px-4 py-3.5"
                    style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <span className="text-lg flex-shrink-0 mt-0.5">{f.icon}</span>
                    <div>
                      <p className="text-[12px] font-bold mb-0.5" style={{ color: 'rgba(255,255,255,0.82)' }}>{f.title}</p>
                      <p className="text-[11px] font-light leading-relaxed" style={{ color: 'rgba(255,255,255,0.28)' }}>{f.body}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="px-5 py-4 rounded-xl mb-5"
                style={{ background: 'rgba(252,211,77,0.05)', border: '1px solid rgba(252,211,77,0.14)' }}>
                <p className="text-[13px] italic font-light leading-relaxed" style={{ color: 'rgba(252,211,77,0.7)' }}>
                  "Every copy of every great book that ever existed looked exactly the same. For the first time in history, that changes. Your library is yours — in every sense of the word."
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <a href="https://chronicle-forge-now.base44.app" target="_blank" rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-[13px] transition-all"
                  style={{ background: 'rgba(252,211,77,0.16)', border: '1px solid rgba(252,211,77,0.38)', color: '#fcd34d' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(252,211,77,0.26)'; e.currentTarget.style.borderColor = 'rgba(252,211,77,0.6)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(252,211,77,0.16)'; e.currentTarget.style.borderColor = 'rgba(252,211,77,0.38)'; }}>
                  <Library className="w-4 h-4" />
                  See the Early Build →
                </a>
                <Link to="/Books"
                  className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-[13px] font-medium transition-all"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.32)' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.65)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.32)'}>
                  Current Written Works →
                </Link>
              </div>
            </div>
          </div>

          {/* Library highlights */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: 'rgba(255,255,255,0.18)' }}>Currently In The Library</span>
            <Link to="/Books" className="text-[11px] font-medium transition-colors"
              style={{ color: 'rgba(255,255,255,0.16)' }}
              onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.16)'}>
              Full library →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {LIBRARY_HIGHLIGHTS.map((item, i) => (
              <motion.div key={item.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.65 + i * 0.04 }}>
                <Link to={`/IdeaDetail?id=${item.id}`}
                  className="block rounded-xl px-4 py-3.5 transition-all group"
                  style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(252,211,77,0.04)'; e.currentTarget.style.borderColor = 'rgba(252,211,77,0.16)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; }}>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-[13px] font-semibold mb-0.5" style={{ color: 'rgba(255,255,255,0.78)' }}>{item.title}</p>
                      <p className="text-[11px] font-light" style={{ color: 'rgba(255,255,255,0.22)' }}>{item.desc}</p>
                    </div>
                    <ArrowUpRight className="w-3 h-3 flex-shrink-0 mt-0.5 opacity-0 group-hover:opacity-40 transition-opacity"
                      style={{ color: '#fcd34d' }} />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <Divider />



      </div>
    </div>
  );
}
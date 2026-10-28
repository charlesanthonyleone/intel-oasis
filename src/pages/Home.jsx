import { Link } from 'react-router-dom';
import OasisHero from '@/components/OasisHero';
import Reveal from '@/components/Reveal';
import { SeriesIndex } from '@/components/SeriesCover';
import ALL_SERIES from '@/data/series.json';
import LIB from '@/data/library.json';

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
  { number: '01', label: 'Ideas',       path: '/Ideas',       description: 'Open-source concepts for a better civilization. Take any idea. Build it.' },
  { number: '02', label: 'Software',    path: '/Software',    description: 'The Leone University Software Lab — tools, platforms, and systems under development.' },
  { number: '03', label: 'Clubs',       path: '/Clubs',       description: 'Knowledge communities spanning culture, science, art, law, and the living world.' },
  { number: '04', label: 'The Library', path: '/Books',       description: 'Foundational texts, research, and frameworks — books, medical papers, fiction.' },
  { number: '05', label: 'Traditions',  path: '/Traditions',  description: 'Living rituals and practices — ways of marking time, relationship, and growth.' },
];


const FEATURES = [
  ['Total Creative Control', 'Font, color, layout, spine animation, chapter art. Every layer is editable. Your copy is a completely different object from anyone else\'s.'],
  ['A Living 3D Bookshelf', 'Your library isn\'t a list. It\'s a room. Animated spines, custom shelves, curated collections with their own visual identity.'],
  ['AI Rewrites Everything', 'Make yourself the protagonist. Turn The Odyssey into a space opera. Rewrite any book\'s voice, setting, or cast — keeping the soul, rebuilding the skin.'],
  ['Print It. Ship It. Own It.', 'Coming soon: order the exact book you built — your fonts, your cover — printed, bound, and shipped. A one-of-one edition that exists nowhere else.'],
  ['The Children\'s Workshop', 'The greatest classics — translated by AI, rebuilt by kids. Cast yourself into Great Expectations. This is how a generation falls in love with books.'],
  ['Your Library Is a Statement', 'Display your shelves to the world. Every book you\'ve styled says something about who you are. Discover books through people who think like you.']
];

const S = k => ALL_SERIES.find(s => s.key === k);
const T = id => (LIB.find(i => i.id === id) || {}).title;

function Section({ label, intro, children, id }) {
  return (
    <section id={id} className="sec">
      <Reveal>
        <div className="sec-head">
          <h2 className="h-label">{label}</h2>
          {intro && <p className="sec-intro">{intro}</p>}
        </div>
      </Reveal>
      {children}
    </section>
  );
}

function Rows({ items, num }) {
  return (
    <ol className="rows">
      {items.map((p, i) => (
        <li key={p.id}>
          <Link to={`/IdeaDetail?id=${p.id}`} className="row group">
            {num && <span className="row-num">{i + 1}</span>}
            <span className="row-body"><span className="row-title">{p.title}</span>{(p.tagline || p.desc) && <span className="row-sub">{p.tagline || p.desc}</span>}</span>
          </Link>
        </li>
      ))}
    </ol>
  );
}

function Featured({ k, papers, bookId, lead, quote }) {
  const s = S(k);
  return (
    <Reveal>
      <div className="feature">
        <div>
          <Link to={`/series/${k}`} className="h-feature link">{s.label}</Link>
          <p className="lede-sm">{s.tagline}</p>
          {lead && <p className="body-text mt-5">{lead}</p>}
          {quote && <blockquote className="pull">{quote}</blockquote>}
        </div>
        <div>
          <Rows items={papers} num />
          <Link to={`/IdeaDetail?id=${bookId}`} className="row group">
            <span className="row-num">Book</span>
            <span className="row-body"><span className="row-title">{T(bookId)}</span></span>
          </Link>
        </div>
      </div>
    </Reveal>
  );
}

export default function Home() {
  return (
    <div>
      <section className="hero">
        <OasisHero />
        <div className="hero-veil" />
        <div className="hero-inner">
          <h1 className="h-hero">IntelOasis</h1>
          <p className="hero-text">Every problem has a thousand solutions. Every destination has a thousand routes. This is where we write them down — ideas, software, books, communities, and the long argument with the world about what we're actually supposed to be building.</p>
          <div className="hero-links">
            <Link to="/Books" className="link-cta">Enter the library</Link>
            <Link to="/Ideas" className="link-cta">Take an idea and build it</Link>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <Section label="The Institute" intro="Five rooms. One argument about what a civilization is for.">
          <dl className="index">
            {PORTALS.map(p => (
              <Link key={p.label} to={p.path} className="index-row group">
                <dt className="index-term">{p.label}</dt><dd className="index-def">{p.description}</dd>
              </Link>
            ))}
          </dl>
        </Section>

        <Section id="series" label="The Series" intro="Fifteen inquiries. Each begins with a question no one is asking and follows it to the root.">
          <SeriesIndex list={ALL_SERIES} />
        </Section>

        <Section label="Read First" intro="Three series to start with: the mind, the self, and the world after money.">
          <div className="space-y-24">
            <Featured k="brain" papers={BRAIN_PAPERS} bookId="brain-6" lead={S('brain').desc} quote={`"The symptom is the message. The illness is what the message is about. The medicine of the future will hear what the body is actually saying — and address the source rather than silence the alarm."`} />
            <Featured k="consciousness" papers={CONSCIOUSNESS_PAPERS} bookId="consciousness-6" lead={S('consciousness').desc} />
            <Featured k="global-commons" papers={GLOBAL_COMMONS_PAPERS} bookId="global-commons-6" quote={`"Money doesn't become a score. It stops existing as a concept. Side systems give you the house, the baseline. The only thing that matters is what you produce — and AI will find a use for everything."`} />
          </div>
        </Section>

        <Section label="The Resolution">
          <Link to="/TheResolution" className="row group"><span className="row-body"><span className="row-title">The Gnostic Resolution</span><span className="row-sub">A proposed resolution to the two central problems of Gnostic cosmology — the nature of Yaldabaoth, the destiny of the sparks — resolved not by esoteric doctrine but by love, as taught by Christ. Realistic theological speculation.</span></span></Link>
        </Section>

        <Section label="The Warning">
          <Link to="/Warning" className="row group"><span className="row-body"><span className="row-title">The world has begun unifying through conquest.</span><span className="row-sub">Read the Supreme Warning</span></span></Link>
        </Section>

        <Section label="The Open Library" intro="Every public-domain book, free forever, and yours to remake down to the atom.">
          <div className="feature">
            <div>
              <p className="body-text">Imagine if the golden age of total personal expression on the internet — where your profile was your canvas, and everything about your space was you — was applied to the greatest library ever assembled.</p>
              <p className="body-text mt-5">Every classic ever written, free forever, and completely editable down to the atom. Change the font. Redesign the cover. Build a 3D animated bookshelf with glowing spines. If CSS or HTML can do it, you can do it to any book in the library. Your</p>
              <blockquote className="pull">"Every copy of every great book that ever existed looked exactly the same. For the first time in history, that changes. Your library is yours — in every sense of the word."</blockquote>
            </div>
            <dl className="index">
              {FEATURES.map(([t, b]) => <div key={t} className="index-row"><dt className="index-term sm">{t}</dt><dd className="index-def">{b}</dd></div>)}
            </dl>
          </div>
        </Section>

        <Section label="On the Shelves">
          <Rows items={LIBRARY_HIGHLIGHTS} />
          <p className="mt-8"><Link to="/Books" className="link-cta">The full library</Link></p>
        </Section>
      </div>
    </div>
  );
}

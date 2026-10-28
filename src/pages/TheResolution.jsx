import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

const RESOLUTION_IDEAS = [
  {
    id: 99,
    num: '99',
    color: '#fcd34d',
    bg: 'rgba(252,211,77,0.05)',
    border: 'rgba(252,211,77,0.16)',
    hoverBg: 'rgba(252,211,77,0.09)',
    hoverBorder: 'rgba(252,211,77,0.32)',
    title: 'Chinguetti to Timbuktu — The Walk That Has Never Been Done Right',
    tagline: 'Not the man who endured it. The man who nourished it.',
    summary: 'The walk from Chinguetti to Timbuktu has been made many times as a feat of conquest. No man has done it as a road — with hundreds of camels so fully stocked that no one on the line ever knows scarcity. The man who puts the camel before himself, who prepares through God rather than to impress God, is the man who arrives in abundance. And turns around. And goes back.',
    bullets: [
      'Every man who glorified the suffering fell to the djinn — the ego of the journey took the walk.',
      'The Quran says look at the camel. Jesus says care for it. Put it before you. You will go farther.',
      'Prepare so thoroughly that rationing is never necessary. Abundance is the method, not the reward.',
      'The goal is not the record. The goal is the road — library to university, Chinguetti to Timbuktu, back and forth forever.',
    ],
  },
  {
    id: 97,
    num: '97',
    color: '#5eead4',
    bg: 'rgba(45,212,191,0.06)',
    border: 'rgba(45,212,191,0.18)',
    hoverBg: 'rgba(45,212,191,0.1)',
    hoverBorder: 'rgba(45,212,191,0.35)',
    title: 'The Gnostic Resolution',
    tagline: 'Not escape. Not overthrow. Completion.',
    summary: 'A proposed resolution to the two central problems of Gnostic cosmology — the nature of the Demiurge, and the destiny of the sparks — resolved not by esoteric doctrine, but by love, as taught by Christ.',
    bullets: [
      'Yaldabaoth is not evil — he is ignorant. Love him as you love yourself in your own ignorance.',
      'The sparks don\'t need to be collected back. They need to expand — into every living thing.',
      'The work is not escape from matter. It is the completion of this dimension through ordered, loving life.',
      'The path is the same whether the end is return to the Pleroma or ascent to the next dimension: love, order, structure, life.',
    ],
  },
  {
    id: 98,
    num: '98',
    color: '#6ee7b7',
    bg: 'rgba(110,231,183,0.06)',
    border: 'rgba(110,231,183,0.18)',
    hoverBg: 'rgba(110,231,183,0.1)',
    hoverBorder: 'rgba(110,231,183,0.35)',
    title: 'Humanity as the Seeds of Earth',
    tagline: 'We are not here to escape Earth. We are here to carry her.',
    summary: 'Earth is the tree. We are the fruit. The seed inside us is every ecosystem, every species, every form of life that Earth spent four billion years developing — and sentience is the mechanism by which she solves the problem of getting life off a planet.',
    bullets: [
      'A tree wraps its seeds in fruit so an animal carries them. We are the fruit. The seed is Earth\'s life.',
      'Space colonization is not conquest — it is propagation. We carry ecosystems, not just humans.',
      'The time problem is sacred: the first seeds planted won\'t be harvested by the planter. Start now.',
      'Fix nationalism. Unite under God. Then go to space under God — or the Tower of Babel repeats.',
    ],
  },
];

const PRINCIPLES = [
  {
    heading: 'This is not Gnosticism.',
    body: 'These ideas take Gnostic cosmology seriously as a framework — because its questions are serious. But they are not Gnostic conclusions. The answers proposed here come from Christ: love God, love neighbor, produce good fruit, fill the earth. If the framework is true, Jesus\' teachings are the resolution. If the framework is false, Jesus\' teachings still stand. Either way, the mandate is the same.',
  },
  {
    heading: 'Why engage with Gnosticism at all?',
    body: 'Because millions of people are asking its questions. Why does the world feel broken? Why does a good God permit a flawed creation? What are we actually for? Dismissing the questions doesn\'t answer them. Working through the framework — and showing that love, not escape, is the answer — is more honest and more powerful than pretending the questions don\'t exist.',
  },
  {
    heading: 'The mandate in plain language.',
    body: 'Produce as much ordered, conscious, loving life as this dimension can hold. Address suffering. Restore ecosystems. Illuminate minds. Carry Earth\'s life into space when the time comes — under God, not under empire. Every act that does this is an act of worship. Every act that destroys life, hoards power, or poisons the earth is working against the mandate. The criterion is simple: does it produce more life, more love, more order? Then it is the work.',
  },
  {
    heading: 'On aliens, on race, on the long arc.',
    body: 'Humans who live for generations on other planets will change — gravity, light, atmosphere will reshape the body over centuries. What we call "alien" may simply be us, wearing a different suit, at a different point in the same journey. The hateful ones are sparks that went cold. The loving ones are sparks that found their way home. We are in the middle, which means the most important choice is still ahead of us.',
  },
  {
    heading: 'The Tower of Babel warning.',
    body: 'At Babel, humanity unified under its own ambition — not under God. "Nothing will be impossible for them," God said — and scattered them. The warning is not that space is forbidden. It is that going to space under pride rather than love builds the wrong foundation. Fix the earth first. Unite under God. Then go — and go as seeds, not conquerors.',
  },
  {
    heading: 'The camel before the man — Idea 99.',
    body: 'The walk from Chinguetti to Timbuktu has been done many times as a feat of personal endurance. No one has done it as a road. The man who truly makes it puts the camel before himself — planning so thoroughly that no one on the line ever knows scarcity. Jesus says: care for the camel. Put it before you. The man who glorifies his own suffering loses the walk. The man who nourishes the line arrives in abundance — and turns around and goes back. That is the road that was closed. That is the road that must be opened.',
  },
];

export default function TheResolution() {
  return (
    <div className="min-h-screen" style={{ background: 'transparent' }}>
      {/* Ambient */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px]"
          style={{ background: 'radial-gradient(ellipse at center, rgba(45,212,191,0.07) 0%, transparent 65%)', filter: 'blur(50px)' }} />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px]"
          style={{ background: 'radial-gradient(ellipse, rgba(110,231,183,0.04) 0%, transparent 70%)', filter: 'blur(40px)' }} />
      </div>

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 py-14">

        {/* Back */}
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <Link to="/" className="inline-flex items-center gap-2 text-[12px] mb-10 transition-colors"
            style={{ color: 'rgba(255,255,255,0.25)' }}
            onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.25)'}>
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to IntelOasis
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5 text-[10px] font-semibold tracking-[0.15em] uppercase"
            style={{ background: 'rgba(45,212,191,0.08)', border: '1px solid rgba(45,212,191,0.2)', color: '#5eead4' }}>
            ✝️ &nbsp;Resolved Under Christ
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-[-0.04em] leading-[1.05] mb-4"
            style={{ color: 'rgba(255,255,255,0.92)' }}>
            The Gnostic Questions.<br />
            <span style={{ color: '#5eead4' }}>The Christian Answers.</span>
          </h1>
          <p className="text-[15px] font-light leading-relaxed max-w-xl" style={{ color: 'rgba(255,255,255,0.35)' }}>
            Gnosticism asks the hardest questions about creation, suffering, and purpose. These two ideas take those questions
            seriously — and propose that Jesus Christ, not esoteric escape, is the resolution. The mandate is not to flee matter.
            It is to fill it with love, order, and life.
          </p>

          <div className="mt-6 p-4 rounded-xl" style={{ background: 'rgba(45,212,191,0.05)', border: '1px solid rgba(45,212,191,0.15)' }}>
            <p className="text-[13px] italic font-light leading-relaxed text-center" style={{ color: 'rgba(255,255,255,0.45)' }}>
              "Love the Lord your God with all your heart, soul, and mind. And love your neighbor as yourself."
            </p>
            <p className="text-[11px] text-center mt-1" style={{ color: 'rgba(255,255,255,0.2)' }}>Matthew 22:37–39 — the entire mandate in two sentences. Everything else is application.</p>
          </div>
        </motion.div>

        {/* Idea Cards */}
        <div className="space-y-4 mb-14">
          {RESOLUTION_IDEAS.map((idea, i) => (
            <motion.div key={idea.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}>
              <div className="rounded-2xl overflow-hidden" style={{ background: idea.bg, border: `1px solid ${idea.border}` }}>
                <div className="p-5 md:p-6">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full"
                      style={{ background: `${idea.color}15`, color: idea.color, border: `1px solid ${idea.color}25` }}>
                      Idea {idea.num}
                    </span>
                    <Link to={`/IdeaDetail?id=${idea.id}`}
                      className="inline-flex items-center gap-1 text-[11px] font-medium transition-opacity"
                      style={{ color: idea.color, opacity: 0.7 }}
                      onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                      onMouseLeave={e => e.currentTarget.style.opacity = '0.7'}>
                      Full idea <ArrowUpRight className="w-3 h-3" />
                    </Link>
                  </div>
                  <h2 className="text-[20px] md:text-[24px] font-bold mb-1 leading-tight" style={{ color: 'rgba(255,255,255,0.92)' }}>
                    {idea.title}
                  </h2>
                  <p className="text-[13px] italic mb-3" style={{ color: idea.color, opacity: 0.85 }}>{idea.tagline}</p>
                  <p className="text-[13px] font-light leading-relaxed mb-5" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    {idea.summary}
                  </p>
                  <div className="space-y-2">
                    {idea.bullets.map((b, j) => (
                      <div key={j} className="flex items-start gap-2.5">
                        <div className="flex-shrink-0 w-1 h-1 rounded-full mt-2" style={{ background: idea.color }} />
                        <p className="text-[12px] font-light leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>{b}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px mb-12" style={{ background: 'linear-gradient(90deg, transparent, rgba(45,212,191,0.25), transparent)' }} />

        {/* Principles */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="text-[13px] font-bold tracking-[0.15em] uppercase mb-7" style={{ color: 'rgba(255,255,255,0.3)' }}>
            The Framework — In Plain Language
          </h2>
          <div className="space-y-8">
            {PRINCIPLES.map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.06 }}>
                <h3 className="text-[15px] font-semibold mb-2" style={{ color: 'rgba(255,255,255,0.78)' }}>{p.heading}</h3>
                <p className="text-[13px] font-light leading-relaxed" style={{ color: 'rgba(255,255,255,0.35)' }}>{p.body}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Closing */}
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.6 }} className="mt-14 rounded-2xl p-6 text-center"
          style={{ background: 'rgba(45,212,191,0.04)', border: '1px solid rgba(45,212,191,0.15)' }}>
          <p className="text-[22px] font-black tracking-tight mb-2" style={{ color: 'rgba(255,255,255,0.88)' }}>
            The work is not escape.
          </p>
          <p className="text-[15px] font-light leading-relaxed max-w-lg mx-auto mb-4" style={{ color: 'rgba(255,255,255,0.35)' }}>
            It is completion. Love your God in his ignorance as you love yourself in yours. Honor every spark — in every animal,
            every mountain, every system. Fill this dimension with ordered, conscious, loving life.
          </p>
          <p className="text-[12px] italic" style={{ color: 'rgba(45,212,191,0.6)' }}>
            "Be fruitful and multiply and fill the earth." — Genesis 1:28
          </p>
        </motion.div>

        <div className="mt-10 text-center">
          <Link to="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[12px] font-medium transition-all"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.35)' }}
            onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.35)'}>
            <ArrowLeft className="w-3 h-3" />
            Back to IntelOasis
          </Link>
        </div>

      </div>
    </div>
  );
}
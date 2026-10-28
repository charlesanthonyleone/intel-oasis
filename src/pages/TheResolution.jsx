import { Link } from 'react-router-dom';
import { PageHead, Section } from '@/components/Editorial';

const RESOLUTION_IDEAS = [
  {
    id: 99,
    num: '99',
    color: '#e8cc8a',
    bg: 'rgba(200,164,90,0.05)',
    border: 'rgba(200,164,90,0.16)',
    hoverBg: 'rgba(200,164,90,0.09)',
    hoverBorder: 'rgba(200,164,90,0.32)',
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
    color: '#c8a45a',
    bg: 'rgba(200,164,90,0.06)',
    border: 'rgba(200,164,90,0.18)',
    hoverBg: 'rgba(200,164,90,0.1)',
    hoverBorder: 'rgba(200,164,90,0.35)',
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
    color: '#c8a45a',
    bg: 'rgba(200,164,90,0.06)',
    border: 'rgba(200,164,90,0.18)',
    hoverBg: 'rgba(200,164,90,0.1)',
    hoverBorder: 'rgba(200,164,90,0.35)',
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
    <div className="page">
      <PageHead kicker="The Resolution" title="The Gnostic Questions. The Christian Answers."
        lede="Not escape. Not overthrow. Completion.">
        <p className="ed-body">Gnosticism asks the hardest questions about creation, suffering, and purpose. These two ideas take those questions
          seriously — and propose that Jesus Christ, not esoteric escape, is the resolution. The mandate is not to flee matter.
          It is to fill it with love, order, and life.</p>
      </PageHead>
      <blockquote className="ed-quote">"Love the Lord your God with all your heart, soul, and mind. And love your neighbor as yourself."
        <cite>Matthew 22:37–39 — the entire mandate in two sentences. Everything else is application.</cite></blockquote>
      <Section label="The Three Ideas">
        <ol className="rows">
          {RESOLUTION_IDEAS.map(idea => (
            <li key={idea.id} className="row" style={{ padding: '2.5rem 0' }}>
              <span className="row-num">{idea.num}</span>
              <div className="row-body">
                <Link to={`/IdeaDetail?id=${idea.id}`} className="row-title" style={{ fontSize: 'clamp(24px,2.6vw,32px)' }}>{idea.title}</Link>
                <span className="ed-tag">{idea.tagline}</span>
                <p className="row-sub" style={{ marginTop: '.75rem' }}>{idea.summary}</p>
                <ul className="ed-list">{idea.bullets.map((b, j) => <li key={j}>{b}</li>)}</ul>
                <Link to={`/IdeaDetail?id=${idea.id}`} className="link" style={{ marginTop: '1rem', fontSize: 14 }}>Read Idea {idea.num}</Link>
              </div>
            </li>
          ))}
        </ol>
      </Section>
      <Section label="The Framework — In Plain Language">
        <dl className="index">
          {PRINCIPLES.map(p => (
            <div key={p.heading} className="index-row"><dt className="index-term sm">{p.heading}</dt><dd className="index-def">{p.body}</dd></div>
          ))}
        </dl>
      </Section>
      <section className="ed-sec" style={{ paddingBottom: '3rem' }}>
        <p className="h-feature">The work is not escape.</p>
        <p className="ed-body">It is completion. Love your God in his ignorance as you love yourself in yours. Honor every spark — in every animal,
            every mountain, every system. Fill this dimension with ordered, conscious, loving life.</p>
        <p className="lede-sm" style={{ marginTop: '1.5rem', fontSize: 18 }}>"Be fruitful and multiply and fill the earth." — Genesis 1:28</p>
      </section>
    </div>
  );
}

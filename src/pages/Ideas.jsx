import { useState, useMemo } from 'react';
import { PageHead, Filters, SearchField, ItemRows } from '@/components/Editorial';
import SuggestionBox from '@/components/SuggestionBox';
import ideas from '@/components/ideasData';

const CATEGORIES = [
  { key: 'all',         label: 'All',             accent: '#c8a45a', tags: [] },
  { key: 'ai',          label: 'AI & Tech',        accent: '#c8a45a', tags: ['AI','LLM','Technology','Automation','Wearables'] },
  { key: 'gaming',      label: 'Gaming',           accent: '#c8a45a', tags: ['Gaming','Simulation','ARG','Game','MMORPG','Gamification'] },
  { key: 'health',      label: 'Health',           accent: '#c8a45a', tags: ['Health','Neuroscience','Mental Health','Sleep','Medicine'] },
  { key: 'environment', label: 'Environment',      accent: '#c8a45a', tags: ['Climate','Environment','Ecology','Sustainability','Biodiversity'] },
  { key: 'governance',  label: 'Governance',       accent: '#c8a45a', tags: ['Governance','Policy','Democracy','Law','Justice'] },
  { key: 'social',      label: 'Social',           accent: '#c8a45a', tags: ['Community','Social','Culture','Wellbeing','Heritage'] },
  { key: 'food',        label: 'Food',             accent: '#c8a45a', tags: ['Food','Agriculture','Farming'] },
  { key: 'education',   label: 'Education',        accent: '#c8a45a', tags: ['Education','Learning','Knowledge'] },
  { key: 'philosophy',  label: 'Philosophy',       accent: '#c8a45a', tags: ['Philosophy','Ethics','Consciousness','Metaphysics'] },
  { key: 'art',         label: 'Art & Media',      accent: '#c8a45a', tags: ['Art','Culture','Music','Media','Literature'] },
  { key: 'science',     label: 'Science',          accent: '#c8a45a', tags: ['Science','Space','Biology','Physics','Research'] },
  { key: 'economy',     label: 'Economy',          accent: '#e8cc8a', tags: ['Economy','Commerce','Finance','Decentralized'] },
];

function matchesCat(item, cat) {
  if (cat.key === 'all' || !cat.tags.length) return true;
  const t = (item.tags || []).map(x => x.toLowerCase());
  return cat.tags.some(ct => t.some(it => it.includes(ct.toLowerCase()) || ct.toLowerCase().includes(it)));
}

function matchesQ(item, q) {
  if (!q) return true;
  const lq = q.toLowerCase();
  return item.title.toLowerCase().includes(lq) || item.summary.toLowerCase().includes(lq) || (item.tags||[]).some(t=>t.toLowerCase().includes(lq));
}

export default function IdeasPage() {
  const [cat, setCat] = useState('all');
  const [q, setQ] = useState('');
  const current = CATEGORIES.find(c => c.key === cat) || CATEGORIES[0];
  const list = useMemo(() => ideas.filter(i => matchesCat(i, current) && matchesQ(i, q)), [current, q]);
  return (
    <div className="page">
      <PageHead kicker="Open Source" title="Take any one. Build it."
        lede={`${ideas.length} ideas held in common, each one waiting for the builder who will change the world with it.`}>
        <p className="ed-body">All ideas are formed via relationship. Jesus said: love God, love people — every idea worth building flows from one of those two.</p>
        <div style={{ marginTop: '2rem' }}><SuggestionBox /></div>
      </PageHead>
      <div className="ed-tools">
        <SearchField value={q} onChange={setQ} placeholder="Search the ideas" />
        <Filters items={CATEGORIES.map(c => ({ key: c.key, label: c.label, count: ideas.filter(i => matchesCat(i, c)).length }))} active={cat} onChange={setCat} />
      </div>
      <ItemRows items={list} />
      <div style={{ height: '4rem' }} />
    </div>
  );
}

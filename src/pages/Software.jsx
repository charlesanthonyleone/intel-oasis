import { useState, useMemo } from 'react';
import softwareIdeas from '@/components/softwareData';
import { PageHead, Filters, SearchField, ItemRows } from '@/components/Editorial';

export default function Software() {
  const [cat, setCat] = useState('all');
  const [q, setQ] = useState('');
  const cats = useMemo(() => ['all', ...[...new Set(softwareIdeas.map(i => i.category))].sort()], []);
  const list = softwareIdeas.filter(i => (cat === 'all' || i.category === cat) &&
    (!q || [i.title, i.tagline, i.summary, ...(i.tags || [])].join(' ').toLowerCase().includes(q.toLowerCase())));
  return (
    <div className="page">
      <PageHead kicker="The Workshop" title="Instruments for the problems that actually matter."
        lede={`${softwareIdeas.length} platforms, specified in full and waiting to be built.`} />
      <div className="ed-tools">
        <SearchField value={q} onChange={setQ} placeholder="Search the instruments" />
        <Filters items={cats.map(c => ({ key: c, label: c === 'all' ? 'All' : c, count: c === 'all' ? softwareIdeas.length : softwareIdeas.filter(i => i.category === c).length }))} active={cat} onChange={setCat} />
      </div>
      <ItemRows items={list} meta={i => i.category} />
      <div style={{ height: '4rem' }} />
    </div>
  );
}

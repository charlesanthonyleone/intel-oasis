import { useMemo } from 'react';
import softwareIdeas from '@/components/softwareData';
import { PageHead } from '@/components/Editorial';
import GroupedIndex from '@/components/GroupedIndex';

const PURPOSES = [
  { key: 'protect', label: 'Protection & Trust', cats: ['Child Safety', 'Platform Safety'] },
  { key: 'connect', label: 'Connection & Learning', cats: ['Communication', 'Relationships', 'Education'] },
  { key: 'work', label: 'Intelligence & Enterprise', cats: ['Enterprise AI', 'Productivity', 'Infrastructure', 'Commerce'] },
];

export default function Software() {
  const groups = useMemo(() => {
    const g = PURPOSES.map(p => ({ ...p, items: softwareIdeas.filter(i => p.cats.includes(i.category)) }));
    const rest = softwareIdeas.filter(i => !PURPOSES.some(p => p.cats.includes(i.category)));
    return [...g, { key: 'other', label: 'Further Instruments', items: rest }].filter(x => x.items.length);
  }, []);
  return (
    <div className="page">
      <PageHead kicker="The Workshop" title="Instruments for the problems that actually matter."
        lede={`${softwareIdeas.length} platforms, specified in full and waiting to be built.`} />
      <GroupedIndex groups={groups} meta={i => i.category} placeholder="Search the instruments" noun="instruments" />
      <div style={{ height: '4rem' }} />
    </div>
  );
}

import { useMemo } from 'react';
import booksAndLaw, { series as SERIES } from '@/components/booksAndLawData';
import { PageHead } from '@/components/Editorial';
import GroupedIndex from '@/components/GroupedIndex';

const CAT_LABEL = { book: 'Book', fiction: 'Fiction', law: 'Law & Policy', medical: 'Research' };
const LOOSE = [
  { key: 'book', label: 'Standalone Books' },
  { key: 'fiction', label: 'Standalone Fiction' },
  { key: 'medical', label: 'Research & Papers' },
  { key: 'law', label: 'Law & Policy' },
];

export default function Books() {
  const groups = useMemo(() => {
    const byId = Object.fromEntries(booksAndLaw.map(i => [i.id, i]));
    const inSeries = new Set(SERIES.flatMap(s => s.ids));
    const g = SERIES.map(s => ({ key: s.key, label: s.label, note: s.tagline, to: `/series/${s.key}`, items: s.ids.map(id => byId[id]).filter(Boolean) }));
    const loose = LOOSE.map(l => ({ ...l, items: booksAndLaw.filter(i => i.category === l.key && !inSeries.has(i.id)) }));
    return [...g, ...loose].filter(x => x.items.length);
  }, []);
  return (
    <div className="page">
      <PageHead kicker="The Open Library" title="The Library"
        lede={`Fifteen series and ${booksAndLaw.length} works. Each one asks what is actually happening, and refuses the easy answer.`} />
      <GroupedIndex groups={groups} meta={i => CAT_LABEL[i.category]} placeholder="Search the written works" noun="works" />
      <div style={{ height: '4rem' }} />
    </div>
  );
}

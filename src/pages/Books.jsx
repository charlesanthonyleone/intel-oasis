import { useMemo } from 'react';
import booksAndLaw, { series as SERIES } from '@/components/booksAndLawData';
import { PageHead } from '@/components/Editorial';
import GroupedIndex from '@/components/GroupedIndex';

const CAT_LABEL = { book: 'Book', fiction: 'Fiction', law: 'Law & Policy', medical: 'Research' };
const LOOSE = [
  { key: 'book', label: 'Standalone Books', imgs: [25, 2] },
  { key: 'fiction', label: 'Standalone Fiction', imgs: [19, 23] },
  { key: 'medical', label: 'Research & Papers', imgs: [20, 6] },
  { key: 'law', label: 'Law & Policy', imgs: [4, 13] },
];

const SIMG = { religion: 21, brain: 22, consciousness: 10, 'global-commons': 18, 'gods-math': 9, 'two-arithmetics': 16, 'leviathan-math': 4, 'melting-pot': 28, 'masculine-feminine': 14, 'grand-unification': 17, 'what-you-were-made-for': 15, 'what-the-laws-actually-say': 13, 'true-physics': 27, parenting: 26, 'american-foundational-act': 3 };

export default function Books() {
  const groups = useMemo(() => {
    const byId = Object.fromEntries(booksAndLaw.map(i => [i.id, i]));
    const inSeries = new Set(SERIES.flatMap(s => s.ids));
    const g = [{ key: 'series', label: 'The Series', imgs: [9], items: SERIES.map(s => ({ id: s.key, title: s.label, tagline: s.tagline, summary: s.desc, to: `/series/${s.key}`, img: SIMG[s.key], n: s.ids.length })) }];
    const loose = LOOSE.map(l => ({ ...l, items: booksAndLaw.filter(i => i.category === l.key && !inSeries.has(i.id)) }));
    return [...g, ...loose].filter(x => x.items.length);
  }, []);
  return (
    <div className="page">
      <PageHead kicker="The Open Library" title="The Library"
        lede={`Fifteen series and ${booksAndLaw.length} works. Each one asks what is actually happening, and refuses the easy answer.`} />
      <GroupedIndex groups={groups} meta={i => i.n ? `Series · ${i.n} works` : CAT_LABEL[i.category]} placeholder="Search the written works" noun="works" />
      <div style={{ height: '4rem' }} />
    </div>
  );
}

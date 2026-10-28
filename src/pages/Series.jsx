import { useParams } from 'react-router-dom';
import { seriesIcon } from '@/components/seriesIcons';
import SeriesPage from '@/components/SeriesPage';
import library, { series as allSeries } from '@/components/booksAndLawData';
import PageNotFound from './PageNotFound';

export default function Series() {
  const { key } = useParams();
  const s = allSeries.find(x => x.key === key);
  if (!s) return <PageNotFound />;
  const items = s.ids.map(id => library.find(i => i.id === id));
  const isBook = i => i.category === 'book' || i.category === 'fiction';
  const book = items.length > 1 && isBook(items[items.length - 1]) ? items[items.length - 1] : null;
  const papers = book ? items.slice(0, -1) : items;
  const icon = seriesIcon(s.icon);
  return <SeriesPage series={{ ...s, icon }} papers={papers} book={book} />;
}

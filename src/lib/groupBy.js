// Assign each item to the first theme whose tags match (exclusive), keeping data order; leftovers go to `rest`.
export function groupByTags(items, themes, field = 'tags', rest = { key: 'other', label: 'Further' }) {
  const out = themes.map(t => ({ ...t, items: [] })); const other = { ...rest, items: [] };
  const m = (it, t) => t.tags.some(tt => [].concat(it[field] || []).some(ct => ct.toLowerCase().includes(tt.toLowerCase()) || tt.toLowerCase().includes(ct.toLowerCase())));
  for (const it of items) { const g = out.find(t => m(it, t)); (g || other).items.push(it); }
  return [...out, other].filter(g => g.items.length);
}

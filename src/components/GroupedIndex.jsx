import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { SearchField } from '@/components/Editorial';

/* v13 — scannable listing: search, jump index, then numbered groups.
   Each group opens with one featured entry, then an aligned ledger of rows
   (serif title · one-line descriptor · metadata). Body text is never edited, only clamped visually. */
const pad = n => String(n).padStart(2, '0');
const desc = it => it.tagline || it.summary || '';
const hit = (it, q) => !q || [it.title, it.tagline, it.summary, ...(it.tags || [])].join(' ').toLowerCase().includes(q.toLowerCase());
const POOL = Array.from({ length: 28 }, (_, i) => 'o' + pad(i + 1)).flatMap(k => [k, k + 'b']);
const base = import.meta.env.BASE_URL + 'cards/';
/* Choose a scene per card: prefer the group's subject scenes, never repeat within the last 8 cards,
   and spread usage evenly across the 56 plates (28 scenes + mirrored, re-cropped variants). */
function assign(groups) {
  const used = {}, recent = [], out = {};
  for (const g of groups) g.items.forEach((it, k) => {
    const pref = [].concat(it.img ? [it.img] : [], k === 0 ? (g.imgs || []) : [...(g.imgs || []).slice(1), ...(g.imgs || []).slice(0, 1)])
      .flatMap(n => ['o' + pad(n), 'o' + pad(n) + 'b']);
    const order = [...pref, ...POOL.slice((g.key.length * 7 + k * 11) % 56), ...POOL];
    const ok = order.filter(x => !recent.includes(x.replace('b', '')));
    const min = Math.min(...ok.map(x => used[x] || 0));
    const pick = ok.find(x => (used[x] || 0) === min);
    used[pick] = (used[pick] || 0) + 1; recent.push(pick.replace('b', '')); if (recent.length > 8) recent.shift();
    out[g.key + '|' + (it.id ?? it.title)] = pick;
  });
  return out;
}
function Card({ it, img, meta, feat }) {
  return (
    <Link to={to(it)} className={'oc' + (feat ? ' oc-feat' : '')}>
      <span className="oc-img"><img src={base + img + '.webp'} alt="" loading="lazy" decoding="async" width="800" height="500" /></span>
      <span className="oc-body">
        <span className="oc-k">{feat ? 'Begin here' : ''}{feat && meta ? ' · ' : ''}{meta}</span>
        <span className="oc-t">{it.title}</span>
        {desc(it) && <span className="oc-d">{desc(it)}</span>}
        {feat && it.tagline && it.summary && <span className="oc-s">{it.summary}</span>}
      </span>
    </Link>);
}
const to = it => it.to || `/IdeaDetail?id=${it.id}`;

export default function GroupedIndex({ groups, meta = () => null, placeholder = 'Search', noun = 'entries', search = true }) {
  const [q, setQ] = useState('');
  const shown = useMemo(() => groups.map(g => ({ ...g, items: g.items.filter(i => hit(i, q)) })).filter(g => g.items.length), [groups, q]);
  const total = shown.reduce((a, g) => a + g.items.length, 0);
  const imgs = useMemo(() => assign(shown), [shown]);
  const jump = (k) => document.getElementById('g-' + k)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  return (
    <div className="gx">
      {search && <div className="gx-search"><SearchField value={q} onChange={setQ} placeholder={placeholder} />
        {q && <p className="gx-res">{total} {noun} match “{q}”</p>}</div>}
      {shown.length > 1 && <div className="gx-bar">
        {shown.length > 1 && <nav className="gx-nav" aria-label="Sections">
          {shown.map((g, i) => <button key={g.key} onClick={() => jump(g.key)}><span className="gx-n">{pad(i + 1)}</span>{g.label}<span className="gx-c">{g.items.length}</span></button>)}
        </nav>}
      </div>}
      {!shown.length && <p className="row-sub ed-empty">Nothing matches that search.</p>}
      {shown.map((g, gi) => {
        return (
          <section key={g.key} id={'g-' + g.key} className="gx-group">
            <header className="gx-head">
              <span className="gx-num">{pad(gi + 1)}</span>
              <div className="gx-hd">
                <h2 className="gx-title">{g.to ? <Link className="link" to={g.to}>{g.label}</Link> : g.label}</h2>
                {g.note && <p className="gx-note">{g.note}</p>}
              </div>
              <span className="gx-count">{g.items.length} {g.items.length === 1 ? noun.replace(/s$/, '').replace(/ie$/, 'y') : noun}</span>
            </header>
            <div className="oc-grid">
              {g.items.map((it, k) => <Card key={it.id ?? it.title} it={it} feat={k === 0 && g.items.length > 2} meta={meta(it)} img={imgs[g.key + '|' + (it.id ?? it.title)]} />)}
            </div>
          </section>);
      })}
    </div>
  );
}

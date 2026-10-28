import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import clubs from '@/components/clubsData';
import { PageHead, Filters, SearchField, ItemRows } from '@/components/Editorial';

const THEMES = [
  { key: 'all', label: 'All', tags: [] },
  { key: 'media', label: 'Media & Culture', tags: ['News','Film','Music','Sports','Entertainment','Cinema','Television','Wrestling'] },
  { key: 'knowledge', label: 'Knowledge & Learning', tags: ['Law','History','Learning','Mastery','Knowledge','Archive','Archaeology','Education'] },
  { key: 'community', label: 'Community & Safety', tags: ['Community Safety','Child Safety','Accountability','Protection','Guardian'] },
  { key: 'wellness', label: 'Health & Wellness', tags: ['Health','Fitness','Biohacking','Cannabis','Wellness','Performance'] },
  { key: 'tech', label: 'Tech & Code', tags: ['Code','Development','AI','Open Source','Bots','Automation','Games','Simulation'] },
  { key: 'lifestyle', label: 'Lifestyle & Home', tags: ['Food','Cooking','Farming','Household','Maintenance','Habits','Productivity'] },
  { key: 'society', label: 'Society & Philosophy', tags: ['Philosophy','Ethics','Leadership','Economics','Consciousness','Metaphysics','Psychology'] },
];
const inTheme = (c, t) => !t.tags.length || t.tags.some(tt => (c.tags || []).some(ct => ct.toLowerCase().includes(tt.toLowerCase()) || tt.toLowerCase().includes(ct.toLowerCase())));
const hit = (c, q) => !q || [c.title, c.summary, ...(c.tags || [])].join(' ').toLowerCase().includes(q.toLowerCase());

export default function Clubs() {
  const [theme, setTheme] = useState('all');
  const [q, setQ] = useState('');
  const list = useMemo(() => clubs.filter(c => inTheme(c, THEMES.find(t => t.key === theme)) && hit(c, q)), [theme, q]);
  return (
    <div className="page">
      <PageHead kicker="The Societies" title="Every club is a world."
        lede={`Every member, a builder. ${clubs.length} standing societies, each one a discipline, a duty and a place to belong.`} />
      <div className="ed-tools">
        <SearchField value={q} onChange={setQ} placeholder="Search the societies" />
        <Filters items={THEMES.map(t => ({ ...t, count: clubs.filter(c => inTheme(c, t)).length }))} active={theme} onChange={setTheme} />
      </div>
      <ItemRows items={list} />
      <p className="ed-body" style={{ margin: '4rem 0' }}>Societies keep their rites. <Link className="link" to="/Traditions">Read the Living Traditions</Link></p>
    </div>
  );
}

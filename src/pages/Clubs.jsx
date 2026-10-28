import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import clubs from '@/components/clubsData';
import { PageHead } from '@/components/Editorial';
import GroupedIndex from '@/components/GroupedIndex';
import { groupByTags } from '@/lib/groupBy';

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
// eslint-disable-next-line no-unused-vars
const inTheme = (c, t) => !t.tags.length || t.tags.some(tt => (c.tags || []).some(ct => ct.toLowerCase().includes(tt.toLowerCase()) || tt.toLowerCase().includes(ct.toLowerCase())));
const hit = (c, q) => !q || [c.title, c.summary, ...(c.tags || [])].join(' ').toLowerCase().includes(q.toLowerCase());

export default function Clubs() {
  const groups = useMemo(() => groupByTags(clubs, ['wellness','community','tech','media','knowledge','lifestyle','society'].map(k => THEMES.find(t => t.key === k)), 'tags', { key: 'other', label: 'Singular Orders' }), []);
  return (
    <div className="page">
      <PageHead kicker="The Societies" title="Every club is a world."
        lede={`Every member, a builder. ${clubs.length} standing societies, each one a discipline, a duty and a place to belong.`} />
      <GroupedIndex groups={groups} meta={c => (c.tags || [])[0]} placeholder="Search the societies" noun="societies" />
      <p className="ed-body" style={{ margin: '4rem 0' }}>Societies keep their rites. <Link className="link" to="/Traditions">Read the Living Traditions</Link></p>
    </div>
  );
}

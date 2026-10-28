import traditions from '@/data/traditions.json';
import { PageHead } from '@/components/Editorial';
import GroupedIndex from '@/components/GroupedIndex';

export default function Traditions() {
  return (
    <div className="page">
      <PageHead kicker="Living Traditions" title="Rites worth inheriting."
        lede="Not rules — rituals.">
        <p className="ed-body">Practices passed down, built up, and carried forward. Not rules — rituals. Ways of living that create honesty, closeness, and the kind of depth that most people are quietly starving for.</p>
      </PageHead>
      <GroupedIndex groups={[{ key: 'rites', label: 'The Living Rites', items: traditions }]} search={false} noun="rites" />
      <div style={{ height: '4rem' }} />
    </div>
  );
}

import traditions from '@/data/traditions.json';
import { PageHead, ItemRows } from '@/components/Editorial';

export default function Traditions() {
  return (
    <div className="page">
      <PageHead kicker="Living Traditions" title="Rites worth inheriting."
        lede="Not rules — rituals.">
        <p className="ed-body">Practices passed down, built up, and carried forward. Not rules — rituals. Ways of living that create honesty, closeness, and the kind of depth that most people are quietly starving for.</p>
      </PageHead>
      <ItemRows items={traditions} />
      <div style={{ height: '4rem' }} />
    </div>
  );
}

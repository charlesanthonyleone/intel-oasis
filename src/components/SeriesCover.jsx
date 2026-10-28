import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { seriesIcon } from '@/components/seriesIcons';

export function SeriesIconView({ icon, color, size = 20 }) {
  const I = seriesIcon(icon);
  if (typeof I === 'string') return <span style={{ fontSize: size }} aria-hidden>{I}</span>;
  return <I style={{ width: size, height: size, color }} />;
}

export function SeriesCover({ s }) {
  const a = s.accent;
  return (
    <Link to={`/series/${s.key}`} className="group relative block h-full rounded-2xl overflow-hidden p-6 glass-hover"
      style={{ background: `radial-gradient(ellipse at 100% 0%, ${a}30, transparent 60%), linear-gradient(160deg, ${a}12, rgba(255,255,255,0.015) 60%)`, border: `1px solid ${a}33`, minHeight: 230 }}>
      <div className="absolute left-0 top-0 bottom-0 w-[3px]" style={{ background: `linear-gradient(180deg, ${a}, transparent)` }} />
      <div className="flex items-start justify-between mb-10">
        <span className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `${a}1c`, border: `1px solid ${a}44` }}>
          <SeriesIconView icon={s.icon} color={a} />
        </span>
        {s.badge && <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full" style={{ background: `${a}14`, color: a, border: `1px solid ${a}33` }}>{s.badge}</span>}
      </div>
      <h3 className="font-display text-[26px] font-semibold leading-[1.08] text-white mb-2">{s.label}</h3>
      {s.tagline && <p className="font-display italic text-[17px] leading-snug" style={{ color: a }}>{s.tagline}</p>}
      <ArrowUpRight className="absolute bottom-5 right-5 w-5 h-5 opacity-30 group-hover:opacity-100 transition-opacity" style={{ color: a }} />
    </Link>
  );
}

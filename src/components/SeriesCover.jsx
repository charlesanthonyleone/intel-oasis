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
    <Link to={`/series/${s.key}`} className="group relative flex flex-col h-full rounded-2xl overflow-hidden p-8 glass glass-hover" style={{ minHeight: 250 }}>
      <div className="flex items-center gap-3 mb-12">
        <span className="h-px w-6 transition-all duration-700 group-hover:w-10" style={{ background: a, opacity: 0.6 }} />
        {s.badge && <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: a }}>{s.badge}</span>}
      </div>
      <h3 className="font-display text-[28px] font-light leading-[1.1] text-white/90 mb-3">{s.label}</h3>
      {s.tagline && <p className="font-display italic text-[17px] leading-snug text-white/45">{s.tagline}</p>}
      <ArrowUpRight className="absolute top-8 right-8 w-4 h-4 opacity-20 group-hover:opacity-80 transition-opacity duration-500" style={{ color: a }} />
    </Link>
  );
}

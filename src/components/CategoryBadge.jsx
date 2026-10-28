import { cn } from '@/lib/utils';

const categoryConfig = {
  // General ideas
  ai:         { label: 'AI & Technology', color: 'bg-violet-500/10 text-violet-400 border-violet-500/20' },
  gaming:     { label: 'Gaming & Simulation', color: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' },
  health:     { label: 'Health & Bio', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
  science:    { label: 'Science & Research', color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' },
  governance: { label: 'Governance & Civic', color: 'bg-sky-500/10 text-sky-400 border-sky-500/20' },
  economics:  { label: 'Economics & Finance', color: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
  environment:{ label: 'Environment & Earth', color: 'bg-green-500/10 text-green-400 border-green-500/20' },
  education:  { label: 'Education & Learning', color: 'bg-rose-500/10 text-rose-400 border-rose-500/20' },
  social:     { label: 'Social & Community', color: 'bg-pink-500/10 text-pink-400 border-pink-500/20' },
  art:        { label: 'Art & Culture', color: 'bg-orange-500/10 text-orange-400 border-orange-500/20' },
  philosophy: { label: 'Philosophy & Mind', color: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
  food:       { label: 'Food & Agriculture', color: 'bg-lime-500/10 text-lime-400 border-lime-500/20' },
  space:      { label: 'Space & Future', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
  justice:    { label: 'Justice & Rights', color: 'bg-red-500/10 text-red-400 border-red-500/20' },
  // Type categories
  club:       { label: 'LU Club', color: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
  book:       { label: 'Book Idea', color: 'bg-rose-500/10 text-rose-400 border-rose-500/20' },
  law:        { label: 'Law & Policy', color: 'bg-sky-500/10 text-sky-400 border-sky-500/20' },
  medical:    { label: 'Medical Research', color: 'bg-teal-500/10 text-teal-400 border-teal-500/20' },
};

export default function CategoryBadge({ category, className }) {
  const cfg = categoryConfig[category] || { label: category, color: 'bg-white/[0.04] text-white/30 border-white/[0.08]' };
  return (
    <span className={cn('inline-flex items-center px-2 py-0.5 rounded-full border text-[10px] font-semibold tracking-widest uppercase', cfg.color, className)}>
      {cfg.label}
    </span>
  );
}

export { categoryConfig };
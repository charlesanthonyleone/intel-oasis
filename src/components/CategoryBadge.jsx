import { cn } from '@/lib/utils';

const categoryConfig = {
  // General ideas
  ai:         { label: 'AI & Technology', color: 'bg-[#c8a45a]/10 text-[#c8a45a] border-[#c8a45a]/20' },
  gaming:     { label: 'Gaming & Simulation', color: 'bg-[#c8a45a]/10 text-[#c8a45a] border-[#c8a45a]/20' },
  health:     { label: 'Health & Bio', color: 'bg-[#c8a45a]/10 text-[#c8a45a] border-[#c8a45a]/20' },
  science:    { label: 'Science & Research', color: 'bg-[#c8a45a]/10 text-[#c8a45a] border-[#c8a45a]/20' },
  governance: { label: 'Governance & Civic', color: 'bg-[#c8a45a]/10 text-[#c8a45a] border-[#c8a45a]/20' },
  economics:  { label: 'Economics & Finance', color: 'bg-[#c8a45a]/10 text-[#c8a45a] border-[#c8a45a]/20' },
  environment:{ label: 'Environment & Earth', color: 'bg-[#c8a45a]/10 text-[#c8a45a] border-[#c8a45a]/20' },
  education:  { label: 'Education & Learning', color: 'bg-[#c8a45a]/10 text-[#c8a45a] border-[#c8a45a]/20' },
  social:     { label: 'Social & Community', color: 'bg-[#c8a45a]/10 text-[#c8a45a] border-[#c8a45a]/20' },
  art:        { label: 'Art & Culture', color: 'bg-[#c8a45a]/10 text-[#c8a45a] border-[#c8a45a]/20' },
  philosophy: { label: 'Philosophy & Mind', color: 'bg-[#c8a45a]/10 text-[#c8a45a] border-[#c8a45a]/20' },
  food:       { label: 'Food & Agriculture', color: 'bg-[#c8a45a]/10 text-[#c8a45a] border-[#c8a45a]/20' },
  space:      { label: 'Space & Future', color: 'bg-[#c8a45a]/10 text-[#c8a45a] border-[#c8a45a]/20' },
  justice:    { label: 'Justice & Rights', color: 'bg-[#c8a45a]/10 text-[#c8a45a] border-[#c8a45a]/20' },
  // Type categories
  club:       { label: 'LU Club', color: 'bg-[#c8a45a]/10 text-[#c8a45a] border-[#c8a45a]/20' },
  book:       { label: 'Book Idea', color: 'bg-[#c8a45a]/10 text-[#c8a45a] border-[#c8a45a]/20' },
  law:        { label: 'Law & Policy', color: 'bg-[#c8a45a]/10 text-[#c8a45a] border-[#c8a45a]/20' },
  medical:    { label: 'Medical Research', color: 'bg-[#c8a45a]/10 text-[#c8a45a] border-[#c8a45a]/20' },
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
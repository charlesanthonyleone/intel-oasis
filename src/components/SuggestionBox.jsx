import { Lightbulb, Github } from 'lucide-react';

// Static replacement for the Base44 suggestion box: suggestions go to GitHub Issues.
export default function SuggestionBox() {
  return (
    <a href="https://github.com/charlesanthonyleone/intel-oasis/issues/new?title=Idea%20suggestion&labels=suggestion"
      target="_blank" rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[12px] font-medium transition-all"
      style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.25)', color: '#a78bfa' }}>
      <Lightbulb className="w-3.5 h-3.5" /> Suggest an idea <Github className="w-3.5 h-3.5 opacity-60" />
    </a>
  );
}

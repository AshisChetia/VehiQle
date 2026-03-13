import { SUGGESTED_PROMPTS } from '../../contents/index.js';
import { Lightbulb } from 'lucide-react';

export default function SuggestedPrompts({ onSelect }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-slate-400">
        <Lightbulb size={13} />
        <span className="text-xs font-bold uppercase tracking-widest">Suggested</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {SUGGESTED_PROMPTS.map((prompt) => (
          <button
            key={prompt}
            onClick={() => onSelect(prompt)}
            className="px-4 py-2 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-600 hover:border-primary hover:text-primary hover:bg-primary-pale transition-all duration-200 text-left shadow-sm"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
}
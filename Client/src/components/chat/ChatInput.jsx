import { useState, useRef } from 'react';
import { Send } from 'lucide-react';

export default function ChatInput({
  onSend,
  loading = false,
  placeholder = 'Ask anything about your car...',
}) {
  const [value, setValue] = useState('');
  const ref = useRef(null);

  const submit = (e) => {
    e?.preventDefault();
    if (!value.trim() || loading) return;
    onSend(value.trim());
    setValue('');
    ref.current?.focus();
  };

  const onKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submit(); }
  };

  return (
    <form onSubmit={submit} className="flex items-end gap-3">
      <textarea
        ref={ref}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={onKey}
        placeholder={placeholder}
        rows={1}
        className="flex-1 resize-none rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all max-h-32 overflow-y-auto leading-relaxed scrollbar-hide"
      />
      <button
        type="submit"
        disabled={!value.trim() || loading}
        className="h-11 w-11 flex-shrink-0 flex items-center justify-center rounded-2xl bg-primary text-white hover:bg-primary-hover hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none transition-all duration-200 shadow-sm"
      >
        <Send size={15} />
      </button>
    </form>
  );
}
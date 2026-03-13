import { Bot } from 'lucide-react';

export default function ChatBubble({ message }) {
  const isUser = message.role === 'user';
  const time = new Date(message.createdAt).toLocaleTimeString('en-US', {
    hour: '2-digit', minute: '2-digit',
  });

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {!isUser && (
        <div className="w-8 h-8 bg-primary rounded-2xl flex items-center justify-center text-white flex-shrink-0 mt-1 shadow-sm">
          <Bot size={14} />
        </div>
      )}
      <div className={`flex flex-col gap-1 max-w-[78%] ${isUser ? 'items-end' : 'items-start'}`}>
        <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed font-medium shadow-sm ${
          isUser
            ? 'bg-primary text-white rounded-tr-sm'
            : 'bg-white border border-slate-100 text-slate-800 rounded-tl-sm'
        }`}>
          {message.content}
        </div>
        <span className="text-[11px] text-slate-400 font-semibold px-1">{time}</span>
      </div>
    </div>
  );
}
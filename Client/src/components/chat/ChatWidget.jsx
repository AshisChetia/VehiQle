import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Bot, Minimize2 } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useChat } from '../../hooks/useChat';
import { useAuth } from '../../hooks/useAuth';
import { ROUTES } from '../../constants/index.js';
import ChatBubble from './ChatBubble';
import ChatInput from './ChatInput';
import SuggestedPrompts from './SuggestedPrompts';
import Spinner from '../ui/Spinner';

const HIDDEN_ON = [ROUTES.CHAT, ROUTES.LOGIN, ROUTES.REGISTER, ROUTES.HOME];

export default function ChatWidget() {
  const { pathname } = useLocation();
  const { user }     = useAuth();
  const { messages, send } = useChat();
  const [open,    setOpen   ] = useState(false);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  if (!user || HIDDEN_ON.includes(pathname)) return null;

  const handleSend = async (text) => {
    setLoading(true);
    try { await send(text); }
    finally { setLoading(false); }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

      {/* Chat panel */}
      {open && (
        <div className="w-[360px] h-[520px] bg-white rounded-3xl shadow-[0_30px_80px_rgba(0,0,0,0.16)] border border-slate-100 flex flex-col overflow-hidden animate-fade-in-up">

          {/* Header */}
          <div className="flex items-center gap-3 px-5 py-4 bg-primary rounded-t-3xl flex-shrink-0">
            <div className="w-9 h-9 bg-white/15 rounded-2xl flex items-center justify-center text-white">
              <Bot size={17} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-bold text-sm leading-tight">VehiQle AI</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <p className="text-white/60 text-xs font-semibold">Powered by Gemini</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white/60 hover:text-white transition-colors ml-1"
            >
              <Minimize2 size={15} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-hide bg-slate-50/40">
            {messages.length === 0 ? (
              <div className="space-y-5">
                <div className="text-center pt-4">
                  <div className="w-14 h-14 bg-primary rounded-3xl flex items-center justify-center text-white mx-auto mb-4 shadow-lg">
                    <Bot size={26} />
                  </div>
                  <p className="text-sm font-bold text-slate-800 mb-1">
                    Hi, I'm your AI Mechanic!
                  </p>
                  <p className="text-xs text-slate-500 font-medium">
                    Ask me anything about your vehicle.
                  </p>
                </div>
                <SuggestedPrompts onSelect={handleSend} />
              </div>
            ) : (
              messages.map(msg => <ChatBubble key={msg._id} message={msg} />)
            )}

            {/* Typing indicator */}
            {loading && (
              <div className="flex gap-3 items-center">
                <div className="w-8 h-8 bg-primary rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                  <Bot size={14} />
                </div>
                <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                  <Spinner size="sm" className="text-primary" />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="px-4 py-4 border-t border-slate-100 bg-white flex-shrink-0">
            <ChatInput onSend={handleSend} loading={loading} />
          </div>
        </div>
      )}

      {/* FAB toggle */}
      <button
        onClick={() => setOpen(p => !p)}
        className="h-14 w-14 flex items-center justify-center bg-primary text-white rounded-full
          shadow-[0_8px_30px_rgba(15,81,50,0.4)] hover:bg-primary-hover
          hover:-translate-y-1 hover:shadow-[0_14px_40px_rgba(15,81,50,0.45)]
          transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/40"
        aria-label="Toggle AI Chat"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </div>
  );
}
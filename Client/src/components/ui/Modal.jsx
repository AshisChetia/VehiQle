import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

const sizes = { sm: 'max-w-md', md: 'max-w-lg', lg: 'max-w-2xl', xl: 'max-w-4xl' };

export default function Modal({ isOpen, onClose, title, children, size = 'md' }) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
      <div
        className={`relative w-full ${sizes[size]} bg-white rounded-3xl
          shadow-[0_30px_80px_-10px_rgba(0,0,0,0.25)] animate-fade-in-up overflow-hidden`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-7 pt-7 pb-0">
          {title && <h3 className="text-xl font-bold text-slate-900">{title}</h3>}
          <button
            onClick={onClose}
            className="ml-auto flex h-8 w-8 items-center justify-center rounded-full
              text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all"
          >
            <X size={17} />
          </button>
        </div>
        <div className="p-7 pt-5">{children}</div>
      </div>
    </div>,
    document.body
  );
}
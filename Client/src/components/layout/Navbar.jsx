import { Bell, Search } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export default function Navbar({ title }) {
  const { user } = useAuth();

  return (
    <header className="fixed top-0 right-0 left-64 z-40 h-16 bg-white/90 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-8">

      {/* Page title (mobile) */}
      <p className="font-heading font-bold text-slate-900 text-lg md:hidden">{title}</p>

      {/* Search bar */}
      <div className="relative hidden md:flex items-center">
        <Search size={14} className="absolute left-4 text-slate-400 pointer-events-none" />
        <input
          type="text"
          placeholder="Search vehicles, services..."
          className="h-10 w-72 pl-10 pr-5 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-700 placeholder-slate-400 transition-all focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary focus:w-80"
        />
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-3 ml-auto">

        {/* Notification bell */}
        <button className="relative h-10 w-10 flex items-center justify-center rounded-2xl text-slate-500 hover:text-primary hover:bg-primary-pale transition-all">
          <Bell size={18} />
          <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-danger border-2 border-white" />
        </button>

        {/* Divider */}
        <div className="h-6 w-px bg-slate-200" />

        {/* Avatar */}
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-2xl bg-primary text-white flex items-center justify-center text-sm font-bold shadow-sm">
            {user?.name?.[0]?.toUpperCase() ?? 'U'}
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-bold text-slate-900 leading-tight">{user?.name ?? 'User'}</p>
            <p className="text-xs text-slate-400 font-medium">Free Plan</p>
          </div>
        </div>
      </div>
    </header>
  );
}
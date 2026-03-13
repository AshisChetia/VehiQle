import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Car, Bot, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { ROUTES, APP_NAME } from '../../constants';
import logo from '../../assets/icons/logo.png';

const NAV_ITEMS = [
  { label: 'Dashboard', icon: LayoutDashboard, to: ROUTES.DASHBOARD },
  { label: 'Vehicles',  icon: Car,              to: ROUTES.VEHICLES  },
  { label: 'AI Chat',   icon: Bot,              to: ROUTES.CHAT      },
];

export default function Sidebar() {
  const { user, logout } = useAuth();

  return (
    <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-100 flex flex-col">

      {/* Logo */}
      <div className="flex items-center gap-3 px-6 h-16 border-b border-slate-100 flex-shrink-0">
        <img
          src={logo}
          alt={APP_NAME}
          className="h-8 w-8 scale-[1.6] origin-left object-contain"
        />
        <span className="font-heading font-bold text-lg text-slate-900 ml-2">
          Vehi<span className="text-primary">Qle</span>
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto scrollbar-hide">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 mb-3">
          Menu
        </p>
        {NAV_ITEMS.map(({ label, icon: Icon, to }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold
              transition-all duration-200
              ${isActive
                ? 'bg-primary text-white shadow-[0_6px_20px_rgba(15,81,50,0.3)]'
                : 'text-slate-500 hover:text-primary hover:bg-primary-pale'
              }
            `}
          >
            {({ isActive }) => (
              <>
                <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                {label}
                {isActive && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white/60" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User + Logout */}
      <div className="px-3 py-4 border-t border-slate-100 flex-shrink-0">
        <div className="flex items-center gap-3 px-3 py-2 mb-2">
          <div className="h-9 w-9 rounded-2xl bg-primary text-white flex items-center justify-center text-sm font-bold flex-shrink-0 shadow-sm">
            {user?.name?.[0]?.toUpperCase() ?? 'U'}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-slate-900 truncate leading-tight">
              {user?.name ?? 'User'}
            </p>
            <p className="text-xs text-slate-400 font-medium truncate">
              {user?.email ?? ''}
            </p>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold
            text-slate-500 hover:text-danger hover:bg-red-50 transition-all duration-200"
        >
          <LogOut size={15} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
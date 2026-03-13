import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Car, Gauge, CalendarDays, MoreVertical, Edit2, Trash2, ArrowRight } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { formatDate } from '../../utils/formatDate';
import { formatMileage } from '../../utils/formatMileage';
import { ROUTES } from '../../constants';

export default function VehicleCard({ vehicle, onEdit, onDelete }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const detailPath = ROUTES.VEHICLE_DETAIL.replace(':id', vehicle._id);

  return (
    <Card variant="elevated" hover className="relative overflow-hidden group">

      {/* Top accent strip */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary to-accent" />

      {/* Header row */}
      <div className="flex items-start justify-between pt-3 mb-5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-primary-pale rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-400 flex-shrink-0">
            <Car size={22} strokeWidth={2} />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-lg leading-tight">
              {vehicle.year} {vehicle.make}
            </h3>
            <p className="text-slate-500 text-sm font-semibold">{vehicle.model}</p>
          </div>
        </div>

        {/* Dropdown menu */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(p => !p)}
            className="h-8 w-8 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all"
          >
            <MoreVertical size={15} />
          </button>

          {menuOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
              <div className="absolute right-0 top-9 z-20 w-44 bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.12)] border border-slate-100 overflow-hidden py-1.5 animate-fade-in-up">
                <button
                  onClick={() => { onEdit(vehicle); setMenuOpen(false); }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <Edit2 size={13} /> Edit Vehicle
                </button>
                <div className="h-px bg-slate-100 mx-3 my-1" />
                <button
                  onClick={() => { onDelete(vehicle._id); setMenuOpen(false); }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-danger hover:bg-red-50 transition-colors"
                >
                  <Trash2 size={13} /> Delete
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Stat pills */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="bg-slate-50 rounded-2xl p-3.5">
          <div className="flex items-center gap-1.5 text-slate-400 mb-1.5">
            <Gauge size={12} />
            <span className="text-[11px] font-bold uppercase tracking-wide">Mileage</span>
          </div>
          <p className="text-sm font-extrabold text-slate-900">
            {formatMileage(vehicle.currentMileage)}
          </p>
        </div>
        <div className="bg-slate-50 rounded-2xl p-3.5">
          <div className="flex items-center gap-1.5 text-slate-400 mb-1.5">
            <CalendarDays size={12} />
            <span className="text-[11px] font-bold uppercase tracking-wide">Last Service</span>
          </div>
          <p className="text-sm font-extrabold text-slate-900">
            {formatDate(vehicle.lastServiceDate) ?? '—'}
          </p>
        </div>
      </div>

      {vehicle.licensePlate && (
        <div className="mb-4">
          <Badge label={vehicle.licensePlate} variant="primary" size="sm" dot />
        </div>
      )}

      {/* CTA link */}
      <Link
        to={detailPath}
        className="flex items-center justify-center gap-2 w-full h-10 rounded-2xl border border-slate-200 text-sm font-bold text-slate-600 hover:border-primary hover:text-primary hover:bg-primary-pale transition-all duration-200 group/link"
      >
        View Details
        <ArrowRight size={14} className="group-hover/link:translate-x-0.5 transition-transform" />
      </Link>
    </Card>
  );
}
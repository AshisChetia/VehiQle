import { AlertTriangle, CheckCircle2, Clock, BellOff, Zap } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { formatMileage } from '../../utils/formatMileage';
import { getAlertUrgency } from '../../utils/alertUrgency';
import { URGENCY } from '../../constants';

const CONFIG = {
  [URGENCY.CRITICAL]: {
    badge: 'critical', borderClass: 'border-red-200',
    bgClass: 'bg-red-50', icon: AlertTriangle, iconColor: 'text-red-500',
    label: 'Critical', barColor: 'bg-danger',
  },
  [URGENCY.HIGH]: {
    badge: 'high', borderClass: 'border-orange-200',
    bgClass: 'bg-orange-50', icon: Zap, iconColor: 'text-orange-500',
    label: 'High Priority', barColor: 'bg-orange-400',
  },
  [URGENCY.MEDIUM]: {
    badge: 'medium', borderClass: 'border-amber-200',
    bgClass: 'bg-amber-50', icon: Clock, iconColor: 'text-amber-500',
    label: 'Upcoming', barColor: 'bg-amber-400',
  },
  [URGENCY.LOW]: {
    badge: 'low', borderClass: 'border-green-200',
    bgClass: 'bg-green-50', icon: CheckCircle2, iconColor: 'text-green-500',
    label: 'On Track', barColor: 'bg-accent',
  },
};

export default function AlertCard({ alert, onComplete, onSnooze }) {
  const urgency = getAlertUrgency(alert.kmRemaining);
  const { badge, borderClass, bgClass, icon: Icon, iconColor, label, barColor } = CONFIG[urgency];

  return (
    <Card
      variant="outlined"
      padding="default"
      className={`border ${borderClass} hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden`}
    >
      {/* Urgency bar */}
      <div className={`absolute top-0 inset-x-0 h-1 ${barColor}`} />

      <div className="flex items-start gap-4 pt-1 mb-4">
        <div className={`w-11 h-11 ${bgClass} rounded-2xl flex items-center justify-center flex-shrink-0`}>
          <Icon size={20} className={iconColor} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h4 className="font-bold text-slate-900 text-base truncate">{alert.serviceType}</h4>
            <Badge label={label} variant={badge} size="sm" dot />
          </div>
          <p className="text-sm text-slate-400 font-semibold truncate">{alert.vehicleName}</p>
        </div>
      </div>

      <div className="bg-slate-50 rounded-2xl px-4 py-3 mb-4 text-center">
        <p className="text-xs text-slate-500 font-semibold uppercase tracking-wide mb-0.5">Due in</p>
        <p className="text-xl font-extrabold text-slate-900">{formatMileage(alert.kmRemaining)}</p>
      </div>

      <div className="flex gap-2">
        <Button
          onClick={() => onComplete(alert._id)}
          variant="primary" size="sm"
          icon={CheckCircle2} iconPosition="left"
          fullWidth
        >
          Done
        </Button>
        <Button
          onClick={() => onSnooze(alert._id)}
          variant="outline" size="sm"
          icon={BellOff} iconPosition="left"
          fullWidth
        >
          Snooze
        </Button>
      </div>
    </Card>
  );
}
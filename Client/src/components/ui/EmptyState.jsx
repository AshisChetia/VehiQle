import { PackageOpen } from 'lucide-react';
import Button from './Button';

export default function EmptyState({
  icon: Icon = PackageOpen,
  title = 'Nothing here yet',
  description = 'Get started by adding your first item.',
  actionLabel,
  onAction,
  actionHref,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
      <div className="w-24 h-24 bg-honeydew-100 rounded-3xl flex items-center justify-center text-primary mb-7 shadow-inner">
        <Icon size={40} strokeWidth={1.4} />
      </div>
      <h3 className="text-2xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-500 text-base max-w-sm mb-8 font-medium leading-relaxed">{description}</p>
      {actionLabel && (
        <Button href={actionHref} onClick={onAction} variant="primary" size="md">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
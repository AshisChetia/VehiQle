const variants = {
  default:  'bg-slate-100   text-slate-600',
  primary:  'bg-honeydew-100 text-primary',
  critical: 'bg-red-100     text-red-700',
  high:     'bg-orange-100  text-orange-700',
  medium:   'bg-amber-100   text-amber-700',
  low:      'bg-green-100   text-green-700',
  success:  'bg-emerald-100 text-emerald-700',
  info:     'bg-blue-100    text-blue-700',
};

const dots = {
  default: 'bg-slate-400', primary: 'bg-primary', critical: 'bg-red-500',
  high: 'bg-orange-500', medium: 'bg-amber-500', low: 'bg-green-500',
  success: 'bg-emerald-500', info: 'bg-blue-500',
};

const sizes = { sm: 'text-xs px-2.5 py-0.5', md: 'text-xs px-3 py-1', lg: 'text-sm px-4 py-1.5' };

export default function Badge({ label, variant = 'default', size = 'md', dot = false }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full font-semibold ${variants[variant]} ${sizes[size]}`}>
      {dot && <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dots[variant]}`} />}
      {label}
    </span>
  );
}
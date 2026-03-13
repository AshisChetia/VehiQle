const variants = {
  default:  'bg-white border border-slate-100',
  elevated: 'bg-white shadow-[0_8px_40px_rgba(0,0,0,0.06)] border border-slate-50',
  outlined: 'bg-white border-2 border-slate-100',
  ghost:    'bg-slate-50/70 border border-transparent',
  green:    'bg-honeydew border border-green-100',
};

const paddings = { none: '', sm: 'p-4', default: 'p-6', lg: 'p-8' };

export default function Card({
  children, className = '', variant = 'default',
  hover = false, padding = 'default', onClick,
}) {
  return (
    <div
      onClick={onClick}
      className={`
        rounded-3xl transition-all duration-300
        ${variants[variant]} ${paddings[padding]}
        ${hover   ? 'hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.09)]' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
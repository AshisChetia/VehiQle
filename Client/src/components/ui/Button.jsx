import { Link } from 'react-router-dom';
import Spinner from './Spinner';

const variants = {
  primary:   'bg-primary text-white hover:bg-primary-hover hover:shadow-[0_8px_30px_rgba(15,81,50,0.3)] hover:-translate-y-0.5',
  secondary: 'bg-honeydew-100 text-primary border border-transparent hover:bg-honeydew-200',
  outline:   'bg-white text-slate-700 border border-slate-200 hover:border-primary hover:text-primary hover:bg-primary-pale',
  ghost:     'bg-transparent text-slate-600 hover:text-primary hover:bg-primary-pale',
  danger:    'bg-danger text-white hover:bg-red-600 hover:shadow-[0_8px_24px_rgba(239,68,68,0.3)] hover:-translate-y-0.5',
};

const sizes = {
  sm: 'h-8  px-4  text-xs  gap-1.5',
  md: 'h-10 px-5  text-sm  gap-2',
  lg: 'h-12 px-7  text-base gap-2.5',
  xl: 'h-14 px-9  text-lg  gap-3',
};

export default function Button({
  children, variant = 'primary', size = 'md', className = '',
  href, type = 'button', loading = false, disabled = false,
  icon: Icon, iconPosition = 'right', onClick, fullWidth = false,
}) {
  const base = `
    inline-flex items-center justify-center font-semibold rounded-full
    transition-all duration-300 ease-out cursor-pointer select-none
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none
    ${fullWidth ? 'w-full' : ''}
  `;
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  const isDisabled = disabled || loading;
  const iconSize = size === 'sm' ? 13 : size === 'lg' || size === 'xl' ? 20 : 15;

  const inner = (
    <>
      {loading && <Spinner size="sm" className="text-current" />}
      {!loading && Icon && iconPosition === 'left'  && <Icon size={iconSize} />}
      {children}
      {!loading && Icon && iconPosition === 'right' && <Icon size={iconSize} />}
    </>
  );

  if (href) return <Link to={href} className={classes}>{inner}</Link>;
  return (
    <button type={type} className={classes} disabled={isDisabled} onClick={onClick}>
      {inner}
    </button>
  );
}
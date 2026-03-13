const dims   = { sm: 'w-4 h-4', md: 'w-6 h-6', lg: 'w-10 h-10', xl: 'w-16 h-16' };
const border = { sm: 'border-2', md: 'border-2', lg: 'border-[3px]', xl: 'border-4' };

export default function Spinner({ size = 'md', className = '' }) {
  return (
    <div
      role="status" aria-label="Loading"
      className={`inline-block rounded-full border-current border-t-transparent animate-spin
        ${dims[size]} ${border[size]} ${className}`}
    />
  );
}
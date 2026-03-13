function Box({ className = '' }) {
  return <div className={`bg-slate-200 rounded-2xl animate-pulse ${className}`} />;
}

export function SkeletonCard() {
  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-100 space-y-4">
      <div className="flex items-center gap-4">
        <Box className="h-12 w-12 rounded-2xl flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <Box className="h-4 w-3/4" />
          <Box className="h-3 w-1/2" />
        </div>
      </div>
      <Box className="h-3 w-full" />
      <Box className="h-3 w-4/5" />
      <Box className="h-9 w-full rounded-2xl" />
    </div>
  );
}

export function SkeletonTable({ rows = 5 }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white">
      <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/80">
        <Box className="h-4 w-32" />
      </div>
      <div className="divide-y divide-slate-100">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center gap-5 px-6 py-4">
            <Box className="h-8 w-8 rounded-xl flex-shrink-0" />
            <Box className="h-3 flex-1" />
            <Box className="h-3 w-24 flex-shrink-0" />
            <Box className="h-3 w-20 flex-shrink-0" />
            <Box className="h-7 w-16 rounded-full flex-shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function SkeletonText({ lines = 3 }) {
  return (
    <div className="space-y-2.5">
      {Array.from({ length: lines }).map((_, i) => (
        <Box key={i} className={`h-3 ${i === lines - 1 ? 'w-3/5' : 'w-full'}`} />
      ))}
    </div>
  );
}

export default function Skeleton({ className = '' }) {
  return <Box className={className} />;
}
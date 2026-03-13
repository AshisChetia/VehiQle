import { Bell } from 'lucide-react';
import AlertCard from './AlertCard';
import { SkeletonCard } from '../ui/Skeleton';
import EmptyState from '../ui/EmptyState';

export default function AlertList({ alerts, loading, onComplete, onSnooze }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    );
  }

  if (!alerts?.length) {
    return (
      <EmptyState
        icon={Bell}
        title="All clear!"
        description="No pending maintenance alerts. Your vehicles are in great shape."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
      {alerts.map(alert => (
        <AlertCard
          key={alert._id}
          alert={alert}
          onComplete={onComplete}
          onSnooze={onSnooze}
        />
      ))}
    </div>
  );
}
import { Car } from 'lucide-react';
import VehicleCard from './VehicleCard';
import { SkeletonCard } from '../ui/Skeleton';
import EmptyState from '../ui/EmptyState';

export default function VehicleList({ vehicles, loading, onEdit, onDelete }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    );
  }

  if (!vehicles?.length) {
    return (
      <EmptyState
        icon={Car}
        title="No vehicles added yet"
        description="Add your first vehicle to start tracking maintenance history and receiving AI-powered alerts."
        actionLabel="Add Your First Vehicle"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {vehicles.map(v => (
        <VehicleCard
          key={v._id}
          vehicle={v}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
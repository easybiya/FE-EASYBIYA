import { Skeleton } from '../ui/skeleton';

export default function DashboardSkeleton() {
  return (
    <div className="flex flex-col gap-8">
      <Skeleton className="w-160 h-28" />
      <Skeleton className="w-full h-112" />
    </div>
  );
}

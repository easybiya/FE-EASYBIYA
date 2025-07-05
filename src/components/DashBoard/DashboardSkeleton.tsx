import { Skeleton } from '../ui/skeleton';

export default function DashboardSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="w-40 h-7" />
      <Skeleton className="w-full h-[112px]" />
    </div>
  );
}

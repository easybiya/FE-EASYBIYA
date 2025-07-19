import { Skeleton } from '../ui/skeleton';

export default function DetailSkeleton() {
  return (
    <div className="h-full flex flex-col bg-[#F6F5F2] relative">
      <div className="px-20 py-8 flex justify-between">
        <Skeleton className="h-24 w-180" />
        <div className="flex gap-12">
          <Skeleton className="h-24 w-24" />
          <Skeleton className="h-24 w-24" />
          <Skeleton className="h-24 w-24" />
        </div>
      </div>
      <div className="flex flex-col">
        <Skeleton className="w-full aspect-[1.8/1] rounded-none" />
        <div className="flex flex-col gap-10 my-28">
          <Skeleton className="h-18 w-28" />
          <Skeleton className="h-27 w-240" />
          <Skeleton className="h-20 w-208" />
          <Skeleton className="h-18 w-240 mt-6" />
        </div>
        <div className="flex flex-col gap-16">
          <Skeleton className="h-96 w-full" />
          <Skeleton className="h-96 w-full" />
          <Skeleton className="h-96 w-full" />
          <Skeleton className="h-96 w-full" />
          <Skeleton className="h-96 w-full" />
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    </div>
  );
}

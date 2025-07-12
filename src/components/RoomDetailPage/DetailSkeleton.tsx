import { Skeleton } from '../ui/skeleton';

export default function DetailSkeleton() {
  return (
    <div className="h-full flex flex-col bg-[#F6F5F2] relative">
      <div className="px-5 py-2 flex justify-between">
        <Skeleton className="h-6 w-[180px]" />
        <div className="flex gap-3">
          <Skeleton className="h-6 w-6" />
          <Skeleton className="h-6 w-6" />
          <Skeleton className="h-6 w-6" />
        </div>
      </div>
      <div className="flex flex-col">
        <Skeleton className="w-full aspect-[1.8/1] rounded-none" />
        <div className="flex flex-col gap-2.5 my-7">
          <Skeleton className="h-[18px] w-7" />
          <Skeleton className="h-[27px] w-60" />
          <Skeleton className="h-5 w-52" />
          <Skeleton className="h-[18px] w-60 mt-1.5" />
        </div>
        <div className="flex flex-col gap-4">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    </div>
  );
}

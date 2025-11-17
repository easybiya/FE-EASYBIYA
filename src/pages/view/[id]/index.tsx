import Header from '@/components/Layout/Header';
import { useRouter } from 'next/router';
import RoomDetailPage from '@/components/RoomDetailPage';
import DetailSkeleton from '@/components/RoomDetailPage/DetailSkeleton';
import ArrowLeftIcon from '@/public/icons/arrow-left.svg?react';
import { useSharedPropertyDetail } from '@/hooks/propertyDetail/useSharedPropertyDetail';

export default function ChecklistDetailPage() {
  const router = useRouter();
  const { id } = router.query as { id: string };

  const { propertyChecklist, propertyDetail, isLoading } = useSharedPropertyDetail(id);

  if (!router.isReady) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="h-full flex flex-col bg-[#F6F5F2] relative">
        <DetailSkeleton />
      </div>
    );
  }

  if (!propertyDetail) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-[#F6F5F2] relative">
        <div className="">매물 정보가 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-[#F6F5F2] relative">
      <Header
        left={
          <div className="flex gap-8 items-center">
            <ArrowLeftIcon
              name="arrowLeft"
              width={24}
              height={24}
              onClick={() => router.back()}
              className="cursor-pointer"
            />
            <h1 className="text-b-20 text-start">{propertyDetail.propertyName}</h1>
          </div>
        }
      />
      <RoomDetailPage roomChecklist={propertyChecklist} detail={propertyDetail} id={id} isShared />
    </div>
  );
}

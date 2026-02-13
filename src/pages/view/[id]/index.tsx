import Header from '@/components/Layout/Header';
import { useRouter } from 'next/router';
import RoomDetailPage from '@/components/RoomDetailPage';
import DetailSkeleton from '@/components/RoomDetailPage/DetailSkeleton';
import ArrowLeftIcon from '@/public/icons/arrow-left.svg?react';
import { usePropertyDetail } from '@/hooks/propertyDetail/usePropertyDetail';

export default function ChecklistDetailPage() {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const { propertyChecklist, propertyDetail, isLoading } = usePropertyDetail(id);

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
              onClick={() => {
                if (window.history.length > 1) {
                  router.back();
                } else {
                  router.replace('/');
                }
              }}
              className="cursor-pointer"
            />
            <h1 className="text-b-20 text-start">{propertyDetail.name}</h1>
          </div>
        }
      />
      <RoomDetailPage roomChecklist={propertyChecklist} detail={propertyDetail} id={id} isShared />
    </div>
  );
}

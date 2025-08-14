import Header from '@/components/Layout/Header';
import { useRouter } from 'next/router';
import { usePropertyDetail } from '@/hooks/propertyDetail/usePropertyDetail';
import RoomDetailPage from '@/components/RoomDetailPage';
import DetailSkeleton from '@/components/RoomDetailPage/DetailSkeleton';
import IconComponent from '@/components/Asset/Icon';
import useBookmark from '@/hooks/property/useBookmark';
import { ConfirmModal } from '@/components/Modal/ConfirmModal';
import DialogDropdownLayout from '@/components/Dropdown/DialogDropdown';
import PreventDropdownMenuItem from '@/components/Dropdown/PreventDropdownMenuItem';
import { deleteProperty } from '@/lib/api/property';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import DropdownIcon from '@/public/icons/meatball.svg?react';

export default function ChecklistDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const propertyId = typeof id === 'string' ? id : undefined;

  const { propertyChecklist, propertyDetail, isLoading } = usePropertyDetail(propertyId);
  const { mutate } = useBookmark();
  const queryClient = useQueryClient();

  // 카카오 공유
  const shareKakao = () => {
    const { Kakao } = window;

    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/detail/${propertyId}}`;

    Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: '집 좀 같이 봐줘요!',
        description: `내가 살 집에 대한 피드백을 주세요!`,
        imageUrl: '', // 기본 이미지 필요함
        link: {
          mobileWebUrl: url,
          webUrl: url,
        },
      },
      buttons: [
        {
          title: '집 같이 보기',
          link: {
            mobileWebUrl: url,
            webUrl: url,
          },
        },
      ],
    });
  };

  const handleDelete = async () => {
    if (!propertyId) return;
    await deleteProperty(propertyId);
    queryClient.invalidateQueries({ queryKey: ['bookmarkedProperty'] });
    queryClient.invalidateQueries({ queryKey: ['propertyList'] });
    toast({ title: '매물이 삭제되었습니다.', variant: 'success' });
  };

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
            <IconComponent
              name="arrowLeft"
              width={24}
              height={24}
              onClick={() => router.push('/')}
              className="cursor-pointer"
            />
            <h1 className="text-b-20 text-start">{propertyDetail.propertyName}</h1>
          </div>
        }
        right={
          <div className="flex gap-12">
            {propertyDetail.isBookmarked && (
              <IconComponent
                name="pin"
                width={24}
                height={24}
                className="cursor-pointer"
                onClick={() => mutate(propertyId as string)}
              />
            )}
            <IconComponent
              name="share"
              width={24}
              height={24}
              className="cursor-pointer"
              onClick={shareKakao}
            />
            <DialogDropdownLayout
              trigger={
                <button
                  type="button"
                  className="flex items-center justify-center rounded-4 focus:outline-none"
                  onClick={(e) => e.preventDefault()}
                >
                  <DropdownIcon
                    width={24}
                    height={24}
                    className="cursor-pointer fill-brownText stroke-brownText"
                  />
                </button>
              }
            >
              <PreventDropdownMenuItem
                onSelect={() => router.push(`/property/edit?propertyId=${propertyId}`)}
              >
                수정하기
              </PreventDropdownMenuItem>
              <ConfirmModal
                title="매물 정보 삭제"
                description="매물 정보를 삭제하시겠습니까?"
                handleSubmit={handleDelete}
                trigger={
                  <PreventDropdownMenuItem className="!text-red-500">
                    삭제하기
                  </PreventDropdownMenuItem>
                }
                buttonStyle="bg-red-500 hover:bg-red-400 active:bg-red-300"
              />
            </DialogDropdownLayout>
          </div>
        }
      />
      <RoomDetailPage roomChecklist={propertyChecklist} detail={propertyDetail} />
    </div>
  );
}

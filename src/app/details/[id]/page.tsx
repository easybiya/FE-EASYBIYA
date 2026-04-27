'use client';

import Header from '@/components/Layout/Header';
import { useRouter, useParams } from 'next/navigation';
import { usePropertyDetail } from '@/hooks/propertyDetail/usePropertyDetail';
import RoomDetailPage from '@/components/RoomDetailPage';
import DetailSkeleton from '@/components/RoomDetailPage/DetailSkeleton';
import useBookmark from '@/hooks/property/useBookmark';
import { ConfirmModal } from '@/components/Modal/ConfirmModal';
import DialogDropdownLayout from '@/components/Dropdown/DialogDropdown';
import PreventDropdownMenuItem from '@/components/Dropdown/PreventDropdownMenuItem';
import DropdownIcon from '@/public/icons/meatball.svg';
import ArrowLeftIcon from '@/public/icons/arrow-left.svg';
import PinIcon from '@/public/icons/pin-icon.svg';
import ShareIcon from '@/public/icons/share-Icon.svg';
import { PropertyImage } from '@/types';
import useDeleteProperty from '@/hooks/property/useDeleteProperty';

export default function ChecklistDetailPage() {
  const router = useRouter();
  const id = useParams<{ id: string }>()?.id ?? '';

  const { propertyChecklist, propertyDetail, isLoading } = usePropertyDetail(id);
  const { mutate } = useBookmark();
  const { mutate: deleteProperty } = useDeleteProperty();
  const propertyImages = (propertyDetail?.images ?? []) as unknown as PropertyImage[];

  const shareKakao = () => {
    const { Kakao } = window;
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/view/${id}`;
    const imageUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/images/opengraph.png`;

    Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: '이 집 어때요?',
        description: '계약하고 싶은 집인데 한마디 해줘요!',
        imageUrl: propertyImages[0]?.imageUrl ?? imageUrl,
        link: { mobileWebUrl: url, webUrl: url },
      },
      buttons: [{ title: '집 같이 보기', link: { mobileWebUrl: url, webUrl: url } }],
    });
  };

  const handleDelete = () => {
    deleteProperty(id);
    router.replace('/');
  };

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
        <div>매물 정보가 없습니다.</div>
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
              onClick={() => router.push('/')}
              className="cursor-pointer"
            />
            <h1 className="text-b-20 text-start">{propertyDetail.name}</h1>
          </div>
        }
        right={
          <div className="flex gap-12">
            {propertyDetail.bookmarked && (
              <PinIcon
                name="pin"
                width={24}
                height={24}
                className="cursor-pointer"
                onClick={() => mutate(id)}
              />
            )}
            <ShareIcon
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
                onSelect={() => router.push(`/property/edit?propertyId=${id}`)}
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
      <RoomDetailPage roomChecklist={propertyChecklist} detail={propertyDetail} id={id} />
    </div>
  );
}

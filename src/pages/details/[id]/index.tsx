import Header from '@/components/Layout/Header';
import { useRouter } from 'next/router';
import { usePropertyDetail } from '@/hooks/propertyDetail/usePropertyDetail';
import RoomDetailPage from '@/components/RoomDetailPage';
import DetailSkeleton from '@/components/RoomDetailPage/DetailSkeleton';
import IconComponent from '@/components/Asset/Icon';
import { useModalStore } from '@/store/modalStore';
import useBookmark from '@/hooks/property/useBookmark';
import DefaultDropdownLayout from '@/components/Dropdown/DropdownLayout';

const ROOM_DETAIL_OPTION = [
  { value: '매물 정보 수정', key: 'edit' },
  { value: '삭제', key: 'delete' },
];

export default function ChecklistDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const propertyId = typeof id === 'string' ? id : undefined;

  const { propertyChecklist, propertyDetail, isLoading } = usePropertyDetail(propertyId);
  const { openModal, closeModal } = useModalStore();
  const { mutate } = useBookmark();

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

  const roomDeatilhandleSelect = (option: string) => {
    switch (option) {
      case 'edit':
        router.push(`/property/edit?propertyId=${propertyId}`);
        break;
      case 'delete':
        openModal('confirm', {
          title: '체크리스트 항목 삭제',
          onConfirm: () => {
            closeModal();
          },
          buttonStyle: 'bg-red-500 hover:bg-red-400 active:bg-red-300',
        });
        break;
      default:
        console.log('알 수 없는 옵션');
    }
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
            <DefaultDropdownLayout
              dropdownItems={ROOM_DETAIL_OPTION}
              handleSelect={(item) => roomDeatilhandleSelect(item.key)}
            >
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                }}
                className="flex items-center justify-center rounded-4 focus:outline-none"
              >
                <IconComponent name="meatball" width={24} height={24} isBtn />
              </button>
            </DefaultDropdownLayout>
          </div>
        }
      />
      <RoomDetailPage roomChecklist={propertyChecklist} detail={propertyDetail} />
    </div>
  );
}

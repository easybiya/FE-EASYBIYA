import { useRouter } from 'next/navigation';
import IconComponent from '../Asset/Icon';
import Dropdown from '../Dropdown';
import { useModalStore } from '@/store/modalStore';
import { toggleBookmark } from '@/lib/api/property';
import { useToastStore } from '@/store/toastStore';
import Button from '../Button/CustomButton';

interface HeaderProps {
  type: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  title: string;
  action?: () => void;
  isFixed?: boolean;
  propertyId?: number;
}

// type 형태
// 1. 　　　 | 제　목 | 닫기버튼
// 2. 제　목 |　  　　| 공유버튼, 요소추가버튼
// 3. 제　목 |　　　　| 공유버튼, 드롭다운케밥버튼
// 4. 백버튼 | 제　목 |
// 5. 제　목 |       |
// 6. 백버튼 | 제　목 | 생성버튼
// 7. 　　　 | 제　목 |
// 8. 취 소 | 제 목 | 저장버튼

const ROOM_DETAIL_OPTION = ['매물 정보 수정', '삭제'];

export default function Header({ type, title, action, isFixed, propertyId }: HeaderProps) {
  const router = useRouter();
  const { openModal, closeModal } = useModalStore();
  const { showToast } = useToastStore();
  const roomDeatilhandleSelect = (option: string) => {
    switch (option) {
      case '매물 정보 수정':
        router.push(`/property/room-info?mode=edit&propertyId=${propertyId}`);
        break;
      case '삭제':
        openModal('confirm', {
          title: '체크리스트 항목 삭제',
          onConfirm: () => {
            console.log('삭제');
            closeModal();
          },
          buttonStyle: 'bg-red-500 hover:bg-red-400 active:bg-red-300',
        });
        break;
      default:
        console.log('알 수 없는 옵션');
    }
  };

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

  const toggleBookMark = async () => {
    if (!propertyId) return;
    const result = await toggleBookmark(String(propertyId));
    showToast(result.message, 'success');
  };

  const renderContent = () => {
    switch (type) {
      case 1:
        return (
          <>
            <div className="w-6" />
            <h1 className="text-b-20">{title}</h1>
            <IconComponent
              name="close"
              width={16}
              height={16}
              className="cursor-pointer"
              onClick={() => router.back()}
            />
          </>
        );
      case 2:
        return (
          <>
            <h1 className="text-b-20">{title}</h1>
            <div className="flex gap-5">
              <IconComponent
                name="share"
                width={16}
                height={16}
                className="cursor-pointer"
                onClick={() => router.push('/share')}
              />
              <IconComponent
                name="plus"
                width={18}
                height={18}
                onClick={() => router.push('/property/room-info')}
                className="cursor-pointer"
              />
            </div>
          </>
        );
      case 3:
        return (
          <>
            <div className="flex gap-2 items-center">
              <IconComponent
                name="arrowLeft"
                width={24}
                height={24}
                onClick={() => router.back()}
                className="cursor-pointer"
              />
              <h1 className="text-b-20 text-start">{title}</h1>
            </div>
            <div className="flex gap-3">
              {isFixed && (
                <IconComponent
                  name="pin"
                  width={24}
                  height={24}
                  className="cursor-pointer"
                  onClick={toggleBookMark}
                />
              )}
              <IconComponent
                name="share"
                width={16}
                height={16}
                className="cursor-pointer"
                onClick={shareKakao}
              />
              <Dropdown
                options={ROOM_DETAIL_OPTION}
                type="meatball"
                onSelect={roomDeatilhandleSelect}
              />
            </div>
          </>
        );
      case 4:
        return (
          <>
            <div className="flex items-center gap-2">
              <IconComponent
                name="arrowLeft"
                width={24}
                height={24}
                onClick={() => router.back()}
                className="cursor-pointer"
              />
              <h1 className="text-b-20">{title}</h1>
            </div>
            <div className="w-6" />
          </>
        );
      case 5:
        return (
          <>
            <h1 className="text-b-20">{title}</h1>
            <div className="w-6" />
          </>
        );
      case 6:
        return (
          <>
            <div className="flex items-center gap-2">
              <IconComponent
                name="arrowLeft"
                width={24}
                height={24}
                onClick={() => router.back()}
                className="cursor-pointer"
              />
              <h1 className="text-b-20">{title}</h1>
            </div>
            <IconComponent
              name="plus"
              width={18}
              height={18}
              onClick={action}
              className="cursor-pointer"
            />
          </>
        );
      case 7:
        return (
          <>
            <div className="w-6" />
            <h1 className="text-b-20">{title}</h1>
            <div className="w-6" />
          </>
        );
      case 8:
        return (
          <>
            <button
              className="text-[15px] font-semibold"
              type="button"
              onClick={() => router.back()}
            >
              취소
            </button>
            <h1 className="text-b-20">{title}</h1>
            <Button
              label="저장"
              onClick={action}
              size="small"
              className="rounded-full px-3 py-0.5 h-full"
            />
          </>
        );

      default:
        return <h1 className="text-b-20">{title}</h1>;
    }
  };

  return (
    <header className="flex items-center h-11 justify-between px-5 py-2 bg-primary shadow-[inset_1px_0_#eee,inset_-1px_0_#eee]">
      {renderContent()}
    </header>
  );
}

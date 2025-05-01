import { useRouter } from 'next/navigation';
import IconComponent from '../Asset/Icon';
import Dropdown from '../Dropdown';

interface HeaderProps {
  type: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  title: string;
  addAction?: () => void;
  isFixed?: boolean;
}

// type 형태
// 1. 　　　 | 제　목 | 닫기버튼
// 2. 제　목 |　  　　| 공유버튼, 요소추가버튼
// 3. 제　목 |　　　　| 공유버튼, 드롭다운케밥버튼
// 4. 백버튼 | 제　목 |
// 5. 제　목 |       |
// 6. 백버튼 | 제　목 | 생성버튼
// 7. 　　　 | 제　목 |

const ROOM_DETAIL_OPTION = ['매물 정보 수정', '사진 수정', '삭제'];

export default function Header({ type, title, addAction, isFixed }: HeaderProps) {
  const router = useRouter();
  const roomDeatilhandleSelect = (option: string) => {
    switch (option) {
      case '매물 정보 수정':
        console.log('매물 정보 수정 기능 실행');

        break;
      case '사진 수정':
        console.log('사진 수정 기능 실행');

        break;
      case '삭제':
        console.log('삭제 기능 실행');
        break;
      default:
        console.log('알 수 없는 옵션');
    }
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
                onClick={() => router.push('/create/room-info')}
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
                <IconComponent name="pin" width={24} height={24} className="cursor-pointer" />
              )}
              <IconComponent name="share" width={16} height={16} className="cursor-pointer" />
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
              onClick={addAction}
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

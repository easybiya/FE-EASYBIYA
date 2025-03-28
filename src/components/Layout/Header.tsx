import { useRouter } from 'next/navigation';
import IconComponent from '../Asset/Icon';

interface HeaderProps {
  type: 1 | 2 | 3 | 4 | 5 | 6;
  title: string;
  addAction?: () => void;
}

// type 형태
// 1. 　　　 | 제　목 | 닫기버튼
// 2. 제　목 |　  　　| 공유버튼, 요소추가버튼
// 3. 제　목 |　　　　| 공유버튼, 드롭다운케밥버튼
// 4. 백버튼 | 제　목 |
// 5. 제　목 |       |
// 6. 백버튼 | 제　목 | 생성버튼

export default function Header({ type, title, addAction }: HeaderProps) {
  const router = useRouter();
  const renderContent = () => {
    switch (type) {
      case 1:
        return (
          <>
            <div className="w-6" />
            <h1 className="text-b-20">{title}</h1>
            <div className="w-6 h-6 bg-gray-300 rounded cursor-pointer" /> {/* 닫기 */}
          </>
        );
      case 2:
        return (
          <>
            <h1 className="text-b-20">{title}</h1>
            <div className="flex gap-2">
              <div className="w-6 h-6 bg-gray-300 rounded cursor-pointer" /> {/* 공유 */}
              <div className="w-6 h-6 bg-gray-300 rounded cursor-pointer" /> {/* 매물 추가 */}
            </div>
          </>
        );
      case 3:
        return (
          <>
            <h1 className="text-b-20">{title}</h1>
            <div className="flex gap-2">
              <div className="w-6 h-6 bg-gray-300 rounded cursor-pointer" /> {/* 공유 */}
              <div className="w-6 h-6 bg-gray-300 rounded cursor-pointer" /> {/* 케밥 */}
            </div>
          </>
        );
      case 4:
        return (
          <>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gray-300 rounded cursor-pointer" /> {/* 뒤로가기 */}
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
              width={20}
              height={20}
              onClick={addAction}
              className="cursor-pointer"
            />
          </>
        );
      default:
        return <h1 className="text-b-20">{title}</h1>;
    }
  };

  return (
    <header className="flex items-center justify-between px-5 py-2 bg-primary shadow-[inset_1px_0_#eee,inset_-1px_0_#eee]">
      {renderContent()}
    </header>
  );
}

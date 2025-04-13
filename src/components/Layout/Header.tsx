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
            <IconComponent name="close" width={16} height={16} className="cursor-pointer" />
          </>
        );
      case 2:
        return (
          <>
            <h1 className="text-b-20">{title}</h1>
            <div className="flex gap-5">
              <IconComponent name="share" width={16} height={16} className="cursor-pointer" />
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
            <h1 className="text-b-20">{title}</h1>
            <div className="flex gap-5">
              <IconComponent name="share" width={16} height={16} className="cursor-pointer" />
              <IconComponent name="meatball" width={27} height={27} className="cursor-pointer" />
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

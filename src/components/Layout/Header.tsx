interface HeaderProps {
  type: 1 | 2 | 3 | 4 | 5 | 6;
  title: string;
}

// type 형태
// 1. 　　　 | 제　목 | 닫기버튼
// 2. 제　목 |　  　　| 공유버튼, 요소추가버튼
// 3. 제　목 |　　　　| 공유버튼, 드롭다운케밥버튼
// 4. 백버튼 | 제　목 |
// 5. 제　목 |       |
// 6. 백버튼 | 제　목 | 생성버튼

export default function Header({ type, title }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-5 py-2 bg-white shadow-[inset_1px_0_#eee,inset_-1px_0_#eee]">
      {type === 1 && (
        <>
          <div className="w-6" />
          <h1 className="text-lg font-semibold">{title}</h1>
          <div className="w-6 h-6 bg-gray-300 rounded cursor-pointer" /> {/* 닫기 */}
        </>
      )}

      {type === 2 && (
        <>
          <h1 className="text-lg font-semibold">{title}</h1>
          <div className="flex gap-2">
            <div className="w-6 h-6 bg-gray-300 rounded cursor-pointer" /> {/* 공유 */}
            <div className="w-6 h-6 bg-gray-300 rounded cursor-pointer" /> {/* 매물 추가 */}
          </div>
        </>
      )}

      {type === 3 && (
        <>
          <h1 className="text-lg font-semibold">{title}</h1>
          <div className="flex gap-2">
            <div className="w-6 h-6 bg-gray-300 rounded cursor-pointer" /> {/* 공유 */}
            <div className="w-6 h-6 bg-gray-300 rounded cursor-pointer" /> {/* 케밥 */}
          </div>
        </>
      )}

      {type === 4 && (
        <>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gray-300 rounded cursor-pointer" /> {/* 뒤로가기 */}
            <h1 className="text-lg font-semibold">{title}</h1>
          </div>
          <div className="w-6" />
        </>
      )}

      {type === 5 && (
        <>
          <h1 className="text-lg font-semibold">{title}</h1>
          <div className="w-6" />
        </>
      )}

      {type === 6 && (
        <>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gray-300 rounded cursor-pointer" /> {/* 뒤로가기 */}
            <h1 className="text-lg font-semibold">{title}</h1>
          </div>
          <div className="w-auto h-6 bg-gray-300 rounded cursor-pointer">생성</div>
        </>
      )}
    </header>
  );
}

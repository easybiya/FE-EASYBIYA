import Link from 'next/link';

export default function TabBar() {
  return (
    <div
      className="fixed bottom-0 left-1/2 px-5 w-full max-w-[428px] -translate-x-1/2 bg-white border-t border-gray-200
"
    >
      <div className="flex">
        <Link
          href="/"
          className="w-1/4 flex flex-col items-center gap-1 pt-[6px] pb-3 text-gray-700 cursor-pointer"
        >
          <div className="w-7 h-7 bg-green-600" />
          <span className="text-xs">홈</span>
        </Link>
        <Link
          href="/register"
          className="w-1/4 flex flex-col items-center gap-1 pt-[6px] pb-3 text-gray-700 cursor-pointer"
        >
          <div className="w-7 h-7 bg-green-600" />
          <span className="text-xs">등록하기</span>
        </Link>
        <Link
          href="/distance"
          className="w-1/4 flex flex-col items-center gap-1 pt-[6px] pb-3 text-gray-700 cursor-pointer"
        >
          <div className="w-7 h-7 bg-green-600" />
          <span className="text-xs">거리 확인</span>
        </Link>
        <Link
          href="/profile"
          className="w-1/4 flex flex-col items-center gap-1 pt-[6px] pb-3 text-gray-700 cursor-pointer"
        >
          <div className="w-7 h-7 bg-green-600" />
          <span className="text-xs">내 정보</span>
        </Link>
      </div>
    </div>
  );
}

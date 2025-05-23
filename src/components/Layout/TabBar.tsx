import Link from 'next/link';
import IconComponent from '../Asset/Icon';

export default function TabBar() {
  return (
    <div className="fixed bottom-0 left-1/2 px-5 py-2 w-full z-40 max-w-[428px] -translate-x-1/2 bg-white border-t border-gray-200">
      <div className="flex">
        <Link
          href="/"
          className="w-1/3 flex flex-col items-center gap-1 text-gray-700 cursor-pointer"
        >
          <IconComponent name="navHouse" width={24} height={24} className="cursor-pointer" />
          <span className="text-m-12">홈</span>
        </Link>
        <Link
          href="/map"
          className="w-1/3 flex flex-col items-center gap-1 text-gray-700 cursor-pointer"
        >
          <IconComponent name="navMap" width={24} height={24} className="cursor-pointer" />
          <span className="text-m-12">거리 확인</span>
        </Link>
        <Link
          href="/profile"
          className="w-1/3 flex flex-col items-center gap-1 text-gray-700 cursor-pointer"
        >
          <IconComponent name="navUser" width={24} height={24} className="cursor-pointer" />
          <span className="text-m-12">내 정보</span>
        </Link>
      </div>
    </div>
  );
}

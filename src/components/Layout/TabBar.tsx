import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

import HouseIcon from '../../../public/icons/house.svg';
import MapIcon from '../../../public/icons/map.svg';
import UserIcon from '../../../public/icons/user.svg';

export default function TabBar() {
  const path = usePathname();
  const originPath = path ? (path === '/' ? path : path.split('/')[1]) : '';

  return (
    <div className="fixed bottom-0 left-1/2 px-20 py-8 w-full z-40 max-w-428 -translate-x-1/2 bg-white border-t border-gray-200">
      <div className="flex">
        <Link
          href="/"
          className={cn(
            'group w-1/3 flex flex-col items-center gap-4 text-gray-500 hover:text-black',
            { 'text-black': originPath === '/' || originPath === 'details' },
          )}
        >
          <HouseIcon className="w-24 h-24" />
          <span className="text-m-12">홈</span>
        </Link>
        <Link
          href="/map"
          className={cn(
            'group w-1/3 flex flex-col items-center gap-4 text-gray-500 hover:text-black',
            { 'text-black': originPath === 'map' },
          )}
        >
          <MapIcon className="w-24 h-24" />
          <span className="text-m-12">거리 확인</span>
        </Link>
        <Link
          href="/profile"
          className={cn(
            'group w-1/3 flex flex-col items-center gap-4 text-gray-500 hover:text-black',
            { 'text-black': originPath === 'profile' },
          )}
        >
          <UserIcon className="w-24 h-24" />
          <span className="text-m-12">내 정보</span>
        </Link>
      </div>
    </div>
  );
}

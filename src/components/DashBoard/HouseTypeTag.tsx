import { LeaseType } from '@/types';

const HOUSE_TYPE: Record<LeaseType, string> = {
  JEONSE: '전세',
  MONTHLY_RENT: '월세',
  BANJEONSE: '반전세',
};

export default function HouseTypeTag({ type }: { type: LeaseType }) {
  return (
    <div className="px-1 py-[1px] h-[18px] flex items-center rounded-sm bg-gray-700 w-fit text-white text-[11px]">
      {HOUSE_TYPE[type]}
    </div>
  );
}

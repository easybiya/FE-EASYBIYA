import { LeaseType } from '@/types';

const HOUSE_TYPE: Record<LeaseType, string> = {
  jeonse: '전세',
  monthly_rent: '월세',
  half_jeonse: '반전세',
};

export default function HouseTypeTag({ type }: { type: LeaseType }) {
  return (
    <div className="px-4 py-1 h-18 flex items-center rounded-sm bg-gray-700 w-fit text-white text-11/16">
      {HOUSE_TYPE[type]}
    </div>
  );
}

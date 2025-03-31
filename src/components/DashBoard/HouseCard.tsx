import Link from 'next/link';
import Dropdown from '../Dropdown';
import HouseTypeTag from './HouseTypeTag';
import { Property } from '@/types';

interface Props {
  info: Property;
}

const menuList = ['수정', '삭제'];

export default function HouseCard({ info }: Props) {
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-lg">{info.propertyName}</h1>
        <div className="flex gap-1">
          <input type="checkbox" />
          <Dropdown options={menuList} type="meatball" />
        </div>
      </div>
      <Link href={`/detail/${info.id}`}>
        <div className="flex w-full justify-between items-center rounded-lg bg-white border p-5">
          <div className="flex flex-col gap-1">
            <HouseTypeTag type={info.leaseType} />
            <div className="flex font-bold text-base">
              <p>보증금 {info.deposit}</p>
              {info.leaseType !== 'JEONSE' && <p>/</p>}
              {info.monthlyFee && <p>월세 {info.monthlyFee}</p>}
            </div>
            <p className="text-gray-500 text-sm">{info.propertyAddress}</p>
          </div>
          <div className="bg-gray-200 w-16 h-16 rounded"></div>
        </div>
      </Link>
    </div>
  );
}

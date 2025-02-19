import Image from 'next/image';
import HouseTypeTag from './HouseTypeTag';
import { House } from '@/types';

interface Props {
  info: House;
}

export default function HouseCard({ info }: Props) {
  return (
    <div className="p-5 max-w-[400px] flex flex-col gap-2">
      <div className="flex justify-between h-10 items-center">
        <h1 className="font-bold text-2xl">🏠 {info.name}</h1>
        <div className="flex gap-1">
          <input type="checkbox" />
          <button type="button">
            <Image src="/icons/DropDownIcon.svg" alt="드롭다운아이콘" width={20} height={20} />
          </button>
        </div>
      </div>
      <div className="flex w-full justify-between rounded-lg bg-gray-200 p-5">
        <div className="flex flex-col gap-2">
          <HouseTypeTag type={info.type} />
          <div className="flex font-bold text-lg">
            <p>보증금 {info.rentPrice}</p>
            {info.type !== 1 && <p>/</p>}
            {info.monthPrice && <p>월세 {info.monthPrice}</p>}
          </div>
          <p>{info.address}</p>
        </div>
        <div className="bg-gray-400 w-20 h-20 rounded-lg"></div>
      </div>
    </div>
  );
}

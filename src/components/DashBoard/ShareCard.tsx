import HouseTypeTag from './HouseTypeTag';
import { Property } from '@/types';
import { formatDate } from '@/utils/formatDate';
import { formatWon } from '@/utils/formatWon';
import Image from 'next/image';
import HomeIcon from '@/public/icons/home.svg?react';
import CheckIcon from '@/public/icons/checkbox-check.svg?react';
import UnCheckIcon from '@/public/icons/checkbox-uncheck.svg?react';

interface Props {
  info: Property;
  checked: boolean;
  onChange: (id: Property) => void;
}

export default function ShareCard({ info, checked, onChange }: Props) {
  return (
    <div
      className="w-full flex flex-col gap-8"
      onClick={() => {
        onChange(info);
      }}
    >
      <div className="flex gap-4 items-center">
        <div className="bg-white rounded-5">
          {checked ? <CheckIcon width={16} height={16} /> : <UnCheckIcon width={16} height={16} />}
        </div>
        <label htmlFor={info.propertyAddress} className="font-bold text-18">
          {info.propertyName}
        </label>
      </div>
      <div className="flex w-full justify-between items-center rounded-lg bg-white border p-20">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-4">
            <HouseTypeTag type={info.leaseType} />
            <div className="flex font-bold text-base gap-4">
              <p>보증금 {formatWon(info.deposit)}</p>
              {info.leaseType !== 'JEONSE' && <p>/</p>}
              {info.monthlyFee && <p>월세 {formatWon(info.monthlyFee)}</p>}
            </div>
            <p className="text-gray-500 text-sm">{info.propertyAddress}</p>
          </div>
          <div className="flex gap-4 items-center">
            <Image
              src="/icons/calendar-brown.svg"
              color="#94896A"
              width={10}
              height={10}
              alt="캘린더 아이콘"
            />
            <p className="flex items-center text-brownText text-12">
              {formatDate(new Date(info.availableDate), 2)} 입주
            </p>
          </div>
        </div>
        <div className="bg-primary2 w-56 h-56 rounded relative">
          {info.propertyImages.length > 0 ? (
            <Image src={info.propertyImages[0].imageUrl} fill alt="thumbnail" className="rounded" />
          ) : (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <HomeIcon width={28} height={28} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import HouseTypeTag from './HouseTypeTag';
import { Property } from '@/types';
import { formatWon } from '@/utils/formatWon';

interface Props {
  info: Property;
  checked: boolean;
  onChange: (id: Property) => void;
}

export default function ShareCard({ info, checked, onChange }: Props) {
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex gap-1  items-center">
        <input
          type="checkbox"
          checked={checked}
          onChange={() => onChange(info)}
          id={info.propertyAddress}
          className="accent-gray-800"
        />
        <label htmlFor={info.propertyAddress} className="font-bold text-lg/7">
          {info.propertyName}
        </label>
      </div>
      <div className="flex w-full justify-between items-center rounded-lg bg-white border p-5">
        <div className="flex flex-col gap-1">
          <HouseTypeTag type={info.leaseType} />
          <div className="flex font-bold text-base gap-1">
            <p>보증금 {formatWon(info.deposit)}</p>
            {info.leaseType !== 'JEONSE' && <p>/</p>}
            {info.monthlyFee && <p>월세 {formatWon(info.monthlyFee)}</p>}
          </div>
          <p className="text-gray-500 text-sm">{info.propertyAddress}</p>
        </div>
        <div className="bg-gray-200 w-16 h-16 rounded"></div>
      </div>
    </div>
  );
}

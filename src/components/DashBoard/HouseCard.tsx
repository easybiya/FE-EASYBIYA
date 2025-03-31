import Link from 'next/link';
import Dropdown from '../Dropdown';
import HouseTypeTag from './HouseTypeTag';
import { Property } from '@/types';
import IconComponent from '../Asset/Icon';
import { formatWon } from '@/utils/formatWon';

interface Props {
  info: Property;
  onDelete: (id: number) => void;
  onAdd: (id: number) => void;
  isFixed: boolean;
}

const defaultMenuList = ['고정하기', '수정하기', '삭제하기'];
const cancelOptionMenuList = ['고정 해제하기', '수정하기', '삭제하기'];

export default function HouseCard({ info, onDelete, onAdd, isFixed }: Props) {
  const handleSelect = (option: string) => {
    switch (option) {
      case '고정 해제하기':
        if (onDelete) {
          onDelete(info.id);
        }
        break;
      case '고정하기':
        if (onAdd) {
          onAdd(info.id);
        }
        break;
      case '수정하기':
        console.log('수정 기능 실행');
        break;
      case '삭제하기':
        console.log('삭제 기능 실행');
        break;
      default:
        console.log('알 수 없는 옵션');
    }
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-lg">{info.propertyName}</h1>
        <div className="flex gap-5">
          {isFixed && <IconComponent name="pin" width={20} height={20} />}
          <Dropdown
            options={isFixed ? cancelOptionMenuList : defaultMenuList}
            type="meatball"
            onSelect={handleSelect}
          />
        </div>
      </div>
      <Link href={`/detail/${info.id}`}>
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
      </Link>
    </div>
  );
}

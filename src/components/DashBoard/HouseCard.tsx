import Link from 'next/link';
import Dropdown from '../Dropdown';
import HouseTypeTag from './HouseTypeTag';
import { Property } from '@/types';
import IconComponent from '../Asset/Icon';
import { formatWon } from '@/utils/formatWon';
import { useRouter } from 'next/router';
import { useModalStore } from '@/store/modalStore';
import Image from 'next/image';

interface Props {
  info: Property;
  toggleBookmark?: (id: number) => void;
  isFixed?: boolean;
  isShared?: boolean;
}

const defaultMenuList = ['고정하기', '수정하기', '삭제하기'];
const cancelOptionMenuList = ['고정 해제하기', '수정하기', '삭제하기'];

export default function HouseCard({ info, toggleBookmark, isFixed, isShared }: Props) {
  const router = useRouter();
  const { openModal, closeModal } = useModalStore();
  const handleSelect = (option: string) => {
    switch (option) {
      case '고정 해제하기':
        toggleBookmark && toggleBookmark(info.id);
        break;
      case '고정하기':
        toggleBookmark && toggleBookmark(info.id);
        break;
      case '수정하기':
        router.push(`/property/room-info?mode=edit&propertyId=${info.id}`);
        break;
      case '삭제하기':
        openModal('confirm', {
          title: '체크리스트 항목 삭제',
          onConfirm: () => {
            console.log('삭제');
            closeModal();
          },
          buttonStyle: 'bg-red-500 hover:bg-red-400 active:bg-red-300',
        });
        break;
      default:
        console.log('알 수 없는 옵션');
    }
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-lg">{info.propertyName}</h1>
        {!isShared && (
          <div className="flex gap-5">
            {isFixed && (
              <IconComponent name="pin" width={20} height={20} className="cursor-pointer" />
            )}
            <Dropdown
              options={isFixed ? cancelOptionMenuList : defaultMenuList}
              type="meatball"
              onSelect={handleSelect}
            />
          </div>
        )}
      </div>
      <Link href={`/details/${info.id}`}>
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
          <div className="bg-primary2 w-16 h-16 rounded relative">
            {info.propertyImages.length > 0 ? (
              <Image src={info.propertyImages[0].imageUrl} fill alt="thumbnail" />
            ) : (
              <IconComponent
                name="home"
                width={28}
                height={28}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              />
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}

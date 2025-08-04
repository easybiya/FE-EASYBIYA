import Link from 'next/link';
import HouseTypeTag from './HouseTypeTag';
import { Property } from '@/types';
import IconComponent from '../Asset/Icon';
import { formatWon } from '@/utils/formatWon';
import { useRouter } from 'next/router';
import { useModalStore } from '@/store/modalStore';
import Image from 'next/image';
import { deleteProperty } from '@/lib/api/property';
import { useToastStore } from '@/store/toastStore';
import { useQueryClient } from '@tanstack/react-query';
import DefaultDropdownLayout from '../Dropdown/DropdownLayout';

interface Props {
  info: Property;
  toggleBookmark?: (id: number) => void;
  isFixed?: boolean;
  isShared?: boolean;
}

const defaultMenuList = [
  { value: '고정하기', key: 'fix' },
  { value: '수정하기', key: 'edit' },
  { value: '삭제하기', key: 'delete' },
];
const cancelOptionMenuList = [
  { value: '고정 해제하기', key: 'removeFix' },
  { value: '수정하기', key: 'edit' },
  { value: '삭제하기', key: 'delete' },
];

export default function HouseCard({ info, toggleBookmark, isFixed, isShared }: Props) {
  const router = useRouter();
  const { openModal, closeModal } = useModalStore();
  const { showToast } = useToastStore();
  const queryClient = useQueryClient();
  const handleSelect = (option: string) => {
    switch (option) {
      case 'removeFix':
        toggleBookmark && toggleBookmark(info.id);
        break;
      case 'fix':
        toggleBookmark && toggleBookmark(info.id);
        break;
      case 'edit':
        router.push(`/property/edit?propertyId=${info.id}`);
        break;
      case 'delete':
        openModal('confirm', {
          title: '체크리스트 항목 삭제',
          onConfirm: async () => {
            await deleteProperty(String(info.id));
            queryClient.invalidateQueries({ queryKey: ['bookmarkedProperty'] });
            queryClient.invalidateQueries({ queryKey: ['propertyList'] });
            showToast('매물이 삭제되었습니다.', 'success');
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
    <div className="w-full flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-lg">{info.propertyName}</h1>
        {!isShared && (
          <div className="flex gap-20">
            {isFixed && <IconComponent name="pin" width={20} height={20} />}
            <DefaultDropdownLayout
              dropdownItems={isFixed ? cancelOptionMenuList : defaultMenuList}
              handleSelect={(item) => handleSelect(item.key)}
            >
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                }}
                className="flex items-center justify-center rounded-4 focus:outline-none"
              >
                <IconComponent name="meatball" width={24} height={24} isBtn />
              </button>
            </DefaultDropdownLayout>
          </div>
        )}
      </div>
      <Link href={`/details/${info.id}`}>
        <div className="flex w-full justify-between items-center rounded-lg bg-white border p-20">
          <div className="flex flex-col gap-4">
            <HouseTypeTag type={info.leaseType} />
            <div className="flex font-bold text-base gap-4">
              <p>보증금 {formatWon(info.deposit)}</p>
              {info.leaseType !== 'JEONSE' && <p>/</p>}
              {info.monthlyFee && <p>월세 {formatWon(info.monthlyFee)}</p>}
            </div>
            <p className="text-gray-500 text-sm">{info.propertyAddress}</p>
          </div>
          <div className="bg-primary2 w-56 h-56 rounded relative">
            {info.propertyImages.length > 0 ? (
              <Image
                src={info.propertyImages[0].imageUrl}
                fill
                alt="thumbnail"
                className="rounded"
              />
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

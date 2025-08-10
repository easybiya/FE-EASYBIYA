import Link from 'next/link';
import HouseTypeTag from './HouseTypeTag';
import { Property } from '@/types';
import IconComponent from '../Asset/Icon';
import { formatWon } from '@/utils/formatWon';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { deleteProperty } from '@/lib/api/property';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import DialogDropdownLayout from '../Dropdown/DialogDropdown';
import PreventDropdownMenuItem from '../Dropdown/PreventDropdownMenuItem';
import { ConfirmModal } from '../Modal/ConfirmModal';

interface Props {
  info: Property;
  toggleBookmark?: (id: number) => void;
  isFixed?: boolean;
  isShared?: boolean;
}

export default function HouseCard({ info, toggleBookmark, isFixed, isShared }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();

  return (
    <div className="w-full flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-lg">{info.propertyName}</h1>
        {!isShared && (
          <div className="flex gap-20">
            {isFixed && <IconComponent name="pin" width={20} height={20} />}
            <DialogDropdownLayout
              trigger={
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                  className="flex items-center justify-center rounded-4 focus:outline-none"
                >
                  <IconComponent name="meatball" width={24} height={24} isBtn />
                </button>
              }
            >
              <PreventDropdownMenuItem onSelect={() => toggleBookmark && toggleBookmark(info.id)}>
                {isFixed ? '고정 해제하기' : '고정하기'}
              </PreventDropdownMenuItem>
              <PreventDropdownMenuItem
                onSelect={() => router.push(`/property/edit?propertyId=${info.id}`)}
              >
                수정하기
              </PreventDropdownMenuItem>
              <ConfirmModal
                title="매물 정보 삭제"
                description="매물 정보를 삭제하시겠습니까?"
                handleSubmit={() => {
                  deleteProperty(String(info.id));
                  queryClient.invalidateQueries({ queryKey: ['bookmarkedProperty'] });
                  queryClient.invalidateQueries({ queryKey: ['propertyList'] });
                  toast({ title: '매물이 삭제되었습니다.', variant: 'success' });
                }}
                trigger={
                  <PreventDropdownMenuItem className="!text-red-500">
                    삭제하기
                  </PreventDropdownMenuItem>
                }
                buttonStyle="bg-red-500 hover:bg-red-400 active:bg-red-300"
              />
            </DialogDropdownLayout>
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

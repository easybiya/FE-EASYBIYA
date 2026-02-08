import Link from 'next/link';
import HouseTypeTag from './HouseTypeTag';
import { Property, PropertyImage } from '@/types';
import { formatWon } from '@/utils/formatWon';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useQueryClient } from '@tanstack/react-query';
import DialogDropdownLayout from '../Dropdown/DialogDropdown';
import PreventDropdownMenuItem from '../Dropdown/PreventDropdownMenuItem';
import { ConfirmModal } from '../Modal/ConfirmModal';
import DropdownIcon from '@/public/icons/meatball.svg?react';
import useBookmark from '@/hooks/property/useBookmark';
import HomeIcon from '@/public/icons/home.svg?react';
import PinIcon from '@/public/icons/pin-icon.svg?react';
import { formatDate } from '@/utils/formatDate';
import useDeleteProperty from '@/hooks/property/useDeleteProperty';

interface Props {
  info: Property;
  isFixed?: boolean;
  isShared?: boolean;
}

export default function HouseCard({ info, isFixed, isShared }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate } = useBookmark(isFixed);
  const { mutate: deleteProperty } = useDeleteProperty();

  const images = info.images as PropertyImage[] | null | undefined;

  const thumbnail = images?.[0];

  return (
    <div className="w-full flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-lg">{info.name}</h1>
        {!isShared && (
          <div className="flex gap-20">
            {isFixed && <PinIcon width={20} height={20} />}
            <DialogDropdownLayout
              trigger={
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                  className="flex items-center justify-center rounded-4 focus:outline-none"
                >
                  <DropdownIcon
                    width={24}
                    height={24}
                    className="cursor-pointer fill-brownText stroke-brownText"
                  />
                </button>
              }
            >
              <PreventDropdownMenuItem onSelect={() => mutate(String(info.id))}>
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
                handleSubmit={() => deleteProperty(String(info.id))}
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
      <Link href={isShared ? `/view/${info.id}` : `/details/${info.id}`}>
        <div className="flex w-full justify-between items-center rounded-lg bg-white border p-20">
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-4">
              <HouseTypeTag type={info.lease_type} />
              <div className="flex font-bold text-base gap-4">
                <p>보증금 {formatWon(info.deposit)}</p>
                {info.lease_type !== 'jeonse' && <p>/</p>}
                {info.monthly_fee && <p>월세 {formatWon(info.monthly_fee)}</p>}
              </div>
              <p className="text-gray-500 text-sm">{info.address}</p>
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
                {formatDate(new Date(info.avaliable_date), 2)} 입주
              </p>
            </div>
          </div>
          <div className="bg-primary2 w-56 h-56 rounded relative">
            {thumbnail ? (
              <Image src={thumbnail.imageUrl} fill alt="thumbnail" className="rounded" />
            ) : (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <HomeIcon width={28} height={28} />
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}

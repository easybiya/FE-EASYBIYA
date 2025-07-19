import React from 'react';
import HeaderWithProgress from '@/components/Layout/HeaderWithProgress';
import SearchAddress from '@/components/map/SearchAddress';
import { useSearchParams } from 'next/navigation';

export default function RoomInfoPage() {
  const searchParams = useSearchParams();
  const propertyId = searchParams.get('propertyId');
  const isEdit = searchParams.get('mode') === 'edit';

  return (
    <div className="px-20 bg-[#F6F5F2] h-screen">
      <HeaderWithProgress title="주소 입력" />
      <SearchAddress isEdit={isEdit} id={propertyId ?? ''} />
    </div>
  );
}

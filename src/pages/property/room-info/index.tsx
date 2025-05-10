import React from 'react';
import HeaderWithProgress from '@/components/Layout/HeaderWithProgress';
import RoomInfoForm from '@/components/RoomInfoForm';
import { useSearchParams } from 'next/navigation';

export default function RoomInfoPage() {
  const searchParams = useSearchParams();
  const propertyId = searchParams.get('propertyId');
  const isEdit = searchParams.get('mode') === 'edit';

  return (
    <div className="px-4 bg-[#F6F5F2] h-full">
      <HeaderWithProgress title="계약 정보 입력" totalSteps={4} />
      <RoomInfoForm isEdit={isEdit} id={propertyId ?? ''} />
    </div>
  );
}

import React from 'react';
import HeaderWithProgress from '@/components/Layout/HeaderWithProgress';
import RoomInfoForm from '@/components/RoomInfoForm';

export default function RoomInfoPage() {
  return (
    <div className="px-4 bg-[#F6F5F2] h-full">
      <HeaderWithProgress title="계약 정보 입력" totalSteps={4} />
      <RoomInfoForm />
    </div>
  );
}

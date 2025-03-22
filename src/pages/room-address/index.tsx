import React from 'react';
import HeaderWithProgress from '@/components/Layout/HeaderWithProgress';
import SearchAddress from '@/components/map/SearchAddress';

export default function RoomInfoPage() {
  return (
    <div className="px-4 bg-[#F6F5F2] h-screen">
      <div className="pt-10">
        <HeaderWithProgress title="주소 입력" totalSteps={4} />
      </div>
      <SearchAddress />
    </div>
  );
}

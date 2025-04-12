import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import ChecklistContainer from '@/components/CheckList/CheckListContainer';
import { CheckItem, CheckList } from '@/types/checklist';
import { DropResult } from '@hello-pangea/dnd';
import Header from '@/components/Layout/Header';
import { mockCheckList, mockHouserData } from '@/data/mockHouseData';
import { useRouter } from 'next/router';
import { formatWon } from '@/utils/formatWon';
import HouseTypeTag from '@/components/DashBoard/HouseTypeTag';
import Image from 'next/image';
import { formatDate } from '@/utils/formatDate';

export default function ChecklistDetailPage() {
  const [checklist, setChecklist] = useState<CheckList>([]);
  const [, setActiveIndex] = useState(0);
  const router = useRouter();
  const { id } = router.query;
  const propertyData = mockHouserData.find((item) => item.id === Number(id));

  useEffect(() => {
    const checkListData = mockCheckList;
    if (checkListData) {
      setChecklist(mockCheckList);
    }
  }, []);

  const updateChecklistValue = (id: number, checkItem: CheckItem) => {
    const updatedChecklist = checklist.map((item) => {
      if (item.priority !== id) return item;
      // CHECKBOX 타입: 해당 항목만 checked 상태 토글
      if (item.checkType === 'CHECKBOX') {
        const updatedCheckItems = item.checkItems.map((ci) =>
          ci.priority === checkItem.priority ? { ...ci, checked: !ci.checked } : ci,
        );
        return { ...item, checkItems: updatedCheckItems };
      }
      // RADIO 타입: 해당 항목만 checked = true, 나머지는 false
      if (item.checkType === 'RADIO') {
        const updatedCheckItems = item.checkItems.map((ci) => ({
          ...ci,
          checked: ci.priority === checkItem.priority,
        }));
        return { ...item, checkItems: updatedCheckItems };
      }
      return item;
    });
    setChecklist(updatedChecklist);
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const updatedChecklist = [...checklist];
    const [movedItem] = updatedChecklist.splice(result.source.index, 1);
    updatedChecklist.splice(result.destination.index, 0, movedItem);
    const reorderedWithPriority = updatedChecklist.map((item, index) => ({
      ...item,
      priority: index + 1,
    }));
    setChecklist(reorderedWithPriority);
  };

  if (!propertyData) {
    return <div>매물 정보가 없습니다.</div>;
  }

  return (
    <div className="h-full flex flex-col bg-[#F6F5F2]">
      <Header type={3} title={propertyData.propertyName!} />
      <div className="w-full h-[202px] relative">
        <Swiper
          modules={[Pagination]}
          spaceBetween={10}
          slidesPerView={1}
          pagination={{ clickable: true }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          className="h-full"
        >
          {propertyData.propertyImages.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={image.imageUrl}
                alt={`roomImage${index}`}
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <style jsx global>{`
          .swiper-pagination {
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
            position: absolute !important;
            width: 100% !important;
            bottom: 12px !important;
            left: 0 !important;
            gap: 6px;
            z-index: 10 !important;
            opacity: 1 !important;
          }

          .swiper-pagination-bullet {
            width: 8px;
            height: 8px;
            background-color: white;
            border: 1px solid black;
            opacity: 1;
          }

          .swiper-pagination-bullet-active {
            background-color: #262626 !important;
            border: none;
          }
        `}</style>
      </div>
      <div className="flex flex-col gap-2.5 px-4 mt-7">
        <div className=" flex flex-col gap-1">
          <HouseTypeTag type={propertyData.leaseType} />
          {propertyData.leaseType === 'JEONSE' ? (
            <h2 className="text-b-18">보증금 {formatWon(propertyData.deposit)}</h2>
          ) : (
            <h2 className="text-b-18">
              보증금 {formatWon(propertyData.deposit!)} / 월세 {formatWon(propertyData.monthlyFee!)}
            </h2>
          )}
          <p className="text-r-15 text-[15px]">{propertyData?.propertyAddress}</p>
        </div>
        <div className="flex gap-1 items-center">
          <Image
            src="/icons/calendar-brown.svg"
            color="#94896A"
            width={10}
            height={10}
            alt="캘린더 아이콘"
          />
          <div className="flex gap-2 text-brownText text-r-12">
            <span className="font-semibold">입주 가능 일자</span>
            <p className="flex items-center ">
              {formatDate(new Date(propertyData.availableDate), 2)}
            </p>
          </div>
        </div>
      </div>

      <div className="flex-grow px-4 pb-10">
        <ChecklistContainer
          checklist={checklist}
          onUpdateChecklist={updateChecklistValue}
          onReorderChecklist={handleDragEnd}
        />
      </div>
    </div>
  );
}

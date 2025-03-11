import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import ChecklistContainer from '@/components/CheckList/CheckListContainer';
import { ChecklistItemType } from '@/types/checklist';
import { DropResult } from '@hello-pangea/dnd';
import Header from '@/components/Layout/Header';
import Chips from '@/components/Button/ChipsButton';

const propertyData = {
  title: '합정동 A',
  rentalType: '월세',
  deposit: '3,000',
  monthlyRent: '80',
  address: '서울시 마포구 합정동 343',
  images: [
    '/images/room.png',
    '/images/room.png',
    '/images/room.png',
    '/images/room.png',
    '/images/room.png',
  ],
};

export default function ChecklistDetailPage() {
  const [checklist, setChecklist] = useState<ChecklistItemType[]>([]);
  const [activeIndex, setActiveIndex] = useState(0); 

  useEffect(() => {
    const savedChecklist = localStorage.getItem('checklist');
    if (savedChecklist) {
      setChecklist(JSON.parse(savedChecklist));
    }
  }, []);

  const updateChecklistValue = (id: number, newValue: string | string[]) => {
    setChecklist((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              value: item.type === 'checkbox' && Array.isArray(newValue) ? [...newValue] : newValue,
            }
          : item,
      ),
    );
    localStorage.setItem('checklist', JSON.stringify(checklist));
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(checklist);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setChecklist([...items]);
    localStorage.setItem('checklist', JSON.stringify(items));
  };

  return (
    <div className="h-full flex flex-col bg-[#F6F5F2]">
      <Header type={3} title={propertyData.title} />

      <div className="w-full h-[202px] relative">
        <Swiper
          modules={[Pagination]}
          spaceBetween={10}
          slidesPerView={1}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          className="h-full"
        >
          {propertyData.images.map((src, index) => (
            <SwiperSlide key={index}>
              <img src={src} alt={`room-${index}`} className="w-full h-full object-cover" />
            </SwiperSlide>
          ))}
        </Swiper>
        
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
          {propertyData.images.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                activeIndex === index ? 'bg-black' : 'bg-white border border-black opacity-100'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="px-4 mt-4">
        <Chips label={propertyData.rentalType} />
      </div>

      <div className="px-4 mt-1">
        <h2 className="text-b-18">
          보증금 {propertyData.deposit} / 월세 {propertyData.monthlyRent}
        </h2>
        <p className="text-r-15 mt-1">{propertyData.address}</p>
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

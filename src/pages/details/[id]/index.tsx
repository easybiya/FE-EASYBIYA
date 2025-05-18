import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { ChecklistPayloadItem } from '@/types/checklist';
import Header from '@/components/Layout/Header';
import { mockHouserData } from '@/data/mockHouseData';
import { useRouter } from 'next/router';
import { formatDate } from '@/utils/formatDate';
import { formatWon } from '@/utils/formatWon';
import HouseTypeTag from '@/components/DashBoard/HouseTypeTag';
import Image from 'next/image';
import EditButtonContainer from '@/components/EditButtonContainer';
import { mockCheckList } from '@/data/mockCheckList';
import CheckListContainer from '@/components/CheckList/CheckListContainer';
import IconComponent from '@/components/Asset/Icon';
import { getPropertyById } from '@/lib/api/property';
import { Property } from '@/types';
import { getPropertyChecklistById } from '@/lib/api/checklist';

export default function ChecklistDetailPage() {
  const [isEdit, setIsEdit] = useState(false);
  const [propertyData, setPropertyData] = useState<Property>();
  const [checklist, setChecklist] = useState<ChecklistPayloadItem[]>([]);
  const [, setActiveIndex] = useState(0);
  const router = useRouter();
  const { id } = router.query;
  // const propertyData = mockHouserData.find((item) => item.id === Number(id));

  const handleEditImages = () => {
    if (!id) return;
    router.push(`/property/add-photo?mode=edit&propertyId=${id}`);
  };

  const handleEdit = () => {
    if (isEdit) return;
    setIsEdit(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      const data = await getPropertyById(id as string);
      const checklistData = await getPropertyChecklistById(id as string);
      setPropertyData(data);
      setChecklist(checklistData);
    };
    fetchData();
  }, []);

  if (!propertyData) {
    return <div>매물 정보가 없습니다.</div>;
  }

  return (
    <div className="h-full flex flex-col bg-[#F6F5F2] relative">
      <Header
        type={3}
        title={propertyData.propertyName}
        isFixed={propertyData.isBookmarked}
        propertyId={propertyData.id}
      />
      {isEdit && (
        <EditButtonContainer onClick={() => setIsEdit(false)} onEditImage={handleEditImages} />
      )}

      <div className="w-full aspect-[1.8/1] relative">
        {propertyData.propertyImages.length > 0 ? (
          <>
            <Swiper
              modules={[Pagination]}
              spaceBetween={10}
              slidesPerView={1}
              pagination={{ clickable: true }}
              onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
              className="h-full"
            >
              {propertyData.propertyImages.map((item, index) => (
                <SwiperSlide key={index} className="relative">
                  <Image
                    fill
                    src={item.imageUrl}
                    alt={`room-${index}`}
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
          </>
        ) : (
          <div className="bg-gray-300 h-full">
            <IconComponent
              name="plus"
              width={24}
              height={24}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            />
          </div>
        )}
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

      <div className="flex-grow px-4 pb-20">
        <CheckListContainer checklist={checklist} setter={setChecklist} handleEdit={handleEdit} />
      </div>
    </div>
  );
}

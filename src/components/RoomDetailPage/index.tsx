import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { ChecklistPayloadItem } from '@/types/checklist';
import { useRouter } from 'next/router';
import { formatDate } from '@/utils/formatDate';
import { formatWon } from '@/utils/formatWon';
import HouseTypeTag from '@/components/DashBoard/HouseTypeTag';
import Image from 'next/image';
import EditButtonContainer from '@/components/EditButtonContainer';
import CheckListContainer from '@/components/CheckList/CheckListContainer';
import IconComponent from '@/components/Asset/Icon';
import { updateChecklist } from '@/lib/api/checklist';
import { useToastStore } from '@/store/toastStore';
import Link from 'next/link';
import ImageSlider from '@/components/DashBoard/ImageSlider';
import useImageCarousel from '@/hooks/propertyDetail/useImageCarousel';
import { Property } from '@/types';

interface Props {
  roomChecklist: ChecklistPayloadItem[];
  detail: Property;
}

export default function RoomDetailPage({ roomChecklist, detail }: Props) {
  const router = useRouter();
  const { propertyImages, propertyAddress, leaseType, deposit, monthlyFee, availableDate, id } =
    detail;
  const { showToast } = useToastStore();
  const [isEdit, setIsEdit] = useState(false);
  const [checklist, setChecklist] = useState<ChecklistPayloadItem[]>([]);
  const [, setActiveIndex] = useState(0);

  const { setSelected, setApi, setStartIndex, selected, startIndex, currentIndex } =
    useImageCarousel({ images: detail.propertyImages || [] });

  const handleEditImages = () => {
    router.push(`/property/add-photo?mode=edit&propertyId=${id}`);
  };

  const handleEdit = () => {
    if (isEdit) return;
    setIsEdit(true);
  };

  const submitUpdateChecklist = async () => {
    await updateChecklist(String(id), checklist);
    showToast('체크리스트가 수정되었습니다.', 'success');
    setIsEdit(false);
  };

  useEffect(() => {
    if (roomChecklist.length > 0 && checklist.length === 0) {
      setChecklist(roomChecklist);
    }
  }, [roomChecklist, checklist]);

  return (
    <>
      {isEdit && (
        <EditButtonContainer onClick={submitUpdateChecklist} onEditImage={handleEditImages} />
      )}
      <div className="w-full aspect-[1.8/1] relative">
        <Link
          href={`/property/edit-photo?mode=edit&propertyId=${id}`}
          className="absolute right-[14px] top-[15px] z-10 px-2 py-1 rounded-full border-gray-300 bg-white text-sm"
        >
          사진 수정
        </Link>
        {propertyImages.length > 0 ? (
          <Swiper
            modules={[Pagination]}
            spaceBetween={10}
            slidesPerView={1}
            pagination={{ clickable: true }}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            className="h-full"
          >
            {propertyImages.map((item, index) => (
              <SwiperSlide key={index} className="relative">
                <Image
                  fill
                  src={item.imageUrl}
                  alt={`room-${index}`}
                  objectFit="cover"
                  onClick={() => {
                    setSelected(item);
                    setStartIndex(index);
                  }}
                  className="cursor-pointer"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="bg-primary2 h-full">
            <IconComponent
              name="home"
              width={64}
              height={64}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            />
          </div>
        )}
      </div>
      <ImageSlider
        images={propertyImages}
        selected={selected}
        currentIndex={currentIndex}
        startIndex={startIndex}
        setSelected={setSelected}
        setApi={setApi}
      />
      <div className="flex flex-col gap-2.5 px-4 mt-7">
        <div className=" flex flex-col gap-1">
          <HouseTypeTag type={leaseType} />
          {leaseType === 'JEONSE' ? (
            <h2 className="text-b-18">보증금 {formatWon(deposit)}</h2>
          ) : (
            <h2 className="text-b-18">
              보증금 {formatWon(deposit)} / 월세 {formatWon(monthlyFee ?? 0)}
            </h2>
          )}
          <p className="text-r-15 text-[15px]">{propertyAddress}</p>
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
            <p className="flex items-center ">{formatDate(new Date(availableDate), 2)}</p>
          </div>
        </div>
      </div>
      <div className={`flex-grow px-4 ${isEdit ? 'pb-28' : 'pb-20'}`}>
        <CheckListContainer checklist={checklist} setter={setChecklist} handleEdit={handleEdit} />
      </div>
    </>
  );
}

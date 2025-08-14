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
import Link from 'next/link';
import ImageSlider from '@/components/DashBoard/ImageSlider';
import useImageCarousel from '@/hooks/propertyDetail/useImageCarousel';
import { Property } from '@/types';
import { motion } from 'framer-motion';
import { toast } from '@/hooks/use-toast';
import { useQueryClient } from '@tanstack/react-query';

interface Props {
  roomChecklist: ChecklistPayloadItem[];
  detail: Property;
}

export default function RoomDetailPage({ roomChecklist, detail }: Props) {
  const router = useRouter();
  const { propertyImages, propertyAddress, leaseType, deposit, monthlyFee, availableDate, id } =
    detail;
  const [isEdit, setIsEdit] = useState(false);
  const [checklist, setChecklist] = useState<ChecklistPayloadItem[]>([]);
  const [, setActiveIndex] = useState(0);
  const queryClient = useQueryClient();

  const { setSelected, setApi, setStartIndex, selected, startIndex, currentIndex } =
    useImageCarousel({ images: detail.propertyImages || [] });

  const handleEditImages = () => {
    router.push(`/property/edit-photo?propertyId=${id}`);
  };

  const handleEdit = () => {
    if (isEdit) return;
    setIsEdit(true);
  };

  const submitUpdateChecklist = async () => {
    await updateChecklist(String(id), checklist);
    queryClient.invalidateQueries({ queryKey: 'propertyDetail', id });
    toast({ title: '체크리스트가 수정되었습니다.', variant: 'success' });
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
          href={`/property/edit-photo?propertyId=${id}`}
          className="absolute right-14 top-15 z-10 px-8 py-4 rounded-full border-gray-300 bg-white text-14/19 transition duration-100 hover:bg-gray-300 active:bg-gray-400"
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
                <Image fill src={item.imageUrl} alt={`room-${index}`} objectFit="cover" />
                <div
                  className="absolute inset-0 z-10 bg-gradient-to-t from-black/30 to-transparent cursor-pointer"
                  onClick={() => {
                    setSelected(item);
                    setStartIndex(index);
                  }}
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
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col gap-10 px-20 mt-28 mb-20"
      >
        <div className=" flex flex-col gap-4">
          <HouseTypeTag type={leaseType} />
          {leaseType === 'JEONSE' ? (
            <h2 className="text-b-18">보증금 {formatWon(deposit)}</h2>
          ) : (
            <h2 className="text-b-18">
              보증금 {formatWon(deposit)} / 월세 {formatWon(monthlyFee ?? 0)}
            </h2>
          )}
          <p className="text-r-15 text-15">{propertyAddress}</p>
        </div>
        <div className="flex gap-4 items-center">
          <Image
            src="/icons/calendar-brown.svg"
            color="#94896A"
            width={10}
            height={10}
            alt="캘린더 아이콘"
          />
          <div className="flex gap-8 text-brownText text-r-12">
            <span className="font-semibold">입주 가능 일자</span>
            <p className="flex items-center ">{formatDate(new Date(availableDate), 2)}</p>
          </div>
        </div>
      </motion.div>
      <div className={`flex-grow px-20 ${isEdit ? 'pb-112' : 'pb-80'}`}>
        <CheckListContainer checklist={checklist} setter={setChecklist} handleEdit={handleEdit} />
      </div>
    </>
  );
}

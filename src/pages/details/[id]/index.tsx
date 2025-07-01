import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { ChecklistPayloadItem } from '@/types/checklist';
import Header from '@/components/Layout/Header';
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
import { usePropertyDetail } from '@/hooks/propertyDetail/usePropertyDetail';
import ImageSlider from '@/components/DashBoard/ImageSlider';
import useImageCarousel from '@/hooks/propertyDetail/useImageCarousel';

export default function ChecklistDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const propertyId = typeof id === 'string' ? id : undefined;
  const { propertyChecklist, propertyDetail } = usePropertyDetail(propertyId);
  const { showToast } = useToastStore();
  const [isEdit, setIsEdit] = useState(false);
  const [checklist, setChecklist] = useState<ChecklistPayloadItem[]>([]);
  const [, setActiveIndex] = useState(0);

  const { setSelected, setApi, setStartIndex, selected, startIndex, currentIndex } =
    useImageCarousel({ images: propertyDetail?.propertyImages || [] });

  const handleEditImages = () => {
    if (!id) return;
    router.push(`/property/add-photo?mode=edit&propertyId=${id}`);
  };

  const handleEdit = () => {
    if (isEdit) return;
    setIsEdit(true);
  };

  const submitUpdateChecklist = async () => {
    if (!id) return;
    await updateChecklist(id as string, checklist);
    showToast('체크리스트가 수정되었습니다.', 'success');
    setIsEdit(false);
  };

  useEffect(() => {
    if (propertyChecklist.length > 0 && checklist.length === 0) {
      setChecklist(propertyChecklist);
    }
  }, [propertyChecklist, checklist]);

  if (!propertyDetail) {
    return <div>매물 정보가 없습니다.</div>;
  }

  return (
    <div className="h-full flex flex-col bg-[#F6F5F2] relative">
      <Header
        type={3}
        title={propertyDetail.propertyName}
        isFixed={propertyDetail.isBookmarked}
        propertyId={propertyDetail.id}
      />
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
        {propertyDetail.propertyImages.length > 0 ? (
          <Swiper
            modules={[Pagination]}
            spaceBetween={10}
            slidesPerView={1}
            pagination={{ clickable: true }}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            className="h-full"
          >
            {propertyDetail.propertyImages.map((item, index) => (
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
        images={propertyDetail.propertyImages}
        selected={selected}
        currentIndex={currentIndex}
        startIndex={startIndex}
        setSelected={setSelected}
        setApi={setApi}
      />

      <div className="flex flex-col gap-2.5 px-4 mt-7">
        <div className=" flex flex-col gap-1">
          <HouseTypeTag type={propertyDetail.leaseType} />
          {propertyDetail.leaseType === 'JEONSE' ? (
            <h2 className="text-b-18">보증금 {formatWon(propertyDetail.deposit)}</h2>
          ) : (
            <h2 className="text-b-18">
              보증금 {formatWon(propertyDetail.deposit!)} / 월세{' '}
              {formatWon(propertyDetail.monthlyFee!)}
            </h2>
          )}
          <p className="text-r-15 text-[15px]">{propertyDetail?.propertyAddress}</p>
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
              {formatDate(new Date(propertyDetail.availableDate), 2)}
            </p>
          </div>
        </div>
      </div>

      <div className={`flex-grow px-4 ${isEdit ? 'pb-28' : 'pb-20'}`}>
        <CheckListContainer checklist={checklist} setter={setChecklist} handleEdit={handleEdit} />
      </div>
    </div>
  );
}

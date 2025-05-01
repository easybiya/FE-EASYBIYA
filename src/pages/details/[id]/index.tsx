import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import ChecklistContainer from '@/components/CheckList/CheckListContainer';
import { CheckItemPayload, ChecklistPayloadItem } from '@/types/checklist';
import { DropResult } from '@hello-pangea/dnd';
import Header from '@/components/Layout/Header';
import { mockHouserData } from '@/data/mockHouseData';
import { useRouter } from 'next/router';
import { formatDate } from '@/utils/formatDate';
import { formatWon } from '@/utils/formatWon';
import HouseTypeTag from '@/components/DashBoard/HouseTypeTag';
import Image from 'next/image';
import EditButtonContainer from '@/components/EditButtonContainer';
import { mockCheckList } from '@/data/mockCheckList';
import ChecklistModal from '@/components/Modal/ChecklistModal';

export default function ChecklistDetailPage() {
  const [isEdit, setIsEdit] = useState(false);
  const [checklist, setChecklist] = useState<ChecklistPayloadItem[]>([]);
  const [, setActiveIndex] = useState(0);
  const router = useRouter();
  const { id } = router.query;
  const propertyData = mockHouserData.find((item) => item.id === Number(id));
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'edit' | 'confirm'>('edit');
  const [editingItemId, setEditingItemId] = useState<number | null>(null);

  const updateCheckItemDescription = (
    priority: number,
    checkItemPriority: number,
    newDescription: string,
  ) => {
    const updatedChecklist = checklist.map((item) => {
      if (item.priority !== priority) return item;

      const updatedCheckItems = item.checkItems.map((checkItem) =>
        checkItem.priority === checkItemPriority
          ? { ...checkItem, description: newDescription }
          : checkItem,
      );

      return { ...item, checkItems: updatedCheckItems };
    });

    setChecklist(updatedChecklist);
    setIsEdit(true);
  };

  const updateChecklistValue = (id: number, checkItem: CheckItemPayload) => {
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
    setIsEdit(true);
  };

  const handleEditChecklist = (id: number) => {
    setEditingItemId(id);
    setModalMode('edit');
    setShowModal(true);
  };

  const handleDeleteChecklist = (id: number) => {
    setEditingItemId(id);
    setModalMode('confirm');
    setShowModal(true);
  };

  const handleEditSubmit = (newLabel: string) => {
    setChecklist((prev) =>
      prev.map((item) => (item.priority === editingItemId ? { ...item, title: newLabel } : item)),
    );
    setIsEdit(true);
  };

  const handleConfirmDelete = () => {
    if (editingItemId !== null) {
      setChecklist((prev) => prev.filter((item) => item.priority !== editingItemId));
    }
    setIsEdit(true);
  };

  const handleOptionAdd = (priority: number) => {
    setChecklist((prev) =>
      prev.map((item) => {
        if (item.priority !== priority) return item;

        if (item.checkType === 'RADIO' || item.checkType === 'CHECKBOX') {
          const nextPriority = item.checkItems.length + 1;
          const newOption = {
            description: `옵션 ${nextPriority}`,
            checked: false,
            priority: nextPriority,
          };
          return {
            ...item,
            checkItems: [...item.checkItems, newOption],
          };
        }

        return item;
      }),
    );
    setIsEdit(true);
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
    setIsEdit(true);
  };

  useEffect(() => {
    const testData = mockCheckList;
    setChecklist([...testData]);
  }, []);

  if (!propertyData) {
    return <div>매물 정보가 없습니다.</div>;
  }

  return (
    <div className="h-full flex flex-col bg-[#F6F5F2] relative">
      <Header type={3} title={propertyData.propertyName} isFixed={propertyData.isBookmarked} />
      {isEdit && <EditButtonContainer onClick={() => setIsEdit(false)} />}
      <div className="w-full h-[202px] relative">
        <Swiper
          modules={[Pagination]}
          spaceBetween={10}
          slidesPerView={1}
          pagination={{ clickable: true }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          className="h-full"
        >
          {propertyData.propertyImages.map((item, index) => (
            <SwiperSlide key={index}>
              <img
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
          onUpdateChecklist={updateChecklistValue} // 체크리스트 onchange 이벤트
          onReorderChecklist={handleDragEnd} // 드레그 이벤트
          onEditChecklist={handleEditChecklist} //
          onDeleteChecklist={handleDeleteChecklist} // 체크리스트 삭제 이벤트
          onOptionAdd={handleOptionAdd}
          onOptionEdit={updateCheckItemDescription}
        />
      </div>
      {showModal && editingItemId !== null && (
        <ChecklistModal
          mode={modalMode}
          title={modalMode === 'edit' ? '수정하시겠습니까?' : '정말 삭제하시겠습니까?'}
          defaultValue={
            modalMode === 'edit'
              ? checklist.find((item) => item.priority === editingItemId)?.title ?? ''
              : ''
          }
          confirmText={modalMode === 'edit' ? '확인' : '삭제'}
          onClose={() => setShowModal(false)}
          onConfirm={(value) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            modalMode === 'edit' ? handleEditSubmit(value as string) : handleConfirmDelete();
          }}
        />
      )}
    </div>
  );
}

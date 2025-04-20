import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ChecklistContainer from '@/components/CheckList/CheckListContainer';
import CustomButton from '@/components/Button/CustomButton';
import ChecklistAddButton from '@/components/Button/CheckListAddButton';
import HeaderWithProgress from '@/components/Layout/HeaderWithProgress';
import ChecklistModal from '@/components/Modal/ChecklistModal';
import TemplateSelectModal from '@/components/Modal/TemplateSelectModal';
import { DropResult } from '@hello-pangea/dnd';
import {
  CheckItemPayload,
  ChecklistItem,
  ChecklistPayloadItem,
  ChecklistTemplate,
  CheckType,
} from '@/types/checklist';
import Toast from '@/components/Toast';
import { useToastStore } from '@/store/toastStore';
import ChecklistComplete from '@/components/CompletePage';
import { useTemplateStore } from '@/store/templateStore';
import { mockCheckList } from '@/data/mockHouseData';

export default function ChecklistPage() {
  const router = useRouter();
  const [checklist, setChecklist] = useState<ChecklistPayloadItem[]>([]);
  const [error] = useState<string | null>(null);
  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'edit' | 'confirm'>('edit');
  const [showTemplateSelectModal, setShowTemplateSelectModal] = useState(false);
  const [showNewTemplateModal, setShowNewTemplateModal] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const transformApiChecklist = (apiData: ChecklistItem[]): ChecklistPayloadItem[] => {
    return apiData.map((item, index) => ({
      priority: index + 1,
      title: item.title,
      checkType: item.checkType,
      content: null,
      checkItems: item.checkItems.map((checkItemDesc, checkItemIndex) => ({
        description: checkItemDesc,
        checked: checkItemIndex === 0, // 첫 번째만 true로 예시
        priority: checkItemIndex + 1,
      })),
    }));
  };

  // 나중에 패칭할 로직 남겨두었음
  // const fetchTemplate = async (signal: AbortSignal) => {
  //   try {
  //     const response = await fetch('/api/template/default', { signal });
  //     const data = await response.json();

  //     if (!data.isSuccess || !data.result?.checklists) {
  //       throw new Error('템플릿 데이터를 불러오지 못했습니다.');
  //     }

  //     const transformed = transformApiChecklist(data.result.checklists);
  //     console.log(transformed);
  //     setChecklist(transformed);
  //   } catch (err) {
  //     if (err instanceof DOMException && err.name === 'AbortError') return;
  //     setError('체크리스트 템플릿을 불러오는 중 문제가 발생했습니다.');
  //     console.error(err);
  //   }
  // };

  useEffect(() => {
    const testData = mockCheckList;
    const transformedTemplate = transformApiChecklist(testData.checklists);
    setChecklist(transformedTemplate);
  }, []);

  useEffect(() => {
    if (router.query.saved === 'true') {
      useToastStore.getState().showToast('기존 템플릿에 저장 완료', 'success');
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { saved, ...rest } = router.query;
      router.replace({ pathname: router.pathname, query: rest }, undefined, { shallow: true });
    }
  }, [router.query]);

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
  };

  const handleEditChecklist = (id: number) => {
    setEditingItemId(id);
    setModalMode('edit');
    setShowModal(true);
  };

  const handleEditSubmit = (newLabel: string) => {
    setChecklist((prev) =>
      prev.map((item) => (item.priority === editingItemId ? { ...item, title: newLabel } : item)),
    );
  };

  const handleDeleteChecklist = (id: number) => {
    setEditingItemId(id);
    setModalMode('confirm');
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    if (editingItemId !== null) {
      setChecklist((prev) => prev.filter((item) => item.priority !== editingItemId));
    }
  };

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
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(checklist);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setChecklist(items);
  };

  const handleAddChecklist = (type: CheckType) => {
    const newId = checklist.length > 0 ? checklist[checklist.length - 1].priority + 1 : 1;

    const newItem: ChecklistPayloadItem = {
      priority: newId,
      title: '새 체크리스트 항목',
      content: type === 'TEXT' ? '옵션1' : null,
      checkType: type,
      checkItems:
        type === 'TEXT'
          ? []
          : [
              {
                description: '옵션1',
                checked: false,
                priority: 1,
              },
            ],
    };

    setChecklist((prev) => [...prev, newItem]);
  };

  const handleSaveTemplate = (name: string) => {
    const template: ChecklistTemplate = {
      name,
      checklists: checklist.map(({ title, checkType, checkItems, content }) => ({
        title,
        checkType: checkType,
        content,
        checkItems: checkItems.map((item) => item.description),
      })),
    };
    const store = useTemplateStore.getState();
    store.addTemplate(template);
    store.setSelectedTemplate(template);
    setShowNewTemplateModal(false);
    console.log(template);
    useToastStore.getState().showToast('새 템플릿 생성 완료', 'success');
  };

  const handleNavigateToProfileChecklist = () => {
    router.push({ pathname: '/profile/checklist', query: { returnTo: '/create/checklist' } });
  };

  return (
    <div className="flex justify-center bg-[#F6F5F2]">
      <div className="relative w-full max-w-[430px] h-screen flex flex-col">
        {isCompleted ? (
          <ChecklistComplete />
        ) : (
          <>
            <HeaderWithProgress title="체크리스트 등록" totalSteps={4} />

            <div className="flex-1 overflow-y-auto px-4 pb-48 no-scrollbar">
              {error && (
                <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-md">{error}</div>
              )}

              <ChecklistContainer
                checklist={checklist}
                onUpdateChecklist={updateChecklistValue} // 체크리스트 onchange 이벤트
                onReorderChecklist={handleDragEnd} // 드레그 이벤트
                onEditChecklist={handleEditChecklist} //
                onDeleteChecklist={handleDeleteChecklist} // 체크리스트 삭제 이벤트
                onOptionAdd={handleOptionAdd}
                onOptionEdit={updateCheckItemDescription}
              />

              <div className="mt-6">
                <h2 className="text-lg font-bold text-gray-900 mb-3">체크리스트 추가</h2>
                <div className="grid grid-cols-3 gap-3">
                  <ChecklistAddButton
                    label="중복 선택"
                    iconName="addListCheck"
                    onClick={() => handleAddChecklist('CHECKBOX')}
                  />
                  <ChecklistAddButton
                    label="단일 선택"
                    iconName="addListRadio"
                    onClick={() => handleAddChecklist('RADIO')}
                  />
                  <ChecklistAddButton
                    label="텍스트"
                    iconName="addListText"
                    onClick={() => handleAddChecklist('TEXT')}
                  />
                </div>
              </div>

              <CustomButton
                label="템플릿 저장"
                variant="secondary"
                fullWidth
                className="mt-5 mb-6"
                onClick={() => setShowTemplateSelectModal(true)}
              />
            </div>

            <div className="pointer-events-none fixed bottom-[136px] left-1/2 -translate-x-1/2 w-full max-w-[430px] h-10 bg-gradient-to-t from-[#F6F5F2] to-transparent z-20" />

            <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-[#F6F5F2] z-30 px-4 pt-2 pb-6">
              <CustomButton
                label="완료"
                variant="primary"
                fullWidth
                className="h-11 text-sm rounded-md"
                onClick={() => setIsCompleted(true)}
              />
              <CustomButton
                label="건너뛰기"
                variant="ghost"
                fullWidth
                className="mt-2 h-10 text-sm"
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

            {showTemplateSelectModal && (
              <TemplateSelectModal
                onClose={() => setShowTemplateSelectModal(false)}
                onCreateNew={() => {
                  setShowTemplateSelectModal(false);
                  setShowNewTemplateModal(true);
                }}
                onCancel={() => setShowTemplateSelectModal(false)}
                onNavigate={handleNavigateToProfileChecklist}
              />
            )}

            {showNewTemplateModal && (
              <ChecklistModal
                mode="edit"
                title="새 템플릿 생성"
                defaultValue={`나의 체크리스트 ${new Date().toISOString().slice(0, 10)}`}
                confirmText="저장"
                onClose={() => setShowNewTemplateModal(false)}
                onConfirm={(value) => handleSaveTemplate(value!)}
              />
            )}
          </>
        )}

        <Toast />
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import ChecklistContainer from '@/components/CheckList/CheckListContainer';
import CustomButton from '@/components/Button/CustomButton';
import ChecklistAddButton from '@/components/Button/CheckListAddButton';
import HeaderWithProgress from '@/components/Layout/HeaderWithProgress';
import ChecklistModal from '@/components/Modal/ChecklistModal';
import TemplateSelectModal from '@/components/Modal/TemplateSelectModal';
import { DropResult } from '@hello-pangea/dnd';
import { ChecklistItemType, ChecklistTemplate } from '@/types/checklist';
import Toast from '@/components/Toast';
import { useToastStore } from '@/store/toastStore';
import ChecklistComplete from '@/components/CompletePage';
import { useTemplateStore } from '@/store/templateStore';
import { DefaultChecklist } from '@/data/defaultCheckList';

export default function ChecklistPage() {
  const [checklist, setChecklist] = useState<ChecklistItemType[]>([]);
  const [error] = useState<string | null>(null);
  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'edit' | 'confirm'>('edit');
  const [isCompleted, setIsCompleted] = useState(false);
  const [showTemplateSelectModal, setShowTemplateSelectModal] = useState(false);
  const [showNewTemplateModal, setShowNewTemplateModal] = useState(false);

  useEffect(() => {
    setChecklist(DefaultChecklist);
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
  };

  const handleEditChecklist = (id: number) => {
    setEditingItemId(id);
    setModalMode('edit');
    setShowModal(true);
  };

  const handleEditSubmit = (newLabel: string) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === editingItemId ? { ...item, label: newLabel } : item)),
    );
  };

  const handleDeleteChecklist = (id: number) => {
    setEditingItemId(id);
    setModalMode('confirm');
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    if (editingItemId !== null) {
      setChecklist((prev) => prev.filter((item) => item.id !== editingItemId));
    }
  };

  const handleOptionEdit = (id: number, optionIndex: number, newValue: string) => {
    setChecklist((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              options: item.options?.map((opt, idx) => (idx === optionIndex ? newValue : opt)),
            }
          : item,
      ),
    );
  };

  const handleOptionAdd = (id: number) => {
    setChecklist((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        if (item.type === 'radio' || item.type === 'checkbox') {
          const nextIndex = item.options?.length ? item.options.length + 1 : 1;
          const newOption = `옵션 ${nextIndex}`;
          return {
            ...item,
            options: [...(item.options ?? []), newOption],
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

  const handleAddChecklist = (type: 'checkbox' | 'radio' | 'text') => {
    const newId = checklist.reduce((max, cur) => Math.max(max, cur.id), 0) + 1;

    const newItem: ChecklistItemType = {
      id: newId,
      label: '새 체크리스트 항목',
      type,
      value: type === 'checkbox' ? [] : '',
      options: type === 'text' ? [] : ['옵션 1'],
    };

    setChecklist((prev) => [...prev, newItem]);
  };

  const handleSaveTemplate = (name: string) => {
    const template: ChecklistTemplate = {
      name,
      checklists: checklist.map(({ label, type, options }) => ({
        title: label,
        checkType: type.toUpperCase() as 'TEXT' | 'RADIO' | 'CHECKBOX',
        checkItems: options ?? [],
      })),
    };

    const store = useTemplateStore.getState();
    store.addTemplate(template);
    store.setSelectedTemplate(template);
    setShowNewTemplateModal(false);
    useToastStore.getState().showToast('새 템플릿 생성 완료', 'success');
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
                onUpdateChecklist={updateChecklistValue}
                onReorderChecklist={handleDragEnd}
                onEditChecklist={handleEditChecklist}
                onDeleteChecklist={handleDeleteChecklist}
                onOptionEdit={handleOptionEdit}
                onOptionAdd={handleOptionAdd}
              />

              <div className="mt-6">
                <h2 className="text-lg font-bold text-gray-900 mb-3">체크리스트 추가</h2>
                <div className="grid grid-cols-3 gap-3">
                  <ChecklistAddButton
                    label="중복 선택"
                    iconName="addListCheck"
                    onClick={() => handleAddChecklist('checkbox')}
                  />
                  <ChecklistAddButton
                    label="단일 선택"
                    iconName="addListRadio"
                    onClick={() => handleAddChecklist('radio')}
                  />
                  <ChecklistAddButton
                    label="텍스트"
                    iconName="addListText"
                    onClick={() => handleAddChecklist('text')}
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
                    ? checklist.find((item) => item.id === editingItemId)?.label ?? ''
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

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import HeaderWithProgress from '@/components/Layout/HeaderWithProgress';
import ChecklistModal from '@/components/Modal/ChecklistModal';
import TemplateSelectModal from '@/components/Modal/TemplateSelectModal';
import Toast from '@/components/Toast';
import ChecklistComplete from '@/components/CompletePage';
import ChecklistContent from '@/components/CheckList/CheckListContent';
import CustomButton from '@/components/Button/CustomButton';
import { DropResult } from '@hello-pangea/dnd';
import {
  CheckItemPayload,
  ChecklistItem,
  ChecklistPayloadItem,
  ChecklistTemplate,
  CheckType,
} from '@/types/checklist';
import { useToastStore } from '@/store/toastStore';
import { useTemplateStore } from '@/store/templateStore';
import { usePropertyStore } from '@/store/usePropertyStore';
import { mockCheckList } from '@/data/mockHouseData';
import { postProperty } from '@/lib/api/property';

export default function ChecklistPage() {
  const router = useRouter();
  const [checklist, setChecklist] = useState<ChecklistPayloadItem[]>([]);
  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const [editingOption, setEditingOption] = useState<{
    itemPriority: number;
    checkItemPriority: number;
  } | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'edit' | 'option-edit' | 'confirm'>('edit');
  const [showTemplateSelectModal, setShowTemplateSelectModal] = useState(false);
  const [showNewTemplateModal, setShowNewTemplateModal] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const { property, images, resetAll } = usePropertyStore();
  const store = useTemplateStore();

  // TO DO
  // hasInfo, 항목 & 세부사항 삭제 로직 돌려놓기

  useEffect(() => {
    const transformApiChecklist = (apiData: ChecklistItem[]): ChecklistPayloadItem[] => {
      return apiData.map((item, index) => ({
        priority: index + 1,
        title: item.title,
        checkType: item.checkType,
        content: null,
        checkItems: item.checkItems.map((desc, idx) => ({
          description: desc,
          checked: idx === 0,
          priority: idx + 1,
        })),
      }));
    };

    const transformed = transformApiChecklist(mockCheckList.checklists);
    setChecklist(transformed);
  }, []);

  const updateChecklistValue = (id: number, checkItem: CheckItemPayload) => {
    const updatedChecklist = checklist.map((item) => {
      if (item.priority !== id) return item;
      if (item.checkType === 'CHECKBOX') {
        const updated = item.checkItems.map((ci) =>
          ci.priority === checkItem.priority ? { ...ci, checked: !ci.checked } : ci,
        );
        return { ...item, checkItems: updated };
      }
      if (item.checkType === 'RADIO') {
        const updated = item.checkItems.map((ci) => ({
          ...ci,
          checked: ci.priority === checkItem.priority,
        }));
        return { ...item, checkItems: updated };
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
    newDesc: string,
  ) => {
    const updated = checklist.map((item) => {
      if (item.priority !== priority) return item;
      const checkItems = item.checkItems.map((ci) =>
        ci.priority === checkItemPriority ? { ...ci, description: newDesc } : ci,
      );
      return { ...item, checkItems };
    });
    setChecklist(updated);
  };

  const handleOptionEdit = (itemPriority: number, checkItemPriority: number) => {
    setEditingOption({ itemPriority, checkItemPriority });
    setModalMode('option-edit');
    setShowModal(true);
  };

  const handleOptionAdd = (priority: number) => {
    setChecklist((prev) =>
      prev.map((item) => {
        if (item.priority !== priority) return item;
        const next = item.checkItems.length + 1;
        const newOption = { description: `옵션 ${next}`, checked: false, priority: next };
        return { ...item, checkItems: [...item.checkItems, newOption] };
      }),
    );
  };

  const handleAddChecklist = (type: CheckType) => {
    const newId = checklist.length > 0 ? checklist[checklist.length - 1].priority + 1 : 1;
    const newItem: ChecklistPayloadItem = {
      priority: newId,
      title: '새 체크리스트 항목',
      content: type === 'TEXT' ? '옵션1' : null,
      checkType: type,
      checkItems: type === 'TEXT' ? [] : [{ description: '옵션1', checked: false, priority: 1 }],
    };
    setChecklist((prev) => [...prev, newItem]);
  };

  const handleReorderChecklist = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(checklist);
    const [reordered] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reordered);
    setChecklist(items);
  };

  const handleSaveTemplate = () => setShowTemplateSelectModal(true);

  const handleComplete = async () => {
    const formData = new FormData();
    formData.append(
      'request',
      new Blob([JSON.stringify({ property, checklists: checklist })], { type: 'application/json' }),
    );
    images.forEach((img) => formData.append('images', img));
    try {
      await postProperty(formData);
      resetAll();
      setIsCompleted(true);
      setShowTemplateSelectModal(true);
    } catch {
      useToastStore.getState().showToast('등록에 실패했습니다', 'error');
    }
  };

  const handleNewTemplateSave = (name: string) => {
    const template: ChecklistTemplate = {
      name,
      checklists: checklist.map(({ title, checkType, content, checkItems }) => ({
        title,
        checkType,
        content,
        checkItems: checkItems.map((i) => i.description),
      })),
    };
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
            <ChecklistContent
              checklist={checklist}
              onUpdateChecklist={updateChecklistValue}
              onReorderChecklist={handleReorderChecklist}
              onEditChecklist={handleEditChecklist}
              onDeleteChecklist={handleDeleteChecklist}
              onOptionAdd={handleOptionAdd}
              onOptionEdit={handleOptionEdit}
              onAddChecklist={handleAddChecklist}
              onSaveTemplate={handleSaveTemplate}
            />
            <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-[#F6F5F2] z-30 px-4 pt-2 pb-6">
              <CustomButton
                label="완료"
                variant="primary"
                fullWidth
                className="h-11 text-sm rounded-md"
                onClick={handleComplete}
              />
              <CustomButton
                label="건너뛰기"
                variant="ghost"
                fullWidth
                className="mt-2 h-10 text-sm"
              />
            </div>
          </>
        )}

        {showModal && (editingItemId !== null || editingOption !== null) && (
          <ChecklistModal
            mode={modalMode === 'edit' || modalMode === 'confirm' ? modalMode : 'edit'}
            title={
              modalMode === 'edit'
                ? '항목명을 수정하시겠습니까?'
                : modalMode === 'option-edit'
                ? '옵션 설명을 수정하시겠습니까?'
                : '정말 삭제하시겠습니까?'
            }
            defaultValue={
              modalMode === 'option-edit'
                ? checklist
                    .find((i) => i.priority === editingOption?.itemPriority)
                    ?.checkItems.find((opt) => opt.priority === editingOption?.checkItemPriority)
                    ?.description ?? ''
                : checklist.find((i) => i.priority === editingItemId)?.title ?? ''
            }
            confirmText={modalMode === 'confirm' ? '삭제' : '확인'}
            onClose={() => {
              setShowModal(false);
              setEditingItemId(null);
              setEditingOption(null);
            }}
            onConfirm={(value) => {
              if (modalMode === 'edit') handleEditSubmit(value as string);
              else if (modalMode === 'option-edit' && editingOption) {
                updateCheckItemDescription(
                  editingOption.itemPriority,
                  editingOption.checkItemPriority,
                  value as string,
                );
              } else if (modalMode === 'confirm') {
                handleConfirmDelete();
              }
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
            onNavigate={() => router.push('/profile/checklist')}
          />
        )}

        {showNewTemplateModal && (
          <ChecklistModal
            mode="edit"
            title="새 템플릿 생성"
            defaultValue={`나의 체크리스트 ${new Date().toISOString().slice(0, 10)}`}
            confirmText="저장"
            onClose={() => setShowNewTemplateModal(false)}
            onConfirm={(value) => handleNewTemplateSave(value as string)}
          />
        )}

        <Toast />
      </div>
    </div>
  );
}

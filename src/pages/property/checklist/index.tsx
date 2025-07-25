import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import HeaderWithProgress from '@/components/Layout/HeaderWithProgress';
import ChecklistModal from '@/components/Modal/ChecklistModal';
import TemplateSelectModal from '@/components/Modal/TemplateSelectModal';
import ChecklistComplete from '@/components/CompletePage';
import ChecklistContent from '@/components/CheckList/CheckListContent';
import { ChecklistPayloadItem, ChecklistTemplate, CheckType } from '@/types/checklist';
import { useToastStore } from '@/store/toastStore';
import { useTemplateStore } from '@/store/templateStore';
import { usePropertyStore } from '@/store/usePropertyStore';
import { postProperty, updateProperty } from '@/lib/api/property';
import { postTemplate } from '@/lib/api/template';
import FixedBar from '@/components/FixedBar';
import { useSearchParams } from 'next/navigation';
import {
  getChecklistTemplate,
  getPropertyChecklistById,
  updateChecklist,
} from '@/lib/api/checklist';
import { useQueryClient } from '@tanstack/react-query';
import checklistFormatter from '@/utils/checklistFormatter';

export default function ChecklistPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const propertyId = searchParams.get('propertyId');
  const isEdit = searchParams.get('mode') === 'edit';
  const [checklist, setChecklist] = useState<ChecklistPayloadItem[]>([]);
  const [showTemplateSelectModal, setShowTemplateSelectModal] = useState(false);
  const [showNewTemplateModal, setShowNewTemplateModal] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const { property, images, resetAll } = usePropertyStore();
  const store = useTemplateStore();
  const queryClient = useQueryClient();

  // TO DO
  // hasInfo, 항목 & 세부사항 삭제 로직 돌려놓기

  useEffect(() => {
    const fetchTemplate = async () => {
      const result = await getChecklistTemplate();
      const transformed = checklistFormatter(result.checklists);
      setChecklist(transformed);
    };
    const fetchData = async () => {
      if (!propertyId) return;
      const result = await getPropertyChecklistById(propertyId);
      setChecklist(result);
    };
    if (isEdit) {
      // 편집 모드 일때, 해당 매물 정보 저장 및 체크리스트 저장
      fetchData();
    } else {
      // 신규 모드일때는 템플릿 변환
      fetchTemplate();
    }
  }, [isEdit, propertyId]);

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

  const handleSaveTemplate = () => setShowTemplateSelectModal(true);

  const handleComplete = async () => {
    const formData = new FormData();
    formData.append(
      'request',
      new Blob([JSON.stringify({ property, checklists: checklist })], { type: 'application/json' }),
    );
    images.forEach((img) => formData.append('images', img));
    try {
      if (isEdit) {
        await updateProperty(property, propertyId as string);
        await updateChecklist(propertyId as string, checklist);
        queryClient.invalidateQueries({ queryKey: ['propertyDetail', propertyId] });
        queryClient.invalidateQueries({ queryKey: ['checklist', propertyId] });
      } else {
        await postProperty(formData);
      }
      resetAll();
      setIsCompleted(true);
      setShowTemplateSelectModal(true);
    } catch {
      useToastStore.getState().showToast('등록에 실패했습니다', 'error');
    }
  };

  const handleNewTemplateSave = async (name: string) => {
    const template: ChecklistTemplate = {
      name,
      checklists: checklist.map(({ title, checkType, content, checkItems }) => ({
        title,
        checkType,
        content,
        checkItems: checkItems.map((i) => i.description),
      })),
    };

    try {
      await postTemplate(template);

      store.addTemplate(template);
      store.setSelectedTemplate(template);
      setShowNewTemplateModal(false);
      useToastStore.getState().showToast('새 템플릿 생성 완료', 'success');
    } catch (error) {
      useToastStore.getState().showToast('템플릿 저장 실패', 'error');
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center bg-[#F6F5F2] px-20">
      <div className="relative w-full max-w-430 h-screen flex flex-col">
        {isCompleted ? (
          <ChecklistComplete />
        ) : (
          <>
            <HeaderWithProgress title="체크리스트 등록" />
            <ChecklistContent
              checklist={checklist}
              setter={setChecklist}
              onAddChecklist={handleAddChecklist}
              onSaveTemplate={handleSaveTemplate}
            />
            <FixedBar
              onClick={handleComplete}
              skipRoute="/"
              preventSkip={true}
              disabled={property.monthlyFee === null && property.propertyLatitude === null} // 매물 정보, 매물 주소 등록 안한경우 생성 못함
              text="완료"
            />
          </>
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
      </div>
    </div>
  );
}

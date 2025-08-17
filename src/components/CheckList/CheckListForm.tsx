import FixedBar from '../FixedBar';
import ChecklistContent from './CheckListContent';
import {
  getChecklistTemplate,
  getPropertyChecklistById,
  updateChecklist,
} from '@/lib/api/checklist';
import { updateProperty, postProperty } from '@/lib/api/property';
import { usePropertyStore } from '@/store/usePropertyStore';
import { ChecklistPayloadItem, ChecklistTemplate, CheckType } from '@/types/checklist';
import checklistFormatter from '@/utils/checklistFormatter';
import { useQueryClient } from '@tanstack/react-query';
import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import CheckListTemplate from './CheckListTemplate';
import { getTemplateById, postTemplate } from '@/lib/api/template';
import { toast } from '@/hooks/use-toast';
import { InputModal } from '../Modal/InputModal';

interface Props {
  isEdit?: boolean;
  id?: string;
  setStep: Dispatch<SetStateAction<number>>;
}

export default function CheckListForm({ setStep, isEdit, id }: Props) {
  const [selectedTemplate, setSelectedTemplate] = useState<string | undefined>(undefined); // 선택한 템플릿 id
  const [isDefaultTemplate, setIsDefaultTemplate] = useState(false); // 기본 템플릿 사용 여부
  const [showNewTemplateModal, setShowNewTemplateModal] = useState(false);
  const [checklist, setChecklist] = useState<ChecklistPayloadItem[]>([]);
  const { property, images, resetAll } = usePropertyStore();
  const queryClient = useQueryClient();

  useEffect(() => {
    const fetchTemplate = async () => {
      if (isDefaultTemplate) {
        // 기본 템플릿 사용하는 경우
        const result = await getChecklistTemplate();
        const transformed = checklistFormatter(result.checklists);
        setChecklist(transformed);
      } else {
        // 선택한 템플릿이 있는 경우
        if (!selectedTemplate) return;
        const result = await getTemplateById(selectedTemplate);
        const transformed = checklistFormatter(result.checklists);
        setChecklist(transformed);
      }
    };
    const fetchData = async () => {
      if (!id) return;
      const result = await getPropertyChecklistById(id);
      setChecklist(result);
    };
    if (isEdit) {
      // 편집 모드 일때, 해당 매물 정보 저장 및 체크리스트 저장
      fetchData();
    } else {
      // 신규 모드일때는 템플릿 변환
      fetchTemplate();
    }
  }, [isEdit, id, selectedTemplate, isDefaultTemplate]);

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

  const handleSaveTemplate = () => {
    setShowNewTemplateModal(true);
  };

  const handleComplete = async () => {
    const formData = new FormData();
    formData.append(
      'request',
      new Blob([JSON.stringify({ property, checklists: checklist })], { type: 'application/json' }),
    );
    images.forEach((img) => formData.append('images', img));
    try {
      if (isEdit) {
        await updateProperty(property, id as string);
        await updateChecklist(id as string, checklist);
        queryClient.invalidateQueries({ queryKey: ['propertyDetail', id] });
        queryClient.invalidateQueries({ queryKey: ['checklist', id] });
      } else {
        await postProperty(formData);
      }

      resetAll();
      setStep((prev) => prev + 1);
    } catch {
      toast({ title: '등록에 실패했습니다', variant: 'fail' });
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
      setShowNewTemplateModal(false);
      toast({ title: '새 템플릿 생성 완료', variant: 'success' });
    } catch (error) {
      toast({ title: '템플릿 저장 실패', variant: 'fail' });
      console.error(error);
    }
  };

  const isTemplateSelected = selectedTemplate || isDefaultTemplate;

  if (!isEdit && !isTemplateSelected) {
    return (
      <CheckListTemplate
        setTemplate={setSelectedTemplate}
        setIsDefaultTemplate={setIsDefaultTemplate}
      />
    );
  }

  return (
    <>
      <ChecklistContent
        checklist={checklist}
        setter={setChecklist}
        onAddChecklist={handleAddChecklist}
        onSaveTemplate={handleSaveTemplate}
      />
      <FixedBar
        onClick={handleComplete}
        preventSkip={true}
        disabled={property.monthlyFee === null && property.propertyLatitude === null} // 매물 정보, 매물 주소 등록 안한경우 생성 못함
        text="완료"
      />
      <InputModal
        open={showNewTemplateModal}
        openChange={setShowNewTemplateModal}
        title={isEdit ? '템플릿 저장' : '새 템플릿 생성'}
        defaultValue="우리집 체크리스트"
        handleClick={(value) => handleNewTemplateSave(value)}
        trigger={<></>}
        maxLength={20}
      />
    </>
  );
}

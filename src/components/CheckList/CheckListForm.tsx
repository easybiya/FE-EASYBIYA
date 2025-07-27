import FixedBar from '../FixedBar';
import ChecklistContent from './CheckListContent';
import {
  getChecklistTemplate,
  getPropertyChecklistById,
  updateChecklist,
} from '@/lib/api/checklist';
import { updateProperty, postProperty } from '@/lib/api/property';
import { useToastStore } from '@/store/toastStore';
import { usePropertyStore } from '@/store/usePropertyStore';
import { ChecklistPayloadItem, CheckType } from '@/types/checklist';
import checklistFormatter from '@/utils/checklistFormatter';
import { useQueryClient } from '@tanstack/react-query';
import { useState, useEffect, Dispatch, SetStateAction } from 'react';

interface Props {
  isEdit?: boolean;
  id?: string;
  setStep: Dispatch<SetStateAction<number>>;
}

export default function CheckListForm({ setStep, isEdit, id }: Props) {
  const [checklist, setChecklist] = useState<ChecklistPayloadItem[]>([]);
  const { property, images, resetAll } = usePropertyStore();
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
  }, [isEdit, id]);

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
    console.log('저장 아직 안됨');
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
      // setShowTemplateSelectModal(true);
    } catch {
      useToastStore.getState().showToast('등록에 실패했습니다', 'error');
    }
  };

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
    </>
  );
}

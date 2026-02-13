import FixedBar from '../FixedBar';
import ChecklistContent from './CheckListContent';
import { getPropertyChecklistById } from '@/lib/api/checklist';
import { usePropertyStore } from '@/store/usePropertyStore';
import { ChecklistPayloadItem, CheckType } from '@/types/checklist';
import checklistFormatter from '@/utils/checklistFormatter';
import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import CheckListTemplate from './CheckListTemplate';
// import { postTemplate } from '@/lib/api/template';
import { toast } from '@/hooks/use-toast';
// import { InputModal } from '../Modal/InputModal';
import Spinner from '../Spinner';
import { CHECKLIST_TEMPLATE, INVESTMENT_CHECKLIST_TEMPLATE } from '@/constants/checklistTemplate';
import useCreateProperty from '@/hooks/property/useCreateProperty';
import useUpdateProperty from '@/hooks/property/useUpdateProperty';
import { PropertyPurpose } from '@/types';

interface Props {
  isEdit?: boolean;
  id?: string;
  setStep: Dispatch<SetStateAction<number>>;
}

export default function CheckListForm({ setStep, isEdit, id }: Props) {
  const [defaultTemplateType, setDefaultTemplateType] = useState<PropertyPurpose>();
  // const [showNewTemplateModal, setShowNewTemplateModal] = useState(false);
  const [checklist, setChecklist] = useState<ChecklistPayloadItem[]>([]);
  const { property } = usePropertyStore();
  const { mutate, isPending } = useCreateProperty();
  const { mutate: updateProperty, isPending: isUpdatePending } = useUpdateProperty(id as string);

  useEffect(() => {
    const fetchTemplate = async () => {
      if (!defaultTemplateType) return;
      if (defaultTemplateType === PropertyPurpose.FIND_HOME) {
        const defaultTemplate = CHECKLIST_TEMPLATE;
        const transformed = checklistFormatter(defaultTemplate.checklists);
        setChecklist(transformed);
      } else if (defaultTemplateType === PropertyPurpose.FIELD_SURVEY) {
        const defaultTemplate = INVESTMENT_CHECKLIST_TEMPLATE;
        const transformed = checklistFormatter(defaultTemplate.checklists);
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
    }
    if (!isEdit && defaultTemplateType) {
      fetchTemplate();
    }
  }, [isEdit, id, defaultTemplateType]);

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

  // const handleSaveTemplate = () => {
  //   setShowNewTemplateModal(true);
  // };

  const handleComplete = () => {
    try {
      if (isEdit) {
        updateProperty(checklist, {
          onSuccess: () => {
            setStep((prev) => prev + 1);
          },
        });
      } else {
        mutate(checklist, {
          onSuccess: () => {
            setStep((prev) => prev + 1);
          },
        });
      }
    } catch {
      toast({ title: '등록에 실패했습니다', variant: 'fail' });
    }
  };

  // const handleNewTemplateSave = async (name: string) => {
  //   const template: ChecklistTemplate = {
  //     name,
  //     checklists: checklist.map(({ title, checkType, content, checkItems }) => ({
  //       title,
  //       checkType,
  //       content,
  //       checkItems: checkItems.map((i) => i.description),
  //     })),
  //   };

  //   try {
  //     await postTemplate(template);
  //     setShowNewTemplateModal(false);
  //     toast({ title: '새 템플릿 생성 완료', variant: 'success' });
  //   } catch (error) {
  //     toast({ title: '템플릿 저장 실패', variant: 'fail' });
  //     console.error(error);
  //   }
  // };

  if (!isEdit && checklist.length === 0) {
    return <CheckListTemplate setDefaultTemplateType={setDefaultTemplateType} />;
  }

  return (
    <>
      {(isPending || isUpdatePending) && <Spinner />}
      <ChecklistContent
        checklist={checklist}
        setter={setChecklist}
        onAddChecklist={handleAddChecklist}
        // onSaveTemplate={handleSaveTemplate}
      />
      <FixedBar
        onClick={handleComplete}
        preventSkip={true}
        disabled={property.monthly_fee === null && property.lat === null} // 매물 정보, 매물 주소 등록 안한경우 생성 못함
        text="완료"
      />
      {/* <InputModal
        open={showNewTemplateModal}
        openChange={setShowNewTemplateModal}
        title={isEdit ? '템플릿 저장' : '새 템플릿 생성'}
        defaultValue="우리집 체크리스트"
        handleClick={(value) => handleNewTemplateSave(value)}
        trigger={<></>}
        maxLength={20}
      /> */}
    </>
  );
}

import ChecklistContent from '@/components/CheckList/CheckListContent';
import Header from '@/components/Layout/Header';
import { useDefaultTemplate } from '@/hooks/checklist/useDefaultTemplate';
import { ChecklistPayloadItem, CheckType } from '@/types/checklist';
import checklistFormatter from '@/utils/checklistFormatter';
import { useEffect, useState } from 'react';

export default function DefaultTemplate() {
  const defaultTemplate = useDefaultTemplate();
  const [checklist, setChecklist] = useState<ChecklistPayloadItem[]>([]);
  const [showTemplateSelectModal, setShowTemplateSelectModal] = useState(false);

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

  useEffect(() => {
    const transformedTemplate = checklistFormatter(defaultTemplate?.checklists ?? []);
    setChecklist(transformedTemplate);
  }, [defaultTemplate]);

  return (
    <div>
      <Header title={defaultTemplate?.name ?? ''} type={4} />
      <ChecklistContent
        checklist={checklist}
        setter={setChecklist}
        onAddChecklist={handleAddChecklist}
        onSaveTemplate={handleSaveTemplate}
        isTemplate
      />
    </div>
  );
}

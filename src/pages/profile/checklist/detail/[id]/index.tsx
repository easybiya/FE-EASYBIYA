import ChecklistContent from '@/components/CheckList/CheckListContent';
import Header from '@/components/Layout/Header';
import { useTemplateById } from '@/hooks/checklist/useTemplateById';
import { editTemplate } from '@/lib/api/template';
import { useToastStore } from '@/store/toastStore';
import { ChecklistPayloadItem, ChecklistTemplate, CheckType } from '@/types/checklist';
import checklistFormatter from '@/utils/checklistFormatter';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function ChecklistDetail() {
  const router = useRouter();
  const { id } = router.query;
  const templateId = typeof id === 'string' ? id : undefined;
  if (!templateId) return null;

  const template = useTemplateById(templateId ?? '');

  const [checklist, setChecklist] = useState<ChecklistPayloadItem[]>([]);
  const { showToast } = useToastStore();

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

  const handleUpdateTemplate = () => {
    const template: ChecklistTemplate = {
      name: 'text',
      checklists: checklist.map(({ title, checkType, content, checkItems }) => ({
        title,
        checkType,
        content,
        checkItems: checkItems.map((i) => i.description),
      })),
    };
    editTemplate(templateId, template);
    showToast('템플릿이 업데이트 되었습니다.', 'success');
  };

  useEffect(() => {
    const transformedTemplate = checklistFormatter(template?.checklists ?? []);
    setChecklist(transformedTemplate);
  }, [template]);

  return (
    <div>
      <Header title={template?.name ?? ''} type={4} />
      <ChecklistContent
        checklist={checklist}
        setter={setChecklist}
        onAddChecklist={handleAddChecklist}
        onSaveTemplate={handleUpdateTemplate}
      />
    </div>
  );
}

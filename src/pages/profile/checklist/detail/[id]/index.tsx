import ChecklistContent from '@/components/CheckList/CheckListContent';
import Header from '@/components/Layout/Header';
import ChecklistModal from '@/components/Modal/ChecklistModal';
import { useTemplateById } from '@/hooks/checklist/useTemplateById';
import { editTemplate, postTemplate } from '@/lib/api/template';
import { useToastStore } from '@/store/toastStore';
import { ChecklistPayloadItem, ChecklistTemplate, CheckType } from '@/types/checklist';
import checklistFormatter from '@/utils/checklistFormatter';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function ChecklistDetail() {
  const router = useRouter();
  const { id } = router.query;
  const templateId = typeof id === 'string' ? id : undefined;
  const { mode } = router.query;
  const templateMode = typeof mode === 'string' ? mode : undefined;
  const isNewTemplate = templateMode === 'new';
  const [showNewTemplateModal, setShowNewTemplateModal] = useState(false);

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
    const tranferTemplate: ChecklistTemplate = {
      name: template.name ?? '',
      checklists: checklist.map(({ title, checkType, content, checkItems }) => ({
        title,
        checkType,
        content,
        checkItems: checkItems.map((i) => i.description),
      })),
    };
    editTemplate(templateId, tranferTemplate);
    showToast('템플릿이 업데이트 되었습니다.', 'success');
  };

  const handleSaveTemplate = () => setShowNewTemplateModal(true);

  const createNewTemplate = (title: string) => {
    const template: ChecklistTemplate = {
      name: title,
      checklists: checklist.map(({ title, checkType, content, checkItems }) => ({
        title,
        checkType,
        content,
        checkItems: checkItems.map((i) => i.description),
      })),
    };
    postTemplate(template);
    showToast('템플릿이 생성 되었습니다.', 'success');
    router.push('/profile/checklist');
  };

  useEffect(() => {
    const transformedTemplate = checklistFormatter(template?.checklists ?? []);
    setChecklist(transformedTemplate);
  }, [template]);

  return (
    <div>
      <Header
        title={
          isNewTemplate
            ? `새로운 체크리스트 ${new Date().toISOString().slice(0, 10)}`
            : template?.name ?? ''
        }
        type={4}
      />
      <ChecklistContent
        checklist={checklist}
        setter={setChecklist}
        onAddChecklist={handleAddChecklist}
        onSaveTemplate={isNewTemplate ? handleSaveTemplate : handleUpdateTemplate}
      />
      {showNewTemplateModal && (
        <ChecklistModal
          mode="edit"
          title="새 템플릿 생성"
          defaultValue={`나의 체크리스트 ${new Date().toISOString().slice(0, 10)}`}
          confirmText="저장"
          onClose={() => setShowNewTemplateModal(false)}
          onConfirm={(value) => createNewTemplate(value as string)}
        />
      )}
    </div>
  );
}

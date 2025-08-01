import IconComponent from '@/components/Asset/Icon';
import ChecklistContent from '@/components/CheckList/CheckListContent';
import Header from '@/components/Layout/Header';
import ChecklistModal from '@/components/Modal/ChecklistModal';
import { postTemplate } from '@/lib/api/template';
import { useModalStore } from '@/store/modalStore';
import { useToastStore } from '@/store/toastStore';
import { ChecklistPayloadItem, ChecklistTemplate, CheckType } from '@/types/checklist';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function CreateTemplate() {
  const router = useRouter();
  const { openModal, closeModal } = useModalStore();
  const [title, setTitle] = useState(`나의 체크리스트 ${new Date().toISOString().slice(0, 10)}`);

  const [checklist, setChecklist] = useState<ChecklistPayloadItem[]>([]);
  const [showNewTemplateModal, setShowNewTemplateModal] = useState(false);
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
      showToast('새 템플릿 생성 완료', 'success');
      router.push('/profile/checklist');
    } catch (error) {
      showToast('템플릿 저장 실패', 'error');
      console.error(error);
    }
  };

  const handleSaveTemplate = () => setShowNewTemplateModal(true);

  useEffect(() => {
    openModal('input', {
      title: '새 템플릿 생성',
      onConfirm: async (value) => {
        if (!value) return;
        setTitle(value);
        closeModal();
      },
    });
  }, []);

  return (
    <div>
      <Header
        left={
          <div className="flex items-center gap-8">
            <IconComponent
              name="arrowLeft"
              width={24}
              height={24}
              onClick={() => router.back()}
              className="cursor-pointer"
            />
            <h1 className="text-b-20">{title}</h1>
          </div>
        }
      />
      <ChecklistContent
        checklist={checklist}
        setter={setChecklist}
        onAddChecklist={handleAddChecklist}
        onSaveTemplate={handleSaveTemplate}
      />
      {showNewTemplateModal && (
        <ChecklistModal
          mode="edit"
          title="새 템플릿 생성"
          defaultValue={title}
          confirmText="저장"
          onClose={() => setShowNewTemplateModal(false)}
          onConfirm={(value) => handleNewTemplateSave(value as string)}
        />
      )}
    </div>
  );
}

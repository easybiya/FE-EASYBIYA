import IconComponent from '@/components/Asset/Icon';
import ChecklistContent from '@/components/CheckList/CheckListContent';
import Header from '@/components/Layout/Header';
import ChecklistModal from '@/components/Modal/ChecklistModal';
import { InputModal } from '@/components/Modal/InputModal';
import { toast } from '@/hooks/use-toast';
import { postTemplate } from '@/lib/api/template';
import { ChecklistPayloadItem, ChecklistTemplate, CheckType } from '@/types/checklist';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function CreateTemplate() {
  const router = useRouter();
  const [modalOpen, setIsModalOpen] = useState(true);
  const [title, setTitle] = useState(`나의 체크리스트 ${new Date().toISOString().slice(0, 10)}`);

  const [checklist, setChecklist] = useState<ChecklistPayloadItem[]>([]);
  const [showNewTemplateModal, setShowNewTemplateModal] = useState(false);

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
      toast({ title: '새 템플릿 생성 완료', variant: 'success' });
      router.push('/profile/checklist');
    } catch (error) {
      toast({ title: '템플릿 저장 실패', variant: 'fail' });
      console.error(error);
    }
  };

  const handleSaveTemplate = () => setShowNewTemplateModal(true);

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
      <div className="px-20">
        <ChecklistContent
          checklist={checklist}
          setter={setChecklist}
          onAddChecklist={handleAddChecklist}
          onSaveTemplate={handleSaveTemplate}
        />
      </div>
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
      <InputModal
        title="새 템플릿 생성"
        open={modalOpen}
        openChange={setIsModalOpen}
        trigger={<></>}
        handleClick={(v) => setTitle(v)}
      />
    </div>
  );
}

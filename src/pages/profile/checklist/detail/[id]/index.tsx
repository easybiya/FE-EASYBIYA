import IconComponent from '@/components/Asset/Icon';
import ChecklistContent from '@/components/CheckList/CheckListContent';
import Dropdown from '@/components/Dropdown';
import Header from '@/components/Layout/Header';
import ChecklistModal from '@/components/Modal/ChecklistModal';
import { Skeleton } from '@/components/ui/skeleton';
import { useTemplateById } from '@/hooks/checklist/useTemplateById';
import { deleteTemplate, editTemplate, postTemplate } from '@/lib/api/template';
import { useModalStore } from '@/store/modalStore';
import { useToastStore } from '@/store/toastStore';
import { ChecklistPayloadItem, ChecklistTemplate, CheckType } from '@/types/checklist';
import checklistFormatter from '@/utils/checklistFormatter';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const TEMPLATE_DETAIL_OPTION = [
  { label: '복제', value: 'copy' },
  { label: '삭제', value: 'delete' },
];

export default function ChecklistDetail() {
  const router = useRouter();
  const templateId = router.query.id as string;
  const { mode } = router.query;
  const templateMode = typeof mode === 'string' ? mode : undefined;
  const isNewTemplate = templateMode === 'new';
  const [checklist, setChecklist] = useState<ChecklistPayloadItem[]>([]);
  const [showNewTemplateModal, setShowNewTemplateModal] = useState(false);
  const queryClient = useQueryClient();

  const { data: template, isLoading } = useTemplateById(templateId ?? '');

  const { showToast } = useToastStore();
  const { openModal, closeModal } = useModalStore();

  const templateHandleSelect = (option: string, id: number) => {
    switch (option) {
      case 'copy':
        router.push(`/profile/checklist/detail/${id}?mode=new`);
        break;
      case 'delete':
        openModal('confirm', {
          title: '템플릿 삭제',
          description: '이 템플릿을 정말 삭제하시겠습니까?',
          onConfirm: async () => {
            await deleteTemplate(id);
            queryClient.invalidateQueries({ queryKey: ['templateList'] });
            closeModal();
          },
        });
        break;
      default:
        console.log('알 수 없는 옵션');
    }
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
      {isLoading ? (
        <div className="px-16">
          <div className="py-8 mb-16">
            <Skeleton className="h-28 w-256" />
          </div>
          <div className="flex flex-col gap-16">
            <Skeleton className="h-96 w-full" />
            <Skeleton className="h-96 w-full" />
            <Skeleton className="h-96 w-full" />
            <Skeleton className="h-96 w-full" />
            <Skeleton className="h-96 w-full" />
            <Skeleton className="h-96 w-full" />
          </div>
        </div>
      ) : (
        <>
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
                <h1 className="text-b-20">
                  {isNewTemplate
                    ? `새로운 체크리스트 ${new Date().toISOString().slice(0, 10)}`
                    : template?.name ?? ''}
                </h1>
              </div>
            }
            right={
              !isNewTemplate && (
                <Dropdown
                  options={TEMPLATE_DETAIL_OPTION}
                  type="meatball"
                  onSelect={(option) => templateHandleSelect(option, template.templateId)}
                />
              )
            }
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
        </>
      )}
    </div>
  );
}

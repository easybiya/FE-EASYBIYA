import ChecklistContent from '@/components/CheckList/CheckListContent';
import DialogDropdownLayout from '@/components/Dropdown/DialogDropdown';
import PreventDropdownMenuItem from '@/components/Dropdown/PreventDropdownMenuItem';
import Header from '@/components/Layout/Header';
import { ConfirmModal } from '@/components/Modal/ConfirmModal';
import { Skeleton } from '@/components/ui/skeleton';
import { useTemplateById } from '@/hooks/checklist/useTemplateById';
import { toast } from '@/hooks/use-toast';
import { deleteTemplate, editTemplate, postTemplate } from '@/lib/api/template';
import { ChecklistPayloadItem, ChecklistTemplate, CheckType } from '@/types/checklist';
import checklistFormatter from '@/utils/checklistFormatter';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import DropdownIcon from '@/public/icons/meatball.svg?react';
import { InputModal } from '@/components/Modal/InputModal';
import ArrowLeftIcon from '@/public/icons/arrow-left.svg?react';

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

  const handleUpdateTemplate = (title: string) => {
    const tranferTemplate: ChecklistTemplate = {
      name: title,
      checklists: checklist.map(({ title, checkType, content, checkItems }) => ({
        title,
        checkType,
        content,
        checkItems: checkItems.map((i) => i.description),
      })),
    };
    editTemplate(templateId, tranferTemplate);
    queryClient.invalidateQueries({ queryKey: ['template', templateId] });
    toast({ title: '템플릿이 업데이트 되었습니다.', variant: 'success' });
  };

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
    toast({ title: '템플릿이 생성 되었습니다.', variant: 'success' });
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
                <ArrowLeftIcon
                  name="arrowLeft"
                  width={24}
                  height={24}
                  onClick={() => router.back()}
                  className="cursor-pointer"
                />
                <h1 className="text-b-20">
                  {isNewTemplate ? `${template?.name} 복제본` : (template?.name ?? '')}
                </h1>
              </div>
            }
            right={
              !isNewTemplate && (
                <DialogDropdownLayout
                  trigger={
                    <button
                      type="button"
                      className="flex items-center justify-center"
                      onSelect={(e) => e.preventDefault()}
                    >
                      <DropdownIcon
                        width={24}
                        height={24}
                        className="cursor-pointer fill-gray-800 stroke-gray-800"
                      />
                    </button>
                  }
                >
                  <PreventDropdownMenuItem
                    onSelect={() => router.push(`/profile/checklist/detail/${templateId}?mode=new`)}
                  >
                    복제
                  </PreventDropdownMenuItem>
                  <ConfirmModal
                    title="템플릿 삭제"
                    description="이 템플릿을 정말 삭제하시겠습니까?"
                    handleSubmit={async () => {
                      await deleteTemplate(Number(templateId));
                      queryClient.invalidateQueries({ queryKey: ['templateList'] });
                    }}
                    trigger={
                      <PreventDropdownMenuItem
                        className="!text-red-500"
                        onClick={(e) => e.stopPropagation()}
                      >
                        삭제
                      </PreventDropdownMenuItem>
                    }
                    buttonStyle="bg-red-500 hover:bg-red-400 active:bg-red-300"
                  />
                </DialogDropdownLayout>
              )
            }
          />
          <div className="px-20">
            <ChecklistContent
              checklist={checklist}
              setter={setChecklist}
              onAddChecklist={handleAddChecklist}
              onSaveTemplate={() => setShowNewTemplateModal(true)}
            />
          </div>
          <InputModal
            open={showNewTemplateModal}
            openChange={setShowNewTemplateModal}
            title={isNewTemplate ? '새 템플릿 생성' : '템플릿 수정'}
            defaultValue={isNewTemplate ? `${template?.name} 복제본` : template?.name}
            handleClick={(v) => (isNewTemplate ? createNewTemplate(v) : handleUpdateTemplate(v))}
            trigger={<></>}
          />
        </>
      )}
    </div>
  );
}

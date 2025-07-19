import { useRouter } from 'next/router';
import { useModalStore } from '@/store/modalStore';
import Header from '@/components/Layout/Header';
import Dropdown from '@/components/Dropdown';
import Link from 'next/link';
import { useDispatch } from '@/hooks/checklist/useDispatch';
import { useTemplates } from '@/hooks/checklist/useTemplates';
import { deleteTemplate } from '@/lib/api/template';
import { useQueryClient } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import IconComponent from '@/components/Asset/Icon';

export default function Page() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { openModal, closeModal } = useModalStore();
  const { params } = useDispatch();
  const { data, isLoading } = useTemplates(params);
  const templateList = data?.pages.flatMap((page) => page);

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

  return (
    <div className="pb-64">
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
            <h1 className="text-b-20">체크리스트 관리</h1>
          </div>
        }
        right={
          <Link href="/profile/checklist/create">
            <IconComponent name="plus" width={24} height={24} className="cursor-pointer" />
          </Link>
        }
      />
      <div className="py-24 px-20 grid grid-cols-2 gap-12">
        <Link href={`/profile/checklist/default`}>
          <div className="relative p-16 aspect-square col-span-1 bg-white rounded-lg flex items-start justify-between cursor-pointer hover:shadow-md transition">
            <p className="text-[16px] font-bold">기본 템플릿</p>
            <div className="absolute top-6 right-6">
              <Dropdown
                type="meatball"
                options={[{ label: '복제', value: 'copy' }]}
                onSelect={() => router.push('/profile/checklist/default?mode=new')}
              />
            </div>
          </div>
        </Link>
        {isLoading
          ? Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} className="aspect-square" />
            ))
          : templateList?.map((template) => (
              <Link
                href={`/profile/checklist/detail/${template.templateId}`}
                key={template.templateId}
              >
                <div
                  key={template.templateId}
                  className="relative p-16 aspect-square col-span-1 bg-white rounded-lg flex items-start justify-between cursor-pointer hover:shadow-md transition"
                >
                  <p className="text-16 font-bold">{template.name}</p>
                  <div className="absolute top-6 right-6">
                    <Dropdown
                      type="meatball"
                      options={[
                        { label: '복제', value: 'copy' },
                        { label: '삭제', value: 'delete' },
                      ]}
                      onSelect={(option) => templateHandleSelect(option, template.templateId)}
                    />
                  </div>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
}

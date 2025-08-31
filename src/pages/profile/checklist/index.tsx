import { useRouter } from 'next/router';
import Header from '@/components/Layout/Header';
import Link from 'next/link';
import { useDispatch } from '@/hooks/checklist/useDispatch';
import { useTemplates } from '@/hooks/checklist/useTemplates';
import { deleteTemplate } from '@/lib/api/template';
import { useQueryClient } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import DialogDropdownLayout from '@/components/Dropdown/DialogDropdown';
import PreventDropdownMenuItem from '@/components/Dropdown/PreventDropdownMenuItem';
import { ConfirmModal } from '@/components/Modal/ConfirmModal';
import DropdownIcon from '@/public/icons/meatball.svg?react';
import ArrowLeftIcon from '@/public/icons/arrow-left.svg?react';
import PlusIcon from '@/public/icons/plus.svg?react';

export default function Page() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { params } = useDispatch();
  const { data, isLoading } = useTemplates(params);
  const templateList = data?.pages.flatMap((page) => page);

  return (
    <div className="pb-64">
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
            <h1 className="text-b-20">체크리스트 관리</h1>
          </div>
        }
        right={
          <Link href="/profile/checklist/create">
            <PlusIcon name="plus" width={24} height={24} className="cursor-pointer" />
          </Link>
        }
      />
      <div className="py-24 px-20 grid grid-cols-2 gap-12">
        <div className="relative">
          <Link href={`/profile/checklist/default`}>
            <div className="p-16 aspect-square col-span-1 bg-white rounded-lg flex items-start justify-between cursor-pointer hover:shadow-md transition">
              <p className="text-[16px] font-bold">기본 템플릿</p>
            </div>
          </Link>
          <div className="absolute top-6 right-6">
            <DialogDropdownLayout
              trigger={
                <button
                  type="button"
                  className="flex items-center justify-center"
                  onSelect={(e) => e.stopPropagation()}
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
                onSelect={() => router.push('/profile/checklist/default?mode=new')}
              >
                복제
              </PreventDropdownMenuItem>
            </DialogDropdownLayout>
          </div>
        </div>
        {isLoading
          ? Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} className="aspect-square" />
            ))
          : templateList?.map((template) => (
              <div className="relative" key={template.templateId}>
                <div className="absolute top-6 right-6 z-10">
                  <DialogDropdownLayout
                    trigger={
                      <button
                        type="button"
                        className="flex items-center justify-center"
                        onSelect={(e) => e.stopPropagation()}
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
                      onSelect={() =>
                        router.push(`/profile/checklist/detail/${template.templateId}?mode=new`)
                      }
                    >
                      복제
                    </PreventDropdownMenuItem>
                    <ConfirmModal
                      title="템플릿 삭제"
                      description="이 템플릿을 정말 삭제하시겠습니까?"
                      handleSubmit={async () => {
                        await deleteTemplate(template.templateId);
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
                </div>
                <Link href={`/profile/checklist/detail/${template.templateId}`}>
                  <div
                    key={template.templateId}
                    className="relative p-16 aspect-square col-span-1 bg-white rounded-lg flex items-start justify-between cursor-pointer hover:shadow-md transition"
                  >
                    <p className="text-16 font-bold">{template.name}</p>
                  </div>
                </Link>
              </div>
            ))}
      </div>
    </div>
  );
}

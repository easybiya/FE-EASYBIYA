import { useRouter } from 'next/router';
import { useModalStore } from '@/store/modalStore';
import Header from '@/components/Layout/Header';
import Dropdown from '@/components/Dropdown';
import Link from 'next/link';
import { useDispatch } from '@/hooks/checklist/useDispatch';
import { useTemplates } from '@/hooks/checklist/useTemplates';

export default function Page() {
  const router = useRouter();
  const { openModal } = useModalStore();
  const { params } = useDispatch();
  const { data, fetchNextPage } = useTemplates(params);
  const templateList = data?.pages.flatMap((page) => page);

  const createTemplate = () => {
    openModal('input', { title: '새 템플릿 생성' });
  };

  return (
    <div>
      <Header title="체크리스트 관리" type={6} action={createTemplate} />
      <div className="py-6 px-5 grid grid-cols-2 gap-3">
        <Link href={`/profile/checklist/default`}>
          <div className="relative p-4 aspect-square col-span-1 bg-white rounded-lg flex items-start justify-between cursor-pointer hover:shadow-md transition">
            <p className="text-[16px] font-bold">기본 템플릿</p>
            <div className="absolute top-1.5 right-1.5">
              <Dropdown
                type="meatball"
                options={['복제']}
                onSelect={() => router.push('/profile/checklist/default?mode=new')}
              />
            </div>
          </div>
        </Link>
        {templateList?.map((template) => (
          <Link href={`/profile/checklist/detail/${template.templateId}`} key={template.templateId}>
            <div
              key={template.templateId}
              className="relative p-4 aspect-square col-span-1 bg-white rounded-lg flex items-start justify-between cursor-pointer hover:shadow-md transition"
            >
              <p className="text-[16px] font-bold">{template.name}</p>
              <div className="absolute top-1.5 right-1.5">
                <Dropdown
                  type="meatball"
                  options={['복제', '삭제']}
                  onSelect={() =>
                    router.push(`/profile/checklist/detail/${template.templateId}?mode=new`)
                  }
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

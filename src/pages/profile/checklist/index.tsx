import { useTemplateStore } from '@/store/templateStore';
import Header from '@/components/Layout/Header';
import Dropdown from '@/components/Dropdown';
import { useModalStore } from '@/store/modalStore';
import { ChecklistTemplate } from '@/types/checklist';
import { useRouter } from 'next/router';

export default function Page() {
  const { openModal } = useModalStore();
  const { templates, setSelectedTemplate } = useTemplateStore();
  const router = useRouter();

  const createTemplate = () => {
    openModal('input', { title: '새 템플릿 생성' });
  };

  // 확인용 목 데이터 서버 연결하면 삭제
  const defaultTemplates: ChecklistTemplate[] = [
    {
      name: '기본 체크리스트',
      checklists: [
        {
          title: '방 구조',
          checkType: 'RADIO',
          checkItems: ['원룸', '투룸'],
        },
      ],
    },
  ];

  const allTemplates = [...defaultTemplates, ...templates];

  const handleTemplateSelect = (template: ChecklistTemplate) => {
    setSelectedTemplate(template);
    const returnTo = (router.query.returnTo as string) || '/create/checklist';
    router.push({ pathname: returnTo, query: { saved: 'true' } });
  };

  return (
    <div>
      <Header title="체크리스트 관리" type={6} addAction={createTemplate} />
      <div className="py-6 px-5 grid grid-cols-2 gap-3">
        {allTemplates.map((template, idx) => (
          <div
            key={idx}
            onClick={() => handleTemplateSelect(template)}
            className="relative p-4 aspect-square col-span-1 bg-white rounded-lg flex items-start justify-between cursor-pointer hover:shadow-md transition"
          >
            <p className="text-[16px] font-bold">{template.name}</p>
            <div className="absolute top-1.5 right-1.5">
              <Dropdown type="meatball" options={['복제']} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

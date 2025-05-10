import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useModalStore } from '@/store/modalStore';
import { useTemplateStore } from '@/store/templateStore';
import Header from '@/components/Layout/Header';
import Dropdown from '@/components/Dropdown';
import { TemplatePreview } from '@/types/checklist';
import { fetchTemplates, getTemplateById } from '@/lib/api/template';

export default function Page() {
  const router = useRouter();
  const { openModal } = useModalStore();
  const { setSelectedTemplate } = useTemplateStore();

  const [templates, setTemplates] = useState<TemplatePreview[]>([]);
  const [page] = useState(1); // 향후 무한 스크롤을 위한 상태값
  const defaultTemplates: TemplatePreview[] = [{ templateId: 0, name: '기본 체크리스트' }];

  const allTemplates = [...defaultTemplates, ...templates];

  const createTemplate = () => {
    openModal('input', { title: '새 템플릿 생성' });
  };

  const handleTemplateSelect = async (template: TemplatePreview) => {
    try {
      const detailedTemplate = await getTemplateById(template.templateId);

      setSelectedTemplate({
        name: detailedTemplate.name,
        checklists: detailedTemplate.checklists,
      });

      const returnTo = (router.query.returnTo as string) || '/property/checklist';
      router.push({ pathname: returnTo, query: { saved: 'true' } });
    } catch (err) {
      console.error('템플릿 상세 조회 실패:', err);
    }
  };

  useEffect(() => {
    const loadTemplates = async () => {
      try {
        const result = await fetchTemplates(page);
        setTemplates(result);
      } catch (err) {
        console.error('템플릿 로딩 실패:', err);
      }
    };

    loadTemplates();
  }, [page]);

  return (
    <div>
      <Header title="체크리스트 관리" type={6} addAction={createTemplate} />
      <div className="py-6 px-5 grid grid-cols-2 gap-3">
        {allTemplates.map((template) => (
          <div
            key={template.templateId}
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

import { useDispatch } from '@/hooks/checklist/useDispatch';
import { Skeleton } from '../ui/skeleton';
import { useTemplates } from '@/hooks/checklist/useTemplates';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  setTemplate: Dispatch<SetStateAction<string | undefined>>;
  setIsDefaultTemplate: Dispatch<SetStateAction<boolean>>;
}

export default function CheckListTemplate({ setTemplate, setIsDefaultTemplate }: Props) {
  const { params } = useDispatch();
  const { data, isLoading } = useTemplates(params);
  const templateList = data?.pages.flatMap((page) => page);

  const handleSelect = (id: number) => {
    console.log(id);
    setTemplate(String(id));
  };

  return (
    <div className="py-24 grid grid-cols-2 gap-12">
      <div
        onClick={() => setIsDefaultTemplate(true)}
        className="relative p-16 aspect-square col-span-1 bg-white rounded-lg flex items-start justify-between cursor-pointer hover:shadow-md transition"
      >
        <p className="text-[16px] font-bold">기본 템플릿</p>
      </div>
      {isLoading
        ? Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="aspect-square" />
          ))
        : templateList?.map((template) => (
            <div
              key={template.templateId}
              onClick={() => handleSelect(template.templateId)}
              className="relative p-16 aspect-square col-span-1 bg-white rounded-lg flex items-start justify-between cursor-pointer hover:shadow-md transition"
            >
              <p className="text-16 font-bold">{template.name}</p>
            </div>
          ))}
    </div>
  );
}

import { Dispatch } from 'react';
import { PropertyPurpose } from '@/types';

interface Props {
  setDefaultTemplateType: Dispatch<PropertyPurpose>;
}

export default function CheckListTemplate({ setDefaultTemplateType }: Props) {
  return (
    <div className="py-24 grid grid-cols-2 gap-12">
      <div
        onClick={() => setDefaultTemplateType(PropertyPurpose.FIND_HOME)}
        className="relative p-16 aspect-square col-span-1 bg-white rounded-lg flex items-start justify-between cursor-pointer hover:shadow-md transition"
      >
        <p className="text-[16px] font-bold">집구하기 템플릿</p>
      </div>
      <div
        onClick={() => setDefaultTemplateType(PropertyPurpose.FIELD_SURVEY)}
        className="relative p-16 aspect-square col-span-1 bg-white rounded-lg flex items-start justify-between cursor-pointer hover:shadow-md transition"
      >
        <p className="text-[16px] font-bold">임장 템플릿</p>
      </div>
      {/* {isLoading
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
          ))} */}
    </div>
  );
}

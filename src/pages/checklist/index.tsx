import React, { useState } from 'react';
import CheckListItem from '@/components/CheckList/CheckListItem';
import CustomButton from '@/components/Button/CustomButton';
import { DefaultChecklist } from '@/data/defaultCheckList';
import IconComponent from '@/components/Asset/Icon';
import ChecklistAddButton from '@/components/Button/CheckListAddButton';
import ProgressIndicator from '@/components/CheckList/ProgressIndicator';
import { ChecklistItemType } from '@/types/checklist';

export default function ChecklistPage() {
  const [checklist, setChecklist] = useState<ChecklistItemType[]>(
    () => DefaultChecklist.map((item) => ({ ...item })) as ChecklistItemType[],
  );

  const handleChange = (id: number, newValue: string | string[]) => {
    setChecklist((prev) => {
      const index = prev.findIndex((item) => item.id === id);
      if (index === -1) return prev; 

      const updatedItem = { ...prev[index] };

      switch (updatedItem.type) {
        case 'checkbox':
          updatedItem.value = Array.isArray(newValue) ? [...newValue] : [];
          break;
        case 'radio':
        case 'text':
          updatedItem.value = String(newValue);
          break;
      }

      const newChecklist = [...prev];
      newChecklist[index] = updatedItem;

      return newChecklist;
    });
  };

  return (
    <div className="px-4 pt-6 pb-4 bg-[#F6F5F2]">
      <div className="mb-3 relative flex items-center justify-center">
        <IconComponent
          name="arrowLeft"
          width={24}
          height={24}
          className="absolute left-0 cursor-pointer text-gray-900"
        />
        <h1 className="text-xl font-bold text-gray-900 text-center">체크리스트 등록</h1>
      </div>

      <ProgressIndicator totalSteps={4} />

      <div className="mt-4 space-y-4">
        {checklist.map((item) => (
          <CheckListItem
            key={item.id}
            {...item}
            onChange={(value) => handleChange(item.id, value)}
          />
        ))}
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-bold text-gray-900 mb-3">체크리스트 추가</h2>
        <div className="grid grid-cols-3 gap-3">
          <ChecklistAddButton label="중복 선택" iconName="addListCheck" />
          <ChecklistAddButton label="단일 선택" iconName="addListRadio" />
          <ChecklistAddButton label="텍스트" iconName="addListText" />
        </div>
      </div>

      <CustomButton label="템플릿 저장" variant="secondary" fullWidth className="mt-5 mb-6" />
    </div>
  );
}

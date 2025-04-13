import React, { useState, useEffect } from 'react';
import ChecklistContainer from '@/components/CheckList/CheckListContainer';
import CustomButton from '@/components/Button/CustomButton';
import ChecklistAddButton from '@/components/Button/CheckListAddButton';
import HeaderWithProgress from '@/components/Layout/HeaderWithProgress';
import { DropResult } from '@hello-pangea/dnd';
import { ChecklistItem, ChecklistItemType } from '@/types/checklist';

export default function ChecklistPage() {
  const [checklist, setChecklist] = useState<ChecklistItemType[]>([]);

  const transformApiChecklist = (apiData: ChecklistItem[]): ChecklistItemType[] => {
    return apiData.map((item, index) => ({
      id: index + 1,
      label: item.title,
      type: item.checkType.toLowerCase() as 'text' | 'radio' | 'checkbox',
      options: item.checkItems,
      value:
        item.checkType === 'CHECKBOX'
          ? []
          : item.checkType === 'RADIO'
          ? item.checkItems?.[0] ?? ''
          : '',
    }));
  };

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const savedChecklist = localStorage.getItem('checklist');
        if (savedChecklist) {
          setChecklist(JSON.parse(savedChecklist));
          return;
        }

        const response = await fetch('/api/template/default');
        const data = await response.json();

        if (data.isSuccess && data.result?.checklists) {
          const transformed = transformApiChecklist(data.result.checklists);
          setChecklist(transformed);
          localStorage.setItem('checklist', JSON.stringify(transformed));
        }
      } catch (error) {
        console.error('체크리스트 템플릿 불러오기 실패:', error);
      }
    };

    fetchTemplate();
  }, []);

  const updateChecklistValue = (id: number, newValue: string | string[]) => {
    setChecklist((prev) => {
      const updatedChecklist = prev.map((item) =>
        item.id === id
          ? {
              ...item,
              value: item.type === 'checkbox' && Array.isArray(newValue) ? [...newValue] : newValue,
            }
          : item,
      );
      localStorage.setItem('checklist', JSON.stringify(updatedChecklist));
      return updatedChecklist;
    });
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(checklist);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setChecklist([...items]);
    localStorage.setItem('checklist', JSON.stringify(items));
  };

  return (
    <div className="px-4 pb-4 bg-[#F6F5F2]">
      <HeaderWithProgress title="체크리스트 등록" totalSteps={4} />

      <ChecklistContainer
        checklist={checklist}
        onUpdateChecklist={updateChecklistValue}
        onReorderChecklist={handleDragEnd}
      />

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

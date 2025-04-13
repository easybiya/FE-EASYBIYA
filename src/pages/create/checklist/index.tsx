import React, { useState, useEffect } from 'react';
import ChecklistContainer from '@/components/CheckList/CheckListContainer';
import CustomButton from '@/components/Button/CustomButton';
import ChecklistAddButton from '@/components/Button/CheckListAddButton';
import HeaderWithProgress from '@/components/Layout/HeaderWithProgress';
import { DropResult } from '@hello-pangea/dnd';
import { ChecklistItem, ChecklistItemType } from '@/types/checklist';

interface ChecklistApiResponse {
  isSuccess: boolean;
  message: string;
  result?: {
    name: string;
    checklists: ChecklistItem[];
  };
}

export default function ChecklistPage() {
  const [checklist, setChecklist] = useState<ChecklistItemType[]>([]);
  const [error, setError] = useState<string | null>(null);

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

  const fetchTemplate = async (signal: AbortSignal) => {
    try {
      const response = await fetch('/api/template/default', { signal });
      const data: ChecklistApiResponse = await response.json();

      if (!data.isSuccess || !data.result?.checklists) {
        throw new Error('템플릿 데이터를 불러오지 못했습니다.');
      }

      const transformed = transformApiChecklist(data.result.checklists);
      setChecklist(transformed);
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') return;
      setError('체크리스트 템플릿을 불러오는 중 문제가 발생했습니다.');
      console.error(err);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchTemplate(controller.signal);
    return () => controller.abort();
  }, []);

  const updateChecklistValue = (id: number, newValue: string | string[]) => {
    setChecklist((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              value: item.type === 'checkbox' && Array.isArray(newValue) ? [...newValue] : newValue,
            }
          : item,
      ),
    );
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(checklist);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setChecklist(items);
  };

  return (
    <div className="px-4 pb-4 bg-[#F6F5F2]">
      <HeaderWithProgress title="체크리스트 등록" totalSteps={4} />

      {error && <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-md">{error}</div>}

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

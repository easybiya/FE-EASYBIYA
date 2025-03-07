import React, { useState, useEffect } from 'react';
import CheckListItem from '@/components/CheckList/CheckListItem';
import CustomButton from '@/components/Button/CustomButton';
import { DefaultChecklist } from '@/data/defaultCheckList';
import IconComponent from '@/components/Asset/Icon';
import ChecklistAddButton from '@/components/Button/CheckListAddButton';
import ProgressIndicator from '@/components/CheckList/ProgressIndicator';
import { ChecklistItemType } from '@/types/checklist';
import { DragDropContext, DropResult, Droppable } from '@hello-pangea/dnd';

export default function ChecklistPage() {
  const [checklist, setChecklist] = useState<ChecklistItemType[]>(() =>
    DefaultChecklist.map((item) => ({ ...item })),
  );

  // TO DO: 필요시 API에 변경된 순서 저장
  // 로컬 스토리지에서 체크리스트 불러오기
  useEffect(() => {
    const savedChecklist = localStorage.getItem('checklist');
    if (savedChecklist) {
      setChecklist(JSON.parse(savedChecklist)); // 저장된 데이터가 있다면 불러오기
    } else {
      setChecklist(DefaultChecklist.map((item) => ({ ...item }))); // 기본값 설정
    }
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
    <div className="px-4 pt-6 pb-4 bg-[#F6F5F2]">
      <div className="mb-3 relative flex items-center justify-center">
        <IconComponent
          name="arrowLeft"
          width={24}
          height={24}
          className="absolute left-0 cursor-pointer"
        />
        <h1 className="text-b-18 text-center">체크리스트 등록</h1>
      </div>

      <ProgressIndicator totalSteps={4} />

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="checklist">
          {(provided) => (
            <div className="mt-4 space-y-4" ref={provided.innerRef} {...provided.droppableProps}>
              {checklist.map((item, index) => (
                <CheckListItem
                  key={item.id}
                  index={index}
                  {...item}
                  onChange={(value) => updateChecklistValue(item.id, value)}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

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

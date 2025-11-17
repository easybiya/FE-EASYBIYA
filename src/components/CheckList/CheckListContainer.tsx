import { SetStateAction } from 'react';
import CheckListItem from '@/components/CheckList/CheckListItem';
import { DragDropContext, DropResult, Droppable } from '@hello-pangea/dnd';
import { CheckItemPayload, ChecklistPayloadItem } from '@/types/checklist';
import { motion } from 'framer-motion';

interface ChecklistContainerProps {
  checklist: ChecklistPayloadItem[]; // 체크리스트 데이터
  setter: React.Dispatch<SetStateAction<ChecklistPayloadItem[]>>; // 체크리스트 상태 setter 함수
  handleEdit?: () => void;
  isShared?: boolean;
}

export default function CheckListContainer({
  checklist,
  setter,
  handleEdit,
  isShared,
}: ChecklistContainerProps) {
  // 체크리스트 항목 체크 상태 업데이트 함수
  const updateCheckListValue = (id: number, checkItem: CheckItemPayload) => {
    const updatedChecklist = checklist.map((item) => {
      if (item.priority !== id) return item;

      // CHECKBOX 타입: 해당 항목만 checked 상태 토글
      if (item.checkType === 'CHECKBOX') {
        const updatedCheckItems = item.checkItems.map((ci) =>
          ci.priority === checkItem.priority ? { ...ci, checked: !ci.checked } : ci,
        );
        return { ...item, checkItems: updatedCheckItems };
      }

      // RADIO 타입: 해당 항목만 checked = true, 나머지는 false
      if (item.checkType === 'RADIO') {
        const updatedCheckItems = item.checkItems.map((ci) => ({
          ...ci,
          checked: ci.priority === checkItem.priority,
        }));
        return { ...item, checkItems: updatedCheckItems };
      }

      return item;
    });

    setter(updatedChecklist);
    handleEdit?.();
  };

  // 체크리스트 항목 드래그 앤 드롭 핸들러
  const handleDragEnd = (result: DropResult) => {
    if (isShared) return;
    if (!result.destination) return;
    const updatedChecklist = [...checklist];
    const [movedItem] = updatedChecklist.splice(result.source.index, 1);
    updatedChecklist.splice(result.destination.index, 0, movedItem);
    const reorderedWithPriority = updatedChecklist.map((item, index) => ({
      ...item,
      priority: index + 1,
    }));
    setter(reorderedWithPriority);
    handleEdit?.();
  };

  // 체크리스트 항목 추가 핸들러
  const addOption = (priority: number) => {
    setter((prev) =>
      prev.map((item) => {
        if (item.priority !== priority) return item;

        if (item.checkType === 'RADIO' || item.checkType === 'CHECKBOX') {
          const nextPriority = item.checkItems.length + 1;
          const newOption = {
            description: `옵션 ${nextPriority}`,
            checked: false,
            priority: nextPriority,
          };
          return {
            ...item,
            checkItems: [...item.checkItems, newOption],
          };
        }

        return item;
      }),
    );
    handleEdit?.();
  };

  // 체크리스트 항목 옵션 수정 핸들러
  const editOption = (priority: number, checkItemPriority: number, newDescription: string) => {
    const updatedChecklist = checklist.map((item) => {
      if (item.priority !== priority) return item;

      const updatedCheckItems = item.checkItems.map((checkItem) =>
        checkItem.priority === checkItemPriority
          ? { ...checkItem, description: newDescription }
          : checkItem,
      );

      return { ...item, checkItems: updatedCheckItems };
    });

    setter(updatedChecklist);
    handleEdit?.();
  };

  // 체크리스트 텍스트 항목 수정 핸들러
  const editTextItem = (id: number, newContent: string) => {
    const updatedChecklist = checklist.map((item) =>
      item.priority === id ? { ...item, content: newContent } : item,
    );

    setter(updatedChecklist);
    handleEdit?.();
  };

  // 체크리스트 항목 타이틀 옵션 수정 핸들러
  const editCheckListTitle = (id: number, value: string) => {
    setter((prev) =>
      prev.map((item) => (item.priority === id ? { ...item, title: value ?? '' } : item)),
    );
    handleEdit?.();
  };

  // 체크리스트 항목 삭제 핸들러
  const deleteCheckList = (id: number) => {
    if (id !== null) {
      setter((prev) => prev.filter((item) => item.priority !== id));
    }
    handleEdit?.();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4 }}
    >
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="checklist" isDropDisabled={isShared}>
          {(provided) => (
            <div
              className="flex flex-col gap-8"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {checklist.map((item, index) => (
                <CheckListItem
                  key={`${item.checkType}-${item.priority}`}
                  index={index}
                  {...item}
                  priority={item.priority}
                  onChange={updateCheckListValue}
                  onOptionEdit={editOption}
                  onOptionAdd={addOption}
                  onEdit={editCheckListTitle}
                  onTextEdit={editTextItem}
                  onDelete={deleteCheckList}
                  isShared={isShared}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </motion.div>
  );
}

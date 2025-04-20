import React from 'react';
import CheckListItem from '@/components/CheckList/CheckListItem';
import { DragDropContext, DropResult, Droppable } from '@hello-pangea/dnd';
import { CheckItemPayload, ChecklistPayloadItem } from '@/types/checklist';

interface ChecklistContainerProps {
  checklist: ChecklistPayloadItem[];
  onUpdateChecklist: (id: number, checkItem: CheckItemPayload) => void;
  onOptionEdit?: (id: number, optionIndex: number, newValue: string) => void;
  onOptionAdd?: (id: number) => void;
  onReorderChecklist: (result: DropResult) => void;
  onEditChecklist?: (id: number) => void;
  onDeleteChecklist?: (id: number) => void;
}

export default function ChecklistContainer({
  checklist,
  onUpdateChecklist,
  onOptionEdit,
  onOptionAdd,
  onReorderChecklist,
  onEditChecklist,
  onDeleteChecklist,
}: ChecklistContainerProps) {
  return (
    <DragDropContext onDragEnd={onReorderChecklist}>
      <Droppable droppableId="checklist">
        {(provided) => (
          <div className="mt-4 space-y-4" ref={provided.innerRef} {...provided.droppableProps}>
            {checklist.map((item, index) => (
              <CheckListItem
                key={item.priority}
                index={index}
                {...item}
                priority={item.priority}
                onChange={onUpdateChecklist}
                onOptionEdit={onOptionEdit}
                onOptionAdd={onOptionAdd}
                onEdit={onEditChecklist}
                onDelete={onDeleteChecklist}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

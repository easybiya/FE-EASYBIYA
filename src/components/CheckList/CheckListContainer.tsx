import React from 'react';
import CheckListItem from '@/components/CheckList/CheckListItem';
import { DragDropContext, DropResult, Droppable } from '@hello-pangea/dnd';
import { ChecklistItemType } from '@/types/checklist';

interface ChecklistContainerProps {
  checklist: ChecklistItemType[];
  onUpdateChecklist: (id: number, newValue: string | string[]) => void;
  onOptionEdit: (id: number, optionIndex: number, newValue: string) => void;
  onReorderChecklist: (result: DropResult) => void;
  onEditChecklist: (id: number) => void;
  onDeleteChecklist: (id: number) => void;
}

export default function ChecklistContainer({
  checklist,
  onUpdateChecklist,
  onOptionEdit,
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
                key={item.id}
                index={index}
                {...item}
                onChange={(value) => onUpdateChecklist(item.id, value)}
                onOptionEdit={onOptionEdit}
                onEdit={() => onEditChecklist(item.id)}
                onDelete={() => onDeleteChecklist(item.id)}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

import React from 'react';
import CheckListItem from '@/components/CheckList/CheckListItem';
import { DragDropContext, DropResult, Droppable } from '@hello-pangea/dnd';
import { ChecklistItemType } from '@/types/checklist';

interface ChecklistContainerProps {
  checklist: ChecklistItemType[];
  onUpdateChecklist: (id: number, newValue: string | string[]) => void;
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
                key={item.id}
                index={index}
                {...item}
                onChange={(value) => onUpdateChecklist(item.id, value)}
                onOptionEdit={onOptionEdit}
                onOptionAdd={onOptionAdd ? () => onOptionAdd(item.id) : undefined} 
                onEdit={onEditChecklist ? () => onEditChecklist(item.id) : undefined}
                onDelete={onDeleteChecklist ? () => onDeleteChecklist(item.id) : undefined}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

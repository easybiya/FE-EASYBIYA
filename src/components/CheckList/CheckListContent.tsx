import React from 'react';
import ChecklistContainer from '@/components/CheckList/CheckListContainer';
import ChecklistAddButton from '@/components/Button/CheckListAddButton';
import CustomButton from '@/components/Button/CustomButton';
import { ChecklistPayloadItem, CheckItemPayload, CheckType } from '@/types/checklist';
import { DropResult } from '@hello-pangea/dnd';

interface Props {
  checklist: ChecklistPayloadItem[];
  onUpdateChecklist: (id: number, item: CheckItemPayload) => void;
  onReorderChecklist: (result: DropResult) => void;
  onEditChecklist: (id: number) => void;
  onDeleteChecklist: (id: number) => void;
  onOptionAdd: (priority: number) => void;
  onOptionEdit: (itemPriority: number, checkItemPriority: number) => void;
  onAddChecklist: (type: CheckType) => void;
  onSaveTemplate: () => void;
}

const ChecklistContent = ({
  checklist,
  onUpdateChecklist,
  onReorderChecklist,
  onEditChecklist,
  onDeleteChecklist,
  onOptionAdd,
  onOptionEdit,
  onAddChecklist,
  onSaveTemplate,
}: Props) => {
  return (
    <div className="flex-1 overflow-y-auto px-4 pb-48 no-scrollbar">
      <ChecklistContainer
        checklist={checklist}
        onUpdateChecklist={onUpdateChecklist}
        onReorderChecklist={onReorderChecklist}
        onEditChecklist={onEditChecklist}
        onDeleteChecklist={onDeleteChecklist}
        onOptionAdd={onOptionAdd}
        onOptionEdit={onOptionEdit}
      />

      <div className="mt-6">
        <h2 className="text-lg font-bold text-gray-900 mb-3">체크리스트 추가</h2>
        <div className="grid grid-cols-3 gap-3">
          <ChecklistAddButton
            label="중복 선택"
            iconName="addListCheck"
            onClick={() => onAddChecklist('CHECKBOX')}
          />
          <ChecklistAddButton
            label="단일 선택"
            iconName="addListRadio"
            onClick={() => onAddChecklist('RADIO')}
          />
          <ChecklistAddButton
            label="텍스트"
            iconName="addListText"
            onClick={() => onAddChecklist('TEXT')}
          />
        </div>
      </div>

      <CustomButton
        label="템플릿 저장"
        variant="secondary"
        fullWidth
        className="mt-5 mb-6"
        onClick={onSaveTemplate}
      />
    </div>
  );
};

export default ChecklistContent;

import { CheckItemPayload, ChecklistPayloadItem } from '@/types/checklist';
import DragIcon from '@/public/icons/drag.svg?react';
import { Draggable } from '@hello-pangea/dnd';
import { stripEmoji } from '@/utils/stripEmoji';
import DialogDropdownLayout from '../Dropdown/DialogDropdown';
import { InputModal } from '../Modal/InputModal';
import { ConfirmModal } from '../Modal/ConfirmModal';
import PreventDropdownMenuItem from '../Dropdown/PreventDropdownMenuItem';
import DropdownIcon from '@/public/icons/meatball-gray.svg?react';
import { matchedInfoByTitle } from '@/utils/matchedInfoByTitle';
import { NotificationModal } from '../Modal/NotificationModal';
import InfoIcon from '@/public/icons/info-circle.svg?react';
import TextCheckItem from './TextCheckItem';
import RadioCheckItem from './RadioCheckItem';
import CheckboxCheckItem from './CheckboxCheckItem';
import { useState } from 'react';

interface ChecklistItemProps extends ChecklistPayloadItem {
  onChange?: (id: number, checkItem: CheckItemPayload) => void;
  onOptionEdit?: (id: number, optionIndex: number, newValue: string) => void;
  onOptionAdd?: (id: number) => void;
  index: number;
  onEdit?: (id: number, value: string) => void;
  onDelete?: (id: number) => void;
  onTextEdit?: (id: number, content: string) => void;
  isShared?: boolean;
}

export default function ChecklistItem({
  priority,
  title,
  checkType,
  content,
  checkItems,
  onChange,
  onOptionEdit,
  onOptionAdd,
  onTextEdit,
  index,
  onEdit,
  onDelete,
  isShared,
}: ChecklistItemProps) {
  const info = matchedInfoByTitle(stripEmoji(title));
  const [isInputModalOpen, setIsInputModalOpen] = useState(false);

  return (
    <Draggable draggableId={priority.toString()} index={index} isDragDisabled={isShared}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="flex flex-col pt-16 pr-8 pb-16 pl-16 border border-gray-300 rounded-lg bg-white shadow-sm"
        >
          <div className="flex items-center justify-between mb-8 relative">
            <div className="flex items-center gap-8">
              <DragIcon width={16} height={16} className={`${!isShared && 'cursor-grab'}`} />
              <p className="text-15/22 font-bold">{title}</p>
              {info && (
                <NotificationModal
                  trigger={
                    <button
                      type="button"
                      className="flex items-center justify-center w-16 h-16"
                      onSelect={(e) => e.preventDefault()}
                    >
                      <InfoIcon
                        name="infoCircle"
                        width={16}
                        height={16}
                        className="text-gray-500 cursor-pointer"
                      />
                    </button>
                  }
                  title={title}
                  desscription={info}
                />
              )}
            </div>
            {!isShared && (
              <DialogDropdownLayout
                trigger={
                  <button
                    type="button"
                    className="flex items-center justify-center w-16 h-16"
                    onSelect={(e) => e.preventDefault()}
                  >
                    <DropdownIcon
                      width={16}
                      height={16}
                      className="cursor-pointer fill-gray-400 stroke-gray-400 w-16 h-16"
                    />
                  </button>
                }
              >
                {
                  <>
                    {checkType !== 'TEXT' && (
                      <PreventDropdownMenuItem
                        onSelect={() => onOptionAdd && onOptionAdd(priority)}
                        className="w-full p-8 rounded-4 text-left text-gray-800 hover:bg-secondary"
                      >
                        <div className="flex flex-col gap-4 text-14/21">추가하기</div>
                      </PreventDropdownMenuItem>
                    )}

                    <InputModal
                      title="수정하기"
                      trigger={
                        <PreventDropdownMenuItem className="w-full p-8 rounded-4 text-left text-gray-800 hover:bg-secondary">
                          <div className="text-14/21">수정하기</div>
                        </PreventDropdownMenuItem>
                      }
                      handleClick={(v: string) => onEdit && onEdit(priority, v)}
                      defaultValue={title}
                      open={isInputModalOpen}
                      openChange={setIsInputModalOpen}
                    />
                    <ConfirmModal
                      title="삭제하기"
                      description="체크리스트 항목을 삭제하시겠습니까?"
                      trigger={
                        <PreventDropdownMenuItem className="w-full p-8 rounded-4 text-left text-gray-800 hover:bg-secondary">
                          <div className="text-14/21 text-red-500">삭제하기</div>
                        </PreventDropdownMenuItem>
                      }
                      handleSubmit={() => onDelete && onDelete(priority)}
                      buttonStyle="bg-red-500 hover:bg-red-400 active:bg-red-300"
                    />
                  </>
                }
              </DialogDropdownLayout>
            )}
          </div>
          {checkType === 'TEXT' && (
            <TextCheckItem
              priority={priority}
              content={content}
              editText={onTextEdit}
              isShared={isShared}
            />
          )}
          {checkType === 'RADIO' && (
            <RadioCheckItem
              priority={priority}
              onChange={onChange}
              onOptionEdit={onOptionEdit}
              checkItems={checkItems}
              isShared={isShared}
            />
          )}
          {checkType === 'CHECKBOX' && (
            <CheckboxCheckItem
              priority={priority}
              onChange={onChange}
              onOptionEdit={onOptionEdit}
              checkItems={checkItems}
              isShared={isShared}
            />
          )}
        </div>
      )}
    </Draggable>
  );
}

import { useState } from 'react';
import { CheckItemPayload, ChecklistPayloadItem } from '@/types/checklist';
import IconComponent from '../Asset/Icon';
import { Draggable } from '@hello-pangea/dnd';
import InfoModal from '@/components/Modal/InfoModal';
import { checklistInfoMap } from '@/constants/checkListInfo';
import { stripEmoji } from '@/utils/stripEmoji';
import DialogDropdownLayout from '../Dropdown/DialogDropdown';
import { InputModal } from '../Modal/InputModal';
import { ConfirmModal } from '../Modal/ConfirmModal';
import PreventDropdownMenuItem from '../Dropdown/PreventDropdownMenuItem';
import DropdownIcon from '@/public/icons/meatball-gray.svg?react';

interface ChecklistItemProps extends ChecklistPayloadItem {
  onChange?: (id: number, checkItem: CheckItemPayload) => void;
  onOptionEdit?: (id: number, optionIndex: number, newValue: string) => void;
  onOptionAdd?: (id: number) => void;
  index: number;
  onEdit?: (id: number, value: string) => void;
  onDelete?: (id: number) => void;
  onTextEdit?: (id: number, content: string) => void;
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
}: ChecklistItemProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingText, setEditingText] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);

  return (
    <Draggable draggableId={priority.toString()} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="flex flex-col pt-16 pr-8 pb-16 pl-16 border border-gray-300 rounded-lg bg-white shadow-sm"
        >
          <div className="flex items-center justify-between mb-8 relative">
            <div className="flex items-center gap-8">
              <IconComponent
                name="drag"
                width={16}
                height={16}
                className="text-gray-400 cursor-grab"
              />
              <p className="text-b-15">{title}</p>
              {/* 애매해서 일단 주석처리함, 정보 리스트 나오면 정리해야 할듯 */}
              {/* {hasInfo && (
                <IconComponent
                  name="infoCircle"
                  width={16}
                  height={16}
                  className="text-gray-500 cursor-pointer"
                  onClick={() => setShowInfoModal(true)}
                />
              )} */}
            </div>
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
          </div>

          {checkType === 'TEXT' && (
            <div className="flex items-center justify-between text-r-14">
              {editingText ? (
                <input
                  value={content ?? ''}
                  autoFocus
                  onChange={(e) => onTextEdit?.(priority, e.target.value)}
                  onBlur={() => setEditingText(false)}
                  onKeyDown={(e) => e.key === 'Enter' && setEditingText(false)}
                  className="text-sm w-full h-20 focus:outline-brownText"
                />
              ) : (
                <div
                  className="flex justify-between items-center w-full h-20"
                  onClick={() => setEditingText(true)}
                >
                  <span>
                    {content || <span className="text-gray-400">내용을 입력해주세요</span>}
                  </span>
                </div>
              )}
            </div>
          )}

          {checkType === 'RADIO' && (
            <div className="flex flex-col gap-8 mt-4">
              {checkItems.map((option, i) => (
                <div
                  key={option.priority}
                  className="flex items-center justify-between text-r-14 gap-8"
                >
                  <div className="flex items-center gap-8 w-full">
                    <input
                      type="radio"
                      name={`radio-group-${priority}`}
                      value={option.description}
                      checked={option.checked}
                      onChange={() => onChange?.(priority, option)}
                      className="w-16 h-16 accent-black"
                    />

                    {editingIndex === i ? (
                      <input
                        value={option.description}
                        autoFocus
                        onChange={(e) => onOptionEdit?.(priority, option.priority, e.target.value)}
                        onBlur={() => setEditingIndex(null)}
                        onKeyDown={(e) => e.key === 'Enter' && setEditingIndex(null)}
                        className="text-sm w-full h-20  focus:outline-brownText"
                      />
                    ) : (
                      <span
                        onClick={() => setEditingIndex(i)}
                        className="cursor-pointer inline-block h-20 w-full"
                      >
                        {option.description}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {checkType === 'CHECKBOX' && (
            <div className="flex flex-col gap-8 mt-4">
              {checkItems.map((option, i) => (
                <div
                  key={option.priority}
                  className="flex items-center justify-between text-r-14 gap-8"
                >
                  <div className="flex items-center gap-8 w-full">
                    <input
                      type="checkbox"
                      value={option.description}
                      checked={option.checked}
                      onChange={() => onChange?.(priority, option)}
                      className="w-16 h-16 accent-black"
                    />
                    {editingIndex === i ? (
                      <input
                        value={option.description}
                        autoFocus
                        onChange={(e) => onOptionEdit?.(priority, option.priority, e.target.value)}
                        onBlur={() => setEditingIndex(null)}
                        onKeyDown={(e) => e.key === 'Enter' && setEditingIndex(null)}
                        className="text-sm w-full h-20  focus:outline-brownText"
                      />
                    ) : (
                      <span
                        onClick={() => setEditingIndex(i)}
                        className="cursor-pointer inline-block h-20 w-full"
                      >
                        {option.description}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {showInfoModal && (
            <InfoModal
              title={stripEmoji(title)}
              description={checklistInfoMap[stripEmoji(title)] || '정보가 없습니다.'}
              onClose={() => setShowInfoModal(false)}
            />
          )}
        </div>
      )}
    </Draggable>
  );
}

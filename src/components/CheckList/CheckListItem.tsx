import { useState, useRef, useEffect } from 'react';
import { CheckItemPayload, ChecklistPayloadItem } from '@/types/checklist';
import IconComponent from '../Asset/Icon';
import { Draggable } from '@hello-pangea/dnd';
import InfoModal from '@/components/Modal/InfoModal';
import { checklistInfoMap } from '@/constants/checkListInfo';
import { stripEmoji } from '@/utils/stripEmoji';

interface ChecklistItemProps extends ChecklistPayloadItem {
  onChange?: (id: number, checkItem: CheckItemPayload) => void;
  onOptionEdit?: (id: number, optionIndex: number, newValue: string) => void;
  onOptionAdd?: (id: number) => void;
  index: number;
  onEdit?: (id: number) => void;
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingText, setEditingText] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <Draggable draggableId={priority.toString()} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="flex flex-col pt-4 pr-2 pb-4 pl-4 border border-gray-300 rounded-lg bg-white shadow-sm"
        >
          <div className="flex items-center justify-between mb-2 relative">
            <div className="flex items-center gap-2">
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

            <div className="relative" ref={menuRef}>
              <IconComponent
                name="meatballGray"
                width={16}
                height={16}
                className="text-gray-500 cursor-pointer"
                onClick={() => setIsMenuOpen((prev) => !prev)}
              />
              {isMenuOpen && (
                <div className="absolute right-0 z-10 mt-2 w-28 bg-white border border-gray-200 rounded shadow-md">
                  {(checkType === 'RADIO' || checkType === 'CHECKBOX') && (
                    <button
                      className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                      onClick={() => {
                        onOptionAdd?.(priority);
                        setIsMenuOpen(false);
                      }}
                    >
                      추가하기
                    </button>
                  )}
                  <button
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                    onClick={() => {
                      onEdit?.(priority);
                      setIsMenuOpen(false);
                    }}
                  >
                    수정하기
                  </button>
                  <button
                    className="w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-gray-100"
                    onClick={() => {
                      onDelete?.(priority);
                      setIsMenuOpen(false);
                    }}
                  >
                    삭제하기
                  </button>
                </div>
              )}
            </div>
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
                  className="w-full text-sm border-b border-gray-300 mr-2"
                />
              ) : (
                <div
                  className="flex justify-between items-center w-full"
                  onClick={() => setEditingText(true)}
                >
                  <span>{content || <span className="text-gray-400">입력 없음</span>}</span>
                  <span className="text-gray-400 text-xs">✏️</span>
                </div>
              )}
            </div>
          )}

          {checkType === 'RADIO' && (
            <div className="flex flex-col gap-2 mt-1">
              {checkItems.map((option, i) => (
                <div
                  key={option.priority}
                  className="flex items-center justify-between text-r-14 gap-2"
                >
                  <label className="flex items-center gap-2 w-full">
                    <input
                      type="radio"
                      name={`radio-group-${priority}`}
                      value={option.description}
                      checked={option.checked}
                      onChange={() => onChange?.(priority, option)}
                      className="w-4 h-4 accent-black"
                    />
                    {editingIndex === i ? (
                      <input
                        value={option.description}
                        autoFocus
                        onChange={(e) => onOptionEdit?.(priority, option.priority, e.target.value)}
                        onBlur={() => setEditingIndex(null)}
                        onKeyDown={(e) => e.key === 'Enter' && setEditingIndex(null)}
                        className="text-sm border-b border-gray-300"
                      />
                    ) : (
                      <span>{option.description}</span>
                    )}
                  </label>
                  {editingIndex !== i && (
                    <button
                      onClick={() => setEditingIndex(i)}
                      className="text-gray-400 text-xs cursor-pointer hover:underline"
                      aria-label="옵션 수정"
                    >
                      ✏️
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

          {checkType === 'CHECKBOX' && (
            <div className="flex flex-col gap-2 mt-1">
              {checkItems.map((option, i) => (
                <div
                  key={option.priority}
                  className="flex items-center justify-between text-r-14 gap-2"
                >
                  <label className="flex items-center gap-2 w-full">
                    <input
                      type="checkbox"
                      value={option.description}
                      checked={option.checked}
                      onChange={() => onChange?.(priority, option)}
                      className="w-4 h-4 accent-black"
                    />
                    {editingIndex === i ? (
                      <input
                        value={option.description}
                        autoFocus
                        onChange={(e) => onOptionEdit?.(priority, option.priority, e.target.value)}
                        onBlur={() => setEditingIndex(null)}
                        onKeyDown={(e) => e.key === 'Enter' && setEditingIndex(null)}
                        className="text-sm border-b border-gray-300"
                      />
                    ) : (
                      <span>{option.description}</span>
                    )}
                  </label>
                  {editingIndex !== i && (
                    <button
                      onClick={() => setEditingIndex(i)}
                      className="text-gray-400 text-xs cursor-pointer hover:underline"
                      aria-label="옵션 수정"
                    >
                      ✏️
                    </button>
                  )}
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

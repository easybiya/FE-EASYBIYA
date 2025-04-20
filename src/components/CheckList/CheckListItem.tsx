import { useState, useRef, useEffect } from 'react';
import { ChecklistItemType } from '@/types/checklist';
import IconComponent from '../Asset/Icon';
import { Draggable } from '@hello-pangea/dnd';
import InfoModal from '@/components/Modal/InfoModal';
import { checklistInfoMap } from '@/constants/checkListInfo';
import { stripEmoji } from '@/utils/stripEmoji';

interface ChecklistItemProps extends ChecklistItemType {
  onChange?: (value: string | string[]) => void;
  onOptionEdit?: (id: number, optionIndex: number, newValue: string) => void;
  onOptionAdd?: (id: number) => void;
  index: number;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

export default function ChecklistItem({
  id,
  type,
  label,
  value,
  options = [],
  hasInfo,
  onChange,
  onOptionEdit,
  onOptionAdd,
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
    <Draggable draggableId={id.toString()} index={index}>
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
              <p className="text-b-15">{label}</p>
              {hasInfo && (
                <IconComponent
                  name="infoCircle"
                  width={16}
                  height={16}
                  className="text-gray-500 cursor-pointer"
                  onClick={() => setShowInfoModal(true)}
                />
              )}
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
                  {(type === 'radio' || type === 'checkbox') && (
                    <button
                      className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                      onClick={() => {
                        onOptionAdd?.(id);
                        setIsMenuOpen(false);
                      }}
                    >
                      추가하기
                    </button>
                  )}
                  <button
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                    onClick={() => {
                      onEdit?.(id);
                      setIsMenuOpen(false);
                    }}
                  >
                    수정하기
                  </button>
                  <button
                    className="w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-gray-100"
                    onClick={() => {
                      onDelete?.(id);
                      setIsMenuOpen(false);
                    }}
                  >
                    삭제하기
                  </button>
                </div>
              )}
            </div>
          </div>

          {type === 'text' && (
            <div className="flex items-center justify-between text-r-14">
              {editingText ? (
                <input
                  value={typeof value === 'string' ? value : ''}
                  autoFocus
                  onChange={(e) => onChange?.(e.target.value)}
                  onBlur={() => setEditingText(false)}
                  onKeyDown={(e) => e.key === 'Enter' && setEditingText(false)}
                  className="w-full text-sm border-b border-gray-300 mr-2"
                />
              ) : (
                <div
                  className="flex justify-between items-center w-full"
                  onClick={() => setEditingText(true)}
                >
                  <span>{value || <span className="text-gray-400">입력 없음</span>}</span>
                  <span className="text-gray-400 text-xs">🖉</span>
                </div>
              )}
            </div>
          )}

          {type === 'radio' && (
            <div className="flex flex-col gap-2 mt-1">
              {options.map((option, i) => (
                <div
                  key={`${option}-${i}`}
                  className="flex items-center justify-between text-r-14 gap-2"
                >
                  <label className="flex items-center gap-2 w-full">
                    <input
                      type="radio"
                      name={`radio-${id}`}
                      value={option}
                      checked={value === option}
                      onChange={() => onChange?.(option)}
                      className="w-4 h-4 accent-black"
                    />
                    {editingIndex === i ? (
                      <input
                        value={option}
                        autoFocus
                        onChange={(e) => onOptionEdit?.(id, i, e.target.value)}
                        onBlur={() => setEditingIndex(null)}
                        onKeyDown={(e) => e.key === 'Enter' && setEditingIndex(null)}
                        className="text-sm border-b border-gray-300"
                      />
                    ) : (
                      <span>{option}</span>
                    )}
                  </label>
                  {editingIndex !== i && (
                    <button
                      onClick={() => setEditingIndex(i)}
                      className="text-gray-400 text-xs cursor-pointer hover:underline"
                      aria-label="옵션 수정"
                    >
                      🖉
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

          {type === 'checkbox' && (
            <div className="flex flex-col gap-2 mt-1">
              {options.map((option, i) => (
                <div
                  key={`${option}-${i}`}
                  className="flex items-center justify-between text-r-14 gap-2"
                >
                  <label className="flex items-center gap-2 w-full">
                    <input
                      type="checkbox"
                      value={option}
                      checked={Array.isArray(value) && value.includes(option)}
                      onChange={() => {
                        if (!Array.isArray(value)) return;
                        const newValue = value.includes(option)
                          ? value.filter((v) => v !== option)
                          : [...value, option];
                        onChange?.(newValue);
                      }}
                      className="w-4 h-4 accent-black"
                    />
                    {editingIndex === i ? (
                      <input
                        value={option}
                        autoFocus
                        onChange={(e) => onOptionEdit?.(id, i, e.target.value)}
                        onBlur={() => setEditingIndex(null)}
                        onKeyDown={(e) => e.key === 'Enter' && setEditingIndex(null)}
                        className="text-sm border-b border-gray-300"
                      />
                    ) : (
                      <span>{option}</span>
                    )}
                  </label>
                  {editingIndex !== i && (
                    <button
                      onClick={() => setEditingIndex(i)}
                      className="text-gray-400 text-xs cursor-pointer hover:underline"
                      aria-label="옵션 수정"
                    >
                      🖉
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

          {showInfoModal && (
            <InfoModal
              title={stripEmoji(label)}
              description={checklistInfoMap[stripEmoji(label)] || '정보가 없습니다.'}
              onClose={() => setShowInfoModal(false)}
            />
          )}
        </div>
      )}
    </Draggable>
  );
}

import { useState, useRef, useEffect } from 'react';
import { ChecklistItemType } from '@/types/checklist';
import IconComponent from '../Asset/Icon';
import { Draggable } from '@hello-pangea/dnd';

interface ChecklistItemProps extends ChecklistItemType {
  onChange?: (value: string | string[]) => void;
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
  index,
  onEdit,
  onDelete,
}: ChecklistItemProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // 메뉴 외부 클릭 시 닫기
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
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
                />
              )}
            </div>

            {/* 미트볼 버튼 + 드롭다운 */}
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

          {/* 텍스트 */}
          {type === 'text' && <p className="text-r-14">{value}</p>}

          {/* 단일 선택 (라디오 버튼) */}
          {type === 'radio' && (
            <div className="flex flex-col gap-2 mt-1">
              {options.map((option) => (
                <label key={option} className="flex items-center gap-2 text-r-14">
                  <input
                    type="radio"
                    name={label}
                    value={option}
                    checked={value === option}
                    onChange={() => onChange?.(option)}
                    className="w-4 h-4 accent-black"
                  />
                  {option}
                </label>
              ))}
            </div>
          )}

          {/* 다중 선택 (체크박스) */}
          {type === 'checkbox' && (
            <div className="flex flex-col gap-2 mt-1">
              {options.map((option) => (
                <label key={option} className="flex items-center gap-2 text-r-14">
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
                  {option}
                </label>
              ))}
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
}

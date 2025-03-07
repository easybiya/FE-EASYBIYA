import { ChecklistItemType } from '@/types/checklist';
import IconComponent from '../Asset/Icon';
import { Draggable } from '@hello-pangea/dnd';

interface ChecklistItemProps extends ChecklistItemType {
  onChange?: (value: string | string[]) => void;
  index: number;
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
}: ChecklistItemProps) {
  return (
    <Draggable draggableId={id.toString()} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="flex flex-col pt-4 pr-2 pb-4 pl-4 border border-gray-300 rounded-lg bg-white shadow-sm"
        >
          <div className="flex items-center justify-between mb-2">
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

            <IconComponent
              name="meatballGray"
              width={16}
              height={16}
              className="text-gray-500 cursor-pointer"
            />
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

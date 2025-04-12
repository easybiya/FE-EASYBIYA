import { CheckItem, CheckListItem } from '@/types/checklist';
import IconComponent from '../Asset/Icon';
import { Draggable } from '@hello-pangea/dnd';

interface ChecklistItemProps extends CheckListItem {
  onChange: (id: number, checkItem: CheckItem) => void;
  index: number;
}

export default function ChecklistItem({
  priority,
  checkType,
  title,
  checkItems,
  content,
  onChange,
  index,
}: ChecklistItemProps) {
  return (
    <Draggable draggableId={priority.toString()} index={index}>
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
              <p className="text-b-15">{title}</p>
              {/* {hasInfo && (
                <IconComponent
                  name="infoCircle"
                  width={16}
                  height={16}
                  className="text-gray-500 cursor-pointer"
                />
              )} */}
            </div>

            {/* TO DO: 미트볼 버튼에 기능 추가 */}
            <IconComponent
              name="meatballGray"
              width={16}
              height={16}
              className="text-gray-500 cursor-pointer"
            />
          </div>

          {/* 텍스트 */}
          {checkType === 'TEXT' && <p className="text-r-14">{content}</p>}

          {/* 단일 선택 (라디오 버튼) */}
          {checkType === 'RADIO' && (
            <div className="flex flex-col gap-2 mt-1">
              {checkItems.map((option) => (
                <label key={option.priority} className="flex items-center gap-2 text-r-14">
                  <input
                    type="radio"
                    name={option.description}
                    checked={option.checked}
                    onChange={() => {
                      onChange(priority, option);
                    }}
                    className="w-4 h-4 accent-black"
                  />
                  {option.description}
                </label>
              ))}
            </div>
          )}

          {/* 다중 선택 (체크박스) */}
          {checkType === 'CHECKBOX' && (
            <div className="flex flex-col gap-2 mt-1">
              {checkItems.map((option) => (
                <label key={option.priority} className="flex items-center gap-2 text-r-14">
                  <input
                    type="checkbox"
                    checked={option.checked}
                    onChange={() => onChange(priority, option)}
                    className="w-4 h-4 accent-black"
                  />
                  {option.description}
                </label>
              ))}
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
}

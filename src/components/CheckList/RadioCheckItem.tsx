import { CheckItemPayload } from '@/types/checklist';
import { useState } from 'react';
import CheckIcon from '@/public/icons/radio-check.svg?react';
import UnCheckIcon from '@/public/icons/radio-uncheck.svg?react';
import { cn } from '@/lib/utils';

interface Props {
  priority: number;
  onChange?: (id: number, checkItem: CheckItemPayload) => void;
  onOptionEdit?: (id: number, optionIndex: number, newValue: string) => void;
  checkItems: CheckItemPayload[];
}

export default function RadioCheckItem({ priority, onChange, onOptionEdit, checkItems }: Props) {
  return (
    <div className="flex flex-col gap-8 mt-4">
      {checkItems.map((option) => (
        <div key={option.priority} className="flex items-center justify-between text-r-14 gap-8">
          <RadioInput
            priority={priority}
            item={option}
            onChange={onChange}
            onOptionEdit={onOptionEdit}
            checkItems={checkItems}
          />
        </div>
      ))}
    </div>
  );
}

interface RadioInputProps {
  priority: number;
  item: CheckItemPayload;
  onChange?: (id: number, checkItem: CheckItemPayload) => void;
  onOptionEdit?: (id: number, optionIndex: number, newValue: string) => void;
  checkItems: CheckItemPayload[];
}

function RadioInput({ priority, item, onChange, onOptionEdit, checkItems }: RadioInputProps) {
  const [inputEdit, setInputEdit] = useState(false);
  return (
    <div className="flex items-center gap-8 w-full">
      <div
        onClick={() => {
          // 라디오이므로 같은 그룹 내 다른 항목은 false로 바꾸고 현재만 true
          checkItems.forEach((option) => (option.checked = option.priority === item.priority));
          onChange?.(priority, item);
        }}
        className="cursor-pointer"
      >
        {item.checked ? (
          <CheckIcon width={16} height={16} />
        ) : (
          <UnCheckIcon width={16} height={16} />
        )}
      </div>

      {inputEdit ? (
        <input
          value={item.description}
          autoFocus
          onChange={(e) => onOptionEdit?.(priority, item.priority, e.target.value)}
          onBlur={() => setInputEdit(false)}
          onKeyDown={(e) => e.key === 'Enter' && setInputEdit(false)}
          className="text-sm w-full h-20 focus:outline-brownText"
        />
      ) : (
        <span
          onClick={() => setInputEdit(true)}
          className={cn(
            'cursor-pointer inline-block h-20',
            item.description.length === 0 ? 'w-full' : 'w-auto',
          )}
        >
          {item.description}
        </span>
      )}
    </div>
  );
}

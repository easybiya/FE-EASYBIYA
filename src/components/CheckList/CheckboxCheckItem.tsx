import { CheckItemPayload } from '@/types/checklist';
import { useState } from 'react';
import CheckIcon from '@/public/icons/checkbox-check.svg?react';
import UnCheckIcon from '@/public/icons/checkbox-uncheck.svg?react';

interface Props {
  priority: number;
  onChange?: (id: number, checkItem: CheckItemPayload) => void;
  onOptionEdit?: (id: number, optionIndex: number, newValue: string) => void;
  checkItems: CheckItemPayload[];
  isShared?: boolean;
}

export default function CheckboxCheckItem({
  priority,
  onChange,
  onOptionEdit,
  checkItems,
  isShared,
}: Props) {
  return (
    <div className="flex flex-col gap-8 mt-4">
      {checkItems.map((option) => (
        <div key={option.priority} className="flex items-center justify-between text-r-14 gap-8">
          <CheckboxInput
            priority={priority}
            onChange={onChange}
            onOptionEdit={onOptionEdit}
            item={option}
            isShared={isShared}
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
  isShared?: boolean;
}

function CheckboxInput({ priority, item, onChange, onOptionEdit, isShared }: RadioInputProps) {
  const [inputEdit, setInputEdit] = useState(false);
  return (
    <div className="flex items-center gap-8 w-full">
      <div
        onClick={() => {
          if (isShared) return;
          onChange?.(priority, item);
        }}
      >
        {item.checked ? (
          <CheckIcon width={16} height={16} />
        ) : (
          <UnCheckIcon width={16} height={16} />
        )}
      </div>
      {inputEdit && !isShared ? (
        <input
          value={item.description}
          autoFocus
          disabled={isShared}
          onChange={(e) => onOptionEdit?.(priority, item.priority, e.target.value)}
          onBlur={() => setInputEdit(false)}
          onKeyDown={(e) => e.key === 'Enter' && setInputEdit(false)}
          className="text-sm w-full h-20  focus:outline-brownText"
        />
      ) : (
        <span
          onClick={() => !isShared && setInputEdit(true)}
          className="cursor-pointer inline-block h-20 w-auto"
        >
          {item.description}
        </span>
      )}
    </div>
  );
}

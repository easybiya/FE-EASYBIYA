import { CheckItemPayload } from '@/types/checklist';
import { useState } from 'react';

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
}

function RadioInput({ priority, item, onChange, onOptionEdit }: RadioInputProps) {
  const [inputEdit, setInputEdit] = useState(false);
  return (
    <div className="flex items-center gap-8 w-full">
      <input
        type="radio"
        name={`radio-group-${priority}`}
        value={item.description}
        checked={item.checked}
        onChange={() => onChange?.(priority, item)}
        className="w-16 h-16 accent-black"
      />

      {inputEdit ? (
        <input
          value={item.description}
          autoFocus
          onChange={(e) => onOptionEdit?.(priority, item.priority, e.target.value)}
          onBlur={() => setInputEdit(false)}
          onKeyDown={(e) => e.key === 'Enter' && setInputEdit(false)}
          className="text-sm w-full h-20  focus:outline-brownText"
        />
      ) : (
        <span
          onClick={() => setInputEdit(true)}
          className="cursor-pointer inline-block h-20 w-auto"
        >
          {item.description}
        </span>
      )}
    </div>
  );
}

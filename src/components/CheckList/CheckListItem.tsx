import React from 'react';

interface ChecklistItemProps {
  type: 'text' | 'radio' | 'checkbox';
  label: string;
  value?: string | string[];
  options?: string[];
  onChange?: (value: string | string[]) => void;
}

// TO DO
// 풀 땡기면 IconComponent 사용해서 아이콘 추가

export default function ChecklistItem({
  type,
  label,
  value,
  options = [],
  onChange,
}: ChecklistItemProps) {
  return (
    <div className="pl-4 pr-2 py-4 border border-gray-300 rounded-lg bg-white shadow-sm">
      <p className="font-semibold text-gray-800 mb-2">{label}</p>

      {/* 텍스트 */}
      {type === 'text' && <p className="text-black">{value}</p>}

      {/* 단일 선택 (라디오 버튼) */}
      {type === 'radio' && (
        <div className="flex flex-col gap-2">
          {options.map((option) => (
            <label key={option} className="flex items-center gap-3 text-black">
              <input
                type="radio"
                name={label}
                value={option}
                checked={value === option}
                onChange={() => onChange?.(option)}
                className="w-4 h-4"
              />
              {option}
            </label>
          ))}
        </div>
      )}

      {/* 다중 선택 (체크박스) */}
      {type === 'checkbox' && (
        <div className="flex flex-col gap-2">
          {options.map((option) => (
            <label key={option} className="flex items-center gap-3 text-black">
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
                className="w-4 h-4"
              />
              {option}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

import { useState } from 'react';

interface Props {
  priority: number;
  content: string | null;
  editText?: (priority: number, value: string) => void;
}

export default function TextCheckItem({ priority, content, editText }: Props) {
  const [isEdit, setIsEdit] = useState(false);
  return (
    <div className="flex items-center justify-between text-r-14">
      {isEdit ? (
        <input
          value={content ?? ''}
          autoFocus
          onChange={(e) => editText && editText(priority, e.target.value)}
          onBlur={() => setIsEdit(false)}
          onKeyDown={(e) => e.key === 'Enter' && setIsEdit(false)}
          className="text-sm w-full h-20 focus:outline-brownText"
        />
      ) : (
        <div
          className="flex justify-between items-center w-full h-20"
          onClick={() => setIsEdit(true)}
        >
          <span>{content || <span className="text-gray-400">내용을 입력해주세요</span>}</span>
        </div>
      )}
    </div>
  );
}

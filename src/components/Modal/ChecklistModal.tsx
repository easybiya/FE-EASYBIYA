import React, { useState, useRef, useEffect } from 'react';
import CustomButton from '@/components/Button/CustomButton';
import IconComponent from '@/components/Asset/Icon';

interface ChecklistModalProps {
  mode: 'edit' | 'confirm';
  title?: string;
  defaultValue?: string;
  confirmText?: string;
  cancelText?: string;
  onClose: () => void;
  onConfirm: (value?: string) => void;
}

export default function ChecklistModal({
  mode,
  title = '확인하시겠습니까?',
  defaultValue = '',
  confirmText = '확인',
  cancelText = '취소',
  onClose,
  onConfirm,
}: ChecklistModalProps) {
  const [inputValue, setInputValue] = useState(defaultValue);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleConfirm = () => {
    if (mode === 'edit') {
      const trimmed = inputValue.trim();
      if (trimmed) onConfirm(trimmed);
    } else {
      onConfirm();
    }
    onClose();
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div ref={modalRef} className="relative bg-white rounded-xl shadow-lg p-6 w-[320px]">
        <button
          className="absolute top-3 right-3 p-1 text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          <IconComponent name="close" width={12} height={12} className="cursor-pointer" />
        </button>

        <p className="text-b-15 font-semibold mb-4 text-center">{title}</p>

        {mode === 'edit' && (
          <input
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mb-4"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="변경할 제목 입력"
          />
        )}

        <div className="flex gap-2">
          <CustomButton
            label={cancelText}
            variant="ghost"
            fullWidth
            className="h-10"
            onClick={onClose}
          />
          <CustomButton
            label={confirmText}
            variant="primary"
            fullWidth
            className="h-10"
            onClick={handleConfirm}
          />
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import IconComponent from '@/components/Asset/Icon';

interface InfoModalProps {
  title: string;
  description: string;
  onClose: () => void;
}

export default function InfoModal({ title, description, onClose }: InfoModalProps) {
  return (
    <div
      className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl w-[320px] p-5 shadow-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-semibold text-b-15">{title}</h2>
          <button onClick={onClose}>
            <IconComponent name="close" width={12} height={12} className="cursor-pointer" />
          </button>
        </div>
        <div className="text-gray-800 whitespace-pre-line text-sm">{description}</div>
      </div>
    </div>
  );
}

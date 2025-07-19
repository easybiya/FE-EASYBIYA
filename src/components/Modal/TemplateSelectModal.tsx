import React from 'react';
import CustomButton from '@/components/Button/CustomButton';
import IconComponent from '@/components/Asset/Icon';

interface Props {
  onClose: () => void;
  onCreateNew: () => void;
  onCancel: () => void;
  onNavigate: () => void;
}

export default function TemplateSelectModal({ onClose, onCreateNew, onCancel, onNavigate }: Props) {
  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="relative bg-white rounded-12 w-360 px-24 pt-24 pb-20 shadow-lg">
        <div className="flex justify-between items-center mb-24">
          <h2 className="text-b-16 font-semibold">템플릿 저장</h2>
          <button onClick={onClose}>
            <IconComponent name="close" width={12} height={12} className="cursor-pointer" />
          </button>
        </div>

        <CustomButton
          label="기존 템플릿에 저장"
          variant="secondary"
          size="medium"
          fullWidth
          className="mb-12 justify-between px-16 py-12 rounded-10"
          icon={<IconComponent name="arrowRight" width={12} height={12} className="text-black" />}
          iconPosition="right"
          onClick={() => {
            onClose();
            onNavigate();
          }}
        />

        <CustomButton
          label="새 템플릿"
          variant="secondary"
          size="medium"
          fullWidth
          className="justify-center px-16 py-12 rounded-10"
          icon={<span className="text-base font-bold">+</span>}
          iconPosition="left"
          onClick={() => {
            onClose();
            onCreateNew();
          }}
        />

        <CustomButton
          label="취소"
          variant="primary"
          fullWidth
          className="mt-24 h-44 text-sm font-medium rounded-10"
          onClick={onCancel}
        />
      </div>
    </div>
  );
}

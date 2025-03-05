import { useModalStore } from '@/store/modalStore';
import Input from '../Input';
import IconComponent from '../Asset/Icon';
import CustomButton from '../Button/CustomButton';

export default function Modal() {
  const { isOpen, type, title, description, onConfirm, onCancel, closeModal } = useModalStore();

  if (!isOpen || !type) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={closeModal}
    >
      <div
        className="relative bg-white py-6 px-5 rounded-lg w-80"
        onClick={(e) => e.stopPropagation()}
      >
        {title && <h2 className="text-b-16 text-gray-800 mb-[6px]">{title}</h2>}
        {description && <p className="text-r-14 text-gray-800">{description}</p>}

        {type === 'input' && (
          <div className="flex flex-col gap-7 mt-[22px]">
            <Input placeholder="값을 입력하세요" />
            <button onClick={closeModal} className="absolute right-5 top-6">
              <IconComponent name="close" width={14} height={14} isBtn />
            </button>
            <CustomButton label="저장" fullWidth onClick={onConfirm} />
          </div>
        )}

        {type === 'confirm' && (
          <div className="flex flex-col mt-6">
            <CustomButton label="네" fullWidth onClick={onConfirm} />
            <button
              className="pt-3 flex items-center justify-center text-s-15"
              onClick={onCancel || closeModal}
            >
              아니오
            </button>
          </div>
        )}

        {type === 'info' && (
          <button onClick={closeModal} className="absolute right-5 top-6">
            <IconComponent name="close" width={14} height={14} isBtn />
          </button>
        )}
      </div>
    </div>
  );
}

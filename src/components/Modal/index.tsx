import { createPortal } from 'react-dom';
import { useModalStore } from '@/store/modalStore';
import Input from '../Input';
import IconComponent from '../Asset/Icon';
import CustomButton from '../Button/CustomButton';
import { usePreventScroll } from '@/hooks/usePreventScroll';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { cn } from '@/lib/utils';

export default function Modal() {
  const {
    isOpen,
    type,
    title,
    description,
    defaultValue,
    buttonStyle,
    buttonText,
    onConfirm,
    onCancel,
    closeModal,
  } = useModalStore();
  const [inputValue, setInputValue] = useState(defaultValue || '');
  const router = useRouter();
  usePreventScroll(isOpen);

  useEffect(() => {
    if (isOpen) {
      setInputValue(defaultValue || '');
    }
  }, [isOpen, defaultValue]);

  useEffect(() => {
    if (isOpen) {
      window.history.pushState({ isModalOpen: true }, '', window.location.href);
    }

    const handlePopState = () => {
      closeModal();
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [isOpen, closeModal]);

  useEffect(() => {
    const handleRouteChange = () => {
      closeModal();
    };

    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router, closeModal]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, closeModal]);

  if (!isOpen || !type) return null;

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={closeModal}
    >
      <div
        className="relative bg-white py-6 px-5 rounded-lg w-80"
        onClick={(e) => e.stopPropagation()}
      >
        {title && <h2 className="text-b-16 text-gray-800 mb-[6px] text-center">{title}</h2>}
        {description && <p className="text-r-14 text-gray-800 text-center">{description}</p>}

        {type === 'input' && (
          <div className="flex flex-col gap-7 mt-[22px]">
            <Input
              placeholder="값을 입력하세요"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button onClick={closeModal} className="absolute right-5 top-6">
              <IconComponent name="close" width={14} height={14} isBtn />
            </button>
            <CustomButton label="저장" fullWidth onClick={() => onConfirm?.(inputValue)} />
          </div>
        )}

        {type === 'confirm' && (
          <div className="flex flex-col mt-6">
            <CustomButton
              label={buttonText || '네'}
              fullWidth
              onClick={onConfirm}
              className={buttonStyle}
            />
            <button
              className={cn('pt-3 flex items-center justify-center text-s-15')}
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
    </div>,
    document.body,
  );
}

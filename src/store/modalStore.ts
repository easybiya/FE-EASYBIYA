import { create } from 'zustand';

type ModalType = 'info' | 'input' | 'confirm';

interface ModalState {
  isOpen: boolean;
  type: ModalType | null;
  title?: string;
  description?: string;
  defaultValue?: string;
  onConfirm?: (value?: string) => void;
  onCancel?: () => void;

  openModal: (
    type: ModalType,
    options?: Partial<Omit<ModalState, 'isOpen' | 'openModal' | 'closeModal'>>,
  ) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  type: null,
  title: '',
  description: '',
  defaultValue: '',
  onConfirm: undefined,
  onCancel: undefined,

  openModal: (type, options = {}) => set({ isOpen: true, type, ...options }),

  closeModal: () =>
    set({
      isOpen: false,
      type: null,
      title: '',
      description: '',
      defaultValue: '',
    }),
}));

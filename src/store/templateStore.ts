import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ChecklistTemplate } from '@/types/checklist';

interface TemplateStore {
  templates: ChecklistTemplate[];
  selectedTemplate?: ChecklistTemplate;
  addTemplate: (template: ChecklistTemplate) => void;
  setSelectedTemplate: (template: ChecklistTemplate) => void;
}

export const useTemplateStore = create<TemplateStore>()(
  persist(
    (set) => ({
      templates: [],
      selectedTemplate: undefined,
      addTemplate: (template) =>
        set((state) => ({
          templates: [...state.templates, template],
        })),
      setSelectedTemplate: (template) => set({ selectedTemplate: template }),
    }),
    {
      name: 'template-storage', // 서버 없어서 임시로 로컬 스토리지에 저장해서 확인
    },
  ),
);

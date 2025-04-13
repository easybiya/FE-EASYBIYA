export type ChecklistItemType = {
  id: number;
  label: string;
  type: 'text' | 'radio' | 'checkbox';
  value: string | string[];
  options?: string[];
  hasInfo?: boolean;
};

type CheckType = 'TEXT' | 'RADIO' | 'CHECKBOX';

type ChecklistItem = {
  title: string;
  checkType: CheckType;
  checkItems: string[];
};

export type ChecklistTemplate = {
  name: string;
  checklists: ChecklistItem[];
};

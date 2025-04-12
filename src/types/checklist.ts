export type ChecklistItemType = {
  id: number;
  label: string;
  type: 'text' | 'radio' | 'checkbox';
  value: string | string[];
  options?: string[];
  hasInfo?: boolean;
};

export type CheckType = 'TEXT' | 'RADIO' | 'CHECKBOX';

type ChecklistTemplateItem = {
  title: string;
  checkType: CheckType;
  checkItems: string[];
};

export type CheckItem = {
  description: string;
  checked: boolean;
  priority: number;
};

export type CheckListItem = {
  title: string;
  checkType: CheckType;
  content: string;
  priority: number;
  checkItems: CheckItem[];
};

export type CheckList = CheckListItem[];

export type ChecklistTemplate = {
  name: string;
  checklists: ChecklistTemplateItem[];
};

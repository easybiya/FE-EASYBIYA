export type ChecklistItemType = {
  id: number;
  label: string;
  type: 'text' | 'radio' | 'checkbox';
  value: string | string[];
  options?: string[];
  hasInfo?: boolean;
};

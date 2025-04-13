export interface ChecklistItemType {
  id: number;
  label: string;
  type: 'text' | 'radio' | 'checkbox';
  value: string | string[];
  options?: string[];
  hasInfo?: boolean;
}

export type CheckType = 'TEXT' | 'RADIO' | 'CHECKBOX';

export type ChecklistItem = {
  title: string;
  checkType: CheckType;
  checkItems: string[]; // GET용 간단 구조
};

export type ChecklistTemplate = {
  name: string;
  checklists: ChecklistItem[];
};

// ✅ PUT 요청용 타입 추가
export interface CheckItemPayload {
  description: string;
  checked: boolean;
  priority: number;
}

export interface ChecklistPayloadItem {
  title: string;
  checkType: CheckType;
  priority: number;
  content: string | null;
  checkItems: CheckItemPayload[];
}

// 사용 금지 한번에 정리 예정
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
  checkItems: string[];
};

export type ChecklistTemplate = {
  name: string;
  checklists: ChecklistItem[];
};

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

// 템플릿 관련 새로 추가가
export interface TemplatePreview {
  templateId: number;
  name: string;
}

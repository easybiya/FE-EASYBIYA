import { ChecklistItemType, ChecklistPayloadItem } from '@/types/checklist';

export function toPayload(checklist: ChecklistItemType[]): ChecklistPayloadItem[] {
  return checklist.map((item, index) => ({
    title: item.label,
    checkType: item.type.toUpperCase() as 'TEXT' | 'CHECKBOX' | 'RADIO',
    priority: index + 1,
    content: item.type === 'text' ? (item.value as string) : null,
    checkItems:
      item.type === 'text'
        ? []
        : (item.options?.map((option, i) => ({
            description: option,
            checked:
              item.type === 'checkbox'
                ? Array.isArray(item.value) && item.value.includes(option)
                : item.value === option,
            priority: i + 1,
          })) ?? []),
  }));
}

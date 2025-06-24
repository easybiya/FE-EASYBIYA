import { ChecklistItem, ChecklistPayloadItem } from '@/types/checklist';

const checklistFormatter = (template: ChecklistItem[]): ChecklistPayloadItem[] => {
  return template.map((item, index) => ({
    priority: index + 1,
    title: item.title,
    checkType: item.checkType,
    content: item.checkType === 'TEXT' ? '' : null,
    checkItems:
      item.checkType === 'TEXT'
        ? []
        : item.checkItems.map((desc, idx) => ({
            description: desc,
            checked: item.checkType === 'RADIO' ? idx === 0 : false,
            priority: idx + 1,
          })),
  }));
};

export default checklistFormatter;

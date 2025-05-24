import { ChecklistPayloadItem } from '@/types/checklist';

// 체크리스트 업데이트시 데이터 형식 변환 로직 -> 매물 수정 할때 다시 확인 필요함
export const updateChecklistformat = (
  checklist: ChecklistPayloadItem[],
): ChecklistPayloadItem[] => {
  return checklist.map((item) => ({
    ...item,
    content: item.content ?? null,
    checkItems:
      item.checkItems?.map((option) => ({
        ...option,
      })) ?? [],
  }));
};

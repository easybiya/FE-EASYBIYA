import { checklistInfoMap } from '@/constants/checkListInfo';

export const matchedInfoByTitle = (title: string) => {
  return Object.entries(checklistInfoMap).find(([key]) => key === title)?.[1] ?? '';
};

import { getChecklistTemplate } from '@/lib/api/checklist';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export const useDefaultTemplate = () => {
  const defaultTemplate = useQuery({
    queryKey: ['defaultTemplate'],
    queryFn: () => getChecklistTemplate(),
    placeholderData: keepPreviousData,
  });

  return defaultTemplate.data;
};

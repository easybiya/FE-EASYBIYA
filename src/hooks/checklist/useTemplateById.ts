import { getTemplateById } from '@/lib/api/template';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export const useTemplateById = (id: string) => {
  const template = useQuery({
    queryKey: ['template', id],
    queryFn: () => getTemplateById(id),
    placeholderData: keepPreviousData,
  });

  return template;
};

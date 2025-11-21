import { getTemplateById } from '@/lib/api/template';
import { delay } from '@/utils/delay';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export const useTemplateById = (id: string) => {
  const fetchApi = async () => {
    const data = await getTemplateById(id);
    await delay(300);
    return data;
  };

  const template = useQuery({
    queryKey: ['template', id],
    queryFn: fetchApi,
    placeholderData: keepPreviousData,
  });

  return template;
};

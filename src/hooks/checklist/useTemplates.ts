import { getTemplateList, GetTemplateListParams } from '@/lib/api/checklist';
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import { delay } from '@/utils/delay';

export const useTemplates = (params: GetTemplateListParams) => {
  const fetchApi = async ({ pageParam }: { pageParam: number }) => {
    const data = await getTemplateList({ ...params, page: pageParam });
    await delay(300);
    return data;
  };

  return useInfiniteQuery({
    queryKey: ['templateList'],
    queryFn: fetchApi,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < params.size) return undefined;
      return allPages.length + 1;
    },
    placeholderData: keepPreviousData,
    initialPageParam: 1,
  });
};

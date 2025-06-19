import { getTemplateList, GetTemplateListParams } from '@/lib/api/checklist';
import { keepPreviousData, useInfiniteQuery, useQuery } from '@tanstack/react-query';

export const useTemplates = (params: GetTemplateListParams) => {
  return useInfiniteQuery({
    queryKey: ['templateList'],
    queryFn: ({ pageParam }) => getTemplateList({ ...params, page: pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < params.size) return undefined;
      return allPages.length + 1;
    },
    placeholderData: keepPreviousData,
    initialPageParam: 1,
  });
};

import { getSharedPropertyChecklist, getSharedPropertyDetail } from '@/lib/api/property';
import { useQuery } from '@tanstack/react-query';

export const useSharedPropertyDetail = (id: string) => {
  const propertyDetailQuery = useQuery({
    queryKey: ['sharedPropertyDetail', id],
    queryFn: () => getSharedPropertyDetail(id),
    enabled: !!id, // id가 있을 때만 쿼리 실행
    staleTime: 1000 * 60 * 5, // 5분 동안 캐시 유지
  });

  const checklistQuery = useQuery({
    queryKey: ['sharedChecklist', id],
    queryFn: () => getSharedPropertyChecklist(id),
    enabled: !!id, // id가 있을 때만 쿼리 실행
    staleTime: 1000 * 60 * 5, // 5분 동안 캐시 유지
  });

  return {
    propertyDetail: propertyDetailQuery.data,
    propertyChecklist: checklistQuery.data ?? [],
    isLoading: propertyDetailQuery.isLoading || checklistQuery.isLoading,
  };
};

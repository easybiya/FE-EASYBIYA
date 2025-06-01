import { getPropertyChecklistById } from '@/lib/api/checklist';
import { getPropertyById } from '@/lib/api/property';
import { useQuery } from '@tanstack/react-query';

export const usePropertyDetail = (id?: string) => {
  const propertyDetailQuery = useQuery({
    queryKey: ['propertyDetail', id],
    queryFn: () => getPropertyById(id!),
    enabled: !!id, // id가 있을 때만 쿼리 실행
    staleTime: 1000 * 60 * 5, // 5분 동안 캐시 유지
  });

  const checklistQuery = useQuery({
    queryKey: ['checklist', id],
    queryFn: () => getPropertyChecklistById(id!),
    enabled: !!id, // id가 있을 때만 쿼리 실행
    staleTime: 1000 * 60 * 5, // 5분 동안 캐시 유지
  });

  return {
    propertyDetail: propertyDetailQuery.data,
    propertyChecklist: checklistQuery.data ?? [],
  };
};

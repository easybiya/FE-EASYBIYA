import { getPropertyChecklistById } from '@/lib/api/checklist';
import { getPropertyById } from '@/lib/api/property';
import { useQuery } from '@tanstack/react-query';
import { delay } from '@/utils/delay';

export const usePropertyDetail = (id: string) => {
  const propertyDetailQuery = useQuery({
    queryKey: ['propertyDetail', id],
    queryFn: async () => {
      const data = await getPropertyById(id);
      await delay(300); // ← 딜레이 추가
      return data;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });

  const checklistQuery = useQuery({
    queryKey: ['checklist', id],
    queryFn: async () => {
      const data = await getPropertyChecklistById(id);
      await delay(300); // ← 딜레이 추가
      return data;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });

  return {
    propertyDetail: propertyDetailQuery.data,
    propertyChecklist: checklistQuery.data ?? [],
    isLoading: propertyDetailQuery.isLoading || checklistQuery.isLoading,
  };
};

import { getPropertyById } from '@/lib/api/property';
import { useQuery } from '@tanstack/react-query';
import { delay } from '@/utils/delay';
import { ChecklistPayloadItem } from '@/types/checklist';

export const usePropertyDetail = (id: string) => {
  const data = useQuery({
    queryKey: ['property-detail', id],
    queryFn: async () => {
      const data = await getPropertyById(id);
      await delay(300); // ← 딜레이 추가
      return data;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });

  return {
    propertyDetail: data.data,
    propertyChecklist: (data.data?.checklist as unknown as ChecklistPayloadItem[]) ?? [],
    isLoading: data.isLoading,
  };
};

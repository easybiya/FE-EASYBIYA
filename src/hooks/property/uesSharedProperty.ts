import { getSharedPropertyList } from '@/lib/api/property';
import { useQuery } from '@tanstack/react-query';

export const useSharedProperty = (id: string[]) => {
  return useQuery({
    queryKey: ['sharedProperty', id],
    queryFn: () => getSharedPropertyList(id),
    enabled: id.length > 0,
  });
};

import { getTotalCount } from '@/lib/api/property';
import { useQuery } from '@tanstack/react-query';

export const useTotalCount = () => {
  return useQuery({
    queryKey: ['total-count'],
    queryFn: getTotalCount,
  });
};

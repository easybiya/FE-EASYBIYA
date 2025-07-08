import { getMapPropertyList } from '@/lib/api/property';
import { useQuery } from '@tanstack/react-query';

export const useMapProperty = () => {
  return useQuery({
    queryKey: ['mapProperty'],
    queryFn: () => getMapPropertyList(),
  });
};

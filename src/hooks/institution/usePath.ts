import { Institution, MapProperty } from '@/types';
import { searchPubTransPathAJAX } from '@/utils/searchPath';
import { useQuery } from '@tanstack/react-query';

const STABLE_TIME_DAY = 1000 * 60 * 60 * 24;

const usePath = (property: MapProperty, institution: Institution) => {
  return useQuery({
    queryKey: [institution.institutionAddress, property.address],
    queryFn: async () => {
      const result = await searchPubTransPathAJAX({
        sx: String(property.lng),
        sy: String(property.lat),
        ex: String(institution.institutionLongitude),
        ey: String(institution.institutionLatitude),
      });
      if (!result) throw new Error('경로를 불러오지 못했습니다.');
      return result;
    },
    staleTime: STABLE_TIME_DAY,
    enabled: !!institution && !!property,
  });
};

export default usePath;

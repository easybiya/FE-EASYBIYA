import { Institution, MapProperty } from '@/types';
import { searchPubTransPathAJAX } from '@/utils/searchPath';
import { useQuery } from '@tanstack/react-query';
import { Result } from '@/types/odsay';

const STABLE_TIME_DAY = 1000 * 60 * 60 * 24;

const usePath = (property:MapProperty,institution:Institution)=>{
  return useQuery({
      queryKey: [institution.institutionAddress, property.address],
      queryFn: async () => {
        const result: Result = await searchPubTransPathAJAX({
          sx: String(property.lng),
          sy: String(property.lat),
          ex: String(institution.institutionLongitude),
          ey: String(institution.institutionLatitude),
        });
        return result.path[0];
      },
      staleTime: STABLE_TIME_DAY,
      enabled: !!institution && !!property,
    });
}

export default usePath
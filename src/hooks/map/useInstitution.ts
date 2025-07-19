import { getInstitutions } from '@/lib/api/institutuion';
import { useQuery } from '@tanstack/react-query';

export const useInstitution = () => {
  const institution = useQuery({
    queryKey: ['institution'],
    queryFn: () => getInstitutions(),
  });

  return {
    institution: institution.data,
    isLoading: institution.isLoading,
  };
};

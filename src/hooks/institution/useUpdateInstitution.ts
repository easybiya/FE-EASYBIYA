import { updateInstitution } from '@/lib/api/institutuion';
import { Institution } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';

const useUpdateInstitution = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: Institution) => updateInstitution(body),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['institution'] });

      toast({
        title: '위치 정보가 업데이트되었습니다.',
        variant: 'success',
      });
    },

    onError: () => {
      toast({
        title: '위치 정보 업데이트에 실패했습니다',
        variant: 'fail',
      });
    },
  });
};

export default useUpdateInstitution;

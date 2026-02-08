import { deleteProperty } from '@/lib/api/property';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';

const useDeleteProperty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await deleteProperty(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmarked-property'] });
      queryClient.invalidateQueries({ queryKey: ['property-list'] });

      toast({
        title: '매물이 삭제되었습니다.',
        variant: 'success',
      });
    },
    onError: (error) => {
      console.error(error);
      toast({
        title: '매물 삭제에 실패했습니다.',
        variant: 'fail',
      });
    },
  });
};

export default useDeleteProperty;

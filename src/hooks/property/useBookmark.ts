import { toggleBookmark } from '@/lib/api/property';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '../use-toast';

const useBookmark = (isFixed?: boolean) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => toggleBookmark(id, !isFixed),
    onSuccess: (_, id) => {
      if (isFixed) {
        toast({ title: '고정 해제되었습니다.', variant: 'success' });
      } else {
        toast({ title: '상단으로 고정되었습니다.', variant: 'success' });
      }
      queryClient.invalidateQueries({ queryKey: ['bookmarked-property'] });
      queryClient.invalidateQueries({ queryKey: ['property-list'] });
      queryClient.invalidateQueries({ queryKey: ['property-detail', id] });
    },
    onError: () => {
      toast({ title: '작업 중 오류가 발생했습니다.', variant: 'fail' });
    },
  });
};

export default useBookmark;

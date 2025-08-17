import { toggleBookmark } from '@/lib/api/property';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '../use-toast';

const useBookmark = (isFixed?: boolean) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => toggleBookmark(id),
    onSuccess: (_, id) => {
      if (isFixed) {
        toast({ title: '북마크를 해제했습니다.', variant: 'success' });
      } else {
        toast({ title: '북마크를 설정했습니다.', variant: 'success' });
      }
      queryClient.invalidateQueries({ queryKey: ['bookmarkedProperty'] });
      queryClient.invalidateQueries({ queryKey: ['propertyList'] });
      queryClient.invalidateQueries({ queryKey: ['propertyDetail', id] });
    },
    onError: () => {
      toast({ title: '북마크 처리 중 오류가 발생했습니다.', variant: 'fail' });
    },
  });
};

export default useBookmark;

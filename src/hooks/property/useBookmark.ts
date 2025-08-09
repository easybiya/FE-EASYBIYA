import { toggleBookmark } from '@/lib/api/property';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '../use-toast';

const useBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => toggleBookmark(id),
    onSuccess: (data, id) => {
      toast({ title: data.message, variant: 'success' });

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

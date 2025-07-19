import { toggleBookmark } from '@/lib/api/property';
import { useToastStore } from '@/store/toastStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useBookmark = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToastStore();

  return useMutation({
    mutationFn: (id: string) => toggleBookmark(id),
    onSuccess: (data, id) => {
      showToast(data.message, 'success');

      queryClient.invalidateQueries({ queryKey: ['bookmarkedProperty'] });
      queryClient.invalidateQueries({ queryKey: ['propertyList'] });
      queryClient.invalidateQueries({ queryKey: ['propertyDetail', id] });
    },
    onError: () => {
      showToast('북마크 처리 중 오류가 발생했습니다.', 'error');
    },
  });
};

export default useBookmark;

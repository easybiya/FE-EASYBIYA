import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ChecklistPayloadItem } from '@/types/checklist';
import { updateChecklist } from '@/lib/api/checklist';
import { toast } from '../use-toast';

const useUpdateChecklist = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (checklist: ChecklistPayloadItem[]) => {
      await updateChecklist(id, checklist);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['property-detail', id] });
      queryClient.invalidateQueries({ queryKey: ['checklist', id] });
      toast({ title: '체크리스트가 수정되었습니다.', variant: 'success' });
    },
  });
};

export default useUpdateChecklist;

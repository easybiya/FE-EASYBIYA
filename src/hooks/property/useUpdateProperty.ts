import { supabase } from '@/lib/supabaseClient';
import { updateProperty } from '@/lib/api/property';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { usePropertyStore } from '@/store/usePropertyStore';
import { PropertyInsert } from '@/types';
import { Json } from '../../../database.types';
import { ChecklistPayloadItem } from '@/types/checklist';

const useUpdateProperty = (id: string) => {
  const { property, resetAll } = usePropertyStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (checklist: ChecklistPayloadItem[]) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error('로그인이 필요합니다');

      const payload: PropertyInsert = {
        ...property,
        user_id: user.id,
        bookmarked: false,
        checklist: checklist as unknown as Json,
      };

      await updateProperty(id, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['propertyDetail', id] });
      queryClient.invalidateQueries({ queryKey: ['checklist', id] });
      resetAll();
    },
  });
};

export default useUpdateProperty;

import { supabase } from '@/lib/supabaseClient';
import { postProperty, uploadImagesToStorage } from '@/lib/api/property';
import { useMutation } from '@tanstack/react-query';
import { usePropertyStore } from '@/store/usePropertyStore';
import { PropertyInsert } from '@/types';
import { Json } from '../../../database.types';
import { ChecklistPayloadItem } from '@/types/checklist';

const useCreateProperty = () => {
  const { property, images, resetAll } = usePropertyStore();

  return useMutation({
    mutationFn: async (checklist: ChecklistPayloadItem[]) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error('로그인이 필요합니다');

      const imageUrls = await uploadImagesToStorage(images, user.id);
      const formatType = imageUrls.map((url) => ({ imageUrl: url }));

      const payload: PropertyInsert = {
        ...property,
        user_id: user.id,
        bookmarked: false,
        checklist: checklist as unknown as Json,
        images: formatType,
      };

      await postProperty(payload);

      resetAll();
    },
  });
};

export default useCreateProperty;

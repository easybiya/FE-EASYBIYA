import { supabase } from '@/lib/supabaseClient';
import { updatePropertyImage, uploadImagesToStorage } from '@/lib/api/property';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PropertyImage } from '@/types';
import { toast } from '../use-toast';
import { useRouter } from 'next/router';

const useUpdateImage = (id: string) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (images: PropertyImage[]) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error('로그인이 필요합니다');
      const existingImages = images.filter((item) => !item.file);
      const newFiles = images.filter((item) => item.file).map((item) => item.file!);

      const uploadedUrls = await uploadImagesToStorage(newFiles, user.id);

      const newImageData: PropertyImage[] = uploadedUrls.map((url) => ({
        imageUrl: url,
      }));

      const finalImages = [...existingImages, ...newImageData];
      await updatePropertyImage(id, finalImages);
    },
    onSuccess: () => {
      toast({ title: '사진이 성공적으로 업데이트되었습니다.', variant: 'success' });
      router.push(`/details/${id}`);
      queryClient.invalidateQueries({ queryKey: ['property-detail', id] });
    },
  });
};

export default useUpdateImage;

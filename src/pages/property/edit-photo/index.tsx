import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { getPropertyById, updatePropertyImages } from '@/lib/api/property';
import Header from '@/components/Layout/Header';
import { PropertyImage } from '@/types';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import PlusIcon from '@/public/icons/plus.svg?react';
import CloseIcon from '@/public/icons/close.svg?react';
import { Button } from '@/components/ui/button';
import CustomButton from '@/components/Button/CustomButton';

interface PropertyImageWithFiel extends PropertyImage {
  file?: File;
}

export default function EditPhotoPage() {
  const searchParams = useSearchParams();
  const propertyId = searchParams.get('propertyId');
  const router = useRouter();
  const queryClient = useQueryClient();
  const [existingImages, setExistingImages] = useState<PropertyImageWithFiel[]>([]);
  const [originalImages, setOriginalImages] = useState<PropertyImage[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files).slice(0, 8 - existingImages.length); // 최대 8장 제한

      // 미리보기용 URL 저장
      const imageUrls: PropertyImage[] = fileArray.map((file, idx) => ({
        imageId: idx * 1000 + Date.now(),
        imageUrl: URL.createObjectURL(file),
        priority: existingImages.length + idx,
        file,
      }));
      setExistingImages((prev) => [...prev, ...imageUrls]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
    // 상태에서는 삭제하지 않아도 됨
  };

  const updateImages = async () => {
    if (!propertyId) return;
    const formData = new FormData();

    const propertyImageIds = existingImages.map((img) => {
      const original = originalImages.find((ori) => ori.imageId === img.imageId);
      return original?.imageId ?? null;
    });

    const newImages = existingImages.filter((item) => !!item.file).map((item) => item.file as File);

    const json = JSON.stringify({ propertyImageIds });

    formData.append(
      'request',
      new Blob([json], { type: 'application/json' }), // ★ 여기 중요
    );

    newImages.forEach((img) => formData.append('images', img));

    await updatePropertyImages(propertyId, formData);
    await queryClient.invalidateQueries({ queryKey: ['propertyDetail', propertyId] });
    toast({ title: '사진이 성공적으로 업데이트되었습니다.', variant: 'success' });
    router.push(`/details/${propertyId}`);
  };

  useEffect(() => {
    const getPropertyData = async () => {
      if (!propertyId) return;
      const data = await getPropertyById(propertyId);
      setExistingImages(data.propertyImages);
      setOriginalImages(data.propertyImages);
    };
    getPropertyData();
  }, [propertyId]);

  return (
    <div className="h-screen bg-[#F6F5F2] flex flex-col">
      <Header
        left={
          <button className="text-15 font-semibold" type="button" onClick={() => router.back()}>
            취소
          </button>
        }
        title="사진 수정"
        right={
          <CustomButton
            label="저장"
            onClick={updateImages}
            size="small"
            className="rounded-full px-12 py-2 h-full"
          />
        }
      />
      <div className="flex-grow flex flex-col items-center pt-32 px-16">
        {existingImages.length === 0 ? (
          <label
            className="w-full px-20 py-10 border gap-4 border-gray-300 bg-white rounded-lg flex justify-center items-center cursor-pointer shadow-sm hover:bg-gray-100 transition"
            onClick={() => fileInputRef.current?.click()}
          >
            <PlusIcon name="plus" width={16} height={16} className="text-gray-500 cursor-pointer" />
            <p className="text-15 text-gray-900 font-semibold">사진 추가</p>
          </label>
        ) : (
          <>
            <div className="grid grid-cols-3 gap-12 w-full max-w-md">
              {existingImages.map((image, index) => (
                <div key={index} className="relative w-full aspect-square bg-gray-100 rounded-lg">
                  <Image
                    src={image.imageUrl}
                    fill
                    alt={`Uploaded ${index}`}
                    className="w-full h-full object-cover rounded-lg border border-gray-300"
                  />
                  <button
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-8 right-6"
                  >
                    <CloseIcon name="close" width={12} height={12} className="cursor-pointer" />
                  </button>
                </div>
              ))}
            </div>

            {existingImages.length < 8 && (
              <div className="w-full max-w-md mt-16">
                <Button
                  variant="secondary"
                  className="cursor-pointer w-full bg-white border-1 border-gray-300!"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="flex gap-4 items-center font-semibold">
                    <PlusIcon width={16} height={16} />
                    사진 추가
                  </div>
                </Button>
              </div>
            )}
          </>
        )}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        className="hidden"
        multiple
        onChange={handleImageUpload}
      />
    </div>
  );
}

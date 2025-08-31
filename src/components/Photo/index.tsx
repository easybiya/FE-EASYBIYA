import { useState, useRef, Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import FixedBar from '@/components/FixedBar';
import { usePropertyStore } from '@/store/usePropertyStore';
import PlusIcon from '@/public/icons/plus.svg?react';
import CloseIcon from '@/public/icons/close.svg?react';
import { Button } from '../ui/button';

interface Props {
  setStep: Dispatch<SetStateAction<number>>;
}

export default function PhotoForm({ setStep }: Props) {
  const { setImages } = usePropertyStore();

  // 미리보기용 URL
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files).slice(0, 8 - previewImages.length); // 최대 8장 제한

      setImages(fileArray);

      // 미리보기용 URL 저장
      const imageUrls = fileArray.map((file) => URL.createObjectURL(file));
      setPreviewImages((prev) => [...prev, ...imageUrls]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
    // 상태에서는 삭제하지 않아도 됨
  };

  const goToChecklist = () => {
    setStep(4);
  };

  return (
    <>
      <div className="flex-grow flex flex-col items-center pt-32">
        {previewImages.length === 0 ? (
          <label
            className="w-full h-160 p-24 border border-gray-300 bg-white rounded-lg flex flex-col justify-center items-center cursor-pointer shadow-sm hover:bg-gray-100 transition"
            onClick={() => fileInputRef.current?.click()}
          >
            <PlusIcon name="plus" width={24} height={24} className="cursor-pointer" />
            <p className="text-b-16 mt-8 text-gray-900">집 사진 추가</p>
            <p className="text-r-14 text-gray-500 mt-4">거실, 욕실, 부엌 등</p>
          </label>
        ) : (
          <>
            <div className="grid grid-cols-3 gap-3 w-full max-w-md">
              {previewImages.map((image, index) => (
                <div key={index} className="relative w-full aspect-square bg-gray-100 rounded-lg">
                  <Image
                    src={image}
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

            {previewImages.length < 8 && (
              <div className="w-full max-w-md mt-4">
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
      <FixedBar
        disabled={previewImages.length === 0}
        handleSkip={() => setStep(4)}
        onClick={goToChecklist}
        preventSkip={false}
        text="다음"
      />
    </>
  );
}

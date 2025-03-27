import { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import HeaderWithProgress from '@/components/Layout/HeaderWithProgress';
import CustomButton from '@/components/Button/CustomButton';
import IconComponent from '@/components/Asset/Icon';
import FixedBar from '@/components/FixedBar';

export default function AddPhotoPage() {
  const [images, setImages] = useState<string[]>([]);
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).slice(0, 8);
      const imageUrls = newImages.map((file) => URL.createObjectURL(file));
      setImages((prev) => [...prev, ...imageUrls]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const goToChecklist = () => {
    router.push('/checklist');
  };

  return (
    <div className="px-4 h-screen bg-[#F6F5F2] flex flex-col">
      <div className="pt-10">
        <HeaderWithProgress title="사진 등록" totalSteps={4} />
      </div>

      <div className="flex-grow flex flex-col items-center pt-8">
        {images.length === 0 ? (
          <label
            className="w-full h-40 p-6 border border-gray-300 bg-white rounded-lg flex flex-col justify-center items-center cursor-pointer shadow-sm hover:bg-gray-100 transition"
            onClick={() => fileInputRef.current?.click()}
          >
            <IconComponent
              name="plus"
              width={24}
              height={24}
              className="text-gray-500 cursor-pointer"
            />
            <p className="text-b-16 mt-2 text-gray-900">집 사진 추가</p>
            <p className="text-r-14 text-gray-500 mt-1">거실, 욕실, 부엌 등</p>
          </label>
        ) : (
          <>
            <div className="grid grid-cols-3 gap-3 w-full max-w-md">
              {images.map((image, index) => (
                <div key={index} className="relative w-full aspect-square bg-gray-100 rounded-lg">
                  <img
                    src={image}
                    alt={`Uploaded ${index}`}
                    className="w-full h-full object-cover rounded-lg border border-gray-300"
                  />

                  <button
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-1 right-1 bg-white p-1 rounded-full shadow-md"
                  >
                    <IconComponent name="close" width={12} height={12} className="cursor-pointer" />
                  </button>
                </div>
              ))}
            </div>

            {images.length < 8 && (
              <div className="w-full max-w-md mt-4">
                <CustomButton
                  label="+ 사진 추가"
                  variant="secondary"
                  fullWidth
                  className="cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                />
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
        disabled={images.length === 0}
        skipRoute="/create/checklist"
        onClick={goToChecklist}
      />
    </div>
  );
}

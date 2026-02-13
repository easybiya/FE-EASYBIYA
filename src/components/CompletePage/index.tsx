import CustomButton from '@/components/Button/CustomButton';
import CheckIcon from '@/public/icons/big-check.svg?react';
import { usePropertyStore } from '@/store/usePropertyStore';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function ChecklistComplete() {
  const router = useRouter();
  const { resetAll } = usePropertyStore();

  useEffect(() => {
    resetAll();
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center h-full text-center bg-[#F6F5F2]">
      <div className="flex items-center justify-center mb-16">
        <CheckIcon width={80} height={80} />
      </div>
      <p className="text-b-24 mb-24">작성 완료</p>

      <div className="absolute bottom-24 w-full px-16">
        <CustomButton label="홈으로" variant="primary" fullWidth onClick={() => router.push('/')} />
      </div>
    </div>
  );
}

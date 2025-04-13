import IconComponent from '@/components/Asset/Icon';
import CustomButton from '@/components/Button/CustomButton';
import { useRouter } from 'next/router';

export default function ChecklistComplete() {
  const router = useRouter();

  return (
    <div className="relative flex flex-col items-center justify-center h-full text-center bg-[#F6F5F2]">
      <div className="flex items-center justify-center mb-4">
        <IconComponent name="bigCheck" width={80} height={80} />
      </div>
      <p className="text-b-24 mb-6">작성 완료</p>

      <div className="absolute bottom-6 w-full px-4">
        <CustomButton label="홈으로" variant="primary" fullWidth onClick={() => router.push('/')} />
      </div>
    </div>
  );
}

import { useRouter } from 'next/router';
import IconComponent from '@/components/Asset/Icon';
import ProgressIndicator from '@/components/CheckList/ProgressIndicator';

interface HeaderWithProgressProps {
  title: string;
  totalSteps: number;
  step: number;
}

export default function HeaderWithProgress({ title, totalSteps, step }: HeaderWithProgressProps) {
  const router = useRouter();

  return (
    <div className="w-full">
      <div className="relative flex items-center justify-center py-8">
        <IconComponent
          name="arrowLeft"
          width={24}
          height={24}
          className="absolute left-0 cursor-pointer"
          onClick={() => router.back()}
        />
        <h1 className="text-b-18 text-center">{title}</h1>
      </div>

      <ProgressIndicator totalSteps={totalSteps} step={step} />
    </div>
  );
}

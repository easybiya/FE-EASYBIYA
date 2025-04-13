import { useRouter } from 'next/router';
import IconComponent from '@/components/Asset/Icon';
import ProgressIndicator from '@/components/CheckList/ProgressIndicator';

interface HeaderWithProgressProps {
  title: string;
  totalSteps: number;
}

const previousRouteMap: { [key: string]: string } = {
  '/create/checklist': '/create/add-photo',
  '/create/add-photo': '/create/room-address',
  '/create/room-address': '/create/room-info',
};

export default function HeaderWithProgress({ title, totalSteps }: HeaderWithProgressProps) {
  const router = useRouter();

  const handleBack = () => {
    const currentPath = router.pathname;
    const prevPath = previousRouteMap[currentPath];

    if (prevPath) {
      router.push(prevPath);
    } else {
      router.back(); 
    }
  };

  return (
    <div className="w-full">
      <div className="relative flex items-center justify-center py-2">
        <IconComponent
          name="arrowLeft"
          width={24}
          height={24}
          className="absolute left-0 cursor-pointer"
          onClick={handleBack}
        />
        <h1 className="text-b-18 text-center">{title}</h1>
      </div>

      <ProgressIndicator totalSteps={totalSteps} />
    </div>
  );
}

import { useRouter } from 'next/router';
import IconComponent from '@/components/Asset/Icon';
import ProgressIndicator from '@/components/CheckList/ProgressIndicator';
import { useSearchParams } from 'next/navigation';

interface HeaderWithProgressProps {
  title: string;
}

export default function HeaderWithProgress({ title }: HeaderWithProgressProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isEdit = searchParams.get('mode') === 'edit';
  const queryString = searchParams.toString();
  const totalSteps = isEdit ? 3 : 4;

  const previousRouteMap: { [key: string]: string } = {
    '/property/checklist': '/property/add-photo',
    '/property/add-photo': '/property/room-address',
    '/property/room-address': '/property/room-info',
    '/property/room-info': '/',
  };

  const handleBack = () => {
    const currentPath = router.pathname;
    const prevPath = previousRouteMap[currentPath];

    if (prevPath) {
      const url = isEdit ? `${prevPath}?${queryString}` : prevPath;
      router.push(url);
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

      <ProgressIndicator totalSteps={totalSteps} isEdit={isEdit} />
    </div>
  );
}

import { Institution, MapProperty } from '@/types';
import IconComponent from '../Asset/Icon';
import { useRouter } from 'next/navigation';
import CreateInstitutionButton from './CreateInstitutionButton';

interface Props {
  institution?: Institution | null;
  handleTagClick: (item: MapProperty) => Promise<void>;
}

export function RoomContainer({ institution, handleTagClick }: Props) {
  const router = useRouter();

  return (
    <ul className="flex gap-2.5 flex-col w-full">
      {institution ? (
        <div
          onClick={() =>
            handleTagClick({
              id: 0,
              propertyName: institution.institutionName,
              propertyAddress: institution.institutionAddress,
              propertyDetailedAddress: '',
              propertyLatitude: institution.institutionLatitude,
              propertyLongitude: institution.institutionLongitude,
            })
          }
          className={`px-2.5 py-1.5 w-full rounded-sm cursor-pointer text-[14px] bg-white leading-tight flex justify-between mb-2.5`}
        >
          <div className="flex gap-1.5 ">
            <p className="font-bold text-brownText">{institution.institutionName}</p>
            <p className="text-gray-700">{institution.institutionAddress}</p>
          </div>
          <IconComponent
            name="pencil"
            width={16}
            height={16}
            alt="수정 아이콘"
            onClick={() => router.push('/property/institution')}
            className="cursor-pointer"
          />
        </div>
      ) : (
        <CreateInstitutionButton />
      )}
    </ul>
  );
}

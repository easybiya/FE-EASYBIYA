import { Institution, MapProperty } from '@/types';
import { useRouter } from 'next/navigation';
import CreateInstitutionButton from './CreateInstitutionButton';
import EditIcon from '@/public/icons/pencil.svg?react';

interface Props {
  institution?: Institution;
  handleTagClick: (item: MapProperty) => Promise<void>;
  isLoading?: boolean;
}

export function RoomContainer({ institution, handleTagClick, isLoading }: Props) {
  const router = useRouter();

  if (isLoading) {
    return null;
  }

  return (
    <ul className="flex gap-10 flex-col w-full">
      {!institution ? (
        <CreateInstitutionButton />
      ) : (
        <div
          onClick={() =>
            handleTagClick({
              id: 0,
              name: institution.institutionName,
              address: institution.institutionAddress,
              address_detail: '',
              lat: institution.institutionLatitude,
              lng: institution.institutionLongitude,
            })
          }
          className={`px-10 py-6 w-full rounded-sm cursor-pointer text-14 bg-white leading-tight flex justify-between mb-10`}
        >
          <div className="flex gap-6">
            <p className="font-bold text-brownText">{institution.institutionName}</p>
            <p className="text-gray-700">{institution.institutionAddress}</p>
          </div>
          <EditIcon
            width={16}
            height={16}
            onClick={(e) => {
              e.stopPropagation();
              router.push('/property/institution');
            }}
            className="cursor-pointer"
          />
        </div>
      )}
    </ul>
  );
}

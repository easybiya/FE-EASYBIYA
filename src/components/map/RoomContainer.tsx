import { Institution, Property } from '@/types';
import IconComponent from '../Asset/Icon';
import { useRouter } from 'next/navigation';

interface Props {
  roomList: Property[];
  institution: Institution;
  handleTagClick: (address: string, name: string) => Promise<void>;
}

export function RoomContainer({ roomList, institution, handleTagClick }: Props) {
  const router = useRouter();

  return (
    <ul className="flex gap-2.5 flex-col w-full">
      <div
        onClick={() => handleTagClick(institution.institutionAddress, institution.institutionName)}
        className={`px-2.5 py-1.5 w-full rounded-sm cursor-pointer text-[14px] bg-white leading-tight flex justify-between mb-2.5`}
      >
        <div className="flex gap-1.5">
          <p className="font-bold">{institution.institutionName}</p>
          <p>{institution.institutionAddress}</p>
        </div>
        <IconComponent
          name="pencil"
          width={16}
          height={16}
          alt="수정 아이콘"
          onClick={() => router.push('/create/institution')}
          className="cursor-pointer"
        />
      </div>
      {roomList.map((item) => (
        <li key={item.id} className="flex gap-[6px] items-center">
          <div
            onClick={() => handleTagClick(item.propertyAddress, item.propertyName)}
            className={`px-[6px] py-[2px] rounded-sm border border-black cursor-pointer w-fit text-[12px] bg-black text-white font-semibold leading-tight`}
          >
            {item.propertyName}
          </div>
          <p className="text-sm">{item.propertyAddress}</p>
        </li>
      ))}
    </ul>
  );
}

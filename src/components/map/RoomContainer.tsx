import { Property } from '@/types';

interface Props {
  roomList: Property[];
  handleTagClick: (item: Property) => Promise<void>;
}

export function RoomContainer({ roomList, handleTagClick }: Props) {
  return (
    <ul className="flex gap-[10px] flex-col w-full">
      {roomList.map((item) => (
        <li key={item.id} className="flex gap-[6px] items-center">
          <div
            onClick={() => handleTagClick(item)}
            className={`px-[6px] py-[2px] rounded-sm border border-black cursor-pointer w-fit text-[12px] bg-black text-white font-semibold leading-tight`}
          >
            {item.propertyName}
          </div>
          <p className="text-[15px]">100미터</p>
        </li>
      ))}
    </ul>
  );
}

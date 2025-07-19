import { MapProperty } from '@/types';
import { useState } from 'react';
import IconComponent from '../Asset/Icon';

interface Props {
  roomList?: MapProperty[];
  handleTagClick: (item: MapProperty) => Promise<void>;
}

export default function RoomFloatButton({ roomList, handleTagClick }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClickTag = (item: MapProperty) => {
    setIsOpen(false);
    handleTagClick(item);
  };
  return (
    <div className="z-30 w-full flex flex-col items-center">
      <div
        className="absolute px-16 py-8 rounded-full border-2 bottom-44 border-black bg-white flex items-center gap-6 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <IconComponent width={16} height={16} name="hamburger" />
        <p className="font-semibold text-gray-800">목록보기</p>
      </div>
      {isOpen && (
        <div className="absolute bottom-0 bg-white w-full flex flex-col p-20 pb-0 gap-12 rounded-t-xl border border-gray-300">
          <div className="flex justify-between items-center h-24">
            <p className="font-semibold text-base">목록</p>
            <IconComponent
              name="close"
              width={10}
              height={10}
              onClick={() => setIsOpen(false)}
              className="cursor-pointer"
            />
          </div>
          <ul className="gap-6 flex flex-col max-h-186 overflow-y-auto pb-20">
            {roomList?.map((item) => (
              <li
                onClick={() => handleClickTag(item)}
                key={item.id}
                className="flex gap-6 items-center px-8 py-11 rounded-lg border-gray-300 border cursor-pointer"
              >
                <div
                  className={`px-6 py-2 rounded-full border border-black  w-fit text-12 bg-black text-white font-semibold leading-tight`}
                >
                  {item.propertyName}
                </div>
                <p className="text-sm font-semibold">{item.propertyAddress}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

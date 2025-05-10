import { Property } from '@/types';
import { useState } from 'react';
import IconComponent from '../Asset/Icon';

interface Props {
  roomList: Property[];
  handleTagClick: (address: string, name: string) => Promise<void>;
}

export default function RoomFloatButton({ roomList, handleTagClick }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClickTag = (address: string, name: string) => {
    setIsOpen(false);
    handleTagClick(address, name);
  };
  return (
    <div className="z-30 w-full flex flex-col items-center">
      <div
        className="absolute px-4 py-2 rounded-full border-2 bottom-11 border-black bg-white flex items-center gap-1.5 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <IconComponent width={16} height={16} name="hamburger" />
        <p className="font-semibold text-gray-800">목록보기</p>
      </div>
      {isOpen && (
        <div className="absolute bottom-0 bg-white w-full flex flex-col p-5 pb-0 gap-3 rounded-t-xl border border-gray-300">
          <div className="flex justify-between items-center h-6">
            <p className="font-semibold text-base">목록</p>
            <IconComponent
              name="close"
              width={10}
              height={10}
              onClick={() => setIsOpen(false)}
              className="cursor-pointer"
            />
          </div>
          <ul className="gap-1.5 flex flex-col max-h-[186px] overflow-y-auto pb-5">
            {roomList.map((item) => (
              <li
                onClick={() => handleClickTag(item.propertyAddress, item.propertyName)}
                key={item.id}
                className="flex gap-[6px] items-center px-2 py-[11px] rounded-lg border-gray-300 border cursor-pointer"
              >
                <div
                  className={`px-[6px] py-[2px] rounded-full border border-black  w-fit text-[12px] bg-black text-white font-semibold leading-tight`}
                >
                  {item.propertyName}
                </div>
                <p className="text-sm font-semibold ">{item.propertyAddress}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

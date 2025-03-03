import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

interface Props {
  onClick?: () => void;
  list: string[];
}

export default function Dropdown({ list }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button type="button" onClick={() => setIsOpen(!isOpen)}>
        <Image src="/icons/DropDownIcon.svg" alt="드롭다운아이콘" width={20} height={20} />
      </button>
      {isOpen && (
        <ul className="flex flex-col p-3 gap-1 absolute right-0 w-28 bg-white items-center shadow-md rounded-md">
          {list.map((item, index) => (
            <li key={index} className="w-full">
              <button type="button" className="p-3 w-full hover:bg-gray-100 rounded-md text-nowrap">
                {item}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

import { useState, useRef, useEffect } from 'react';
import IconComponent from '../Asset/Icon';

interface DropdownProps {
  options: string[];
  selectedOption?: string;
  onSelect?: (option: string) => void;
  type: 'meatball' | 'select';
}

export default function Dropdown({ options, selectedOption, onSelect, type }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

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
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div>
        {type === 'meatball' ? (
          <button
            type="button"
            onClick={toggleDropdown}
            className="flex items-center justify-center w-8 h-8 rounded-[4px] hover:bg-gray-100 focus:outline-none"
          >
            <IconComponent name="meatball" width={24} height={24} isBtn />
          </button>
        ) : (
          <button
            type="button"
            onClick={toggleDropdown}
            className="flex justify-center items-center pl-4 pr-2 py-2 text-r-14 rounded-md border border-gray-300 text-gray-800 bg-white hover:bg-gray-100 focus:outline-none"
          >
            {selectedOption || 'Select an option'}
            <IconComponent name={isOpen ? 'arrowUp' : 'arrowDown'} width={24} height={24} isBtn />
          </button>
        )}
      </div>

      {isOpen && (
        <div className="z-20 origin-top-right mt-1 absolute right-0 min-w-[156px] max-w-[220px] rounded-[4px] shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="p-1">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => {
                  if (onSelect) {
                    onSelect(option);
                  }
                  setIsOpen(false);
                }}
                className="w-full p-2 rounded-[4px] text-r-14 text-left text-gray-700 hover:bg-gray-100"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

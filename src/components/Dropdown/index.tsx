import { useState, useRef, useEffect } from 'react';
import IconComponent from '../Asset/Icon';
import { AnimatePresence, motion } from 'framer-motion';

export type DropdownOption = {
  label: string;
  value: string;
};

interface DropdownProps {
  options: DropdownOption[];
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
            onClick={(e) => {
              e.preventDefault();
              toggleDropdown();
            }}
            className="flex items-center justify-center rounded-4 hover:bg-gray-100 focus:outline-none"
          >
            <IconComponent name="meatball" width={24} height={24} isBtn />
          </button>
        ) : (
          <button
            type="button"
            onClick={toggleDropdown}
            className="flex justify-center items-center pl-16 pr-10 py-4 text-r-14 rounded-md border border-gray-300 text-gray-800 bg-white hover:bg-gray-100 focus:outline-none"
          >
            {selectedOption || 'Select an option'}
            <IconComponent
              name={isOpen ? 'arrowUp' : 'arrowDown'}
              width={16}
              height={16}
              isBtn
              className="pl-4"
            />
          </button>
        )}
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="z-20 origin-top-right mt-4 absolute right-0 min-w-156 max-w-220 rounded-4 shadow-lg bg-white ring-1 ring-black ring-opacity-5"
          >
            <div className="p-4">
              {options.map((option, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.preventDefault();
                    if (onSelect) {
                      onSelect(option.value);
                    }
                    setIsOpen(false);
                  }}
                  className="w-full p-8 rounded-4 text-r-14 text-left text-gray-800 hover:bg-secondary"
                >
                  {option.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

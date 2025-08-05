import { useState } from 'react';
import IconComponent from '../Asset/Icon';
import DefaultDropdownLayout from './DropdownLayout';
import { DROPDOWN_OPTION } from '@/pages';

interface Props {
  handleClick: (option: string) => void;
  params: { page: number; size: number; sortBy: string };
}

export default function SortDropdown({ handleClick, params }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DefaultDropdownLayout
      dropdownItems={DROPDOWN_OPTION}
      handleSelect={(item) => handleClick(item.key)}
      open={isOpen}
      onOpenChange={setIsOpen}
      contentClassName="text-14/21"
    >
      <button
        type="button"
        className="flex justify-center items-center pl-10 pr-8 py-4 gap-4 text-12/18 rounded-md border border-gray-300 text-gray-800 bg-white hover:bg-gray-100 focus:outline-none"
      >
        {DROPDOWN_OPTION.find((item) => item.value === params.sortBy)?.value || '최신순'}
        <IconComponent
          name={'arrowUp'}
          width={16}
          height={16}
          isBtn
          className={`transition ease-out ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
    </DefaultDropdownLayout>
  );
}

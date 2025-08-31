import CheckItemIcon from '@/public/icons/add-list-check.svg?react';
import RadioItemIcon from '@/public/icons/add-list-radio.svg?react';
import TextItemIcon from '@/public/icons/add-list-text.svg?react';

interface ChecklistAddButtonProps {
  label: string;
  iconName: 'addListCheck' | 'addListRadio' | 'addListText';
  onClick?: () => void;
}

export default function ChecklistAddButton({ label, iconName, onClick }: ChecklistAddButtonProps) {
  const renderIcon = () => {
    switch (iconName) {
      case 'addListCheck':
        return <CheckItemIcon width={16} height={16} />;
      case 'addListRadio':
        return <RadioItemIcon width={16} height={16} />;
      case 'addListText':
        return <TextItemIcon width={16} height={16} />;
      default:
        return null;
    }
  };

  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center w-full h-80 border border-gray-300 rounded-lg bg-white shadow-sm gap-8 
        hover:bg-gray-100 hover:border-gray-500 transition"
    >
      <span className="text-r-14">{label}</span>
      {renderIcon()}
    </button>
  );
}

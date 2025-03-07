import IconComponent from '@/components/Asset/Icon';

interface ChecklistAddButtonProps {
  label: string;
  iconName: 'addListCheck' | 'addListRadio' | 'addListText';
}

export default function ChecklistAddButton({ label, iconName }: ChecklistAddButtonProps) {
  return (
    <button className="flex flex-col items-center justify-center w-full h-20 border border-gray-300 rounded-lg bg-white shadow-sm gap-2">
      <span className="text-r-14">{label}</span>
      <IconComponent name={iconName} width={16} height={16} className="text-black" />
    </button>
  );
}

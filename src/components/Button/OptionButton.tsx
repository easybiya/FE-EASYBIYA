interface OptionButtonProps {
  isSelected?: boolean;
  subtext?: string;
  children: React.ReactNode;
}

export default function OptionButton({ isSelected, subtext, children }: OptionButtonProps) {
  return (
    <button
      className={`w-full min-h-10 max-h-[52px] px-3 py-2 rounded-md border h-auto flex flex-col items-center justify-center ${
        isSelected ? 'border-gray-800' : 'border-gray-300'
      } bg-white hover:bg-gray-100 text-gray-800 text-[15px]`}
    >
      {children}
      {subtext && <div className="text-[11px] text-gray-500">{subtext}</div>}
    </button>
  );
}

interface OptionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isSelected?: boolean;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export default function OptionButton({ isSelected, children, icon, ...props }: OptionButtonProps) {
  return (
    <button
      className={`w-full min-h-10 rounded-md border h-auto flex flex-col items-center justify-center ${
        isSelected ? 'border-gray-800' : 'border-gray-300'
      } ${
        icon ? 'gap-[6px] p-3 pb-4' : 'px-3 py-2'
      } bg-white hover:bg-gray-100 text-gray-800 text-r-15`}
      {...props}
    >
      {children}
      {icon}
    </button>
  );
}

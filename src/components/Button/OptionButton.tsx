interface OptionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isSelected?: boolean;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export default function OptionButton({ isSelected, children, icon, ...props }: OptionButtonProps) {
  return (
    <button
      type="button"
      className={`w-full min-h-40 rounded-md border h-auto flex flex-col items-center justify-center ${
        isSelected ? 'border-gray-800' : 'border-gray-300'
      } ${
        icon ? 'gap-6 p-12 pb-16' : 'px-12 py-8'
      } bg-white hover:bg-gray-100 text-gray-800 text-r-15`}
      {...props}
    >
      {children}
      {icon}
    </button>
  );
}

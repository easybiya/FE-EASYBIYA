interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({ icon, onChange, ...props }: InputProps) {
  return (
    <div className="w-full h-40 px-8 py-4 border border-solid border-gray-300 rounded-4 flex items-center bg-white">
      <input
        onChange={onChange}
        className="flex-1 px-8 py-4 text-r-15 text-gray-800 outline-none bg-transparent w-full"
        {...props}
      />
      {icon && <div className="ml-2">{icon}</div>}
    </div>
  );
}

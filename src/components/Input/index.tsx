interface InputProps {
  placeholder?: string;
  type?: 'text' | 'number';
  icon?: React.ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({ placeholder, type = 'text', icon, onChange }: InputProps) {
  return (
    <div className="w-full h-[40px] px-2 py-1 border border-solid border-gray-300 rounded-[4px] flex items-center bg-white">
      <input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        className="flex-1 px-2 py-1 text-r-15 text-gray-800 outline-none bg-transparent"
      />
      {icon && <div className="ml-2">{icon}</div>}
    </div>
  );
}

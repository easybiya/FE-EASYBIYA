import { cn } from '@/lib/utils';
import clsx from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export default function Input({ icon, onChange, className, ...props }: InputProps) {
  return (
    <div className="w-full h-40 px-8 py-4 border border-solid border-gray-300 rounded-4 flex items-center bg-white">
      <input
        onChange={onChange}
        className={clsx(
          'flex-1 px-8 py-4 text-r-15 text-gray-800 outline-none bg-transparent w-full',
          className,
        )}
        {...props}
      />
      {icon && <div className="ml-2">{icon}</div>}
    </div>
  );
}

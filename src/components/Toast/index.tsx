import { useToastStore } from '@/store/toastStore';
import IconComponent from '../Asset/Icon';

export default function Toast() {
  const { isVisible, message, type } = useToastStore();

  if (!isVisible) return null;

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-[6px] py-2 px-6 rounded-md bg-gray-800 animate-fadeIn">
      <IconComponent
        name={type === 'success' ? 'toastSuccess' : 'toastError'}
        width={16}
        height={16}
      />
      <span className="text-sm text-white">{message}</span>
    </div>
  );
}

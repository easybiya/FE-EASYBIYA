import { useToastStore } from '@/store/toastStore';
import IconComponent from '../Asset/Icon';

export default function Toast() {
  const { isVisible, message, type } = useToastStore();

  if (!isVisible) return null;

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-6 py-8 px-24 rounded-md bg-gray-800 animate-fadeIn">
      <IconComponent
        name={type === 'success' ? 'toastSuccess' : 'toastError'}
        width={16}
        height={16}
      />
      <span className="text-r-14 text-white">{message}</span>
    </div>
  );
}

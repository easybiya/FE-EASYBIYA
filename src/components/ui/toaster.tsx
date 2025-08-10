import { Toast, ToastProvider, ToastTitle, ToastViewport } from '@/components/ui/toast';
import { useToast } from '@/hooks/use-toast';
import { SwitchCase } from './SwitchCase';
import IconComponent from '../Asset/Icon';

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider duration={2000}>
      {toasts.map(function ({ id, title, action, variant, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="flex items-center gap-6">
              <SwitchCase
                value={variant ?? ''}
                caseBy={{
                  success: <IconComponent name={'toastSuccess'} width={16} height={16} />,
                  fail: <IconComponent name={'toastError'} width={16} height={16} />,
                }}
              />
              {title && <ToastTitle>{title}</ToastTitle>}
            </div>
            {action}
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}

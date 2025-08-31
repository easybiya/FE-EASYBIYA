import { Toast, ToastProvider, ToastTitle, ToastViewport } from '@/components/ui/toast';
import { useToast } from '@/hooks/use-toast';
import { SwitchCase } from './SwitchCase';
import ToastSuccessIcon from '@/public/icons/toast-success.svg?react';
import ToastErrorIcon from '@/public/icons/toast-error.svg?react';

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider duration={2000}>
      {toasts.map(function ({ id, title, action, variant, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="flex items-center gap-6">
              <div className="size-16">
                <SwitchCase
                  value={variant ?? ''}
                  caseBy={{
                    success: <ToastSuccessIcon name={'toastSuccess'} width={16} height={16} />,
                    fail: <ToastErrorIcon name={'toastError'} width={16} height={16} />,
                  }}
                />
              </div>
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

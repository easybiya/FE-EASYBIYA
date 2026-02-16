import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import CustomButton from '../Button/CustomButton';

interface Props {
  trigger: React.ReactNode;
  title: string;
  description?: string;
  buttonText?: string;
  buttonStyle?: string;
  handleSubmit: () => void;
}

export function ConfirmModal({
  trigger,
  title,
  description,
  buttonText,
  buttonStyle,
  handleSubmit,
}: Props) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent className="max-w-320 flex flex-col gap-24">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center text-16/24">{title}</AlertDialogTitle>
          <AlertDialogDescription className="text-center text-14/24">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-col gap-12">
          <AlertDialogAction asChild>
            <CustomButton
              label={buttonText || '네'}
              fullWidth
              onClick={handleSubmit}
              className={buttonStyle}
            />
          </AlertDialogAction>
          <AlertDialogCancel className="text-14/20">아니오</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

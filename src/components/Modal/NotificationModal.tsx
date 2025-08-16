import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Dispatch } from 'react';

interface Props {
  trigger: React.ReactNode;
  open?: boolean;
  openChange?: Dispatch<React.SetStateAction<boolean>>;
  title: string;
  desscription: string[];
}

export function NotificationModal({ trigger, openChange, open, title, desscription }: Props) {
  return (
    <Dialog open={open} onOpenChange={openChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-320">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="text-gray-800 text-14/20 pl-20">
            <ul className="list-disc">
              {desscription.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

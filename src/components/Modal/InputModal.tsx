import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Input from '../Input';
import CustomButton from '../Button/CustomButton';
import { Dispatch, useEffect, useState } from 'react';

interface Props {
  trigger: React.ReactNode;
  title: string;
  handleClick: (value: string) => void;
  defaultValue?: string;
  open?: boolean;
  openChange?: Dispatch<React.SetStateAction<boolean>>;
}

export function InputModal({ trigger, title, handleClick, defaultValue, open, openChange }: Props) {
  const [isOpen, setIsOpen] = useState(open);
  const [inputValue, setInputValue] = useState('');
  const haneldSubmit = () => {
    handleClick(inputValue);
    setIsOpen(false);
    openChange && openChange(false);
  };

  useEffect(() => {
    setInputValue(defaultValue || '');
  }, [defaultValue]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-320 flex flex-col gap-28">
        <DialogHeader>
          <DialogClose />
          <DialogTitle className="">{title}</DialogTitle>
          <DialogDescription hidden />
        </DialogHeader>
        <Input
          placeholder="값을 입력하세요"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <DialogFooter>
          <CustomButton label="저장" fullWidth onClick={haneldSubmit} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

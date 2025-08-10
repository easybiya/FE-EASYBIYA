import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '../ui/dropdown-menu';

type Props = {
  children: React.ReactNode;
  trigger: React.ReactNode;
  open?: boolean;
  onOpenChange?: (v: boolean) => void;
};

const DialogDropdownLayout = ({ children, trigger, open, onOpenChange }: Props) => {
  return (
    <DropdownMenu open={open} onOpenChange={onOpenChange} modal={false}>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent
        sideOffset={8}
        align="end"
        className="w-full p-8 rounded-4 text-r-14 text-left text-gray-800"
      >
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DialogDropdownLayout;

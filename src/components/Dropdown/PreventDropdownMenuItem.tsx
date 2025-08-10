import { forwardRef, Ref } from 'react';
import { DropdownMenuItemProps } from '@radix-ui/react-dropdown-menu';
import { DropdownMenuItem } from '../ui/dropdown-menu';
import { cn } from '@/lib/utils';

type Props = DropdownMenuItemProps & {
  handleClickItem?: () => void;
};

const PreventDropdownMenuItem = forwardRef(function PreventDropdownMenuItem(
  { handleClickItem, className, ...props }: Props,
  ref: Ref<HTMLDivElement>,
) {
  const handleClick = (e: Event) => {
    e.preventDefault();
    handleClickItem && handleClickItem();
  };
  return (
    <DropdownMenuItem
      ref={ref}
      onSelect={handleClick}
      className={cn('gap-8 [&>svg]:shrink-0 text-14/21 text-nowrap capitalize', className)}
      {...props}
    ></DropdownMenuItem>
  );
});

export default PreventDropdownMenuItem;

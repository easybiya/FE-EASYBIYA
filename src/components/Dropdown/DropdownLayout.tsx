import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

// 드롭다운 공통 데이터 타입입니다.
type DropdownItem<T extends string> = {
  key: T; // key값의 타입을 제네릭으로 그대로 사용하는 드롭다운이 많아서 제네릭 적용해두었습니다.
  value: string;
  classNames?: string;
};

type Props<T extends string> = {
  dropdownItems: DropdownItem<T>[];
  contentClassName?: string;
  itemClassName?: string;
  children: React.ReactNode;
  align?: 'start' | 'center' | 'end';
  open?: boolean; // 드롭다운 open 상태
  onOpenChange?: (v: boolean) => void; // 드롭다운 open 상태 변경 함수
  handleSelect?: (v: DropdownItem<T>) => void; // 커스텀 아이템이 아닌, 일반 목록 클릭 이벤트
};

const DefaultDropdownLayout = <T extends string>({
  dropdownItems,
  contentClassName,
  itemClassName,
  children,
  align = 'end',
  handleSelect,
  open,
  onOpenChange,
}: Props<T>) => {
  return (
    <DropdownMenu open={open} onOpenChange={onOpenChange} modal={false}>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>

      <DropdownMenuContent
        onClick={(e) => e.stopPropagation()}
        align={align}
        sideOffset={8}
        className={cn('rounded-5 z-50 w-full bg-white p-4', contentClassName)}
      >
        {dropdownItems.map((item) => (
          <div key={item.key}>
            <DropdownMenuItem
              key={item.key}
              className={cn(
                'w-full p-8 rounded-4 text-r-14 text-left text-gray-800 hover:bg-secondary',
                item.classNames,
                itemClassName,
              )}
              onSelect={() => handleSelect && handleSelect(item)}
            >
              <div className="flex flex-col gap-4">{item.value}</div>
            </DropdownMenuItem>
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DefaultDropdownLayout;

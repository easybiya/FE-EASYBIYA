import Link from 'next/link';
import Button from '../Button/CustomButton';

interface Props {
  disabled: boolean;
  skipRoute: string;
  preventSkip: boolean;
  onClick?: () => void;
}

export default function FixedBar({ disabled, skipRoute, onClick, preventSkip }: Props) {
  return (
    <div className="flex flex-col items-center w-full bg-primary fixed bottom-0 left-1/2 max-w-[428px] -translate-x-1/2 z-10">
      <div className="absolute -top-10 left-0 w-full h-10 bg-gradient-to-b from-transparent to-primary" />
      <div className="w-full p-5 flex flex-col items-center gap-2">
        <Button disabled={disabled} label="완료" className="w-full" onClick={onClick} />
        {!preventSkip && (
          <Link href={skipRoute} className="py-3 text-[15px] text-gray-800 font-semibold">
            건너 뛰기
          </Link>
        )}
      </div>
    </div>
  );
}

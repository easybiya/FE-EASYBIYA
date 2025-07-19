import Link from 'next/link';
import Button from '../Button/CustomButton';

interface Props {
  disabled: boolean;
  skipRoute: string;
  preventSkip: boolean;
  onClick?: () => void;
  text: string;
}

export default function FixedBar({ disabled, skipRoute, onClick, preventSkip, text }: Props) {
  return (
    <div className="flex flex-col items-center w-full bg-primary fixed bottom-0 left-1/2 max-w-428 -translate-x-1/2 z-10">
      <div className="absolute -top-40 left-0 w-full h-40 bg-gradient-to-b from-transparent to-primary" />
      <div className="w-full p-20 flex flex-col items-center gap-8">
        <Button disabled={disabled} label={text} className="w-full" onClick={onClick} />
        {!preventSkip && (
          <Link href={skipRoute} className="py-12 text-15 text-gray-800 font-semibold">
            건너 뛰기
          </Link>
        )}
      </div>
    </div>
  );
}

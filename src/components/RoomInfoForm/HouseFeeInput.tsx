import { FeeType } from '@/types';
import Input from '../Input';

interface Props {
  type: FeeType;
  text: string;
}

export default function HouseFeeInput({ type, text }: Props) {
  return (
    <div className="flex gap-4 text-nowrap items-center w-full">
      <p className="min-w-[41px]">{text}</p>
      {type === 'DEPOSIT' && (
        <div className="flex items-center gap-1">
          <div className="w-[60px]">
            <Input placeholder="000" />
          </div>
          <p>억</p>
        </div>
      )}
      <div className="flex items-center gap-1 w-full">
        <Input placeholder="0000" />
        만원
      </div>
    </div>
  );
}

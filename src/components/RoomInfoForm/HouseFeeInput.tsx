import { FeeType } from '@/types';
import Input from '../Input';

interface Props {
  type: FeeType;
  text: string;
  onChange: (fee: string) => void;
}

export default function HouseFeeInput({ type, text, onChange }: Props) {
  return (
    <div className="flex gap-4 text-nowrap items-center justify-between w-full">
      <p className="min-w-[41px]">{text}</p>
      <div className="flex gap-2 w-fit">
        {type === 'DEPOSIT' && (
          <div className="flex items-center gap-1">
            <div className="w-[60px]">
              <Input type="number" placeholder="000" />
            </div>
            <p>억</p>
          </div>
        )}
        <div className="flex items-center gap-1">
          <div className="w-24 text-right">
            <Input placeholder="0000" onChange={(e) => onChange(e.target.value)} />
          </div>
          만원
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { FeeType } from '@/types';
import Input from '../Input';

interface Props {
  type: FeeType;
  text: string;
  value?: number | null;
  onChange: (fee: number | undefined) => void;
}

export default function HouseFeeInput({ type, text, value, onChange }: Props) {
  const [billion, setBillion] = useState<number | undefined>();
  const [million, setMillion] = useState<number | undefined>();

  useEffect(() => {
    if (value !== null && value !== undefined) {
      setBillion(Math.floor(value / 100_000_000));
      setMillion(Math.floor((value % 100_000_000) / 10_000));
    } else {
      setBillion(undefined);
      setMillion(undefined);
    }
  }, [value]);

  const handleBillionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newBillion = e.target.value ? Number(e.target.value) : undefined;
    setBillion(newBillion);
    onChange((newBillion ?? 0) * 100_000_000 + (million ?? 0) * 10_000);
  };

  const handleMillionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMillion = e.target.value ? Number(e.target.value) : undefined;
    setMillion(newMillion);
    onChange((billion ?? 0) * 100_000_000 + (newMillion ?? 0) * 10_000);
  };

  return (
    <div className="flex gap-4 text-nowrap items-center justify-between w-full text-[14px]">
      <p className="min-w-[41px]">{text}</p>
      <div className="flex gap-2">
        {type === 'DEPOSIT' && (
          <div className="flex items-center gap-1">
            <div className="w-[60px]">
              <Input
                type="number"
                placeholder="0"
                max={999}
                value={billion ?? ''}
                onChange={handleBillionChange}
              />
            </div>
            <p>억</p>
          </div>
        )}
        <div className="flex items-center gap-1">
          <div className="w-24 text-right">
            <Input
              max={9999}
              type="number"
              placeholder="0000"
              value={million ?? ''}
              onChange={handleMillionChange}
            />
          </div>
          만원
        </div>
      </div>
    </div>
  );
}

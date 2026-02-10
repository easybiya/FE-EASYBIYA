import { LeaseType } from '@/types';
import OptionButton from '../Button/OptionButton';

type SelectOption = {
  value: LeaseType;
  text: string;
};

const HOUSE_TYPE_SELECT: SelectOption[] = [
  { value: 'jeonse', text: '전세' },
  { value: 'half_jeonse', text: '반전세' },
  { value: 'monthly_rent', text: '월세' },
];

interface Props {
  handleClick: (type: LeaseType) => void;
  value: LeaseType;
}

export default function HouseTypeSelectContainer({ handleClick, value }: Props) {
  return (
    <div className="flex gap-8">
      {HOUSE_TYPE_SELECT.map((item) => (
        <OptionButton
          key={item.value}
          onClick={() => handleClick(item.value)}
          isSelected={value === item.value}
        >
          {item.text}
        </OptionButton>
      ))}
    </div>
  );
}

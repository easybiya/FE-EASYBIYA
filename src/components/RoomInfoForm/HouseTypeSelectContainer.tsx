import { HouseType } from '@/types';
import OptionButton from '../Button/OptionButton';

type SelectOption = {
  value: HouseType;
  text: string;
};

const HOUSE_TYPE_SELECT: SelectOption[] = [
  { value: 'JEONSE', text: '전세' },
  { value: 'BANJEONSE', text: '반전세' },
  { value: 'MONTHLY_RENT', text: '월세' },
];

interface Props {
  handleClick: (type: HouseType) => void;
  value: HouseType;
}

export default function HouseTypeSelectContainer({ handleClick, value }: Props) {
  return (
    <div className="flex gap-2">
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

import OptionButton from '@/components/Button/OptionButton';
import Dropdown from '@/components/Dropdown';
import Input from '@/components/Input';
import { useToastStore } from '@/store/toastStore';
import React, { useState } from 'react';

const colors = [
  {
    name: 'violet',
    shades: {
      100: '#EDE7F6',
      200: '#D1C4E9',
      300: '#B39DDB',
      400: '#7E57C2',
      500: '#5E35B1',
      600: '#4527A0',
      700: '#311B92',
      800: '#240D63',
      900: '#1E0E4B',
    },
  },
  {
    name: 'gray',
    shades: {
      100: '#F5F5F5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#828282',
      600: '#4F4F4F',
      700: '#333333',
      800: '#1F1F1F',
      900: '#121212',
    },
  },
  {
    name: 'red',
    shades: { 100: '#FFEBEE', 400: '#EF9A9A', 500: '#EF5350', 600: '#E53935', 900: '#600000' },
  },
  {
    name: 'green',
    shades: { 100: '#E8F5E9', 400: '#81C784', 500: '#4CAF50', 600: '#43A047', 900: '#003300' },
  },
];

const Index = () => {
  const [selectedOption, setSelectedOption] = useState<string>('최신 순');
  const options = ['최신 순', '입주 빠른 순'];
  const { showToast } = useToastStore();

  return (
    <>
      <div className="p-8 grid grid-cols-4 gap-6">
        {colors.map(({ name, shades }) => (
          <div key={name}>
            <h2 className="text-2xl font-bold mb-4">{name}</h2>
            {Object.entries(shades).map(([shade, hex]) => (
              <div key={shade} className="mb-2 flex items-center">
                <div className="w-16 h-8 rounded" style={{ backgroundColor: hex }}></div>
                <span className="ml-4 text-sm">
                  {name}-{shade}
                </span>
                <span className="ml-2 text-xs text-gray-600">{hex}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="flex gap-2 px-5">
        <OptionButton>전세</OptionButton>
        <OptionButton isSelected>반전세</OptionButton>
        <OptionButton>월세</OptionButton>
      </div>
      <div className="flex gap-2 px-5">
        <OptionButton isSelected subtext="중복 선택">
          체크리스트
        </OptionButton>
        <OptionButton subtext="단일 선택">체크리스트</OptionButton>
        <OptionButton>텍스트</OptionButton>
      </div>
      <div className="px-5">
        <Input placeholder="입력하세요" />
      </div>
      <div className="w-full flex justify-end">
        <Dropdown
          options={options}
          selectedOption={selectedOption}
          onSelect={setSelectedOption}
          type="select"
        />
      </div>
      <div className="w-full flex justify-end">
        <Dropdown options={options} onSelect={setSelectedOption} type="meatball" />
      </div>
      <div className="p-8">
        <button
          onClick={() => showToast('성공했습니다!', 'success')}
          className="px-4 py-2 bg-green-500 text-white rounded-lg"
        >
          성공 토스트
        </button>
        <button
          onClick={() => showToast('에러가 발생했습니다!', 'error')}
          className="ml-4 px-4 py-2 bg-red-500 text-white rounded-lg"
        >
          에러 토스트
        </button>
      </div>
    </>
  );
};

export default Index;

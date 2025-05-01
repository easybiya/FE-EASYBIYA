import HouseCard from '@/components/DashBoard/HouseCard';
import Dropdown from '@/components/Dropdown';
import { mockHouserData } from '@/data/mockHouseData';
import { Property } from '@/types';
import { useEffect, useState } from 'react';

const DROPDOWN_OPTION = ['최신순', '입주 빠른 순'];

export default function Home() {
  const [fixedList, setFixedList] = useState<Property[]>([]);
  const [propertyList, setPropertyList] = useState<Property[]>([]);

  const addFixedList = (id: number) => {
    console.log('add', id);
  };

  const deleteFixedList = (id: number) => {
    console.log('delete', id);
  };

  useEffect(() => {
    const bookmarkData = mockHouserData.filter((item) => item.isBookmarked); // 북마크 데이터
    const normalData = mockHouserData.filter((item) => !item.isBookmarked); // 일반 데이터
    setFixedList(bookmarkData);
    setPropertyList(normalData);
  }, []);

  return (
    <div className="flex flex-col px-5 py-2 gap-2 mb-20">
      <div className="flex w-full justify-between items-center">
        <p className="text-gray-500 text-[14px]">전체 {mockHouserData.length}</p>
        <Dropdown options={DROPDOWN_OPTION} type="select" selectedOption="최신순" />
      </div>
      <ul className="flex flex-col gap-4">
        {fixedList.map((item) => (
          <li key={item.id}>
            <HouseCard info={item} onAdd={addFixedList} onDelete={deleteFixedList} isFixed />
          </li>
        ))}
        {propertyList.map((item) => (
          <li key={item.id}>
            <HouseCard
              info={item}
              onAdd={addFixedList}
              onDelete={deleteFixedList}
              isFixed={false}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

import HouseCard from '@/components/DashBoard/HouseCard';
import Dropdown from '@/components/Dropdown';
import { mockHouserData } from '@/data/mockHouseData';
import { Property } from '@/types';
import { useEffect, useState } from 'react';

const DROPDOWN_OPTION = ['최신순', '입주 빠른 순'];

export default function Home() {
  const [fixedList, setFixedList] = useState<number[]>([]);
  const [propertyList, setPropertyList] = useState<Property[]>([]);

  const fixedItems = propertyList.filter((item) => fixedList.includes(item.id)); // 고정된 리스트
  const nonFixedItems = propertyList.filter((item) => !fixedList.includes(item.id)); // 고정되지 않은 리스트

  const deleteFixedList = (id: number) => {
    setFixedList((prev) => [...prev, id]);
    const localData = localStorage.getItem('property');
    let existingData: number[] = [];
    if (localData) {
      existingData = JSON.parse(localData);
      const newList = existingData.filter((item) => item !== id);
      setFixedList(newList);
      localStorage.setItem('property', JSON.stringify(newList));
    }
  };

  const addFixedList = (id: number) => {
    const localData = localStorage.getItem('property');
    let existingData: number[] = [];
    if (localData) {
      existingData = JSON.parse(localData);
      const addList = [...existingData, id];
      localStorage.setItem('property', JSON.stringify(addList));
    } else {
      const addList = [id];
      localStorage.setItem('property', JSON.stringify(addList));
    }
    setFixedList((prev) => [...prev, id]);
  };

  useEffect(() => {
    const localData = localStorage.getItem('property');
    let storedIds: number[] = [];
    if (localData) {
      storedIds = JSON.parse(localData);
      if (storedIds.length > 0) {
        setFixedList(storedIds);
      }
    }
  }, []);

  useEffect(() => {
    setPropertyList(mockHouserData);
  }, []);

  return (
    <div className="flex flex-col px-5 py-2 gap-2">
      <div className="flex w-full justify-between items-center">
        <p className="text-gray-500 text-[14px]">전체 {mockHouserData.length}</p>
        <Dropdown options={DROPDOWN_OPTION} type="select" selectedOption="최신순" />
      </div>
      <ul className="flex flex-col gap-4">
        {fixedItems.map((item) => (
          <li key={item.id}>
            <HouseCard info={item} onAdd={addFixedList} onDelete={deleteFixedList} isFixed />
          </li>
        ))}
        {nonFixedItems.map((item) => (
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

import HouseCard from '@/components/DashBoard/HouseCard';
import Dropdown from '@/components/Dropdown';
import { mockHouserData } from '@/data/mockHouseData';
import { getBookmarkedPropertyList, getNonBookmarkedPropertyList } from '@/lib/api/property';
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
    const fetchData = async () => {
      const bookmarkedData = await getBookmarkedPropertyList();
      const notBookmarkedData = await getNonBookmarkedPropertyList({
        page: 1,
        size: 10,
        sortBy: 'LATEST',
      });
      setFixedList(bookmarkedData);
      setPropertyList(notBookmarkedData);
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col px-5 py-2 gap-2 mb-20">
      <div className="flex w-full justify-between items-center">
        <p className="text-gray-500 text-[14px]">전체 {mockHouserData.length}</p>
        <Dropdown options={DROPDOWN_OPTION} type="select" selectedOption="최신순" />
      </div>
      {fixedList.length === 0 && propertyList.length === 0 && (
        <div className="text-gray-400 text-center py-4">등록한 매물이 없습니다.</div>
      )}

      <ul className="flex flex-col gap-4">
        {fixedList.length > 0 &&
          fixedList.map((item) => (
            <li key={item.id}>
              <HouseCard info={item} onAdd={addFixedList} onDelete={deleteFixedList} isFixed />
            </li>
          ))}

        {propertyList.length > 0 &&
          propertyList.map((item) => (
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

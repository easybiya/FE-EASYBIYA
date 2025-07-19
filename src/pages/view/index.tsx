import HouseCard from '@/components/DashBoard/HouseCard';
import Dropdown from '@/components/Dropdown';
import Header from '@/components/Layout/Header';
import { mockHouserData } from '@/data/mockHouseData';
import { Property } from '@/types';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const DROPDOWN_OPTION = [
  { label: '최신순', value: 'createdAt' },
  { label: '입주 빠른 순', value: 'availableDate' },
];

export default function Home() {
  const searchParams = useSearchParams();
  const ids = searchParams.get('ids');
  const [propertyList, setPropertyList] = useState<Property[]>([]);

  useEffect(() => {
    if (!ids) return;
    const idArray = ids.split(',').map((id) => id.trim());
    const filteredData = idArray
      .map((id) => mockHouserData.find((item) => item.id === Number(id)))
      .filter((item): item is Property => item !== undefined);
    setPropertyList(filteredData);
  }, [ids]);

  return (
    <div className="flex flex-col px-20 py-8 gap-8 mb-80">
      <Header title="공유받은 매물" />

      <div className="flex w-full justify-between items-center">
        <p className="text-gray-500 text-14">전체 {propertyList.length}</p>
        <Dropdown options={DROPDOWN_OPTION} type="select" selectedOption="최신순" />
      </div>
      <ul className="flex flex-col gap-16">
        {propertyList.map((item) => (
          <li key={item.id}>
            <HouseCard info={item} isShared />
          </li>
        ))}
      </ul>
    </div>
  );
}

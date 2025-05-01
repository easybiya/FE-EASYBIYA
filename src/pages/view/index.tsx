import HouseCard from '@/components/DashBoard/HouseCard';
import Dropdown from '@/components/Dropdown';
import Header from '@/components/Layout/Header';
import { mockHouserData } from '@/data/mockHouseData';
import { Property } from '@/types';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const DROPDOWN_OPTION = ['최신순', '입주 빠른 순'];

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
    <div className="flex flex-col px-5 py-2 gap-2 mb-20">
      <Header type={7} title="공유받은 매물" />

      <div className="flex w-full justify-between items-center">
        <p className="text-gray-500 text-[14px]">전체 {propertyList.length}</p>
        <Dropdown options={DROPDOWN_OPTION} type="select" selectedOption="최신순" />
      </div>
      <ul className="flex flex-col gap-4">
        {propertyList.map((item) => (
          <li key={item.id}>
            <HouseCard info={item} isShared />
          </li>
        ))}
      </ul>
    </div>
  );
}

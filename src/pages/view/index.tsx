import HouseCard from '@/components/DashBoard/HouseCard';
import SortDropdown from '@/components/Dropdown/SortDropdown';
import Header from '@/components/Layout/Header';
import { mockHouserData } from '@/data/mockHouseData';
import { useDispatch } from '@/hooks/property/useDispatch';
import { Property } from '@/types';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home() {
  const searchParams = useSearchParams();
  const ids = searchParams.get('ids');
  const [propertyList, setPropertyList] = useState<Property[]>([]);
  const { params } = useDispatch();

  useEffect(() => {
    if (!ids) return;
    const idArray = ids.split(',').map((id) => id.trim());
    const filteredData = idArray
      .map((id) => mockHouserData.find((item) => item.id === Number(id)))
      .filter((item): item is Property => item !== undefined);
    setPropertyList(filteredData);
  }, [ids]);

  const handleSelect = (option: string) => {
    console.log(option);
  };

  return (
    <div className="flex flex-col px-20 py-8 gap-8 mb-80">
      <Header title="공유받은 매물" />

      <div className="flex w-full justify-between items-center">
        <p className="text-gray-500 text-14">전체 {propertyList.length}</p>
        <SortDropdown handleClick={handleSelect} params={params} />
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

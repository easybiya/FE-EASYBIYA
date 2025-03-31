import HouseCard from '@/components/DashBoard/HouseCard';
import Dropdown from '@/components/Dropdown';
import { mockHouserData } from '@/data/mockHouseData';

const DROPDOWN_OPTION = ['최신순', '입주 빠른 순'];

export default function Home() {
  return (
    <div className="flex flex-col px-5 py-2 gap-2">
      <div className="flex w-full justify-between items-center">
        <p className="text-gray-500 text-[14px]">전체 {mockHouserData.length}</p>
        <Dropdown options={DROPDOWN_OPTION} type="select" selectedOption="최신순" />
      </div>
      <ul className="flex flex-col gap-4">
        {mockHouserData.map((item) => (
          <li key={item.id}>
            <HouseCard info={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}

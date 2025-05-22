import HouseCard from '@/components/DashBoard/HouseCard';
import Dropdown from '@/components/Dropdown';
import {
  getBookmarkedPropertyList,
  getNonBookmarkedPropertyList,
  toggleBookmark,
} from '@/lib/api/property';
import { useToastStore } from '@/store/toastStore';
import { Property } from '@/types';
import { useEffect, useState } from 'react';

const DROPDOWN_OPTION = ['최신순', '입주 빠른 순'];

export default function Home() {
  const [fixedList, setFixedList] = useState<Property[]>([]);
  const [propertyList, setPropertyList] = useState<Property[]>([]);
  const { showToast } = useToastStore();

  const toggleBookMark = async (id: number) => {
    const result = await toggleBookmark(String(id));
    showToast(result.message, 'success');
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
        <p className="text-gray-500 text-[14px]">전체 {fixedList.length + propertyList.length}</p>
        <Dropdown options={DROPDOWN_OPTION} type="select" selectedOption="최신순" />
      </div>
      {fixedList.length === 0 && propertyList.length === 0 && (
        <div className="text-gray-400 text-center py-4">등록한 매물이 없습니다.</div>
      )}

      <ul className="flex flex-col gap-4">
        {fixedList.length > 0 &&
          fixedList.map((item) => (
            <li key={item.id}>
              <HouseCard info={item} toggleBookmark={toggleBookMark} isFixed />
            </li>
          ))}

        {propertyList.length > 0 &&
          propertyList.map((item) => (
            <li key={item.id}>
              <HouseCard info={item} toggleBookmark={toggleBookMark} isFixed={false} />
            </li>
          ))}
      </ul>
    </div>
  );
}

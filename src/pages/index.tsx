import DashboardSkeleton from '@/components/DashBoard/DashboardSkeleton';
import HouseCard from '@/components/DashBoard/HouseCard';
import Dropdown from '@/components/Dropdown';
import { useDispatch } from '@/hooks/property/useDispatch';
import { useProperty } from '@/hooks/property/useProperty';
import { PropertySortBy, toggleBookmark } from '@/lib/api/property';
import { useToastStore } from '@/store/toastStore';

const DROPDOWN_OPTION = [
  { label: '최신순', value: 'LATEST' },
  { label: '입주 빠른 순', value: 'AVAILABLE_DATE_ASC' },
];

export default function Home() {
  const { params, setSortBy } = useDispatch();
  const { bookmarked, nonBookmarked, isLoading } = useProperty(params);
  const { showToast } = useToastStore();

  const toggleBookMark = async (id: number) => {
    const result = await toggleBookmark(String(id));
    showToast(result.message, 'success');
  };

  const handleSelect = (option: string) => {
    const selectedOption = DROPDOWN_OPTION.find((item) => item.label === option);
    if (selectedOption) {
      setSortBy(selectedOption.value as PropertySortBy);
    }
  };

  return (
    <div className="flex flex-col px-5 py-2 gap-2 mb-20">
      <div className="flex w-full justify-between items-center">
        <p className="text-gray-500 text-[14px]">전체 {bookmarked.length + nonBookmarked.length}</p>
        <Dropdown
          options={DROPDOWN_OPTION.map((item) => item.label)}
          type="select"
          selectedOption={
            DROPDOWN_OPTION.find((item) => item.value === params.sortBy)?.label || '최신순'
          }
          onSelect={handleSelect}
        />
      </div>
      {isLoading && (
        <div className="flex flex-col gap-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <DashboardSkeleton key={index} />
          ))}
        </div>
      )}
      {bookmarked.length === 0 && nonBookmarked.length === 0 && (
        <div className="text-gray-400 text-center py-4">등록한 매물이 없습니다.</div>
      )}

      <ul className="flex flex-col gap-4">
        {bookmarked.length > 0 &&
          bookmarked.map((item) => (
            <li key={item.id}>
              <HouseCard info={item} toggleBookmark={toggleBookMark} isFixed />
            </li>
          ))}

        {nonBookmarked.length > 0 &&
          nonBookmarked.map((item) => (
            <li key={item.id}>
              <HouseCard info={item} toggleBookmark={toggleBookMark} isFixed={false} />
            </li>
          ))}
      </ul>
    </div>
  );
}

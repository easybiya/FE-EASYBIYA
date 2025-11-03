import HouseCard from '@/components/DashBoard/HouseCard';
import Header from '@/components/Layout/Header';
import { useSharedProperty } from '@/hooks/property/uesSharedProperty';
import { useSearchParams } from 'next/navigation';

export default function Home() {
  const searchParams = useSearchParams();
  const ids = searchParams.get('ids');
  const idArray = (ids ?? '').split(',').filter(Boolean);
  const { data } = useSharedProperty(idArray);

  return (
    <div className="flex flex-col px-20 py-8 gap-8 mb-80">
      <Header title="공유받은 매물" />

      <div className="flex w-full justify-between items-center">
        <p className="text-gray-500 text-14">전체 {data?.length}</p>
      </div>
      <ul className="flex flex-col gap-16">
        {data?.map((item) => (
          <li key={item.id}>
            <HouseCard info={item} isShared />
          </li>
        ))}
      </ul>
    </div>
  );
}

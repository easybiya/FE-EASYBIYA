import DashboardSkeleton from '@/components/DashBoard/DashboardSkeleton';
import HouseCard from '@/components/DashBoard/HouseCard';
import Header from '@/components/Layout/Header';
import { useSharedProperty } from '@/hooks/property/uesSharedProperty';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';

export default function Home() {
  const searchParams = useSearchParams();
  const ids = searchParams.get('ids');
  const idArray = (ids ?? '').split(',').filter(Boolean);
  const { data, isLoading } = useSharedProperty(idArray);

  return (
    <div className="flex flex-col px-20 py-8 gap-8 mb-20">
      <Header title="공유받은 매물" />

      <div className="flex w-full justify-between items-center">
        {!isLoading && <p className="text-gray-500 text-14">전체 {data?.length}</p>}
      </div>
      {isLoading ? (
        <div className="flex flex-col gap-16 pt-42">
          {Array.from({ length: 5 }).map((_, index) => (
            <DashboardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
        >
          <ul className="flex flex-col gap-16">
            {data?.map((item) => (
              <li key={item.id}>
                <HouseCard info={item} isShared />
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
}

import IconComponent from '@/components/Asset/Icon';
import DashboardSkeleton from '@/components/DashBoard/DashboardSkeleton';
import HouseCard from '@/components/DashBoard/HouseCard';
import Dropdown from '@/components/Dropdown';
import Header from '@/components/Layout/Header';
import { useDispatch } from '@/hooks/property/useDispatch';
import { useProperty } from '@/hooks/property/useProperty';
import { PropertySortBy } from '@/lib/api/property';
import Link from 'next/link';
import DashboardEmpty from '../../public/images/dashboard-empty.svg?url';
import Image from 'next/image';
import Button from '@/components/Button/CustomButton';
import { useRouter } from 'next/navigation';
import useBookmark from '@/hooks/property/useBookmark';
import { motion } from 'framer-motion';
import { useEffect, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';

const DROPDOWN_OPTION = [
  { label: '최신순', value: 'LATEST' },
  { label: '입주 빠른 순', value: 'AVAILABLE_DATE_ASC' },
];

export default function Home() {
  const router = useRouter();
  const { params, setSortBy } = useDispatch();
  const { bookmarked, nonBookmarked, isLoading, fetchNextPage, hasNextPage, isFetching } =
    useProperty(params);
  const { mutate } = useBookmark();
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  const handleSelect = (option: string) => {
    const selectedOption = DROPDOWN_OPTION.find((item) => item.label === option);
    if (selectedOption) {
      setSortBy(selectedOption.value as PropertySortBy);
    }
  };

  const flattedNonBookmarkedData = useMemo(
    () => nonBookmarked?.pages.flatMap((page) => page) ?? [],
    [nonBookmarked],
  );

  const noData = bookmarked.length === 0 && flattedNonBookmarkedData.length === 0 && !isLoading;

  useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage]);

  return (
    <>
      <Header
        left={<h1 className="text-b-20">내집 후보</h1>}
        right={
          !noData && (
            <div className="flex gap-20">
              <Link href="/share">
                <IconComponent name="share" width={24} height={24} className="cursor-pointer" />
              </Link>
              <Link href="/property/create">
                <IconComponent name="plus" width={24} height={24} className="cursor-pointer" />
              </Link>
            </div>
          )
        }
      />
      {noData ? (
        <div className="font-semibold text-brownText text-center py-16 w-full max-h-[calc(100%-63px)] relative h-full flex flex-col items-center justify-center gap-52">
          <div className="w-full">
            <Image
              src={DashboardEmpty}
              alt="대시보드 빈 이미지"
              style={{ height: 'auto', width: '100%' }}
            />
            매물 후보를 등록하고
            <br />
            비교해 보세요.
          </div>
          <Button
            label="등록하기"
            className="w-240"
            onClick={() => router.push('/property/room-info')}
          />
        </div>
      ) : (
        <div className="flex flex-col px-20 py-8 gap-8 mb-80">
          <>
            {isLoading ? (
              <div className="flex flex-col gap-16 pt-42">
                {Array.from({ length: 5 }).map((_, index) => (
                  <DashboardSkeleton key={index} />
                ))}
              </div>
            ) : (
              <>
                <div className="flex w-full justify-between items-center">
                  <p className="text-gray-500 text-14">
                    전체 {bookmarked.length + flattedNonBookmarkedData.length}
                  </p>
                  <Dropdown
                    options={DROPDOWN_OPTION}
                    type="select"
                    selectedOption={
                      DROPDOWN_OPTION.find((item) => item.value === params.sortBy)?.label ||
                      '최신순'
                    }
                    onSelect={handleSelect}
                  />
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                >
                  <ul className="flex flex-col gap-16">
                    {bookmarked.map((item) => (
                      <li key={item.id}>
                        <HouseCard
                          info={item}
                          toggleBookmark={() => mutate(String(item.id))}
                          isFixed
                        />
                      </li>
                    ))}

                    {flattedNonBookmarkedData.map((item) => (
                      <li key={item.id}>
                        <HouseCard
                          info={item}
                          toggleBookmark={() => mutate(String(item.id))}
                          isFixed={false}
                        />
                      </li>
                    ))}
                  </ul>
                </motion.div>
                <div ref={ref} />
              </>
            )}
          </>
        </div>
      )}
    </>
  );
}

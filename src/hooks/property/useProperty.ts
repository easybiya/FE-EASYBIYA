import { useEffect, useState } from 'react';
import {
  getBookmarkedPropertyList,
  getNonBookmarkedPropertyList,
  GetPropertyListParams,
} from '@/lib/api/property';
import { keepPreviousData, useInfiniteQuery, useQuery } from '@tanstack/react-query';

// 매물 정보 리스트 훅, 북마크된 매물이랑 북마크 안된 매물 정보 관리
// 로딩처리, 딜레이 300ms 적용
export const useProperty = (query: GetPropertyListParams) => {
  const { data: bookmarkData, isLoading: bookmarkLoading } = useQuery({
    queryKey: ['bookmarkedProperty'],
    queryFn: getBookmarkedPropertyList,
    placeholderData: keepPreviousData,
  });

  const {
    data: nonbookmarkData,
    isLoading: nonbookmarkLoading,
    isFetching,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['propertyList', query],
    queryFn: ({ pageParam = 1 }) => getNonBookmarkedPropertyList({ ...query, page: pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < query.size) return undefined;
      return allPages.length + 1;
    },
    placeholderData: keepPreviousData,
    initialPageParam: 1,
  });

  const [delayedLoading, setDelayedLoading] = useState(true);

  useEffect(() => {
    if (bookmarkLoading || nonbookmarkLoading) {
      setDelayedLoading(true);
    } else {
      const timer = setTimeout(() => setDelayedLoading(false), 500);
      return () => clearTimeout(timer);
    }
  }, [bookmarkLoading, nonbookmarkLoading]);

  return {
    bookmarked: bookmarkData ?? [],
    nonBookmarked: nonbookmarkData,
    isLoading: delayedLoading,
    isFetching,
    fetchNextPage,
    hasNextPage,
  };
};

import { useEffect, useState } from 'react';
import {
  getBookmarkedPropertyList,
  getNonBookmarkedPropertyList,
  GetPropertyListParams,
} from '@/lib/api/property';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

// 매물 정보 리스트 훅, 북마크된 매물이랑 북마크 안된 매물 정보 관리
// 로딩처리, 딜레이 300ms 적용
export const useProperty = (query: GetPropertyListParams) => {
  const {
    data: bookmarkData,
    isLoading: bookmarkLoading,
    isFetching: bookmarkFetching,
  } = useQuery({
    queryKey: ['bookmarkedProperty'],
    queryFn: getBookmarkedPropertyList,
    placeholderData: keepPreviousData,
  });

  const { data: nonbookmarkData, isLoading: nonbookmarkLoading } = useQuery({
    queryKey: ['propertyList', query],
    queryFn: () => getNonBookmarkedPropertyList(query),
    placeholderData: keepPreviousData,
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
    nonBookmarked: nonbookmarkData ?? [],
    isLoading: delayedLoading,
    isFetching: bookmarkFetching,
  };
};

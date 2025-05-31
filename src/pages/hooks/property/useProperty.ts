import {
  getBookmarkedPropertyList,
  getNonBookmarkedPropertyList,
  GetPropertyListParams,
} from '@/lib/api/property';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

// 매물 정보 리스트 훅, 북마크된 매물이랑 북마크 안된 매물 정보 관리
// 로딩처리 해아함
export const useProperty = (query: GetPropertyListParams) => {
  const bookmarkedQuery = useQuery({
    queryKey: ['bookmarkedProperty'],
    queryFn: () => getBookmarkedPropertyList(),
    placeholderData: keepPreviousData,
  });

  const nonBookmarkedQuery = useQuery({
    queryKey: ['propertyList', query],
    queryFn: () => getNonBookmarkedPropertyList(query),
    placeholderData: keepPreviousData,
  });

  return {
    bookmarked: bookmarkedQuery.data ?? [],
    nonBookmarked: nonBookmarkedQuery.data ?? [],
  };
};

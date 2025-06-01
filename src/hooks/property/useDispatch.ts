import { PropertySortBy } from '@/lib/api/property';
import { useState } from 'react';

// 매물 정보 리스트 상태 관리 훅
export const useDispatch = () => {
  const [sortBy, setSortBy] = useState<PropertySortBy>('LATEST');
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);

  const params = {
    page,
    size,
    sortBy,
  };

  return {
    params,
    setSortBy,
    setPage,
    setSize,
  };
};

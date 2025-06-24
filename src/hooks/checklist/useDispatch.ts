import { useState } from 'react';

// 템플릿 리스트 상태 관리 훅
export const useDispatch = () => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);

  const params = {
    page,
    size,
  };

  return {
    params,
    setPage,
    setSize,
  };
};

import Link from 'next/link';
import { Item } from '@/types';
import RouteInfo from './routeInfo';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kakao: any;
  }
}

interface Props {
  modalContent: Item;
  closeModal: () => void;
}

const fixedData = [
  {
    id: 1,
    name: '집',
    address: '서울특별시 중랑구 면목로 35길 22-4',
  },
  {
    id: 2,
    name: '직장',
    address: '서울특별시 중구 수표동 56-1',
  },
];

export default function InfoModal({ modalContent, closeModal }: Props) {
  return (
    <div className='absolute top-32 z-50'>
      <div className='relative w-[450px] flex flex-col p-5 gap-2 h-fit bg-white rounded-lg shadow-lg'>
        <p className='text-lg font-bold'>{modalContent?.name}</p>
        <p>주소: {modalContent?.address}</p>
        {fixedData.map((item) => (
          <div key={item.id}>
            <RouteInfo fixedSpot={item} spotAddress={modalContent.address} />
          </div>
        ))}
        <Link href={`/detail/${modalContent.id}`}>상세보기</Link>
        <button className='absolute top-2 right-2' onClick={closeModal}>
          닫기
        </button>
      </div>
    </div>
  );
}

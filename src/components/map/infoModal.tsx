import Link from 'next/link';
import { Institution, Property } from '@/types';
import RouteInfo from './routeInfo';

interface Props {
  modalContent: Property;
  institution: Institution;
  closeModal: () => void;
}

export default function InfoModal({ modalContent, closeModal, institution }: Props) {
  return (
    <div className="absolute top-32 right-0 left-0 z-50">
      <div className="relative flex flex-col p-5 gap-2 h-fit bg-white rounded-lg shadow-lg">
        <p className="text-lg font-bold">{modalContent?.propertyName}</p>
        <p>주소: {modalContent?.propertyAddress}</p>
        <RouteInfo fixedSpot={institution} spotAddress={modalContent.propertyAddress} />
        <Link href={`/detail/${modalContent.id}`}>상세보기</Link>
        <button className="absolute top-2 right-2" onClick={closeModal}>
          닫기
        </button>
      </div>
    </div>
  );
}

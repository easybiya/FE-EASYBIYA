import { Institution, Property } from '@/types';
import RouteInfo from './routeInfo';
import IconComponent from '../Asset/Icon';
import { useState } from 'react';
import DetailRouteModal from './DetailRouteModal';

interface Props {
  modalContent: Property;
  institution: Institution;
  closeModal: () => void;
}

export default function InfoModal({ modalContent, closeModal, institution }: Props) {
  const [isDetail, setIsDetail] = useState(false);
  const isInstitution = modalContent.propertyAddress === institution.institutionAddress;

  return (
    <>
      <div className="absolute top-5 right-0 left-0 z-50 m-5">
        <div className="relative flex flex-col items-start p-5 gap-2 h-fit bg-white rounded-xl shadow">
          <IconComponent
            name={`${isInstitution ? 'institution' : 'property'}`}
            width={28}
            height={28}
            alt="모달 아이콘"
          />
          <p className="text-md font-bold">{modalContent?.propertyName}</p>
          <p className="text-[15px]">{modalContent?.propertyAddress}</p>
          <div
            className="w-fit flex items-center gap-[2px] rounded-full border px-4 py-2.5 font-semibold cursor-pointer"
            onClick={() => setIsDetail(true)}
          >
            <p className="h-5 leading-tight text-sm">대중교통 보기</p>
            <div className="h-[14px] w-[14px]">
              <IconComponent
                name="arrowRight"
                width={10}
                height={10}
                alt="오른쪽 화살표"
                className="cursor-pointer"
              />
            </div>
          </div>
          <IconComponent
            name="close"
            alt="닫기 아이콘"
            width={16}
            height={16}
            onClick={closeModal}
            className="absolute top-5 right-5 cursor-pointer"
          />
        </div>
      </div>
      {isDetail && !isInstitution && (
        <DetailRouteModal
          institution={institution}
          currentAddress={modalContent}
          isClose={() => setIsDetail(false)}
        />
      )}
    </>
  );
}

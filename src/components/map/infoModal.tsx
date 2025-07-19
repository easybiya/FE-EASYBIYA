import { Institution, MapProperty } from '@/types';
import IconComponent from '../Asset/Icon';
import { useEffect, useState } from 'react';
import DetailRouteModal from './DetailRouteModal';
import { calculateDistance } from '@/utils/calculateDistance';

interface Props {
  modalContent: MapProperty;
  institution?: Institution | null;
  closeModal: () => void;
}

export default function InfoModal({ modalContent, closeModal, institution }: Props) {
  const [distance, setDistance] = useState(0);
  const [isDetail, setIsDetail] = useState(false);
  const isInstitution =
    institution && modalContent.propertyAddress === institution.institutionAddress;

  useEffect(() => {
    if (!institution) return;
    const calculater = async () => {
      const result = calculateDistance(
        modalContent.propertyLatitude,
        modalContent.propertyLongitude,
        institution.institutionLatitude,
        institution.institutionLongitude,
      );
      const distanceInKm = Number(result.toFixed(0));
      setDistance(distanceInKm);
    };
    if (!isInstitution) {
      calculater();
    }
  }, [modalContent, institution]);

  return (
    <>
      <div className="absolute top-20 right-0 left-0 z-50 mx-16 my-20">
        <div className="relative flex flex-col items-start p-20 gap-8 h-fit bg-white rounded-xl shadow">
          <IconComponent
            name={`${isInstitution ? 'institution' : 'property'}`}
            width={28}
            height={28}
            alt="모달 아이콘"
          />
          <p className="text-md font-bold">{modalContent?.propertyName}</p>
          <p className="text-15">{modalContent?.propertyAddress}</p>
          {!isInstitution && institution && (
            <p className="text-15 text-[#94896A] font-bold">
              {institution.institutionName}에서 {distance}m
            </p>
          )}
          {!isInstitution && institution && (
            <div
              className="w-fit flex items-center gap-2 rounded-full border px-16 py-10 font-semibold cursor-pointer mt-10"
              onClick={() => setIsDetail(true)}
            >
              <p className="h-20 leading-tight text-sm">대중교통 보기</p>
              <div className="h-14 w-14">
                <IconComponent
                  name="arrowRight"
                  width={10}
                  height={10}
                  alt="오른쪽 화살표"
                  className="cursor-pointer"
                />
              </div>
            </div>
          )}
          <IconComponent
            name="close"
            alt="닫기 아이콘"
            width={16}
            height={16}
            onClick={closeModal}
            className="absolute top-20 right-20 cursor-pointer"
          />
        </div>
      </div>
      {isDetail && !isInstitution && institution && (
        <DetailRouteModal
          institution={institution}
          currentAddress={modalContent}
          isClose={() => setIsDetail(false)}
        />
      )}
    </>
  );
}

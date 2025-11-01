import { Institution, MapProperty } from '@/types';
import { useEffect, useState } from 'react';
import DetailRouteModal from './DetailRouteModal';
import { calculateDistance } from '@/utils/calculateDistance';
import { motion } from 'framer-motion';
import { formatDistance } from '@/utils/formatDistance';
import CloseIcon from '@/public/icons/close.svg?react';
import ArrowRightIcon from '@/public/icons/arrow-right.svg?react';
import InstitutionIcon from '@/public/icons/institution.svg?react';
import PropertyIcon from '@/public/icons/property.svg?react';

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
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.2 }}
        className="absolute top-20 right-0 left-0 z-50 mx-16 my-20"
      >
        <div className="relative flex flex-col items-start p-20 h-fit bg-white rounded-xl shadow">
          <div className="mb-10">
            {institution ? (
              <InstitutionIcon width={28} height={28} />
            ) : (
              <PropertyIcon width={28} height={28} />
            )}
          </div>
          <p className="text-16/24 font-bold mb-2">{modalContent?.propertyName}</p>
          <p className="text-15/22">{modalContent?.propertyAddress}</p>
          {!isInstitution && institution && (
            <p className="text-15 text-[#94896A] font-bold mt-10">
              {institution.institutionName}에서 {formatDistance(distance)}
            </p>
          )}
          {!isInstitution && institution && (
            <div
              className="w-fit flex items-center gap-2 rounded-full border pl-16 pr-10 py-10 font-semibold cursor-pointer mt-20 hover:bg-gray-100"
              onClick={() => setIsDetail(true)}
            >
              <p className="text-14/20 font-semibold">대중교통 보기</p>
              <ArrowRightIcon width={14} height={14} className="cursor-pointer" />
            </div>
          )}
          <CloseIcon
            name="close"
            width={16}
            height={16}
            onClick={closeModal}
            className="absolute top-20 right-20 cursor-pointer stroke-black"
          />
        </div>
      </motion.div>
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

import { useState } from 'react';
import { Property } from '@/types';
import { getCoordinates } from '@/utils/getCoordinates';
import InfoModal from '@/components/map/infoModal';
import Header from '@/components/Layout/Header';
import { mockHouserData, mockInstitutionData } from '@/data/mockHouseData';
import { RoomContainer } from '@/components/map/RoomContainer';
import { Map } from '@/components/map/Map';
import CreateInstitutionButton from '@/components/map/CreateInstitutionButton';
import CreateInsitutionModal from '@/components/map/CreateInstitutionModal';

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<Property | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [map, setMap] = useState<any>(null);
  const [isInstitutionModal, setIsInstitutionModal] = useState(false);

  const toggleModal = () => {
    setIsInstitutionModal(!isInstitutionModal);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const settingMapObject = (object: any) => {
    setMap(object);
  };

  const handleMarkerClick = (content: Property) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const handleTagClick = async (item: Property) => {
    setModalContent(item);
    setIsModalOpen(true);
    const houseCoorder = await getCoordinates(item.propertyAddress);
    const houseLocation = new window.kakao.maps.LatLng(houseCoorder.y, houseCoorder.x);
    if (map) {
      map.setCenter(houseLocation);
      map.setLevel(3);
    }
  };

  return (
    <div className="relative flex flex-col justify-center w-full">
      <div className="flex flex-col absolute top-0 right-0 left-0 z-10 bg-primary">
        <Header type={5} title="지도" />
        <div className="p-5">
          {mockInstitutionData ? (
            <RoomContainer roomList={mockHouserData} handleTagClick={handleTagClick} />
          ) : (
            <CreateInstitutionButton handleClick={toggleModal} />
          )}
        </div>
      </div>
      <Map
        roomList={mockHouserData}
        institution={mockInstitutionData}
        settingMapObject={settingMapObject}
        handleMarkerClick={handleMarkerClick}
      />
      {isModalOpen && modalContent && (
        <InfoModal
          modalContent={modalContent}
          institution={mockInstitutionData}
          closeModal={closeModal}
        />
      )}
      {isInstitutionModal && <CreateInsitutionModal handleClick={toggleModal} />}
    </div>
  );
}

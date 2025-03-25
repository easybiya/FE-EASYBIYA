import { useState } from 'react';
import { Property } from '@/types';
import { getCoordinates } from '@/utils/getCoordinates';
import InfoModal from '@/components/map/infoModal';
import Header from '@/components/Layout/Header';
import { mockHouserData, mockInstitutionData } from '@/data/mockHouseData';
import { RoomContainer } from '@/components/map/RoomContainer';
import { Map } from '@/components/map/Map';
import CreateInstitutionButton from '@/components/map/CreateInstitutionButton';

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<Property | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [map, setMap] = useState<any>(null);

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

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
    <div className="flex flex-col justify-center w-full">
      <Header type={5} title="지도" />
      <div className="p-4">
        {mockInstitutionData ? (
          <RoomContainer roomList={mockHouserData} handleTagClick={handleTagClick} />
        ) : (
          <CreateInstitutionButton />
        )}
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
    </div>
  );
}

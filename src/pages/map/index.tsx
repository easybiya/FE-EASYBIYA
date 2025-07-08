import { useState } from 'react';
import InfoModal from '@/components/map/infoModal';
import Header from '@/components/Layout/Header';
import { RoomContainer } from '@/components/map/RoomContainer';
import { Map } from '@/components/map/Map';
import RoomFloatButton from '@/components/map/RoomFloatButton';
import { useInstitution } from '@/hooks/map/useInstitution';
import { useMapProperty } from '@/hooks/map/useMapProperty';
import { MapProperty } from '@/types';

export interface ModalContent {
  address: string;
  name: string;
  id: string;
}

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<MapProperty | null>(null);
  const { data } = useMapProperty();
  const { institution } = useInstitution();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [map, setMap] = useState<any>(null);

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const settingMapObject = (object: any) => {
    setMap(object);
  };

  const handleMarkerClick = (content: MapProperty) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const handleTagClick = async (item: MapProperty) => {
    setModalContent(item);
    setIsModalOpen(true);
    const houseLocation = new window.kakao.maps.LatLng(
      item.propertyLatitude,
      item.propertyLongitude,
    );
    if (map) {
      map.setCenter(houseLocation);
      map.setLevel(3);
    }
  };

  return (
    <div className="relative flex flex-col justify-center w-full">
      <div className="flex flex-col absolute top-0 right-0 left-0 z-10 bg-primary">
        <Header type={5} title="지도" />
        <div className="p-4">
          <RoomContainer handleTagClick={handleTagClick} institution={institution} />
        </div>
      </div>
      <Map
        roomList={data ?? []}
        institution={institution}
        settingMapObject={settingMapObject}
        handleMarkerClick={handleMarkerClick}
      />
      {isModalOpen && modalContent && (
        <InfoModal modalContent={modalContent} institution={institution} closeModal={closeModal} />
      )}
      {data && data.length > 0 && (
        <RoomFloatButton roomList={data} handleTagClick={handleTagClick} />
      )}
    </div>
  );
}

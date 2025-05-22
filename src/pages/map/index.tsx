import { useEffect, useState } from 'react';
import { getCoordinates } from '@/utils/getCoordinates';
import InfoModal from '@/components/map/infoModal';
import Header from '@/components/Layout/Header';
import { RoomContainer } from '@/components/map/RoomContainer';
import { Map } from '@/components/map/Map';
import RoomFloatButton from '@/components/map/RoomFloatButton';
import { Institution, Property } from '@/types';
import { getBookmarkedPropertyList, getNonBookmarkedPropertyList } from '@/lib/api/property';

export interface ModalContent {
  address: string;
  name: string;
}

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ModalContent | null>(null);
  const [istitution] = useState<Institution>();
  const [propertyList, setPropertyList] = useState<Property[]>();
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

  const handleMarkerClick = (content: ModalContent) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const handleTagClick = async (address: string, name: string) => {
    const transferContent = { address: address, name: name };
    setModalContent(transferContent);
    setIsModalOpen(true);
    const houseCoorder = await getCoordinates(address);
    const houseLocation = new window.kakao.maps.LatLng(houseCoorder.y, houseCoorder.x);
    if (map) {
      map.setCenter(houseLocation);
      map.setLevel(3);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const bookmarkedData = await getBookmarkedPropertyList();
      const notBookmarkedData = await getNonBookmarkedPropertyList({
        page: 1,
        size: 10,
        sortBy: 'LATEST',
      });
      setPropertyList([...bookmarkedData, ...notBookmarkedData]);
    };
    fetchData();
  }, []);

  return (
    <div className="relative flex flex-col justify-center w-full">
      <div className="flex flex-col absolute top-0 right-0 left-0 z-10 bg-primary">
        <Header type={5} title="지도" />
        <div className="p-4">
          <RoomContainer handleTagClick={handleTagClick} institution={istitution} />
        </div>
      </div>
      <Map
        roomList={propertyList}
        institution={istitution}
        settingMapObject={settingMapObject}
        handleMarkerClick={handleMarkerClick}
      />
      {isModalOpen && modalContent && (
        <InfoModal modalContent={modalContent} institution={istitution} closeModal={closeModal} />
      )}
      {propertyList && propertyList.length > 0 && (
        <RoomFloatButton roomList={propertyList} handleTagClick={handleTagClick} />
      )}
    </div>
  );
}

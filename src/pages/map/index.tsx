import { useCallback, useEffect, useState } from 'react';
import { Item } from '@/types';
import { AddressSearchResult, AddressSearchStatus, getCoordinates } from '@/utils/getCoordinates';
import InfoModal from '@/components/map/InfoModal';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kakao: any;
  }
}

const houseData = [
  // 임시 데이터
  {
    id: 123,
    name: '매물1',
    address: '서울특별시 성동구 무학로2나길 15-10',
  },
  {
    id: 124,
    name: '매물2',
    address: '서울특별시 종로구 종로65길 28-4',
  },
];

const fixedData = [
  // 임시 데이터
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

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<Item | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [map, setMap] = useState<any>(null);

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  const handleTag = async (item: Item) => {
    setModalContent(item);
    setIsModalOpen(true);
    const fixedCoorder = await getCoordinates(item.address);
    const currentLocation = new window.kakao.maps.LatLng(fixedCoorder.y, fixedCoorder.x);
    if (map) {
      map.setCenter(currentLocation);
      map.setLevel(3);
    }
  };

  const initMap = useCallback(() => {
    window.kakao.maps.load(() => {
      if (!window.kakao || map) return; // 중복 생성 방지

      const mapContainer = document.getElementById('map');
      const mapOption = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 기본 좌표 현재 카카오 본사
        level: 3,
      };

      const newMap = new window.kakao.maps.Map(mapContainer, mapOption);
      setMap(newMap);

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          // 브라우저 접속 위치
          const currentLocation = new window.kakao.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude,
          );
          newMap.setCenter(currentLocation);
        });
      }

      const houseList = houseData;
      const fixedList = fixedData;
      houseList.forEach((house) => {
        const geocoder = new window.kakao.maps.services.Geocoder();
        geocoder.addressSearch(
          house.address,
          (result: AddressSearchResult[], status: AddressSearchStatus) => {
            if (status === window.kakao.maps.services.Status.OK) {
              const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

              const marker = new window.kakao.maps.Marker({
                position: coords,
                map: newMap,
                title: house.name,
              });

              window.kakao.maps.event.addListener(marker, 'click', () => {
                setModalContent(house);
                setIsModalOpen(true);
              });
            }
          },
        );
      });
      fixedList.forEach((fixed) => {
        const geocoder = new window.kakao.maps.services.Geocoder();
        geocoder.addressSearch(
          fixed.address,
          (result: AddressSearchResult[], status: AddressSearchStatus) => {
            if (status === window.kakao.maps.services.Status.OK) {
              const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

              const customOverlayContent = `
              <div style="padding:6px; font-size:10px; color:#333; background-color:white; border:1px solid #ccc; border-radius:5px; min-width: 100px;">
                 <strong>${fixed.name}</strong><br>
                 <span style="color:#777;">${fixed.address}</span><br>
               </div>
             `;

              new window.kakao.maps.Marker({
                position: coords,
                map: newMap,
                title: fixed.name,
              });

              const customOverlay = new window.kakao.maps.CustomOverlay({
                map: newMap,
                position: coords,
                content: customOverlayContent,
                yAnchor: 1.8,
              });

              customOverlay.setMap(newMap);
            }
          },
        );
      });
    });
  }, [map]);

  // 스크립트 삽입 로직
  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      initMap();
    } else {
      const mapScript = document.createElement('script');
      mapScript.async = true;
      mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&autoload=false&libraries=services,clusterer,drawing`;
      document.head.appendChild(mapScript);
      mapScript.addEventListener('load', initMap);

      return () => {
        mapScript.removeEventListener('load', initMap);
        document.head.removeChild(mapScript);
      };
    }
  }, [initMap]);

  return (
    <div className="flex flex-col justify-center items-center w-full pt-10">
      <div className="flex gap-3 justify-start w-[500px]">
        {houseData.map((item) => (
          <div
            onClick={() => handleTag(item)}
            className={`px-4 py-1 rounded-full border hover:bg-gray-300 cursor-pointer ${
              modalContent?.id === item.id && 'bg-gray-300'
            }`}
            key={item.id}
          >
            {item.name}
          </div>
        ))}
      </div>
      <div id="map" className="w-[500px] h-[700px] mt-10" />
      {isModalOpen && <InfoModal modalContent={modalContent!} closeModal={closeModal} />}
    </div>
  );
}

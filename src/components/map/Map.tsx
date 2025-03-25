import { Institution, Property } from '@/types';
import { AddressSearchResult, AddressSearchStatus } from '@/utils/getCoordinates';
import { useCallback, useEffect, useState } from 'react';
import markerIcon from '../../../public/icons/marker.svg';
import whiteMarkerIcon from '../../../public/icons/marker-white.svg';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kakao: any;
  }
}

interface Props {
  roomList: Property[];
  institution: Institution;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  settingMapObject: (object: any) => void;
  handleMarkerClick: (content: Property) => void;
}

export function Map({ roomList, institution, settingMapObject, handleMarkerClick }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [map, setMap] = useState<any>(null);
  const [currentMarkter, setCurrentMarker] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const createCurrentMarker = (currentLocation: any) => {
    const imageSrc: string = '/images/CurrentPosition.png';
    const imageSize = new window.kakao.maps.Size(50);
    const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);
    const marker = new window.kakao.maps.Marker({
      position: currentLocation,
      image: markerImage,
    });
    return marker;
  };

  const moveCurrentPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        // 브라우저 접속 위치
        const currentLocation = new window.kakao.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude,
        );
        if (!currentMarkter) {
          const newMarker = createCurrentMarker(currentLocation);
          newMarker.setMap(map);
          setCurrentMarker(true);
        }
        map.setCenter(currentLocation);
        map.setLevel(3);
      });
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
      settingMapObject(newMap);

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          // 브라우저 접속 위치
          const currentLocation = new window.kakao.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude,
          );
          newMap.setCenter(currentLocation);
          const currentMarker = createCurrentMarker(currentLocation);
          currentMarker.setMap(newMap);
          setCurrentMarker(true);
        });
      }
      const geocoder = new window.kakao.maps.services.Geocoder();
      roomList.forEach((house) => {
        geocoder.addressSearch(
          house.propertyAddress,
          (result: AddressSearchResult[], status: AddressSearchStatus) => {
            if (status === window.kakao.maps.services.Status.OK) {
              const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
              const imageSrc: string = whiteMarkerIcon.src;
              const imageSize = new window.kakao.maps.Size(24, 24);
              const imageOption = { offset: new window.kakao.maps.Point(12, 24) };
              const markerImage = new window.kakao.maps.MarkerImage(
                imageSrc,
                imageSize,
                imageOption,
              );

              const marker = new window.kakao.maps.Marker({
                position: coords,
                map: newMap,
                title: house.propertyName,
                image: markerImage,
              });

              marker.setMap(newMap);

              window.kakao.maps.event.addListener(marker, 'click', () => {
                handleMarkerClick(house);
              });

              const customOverlayContent = document.createElement('div');
              customOverlayContent.innerHTML = `
                <div style="
                  cursor: pointer;
                  display: flex; 
                  justify-content: center; 
                  align-items: center; 
                  padding: 6px 12px; 
                  font-size: 14px; 
                  color: #000; 
                  text-align: center; 
                  font-weight: 600; 
                  background-color: white; 
                  border-radius: 9999px; 
                  white-space: nowrap;
                  position: relative;
                  top: -3px;
                  min-width: 50px;
                ">
                  ${house.propertyName}
                </div>
              `;

              customOverlayContent.addEventListener('click', () => {
                handleMarkerClick(house);
              });

              const customOverlay = new window.kakao.maps.CustomOverlay({
                map: newMap,
                position: coords,
                content: customOverlayContent,
                yAnchor: 1.2, // 마커 위쪽에 오도록 조정
              });

              customOverlay.setMap(newMap);
            }
          },
        );
      });
      geocoder.addressSearch(
        institution.institutionAddress,
        (result: AddressSearchResult[], status: AddressSearchStatus) => {
          if (status === window.kakao.maps.services.Status.OK) {
            const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
            const imageSrc: string = markerIcon.src;
            const imageSize = new window.kakao.maps.Size(24, 24);
            const imageOption = { offset: new window.kakao.maps.Point(12, 24) };

            const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

            const customOverlayContent = `
              <div style="
                display: flex; 
                justify-content: center; 
                align-items: center; 
                padding: 6px 12px; 
                font-size: 14px; 
                color: #fff; 
                text-align: center; 
                font-weight: 600; 
                background-color: black; 
                border-radius: 9999px; 
                white-space: nowrap;
                position: relative;
                top: -3px;
                min-width: 50px;
              ">
                ${institution.institutionName}
              </div>
            `;

            new window.kakao.maps.Marker({
              position: coords,
              map: newMap,
              title: institution.institutionName,
              image: markerImage,
            });

            const customOverlay = new window.kakao.maps.CustomOverlay({
              map: newMap,
              position: coords,
              content: customOverlayContent,
              yAnchor: 1.2, // 마커 위쪽에 오도록 조정
            });

            customOverlay.setMap(newMap);
          }
        },
      );
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
    <div className="relative pt-10">
      <div id="map" className="w-full h-[calc(100vh-110px)]" />
      <div
        className="absolute w-8 h-8 bottom-5 right-5 bg-white z-50 rounded-full cursor-pointer"
        onClick={moveCurrentPosition}
      />
    </div>
  );
}

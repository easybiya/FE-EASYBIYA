import { Institution, MapProperty } from '@/types';
import { useCallback, useEffect, useState } from 'react';
import markerIcon from '@/public/icons/marker.svg?url';
import borwnMarkerIcon from '@/public/icons/marker-brown.svg?url';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kakao: any;
  }
}

interface Props {
  roomList?: MapProperty[];
  institution?: Institution | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  settingMapObject: (object: any) => void;
  handleMarkerClick: (content: MapProperty) => void;
}

export function Map({ roomList, institution, settingMapObject, handleMarkerClick }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [map, setMap] = useState<any>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const createCurrentMarker = (currentLocation: any, map: any) => {
    const marker = new window.kakao.maps.Marker({
      position: currentLocation,
      map,
    });

    marker.setMap(map);
  };

  const initMap = useCallback(() => {
    const tryInit = () => {
      const mapContainer = document.getElementById('map');
      if (!mapContainer) {
        setTimeout(tryInit, 100); // map 태그 없으면 재시도
        return;
      }
      if (!window.kakao || map) return; // SDK가 없거나 이미 map 생성했으면 종료

      const mapOption = {
        center: new window.kakao.maps.LatLng(37.566812939715675, 126.97864943227347), // 기본 좌표
        level: 3,
      };

      const newMap = new window.kakao.maps.Map(mapContainer, mapOption);
      setMap(newMap);
      settingMapObject(newMap);

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const currentLocation = new window.kakao.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude,
          );
          newMap.setCenter(currentLocation);
          createCurrentMarker(currentLocation, newMap);
        });
      }
    };

    tryInit();
  }, [map]);

  useEffect(() => {
    // 매물 위치 마커 생성 로직
    if (!map || !window.kakao || !window.kakao.maps || !roomList?.length) return;

    roomList.forEach((house) => {
      const coords = new window.kakao.maps.LatLng(house.propertyLatitude, house.propertyLongitude);
      const markerImage = new window.kakao.maps.MarkerImage(
        markerIcon.src,
        new window.kakao.maps.Size(24, 24),
        { offset: new window.kakao.maps.Point(12, 24) },
      );

      const marker = new window.kakao.maps.Marker({
        position: coords,
        map,
        title: house.propertyName,
        image: markerImage,
      });

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
          padding: 4px 12px; 
          font-size: 14px; 
          line-height: 140%;
          color: #fff; 
          text-align: center; 
          font-weight: 600; 
          background-color: black; 
          border-radius: 9999px; 
          white-space: nowrap;
          position: relative;
          min-width: 50px;
        ">
          ${house.propertyName}
        </div>
      `;

      customOverlayContent.addEventListener('click', () => {
        handleMarkerClick(house);
      });

      const customOverlay = new window.kakao.maps.CustomOverlay({
        map,
        position: coords,
        content: customOverlayContent,
        yAnchor: 1.2, // 마커 위쪽에 오도록 조정
      });

      customOverlay.setMap(map);
    });
  }, [map, roomList]);

  useEffect(() => {
    // 사용자 등록 위치 마커 생성 로직
    if (!map || !window.kakao || !window.kakao.maps || !institution) return;

    const coords = new window.kakao.maps.LatLng(
      institution.institutionLatitude,
      institution.institutionLongitude,
    );
    const imageSrc: string = borwnMarkerIcon.src;
    const imageSize = new window.kakao.maps.Size(24, 24);
    const imageOption = { offset: new window.kakao.maps.Point(12, 24) };
    const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

    const marker = new window.kakao.maps.Marker({
      position: coords,
      map,
      title: institution.institutionName,
      image: markerImage,
    });

    const formatContent = {
      id: 0,
      propertyName: institution.institutionName,
      propertyAddress: institution.institutionAddress,
      propertyDetailedAddress: '',
      propertyLatitude: institution.institutionLatitude,
      propertyLongitude: institution.institutionLongitude,
    };

    window.kakao.maps.event.addListener(marker, 'click', () => {
      handleMarkerClick(formatContent);
    });

    const customOverlayContent = document.createElement('div');
    customOverlayContent.innerHTML = `
      <div style="
          cursor: pointer;
          display: flex; 
          justify-content: center; 
          align-items: center; 
          padding: 4px 12px; 
          font-size: 14px; 
          color: #ffffff; 
          text-align: center; 
          font-weight: 600; 
          background-color: #94896A; 
          border-radius: 9999px; 
          white-space: nowrap;
          position: relative;
          top: -3px;
          min-width: 50px;
        ">
          ${institution.institutionName}
        </div>
      `;

    customOverlayContent.addEventListener('click', () => {
      handleMarkerClick(formatContent);
    });

    const customOverlay = new window.kakao.maps.CustomOverlay({
      map,
      position: coords,
      content: customOverlayContent,
      yAnchor: 1.2, // 마커 위쪽에 오도록 조정
    });

    customOverlay.setMap(map);
  }, [map, institution]);

  useEffect(() => {
    const loadKakaoMap = () => {
      if (window.kakao && window.kakao.maps) {
        initMap();
      } else {
        const mapScript = document.createElement('script');
        mapScript.async = true;
        mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&autoload=false&libraries=services,clusterer,drawing`;
        document.head.appendChild(mapScript);
        mapScript.addEventListener('load', () => {
          window.kakao.maps.load(() => {
            initMap();
          });
        });
      }
    };

    loadKakaoMap();
  }, [initMap]);

  return (
    <div className="relative pt-40">
      <div id="map" className="w-full h-[calc(100dvh-100px)]" />
    </div>
  );
}

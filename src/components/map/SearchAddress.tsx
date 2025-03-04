import { AddressSearchResult, AddressSearchStatus } from '@/utils/getCoordinates';
import { useCallback, useEffect } from 'react';
import DaumPostcodeEmbed, { Address } from 'react-daum-postcode';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kakao: any;
  }
}

export default function SearchAddress() {
  const completeSearch = (data: Address) => {
    console.log(data);
    const geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.addressSearch(
      data.address,
      (result: AddressSearchResult, status: AddressSearchStatus) => {
        if (status === window.kakao.maps.services.Status.OK) {
          console.log(result);
        }
      },
    );
  };

  const initMap = useCallback(() => {
    window.kakao.maps.load();
  }, []);

  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      initMap();
    } else {
      const mapScript = document.createElement('script');
      mapScript.async = true;
      mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&autoload=false&libraries=services`;
      document.head.appendChild(mapScript);
      mapScript.addEventListener('load', initMap);

      return () => {
        mapScript.removeEventListener('load', initMap);
        document.head.removeChild(mapScript);
      };
    }
  }, [initMap]);

  return <DaumPostcodeEmbed onComplete={completeSearch} style={{ height: '100%' }} />;
}

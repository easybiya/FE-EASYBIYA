declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kakao: any;
  }
}

export interface AddressSearchResult {
  address?: string;
  x: number;
  y: number;
}

export type AddressSearchStatus = 'OK' | 'ZERO_RESULT' | 'ERROR';

export const getCoordinates = (address: string): Promise<{ x: number; y: number }> => {
  return new Promise((resolve, reject) => {
    const geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.addressSearch(
      address,
      (result: AddressSearchResult[], status: AddressSearchStatus) => {
        if (status === window.kakao.maps.services.Status.OK) {
          resolve({ x: Number(result[0].x), y: Number(result[0].y) });
        } else {
          reject(new Error('주소 변환 실패'));
        }
      },
    );
  });
};

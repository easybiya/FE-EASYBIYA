export interface Item {
  id: number;
  name: string;
  address: string;
}

export interface House {
  // 당장 카드에 표시할 데이터가 추려지지 않아서 임시로 매물 타입 생성했습니다.
  name: string;
  type: number;
  monthPrice?: number;
  rentPrice: number;
  address: string;
}

export type HouseType = 'JEONSE' | 'BANJEONSE' | 'MONTHLY_RENT';

export type FeeType = 'DEPOSIT' | 'MONTHLY_RENT' | 'MAINTENANCE_FEE';

export interface PropertyImage {
  imageId: number;
  imageUrl: string;
  priority: number;
}

export type LeaseType = 'BANJEONSE' | 'JEONSE' | 'MONTHLY_RENT';

export interface Property {
  id: number;
  propertyName: string;
  leaseType: LeaseType;
  deposit: number;
  monthlyFee: number | null;
  maintenanceFee: number | null;
  availableDate: string; // ISO 날짜 문자열
  propertyAddress: string;
  propertyDetailedAddress: string;
  propertyImages: PropertyImage[];
  isBookmarked: boolean;
  propertyLatitude: number;
  propertyLongitude: number;
}

export interface MapProperty {
  id: number;
  propertyName: string;
  propertyAddress: string;
  propertyDetailedAddress: string;
  propertyLatitude: number;
  propertyLongitude: number;
}

export interface Institution {
  institutionName: string;
  institutionAddress: string;
  institutionLatitude: number;
  institutionLongitude: number;
}

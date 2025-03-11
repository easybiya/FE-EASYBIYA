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

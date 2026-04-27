export type TmapMode = 'WALK' | 'BUS' | 'SUBWAY' | 'EXPRESSBUS' | 'TRAIN' | 'AIRPLANE' | 'FERRY';

export interface TmapCurrency {
  symbol: string;
  currency: string;
  currencyCode: string;
}

export interface TmapFare {
  regular?: {
    totalFare: number;
    currency: TmapCurrency;
  };
}

export interface TmapStation {
  index: number;
  stationID: string;
  stationName: string;
  lon: string;
  lat: string;
  type?: number;
  routePayment?: number;
  service?: number;
}

export interface TmapStep {
  streetName: string;
  distance: number;
  description: string;
  linestring: string;
}

export interface TmapLane {
  route: string;
  routeId: string;
  routeColor: string;
  type: number;
  service: number;
}

export interface TmapLeg {
  mode: TmapMode;
  sectionTime: number;
  distance: number;
  route?: string;
  routeId?: string;
  routeColor?: string;
  type?: number;
  service?: number;
  start: { name: string; lon: number; lat: number };
  end: { name: string; lon: number; lat: number };
  steps?: TmapStep[];
  passShape?: { linestring: string };
  passStopList?: { stations: TmapStation[] };
  Lane?: TmapLane[];
}

export interface TmapItinerary {
  fare?: TmapFare;
  totalTime: number;
  totalWalkTime: number;
  totalWalkDistance: number;
  totalDistance: number;
  transferCount: number;
  pathType: number;
  legs: TmapLeg[];
}

export interface TmapResult {
  plan: {
    itineraries: TmapItinerary[];
  };
  requestParameters?: Record<string, unknown>;
}

export interface TampResponse{
  metaData:TmapResult;
}
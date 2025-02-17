export interface Station {
  index: number;
  stationID: number;
  stationName: string;
  x: number;
  y: number;
  stationCityCode?: number;
  stationProviderCode?: number;
  localStationID?: string;
  arsID?: string;
  isNonStop?: 'Y' | 'N';
}

export interface PassStopList {
  stations: Station[];
}

export interface Lane {
  name?: string;
  subwayCode?: number;
  subwayCityCode?: number;
  busNo?: string;
  type?: number;
  busID?: number;
  busLocalBlID?: string;
  busCityCode?: number;
  busProviderCode?: number;
}

export interface SubPath {
  trafficType: number;
  distance: number;
  sectionTime: number;
  stationCount?: number;
  lane?: Lane[];
  intervalTime?: number;
  startName?: string;
  startX?: number;
  startY?: number;
  endName?: string;
  endX?: number;
  endY?: number;
  startID?: number;
  endID?: number;
  startExitNo?: string;
  startExitX?: number;
  startExitY?: number;
  endExitNo?: string;
  endExitX?: number;
  endExitY?: number;
  passStopList?: PassStopList;
}

export interface Info {
  trafficDistance: number;
  totalWalk: number;
  totalTime: number;
  payment: number;
  busTransitCount: number;
  subwayTransitCount: number;
  mapObj: string;
  firstStartStation: string;
  lastEndStation: string;
  totalStationCount: number;
  busStationCount: number;
  subwayStationCount: number;
  totalDistance: number;
  totalWalkTime: number;
  checkIntervalTime: number;
  checkIntervalTimeOverYn: 'Y' | 'N';
  totalIntervalTime: number;
}

export interface Path {
  pathType: number;
  info: Info;
  subPath: SubPath[];
}

export interface Result {
  searchType: number;
  outTrafficCheck: number;
  busCount: number;
  subwayCount: number;
  subwayBusCount: number;
  pointDistance: number;
  startRadius: number;
  endRadius: number;
  path: Path[];
}

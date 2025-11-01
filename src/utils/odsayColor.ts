// utils/odsayColor.ts
export const SUBWAY_COLORS: Record<number, string> = {
  // 수도권
  1: '#263D96', // 1호선
  2: '#3BB44B',
  3: '#EF6D01',
  4: '#2D9EDF',
  5: '#8936E0',
  6: '#B44F0C',
  7: '#6A7115',
  8: '#DD226C',
  9: '#D0A52C',
  91: '#2773F1', // GTX-A

  101: '#71B7E3', // 공항철도
  102: '#4E67A5', // 자기부상(용유)
  104: '#7CC3A4', // 경의중앙
  108: '#0AAF7B', // 경춘선
  109: '#A81E31', // 신분당선
  110: '#6F99D0', // 의정부
  112: '#8CC53E', // 경강
  113: '#97700B', // 우이신설
  107: '#77C272', // 에버라인
  116: '#EAA805', // 수인분당선
  117: '#905B89', // 신림선
  114: '#8CC53E', // 서해선 (경강과 동일 톤)

  // 인천
  21: '#6F99D0', // 인천1호선
  22: '#F3AA3D', // 인천2호선

  // 부산
  71: '#D92B24', // 부산1호선
  72: '#3B8DCC', // 부산2호선
  73: '#8CC53E', // 부산3호선
  74: '#8A69AF', // 부산4호선
  79: '#B29000', // 부산김해 경전철

  // 대구
  41: '#E3002C', // 대구1
  42: '#00A2E1', // 대구2
  43: '#FDB913', // 대구3

  // 대전
  31: '#0098D8', // 대전1호선

  // 광주
  51: '#6E4C9E', // 광주1호선

  // 강원
  78: '#2EA1D7', // 동해선 (수인-부산 구간 포함)
};

const BUS_COLORS: Record<number, string> = {
  1: '#59BE0A', // 일반 → 지선계열
  2: '#F59B22', // 좌석
  3: '#59BE0A', // 마을버스
  4: '#F59B22', // 직행좌석
  5: '#FFB400', // 공항
  6: '#4BA3F7', // 간선급행 (BRT)

  10: '#9CA455', // 외곽
  11: '#1E7BDB', // 간선
  12: '#59BE0A', // 지선
  13: '#F2CB00', // 순환
  14: '#E43506', // 광역
  15: '#E43506', // 급행 (광역과 동일)
  16: '#94896A', // 관광
  20: '#59BE0A', // 농어촌 (지선과 동일)
  22: '#2D4F8B', // 경기 시외형
  26: '#E43506', // 급행간선 (광역과 동일)
  30: '#0087CE', // 한강버스
};

const DEFAULT_COLOR = '#94896A'; // 타지역/기본

export const getTransitColor = (type: number, subwayCode: number, busType: number) => {
  // type: 1(지하철), 2(버스)
  if (type === 1) {
    return SUBWAY_COLORS[subwayCode!] ?? DEFAULT_COLOR;
  }

  if (type === 2) {
    return BUS_COLORS[busType!] ?? DEFAULT_COLOR;
  }

  if (type === 3) {
    return '#9099A5';
  }

  if (type === 4) {
  }

  return DEFAULT_COLOR;
};

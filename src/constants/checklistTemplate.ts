import { ChecklistItem } from '@/types/checklist';

export const CHECKLIST_TEMPLATE: { name: string; checklists: ChecklistItem[] } = {
  name: '기본 템플릿',
  checklists: [
    {
      title: '📱 부동산 중개인 연락처',
      checkType: 'TEXT',
      checkItems: [],
    },
    {
      title: '📱 집 주인 연락처',
      checkType: 'TEXT',
      checkItems: [],
    },
    {
      title: '🔍방 구조',
      checkType: 'RADIO',
      checkItems: ['1룸', '1.5룸', '2룸'],
    },
    {
      title: '🤝 보증보험 가입 가능 여부',
      checkType: 'RADIO',
      checkItems: ['가능', '불가능'],
    },
    {
      title: '💰 근저당 여부',
      checkType: 'RADIO',
      checkItems: ['예', '아니오'],
    },
    {
      title: '🚌 위치 및 교통 편의성 점검',
      checkType: 'CHECKBOX',
      checkItems: [
        '대중교통 접근성(ex. 도보 10분 내외)',
        '통근/통학 소요 시간(ex. 1시간 내외)',
        '주변 마트 및 편의시설',
      ],
    },
    {
      title: '🔍 시설 및 조건 점검',
      checkType: 'CHECKBOX',
      checkItems: [
        '주차 가능 여부 및 월 주차비',
        '엘레베이터 유무',
        '방음 상태',
        '야외 소음 상태(유흥가, 대로변 주변인지 확인)',
        '반려 동물 가능 여부',
      ],
    },
    {
      title: '🔍 건물 위치 점검',
      checkType: 'CHECKBOX',
      checkItems: ['지대높이', '방향'],
    },
    {
      title: '🚨 안전 보안',
      checkType: 'CHECKBOX',
      checkItems: ['방범창 유무', '이중 잠금 장치 유무', 'CCTV 유무', '경비 유무'],
    },
    {
      title: '🔍 가구/전자제품 점검',
      checkType: 'CHECKBOX',
      checkItems: ['가구 빌트인 여부', '냉장고 상태', '세탁기 상태'],
    },
    {
      title: '🔍 옵션 여부',
      checkType: 'CHECKBOX',
      checkItems: [
        '무선인터넷',
        '가스렌지/하이라이트/인덕션',
        '에어컨',
        '에어컨 리모컨',
        '세탁기',
        '냉장고',
        '침대',
        '옷장',
        '빨래 건조대',
        '전자레인지',
        '건조기',
        'TV',
        '오븐',
        '인터폰',
        '스타일러',
      ],
    },
    {
      title: '🏢 건물 정보',
      checkType: 'TEXT',
      checkItems: [],
    },
    {
      title: '💰 보증금',
      checkType: 'CHECKBOX',
      checkItems: ['보증금 조정 가능 여부'],
    },
  ],
};

export const INVESTMENT_CHECKLIST_TEMPLATE: {
  name: string;
  checklists: ChecklistItem[];
} = {
  name: '부동산 투자 체크리스트',
  checklists: [
    {
      title: '📍 입지 분석',
      checkType: 'CHECKBOX',
      checkItems: [
        '지하철 도보 10분 이내',
        '버스 노선 다양',
        '주요 업무지구 접근성 우수',
        '학군 수요 존재',
        '상권 활성화 지역',
        '병원/관공서 인접',
        '공원/녹지 인접',
      ],
    },
    {
      title: '🏢 건물 및 물리적 상태',
      checkType: 'CHECKBOX',
      checkItems: [
        '외벽 균열 없음',
        '누수 흔적 없음',
        '공용부 관리 양호',
        '엘리베이터 정상 작동',
        '주차 공간 충분',
        '건물 노후도 심하지 않음',
        '향/채광 양호',
      ],
    },
    {
      title: '💰 매입가 분석',
      checkType: 'TEXT',
      checkItems: [],
    },
    {
      title: '📊 실거래가 비교',
      checkType: 'TEXT',
      checkItems: [],
    },
    {
      title: '📈 전세가율 분석',
      checkType: 'TEXT',
      checkItems: [],
    },
    {
      title: '💵 월세 수익성 분석',
      checkType: 'TEXT',
      checkItems: [],
    },
    {
      title: '📉 가격 경쟁력',
      checkType: 'CHECKBOX',
      checkItems: [
        '최근 실거래가 대비 저렴',
        '급매물 수준 가격',
        '인근 유사 매물 대비 가격 우위',
      ],
    },
    {
      title: '🏗 개발 호재 여부',
      checkType: 'CHECKBOX',
      checkItems: [
        '재개발/재건축 구역',
        'GTX/지하철 연장 예정',
        '대형 상업시설 예정',
        '기업/산업단지 조성 예정',
      ],
    },
    {
      title: '📦 공급 리스크',
      checkType: 'CHECKBOX',
      checkItems: [
        '주변 신축 대량 공급 예정 없음',
        '미분양 증가 지역 아님',
        '입주 물량 과다 지역 아님',
      ],
    },
    {
      title: '👥 수요 분석',
      checkType: 'CHECKBOX',
      checkItems: [
        '전세 수요 충분',
        '월세 수요 충분',
        '1~2인 가구 밀집 지역',
        '직장인/학생 수요 존재',
      ],
    },
    {
      title: '📑 권리 관계',
      checkType: 'CHECKBOX',
      checkItems: [
        '근저당 과다 설정 아님',
        '가압류/가처분 없음',
        '토지/건물 소유자 동일',
        '전세보증보험 가입 가능',
      ],
    },
    {
      title: '⚠ 리스크 요소',
      checkType: 'CHECKBOX',
      checkItems: [
        '유흥가 밀집 지역 아님',
        '혐오시설 인접 아님',
        '침수 위험 지역 아님',
        '재난 위험 지역 아님',
      ],
    },
    {
      title: '📝 종합 투자 판단 메모',
      checkType: 'TEXT',
      checkItems: [],
    },
  ],
};

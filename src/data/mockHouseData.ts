import { Institution, Property } from '@/types';
import { CheckList, ChecklistTemplate } from '@/types/checklist';

export const mockHouserData: Property[] = [
  {
    id: 4,
    propertyName: '이집이야 오피스텔1',
    leaseType: 'BANJEONSE',
    deposit: 100000000,
    monthlyFee: 200000,
    maintenanceFee: 100000,
    availableDate: '2025-01-02',
    propertyAddress: '서울특별시 강남구 테헤란로 123',
    propertyDetailedAddress: '101동 1203호',
    propertyImages: [
      {
        imageId: 1,
        imageUrl:
          'https://easybiya-bucket.s3.amazonaws.com/1/property/d6e3b0c8-0692-4efb-8640-948da95651bf_스크린샷 2025-02-23 오후 1.20.37.png',
        priority: 1,
      },
      {
        imageId: 2,
        imageUrl:
          'https://easybiya-bucket.s3.amazonaws.com/1/property/b0843a59-3228-4f6b-a17a-9cd9d5543e94_스크린샷 2025-02-23 오후 1.20.56.png',
        priority: 2,
      },
    ],
  },
  {
    id: 6,
    propertyName: '이집이야 오피스텔2',
    leaseType: 'JEONSE',
    deposit: 5000000,
    monthlyFee: null,
    maintenanceFee: null,
    availableDate: '2025-02-10',
    propertyAddress: '서울특별시 성동구 성수동1가 656-1887',
    propertyDetailedAddress: '101동 1203호',
    propertyImages: [],
  },
  {
    id: 1,
    propertyName: '이집이야 오피스텔3',
    leaseType: 'BANJEONSE',
    deposit: 100000000,
    monthlyFee: 200000,
    maintenanceFee: 100000,
    availableDate: '2025-03-02',
    propertyAddress: '서울 강남구 역삼동 831-11',
    propertyDetailedAddress: '101동 1203호',
    propertyImages: [],
  },
  {
    id: 5,
    propertyName: '이집이야 오피스텔4',
    leaseType: 'MONTHLY_RENT',
    deposit: 5000000,
    monthlyFee: 200000,
    maintenanceFee: 100000,
    availableDate: '2025-03-31',
    propertyAddress: '서울 서초구 서초동 1321-7',
    propertyDetailedAddress: '101동 1203호',
    propertyImages: [],
  },
  {
    id: 2,
    propertyName: '이집이야 오피스텔5',
    leaseType: 'BANJEONSE',
    deposit: 100000000,
    monthlyFee: 200000,
    maintenanceFee: 100000,
    availableDate: '2025-04-02',
    propertyAddress: '서울특별시 서초구 서초동 1316-5',
    propertyDetailedAddress: '101동 1203호',
    propertyImages: [],
  },
  {
    id: 3,
    propertyName: '이집이야 오피스텔6',
    leaseType: 'BANJEONSE',
    deposit: 100000000,
    monthlyFee: 200000,
    maintenanceFee: 100000,
    availableDate: '2025-04-02',
    propertyAddress: '서울특별시 서초구 서초동 1328-11',
    propertyDetailedAddress: '101동 1203호',
    propertyImages: [],
  },
];

export const mockInstitutionData: Institution = {
  institutionName: '집',
  institutionAddress: '서울특별시 관악구 관악로 1',
  institutionLatitude: 37.4662872,
  institutionLongitude: 126.9784155,
};

export const mockCheckListTemplate: ChecklistTemplate = {
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

export const mockCheckList: CheckList = [
  {
    title: '집 주인 전화번호',
    checkType: 'TEXT',
    content: '010-1234-5467',
    priority: 1,
    checkItems: [],
  },
  {
    title: '방 내부 점검',
    checkType: 'TEXT',
    content: '벽지, 바닥, 창문 상태 확인',
    priority: 2,
    checkItems: [],
  },
  {
    title: '주변 환경 점검',
    checkType: 'CHECKBOX',
    content: '',
    priority: 3,
    checkItems: [
      {
        description: '편의점 접근성',
        checked: false,
        priority: 1,
      },
      {
        description: '대중교통 접근성',
        checked: true,
        priority: 2,
      },
    ],
  },
  {
    title: '설비 상태 체크',
    checkType: 'RADIO',
    content: '',
    priority: 4,
    checkItems: [
      {
        description: '가스레인지 정상 작동',
        checked: true,
        priority: 1,
      },
      {
        description: '전등 정상 작동',
        checked: false,
        priority: 2,
      },
    ],
  },
];

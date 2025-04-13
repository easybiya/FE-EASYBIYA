import type { NextApiRequest, NextApiResponse } from 'next';
import { ChecklistTemplate } from '@/types/checklist';

// TO DO: 서버 열리면 수정하기

const defaultTemplate: ChecklistTemplate = {
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

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    isSuccess: true,
    message: '성공입니다.',
    result: defaultTemplate,
  });
}

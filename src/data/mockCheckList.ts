import { ChecklistPayloadItem } from '@/types/checklist';

export const mockCheckList: ChecklistPayloadItem[] = [
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
  {
    title: '설비 상태 체크',
    checkType: 'RADIO',
    content: '',
    priority: 5,
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

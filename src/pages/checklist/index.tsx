import React, { useState } from 'react';
import CheckListItem from '@/components/CheckList/CheckListItem';
import CustomButton from '@/components/Button/CustomButton';

export default function ChecklistPage() {
  const [checklist, setChecklist] = useState([
    { id: 1, label: '부동산 중개인 연락처', type: 'text', value: '010-0000-0000' },
    { id: 2, label: '집 주인 연락처', type: 'text', value: '010-0000-0000' },
    { id: 3, label: '방 구조', type: 'radio', options: ['1룸', '1.5룸', '2룸'], value: '1룸' },
    {
      id: 4,
      label: '보증보험 가입 가능 여부',
      type: 'radio',
      options: ['가능', '불가능'],
      value: '가능',
    },
    { id: 5, label: '근저당 여부', type: 'radio', options: ['예', '아니오'], value: '예' },
    {
      id: 6,
      label: '위치 및 교통 편의성 점검',
      type: 'checkbox',
      options: ['대중교통 접근성', '통근/통학 소요 시간', '주변 마트 및 편의시설'],
      value: [],
    },
    {
      id: 7,
      label: '시설 및 조건 점검',
      type: 'checkbox',
      options: [
        '주차 가능 여부',
        '엘리베이터 유무',
        '방음 상태',
        '야외 소음 상태',
        '반려 동물 가능 여부',
      ],
      value: [],
    },
    {
      id: 8,
      label: '안전 보안',
      type: 'checkbox',
      options: ['방범창 유무', '이중 잠금 장치 유무', 'CCTV 유무', '경비 유무'],
      value: [],
    },
    {
      id: 9,
      label: '가구/전자제품 점검',
      type: 'checkbox',
      options: ['가구 별도 여부', '냉장고 상태', '세탁기 상태'],
      value: [],
    },
    {
      id: 10,
      label: '옵션 여부',
      type: 'checkbox',
      options: [
        '무선인터넷',
        '가스렌지',
        '에어컨',
        '세탁기',
        '냉장고',
        '침대',
        '옷장',
        '전자레인지',
        'TV',
        '오븐',
      ],
      value: [],
    },
    { id: 11, label: '건물 정보', type: 'text', value: '준공년도 00년, 0층' },
    { id: 12, label: '보증금', type: 'checkbox', options: ['보증금 조정 가능 여부'], value: [] },
  ]);

  const handleChange = (id: number, newValue: string | string[]) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, value: newValue } : item)),
    );
  };

  return (
    <div className="p-4 bg-[##F6F5F2]">
      <div className="flex justify-between items-center mb-4">
        {/* 임의 레이아웃 */}
        <span>✔✔✔✔ 4</span>
      </div>

      <div className="space-y-4">
        {checklist.map((item) => (
          <CheckListItem
            key={item.id}
            {...item}
            onChange={(value) => handleChange(item.id, value)}
          />
        ))}
      </div>

      {/* 체크리스트 종류 */}
      <div className="mt-6 flex justify-between">
        <button className="px-4 py-2 bg-gray-200 rounded">중복 선택</button>
        <button className="px-4 py-2 bg-gray-200 rounded">단일 선택</button>
        <button className="px-4 py-2 bg-gray-200 rounded">텍스트</button>
      </div>

      <CustomButton
        label="템플릿 저장"
        variant="secondary"
        fullWidth
        className="mt-[20px] mb-[70px]"
      />
    </div>
  );
}

import CustomButton from '@/components/Button/CustomButton';
import OptionButton from '@/components/Button/OptionButton';
import ChecklistItem from '@/components/CheckList/CheckListItem';
import Input from '@/components/Input';
import React, { useState } from 'react';

export default function Index() {
  const [contact, setContact] = useState<string>('010-1234-5678');
  const [roomType, setRoomType] = useState<string>('');
  const [insurance, setInsurance] = useState<string>('');
  const [conditions, setConditions] = useState<string[]>([]);

  return (
    <>
      <div className="flex gap-2 px-5">
        <OptionButton>전세</OptionButton>
        <OptionButton isSelected>반전세</OptionButton>
        <OptionButton>월세</OptionButton>
      </div>
      <div className="flex gap-2 px-5">
        <OptionButton isSelected subtext="중복 선택">
          체크리스트
        </OptionButton>
        <OptionButton subtext="단일 선택">체크리스트</OptionButton>
        <OptionButton>텍스트</OptionButton>
      </div>
      <div className="px-5">
        <Input placeholder="입력하세요" />
      </div>
      <CustomButton label="다음" fullWidth />
      <CustomButton label="템플릿 저장" variant="secondary" fullWidth />
      <CustomButton label="건너 뛰기" variant="ghost" fullWidth />
      <CustomButton label="비활성화 버튼" disabled fullWidth />
      <div className="flex flex-row">
        <CustomButton label="작은 버튼" size="small" />
        <CustomButton label="중간 버튼" size="medium" />
        <CustomButton label="큰 버튼" size="large" />
      </div>

      <div className="mb-[70px] p-4 space-y-4">
        <ChecklistItem
          type="text"
          label="📞 부동산 중개인 연락처"
          value={contact}
          onChange={(value) => setContact(value as string)}
        />
        <ChecklistItem
          type="radio"
          label="🏠 방 구조"
          value={roomType}
          options={['1룸', '1.5룸', '2룸']}
          onChange={(value) => setRoomType(value as string)}
        />
        <ChecklistItem
          type="radio"
          label="🛡️ 보험 가입 가능 여부"
          value={insurance}
          options={['가능', '불가능']}
          onChange={(value) => setInsurance(value as string)}
        />
        <ChecklistItem
          type="checkbox"
          label="📌 시설 및 조건 점검"
          value={conditions}
          options={['주차 가능 여부', '엘리베이터 유무', '방음 상태']}
          onChange={(value) => setConditions(value as string[])}
        />
      </div>
    </>
  );
}

import CustomButton from '@/components/Button/CustomButton';
import OptionButton from '@/components/Button/OptionButton';
import Input from '@/components/Input';
import React from 'react';

const Index = () => {
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
      <CustomButton label="작은 버튼" size="small" />
      <CustomButton label="중간 버튼" size="medium" />
      <CustomButton label="큰 버튼" size="large" />
    </>
  );
};

export default Index;

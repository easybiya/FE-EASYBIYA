import React, { Dispatch, SetStateAction, useState } from 'react';
import HeaderWithProgress from '@/components/Layout/HeaderWithProgress';
import RoomInfoForm from '@/components/RoomInfoForm';
import SearchAddress from '@/components/map/SearchAddress';
import PhotoForm from '@/components/Photo';
import ChecklistComplete from '@/components/CompletePage';
import CheckListForm from '@/components/CheckList/CheckListForm';

export default function CreatePage() {
  const [step, setStep] = useState(1);

  return (
    <div className="px-20 bg-[#F6F5F2] h-full">
      <CreatePageHeader step={step} />
      <CreatePageContent step={step} setStep={setStep} />
    </div>
  );
}

function CreatePageHeader({ step }: { step: number }) {
  const titles = ['계약 정보 입력', '주소 입력', '사진 등록', '체크리스트 등록'];
  const totalSteps = 4;
  if (step > totalSteps) return;

  return <HeaderWithProgress totalSteps={totalSteps} step={step} title={titles[step - 1] ?? ''} />;
}

function CreatePageContent({
  step,
  setStep,
}: {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
}) {
  return (
    <>
      {step === 1 && <RoomInfoForm setStep={setStep} />}
      {step === 2 && <SearchAddress setStep={setStep} />}
      {step === 3 && <PhotoForm setStep={setStep} />}
      {step === 4 && <CheckListForm setStep={setStep} />}
      {step === 5 && <ChecklistComplete />}
    </>
  );
}

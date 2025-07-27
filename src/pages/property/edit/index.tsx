import React, { Dispatch, SetStateAction, useState } from 'react';
import HeaderWithProgress from '@/components/Layout/HeaderWithProgress';
import RoomInfoForm from '@/components/RoomInfoForm';
import SearchAddress from '@/components/map/SearchAddress';
import CheckListForm from '@/components/CheckList/CheckListForm';
import { useSearchParams } from 'next/navigation';
import ChecklistComplete from '@/components/CompletePage';

export default function EditPage() {
  const [step, setStep] = useState(1);

  return (
    <div className="px-20 bg-[#F6F5F2] h-full">
      <CreatePageHeader step={step} />
      <CreatePageContent step={step} setStep={setStep} />
    </div>
  );
}

function CreatePageHeader({ step }: { step: number }) {
  const titles = ['계약 정보 입력', '주소 입력', '체크리스트 등록'];
  const totalSteps = 3;
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
  const searchParams = useSearchParams();
  const propertyId = searchParams.get('propertyId') ?? '';

  return (
    <>
      {step === 1 && <RoomInfoForm setStep={setStep} isEdit id={propertyId} />}
      {step === 2 && <SearchAddress setStep={setStep} isEdit id={propertyId} />}
      {step === 3 && <CheckListForm setStep={setStep} isEdit id={propertyId} />}
      {step === 4 && <ChecklistComplete />}
    </>
  );
}

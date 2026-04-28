'use client';

import React, { Dispatch, SetStateAction, useState } from 'react';
import HeaderWithProgress from '@/components/Layout/HeaderWithProgress';
import RoomInfoForm from '@/components/RoomInfoForm';
import SearchAddress from '@/components/map/SearchAddress';
import CheckListForm from '@/components/CheckList/CheckListForm';
import ChecklistComplete from '@/components/CompletePage';

interface Props {
  propertyId: string;
}

export default function EditPageClient({ propertyId }: Props) {
  const [step, setStep] = useState(1);

  return (
    <div className="px-20 bg-[#F6F5F2] h-full">
      <EditPageHeader step={step} />
      <EditPageContent step={step} setStep={setStep} propertyId={propertyId} />
    </div>
  );
}

function EditPageHeader({ step }: { step: number }) {
  const titles = ['계약 정보 입력', '주소 입력', '체크리스트 등록'];
  const totalSteps = 3;
  if (step > totalSteps) return;

  return <HeaderWithProgress totalSteps={totalSteps} step={step} title={titles[step - 1] ?? ''} />;
}

function EditPageContent({
  step,
  setStep,
  propertyId,
}: {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  propertyId: string;
}) {
  return (
    <>
      {step === 1 && <RoomInfoForm setStep={setStep} isEdit id={propertyId} />}
      {step === 2 && <SearchAddress setStep={setStep} isEdit id={propertyId} />}
      {step === 3 && <CheckListForm setStep={setStep} isEdit id={propertyId} />}
      {step === 4 && <ChecklistComplete />}
    </>
  );
}

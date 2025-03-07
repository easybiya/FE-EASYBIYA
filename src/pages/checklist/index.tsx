import React, { useState } from 'react';
import CheckListItem from '@/components/CheckList/CheckListItem';
import CustomButton from '@/components/Button/CustomButton';
import { DefaultChecklist } from '@/data/defaultCheckList';
import IconComponent from '@/components/Asset/Icon';
import ChecklistAddButton from '@/components/Button/CheckListAddButton';

export default function ChecklistPage() {
  const [checklist, setChecklist] = useState(DefaultChecklist);

  const handleChange = (id: number, newValue: string | string[]) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, value: newValue } : item)),
    );
  };

  return (
    <div className="px-4 pt-6 pb-4 bg-[#F6F5F2] min-h-screen">
      {/* 🔙 뒤로 가기 버튼 & 체크리스트 등록 타이틀 */}
      <div className="relative flex items-center justify-center mb-6">
        <IconComponent
          name="arrowLeft"
          width={24}
          height={24}
          className="absolute left-0 cursor-pointer text-gray-900"
        />
        <h1 className="text-xl font-bold text-gray-900 text-center">체크리스트 등록</h1>
      </div>

      {/* ✅ 진행 단계 UI */}
      <div className="flex items-center justify-center gap-3 mb-6">
        {[1, 2, 3, 4].map((step, index) => (
          <div key={step} className="flex items-center">
            <div
              className={`w-5 h-5 flex items-center justify-center rounded-full text-xs border 
              ${
                index < 3
                  ? 'border-black bg-black text-white'
                  : 'border-gray-300 bg-white text-gray-600'
              }`}
            >
              {index < 3 ? '✔' : step}
            </div>
            {index !== 3 && <div className="w-8 h-[2px] bg-gray-300 mx-1"></div>}
          </div>
        ))}
      </div>

      {/* 📋 체크리스트 아이템 */}
      <div className="space-y-4">
        {checklist.map((item) => (
          <CheckListItem
            key={item.id}
            {...item}
            onChange={(value) => handleChange(item.id, value)}
          />
        ))}
      </div>

      <div className="mt-10">
        <h2 className="text-lg font-bold text-gray-900 mb-3">체크리스트 추가</h2>
        <div className="grid grid-cols-3 gap-3">
          <ChecklistAddButton label="중복 선택" iconName="addListCheck" />
          <ChecklistAddButton label="단일 선택" iconName="addListRadio" />
          <ChecklistAddButton label="텍스트" iconName="addListText" />
        </div>
      </div>

      {/* 💾 저장 버튼 */}
      <CustomButton label="템플릿 저장" variant="secondary" fullWidth className="mt-5 mb-6" />
    </div>
  );
}

import React from 'react';

interface ChipsProps {
  label: string;
}

export default function Chips({ label }: ChipsProps) {
  return (
    <span className="px-[5px] py-[2px] text-m-12 rounded-[3px] bg-gray-700 text-white">
      {label}
    </span>
  );
}

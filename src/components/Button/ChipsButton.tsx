import React from 'react';

interface ChipsProps {
  label: string;
}

export default function Chips({ label }: ChipsProps) {
  return <span className="px-5 py-2 text-m-12 rounded-3 bg-gray-700 text-white">{label}</span>;
}

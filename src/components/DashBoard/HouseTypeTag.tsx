const HOUSE_TYPE: Record<number, string> = {
  1: '전세',
  2: '월세',
  3: '반전세',
};

// 어떤 식으로 타입이 올지 몰라서 일단 숫자로 타입 구분하도록 만들어뒀습니다.
export default function HouseTypeTag({ type }: { type: number }) {
  return (
    <div className="px-2 py-1 rounded-md bg-slate-900 w-fit text-white">{HOUSE_TYPE[type]}</div>
  );
}

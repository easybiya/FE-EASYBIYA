import Image from 'next/image';

export default function Section1() {
  return (
    <div className="flex flex-col h-full items-center">
      <div className="flex items-end w-full h-full bg-[#FFDE45]">
        <Image
          alt="섹션1 배경"
          src="/images/Section1-background.png"
          width={800}
          height={600}
          className="max-w-full h-auto"
        />
      </div>
      <div className="pt-40 pb-64 font-bold">
        <p className="text-center">
          좋은 집 체크리스트를
          <br />
          한눈에 확인하세요
        </p>
      </div>
    </div>
  );
}

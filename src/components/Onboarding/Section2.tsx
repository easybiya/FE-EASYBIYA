import Image from 'next/image';

export default function Section2() {
  return (
    <div className="flex flex-col h-full items-center">
      <div className="flex items-end w-full h-full bg-[#02B9FF]">
        <Image
          alt="섹션2 배경"
          src="/images/Section2-background.png"
          width={800}
          height={600}
          className="max-w-full h-auto"
        />
      </div>
      <div className="pt-10 pb-16 font-bold">
        <p className="text-center">
          매물 후보를 공유하고
          <br />
          의견을 주고받아보세요
        </p>
      </div>
    </div>
  );
}

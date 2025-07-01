import Image from 'next/image';

export default function Section3() {
  return (
    <div className="flex flex-col h-full items-center">
      <div className="relative flex items-end w-full h-full bg-[#C49D66]">
        <Image
          alt="섹션3 배경"
          src="/images/Section3-background.png"
          width={800}
          height={600}
          className="max-w-full h-auto"
        />
        <Image
          alt="섹션3 배경"
          src="/images/Section3-image.png"
          width={380}
          height={166}
          className="max-w-full h-auto aspect-[1.7/1] absolute top-1/2 -translate-y-14 left-1/2 -translate-x-1/2"
        />
      </div>
      <div className="pt-10 pb-16 font-bold">
        <p className="text-center">
          직장/학교까지 거리를
          <br />
          지도에서 확인할 수 있어요
        </p>
      </div>
    </div>
  );
}

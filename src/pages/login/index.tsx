import Image from 'next/image';
import KakaoLoginButton from '@/components/Button/KakaoLoginButton';
import IconComponent from '@/components/Asset/Icon';

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-300 relative px-6">
      <button className="absolute top-4 right-4">
        <IconComponent name="close" width={16} height={16} />
      </button>

      <h1 className="text-lg font-semibold text-gray-900 mb-5">이집이야</h1>

      <div className="flex items-center justify-center rounded-md mb-[116px]">
        <Image
          src="/images/test.png"
          alt="테스트 이미지"
          width={240}
          height={240}
          className="rounded-md"
        />
      </div>

      <div className="w-full ">
        <KakaoLoginButton />
      </div>
    </div>
  );
}

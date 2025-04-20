import KakaoLoginButton from '@/components/Button/KakaoLoginButton';
import IconComponent from '@/components/Asset/Icon';
import Image from 'next/image';
import router from 'next/router';

export default function LoginPage() {
  return (
    <div className="flex flex-col justify-between items-center h-screen bg-[#F6F5F2] relative px-6 py-10">
      <button className="absolute top-4 right-4">
        <IconComponent
          name="close"
          width={16}
          height={16}
          onClick={() => router.push('/onboarding')}
          className="cursor-pointer"
        />
      </button>

      <div className="mt-[76px] flex flex-col items-center">
        <div className="flex items-center gap-2 mb-6">
          <IconComponent name="yellowCheck" width={44} height={44} />
          <IconComponent name="logo" width={152} height={44} />
        </div>

        <Image src="/images/main.svg" alt="Main Logo" width={235} height={342} />
      </div>

      <KakaoLoginButton />
    </div>
  );
}

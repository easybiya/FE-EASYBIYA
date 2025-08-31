import KakaoLoginButton from '@/components/Button/KakaoLoginButton';
import Image from 'next/image';
import router from 'next/router';
import CloseIcon from '@/public/icons/close.svg?react';
import YellowCheckIcon from '@/public/icons/yellow-check.svg?react';
import Logo from '@/public/icons/logo.svg?react';

export async function getStaticProps() {
  return {
    props: {},
  };
}

export default function LoginPage() {
  return (
    <div className="flex flex-col justify-between items-center h-screen bg-[#FDFEFF] relative px-24 py-40">
      <button className="absolute top-16 right-16">
        <CloseIcon
          name="close"
          width={16}
          height={16}
          onClick={() => router.push('/onboarding')}
          className="cursor-pointer"
        />
      </button>

      <div className="mt-76 flex flex-col items-center">
        <div className="flex items-center gap-8 mb-24">
          <YellowCheckIcon name="yellowCheck" width={44} height={44} />
          <Logo name="logo" width={152} height={44} />
        </div>

        <Image src="/images/landing-image.gif" alt="Main Logo" width={235} height={342} />
      </div>

      <KakaoLoginButton />
    </div>
  );
}

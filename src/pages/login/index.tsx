import KakaoLoginButton from '@/components/Button/KakaoLoginButton';
import IconComponent from '@/components/Asset/Icon';
import Image from 'next/image';
import router from 'next/router';

export async function getStaticProps() {
  return {
    props: {},
  };
}

export default function LoginPage() {
  return (
    <div className="flex flex-col justify-between items-center h-screen bg-[#FDFEFF] relative px-24 py-40">
      <button className="absolute top-16 right-16">
        <IconComponent
          name="close"
          width={16}
          height={16}
          onClick={() => router.push('/onboarding')}
          className="cursor-pointer"
        />
      </button>

      <div className="mt-76 flex flex-col items-center">
        <div className="flex items-center gap-8 mb-24">
          <IconComponent name="yellowCheck" width={44} height={44} />
          <IconComponent name="logo" width={152} height={44} />
        </div>

        <Image src="/images/landing-image.gif" alt="Main Logo" width={235} height={342} />
      </div>

      <KakaoLoginButton />
    </div>
  );
}

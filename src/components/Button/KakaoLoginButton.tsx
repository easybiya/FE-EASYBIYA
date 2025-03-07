import { signIn } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import IconComponent from '@/components/Asset/Icon';

export default function KakaoLoginButton() {
  const { data: session } = useSession();

  // 로그인 상태면 버튼 숨기기
  if (session) return null;

  return (
    <button
      onClick={() => signIn('kakao', { callbackUrl: '/' })}
      className="w-full h-12 px-6 text-base font-bold text-black bg-[#FEE500] rounded-md hover:bg-yellow-300 flex items-center justify-center gap-2"
    >
      <IconComponent name="kakao" width={20} height={20} />
      카카오로 시작하기
    </button>
  );
}

import { supabase } from '@/lib/supabaseClient';
import KakaoIcon from '@/public/icons/kakao.svg?react';

export default function KakaoLoginButton() {
  const loginWithKakao = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  return (
    <button
      onClick={loginWithKakao}
      className="w-full h-48 px-24 text-b-16 bg-[#FEE500] rounded-12 hover:bg-yellow-300 flex items-center justify-center gap-8 disabled:opacity-50 text-black"
    >
      <KakaoIcon width={22} height={25} />
      <p className="font-black/80">카카오 로그인</p>
    </button>
  );
}

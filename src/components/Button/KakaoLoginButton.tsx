import { signIn } from 'next-auth/react';

export default function KakaoLoginButton() {
  return (
    <button
      onClick={() => signIn('kakao')}
      className="bg-yellow-400 p-2 rounded-md hover:bg-yellow-500"
    >
      카카오로 로그인
    </button>
  );
}

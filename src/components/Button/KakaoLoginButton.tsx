import { signIn } from 'next-auth/react';

// TO DO
// 풀 땡긴 후에 IconComponent로 카카오 아이콘 넣기

export default function KakaoLoginButton() {
  return (
    <button
      onClick={() => signIn('kakao')}
      className="w-full h-12 px-6 text-base font-bold text-black bg-[#FEE500] rounded-md hover:bg-yellow-300"
    >
      카카오로 시작하기
    </button>
  );
}

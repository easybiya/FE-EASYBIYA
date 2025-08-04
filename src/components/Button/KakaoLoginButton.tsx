import { useState } from 'react';
import IconComponent from '@/components/Asset/Icon';

// TO DO: 서버 켜면 로그인 테스트
export default function KakaoLoginButton() {
  const [loading, setLoading] = useState(false);

  const handleKakaoLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/oauth2/login/kakao`, {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) throw new Error('카카오 로그인 URL 요청 실패');

      const data = await response.json();

      if (!data.result.url) throw new Error('로그인 URL 없음');

      console.log('카카오 로그인 URL:', data.result.url);
      window.location.href = data.result.url;
    } catch (error) {
      console.error('로그인 요청 실패:', error);
      alert('로그인 중 오류 발생!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleKakaoLogin}
      className="w-full h-48 px-24 text-b-16 bg-[#FEE500] rounded-md hover:bg-yellow-300 flex items-center justify-center gap-8 disabled:opacity-50 text-black"
      disabled={loading}
    >
      <IconComponent name="kakao" width={20} height={20} />
      {loading ? '로그인 중...' : '카카오로 시작하기'}
    </button>
  );
}

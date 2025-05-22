import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

export default function KakaoLoginProcess() {
  const [isLoading, setIsLoading] = useState(true);
  const [, setCookie] = useCookies(['accessToken', 'isNewMember']);
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;

    const { access_token, is_new_member } = router.query;

    if (typeof access_token === 'string') {
      setCookie('accessToken', access_token, {
        path: '/',
        maxAge: 60 * 60 * 24, // 1일 (초 단위)
        sameSite: 'lax',
      });
    }

    if (typeof is_new_member === 'string') {
      setCookie('isNewMember', is_new_member, {
        path: '/',
        maxAge: 60 * 60 * 24,
        sameSite: 'lax',
      });
    }
    router.push('/');

    setIsLoading(false);
  }, [router, setCookie]);

  return <>{isLoading && <div>로딩중...</div>}</>;
}

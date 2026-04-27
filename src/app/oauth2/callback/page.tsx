'use client';

import { Suspense, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useCookies } from 'react-cookie';
import Spinner from '@/components/Spinner';

function KakaoCallbackInner() {
  const searchParams = useSearchParams();
  const [, setCookie] = useCookies(['accessToken']);
  const router = useRouter();

  useEffect(() => {
    const access_token = searchParams?.get('access_token');

    if (access_token) {
      setCookie('accessToken', access_token, {
        path: '/',
        maxAge: 60 * 60 * 24,
        sameSite: 'lax',
      });
    }

    router.push('/');
  }, [searchParams, setCookie, router]);

  return <Spinner />;
}

export default function KakaoLoginProcess() {
  return (
    <Suspense fallback={<Spinner />}>
      <KakaoCallbackInner />
    </Suspense>
  );
}

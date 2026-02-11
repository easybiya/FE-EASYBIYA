import Layout from '@/components/Layout';
import '@/styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import KakaoScript from '@/components/Layout/KakaoScript';
import { CookiesProvider } from 'react-cookie';
import { Toaster } from '@/components/ui/toaster';
import { GoogleAnalytics } from '@next/third-parties/google';
import { supabase } from '@/lib/supabaseClient';
import { Session } from '@supabase/supabase-js';
import { useRouter } from 'next/router';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      gcTime: 0,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  const imageUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/images/opengraph.png`;
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      const pathname = router.pathname;
      if (
        pathname.startsWith('/login') ||
        pathname.startsWith('/onboarding') ||
        pathname.startsWith('/view')
      ) {
        return;
      }

      const { data } = await supabase.auth.getSession();

      if (!data.session) {
        router.replace('/onboarding');
        return;
      }

      setSession(data.session);
    };

    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, [router.pathname]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <title>이집이야</title>
        <meta name="description" content={`"좋은 집" 고르는 기준, 정리해 드립니다`} />
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="이집이야! 자취방 체크리스트" />
        <meta property="og:description" content={`"좋은 집" 고르는 기준, 정리해 드립니다`} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_BASE_URL} />
        <meta property="og:site_name" content="easybiya" />
      </Head>
      <CookiesProvider>
        <QueryClientProvider client={queryClient}>
          <Layout>
            <Component {...pageProps} session={session} />
            <GoogleAnalytics gaId="G-WV84R1N7GC" />
            <Toaster />
          </Layout>
          <KakaoScript />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </CookiesProvider>
    </>
  );
}

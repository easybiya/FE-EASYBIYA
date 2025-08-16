import Layout from '@/components/Layout';
import '@/styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import KakaoScript from '@/components/Layout/KakaoScript';
import { CookiesProvider } from 'react-cookie';
import { Toaster } from '@/components/ui/toaster';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const setTokens = useAuthStore((state) => state.setTokens);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (accessToken && refreshToken) {
      setTokens(accessToken, refreshToken);
    }
  }, [setTokens]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>
      <CookiesProvider>
        <QueryClientProvider client={queryClient}>
          <Layout>
            <Component {...pageProps} />
            <Toaster />
          </Layout>
          <KakaoScript />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </CookiesProvider>
    </>
  );
}

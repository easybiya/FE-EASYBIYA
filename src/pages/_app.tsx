import Layout from '@/components/Layout';
import Modal from '@/components/Modal';
import Toast from '@/components/Toast';
import '@/styles/globals.css';
import '@/styles/reset.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';

const queryClient = new QueryClient();

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <Layout>
            <Component {...pageProps} />
            <Toast />
            <Modal />
          </Layout>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
}

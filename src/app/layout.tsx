import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';
import Providers from './providers';
import Layout from '@/components/Layout';
import { GoogleAnalytics } from '@next/third-parties/google';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? '';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: '이집이야',
  description: '"좋은 집" 고르는 기준, 정리해 드립니다',
  openGraph: {
    type: 'website',
    title: '이집이야! 자취방 체크리스트',
    description: '"좋은 집" 고르는 기준, 정리해 드립니다',
    images: [`${BASE_URL}/images/opengraph.png`],
    url: BASE_URL,
    siteName: 'easybiya',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="antialiased">
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
        <GoogleAnalytics gaId="G-WV84R1N7GC" />
      </body>
    </html>
  );
}

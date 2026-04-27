'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { CookiesProvider } from 'react-cookie';
import { Toaster } from '@/components/ui/toaster';
import KakaoScript from '@/components/Layout/KakaoScript';
import { useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter, usePathname } from 'next/navigation';

const PUBLIC_PATHS = ['/login', '/onboarding', '/view', '/share', '/oauth2', '/auth'];

function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const checked = useRef(false);

  useEffect(() => {
    if (checked.current) return;
    checked.current = true;

    const isPublic = PUBLIC_PATHS.some((p) => pathname?.startsWith(p));
    if (isPublic) return;

    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) router.replace('/onboarding');
    });
  }, [pathname, router]);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const isPublic = PUBLIC_PATHS.some((p) => pathname?.startsWith(p));
      if (!session && !isPublic) router.replace('/onboarding');
    });
    return () => subscription.unsubscribe();
  }, [pathname, router]);

  return <>{children}</>;
}

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

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        <AuthGuard>
          {children}
          <Toaster />
          <KakaoScript />
        </AuthGuard>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </CookiesProvider>
  );
}

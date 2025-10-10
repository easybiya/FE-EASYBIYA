import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';
import TabBar from './TabBar';

interface LayoutProps {
  children: ReactNode;
}

// 숨길 페이지 목록
const HIDDEN_TABBAR_PAGES = ['/login', '/details', '/property', '/share', '/view', '/onboarding'];
const HIDEEN_LAYOUT_ROUTE = '/property';

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const isCreatePage = router.pathname.startsWith(HIDEEN_LAYOUT_ROUTE);
  const hideTabBar = HIDDEN_TABBAR_PAGES.includes(router.pathname) || isCreatePage;

  useEffect(() => {
    const setVh = () => {
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    };
    setVh();
    window.addEventListener('resize', setVh);
    return () => window.removeEventListener('resize', setVh);
  }, []);

  return (
    <div className="flex justify-center w-full min-h-[calc(var(--vh,1vh)*100)] bg-white">
      <div className="relative w-full max-w-430 min-h-[calc(var(--vh,1vh)*100)] bg-primary shadow-[inset_1px_0_#eee,inset_-1px_0_#eee]">
        {children}
        {/* 특정 페이지에서 TabBar 숨기기 */}
        {!hideTabBar && <TabBar />}
      </div>
    </div>
  );
}

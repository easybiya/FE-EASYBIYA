import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import TabBar from './TabBar';
import Header from './Header';

interface LayoutProps {
  children: ReactNode;
}

// 숨길 페이지 목록
const HIDDEN_TABBAR_PAGES = ['/login', '/details', '/property', '/share', '/view'];
const HIDDEN_HEADER_PAGES = ['/login', '/details', '/property', '/map', '/share', '/view'];
const HIDEEN_LAYOUT_ROUTE = '/property';
const MYPAGE_ROUTE = '/profile';
const DETAIL_ROUTE = '/details';

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const isCreatePage = router.pathname.startsWith(HIDEEN_LAYOUT_ROUTE);
  const isMyPage = router.pathname.startsWith(MYPAGE_ROUTE);
  const isDetailPage = router.pathname.startsWith(DETAIL_ROUTE);
  const hideTabBar = HIDDEN_TABBAR_PAGES.includes(router.pathname) || isCreatePage;
  const hideHeader =
    HIDDEN_HEADER_PAGES.includes(router.pathname) || isCreatePage || isMyPage || isDetailPage;

  return (
    <div className="flex justify-center w-full min-h-screen bg-white">
      <div className="relative w-full max-w-[430px] min-h-screen bg-primary shadow-[inset_1px_0_#eee,inset_-1px_0_#eee]">
        {/* 특정 페이지에서 Header 숨기기 */}
        {!hideHeader && <Header type={2} title="내 집 후보" />}
        {children}
        {/* 특정 페이지에서 TabBar 숨기기 */}
        {!hideTabBar && <TabBar />}
      </div>
    </div>
  );
}

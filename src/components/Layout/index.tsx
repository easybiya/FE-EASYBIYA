import { ReactNode } from 'react';
import TabBar from './TabBar';
import Header from './Header';

interface LayoutProps {
  children: ReactNode;
}

// TODO: 로그인 페이지 및 지도 페이지에서 TabBar 숨기기
export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex justify-center w-full min-h-screen bg-white">
      <div className="relative w-full max-w-[430px] min-h-screen bg-white shadow-[inset_1px_0_#eee,inset_-1px_0_#eee]">
        <Header type={2} title="내 집 후보" /> {/* 헤더 확인용. 헤더는 각 페이지에서 사용 */}
        {children}
        <TabBar />
      </div>
    </div>
  );
}

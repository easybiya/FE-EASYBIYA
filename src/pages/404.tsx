import Link from 'next/link';
import NotFoundIcon from '@/public/icons/file-plus.svg?react';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-primary gap-52">
      <div className="flex flex-col items-center">
        <NotFoundIcon width={68} height={68} className="mb-16" />
        <p className="text-16/24 font-bold text-brownText">페이지를 찾을 수 없어요.</p>
        <p className="mt-4 text-14/20 text-brownText">일시적인 문제가 발생했어요.</p>
      </div>
      <Link
        href="/"
        className="px-20 py-12 bg-gray-800 rounded-6 text-15/22 font-semibold w-full max-w-200 text-white text-center"
      >
        홈으로 이동
      </Link>
    </div>
  );
}

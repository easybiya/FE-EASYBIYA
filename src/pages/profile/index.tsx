import Header from '@/components/Layout/Header';
import { ConfirmModal } from '@/components/Modal/ConfirmModal';
import Link from 'next/link';

export default function Page() {
  return (
    <div>
      <Header left={<h1 className="text-b-20">내정보</h1>} />
      <div className="flex flex-col px-20 py-10 gap-12">
        <Link className="py-12 font-semibold" href="/profile/info">
          기본 정보
        </Link>
        <Link className="py-12 font-semibold" href="/profile/checklist">
          체크리스트 관리
        </Link>
        <Link
          className="py-12 font-semibold"
          href="https://dent-kitten-aab.notion.site/24b30a2dbf6f80c5ad6bd5789d8f5131"
        >
          서비스 이용 약관
        </Link>
        <Link
          className="py-12 font-semibold"
          href="https://dent-kitten-aab.notion.site/24b30a2dbf6f8006bb54f3f090b32213"
        >
          개인정보 처리방침
        </Link>
        <ConfirmModal
          trigger={<button className="py-12 font-semibold text-start">로그아웃</button>}
          title="로그아웃 확인"
          description="로그아웃 하시겠어요?"
          handleSubmit={() => console.log('로그아웃')}
          buttonStyle="!bg-red-500"
        />
      </div>
    </div>
  );
}

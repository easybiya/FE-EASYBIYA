import Header from '@/components/Layout/Header';
import { useModalStore } from '@/store/modalStore';
import Link from 'next/link';

export default function Page() {
  const { openModal } = useModalStore();

  return (
    <div>
      <Header left={<h1 className="text-b-20">내정보</h1>} />
      <div className="flex flex-col px-5 py-2.5 gap-3">
        <Link className="py-3 font-semibold" href="/profile/info">
          기본 정보
        </Link>
        <Link className="py-3 font-semibold" href="/profile/checklist">
          체크리스트 관리
        </Link>
        <Link
          className="py-3 font-semibold"
          href="https://regular-penguin-856.notion.site/new-18123719b15f80c5bb3cd0e39f36e149?pvs=4"
        >
          이용 약관
        </Link>
        <button
          className="py-3 font-semibold text-start"
          onClick={() =>
            openModal('confirm', { title: '확인', description: '로그아웃 하시겠어요?' })
          }
        >
          로그아웃
        </button>
      </div>
    </div>
  );
}

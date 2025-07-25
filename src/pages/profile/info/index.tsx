import IconComponent from '@/components/Asset/Icon';
import Header from '@/components/Layout/Header';
import { useModalStore } from '@/store/modalStore';
import { useRouter } from 'next/navigation';

export default function Page() {
  const { openModal } = useModalStore();
  const router = useRouter();

  return (
    <>
      <Header
        left={
          <div className="flex items-center gap-8">
            <IconComponent
              name="arrowLeft"
              width={24}
              height={24}
              onClick={() => router.back()}
              className="cursor-pointer"
            />
            <h1 className="text-b-20">기본 정보</h1>
          </div>
        }
      />
      <div className="flex flex-col gap-12 px-20 py-10">
        <div className="flex items-center gap-10 py-12">
          <span className="w-20 h-20 bg-[#FEE500] flex items-center justify-center rounded-sm">
            <IconComponent name="kakao" width={12} height={12} />
          </span>
          <p className="font-semibold text-base leading-tight">000000@gmail.com</p>
        </div>
        <button
          className="font-semibold text-base leading-tight py-12 text-start"
          onClick={() =>
            openModal('confirm', { title: '확인', description: '회원 탈퇴 하시겠어요?' })
          }
        >
          회원 탈퇴
        </button>
      </div>
    </>
  );
}

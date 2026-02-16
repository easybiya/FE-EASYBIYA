import Header from '@/components/Layout/Header';
import { ConfirmModal } from '@/components/Modal/ConfirmModal';
import { useRouter } from 'next/navigation';
import ArrowLeft from '@/public/icons/arrow-left.svg?react';
import KakaoIcon from '@/public/icons/kakao.svg?react';
import useAccount from '@/hooks/user/useAccount';
import useDeleteAccount from '@/hooks/user/useDeleteAccount';
import { supabase } from '@/lib/supabaseClient';
import Spinner from '@/components/Spinner';

export default function Page() {
  const router = useRouter();
  const { data } = useAccount();
  const { mutate, isPending } = useDeleteAccount();

  const handleDelete = () => {
    mutate(undefined, {
      onSuccess: async () => {
        await supabase.auth.signOut();
        window.location.href = '/onboarding';
      },
    });
  };

  return (
    <>
      {isPending && <Spinner />}
      <Header
        left={
          <div className="flex items-center gap-8">
            <ArrowLeft
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
            <KakaoIcon name="kakao" width={12} height={12} />
          </span>
          <p className="font-semibold text-base leading-tight">{data?.email}</p>
        </div>
        <ConfirmModal
          trigger={<div className="py-12 font-semibold text-start cursor-pointer">회원 탈퇴</div>}
          title="회원탈퇴"
          description="회원 탈퇴 하시겠어요?"
          handleSubmit={handleDelete}
          buttonStyle="bg-red-500 hover:bg-red-400 active:bg-red-300"
        />
      </div>
    </>
  );
}

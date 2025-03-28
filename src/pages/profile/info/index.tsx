import IconComponent from '@/components/Asset/Icon';
import Header from '@/components/Layout/Header';

export default function Page() {
  return (
    <div>
      <Header title="기본 정보" type={4} />
      <div className="flex flex-col gap-3 px-5 py-2.5">
        <div className="flex items-center gap-2.5 py-3">
          <span className="w-5 h-5 bg-[#FEE500] flex items-center justify-center rounded-sm">
            <IconComponent name="kakao" width={12} height={12} />
          </span>
          <p className="font-semibold text-base leading-tight">000000@gmail.com</p>
        </div>
        <div className="font-semibold text-base leading-tight py-3">회원 탈퇴</div>
      </div>
    </div>
  );
}

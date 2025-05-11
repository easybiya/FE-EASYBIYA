import InstitutionForm from '@/components/Institution';
import Header from '@/components/Layout/Header';

export default function Page() {
  return (
    <div>
      <Header type={1} title="직장/학교 등록" />
      <div className="px-5 py-8 flex flex-col gap-14 relative h-[calc(100vh-40px)]">
        <div className="flex items-center gap-3 px-5 py-4 bg-white rounded-lg">
          <div className="w-12 h-12 bg-gray-300 rounded-lg" />
          <p className="text-sm leading-tight">
            주소를 등록하면,
            <br />
            매물 후보와 거리를 알려줄게요
          </p>
        </div>
        <InstitutionForm />
      </div>
    </div>
  );
}

import Dropdown from '@/components/Dropdown';
import Header from '@/components/Layout/Header';
import { useModalStore } from '@/store/modalStore';

export default function Page() {
  const { openModal } = useModalStore();
  const createTemplate = () => {
    openModal('input', { title: '새 템플릿 생성' });
  };
  return (
    <div>
      <Header title="체크리스트 관리" type={6} addAction={createTemplate} />
      <div className="py-6 px-5 grid grid-cols-2 gap-3">
        <div className="relative p-4 aspect-square col-span-1 bg-white rounded-lg flex items-start justify-between">
          <p className="text-[16px] font-bold">기본 체크리스트</p>
          <div className="absolute top-1.5 right-1.5">
            <Dropdown type="meatball" options={['복제']} />
          </div>
        </div>
      </div>
    </div>
  );
}

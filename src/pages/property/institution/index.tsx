import InstitutionForm from '@/components/Institution';
import Header from '@/components/Layout/Header';
import { useInstitution } from '@/hooks/map/useInstitution';
import MapIcon from '../../../../public/icons/map-pinned.svg?url';
import Image from 'next/image';

export default function Page() {
  const { institution } = useInstitution();
  return (
    <div>
      <Header type={1} title={institution ? '직장/학교 수정' : '직장/학교 등록'} />
      <div className="px-5 py-8 flex flex-col gap-14 relative h-[calc(100vh-40px)]">
        {!institution && (
          <div className="flex items-center gap-3 px-5 py-4 bg-white rounded-lg">
            <div className="p-3 rounded bg-brownText">
              <Image src={MapIcon} alt="지도 아이콘" width={24} height={24} />
            </div>
            <p className="text-sm leading-tight">
              주소를 등록하면,
              <br />
              매물 후보와 거리를 알려줄게요
            </p>
          </div>
        )}
        <InstitutionForm institution={institution} />
      </div>
    </div>
  );
}

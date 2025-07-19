import InstitutionForm from '@/components/Institution';
import Header from '@/components/Layout/Header';
import { useInstitution } from '@/hooks/map/useInstitution';
import MapIcon from '../../../../public/icons/map-pinned.svg?url';
import Image from 'next/image';
import IconComponent from '@/components/Asset/Icon';
import { useRouter } from 'next/navigation';

export default function Page() {
  const { institution } = useInstitution();
  const router = useRouter();

  return (
    <div>
      <Header
        title={institution ? '직장/학교 수정' : '직장/학교 등록'}
        right={
          <IconComponent
            name="close"
            width={16}
            height={16}
            className="cursor-pointer"
            onClick={() => router.back()}
          />
        }
      />
      <div className="px-20 py-32 flex flex-col gap-14 relative h-[calc(100vh-40px)]">
        {!institution && (
          <div className="flex items-center gap-12 px-20 py-16 bg-white rounded-lg">
            <div className="p-12 rounded bg-brownText">
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

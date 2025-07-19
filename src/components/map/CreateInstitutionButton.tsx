import { useRouter } from 'next/navigation';
import IconComponent from '../Asset/Icon';

export default function CreateInstitutionButton() {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => router.push('/property/institution')}
      className="flex gap-4 w-full items-center justify-center bg-white px-16 py-8 rounded-md border border-black font-semibold"
    >
      <IconComponent name="plus" alt="플러스 아이콘" width={12} height={12} />
      <p className="leading-tight">직장/학교 주소 등록</p>
    </button>
  );
}

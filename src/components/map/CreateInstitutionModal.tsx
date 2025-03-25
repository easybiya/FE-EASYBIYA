import { useRouter } from 'next/navigation';
import IconComponent from '../Asset/Icon';
import SearchAddress from './SearchAddress';

interface Props {
  handleClick: () => void;
}
// 매물 등록할때 사용한 주소 검색 form 사용
export default function CreateInsitutionModal({ handleClick }: Props) {
  return (
    <div className="absolute inset-0 w-full h-screen z-50 bg-primary">
      <div className="relative flex items-center gap-2 px-5 py-2">
        <IconComponent
          name="arrowLeft"
          width={24}
          height={24}
          className="cursor-pointer"
          onClick={handleClick}
        />
        <h1 className="text-b-18 text-center">직장/학교 주소 등록</h1>
      </div>
      <SearchAddress />
    </div>
  );
}

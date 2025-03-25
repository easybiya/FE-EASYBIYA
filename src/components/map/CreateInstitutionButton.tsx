import IconComponent from '../Asset/Icon';

interface Props {
  handleClick: () => void;
}

export default function CreateInstitutionButton({ handleClick }: Props) {
  return (
    <button
      type="button"
      onClick={handleClick}
      className="flex gap-1 w-full items-center justify-center bg-white px-4 py-2 rounded-md border border-black font-semibold"
    >
      <IconComponent name="plus" alt="플러스 아이콘" width={12} height={12} />
      <p className="leading-tight">직장/학교 주소 등록</p>
    </button>
  );
}

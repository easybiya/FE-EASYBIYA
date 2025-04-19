import Button from '../Button/CustomButton';

interface Props {
  onClick: () => void;
}

export default function EditButtonContainer({ onClick }: Props) {
  return (
    <div className="fixed bottom-0 left-1/2 w-full z-50 max-w-[428px] -translate-x-1/2 bg-white flex flex-col">
      <div className="w-full h-7 bg-gradient-to-t from-white to-primary" />
      <div className="flex flex-col items-center gap-2  py-3 px-5">
        <p className="text-gray-600 text-xs">
          ※ 변경된 내용이 있습니다. 변경된 내용을 저장해주세요.
        </p>
        <Button label="수정하기" className="w-full" onClick={onClick} />
      </div>
    </div>
  );
}

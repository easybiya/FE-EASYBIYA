import Button from '../Button/CustomButton';

interface Props {
  onClick: () => void;
}

export default function EditButtonContainer({ onClick }: Props) {
  return (
    <div className="fixed bottom-0 left-1/2 w-full z-50 max-w-430 -translate-x-1/2 flex flex-col">
      <div className="w-full flex items-center justify-center h-49 bg-gradient-to-b from-transparent to-primary">
        <p className="text-gray-600 text-xs">
          ※ 변경된 내용이 있습니다. 변경된 내용을 저장해주세요.
        </p>
      </div>

      <div className="relative flex flex-col items-center gap-8 pb-12 px-20 bg-primary">
        <Button label="수정하기" className="w-full" onClick={onClick} />
      </div>
    </div>
  );
}

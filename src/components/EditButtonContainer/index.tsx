import Button from '../Button/CustomButton';

interface Props {
  onClick: () => void;
  onEditImage?: () => void;
}

export default function EditButtonContainer({ onClick }: Props) {
  return (
    <div className="fixed bottom-0 left-1/2 w-full z-50 max-w-428 -translate-x-1/2 bg-primary flex flex-col">
      <div className="absolute -top-10 left-0 w-full h-49 bg-gradient-to-b from-transparent to-primary" />
      <div className="flex flex-col items-center gap-8 py-12 px-20">
        <p className="text-gray-600 text-xs">
          ※ 변경된 내용이 있습니다. 변경된 내용을 저장해주세요.
        </p>
        <Button label="수정하기" className="w-full" onClick={onClick} />
      </div>
    </div>
  );
}

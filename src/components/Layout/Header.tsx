interface Props {
  title?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
}

export default function Header({ title, left, right }: Props) {
  return (
    <header className="flex items-center h-11 justify-between px-5 py-2 bg-primary shadow-[inset_1px_0_#eee,inset_-1px_0_#eee]">
      {left || <div className="w-6" />}
      {title || <h1 className="text-b-20">{title}</h1>}
      {right || <div className="w-6" />}
    </header>
  );
}

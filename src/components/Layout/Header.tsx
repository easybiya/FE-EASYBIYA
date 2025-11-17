interface Props {
  title?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
}

export default function Header({ title, left, right }: Props) {
  return (
    <header className="flex items-center h-44 justify-between px-20 py-8 bg-primary">
      {left || <div className="w-24" />}
      {title && <h1 className="text-b-20 font-bold">{title}</h1>}
      {right || <div className="w-24" />}
    </header>
  );
}

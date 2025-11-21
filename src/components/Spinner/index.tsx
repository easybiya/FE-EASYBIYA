import Image from 'next/image';
import { useEffect } from 'react';

export default function Spinner() {
  useEffect(() => {
    // 스크롤 막기
    document.body.style.overflow = 'hidden';

    return () => {
      // 스크롤 복원
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <Image
        src="/images/spinner.gif"
        alt="spinner"
        className="select-none pointer-events-none"
        width={50}
        height={50}
        draggable={false}
      />
    </div>
  );
}

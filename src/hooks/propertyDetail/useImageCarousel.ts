import { CarouselApi } from '@/components/ui/carousel';
import { PropertyImage } from '@/types';
import { useEffect, useState } from 'react';

const useImageCarousel = ({ images }: { images: PropertyImage[] }) => {
  const [api, setApi] = useState<CarouselApi>();

  const [selected, setSelected] = useState<PropertyImage>();
  const [startIndex, setStartIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // ESC 키 감지 핸들러
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelected(undefined); // ESC 누르면 selected를 undefined로 설정
      }
    };

    // keydown 이벤트 리스너 등록
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      // keydown 이벤트 리스너 해제
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!api) {
      return;
    }
    setCurrentIndex(api.selectedScrollSnap());
    api.on('select', () => {
      setSelected(images[api.selectedScrollSnap()]);
      setCurrentIndex(api.selectedScrollSnap());
    });
  }, [api]);

  useEffect(() => {
    if (selected) {
      // 슬라이드가 열릴 때: 스크롤 막기
      document.body.style.overflow = 'hidden';
    }

    return () => {
      // 슬라이드가 닫힐 때: 스크롤 복원
      document.body.style.overflow = '';
    };
  }, [selected]);

  return {
    setSelected,
    setApi,
    setStartIndex,
    selected,
    startIndex,
    currentIndex,
  };
};

export default useImageCarousel;

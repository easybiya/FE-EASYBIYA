import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { useState } from 'react';
import type { Swiper as SwiperInstance } from 'swiper';
import Button from '@/components/Button/CustomButton';
import Section1 from '@/components/Onboarding/Section1';
import Section2 from '@/components/Onboarding/Section2';
import Section3 from '@/components/Onboarding/Section3';
import { useRouter } from 'next/navigation';

export async function getStaticProps() {
  return {
    props: {},
  };
}

export default function OnboardingPage() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
  const router = useRouter();

  const handleNext = () => {
    swiper?.slideNext();
  };

  return (
    <div className="flex flex-col h-dvh text-2xl font-semibold text-gray-800">
      <div className="flex-1 min-h-0">
        <Swiper
          modules={[Pagination]}
          spaceBetween={10}
          slidesPerView={1}
          pagination={{ clickable: true, type: 'bullets' }}
          onSwiper={setSwiper}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          className="h-full onboarding-swiper-bullet"
        >
          <SwiperSlide>
            <Section1 />
          </SwiperSlide>
          <SwiperSlide>
            <Section2 />
          </SwiperSlide>
          <SwiperSlide>
            <Section3 />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="px-20 py-32 w-full bg-primary shrink-0">
        <Button
          label={activeIndex < 2 ? '다음' : '확인'}
          className="w-full"
          onClick={activeIndex < 2 ? handleNext : () => router.push('/login')}
        />
      </div>
    </div>
  );
}

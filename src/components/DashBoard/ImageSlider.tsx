import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';
import { Button } from '../ui/button';
import { PropertyImage } from '@/types';
import { cn } from '@/lib/utils';
import { createPortal } from 'react-dom';
import IconComponent from '../Asset/Icon';

type Props = {
  images: PropertyImage[];
  selected?: PropertyImage;
  currentIndex: number;
  startIndex: number;
  setSelected: (v?: PropertyImage) => void;
  setApi: (v: CarouselApi) => void;
};

const ImageSlider = ({
  images,
  selected,
  currentIndex,
  startIndex,
  setSelected,
  setApi,
}: Props) => {
  return createPortal(
    <>
      {selected && (
        <div className="absolute inset-0 z-[100] mx-auto flex size-full max-w-full items-center justify-center bg-black/80">
          <div className=" absolute top-0 z-[110] flex w-full items-center justify-end gap-12 p-12">
            <div className="text-2xl font-semibold">
              {currentIndex + 1} / {images.length}
            </div>
            <Button onClick={() => setSelected(undefined)} type="button" variant="ghost">
              <IconComponent
                name="close"
                width={20}
                height={20}
                onClick={() => setSelected(undefined)}
                className="cursor-pointer"
              />
            </Button>
          </div>
          <Carousel
            className="w-full"
            setApi={setApi}
            opts={{
              loop: true,
              startIndex,
            }}
          >
            <CarouselContent>
              {images.map((item) => (
                <Item key={item.imageUrl} item={item} />
              ))}
            </CarouselContent>
            <CarouselNext className="right-12 top-1/2 bg-none border-none hover:bg-gray-100"></CarouselNext>
            <CarouselPrevious className="left-12 top-1/2 bg-none border-none hover:bg-gray-100"></CarouselPrevious>
          </Carousel>
        </div>
      )}
    </>,
    document.body,
  );
};

const Item = ({ item }: { item: PropertyImage }) => {
  return (
    <CarouselItem key={`${item}`} className="flex items-center justify-center ">
      <div className="max-w-800 relative flex size-full max-h-[calc(100vh-40px)] justify-center">
        <img
          src={item.imageUrl}
          className={cn(
            'bg-transparent object-contain transition-opacity duration-300 opacity-100 h-auto',
          )}
        />
      </div>
    </CarouselItem>
  );
};

export default ImageSlider;

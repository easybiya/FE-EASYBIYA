import Button from '@/components/Button/CustomButton';
import ShareCard from '@/components/DashBoard/ShareCard';
import Header from '@/components/Layout/Header';
import { Property } from '@/types';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import CloseIcon from '@/public/icons/close.svg?react';
import { useDispatch } from '@/hooks/property/useDispatch';
import { useProperty } from '@/hooks/property/useProperty';
import { useInView } from 'react-intersection-observer';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Kakao: any;
  }
}

export default function Home() {
  const [checkedList, setCheckedList] = useState<Property[]>([]);
  const router = useRouter();
  const { params } = useDispatch();
  const { bookmarked, nonBookmarked, isLoading, fetchNextPage, hasNextPage, isFetching } =
    useProperty(params);
  const { ref, inView } = useInView({
    threshold: 0.5,
  });
  const flattedNonBookmarkedData = useMemo(
    () => nonBookmarked?.pages.flatMap((page) => page) ?? [],
    [nonBookmarked],
  );

  const handleCheckList = (property: Property) => {
    setCheckedList((prev) =>
      prev.find((item) => item.id === property.id)
        ? prev.filter((item) => item.id !== property.id)
        : [...prev, property],
    );
  };

  const shareKakao = () => {
    const { Kakao } = window;

    const ids = checkedList.map((item) => item.id).join(',');
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/view?ids=${ids}`;
    const imageUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/images/opengraph.png`;

    Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: '이 집 어때요?',
        description: '계약하고 싶은 집인데 한마디 해줘요!',
        imageUrl: checkedList[0].propertyImages[0]?.imageUrl ?? imageUrl,
        link: {
          mobileWebUrl: url,
          webUrl: url, // ✅ 모바일+웹 둘 다
        },
      },
      buttons: [
        {
          title: '집 같이 보기',
          link: {
            mobileWebUrl: url,
            webUrl: url, // ✅
          },
        },
      ],
    });
  };

  useEffect(() => {
    if (inView && !isFetching && hasNextPage && !isLoading) {
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage]);

  return (
    <div className="h-full flex flex-col bg-[#F6F5F2] relative">
      <Header
        title="공유하기"
        right={
          <div className="size-24 flex justify-center items-center" onClick={() => router.back()}>
            <CloseIcon
              name="close"
              width={10}
              height={10}
              className="cursor-pointer stroke-black"
            />
          </div>
        }
      />
      <div className="h-28 flex items-center justify-center">
        <p className="text-gray-700 text-14 text-center">공유할 매물을 선택해주세요</p>
      </div>
      <div
        className={`flex flex-col px-20 py-12 gap-6 ${
          checkedList.length > 0 ? 'mb-110' : 'mb-20'
        } `}
      >
        <div className="flex w-full items-center">
          <p className="text-gray-500 text-14">선택 {checkedList.length}</p>
        </div>
        <ul className="flex flex-col gap-16">
          {bookmarked.map((property) => (
            <li key={property.id}>
              <ShareCard
                info={property}
                checked={checkedList.some((item) => item.id === property.id)}
                onChange={handleCheckList}
              />
            </li>
          ))}
          {flattedNonBookmarkedData.map((property) => (
            <li key={property.id}>
              <ShareCard
                info={property}
                checked={checkedList.some((item) => item.id === property.id)}
                onChange={handleCheckList}
              />
            </li>
          ))}
        </ul>
        <div ref={ref} />
      </div>
      {checkedList.length > 0 && (
        <div className="fixed bottom-0 left-1/2 w-full z-50 max-w-430 -translate-x-1/2 bg-primary flex flex-col">
          <div className="absolute -top-40 left-0 w-full h-40 bg-gradient-to-b from-transparent to-primary" />
          <div className="flex flex-col items-center gap-8 py-24 px-20">
            <Button label="공유" className="w-full" onClick={shareKakao} />
          </div>
        </div>
      )}
    </div>
  );
}

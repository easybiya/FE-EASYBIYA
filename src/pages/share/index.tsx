import Button from '@/components/Button/CustomButton';
import ShareCard from '@/components/DashBoard/ShareCard';
import Header from '@/components/Layout/Header';
import { mockHouserData } from '@/data/mockHouseData';
import { Property } from '@/types';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import CloseIcon from '@/public/icons/close.svg?react';
import SortDropdown from '@/components/Dropdown/SortDropdown';
import { useDispatch } from '@/hooks/property/useDispatch';

const DROPDOWN_OPTION = [
  { label: '최신순', value: 'createdAt' },
  { label: '입주 빠른 순', value: 'availableDate' },
];

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Kakao: any;
  }
}

export default function Home() {
  const [propertyList, setPropertyList] = useState<Property[]>([]);
  const [checkedList, setCheckedList] = useState<Property[]>([]);
  const router = useRouter();
  const { params } = useDispatch();

  const handleCheckList = (property: Property) => {
    setCheckedList((prev) =>
      prev.find((item) => item.id === property.id)
        ? prev.filter((item) => item.id !== property.id)
        : [...prev, property],
    );
  };

  const handleSelect = (option: string) => {
    console.log(option);
  };

  const shareKakao = () => {
    const { Kakao } = window;

    const ids = checkedList.map((item) => item.id).join(',');
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/view?ids=${ids}`;

    Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: '집 좀 같이 봐줘요!',
        description: `내가 살 집에 대한 피드백을 주세요!`,
        imageUrl: checkedList[0].propertyImages[0]?.imageUrl || '', // ✅ 안전하게 접근
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
    setPropertyList(mockHouserData);
  }, []);

  return (
    <div className="h-full flex flex-col bg-[#F6F5F2] relative">
      <Header
        title="공유하기"
        right={
          <CloseIcon
            name="close"
            width={16}
            height={16}
            className="cursor-pointer"
            onClick={() => router.back()}
          />
        }
      />
      <p className="text-gray-700 text-sm text-center">공유할 매물을 선택해주세요</p>
      <div className="flex flex-col px-20 py-8 gap-8 mb-80">
        <div className="flex w-full justify-between items-center">
          <p className="text-gray-500 text-14">전체 {checkedList.length}</p>
          <SortDropdown handleClick={handleSelect} params={params} />
        </div>
        <ul className="flex flex-col gap-16">
          {propertyList.map((property) => (
            <li key={property.id}>
              <ShareCard
                info={property}
                checked={checkedList.some((item) => item.id === property.id)}
                onChange={handleCheckList}
              />
            </li>
          ))}
        </ul>
      </div>
      {checkedList.length > 0 && (
        <div className="fixed bottom-0 left-1/2 w-full z-50 max-w-428 -translate-x-1/2 bg-primary flex flex-col">
          <div className="absolute -top-40 left-0 w-full h-40 bg-gradient-to-b from-transparent to-primary" />
          <div className="flex flex-col items-center gap-8 py-24 px-20">
            <Button label="공유" className="w-full" onClick={shareKakao} />
          </div>
        </div>
      )}
    </div>
  );
}

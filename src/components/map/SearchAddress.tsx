import { AddressSearchStatus } from '@/utils/getCoordinates';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect, useState, useTransition } from 'react';
import DaumPostcodeEmbed, { Address } from 'react-daum-postcode';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import Image from 'next/image';
import { createRoomZodSchema } from '@/lib/zodSchema';
import FixedBar from '../FixedBar';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kakao: any;
  }
}

type CreateRoomSchema = {
  address: string;
  addressDetail: string;
  nickName: string;
};

export default function SearchAddress() {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [addressCoordinate, setAddressCoordinate] = useState({ x: '', y: '' });
  const [isPending, startTransition] = useTransition();

  const form = useForm<CreateRoomSchema>({
    resolver: zodResolver(createRoomZodSchema),
    defaultValues: {
      address: '',
      addressDetail: '',
      nickName: '',
    },
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<CreateRoomSchema> = (values) => {
    startTransition(async () => {
      console.log(values, addressCoordinate); // 주소 및 좌표 설정 API
    });
  };

  const completeSearch = (data: Address) => {
    // 주소 검색후 주소 클릭시 동작하는 함수
    form.setValue('address', data.address);
    form.trigger('address');
    const geocoder = new window.kakao.maps.services.Geocoder();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    geocoder.addressSearch(data.address, (result: any, status: AddressSearchStatus) => {
      // 카카오맵 API활용, 주소 -> 좌표 변환 로직
      if (status === window.kakao.maps.services.Status.OK) {
        setAddressCoordinate({ x: result[0].x, y: result[0].y });
        form.setValue('nickName', result[0].road_address.region_3depth_name); // 행정동을 기본 매물 이름으로 설정
        form.trigger('nickName');
        setIsSearchModalOpen(false);
      }
    });
  };

  const initMap = useCallback(() => {
    window.kakao.maps.load();
  }, []);

  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      initMap();
    } else {
      const mapScript = document.createElement('script');
      mapScript.async = true;
      mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&autoload=false&libraries=services`;
      document.head.appendChild(mapScript);
      mapScript.addEventListener('load', initMap);

      return () => {
        mapScript.removeEventListener('load', initMap);
        document.head.removeChild(mapScript);
      };
    }
  }, [initMap]);

  return (
    <div className="relative h-[calc(100vh-110px)]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="py-8 px-5 h-full flex flex-col justify-between"
        >
          <div className="flex flex-col gap-14">
            <div className="flex flex-col gap-[6px]">
              <FormLabel className="mb-2 text-[16px] font-bold">집 주소</FormLabel>
              <div onClick={() => setIsSearchModalOpen(true)} className="cursor-pointer relative">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          disabled
                          {...field}
                          placeholder="주소를 검색해 주세요"
                          className="pointer-events-none bg-white py-2 h-10 disabled:opacity-100" // 클릭 이벤트 차단 및 스타일 변경
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Image
                  src="/icons/SearchIcon.svg"
                  alt="검색아이콘"
                  height={24}
                  width={24}
                  className="absolute right-3 top-2"
                />
              </div>
              <FormField
                control={form.control}
                name="addressDetail"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="상세 주소를 입력해 주세요"
                        className="bg-white py-2 h-10"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-[6px]">
              <FormField
                control={form.control}
                name="nickName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mb-2 text-[16px] font-bold">집 별명</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="집 별명을 입력해 주세요"
                        className="bg-white py-2 h-10"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <p className="text-[12px] text-gray-500 h-6 justify-center flex flex-col">
                예&#41; 합정동 매물 1
              </p>
            </div>
          </div>
          <FixedBar
            disabled={!form.formState.isValid && !isPending}
            skipRoute="/create/add-photo"
          />
        </form>
      </Form>
      {isSearchModalOpen && (
        <div className="absolute inset-0">
          <DaumPostcodeEmbed onComplete={completeSearch} style={{ height: '100%' }} />
        </div>
      )}
    </div>
  );
}

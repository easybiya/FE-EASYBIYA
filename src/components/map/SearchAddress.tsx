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
import { useRouter } from 'next/router';
import { usePropertyStore } from '@/store/usePropertyStore';

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

interface Props {
  isEdit?: boolean;
  id?: string;
}

export default function SearchAddress({ isEdit = false, id }: Props) {
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

  const router = useRouter();
  const { setProperty, property } = usePropertyStore();

  const onSubmit: SubmitHandler<CreateRoomSchema> = (values) => {
    startTransition(() => {
      if (
        property.propertyAddress !== values.address && // edit일 경우 처음에 전역 상태에 데이터를 저장하기 때문에 form의 address와 비교해서 다른 경우에만 좌표 필요 조건
        (!addressCoordinate.x || !addressCoordinate.y)
      ) {
        alert('좌표를 찾을 수 없습니다.');
        return;
      }

      setProperty({
        propertyName: values.nickName,
        propertyAddress: values.address,
        propertyDetailedAddress: values.addressDetail,
        propertyLatitude: Number(parseFloat(addressCoordinate.y).toFixed(7)), // y = 위도
        propertyLongitude: Number(parseFloat(addressCoordinate.x).toFixed(7)), // x = 경도
      });

      router.push(
        isEdit ? `/property/checklist?mode=edit&propertyId=${id}` : '/property/add-photo',
      );
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
    const loadMap = async () => {
      if (window.kakao && window.kakao.maps) {
        initMap();
        handleGeocode();
      } else {
        const mapScript = document.createElement('script');
        mapScript.async = true;
        mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&autoload=false&libraries=services`;

        mapScript.addEventListener('load', () => {
          window.kakao.maps.load(() => {
            initMap();
            handleGeocode();
          });
        });

        document.head.appendChild(mapScript);

        return () => {
          mapScript.removeEventListener('load', initMap);
          document.head.removeChild(mapScript);
        };
      }
    };

    const handleGeocode = () => {
      if (!isEdit || !id || !property?.propertyAddress) return;

      const geocoder = new window.kakao.maps.services.Geocoder();
      geocoder.addressSearch(
        property.propertyAddress,
        (result: any, status: AddressSearchStatus) => {
          if (status === window.kakao.maps.services.Status.OK) {
            setAddressCoordinate({ x: result[0].x, y: result[0].y });
            setProperty({
              propertyLatitude: Number(parseFloat(result[0].y).toFixed(7)),
              propertyLongitude: Number(parseFloat(result[0].x).toFixed(7)),
            });
          }
        },
      );
    };

    loadMap();
  }, [initMap, isEdit, id, property?.propertyAddress]);

  useEffect(() => {
    if (isEdit && id) {
      form.reset({
        nickName: property.propertyName,
        address: property.propertyAddress,
        addressDetail: property.propertyDetailedAddress,
      });
    }
  }, [id, isEdit]);

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
            disabled={
              !form.formState.isValid || isPending || !addressCoordinate.x || !addressCoordinate.y
            }
            skipRoute={isEdit ? `/property?mode=edit&propertyId=${id}` : '/property/add-photo'}
            preventSkip={true}
            text="다음"
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

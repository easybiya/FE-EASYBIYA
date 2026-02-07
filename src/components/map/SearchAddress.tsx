import { AddressSearchStatus } from '@/utils/getCoordinates';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dispatch, SetStateAction, useCallback, useEffect, useState, useTransition } from 'react';
import DaumPostcodeEmbed, { Address } from 'react-daum-postcode';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { createRoomZodSchema } from '@/lib/zodSchema';
import FixedBar from '../FixedBar';
import { usePropertyStore } from '@/store/usePropertyStore';
import SearchIcon from '@/public/icons/SearchIcon.svg?react';

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
  setStep: Dispatch<SetStateAction<number>>;
}

export default function SearchAddress({ isEdit = false, id, setStep }: Props) {
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

  const { setProperty, property } = usePropertyStore();

  const onSubmit: SubmitHandler<CreateRoomSchema> = (values) => {
    startTransition(() => {
      if (
        property.address !== values.address && // edit일 경우 처음에 전역 상태에 데이터를 저장하기 때문에 form의 address와 비교해서 다른 경우에만 좌표 필요 조건
        (!addressCoordinate.x || !addressCoordinate.y)
      ) {
        alert('좌표를 찾을 수 없습니다.');
        return;
      }

      setProperty({
        name: values.nickName,
        address: values.address,
        address_detail: values.addressDetail,
        lat: Number(parseFloat(addressCoordinate.y).toFixed(7)), // y = 위도
        lng: Number(parseFloat(addressCoordinate.x).toFixed(7)), // x = 경도
      });

      setStep(3);
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
      if (!isEdit || !id || !property?.address) return;

      const geocoder = new window.kakao.maps.services.Geocoder();
      geocoder.addressSearch(
        property.address,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (result: any, status: AddressSearchStatus) => {
          if (status === window.kakao.maps.services.Status.OK) {
            setAddressCoordinate({ x: result[0].x, y: result[0].y });
            setProperty({
              lat: Number(parseFloat(result[0].y).toFixed(7)),
              lng: Number(parseFloat(result[0].x).toFixed(7)),
            });
          }
        },
      );
    };

    loadMap();
  }, [initMap, isEdit, id, property?.address]);

  useEffect(() => {
    if (isEdit && id) {
      form.reset({
        nickName: property.name,
        address: property.address,
        addressDetail: property.address_detail,
      });
    }
  }, [id, isEdit]);

  return (
    <div className="relative h-[calc(100vh-110px)]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="py-32 h-full flex flex-col justify-between"
        >
          <div className="flex flex-col gap-56">
            <div className="flex flex-col gap-8">
              <FormLabel className="text-16 font-bold">집 주소</FormLabel>
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
                          className="pointer-events-none bg-white py-8 h-40 disabled:opacity-100 !text-15/22" // 클릭 이벤트 차단 및 스타일 변경
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <SearchIcon height={24} width={24} className="absolute right-12 top-8" />
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
                        className="bg-white py-8 h-40 !text-15/22"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-8">
              <FormField
                control={form.control}
                name="nickName"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-6">
                    <FormLabel className="text-16 font-bold">집 별명</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="집 별명을 입력해 주세요"
                        className="bg-white py-8 h-40 !text-15/22"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <p className="text-12 text-gray-500 h-24 justify-center flex flex-col">
                예&#41; 합정동 매물 1
              </p>
            </div>
          </div>
          <FixedBar
            disabled={
              !form.formState.isValid || isPending || !addressCoordinate.x || !addressCoordinate.y
            }
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

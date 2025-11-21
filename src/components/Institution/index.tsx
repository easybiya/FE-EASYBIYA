import { AddressSearchStatus } from '@/utils/getCoordinates';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect, useState, useTransition } from 'react';
import DaumPostcodeEmbed, { Address } from 'react-daum-postcode';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { createInstitutionZodSchema } from '@/lib/zodSchema';
import FixedBar from '../FixedBar';
import { fetchInstitution } from '@/lib/api/institutuion';
import { useRouter } from 'next/navigation';
import { Institution } from '@/types';
import SearchIcon from '@/public/icons/SearchIcon.svg?react';
import { toast } from '@/hooks/use-toast';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kakao: any;
  }
}

type InstitutionSchema = {
  address: string;
  nickName: string;
};

interface Props {
  institution?: Institution;
}

export default function InstitutionForm({ institution }: Props) {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [addressCoordinate, setAddressCoordinate] = useState({ x: '', y: '' });
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<InstitutionSchema>({
    resolver: zodResolver(createInstitutionZodSchema),
    defaultValues: {
      address: institution?.institutionAddress ?? '',
      nickName: institution?.institutionName ?? '',
    },
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<InstitutionSchema> = async (values) => {
    startTransition(async () => {
      await fetchInstitution({
        institutionName: values.nickName,
        institutionAddress: values.address,
        institutionLatitude: Number(parseFloat(addressCoordinate.y).toFixed(7)),
        institutionLongitude: Number(parseFloat(addressCoordinate.x).toFixed(7)),
      });
      toast({ title: '직장/학교 주소가 업데이트되었습니다.', variant: 'success' });
      router.push('/');
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
        form.setValue('nickName', result[0].road_address.building_name); // 건물 이름을 기본 값으로 설정
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
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="h-full flex flex-col justify-between"
        >
          <div className="flex flex-col gap-56">
            <div className="flex flex-col gap-8">
              <div className="flex gap-6">
                <FormLabel className="text-16 font-bold">직장/학교 주소</FormLabel>
                <p className="text-12 text-gray-500 justify-center flex flex-col">상세 주소 생략</p>
              </div>
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
                          className="pointer-events-none bg-white py-8 h-40 disabled:opacity-100" // 클릭 이벤트 차단 및 스타일 변경
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <SearchIcon height={24} width={24} className="absolute right-12 top-8" />
              </div>
            </div>
            <FormField
              control={form.control}
              name="nickName"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-9">
                  <FormLabel className="text-16 font-bold">직장/학교명</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="직장명/학교명" className="bg-white py-8 h-40" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FixedBar
            disabled={!form.formState.isValid && !isPending}
            handleSkip={() => router.push('/')}
            preventSkip={true}
            text="완료"
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

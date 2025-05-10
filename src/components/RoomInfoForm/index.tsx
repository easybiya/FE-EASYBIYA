import { roomInfoZodSchema } from '@/lib/zodSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState, useTransition } from 'react';
import { SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { HouseType } from '@/types';
import HouseTypeSelectContainer from './HouseTypeSelectContainer';
import HouseFeeInput from './HouseFeeInput';
import AvailableCalendar from './AvaliableCalendar';
import IconComponent from '../Asset/Icon';
import { formatDate } from '@/utils/formatDate';
import FixedBar from '../FixedBar';
import { usePropertyStore } from '@/store/usePropertyStore';
import router from 'next/router';
import { mockHouserData } from '@/data/mockHouseData';

type roomInfoSchema = {
  contractType: HouseType;
  deposit: number;
  monthlyRent: number;
  maintenanceFee?: number;
  available: string;
};

interface Props {
  isEdit: boolean;
  id?: string;
}

export default function RoomInfoForm({ isEdit = false, id }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const form = useForm<roomInfoSchema>({
    resolver: zodResolver(roomInfoZodSchema),
    defaultValues: {
      contractType: 'MONTHLY_RENT',
      deposit: undefined,
      monthlyRent: undefined,
      maintenanceFee: 0,
      available: formatDate(new Date(), 1),
    },
    mode: 'all',
  });

  const currentType = useWatch({
    control: form.control,
    name: 'contractType',
  });

  const currentDate = useWatch({ control: form.control, name: 'available' });

  const { setProperty } = usePropertyStore();

  const onSubmit: SubmitHandler<roomInfoSchema> = (values) => {
    startTransition(() => {
      setProperty({
        leaseType: values.contractType,
        deposit: values.deposit,
        monthlyFee: values.monthlyRent,
        maintenanceFee: values.maintenanceFee || 0,
        availableDate: values.available,
      });

      router.push(
        isEdit ? `/property/room-address?mode=edit&propertyId=${id}` : '/property/room-address',
      );
    });
  };

  const handleRoomType = (type: HouseType) => {
    form.setValue('contractType', type);
    if (type === 'JEONSE') {
      form.setValue('monthlyRent', 0);
    }
  };

  const handleCalendar = (date: string) => {
    form.setValue('available', date);
    form.trigger('available');
    setIsOpen(false);
  };

  const handleFeeChange = (field: keyof roomInfoSchema) => (fee?: number) => {
    if (!fee) {
      form.setValue(field, 0);
    } else {
      form.setValue(field, fee);
      form.trigger(field);
    }
  };

  useEffect(() => {
    if (isEdit && id) {
      const propertyData = mockHouserData.find((item) => item.id === Number(id));
      if (!propertyData) return;
      setProperty(propertyData);
      form.reset({
        contractType: propertyData.leaseType,
        deposit: propertyData.deposit,
        monthlyRent: propertyData.monthlyFee ?? 0,
        maintenanceFee: propertyData.maintenanceFee ?? 0,
        available: formatDate(new Date(propertyData.availableDate), 1),
      });
    }
  }, [id, isEdit]);

  return (
    <div className="px-5 pt-8">
      <Form {...form}>
        <form className="flex flex-col gap-14 mb-52" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="contractType"
            render={() => (
              <FormItem>
                <FormLabel className="text-md font-bold">계약 형태</FormLabel>
                <FormControl>
                  <HouseTypeSelectContainer
                    handleClick={handleRoomType}
                    value={form.getValues('contractType')}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-3">
            <FormLabel className="text-md font-bold">계약 금액</FormLabel>
            <FormField
              control={form.control}
              name="deposit"
              render={() => (
                <FormItem>
                  <FormControl>
                    <HouseFeeInput
                      type="DEPOSIT"
                      text="보증금"
                      onChange={handleFeeChange('deposit')}
                      value={form.watch('deposit')}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            {currentType !== 'JEONSE' && (
              <FormField
                control={form.control}
                name="monthlyRent"
                render={() => (
                  <FormItem>
                    <FormControl>
                      <HouseFeeInput
                        type="MONTHLY_RENT"
                        text="월세"
                        onChange={handleFeeChange('monthlyRent')}
                        value={form.watch('monthlyRent')}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="maintenanceFee"
              render={() => (
                <FormItem>
                  <FormControl>
                    <HouseFeeInput
                      type="MAINTENANCE_FEE"
                      text="관리비"
                      onChange={handleFeeChange('maintenanceFee')}
                      value={form.watch('maintenanceFee')}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-3 cursor-pointer">
            <FormLabel className="text-md font-bold">입주 가능 날짜</FormLabel>
            <div
              className="flex items-center justify-between px-3 py-2 rounded border bg-white"
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className="flex gap-[6px] items-center">
                <IconComponent width={14} height={14} name="calendar" alt="캘린더 아이콘" isBtn />
                <p className="h-[22px] flex items-center text-center">{currentDate}</p>
              </div>
              <IconComponent width={10} height={10} name="arrowRight" alt="캘린더 아이콘" isBtn />
            </div>
            {isOpen && (
              <AvailableCalendar handleCalendar={handleCalendar} currentDate={currentDate} />
            )}
          </div>
          <FixedBar
            disabled={!form.formState.isValid || isPending}
            skipRoute="/property/room-address"
            preventSkip={true}
          />
        </form>
      </Form>
    </div>
  );
}

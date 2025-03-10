import { roomInfoZodSchema } from '@/lib/zodSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition } from 'react';
import { SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { HouseType } from '@/types';
import HouseTypeSelectContainer from './HouseTypeSelectContainer';
import HouseFeeInput from './HouseFeeInput';
import AvailableCalendar from './AvaliableCalendar';
import Button from '../Button/CustomButton';
import IconComponent from '../Asset/Icon';
import { formatDate } from '@/utils/formatDate';

type roomInfoSchema = {
  contractType: HouseType;
  deposit: number;
  monthlyRent: number;
  maintenanceFee: number;
  available: string;
};

export default function RoomInfoForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const form = useForm<roomInfoSchema>({
    resolver: zodResolver(roomInfoZodSchema),
    defaultValues: {
      contractType: 'MONTHLY_RENT',
      deposit: 0,
      monthlyRent: 0,
      maintenanceFee: 0,
      available: formatDate(new Date()),
    },
    mode: 'onBlur',
  });

  const currentType = useWatch({
    control: form.control,
    name: 'contractType',
  });

  const currentDate = useWatch({ control: form.control, name: 'available' });

  const onSubmit: SubmitHandler<roomInfoSchema> = (values) => {
    startTransition(async () => {
      console.log(values);
    });
  };

  const handleRoomType = (type: HouseType) => {
    form.setValue('contractType', type);
  };

  const handleCalendar = (date: string) => {
    form.setValue('available', date);
  };

  return (
    <div className="p-5">
      <Form {...form}>
        <form className="flex flex-col gap-14" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="contractType"
            render={() => (
              <FormItem>
                <FormLabel className="text-[18px] font-bold">계약 형태</FormLabel>
                <FormControl>
                  <HouseTypeSelectContainer
                    handleClick={handleRoomType}
                    value={form.getValues('contractType')}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-3">
            <FormLabel className="text-[18px] font-bold">계약 금액</FormLabel>
            <FormField
              control={form.control}
              name="deposit"
              render={() => (
                <FormItem>
                  <FormControl>
                    <HouseFeeInput
                      type="DEPOSIT"
                      text="보증금"
                      onChange={(fee: string) => form.setValue('deposit', Number(fee))}
                    />
                  </FormControl>
                  <FormMessage />
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
                        onChange={(fee: string) => form.setValue('monthlyRent', Number(fee))}
                      />
                    </FormControl>
                    <FormMessage />
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
                      onChange={(fee: string) => form.setValue('maintenanceFee', Number(fee))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-3 cursor-pointer">
            <FormLabel className="text-[18px] font-bold">입주 가능 날짜</FormLabel>
            <div
              className="flex items-center justify-between px-3 py-2 rounded border"
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
          <Button
            label="다음"
            disabled={!form.formState.isValid && !isPending}
            className="w-full"
          />
        </form>
      </Form>
    </div>
  );
}

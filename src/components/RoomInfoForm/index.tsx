import { roomInfoZodSchema } from '@/lib/zodSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dispatch, SetStateAction, useEffect, useState, useTransition } from 'react';
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
import { getPropertyById } from '@/lib/api/property';

type roomInfoSchema = {
  contractType: HouseType;
  deposit: number;
  monthlyRent: number | null;
  maintenanceFee?: number;
  available: string;
};

interface Props {
  isEdit?: boolean;
  id?: string;
  setStep: Dispatch<SetStateAction<number>>;
}

export default function RoomInfoForm({ isEdit = false, id, setStep }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const form = useForm<roomInfoSchema>({
    resolver: zodResolver(roomInfoZodSchema),
    defaultValues: {
      contractType: 'MONTHLY_RENT',
      deposit: undefined,
      monthlyRent: null,
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

      setStep(2);
    });
  };

  const handleRoomType = (type: HouseType) => {
    form.setValue('contractType', type);
    if (type === 'JEONSE') {
      form.setValue('monthlyRent', null);
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
    const fetchData = async () => {
      if (!id) return;
      const result = await getPropertyById(id);
      setProperty(result);
      form.reset({
        contractType: result.leaseType,
        deposit: result.deposit,
        monthlyRent: result.monthlyFee ?? 0,
        maintenanceFee: result.maintenanceFee ?? 0,
        available: formatDate(new Date(result.availableDate), 1),
      });
    };
    if (isEdit && id) {
      fetchData();
    }
  }, [id, isEdit]);

  return (
    <div className="pt-32">
      <Form {...form}>
        <form className="flex flex-col gap-56 mb-208" onSubmit={form.handleSubmit(onSubmit)}>
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
          <div className="flex flex-col gap-12">
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
          <div className="flex flex-col gap-12 cursor-pointer">
            <FormLabel className="text-md font-bold">입주 가능 날짜</FormLabel>
            <div
              className="flex items-center justify-between px-12 py-8 rounded border bg-white"
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className="flex gap-6 items-center">
                <IconComponent width={14} height={14} name="calendar" alt="캘린더 아이콘" isBtn />
                <p className="h-22 flex items-center text-center">{currentDate}</p>
              </div>
              <IconComponent width={10} height={10} name="arrowRight" alt="캘린더 아이콘" isBtn />
            </div>
            {isOpen && (
              <AvailableCalendar handleCalendar={handleCalendar} currentDate={currentDate} />
            )}
          </div>
          <FixedBar
            disabled={!form.formState.isValid || isPending}
            preventSkip={true}
            text="다음"
          />
        </form>
      </Form>
    </div>
  );
}

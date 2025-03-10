import { roomInfoZodSchema } from '@/lib/zodSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { HouseType } from '@/types';
import HouseTypeSelectContainer from './HouseTypeSelectContainer';
import HouseFeeInput from './HouseFeeInput';

type roomInfoSchema = {
  contractType: HouseType;
  deposit: number;
  monthlyRent: number;
  maintenanceFee: number;
  available: string;
};

export default function RoomInfoForm() {
  const [isPending, startTransition] = useTransition();
  const form = useForm<roomInfoSchema>({
    resolver: zodResolver(roomInfoZodSchema),
    defaultValues: {
      contractType: 'MONTHLY_RENT',
      deposit: 0,
      monthlyRent: 0,
      maintenanceFee: 0,
      available: '',
    },
    mode: 'onBlur',
  });

  const currentType = useWatch({
    control: form.control,
    name: 'contractType',
  });

  const onSubmit: SubmitHandler<roomInfoSchema> = (values) => {
    startTransition(async () => {
      console.log(values);
    });
  };

  const handleRoomType = (type: HouseType) => {
    form.setValue('contractType', type);
  };

  return (
    <div className="p-5">
      <Form {...form}>
        <div className="flex flex-col gap-11">
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
                    <HouseFeeInput type="DEPOSIT" text="보증금" />
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
                      <HouseFeeInput type="MONTHLY_RENT" text="월세" />
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
                    <HouseFeeInput type="MAINTENANCE_FEE" text="관리비" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </Form>
    </div>
  );
}

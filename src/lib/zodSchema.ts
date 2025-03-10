import { z } from 'zod';

export const createRoomZodSchema = z.object({
  address: z.string().trim().min(1, { message: '주소는 필수 입니다.' }),
  addressDetail: z
    .string()
    .trim()
    .min(1, { message: '상세 주소는 필수입니다.' })
    .max(20, { message: '상세 주소는 최대 20글자까지만 가능합니다.' }),
  nickName: z.string().trim().max(20, { message: '매물 이름은 최대 20글자까지만 가능합니다.' }),
});

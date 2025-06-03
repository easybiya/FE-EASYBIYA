import { z } from 'zod';

export const createRoomZodSchema = z.object({
  address: z.string().trim().min(1, { message: '주소는 필수입니다.' }),
  addressDetail: z
    .string()
    .trim()
    .min(1, { message: '상세 주소는 필수입니다.' })
    .max(20, { message: '상세 주소는 최대 20글자까지만 가능합니다.' }),
  nickName: z.string().trim().max(13, { message: '매물 이름은 최대 13글자까지만 가능합니다.' }), // 공백 포함 13자
});

export const roomInfoZodSchema = z.object({
  contractType: z.enum(['JEONSE', 'BANJEONSE', 'MONTHLY_RENT']),
  deposit: z.number(),
  monthlyRent: z.number().nullable(),
  maintenanceFee: z.number().optional(),
  available: z.string().trim(),
});

export const createInstitutionZodSchema = z.object({
  address: z.string().trim().min(1, { message: '주소는 필수입니다.' }),
  nickName: z.string().trim().max(20, { message: '장소 이름은 최대 20글자까지만 가능합니다.' }),
});

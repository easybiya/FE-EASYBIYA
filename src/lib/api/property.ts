import { Property } from '@/types';
import instance from './axiosInstance';

export const getBookmarkedPropertyList = async (): Promise<Property[]> => {
  const result = await instance.get('/api/property/bookmarked');
  return result.data.result ?? [];
};

interface GetPropertyListParams {
  page: number;
  size: number;
  sortBy: 'LATEST' | 'AVAILABLE_DATE_ASC';
}

export const getNonBookmarkedPropertyList = async (
  params: GetPropertyListParams,
): Promise<Property[]> => {
  const result = await instance.get('/api/property/not-bookmarked', { params });
  return result.data.result ?? [];
};

export const getPropertyById = async (id: string): Promise<Property> => {
  const result = await instance.get(`/api/property/${id}`);
  return result.data.result;
};

export const postProperty = async (formData: FormData) => {
  const result = await instance.post('/api/property', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return result.data;
};

export const updatePropertyImages = async (propertyId: number, formData: FormData) => {
  const res = await instance.put(`/api/property/${propertyId}/images`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  if (!res.data) throw new Error('이미지 수정 실패');
  return res.data;
};

import { MapProperty, Property } from '@/types';
import instance from './axiosInstance';
import { PropertyData } from '@/store/usePropertyStore';

export const getBookmarkedPropertyList = async (): Promise<Property[]> => {
  const result = await instance.get('/api/property/bookmarked');
  return result.data.result ?? [];
};

export const getTotalCount = async () => {
  const result = await instance.get('/api/property/total-number');
  return result.data.result.totalNumber;
};

export type PropertySortBy = 'LATEST' | 'AVAILABLE_DATE_ASC';

export interface GetPropertyListParams {
  page: number;
  size: number;
  sortBy: PropertySortBy;
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

export const updateProperty = async (property: PropertyData, id: string) => {
  const result = await instance.patch(`/api/property/${id}`, property);
  return result.data;
};

export const toggleBookmark = async (id: string) => {
  const result = await instance.patch(`/api/property/${id}/bookmark`);
  return result.data;
};

export const updatePropertyImages = async (propertyId: string, formData: FormData) => {
  const res = await instance.put(`/api/property/${propertyId}/images`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  if (!res.data) throw new Error('이미지 수정 실패');
  return res.data;
};

export const deleteProperty = async (id: string) => {
  const result = await instance.delete(`/api/property/${id}`);
  return result.data;
};

export const getMapPropertyList = async (): Promise<MapProperty[]> => {
  const result = await instance.get(`/api/property/map`);
  return result.data.result;
};

export const getSharedPropertyList = async (ids: string[]): Promise<Property[]> => {
  const result = await instance.get(`/shared/property`, {
    params: { propertyIds: ids.join(',') },
    withCredentials: false,
  });
  return result.data.result;
};

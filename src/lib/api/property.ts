import { MapProperty, Property, PropertyInsert } from '@/types';
import instance from './axiosInstance';
import { PropertyData } from '@/store/usePropertyStore';
import { ChecklistPayloadItem } from '@/types/checklist';
import { supabase } from '../supabaseClient';
import { v4 as uuidv4 } from 'uuid';

export const getBookmarkedPropertyList = async (): Promise<Property[]> => {
  const { data, error } = await supabase
    .from('property')
    .select('*')
    .eq('bookmarked', true)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data ?? [];
};

export const getTotalCount = async (): Promise<number> => {
  const { count, error } = await supabase
    .from('property')
    .select('*', { count: 'exact', head: true });

  if (error) throw error;
  return count ?? 0;
};

export type PropertySortBy = 'LATEST' | 'AVAILABLE_DATE_ASC';

export interface GetPropertyListParams {
  page: number;
  size: number;
  sortBy: PropertySortBy;
}

export const getNonBookmarkedPropertyList = async (
  params: GetPropertyListParams & { page: number },
): Promise<Property[]> => {
  const { page, size, sortBy } = params;

  const from = (page - 1) * size;
  const to = from + size - 1;

  let query = supabase.from('property').select('*').eq('bookmarked', false).range(from, to);

  if (sortBy === 'LATEST') {
    query = query.order('created_at', { ascending: false });
  }

  if (sortBy === 'AVAILABLE_DATE_ASC') {
    query = query.order('available_date', { ascending: true });
  }

  const { data, error } = await query;

  if (error) throw error;
  return data ?? [];
};

export const getPropertyById = async (id: string): Promise<Property> => {
  const { data, error } = await supabase.from('property').select('*').eq('id', id).single(); // 단건 보장

  if (error) throw error;
  return data;
};

export const postProperty = async (property: PropertyInsert) => {
  const { data, error } = await supabase.from('property').insert(property).select().single();

  if (error) throw error;
  return data;
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
  const { error } = await supabase
    .from('property')
    .delete()
    .eq('id', id);

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return true;
};

export const getMapPropertyList = async (): Promise<MapProperty[]> => {
  const { data, error } = await supabase
    .from('property')
    .select(`
      id,
      name,
      address,
      address_detail,
      lat,
      lng
    `)
    .order('created_at', { ascending: false });

  if (error) throw error;

  return (
    data?.map((item) => ({
      id: item.id,
      name: item.name,
      address: item.address,
      address_detail: item.address_detail,
      lat: item.lat,
      lng: item.lng,
    })) ?? []
  );
};

export const getSharedPropertyList = async (ids: string[]): Promise<Property[]> => {
  const result = await instance.get(`/shared/property`, {
    params: { ids: ids.join(',') },
    withCredentials: false,
  });
  return result.data.result;
};

export const getSharedPropertyDetail = async (id: string): Promise<Property> => {
  const result = await instance.get(`/shared/property/${id}`, {
    withCredentials: false,
  });
  return result.data.result;
};

export const getSharedPropertyChecklist = async (id: string): Promise<ChecklistPayloadItem[]> => {
  const result = await instance.get(`/shared/checklist/property/${id}`, {
    withCredentials: false,
  });
  return result.data.result;
};


export const uploadImagesToStorage = async (images: File[], userId: string) => {
  const urls = await Promise.all(
    images.map(async (file) => {
      const ext = file.name.split('.').pop();
      const fileName = `${uuidv4()}.${ext}`;
      const filePath = `properties/${userId}/${fileName}`;

      const { error } = await supabase.storage
        .from('easybiya')
        .upload(filePath, file, {
          upsert: false,
          contentType: file.type,
        });

      if (error) throw error;

      const { data } = supabase.storage
        .from('easybiya')
        .getPublicUrl(filePath);

      return data.publicUrl;
    }),
  );

  return urls; // string[]
};
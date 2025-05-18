import { ChecklistItem, ChecklistPayloadItem } from '@/types/checklist';
import instance from './axiosInstance';

export async function updateChecklistToServer(
  propertyId: string,
  checklist: ChecklistPayloadItem[],
) {
  const response = await fetch(
    // TO DO: 서버 도메인에 맞게 URL 변경하기
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/property/${propertyId}`,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ checklists: checklist }),
    },
  );

  const data = await response.json();
  if (!data.isSuccess) throw new Error(data.message);
  return data;
}

export const getChecklistTemplate = async (): Promise<ChecklistItem[]> => {
  const result = await instance.get('/api/template/default');
  return result.data.result;
};

export const getPropertyChecklistById = async (id: string): Promise<ChecklistPayloadItem[]> => {
  const result = await instance.get(`/api/checklist/property/${id}`);
  return result.data.result;
};

import { ChecklistPayloadItem, ChecklistTemplate, TemplatePreview } from '@/types/checklist';
import instance from './axiosInstance';

export const updateChecklist = async (propertyId: string, checklist: ChecklistPayloadItem[]) => {
  const result = await instance.put(`/api/checklist/property/${propertyId}`, {
    checklists: checklist,
  });
  return result.data;
};

export const getChecklistTemplate = async (): Promise<ChecklistTemplate> => {
  const result = await instance.get('/api/template/default');
  return result.data.result;
};

export const getPropertyChecklistById = async (id: string): Promise<ChecklistPayloadItem[]> => {
  const result = await instance.get(`/api/checklist/property/${id}`);
  return result.data.result;
};

export interface GetTemplateListParams {
  page: number;
  size: number;
}

export const getTemplateList = async (
  params: GetTemplateListParams,
): Promise<TemplatePreview[]> => {
  const result = await instance.get('/api/template');
  return result.data.result;
};

import { ChecklistPayloadItem, ChecklistTemplate, TemplatePreview } from '@/types/checklist';
import instance from './axiosInstance';
import { supabase } from '../supabaseClient';

export const updateChecklist = async (id: string, checklist: ChecklistPayloadItem[]) => {
  const { data, error } = await supabase
    .from('property')
    .update({ checklist: checklist })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getChecklistTemplate = async (): Promise<ChecklistTemplate> => {
  const result = await instance.get('/api/template/default');
  return result.data.result;
};

export const getPropertyChecklistById = async (id: string): Promise<ChecklistPayloadItem[]> => {
  const { data, error } = await supabase.from('property').select('*').eq('id', id).single();

  if (error) throw error;
  return data.checklist;
};

export interface GetTemplateListParams {
  page: number;
  size: number;
}

export const getTemplateList = async (
  params: GetTemplateListParams,
): Promise<TemplatePreview[]> => {
  const result = await instance.get(`/api/template?page=${params.page}&size=${params.size}`);
  return result.data.result;
};
